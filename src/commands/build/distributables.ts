/* eslint-disable no-await-in-loop */
/* eslint-disable unicorn/no-array-reduce */
import { chmod, rename, stat, symlink } from 'node:fs/promises';
import { builtinModules } from 'node:module';
import { extname } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { isNativeError } from 'node:util/types';

import { run, runNoRejectOnBadExit } from '@-xun/run';

import {
  loadOptions as loadBabelOptions,
  transformFileAsync as babelTransformAsync
} from '@babel/core';

import { type ChildConfiguration } from '@black-flag/core';
import { glob } from 'glob';
import { SHORT_TAB } from 'rejoinder';
import { rimraf as forceDeletePaths } from 'rimraf';
import uniqueFilename from 'unique-filename';

import { type AsStrictExecutionContext, type BfeBuilderObject } from 'multiverse+bfe';
import { hardAssert, softAssert } from 'multiverse+cli-utils:error.ts';

import {
  logStartTime,
  LogTag,
  standardSuccessMessage
} from 'multiverse+cli-utils:logging.ts';

import { scriptBasename } from 'multiverse+cli-utils:util.ts';

import {
  gatherImportEntriesFromFiles,
  gatherPseudodecoratorEntriesFromFiles,
  isRootPackage,
  isWorkspacePackage,
  pathToPackage,
  ProjectAttribute,
  PseudodecoratorTag,
  WorkspaceAttribute,
  type ImportSpecifier
} from 'multiverse+project-utils';

import {
  ensureRawSpecifierOk,
  generateRawAliasMap,
  isLocalLookingRegExp,
  mapRawSpecifierToPath,
  mapRawSpecifierToRawAliasMapping
} from 'multiverse+project-utils:alias.ts';

import {
  gatherPackageBuildTargets,
  prefixAssetImport,
  prefixExternalImport,
  prefixInternalImport,
  prefixNormalImport,
  prefixTypeOnlyImport,
  specifierToPackageName,
  type MetadataImportsPrefix
} from 'multiverse+project-utils:analyze/gather-package-build-targets.ts';

import { gatherPackageFiles } from 'multiverse+project-utils:analyze/gather-package-files.ts';

import {
  directoryDistPackageBase,
  directoryIntermediatesPackageBase,
  isAbsolutePath,
  isAccessible,
  toAbsolutePath,
  toDirname,
  toPath,
  toRelativePath,
  Tsconfig,
  type Path,
  type RelativePath
} from 'multiverse+project-utils:fs.ts';

import {
  flattenPackageJsonSubpathMap,
  resolveExportsTargetsFromEntryPoint
} from 'multiverse+project-utils:resolver.ts';

import {
  extensionsTypescript,
  hasTypescriptExtension
} from 'universe:assets/transformers/_babel.config.cjs.ts';

import { TesterScope } from 'universe:commands/test.ts';

import {
  ThisPackageGlobalScope as DistributablesBuilderScope,
  type GlobalCliArguments,
  type GlobalExecutionContext
} from 'universe:configure.ts';

import {
  BuildOutputCheckError,
  ErrorMessage,
  isBuildOutputCheckError
} from 'universe:error.ts';

import {
  checkIsNotNil,
  copyFile,
  makeDirectory,
  readFile,
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage,
  writeFile
} from 'universe:util.ts';

const standardNodeShebang = '#!/usr/bin/env node\n';
const nodeModulesRelativeBinDir = `node_modules/.bin`;
const collator = new Intl.Collator(undefined, { numeric: true });

/**
 * Possible intermediate transpilation targets (non-production
 * non-distributables). See this command's options configuration for details.
 */
export enum IntermediateTranspilationEnvironment {
  Development = 'development',
  Test = 'test'
}

/**
 * Which module system to use for transpiled output.
 */
export enum ModuleSystem {
  Esm = 'esm',
  Cjs = 'cjs'
}

/**
 * @see {@link IntermediateTranspilationEnvironment}
 */
export const intermediateTranspilationEnvironment = Object.values(
  IntermediateTranspilationEnvironment
);

/**
 * @see {@link ModuleSystem}
 */
export const moduleSystems = Object.values(ModuleSystem);

/**
 * @see {@link DistributablesBuilderScope}
 */
export const distributablesBuilderScopes = Object.values(DistributablesBuilderScope);

export type CustomCliArguments = GlobalCliArguments<DistributablesBuilderScope> & {
  cleanOutputDir: boolean;
  // ? The remaining args might be undefined if we're building a NextJs package
  generateTypes?: boolean;
  linkCliIntoBin?: boolean;
  prependShebang?: boolean;
  moduleSystem?: ModuleSystem;
  generateIntermediatesFor?: IntermediateTranspilationEnvironment;
  outputExtension?: string;
  includeExternalFiles?: Path[];
  partialFilter?: RegExp[];
  excludeInternalFiles?: Path[];
  skipOutputChecks?: boolean;
  skipOutputValidityCheckFor?: (string | RegExp)[];
  skipOutputExtraneityCheckFor?: (string | RegExp)[];
  skipOutputBijectionCheckFor?: (string | RegExp)[];
};

