/* eslint-disable no-await-in-loop */
import assert from 'node:assert';
import { mkdir, rename as renamePath, rm } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

import { BfcErrorMessage, CliError, getInvocableExtendedHandler } from '@-xun/cli';
import { hardAssert, softAssert } from '@-xun/cli/error';
import { LogTag, standardSuccessMessage } from '@-xun/cli/logging';
import { scriptBasename } from '@-xun/cli/util';

import {
  getCurrentWorkingDirectory,
  toAbsolutePath,
  toDirname,
  toPath,
  toRelativePath
} from '@-xun/fs';

import {
  aliasMapConfigProjectBase,
  babelConfigProjectBase,
  eslintConfigProjectBase,
  isAccessible,
  jestConfigProjectBase,
  nextjsConfigProjectBase,
  packageJsonConfigPackageBase,
  ProjectAttribute,
  readXPackageJsonAtRoot,
  Tsconfig,
  webpackConfigProjectBase
} from '@-xun/project';

import { run, runWithInheritedIo } from '@-xun/run';
import escapeStringRegexp from 'escape-string-regexp~4';
import libsodium from 'libsodium-wrappers';
import getInObject from 'lodash.get';
import { SHORT_TAB, SINGLE_SPACE } from 'rejoinder';
import semver from 'semver';

import { version as packageVersion } from 'rootverse:package.json';

import {
  deriveGitHubUrl,
  deriveJsonRepositoryValue,
  parsePackageJsonRepositoryIntoOwnerAndRepo
} from 'universe:assets/transformers/_package.json.ts';

import {
  $delete,
  assetPresets,
  gatherAssetsFromAllTransformers
} from 'universe:assets.ts';

import format from 'universe:commands/format.ts';

import {
  $executionContext,
  DefaultGlobalScope,
  DefaultGlobalScope as ProjectRenovateScope
} from 'universe:configure.ts';

import { ErrorMessage } from 'universe:error.ts';

import {
  deriveCodecovPackageFlag,
  determineRepoWorkingTreeDirty,
  getRelevantDotEnvFilePaths,
  importAdditionalRawAliasMappings,
  loadDotEnv,
  logStartTime,
  magicStringChooserBlockEnd,
  magicStringChooserBlockSplit,
  magicStringChooserBlockStart,
  magicStringReplacerRegionEnd,
  magicStringReplacerRegionStart,
  runGlobalPreChecks,
  stringifyJson,
  withGlobalBuilder,
  withGlobalUsage,
  writeFile
} from 'universe:util.ts';

import type {
  AsStrictExecutionContext,
  BfeBuilderObject,
  BfeBuilderObjectValue,
  BfeCheckFunction,
  BfeStrictArguments,
  ChildConfiguration
} from '@-xun/cli';

import type { AbsolutePath } from '@-xun/fs';
import type { Package, XPackageJson } from '@-xun/project';
import type { RestEndpointMethodTypes } from '@octokit/rest' with { 'resolution-mode': 'import' };
import type { ExtendedDebugger, ExtendedLogger } from 'rejoinder';
import type { CamelCasedProperties, KeysOfUnion, Merge } from 'type-fest';
import type { AssetPreset, IncomingTransformerContext } from 'universe:assets.ts';
import type { CustomCliArguments as FormatCliArguments } from 'universe:commands/format.ts';
import type { GlobalCliArguments, GlobalExecutionContext } from 'universe:configure.ts';

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

const assetsThatContainAliases = [
  Tsconfig.ProjectBase,
  jestConfigProjectBase,
  nextjsConfigProjectBase,
  webpackConfigProjectBase,
  eslintConfigProjectBase,
  babelConfigProjectBase
];

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

