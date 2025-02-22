/* eslint-disable unicorn/no-array-callback-reference */
import { softAssert } from '@-xun/cli/error';
import { LogTag, standardSuccessMessage } from '@-xun/cli/logging';
import { scriptBasename } from '@-xun/cli/util';
import { toPath } from '@-xun/fs';
import { directoryPackagesProjectBase } from '@-xun/project';
import { run } from '@-xun/run';
import { rimraf as forceDeletePaths } from 'rimraf';

import { DefaultGlobalScope } from 'universe:configure.ts';
import { ErrorMessage } from 'universe:error.ts';

import {
  logStartTime,
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage
} from 'universe:util.ts';

import type { AsStrictExecutionContext, ChildConfiguration } from '@-xun/cli';
import type { AbsolutePath, RelativePath } from '@-xun/fs';
import type { DefaultRunOptions, RunReturnType } from '@-xun/run';
import type { Merge } from 'type-fest';
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
  onlyEmptyDirectories: boolean;
};

export default function command({
  standardLog,
  standardDebug,
  state: { startTime },
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>): ChildConfiguration<
  CustomCliArguments,
  GlobalExecutionContext
> {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    'exclude-paths': {
      array: true,
      default: defaultCleanExcludedPaths,
      describe: 'File paths matching these regular expressions will never be deleted',
      defaultDescription: 'standard project files (see help text)'
    },
    force: {
      boolean: true,
      default: false,
      describe: 'Actually perform the deletion rather than the default dry run'
    },
    'only-empty-directories': {
      alias: 'only-empty-dirs',
      boolean: true,
      default: false,
      describe: 'Only target empty directories for deletion and nothing else',
      conflicts: ['exclude-paths', 'force']
    }
  });

  return {
    builder,
    description: 'Permanently delete paths ignored/untracked by git (with exceptions)',
    usage: withGlobalUsage(
      `$1. This includes empty directories that are not descended from an ignored/untracked directory.

Unless --only-empty-directories is specified, --force must be used for any deletions to actually take place.

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
      force,
      onlyEmptyDirectories
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
        `${onlyEmptyDirectories ? 'Removing empty directories in' : 'Cleaning'} ${scope === DefaultGlobalScope.ThisPackage ? 'this package only' : 'the entire project'}...`
      );

      debug('scope: %O', scope);
      debug('excludePaths (original): %O', excludePaths);
      debug('onlyEmptyDirectories: %O', onlyEmptyDirectories);

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

      // ? Git's ls-files will include trailing slash for directories :)
      const ignoredPathsSet = reduceGitResultToSet(
        await Promise.all([
          run(
            'git',
            ['ls-files', '--exclude-standard', '--ignored', '--others', '--directory'],
            { cwd: cleanTargetRoot, lines: true }
          ),
          run('git', ['ls-files', '--exclude-standard', '--others', '--directory'], {
            cwd: cleanTargetRoot,
            lines: true
          })
        ])
      );

      debug('raw ignored paths: %O', ignoredPathsSet);

      if (onlyEmptyDirectories) {
        const pathsThatAreNotAnEmptyDirectorySet = reduceGitResultToSet(
          await Promise.all([
            run(
              'git',
              [
                'ls-files',
                '--exclude-standard',
                '--ignored',
                '--others',
                '--directory',
                '--no-empty-directory'
              ],
              { cwd: cleanTargetRoot, lines: true }
            ),
            run(
              'git',
              [
                'ls-files',
                '--exclude-standard',
                '--others',
                '--directory',
                '--no-empty-directory'
              ],
              {
                cwd: cleanTargetRoot,
                lines: true
              }
            )
          ])
        );

        debug(
          'raw ignored paths that do NOT point to an empty directory: %O',
          pathsThatAreNotAnEmptyDirectorySet
        );

        await maybePerformDeletions(
          ignoredPathsSet
            .difference(pathsThatAreNotAnEmptyDirectorySet)
            .values()
            .filter((path) => path && path.endsWith('/'))
            .map(relativePathToDeletionTarget)
            .toArray()
        );
      } else {
        await maybePerformDeletions(
          ignoredPathsSet
            .values()
            .filter((path) => {
              return path && !excludeRegExps.some((regExp) => path.match(regExp));
            })
            .map(relativePathToDeletionTarget)
            .toArray()
        );
      }

      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);

      function reduceGitResultToSet(
        result: RunReturnType<Merge<DefaultRunOptions, { lines: true }>>[]
      ) {
        // eslint-disable-next-line unicorn/no-array-reduce
        return result.reduce<Set<RelativePath>>(
          (accumulator, { stdout: ignoredPaths_ }) => {
            return accumulator.union(new Set(ignoredPaths_) as Set<RelativePath>);
          },
          new Set()
        );
      }

      function relativePathToDeletionTarget(relativePath: RelativePath) {
        return [toPath(cleanTargetRoot, relativePath), relativePath] as const;
      }

      async function maybePerformDeletions(
        deletionTargets: (readonly [realPath: AbsolutePath, prettyPath: string])[]
      ) {
        debug('deletionTargets: %O', deletionTargets);

        genericLogger.newline([LogTag.IF_NOT_HUSHED]);

        genericLogger([LogTag.IF_NOT_HUSHED], 'Deletion root: %O', cleanTargetRoot);
        genericLogger(
          [LogTag.IF_NOT_HUSHED],
          'Deletion targets: %O',
          deletionTargets.map(([, prettyPath]) => prettyPath)
        );

        genericLogger.newline([LogTag.IF_NOT_HUSHED]);

        if (!onlyEmptyDirectories) {
          softAssert(force, ErrorMessage.CleanCalledWithoutForce());
        }

        if (deletionTargets.length) {
          genericLogger([LogTag.IF_NOT_HUSHED], 'Performing deletions...');
          await forceDeletePaths(deletionTargets.map(([realPath]) => realPath));
        } else {
          genericLogger([LogTag.IF_NOT_QUIETED], 'Nothing to delete 🙂');
        }
      }
    })
  };
}
