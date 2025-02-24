/* eslint-disable no-await-in-loop */
import { rm, symlink } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

import { CliError } from '@-xun/cli';
import { LogTag, standardSuccessMessage } from '@-xun/cli/logging';
import { scriptBasename } from '@-xun/cli/util';

import {
  getCurrentWorkingDirectory,
  toAbsolutePath,
  toPath,
  toRelativePath
} from '@-xun/fs';

import {
  isAccessible,
  isRootPackage,
  postNpmInstallPackageBase,
  ProjectAttribute
} from '@-xun/project';

import { runWithInheritedIo } from '@-xun/run';

import { bundleDependencies } from 'rootverse:package.json';

import { UnlimitedGlobalScope as PreparationScope } from 'universe:configure.ts';
import { ErrorMessage } from 'universe:error.ts';

import {
  logStartTime,
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage
} from 'universe:util.ts';

import type { AsStrictExecutionContext, ChildConfiguration } from '@-xun/cli';
import type { AbsolutePath } from '@-xun/fs';
import type { GlobalCliArguments, GlobalExecutionContext } from 'universe:configure.ts';

/**
 * @see {@link PreparationScope}
 */
export const preparationScopes = Object.values(PreparationScope);

export type CustomCliArguments = GlobalCliArguments<PreparationScope> & {
  force: boolean;
  parallel: boolean;
  runToCompletion: boolean;
};