export type { RawAliasMapperArray, RawAliasMapperFunction } from 'universe:util.ts';

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
): ChildConfiguration<CustomCliArguments, GlobalExecutionContext> {
  const {
    standardLog,
    standardDebug,
    state,
    projectMetadata: projectMetadata_,
    isUsingLocalInstallation
  } = executionContext;

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
    ...renovationTasksToBlackFlagOptions(standardDebug.extend('builder'))
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
      const {
        $0: scriptFullName,
        scope,
        parallel,
        force,
        runToCompletion,
        regenerateAssets
      } = argv;

      const handlerName = scriptBasename(scriptFullName);
      const genericLogger = standardLog.extend(handlerName);
      const debug = standardDebug.extend(`handler-${handlerName}`);

      const camelize = (str: string) =>
        str.replaceAll(/-./g, (x) => x[1]!.toUpperCase());

      debug('entered handler');

      const { projectMetadata } = await runGlobalPreChecks({
        standardDebug: standardDebug,
        projectMetadata_,
        scope
      });

      const { startTime } = state;

      logStartTime({ standardLog, startTime, isUsingLocalInstallation });

      genericLogger(
        [LogTag.IF_NOT_QUIETED],
        `Renovating ${scope === ProjectRenovateScope.ThisPackage ? projectMetadata.cwdPackage.json.name : 'the entire project'}...`
      );

      genericLogger.newline([LogTag.IF_NOT_QUIETED]);

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
            if (!argv[taskName] && !argv[camelize(taskName) as typeof taskName]) {
              return undefined;
            }

            return async function () {
              const { actionDescription, emoji, run: taskRunner } = task;

              const dbg = debug.extend(taskName);
              const taskLogger = genericLogger.extend(taskName);

              dbg('preparing to run task %O', taskName);
              taskLogger([LogTag.IF_NOT_QUIETED], `${emoji} ${actionDescription}`);

              dbg('entering runner function');

              await taskRunner(argv, {
                log: taskLogger,
                debug: dbg,
                self: task as unknown as RenovationTask
              });

              taskLogger([LogTag.IF_NOT_QUIETED], '✅');
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

        // TODO: This task runner logic appears in at least five places in this
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
            standardLog.error(
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

      if (regenerateAssets) {
        genericLogger.message(
          [LogTag.IF_NOT_QUIETED],
          'Consider running one of the following to fixup node_modules and package-lock.json:'
        );

        genericLogger.message([LogTag.IF_NOT_QUIETED], `${SHORT_TAB}npm update`);

        genericLogger.message(
          [LogTag.IF_NOT_QUIETED],
          `${SHORT_TAB}rm -rf node_modules package-lock.json && npm install`
        );

        genericLogger.newline([LogTag.IF_NOT_QUIETED]);
      }

      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  };
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
  'generate-alias-tags',
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

- Include "Releases" and remove "Packages" and "Deployments" sidebar sections
- Enable sponsorships
- Enable repository preservation (arctic code vault)
- Enable discussions
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
        quiet: isQuieted,
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

                log([LogTag.IF_NOT_QUIETED], 'EXISTING secret: %O', variable);
                return false;
              }

              log([LogTag.IF_NOT_QUIETED], 'IGNORING secret: %O', variable);
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
              log([LogTag.IF_NOT_QUIETED], 'UPLOADING secret: %O', secret.secret_name);

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
            await subtaskPromiseFunction();
          } catch (error) {
            firstError ||= error;
          }
        }

        if (firstError) {
          throw firstError as Error;
        }
      }

      log.newline([LogTag.IF_NOT_QUIETED]);

      if (!isQuieted) {
        process.stdout.write(
          `⚠️🚧 The renovation completed successfully! But there are further tasks that must be completed manually:

- Include "Releases" and remove "Packages" and "Deployments" sidebar sections
- Enable sponsorships
- Enable repository preservation (arctic code vault)
- Enable discussions
- Enable "private vulnerability reporting"
- Enable "dependency graph"
- Enable "dependabot" (i.e. "dependabot alerts" and "dependabot security updates")
`
        );
      }

      log.newline([LogTag.IF_NOT_QUIETED]);

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

            log(
              [LogTag.IF_NOT_QUIETED],
              `Existing ${rulesetName} ruleset was activated`
            );
          } else {
            log(
              [LogTag.IF_NOT_QUIETED],
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
              [LogTag.IF_NOT_QUIETED],
              `Existing ${rulesetName} ruleset was overwritten!`
            );
          } else {
            log([LogTag.IF_NOT_QUIETED], `new ${rulesetName} ruleset created`);
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

2. Update the origin repository's GitHub release names that are scoped to the old root package's name. If --force is given, all releases with old-style semver valid names (e.g. "v1.2.3") will be updated (to e.g. "new-package-name@1.2.3") as well.

3. Update the name field in the root package's package.json file.

4. Update the package.json::repository of all packages in the project.

5. Update the origin remote url in \`.git/config\` if it matches the old origin url. If --force is given, the origin remote url will always be updated regardless of its value.

6. In a hybridrepo or polyrepo, add new annotated tags with the updated root package name as respective aliases of tags with the old package name, and then push them to the origin repository. If --force is given, alias tags (e.g. "new-package-name@1.2.3") will be created for any existing tags with old-style semver valid names (e.g. "v1.2.3") as well.

7. Rename (move) the repository directory on the local filesystem, if the repository name has changed. If the destination directory path already exists, this step will fail.

If any step fails, the renovation will abort immediately. Further, this command never deletes tags.

To create and recreate alias tags for existing release tags more generally, see the --generate-alias-tags renovation.`,
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
        quiet: isQuieted,
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
      const updatedRootPackageName = _newRootPackageName as string;
      const updatedRepoName = _newRepoName as string;
      const logReplacement = makeReplacementLogger(log);
      const github = await makeOctokit({ debug, log });
      const ownerAndRepo = parsePackageJsonRepositoryIntoOwnerAndRepo(rootPackage.json);

      debug('force: %O', force);
      debug('projectRoot: %O', projectRoot);

      // * Rename the origin repository on GitHub

      const {
        data: { name: oldRepoName }
      } = await github.repos.get({ ...ownerAndRepo });

      debug('oldRepoName: %O', oldRepoName);
      debug('updatedRepoName: %O', updatedRepoName);

      const shouldUpdateRepoName = oldRepoName !== updatedRepoName;
      const shouldUpdateRootPackageName = oldRootPackageName !== updatedRootPackageName;

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

      debug('ownerAndRepo (initial): %O', ownerAndRepo);
      ownerAndRepo.repo = updatedRepoName;
      debug('ownerAndRepo (updated): %O', ownerAndRepo);

      // * Update the root package name in GitHub releases

      debug('oldRootPackageName: %O', oldRootPackageName);
      debug('updatedRootPackageName: %O', updatedRootPackageName);

      if (force || shouldUpdateRootPackageName) {
        await renameGithubReleases(oldRootPackageName, updatedRootPackageName, {
          alsoUpdateGitHubReleaseNames: force,
          debug,
          github,
          log,
          logReplacement,
          ownerAndRepo
        });
      } else {
        logReplacement({
          wasReplaced: false,
          replacedDescription: '',
          skippedDescription:
            'updating existing release names since root package name has not changed (use --force to try anyway)'
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

            logReplacement({
              replacedDescription: `Updated package.json::repository field`,
              updatedValue: `in: ${toRelativePath(projectRoot, packageJsonPath)}`
            });
          }
        )
      );

      // * Update the origin remote in .git/config accordingly

      const { stdout: oldRemoteUrl } = await run('git', ['remote', 'get-url', 'origin']);
      const shouldUpdateRemoteUrl =
        force || (shouldUpdateRepoName && oldRemoteUrl.includes(oldRepoName));

      const updatedRemoteUrl = oldRemoteUrl.replace(
        new RegExp(`/${force ? '[^/]+' : escapeStringRegexp(oldRepoName)}(?:\\.git)?$`),
        `/${updatedRepoName}.git`
      );

      debug('oldRemoteUrl: %O', oldRemoteUrl);
      debug('updatedRemoteUrl: %O', updatedRemoteUrl);
      debug('shouldUpdateRemoteUrl: %O', shouldUpdateRemoteUrl);

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

      // * Add new tags with the updated root package name

      if (force || shouldUpdateRootPackageName) {
        await createAliasTags(oldRootPackageName, updatedRootPackageName, {
          alsoUpdateOldStyleVersionTags: force,
          debug,
          logReplacement
        });
      } else {
        logReplacement({
          wasReplaced: false,
          replacedDescription: '',
          skippedDescription:
            'creating alias tags: root package name has not changed (use --force to try anyway)'
        });
      }

      // * Rename (move) the repository directory on the local filesystem

      const oldRoot = projectRoot;
      const updatedRoot = toPath(toDirname(projectRoot), updatedRepoName);
      const shouldMoveProjectRoot = oldRoot !== updatedRoot;

      debug('oldRoot: %O', oldRoot);
      debug('updatedRoot: %O', updatedRoot);
      debug('shouldMoveProjectRoot: %O', shouldMoveProjectRoot);

      if (shouldMoveProjectRoot) {
        softAssert(
          !(await isAccessible(updatedRoot, { useCached: false })),
          ErrorMessage.RenovationDestinationAlreadyExists(updatedRoot)
        );

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
      }

      logReplacement({
        wasReplaced: shouldMoveProjectRoot,
        replacedDescription:
          'Renamed (moved) the project directory on the local filesystem',
        previousValue: oldRoot,
        updatedValue: updatedRoot,
        skippedDescription: `renaming (moving) project directory: path has not changed`
      });

      log.newline([LogTag.IF_NOT_QUIETED]);

      if (!isQuieted) {
        process.stdout.write(
          `⚠️🚧 The renovation completed successfully! But there are further tasks that must be completed manually:` +
            (shouldMoveProjectRoot
              ? `\n\n- The terminal's current working directory may be outdated. Change directories now with:\ncd ${updatedRoot}`
              : '') +
            `\n
- Several packages in this project may have had their package.json files updated. Any changes should be reviewed and committed with the appropriate scope(s). If necessary, new releases should also be cut.

- Other tooling may need their configurations updated, such as VS Code's workspace settings. Note that Codecov should recognize the rename automatically and update of its own accord; no changes to CODECOV_TOKEN are required.` +
            (shouldUpdateRootPackageName &&
            (projectAttributes[ProjectAttribute.Polyrepo] ||
              projectAttributes[ProjectAttribute.Hybridrepo])
              ? `\n
- The root package name being updated necessitates the deprecation of the old package with a message pointing users to install the new package:
npm deprecate '${oldRootPackageName}' 'This package has been superseded by \`${updatedRootPackageName}\`'`
              : '') +
            '\n'
        );
      }

      log.newline([LogTag.IF_NOT_QUIETED]);

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
    async run(argv_, { log, debug }) {
      const argv = argv_ as RenovationTaskArgv;
      checkRuntimeIsReadyForGithub(argv, log);

      const {
        [$executionContext]: { projectMetadata }
      } = argv;

      hardAssert(projectMetadata, ErrorMessage.GuruMeditation());

      const {
        // * Since "this-package" is not supported, we can't use cwdPackage
        rootPackage
      } = projectMetadata;

      const github = await makeOctokit({ debug, log });
      const ownerAndRepo = parsePackageJsonRepositoryIntoOwnerAndRepo(rootPackage.json);

      const allRulesetIds: number[] = [];
      const disabledRulesetIds: number[] = [];
      const rulesets = await github.paginate(github.repos.getRepoRulesets, {
        ...ownerAndRepo
      });

      await Promise.all(
        rulesets.map(async ({ name, id, enforcement }) => {
          allRulesetIds.push(id);

          if (enforcement === 'active') {
            await github.repos.updateRepoRuleset({
              ...ownerAndRepo,
              ruleset_id: id,
              enforcement: 'disabled'
            });

            disabledRulesetIds.push(id);
            log([LogTag.IF_NOT_HUSHED], 'Disabled ruleset %O (%O)', id, name);
          } else {
            log.message(
              [LogTag.IF_NOT_HUSHED],
              'Skipped updating ruleset %O (%O): it is already disabled',
              id,
              name
            );
          }
        })
      );

      log(
        [LogTag.IF_NOT_SILENCED],
        `All rulesets disabled for %O minutes`,
        RULESET_PROTECTION_PAUSE_MINUTES
      );

      if (!disabledRulesetIds.length) {
        log.message(
          [LogTag.IF_NOT_SILENCED],
          'All rulesets were already disabled before symbiote was invoked\nTherefore, ALL RULESETS will be "re-enabled"!'
        );
      }

      process.stdout.write(
        `\n${SHORT_TAB}Press any key to re-enable them immediately...\n\n`
      );

      const abortController = new AbortController();
      const handler = () => abortController.abort();

      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once('data', handler);

      await delay(RULESET_PROTECTION_PAUSE_MINUTES * 60 * 1000, undefined, {
        signal: abortController.signal
      }).catch(() => undefined);

      process.stdin.removeListener('data', handler);
      process.stdin.setRawMode(false);
      process.stdin.pause();

      const targetRulesets = disabledRulesetIds.length
        ? disabledRulesetIds
        : allRulesetIds;

      log([LogTag.IF_NOT_SILENCED], 'Re-enabling %O rulesets', targetRulesets.length);

      await Promise.all(
        targetRulesets.map(async (id) => {
          await github.repos.updateRepoRuleset({
            ...ownerAndRepo,
            ruleset_id: id,
            enforcement: 'active'
          });

          log([LogTag.IF_NOT_HUSHED], 'Re-enabled ruleset %O', id);
        })
      );

      log([LogTag.IF_NOT_SILENCED], `Rulesets re-enabled!`);

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
  'generate-alias-tags': {
    emoji: '⚓',
    taskAliases: [],
    actionDescription: 'Creating aliases for matching tags',
    shortHelpDescription: 'Create tag aliases for each existing tag with matching scope',
    longHelpDescription: `This renovation creates an alias of every tag in the repository with --old-scope. The alias tag names are derived by taking the existing tag name and replacing --old-scope with --new-scope. If --force is given, alias tags (e.g. "new-package-name@1.2.3") will be created for any existing tags with old-style semver valid names (e.g. "v1.2.3") as well.

For example, to only create new-style aliases of all tags with old-style semver valid names, i.e. alias tag "new-package-name@1.2.3" for existing tag "v1.2.3":

\`symbiote project renovate --generate-alias-tags --new-scope='new-package-name' --force\`

Or to generate aliases for existing modern scoped tags, i.e. alias tag "@new/package-name@1.2.3" for existing tag "existing-scope@1.2.3":

\`symbiote project renovate --generate-alias-tags --old-scope='existing-scope' --new-scope='@new/package-name'\`

Use --rename-matching-releases to control if releases on GitHub with names matching --old-scope will have that scope replaced with --new-scope.

Note that this command never deletes tags.`,
    requiresForce: false,
    supportedScopes: [ProjectRenovateScope.Unlimited],
    subOptions: {
      'new-scope': {
        string: true,
        description: 'The characters preceding "@" in generated alias tags',
        subOptionOf: {
          'generate-alias-tags': {
            when: (superOptionValue) => superOptionValue,
            update(oldOptionConfig) {
              return { ...oldOptionConfig, demandThisOption: true };
            }
          }
        }
      },
      'old-scope': {
        string: true,
        description: 'The characters preceding "@" in existing target tags',
        default: '',
        defaultDescription:
          'if omitted while --force is used, only old-style tags are aliased'
      },
      'rename-matching-releases': {
        boolean: true,
        description: 'Whether to rename matching GitHub releases',
        default: false
      }
    },
    conflicts: conflictingUpstreamRenovationTasks.filter(
      (o) => !o['generate-alias-tags']
    ),
    async run(argv_, { debug, log }) {
      const argv = argv_ as RenovationTaskArgv;

      const {
        force,
        newScope: _newScope,
        oldScope: _oldScope,
        renameMatchingReleases: _renameMatchingReleases,
        [$executionContext]: { projectMetadata }
      } = argv;

      hardAssert(projectMetadata, ErrorMessage.GuruMeditation());

      const {
        // * Since "this-package" is not supported, we can't use cwdPackage
        rootPackage
      } = projectMetadata;

      const updatedScope = _newScope as string;
      // ? If oldScope === '' and --force, user is only targeting old-style tags
      const oldScope = (_oldScope || _newScope) as string;
      const renameMatchingReleases = _renameMatchingReleases as boolean;
      const logReplacement = makeReplacementLogger(log);

      debug('force: %O', force);
      debug('updatedScope: %O', updatedScope);
      debug('oldScope: %O', oldScope);
      debug('renameMatchingReleases: %O', renameMatchingReleases);

      if (renameMatchingReleases) {
        checkRuntimeIsReadyForGithub(argv, log);
      }

      await createAliasTags(oldScope, updatedScope, {
        alsoUpdateOldStyleVersionTags: force,
        debug,
        logReplacement
      });

      if (renameMatchingReleases) {
        const github = await makeOctokit({ debug, log });
        const ownerAndRepo = parsePackageJsonRepositoryIntoOwnerAndRepo(
          rootPackage.json
        );

        await renameGithubReleases(oldScope, updatedScope, {
          alsoUpdateGitHubReleaseNames: renameMatchingReleases,
          debug,
          github,
          log,
          logReplacement,
          ownerAndRepo
        });
      } else {
        debug(
          'skipped attempting to rename any GitHub releases since --rename-matching-releases=false'
        );
      }

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

Provide --assets-preset to specify which assets to regenerate. Note that, in a monorepo context, this preset is applied "generally" across the entire project; heuristic analysis is used to determine which preset to apply per sub-package (see symbiote wiki for more details). The parameter accepts one of the following presets: ${assetPresets.join(', ')}. The paths of assets included in the preset will be targeted for renovation with respect to --exclude-asset-paths and --include-asset-paths/--only-aliases, if provided.

Use either --exclude-asset-paths or --include-asset-paths to further narrow which files are regenerated. These parameters accept regular expressions that are matched against paths (relative to the project root) to be written out. Any paths matching one of the regular expressions provided by --exclude-asset-paths, or not matching one of the regular expressions provided by --include-asset-paths, will have their contents discarded instead of written out. Providing both --exclude-asset-paths and --include-asset-paths in the same command will cause an error.

This renovation attempts to import the "${aliasMapConfigProjectBase}" file if it exists at the root of the project. Use this file to provide additional \`RawAliasMapping[]\`s to include when regenerating files defining the project's import aliases. See the symbiote wiki documentation for further details.

When renovating Markdown files with templates divided into replacer regions via the magic comments "${magicStringReplacerRegionStart}" and "${magicStringReplacerRegionEnd}", this command will perform so-called "regional replacements" where only the content between the "start" and "end" comments will be modified. Regions without matching ids are ignored.

When regional replacements are performed, matching non-numeric reference definitions will be overwritten respectively, and new definitions will be appended. However, when attempting to renovate a Markdown file and either (1) it does not have replacer regions when its corresponding template contains replacer regions or (2) --force is used, the entire file will be overwritten instead.

Note that only certain Markdown files support regional replacements. See the symbiote wiki documentation for more details.

After invoking this renovation, you should use your IDE's diff tools to compare and contrast the latest best practices with the project's current configuration setup.

This renovation should be re-run each time a package is added to, or removed from, a symbiote-compliant monorepo but should NEVER be run in a CI environment or anywhere logs can be viewed publicly. Project compliant with symbiote can use the "renovate:aliases" NPM script.

See the symbiote wiki documentation for more details on this command and all available assets.
`,
    requiresForce: false,
    implies: { hush: true },
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
      'exclude-asset-paths': {
        alias: ['exclude-asset-path', 'exclude', 'skip'],
        array: true,
        string: true,
        description: 'Skip regenerating assets matching a regular expression',
        default: [],
        conflicts: ['include-asset-paths', 'only-aliases'],
        implies: { hush: false },
        looseImplications: true,
        coerce(paths: string[]) {
          // ! These regular expressions can never use the global (g) flag
          return paths.map((str) => new RegExp(str, 'u'));
        }
      },
      'include-asset-paths': {
        alias: ['include-asset-path', 'include', 'only'],
        array: true,
        string: true,
        description: 'Only regenerate assets matching a regular expression',
        default: [],
        conflicts: ['exclude-asset-paths', 'only-aliases'],
        implies: { hush: false },
        looseImplications: true,
        coerce(paths: string[]) {
          // ! These regular expressions can never use the global (g) flag
          return paths.map((str) => new RegExp(str, 'u'));
        }
      },
      'only-aliases': {
        boolean: true,
        description: 'Only regenerate assets containing aliases',
        default: false,
        conflicts: ['include-asset-paths', 'exclude-asset-paths'],
        implies: { hush: false },
        looseImplications: true
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

      const {
        force,
        silent: isSilenced,
        quiet: isQuieted,
        [$executionContext]: globalExecutionContext
      } = argv;

      const { projectMetadata } = globalExecutionContext;
      const preset = argv.assetsPreset as AssetPreset;
      const onlyAliases = argv.onlyAliases as boolean;
      const excludeAssetPaths = argv.excludeAssetPaths as RegExp[];
      const includeAssetPaths = onlyAliases
        ? [
            new RegExp(
              `^(${assetsThatContainAliases
                .map((path) => escapeStringRegexp(path))
                .join('|')})$`
            )
          ]
        : (argv.includeAssetPaths as RegExp[]);

      hardAssert(projectMetadata, ErrorMessage.GuruMeditation());

      const {
        // * Since "this-package" is not supported, we can't use cwdPackage
        rootPackage,
        subRootPackages
      } = projectMetadata;

      const {
        root: projectRoot,
        json: projectJson,
        attributes: projectAttributes
      } = rootPackage;

      const { owner: repoOwner, repo: repoName } =
        parsePackageJsonRepositoryIntoOwnerAndRepo(projectJson);

      // ? Since we're always using "unlimited" scope, transformerContext is
      // ? configured by default for use with the root package
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
        cwdPackagePartialImportSpecifier: '',
        additionalRawAliasMappings: await importAdditionalRawAliasMappings(
          projectMetadata,
          { log, debug }
        ),
        monorepoPackagesList:
          subRootPackages
            ?.values()
            .map((package_) => {
              return `- [${package_.json.name}](./${package_.relativeRoot}) — ${
                package_.json.description || '<!-- TODO: description goes here -->'
              }.`;
            })
            .toArray()
            .join('\n') || '<!-- TODO: a list of packages goes here -->',

        lintNpmScript: projectAttributes.monorepo ? 'lint:packages' : 'lint:package',
        testNpmScript:
          projectAttributes.monorepo &&
          (!projectAttributes.hybridrepo || !projectAttributes.multiversal)
            ? 'test:packages:all:unit'
            : 'test',

        repoOwner,
        repoName,
        year: new Date().getFullYear().toString(),
        codecovFlag: (await deriveCodecovPackageFlag(rootPackage)).flag,

        chooserBlockStart: magicStringChooserBlockStart,
        chooserBlockSplit: magicStringChooserBlockSplit,
        chooserBlockEnd: magicStringChooserBlockEnd
      };

      debug('preset: %O', preset);
      debug('onlyAliases: %O', onlyAliases);
      debug('excludeAssetPaths: %O', excludeAssetPaths);
      debug('includeAssetPaths: %O', includeAssetPaths);
      debug('transformer context: %O', transformerContext);

      const reifiedAssetPathEntries = Object.entries(
        await gatherAssetsFromAllTransformers({
          transformerContext
        })
      );

      let countAssetsSkipped = 0;
      let countAssetsDeleted = 0;
      const isSkippingAssets = includeAssetPaths.length || excludeAssetPaths.length;

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

          if (
            isSkippingAssets &&
            (includeAssetPaths.every((r) => !r.test(relativeOutputPath)) ||
              excludeAssetPaths.some((r) => r.test(relativeOutputPath)))
          ) {
            debug(
              'skipped asset due to path inclusion/exclusion: %O',
              absoluteOutputPath
            );

            countAssetsSkipped += 1;
            log([LogTag.IF_NOT_QUIETED], `🟧 ${relativeOutputPath}`);
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
              countAssetsDeleted += 1;
              log([LogTag.IF_NOT_HUSHED], `🟥 ${relativeOutputPath}`);
            } else {
              await mkdir(absoluteOutputParentPath, { mode: 0o775, recursive: true });
              await writeFile(absoluteOutputPath, content);
              log([LogTag.IF_NOT_HUSHED], `🟩 ${relativeOutputPath}`);
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
        '%O/%O renovations succeeded (%O skipped, %O deletions)',
        results.length - errorCount,
        results.length,
        countAssetsSkipped,
        countAssetsDeleted
      );

      const formatHandler = await getInvocableExtendedHandler<
        FormatCliArguments,
        GlobalExecutionContext
      >(format, globalExecutionContext);

      const promisedFormatter = Promise.resolve().then(() => {
        if (!force) {
          return formatHandler({
            env: [],
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
        }
      });

      let threw = false;

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
      } catch (error) {
        threw = true;
        throw error;
      } finally {
        if (force) {
          log.message(
            [LogTag.IF_NOT_QUIETED],
            'Skipped running formatter due to --force'
          );

          // ? Is a no-op
          await promisedFormatter;
        } else {
          log(
            [LogTag.IF_NOT_QUIETED],
            'Waiting for formatter sub-command to complete...'
          );

          try {
            await promisedFormatter;
            log([LogTag.IF_NOT_QUIETED], 'Formatter sub-command completed successfully');
          } catch (error) {
            debug.error('formatter sub-command failed:', error);

            log.warn(
              [LogTag.IF_NOT_SILENCED],
              `Formatter sub-command experienced a fatal error${threw ? ' (that was ignored due to another error)' : ''}:`
            );

            log.warn([LogTag.IF_NOT_SILENCED], error);

            if (!threw) {
              // eslint-disable-next-line no-unsafe-finally
              throw error;
            }
          }
        }
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
      'This renovation allows the user to interactively select and update dependencies in package.json files belong to packages across the entire project (depending on --scope). Each updated dependency will generate either a chore-type commit (for package.json::devDependency updates) or a build-type commit (for any other kind of dependency in package.json) with a short simple commit message tailored to the dependency being updated. Afterwards, "npm install --force" will be executed and the resulting package-lock.json committed.',
    requiresForce: false,
    supportedScopes: projectRenovateScopes,
    subOptions: {},
    // ? This renovation can only be run when no other tasks given
    check: function (currentArgumentValue, argv) {
      return (
        !currentArgumentValue ||
        Object.keys(renovationTasks).every(
          (task) => task === 'update-dependencies' || !argv[task]
        ) ||
        BfcErrorMessage.OptionValueMustBeAlone('update-dependencies', 'renovation')
      );
    } as RenovationTask['check'],
    async run(argv_, { log, debug }) {
      const argv = argv_ as RenovationTaskArgv;
      const {
        scope,
        [$executionContext]: { projectMetadata }
      } = argv;

      hardAssert(projectMetadata, ErrorMessage.GuruMeditation());

      const { cwdPackage, rootPackage, subRootPackages } = projectMetadata;
      const { root: projectRoot } = rootPackage;

      const targetPackages =
        scope === DefaultGlobalScope.Unlimited
          ? [rootPackage, ...(subRootPackages?.all || [])]
          : [cwdPackage];

      let didUpdateDependencies = false;

      for (const { json: oldJson_, root } of targetPackages) {
        // ? We'll be doing some light modifying
        const oldJson = structuredClone(oldJson_);
        const jsonPath = toPath(root, packageJsonConfigPackageBase);

        const {
          dependencies: oldDependencies,
          devDependencies: oldDevelopmentDependencies
        } = oldJson;

        log.newline([LogTag.IF_NOT_QUIETED]);

        await runWithInheritedIo('npx', [
          'npm-check-updates',
          '--interactive',
          '--dep=dev,prod',
          '--packageFile',
          jsonPath
        ]);

        const {
          dependencies: updatedDependencies,
          devDependencies: updatedDevelopmentDependencies
        } = await readXPackageJsonAtRoot(root, { useCached: false });

        const changedDependencies = setToPackageNames(
          depsToSet(oldDependencies).difference(depsToSet(updatedDependencies))
        );

        const changedDevelopmentDependencies = setToPackageNames(
          depsToSet(oldDevelopmentDependencies).difference(
            depsToSet(updatedDevelopmentDependencies)
          )
        );

        debug('oldDependencies: %O', oldDependencies);
        debug('oldDevelopmentDependencies: %O', oldDevelopmentDependencies);

        debug('updatedDependencies: %O', updatedDependencies);
        debug('updatedDevelopmentDependencies: %O', updatedDevelopmentDependencies);

        debug('changedDependencies: %O', changedDependencies);
        debug('changedDevelopmentDependencies: %O', changedDevelopmentDependencies);

        if (changedDependencies.length) {
          didUpdateDependencies = true;
          await commitUpdates(
            'production',
            jsonPath,
            oldJson,
            updatedDependencies,
            changedDependencies
          );
        } else {
          log([LogTag.IF_NOT_QUIETED], '(no production dependencies were updated)');
        }

        if (changedDevelopmentDependencies.length) {
          didUpdateDependencies = true;
          await commitUpdates(
            'development',
            jsonPath,
            oldJson,
            updatedDevelopmentDependencies,
            changedDevelopmentDependencies
          );
        } else {
          log([LogTag.IF_NOT_QUIETED], '(no development dependencies were updated)');
        }
      }

      if (didUpdateDependencies) {
        log.newline([LogTag.IF_NOT_QUIETED]);
        log.message([LogTag.IF_NOT_QUIETED], 'Installing updates...');
        log.newline([LogTag.IF_NOT_QUIETED]);

        await runWithInheritedIo('npm', ['install', '--force'], { cwd: projectRoot });

        const jsonLockPath = toPath(projectRoot, 'package-lock.json');

        log.newline([LogTag.IF_NOT_QUIETED]);
        log.message([LogTag.IF_NOT_QUIETED], 'Committing %O...', jsonLockPath);
        log.newline([LogTag.IF_NOT_QUIETED]);

        await runWithInheritedIo('git', ['add', jsonLockPath]);
        await runWithInheritedIo('git', [
          'commit',
          '--no-verify',
          '-m',
          `chore(package): update package-lock.json`
        ]);

        log.newline([LogTag.IF_NOT_SILENCED]);
        log.warn(
          [LogTag.IF_NOT_SILENCED],
          "⚠️ At this point, you should consider running this project's tests against the newly installed dependencies"
        );
      }

      log.newline([LogTag.IF_NOT_SILENCED]);

      // ? Typescript wants this here because of our "as const" for some reason
      return undefined;

      // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
      type Deps = XPackageJson['dependencies'] | XPackageJson['devDependencies'];

      function depsToSet(deps: Deps = {}): Set<string> {
        return new Set(
          Object.entries(deps).map(
            ([package_, semver]) => `${package_} ${semver || 'latest'}`
          )
        );
      }

      function setToPackageNames(set: Set<string>): string[] {
        return set
          .values()
          .map((value) => value.split(' ')[0]!)
          .toArray();
      }

      async function commitUpdates(
        type: 'production' | 'development',
        jsonPath: AbsolutePath,
        oldJson: XPackageJson,
        updatedDeps: Deps = {},
        changedDeps: string[]
      ) {
        const depTarget = type === 'production' ? 'dependencies' : 'devDependencies';
        const commitType = type === 'production' ? 'build' : 'chore';
        const commitScope = type === 'production' ? 'deps' : 'deps-dev';
        const oldDeps = oldJson[depTarget] || {};

        assert(oldJson[depTarget], ErrorMessage.GuruMeditation());

        for (const packageName of changedDeps) {
          const oldDep = oldDeps[packageName];
          const updatedDep = updatedDeps[packageName];

          assert(oldDep, ErrorMessage.GuruMeditation());
          assert(updatedDep, ErrorMessage.GuruMeditation());

          const oldDepVersion = semver.coerce(oldDep)?.version || oldDep;
          const updatedDepVersion = semver.coerce(updatedDep)?.version || updatedDep;

          oldJson[depTarget][packageName] = updatedDep;

          await writeFile(jsonPath, JSON.stringify(oldJson, undefined, 2) + '\n');
          await runWithInheritedIo('git', ['add', jsonPath]);
          await runWithInheritedIo('git', [
            'commit',
            '--no-verify',
            '-m',
            `${commitType}(${commitScope}): bump ${packageName} from ${oldDepVersion} to ${updatedDepVersion}`
          ]);
        }
      }
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

      const {
        scope,
        silent: isSilenced,
        quiet: isQuieted,
        [$executionContext]: globalExecutionContext
      } = argv;

      const { projectMetadata } = globalExecutionContext;

      hardAssert(projectMetadata, ErrorMessage.GuruMeditation());

      const { cwdPackage, rootPackage, subRootPackages } = projectMetadata;
      const allPackages = [rootPackage, ...(subRootPackages?.values() || [])];
      const allPackageNames = allPackages.map(({ json: { name } }) => name);

      debug('allPackageNames: %O', allPackageNames);

      if (subRootPackages) {
        if (scope === DefaultGlobalScope.ThisPackage) {
          log(
            [LogTag.IF_NOT_SILENCED],
            'Synchronizing dependencies in %O',
            cwdPackage.json.name
          );

          await synchronizePackageInterdependencies(cwdPackage);
        } else {
          log(
            [LogTag.IF_NOT_SILENCED],
            'Synchronizing dependencies across the entire project'
          );

          await Promise.all(
            allPackages.map((package_) => synchronizePackageInterdependencies(package_))
          );
        }
      } else {
        log.message([LogTag.IF_NOT_SILENCED], 'This renovation is a no-op in polyrepos');
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
                [LogTag.IF_NOT_SILENCED],
                `⛓️ Dependency synchronized:\n${SHORT_TAB}%O\n${SHORT_TAB}%O ==> %O`,
                theirPackageName,
                ourDependenciesSemverOfTheirPackage,
                theirPackageLatestSemver
              );
            } else {
              log(
                [LogTag.IF_NOT_SILENCED],
                `✔️ Dependency already synchronized:\n${SHORT_TAB}%O`,
                theirPackageName
              );
            }
          } else {
            log.warn(
              [LogTag.IF_NOT_SILENCED],
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
            env: [],
            scope: DefaultGlobalScope.Unlimited,
            files: [ourPackageJsonPath],
            silent: isSilenced,
            quiet: isQuieted,
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
            [LogTag.IF_NOT_SILENCED],
            `Wrote out updated dependencies to:\n${SHORT_TAB}%O`,
            ourPackageJsonPath
          );
        }

        log(
          [LogTag.IF_NOT_SILENCED],
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
        log([LogTag.IF_NOT_QUIETED], `Original value:  ${String(input.previousValue)}`);
      }

      if ('updatedValue' in input) {
        log([LogTag.IF_NOT_QUIETED], `Committed value: ${String(input.updatedValue)}`);
      }
    } else {
      log([LogTag.IF_NOT_QUIETED], `✖️ Skipped ${skippedDescription}`);
    }
  };
}

async function createAliasTags(
  oldScopeWithoutAtSign: string,
  updatedScopeWithoutAtSign: string,
  {
    alsoUpdateOldStyleVersionTags,
    debug,
    logReplacement
  }: {
    alsoUpdateOldStyleVersionTags: boolean;
    debug: ExtendedDebugger;
    logReplacement: ReturnType<typeof makeReplacementLogger>;
  }
) {
  debug('oldScopeWithoutAtSign: %O', oldScopeWithoutAtSign);
  debug('updatedScopeWithoutAtSign: %O', updatedScopeWithoutAtSign);
  debug('alsoUpdateOldStyleVersionTags: %O', alsoUpdateOldStyleVersionTags);

  const oldScopeWithAtSign = oldScopeWithoutAtSign + '@';
  const updatedScopeWithAtSign = updatedScopeWithoutAtSign + '@';

  const { stdout: tags_ } = await run('git', ['tag', '--list']);
  const oldTags = tags_.split(whitespaceRegExp);

  debug('oldTags (length): %O', oldTags.length);

  const allTags = [...oldTags];

  if (oldTags.length) {
    for (const oldTag of oldTags) {
      debug('oldTag: %O', oldTag);

      const versionDerivedFromOldStyleName = semver.valid(oldTag);
      const isOldStyleVersionTagAndRelevant =
        alsoUpdateOldStyleVersionTags && !!versionDerivedFromOldStyleName;
      const hasTargetedScopeInVersionTag = oldTag.startsWith(oldScopeWithAtSign);
      const aliasTag = isOldStyleVersionTagAndRelevant
        ? `${updatedScopeWithAtSign}${versionDerivedFromOldStyleName}`
        : oldTag.replace(oldScopeWithAtSign, updatedScopeWithAtSign);

      debug('versionDerivedFromOldStyleName: %O', versionDerivedFromOldStyleName);
      debug('isOldStyleVersionTagAndRelevant: %O', isOldStyleVersionTagAndRelevant);
      debug('hasTargetedScopeInVersionTag: %O', hasTargetedScopeInVersionTag);

      if (isOldStyleVersionTagAndRelevant || hasTargetedScopeInVersionTag) {
        debug('aliasTag: %O', aliasTag);

        const shouldCreateNewAliasTag = !allTags.includes(aliasTag);
        debug('shouldCreateNewAliasTag: %O', shouldCreateNewAliasTag);

        if (shouldCreateNewAliasTag) {
          const {
            stdout: [oldTagCommitterDate]
          } = await run('git', ['show', `${oldTag}^{}`, '--format=%aD'], {
            lines: true
          });

          debug('oldTagCommitterDate: %O', oldTagCommitterDate);
          softAssert(oldTagCommitterDate, ErrorMessage.GuruMeditation());
          debug.message('creating new tag %O that aliases %O', aliasTag, oldTag);

          await run(
            'git',
            ['tag', '-m', `alias => ${oldTag}`, aliasTag, `${oldTag}^{}`],
            {
              env: {
                // ? We need to preserve the date of the aliased tag
                GIT_COMMITTER_DATE: oldTagCommitterDate
              }
            }
          );

          allTags.push(aliasTag);
        }

        logReplacement({
          wasReplaced: shouldCreateNewAliasTag,
          replacedDescription: `Created alias tag`,
          updatedValue: `"${aliasTag}" => "${oldTag}"`,
          skippedDescription: `aliasing "${oldTag}": ${
            oldTag === aliasTag ? '' : `tag "${aliasTag}" `
          }already exists`
        });
      } else {
        logReplacement({
          wasReplaced: false,
          replacedDescription: '',
          skippedDescription: `aliasing "${oldTag}": not relevant`
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
      skippedDescription: 'creating alias tags: no tags to alias'
    });
  }
}

async function renameGithubReleases(
  oldScopeWithoutAtSign: string,
  updatedScopeWithoutAtSign: string,
  {
    github,
    ownerAndRepo,
    alsoUpdateGitHubReleaseNames: alsoUpdateOldStyleReleaseNames,
    debug,
    log,
    logReplacement
  }: {
    github: Awaited<ReturnType<typeof makeOctokit>>;
    ownerAndRepo: ReturnType<typeof parsePackageJsonRepositoryIntoOwnerAndRepo>;
    alsoUpdateGitHubReleaseNames: boolean;
    debug: ExtendedDebugger;
    log: ExtendedLogger;
    logReplacement: ReturnType<typeof makeReplacementLogger>;
  }
) {
  debug('oldScopeWithoutAtSign: %O', oldScopeWithoutAtSign);
  debug('updatedScopeWithoutAtSign: %O', updatedScopeWithoutAtSign);
  debug('alsoUpdateOldStyleReleaseNames: %O', alsoUpdateOldStyleReleaseNames);

  const oldScopeWithAtSign = oldScopeWithoutAtSign + '@';
  const updatedScopeWithAtSign = updatedScopeWithoutAtSign + '@';

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

      const versionDerivedFromOldStyleName = semver.valid(oldReleaseName);
      const isOldStyleReleaseNameAndRelevant =
        alsoUpdateOldStyleReleaseNames && !!versionDerivedFromOldStyleName;
      const hasTargetedScopeInReleaseName =
        oldReleaseName.startsWith(oldScopeWithAtSign);

      debug('versionDerivedFromOldStyleName: %O', versionDerivedFromOldStyleName);
      debug('isOldStyleReleaseNameAndRelevant: %O', isOldStyleReleaseNameAndRelevant);
      debug('hasTargetedScopeInReleaseName: %O', hasTargetedScopeInReleaseName);

      if (isOldStyleReleaseNameAndRelevant || hasTargetedScopeInReleaseName) {
        const updatedReleaseName = isOldStyleReleaseNameAndRelevant
          ? `${updatedScopeWithAtSign}${versionDerivedFromOldStyleName}`
          : oldReleaseName.replace(oldScopeWithAtSign, updatedScopeWithAtSign);

        const shouldUpdateReleaseName = oldReleaseName !== updatedReleaseName;

        debug('oldReleaseName: %O', oldReleaseName);
        debug('updatedReleaseName: %O', updatedReleaseName);
        debug('isOldStyleReleaseNameAndRelevant: %O', isOldStyleReleaseNameAndRelevant);
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
          replacedDescription: 'Updated release name',
          previousValue: oldReleaseName,
          updatedValue: updatedReleaseName,
          skippedDescription: `updating release "${oldReleaseName}": unnecessary`
        });
      } else {
        logReplacement({
          wasReplaced: false,
          replacedDescription: '',
          skippedDescription: `updating release "${oldReleaseName}": not relevant`
        });
      }
    })
  );
}
