/* eslint-disable unicorn/prevent-abbreviations */
import { readdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

import { CliError } from '@-xun/cli';
import { toAbsolutePath, toPath } from '@-xun/fs';
import { isRootPackage, ProjectAttribute } from '@-xun/project';
import getInObject from 'lodash.get';
import mergeWith from 'lodash.mergewith';
import { createDebugLogger } from 'rejoinder';

import { DefaultGlobalScope } from 'universe:configure.ts';
import { globalDebuggerNamespace } from 'universe:constant.ts';
import { ErrorMessage } from 'universe:error.ts';
import { deriveCodecovPackageFlag, readFile } from 'universe:util.ts';

import type { AbsolutePath, RelativePath } from '@-xun/fs';
import type { Package, ProjectMetadata, RawAliasMapping } from '@-xun/project';
import type { ExtendedDebugger, ExtendedLogger } from 'rejoinder';
import type { EmptyObject, Entry, Promisable, Tagged } from 'type-fest';

// ! Try not to use hardAssert, softAssert, or CliError here or in any
// ! transformers, or in the stuff imported by them.

const assetsDebug = createDebugLogger({ namespace: globalDebuggerNamespace });
const gatherAssetsDebug = assetsDebug.extend('gather-assets-transformer');
const gatherAllAssetsDebug = assetsDebug.extend('gather-assets-transformers');
const makeTransformerDebug = assetsDebug.extend('make-transformer');
const compileTemplatesDebug = assetsDebug.extend('compile-templates');
const compileTemplateDebug = assetsDebug.extend('compile-template');
const configTemplateDebug = assetsDebug.extend('config-template');

// ? We do all of this because sometimes "unique symbol" behaves strangely in
// ? nested conditionals (e.g. in _test.ts)
/**
 * @see {@link $delete}
 */
export type UniqueDeleteSymbol = Tagged<EmptyObject, '$delete'>;

/**
 * The Symbol represents an asset to be deleted and can be returned as the
 * result of an {@link Asset.generate} function instead of normal string
 * content.
 */
export const $delete = Symbol.for(
  'symbiote-will-delete-file-at-path'
) as unknown as UniqueDeleteSymbol;

/**
 * The directory containing files exporting functions that transform
 * {@link TransformerContext} instances into reified asset strings.
 *
 * @see {@link TransformerContext}
 */
export const directoryAssetTransformers = toAbsolutePath(
  __dirname,
  'assets',
  'transformers'
);

/**
 * The directory containing asset templates.
 *
 * @see {@link TransformerContext}
 */
export const directoryAssetTemplates = toAbsolutePath(__dirname, 'assets', 'templates');

/**
 * These presets determine which assets will be returned by which transformers
 * when they're invoked. By specifying a preset, only the assets it represents
 * will be generated. All others will be ignored.
 *
 * See the symbiote wiki for details.
 */
export enum AssetPreset {
  /**
   * Represents the most basic assets necessary for symbiote to be fully
   * functional.
   *
   * This preset is the basis for all others and can be used on any
   * symbiote-compliant project when targeting only a subset of files is desired
   * (e.g. via `--include-asset-paths`/`--exclude-asset-paths` when renovating).
   *
   * See the symbiote wiki for details.
   */
  Basic = 'basic',
  /**
   * Represents the standard assets for an symbiote-compliant command-line
   * interface project (such as `@-xun/cli`-powered tools like `symbiote`
   * itself).
   *
   * See the symbiote wiki for details.
   */
  Cli = 'cli',
  /**
   * Represents the standard assets for an symbiote-compliant library project
   * built for both CJS and ESM consumers (such as the case with
   * `@-xun/cli`) and potentially also browser and other consumers as
   * well.
   *
   * See the symbiote wiki for details.
   */
  Lib = 'lib',
  /**
   * Represents the standard assets for an symbiote-compliant library project
   * built exclusively for ESM and ESM-compatible consumers (such as the case
   * with the `unified-utils` monorepo).
   *
   * See the symbiote wiki for details.
   */
  LibEsm = 'lib-esm',
  /**
   * Represents the standard assets for an symbiote-compliant library project
   * built exclusively for ESM consumers operating in a browser-like runtime
   * (such as the case with the `next-utils` monorepo).
   *
   * See the symbiote wiki for details.
   */
  LibWeb = 'lib-web',
  /**
   * Represents the standard assets for an symbiote-compliant React project.
   *
   * See the symbiote wiki for details.
   */
  React = 'react',
  /**
   * Represents the standard assets for an symbiote-compliant Next.js + React
   * project.
   *
   * See the symbiote wiki for details.
   */
  Nextjs = 'nextjs',
  /**
   * Represents the standard assets for an symbiote-compliant project built on
   * Cloudflare's Wrangler tool.
   *
   * See the symbiote wiki for details.
   */
  Wrangler = 'wrangler'
}

/**
 * @see {@link AssetPreset}
 */
export const assetPresets = Object.values(AssetPreset);

/**
 * The presets for libraries and library-like projects (such as
 * {@link AssetPreset.Cli}). Also includes `undefined`, signifying a lack of
 * preset.
 */
export const libAssetPresets = [
  undefined,
  AssetPreset.Cli,
  AssetPreset.Lib,
  AssetPreset.LibEsm,
  AssetPreset.LibWeb
];

/**
 * The presets for react and react-based projects (such as
 * {@link AssetPreset.Cli}). Also includes `undefined`, signifying a lack of
 * preset.
 */
export const reactAssetPresets = [undefined, AssetPreset.React, AssetPreset.Nextjs];

/**
 * An _asset_ maps an absolute output path and a function that generates output.
 */
export type Asset = {
  path: AbsolutePath;
  generate: () => Promisable<string | typeof $delete>;
};

/**
 * An input function that accepts a {@link TransformerContext} and returns one
 * or more {@link Asset}s.
 */
export type Transform = (this: void, context: TransformerContext) => Promisable<Asset[]>;

/**
 * An object comprised of `path`-`generate` entries from one or more
 * {@link Asset}s.
 */
export type ReifiedAssets = { [assetPath: Asset['path']]: Asset['generate'] };

/**
 * A function that accepts a {@link TransformerContext} and returns one or more
 * {@link Asset}s.
 */
export type Transformer = (
  this: void,
  context: TransformerContext,
  options?: MakeTransformerOptions
) => Promise<ReifiedAssets>;

/**
 * An object containing a {@link Transformer} and related context/helpers.
 *
 * Rather than tediously construct such an object manually, consider using
 * {@link makeTransformer}.
 */
export type TransformerContainer = {
  transformer: Transformer;
};

/**
 * A union of well-known context keys passed directly to each transformer
 * {@link Transformer}.
 *
 * **INSTANCES OF `TransformerContext` MUST NOT CONTAIN ANY SENSITIVE
 * INFORMATION!**
 */
export type TransformerContext = {
  /**
   * The value of the `asset` parameter passed to
   * {@link gatherAssetsFromTransformer} and related functions.
   *
   * For transformers returning a single asset, this can be used to construct
   * the asset path.
   */
  asset: string;

  /**
   * Global logging function.
   */
  log: ExtendedLogger;
  /**
   * Global debugging function.
   */
  debug: ExtendedDebugger;

  /**
   * Takes a {@link RelativePath}-like object and joins it to `rootPackage.root`
   * from {@link ProjectMetadata}.
   */
  toProjectAbsolutePath: (...pathsLike: (RelativePath | string)[]) => AbsolutePath;
  /**
   * Takes a {@link RelativePath}-like object and joins it to `cwdPackage.root`
   * from {@link ProjectMetadata}.
   */
  toPackageAbsolutePath: (...pathsLike: (RelativePath | string)[]) => AbsolutePath;

  /**
   * Whether or not to derive aliases and inject them into the configuration.
   */
  shouldDeriveAliases: boolean;
  /**
   * The scope to consider when determining which assets to return.
   */
  scope: DefaultGlobalScope;
  /**
   * Whether or not to overwrite certain files (such as .env files, and .md
   * files with replacer regions) in a potentially destructive way.
   */
  forceOverwritePotentiallyDestructive: boolean;
  /**
   * A relevant {@link AssetPreset} or `undefined` when generic versions of
   * assets should be generated.
   *
   * This is the preset that was passed in from a wider context, such as a
   * renovation or initialization command. Therefore, it only applies to the
   * current package and should be relied upon with caution when generating
   * per-package assets. It is usually best to assume a library-like preset
   * (e.g. "lib-cjs") and rely on each package's attributes (i.e.
   * `WorkspaceAttribute`).
   */
  assetPreset: AssetPreset | undefined;
  /**
   * @see {@link ProjectMetadata}
   */
  projectMetadata: ProjectMetadata;
  /**
   * A partial import alias string that can be used as part of a specifier to
   * import from the current package. If the current package is the root
   * package, this will be an empty string. Otherwise, it will begin with a plus
   * sign (`+`).
   *
   * Example: `"+graph"` (for the `@-xun/project-graph` sub-root package)
   */
  cwdPackagePartialImportSpecifier: string;
  /**
   * An array of {@link RawAliasMapping}s that will be included when deriving
   * aliases during content generation.
   */
  additionalRawAliasMappings: RawAliasMapping[];
  /**
   * A markdown list of the current packages in the repository, if it is a
   * monorepo. Does not include the root package.
   */
  monorepoPackagesList: string;

  /**
   * The "lint" npm command used in husky scripts. This command will be
   * different for monorepos (including hybridrepos) than it is for polyrepos.
   */
  lintNpmScript: string;
  /**
   * The "test" npm command used in husky scripts. This command will be
   * different for monorepos (not including hybridrepos) than it is for
   * polyrepos and hybridrepos.
   */
  testNpmScript: string;

  /**
   * The owner of the repository on GitHub or other service.
   *
   * This string is always a URL-safe and valid GitHub repository owner.
   */
  repoOwner: string;
  /**
   * The name of the repository on GitHub or other service.
   *
   * This string is always a URL-safe and valid GitHub repository name.
   */
  repoName: string;
  /**
   * The year as shown in various generated documents like `LICENSE.md`.
   */
  year: string;
  /**
   * The flag used when generating codecov badges and related links.
   */
  codecovFlag: string;
  /**
   * The standard markdown text denoting the start of a "chooser block".
   */
  chooserBlockStart: string;
  /**
   * The standard markdown text denoting the beginning of a new choice in a
   * "chooser block".
   */
  chooserBlockSplit: string;
  /**
   * The standard markdown text denoting the end of a "chooser block".
   */
  chooserBlockEnd: string;
};

/**
 * Options to tweak the runtime of {@link makeTransformer}.
 */
export type MakeTransformerOptions = {
  /**
   * Whether the generated asset contents should be trimmed and how.
   *
   * @default 'both-then-append-newline'
   */
  trimContents?: 'start' | 'end' | 'both' | 'both-then-append-newline' | false;
};

/**
 * Options to tweak the runtime of {@link gatherAssetsFromTransformer} and
 * related functions.
 */
export type GatherAssetsFromTransformerOptions = {
  /**
   * Whether an attempt should be made to retrieve a transformer file ending in
   * `.js` versus `.ts`.
   *
   * This is primarily useful in situations where we do not have access to the
   * transpiled `.js` versions of the source `.ts` files.
   *
   * @default 'js'
   */
  transformerFiletype?: 'js' | 'ts';
};

/**
 * A looser version of {@link TransformerContext} used when constructing custom
 * transformer contexts.
 *
 * **INSTANCES OF `IncomingTransformerContext` MUST NOT CONTAIN ANY SENSITIVE
 * INFORMATION!**
 *
 * @see {@link TransformerContext}
 */
export type IncomingTransformerContext = Omit<TransformerContext, 'asset'>;

/**
 * Retrieve one or more assets, conditioned on `transformerContext`, by invoking
 * a single transformer. For example, to retrieve the `eslint.config.mjs` asset
 * file and its generated contents, the transformer source for which exists in
 * `${directoryAssetTransformers}/_eslint.config.mjs.ts`, pass
 * `"eslint.config.mjs"` as `transformerId`.
 *
 * Note that it cannot be assumed that the `transformerId` and the filename of
 * the returned asset will always be the same, nor can it be assumed that a
 * transformer returns only a single asset.
 *
 * This function returns a {@link ReifiedAssets} instance or throws if no
 * corresponding transformer for `transformerId` can be found.
 *
 * @see {@link gatherAssetsFromAllTransformers}
 */
export async function gatherAssetsFromTransformer({
  transformerId,
  transformerContext,
  options: _options = {}
}: {
  transformerId: string;
  transformerContext: IncomingTransformerContext;
  options?: MakeTransformerOptions & GatherAssetsFromTransformerOptions;
}): Promise<ReifiedAssets> {
  const { transformerFiletype: assetContainerFiletype = 'js', ...options } = _options;

  gatherAssetsDebug('assetContainerFiletype: %O', assetContainerFiletype);
  gatherAssetsDebug('transformerId: %O', transformerId);

  const transformerPath = toPath(
    directoryAssetTransformers,
    `_${transformerId}.${assetContainerFiletype}`
  );

  return invokeTransformerAndReifyAssets({
    debug: gatherAssetsDebug,
    options,
    transformerContext,
    transformerId,
    transformerPath
  });
}

/**
 * Retrieve all available assets conditioned on `transformerContext`. Since
 * computing asset file contents are deferred until the generator function is
 * called, calling this function is **quick and safe** and will _not_
 * immediately load a bunch of assets into memory.
 *
 * @see {@link gatherAssetsFromTransformer}
 */
export async function gatherAssetsFromAllTransformers({
  transformerContext,
  options = {}
}: {
  transformerContext: IncomingTransformerContext;
  options?: MakeTransformerOptions;
}): Promise<ReifiedAssets> {
  const reifiedAssetPromises = [] as Promise<ReifiedAssets>[];

  for (const transformerBasename of await readdir(directoryAssetTransformers)) {
    if (
      transformerBasename.endsWith('.d.ts') ||
      (!transformerBasename.endsWith('.js') && !transformerBasename.endsWith('.ts'))
    ) {
      gatherAllAssetsDebug(
        'ignored potential transformer file (basename): %O',
        transformerBasename
      );
      continue;
    }

    const transformerPath = toPath(directoryAssetTransformers, transformerBasename);
    const transformerId = transformerBasename.slice(1, -3);

    gatherAllAssetsDebug('transformerBasename: %O', transformerBasename);
    gatherAllAssetsDebug('transformerId: %O', transformerId);

    reifiedAssetPromises.push(
      invokeTransformerAndReifyAssets({
        debug: gatherAllAssetsDebug,
        options,
        transformerContext,
        transformerId,
        transformerPath
      })
    );
  }

  return Object.assign({}, ...(await Promise.all(reifiedAssetPromises)));
}

/**
 * Accepts a {@link Transform} function and returns a
 * {@link TransformerContainer} containing a single {@link Transformer}.
 *
 * {@link Transformer}s are responsible for returning only relevant asset paths
 * (and their lazily-generated contents) conditioned on the current context.
 */
export function makeTransformer(transform: Transform): TransformerContainer {
  return {
    async transformer(context, { trimContents } = {}) {
      return Object.fromEntries(
        (await transform(context)).map(({ path, generate: wrappedGenerate }) => {
          return [
            path,
            async function generate() {
              makeTransformerDebug.message('generating contents of asset: %O', path);
              let contents = await wrappedGenerate();

              if (typeof contents === 'string') {
                contents =
                  contents[
                    trimContents === 'start'
                      ? 'trimStart'
                      : trimContents === 'end'
                        ? 'trimEnd'
                        : trimContents === false
                          ? 'toString'
                          : 'trim'
                  ]();

                if (
                  trimContents === 'both-then-append-newline' ||
                  trimContents === undefined
                ) {
                  contents += '\n';
                }
              }

              return contents;
            }
          ];
        })
      );
    }
  };
}

/**
 * This function takes an object of absolute path keys with relative path
 * values; each pair represents an output path and an input path relative to the
 * template asset directory. This function returns a {@link ReifiedAssets}
 * instance with values that lazily invoke {@link compileTemplate}.
 */
export async function compileTemplates(
  templates: Record<AbsolutePath, RelativePath>,
  context: TransformerContext
): Promise<Asset[]> {
  const templatesEntries = Object.entries(templates) as Entry<typeof templates>[];
  compileTemplatesDebug('templatesEntries: %O', templatesEntries);

  return templatesEntries.map(([outputPath, inputPath]) => ({
    path: outputPath,
    generate: () => compileTemplate(inputPath, context)
  }));
}

/**
 * Takes a path relative to the `src/assets/templates` directory and returns the
 * template at that path with all handlebars-style template variables (e.g.
 * `{{variableName}}`) with matching keys in `TemplateContext` replaced with
 * their contextual values.
 */
export async function compileTemplate(
  templatePath: RelativePath,
  context: TransformerContext
): Promise<string> {
  const templatePathActual = toPath(directoryAssetTemplates, templatePath);

  compileTemplateDebug('retrieving template asset');
  compileTemplateDebug('templatePath: %O', templatePath);
  compileTemplateDebug('templatePathActual: %O', templatePathActual);

  return compileTemplateInMemory(await readFile(templatePathActual), context);
}

/**
 * Takes a string and returns that string with all handlebars-style "template
 * variables" (e.g. `{{variableName}}`) with matching keys in `TemplateContext`
 * replaced with their contextual values. All such values are stringified using
 * `String(value)`. Object-valued variables can have their properties referenced
 * using dot notation, i.e.: `{{variableName.prop.sub-prop.length}}`.
 *
 * Template variables accept an optional `linkText` parameter which, if given,
 * will be replaced by a link of the form `[linkText](contextual-value)`. The
 * parameter is separated from the key by a colon, e.g. `{{variableName:link
 * text}}` will be replaced with `[link text](variableName's-contextual-value)`.
 */
export function compileTemplateInMemory(
  rawTemplate: string,
  context: TransformerContext
): string {
  configTemplateDebug(
    'compiling raw template from transformer %O (~%O bytes): %O',
    context.asset,
    rawTemplate.length,
    rawTemplate
  );

  // eslint-disable-next-line unicorn/no-array-reduce
  const compiledTemplate = Object.entries(context).reduce((result, [key, value]) => {
    return result
      .replaceAll(
        new RegExp(`{{${key}(\\.[^:|+}]+)?(?:|:|:(.+?(?=}})))}}`, 'g'),
        (_matchText, query: string | undefined, linkText: string | undefined) => {
          const actualValue = String(query ? getInObject(value, query.slice(1)) : value);
          // ! `value` may be sensitive, so do not output it in logs
          configTemplateDebug(
            'found and replaced %O template variable (link)',
            key + (query || '')
          );
          return linkText ? `[${linkText}](${actualValue})` : actualValue;
        }
      )
      .replaceAll(
        new RegExp(`{{${key}(\\.[^:|+}]+)?(?:\\|(.*?(?=}})))}}`, 'g'),
        (_matchText, query: string | undefined, defaultText: string) => {
          const actualValue = query ? getInObject(value, query.slice(1)) : value;
          // ! `value` may be sensitive, so do not output it in logs
          configTemplateDebug(
            'found and replaced %O conditional template variable (default)',
            key + (query || '')
          );
          return actualValue ? String(actualValue) : defaultText;
        }
      )
      .replaceAll(
        new RegExp(`{{${key}(\\.[^:|+}]+)?(?:\\+(.+?(?=}})))}}`, 'g'),
        (_matchText, query: string | undefined, suffix: string) => {
          const actualValue = query ? getInObject(value, query.slice(1)) : value;
          // ! `value` may be sensitive, so do not output it in logs
          configTemplateDebug(
            'found and replaced %O conditional template variable (concat)',
            key + (query || '')
          );
          return actualValue ? String(actualValue) + suffix : '';
        }
      );
  }, rawTemplate);

  configTemplateDebug(
    'final compiled template size for transformer %O: ~%O bytes',
    context.asset,
    compiledTemplate.length
  );

  return compiledTemplate;
}

/**
 * The `MergeWithCustomizer` type from lodash's {@link mergeWith}.
 */
export type MergeWithCustomizer = Parameters<typeof mergeWith<unknown, unknown>>[2];

/**
 * A thin wrapper around lodash's {@link mergeWith} that does not mutate
 * `originalConfiguration`.
 *
 * By default, a custom replacer is provided that **does not** recursively merge
 * array values, only a shallow non-recursive merge is performed (latter array
 * values are concatenated to the old array). Additionally, `undefined`
 * properties will unset previously defined properties.
 *
 * @see {@link defaultCustomReplacer}
 * @see https://lodash.info/doc/merge
 */
export function deepMergeConfig<ConfigurationType>(
  originalConfiguration: ConfigurationType,
  overwrites: ConfigurationType | EmptyObject = {},
  customReplacer: MergeWithCustomizer = defaultCustomReplacer
): ConfigurationType {
  return mergeWith({}, originalConfiguration, overwrites, customReplacer);
}

/**
 * Custom lodash merge customizer that causes successive `undefined` source
 * values to unset (delete) the destination property if it exists, and to
 * completely overwrite the destination property if the source property is an
 * array.
 *
 * Additionally, this customizer **does not** recursively merge array values,
 * only a shallow non-recursive merge is performed (latter array values are
 * concatenated to the old array).
 *
 * @see https://lodash.com/docs/4.17.15#mergeWith
 */
export function defaultCustomReplacer(
  objValue: unknown,
  srcValue: unknown,
  key: string,
  object: Record<string, unknown> | undefined,
  source: Record<string, unknown> | undefined
) {
  if (object && source) {
    if (srcValue === undefined && key in source) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete object[key];
    } else if (Array.isArray(srcValue)) {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }

      return srcValue;
    }
  }

  return undefined;
}

