// * Every now and then, we adopt best practices from CRA
// * https://tinyurl.com/yakv4ggx

import assert from 'node:assert';
import { statSync } from 'node:fs';

import escapeStringRegexp from 'escape-string-regexp~4';
import findUp from 'find-up~5';
import semver from 'semver';

import { LogTag } from 'multiverse+cli-utils:logging.ts';

import {
  deriveAliasesForBabel,
  generateRawAliasMap,
  isDotRelativePathRegExp
} from 'multiverse+project-utils:alias.ts';

import { ProjectError } from 'multiverse+project-utils:error.ts';

import {
  babelConfigProjectBase,
  getCurrentWorkingDirectory,
  packageJsonConfigPackageBase,
  readXPackageJsonAtRoot,
  toAbsolutePath,
  toDirname,
  toPath,
  toRelativePath,
  type AbsolutePath,
  type RelativePath
} from 'multiverse+project-utils:fs.ts';

import {
  flattenPackageJsonSubpathMap,
  resolveEntryPointsFromExportsTarget
} from 'multiverse+project-utils:resolver.ts';

import { createDebugLogger, createGenericLogger } from 'multiverse+rejoinder';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';

import {
  globalDebuggerNamespace,
  makeGeneratedAliasesWarningComment
} from 'universe:constant.ts';

import { ErrorMessage } from 'universe:error.ts';
import { stringifyJson } from 'universe:util.ts';

import type { TransformOptions as BabelConfig } from '@babel/core';
import type { Options as BabelPresetEnvConfig } from '@babel/preset-env';

import type {
  Callback as TransformRewriteImportsCallback,
  Options as TransformRewriteImportsOptions
} from 'babel-plugin-transform-rewrite-imports';

import type { PackageJson } from 'type-fest';

// {@symbiote/notExtraneous @babel/cli}

const debug = createDebugLogger({
  namespace: `${globalDebuggerNamespace}:asset:babel`
});

const dbgReplacerResult = debug.extend('replaced');
const dbgCoreJs = debug.extend('check-core');
const dbgModuleExport = debug.extend('export');
const dbgMakeReplacer = debug.extend('make-replacer');
const dbgMakePlugin = debug.extend('make-plugin');
const dbgReplacer = debug.extend('replacing');
const dbgResolver = debug.extend('resolving');

const log = createGenericLogger({
  namespace: `${globalDebuggerNamespace}:asset:babel`
});

/**
 * If, for some reason, we're using a capturing group notation outside of the
 * standard ECMAScript "$#", then tweak this variable.
 */
const regexpCaptureGroupOne = '$1';
debug('regexpCaptureGroupOne: %O', regexpCaptureGroupOne);

export type { BabelConfig };

/**
 * An array of NODE_ENV values recognized by this configuration file.
 */
export const wellKnownNodeEnvValues = [
  'development',
  'test',
  //'production',
  'production-esm',
  'production-cjs',
  'production-types'
] as const;

/**
 * Should be bumped manually and with caution.
 *
 * ! MUST ALWAYS FOLLOW THE SYNTAX X.X -OR- X.X.X (WHERE "X" ARE NUMERIC CHARS)
 */
export const CORE_JS_LIBRARY_VERSION = '3.39';

// ? https://nodejs.org/en/about/releases
export const NODE_LTS = 'maintained node versions';

/**
 * All known TypeScript file extensions supported by Babel (except {@link extensionTypescriptDefinition}).
 */
export const extensionsTypescript = ['.ts', '.cts', '.mts', '.tsx'] as const;

/**
 * The known file extension for TypeScript definition files.
 *
 * @see {@link extensionsTypescript}
 */
export const extensionTypescriptDefinition = '.d.ts';

/**
 * All known JavaScript file extensions supported by Babel.
 */
export const extensionsJavascript = [
  // ! .js must be the first extension in this array
  '.js',
  '.mjs',
  '.cjs',
  '.jsx'
] as const;

/**
 * All possible extensions accepted by Babel using standard symbiote configs
 * (except {@link extensionTypescriptDefinition}).
 */
export const extensionsAcceptedByBabel = [
  ...extensionsTypescript,
  ...extensionsJavascript
] as const;

