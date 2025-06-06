import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { pathToFileURL } from 'node:url';

// ? Patches global Proxy and spawn functions; see documentation for details
import '@-xun/symbiote/assets/conventional.config.cjs';

import { checkIsNotNil, CliError, getInvocableExtendedHandler } from '@-xun/cli';
import { hardAssert, softAssert } from '@-xun/cli/error';
import { LogTag, standardSuccessMessage } from '@-xun/cli/logging';
import { scriptBasename } from '@-xun/cli/util';
import { toPath } from '@-xun/fs';

import {
  changelogPatchConfigPackageBase,
  changelogPatchConfigProjectBase,
  isRootPackage,
  xchangelogConfigProjectBase
} from '@-xun/project';

import escapeStringRegexp from 'escape-string-regexp~4';
import { valid as isValidSemver } from 'semver';

import { defaultChangelogTopmatter } from 'universe:assets/transformers/_conventional.config.cjs.ts';
import format from 'universe:commands/format.ts';

import {
  DefaultGlobalScope,
  ThisPackageGlobalScope as ChangelogBuilderScope
} from 'universe:configure.ts';

import { ErrorMessage } from 'universe:error.ts';

import {
  getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix,
  logStartTime,
  readFile,
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage,
  writeFile
} from 'universe:util.ts';

import type { XchangelogConfig } from '@-xun/changelog' with { 'resolution-mode': 'import' };
import type { AsStrictExecutionContext, ChildConfiguration } from '@-xun/cli';
import type { Path } from '@-xun/fs';
import type { Promisable } from 'type-fest';
import type { CustomCliArguments as FormatCliArguments } from 'universe:commands/format.ts';
import type { GlobalCliArguments, GlobalExecutionContext } from 'universe:configure.ts';

const chunkPreviewLength = 30;
const extractVersionRegExp = /^#+\s(?:(?:[^[\s]*\[?@([^\s\]]+))|(?:([^\s\]]+)))/;

/**
 * A changelog patch that will be applied to the changelog file.
 *
 * It mirrors the parameters of {@link String.prototype.replace} in form and
 * function. That is: each `ChangelogPatch` `searchValue` will be replaced by
 * `replaceValue` in the changelog file.
 *
 * Note that replacements are made in-place, meaning order does matter.
 */
export type ChangelogPatch = [searchValue: string | RegExp, replaceValue: string];

/**
 * An array of zero or more {@link ChangelogPatch}es.
 *
 * `changelog.patch.mjs` can export via default either `ChangelogPatches` or a
 * {@link ChangelogPatcherFunction}.
 */
export type ChangelogPatches = ChangelogPatch[];

/**
 * A function that receives the current contents of the changelog file and a
 * `patcher` function. `ChangelogPatcherFunction` must return a string that will
 * become the new contents of the changelog file.
 *
 * `patcher` is the optional second parameter of `ChangelogPatcherFunction` that
 * accepts a `changelog` string and `patches`, which is an array of
 * {@link ChangelogPatches}. `patcher` can be used to quickly apply an array of
 * `patches` to the given `changelog` string. Its use is entirely optional.
 *
 * `changelog.patch.mjs` can export via default either
 * `ChangelogPatcherFunction` or a {@link ChangelogPatches} array.
 */
export type ChangelogPatcherFunction = (
  changelog: string,
  patcher: (changelog: string, patches: ChangelogPatches) => string
) => Promisable<string>;

/**
 * Represents the result of importing a `changelog.patch.mjs` file.
 * `changelog.patch.mjs` can export via default either
 * {@link ChangelogPatcherFunction} or a {@link ChangelogPatches} array.
 */
export type ImportedChangelogPatcher = ChangelogPatches | ChangelogPatcherFunction;

/**
 * Determines the output format of the changelog file.
 */
export enum OutputOrder {
  /**
   * Sections (heading level 2) are comprised of major and minor releases with
   * patch changes becoming subsections (heading level 3) of their nearest
   * major/minor release section.
   *
   * Such changelogs read as a "storybook".
   */
  Storybook = 'storybook',
  /**
   * The default changelog formatting where sections are listed in chronological
   * release order.
   */
  Descending = 'descending'
}

/**
 * @see {@link OutputOrder}
 */
export const availableOutputOrders = Object.values(OutputOrder);

/**
 * @see {@link ChangelogBuilderScope}
 */
export const changelogBuilderScopes = Object.values(ChangelogBuilderScope);

export type CustomCliArguments = GlobalCliArguments<ChangelogBuilderScope> & {
  skipTopmatter: boolean;
  patchChangelog: boolean;
  formatChangelog: boolean;
  onlyPatchChangelog: boolean;
  outputUnreleased: boolean;
  outputOrder: OutputOrder;
  importSectionFile?: string;
  changelogFile: string;
};

