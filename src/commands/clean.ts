import { toPath } from '@-xun/fs';
import { directoryPackagesProjectBase } from '@-xun/project';
import { run } from '@-xun/run';
import { rimraf as forceDeletePaths } from 'rimraf';

import { softAssert } from '@-xun/cli/error';

import { logStartTime, LogTag, standardSuccessMessage } from '@-xun/cli/logging';

import { scriptBasename } from '@-xun/cli/util';

import { DefaultGlobalScope } from 'universe:configure.ts';
import { ErrorMessage } from 'universe:error.ts';

import {
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage
} from 'universe:util.ts';

import type { ChildConfiguration } from '@-xun/cli';
import type { AsStrictExecutionContext } from '@-xun/cli';
import type { GlobalCliArguments, GlobalExecutionContext } from 'universe:configure.ts';

const matchNothing = '(?!)';

/**
 * These are the default regular expressions matching paths that are excluded
 * from deletion when running the "clean" command.
 *
 * Paths that should only match directories must include a trailing slash. Paths
 * that should match at any depth (including project root) should be prefixed
 * with `(^|/)`. Note that periods must be escaped (i.e. `'\\.'`).
 */
export const defaultCleanExcludedPaths: string[] = [
  String.raw`(^|/)[^/]*\.env(\.[^/]+)?$`,
  String.raw`(^|/)\.vscode/`,
  String.raw`(^|/)\.vercel/`,
  String.raw`(^|/)\.husky/`,
  String.raw`(^|/)next-env\.d\.ts$`,
  String.raw`(^|/)${directoryPackagesProjectBase}/[^/]*\.ignore/`,
  '(^|/)node_modules/',
  '(^|/)fixtures/',
  String.raw`(^|/)\.wiki/`
];

export type CustomCliArguments = GlobalCliArguments & {
  excludePaths: string[];
  force: boolean;
};

export default function command({
  standardLog,
  standardDebug,
  state: { startTime },
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    'exclude-paths': {
      array: true,
      default: defaultCleanExcludedPaths,
      describe: 'Paths matching these regular expressions will never be deleted',
      defaultDescription: 'standard project files (see help text)'
    },
    force: {
      boolean: true,
      default: false,
      describe: 'Actually perform the deletion rather than the default dry run'
    }
  });

  return {
    builder,
    description:
      'Permanently delete paths ignored by or unknown to git (with exceptions)',
    usage: withGlobalUsage(
      `$1.

You must pass --force for any deletions to actually take place.

Note that the regular expressions provided via --exclude-paths are computed with the "i" and "u" flags. If you want to pass an empty array to --exclude-paths (overwriting the defaults), use \`--exclude-paths ''\`

The default value for --exclude-paths includes the following regular expressions:

- ${defaultCleanExcludedPaths.join('\n- ')}
`,
      { appendPeriod: false }
    ),
    handler: withGlobalHandler(async function ({
      $0: scriptFullName,
      scope,
      excludePaths,
      force
    }) {
      const handlerName = scriptBasename(scriptFullName);
      const genericLogger = standardLog.extend(handlerName);
      const debug = standardDebug.extend(`handler-${handlerName}`);

      debug('entered handler');

      const {
        projectMetadata: {
          cwdPackage: { root: packageRoot },
          rootPackage: { root: projectRoot }
        }
      } = await runGlobalPreChecks({
        standardDebug: standardDebug,
        projectMetadata_,
        scope
      });

      logStartTime({ standardLog, startTime, isUsingLocalInstallation });

      genericLogger(
        [LogTag.IF_NOT_QUIETED],
        `Cleaning ${scope === DefaultGlobalScope.ThisPackage ? 'this package only' : 'the entire project'}...`
      );

      debug('scope: %O', scope);
      debug('excludePaths (original): %O', excludePaths);

      const excludeRegExps = excludePaths.map(
        (path) => new RegExp(path || matchNothing, 'iu')
      );

      if (scope === DefaultGlobalScope.ThisPackage) {
        excludeRegExps.push(new RegExp(`^${directoryPackagesProjectBase}/`, 'iu'));
      }

      debug('excludePaths (final): %O', excludePaths);
      debug('excludeRegExps: %O', excludeRegExps);

      const cleanTargetRoot =
        scope === DefaultGlobalScope.Unlimited ? projectRoot : packageRoot;

      debug('cleanTargetRoot: %O', cleanTargetRoot);

      const { stdout: ignoredPaths } = await run(
        'git',
        [
          'ls-files',
          '--exclude-standard',
          '--ignored',
          '--others',
          // ? Git will include trailing slash for directories :)
          '--directory'
        ],
        { cwd: cleanTargetRoot, lines: true }
      );

      debug('raw ignored paths: %O', ignoredPaths);

      const finalIgnoredPaths = ignoredPaths
        .filter((path) => path && !excludeRegExps.some((regExp) => path.match(regExp)))
        .map((path) =>
          scope === DefaultGlobalScope.Unlimited ? toPath(cleanTargetRoot, path) : path
        );

      debug('final ignored paths: %O', finalIgnoredPaths);

      genericLogger.newline([LogTag.IF_NOT_HUSHED]);
      genericLogger([LogTag.IF_NOT_HUSHED], 'Deletion root: %O', cleanTargetRoot);
      genericLogger([LogTag.IF_NOT_HUSHED], 'Deletion targets: %O', finalIgnoredPaths);
      genericLogger.newline([LogTag.IF_NOT_HUSHED]);

      softAssert(force, ErrorMessage.CleanCalledWithoutForce());

      genericLogger([LogTag.IF_NOT_HUSHED], 'Performing deletions...');
      await forceDeletePaths(finalIgnoredPaths);

      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