debug('CORE_JS_LIBRARY_VERSION: %O', CORE_JS_LIBRARY_VERSION);
debug('NODE_LTS: %O', NODE_LTS);
debug('extensionsTypescript: %O', extensionsTypescript);
debug('extensionTypescriptDefinition: %O', extensionTypescriptDefinition);
debug('extensionsJavascript: %O', extensionsJavascript);
debug('extensionsAcceptedByBabel: %O', extensionsAcceptedByBabel);

/**
 * Returns `true` if `path` points to a file with an extension accepted by Babel
 * (except {@link extensionTypescriptDefinition}).
 *
 * @see {@link extensionsAcceptedByBabel}
 */
export function hasExtensionAcceptedByBabel(path: string) {
  return extensionsAcceptedByBabel.some((extension) => path.endsWith(extension));
}

/**
 * Returns `true` if `path` points to a file with a TypeScript extension (except
 * `.d.ts`).
 *
 * @see {@link extensionsTypescript}
 */
export function hasTypescriptExtension(path: string) {
  return extensionsTypescript.some((extension) => path.endsWith(extension));
}

/**
 * Returns `true` if `path` points to a file with a JavaScript extension.
 *
 * @see {@link extensionsJavascript}
 */
export function hasJavascriptExtension(path: string) {
  return extensionsTypescript.some((extension) => path.endsWith(extension));
}

const dTsExtensionsToReplace = [
  // ! Multi-dot extensions (like .d.ts) must go before single-dot extensions
  extensionTypescriptDefinition,
  ...extensionsTypescript,
  // ? No .js
  ...extensionsJavascript.slice(1)
];

const endsWithJsExtensionRegExp = new RegExp(
  escapeStringRegexp(extensionsJavascript[0]) + '$'
);
const endsWithPackageJsonRegExp = new RegExp(
  `(^|/)${escapeStringRegexp(packageJsonConfigPackageBase)}$`
);
const includesNodeModulesRegExp = /(^|\/)node_modules\//;
const grabEverythingUpToAndIncludingNodeModulesRegExp = /^(.*\/)?node_modules\//;
// ! Must end with a dollar sign
const translateJsExtensionsToTsRegExp = /(.+)\.(c|m)?ts(x)?$/;
const translateJsExtensionsToTsRegExpReplacer = '$1.$2js$3';

const dTsExtensionsToReplaceRegExp = new RegExp(
  `\\.(${dTsExtensionsToReplace
    // ? Replace only the first dot in multi-dot extensions (like .d.ts)
    .map((x) => x.replace('.', '').replaceAll('.', String.raw`\.`))
    .join('|')})$`
);

debug('endsWithJsExtensionRegExp: %O', endsWithJsExtensionRegExp);
debug('endsWithPackageJsonRegExp: %O', endsWithPackageJsonRegExp);
debug('includesNodeModulesRegExp: %O', includesNodeModulesRegExp);
debug(
  'grabEverythingUpToAndIncludingNodeModulesRegExp: %O',
  grabEverythingUpToAndIncludingNodeModulesRegExp
);
debug('translateJsExtensionsToTsRegExp: %O', translateJsExtensionsToTsRegExp);
debug(
  'translateJsExtensionsToTsRegExpReplacer: %O',
  translateJsExtensionsToTsRegExpReplacer
);

debug('dTsExtensionsToReplace: %O', dTsExtensionsToReplace);
debug('dTsExtensionsToReplaceRegExp: %O', dTsExtensionsToReplaceRegExp);

