import { type ChildConfiguration } from '@black-flag/core';

import { type AsStrictExecutionContext } from 'multiverse+bfe';

import {
  logStartTime,
  LogTag,
  standardSuccessMessage
} from 'multiverse+cli-utils:logging.ts';

import { scriptBasename } from 'multiverse+cli-utils:util.ts';
import {
  turboConfigPackageBase,
  turboConfigProjectBase
} from 'multiverse+project-utils:fs.ts';

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
  multiversal: boolean;
};

export default function command({
  log,
  debug_,
  state,
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    scope: { choices: projectInitScopes, default: ProjectInitScope.Unlimited },
    multiversal: {
      boolean: true,
      demandThisOption: true,
      description: 'Whether this project allows multiversal imports or not'
    }
  });

  return {
    builder,
    description: 'Execute initialization tasks specific to Turbo',
    usage: withGlobalUsage(`$1.

Currently, this command regenerates ${turboConfigProjectBase} for every package in the project (including the root package) when --multiversal is provided. This step allows Turbo to pick up on the "cross-package dependencies" created when multiversal imports are used, such as in hybridrepos.

When --no-multiversal is provided instead, this command becomes a no-op. Typically, polyrepos and monorepos will use --no-multiversal, or will forgo using this command entirely.

This command is not meant to be run manually, but by Turbo itself as an initialization script/task that belongs exclusively to the project root package.json file. See the symbiote wiki for details.`),
    handler: withGlobalHandler(async function ({
      $0: scriptFullName,
      scope,
      multiversal
    }) {
      const genericLogger = log.extend(scriptBasename(scriptFullName));
      const debug = debug_.extend('handler');

      debug('entered handler');

      await runGlobalPreChecks({ debug_, projectMetadata_, scope });
      const { startTime } = state;

      logStartTime({ log, startTime, isUsingLocalInstallation });

      debug('scope (unused): %O', scope);
      debug('multiversal: %O', multiversal);

      if (multiversal) {
        genericLogger(
          [LogTag.IF_NOT_HUSHED],
          '💽 Regenerating %O Turbo configuration files...',
          turboConfigPackageBase
        );

        // TODO
        const turboConfigFiles = [];

        genericLogger(
          [LogTag.IF_NOT_HUSHED],
          '✅ Regenerated %O files',
          turboConfigFiles.length
        );
      } else {
        genericLogger([LogTag.IF_NOT_HUSHED], '✅ Project is not multiversal');
      }
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