async function invokeTransformerAndReifyAssets({
  debug,
  transformerPath: transformerPath_,
  transformerContext,
  transformerId,
  options
}: {
  debug: ExtendedDebugger;
  transformerPath: AbsolutePath;
  transformerContext: IncomingTransformerContext;
  transformerId: string;
  options: MakeTransformerOptions & GatherAssetsFromTransformerOptions;
}) {
  const transformerPath = pathToFileURL(transformerPath_).toString();

  try {
    debug('importing transformer from: %O', transformerPath);

    const { transformer } = (await import(transformerPath)) as Awaited<
      ReturnType<typeof makeTransformer>
    >;

    debug('invoking transformer from: %O', transformerPath);
    const reifiedAssets = await transformer(
      {
        ...transformerContext,
        asset: transformerId
      },
      options
    );

    debug('transformer %O returned assets: %O', transformerPath, reifiedAssets);
    return reifiedAssets;
  } catch (error) {
    throw new CliError(ErrorMessage.AssetRetrievalFailed(transformerPath), {
      cause: error
    });
  }
}

/**
 * Takes a {@link TransformerContext} and an adder function and returns an array
 * of {@link Asset}s generated per each package in {@link ProjectMetadata},
 * including the root package in hybridrepos and polyrepos (but not in
 * non-hybrid monorepos).
 *
 * Note that, when invoked with `scope` equal to
 * {@link DefaultGlobalScope.ThisPackage}, `transformerContext` must already be
 * configured for the current package. It will not be modified further by this
 * function (only in this specific case).
 *
 * **WARNING: be wary relying on an external {@link TransformerContext} when
 * using this function. When context access is required, use the
 * `contextWithCwdPackage` parameter provided to each adder function.**
 */
