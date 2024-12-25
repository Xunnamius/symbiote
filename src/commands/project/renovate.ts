import { mkdir, rename as renamePath, rm } from 'node:fs/promises';
import path from 'node:path';

import { run } from '@-xun/run';
import { CliError, type ChildConfiguration } from '@black-flag/core';
import escapeStringRegexp from 'escape-string-regexp~4';
import libsodium from 'libsodium-wrappers';
import getInObject from 'lodash.get';
import semver from 'semver';

import {
  getInvocableExtendedHandler,
  type AsStrictExecutionContext,
  type BfeBuilderObject,
  type BfeBuilderObjectValue,
  type BfeCheckFunction,
  type BfeStrictArguments
} from 'multiverse+bfe';

import { hardAssert, softAssert } from 'multiverse+cli-utils:error.ts';

import {
  logStartTime,
  LogTag,
  standardSuccessMessage
} from 'multiverse+cli-utils:logging.ts';

import { scriptBasename } from 'multiverse+cli-utils:util.ts';
import { ProjectAttribute, type Package } from 'multiverse+project-utils:analyze.ts';

import {
  getCurrentWorkingDirectory,
  isAccessible,
  packageJsonConfigPackageBase,
  toAbsolutePath,
  toDirname,
  toPath,
  toRelativePath
} from 'multiverse+project-utils:fs.ts';

import {
  SHORT_TAB,
  SINGLE_SPACE,
  type ExtendedDebugger,
  type ExtendedLogger
} from 'multiverse+rejoinder';

import { version as packageVersion } from 'rootverse:package.json';

import {
  deriveGitHubUrl,
  deriveJsonRepositoryValue,
  parsePackageJsonRepositoryIntoOwnerAndRepo
} from 'universe:assets/transformers/_package.json.ts';

import {
  $delete,
  assetPresets,
  gatherAssetsFromAllTransformers,
  type AssetPreset,
  type IncomingTransformerContext
} from 'universe:assets.ts';

import {
  default as format,
  type CustomCliArguments as FormatCliArguments
} from 'universe:commands/format.ts';

import {
  $executionContext,
  DefaultGlobalScope,
  DefaultGlobalScope as ProjectRenovateScope,
  type GlobalCliArguments,
  type GlobalExecutionContext
} from 'universe:configure.ts';

import { ErrorMessage } from 'universe:error.ts';

import {
  determineRepoWorkingTreeDirty,
  getRelevantDotEnvFilePaths,
  importAdditionalRawAliasMappings,
  loadDotEnv,
  magicStringReplacerRegionEnd,
  magicStringReplacerRegionStart,
  runGlobalPreChecks,
  stringifyJson,
  withGlobalBuilder,
  withGlobalUsage,
  writeFile
} from 'universe:util.ts';

import type { RestEndpointMethodTypes } from '@octokit/rest' with { 'resolution-mode': 'import' };
import type { CamelCasedProperties, KeysOfUnion, Merge } from 'type-fest';

type NewRuleset = Merge<
  RestEndpointMethodTypes['repos']['createRepoRuleset']['parameters'],
  { owner?: undefined; repo?: undefined }
>;

type ExistingRuleset =
  RestEndpointMethodTypes['repos']['getRepoRuleset']['response']['data'];

/**
 * The number of minutes the "pause ruleset" renovation will "pause" for
 */
const RULESET_PROTECTION_PAUSE_MINUTES = 5;

const defaultDescriptionEmoji = '⚡';
const homepagePrefix = 'https://npm.im/';

const standardProtectRuleset: NewRuleset = {
  name: 'standard-protect',
  target: 'branch',
  enforcement: 'active',
  conditions: {
    ref_name: {
      // * https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository#using-fnmatch-syntax
      include: [
        // ? Protect the default branch
        '~DEFAULT_BRANCH',
        // ? Protect any maintenance branches
        'refs/heads/**.x'
      ],
      // ! The types are lying; this is required!
      exclude: []
    }
  },
  rules: [
    { type: 'deletion' },
    { type: 'non_fast_forward' },
    { type: 'required_signatures' }
  ],
  bypass_actors: []
};

const canaryProtectRuleset: NewRuleset = {
  name: 'canary-protect',
  target: 'branch',
  enforcement: 'active',
  conditions: {
    ref_name: {
      // * https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository#using-fnmatch-syntax
      include: [
        // ? Protect the canary branch
        'refs/heads/canary'
      ],
      // ! The types are lying; this is required!
      exclude: []
    }
  },
  rules: [
    { type: 'deletion' },
    { type: 'non_fast_forward' },
    { type: 'required_signatures' }
  ],
  bypass_actors: []
};

const whitespaceRegExp = /\s/;

/**
 * @see {@link ProjectRenovateScope}
 */
export const projectRenovateScopes = Object.values(ProjectRenovateScope);

// TODO: unify task runners in this command, in release, and elsewhere into
// TODO: src/task-runner.ts

/**
 * The context passed to each individual task.
 */
export type RenovationTaskContext = {
  self: RenovationTask;
  log: ExtendedLogger;
  debug: ExtendedDebugger;
};

/**
 * @internal
 */
export type RenovationTaskArgv = BfeStrictArguments<
  CustomCliArguments,
  GlobalExecutionContext
>;

/**
 * @internal
 */
export type RenovationTask = Omit<
  BfeBuilderObjectValue<Record<string, unknown>, GlobalExecutionContext>,
  'alias' | 'demandThisOptionOr'
> & {
  /**
   * The name of the task.
   */
  taskName: string;
  /**
   * The alternative names of the task.
   *
   * @see {@link BfeBuilderObjectValue.alias}
   */
  taskAliases: string[];
  /**
   * A symbol that will be placed before symbiote output text concerning this
   * task.
   */
  emoji: string;
  /**
   * The description reported to the user when the task is run.
   *
   * @default `Running task ${taskName}`
   */
  actionDescription: string;
  /**
   * The description reported to the user when `--help` is called (via usage).
   */
  longHelpDescription: string;
  /**
   * The description reported to the user when `--help` is called (via option).
   */
  shortHelpDescription: string;
  /**
   * If `true`, --force must be given on the command line alongside this task.
   */
  requiresForce: boolean;
  /**
   * Which {@link ProjectRenovateScope}s are allowed when attempting this
   * renovation.
   */
  supportedScopes: ProjectRenovateScope[];
  /**
   * Suboptions of this task are only relevant when this task's flag is given
   * on the CLI.
   */
  subOptions: Record<
    string,
    Omit<
      BfeBuilderObjectValue<Record<string, unknown>, GlobalExecutionContext>,
      'requires' | `demand${string}`
    > & {
      requires?: Extract<
        BfeBuilderObjectValue<
          Record<string, unknown>,
          GlobalExecutionContext
        >['requires'],
        Record<string, unknown>
      >;
    }
  >;
  /**
   * A function called when the task is triggered.
   */
  run: (argv: unknown, taskContextPartial: RenovationTaskContext) => Promise<void>;
};

export type CustomCliArguments = GlobalCliArguments & {
  force: boolean;
  parallel: boolean;
  runToCompletion: boolean;
} & CamelCasedProperties<
    Record<keyof typeof renovationTasks, boolean> &
      Partial<
        Record<
          KeysOfUnion<
            (typeof renovationTasks)[keyof typeof renovationTasks]['subOptions']
          >,
          unknown
        >
      >
  >;

