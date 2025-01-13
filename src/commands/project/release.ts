import { type ChildConfiguration } from '@black-flag/core';

import { type AsStrictExecutionContext } from 'multiverse+bfe';
import { logStartTime } from 'multiverse+cli-utils:logging.ts';
import { scriptBasename } from 'multiverse+cli-utils:util.ts';

import {
  UnlimitedGlobalScope as ProjectReleaseScope,
  type GlobalCliArguments,
  type GlobalExecutionContext
} from 'universe:configure.ts';

import {
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage
} from 'universe:util.ts';

export type { RawAliasMapperArray, RawAliasMapperFunction } from 'universe:util.ts';

/**
 * @see {@link ProjectReleaseScope}
 */
export const projectReleaseScopes = Object.values(ProjectReleaseScope);

export type CustomCliArguments = GlobalCliArguments<ProjectReleaseScope>;

export default function command({
  log,
  debug_,
  state,
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    scope: { choices: projectReleaseScopes, default: ProjectReleaseScope.Unlimited }
  });

  return {
    builder,
    description: `Run each package's "release" script topologically across the entire project`,
    usage:
      withGlobalUsage(`This command will attempt to cut new releases of all packages in a project in topological order.

Well-ordered topological execution is supported by a dependency graph derived from the contents of each package's package.json "dependencies" and "peerDependencies" fields.`),
    handler: withGlobalHandler(async function ({ $0: scriptFullName, scope }) {
      const handlerName = scriptBasename(scriptFullName);
      const genericLogger = log.extend(handlerName);
      const debug = debug_.extend(`handler-${handlerName}`);

      debug('entered handler');

      await runGlobalPreChecks({ debug_, projectMetadata_, scope });
      const { startTime } = state;

      logStartTime({ log, startTime, isUsingLocalInstallation });

      debug('scope (unused): %O', scope);

      // TODO
      void genericLogger;
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
