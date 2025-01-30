import assert from 'node:assert';

import { CliError, type ChildConfiguration } from '@black-flag/core';
import { SHORT_TAB } from 'rejoinder';

import { type AsStrictExecutionContext } from 'multiverse+bfe';
import { softAssert } from 'multiverse+cli-utils:error.ts';

import {
  logStartTime,
  LogTag,
  standardSuccessMessage
} from 'multiverse+cli-utils:logging.ts';

import { scriptBasename } from 'multiverse+cli-utils:util.ts';
import { sortPackagesTopologically } from 'multiverse+project-utils:analyze.ts';

import {
  UnlimitedGlobalScope as TopologyScope,
  type GlobalCliArguments,
  type GlobalExecutionContext
} from 'universe:configure.ts';

import { ErrorMessage } from 'universe:error.ts';
import { attemptToRunCommand } from 'universe:task-runner.ts';

import {
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage
} from 'universe:util.ts';

export type { RawAliasMapperArray, RawAliasMapperFunction } from 'universe:util.ts';

/**
 * The NPM scripts that can be executed in topological sort order.
 */
export enum TopologyScript {
  Build = 'build',
  Release = 'release',
  Lint = 'lint',
  Test = 'test'
}

/**
 * @see {@link TopologyScope}
 */
export const topologyScopes = Object.values(TopologyScope);

/**
 * @see {@link TopologyScript}
 */
export const topologyScripts = Object.values(TopologyScript);

export type CustomCliArguments = GlobalCliArguments<TopologyScope> & {
  scriptOptions: string[];
  skipPackages: RegExp[];
  parallel: boolean;
} & (
    | { describe: false; runScript: TopologyScript }
    | { describe: true; runScript?: undefined }
  );