export async function generatePerPackageAssets(
  transformerContext: TransformerContext,
  adder: (helpers: {
    package_: Package;
    toPackageAbsolutePath: TransformerContext['toPackageAbsolutePath'];
    contextWithCwdPackage: TransformerContext;
  }) => Promisable<Asset[] | undefined>,
  {
    includeRootPackageInNonHybridMonorepo = false
  }: {
    /**
     * If `true`, the root workspace package will be included among the
     * {@link Package}s passed to `adder` even when the {@link ProjectMetadata}
     * indicates that this monorepo does not actually have a publishable root
     * package containing source code or tests.
     *
     * Note that, if `cwdPackage` in {@link TransformerContext.projectMetadata}
     * is the non-hybrid monorepo root and scope is `"this-package"`, the
     * package will be included regardless of this option.
     *
     * @default false
     */
    includeRootPackageInNonHybridMonorepo?: boolean;
  } = {}
): Promise<Asset[]> {
  const {
    scope,
    toProjectAbsolutePath,
    projectMetadata: { cwdPackage, rootPackage, subRootPackages, type }
  } = transformerContext;

  if (scope === DefaultGlobalScope.ThisPackage) {
    const toPackageAbsolutePath = toSpecificPackageAbsolutePath(cwdPackage);
    return Promise.resolve(
      adder({
        package_: cwdPackage,
        toPackageAbsolutePath,
        contextWithCwdPackage: {
          ...transformerContext,
          toPackageAbsolutePath
          // ? Unlike the all-packages version below, this version expects
          // ? the incoming transformerContext to already be configured for the
          // ? current package, so there's nothing further to do here :)
        }
      })
    ).then((result) => result || []);
  } else {
    const allPackages = [...(subRootPackages?.values() || [])] as Package[];

    if (
      includeRootPackageInNonHybridMonorepo ||
      type !== ProjectAttribute.Monorepo ||
      rootPackage.attributes[ProjectAttribute.Hybridrepo]
    ) {
      allPackages.unshift(rootPackage);
    }

    const allPackagesAssets = await Promise.all(
      allPackages.map(async (package_) => {
        const toPackageAbsolutePath = toSpecificPackageAbsolutePath(package_);
        return adder({
          package_: package_,
          toPackageAbsolutePath,
          contextWithCwdPackage: {
            ...transformerContext,
            toPackageAbsolutePath,
            codecovFlag: (await deriveCodecovPackageFlag(package_)).flag,
            cwdPackagePartialImportSpecifier: isRootPackage(package_)
              ? ''
              : `+${package_.id}`,
            projectMetadata: {
              ...transformerContext.projectMetadata,
              cwdPackage: package_
            }
          }
        });
      })
    );

    return allPackagesAssets.flat().filter((asset) => !!asset);
  }

  function toSpecificPackageAbsolutePath(package_: Package) {
    return function (...args) {
      const relativeRoot = 'relativeRoot' in package_ ? package_.relativeRoot : '';
      return toProjectAbsolutePath(relativeRoot, ...args);
    } as TransformerContext['toPackageAbsolutePath'];
  }
}

/**
 * Takes a {@link TransformerContext} and an adder function and returns an array
 * of {@link Asset}s when the current package is a {@link RootPackage} or scope
 * is set to {@link DefaultGlobalScope.Unlimited}.
 */
export async function generateRootOnlyAssets(
  transformerContext: TransformerContext,
  adder: (helpers: { package_: Package }) => Promisable<Asset[] | undefined>
): Promise<Asset[]> {
  const {
    scope,
    projectMetadata: { cwdPackage, rootPackage }
  } = transformerContext;

  return scope === DefaultGlobalScope.Unlimited || isRootPackage(cwdPackage)
    ? Promise.resolve(adder({ package_: rootPackage })).then((result) => result || [])
    : [];
}