function makeTransformRewriteImportsSourceModuleResolver(
  derivedAliases: ReturnType<typeof deriveAliasesForBabel>,
  packageRoot: AbsolutePath,
  projectRoot: AbsolutePath
) {
  const plugin = [
    // {@symbiote/notExtraneous babel-plugin-transform-rewrite-imports}
    'babel-plugin-transform-rewrite-imports',
    {
      appendExtension: extensionsJavascript[0],
      recognizedExtensions: [...extensionsJavascript, '.json'],
      injectDynamicRewriter: 'never',
      replaceExtensions: {
        // ? Replace any aliases with their reified filesystem path
        ...Object.fromEntries(
          Object.entries(derivedAliases).map((alias) =>
            makeDistReplacerEntry(
              alias as [string, RelativePath],
              'source',
              packageRoot,
              projectRoot
            )
          )
        ),
        // ? Replace any TS extensions with their JS equivalents
        [translateJsExtensionsToTsRegExp.toString().slice(1, -1)]:
          translateJsExtensionsToTsRegExpReplacer
      }
    } satisfies TransformRewriteImportsOptions
  ] as const;

  dbgMakePlugin('source module resolver plugin config: %O', plugin);
  return plugin;
}

function makeTransformRewriteImportsDefinitionModuleResolver(
  derivedAliases: ReturnType<typeof deriveAliasesForBabel>,
  packageRoot: AbsolutePath,
  projectRoot: AbsolutePath
) {
  const plugin = [
    // {@symbiote/notExtraneous babel-plugin-transform-rewrite-imports}
    'babel-plugin-transform-rewrite-imports',
    {
      // ? Don't append extensions to imports in .d.ts files (tsc sometimes spits
      // ? out import specifiers that rely on cjs-style extensionless import
      // ? rules)
      //appendExtension: extensionsJavascript[0],
      recognizedExtensions: [extensionsJavascript[0]],
      injectDynamicRewriter: 'never',
      replaceExtensions: {
        // ? Replace any aliases with their reified filesystem path
        ...Object.fromEntries(
          Object.entries(derivedAliases).map((alias) =>
            makeDistReplacerEntry(
              alias as [string, RelativePath],
              'definition',
              packageRoot,
              projectRoot
            )
          )
        ),
        // ? Replace any JS/TS extensions with .js (recognized by/as .d.ts)
        ...Object.fromEntries(
          dTsExtensionsToReplace.map((extension) => [extension, extensionsJavascript[0]])
        )
      }
    } satisfies TransformRewriteImportsOptions
  ] as const;

  dbgMakePlugin('definition module resolver plugin config: %O', plugin);
  return plugin;
}

export function moduleExport({
  derivedAliases,
  packageRoot,
  projectRoot
}: {
  derivedAliases: ReturnType<typeof deriveAliasesForBabel>;
  packageRoot: AbsolutePath;
  projectRoot: AbsolutePath;
}): BabelConfig {
  dbgModuleExport('derivedAliases: %O', derivedAliases);
  dbgModuleExport('packageRoot: %O', packageRoot);
  dbgModuleExport('projectRoot: %O', projectRoot);

  const config: BabelConfig = {
    comments: false,
    parserOpts: { strictMode: true },
    generatorOpts: { importAttributesKeyword: 'with' },
    assumptions: { constantReexports: true },
    plugins: [
      // {@symbiote/notExtraneous @babel/plugin-proposal-export-default-from}
      '@babel/plugin-proposal-export-default-from'
    ],
    // ? Sub-keys under the "env" config key will augment the above
    // ? configuration depending on the value of NODE_ENV and friends. Default
    // ? is: development
    env: {
      // * Used by Jest and `npm test`
      test: {
        comments: true,
        sourceMaps: 'inline',
        presets: [
          // {@symbiote/notExtraneous @babel/preset-env @types/babel__preset-env}
          [
            '@babel/preset-env',
            { targets: { node: true } } satisfies BabelPresetEnvConfig
          ],
          // {@symbiote/notExtraneous @babel/preset-typescript}
          ['@babel/preset-typescript', { allowDeclareFields: true }],
          // {@symbiote/notExtraneous @babel/preset-react}
          ['@babel/preset-react', { runtime: 'automatic' }]
          // ? We don't care about minification
        ],
        plugins: [
          // ? Jest handles transforming specifiers on its own
          //babelPluginTransformRewriteImportsSourceModuleResolver
          // TODO: explicit-exports-references need to be updated to work with
          // TODO: latest babel mode (need to rename usage, rather than exports)
          // ? Only active when testing, the plugin solves the following problem:
          // ? https://stackoverflow.com/q/40771520/1367414
          // {@symbiote/notExtraneous babel-plugin-explicit-exports-references}
          //'babel-plugin-explicit-exports-references'
        ]
      },
      // * Used by `npm run build` for compiling CJS to code output in ./dist
      'production-cjs': {
        presets: [
          [
            // {@symbiote/notExtraneous @babel/preset-env @types/babel__preset-env}
            '@babel/preset-env',
            {
              // ? https://babeljs.io/docs/en/babel-preset-env#modules
              modules: 'cjs',
              targets: NODE_LTS,
              useBuiltIns: 'usage',
              corejs: doCoreJsVersionChecksAndReturnHardcodedVersion({ packageRoot }),
              shippedProposals: true,
              exclude: ['transform-dynamic-import']
            } satisfies BabelPresetEnvConfig
          ],
          // {@symbiote/notExtraneous @babel/preset-typescript}
          ['@babel/preset-typescript', { allowDeclareFields: true }],
          // {@symbiote/notExtraneous @babel/preset-react}
          ['@babel/preset-react', { runtime: 'automatic' }]
        ],
        plugins: [
          makeTransformRewriteImportsSourceModuleResolver(
            derivedAliases,
            packageRoot,
            projectRoot
          )
        ]
      },
      // TODO: add production-esm too
      // * Used by `npm run build` for fixing declaration file imports in ./dist
      'production-types': {
        comments: true,
        plugins: [
          // {@symbiote/notExtraneous @babel/plugin-syntax-typescript}
          ['@babel/plugin-syntax-typescript', { dts: true }],
          makeTransformRewriteImportsDefinitionModuleResolver(
            derivedAliases,
            packageRoot,
            projectRoot
          )
        ]
      }
    }
  };

  dbgModuleExport('config: %O', config);
  return config;
}

