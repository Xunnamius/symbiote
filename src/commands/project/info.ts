import {
  logStartTime,
  LogTag,
  standardSuccessMessage
} from 'multiverse+cli-utils:logging.ts';

import { scriptBasename } from 'multiverse+cli-utils:util.ts';

import {
  DefaultGlobalScope,
  DefaultGlobalScope as ProjectInfoScope
} from 'universe:configure.ts';

import {
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage
} from 'universe:util.ts';

import type { ChildConfiguration } from '@black-flag/core';
import type { AsStrictExecutionContext } from 'multiverse+bfe';
import type { GlobalCliArguments, GlobalExecutionContext } from 'universe:configure.ts';

/**
 * @see {@link ProjectInfoScope}
 */
export const projectInfoScopes = Object.values(ProjectInfoScope);

export type CustomCliArguments = GlobalCliArguments & {
  // TODO
};

export default function command({
  standardLog,
  standardDebug,
  state,
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    // TODO
    scope: { choices: projectInfoScopes, default: ProjectInfoScope.Unlimited }
  });

  return {
    builder,
    description: 'Gather and report information about this project',
    usage: withGlobalUsage(),
    handler: withGlobalHandler(async function ({ $0: scriptFullName, scope }) {
      const handlerName = scriptBasename(scriptFullName);
      const genericLogger = standardLog.extend(handlerName);
      const debug = standardDebug.extend(`handler-${handlerName}`);

      debug('entered handler');

      await runGlobalPreChecks({
        standardDebug: standardDebug,
        projectMetadata_,
        scope
      });
      const { startTime } = state;

      logStartTime({ standardLog, startTime, isUsingLocalInstallation });

      genericLogger(
        [LogTag.IF_NOT_QUIETED],
        `Analyzing project${scope === DefaultGlobalScope.ThisPackage ? ' (results will be limited to the current package)' : ''}...`
      );

      debug('scope: %O', scope);

      // TODO (what is the next version of all packages gonna be, if any?)
      // TODO (--porcelain to output simple key=value lines)
      // TODO (report on which vscode settings are used via .vscode, but also warn that in a vscode multi-root workspace, options are ignored in favor of the options in said workspace's configuration file directly)
      // TODO (report on `*.ignore`-ed packages)
      // TODO (import graph made visible using treeify package)

      genericLogger([LogTag.IF_NOT_QUIETED], 'Preparing report...');

      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