export default function command({
  standardLog,
  standardDebug,
  state,
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>): ChildConfiguration<
  CustomCliArguments,
  GlobalExecutionContext
> {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    hush: { default: true },
    scope: { choices: preparationScopes, default: PreparationScope.Unlimited },
    force: {
      boolean: true,
      default: false,
      describe: 'Run initialization tasks (except Husky) regardless of environment'
    },
    parallel: {
      boolean: true,
      default: true,
      describe: 'Run initialization tasks concurrently where possible'
    },
    'run-to-completion': {
      boolean: true,
      default: true,
      description: 'Do not exit until all tasks have finished running'
    }
  });

  return {
    builder,
    description: 'Run project-level initialization tasks across all roots',
    usage: withGlobalUsage(
      `$1. The tasks executed by this command are, in order:

1. If the runtime pre-checks fail, exit
2. If the project is a hybridrepo, symlink into the project root node_modules directory a self-reference to the root package if such a link does not already exist
3. Symlink into the project root node_modules directory any dependencies explicitly bundled with symbiote if these links do not already exist
4. If the npm_command environment variable is not "install" or "ci", and --force is not provided, exit
5. If executing in a non-CI development environment and the current working directory is the project root, run \`npx husky\`
6. If the current working directory contains a post-npm-install script, run that script
7. If the current working directory is the project root and the project is a monorepo, search each package root for a post-npm-install script and run them as they are encountered

The same current working directory is shared by all tasks, and is equal to the current working directory at the time this command was executed.

The ${postNpmInstallPackageBase} file, when present at a package root, is recognized as a post-npm-install script. Each package in a project (including the root package) can contain at most one post-npm-install script. These scrips have access to the following additional environment variables, each of which are defined as either "true" or "false": SYMBIOTE_IS_CI, SYMBIOTE_IS_DEVELOPMENT_ENV, SYMBIOTE_NPM_IS_INSTALLING.

Notwithstanding node_modules symlinking, this command exits (becomes a no-op) when the runtime pre-checks fail, the CI environment variable is defined (implies a CI environment and sets SYMBIOTE_IS_CI=true), or when the NODE_ENV environment variable is NOT undefined nor equal to "development" (implies a non-development environment and sets SYMBIOTE_IS_DEVELOPMENT_ENV=false).

This command additionally sets SYMBIOTE_IS_HUSHED=true when --hush is provided (true by default), SYMBIOTE_IS_QUIETED=true when --quiet is provided, SYMBIOTE_IS_SILENCED=true when --silent is provided, and SYMBIOTE_IS_FORCED=true when --force is provided.

Provide --force to force this command to run post-npm-install scripts without regard for any environment variables, which can be useful in those rare cases where the scripts must run in CI and/or non-development environments. In such a scenario, post-npm-install scripts should take advantage of the available SYMBIOTE_* environment variables to alter their functionality (e.g. only running when SYMBIOTE_NPM_IS_INSTALLING=true). However, if the runtime pre-checks fail, this command will always exit as a no-op regardless of the flags passed.

Note that, regardless of the presence of --force, Husky will NEVER execute in a CI or non-development environment.

Typically, this command should not be executed manually but by your package manager automatically at "install time," i.e. when running \`npm install\`/\`npm ci\` locally. With respect to NPM, this command should be run whenever NPM would run its "prepare" life cycle operation. Therefore, note that post-npm-install scripts MUST BE IDEMPOTENT and EXTREMELY LIGHTWEIGHT, as they WILL be invoked multiple times over the lifetime of long-lived projects, including at ODD TIMES like during package publication/release. See https://docs.npmjs.com/cli/v10/using-npm/scripts#life-cycle-operation-order for details.

This command runs all its tasks asynchronously and concurrently where possible. To force serial invocation, provide --no-parallel. This command also "runs to completion," in that task-level errors will not interrupt its execution. To fail on the first encountered error, provide --no-run-to-completion`
    ),
    handler: withGlobalHandler(async function ({
      $0: scriptFullName,
      scope,
      force,
      parallel,
      runToCompletion,
      hush: isHushed,
      quiet: isQuieted,
      silent: isSilenced
    }) {
      const handlerName = scriptBasename(scriptFullName);
      const genericLogger = standardLog.extend(handlerName);
      const debug = standardDebug.extend(`handler-${handlerName}`);

      debug('entered handler');

      // * 1
      try {
        await runGlobalPreChecks({
          standardDebug: standardDebug,
          projectMetadata_,
          scope
        });
      } catch (error) {
        standardLog.warn(
          [LogTag.IF_NOT_QUIETED],
          'Global pre-checks failed for command %O with error: %O',
          scriptFullName,
          error
        );

        standardLog.warn(
          [LogTag.IF_NOT_QUIETED],
          'Since this command can be triggered by package managers in ways that are hard to predict, this error will be suppressed and symbiote will exit vacuously (exit code 0)'
        );

        return;
      }

      // ? Thanks to runGlobalPreChecks (above)
      const projectMetadata = projectMetadata_!;
      const { startTime } = state;

      logStartTime({ standardLog, startTime, isUsingLocalInstallation });
      genericLogger([LogTag.IF_NOT_QUIETED], 'Preparing project...');
      genericLogger.newline([LogTag.IF_NOT_QUIETED]);

      debug('scope (unused): %O', scope);
      debug('force: %O', force);
      debug('parallel: %O', parallel);
      debug('runToCompletion: %O', runToCompletion);

      const {
        rootPackage: {
          root: projectRoot,
          attributes: projectAttributes,
          json: { name: rootPackageName }
        },
        cwdPackage,
        subRootPackages
      } = projectMetadata;

      const { root: currentPackageRoot } = cwdPackage;
      const cwd = getCurrentWorkingDirectory();

      const isCwdTheProjectRoot = isRootPackage(cwdPackage);
      const isInCiEnvironment = !!process.env.CI;

      const isInDevelopmentEnvironment =
        process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development';

      const isRunningNpmInstallCommand = ['install', 'ci'].includes(
        process.env.npm_command!
      );

      debug('projectRoot: %O', projectRoot);
      debug('cwdPackageRoot: %O', currentPackageRoot);
      debug('isCwdTheProjectRoot: %O', isCwdTheProjectRoot);
      debug('isInCiEnvironment: %O', isInCiEnvironment);
      debug('isInDevelopmentEnvironment: %O', isInDevelopmentEnvironment);
      debug('isRunningNpmInstallCommand: %O', isRunningNpmInstallCommand);

      const shouldConsiderRunningTasks = force || isRunningNpmInstallCommand;
      debug('shouldConsiderRunningTasks: %O', shouldConsiderRunningTasks);

      if (runToCompletion) {
        debug.message(
          'preparation tasks will run to completion even if an error occurs'
        );
      }

      let scriptsExecuted = 0;
      let totalScripts = 0;
      const errors: [identifier: string, error: unknown][] = [];
      const tasks: ((shouldLogSuccess: boolean) => Promise<unknown>)[] = [];

      // * 2
      if (projectAttributes[ProjectAttribute.Hybridrepo]) {
        const linkPath = toPath(projectRoot, 'node_modules', rootPackageName);
        const logText = 'Installed root package self-referential dependency symlink';

        await rm(linkPath, { force: true, recursive: true, maxRetries: 10 });
        await symlink(projectRoot, linkPath, 'junction');

        debug(`%O => %O`, linkPath, projectRoot);

        if (isHushed) {
          genericLogger([LogTag.IF_NOT_QUIETED], logText);
        } else {
          genericLogger(
            [LogTag.IF_NOT_QUIETED],
            `${logText}: %O => %O`,
            rootPackageName,
            '..'
          );
        }
      }

      // * 3
      if (bundleDependencies.length) {
        let linkCount = 0;

        const nodeModulesPath = toPath(projectRoot, 'node_modules');
        const bundledModulesPath = toPath(
          nodeModulesPath,
          '@-xun',
          'symbiote',
          'node_modules'
        );

        for (const packageName of bundleDependencies) {
          const nodeModulesPackagePath = toPath(nodeModulesPath, packageName);
          const symbiotePackagePath = toPath(bundledModulesPath, packageName);

          debug(
            'potential symlink: %O => %O',
            nodeModulesPackagePath,
            symbiotePackagePath
          );

          if (await isAccessible(nodeModulesPackagePath, { useCached: false })) {
            debug.message('dependency symlink not created: path already exists');
          } else {
            linkCount += 1;
            await symlink(symbiotePackagePath, nodeModulesPackagePath, 'junction');

            genericLogger(
              [LogTag.IF_NOT_HUSHED],
              'Installed dependency symlink: %O => %O',
              toRelativePath(nodeModulesPath, nodeModulesPackagePath),
              toRelativePath(nodeModulesPath, symbiotePackagePath)
            );
          }
        }

        const skippedCount = bundleDependencies.length - linkCount;

        genericLogger(
          [LogTag.IF_NOT_QUIETED],
          `Symlinked %O/%O of symbiote's bundled dependencies into node_modules (%O already exist${skippedCount === 1 ? 's' : ''})`,
          linkCount,
          bundleDependencies.length,
          skippedCount
        );
      }

      // * 4 & 5
      if (
        isCwdTheProjectRoot &&
        shouldConsiderRunningTasks &&
        !isInCiEnvironment &&
        isInDevelopmentEnvironment
      ) {
        tasks.push(async (shouldLogSuccess) => {
          try {
            genericLogger(
              [LogTag.IF_NOT_QUIETED],
              'Executing %O initialization task',
              'husky'
            );

            // {@symbiote/notExtraneous husky}
            await runWithInheritedIo('npx', ['husky'], { cwd: projectRoot });
            debug('husky initialization was successful');

            // ? This is here because we don't want one task to say "success!"
            // ? while another poos the bed, especially when they are executed
            // ? concurrently
            // TODO: replace this horror with centralized task logging
            if (shouldLogSuccess) {
              genericLogger([LogTag.IF_NOT_QUIETED], 'Task execution succeeded 🟩');
            }
          } catch (error) {
            errors.push(['husky executable', error]);
          }
        });
      }

      // * 4
      if (shouldConsiderRunningTasks) {
        const roots = new Set<AbsolutePath>([currentPackageRoot]);

        // * 7
        if (isCwdTheProjectRoot) {
          subRootPackages?.all.forEach(({ root }) => roots.add(root));
        }

        debug('roots: %O', roots);

        // * 6 & 7
        for (const root of roots) {
          const postNpmInstallPath = pathToFileURL(
            toAbsolutePath(root, postNpmInstallPackageBase)
          ).toString();

          debug('potential post-npm-install script path: %O', postNpmInstallPath);

          tasks.push((shouldLogSuccess) =>
            isAccessible(postNpmInstallPath, { useCached: true }).then(
              async (isPathAccessible) => {
                if (isPathAccessible) {
                  debug('post-npm-install found at: %O', postNpmInstallPath);
                  totalScripts += 1;

                  try {
                    // ? Reset these before each invocation just in case a
                    // ? script modified them

                    process.env.SYMBIOTE_IS_CI = isInCiEnvironment.toString();
                    process.env.SYMBIOTE_IS_DEVELOPMENT_ENV =
                      isInDevelopmentEnvironment.toString();
                    process.env.SYMBIOTE_NPM_IS_INSTALLING =
                      isRunningNpmInstallCommand.toString();

                    process.env.SYMBIOTE_IS_HUSHED = isHushed.toString();
                    process.env.SYMBIOTE_IS_QUIETED = isQuieted.toString();
                    process.env.SYMBIOTE_IS_SILENCED = isSilenced.toString();
                    process.env.SYMBIOTE_IS_FORCED = force.toString();

                    debug('SYMBIOTE_IS_CI: %O', process.env.SYMBIOTE_IS_CI);

                    debug(
                      'SYMBIOTE_IS_DEVELOPMENT_ENV: %O',
                      process.env.SYMBIOTE_IS_DEVELOPMENT_ENV
                    );

                    debug(
                      'SYMBIOTE_NPM_IS_INSTALLING: %O',
                      process.env.SYMBIOTE_NPM_IS_INSTALLING
                    );

                    debug('SYMBIOTE_IS_HUSHED: %O', process.env.SYMBIOTE_IS_HUSHED);
                    debug('SYMBIOTE_IS_QUIETED: %O', process.env.SYMBIOTE_IS_QUIETED);
                    debug('SYMBIOTE_IS_SILENCED: %O', process.env.SYMBIOTE_IS_SILENCED);
                    debug('SYMBIOTE_IS_FORCED: %O', process.env.SYMBIOTE_IS_FORCED);

                    genericLogger(
                      [LogTag.IF_NOT_QUIETED],
                      'Executing post-npm-install script at: %O',
                      postNpmInstallPath
                    );

                    await import(postNpmInstallPath);

                    debug(
                      'post-install script execution successful: %O',
                      postNpmInstallPath
                    );

                    scriptsExecuted += 1;

                    // ? This is here because we don't want one task to say
                    // ? "success!" while another poos the bed, especially when
                    // ? they are executed concurrently
                    // TODO: replace this horror with centralized task logging
                    if (shouldLogSuccess) {
                      genericLogger.message(
                        [LogTag.IF_NOT_QUIETED],
                        'Task execution succeeded 🟩'
                      );
                    }
                  } catch (error) {
                    debug.error('execution attempt failed catastrophically: %O', error);

                    errors.push([postNpmInstallPath, error]);

                    throw new CliError(
                      ErrorMessage.BadPostNpmInstallScript(postNpmInstallPath),
                      { cause: error }
                    );
                  } finally {
                    try {
                      process.chdir(cwd);
                    } catch {}
                  }
                } else {
                  debug.message(
                    'no post-install script found at: %O',
                    postNpmInstallPath
                  );
                }
              }
            )
          );
        }
      }

      // TODO: use this in eventual task-runner API factorization along with
      // TODO: what's in renovate, release, etc

      debug.message('task count (any of which may be no-ops): %O', tasks.length);

      if (tasks.length) {
        // TODO: redesign to have centralized logging in these blocks
        if (parallel) {
          debug.message('running tasks in parallel...');
          await Promise.all(
            tasks.map(async (task) => {
              try {
                await task(false);
              } catch (error) {
                if (!runToCompletion) {
                  throw error;
                }
              }
            })
          );
        } else {
          debug.message('running tasks serially...');

          for (const task of tasks) {
            try {
              // ? Order matters

              await task(true);
            } catch (error) {
              if (runToCompletion) {
                genericLogger.error([LogTag.IF_NOT_QUIETED], 'Task execution failed 🟥');
              } else {
                throw error;
              }
            }
          }
        }

        if (errors.length) {
          genericLogger.newline([LogTag.IF_NOT_SILENCED], 'alternate');

          for (const [description, error] of errors) {
            genericLogger.error(
              [LogTag.IF_NOT_SILENCED],
              'Preparation task %O experienced a fatal execution error:\n%O',
              description,
              error
            );
          }

          throw new CliError(ErrorMessage.PreparationRunnerExecutionFailed());
        }

        genericLogger.newline([LogTag.IF_NOT_QUIETED]);

        if (totalScripts) {
          genericLogger(
            [LogTag.IF_NOT_QUIETED],
            `Executed %O/%O post-npm-install scripts successfully`,
            scriptsExecuted,
            totalScripts
          );
        }

        genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
      } else {
        genericLogger(
          [LogTag.IF_NOT_QUIETED],
          'Skipped further preparation (no runnable tasks remaining) 🟩'
        );
      }
    })
  };
}