export default function command(
  executionContext: AsStrictExecutionContext<GlobalExecutionContext>
) {
  const { log, debug_, state, projectMetadata: projectMetadata_ } = executionContext;

  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    scope: {
      choices: projectRenovateScopes,
      default: ProjectRenovateScope.Unlimited,
      description: 'Whether to renovate the current package or the entire project'
    },
    force: {
      boolean: true,
      description: 'Disregard all safety checks',
      default: false
    },
    parallel: {
      boolean: true,
      default: true,
      describe: 'Run renovation tasks concurrently'
    },
    'run-to-completion': {
      boolean: true,
      description: 'Do not exit until all tasks have finished running',
      default: true
    },
    ...renovationTasksToBlackFlagOptions(debug_.extend('builder'))
  });

  return {
    builder,
    description: 'Bring a project into compliance with latest best practices',
    usage: withGlobalUsage(
      `$1 via the execution of one or more renovation "tasks". A task is executed by specifying its renovation "task flag", e.g. --an-example-task-flag. All available task flags are enumerated in detail at the end of this help text.

This command must be invoked with at least one task flag. Tasks are run concurrently unless --no-parallel is given, and are all run to completion even if one of the tasks fails unless --run-to-completion=false is given.

Environment variables are loaded into process.env from the following file(s), if they exist and depending on scope, with the variables in latter files overwriting those in the former:

${SHORT_TAB}- ${getRelevantDotEnvFilePaths(projectMetadata_).join(`\n${SHORT_TAB}- `)}

When --scope=${ProjectRenovateScope.Unlimited}, package-specific .env and .env.default files are ignored.

Renovations are performed on the entire project by default, and typically involve overwriting/deleting obsolete versions of certain configuration files, but several renovation tasks can be limited to the current package via --scope=${ProjectRenovateScope.ThisPackage}.

If this command is invoked in a repository with an unclean working directory, it will fail unless --force is given. Similarly, tasks with potentially destructive or permanent consequences must be manually authorized via --force. That said, all renovation tasks are idempotent: running the same renovations back-to-back on an otherwise-unchanged project/package is essentially a no-op.

Currently, this command only functions with origin repositories hosted on GitHub.

${printRenovationTasks()}`,
      { appendPeriod: false }
    ),
    handler: withGlobalHandler(async function (argv) {
      const { $0: scriptFullName, scope, parallel, force, runToCompletion } = argv;

      const genericLogger = log.extend(scriptBasename(scriptFullName));
      const debug = debug_.extend('handler');

      debug('entered handler');

      const { projectMetadata } = await runGlobalPreChecks({
        debug_,
        projectMetadata_,
        scope
      });

      const { startTime } = state;

      logStartTime({ log, startTime });

      genericLogger(
        [LogTag.IF_NOT_QUIETED],
        `Renovating ${scope === ProjectRenovateScope.ThisPackage ? projectMetadata.cwdPackage.json.name : 'the entire project'}...`
      );

      genericLogger.newline([LogTag.IF_NOT_HUSHED]);

      debug('argv: %O', argv);

      const { isDirty } = await determineRepoWorkingTreeDirty();

      softAssert(
        !isDirty || force,
        ErrorMessage.ActionAttemptedWithADirtyRepo('renovation')
      );

      debug('processing tasks');

      // TODO: generalize this task algo along with what's in renovate and init

      try {
        const renovationTasksEntries = Object.entries(renovationTasks) as [
          keyof CamelCasedProperties<typeof renovationTasks>,
          Omit<RenovationTask, 'taskName'>
        ][];

        debug(
          'processing %O renovation tasks: %O',
          renovationTasksEntries.length,
          renovationTasks
        );

        const taskPromiseFunctions = renovationTasksEntries
          .map(([taskName, task]) => {
            if (!argv[taskName]) {
              return undefined;
            }

            return async function () {
              const { actionDescription, emoji, run: taskRunner } = task;

              const dbg = debug.extend(taskName);
              const taskLogger = genericLogger.extend(taskName);

              dbg('preparing to run task %O', taskName);
              taskLogger([LogTag.IF_NOT_HUSHED], `${emoji} ${actionDescription}`);

              dbg('entering runner function');

              await taskRunner(argv, {
                log: taskLogger,
                debug: dbg,
                self: task as unknown as RenovationTask
              });

              taskLogger([LogTag.IF_NOT_HUSHED], '✅');
            };
          })
          .filter((fn) => !!fn);

        debug(
          'running %O/%O renovation tasks %O',
          taskPromiseFunctions.length,
          renovationTasksEntries.length,
          parallel ? 'concurrently' : 'serially'
        );

        debug('waiting for renovation tasks to finish running...');

        // TODO: This task runner logic appears in at least four places in this
        // TODO: code base alone. We need to make this into a package :)

        const errors: unknown[] = [];

        if (parallel) {
          const promises = taskPromiseFunctions.map((p) => p());

          if (runToCompletion) {
            debug.message(
              'renovation tasks will run to completion even if an error occurs'
            );

            errors.push(
              ...(await Promise.allSettled(promises))
                .map((result) =>
                  result.status === 'rejected' ? result.reason : undefined
                )
                .filter((r) => !!r)
            );
          } else {
            try {
              await Promise.all(promises);
            } catch (error) {
              throw new CliError(ErrorMessage.RenovationRunnerExecutionFailed(), {
                cause: error
              });
            }
          }
        } else {
          for (const taskPromiseFunction of taskPromiseFunctions) {
            try {
              // eslint-disable-next-line no-await-in-loop
              await taskPromiseFunction();
            } catch (error) {
              if (runToCompletion) {
                errors.push(error);
              } else {
                throw new CliError(ErrorMessage.RenovationRunnerExecutionFailed(), {
                  cause: error
                });
              }
            }
          }
        }

        if (errors.length) {
          genericLogger.newline([LogTag.IF_NOT_SILENCED], 'alternate');

          for (const error of errors) {
            log.error(
              [LogTag.IF_NOT_SILENCED],
              'Renovation task execution error:\n%O',
              error
            );
          }

          throw new CliError(ErrorMessage.RenovationRunnerExecutionFailed());
        }
      } finally {
        genericLogger.newline([LogTag.IF_NOT_QUIETED]);
      }

      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}

function renovationTasksToBlackFlagOptions(
  debug: ExtendedDebugger
): BfeBuilderObject<CustomCliArguments, GlobalExecutionContext> {
  const renovationTaskNames = Object.keys(renovationTasks);
  return Object.fromEntries(
    Object.entries(
      renovationTasks as Record<
        keyof typeof renovationTasks,
        Omit<RenovationTask, 'taskName'>
      >
    ).flatMap(
      ([
        taskName,
        {
          subOptions,
          taskAliases,
          shortHelpDescription,
          emoji,
          supportedScopes,
          requiresForce,
          longHelpDescription: _,
          run: __,
          actionDescription: ___,
          ...blackFlagOptions
        }
      ]) => {
        return [
          [
            taskName,
            {
              boolean: true,
              description: `${emoji} ${shortHelpDescription}`,
              default: false,
              ...blackFlagOptions,
              alias: taskAliases,
              demandThisOptionOr: renovationTaskNames,
              check: [
                isUsingSupportedScope(taskName, supportedScopes, debug),
                isUsingForceIfRequired(taskName, requiresForce, debug),
                ...[blackFlagOptions.check || []].flat()
              ]
            }
          ],
          ...Object.entries(subOptions).map(([optionName, subOption]) => [
            optionName,
            {
              group: 'Task Options:',
              ...subOption,
              requires: { ...subOption.requires, [taskName]: true }
            }
          ])
        ];
      }
    )
  );
}

function isUsingSupportedScope(
  taskName: string,
  supportedScopes: ProjectRenovateScope[],
  checkDebug: ExtendedDebugger
): BfeCheckFunction<CustomCliArguments, GlobalExecutionContext> {
  return function (currentArgumentValue, { scope }) {
    checkDebug('taskName: %O', taskName);
    checkDebug('currentArgumentValue: %O', currentArgumentValue);
    checkDebug('scope: %O', scope);
    checkDebug('supportedScopes: %O', supportedScopes);

    return (
      !currentArgumentValue ||
      supportedScopes.includes(scope) ||
      ErrorMessage.UnsupportedRenovationScope(taskName, scope, supportedScopes)
    );
  };
}

function isUsingForceIfRequired(
  taskName: string,
  requiresForce: boolean,
  checkDebug: ExtendedDebugger
): BfeCheckFunction<CustomCliArguments, GlobalExecutionContext> {
  return function (currentArgumentValue, { force }) {
    checkDebug('taskName: %O', taskName);
    checkDebug('currentArgumentValue: %O', currentArgumentValue);
    checkDebug('force: %O', force);
    checkDebug('requiresForce: %O', requiresForce);

    return (
      !currentArgumentValue ||
      !requiresForce ||
      force ||
      ErrorMessage.DangerousRenovationRequiresForce(taskName)
    );
  };
}

function printRenovationTasks() {
  let tasksString = '';

  for (const [
    taskName,
    {
      emoji,
      requiresForce,
      longHelpDescription,
      subOptions,
      taskAliases,
      supportedScopes
    }
  ] of Object.entries(renovationTasks)) {
    const subOptionNames = Object.keys(subOptions);
    hardAssert(supportedScopes.length, ErrorMessage.GuruMeditation());

    tasksString += `\n\n=====\n\nRenovation task:${SINGLE_SPACE} --${taskName} ${emoji}${requiresForce ? ` (requires --force)` : ''}${
      taskAliases.length
        ? `\nTask aliases:${SINGLE_SPACE.repeat(4)} --${taskAliases.join(', --')}`
        : ''
    }${
      subOptionNames.length
        ? `\nRelated options:${SINGLE_SPACE} --${subOptionNames.join(', --')}`
        : ''
    }
Supported scopes: ${supportedScopes.join(', ')}

${longHelpDescription.trim()}`;
  }

  return `====================\n\nAVAILABLE RENOVATION TASKS\n\n${tasksString.trim()}\n\n====================`;
}

function checkRuntimeIsReadyForGithub(argv: RenovationTaskArgv, log: ExtendedLogger) {
  const {
    scope,
    force,
    [$executionContext]: { projectMetadata }
  } = argv;

  loadDotEnv(['GITHUB_TOKEN'], {
    log,
    dotEnvFilePaths: getRelevantDotEnvFilePaths(
      projectMetadata,
      scope === ProjectRenovateScope.Unlimited ? 'project-only' : 'both'
    ),
    force,
    failInstructions: 'Skip this check with --force',
    onFail() {
      softAssert(ErrorMessage.RenovateEnvironmentValidationFailed());
    }
  });
}

function checkRuntimeIsReadyForNpm(argv: RenovationTaskArgv, log: ExtendedLogger) {
  const {
    scope,
    force,
    [$executionContext]: { projectMetadata }
  } = argv;

  loadDotEnv(['NPM_TOKEN'], {
    log,
    dotEnvFilePaths: getRelevantDotEnvFilePaths(
      projectMetadata,
      scope === ProjectRenovateScope.Unlimited ? 'project-only' : 'both'
    ),
    force,
    failInstructions: 'Skip this check with --force',
    onFail() {
      softAssert(ErrorMessage.RenovateEnvironmentValidationFailed());
    }
  });
}

async function makeOctokit({
  debug,
  log
}: {
  debug: ExtendedDebugger;
  log: ExtendedLogger;
}) {
  const { Octokit } = await import('@octokit/rest');
  const { retry } = await import('@octokit/plugin-retry');
  const { throttling } = await import('@octokit/plugin-throttling');

  Octokit.plugin(retry, throttling);
  const ghLog = log.extend('gh');

  return new Octokit({
    userAgent: `Xunnamius/symbiote@${packageVersion}`,
    auth: process.env.GITHUB_TOKEN,
    log: {
      debug: debug.extend('gh'),
      info: ghLog,
      warn: ghLog.message,
      error: ghLog.message
    },
    throttle: {
      onRateLimit: (retryAfter, options, _octokit, retryCount) => {
        debug.warn(
          `Transient rate limit detected for request ${options.method} ${options.url}`
        );

        if (retryCount < 3) {
          log.message(`Retrying after ${retryAfter} seconds...`);
          return true;
        }
      },
      onSecondaryRateLimit: (_retryAfter, options) => {
        debug.error(
          `Fatal rate limit detected for request ${options.method} ${options.url}`
        );
      }
    }
  });
}

/**
 * These renovation tasks CANNOT be run in parallel with one another since they
 * all rely on the upstream GitHub repository not changing while they operate.
 */
const conflictingUpstreamRenovationTasks = [
  'github-reconfigure-repo',
  'github-rename-root',
  'github-pause-rulesets',
  'github-delete-all-releases',
  'github-clone-remote-wiki',
  'github-kill-master',
  'generate-scoped-tags',
  'full-deprecate',
  'full-undeprecate'
].map((t) => ({ [t]: true }));

// TODO: When we settle on a unified task-runner API, these should be placed
// TODO: into their own files. Maybe they should be so placed before then...
/**
 * @see {@link RenovationTask}
 */
export const renovationTasks = {
  'github-reconfigure-repo': {
    emoji: '🎚️',
    taskAliases: [],
    actionDescription: 'Reconfiguring origin repository settings',
    shortHelpDescription: '(Re-)configure the origin GitHub repository settings',
    longHelpDescription: `This renovation will apply a standard configuration preset to the origin repository. Specifically, this renovation will:

- Update the repository's metadata
${SHORT_TAB} - Set description to package.json::description only if not already set
${SHORT_TAB}${SHORT_TAB} - With default emoji prefix: ${defaultDescriptionEmoji}
${SHORT_TAB} - Set homepage to "${homepagePrefix}pkg-name" only if not already set
${SHORT_TAB} - Enable ambient repository-wide secret scanning
${SHORT_TAB} - Enable scanning pushes for secrets
${SHORT_TAB} - Enable issues
${SHORT_TAB} - Enable projects
${SHORT_TAB} - Enable squash merging for pull requests
${SHORT_TAB} - Disable normal merging for pull requests
${SHORT_TAB} - Enable rebase merging for pull requests
${SHORT_TAB} - Disable branch deletion on successful pull request merge
${SHORT_TAB} - Enable suggesting forced-synchronization of pull request branches
${SHORT_TAB} - Set topics to lowercased package.json::keywords
- Set the repository to "starred" by the current user
- Set the repository to "watched" (via "all activity") by the current user
- Create/enable the "standard-protect" and "canary-protect" rulesets
${SHORT_TAB} - If the rulesets already exist and --force was given, they're deleted, recreated, then enabled
${SHORT_TAB} - If the rulesets already exist and --force wasn't given, they're enabled
${SHORT_TAB} - A warning is issued if any other ruleset is encountered
${SHORT_TAB} - A warning is issued if a legacy "classic branch protection" setting is encountered for well-known branches
- Upload missing GitHub Actions environment secrets (encrypted)
${SHORT_TAB} - Only secrets that do not already exist will be uploaded
${SHORT_TAB} - If --force was given, all existing secrets will be deleted before the upload
${SHORT_TAB} - Secrets will be sourced from the package and project .env files
${SHORT_TAB}${SHORT_TAB} - Empty/unset variables in .env files will be ignored

Due to the current limitations of GitHub's REST API, the following renovations are not able to be automated and should be configured manually:

* Include "Releases" and remove "Packages" and "Deployments" sidebar sections
* Enable sponsorships
* Enable repository preservation (arctic code vault)
* Enable discussions
- Enable "private vulnerability reporting"
- Enable "dependency graph"
- Enable "dependabot" (i.e. "dependabot alerts" and "dependabot security updates")

By default, this command will preserve the origin repository's pre-existing configuration. Run this command with --force to overwrite any pre-existing configuration EXCEPT the origin repository's description and homepage, which can never be overwritten by this renovation.`,
    requiresForce: false,
    conflicts: conflictingUpstreamRenovationTasks.filter(
      (o) => !o['github-reconfigure-repo']
    ),
    supportedScopes: [ProjectRenovateScope.Unlimited],
    subOptions: {},
    async run(argv_, { debug, log }) {
      const argv = argv_ as RenovationTaskArgv;
      checkRuntimeIsReadyForGithub(argv, log);

      const {
        force,
        parallel,
        [$executionContext]: { projectMetadata }
      } = argv;

      hardAssert(projectMetadata, ErrorMessage.GuruMeditation());

      const {
        // * Since "this-package" is not supported, we can't use cwdPackage
        rootPackage: { json },
        subRootPackages
      } = projectMetadata;

      const {
        description = '(package.json::description is missing)',
        keywords = [],
        name: packageName,
        homepage
      } = json;

      const logReplacement = makeReplacementLogger(log);
      const github = await makeOctokit({ debug, log });
      const ownerAndRepo = parsePackageJsonRepositoryIntoOwnerAndRepo(json);

      const { data: incomingRepoData } = await github.repos.get({ ...ownerAndRepo });

      const outgoingRepoData: NonNullable<
        RestEndpointMethodTypes['repos']['update']['parameters']
      > = {
        ...ownerAndRepo
      };

      if (!incomingRepoData.description) {
        outgoingRepoData.description = `${defaultDescriptionEmoji} ${description}`;
      }

      if (!incomingRepoData.homepage) {
        if (subRootPackages) {
          if (homepage) {
            outgoingRepoData.homepage = `${homepage}/tree/main/packages`;
          }
        } else {
          outgoingRepoData.homepage = `https://npm.im/${packageName}`;
        }
      }

      if (force || !incomingRepoData.security_and_analysis?.secret_scanning?.status) {
        outgoingRepoData.security_and_analysis ||= {};
        outgoingRepoData.security_and_analysis.secret_scanning = {
          status: 'enabled'
        };
      }

      if (
        force ||
        !incomingRepoData.security_and_analysis?.secret_scanning_push_protection?.status
      ) {
        outgoingRepoData.security_and_analysis ||= {};
        outgoingRepoData.security_and_analysis.secret_scanning_push_protection = {
          status: 'enabled'
        };
      }

      if (force) {
        outgoingRepoData.has_issues = true;
        outgoingRepoData.has_projects = true;
        outgoingRepoData.allow_squash_merge = true;
        outgoingRepoData.allow_merge_commit = false;
        outgoingRepoData.allow_rebase_merge = true;
        outgoingRepoData.allow_auto_merge = true;
        outgoingRepoData.delete_branch_on_merge = false;
        outgoingRepoData.allow_update_branch = true;
      }

      const subtaskPromiseFunctions: (() => Promise<void>)[] = [
        async function () {
          debug('outgoingRepoData: %O', outgoingRepoData);

          if (Object.keys(outgoingRepoData).length > 2) {
            await github.repos.update({
              ...outgoingRepoData
            });
          }

          logMetadataReplacement('description', 'package.json::description');
          logMetadataReplacement('homepage', 'value derived from package.json::name');
          logMetadataReplacement(
            'security_and_analysis.secret_scanning.status',
            'hardcoded value'
          );
          logMetadataReplacement(
            'security_and_analysis.secret_scanning_push_protection.status',
            'hardcoded value'
          );
          logMetadataReplacement('has_issues', 'hardcoded value');
          logMetadataReplacement('has_projects', 'hardcoded value');
          logMetadataReplacement('allow_squash_merge', 'hardcoded value');
          logMetadataReplacement('allow_merge_commit', 'hardcoded value');
          logMetadataReplacement('allow_rebase_merge', 'hardcoded value');
          logMetadataReplacement('allow_auto_merge', 'hardcoded value');
          logMetadataReplacement('delete_branch_on_merge', 'hardcoded value');
          logMetadataReplacement('allow_update_branch', 'hardcoded value');
        },
        async function () {
          const updatedValues = keywords.map((word) => word.toLocaleLowerCase());
          const shouldReplace =
            !!keywords.length && (force || !incomingRepoData.topics?.length);

          debug('updatedValues: %O', updatedValues);
          debug('shouldReplace: %O', shouldReplace);

          if (shouldReplace) {
            await github.repos.replaceAllTopics({
              ...ownerAndRepo,
              names: updatedValues
            });
          }

          logReplacement({
            wasReplaced: shouldReplace,
            replacedDescription: 'Replaced topics with package.json::keywords',
            skippedDescription: 'replacing topics',
            previousValue: JSON.stringify(incomingRepoData.topics),
            updatedValue: JSON.stringify(updatedValues)
          });
        },
        async function () {
          await github.activity.starRepoForAuthenticatedUser({ ...ownerAndRepo });

          logReplacement({
            replacedDescription:
              'This repository was starred by the authenticated user 🌟'
          });
        },
        async function () {
          await github.activity.setRepoSubscription({
            ...ownerAndRepo,
            subscribed: true
          });

          logReplacement({
            replacedDescription:
              "Updated authenticated user's subscriptions: all repository activity is now watched 👀"
          });
        },
        async function () {
          const [
            currentRulesets,
            masterProtectionRules,
            mainProtectionRules,
            canaryProtectionRules
          ] = await Promise.all([
            github.paginate(github.repos.getRepoRulesets, {
              ...ownerAndRepo
            }),
            github.repos
              .getBranchProtection({
                ...ownerAndRepo,
                branch: 'master'
              })
              .catch(rethrowErrorIfNotStatus404),
            github.repos
              .getBranchProtection({
                ...ownerAndRepo,
                branch: 'main'
              })
              .catch(rethrowErrorIfNotStatus404),
            github.repos
              .getBranchProtection({
                ...ownerAndRepo,
                branch: 'canary'
              })
              .catch(rethrowErrorIfNotStatus404)
          ]);

          debug('currentRulesets: %O', currentRulesets);
          debug('masterProtectionRules: %O', masterProtectionRules);
          debug('mainProtectionRules: %O', mainProtectionRules);
          debug('canaryProtectionRules: %O', canaryProtectionRules);

          let existingStandardRuleset = undefined as ExistingRuleset | undefined;
          let existingCanaryRuleset = undefined as ExistingRuleset | undefined;

          for (const ruleset of currentRulesets) {
            if (ruleset.name === standardProtectRuleset.name) {
              existingStandardRuleset = ruleset;
            } else if (ruleset.name === canaryProtectRuleset.name) {
              existingCanaryRuleset = ruleset;
            } else {
              log.warn(
                [LogTag.IF_NOT_QUIETED],
                ErrorMessage.RenovationRepositoryExtraneousRuleset(ruleset.name)
              );
            }
          }

          debug('existingStandardRuleset: %O', existingStandardRuleset);
          debug('existingCanaryRuleset: %O', existingCanaryRuleset);

          if (masterProtectionRules) {
            log.warn(
              ErrorMessage.RenovationEncounteredObsoleteProtectionRules('master')
            );
          }

          if (mainProtectionRules) {
            log.warn(ErrorMessage.RenovationEncounteredObsoleteProtectionRules('main'));
          }

          if (canaryProtectionRules) {
            log.warn(
              ErrorMessage.RenovationEncounteredObsoleteProtectionRules('canary')
            );
          }

          await Promise.all([
            createOrUpdateRuleset(existingStandardRuleset, standardProtectRuleset),
            createOrUpdateRuleset(existingCanaryRuleset, canaryProtectRuleset)
          ]);

          logReplacement({
            replacedDescription: 'Configured branch protection rulesets',
            previousValue: `${
              existingStandardRuleset ? existingStandardRuleset.enforcement : 'missing'
            } standard-protect, ${
              existingCanaryRuleset ? existingCanaryRuleset.enforcement : 'missing'
            } canary-protect`,
            updatedValue: 'active standard-protect, active canary-protect'
          });
        },
        async function () {
          const [
            {
              data: { secrets: existingSecrets }
            },
            {
              data: { key_id: publicKeyId, key: publicKeyBase64 }
            }
          ] = await Promise.all([
            github.actions.listRepoSecrets({ ...ownerAndRepo }),
            github.actions.getRepoPublicKey({ ...ownerAndRepo })
          ]);

          debug('existingSecrets: %O', existingSecrets);
          debug('publicKeyId: %O', publicKeyId);
          debug('publicKeyBase64: %O', publicKeyBase64);

          if (force) {
            await Promise.all(
              existingSecrets.map(({ name: secret_name }) =>
                github.actions.deleteRepoSecret({ ...ownerAndRepo, secret_name })
              )
            );

            log.message(
              'Because this command was invoked with --force, all origin repository actions secrets were just cleared'
            );
          }

          debug('waiting for libsodium to get ready');

          // ? Wait for libsodium to be ready (probably gathering random)
          await libsodium.ready;

          debug.message('libsodium is ready!');

          const publicKeyUint8Array = libsodium.from_base64(
            publicKeyBase64,
            libsodium.base64_variants.ORIGINAL
          );

          const updatedSecrets: Merge<
            RestEndpointMethodTypes['actions']['createOrUpdateRepoSecret']['parameters'],
            { owner?: undefined; repo?: undefined; key_id?: undefined }
          >[] = Object.entries(
            loadDotEnv({
              dotEnvFilePaths: getRelevantDotEnvFilePaths(
                projectMetadata,
                'project-only'
              ),
              updateProcessEnv: false
            })
          )
            .filter(function ([variable, value]) {
              const eligible = value && !['GITHUB_TOKEN', 'GH_TOKEN'].includes(variable);

              if (eligible) {
                if (force) {
                  return true;
                }

                const isSecretAlreadyUploaded = existingSecrets.some(
                  ({ name }) => name === variable
                );

                if (!isSecretAlreadyUploaded) {
                  return true;
                }

                log([LogTag.IF_NOT_HUSHED], 'EXISTING secret: %O', variable);
                return false;
              }

              log([LogTag.IF_NOT_HUSHED], 'IGNORING secret: %O', variable);
              return false;
            })
            .map(([variable, value]) => ({
              secret_name: variable,
              encrypted_value: libsodium.to_base64(
                libsodium.crypto_box_seal(
                  libsodium.from_string(value),
                  publicKeyUint8Array
                ),
                libsodium.base64_variants.ORIGINAL
              )
            }));

          debug('updatedSecrets: %O', updatedSecrets);

          await Promise.all(
            updatedSecrets.map(function (secret) {
              log([LogTag.IF_NOT_HUSHED], 'UPLOADING secret: %O', secret.secret_name);

              return github.actions.createOrUpdateRepoSecret({
                ...ownerAndRepo,
                ...secret,
                key_id: publicKeyId
              });
            })
          );

          logReplacement({
            replacedDescription: `${force ? 'Deleted existing secrets and uploaded all' : 'Uploaded any missing'} secrets sourced from .env files`,
            previousValue: `${existingSecrets.length} existing secrets${
              force ? ' (cleared)' : ''
            }`,
            updatedValue: `${updatedSecrets.length} missing secrets uploaded`
          });
        }
      ];

      // TODO: include this algo/case in the eventual task runner implementation

      if (parallel) {
        const results = await Promise.allSettled(
          subtaskPromiseFunctions.map((fn) => fn())
        );

        const { reason: firstError } =
          results.find((result) => result.status !== 'fulfilled') || {};

        if (firstError) {
          throw firstError;
        }
      } else {
        let firstError = undefined;

        for (const subtaskPromiseFunction of subtaskPromiseFunctions) {
          try {
            // eslint-disable-next-line no-await-in-loop
            await subtaskPromiseFunction();
          } catch (error) {
            firstError ||= error;
          }
        }

        if (firstError) {
          throw firstError as Error;
        }
      }

      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;

      function logMetadataReplacement(
        propertyPath:
          | keyof typeof incomingRepoData
          | `${keyof typeof incomingRepoData}.${string}`,
        description: string
      ) {
        const previousValue = getInObject(incomingRepoData, propertyPath);
        const updatedValue = getInObject(outgoingRepoData, propertyPath);

        logReplacement({
          wasReplaced: updatedValue !== undefined,
          replacedDescription: `Replaced ${propertyPath} with ${description}`,
          skippedDescription: `replacing ${propertyPath}`,
          previousValue: previousValue,
          updatedValue: updatedValue
        });
      }

      async function createOrUpdateRuleset(
        targetRuleset: ExistingRuleset | undefined,
        replacementRuleset: NewRuleset
      ) {
        const rulesetName = replacementRuleset.name;

        if (targetRuleset && !force) {
          if (targetRuleset.enforcement !== 'active') {
            await github.repos.updateRepoRuleset({
              ...ownerAndRepo,
              ruleset_id: targetRuleset.id,
              enforcement: 'active'
            });

            log([LogTag.IF_NOT_HUSHED], `Existing ${rulesetName} ruleset was activated`);
          } else {
            log(
              [LogTag.IF_NOT_HUSHED],
              `Existing ${rulesetName} ruleset already activated`
            );
          }
        } else {
          const shouldOverwrite = targetRuleset && force;

          if (shouldOverwrite) {
            await github.repos.deleteRepoRuleset({
              ...ownerAndRepo,
              ruleset_id: targetRuleset.id
            });
          }

          await github.repos.createRepoRuleset({
            ...ownerAndRepo,
            ...replacementRuleset
          });

          if (shouldOverwrite) {
            log.message(
              [LogTag.IF_NOT_HUSHED],
              `Existing ${rulesetName} ruleset was overwritten!`
            );
          } else {
            log([LogTag.IF_NOT_HUSHED], `new ${rulesetName} ruleset created`);
          }
        }
      }
    }
  },
  'github-rename-root': {
    emoji: '🧬',
    taskAliases: [],
    actionDescription: 'Updating origin repository name and relevant metadata',
    shortHelpDescription: 'Rename the origin repo and root package, and update metadata',
    longHelpDescription: `This renovation will:

1. Rename the origin repository on GitHub.

2. Update the package name in the origin repository's releases on GitHub.

3. Update the name field in the root package's package.json file.

4. Update the package.json::repository of all packages in the project.

5. Update the origin remote in \`.git/config\`.

6. If the repo is not a non-hybrid monorepo, add new repository tags with the updated root package name as aliases for corresponding tags with the old name and push them.

7. Rename (move) the repository directory on the local filesystem.

If any step fails, the renovation will abort immediately.

Do note that this renovation can also be used to update any GitHub releases named in the old style (e.g. "v1.2.3") to their modern counterparts (e.g. "package-name@1.2.3"). To accomplish this without attempting to rename the repository, invoke the --generate-scoped-tags renovation instead.`,
    requiresForce: false,
    supportedScopes: [ProjectRenovateScope.Unlimited],
    subOptions: {
      'new-repo-name': {
        string: true,
        description: "The repository's new name",
        subOptionOf: {
          'github-rename-root': {
            when: (superOptionValue) => superOptionValue,
            update(oldOptionConfig) {
              return { ...oldOptionConfig, demandThisOption: true };
            }
          }
        }
      },
      'new-root-package-name': {
        string: true,
        description: "The root package's new name",
        subOptionOf: {
          'github-rename-root': {
            when: (superOptionValue) => superOptionValue,
            update(oldOptionConfig) {
              return { ...oldOptionConfig, demandThisOption: true };
            }
          }
        }
      }
    },
    conflicts: conflictingUpstreamRenovationTasks.filter(
      (o) => !o['github-rename-root']
    ),
    async run(argv_, { log, debug }) {
      const argv = argv_ as RenovationTaskArgv;
      checkRuntimeIsReadyForGithub(argv, log);

      const {
        force,
        newRepoName: _newRepoName,
        newRootPackageName: _newRootPackageName,
        [$executionContext]: { projectMetadata }
      } = argv;

      hardAssert(projectMetadata, ErrorMessage.GuruMeditation());

      const {
        // * Since "this-package" is not supported, we can't use cwdPackage
        rootPackage,
        subRootPackages
      } = projectMetadata;

      const { root: projectRoot, attributes: projectAttributes } = rootPackage;

      const oldRootPackageName = rootPackage.json.name;
      const updatedRepoName = _newRepoName as string;
      const updatedRootPackageName = _newRootPackageName as string;
      const logReplacement = makeReplacementLogger(log);
      const github = await makeOctokit({ debug, log });
      const ownerAndRepo = parsePackageJsonRepositoryIntoOwnerAndRepo(rootPackage.json);

      debug('force: %O', force);
      debug('projectRoot: %O', projectRoot);
      debug('oldRootPackageName: %O', oldRootPackageName);
      debug('updatedRepoName: %O', updatedRepoName);
      debug('updatedRootPackageName: %O', updatedRootPackageName);
      debug('logReplacement: %O', logReplacement);
      debug('github: %O', github);
      debug('ownerAndRepo: %O', ownerAndRepo);

      // * Rename the origin repository on GitHub

      const {
        data: { name: oldRepoName }
      } = await github.repos.get({ ...ownerAndRepo });

      const shouldUpdateRepoName = oldRepoName !== updatedRepoName;
      debug('oldRepoName: %O', oldRepoName);

      if (shouldUpdateRepoName) {
        await github.repos.update({ ...ownerAndRepo, name: updatedRepoName });
      }

      logReplacement({
        wasReplaced: shouldUpdateRepoName,
        replacedDescription: 'Renamed the origin repository on GitHub',
        previousValue: oldRepoName,
        updatedValue: updatedRepoName,
        skippedDescription: `updating "${oldRepoName}" repository: old name already equals new name`
      });

      ownerAndRepo.repo = updatedRepoName;
      debug('ownerAndRepo: %O', ownerAndRepo);

      // * Update the root package name in GitHub releases

      if (force || shouldUpdateRepoName) {
        const oldReleases = await github.paginate(github.repos.listReleases, {
          ...ownerAndRepo
        });

        await Promise.all(
          oldReleases.map(async ({ id: release_id, name: oldReleaseName }) => {
            if (!oldReleaseName) {
              log.warn(
                [LogTag.IF_NOT_QUIETED],
                'Release id %O is missing a name!',
                release_id
              );
              return;
            }

            const isOldReleaseNameSemverAndRelevant =
              force && !!semver.valid(oldReleaseName);

            const updatedReleaseName = isOldReleaseNameSemverAndRelevant
              ? // TODO: isn't this logic centralized in conventional config?
                `${updatedRootPackageName}@${oldReleaseName}`
              : oldReleaseName.replace(oldRootPackageName, updatedRootPackageName);

            const shouldUpdateReleaseName = oldReleaseName !== updatedReleaseName;

            debug('oldReleaseName: %O', oldReleaseName);
            debug(
              'isOldReleaseNameSemverAndRelevant: %O',
              isOldReleaseNameSemverAndRelevant
            );
            debug('updatedReleaseName: %O', updatedReleaseName);
            debug('shouldUpdateReleaseName: %O', shouldUpdateReleaseName);

            if (shouldUpdateReleaseName) {
              await github.repos.updateRelease({
                ...ownerAndRepo,
                release_id,
                name: updatedReleaseName
              });
            }

            logReplacement({
              wasReplaced: shouldUpdateReleaseName,
              replacedDescription: 'Updated GitHub release name',
              previousValue: oldReleaseName,
              updatedValue: updatedReleaseName,
              skippedDescription: `updating GitHub release "${oldReleaseName}"`
            });
          })
        );
      } else {
        logReplacement({
          wasReplaced: false,
          replacedDescription: '',
          skippedDescription:
            'updating existing GitHub release names since repo name was not updated (use --force to run these updates anyway)'
        });
      }

      // * Update the name field in the root package's package.json file
      // ? Note that it is updated here but committed to the filesystem later

      rootPackage.json.name = updatedRootPackageName;

      // * Update the package.json::repository of all packages in the project
      await Promise.all(
        [rootPackage, ...(subRootPackages?.values() || [])].map(
          async ({ root: packageRoot, json: packageJson }) => {
            packageJson.repository = deriveJsonRepositoryValue(
              deriveGitHubUrl(ownerAndRepo)
            );

            const packageJsonPath = toPath(packageRoot, packageJsonConfigPackageBase);

            debug(
              'updating package.json::repository at %O with:',
              packageJsonPath,
              packageJson.repository
            );

            await writeFile(packageJsonPath, stringifyJson(packageJson));
          }
        )
      );

      logReplacement({
        replacedDescription: 'Updated the package.json::repository field in all packages'
      });

      // * Update the origin remote in .git/config accordingly

      const { stdout: oldRemoteUrl } = await run('git', ['remote', 'get-url', 'origin']);
      const shouldUpdateRemoteUrl =
        force || (shouldUpdateRepoName && oldRemoteUrl.includes(oldRepoName));

      const updatedRemoteUrl = oldRemoteUrl.replace(
        new RegExp(`/${force ? '[^/]+' : escapeStringRegexp(oldRepoName)}(?:\\.git)?$`),
        `/${updatedRepoName}.git`
      );

      debug('oldRemoteUrl: %O', oldRemoteUrl);
      debug('shouldUpdateRemoteUrl: %O', shouldUpdateRemoteUrl);
      debug('updatedRemoteUrl: %O', updatedRemoteUrl);

      if (shouldUpdateRemoteUrl) {
        await run('git', ['remote', 'set-url', 'origin', updatedRemoteUrl]);
      }

      logReplacement({
        wasReplaced: shouldUpdateRemoteUrl,
        replacedDescription: 'Updated the origin remote repository url',
        previousValue: oldRemoteUrl,
        updatedValue: updatedRemoteUrl,
        skippedDescription: 'updating origin remote url (use --force to overwrite)'
      });

      // * Add new tags with the updated root package name (nothing is deleted)

      const { stdout: tags_ } = await run('git', ['tag', '--list']);
      const tags = tags_.split(whitespaceRegExp);

      const oldTagExtractSemverRegExp = new RegExp(
        // TODO: isn't this logic somewhere else too? conventional.config?
        `${escapeStringRegexp(oldRootPackageName)}@(.+)$`
      );

      debug('oldTagExtractSemverRegExp: %O', oldTagExtractSemverRegExp);
      debug('tags: %O', tags);

      if (shouldUpdateRepoName && tags.length) {
        for (const oldTag of tags) {
          const oldTagSemver =
            semver.valid(oldTag) || oldTag.match(oldTagExtractSemverRegExp)?.[1];

          if (oldTagSemver) {
            // TODO: same with this too, isn't this logic repeated elsewhere?
            const aliasTag = `${updatedRootPackageName}@${oldTagSemver}`;

            debug('aliasTag: %O', aliasTag);

            // eslint-disable-next-line no-await-in-loop
            await run('git', [
              'tag',
              '-m',
              `alias => ${oldTag}`,
              aliasTag,
              `${oldTag}^{}`
            ]);

            logReplacement({
              replacedDescription: `Created alias tag`,
              updatedValue: `"${aliasTag}" => "${oldTag}"`
            });
          } else {
            logReplacement({
              wasReplaced: false,
              replacedDescription: '',
              skippedDescription: `creating alias tag for "${oldTag}"`
            });
          }
        }

        await run('git', ['push', '--follow-tags']);

        logReplacement({
          replacedDescription: 'Pushed all reachable annotated tags to origin'
        });
      } else {
        logReplacement({
          wasReplaced: false,
          replacedDescription: '',
          skippedDescription: `creating alias tags: nothing to alias`
        });
      }

      // * Rename (move) the repository directory on the local filesystem

      const oldRoot = projectRoot;
      const updatedRoot = toPath(toDirname(projectRoot), updatedRepoName);

      if (shouldUpdateRepoName) {
        softAssert(
          !(await isAccessible(updatedRoot, { useCached: false })),
          ErrorMessage.RenovationDestinationAlreadyExists(updatedRoot)
        );

        debug('oldRoot: %O', oldRoot);
        debug('updatedRoot: %O', updatedRoot);

        try {
          process.chdir(path.parse(getCurrentWorkingDirectory()).root);
          await renamePath(oldRoot, updatedRoot);
        } finally {
          try {
            // ? That the cwd is what it always is is a core assumption made all
            // ? over this codebase!
            process.chdir(oldRoot);
          } catch (error) {
            debug.error(
              'experienced super-fatal error during attempted cleanup: %O',
              error
            );
          }
        }

        process.chdir(updatedRoot);

        logReplacement({
          replacedDescription:
            'Renamed (moved) the project directory on the local filesystem',
          previousValue: oldRoot,
          updatedValue: updatedRoot
        });
      } else {
        logReplacement({
          wasReplaced: false,
          replacedDescription: '',
          skippedDescription: `renaming (moving) project directory: path has not changed`
        });
      }

      log.newline([LogTag.IF_NOT_HUSHED]);

      log(
        [LogTag.IF_NOT_HUSHED],
        `⚠️🚧 The renovation completed successfully! But there are further tasks that must be completed manually:

- The terminal's current working directory is outdated. Change directories now with:
\`cd ${updatedRoot}\`

- All packages in this project have had their package.json files updated. These changes should be reviewed and committed with the appropriate scope(s). If necessary, new releases should also be cut.

- Other tooling may need their configurations updated, such as VS Code's workspace settings. Note that Codecov should recognize the rename automatically and update of its own accord; no changes to CODECOV_TOKEN are required.` +
          (projectAttributes[ProjectAttribute.Polyrepo] ||
          projectAttributes[ProjectAttribute.Hybridrepo]
            ? `

- The root package name being updated necessitates the deprecation of the old package with a message pointing users to install the new package:
\`npm deprecate '${oldRootPackageName}'\` 'This package has been superseded by \`${updatedRootPackageName}\`'`
            : '')
      );

      log.newline([LogTag.IF_NOT_HUSHED]);

      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;
    }
  },
  'github-pause-rulesets': {
    emoji: '🛸',
    taskAliases: [],
    actionDescription: `Pausing ruleset protections for ${RULESET_PROTECTION_PAUSE_MINUTES} minutes`,
    shortHelpDescription: `Temporarily deactivate origin repository ruleset protections`,
    longHelpDescription: `This renovation will temporarily deactivate all rulesets in the repository for ${RULESET_PROTECTION_PAUSE_MINUTES} minutes, after which this command will reactivate them.\n\nUpon executing this renovation, you will be presented with a countdown until protections will be reactivated. You may press any key to immediately reactivate protections and exit the program.\n\nIf this renovation does not exit cleanly, re-running it (or --github-reconfigure-repo) will reactivate any erroneously disabled rulesets.`,
    requiresForce: false,
    supportedScopes: [ProjectRenovateScope.Unlimited],
    subOptions: {},
    conflicts: conflictingUpstreamRenovationTasks.filter(
      (o) => !o['github-pause-rulesets']
    ),
    async run(argv_, { log }) {
      const argv = argv_ as RenovationTaskArgv;
      checkRuntimeIsReadyForGithub(argv, log);

      // * Since "this-package" is not supported, we can't use cwdPackage
      // TODO: countdown, press any key to unpause immediately
      log.message([LogTag.IF_NOT_SILENCED], `✖️ This task is currently a no-op (todo)`);
      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;
    }
  },
  'github-delete-all-releases': {
    emoji: '☢️',
    taskAliases: [],
    actionDescription: 'Permanently deleting all origin repository releases',
    shortHelpDescription: 'Delete all releases associated with the origin repository',
    longHelpDescription: `This renovation will delete from the origin repository all releases associated with the current package (if --scope=${ProjectRenovateScope.ThisPackage}) or every possible release in existence (if --scope=${ProjectRenovateScope.Unlimited}).\n\n⚠️🚧 This is an INCREDIBLY DANGEROUS command that should ONLY be used to clear out unrelated releases after forking a repository.`,
    requiresForce: true,
    supportedScopes: projectRenovateScopes,
    subOptions: {},
    conflicts: conflictingUpstreamRenovationTasks.filter(
      (o) => !o['github-delete-all-releases']
    ),
    async run(argv_, { log }) {
      const argv = argv_ as RenovationTaskArgv;
      checkRuntimeIsReadyForGithub(argv, log);

      // TODO
      log.message([LogTag.IF_NOT_SILENCED], `✖️ This task is currently a no-op (todo)`);
      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;
    }
  },
  'github-clone-remote-wiki': {
    emoji: '📡',
    taskAliases: [],
    actionDescription: 'Cloning origin repository wiki into project root',
    shortHelpDescription:
      "Clone the origin repository's wiki into a (gitignored) directory",
    longHelpDescription: `This renovation will enable the wiki for the origin repository (if it is not enabled already) and then clone that wiki into the (gitignored) .wiki/ directory at the project root.`,
    requiresForce: false,
    supportedScopes: [ProjectRenovateScope.Unlimited],
    subOptions: {},
    conflicts: conflictingUpstreamRenovationTasks.filter(
      (o) => !o['github-clone-remote-wiki']
    ),
    async run(argv_, { log }) {
      const argv = argv_ as RenovationTaskArgv;
      checkRuntimeIsReadyForGithub(argv, log);

      // * Since "this-package" is not supported, we can't use cwdPackage
      // TODO: do not proceed if the .wiki dir already exists unless --force
      // TODO: create wiki via GitHub api if it does not already exist
      log.message([LogTag.IF_NOT_SILENCED], `✖️ This task is currently a no-op (todo)`);
      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;
    }
  },
  'github-kill-master': {
    emoji: '🚷',
    taskAliases: [],
    actionDescription: 'Renaming default branch to "main" and finishing off "master"',
    shortHelpDescription:
      'Rename and remove all references to any legacy "master" ref(s)',
    longHelpDescription: `This renovation will kill any and all references to any "master" ref throughout the repository. This includes renaming the "master" branch to "main," deleting the "master" branch on the origin repository, and setting the default branch to "main" both locally and remotely if it is not the case already.`,
    requiresForce: false,
    supportedScopes: [ProjectRenovateScope.Unlimited],
    subOptions: {},
    conflicts: conflictingUpstreamRenovationTasks.filter(
      (o) => !o['github-kill-master']
    ),
    async run(argv_, { log }) {
      const argv = argv_ as RenovationTaskArgv;
      checkRuntimeIsReadyForGithub(argv, log);

      // * Since "this-package" is not supported, we can't use cwdPackage
      // TODO: default branch => main
      log.message([LogTag.IF_NOT_SILENCED], `✖️ This task is currently a no-op (todo)`);
      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;
    }
  },
  'generate-scoped-tags': {
    emoji: '⚓',
    taskAliases: [],
    actionDescription: 'Generating scoped aliases for each non-scoped version tag',
    shortHelpDescription:
      'Generate a scoped version tag for each non-scoped version tag',
    longHelpDescription: `This renovation creates an alias of each old-style version tag in the repository going all the way back to the initial commit. The alias tags will be named according to --new-scope (and with respect to the optional --old-scope), i.e.: \`\${newScope}@\${toSemver(tagUsingOldScope)}\`

Note that this renovation will respect the "[INIT]" xpipeline command when it appears in commit messages. See the symbiote wiki and xchangelog/xrelease documentation for details on xpipeline command semantics.`,
    requiresForce: false,
    supportedScopes: [ProjectRenovateScope.Unlimited],
    subOptions: {
      'new-scope': {
        string: true,
        description: 'The characters preceding "@" in newly created alias tags',
        subOptionOf: {
          'generate-scoped-tags': {
            when: (superOptionValue) => superOptionValue,
            update(oldOptionConfig) {
              return { ...oldOptionConfig, demandThisOption: true };
            }
          }
        }
      },
      'old-scope': {
        string: true,
        description: 'The characters preceding "@" in existing tags to be aliased',
        defaultDescription: '"v" without "@", e.g. "v${version}"'
      }
    },
    conflicts: conflictingUpstreamRenovationTasks.filter(
      (o) => !o['generate-scoped-tags']
    ),
    async run(argv_, { log }) {
      const argv = argv_ as RenovationTaskArgv;

      // TODO: the logic for this is pretty much done in --github-rename-root
      // * Since "this-package" is not supported, we can't use cwdPackage
      // TODO: only since [INIT] (if found)
      void argv;
      log.message([LogTag.IF_NOT_SILENCED], `✖️ This task is currently a no-op (todo)`);
      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;
    }
  },
  'full-deprecate': {
    emoji: '🪦',
    taskAliases: [],
    actionDescription: 'Deprecating package',
    shortHelpDescription:
      'Deprecate the current package and possibly the entire repository',
    longHelpDescription: `This renovation will execute the standard deprecation procedure on the current package. See the symbiote wiki for details on the standard deprecation procedure.

    Regardless of --scope, if this renovation is used on a polyrepo, the entire repository will also be deprecated; if this renovation is used on a monorepo, it will apply only to the current package unless the repository is a hybridrepo and deprecating the current package would result in all packages having been deprecated. In case of the latter, the entire repository will also be deprecated.`,
    requiresForce: true,
    supportedScopes: [ProjectRenovateScope.ThisPackage],
    subOptions: {},
    conflicts: conflictingUpstreamRenovationTasks.filter((o) => !o['full-deprecate']),
    async run(argv_, { log }) {
      const argv = argv_ as RenovationTaskArgv;

      checkRuntimeIsReadyForGithub(argv, log);
      checkRuntimeIsReadyForNpm(argv, log);

      // TODO:
      log.message([LogTag.IF_NOT_SILENCED], `✖️ This task is currently a no-op (todo)`);
      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;
    }
  },
  'full-undeprecate': {
    emoji: '🧟',
    taskAliases: [],
    actionDescription: 'Un-deprecating package',
    shortHelpDescription:
      'Reverse the deprecation of the current package and repository',
    longHelpDescription: `This renovation will make a best effort at undoing the standard deprecation procedure on the current package and its containing repository, effectively "un-deprecating" them both. See the symbiote wiki for details on the standard deprecation procedure and what the ramifications of an "un-deprecation" are.`,
    requiresForce: true,
    supportedScopes: [ProjectRenovateScope.ThisPackage],
    subOptions: {},
    conflicts: conflictingUpstreamRenovationTasks.filter((o) => !o['full-undeprecate']),
    async run(argv_, { log }) {
      const argv = argv_ as RenovationTaskArgv;

      checkRuntimeIsReadyForGithub(argv, log);
      checkRuntimeIsReadyForNpm(argv, log);

      // TODO:
      log.message([LogTag.IF_NOT_SILENCED], `✖️ This task is currently a no-op (todo)`);
      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;
    }
  },
  'regenerate-assets': {
    emoji: '♻️',
    taskAliases: [],
    actionDescription: 'Regenerating targeted configuration and template assets',
    shortHelpDescription: 'Regenerate targeted configuration and template asset files',
    longHelpDescription: `
This renovation will regenerate one or more files in the project, each represented by an "asset". An asset is a collection mapping output paths to generated content. When writing out content to an output path, existing files are overwritten, missing files are created, and obsolete files are deleted.

Provide --assets-preset (required) to specify which assets to regenerate. The parameter accepts one of the following presets: ${assetPresets.join(', ')}. The paths of assets included in the preset will be targeted for renovation except those paths matched by --skip-asset-paths.

Use --skip-asset-paths to further narrow which files are regenerated. The parameter accepts regular expressions that are matched against the paths to be written out. Any paths matching one of the aforesaid regular expressions will have their contents discarded instead of written out.

This renovation attempts to import the "import-aliases.mjs" file if it exists at the root of the project. Use this file to provide additional \`RawAliasMapping[]\`s to include when regenerating files defining the project's import aliases. See the symbiote wiki documentation for further details.

When renovating Markdown files with templates divided into replacer regions via the magic comments "${magicStringReplacerRegionStart}" and "${magicStringReplacerRegionEnd}", this command will perform so-called "regional replacements" where only the content between the "start" and "end" comments will be modified. Regions without matching ids are ignored.

When regional replacements are performed, matching non-numeric reference definitions will be overwritten respectively, and new definitions will be appended. However, when attempting to renovate a Markdown file and either (1) it does not have replacer regions when its corresponding template contains replacer regions or (2) --force is used, the entire file will be overwritten instead.

Note that only certain Markdown files support regional replacements. See the symbiote wiki documentation for more details.

After invoking this renovation, you should use your IDE's diff tools to compare and contrast the latest best practices with the project's current configuration setup.

This renovation should be re-run each time a package is added to, or removed from, a symbiote-compliant monorepo but should NEVER be run in a CI environment or anywhere logs can be viewed publicly.

See the symbiote wiki documentation for more details on this command and all available assets.
`,
    requiresForce: false,
    supportedScopes: [ProjectRenovateScope.Unlimited],
    subOptions: {
      'assets-preset': {
        alias: 'preset',
        choices: assetPresets,
        description: 'Select a set of assets to target for regeneration',
        subOptionOf: {
          'regenerate-assets': {
            when: (superOptionValue) => superOptionValue,
            update(oldOptionConfig) {
              return {
                ...oldOptionConfig,
                demandThisOption: true
              };
            }
          }
        }
      },
      'skip-asset-paths': {
        alias: 'skip-asset-path',
        array: true,
        string: true,
        description: 'Skip regenerating assets matching a regular expression',
        default: []
      }
    },
    // ? These renovations modify the filesystem, so only one can run at once
    conflicts: [
      'synchronize-interdependencies',
      'full-deprecate',
      'full-undeprecate',
      'github-rename-root',
      'github-clone-remote-wiki'
    ],
    async run(argv_, { debug, log }) {
      const argv = argv_ as RenovationTaskArgv;

      const { force, [$executionContext]: globalExecutionContext } = argv;

      const { projectMetadata } = globalExecutionContext;
      const preset = argv.assetsPreset as AssetPreset;
      const skipAssetPaths = argv.skipAssetPaths as RegExp[];

      hardAssert(projectMetadata, ErrorMessage.GuruMeditation());

      const {
        // * Since "this-package" is not supported, we can't use cwdPackage
        rootPackage: { root: projectRoot, json: projectJson }
      } = projectMetadata;

      const { owner: repoOwner, repo: repoName } =
        parsePackageJsonRepositoryIntoOwnerAndRepo(projectJson);

      const transformerContext: IncomingTransformerContext = {
        log,
        debug,

        toPackageAbsolutePath: (...pathsLike) =>
          hardAssert(
            ErrorMessage.CannotGenerateCurrentPackagePathInUnlimitedScope(pathsLike)
          ),
        toProjectAbsolutePath: (...pathsLike) =>
          toAbsolutePath(projectRoot, ...pathsLike),

        forceOverwritePotentiallyDestructive: force,
        shouldDeriveAliases: true,
        scope: DefaultGlobalScope.Unlimited,
        assetPreset: preset,
        projectMetadata,
        additionalRawAliasMappings: await importAdditionalRawAliasMappings(
          projectMetadata,
          { log, debug }
        ),

        repoOwner,
        repoName,
        year: new Date().getFullYear().toString()
      };

      debug('preset: %O', preset);
      debug('skipAssetPaths: %O', skipAssetPaths);
      debug('transformer context: %O', transformerContext);

      const reifiedAssetPathEntries = Object.entries(
        await gatherAssetsFromAllTransformers({
          transformerContext
        })
      );

      const results = await Promise.allSettled(
        reifiedAssetPathEntries.map(async function ([
          outputPathString,
          generateContent
        ]) {
          const absoluteOutputPath = outputPathString;
          const relativeOutputPath = toRelativePath(projectRoot, outputPathString);
          const absoluteOutputParentPath = toDirname(absoluteOutputPath);

          debug('absoluteOutputPath: %O', absoluteOutputPath);
          debug('relativeOutputPath: %O', relativeOutputPath);
          debug('absoluteOutputParentPath: %O', absoluteOutputParentPath);

          if (skipAssetPaths.some((r) => r.test(relativeOutputPath))) {
            debug(
              'skipped asset due to --skip-asset-paths exclusion: %O',
              absoluteOutputPath
            );
            log(`🟧 ${relativeOutputPath}`);
            return;
          }

          try {
            const content = await generateContent();

            if (content === $delete) {
              debug.message(
                'deleting asset due to presence of $delete symbol: %O',
                absoluteOutputPath
              );
              await rm(absoluteOutputPath, { force: true });
              log(`🗑️ ${relativeOutputPath}`);
            } else {
              await mkdir(absoluteOutputParentPath, { mode: 0o775, recursive: true });
              await writeFile(absoluteOutputPath, content);
              log(`✅ ${relativeOutputPath}`);
            }
          } catch (error) {
            debug.error('content generation failure: %O', error);
            log.error(`❗ ${relativeOutputPath}`);
            throw new Error('wrapper', {
              cause: { error, outputPath: absoluteOutputPath }
            });
          }
        })
      );

      const errorCount = results.filter((r) => r.status !== 'fulfilled').length;

      log.message(
        [LogTag.IF_NOT_QUIETED],
        '%O/%O renovations succeeded',
        results.length - errorCount,
        results.length
      );

      const formatHandler = await getInvocableExtendedHandler<
        FormatCliArguments,
        GlobalExecutionContext
      >(format, globalExecutionContext);

      const promisedFormatter = formatHandler({
        ...argv,
        $0: 'format',
        _: [],
        scope: DefaultGlobalScope.Unlimited,
        silent: true,
        quiet: true,
        hush: true,
        renumberReferences: false,
        skipIgnored: true,
        skipUnknown: false,
        onlyPackageJson: false,
        onlyMarkdown: false,
        onlyPrettier: false
      });

      try {
        if (errorCount > 0) {
          let firstError = new Error(ErrorMessage.GuruMeditation());

          for (const result of results) {
            if (result.status === 'rejected') {
              const { error, outputPath } = result.reason.cause;
              firstError = error;

              hardAssert(error, ErrorMessage.GuruMeditation());

              log.error(
                [LogTag.IF_NOT_SILENCED],
                'Content regeneration failed for %O:\n%O',
                outputPath,
                error
              );
            }
          }

          throw firstError;
        }
      } finally {
        log([LogTag.IF_NOT_HUSHED], 'Waiting for formatter sub-command to complete...');

        await promisedFormatter.then(
          () =>
            log([LogTag.IF_NOT_HUSHED], 'Formatter sub-command completed successfully'),
          (error: unknown) => {
            debug.error('formatter sub-command failed:', error);
            log.warn(
              [LogTag.IF_NOT_SILENCED],
              'Formatter sub-command experienced a non-fatal failure; please check related configuration files'
            );
            log.warn([LogTag.IF_NOT_SILENCED], error);
          }
        );
      }

      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;
    }
  },
  'update-dependencies': {
    emoji: '⚕️',
    taskAliases: [],
    actionDescription: 'Launching interactive dependency check for latest versions',
    shortHelpDescription: 'Interactively update dependencies in package.json',
    longHelpDescription:
      'This renovation allows the user to interactively select and update dependencies in package.json files belong to packages across the entire project (depending on --scope). Each updated dependency will generate either a chore-type commit (for package.json::devDependency updates) or a build-type commit (for any other kind of dependency in package.json) with a short simple commit message tailored to the dependency being updated.',
    requiresForce: false,
    // ? This renovation can only be run when no other tasks given
    supportedScopes: projectRenovateScopes,
    subOptions: {},
    check: function (currentArgumentValue, argv) {
      return (
        !currentArgumentValue ||
        Object.keys(renovationTasks).every(
          (task) => task === 'update-dependencies' || !argv[task]
        ) ||
        ErrorMessage.OptionValueMustBeAlone('update-dependencies', 'renovation')
      );
    } as RenovationTask['check'],
    async run(argv_, { log }) {
      const argv = argv_ as RenovationTaskArgv;

      // TODO:
      void argv;
      log.message([LogTag.IF_NOT_SILENCED], `✖️ This task is currently a no-op (todo)`);
      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;
    }
  },
  'synchronize-interdependencies': {
    emoji: '🔗',
    taskAliases: ['sync-deps'],
    actionDescription: 'Synchronizing package interdependencies',
    shortHelpDescription:
      'Update package.json dependencies to match their monorepo versions',
    longHelpDescription:
      "This renovation will analyze dependencies in one or more package.json files (depending on --scope), select dependencies in those files that match a package name in this project, and update those dependencies' ranges to match their respective package versions as they are in the project. This is useful in monorepos with published packages that rely on other published packages in the same repo. This renovation ensures a package released from this project will always install the latest version of the other packages released from this project.\n\nIf this repository is a polyrepo, this renovation is essentially a no-op.",
    requiresForce: false,
    supportedScopes: projectRenovateScopes,
    subOptions: {},
    // ? These renovations modify the filesystem, so only one can run at once
    conflicts: ['full-deprecate', 'full-undeprecate', 'github-rename-root'],
    async run(argv_, { debug, log }) {
      const argv = argv_ as RenovationTaskArgv;
      const { scope, [$executionContext]: globalExecutionContext } = argv;
      const { projectMetadata } = globalExecutionContext;

      hardAssert(projectMetadata, ErrorMessage.GuruMeditation());

      const { cwdPackage, rootPackage, subRootPackages } = projectMetadata;
      const allPackages = [rootPackage, ...(subRootPackages?.values() || [])];
      const allPackageNames = allPackages.map(({ json: { name } }) => name);

      debug('allPackageNames: %O', allPackageNames);

      if (subRootPackages) {
        if (scope === DefaultGlobalScope.ThisPackage) {
          log(
            [LogTag.IF_NOT_HUSHED],
            'Synchronizing dependencies in %O',
            cwdPackage.json.name
          );

          await synchronizePackageInterdependencies(cwdPackage);
        } else {
          log(
            [LogTag.IF_NOT_HUSHED],
            'Synchronizing dependencies across the entire project'
          );

          await Promise.all(
            allPackages.map((package_) => synchronizePackageInterdependencies(package_))
          );
        }
      } else {
        log.message([LogTag.IF_NOT_HUSHED], 'This renovation is a no-op in polyrepos');
      }

      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;

      async function synchronizePackageInterdependencies({
        root: ourPackageRoot,
        json: ourPackageJson
      }: Package) {
        const { name: ourPackageName, dependencies: ourDependencies } = ourPackageJson;
        const ourPackageJsonPath = toPath(ourPackageRoot, packageJsonConfigPackageBase);

        const interdependencies = Object.entries(
          (ourDependencies || {}) as Record<string, string>
        ).filter(([depName]) => allPackageNames.includes(depName));

        let didUpdatePackageJson = false;

        for (const [
          theirPackageName,
          ourDependenciesSemverOfTheirPackage
        ] of interdependencies) {
          const theirPackageNameIsRootPackage =
            theirPackageName === rootPackage.json.name;

          const theirPackage_ = theirPackageNameIsRootPackage
            ? rootPackage
            : subRootPackages?.get(theirPackageName);

          hardAssert(theirPackage_, ErrorMessage.GuruMeditation());

          const { version: theirPackageLatestVersion } = theirPackage_.json;

          if (theirPackageLatestVersion) {
            const theirPackageLatestSemver = `^${theirPackageLatestVersion}`;

            if (ourDependenciesSemverOfTheirPackage !== theirPackageLatestSemver) {
              ourDependencies![theirPackageName] = theirPackageLatestSemver;
              didUpdatePackageJson = true;

              log(
                [LogTag.IF_NOT_QUIETED],
                `⛓️ Dependency synchronized:\n${SHORT_TAB}%O\n${SHORT_TAB}%O ==> %O`,
                theirPackageName,
                ourDependenciesSemverOfTheirPackage,
                theirPackageLatestSemver
              );
            } else {
              log(
                [LogTag.IF_NOT_QUIETED],
                `✔️ Dependency already synchronized:\n${SHORT_TAB}%O`,
                theirPackageName
              );
            }
          } else {
            log.warn(
              [LogTag.IF_NOT_QUIETED],
              `Dependency %O is missing "version" field in:\n${SHORT_TAB}%O`,
              theirPackageName,
              toPath(theirPackage_.root, packageJsonConfigPackageBase)
            );
          }
        }

        if (didUpdatePackageJson) {
          await writeFile(ourPackageJsonPath, stringifyJson(ourPackageJson));

          debug(`formatting ${ourPackageJsonPath} (calling out to sub-command)`);

          const formatHandler = await getInvocableExtendedHandler<
            FormatCliArguments,
            GlobalExecutionContext
          >(format, globalExecutionContext);

          await formatHandler({
            ...argv,
            $0: 'format',
            _: [],
            scope: DefaultGlobalScope.Unlimited,
            files: [ourPackageJsonPath],
            silent: true,
            quiet: true,
            hush: true,
            renumberReferences: false,
            skipIgnored: false,
            skipUnknown: false,
            onlyPackageJson: false,
            onlyMarkdown: false,
            onlyPrettier: false
          });

          debug('sub-command completed successfully');

          log(
            [LogTag.IF_NOT_HUSHED],
            `Wrote out updated dependencies to:\n${SHORT_TAB}%O`,
            ourPackageJsonPath
          );
        }

        log(
          [LogTag.IF_NOT_QUIETED],
          `%O: %O dep${interdependencies.length === 1 ? '' : 's'} synced`,
          ourPackageName,
          interdependencies.length
        );
      }
    }
  }
} as const satisfies Record<string, Omit<RenovationTask, 'taskName'>>;

function rethrowErrorIfNotStatus404(errorResponse: unknown) {
  if ((errorResponse as undefined | (Error & { status: number }))?.status !== 404) {
    throw errorResponse;
  }

  return undefined;
}

function makeReplacementLogger(log: ExtendedLogger) {
  return function (
    input:
      | {
          wasReplaced?: undefined;
          replacedDescription: string;
          skippedDescription?: undefined;
          previousValue?: unknown;
          updatedValue?: unknown;
        }
      | {
          wasReplaced: boolean;
          replacedDescription: string;
          skippedDescription: string;
          previousValue?: unknown;
          updatedValue?: unknown;
        }
  ) {
    const { wasReplaced = true, replacedDescription, skippedDescription = '' } = input;

    if (wasReplaced) {
      log([LogTag.IF_NOT_QUIETED], `✅ ${replacedDescription}`);

      if ('previousValue' in input) {
        log([LogTag.IF_NOT_HUSHED], `Original value:  ${String(input.previousValue)}`);
      }

      if ('updatedValue' in input) {
        log([LogTag.IF_NOT_HUSHED], `Committed value: ${String(input.updatedValue)}`);
      }
    } else {
      log([LogTag.IF_NOT_QUIETED], `✖️ Skipped ${skippedDescription}`);
    }
  };
}