export default async function command({
  log,
  debug_,
  state,
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const { attributes: projectAttributes = {} } = projectMetadata_?.rootPackage || {};
  const isCwdTheProjectRoot =
    projectMetadata_ && isRootPackage(projectMetadata_.cwdPackage);
  const isCwdANextJsPackage =
    // TODO: consider allowing Next.js projects as sub-roots / workspace packages
    isCwdTheProjectRoot && !!projectAttributes[ProjectAttribute.Next];

  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>(
    function (_blackFlag, _helpOrVersionSet, argv) {
      const baseParameters: BfeBuilderObject<
        CustomCliArguments,
        GlobalExecutionContext
      > = {
        scope: { choices: distributablesBuilderScopes },
        'clean-output-dir': {
          alias: 'clean',
          boolean: true,
          description: 'Force-delete the output directory before transpilation',
          default: projectMetadata_
            ? !projectAttributes[ProjectAttribute.Next]
            : '(project-dependent)'
        }
      };

      const additionalParameters: BfeBuilderObject<
        CustomCliArguments,
        GlobalExecutionContext
      > = {
        'exclude-internal-files': {
          alias: 'exclude-internal-file',
          string: true,
          array: true,
          default: [],
          description: 'Remove one or more files from internal build targets'
        },
        'generate-intermediates-for': {
          string: true,
          choices: intermediateTranspilationEnvironment,
          description: 'Transpile into non-production-ready non-distributables',
          conflicts: [
            'skip-output-validity-checks-for',
            'skip-output-extraneity-checks-for'
          ],
          implies: {
            'generate-types': false,
            'link-cli-into-bin': false,
            'prepend-shebang': false,
            'skip-output-checks': true
          }
        },
        'generate-types': {
          boolean: true,
          description: 'Output TypeScript declaration files alongside distributables',
          default: true,
          conflicts: [
            'skip-output-validity-checks-for',
            'skip-output-extraneity-checks-for'
          ],
          subOptionOf: {
            'generate-types': {
              when: (generateTypes) => !generateTypes,
              update: (oldConfig) => {
                return {
                  ...oldConfig,
                  implies: { 'skip-output-checks': true },
                  vacuousImplications: true
                };
              }
            }
          }
        },
        'include-external-files': {
          alias: 'include-external-file',
          string: true,
          array: true,
          default: [],
          description: 'Add one or more files to external build targets'
        },
        'partial-filter': {
          alias: 'partial',
          string: true,
          array: true,
          default: [],
          description: 'Only transpile absolute paths matching a RegExp filter',
          coerce(partials: string[]) {
            // ! These regular expressions can never use the global (g) flag
            return partials.map((str) => new RegExp(str, 'u'));
          },
          implies: {
            'clean-output-dir': false,
            'link-cli-into-bin': false,
            'prepend-shebang': false,
            'skip-output-checks': true
          }
        },
        'link-cli-into-bin': {
          boolean: true,
          description: 'Soft-link "bin" entries in package.json into node_modules/.bin',
          default: true
        },
        'module-system': {
          string: true,
          choices: moduleSystems,
          description: 'Which module system to transpile into',
          default: ModuleSystem.Cjs
        },
        'output-extension': {
          string: true,
          description: 'Override automatic extension selection for transpiled output',
          check: checkIsNotNil,
          defaultDescription: 'derived from other arguments',
          coerce(extension: string) {
            extension = String(extension);
            return extension.startsWith('.') ? extension : `.${extension}`;
          }
        },
        'prepend-shebang': {
          boolean: true,
          description: 'Prepend a shebang to each "bin" distributable in package.json',
          default: true
        },
        // TODO: consider an option that can reclassify a source as an asset
        // 'reclassify-as-asset': { ... }
        'skip-output-checks': {
          alias: 'skip-output-check',
          boolean: true,
          description: 'Do not run consistency and integrity checks on build output',
          default: false
        },
        'skip-output-validity-checks-for': {
          alias: ['skip-output-validity-check-for', 'skip-invalid'],
          string: true,
          array: true,
          description:
            'Do not warn when a matching (via RegExp) package/dependency fails a build output validity check',
          default: [],
          implies: { 'skip-output-checks': false, 'generate-types': true },
          coerce(strings: string[]) {
            return strings.map((str) => {
              return str.startsWith('^') || str.endsWith('$') ? new RegExp(str) : str;
            });
          }
        },
        'skip-output-extraneity-checks-for': {
          alias: ['skip-output-extraneity-check-for', 'skip-extra'],
          string: true,
          array: true,
          description:
            'Do not warn when a matching (via RegExp) package/dependency fails a build output extraneity check',
          default: [],
          implies: { 'skip-output-checks': false, 'generate-types': true },
          coerce(strings: string[]) {
            return strings.map((str) => {
              return str.startsWith('^') || str.endsWith('$') ? new RegExp(str) : str;
            });
          }
        },
        'skip-output-bijection-checks-for': {
          alias: ['skip-output-bijection-check-for', 'skip-bijective'],
          string: true,
          array: true,
          description:
            'Do not attempt to scan matching (via RegExp) imports for bijective correctness',
          default: [],
          implies: { 'skip-output-checks': false, 'generate-types': true },
          coerce(strings: string[]) {
            return strings.map((str) => {
              return str.startsWith('^') || str.endsWith('$') ? new RegExp(str) : str;
            });
          }
        }
      };

      // TODO: consider support for NextJs projects as sub-roots
      if (isCwdANextJsPackage) {
        Object.entries(additionalParameters).forEach(([name, parameter]) => {
          parameter.defaultDescription = '❌ disabled in Next.js packages';
          parameter.check = () => {
            const isDefaulted = !(argv && name in argv);
            const errorMessage = `--${name} cannot be used when building a Next.js package`;

            return isDefaulted || errorMessage;
          };
        });
      }

      return Object.assign(baseParameters, additionalParameters);
    }
  );

  return {
    aliases: ['dist'],
    builder,
    description: 'Transpile sources and assets into production-ready distributables',
    usage: withGlobalUsage(
      `$1.

${isCwdANextJsPackage ? "Note that the current working directory points to a Next.js package! When attempting to build such a package, this command will defer entirely to `next build`, which disables several of this command's options.\n\n" : ''}This command also performs lightweight validation of import specifiers and package entry points where appropriate to ensure baseline consistency, integrity, and well-formedness of build output.

This validation can be tweaked with --skip-output-validity-checks-for, --skip-output-extraneity-checks-for, and --skip-output-bijection-checks-for. These flags suppresses errors and warnings for matching files, import specifiers, and/or package names when performing final build output checks. Each parameter accepts strings _and regular expressions_, the latter being strings that start with "^" or end with "$". Note that some specifiers are always skipped during extraneity checks, such as Node builtins. Also note that it is unnecessary to escape forward slashes (/) in regular expressions provided via these parameters.

All package build targets are classified as either "source" ("sources," "source files") or "asset" ("assets," "asset files"). "Source" targets describe all the files to be transpiled while "assets" describe the remaining targets that are copied-through to the output directory without any modification. Currently, only TypeScript files (specifically, files ending in one of: ${extensionsTypescript.join(', ')}) are considered source files. Every other file is considered an asset.

All source and asset files are further classified as either "internal" or "external". Internal files or "internals" are all of the files within a package's source directory, i.e. "\${packageRoot}/src". One or more of these files can be excluded from transpilation with --exclude-internal-files. External files or "externals," on the other hand, are all of the files included in transpilation that are outside of the package's source directory, such as files from other packages in the project. One or more files can be added to the list of externals with --include-external-files.

--include-external-files accepts one or more pattern strings that are interpreted according to normal glob rules, while --exclude-internal-files accepts one or more pattern strings that are interpreted according to gitignore glob rules. Both are relative to the project (NOT package!) root. For --exclude-internal-files specifically, this all means that seemingly absolute pattern strings like "/home/me/project/src/something.ts" are actually relative to the project (NOT filesystem!) root, and seemingly relative pattern strings like "*.mjs" may exclude files at any depth below the project root. See \`man gitignore\` for more details.

At the beginning of the build process, a build manifest is generated. It lists metadata about the package being built, including its name, if it's production-ready, several important paths, and information about the build targets: (1) how many are classified as internal vs external, (2) how many are classified as asset vs source, (3) the number of project-wide import aliases used (including per-alias file counts), and (4) the number of npm package imports used (including per-package file counts).

Alias and npm package import metadata is output with additional information in the form of the following "prefix tags":

- ${prefixAssetImport} => an import occurred in an asset file under the source directory (which is weird)
- ${prefixExternalImport}    => an import of this resource occurred in an internal source file
- ${prefixInternalImport}    => an import of this resource occurred in an external source file
- ${prefixNormalImport}    => an import of this resource occurred in a normal and/or internal source file
- ${prefixTypeOnlyImport}    => an import of this resource occurred in a type-only source file

Note that an alias or package can be imported multiple times and hence have multiple tags.

After targets are built, CLI projects will have their entry points chmod-ed to be executable, shebangs added if they do not already exist, and "bin" entries soft-linked into the node_modules/.bin directory.

The only available scope is "${DistributablesBuilderScope.ThisPackage}"; hence, when invoking this command, only the package at the current working directory will be built. Use Npm's workspace features, or symbiote's "project release" command, if your goal is to build distributables from multiple packages.

When you need to access the intermediate babel transpilation result for non-production non-Next.js build outputs, which can be extremely useful when debugging strange problems in development and testing environments, see the --generate-intermediates-for option and the corresponding \`symbiote test --scope=${TesterScope.ThisPackageIntermediates}\` command.

In scenarios where build times must be reduced (such as during rapid iteration or debugging), a combination of --no-generate-types (skip types) and --partial-filter (limit scope to only absolute file paths matched by at least one of the filters, which are regular expressions) allows you to skip the two most costly operations executed by this command: type generation and transpilation of the entire entire source dependency tree. Using either --no-generate-types or --partial-filter also disables this command's output validation post-build step, though note that --partial-filter by itself only filters build targets and has no effect on the output of type definition files.

Finally, note that, when attempting to build a Next.js package, this command will defer entirely to \`next build\`. This means most of the options made available by this command are not available when building a Next.js package.`
    ),
    handler: withGlobalHandler(async function ({
      $0: scriptFullName,
      scope,
      cleanOutputDir,
      hush: isHushed,
      quiet: isQuieted,
      silent: isSilenced,
      generateIntermediatesFor,
      outputExtension,
      // TODO: could probably make this easier by using a discriminated union
      // ? We need to make sure these aren't undefined...
      includeExternalFiles: includeExternalFiles_,
      excludeInternalFiles: excludeInternalFiles_,
      generateTypes: generateTypes_,
      linkCliIntoBin: linkCliIntoBin_,
      prependShebang: prependShebang_,
      moduleSystem: moduleSystem_,
      skipOutputChecks: skipOutputChecks_,
      skipOutputValidityCheckFor: skipOutputValidityCheckFor_,
      skipOutputExtraneityCheckFor: skipOutputExtraneityCheckFor_,
      skipOutputBijectionCheckFor: skipOutputBijectionCheckFor_,
      partialFilter: partialFilter_
    }) {
      const handlerName = scriptBasename(scriptFullName);
      const genericLogger = log.extend(handlerName);
      const debug = debug_.extend(`handler-${handlerName}`);
      const filterMatchLogger = log.extend('filtered');

      debug('entered handler');

      const { projectMetadata } = await runGlobalPreChecks({
        debug_,
        projectMetadata_,
        scope
      });

      const { startTime } = state;
      let isBuildAlreadyOutput = false;

      logStartTime({ log, startTime, isUsingLocalInstallation });

      debug('scope (unused): %O', scope);
      debug('cleanOutputDir: %O', cleanOutputDir);
      debug('isCwdANextJsPackage: %O', isCwdANextJsPackage);

      // TODO: replace relevant tasks with listr2

      try {
        if (isCwdANextJsPackage) {
          if (cleanOutputDir) {
            debug('forcefully deleting build output directory: ./build');
            await forceDeletePaths('./build');
          }

          debug('running next build');
          await run('npx', ['next', 'build'], {
            env: { NODE_ENV: 'production' },
            stdout: isHushed ? 'ignore' : 'inherit',
            stderr: isQuieted ? 'ignore' : 'inherit'
          });
        } else {
          debug('includeExternalFiles: %O', includeExternalFiles_);
          debug('excludeInternalFiles: %O', excludeInternalFiles_);
          debug('generateTypes: %O', generateTypes_);
          debug('linkCliIntoBin: %O', linkCliIntoBin_);
          debug('prependShebang: %O', prependShebang_);
          debug('moduleSystem: %O', moduleSystem_);
          debug('outputExtension (original): %O', outputExtension);
          debug('skipOutputChecks: %O', skipOutputChecks_);
          debug(
            'skipOutputValidityCheckFor (original): %O',
            skipOutputValidityCheckFor_
          );
          debug(
            'skipOutputExtraneityCheckFor (original): %O',
            skipOutputExtraneityCheckFor_
          );
          debug(
            'skipOutputBijectionCheckFor (original): %O',
            skipOutputBijectionCheckFor_
          );
          debug('partialFilter: %O', partialFilter_);

          if (generateIntermediatesFor) {
            genericLogger.warn(
              [LogTag.IF_NOT_QUIETED],
              'Building intermediate non-production non-distributables...'
            );
          } else {
            genericLogger(
              [LogTag.IF_NOT_QUIETED],
              'Building production distributables...'
            );
          }

          const includeExternalFiles = includeExternalFiles_;
          const excludeInternalFiles = excludeInternalFiles_;
          const generateTypes = generateTypes_;
          const linkCliIntoBin = linkCliIntoBin_;
          const prependShebang = prependShebang_;
          const moduleSystem = moduleSystem_;
          const skipOutputChecks = skipOutputChecks_;
          const skipOutputValidityCheckFor = new Set(skipOutputValidityCheckFor_);
          const skipOutputExtraneityCheckFor = new Set(skipOutputExtraneityCheckFor_);
          const skipOutputBijectionCheckFor = new Set(skipOutputBijectionCheckFor_);
          const partialFilters = partialFilter_;

          hardAssert(includeExternalFiles !== undefined, ErrorMessage.GuruMeditation());
          hardAssert(excludeInternalFiles !== undefined, ErrorMessage.GuruMeditation());
          hardAssert(generateTypes !== undefined, ErrorMessage.GuruMeditation());
          hardAssert(linkCliIntoBin !== undefined, ErrorMessage.GuruMeditation());
          hardAssert(prependShebang !== undefined, ErrorMessage.GuruMeditation());
          hardAssert(moduleSystem !== undefined, ErrorMessage.GuruMeditation());
          hardAssert(skipOutputChecks !== undefined, ErrorMessage.GuruMeditation());
          hardAssert(partialFilters !== undefined, ErrorMessage.GuruMeditation());

          outputExtension ??=
            moduleSystem === ModuleSystem.Cjs ||
            generateIntermediatesFor === IntermediateTranspilationEnvironment.Test
              ? '.js'
              : '.mjs';

          debug('outputExtension (final): %O', outputExtension);

          const outputDirName = generateIntermediatesFor
            ? directoryIntermediatesPackageBase
            : directoryDistPackageBase;
          const absoluteOutputDirPath = toAbsolutePath(outputDirName);
          const absoluteNodeModulesDirPath = toAbsolutePath('node_modules');
          const absoluteRootPackageJsonDirPath = toAbsolutePath('package.json');

          debug('outputDirName: %O', outputDirName);
          debug('absoluteOutputDirPath: %O', absoluteOutputDirPath);

          const { rootPackage, cwdPackage } = projectMetadata;
          const projectRoot = rootPackage.root;
          const packageRoot = cwdPackage.root;
          const packageAttributes = cwdPackage.attributes;
          const packageName = cwdPackage.json.name;

          debug('project root: %O', projectRoot);
          debug('target package: %O', cwdPackage);
          debug('target package root: %O', packageRoot);
          debug('target package name: %O', packageName);

          // * Skip checking Node builtins with "node:" prefix
          skipOutputValidityCheckFor.add(/^node:/);

          // * Skip checking Node builtins
          for (const builtin of builtinModules) {
            skipOutputValidityCheckFor.add(builtin);
          }

          // * Skip self-referential imports since they'll always work
          skipOutputValidityCheckFor.add(packageName);

          debug(
            'skipOutputValidityCheckFor (intermediate): %O',
            skipOutputValidityCheckFor
          );

          debug(
            'skipOutputExtraneityCheckFor (intermediate): %O',
            skipOutputExtraneityCheckFor
          );

          debug('skipOutputBijectionCheckFor (final): %O', skipOutputBijectionCheckFor);

          const { targets: buildTargets, metadata: buildMetadata } =
            await gatherPackageBuildTargets(cwdPackage, {
              excludeInternalsPatterns: excludeInternalFiles,
              includeExternalsPatterns: includeExternalFiles,
              useCached: true
            });

          // TODO: this needs to be split off into symbiote project lint along
          // TODO: with the other half of the bijection checks below. For now,
          // TODO: we'll keep them here in this command:
          await lintNonSourceTypescriptFilesForSpecifierOk();

          debug('initial build targets: %O', buildTargets);
          debug('build metadata: %O', buildMetadata);

          // * Note that this has not been filtered by partialFilters yet
          const _allBuildTargets = Array.from(buildTargets.internal).concat(
            Array.from(buildTargets.external.normal)
          );

          if (generateIntermediatesFor === IntermediateTranspilationEnvironment.Test) {
            const { test: testFiles } = await gatherPackageFiles(cwdPackage, {
              skipGitIgnored: false,
              // ! ./dist isn't cleared yet, so the value cached by this call to
              // ! gatherPackageFiles is dirty! This is why we don't use cache
              // ! when we call this function later on.
              useCached: true
            });

            for (const filepath of testFiles) {
              _allBuildTargets.push(toRelativePath(projectRoot, filepath));
            }
          }

          // * Note that this is filtered by partialFilters
          const allBuildTargets: RelativePath[] = [];

          const allBuildAssetTargets: RelativePath[] = [];
          const allBuildSourceTargets: RelativePath[] = [];
          const filteredOutBuildTargets: RelativePath[] = [];

          const cwdPackageJsonRelativePath = toRelativePath(
            projectRoot,
            toPath(packageRoot, 'package.json')
          );

          debug.message('cwdPackageJsonRelativePath: %O', cwdPackageJsonRelativePath);

          let outputNewlineAlready = false;

          for (const target of _allBuildTargets) {
            // ? The current package's package.json file should never be
            // ? included in assets, even if it's explicitly imported
            const isTargetTheCurrentPackageJsonFile =
              target === cwdPackageJsonRelativePath;

            if (isTargetTheCurrentPackageJsonFile) {
              debug.message(
                "silently ignored asset %O because the current package's package.json file is never considered a build target",
                target
              );
            } else {
              if (
                !partialFilters.length ||
                partialFilters.some((filter) => {
                  const absoluteTarget = toAbsolutePath(projectRoot, target);
                  debug('absoluteTarget: %O', absoluteTarget);

                  if (filter.test(absoluteTarget)) {
                    if (!outputNewlineAlready) {
                      filterMatchLogger.newline([LogTag.IF_NOT_HUSHED]);
                    }

                    debug('%O filter result: pass (matched %O)', target, filter);
                    filterMatchLogger([LogTag.IF_NOT_HUSHED], 'matched: %O', target);

                    outputNewlineAlready = true;
                    return true;
                  }
                })
              ) {
                if (!partialFilters.length) {
                  debug('%O filter result: pass (no filters)', target);
                }

                allBuildTargets.push(target);

                if (hasTypescriptExtension(target)) {
                  allBuildSourceTargets.push(target);
                  debug('added %O as: SOURCE', target);
                } else {
                  allBuildAssetTargets.push(target);
                  debug('added %O as: ASSET', target);
                }
              } else {
                debug('%O filter result: fail (matched no filters)', target);
                filteredOutBuildTargets.push(target);
              }
            }
          }

          debug('all build asset targets: %O', allBuildAssetTargets);
          debug('all build source targets: %O', allBuildSourceTargets);
          debug('all ignored targets (filtered out): %O', filteredOutBuildTargets);

          const isPartialBuild = !!filteredOutBuildTargets.length;
          debug('isPartialBuild: %O', isPartialBuild);

          const aliasCountsEntries = toNaturalSorted(
            Object.entries(buildMetadata.imports.aliasCounts)
          );

          const dependencyCountsEntries = toNaturalSorted(
            Object.entries(buildMetadata.imports.dependencyCounts)
          );

          genericLogger.newline([LogTag.IF_NOT_HUSHED]);
          genericLogger.message(
            [LogTag.IF_NOT_HUSHED],
            `Build manifest
==============

Metadata
--------
name      : ${packageName || '(unnamed)'}
package-id: ${isWorkspacePackage(cwdPackage) ? cwdPackage.id : 'N/A (root package has no id)'}
type      : ${projectMetadata.type} ${
              projectAttributes[ProjectAttribute.Hybridrepo] ? '(hybridrepo) ' : ''
            }${isCwdTheProjectRoot ? 'root package' : 'workspace package (sub-root)'}
attributes: ${Object.keys(cwdPackage.attributes).join(', ')}
prod ready: ${
              generateIntermediatesFor || partialFilters.length
                ? `🛑 NO! (${[
                    generateIntermediatesFor &&
                      `includes "${generateIntermediatesFor}" intermediates`,
                    partialFilters.length && 'filtered to partials'
                  ]
                    .filter(Boolean)
                    .join(', ')})`
                : '🟩 yes'
            }

build targets: ${_allBuildTargets.length} file${_allBuildTargets.length !== 1 ? 's' : ''}${
              isPartialBuild
                ? ` (down to ${allBuildTargets.length} file${allBuildTargets.length !== 1 ? 's' : ''} after ${filteredOutBuildTargets.length} were filtered out)`
                : ''
            }
${SHORT_TAB}   internal${isPartialBuild ? ' (before filter)' : ''}: ${buildTargets.internal.size} file${
              buildTargets.internal.size !== 1 ? 's' : ''
            }
${SHORT_TAB}   external${isPartialBuild ? ' (before filter)' : ''}: ${buildTargets.external.normal.size} file${
              buildTargets.external.normal.size !== 1 ? 's' : ''
            }
${SHORT_TAB}   -
${SHORT_TAB}   assets${isPartialBuild ? '  (after filter)' : ''}  : ${allBuildAssetTargets.length} file${
              allBuildAssetTargets.length !== 1 ? 's' : ''
            }
${SHORT_TAB}   sources${isPartialBuild ? ' (after filter) ' : ''} : ${allBuildSourceTargets.length} file${
              allBuildSourceTargets.length !== 1 ? 's' : ''
            }

aliases imported: ${
              isPartialBuild
                ? ' (not reported during partial builds)'
                : `${aliasCountsEntries.length}\n` +
                  aliasCountsEntries
                    .map(
                      ([dep, { count, prefixes }]) =>
                        `${SHORT_TAB}${prefixesToString(prefixes)}${
                          prefixes.has(prefixNormalImport) ? dep : greyOut(dep)
                        } ${greyOut(`(seen ${count} time${count !== 1 ? 's' : ''})`)}`
                    )
                    .join('\n')
            }${isPartialBuild ? '\n' : '\n\n'}packages imported: ${
              isPartialBuild
                ? '(not reported during partial builds)'
                : `${dependencyCountsEntries.length}\n` +
                  dependencyCountsEntries
                    .reduce<[string[], string[]]>(
                      (strings, [alias, { count, prefixes }]) => {
                        const [fromSources, fromAssets] = strings;

                        (prefixes.has(prefixAssetImport)
                          ? fromAssets
                          : fromSources
                        ).push(
                          `${SHORT_TAB}${prefixesToString(prefixes)}${
                            prefixes.has(prefixNormalImport) ? alias : greyOut(alias)
                          } ${greyOut(`(seen ${count} time${count !== 1 ? 's' : ''})`)}`
                        );

                        return strings;
                      },
                      [[], []]
                    )
                    .map((strings) => strings.join('\n'))
                    .filter((strings) => strings.length)
                    .join('\n\n')
            }

Paths
-----
project root: ${projectRoot}
package root: ${packageRoot}
distrib root: ${absoluteOutputDirPath}
`
          );

          if (cleanOutputDir) {
            debug(
              `forcefully deleting build output directory: ${absoluteOutputDirPath}`
            );
            await forceDeletePaths(absoluteOutputDirPath);
          }

          // * Generate types and initial dir structure under ./dist
          if (generateTypes) {
            genericLogger.newline([LogTag.IF_NOT_QUIETED]);
            genericLogger([LogTag.IF_NOT_QUIETED], '⮞ Generating types');

            debug('running tsc');
            await run(
              'npx',
              [
                'tsc',
                '--project',
                Tsconfig.PackageTypes,
                '--incremental',
                'false',
                '--noCheck'
              ],
              {
                cwd: packageRoot,
                env: { NODE_ENV: 'production' },
                stdout: isHushed ? 'ignore' : 'inherit',
                stderr: isQuieted ? 'ignore' : 'inherit'
              }
            );

            debug('replacing aliases in definition files');

            const { dist: prebuildDistFiles } = await gatherPackageFiles(cwdPackage, {
              // ? Must explicitly recompute since above steps changed things
              useCached: false
            });

            const dTsFiles = prebuildDistFiles.filter((p) => p.endsWith('.d.ts'));

            // TODO: get these NODE_ENV values as imports from _babel.config.cjs.ts
            const babelDTsNodeEnvironment = { NODE_ENV: 'production-types' };

            // * Modify environment variables for the duration of this promise
            const originalEnv = Object.fromEntries(
              Object.entries(babelDTsNodeEnvironment).map(([k, v]) => {
                const original = process.env[k];
                process.env[k] = v;
                return [k, original];
              })
            );

            debug('original env: %O', originalEnv);
            debug('new env: %O', babelDTsNodeEnvironment);

            // * Grab and cache babel's config so that all transformations reuse the
            // * same plugins
            const babelDTsOptions =
              loadBabelOptions({
                rootMode: 'upward',
                filename: '[symbiote-internal-types].tsx'
              }) || undefined;

            debug('babel options: %O', babelDTsOptions);

            await Promise.all(
              dTsFiles.map(async (filepath) => {
                debug('fixup typescript definition (transpile): %O', filepath);

                const { code } =
                  (await babelTransformAsync(filepath, babelDTsOptions)) || {};

                if (code) {
                  debug('write-out fixup transpilation result: %O', filepath);
                  await writeFile(filepath, code);
                } else {
                  debug.error(
                    'fixup transpilation returned an empty result: %O',
                    filepath
                  );
                  softAssert(
                    ErrorMessage.TranspilationReturnedNothing(filepath, filepath)
                  );
                }
              })
            );

            // * Restore environment variables
            Object.entries(originalEnv).map(([k, v]) => {
              if (v === undefined) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete process.env[k];
              } else {
                process.env[k] = v;
              }
            });

            debug('original env restored');
          } else {
            debug('skipped type generation');
          }

          genericLogger.newline([LogTag.IF_NOT_QUIETED]);
          genericLogger([LogTag.IF_NOT_QUIETED], '⮞ Building distributables');

          const babelNodeEnvironment: Record<string, string> = {
            NODE_ENV: generateIntermediatesFor ?? `production-${moduleSystem}`
          };

          if (generateIntermediatesFor) {
            babelNodeEnvironment.SYMBIOTE_TEST_JEST_TRANSPILED = 'true';
          }

          genericLogger.newline([LogTag.IF_NOT_HUSHED]);

          // * Mirror relevant bits of the project's structure at ./dist that
          // * might not have been mirrored by tsc above
          await Promise.all(
            allBuildTargets.map((target) => {
              const path = toPath(absoluteOutputDirPath, toDirname(target));
              debug('make directory deep structure: %O', path);

              return makeDirectory(path);
            })
          );

          // * Modify environment variables for the duration of this promise
          const originalEnv = Object.fromEntries(
            Object.entries(babelNodeEnvironment).map(([k, v]) => {
              const original = process.env[k];
              process.env[k] = v;
              return [k, original];
            })
          );

          debug('original env: %O', originalEnv);
          debug('new env: %O', babelNodeEnvironment);

          // * Grab and cache babel's config so that all transformations reuse the
          // * same plugins
          const babelOptions =
            loadBabelOptions({
              rootMode: 'upward',
              filename: '[symbiote-internal].tsx'
            }) || undefined;

          debug('babel options: %O', babelOptions);

          // * Transpile internal/external build targets into their ./dist dirs
          await Promise.all([
            // * Copy through all assets as-is
            ...allBuildAssetTargets.map((target) => {
              const from = toPath(projectRoot, target);
              const to = toPath(absoluteOutputDirPath, target);

              debug('copy-through asset: %O => %O', from, to);
              return copyFile(from, to);
            }),

            // * Transpile internals: ./* => ./dist/* or ./.transpiled/*
            ...allBuildSourceTargets.map(async (target) => {
              const sourcePath = toPath(projectRoot, target);
              const outputPath = toPath(
                absoluteOutputDirPath,
                target.replace(/(?<=[^/])\.[^.]+$/, outputExtension!)
              );

              debug('transpile source: %O => %O', sourcePath, outputPath);

              const { code } =
                (await babelTransformAsync(sourcePath, babelOptions)) || {};

              if (code) {
                debug(
                  'write-out transpilation result: %O => %O',
                  sourcePath,
                  outputPath
                );
                await writeFile(outputPath, code);
              } else {
                debug.error('transpilation returned an empty result: %O', outputPath);
                softAssert(
                  ErrorMessage.TranspilationReturnedNothing(sourcePath, outputPath)
                );
              }
            })
          ]);

          // * Restore environment variables
          Object.entries(originalEnv).map(([k, v]) => {
            if (v === undefined) {
              // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
              delete process.env[k];
            } else {
              process.env[k] = v;
            }
          });

          debug('original env restored');

          // TODO: This is waiting for my babel plugin to spit out some metadata.
          // TODO: There is probably a more clever way to do that without
          // TODO: suffering this delay. Once that way is found, delete this:
          await delay(150);

          genericLogger.newline([LogTag.IF_NOT_HUSHED]);
          genericLogger(
            [LogTag.IF_NOT_QUIETED],
            'Distributables built successfully and are now available ✅'
          );

          isBuildAlreadyOutput = true;

          if (
            (projectAttributes[ProjectAttribute.Cli] ||
              packageAttributes[WorkspaceAttribute.Cli]) &&
            linkCliIntoBin
          ) {
            const { bin, name } = cwdPackage.json;

            if (bin && name) {
              genericLogger.newline([LogTag.IF_NOT_QUIETED]);
              genericLogger(
                [LogTag.IF_NOT_QUIETED],
                '⮞ Adding executables to node_modules/.bin'
              );
              genericLogger.newline([LogTag.IF_NOT_QUIETED]);

              debug('symlinking and chmod-ing main bin file into node_modules');

              const cwdPackageBin = typeof bin === 'string' ? { [name]: bin } : bin;

              const binFiles = Object.values(cwdPackageBin);
              const binFileInodes = await Promise.all(
                binFiles.map(async (path) => {
                  softAssert(path, ErrorMessage.CliProjectHasBadBinConfig());
                  return stat(path).then(({ ino }) => ino);
                })
              );

              await Promise.all([
                ...(prependShebang
                  ? Array.from(new Set(binFileInodes)).map(async (inode) => {
                      // ? We go through all this to avoid race conditions where we
                      // ? might end up writing to the same file
                      const path = binFiles.at(binFileInodes.indexOf(inode));
                      softAssert(path, ErrorMessage.CliProjectHasBadBinConfig());
                      const contents = await readFile(path);

                      if (contents.startsWith('#!')) {
                        debug(
                          `skipped prepending shebang, path (${inode}) already has shebang: %O`,
                          path
                        );
                      } else {
                        debug(`prepending shebang to file at path (${inode}): %O`, path);

                        await writeFile(path, `${standardNodeShebang}${contents}`);

                        genericLogger(
                          [LogTag.IF_NOT_QUIETED],
                          `${SHORT_TAB}Prepended shebang to ${path}`
                        );
                      }
                    })
                  : []),
                ...Object.entries(cwdPackageBin).map(async ([binName, binPath]) => {
                  softAssert(binName, ErrorMessage.CliProjectHasBadBinConfig());
                  softAssert(binPath, ErrorMessage.CliProjectHasBadBinConfig());

                  const nodeModulesBinDir = `${projectRoot}/${nodeModulesRelativeBinDir}`;
                  const symlinkTargetPath = toRelativePath(
                    nodeModulesBinDir,
                    toAbsolutePath(projectRoot, binPath)
                  );
                  const symlinkTemporaryPath = uniqueFilename(nodeModulesBinDir);
                  const symlinkRealPath = `${nodeModulesBinDir}/${binName}`;

                  debug('symlink target path: %O', symlinkTargetPath);
                  debug('symlink temporary path: %O', symlinkTemporaryPath);
                  debug('symlink real path: %O', symlinkRealPath);

                  await symlink(symlinkTargetPath, symlinkTemporaryPath);
                  await rename(symlinkTemporaryPath, symlinkRealPath);

                  genericLogger(
                    [LogTag.IF_NOT_QUIETED],
                    `${SHORT_TAB}${symlinkRealPath} ⮕ ${symlinkTargetPath}`
                  );

                  await chmod(symlinkRealPath, 0o775);

                  genericLogger(
                    [LogTag.IF_NOT_QUIETED],
                    `${SHORT_TAB}chmod 0775 ${symlinkRealPath}`
                  );
                })
              ]);
            } else {
              debug(
                'skipped symlinking and chmod-ing main bin file: package.json missing "bin" and/or "name"'
              );
            }
          } else {
            debug('skipped cli tasks: not a cli package');
          }

          if (skipOutputChecks) {
            if (!isPartialBuild) {
              genericLogger.newline([LogTag.IF_NOT_HUSHED]);
            }

            genericLogger(
              [LogTag.IF_NOT_HUSHED],
              '✖️ Skipped consistency and integrity checks on build output'
            );
          } else {
            genericLogger.newline([LogTag.IF_NOT_QUIETED]);
            genericLogger(
              [LogTag.IF_NOT_QUIETED],
              '⮞ Running lightweight consistency and integrity checks on build output'
            );

            const { dependencies, devDependencies, peerDependencies } = cwdPackage.json;

            // eslint-disable-next-line unicorn/prevent-abbreviations
            const prodDeps = new Set(
              Object.keys(Object.assign({}, dependencies, peerDependencies))
            );

            // eslint-disable-next-line unicorn/prevent-abbreviations
            const devDeps = new Set(Object.keys(devDependencies || {}));
            const allDeps = prodDeps.union(devDeps);

            // ! Note that skipOutputValidityCheckFor and
            // ! skipOutputExtraneityCheckFor are incomplete and are only
            // ! finalized in the body of checkImportsDependenciesValidBijection

            // ? This code block should only be reached when generateTypes is true
            // ? due to our Black Flag checks
            const [attwResult, bijectionResult, entryResult] = await Promise.allSettled([
              checkDistAreTheTypesWrong(),
              checkImportsDependenciesValidBijection(),
              checkDistEntryPoints()
            ]);

            hardAssert(attwResult.status === 'fulfilled', ErrorMessage.GuruMeditation());
            const { all: attwOutput, exitCode: attwExitCode } = attwResult.value;

            const errored: boolean | Error =
              attwExitCode !== 0 ||
              (bijectionResult.status === 'rejected' && bijectionResult.reason) ||
              (entryResult.status === 'rejected' && entryResult.reason) ||
              false;

            genericLogger.newline([LogTag.IF_NOT_SILENCED]);

            if (attwExitCode !== 0 && !isSilenced) {
              if (attwOutput) {
                process.stderr.write([attwOutput].flat().join('\n') + '\n');
              } else {
                genericLogger.error(
                  [LogTag.IF_NOT_SILENCED],
                  '%O returned exit code %O but generated no output',
                  '@arethetypeswrong/cli',
                  attwExitCode
                );
              }
            } else {
              genericLogger(
                [LogTag.IF_NOT_SILENCED],
                `${SHORT_TAB}@arethetypeswrong/cli test succeeded ✅`
              );
            }

            if (bijectionResult.status === 'fulfilled') {
              genericLogger(
                [LogTag.IF_NOT_SILENCED],
                `${SHORT_TAB}Dependency bijection tests succeeded ✅`
              );
            }

            if (entryResult.status === 'fulfilled') {
              genericLogger(
                [LogTag.IF_NOT_SILENCED],
                `${SHORT_TAB}package.json::exports entry point tests succeeded ✅`
              );
            }

            if (errored) {
              genericLogger.newline([LogTag.IF_NOT_SILENCED]);
              throw isNativeError(errored) ? errored : new BuildOutputCheckError();
            }

            /**
             * Check dist type definitions for correctness using attw.
             */
            async function checkDistAreTheTypesWrong() {
              // {@symbiote/notExtraneous @arethetypeswrong/cli}
              return runNoRejectOnBadExit(
                'npx',
                [
                  'attw',
                  '--pack',
                  '.',
                  // ? We handle internal resolution checks in symbiote instead
                  '--ignore-rules',
                  'internal-resolution-error'
                ],
                {
                  env: { FORCE_COLOR: '1' },
                  all: true
                }
              );
            }

            /**
             * Check dist files to ensure:
             *
             * - All relative required/imported paths point to existing files
             *   within `./dist`.
             *
             * - Required/imported NPM dependencies exist in `package.json`
             *   `dependencies` object.
             *
             * Also checks all of the package's TypeScript files to ensure all
             * required/imported NPM dependencies exist in `package.json`
             * somewhere. Extraneous dependencies (dependencies in `package.json`
             * that aren't required/imported by any TypeScript files nor exist in
             * `nonExtraneousDependencies`) and missing dependencies (dependencies
             * in `package.json` that aren't required/imported by any TypeScript
             * files or in `nonExtraneousDependencies`) are reported.
             *
             * TODO: move some or most of this to project lint command later
             */
            async function checkImportsDependenciesValidBijection() {
              const dbg = debug.extend('checkValidBijection');

              const {
                dist: distFiles,
                other: otherFiles,
                src: srcFiles,
                test: testFiles
              } = await gatherPackageFiles(cwdPackage, {
                // ? Must explicitly recompute since above steps changed things
                useCached: false
              });

              const allRelevantFiles = otherFiles
                .concat(srcFiles, testFiles)
                .filter(function (path) {
                  const shouldSkipPath = skipOutputBijectionCheckFor
                    .values()
                    .some((matcher) =>
                      typeof matcher === 'string'
                        ? matcher === path
                        : !!path.match(matcher)
                    );

                  if (shouldSkipPath) {
                    dbg.warn('ignored (skipped) entire file: %O', path);
                  }

                  return !shouldSkipPath;
                });

              const allRelevantFilesPlusBuildTargets = Array.from(
                new Set(
                  allRelevantFiles.concat(
                    allBuildTargets.map((target) => toPath(projectRoot, target))
                  )
                )
              );

              const [distImportEntries, otherImportEntries, pseudodecoratorEntries] =
                await Promise.all([
                  gatherImportEntriesFromFiles(distFiles, { useCached: true }),
                  gatherImportEntriesFromFiles(allRelevantFiles, { useCached: true }),
                  gatherPseudodecoratorEntriesFromFiles(
                    allRelevantFilesPlusBuildTargets,
                    {
                      useCached: true
                    }
                  )
                ]);

              for (const [, pseudodecorators] of pseudodecoratorEntries) {
                for (const { tag, items } of pseudodecorators) {
                  const targetSet =
                    tag === PseudodecoratorTag.NotInvalid
                      ? skipOutputValidityCheckFor
                      : skipOutputExtraneityCheckFor;

                  for (const item of items) {
                    targetSet.add(item);
                  }
                }
              }

              dbg('skipOutputValidityCheckFor (final): %O', skipOutputValidityCheckFor);

              dbg(
                'skipOutputExtraneityCheckFor (final): %O',
                skipOutputExtraneityCheckFor
              );

              const distImportPackages = new Set<string>();
              const otherImportPackages = new Set<string>();

              const distInaccessibleLocalImports: ImportSpecifier[] = [];
              const distLocalImportsOutsideDist: ImportSpecifier[] = [];
              const distExtraneousDependencies: [name: string, type: string][] = [];
              const distMissingDependencies = [] as [
                ...ImportSpecifier,
                packageName: string
              ][];

              const otherExtraneousDependencies: [name: string, type: string][] = [];
              const otherMissingDependencies = [] as [
                ...ImportSpecifier,
                packageName: string
              ][];

              const wellKnownAliases = generateRawAliasMap(projectMetadata);

              dbg('prodDeps: %O', prodDeps);
              dbg('devDeps: %O', devDeps);
              dbg('allDeps: prodDeps + devDeps');

              dbg.message(
                'checking %O "dist" and %O "other" import specifier entries against project metadata',
                distImportEntries.length,
                otherImportEntries.length
              );

              for (const [filepath, specifiers_] of distImportEntries) {
                const dbg1 = dbg.extend('1-prod');
                const isTypescriptDefinitionFile = filepath.endsWith('.d.ts');
                const specifiers = specifiers_.normal.union(specifiers_.typeOnly);

                dbg1('checking %O import specifiers in %O', specifiers.size, filepath);
                dbg1('isTypescriptDefinitionFile: %O', isTypescriptDefinitionFile);

                for (const specifier of specifiers) {
                  if (shouldSkipCheckForSpecifier(specifier, 'invalid')) {
                    dbg1.warn('ignored (skipped) specifier: %O', specifier);
                    continue;
                  }

                  // ? Is the specifier erroneously an absolute import?
                  if (isAbsolutePath(specifier)) {
                    dbg1.error('absolute specifier: %O', specifier);
                    distLocalImportsOutsideDist.push([filepath, specifier]);
                  }
                  // ? Is the specifier a relative import?
                  else if (isLocalLookingRegExp.test(specifier)) {
                    const absoluteSpecifier = toAbsolutePath(
                      toDirname(filepath),
                      specifier
                    );

                    dbg1('relative specifier (+ root): %O', absoluteSpecifier);

                    // ? Is it erroneously outside of ./dist?
                    if (
                      !absoluteSpecifier.startsWith(absoluteOutputDirPath) &&
                      !absoluteSpecifier.startsWith(absoluteNodeModulesDirPath) &&
                      !absoluteSpecifier.startsWith(absoluteRootPackageJsonDirPath)
                    ) {
                      dbg1.error('outsider specifier: %O', specifier);
                      distLocalImportsOutsideDist.push([filepath, specifier]);
                    } else {
                      if (absoluteSpecifier.startsWith(absoluteNodeModulesDirPath)) {
                        genericLogger.warn(
                          'Specifier %O precariously imports from node_modules in %O',
                          specifier,
                          filepath
                        );
                      }

                      // ? Is it erroneously inaccessible to the current process, or
                      // ? is it missing an extension (so probably not a file)?
                      if (
                        (isTypescriptDefinitionFile &&
                          // ? tsc likes .d.ts files w/ extensionless imports,
                          // ? and, to it, .js etc and .d.ts are synonymous
                          (
                            await glob(
                              absoluteSpecifier.replace(/\.js$/, '') +
                                '{.d.ts,/index.d.ts}',
                              { dot: true }
                            )
                          ).length === 0) ||
                        (!isTypescriptDefinitionFile &&
                          (!(await isAccessible(absoluteSpecifier, {
                            useCached: false
                          })) ||
                            !extname(absoluteSpecifier)))
                      ) {
                        dbg1.error('inaccessible specifier: %O', specifier);
                        distInaccessibleLocalImports.push([filepath, specifier]);
                      }
                    }
                  }
                  // ? Must be an external NPM dependency
                  else {
                    const packageName = specifierToPackageName(specifier);
                    distImportPackages.add(packageName);

                    dbg1('package specifier: %O <== %O', packageName, specifier);

                    // ? Is it erroneously missing in package.json production
                    // ? dependencies?
                    if (!prodDeps.has(packageName)) {
                      if (shouldSkipCheckForSpecifier(packageName, 'invalid')) {
                        dbg1.warn(
                          'ignored (skipped) missing package specifier: %O <== %O',
                          packageName,
                          specifier
                        );

                        continue;
                      } else {
                        dbg1.error(
                          'missing package specifier: %O <== %O',
                          packageName,
                          specifier
                        );

                        distMissingDependencies.push([filepath, specifier, packageName]);
                      }
                    }
                  }
                }
              }

              for (const [filepath, specifiers_] of otherImportEntries) {
                const dbg2 = dbg.extend('2-dev');
                const specifiers = specifiers_.normal.union(specifiers_.typeOnly);

                dbg2('checking %O import specifiers in %O', specifiers.size, filepath);

                for (const specifier_ of specifiers) {
                  const rawAliasMapping = mapRawSpecifierToRawAliasMapping(
                    wellKnownAliases,
                    specifier_
                  );

                  const mappedPath = rawAliasMapping
                    ? mapRawSpecifierToPath(rawAliasMapping, specifier_)
                    : undefined;

                  // ? Since we're looking at TypeScript now, we need to handle
                  // ? aliases
                  const specifier =
                    (mappedPath ? './' + mappedPath : undefined) ?? specifier_;

                  if (
                    isAbsolutePath(specifier) ||
                    isLocalLookingRegExp.test(specifier) ||
                    shouldSkipCheckForSpecifier(specifier, 'invalid')
                  ) {
                    dbg2.warn('ignored (skipped) specifier: %O', specifier);
                    continue;
                  }

                  const packageName = specifierToPackageName(specifier);
                  otherImportPackages.add(packageName);

                  dbg2('package specifier: %O <== %O', packageName, specifier);

                  // ? Is it erroneously missing in package.json dependencies?
                  if (!allDeps.has(packageName)) {
                    if (shouldSkipCheckForSpecifier(packageName, 'invalid')) {
                      dbg2.warn(
                        'ignored (skipped) missing package specifier: %O <== %O',
                        packageName,
                        specifier
                      );

                      continue;
                    } else {
                      dbg2.warn(
                        'missing package specifier: %O <== %O',
                        packageName,
                        specifier
                      );

                      otherMissingDependencies.push([filepath, specifier, packageName]);
                    }
                  }
                }
              }

              // ? For prod dependencies in package.json, error if any are
              // ? extraneous with respect to dist files
              for (const packageName of prodDeps) {
                const dbg3 = dbg.extend('3-prod');

                if (shouldSkipCheckForSpecifier(packageName, 'extraneous')) {
                  dbg3.warn('ignored (skipped) dependency: %O', packageName);
                  continue;
                }

                if (
                  !distImportPackages.has(packageName) &&
                  !isRelevantDefinitelyTypedPackage(distImportPackages, packageName)
                ) {
                  dbg3.error('extraneous production dependency: %O', packageName);
                  distExtraneousDependencies.push([
                    packageName,
                    dependencies?.[packageName] ? 'deps' : 'peerDeps'
                  ]);
                } else {
                  dbg3('production dependency: %O', packageName);
                }
              }

              const allImportPackages = distImportPackages.union(otherImportPackages);

              // ? For dev dependencies in package.json, error if any are
              // ? extraneous with respect to non-dist files
              for (const packageName of devDeps) {
                const dbg4 = dbg.extend('4-dev');

                if (shouldSkipCheckForSpecifier(packageName, 'extraneous')) {
                  dbg4.warn('ignored (skipped) dependency: %O', packageName);
                  continue;
                }

                if (
                  !otherImportPackages.has(packageName) &&
                  !isRelevantDefinitelyTypedPackage(allImportPackages, packageName)
                ) {
                  dbg4.warn('extraneous development dependency: %O', packageName);
                  otherExtraneousDependencies.push([packageName, 'devDeps']);
                } else {
                  dbg4('development dependency: %O', packageName);
                }
              }

              function isRelevantDefinitelyTypedPackage(
                packages: Set<string>,
                packageName: string
              ) {
                if (packageName.startsWith('@types/')) {
                  const isScoped = packageName.includes('__');
                  const typedPackageName =
                    (isScoped ? '@' : '') + packageName.slice(7).replace('__', '/');

                  dbg(
                    `saw "${packageName}"; looking for corresponding package "${typedPackageName}"`
                  );

                  return packages.has(typedPackageName);
                }

                return false;
              }

              // * Warnings

              if (otherMissingDependencies.length) {
                genericLogger.newline([LogTag.IF_NOT_SILENCED]);
                genericLogger.warn(
                  [LogTag.IF_NOT_SILENCED],
                  ErrorMessage.specialized.OthersSpecifiersDependenciesMissing(
                    otherMissingDependencies
                  )
                );
              }

              if (otherExtraneousDependencies.length) {
                genericLogger.newline([LogTag.IF_NOT_SILENCED]);
                genericLogger.warn(
                  [LogTag.IF_NOT_SILENCED],
                  ErrorMessage.specialized.DependenciesExtraneous(
                    otherExtraneousDependencies
                  )
                );
              }

              // * Errors

              const hasErrors =
                distInaccessibleLocalImports.length +
                distLocalImportsOutsideDist.length +
                distMissingDependencies.length +
                distExtraneousDependencies.length;

              if (hasErrors) {
                if (distInaccessibleLocalImports.length) {
                  genericLogger.newline([LogTag.IF_NOT_SILENCED]);
                  genericLogger.error(
                    [LogTag.IF_NOT_SILENCED],
                    ErrorMessage.specialized.DistributablesSpecifiersPointToInaccessible(
                      distInaccessibleLocalImports
                    )
                  );
                }

                if (distLocalImportsOutsideDist.length) {
                  genericLogger.newline([LogTag.IF_NOT_SILENCED]);
                  genericLogger.error(
                    [LogTag.IF_NOT_SILENCED],
                    ErrorMessage.specialized.DistributablesSpecifiersPointOutsideDist(
                      distLocalImportsOutsideDist
                    )
                  );
                }

                if (distMissingDependencies.length) {
                  genericLogger.newline([LogTag.IF_NOT_SILENCED]);
                  genericLogger.error(
                    [LogTag.IF_NOT_SILENCED],
                    ErrorMessage.specialized.DistributablesSpecifiersDependenciesMissing(
                      distMissingDependencies
                    )
                  );
                }

                if (distExtraneousDependencies.length) {
                  genericLogger.newline([LogTag.IF_NOT_SILENCED]);
                  genericLogger.error(
                    [LogTag.IF_NOT_SILENCED],
                    ErrorMessage.specialized.DependenciesExtraneous(
                      distExtraneousDependencies
                    )
                  );
                }

                throw new BuildOutputCheckError();
              }
            }

            /**
             * Check `package.json` `exports` entries against dist files for
             * existence.
             */
            async function checkDistEntryPoints() {
              const dbg = debug.extend('checkEntryPoints');

              const {
                json: { exports: cwdPackageExports }
              } = cwdPackage;

              dbg('cwdPackageExports: %O', cwdPackageExports);

              softAssert(
                cwdPackageExports,
                ErrorMessage.BadExportsInDistributablePackageJson()
              );

              const flattenedExports = flattenPackageJsonSubpathMap({
                map: cwdPackageExports
              });

              const badExports: [subpath: string, target: string][] = [];

              dbg('flattenedExports: %O', flattenedExports);

              for (const { subpath, conditions } of flattenedExports) {
                dbg('resolving subpath: %O %O', subpath, conditions);

                const targets = resolveExportsTargetsFromEntryPoint({
                  flattenedExports,
                  entryPoint: subpath,
                  conditions
                });

                dbg('saw targets: %O', targets);

                for (const target of targets) {
                  if (target.includes('*')) {
                    const realTarget = target
                      .replaceAll(/\/\*(?!\*)/g, '/**/*')
                      .replaceAll(/(?<!\*)\*\//g, '*/**/');

                    const realTargets = await glob(realTarget, {
                      dot: true,
                      nodir: true
                    });

                    dbg('checking real wildcard target: %O', realTarget);

                    if (!realTargets.length) {
                      dbg.error(
                        'entry point with wildcard target leads to no accessible files: %O',
                        target
                      );

                      badExports.push([subpath, target]);
                    }
                  } else {
                    dbg('checking target: %O', target);

                    if (!(await isAccessible(target, { useCached: false }))) {
                      dbg.error('entry point leads to inaccessible file: %O', target);
                      badExports.push([subpath, target]);
                    }
                  }
                }
              }

              if (badExports.length) {
                genericLogger.newline([LogTag.IF_NOT_SILENCED]);
                genericLogger.error(
                  [LogTag.IF_NOT_SILENCED],
                  ErrorMessage.specialized.ExportSubpathsPointsToInaccessible(badExports)
                );

                throw new BuildOutputCheckError();
              }
            }

            /**
             *! **Note that `skipOutputValidityCheckFor` and
             *! `skipOutputExtraneityCheckFor` (on which this function relies)
             *! are incomplete and are only finalized in the body of
             *! `checkImportsDependenciesValidBijection`!**
             */
            function shouldSkipCheckForSpecifier(
              specifier: string,
              filter: 'invalid' | 'extraneous'
            ) {
              const targetSet =
                filter === 'invalid'
                  ? skipOutputValidityCheckFor
                  : skipOutputExtraneityCheckFor;

              return targetSet
                .values()
                .some((matcher) =>
                  typeof matcher === 'string'
                    ? matcher === specifier
                    : !!specifier.match(matcher)
                );
            }
          }
        }

        if (!skipOutputChecks_) {
          genericLogger.newline([LogTag.IF_NOT_QUIETED]);
        }

        genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
      } catch (error) {
        if (isBuildAlreadyOutput && isBuildOutputCheckError(error)) {
          genericLogger.warn(
            [LogTag.IF_NOT_SILENCED],
            ErrorMessage.specialized.BuildSucceededButOutputCheckFailed()
          );
        }

        throw error;
      }

      if (!isCwdANextJsPackage) {
        if (generateIntermediatesFor) {
          genericLogger.warn(
            [LogTag.IF_NOT_SILENCED],
            ErrorMessage.specialized.BuildOutputIntermediates()
          );
        }

        if (partialFilter_?.length) {
          genericLogger.warn(
            [LogTag.IF_NOT_SILENCED],
            ErrorMessage.specialized.BuildOutputPartial()
          );
        }
      }

      async function lintNonSourceTypescriptFilesForSpecifierOk() {
        const { cwdPackage } = projectMetadata;
        const wellKnownAliases = generateRawAliasMap(projectMetadata);

        const { test: testFiles, other: otherFiles } = await gatherPackageFiles(
          cwdPackage,
          { useCached: true }
        );

        const nonSourceTypescriptFiles = testFiles
          .concat(otherFiles)
          .filter((path) => hasTypescriptExtension(path));

        // * From rawSpecifiersToExternalTargetPaths
        const nonSourceTypescriptEntries = gatherImportEntriesFromFiles.sync(
          nonSourceTypescriptFiles,
          { useCached: true }
        );

        for (const [path, specifiers_] of nonSourceTypescriptEntries) {
          const specifierPackage = pathToPackage(path, projectMetadata);
          const specifiers = specifiers_.normal.union(specifiers_.typeOnly);

          const specifierPackageId = isWorkspacePackage(specifierPackage)
            ? specifierPackage.id
            : undefined;

          for (const specifier of specifiers) {
            ensureRawSpecifierOk(wellKnownAliases, specifier, {
              // ? Allow testverse imports in non-source typescript files
              errorIfTestverseEncountered: false,
              packageId: specifierPackageId,
              path
            });
          }
        }
      }
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}

function toNaturalSorted<T>(array: [key: string, value: T][]) {
  return array.toSorted(([keyA], [keyB]) => {
    // ? Natural sort using latest ES6/7 features!
    return collator.compare(keyA, keyB);
  });
}

function prefixesToString(prefixes: Set<MetadataImportsPrefix>) {
  const orderedPrefixes = [];

  // ? prefixAssetImport always goes first
  if (prefixes.has(prefixAssetImport)) {
    orderedPrefixes.push(prefixAssetImport);
  }

  if (prefixes.has(prefixNormalImport)) {
    orderedPrefixes.push(prefixNormalImport);
  }

  if (prefixes.has(prefixInternalImport)) {
    orderedPrefixes.push(greyOut(prefixInternalImport));
  }

  if (prefixes.has(prefixExternalImport)) {
    orderedPrefixes.push(greyOut(prefixExternalImport));
  }

  if (prefixes.has(prefixTypeOnlyImport)) {
    orderedPrefixes.push(greyOut(prefixTypeOnlyImport));
  }

  return orderedPrefixes.join(' ') + ' ';
}

// TODO: use chalk instead
function greyOut(str: string) {
  return `\u001B[2m\u001B[90m${str}\u001B[39m\u001B[22m`;
}
