import assert from 'node:assert';

import { hasExtensionAcceptedByBabel } from '@-xun/scripts/assets/config/babel.config.js';
import { type PluginObj, type TransformOptions } from '@babel/core';

import {
  createMetadataAccumulatorPlugin,
  type Options as AccumulatorOptions
} from 'multiverse#babel-plugin-metadata-accumulator';

import { debug as debug_ } from '#project-utils src/analyze/common.ts';
import { ErrorMessage, ProjectError } from '#project-utils src/error.ts';
import { type AbsolutePath } from '#project-utils src/fs.ts';
import { type ParametersNoFirst, type SyncVersionOf } from '#project-utils src/util.ts';

import type { Promisable } from 'type-fest';

const debug = debug_.extend('gatherImportEntriesFromFiles');

/**
 * An entry mapping an absolute file path to a single import/require
 * specifier present in said file.
 */
export type ImportSpecifier = [filepath: AbsolutePath, specifier: string];

/**
 * An entry mapping an absolute file path to an array of import/require
 * specifiers present in said file.
 *
 * @see {@link gatherImportEntriesFromFiles}
 */
export type ImportSpecifiersEntry = [filepath: AbsolutePath, specifiers: Set<string>];

/**
 * @see {@link gatherImportEntriesFromFiles}
 */
export type GatherImportEntriesFromFilesOptions = AccumulatorOptions;

function gatherImportEntriesFromFiles_(
  shouldRunSynchronously: false,
  files: AbsolutePath[],
  options?: GatherImportEntriesFromFilesOptions
): Promise<ImportSpecifiersEntry[]>;
function gatherImportEntriesFromFiles_(
  shouldRunSynchronously: true,
  files: AbsolutePath[],
  options?: GatherImportEntriesFromFilesOptions
): ImportSpecifiersEntry[];
function gatherImportEntriesFromFiles_(
  shouldRunSynchronously: boolean,
  files: AbsolutePath[],
  options: GatherImportEntriesFromFilesOptions = {}
): Promisable<ImportSpecifiersEntry[]> {
  debug('evaluating files: %O', files);

  if (shouldRunSynchronously) {
    const babel = getBabel();
    const { plugin, accumulator } = createMetadataAccumulatorPlugin();

    const importSpecifiersEntries = files.map((path, index) => {
      const debug_ = debug.extend(`file-${index}`);
      debug_('evaluating file: %O', path);

      if (hasExtensionAcceptedByBabel(path)) {
        debug_('using babel to evaluate source file imports');

        babel.transformFileSync(path, makeMinimalBabelConfigObject(plugin, options));

        const { imports } = accumulator.get(path) || {};
        assert(imports, ErrorMessage.GuruMeditation());

        debug_('imports seen (%O): %O', imports.size, imports);
        return [path, imports] satisfies ImportSpecifiersEntry;
      } else {
        debug_('skipped using babel to evaluate asset');
        return [path, new Set()] satisfies ImportSpecifiersEntry;
      }
    });

    debug('import specifiers: %O', importSpecifiersEntries);
    return importSpecifiersEntries;
  } else {
    return Promise.resolve().then(async () => {
      const babel = getBabel();
      const { plugin, accumulator } = createMetadataAccumulatorPlugin();

      const importSpecifiersEntries = await Promise.all(
        files.map(async (path, index) => {
          const debug_ = debug.extend(`file-${index}`);
          debug_('evaluating file: %O', path);

          if (hasExtensionAcceptedByBabel(path)) {
            debug_('using babel to evaluate source file imports');

            await babel.transformFileAsync(
              path,
              makeMinimalBabelConfigObject(plugin, options)
            );

            const { imports } = accumulator.get(path) || {};
            assert(imports, ErrorMessage.GuruMeditation());

            debug_('imports seen (%O): %O', imports.size, imports);
            return [path, imports] satisfies ImportSpecifiersEntry;
          } else {
            debug_('skipped using babel to evaluate asset');
            return [path, new Set()] satisfies ImportSpecifiersEntry;
          }
        })
      );

      debug('import specifiers: %O', importSpecifiersEntries);
      return importSpecifiersEntries;
    });
  }
}

/**
 * Accepts zero or more file paths and asynchronously returns an array of
 * {@link ImportSpecifiersEntry}s each mapping a given file path to an array of
 * import/require specifiers present in said file.
 *
 * This function relies on Babel internally and ignores all configuration files.
 * All paths passed to this function that cannot be parsed as TSX/TS/JS (via
 * extension check) will be treated as if they have 0 imports.
 */
export function gatherImportEntriesFromFiles(
  ...args: ParametersNoFirst<typeof gatherImportEntriesFromFiles_>
) {
  return gatherImportEntriesFromFiles_(false, ...args);
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace gatherImportEntriesFromFiles {
  /**
   * Accepts zero or more file paths and synchronously returns an array of
   * {@link ImportSpecifiersEntry}s each mapping a given file path to an array of
   * import/require specifiers present in said file.
   *
   * This function relies on Babel internally and ignores all configuration
   * files. All paths passed to this function that cannot be parsed as TSX/TS/JS
   * (via extension check) will be treated as if they have 0 imports.
   */
  export const sync = function (...args) {
    return gatherImportEntriesFromFiles_(true, ...args);
  } as SyncVersionOf<typeof gatherImportEntriesFromFiles>;
}

function getBabel() {
  try {
    // ? Ensure these are importable
    void require('@babel/plugin-syntax-import-attributes');
    void require('@babel/plugin-syntax-typescript');
    // ? Return what we're really interested in
    return require('@babel/core') as typeof import('@babel/core');
  } catch (error) {
    debug('failed to import @babel/core: %O', error);
    throw new ProjectError(
      ErrorMessage.MissingOptionalBabelDependency('gatherImportEntriesFromFiles')
    );
  }
}

function makeMinimalBabelConfigObject(
  plugin: PluginObj,
  pluginOptions: AccumulatorOptions
): TransformOptions {
  return {
    configFile: false,
    plugins: [
      '@babel/plugin-syntax-import-attributes',
      [
        '@babel/plugin-syntax-typescript',
        { disallowAmbiguousJSXLike: false, isTSX: true }
      ],
      [plugin, pluginOptions]
    ]
  };
}