/**
 * @see {@link assertEnvironment}
 */
export const { transformer } = makeTransformer(function (context) {
  const { asset, shouldDeriveAliases, projectMetadata, toProjectAbsolutePath } = context;
  const derivedAliasesSourceSnippet = shouldDeriveAliases
    ? `return ${stringifyJson(
        deriveAliasesForBabel(generateRawAliasMap(projectMetadata)),
        4
      ).replace(/^}/m, '  }')}`
    : 'return {}';

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(babelConfigProjectBase),
        generate: () => /*js*/ `
// @ts-check
'use strict';

const { deepMergeConfig } = require('@-xun/symbiote/assets');

const {
  assertEnvironment,
  moduleExport
} = require('@-xun/symbiote/assets/${asset}');

// TODO: publish latest rejoinder package first, then update configs to use it
//const { createDebugLogger } = require('rejoinder');

/*const debug = createDebugLogger({ namespace: '${globalDebuggerNamespace}:config:babel' });*/

module.exports = deepMergeConfig(
  moduleExport({
    derivedAliases: getBabelAliases(),
    ...assertEnvironment({ projectRoot: __dirname })
  }),
  /**
   * @type {import('@-xun/symbiote/assets/${asset}').BabelConfig}
   */
  {
    // Any custom configs here will be deep merged with moduleExport's result
  }
);

/*debug('exported config: %O', module.exports);*/

function getBabelAliases() {
${makeGeneratedAliasesWarningComment(2)}
  ${derivedAliasesSourceSnippet}
}
`
      }
    ];
  });
});

/**
 * @see {@link moduleExport}
 */
export function assertEnvironment({
  projectRoot
}: {
  projectRoot: string;
}): Omit<Parameters<typeof moduleExport>[0], 'derivedAliases'> {
  const mode = (process.env.NODE_ENV ||
    '(undefined)') as (typeof wellKnownNodeEnvValues)[number];

  if (!wellKnownNodeEnvValues.includes(mode)) {
    throw new ProjectError(
      ErrorMessage.ConfigAssetEnvironmentValidationFailed(
        'babel',
        mode,
        wellKnownNodeEnvValues
      )
    );
  }

  const packageRoot = getCurrentWorkingDirectory();

  return { projectRoot: toAbsolutePath(projectRoot), packageRoot };
}