export default function command(
  globalExecutionContext: AsStrictExecutionContext<GlobalExecutionContext>
): ChildConfiguration<CustomCliArguments, GlobalExecutionContext> {
  const {
    standardLog,
    standardDebug,
    state,
    projectMetadata: projectMetadata_,
    isUsingLocalInstallation
  } = globalExecutionContext;

  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    scope: { choices: changelogBuilderScopes },
    'skip-topmatter': {
      boolean: true,
      description: 'Do not prepend topmatter when compiling output',
      default: false,
      implies: { 'format-changelog': false },
      looseImplications: true
    },
    'patch-changelog': {
      alias: 'patch',
      boolean: true,
      description: 'Patch compiled output using the nearest changelog patcher file',
      default: true
    },
    'only-patch-changelog': {
      alias: 'only-patch',
      boolean: true,
      description:
        'Instead of compiling new output, only patch an existing changelog file',
      default: false,
      conflicts: ['skip-topmatter', 'output-order', 'import-section-file'],
      implies: { 'patch-changelog': true }
    },
    'format-changelog': {
      alias: 'format',
      boolean: true,
      description: 'Run the "format" command on compiled output',
      default: true
    },
    'output-unreleased': {
      boolean: true,
      description: 'Add all commits, including unreleased commits, to the changelog',
      default: false
    },
    'output-order': {
      choices: availableOutputOrders,
      description: 'Set the order in which sections are written to the changelog',
      default: 'storybook'
    },
    'import-section-file': {
      string: true,
      description: 'Add a custom section from the given file to the changelog',
      conflicts: 'only-patch-changelog',
      check: checkIsNotNil
    },
    'changelog-file': {
      string: true,
      description: 'The path to the changelog file to generate/update',
      default: 'CHANGELOG.md',
      check: checkIsNotNil
    }
  });

  return {
    builder,
    description: 'Compile a changelog from conventional commits',
    usage: withGlobalUsage(
      `$1. Every commit that touches any file under the current package's root or any file imported by a file under the current package's root will be included in the compilation.

Use --output-order to control the order in which major, minor, and patch version sections will be output to the changelog. The default order is "storybook," which places patch versions below the nearest major/minor version section. The other choice is "descending," which will output sections in the more familiar chronological descending order.

Use --patch-changelog and --no-patch-changelog (or --only-patch-changelog) to control changelog file patching via the "changelog.patch.mjs" file. This file may appear at the project root, the package root, or both; when both appear, the package-level patch will run first. See the symbiote wiki documentation for further details.

Use --import-section-file to add a custom release section to the changelog. The file must contain a single custom release section generated by @-xun/changelog. This is useful when, for instance, xrelease generates a new release section that we want to include in our final changelog file.`
    ),
    handler: withGlobalHandler(async function (argv) {
      const {
        $0: scriptFullName,
        scope,
        skipTopmatter,
        formatChangelog,
        patchChangelog,
        onlyPatchChangelog,
        outputUnreleased,
        outputOrder,
        importSectionFile,
        changelogFile
      } = argv;

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

      logStartTime({
        standardLog,
        startTime,
        isUsingLocalInstallation
      });

      genericLogger([LogTag.IF_NOT_QUIETED], 'Compiling changelog...');

      const {
        rootPackage: { root: projectRoot },
        cwdPackage
      } = projectMetadata;

      const {
        root: packageRoot,
        json: { name: cwdPackageName }
      } = cwdPackage;

      hardAssert(cwdPackageName, ErrorMessage.GuruMeditation());

      debug('scope (unused): %O', scope);
      debug('skipTopmatter: %O', skipTopmatter);
      debug('formatChangelog: %O', formatChangelog);
      debug('patchChangelog: %O', patchChangelog);
      debug('onlyPatchChangelog: %O', onlyPatchChangelog);
      debug('outputUnreleased: %O', outputUnreleased);
      debug('outputOrder: %O', outputOrder);
      debug('importSectionFile: %O', importSectionFile);
      debug('changelogFile: %O', changelogFile);

      if (onlyPatchChangelog) {
        debug(`skipped regenerating ${changelogFile}`);
      } else {
        const conventionalConfigPath = pathToFileURL(
          `${projectRoot}/${xchangelogConfigProjectBase}`
        ).toString();

        debug('conventionalConfigPath: %O', conventionalConfigPath);
        debug('outputting changelog to path: %O', changelogFile);

        const conventionalConfig = await (async () => {
          try {
            process.env.SYMBIOTE_SPECIAL_INITIAL_COMMIT =
              await getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix(
                `${cwdPackageName}@`
              );

            const { default: config } = await import(conventionalConfigPath);

            if (!config) {
              throw new Error(ErrorMessage.DefaultImportFalsy());
            }

            return config as XchangelogConfig;
          } catch (error) {
            throw new CliError(
              ErrorMessage.CannotImportConventionalConfig(conventionalConfigPath),
              { cause: error }
            );
          } finally {
            delete process.env.SYMBIOTE_SPECIAL_INITIAL_COMMIT;
          }
        })();

        debug.extend('cc')('conventionalConfig: %O', conventionalConfig);

        const handlebarsTemplateGlobalContext = {};
        const { default: makeChangelogSectionStream } = await import('@-xun/changelog');
        const { gitRawCommitsOpts, parserOpts, writerOpts, options } =
          conventionalConfig;

        const changelogSectionStream = makeChangelogSectionStream(
          {
            config: conventionalConfig,
            releaseCount: 0,
            skipUnstable: true,
            outputUnreleased,
            warn: genericLogger.extend('cc-core').warn,
            ...options
          },
          handlebarsTemplateGlobalContext,
          gitRawCommitsOpts,
          parserOpts,
          writerOpts,
          {}
        );

        const changelogOutputStream = createWriteStream(changelogFile);

        if (skipTopmatter) {
          debug(`skipped prepending topmatter to ${changelogFile}`);
        } else {
          debug(`prepending topmatter to ${changelogFile}`);
          debug('defaultChangelogTopmatter: %O', defaultChangelogTopmatter);
          changelogOutputStream.write(`${defaultChangelogTopmatter}\n\n`);
        }

        debug('running pipeline...');

        const withheldChangelogPatchSections: string[] = [];
        let additionalSection: { version: string; notes: string } | undefined =
          undefined;

        if (importSectionFile) {
          debug('importing additional release section from: %O', importSectionFile);

          const additionalSectionNotes = await readFile(importSectionFile);
          const additionalSectionVersion =
            additionalSectionNotes.match(extractVersionRegExp)?.[1];

          softAssert(
            additionalSectionVersion && isValidSemver(additionalSectionVersion),
            ErrorMessage.BadAdditionalChangelogSection(importSectionFile)
          );

          additionalSection = {
            version: additionalSectionVersion,
            notes: additionalSectionNotes
          };

          debug('additionalSection: %O', additionalSection);
        }

        await pipeline(
          changelogSectionStream,

          // ! These generator functions expect commits to arrive in descending
          // ! release order (latest first).

          async function* (source) {
            const tap1Debug = debug.extend('tap1');
            tap1Debug('initialized tap1 on changelog section stream');

            source.setEncoding('utf8');

            if (additionalSection) {
              const { notes: additionalChunk } = additionalSection;

              tap1Debug('flushing additional section as first chunk');
              yield additionalChunk;
            }

            // ? We cast it to a string[] so currentChunk is typed correctly
            // eslint-disable-next-line @typescript-eslint/await-thenable
            for await (const currentChunk of source as unknown as string[]) {
              tap1Debug(
                'passing through chunk: %O',
                currentChunk.slice(0, chunkPreviewLength),
                '...'
              );

              yield currentChunk;
            }
          },

          async function* (source) {
            const tap2Debug = debug.extend('tap2');
            tap2Debug('initialized tap2 on changelog section stream');

            let isFirst = true;

            // ? We cast it to a string[] so currentChunk is typed correctly
            // eslint-disable-next-line @typescript-eslint/await-thenable
            for await (const chunk_ of source as unknown as string[]) {
              tap2Debug('saw chunk: %O', chunk_.slice(0, chunkPreviewLength), '...');

              const chunk =
                outputUnreleased && isFirst
                  ? chunk_.replace(
                      // ? Replace "@Unreleased" with "@unreleased" in heading
                      new RegExp(
                        `^(#+\\s+${escapeStringRegexp(cwdPackageName)})\\[@Unreleased]`,
                        'm'
                      ),
                      '$1[@unreleased]'
                    )
                  : chunk_;

              if (outputOrder === OutputOrder.Descending) {
                tap2Debug('descending sort order: chunk passed through as-is');
                yield chunk;
              } else {
                const isPatchChunk = chunk.startsWith('### ');

                if (!isPatchChunk) {
                  tap2Debug('storybook sort order: non-patch chunk passed through');

                  if (!skipTopmatter || !isFirst) {
                    yield '<br />\n\n';
                  }

                  yield chunk;

                  tap2Debug(
                    'storybook sort order: %O patch chunks released',
                    withheldChangelogPatchSections.length
                  );

                  if (withheldChangelogPatchSections.length) {
                    for (const section of withheldChangelogPatchSections) {
                      yield '<br />\n\n';
                      yield '### 🏗️ Patch ' + section.slice(4);
                    }

                    withheldChangelogPatchSections.length = 0;
                  }
                } else {
                  tap2Debug('storybook sort order: patch chunk held');
                  withheldChangelogPatchSections.push(chunk);
                  yield '';
                }
              }

              isFirst = false;
            }

            if (withheldChangelogPatchSections.length) {
              tap2Debug(
                'storybook sort order: %O patch chunks released (no non-patch available)',
                withheldChangelogPatchSections.length
              );

              for (const section of withheldChangelogPatchSections) {
                // ? These are probably pre-1.0.0 sections. Give each of these
                // ? patches-only changelog's sections -1 heading level (i.e.
                // ? promote them)
                yield section.slice(1);
              }

              withheldChangelogPatchSections.length = 0;
            }
          },

          changelogOutputStream
        );
      }

      if (formatChangelog) {
        debug(`formatting ${changelogFile} (calling out to sub-command)`);

        const formatHandler = await getInvocableExtendedHandler<
          FormatCliArguments,
          GlobalExecutionContext
        >(format, globalExecutionContext);

        await formatHandler({
          env: [],
          scope: DefaultGlobalScope.ThisPackage,
          files: [changelogFile],
          silent: true,
          quiet: true,
          hush: true,
          renumberReferences: true,
          skipIgnored: false,
          skipUnknown: false,
          onlyPackageJson: false,
          onlyMarkdown: false,
          onlyPrettier: false,
          onlyEslint: false
        });

        debug('sub-command completed successfully');
      } else {
        debug(`skipped formatting ${changelogFile}`);
      }

      if (patchChangelog) {
        const changelogPatcherProjectPath = pathToFileURL(
          toPath(projectRoot, changelogPatchConfigProjectBase)
        ).toString();

        const changelogPatcherPackagePath = isRootPackage(cwdPackage)
          ? undefined
          : pathToFileURL(
              toPath(packageRoot, changelogPatchConfigPackageBase)
            ).toString();

        debug(`changelogPatcherProjectPath: %O`, changelogPatcherProjectPath);
        debug(`changelogPatcherPackagePath: %O`, changelogPatcherPackagePath);

        const patcherProject = await import(changelogPatcherProjectPath).catch(
          (error: unknown) => {
            debug.warn('failed to import %O: %O', changelogPatcherProjectPath, error);
            return undefined;
          }
        );

        const patcherPackage = changelogPatcherPackagePath
          ? await import(changelogPatcherPackagePath).catch((error: unknown) => {
              debug.warn('failed to import %O: %O', changelogPatcherPackagePath, error);
              return undefined;
            })
          : undefined;

        if (patcherProject || patcherPackage) {
          const changelogPatcherProject: ImportedChangelogPatcher | undefined =
            patcherProject?.default;
          const changelogPatcherPackage: ImportedChangelogPatcher | undefined =
            patcherPackage?.default;

          if (!changelogPatcherProject && !changelogPatcherPackage) {
            throw new Error(ErrorMessage.DefaultImportFalsy());
          }

          debug('changelogPatcherProject: %O', changelogPatcherProject);
          debug('changelogPatcherPackage: %O', changelogPatcherPackage);

          const contents = await readFile(changelogFile);
          const userspacePatcher = (changelog: string, patches: ChangelogPatches) => {
            // eslint-disable-next-line unicorn/no-array-reduce
            return patches.reduce(function (str, [searchValue, replaceValue]) {
              return str.replace(searchValue, replaceValue);
            }, changelog);
          };

          // ! Order matters; synchronous execution matters

          if (changelogPatcherPackage) {
            await runPatcher(changelogPatcherPackage, changelogPatcherProjectPath);
          }

          if (changelogPatcherProject) {
            await runPatcher(changelogPatcherProject, changelogPatcherPackagePath!);
          }

          async function runPatcher(
            changelogPatcher: ImportedChangelogPatcher,
            patcherPath: Path | string
          ) {
            if (typeof changelogPatcher === 'function') {
              debug('invoking changelogPatcher as a function from %O', patcherPath);
              await writeFile(
                changelogFile,
                await changelogPatcher(contents, userspacePatcher)
              );
            } else if (Array.isArray(changelogPatcher)) {
              debug(
                'invoking patcher using changelogPatcher array from %O',
                patcherPath
              );
              await writeFile(
                changelogFile,
                userspacePatcher(contents, changelogPatcher)
              );
            } else {
              softAssert(ErrorMessage.BadMjsImport(patcherPath));
            }
          }
        } else {
          debug(
            'changelog patching skipped: no importable patch configuration files found at project root or package root'
          );
        }
      } else {
        debug('changelog patching skipped: changelog patching manually disabled');
      }

      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  };
}
