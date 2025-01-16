import { type ChildConfiguration } from '@black-flag/core';

import { type AsStrictExecutionContext } from 'multiverse+bfe';

import {
  logStartTime,
  LogTag,
  standardSuccessMessage
} from 'multiverse+cli-utils:logging.ts';

import { scriptBasename } from 'multiverse+cli-utils:util.ts';

import {
  UnlimitedGlobalScope as ProjectInitScope,
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
 * @see {@link ProjectInitScope}
 */
export const projectInitScopes = Object.values(ProjectInitScope);

export type CustomCliArguments = GlobalCliArguments<ProjectInitScope> & {
  // TODO
};

export default function command({
  log,
  debug_,
  state,
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    // TODO
    scope: { choices: projectInitScopes, default: ProjectInitScope.Unlimited }
  });

  return {
    builder,
    description: 'Create a new project or package from one of several presets',
    usage: withGlobalUsage(),
    handler: withGlobalHandler(async function ({ $0: scriptFullName, scope }) {
      const handlerName = scriptBasename(scriptFullName);
      const genericLogger = log.extend(handlerName);
      const debug = debug_.extend(`handler-${handlerName}`);

      debug('entered handler');

      await runGlobalPreChecks({ debug_, projectMetadata_, scope });
      const { startTime } = state;

      logStartTime({ log, startTime, isUsingLocalInstallation });
      genericLogger([LogTag.IF_NOT_QUIETED], 'Initializing new project...');

      debug('scope (unused): %O', scope);

      // TODO: (select either: create a new directory at custom path OR use cwd)
      // ! v
      // TODO: is idempotent and NEVER overwrites things that already exist
      // ! ^
      // TODO: if handlebar notation suffixed by \n\n, replace suffix with \n (or is this handled via prettier already?)
      // TODO: (includes the lenses: cli, next.js, react, library)
      // TODO: (launch and task examples in vscode are materialized)
      // TODO: (can init new monorepo packages with proper setup including tsconfig files and what not)
      // TODO: (needs to delete the remark-link ignore comment from all Markdown files coming from src/assets/templates)
      // TODO ("symbiote project init --from-template next" etc)
      // TODO ("symbiote project init --with-lib newLibA" which regenerates aliases)
      // TODO ("symbiote project init --with-package newMonorepoPackage" which has the ability to turn a polyrepo into a monorepo if it isn't already (also regenerates aliases))
      // TODO (enable private vulnerability reporting and secret scanning for GitHub repositories)
      // TODO (each project gets its own personal GPG key added to the appropriate account automatically upon creation)
      // TODO (need to handle assetverse aliasing concerns (example in quiz-euphoriareign))
      // TODO (set special version of renovate command depending on preset used: basic, cli, lib, lib-esm, react, next)
      // TODO (adding a new package to a monorepo should be accompanied by a commit with a message indicating the creation of the new "stub" package, then a `npm install --force`, then a regeneration of the configuration files that contain the project's aliases, and then finally a `...@0.0.0-init` tag for the recently created "stub" package commit)
      // TODO (let the user know that codecov flags need to be enabled manually)

      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
