import { CliError } from '@-xun/cli';
import { softAssert } from '@-xun/cli/error';
import { LogTag } from '@-xun/cli/logging';
import { scriptBasename } from '@-xun/cli/util';

import {
  gatherProjectFiles,
  isWorkspacePackage,
  ProjectAttribute,
  WorkspaceAttribute
} from '@-xun/project';

import { runWithInheritedIo } from '@-xun/run';

import { DefaultGlobalScope } from 'universe:configure.ts';
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

export type CustomCliArguments = GlobalCliArguments;

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
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>(
    (blackFlag) => {
      blackFlag.strict(false);
      return { scope: { default: DefaultGlobalScope.Unlimited } };
    }
  );

  return {
    builder,
    description: 'Run a CLI or deploy a local production environment, if applicable',
    usage: withGlobalUsage(
      `$1.

If this command is run with --scope=unlimited (the default) in a monorepo, and the package at the current working directory is not CLI-enabled nor a Next.js project, this command will search the project for the first available CLI starting from the root package.`
    ),
    handler: withGlobalHandler(async function ({ $0: scriptFullName, scope, _: args_ }) {
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

      debug('scope: %O', scope);

      const args = args_.map((a) => a.toString());
      debug('additional (passthrough) args: %O', args);

      const {
        cwdPackage,
        rootPackage: { attributes: projectAttributes }
      } = projectMetadata;

      const {
        mainBinFiles: { atProjectRoot, atWorkspaceRoot, atAnyRoot }
      } = await gatherProjectFiles(projectMetadata, { useCached: true });

      const passControlMessage = (runtime: string) =>
        `--- control passed to ${runtime} runtime ---`;

      try {
        // ? If we're in a package sub-root, let's see if it's a CLI first
        if (
          isWorkspacePackage(cwdPackage) &&
          cwdPackage.attributes[WorkspaceAttribute.Cli] &&
          atWorkspaceRoot.has(cwdPackage.id)
        ) {
          genericLogger(
            [LogTag.IF_NOT_QUIETED],
            passControlMessage('CLI (current package)')
          );
          await runWithInheritedIo(atWorkspaceRoot.get(cwdPackage.id)!, args);
        }
        // ? Otherwise, check if the project root is a CLI
        else if (projectAttributes[ProjectAttribute.Cli] && atProjectRoot) {
          genericLogger(
            [LogTag.IF_NOT_QUIETED],
            passControlMessage('CLI (root package) (current package)')
          );
          await runWithInheritedIo(atProjectRoot, args);
        }
        // ? Otherwise, if scope is unlimited, find the first available CLI
        else if (scope === DefaultGlobalScope.Unlimited && atAnyRoot.length) {
          genericLogger(
            [LogTag.IF_NOT_QUIETED],
            passControlMessage(`CLI (first CLI-enabled sub-root package)`)
          );
          await runWithInheritedIo(atAnyRoot[0]!, args);
        }
        // ? Otherwise, if no CLIs available, check if we're a Next.js project
        else if (projectAttributes[ProjectAttribute.Next]) {
          genericLogger(
            [LogTag.IF_NOT_QUIETED],
            passControlMessage('Next.js (root package) (current package)')
          );
          await runWithInheritedIo('next', ['start', ...args]);
        }
        // ? Otherwise, invoking this command makes no sense!
        else {
          softAssert(ErrorMessage.UnsupportedCommand());
        }
      } catch (error) {
        throw hasExitCode(error)
          ? new CliError('', { suggestedExitCode: error.exitCode })
          : error;
      }
    })
  };
}
