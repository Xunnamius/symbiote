import { basename, resolve } from 'node:path';

import { CliError, type ChildConfiguration } from '@black-flag/core';
import { glob } from 'glob-gitignore';
import { getSupportInfo } from 'prettier';

import {
  LogTag,
  logStartTime,
  standardSuccessMessage
} from 'multiverse#cli-utils logging.ts';

import { scriptBasename } from 'multiverse#cli-utils util.ts';
import { hardAssert, softAssert } from 'multiverse#cli-utils error.ts';
import { gatherProjectFiles } from 'multiverse#project-utils';
import {
  deriveVirtualPrettierignoreLines,
  remarkConfigProjectBase
} from 'multiverse#project-utils fs/index.ts';
import { type AsStrictExecutionContext } from 'multiverse#bfe';
import { $artificiallyInvoked } from 'multiverse#bfe symbols.ts';
import { SHORT_TAB } from 'multiverse#rejoinder';
import { run } from 'multiverse#run';

import { ErrorMessage } from 'universe error.ts';

import {
  checkArrayNotEmpty,
  withGlobalBuilder,
  withGlobalUsage,
  runGlobalPreChecks
} from 'universe util.ts';

import {
  type GlobalCliArguments,
  type GlobalExecutionContext
} from 'universe configure.ts';

export type CustomCliArguments = GlobalCliArguments & {
  renumberReferences: boolean;
  skipIgnored: boolean;
  skipUnknown: boolean;
  files?: string[];
  onlyPackageJson: boolean;
  onlyMarkdown: boolean;
  onlyPrettier: boolean;
};