/**
 * Returns the core-js version to use with babel (always
 * {@link CORE_JS_LIBRARY_VERSION}). Usually it should just be whatever
 * `@-xun/symbiote` is providing, but it could be the case that the current
 * package supplies its own version of `core-js` (and prevents `@-xun/symbiote`'s
 * version from being hoisted). In this case, we should try to use their
 * version.
 */
function doCoreJsVersionChecksAndReturnHardcodedVersion({
  packageRoot
}: {
  packageRoot: AbsolutePath;
}) {
  dbgCoreJs('packageRoot: %O', packageRoot);

  const coreJsLibraryVersion = semver.coerce(CORE_JS_LIBRARY_VERSION)?.version;

  dbgCoreJs('coreJsLibraryVersion: %O', coreJsLibraryVersion);
  assert(coreJsLibraryVersion, ErrorMessage.GuruMeditation());

  const {
    name: packageName,
    dependencies: { 'core-js': cwdPackageCoreJsDependency_ } = {}
  } = readXPackageJsonAtRoot.sync(packageRoot, { useCached: true, try: true });

  const cwdPackageCoreJsDependency =
    semver.validRange(cwdPackageCoreJsDependency_) || undefined;

  dbgCoreJs('packageName (current package): %O', packageName);
  dbgCoreJs('cwdPackageCoreJsDependency_: %O', cwdPackageCoreJsDependency_);
  dbgCoreJs('cwdPackageCoreJsDependency: %O', cwdPackageCoreJsDependency);

  if (cwdPackageCoreJsDependency) {
    const { version: resolvedCoreJsVersion } = (() => {
      try {
        return require('core-js/package.json') as PackageJson;
      } catch (error) {
        dbgCoreJs.error('attempt to read core-js package.json failed: %O', error);
        return {};
      }
    })();

    dbgCoreJs('resolvedCoreJsVersion: %O', resolvedCoreJsVersion);

    if (resolvedCoreJsVersion) {
      // * At this point, any error conditions are catastrophic enough that the
      // * build process must be abruptly aborted

      const isResolvedVersionLessThanLibraryVersion =
        semver.compare(resolvedCoreJsVersion, coreJsLibraryVersion) === -1;

      if (isResolvedVersionLessThanLibraryVersion) {
        throw new ProjectError(
          ErrorMessage.BabelCorejsInstalledVersionTooOld(
            coreJsLibraryVersion,
            CORE_JS_LIBRARY_VERSION,
            resolvedCoreJsVersion,
            packageRoot
          )
        );
      }

      const isCwdPackageDependencyNotSatisfiedByLibraryVersion = semver.valid(
        cwdPackageCoreJsDependency
      )
        ? !semver.satisfies(cwdPackageCoreJsDependency, `^${coreJsLibraryVersion}`)
        : !semver.satisfies(coreJsLibraryVersion, cwdPackageCoreJsDependency);

      if (isCwdPackageDependencyNotSatisfiedByLibraryVersion) {
        throw new ProjectError(
          ErrorMessage.BabelCorejsInstalledVersionRangeNotSatisfactory(
            coreJsLibraryVersion,
            CORE_JS_LIBRARY_VERSION,
            cwdPackageCoreJsDependency,
            packageName,
            packageRoot
          )
        );
      }
    } else {
      // * We don't throw an error here to be kind to the build process; this
      // * error should cause problems with Babel, which should do the reporting
      log.warn(
        [LogTag.IF_NOT_QUIETED],
        ErrorMessage.specialized.BabelCorejsVersionUnresolvable(
          coreJsLibraryVersion,
          CORE_JS_LIBRARY_VERSION
        )
      );
    }
  } else {
    // * We don't throw an error here to be kind to the build process; this
    // * error should be caught by post-build checks from "symbiote build"
    log.warn(
      [LogTag.IF_NOT_QUIETED],
      ErrorMessage.specialized.BabelCorejsDependencyMissing(
        coreJsLibraryVersion,
        CORE_JS_LIBRARY_VERSION,
        cwdPackageCoreJsDependency,
        packageName,
        packageRoot
      )
    );
  }

  return CORE_JS_LIBRARY_VERSION;
}

/**
 * Takes a definition file (`.d.ts`) path relative to the project root and
 * returns a function that, when called, will return a path relative to the file
 * being transpiled by Babel after performing some light validation.
 */
