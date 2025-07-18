/* eslint-disable unicorn/prevent-abbreviations */
import { CliError } from '@-xun/cli';
import { softAssert } from '@-xun/cli/error';
import { LogTag } from '@-xun/cli/logging';
import { scriptBasename } from '@-xun/cli/util';
import { ProjectAttribute } from '@-xun/project';
import { run, runWithInheritedIo } from '@-xun/run';

import { ThisPackageGlobalScope as DevScope } from 'universe:configure.ts';
import { ErrorMessage } from 'universe:error.ts';

import {
  hasExitCode,
  logStartTime,
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage
} from 'universe:util.ts';

import type { AsStrictExecutionContext, ChildConfiguration } from '@-xun/cli';
import type { GlobalCliArguments, GlobalExecutionContext } from 'universe:configure.ts';

/**
 * @see {@link DevScope}
 */
export const devScopes = Object.values(DevScope);

export type CustomCliArguments = GlobalCliArguments<DevScope>;

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
    scope: { choices: devScopes }
  });

  return {
    builder,
    description: 'Deploy a local Webpack or Next.js development environment',
    usage: withGlobalUsage(),
    handler: withGlobalHandler(async function ({ $0: scriptFullName, scope }) {
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
      genericLogger([LogTag.IF_NOT_QUIETED], 'Running project dev tools...');

      debug('scope (unused): %O', scope);

      const { attributes: projectAttributes } = projectMetadata.rootPackage;
      const passControlMessage = (runtime: string) =>
        `--- control passed to ${runtime} runtime ---`;

      try {
        if (projectAttributes[ProjectAttribute.Next]) {
          const port = await acquirePort();
          genericLogger([LogTag.IF_NOT_QUIETED], passControlMessage('Next.js'));
          await runWithInheritedIo('npx', ['next', '-p', port]);
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
  };
}
