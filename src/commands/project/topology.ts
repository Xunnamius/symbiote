import { type ChildConfiguration } from '@black-flag/core';

import { type AsStrictExecutionContext } from 'multiverse+bfe';
import { logStartTime } from 'multiverse+cli-utils:logging.ts';
import { scriptBasename } from 'multiverse+cli-utils:util.ts';

import {
  UnlimitedGlobalScope as TopologyScope,
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

export type CustomCliArguments = GlobalCliArguments<TopologyScope>;

export default function command({
  log,
  debug_,
  state,
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    scope: { choices: topologyScopes, default: TopologyScope.Unlimited },
    'run-script': {
      alias: 'run',
      string: true,
      choices: topologyScripts,
      description: 'The package.json script to execute',
      default: []
    },
    'script-options': {
      alias: 'options',
      array: true,
      description: 'Command-line arguments passed directly to the script being run',
      default: []
    }
  });

  return {
    builder,
    description: `Run a script from each package across the project in topological order`,
    usage:
      withGlobalUsage(`This command attempts to run in topological order the provided NPM script, once for each package in the project.

Lint and test scripts are run in parallel. Build and release scripts are run in serially. If the script does not exist in the package's package.json file, the package will be skipped. Otherwise, each script's output is individually buffered and released to the terminal respectively.

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

      // TODO: throws when a dependency, peerDependency, or devDependency has
      // TODO: "private: true" in its package.json
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