export default function command({
  log,
  debug_,
  state,
  projectMetadata: projectMetadata_
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    'renumber-references': {
      boolean: true,
      description: 'Run the renumber-references plugin when formatting Markdown files',
      default: false
    },
    'skip-ignored': {
      boolean: true,
      description: 'Ignore files listed in .prettierignore',
      default: true
    },
    'skip-unknown': {
      boolean: true,
      description: 'Ignore files unknown to git',
      implies: { 'skip-ignored': true },
      default: false
    },
    files: {
      array: true,
      description:
        'Only consider files (or globs) given via --files instead of scanning the filesystem',
      check: checkArrayNotEmpty('--files')
    },
    'only-package-json': {
      boolean: true,
      description: 'Only target package.json files for formatting',
      default: false,
      conflicts: ['renumber-references', { 'only-markdown': true, 'only-prettier': true }]
    },
    'only-markdown': {
      boolean: true,
      description: 'Only target Markdown files for formatting',
      default: false,
      conflicts: [{ 'only-package-json': true, 'only-prettier': true }]
    },
    'only-prettier': {
      boolean: true,
      description: 'Only run Prettier-based file formatting',
      default: false,
      conflicts: [
        'renumber-references',
        { 'only-package-json': true, 'only-markdown': true }
      ]
    }
  });

  return {
    builder,
    description: 'Run formatters (e.g. prettier, remark) across all relevant files',
    usage: withGlobalUsage(
      `$1.

Note that .prettierignore is used as the single source of truth for which Markdown files are and are not ignored when formatters are run. To prevent a file from being formatted by any formatter (including remark), add it to .prettierignore. To disregard .prettierignore when formatters are run, use --no-skip-ignored.

With respect to .prettierignore being the single source of truth for formatters: note that remark is configured to respect .remarkignore files only when run by "xscripts lint"; when executing "xscripts format", .remarkignore files are always disregarded. This means you can use .remarkignore files to prevent certain paths from being linted by "xscripts lint" without preventing them from being formatted by "xscripts format".`
    ),
    handler: withGlobalHandler(async function ({
      [$artificiallyInvoked]: wasArtificiallyInvoked,
      $0: scriptFullName,
      renumberReferences,
      skipIgnored,
      skipUnknown,
      files,
      onlyPackageJson,
      onlyMarkdown,
      onlyPrettier,
      hush: isHushed,
      quiet: isQuieted
    }) {
      const genericLogger = log.extend(scriptBasename(scriptFullName));
      const debug = debug_.extend('handler');

      debug('entered handler');

      const { projectMetadata } = await runGlobalPreChecks({ debug_, projectMetadata_ });
      const { startTime } = state;

      logStartTime({ log, startTime });
      genericLogger([LogTag.IF_NOT_QUIETED], 'Formatting project files...');

      debug('renumberReferences: %O', renumberReferences);
      debug('skipIgnored: %O', skipIgnored);
      debug('skipUnknown: %O', skipUnknown);
      debug('files: %O', files);
      debug('onlyPackageJson: %O', onlyPackageJson);
      debug('onlyMarkdown: %O', onlyMarkdown);
      debug('onlyPrettier: %O', onlyPrettier);

      let sawMarkdownFilesOutsideProjectRoot = false as boolean;

      const {
        project: { root: rootDir }
      } = projectMetadata;

      const [allMarkdownFiles, allPackageJsonFiles] = await (async (): Promise<
        [string[], string[]]
      > => {
        if (files) {
          debug('using --files as targets');

          const ignore = skipIgnored
            ? await deriveVirtualPrettierignoreLines({
                projectRoot: rootDir,
                includeUnknownPaths: skipUnknown
              })
            : [];

          debug('virtual .prettierignore lines: %O', ignore);

          const sawFilesOutsideProjectRoot = files.some(
            (path) => !resolve(rootDir, path).startsWith(rootDir)
          );

          debug('sawFilesOutsideProjectRoot: %O', sawFilesOutsideProjectRoot);

          softAssert(
            !sawFilesOutsideProjectRoot || ignore.length === 0,
            ErrorMessage.CannotUseIgnoresWithPathsOutsideProjectRoot()
          );

          files = await glob(files, {
            dot: true,
            absolute: true,
            nodir: true,
            // ? This addresses a strange bug with the ignores package as seen
            // ? here: https://github.com/prettier/prettier-atom/issues/490
            ...(sawFilesOutsideProjectRoot ? {} : { ignore })
          });

          debug('files (post-glob): %O', files);

          const markdownFiles = files.filter((path) => path.endsWith('.md'));
          const packageJsonFiles = files.filter((path) => path.endsWith('/package.json'));

          if (sawFilesOutsideProjectRoot) {
            sawMarkdownFilesOutsideProjectRoot = markdownFiles.some(
              (mdPath) => !mdPath.startsWith(rootDir)
            );
          }

          debug(
            'sawMarkdownFilesOutsideProjectRoot: %O',
            sawMarkdownFilesOutsideProjectRoot
          );

          return [markdownFiles, packageJsonFiles];
        } else {
          debug('running generic project filesystem scan');
          hardAssert(skipIgnored || !skipUnknown, ErrorMessage.BadSkipArgs());

          const {
            markdownFiles: { all: allMarkdownFiles },
            packageJsonFiles: { atAnyRoot: allPackageJsonFiles }
          } = await gatherProjectFiles(projectMetadata, {
            skipIgnored,
            skipUnknown
            // ? We can safely cast this thanks to the hard assert above
          } as Parameters<typeof gatherProjectFiles>[1]);

          return [allMarkdownFiles, allPackageJsonFiles];
        }
      })();

      debug('allMarkdownFiles: %O', allMarkdownFiles);
      debug('allPackageJsonFiles: %O', allPackageJsonFiles);

      const shouldDoPkgJson =
        !onlyMarkdown && !onlyPrettier && allPackageJsonFiles.length > 0;
      const shouldDoMarkdown =
        !onlyPackageJson && !onlyPrettier && allMarkdownFiles.length > 0;
      const shouldDoPrettier = !onlyPackageJson && !onlyMarkdown;

      debug('shouldDoPkgJson: %O', shouldDoPkgJson);
      debug('shouldDoMarkdown: %O', shouldDoMarkdown);
      debug('shouldDoPrettier: %O', shouldDoPrettier);

      if (shouldDoMarkdown) {
        try {
          await run(
            'npx',
            [
              'remark',
              '--no-config',
              '--no-stdout',
              ...(isHushed ? ['--quiet'] : []),
              '--frail',
              '--use',
              'gfm',
              '--use',
              'lint-no-undefined-references',
              '--silently-ignore',
              '--no-ignore',
              '--ignore-pattern',
              'docs',
              ...allMarkdownFiles
            ],
            {
              stdout: isHushed ? 'ignore' : 'inherit',
              stderr: isQuieted ? 'ignore' : 'inherit'
            }
          );
        } catch (error) {
          throw new CliError(ErrorMessage.MarkdownNoUndefinedReferences(), {
            cause: error
          });
        }
      }

      const status: Record<
        'sort' | 'doctoc' | 'allContrib' | 'remark' | 'prettier',
        boolean | null | undefined
      > & { failed: unknown } = {
        failed: false,
        sort: undefined,
        doctoc: undefined,
        allContrib: undefined,
        remark: undefined,
        prettier: undefined
      };

      try {
        // ? This can run completely asynchronously since nothing else relies on
        // ? it (except prettier).

        if (shouldDoPkgJson) {
          status.sort = null;
        }

        const sortedPkgJsonFiles = shouldDoPkgJson
          ? run('npx', ['sort-package-json', ...allPackageJsonFiles]).catch(
              (error: unknown) => {
                status.sort = false;
                throw error;
              }
            )
          : Promise.resolve();

        if (shouldDoMarkdown) {
          // ? These have to run sequentially to prevent data corruption.

          status.doctoc = null;

          await run(
            'npx',
            [
              'doctoc',
              '--no-title',
              '--maxlevel',
              '3',
              '--update-only',
              ...allMarkdownFiles
            ],
            {
              stdout: isHushed ? 'ignore' : 'inherit',
              stderr: isQuieted ? 'ignore' : 'inherit'
            }
          ).catch((error: unknown) => {
            status.doctoc = false;
            throw error;
          });

          status.doctoc = true;

          const rootReadmeFile = `${rootDir}/README.md`;
          debug('rootReadmeFile: %O', rootReadmeFile);

          if (allMarkdownFiles.includes(rootReadmeFile)) {
            status.allContrib = null;

            await run(
              'npx',
              // ? --files arg for all-contributors is broken because yargs...
              ['all-contributors', 'generate'],
              {
                // ? ... so we ensure that this command only ever runs at root
                cwd: rootDir,
                stdout: isHushed ? 'ignore' : 'inherit',
                stderr: isQuieted ? 'ignore' : 'inherit'
              }
            ).catch((error: unknown) => {
              status.allContrib = false;
              throw error;
            });

            status.allContrib = true;
          } else {
            debug(
              'skipped regenerating all-contributors table: rootReadmeFile path not in markdownFiles'
            );
          }

          status.remark = null;

          if (sawMarkdownFilesOutsideProjectRoot && !wasArtificiallyInvoked) {
            log.newline([LogTag.IF_NOT_SILENCED]);

            log.warn(
              [LogTag.IF_NOT_SILENCED],
              `one or more markdown files given via "--files" are outside of the project root. Therefore, remark will be invoked with "--rc-path" pointing to this project's root .remarkrc config file. A side effect of this is that non-root .remarkrc config files in subdirectories or elsewhere will be ignored`
            );

            log.newline([LogTag.IF_NOT_SILENCED]);
          }

          await run(
            'npx',
            [
              'remark',
              ...(isHushed ? ['--quiet'] : []),
              '--output',
              '--frail',
              '--no-ignore',
              '--silently-ignore',
              // ? This allows us to rely on remark's config search which the
              // ? --rc-path parameter seems to disable
              ...(sawMarkdownFilesOutsideProjectRoot
                ? [`--rc-path=${rootDir}/${remarkConfigProjectBase}`]
                : []),
              ...allMarkdownFiles
            ],
            {
              env: {
                NODE_ENV: 'format',
                XSCRIPTS_FORMAT_RENUMBER_REFERENCES: renumberReferences.toString()
              },
              stdout: isHushed ? 'ignore' : 'inherit',
              stderr: isQuieted ? 'ignore' : 'inherit'
            }
          ).catch((error: unknown) => {
            status.remark = false;
            throw error;
          });

          status.remark = true;
        }

        await sortedPkgJsonFiles;

        if (shouldDoPkgJson) {
          status.sort = true;
        }

        if (shouldDoPrettier) {
          const prettierTargetFiles = (await filterOutPathsUnsupportedByPrettier(
            files
          )) ?? ['.'];

          debug('prettierTargetFiles: %O', prettierTargetFiles);

          if (prettierTargetFiles.length) {
            status.prettier = null;
            await run(
              'npx',
              [
                'prettier',
                '--write',
                ...(skipUnknown ? ['--ignore-unknown'] : []),
                ...prettierTargetFiles
              ],
              {
                stdout: isHushed ? 'ignore' : 'inherit',
                stderr: isQuieted ? 'ignore' : 'inherit'
              }
            ).catch((error: unknown) => {
              status.prettier = false;
              throw error;
            });

            status.prettier = true;
          } else {
            debug('prettierTargetFiles was empty, so prettier run was skipped');
          }
        }
      } catch (error) {
        status.failed = error;
      }

      // TODO: replace with listr2 tasks
      genericLogger(
        [LogTag.IF_NOT_SILENCED],
        [
          `${shouldDoPkgJson ? 'Processed' : 'Encountered'} package.json files: ${allPackageJsonFiles.length}`,
          `${SHORT_TAB}Sorted file contents: ${statusToEmoji(status.sort)}`,
          `${shouldDoMarkdown ? 'Processed' : 'Encountered'} markdown files${skipIgnored ? '' : ' (no files ignored)'}: ${allMarkdownFiles.length}`,
          `${SHORT_TAB}Synchronized TOCs: ${statusToEmoji(status.doctoc)}`,
          `${SHORT_TAB}Regenerated contributor table: ${statusToEmoji(status.allContrib)}`,
          `${SHORT_TAB}Reformatted files: ${statusToEmoji(status.remark)}`,
          `Prettified all relevant project files: ${statusToEmoji(status.prettier)}`
        ].join('\n')
      );

      genericLogger.newline([LogTag.IF_NOT_SILENCED]);

      if (status.failed) {
        throw new CliError(ErrorMessage.CommandDidNotComplete('format'), {
          cause: status.failed
        });
      }

      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}

function statusToEmoji(status: boolean | null | undefined) {
  switch (status) {
    case true: {
      return '✅';
      break;
    }

    case false: {
      return '❌ (failed)';
      break;
    }

    case null: {
      return '❓ (started)';
      break;
    }

    case undefined: {
      return '✖️ (skipped)';
      break;
    }
  }
}

async function filterOutPathsUnsupportedByPrettier(files: string[] | undefined) {
  if (files === undefined) {
    return files;
  }

  const supportedExtensions = new Set(
    (await getSupportInfo()).languages.flatMap((language) => language.extensions ?? [])
  );

  const supportedFiles = files.filter((path) => {
    const fileBasename = basename(path);
    return (
      fileBasename.includes('.') &&
      supportedExtensions.has(`.${fileBasename.split('.').at(-1)!}`)
    );
  });

  return supportedFiles;
}
