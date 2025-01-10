import { chmod, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { type ReadableStream } from 'node:stream/web';
import { setTimeout as delay } from 'node:timers/promises';
import { isNativeError } from 'node:util/types';

import { run, runNoRejectOnBadExit, type RunOptions } from '@-xun/run';
import { CliError, type ChildConfiguration } from '@black-flag/core';
// ? Patches global Proxy and spawn functions; see documentation for details
import '@-xun/symbiote/assets/conventional.config.cjs';
import { type Merge, type OmitIndexSignature, type StringKeyOf } from 'type-fest';

import {
  getInvocableExtendedHandler,
  type AsStrictExecutionContext
} from 'multiverse+bfe';

import { hardAssert, softAssert } from 'multiverse+cli-utils:error.ts';

import {
  logStartTime,
  LogTag,
  standardSuccessMessage
} from 'multiverse+cli-utils:logging.ts';

import { scriptBasename } from 'multiverse+cli-utils:util.ts';

import {
  isRootPackage,
  type ProjectMetadata,
  type XPackageJson
} from 'multiverse+project-utils:analyze.ts';

import {
  codecovConfigProjectBase,
  directoryCoveragePackageBase,
  fsConstants,
  isAccessible,
  toPath,
  xreleaseConfigProjectBase
} from 'multiverse+project-utils:fs.ts';

import {
  SHORT_TAB,
  SINGLE_SPACE,
  type ExtendedDebugger,
  type ExtendedLogger
} from 'multiverse+rejoinder';

import {
  default as renovate,
  type CustomCliArguments as RenovateCliArguments
} from 'universe:commands/project/renovate.ts';

import {
  DefaultGlobalScope,
  ThisPackageGlobalScope as ReleaseScope,
  type GlobalCliArguments,
  type GlobalExecutionContext
} from 'universe:configure.ts';

import { ErrorMessage } from 'universe:error.ts';
import { attemptToRunCommand } from 'universe:task-runner.ts';

import {
  determineRepoWorkingTreeDirty,
  getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix,
  getRelevantDotEnvFilePaths,
  loadDotEnv,
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage
} from 'universe:util.ts';

const releaseEmoji = '🚀';
const maxFlagSize = 44;
const nestedTaskDepth = 2;
const maxCodecovDownloadRetries = 3;
const codecovDownloadTimeoutSeconds = 10;
const codecovDownloadUrl = 'https://cli.codecov.io/latest/linux/codecov';

const $gracefulExit = Symbol('interrupt-tasks-and-exit-cleanly');

/**
 * The environment variables this command expects to be defined in
 * `process.env`.
 */
export const expectedEnvVariables = [
  'CODECOV_TOKEN',
  'GITHUB_TOKEN',
  'NPM_TOKEN',
  'GIT_AUTHOR_NAME',
  'GIT_COMMITTER_NAME',
  'GIT_AUTHOR_EMAIL',
  'GIT_COMMITTER_EMAIL'
];

/**
 * @see {@link ReleaseScope}
 */
export const releaseScopes = Object.values(ReleaseScope);

/**
 * A string that can be passed to --skip-tasks representing all prerelease and
 * postrelease tasks.
 */
export const allTasks = 'all';

/**
 * A string that can be passed to --skip-tasks representing all prerelease
 * tasks.
 */
export const allPrereleaseTasks = 'prerelease';

/**
 * A string that can be passed to --skip-tasks representing all postrelease
 * tasks.
 */
export const allPostReleaseTasks = 'postrelease';

/**
 * A string that can be passed to --skip-tasks representing all prerelease tasks
 * that should be skipped when following "Manual Release Method 2" in
 * `MAINTAINING.md`.
 *
 * The skipped tasks are those manageable by an outside scheduler, making this
 * mode useful when integrating with tools like Turbo.
 */
export const allManualPrereleaseTasks = 'manual';

// TODO: unify task runners in this command, in renovate, and elsewhere into
// TODO: src/task-runner.ts

/**
 * The context passed to each individual task.
 */
export type ReleaseTaskContext = {
  self: ReleaseTask;
  log: ExtendedLogger;
  debug: ExtendedDebugger;
};

/**
 * A reified {@link ProtoReleaseTaskRunner}. Generated automatically by tooling.
 */
export type ReleaseTaskRunner = (
  argv: Parameters<ReturnType<typeof command>['handler']>[0],
  taskContextPartial: Omit<ReleaseTaskContext, 'self'>
) => Promise<void>;

export type ExecutionContextWithProjectMetadata = Merge<
  Parameters<typeof command>[0],
  { projectMetadata: ProjectMetadata }
>;

/**
 * A partial release task with loose typings for quickly authoring new tasks.
 */
export type ProtoReleaseTaskRunner = (
  executionContext: ExecutionContextWithProjectMetadata,
  argv: Parameters<ReturnType<typeof command>['handler']>[0],
  taskContext: ReleaseTaskContext
) => ReturnType<ReleaseTaskRunner>;

/**
 * A prerelease, release, or postrelease task to be executed by this command.
 */
export type ReleaseTask =
  | {
      type: 'pre' | 'post';
      id: number;
      skippable: boolean;
      allowMissingNpmScripts: boolean;
      npmScripts: StringKeyOf<
        OmitIndexSignature<NonNullable<XPackageJson['scripts']>>
      >[];
      actionDescription?: string;
      helpDescription: string;
      emoji?: string;
      io: RunOptions['stdout'];
      run?: ReleaseTaskRunner;
    }
  | {
      type: 'release';
      id: number;
      skippable: false;
      allowMissingNpmScripts: boolean;
      npmScripts: never[];
      actionDescription?: string;
      helpDescription: string;
      emoji?: string;
      io: RunOptions['stdout'];
      run?: ReleaseTaskRunner;
    };

export interface BaseProtoTask {
  /**
   * Whether the task can be skipped by the user or not.
   */
  skippable: boolean;
  /**
   * Whether the task will automatically fail if none of the scripts given in
   * `npmScripts` exist in the package's `package.json`.
   *
   * @default false
   */
  allowMissingNpmScripts?: boolean;
  /**
   * Run only the first NPM script in `npmScripts` that is found in the
   * package's `package.json`.
   */
  npmScripts?: Exclude<ReleaseTask['npmScripts'], never[]>;
  /**
   * The description reported to the user when the task is run.
   *
   * @default `Running task #${id}`
   */
  actionDescription?: string;
  /**
   * The description reported to the user when `--help` is called.
   */
  helpDescription: string;
  /**
   * A symbol that will be placed before symbiote output text concerning this
   * task.
   */
  emoji?: string;
  /**
   * Determines how the process's `stdout` and `stdin` streams will be
   * configured when executing {@link npmScripts}. Does not apply to `run` or
   * {@link ProtoReleaseTaskRunner}.
   *
   * This should always be left as `'pipe'` (the default) unless the task is the
   * only member of its task group (in which case `'inherit'` may be
   * appropriate).
   *
   * Note that this value may be overridden (with `'ignore'`) if the user
   * supplies `--hush`/`--quiet`/`--silent`.
   *
   * @default 'pipe'
   */
  io?: RunOptions['stdout'];
  /**
   * A function called when the task is triggered.
   */
  run?: ProtoReleaseTaskRunner;
}

/**
 * A partially defined prerelease-`type` {@link ReleaseTask}.
 */
export interface ProtoPrereleaseTask extends BaseProtoTask {
  type?: 'pre';
}

/**
 * A partially defined postrelease-`type` {@link ReleaseTask}.
 */
export interface ProtoPostreleaseTask extends BaseProtoTask {
  type?: 'post';
}

/**
 * A partially defined release-`type` {@link ReleaseTask}.
 */
export interface ProtoCoreReleaseTask
  extends Omit<BaseProtoTask, 'skippable' | 'npmScripts' | 'emoji'> {
  skippable?: false;
  npmScripts?: never[];
  emoji?: '';
}

export type CustomCliArguments = GlobalCliArguments<ReleaseScope> & {
  ci: boolean;
  dryRun: boolean;
  force: boolean;
  parallel: boolean;
  skipTasks: string[];
  skipTaskMissingScripts: boolean;
};

export default function command(
  executionContext: AsStrictExecutionContext<GlobalExecutionContext>
) {
  const {
    log,
    debug_,
    state,
    projectMetadata: projectMetadata_,
    isUsingLocalInstallation
  } = executionContext;

  const { prereleaseTasks, postreleaseTasks, tasksInRunOrder } =
    // ! This is guaranteed by a hardAssert before task.run is called (below)
    marshalTasks(executionContext as ExecutionContextWithProjectMetadata);

  const firstSkippablePrereleaseTaskId = prereleaseTasks.find(
    ({ skippable }) => skippable
  )?.id;

  const lastSchedulerPurviewTaskId = findTaskByDescription(/sync-deps/).id - 1;

  hardAssert(firstSkippablePrereleaseTaskId, ErrorMessage.GuruMeditation());
  hardAssert(
    firstSkippablePrereleaseTaskId !== lastSchedulerPurviewTaskId,
    ErrorMessage.GuruMeditation()
  );

  debug_('turbo detected: %O', !!process.env.TURBO_HASH);

  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>(
    function (blackFlag) {
      blackFlag.parserConfiguration({
        'parse-numbers': false,
        'parse-positional-numbers': false
      });

      const skippablePrereleaseTasks = prereleaseTasks
        .filter(({ skippable }) => skippable)
        .map(({ id }) => id.toString());

      const skippablePostreleaseTasks = postreleaseTasks
        .filter(({ skippable }) => skippable)
        .map(({ id }) => id.toString());

      const allSkippableTasks = skippablePrereleaseTasks.concat(
        skippablePostreleaseTasks
      );

      return {
        scope: { choices: releaseScopes },
        ci: {
          alias: 'continuous-integration',
          boolean: true,
          description: 'Enable functionality for CI execution environments',
          default:
            process.env.NODE_ENV !== undefined && process.env.NODE_ENV !== 'development'
        },
        'dry-run': {
          boolean: true,
          description: "Go through the motions of cutting a release but don't release",
          default: false
        },
        force: {
          boolean: true,
          description: 'Disregard all safety checks',
          default: false
        },
        parallel: {
          boolean: true,
          default: true,
          describe: 'Run release tasks concurrently when possible'
        },
        'skip-tasks': {
          alias: 'skip-task',
          array: true,
          choices: allSkippableTasks.concat([
            allManualPrereleaseTasks,
            allPrereleaseTasks,
            allPostReleaseTasks,
            allTasks
          ]),
          description: 'Skip one, some, or all prerelease/postrelease tasks',
          default: process.env.TURBO_HASH ? [allManualPrereleaseTasks] : [],
          defaultDescription: `"${allManualPrereleaseTasks}" if run using Turbo, empty otherwise`,
          coerce(skipTargets: string[]) {
            return Array.from(
              new Set(
                skipTargets.flatMap((target) => {
                  switch (target) {
                    case allManualPrereleaseTasks: {
                      return Array.from({
                        length:
                          lastSchedulerPurviewTaskId - firstSkippablePrereleaseTaskId + 1
                      }).map((_, index) =>
                        String(firstSkippablePrereleaseTaskId + index)
                      );
                    }

                    case allPrereleaseTasks: {
                      return skippablePrereleaseTasks;
                    }

                    case allPostReleaseTasks: {
                      return skippablePostreleaseTasks;
                    }

                    case allTasks: {
                      return allSkippableTasks;
                    }

                    default: {
                      return target;
                    }
                  }
                })
              )
            );
          }
        },
        'skip-task-missing-scripts': {
          alias: 'skip-missing',
          boolean: true,
          description:
            'Skip any task that cannot find its NPM scripts instead of throwing an error',
          default: false
        }
      };
    }
  );

  return {
    builder,
    description: 'Pack and release existing production-ready distributables',
    usage: withGlobalUsage(
      `
$1 according to the release procedure described in the MAINTAINING.md file and at length in the symbiote wiki: https://github.com/Xunnamius/symbiote/wiki. The procedure is composed of the core "release" task as well as ${prereleaseTasks.length + postreleaseTasks.length} "prerelease" and "postrelease" tasks:

${printTasks(tasksInRunOrder)}

Tasks at the same indentation level will be run concurrently unless --no-parallel is provided, in which case they will be run serially ordered by their unique numeric #ids. Use --no-parallel to prevent race conditions when, for instance, linting a package that imports from its own build output while also rebuilding that same package.

Environment variables are loaded into process.env from the following file(s), if they exist, with the variables in latter files overwriting those in the former:

${SHORT_TAB}- ${getRelevantDotEnvFilePaths(projectMetadata_).join(`\n${SHORT_TAB}- `)}

Provide --ci (--continuous-integration) to enable useful functionality for CI execution environments. Specifically: run npm ci (task #${findTaskByDescription(/npm ci/).id}), run xrelease in CI mode (task #${findTaskByDescription(/@-xun\/release/).id}), and facilitate package provenance if the runtime environment supports it (task #${findTaskByDescription(/@-xun\/release/).id}). If running the release procedure by hand instead of via CI/CD, use --no-ci to disable CI-specific functionality. --no-ci (--ci=false) is the default when the NODE_ENV environment variable is undefined or "development," otherwise --ci (--ci=true) is the default.

Task #${findTaskByDescription(/@-xun\/changelog/).id} sets the SYMBIOTE_RELEASE_REBUILD_CHANGELOG environment variable in the current execution environment. This will be picked up by xrelease, causing it to rebuild the changelog using \`symbiote build changelog\`.

Task #${findTaskByDescription(/sync-deps/).id} runs the equivalent of \`symbiote project renovate --scope=this-package --synchronize-interdependencies\` as a pre-release task.

Task #${findTaskByDescription(/codecov/i).id}, a postrelease task that uploads test coverage data to Codecov, is only performed if (1) coverage data already exists (see task #${findTaskByDescription(/symbiote test/).id}) and (2) a ${codecovConfigProjectBase} configuration file exists at the project root. An error will be thrown if no coverage data exists unless --force is provided. The task will be skipped if no configuration file exists. When uploading coverage data, the package's name and current branch are used to derive one or more flags (https://docs.codecov.com/docs/flags). Codecov uses flags to map reports to specific packages in its UI and coverage badges. See the symbiote wiki for details on flag semantics and usage.

Running \`symbiote release\` will usually execute all prerelease and postrelease tasks. Provide --skip-tasks=task-id (where "task-id" is a valid task number) to skip running a specific task, --skip-tasks=prerelease to skip running tasks #${firstSkippablePrereleaseTaskId}-${prereleaseTasks.at(-1)!.id}, --skip-tasks=postrelease to skip running tasks #${postreleaseTasks[0].id} and above, or --skip-tasks=all to skip running all skippable prerelease and postrelease tasks.

There is also --skip-tasks=${allManualPrereleaseTasks}, which will skip running tasks ${firstSkippablePrereleaseTaskId} through ${lastSchedulerPurviewTaskId}. This is useful when symbiote is being managed by a task scheduling tool like Turbo that decides out-of-band if/when/how it wants to run these specific tasks; such a tool only calls \`symbiote release\` afterwards, when it's ready to trigger xrelease. It is for this reason that --skip-tasks=${allManualPrereleaseTasks} becomes the default when Turbo is detected in the runtime environment (by checking for the existence of process.env.TURBO_HASH).

When a task executes an NPM script, it will typically select from one of several choices. If the package's package.json file is missing every NPM script a task might choose, this command will exit with an error unless (1) the task allows itself to be skipped or (2) --skip-task-missing-scripts is provided. In either case, any missing scripts are noted in a warning but otherwise ignored.

The only available scope is "${ReleaseScope.ThisPackage}"; hence, when invoking this command, only the package at the current working directory will be eligible for release. Use NPM's workspace features, or Turbo's, if your goal is to potentially release multiple packages.

Provide --dry-run to ensure no permanent changes to the project are made, no release is cut, and no publishing or git write operations occur. Use --dry-run to test what would happen if you were to cut a release. Note that --dry-run will NOT prevent prerelease tasks from running; however, postrelease tasks that exclusively run NPM scripts are always skipped.

Further, note the minimum package version this command will release will always be 1.0.0. This is because xrelease (nor upstream semantic-release) does not officially support "experimental packages," which are packages with versions below semver 1.0.0. If you attempt to release a package with a version below 1.0.0 (e.g. 0.0.1), it will be released as a 1.0.0 (breaking change) instead. It is not wise to use experimental package versions with xrelease or symbiote.

WARNING: this command is NOT DESIGNED TO HANDLE CONCURRENT EXECUTION ON THE SAME GIT REPOSITORY IN A SAFE MANNER. DO NOT run multiple instances of this command on the same repository or project. If using a tool like Turbo, ensure it runs all NPM "release" scripts serially (and ideally topologically).
`.trim()
    ),
    handler: withGlobalHandler(async function (argv) {
      const {
        $0: scriptFullName,
        scope,
        ci,
        dryRun,
        force,
        parallel,
        skipTasks,
        skipTaskMissingScripts,
        quiet: isQuieted,
        silent: isSilenced
      } = argv;

      const genericLogger = log.extend(scriptBasename(scriptFullName));
      const debug = debug_.extend('handler');

      debug('entered handler');

      debug('prereleaseTasks: %O', prereleaseTasks);
      debug('postreleaseTasks: %O', postreleaseTasks);
      debug('tasksInRunOrder: %O', tasksInRunOrder);

      const {
        projectMetadata: { cwdPackage }
      } = await runGlobalPreChecks({ debug_, projectMetadata_, scope });

      const { startTime } = state;
      const { json: cwdPackageJson } = cwdPackage;
      const { scripts: cwdPackageJsonScripts = {} } = cwdPackageJson;

      logStartTime({ log, startTime, isUsingLocalInstallation });
      genericLogger([LogTag.IF_NOT_QUIETED], 'Releasing project...');

      debug('scope (unused): %O', scope);
      debug('ci: %O', ci);
      debug('dryRun: %O', dryRun);
      debug('force: %O', force);
      debug('parallel: %O', parallel);
      debug('skipTasks: %O', skipTasks);
      debug('skipTaskMissingScripts: %O', skipTaskMissingScripts);
      debug('isQuieted: %O', isQuieted);
      debug('isSilenced: %O', isSilenced);

      if (dryRun) {
        genericLogger.warn(
          [LogTag.IF_NOT_SILENCED],
          '⚠️🚧 Using --dry-run (tasks will either run in --dry-run mode or be skipped)'
        );
      }

      if (force) {
        genericLogger.warn(
          [LogTag.IF_NOT_SILENCED],
          '⚠️🚧 Using --force (all safety checks disabled)'
        );
      }

      if (skipTaskMissingScripts) {
        genericLogger.warn(
          [LogTag.IF_NOT_SILENCED],
          '⚠️🚧 Using --skip-task-missing-scripts (script existence safety checks disabled)'
        );
      }

      genericLogger.message(
        [LogTag.IF_NOT_QUIETED],
        ci
          ? 'Using --ci (assuming automated CI environment)'
          : 'Using --no-ci (assuming manual release environment)'
      );

      genericLogger.message(
        [LogTag.IF_NOT_QUIETED],
        parallel
          ? 'Using --parallel (tasks will run concurrently where possible)'
          : 'Using --no-parallel (tasks will run in serial task order)'
      );

      if (skipTasks.length) {
        genericLogger.message(
          [LogTag.IF_NOT_QUIETED],
          `✖️ The following tasks will be skipped: ${skipTasks.join(', ')}`
        );
      }

      genericLogger.newline([LogTag.IF_NOT_HUSHED]);
      debug('processing tasks');

      // TODO: generalize this task algo along with what's in renovate and init

      try {
        for (const [index, taskGroup] of tasksInRunOrder.entries()) {
          debug(
            'processing %O tasks in task group %O: %O',
            taskGroup.length,
            index + 1,
            taskGroup
          );

          const taskPromiseFunctions = taskGroup.map((task) => {
            return async function () {
              const {
                run: taskRunner,
                npmScripts,
                allowMissingNpmScripts,
                id: id_,
                actionDescription,
                type,
                io
              } = task;

              const id = id_.toString();
              const prettyId = `task-${id}`;
              const emoji =
                type === 'release'
                  ? `${releaseEmoji} `
                  : task.emoji
                    ? task.emoji + ' '
                    : '';
              const dbg = debug.extend(prettyId);
              const taskLogger = genericLogger.extend(prettyId);

              dbg('preparing to run task: %O', task);

              if (skipTasks.includes(id)) {
                taskLogger.message(
                  [LogTag.IF_NOT_SILENCED],
                  `✖️ Task ${emoji.trim()} was skipped at the behest of the user`
                );
              } else {
                let ranNpmScript = false;

                for (const script of npmScripts) {
                  dbg('running script %O', script);

                  if (script in cwdPackageJsonScripts) {
                    if (actionDescription && !taskRunner) {
                      taskLogger([LogTag.IF_NOT_HUSHED], `${emoji}${actionDescription}`);
                    } else {
                      taskLogger(
                        [LogTag.IF_NOT_HUSHED],
                        `${emoji}Executing npm script %O`,
                        script
                      );
                    }

                    if (dryRun && type === 'post') {
                      taskLogger.message(
                        [LogTag.IF_NOT_SILENCED],
                        `✖️ Execution of postrelease script %O was skipped due to --dry-run`,
                        script
                      );
                    } else {
                      // eslint-disable-next-line no-await-in-loop
                      const scriptExitCode = await attemptToRunCommand(
                        'npm',
                        ['run', script],
                        {
                          scriptName: script,
                          logger: taskLogger,
                          stdout: isQuieted ? 'ignore' : io,
                          stderr: isSilenced ? 'ignore' : io
                        }
                      );

                      softAssert(
                        scriptExitCode === 0,
                        ErrorMessage.ReleaseScriptExecutionFailed()
                      );
                    }

                    ranNpmScript = true;
                    break;
                  } else {
                    dbg('script %O not found in current package', script);
                  }
                }

                if (taskRunner) {
                  dbg('entering runner function');

                  taskLogger(
                    [LogTag.IF_NOT_HUSHED],
                    `${emoji}${actionDescription || `Running task #${id}`}`
                  );

                  await taskRunner(argv, { log: taskLogger, debug: dbg });
                } else {
                  dbg('skipped runner function (does not exist)');

                  if (!ranNpmScript) {
                    taskLogger[allowMissingNpmScripts ? 'warn' : 'error'](
                      [LogTag.IF_NOT_HUSHED],
                      `👹 Task ${emoji.trim()} is not runnable and called no existing NPM scripts`
                    );

                    if (skipTaskMissingScripts || allowMissingNpmScripts) {
                      return;
                    }

                    softAssert(ErrorMessage.TaskNotRunnable(id, npmScripts));
                  }
                }

                taskLogger([LogTag.IF_NOT_HUSHED], '✅');
              }
            };
          });

          debug(
            'running task group %O %O:',
            index + 1,
            parallel ? 'concurrently' : 'serially'
          );

          if (parallel) {
            // eslint-disable-next-line no-await-in-loop
            const results = await Promise.allSettled(
              taskPromiseFunctions.map((p) => p())
            );

            for (const result of results) {
              if (result.status === 'fulfilled') {
                debug('a task runner promise has been fulfilled');
              } else {
                throw new CliError(ErrorMessage.ReleaseRunnerExecutionFailed(), {
                  cause: result.reason
                });
              }
            }
          } else {
            for (const taskPromiseFunction of taskPromiseFunctions) {
              // eslint-disable-next-line no-await-in-loop
              await taskPromiseFunction();
            }
          }
        }
      } catch (error) {
        if (isGracefulExitSomewhereInCausalStack(error)) {
          genericLogger.message(
            [LogTag.IF_NOT_HUSHED],
            '💃🏿 The release process exited prematurely but gracefully 💃🏿'
          );
        } else {
          throw error;
        }
      } finally {
        genericLogger.newline([LogTag.IF_NOT_QUIETED]);
      }

      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;

  function findTaskByDescription(
    /**
     * **WARNING: MUST NEVER BE A RegExp WITH A GLOBAL (g) FLAG!**
     */
    searchRegExp: RegExp
  ): ReleaseTask {
    for (const tasks of tasksInRunOrder) {
      const found = tasks.find(({ helpDescription: description }) =>
        searchRegExp.test(description)
      );

      if (found) {
        return found;
      }
    }

    // ? まさか!
    hardAssert(ErrorMessage.GuruMeditation());
  }

  function isGracefulExitSomewhereInCausalStack(error: unknown) {
    if (error === $gracefulExit) {
      return true;
    }

    if (isNativeError(error)) {
      return isGracefulExitSomewhereInCausalStack(error.cause);
    }

    return false;
  }
}

function marshalTasks(executionContext: ExecutionContextWithProjectMetadata) {
  let count = 0;

  const prereleaseTasks = protoPrereleaseTasks.map(toReleaseTasks('pre'));
  const coreReleaseTask = toReleaseTasks('release')(protoReleaseTask);
  const postreleaseTasks = protoPostreleaseTasks.map(toReleaseTasks('post'));
  const tasksInRunOrder = [...prereleaseTasks, [coreReleaseTask], ...postreleaseTasks];

  return {
    /**
     * A 1-D array of all prerelease {@link ReleaseTask}s.
     */
    prereleaseTasks: prereleaseTasks.flat(nestedTaskDepth),
    /**
     * A 1-D array of all postrelease {@link ReleaseTask}s.
     */
    postreleaseTasks: postreleaseTasks.flat(nestedTaskDepth),
    /**
     * The prerelease and postrelease {@link ReleaseTask}s organized in run
     * order. Tasks that can be run concurrently will be grouped into arrays.
     */
    tasksInRunOrder
  };

  function toReleaseTasks(type: ReleaseTask['type']) {
    return self;

    function self(
      taskOrTasks: ProtoPrereleaseTask | ProtoPostreleaseTask | ProtoCoreReleaseTask
    ): ReleaseTask;
    function self(
      taskOrTasks: ProtoPrereleaseTask[] | ProtoPostreleaseTask[]
    ): ReleaseTask[];
    function self(
      taskOrTasks:
        | ProtoPrereleaseTask
        | ProtoPostreleaseTask
        | ProtoCoreReleaseTask
        | ProtoPrereleaseTask[]
        | ProtoPostreleaseTask[]
    ): ReleaseTask | ReleaseTask[] {
      if (Array.isArray(taskOrTasks)) {
        const tasks = taskOrTasks;
        return tasks.map((task) => self(task));
      }

      const task = taskOrTasks;
      const runTask = task.run
        ? (function (argv, { log, debug }) {
            // ! Guarantees projectMetadata is defined
            hardAssert(executionContext.projectMetadata, ErrorMessage.GuruMeditation());
            return task.run!(executionContext, argv, {
              self: releaseTask,
              log,
              debug
            });
          } as ReleaseTask['run'])
        : undefined;

      const releaseTask: ReleaseTask =
        type === 'release'
          ? {
              io: 'pipe',
              ...task,
              skippable: false,
              allowMissingNpmScripts: false,
              type,
              id: ++count,
              npmScripts: [],
              run: runTask
            }
          : {
              io: 'pipe',
              skippable: false,
              allowMissingNpmScripts: false,
              npmScripts: [],
              ...task,
              type,
              id: ++count,
              run: runTask
            };

      return releaseTask;
    }
  }
}

function printTasks(tasksInRunOrder: ReleaseTask[][]): string {
  let tasksString = '';

  for (const [nestingLevel, taskGroup] of tasksInRunOrder.entries()) {
    for (const {
      helpDescription: description,
      id,
      npmScripts,
      skippable,
      type,
      emoji = type === 'release' ? releaseEmoji : ''
    } of taskGroup) {
      tasksString +=
        SINGLE_SPACE.repeat(nestingLevel) +
        `${id}. ${emoji ? `${emoji} ` : ''}${skippable ? `[${type}release task] ` : ''}${
          npmScripts.length
            ? `[${npmScripts.map((script) => 'npm run ' + script).join(' or ')}] `
            : ''
        }${description}\n`;
    }
  }

  return tasksString.trimEnd();
}

const protoPrereleaseTasks: ProtoPrereleaseTask[][] = [
  [
    {
      skippable: false,
      emoji: '🚨',
      actionDescription: 'Validating environment variables',
      helpDescription: 'Validate environment variables',
      async run({ projectMetadata }, { force }, { self: { id }, log }) {
        loadDotEnv(expectedEnvVariables, {
          log,
          dotEnvFilePaths: getRelevantDotEnvFilePaths(projectMetadata),
          force,
          failInstructions: `Skip this check with \`--skip-task ${id}\` or --force`,
          onFail() {
            softAssert(ErrorMessage.ReleaseEnvironmentValidationFailed());
          }
        });
      }
    },
    {
      skippable: true,
      emoji: '🚨',
      actionDescription: 'Validating repository state',
      helpDescription: 'Validate repository state',
      async run(_, { force }, { self: { id }, log: _log }) {
        const problems: string[] = [];
        const failLogger = _log.extend('repo-valid');

        const { isDirty } = await determineRepoWorkingTreeDirty();

        if (isDirty) {
          problems.push(ErrorMessage.ActionAttemptedWithADirtyRepo('release'));
        }

        problems.forEach((problem, index) => {
          failLogger[force ? 'warn' : 'error'](
            [LogTag.IF_NOT_SILENCED],
            'Problem %O: ' + problem,
            index + 1
          );
        });

        if (!force && problems.length) {
          failLogger.message(
            `Validation failed: %O problem${problems.length === 1 ? '' : 's'} detected. Skip this check with \`--skip-task ${id}\` or --force`,
            problems.length
          );

          softAssert(ErrorMessage.ReleaseRepositoryStateValidationFailed());
        }
      }
    }
  ],
  [
    {
      skippable: true,
      emoji: '🏗️',
      actionDescription: 'Rebuilding node_modules based on package-lock.json',
      helpDescription: 'npm ci (only if `--ci=true`)',
      async run(_, { ci, dryRun, quiet: isQuieted, silent: isSilenced }, { log }) {
        if (ci && !dryRun) {
          await attemptToRunCommand('npm', ['ci'], {
            env: { HUSKY: '0' },
            scriptName: 'npm ci',
            logger: log,
            stdout: isQuieted ? 'ignore' : 'inherit',
            stderr: isSilenced ? 'ignore' : 'inherit',
            reject: true
          });
        } else {
          log.message(
            [LogTag.IF_NOT_SILENCED],
            `✖️ Task execution skipped due to ${
              dryRun
                ? `--dry-run (${
                    ci
                      ? 'but would have run due to --ci'
                      : 'would have been skipped anyway due to --no-ci'
                  })`
                : '--no-ci'
            }`
          );
        }
      }
    }
  ],
  [
    {
      skippable: true,
      emoji: '✍🏿',
      npmScripts: ['format'],
      helpDescription: 'symbiote format'
    }
  ],
  [
    {
      skippable: true,
      emoji: '🔍',
      npmScripts: ['lint:package', 'lint'],
      helpDescription: 'symbiote lint --scope=this-package'
    },
    {
      skippable: true,
      emoji: '📦',
      npmScripts: ['build:dist', 'build'],
      helpDescription: 'symbiote build distributables'
    },
    {
      skippable: true,
      emoji: '📚',
      npmScripts: ['build:docs'],
      helpDescription: 'symbiote build documentation'
    }
  ],
  [
    {
      skippable: true,
      emoji: '🧪',
      io: 'inherit',
      npmScripts: ['test:package:all', 'test'],
      helpDescription: 'symbiote test --scope=this-package --coverage'
    },
    // * The other skippable tasks before this task (above) are skipped by Turbo
    {
      skippable: true,
      emoji: '🧹',
      actionDescription: 'Pulling latest versions of intra-project package dependencies',
      helpDescription: 'symbiote project renovate --scope=this-package --sync-deps',
      async run(globalExecutionContext, argv, { debug }) {
        debug(`renovating this package (sync-deps only) (calling out to sub-command)`);

        const renovateHandler = await getInvocableExtendedHandler<
          RenovateCliArguments,
          GlobalExecutionContext
        >(renovate, globalExecutionContext);

        await renovateHandler({
          ...argv,
          $0: 'renovate',
          _: [],
          env: [],
          scope: DefaultGlobalScope.ThisPackage,

          synchronizeInterdependencies: true,

          githubPauseRulesets: false,
          githubRenameRoot: false,
          githubCloneRemoteWiki: false,
          githubDeleteAllReleases: false,
          githubReconfigureRepo: false,
          githubKillMaster: false,
          generateAliasTags: false,
          regenerateAssets: false,
          fullDeprecate: false,
          fullUndeprecate: false,
          updateDependencies: false,

          runToCompletion: true,
          parallel: false,
          force: true,
          silent: true,
          quiet: true,
          hush: true
        });

        debug('sub-command completed successfully');
      }
    }
  ],
  [
    {
      skippable: true,
      emoji: '🎛️',
      actionDescription: 'Changelog will be rebuilt',
      helpDescription: 'Run @-xun/changelog (rebuild CHANGELOG.md)',
      async run() {
        process.env.SYMBIOTE_RELEASE_REBUILD_CHANGELOG = 'true';
      }
    }
  ]
];

const protoReleaseTask: ProtoCoreReleaseTask = {
  actionDescription: 'Running @-xun/release',
  helpDescription: 'Run @-xun/release (publish new release)',
  async run(
    { projectMetadata },
    { dryRun, ci, quiet: isQuieted, silent: isSilenced },
    { debug, log }
  ) {
    const {
      rootPackage: { root: projectRoot },
      cwdPackage: {
        json: { name: cwdPackageName }
      }
    } = projectMetadata;

    hardAssert(cwdPackageName, ErrorMessage.GuruMeditation());

    const { NODE_OPTIONS } = process.env;
    const SYMBIOTE_SPECIAL_INITIAL_COMMIT =
      await getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix(
        `${cwdPackageName}@`
      );

    const { stdout: previousCommitSha } = await runNoRejectOnBadExit('git', [
      'log',
      '-1',
      '--pretty=format:%H'
    ]);

    debug('previousCommitSha: %O', previousCommitSha);

    const { exitCode } = await runNoRejectOnBadExit(
      'npx',
      [
        '--no-install',
        'semantic-release',
        ci ? '--ci' : '--no-ci',
        ...(dryRun ? ['--dry-run'] : []),
        '--extends',
        `${projectRoot}/${xreleaseConfigProjectBase}`
      ],
      {
        env: {
          NODE_OPTIONS: `${NODE_OPTIONS ? `${NODE_OPTIONS} ` : ''}--require @-xun/symbiote/assets/conventional.config.cjs`,
          SYMBIOTE_SPECIAL_INITIAL_COMMIT,
          HUSKY: '0'
          // ? process.env is already automatically included
        },
        stdout: isQuieted ? 'ignore' : 'inherit',
        stderr: isSilenced ? 'ignore' : 'inherit'
      }
    );

    const { stdout: currentCommitSha } = await runNoRejectOnBadExit('git', [
      'log',
      '-1',
      '--pretty=format:%H'
    ]);

    debug('currentCommitSha: %O', currentCommitSha);

    if (exitCode === 0) {
      if (previousCommitSha === currentCommitSha) {
        log.warn(
          [LogTag.IF_NOT_SILENCED],
          '@-xun/release exited cleanly but NO new version release was detected!'
        );

        await rollbackRepositoryToHead();

        // ? Will be handled specially further up the stack
        throw new Error('$gracefulExit', { cause: $gracefulExit });
      } else {
        log([LogTag.IF_NOT_HUSHED], 'New version release detected 🧑🏿‍🚀');
      }
    } else {
      log.error(
        [LogTag.IF_NOT_SILENCED],
        '⚠️🚧 @-xun/release exited with a non-zero exit code: %O 😵',
        exitCode
      );

      await rollbackRepositoryToHead();

      if (previousCommitSha !== currentCommitSha) {
        if (dryRun) {
          log
            .extend('UNDEFINED BEHAVIOR')
            .warn(
              [LogTag.IF_NOT_SILENCED],
              '--dry-run detected but a new commit was created?'
            );
        }

        log.error(
          [LogTag.IF_NOT_SILENCED],
          '❗POTENTIALLY bad commit %O detected!',
          currentCommitSha
        );

        log.warn(
          [LogTag.IF_NOT_SILENCED],
          'Rolling repository back further to %O',
          previousCommitSha
        );

        const tagsToDelete = await run('git', [
          'tag',
          '--points-at',
          currentCommitSha
          // TODO: replace with "lines" when fixed in upstream @-xun/run
        ]).then(({ stdout }) => stdout.split('\n').filter(Boolean));

        debug('tagsToDelete: %O', tagsToDelete);

        for (const tagToDelete of tagsToDelete) {
          // eslint-disable-next-line no-await-in-loop
          const { exitCode: gitTagDeleteExitCode } = await runNoRejectOnBadExit('git', [
            'tag',
            '--delete',
            tagToDelete
          ]);

          log.warn(
            [LogTag.IF_NOT_SILENCED],
            `${gitTagDeleteExitCode === 0 ? 'Deleted' : 'FAILED to delete'} local tag %O`,
            tagToDelete
          );
        }

        log.warn(
          [LogTag.IF_NOT_SILENCED],
          'Executing hard reset to %O',
          previousCommitSha
        );

        await run('git', ['reset', '--hard', previousCommitSha], {
          stdout: isQuieted ? 'ignore' : 'inherit',
          stderr: isSilenced ? 'ignore' : 'inherit'
        });

        log([LogTag.IF_NOT_SILENCED], 'Local repository was rolled back successfully');

        log.newline([LogTag.IF_NOT_SILENCED]);

        log.message(
          [LogTag.IF_NOT_SILENCED],
          '⚠️🚧 Depending on how exactly the release failed, you must now do one of the following:\n\n1. If the release failed AFTER the package was published SUCCESSFULLY, then the failure was not so catastrophic. Run `git fetch --all && git pull --rebase` to catch this repo up to remote.\n\n2. If the release failed BEFORE the package could be published, or the publish step itself failed, then it is very likely you need to rollback the remote repository by hand. Run `git push --force` to rollback the remote repository. You may need to disable any protective rulesets. Finally, run `git push --delete your-remote your-tag` for each deleted local tag and relevant remote to complete the recovery process.'
        );

        log.newline([LogTag.IF_NOT_SILENCED]);
      }

      // ? Will be wrapped in CliError further up the stack
      throw new Error(ErrorMessage.ReleaseFailedRepoRolledBack());
    }

    async function rollbackRepositoryToHead() {
      log.warn(
        [LogTag.IF_NOT_SILENCED],
        'Rolling repository back to %O (HEAD)',
        currentCommitSha
      );

      if (dryRun) {
        log.message(
          [LogTag.IF_NOT_SILENCED],
          '(no rollback was performed due to --dry-run)',
          currentCommitSha
        );
      } else {
        await run('git', ['reset', '--hard', 'HEAD'], {
          stdout: isQuieted ? 'ignore' : 'inherit',
          stderr: isSilenced ? 'ignore' : 'inherit'
        });

        await run('git', ['clean', '-df'], {
          stdout: isQuieted ? 'ignore' : 'inherit',
          stderr: isSilenced ? 'ignore' : 'inherit'
        });
      }

      log(
        [LogTag.IF_NOT_SILENCED],
        'Local repository was rolled back to HEAD successfully'
      );
    }
  }
};

const protoPostreleaseTasks: ProtoPostreleaseTask[][] = [
  [
    {
      skippable: true,
      emoji: '📡',
      actionDescription: 'Uploading test coverage data to Codecov',
      helpDescription: 'Upload test coverage data to Codecov (if appropriate)',
      async run(
        {
          projectMetadata: {
            cwdPackage,
            rootPackage: { root: projectRoot }
          }
        },
        { dryRun, force, quiet: isQuieted, silent: isSilenced },
        { log, debug }
      ) {
        const { root: packageRoot } = cwdPackage;

        const codecovConfigPath = toPath(projectRoot, codecovConfigProjectBase);
        debug('codecovConfigPath: %O', codecovConfigPath);

        if (!(await isAccessible(codecovConfigPath, { useCached: true }))) {
          log.message(
            [LogTag.IF_NOT_SILENCED],
            '✖️ Task execution skipped: no codecov configuration file found at %O',
            codecovConfigPath
          );
        } else {
          const { exitCode } = await runNoRejectOnBadExit('codecov', ['--help']);

          const isMissingCodecov = exitCode !== 0;
          const codecovDownloadDir = toPath(tmpdir(), 'symbiote-codecov-tmp');
          const codecovDownloadedFile = toPath(codecovDownloadDir, 'codecov');

          const codecovCommand = isMissingCodecov ? codecovDownloadedFile : 'codecov';

          debug('isMissingCodecov: %O', isMissingCodecov);
          debug('codecovDownloadUrl: %O', codecovDownloadUrl);
          debug('codecovDownloadDir: %O', codecovDownloadDir);
          debug('codecovDownloadedFile: %O', codecovDownloadedFile);
          debug('codecovCommand: %O', codecovCommand);

          if (isMissingCodecov) {
            log.message([LogTag.IF_NOT_HUSHED], 'No "codecov" executable detected!');

            softAssert(
              process.platform === 'linux',
              ErrorMessage.CodecovDownloaderOnlySupportsLinux()
            );

            if (
              await isAccessible(codecovDownloadedFile, {
                useCached: false,
                fsConstant: fsConstants.X_OK
              })
            ) {
              log(
                [LogTag.IF_NOT_HUSHED],
                'Reusing "codecov" executable from a previous installation at %O',
                codecovDownloadedFile
              );
            } else {
              log(
                [LogTag.IF_NOT_HUSHED],
                'Downloading %O ==> %O',
                codecovDownloadUrl,
                codecovDownloadedFile
              );

              let res: Response | undefined;

              try {
                debug('making codecov download directory at %O:', codecovDownloadDir);
                await mkdir(codecovDownloadDir, { recursive: true });

                for (let attempt = 1; attempt <= maxCodecovDownloadRetries; attempt++) {
                  try {
                    debug(
                      '(attempt %O) fetching codecov binary from %O',
                      attempt,
                      codecovDownloadUrl
                    );

                    const abortController = new AbortController();

                    void delay(codecovDownloadTimeoutSeconds * 1000, undefined, {
                      ref: true
                    }).then(() => {
                      debug('attempt %O timed out', attempt);
                      abortController.abort();
                    });

                    // eslint-disable-next-line no-await-in-loop
                    res = await fetch(codecovDownloadUrl, {
                      signal: abortController.signal
                    });

                    debug.message('attempt %O succeeded!');
                  } catch (error) {
                    debug.warn(
                      'fetch attempt %O/%O failed: %O',
                      attempt,
                      maxCodecovDownloadRetries,
                      error
                    );

                    if (attempt === maxCodecovDownloadRetries) {
                      log.error(
                        [LogTag.IF_NOT_SILENCED],
                        `Download attempt %O/%O timed out after ${codecovDownloadTimeoutSeconds} seconds`,
                        attempt,
                        maxCodecovDownloadRetries
                      );
                    } else {
                      debug.message('waiting 1000ms before trying again');
                      // eslint-disable-next-line no-await-in-loop
                      await delay(1000);
                    }

                    res = undefined;
                  }
                }

                softAssert(
                  res?.ok && res.body,
                  ErrorMessage.CodecovRetrievalFailed(codecovDownloadUrl)
                );

                debug('writing out resultant binary to %O', codecovDownloadedFile);
                await writeFile(
                  codecovDownloadedFile,
                  res.body as ReadableStream<Uint8Array>
                ).then(() => chmod(codecovDownloadedFile, 0o775));

                debug('ran chmod on binary (+x)');
              } catch (error) {
                debug.error(error);
                throw new CliError(ErrorMessage.FailedToInstallCodecov(), {
                  cause: error
                });
              }
            }
          }

          const { exitCode: codecovCheckExitCode } = await runNoRejectOnBadExit(
            codecovCommand,
            ['--help']
          );

          softAssert(codecovCheckExitCode === 0, ErrorMessage.FailedToInstallCodecov());

          const { stdout: currentBranch } = await run('git', [
            'branch',
            '--show-current'
          ]);

          debug('currentBranch: %O', currentBranch);
          softAssert(currentBranch, ErrorMessage.ReleaseRepositoryNoCurrentBranch());

          // TODO: a new project-wide coverage tag; probably not so useful here:
          // TODO: project.${currentBranch}

          const flag = `package.${currentBranch}_${isRootPackage(cwdPackage) ? 'root' : cwdPackage.id}`;

          debug(`computed flag (before ${maxFlagSize}-character truncation): %O`, flag);

          log(
            [LogTag.IF_NOT_HUSHED],
            'Running codecov executable with coverage flag: %O',
            flag
          );

          await attemptToRunCommand(
            codecovCommand,
            [
              'upload-process',
              '--fail-on-error',
              '--flag',
              flag,
              '--branch',
              currentBranch,
              '--coverage-files-search-root-folder',
              toPath(packageRoot, directoryCoveragePackageBase),
              ...(dryRun ? ['--dry-run'] : []),
              ...(force ? ['--handle-no-reports-found'] : [])
            ],
            {
              logger: log,
              scriptName: 'codecov',
              stdout: isQuieted ? 'ignore' : 'inherit',
              stderr: isSilenced ? 'ignore' : 'inherit',
              reject: true
            }
          );
        }
      }
    },
    {
      skippable: true,
      emoji: '✈️',
      actionDescription: 'Deploying distributables to appropriate remote system',
      helpDescription: 'Deploy to remote systems (if appropriate)',
      npmScripts: ['deploy'],
      allowMissingNpmScripts: true
    }
  ]
];
