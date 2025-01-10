/* eslint-disable unicorn/prevent-abbreviations */
import { run, runWithInheritedIo } from '@-xun/run';
import { CliError, type ChildConfiguration } from '@black-flag/core';

import { type AsStrictExecutionContext } from 'multiverse+bfe';
import { softAssert } from 'multiverse+cli-utils:error.ts';
import { logStartTime, LogTag } from 'multiverse+cli-utils:logging.ts';
import { scriptBasename } from 'multiverse+cli-utils:util.ts';
import { ProjectAttribute } from 'multiverse+project-utils';

import {
  ThisPackageGlobalScope as DevScope,
  type GlobalCliArguments,
  type GlobalExecutionContext
} from 'universe:configure.ts';

import { ErrorMessage } from 'universe:error.ts';

import {
  hasExitCode,
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage
} from 'universe:util.ts';

/**
 * @see {@link DevScope}
 */
export const devScopes = Object.values(DevScope);

export type CustomCliArguments = GlobalCliArguments<DevScope>;

export default function command({
  log,
  debug_,
  state,
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    scope: { choices: devScopes }
  });

  return {
    builder,
    description: 'Deploy a local development environment, if applicable',
    usage: withGlobalUsage(),
    handler: withGlobalHandler(async function ({ $0: scriptFullName, scope }) {
      const genericLogger = log.extend(scriptBasename(scriptFullName));
      const debug = debug_.extend(`handler-${scriptFullName}`);

      debug('entered handler');

      const { projectMetadata } = await runGlobalPreChecks({
        debug_,
        projectMetadata_,
        scope
      });

      const { startTime } = state;

      logStartTime({ log, startTime, isUsingLocalInstallation });
      genericLogger([LogTag.IF_NOT_QUIETED], 'Running project dev tools...');

      debug('scope (unused): %O', scope);

      const { attributes: projectAttributes } = projectMetadata.rootPackage;
      const passControlMessage = (runtime: string) =>
        `--- control passed to ${runtime} runtime ---`;

      try {
        if (projectAttributes[ProjectAttribute.Next]) {
          const port = await acquirePort();
          genericLogger([LogTag.IF_NOT_QUIETED], passControlMessage('Next.js'));
          await runWithInheritedIo(ProjectAttribute.Next, ['-p', port]);
        } else if (projectAttributes[ProjectAttribute.Webpack]) {
          const port = await acquirePort();

          genericLogger(
            [LogTag.IF_NOT_QUIETED],
            passControlMessage('Webpack dev server')
          );

          await runWithInheritedIo('webpack', ['serve', '--port', port], {
            extendEnv: true,
            env: { USE_WEBPACK_DEV_CONFIG: 'true', NODE_ENV: 'development' }
          });
        } else {
          softAssert(ErrorMessage.UnsupportedCommand());
        }
      } catch (error) {
        throw hasExitCode(error)
          ? new CliError('', { suggestedExitCode: error.exitCode })
          : error;
      }

      async function acquirePort() {
        // TODO: replace this when acquire-port gets programmatic API
        const port = (await run('npx', ['-q', 'acquire-port'])).stdout;
        debug('acquired port: %O', port);

        return port;
      }
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