export default function command({
  standardLog,
  standardDebug,
  state,
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>(
    (blackFlag) => {
      blackFlag.parserConfiguration({ 'unknown-options-as-args': true });

      return {
        scope: { choices: topologyScopes, default: TopologyScope.Unlimited },
        describe: {
          boolean: true,
          description:
            "Describe this project's dependency topology then immediately exit",
          conflicts: ['run-script', 'script-options', 'parallel'],
          default: true
        },
        'run-script': {
          alias: 'run',
          string: true,
          choices: topologyScripts,
          description: 'The package.json script to execute',
          conflicts: 'describe',
          implies: { describe: false }
        },
        'script-options': {
          alias: 'options',
          array: true,
          description:
            'Command-line arguments passed through npm to the script being run',
          default: [],
          requires: 'run-script'
        },
        'skip-package': {
          alias: ['skip', 'skip-packages'],
          string: true,
          array: true,
          description: 'Exclude one or more packages (by name) via regular expression',
          default: [],
          coerce(expressions: string[]) {
            // ! These regular expressions can never use the global (g) flag
            return expressions.map((str) => new RegExp(str, 'u'));
          }
        },
        parallel: {
          boolean: true,
          default: true,
          describe: 'Run scripts concurrently when possible',
          requires: 'run-script',
          subOptionOf: {
            'run-script': {
              when(runScript: TopologyScript) {
                return [TopologyScript.Build, TopologyScript.Release].includes(
                  runScript
                );
              },
              update(oldOptionConfig) {
                return {
                  ...oldOptionConfig,
                  default: false,
                  check(parallel) {
                    return (
                      !parallel ||
                      ErrorMessage.BadOptionValue(
                        '--parallel',
                        parallel,
                        `when "--run-script" is set to "${TopologyScript.Build}" or "${TopologyScript.Release}"`
                      )
                    );
                  }
                };
              }
            }
          }
        }
      };
    }
  );

  return {
    builder,
    description: `Run a script from each package across the project in topological order`,
    usage:
      withGlobalUsage(`This command attempts to run in topological order the provided NPM script, once for each package in the project.

Running this command with no arguments is the same as providing --describe.

Unless --no-parallel is provided, lint and test scripts are run in parallel. Build and release scripts are always run serially. If the script does not exist in the package's package.json file, the package will be skipped. Otherwise, each script's output is individually buffered and released to the terminal respectively.

Well-ordered topological execution is supported by a dependency graph derived from the contents of each package's package.json "dependencies" and "peerDependencies" fields.`),
    handler: withGlobalHandler(async function ({
      $0: scriptFullName,
      scope,
      runScript,
      scriptOptions,
      skipPackages,
      parallel,
      describe
    }) {
      const handlerName = scriptBasename(scriptFullName);
      const genericLogger = standardLog.extend(handlerName);
      const debug = standardDebug.extend(`handler-${handlerName}`);

      debug('entered handler');

      const { projectMetadata } = await runGlobalPreChecks({
        standardDebug: standardDebug,
        projectMetadata_,
        scope
      });
      const { startTime } = state;

      logStartTime({ standardLog, startTime, isUsingLocalInstallation });

      debug('scope (unused): %O', scope);
      debug('runScript: %O', runScript);
      debug('scriptOptions: %O', scriptOptions);
      debug('skipPackages: %O', skipPackages);
      debug('parallel: %O', parallel);
      debug('describe: %O', describe);

      const topology = sortPackagesTopologically(projectMetadata, {
        skipPrivateDependencies: runScript === TopologyScript.Release
      });

      debug('topology: %O', topology);

      let packageCounter = 1;

      genericLogger.newline([LogTag.IF_NOT_HUSHED]);
      genericLogger(
        [LogTag.IF_NOT_HUSHED],
        `Project dependency topology (${runScript ?? 'script run'} order):

${SHORT_TAB}${topology
          .flatMap((packages) => {
            return packages.map(
              ({ json: { name, private: isPrivate } }) =>
                `${packageCounter++}. ${isPrivate ? '[⚠️PRIVATE] ' : ''}${name!}${
                  skipPackages.some((expr) => expr.test(name!))
                    ? ' (will be skipped)'
                    : ''
                }`
            );
          })
          .join(`\n${SHORT_TAB}`)}
`
      );
      genericLogger.newline([LogTag.IF_NOT_HUSHED]);

      if (!describe) {
        // TODO: generalize this task algo along with what's elsewhere

        const taskPromiseFunctions = [];

        try {
          for (const [index, packages] of topology.entries()) {
            debug(
              'processing %O scripts in run group %O: %O',
              packages.length,
              index + 1,
              packages
            );

            for (const package_ of packages) {
              const {
                json: { name: packageName },
                root: packageRoot
              } = package_;

              assert(packageName, ErrorMessage.GuruMeditation());

              const shouldSkip = skipPackages.some((expr) => expr.test(packageName));
              const hasTargetScript = !!package_.json.scripts?.[runScript];
              const taskLogger = genericLogger.extend(packageName);

              taskPromiseFunctions.push(async () => {
                if (shouldSkip) {
                  taskLogger.message(
                    [LogTag.IF_NOT_SILENCED],
                    '✖️ Skipped running script due to --skip-packages'
                  );
                } else if (hasTargetScript) {
                  taskLogger.message(
                    [LogTag.IF_NOT_SILENCED],
                    'Running script %O...',
                    runScript
                  );

                  const scriptExitCode = await attemptToRunCommand(
                    'npm',
                    ['run', runScript].concat(
                      scriptOptions.length ? ['--', ...scriptOptions] : []
                    ),
                    {
                      ...(parallel ? { all: true } : { all: false, stdio: 'inherit' }),
                      logger: taskLogger,
                      scriptName: runScript,
                      cwd: packageRoot
                    }
                  );

                  softAssert(
                    scriptExitCode === 0,
                    ErrorMessage.TopologyRunScriptExecutionFailed()
                  );

                  taskLogger([LogTag.IF_NOT_HUSHED], '✅');
                  taskLogger.newline([LogTag.IF_NOT_HUSHED]);
                  taskLogger.newline([LogTag.IF_NOT_HUSHED]);
                } else {
                  taskLogger.message(
                    [LogTag.IF_NOT_SILENCED],
                    '✖️ Skipped running non-existent script %O',
                    runScript
                  );
                }
              });
            }
          }

          debug(
            'running %O scripts %O:',
            taskPromiseFunctions.length,
            parallel ? 'concurrently' : 'serially'
          );

          if (parallel) {
            const results = await Promise.allSettled(
              taskPromiseFunctions.map((p) => p())
            );

            for (const result of results) {
              if (result.status === 'fulfilled') {
                debug('a script runner promise has been fulfilled');
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
        } catch (error) {
          genericLogger.newline([LogTag.IF_NOT_HUSHED]);
          throw error;
        }
      }

      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