function makeDistReplacerEntry(
  [specifierRegExp, rawProjectRootRelativeReplacerPath]: [string, RelativePath],
  type: 'source' | 'definition',
  packageRoot: AbsolutePath,
  projectRoot: AbsolutePath
): [typeof specifierRegExp, TransformRewriteImportsCallback<RelativePath>] {
  // ? Are we at the root package?
  const isCwdPackageTheRootPackage = projectRoot === packageRoot;

  // ? Remove the leading ./ if it exists
  const projectRootRelativeReplacerPath = toPath(rawProjectRootRelativeReplacerPath);

  // ? A local cache mapping absolute paths (resolved from import specifiers)
  // ? to valid path-like entry points beginning with a package name in
  // ? node_modules and potentially followed by a slash and a path.
  // ! Note that resolution failures are also cached
  const knownEntrypoints: Record<AbsolutePath, RelativePath | undefined> = {};

  dbgMakeReplacer('packageRoot: %O', packageRoot);
  dbgMakeReplacer('projectRoot: %O', projectRoot);
  dbgMakeReplacer(
    'created new %O dist replacer for specifier regexp %O => %O',
    type,
    specifierRegExp,
    rawProjectRootRelativeReplacerPath
  );

  return [
    specifierRegExp,
    function ({ filepath: inputPath_, capturingGroups }) {
      const inputPath = toAbsolutePath(inputPath_);
      const originalSpecifier = capturingGroups[0];
      const specifierTargetWithOldExtension = capturingGroups.at(1);
      const specifierSubRootPrefix = (
        isCwdPackageTheRootPackage ? '' : toRelativePath(projectRoot, packageRoot)
      ) as RelativePath;

      const inputFileOutputPathWithOldExtension =
        type === 'source'
          ? // ? We need to account for sources being outside /dist while
            // ? definitions are already inside /dist
            toAbsolutePath(packageRoot, 'dist', toRelativePath(projectRoot, inputPath))
          : inputPath;

      const specifierTargetProjectRootRelativeSourcePath =
        projectRootRelativeReplacerPath
          // ? Ensure proper replacer syntax is used
          .replace(
            regexpCaptureGroupOne,
            sliceOffPackageRootPrefix(specifierTargetWithOldExtension)
          ) as RelativePath;

      const isSpecifierTargetUnderAPackageRootNodeModules =
        includesNodeModulesRegExp.test(specifierTargetProjectRootRelativeSourcePath);

      // ? We're assuming all package.json files being imported belong to a root
      const isSpecifierTargetAPackageJson = endsWithPackageJsonRegExp.test(
        specifierTargetProjectRootRelativeSourcePath
      );

      const isSpecifierTargetThePackageRootPackageJson =
        specifierTargetProjectRootRelativeSourcePath ===
        toPath(specifierSubRootPrefix, 'package.json');

      dbgReplacer.message(
        'type %O regexp %O matched a specifier: %O imported from input file %O',
        type,
        specifierRegExp,
        Array.from(capturingGroups),
        inputPath
      );

      dbgReplacer('originalSpecifier: %O', originalSpecifier);
      dbgReplacer(
        'specifierTargetWithOldExtension: %O',
        specifierTargetWithOldExtension
      );
      dbgReplacer('specifierSubRootPrefix: %O', specifierSubRootPrefix);
      dbgReplacer(
        'inputFileOutputPathWithOldExtension: %O',
        inputFileOutputPathWithOldExtension
      );
      dbgReplacer(
        'specifierTargetProjectRootRelativeSourcePath: %O',
        specifierTargetProjectRootRelativeSourcePath
      );
      dbgReplacer(
        'isSpecifierTargetUnderAPackageRootNodeModules: %O',
        isSpecifierTargetUnderAPackageRootNodeModules
      );
      dbgReplacer('isSpecifierTargetAPackageJson: %O', isSpecifierTargetAPackageJson);
      dbgReplacer(
        'isSpecifierTargetThePackageRootPackageJson: %O',
        isSpecifierTargetThePackageRootPackageJson
      );

      if (isSpecifierTargetAPackageJson && !isSpecifierTargetThePackageRootPackageJson) {
        log.warn(
          [LogTag.IF_NOT_QUIETED],
          ErrorMessage.specialized.BabelCorejsEgregiousPackageJsonFileInBuildOutput(
            originalSpecifier,
            inputPath
          )
        );
      }

      const isSpecifierTargetValidlyOutsideDistDirectory =
        // ? node_modules is always outside the ./dist directory
        isSpecifierTargetUnderAPackageRootNodeModules ||
        // ? When cwd is not the root package, any package.json counts as
        // ? outside the ./dist directory
        (!isCwdPackageTheRootPackage && isSpecifierTargetAPackageJson) ||
        // ? When cwd is the root package, sub-root package.json imports, while
        // ? ill-advised, are not actually outside the ./dist directory
        (isCwdPackageTheRootPackage && isSpecifierTargetThePackageRootPackageJson);

      dbgReplacer(
        'isSpecifierTargetValidlyOutsideDistDirectory: %O',
        isSpecifierTargetValidlyOutsideDistDirectory
      );

      const specifierTargetOutputPath = toAbsolutePath(
        packageRoot,
        // ? Importables sometimes live outside the package's root directory
        // ? (like package.json, or node_modules) so we should facilitate access
        isSpecifierTargetValidlyOutsideDistDirectory ? '' : 'dist',
        isSpecifierTargetUnderAPackageRootNodeModules ? 'node_modules' : '',
        isSpecifierTargetThePackageRootPackageJson
          ? sliceOffPackageRootPrefix(specifierTargetProjectRootRelativeSourcePath)
          : specifierTargetProjectRootRelativeSourcePath
              .replace(grabEverythingUpToAndIncludingNodeModulesRegExp, '')
              // ? Ensure proper extension is used
              .replace(
                type === 'source'
                  ? translateJsExtensionsToTsRegExp
                  : dTsExtensionsToReplaceRegExp,
                type === 'source'
                  ? translateJsExtensionsToTsRegExpReplacer
                  : extensionsJavascript[0]
              )
      );

      dbgReplacer('specifierTargetOutputPath: %O', specifierTargetOutputPath);

      // * Note how we purposely avoided adding missing extensions to the
      // * path above. Also note that the outputFile

      if (isSpecifierTargetUnderAPackageRootNodeModules) {
        dbgResolver('checking cache for: %O', specifierTargetOutputPath);

        // ? Attempt to resolve this precarious node_modules path into a bare
        // ? package specifier that is more resilient to hoisting
        if (!(specifierTargetOutputPath in knownEntrypoints)) {
          dbgResolver('cache miss; resolution to package entry point will be attempted');

          const isDir = statSync(specifierTargetOutputPath).isDirectory();
          const packageJsonPath = findUp.sync('package.json', {
            cwd: isDir ? specifierTargetOutputPath : toDirname(specifierTargetOutputPath)
          }) as AbsolutePath | undefined;

          dbgResolver('isDir: %O', isDir);
          dbgResolver('packageJsonPath (via find-up): %O', packageJsonPath);

          if (packageJsonPath) {
            const packageDir = toDirname(packageJsonPath);
            dbgResolver('packageDir: %O', packageDir);

            const {
              exports: packageExports,
              name: packageName,
              types: packageTypes
            } = readXPackageJsonAtRoot.sync(packageDir, {
              useCached: true
            });

            dbgResolver('packageName: %O', packageName);
            assert(packageName);

            dbgResolver('packageExports: %O', packageExports);
            dbgResolver('packageTypes: %O', packageTypes);

            if (packageExports) {
              dbgResolver('detected package exports: %O', 'yes');

              // ? For perf reasons, we only attempt resolutions in definition
              // ? files at the moment
              if (type === 'definition') {
                const flatXports = flattenPackageJsonSubpathMap({ map: packageExports });
                const target = ensureStringStartsWithDotSlash(
                  toRelativePath(packageDir, specifierTargetOutputPath)
                );

                const options = {
                  flattenedExports: flatXports,
                  target,
                  conditions: ['types', 'require', 'import', 'node']
                };

                dbgResolver('resolver options: %O', options);

                let entrypoints = resolveEntryPointsFromExportsTarget(options);

                dbgResolver('resolved entrypoints attempt: %O', entrypoints);

                let updatedTarget = target + extensionTypescriptDefinition;

                // ? I believe tsc also does shortest-path-wins
                if (!entrypoints.length) {
                  entrypoints = resolveEntryPointsFromExportsTarget({
                    ...options,
                    target: updatedTarget
                  });

                  dbgResolver(
                    'resolved entrypoints attempt (updated target: %O): %O',
                    updatedTarget,
                    entrypoints
                  );
                }

                if (!entrypoints.length) {
                  updatedTarget = target.replace(
                    endsWithJsExtensionRegExp,
                    extensionTypescriptDefinition
                  );

                  entrypoints = resolveEntryPointsFromExportsTarget({
                    ...options,
                    target: updatedTarget
                  });

                  dbgResolver(
                    'resolved entrypoints attempt (updated target: %O): %O',
                    updatedTarget,
                    entrypoints
                  );
                }

                if (!entrypoints.length) {
                  updatedTarget = target + `/index${extensionTypescriptDefinition}`;

                  entrypoints = resolveEntryPointsFromExportsTarget({
                    ...options,
                    target: updatedTarget
                  });

                  dbgResolver(
                    'resolved entrypoints attempt (updated target: %O): %O',
                    updatedTarget,
                    entrypoints
                  );
                }

                // ? Try fallbacks

                if (!entrypoints.length && packageTypes) {
                  updatedTarget = packageTypes;

                  entrypoints = resolveEntryPointsFromExportsTarget({
                    ...options,
                    target: updatedTarget
                  });

                  dbgResolver(
                    'resolved entrypoints attempt (updated target: %O): %O',
                    updatedTarget,
                    entrypoints
                  );
                }

                knownEntrypoints[specifierTargetOutputPath] = entrypoints
                  .at(0)
                  // ? Replace first dot with the package's node_modules name
                  ?.replace('.', packageName) as RelativePath;

                dbgResolver(
                  'final selected resolved entry point: %O',
                  knownEntrypoints[specifierTargetOutputPath]
                );
              } else {
                dbgResolver(
                  'non-definition type specifiers are not currently resolved for performance reasons'
                );
              }
            } else {
              dbgResolver('detected package exports: %O', 'no');

              const result = specifierTargetOutputPath.split('node_modules/').at(-1) as
                | RelativePath
                | undefined;

              if (result) {
                knownEntrypoints[specifierTargetOutputPath] = result;
              }

              dbgResolver('final selected resolved entry point: %O', result);
            }
          } else {
            dbgResolver.warn(
              'packageJsonPath is falsy (%O): resolution attempt skipped',
              packageJsonPath
            );
          }
        }

        // ? Negative results are also cached
        knownEntrypoints[specifierTargetOutputPath] ||= undefined;

        dbgResolver.message(
          'resolved entry point: %O',
          knownEntrypoints[specifierTargetOutputPath]
        );

        if (knownEntrypoints[specifierTargetOutputPath]) {
          dbgReplacerResult(
            'final replacement specifier: %O',
            knownEntrypoints[specifierTargetOutputPath]
          );

          return knownEntrypoints[specifierTargetOutputPath];
        } else {
          dbgResolver.warn(
            'failed to resolve precarious specifier real path to package entry point'
          );
        }
      }

      const resultantSpecifier = ensureStringStartsWithDotSlash(
        toRelativePath(
          toDirname(inputFileOutputPathWithOldExtension),
          specifierTargetOutputPath
        )
      );

      dbgReplacerResult('final replacement specifier: %O', resultantSpecifier);
      return resultantSpecifier;

      function sliceOffPackageRootPrefix(path: string | undefined) {
        return path?.startsWith(specifierSubRootPrefix)
          ? path.slice((specifierSubRootPrefix.length || -1) + 1)
          : path || '';
      }

      function ensureStringStartsWithDotSlash<T extends string>(result: T): T {
        return ((isDotRelativePathRegExp.test(result) ? '' : './') + result) as T;
      }
    }
  ];
}
