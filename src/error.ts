import { CliErrorMessage as UpstreamErrorMessage } from '@-xun/cli/error';
import { isProjectError, ProjectError } from '@-xun/project/error';
import { makeNamedError } from 'named-app-errors';

import { DefaultGlobalScope } from 'universe:configure.ts';

import type { ImportSpecifier, ProjectAttribute, RootPackage } from '@-xun/project';

export { TaskError } from '@-xun/cli/error';

// TODO: replace these HACKS with the official @-xun/instance-of and @-xun/error
// TODO: packages!
const $type = Symbol.for('object-type-hint');
const $type_ProjectError = Symbol.for('object-type-hint:ProjectError');

// TODO: replace a lot of all that follows with the official package(s),
// TODO: including the symbol use below. Symbols and stuff need to be auto-generated.

export const $type_BuildOutputCheckError = Symbol.for('object-type-hint:ProjectError');
/**
 * Type guard for {@link ProjectError}.
 */
// TODO: make-named-error should create and return this function automatically
export function isBuildOutputCheckError(
  parameter: unknown
): parameter is BuildOutputCheckError {
  return (
    // TODO:
    // @ts-expect-error: TODO: remove this comment once above HACKS are deleted
    isProjectError(parameter) && parameter[$type].includes($type_BuildOutputCheckError)
  );
}

/**
 * Represents encountering a project that is not a git repository.
 */
export class BuildOutputCheckError extends ProjectError {
  // TODO: this prop should be added by makeNamedError or whatever other fn
  [$type] = [$type_BuildOutputCheckError, $type_ProjectError];
  /**
   * Represents encountering a project that is not a git repository.
   */
  constructor();
  /**
   * This constructor syntax is used by subclasses when calling this constructor
   * via `super`.
   */
  constructor(message: string);
  constructor(message: string | undefined = undefined) {
    super(message ?? ErrorMessage.BuildOutputChecksFailed());
  }
}
makeNamedError(BuildOutputCheckError, 'BuildOutputCheckError');

/**
 * A collection of possible error and warning messages.
 */
/* istanbul ignore next */
export const ErrorMessage = {
  ...UpstreamErrorMessage,
  EslintPluginReturnedSomethingUnexpected(identifier: string) {
    return `assertion failed: the eslint plugin "${identifier}" returned something unexpected`;
  },
  BabelCorejsInstalledVersionTooOld(
    coreJsLibraryVersion: string,
    CORE_JS_LIBRARY_VERSION: string,
    resolvedCoreJsVersion: string,
    packageRoot: string
  ) {
    return `babel is configured to use core-js@${coreJsLibraryVersion} ("${
      CORE_JS_LIBRARY_VERSION
    }") but the resolved core-js version is ${
      resolvedCoreJsVersion
    }; please update dependencies.core-js in ${packageRoot}/package.json`;
  },
  BabelCorejsInstalledVersionRangeNotSatisfactory(
    coreJsLibraryVersion: string,
    CORE_JS_LIBRARY_VERSION: string,
    cwdPackageCoreJsDependency: string,
    packageName: string | undefined,
    packageRoot: string
  ) {
    return `babel is configured to use core-js@${coreJsLibraryVersion} ("${
      CORE_JS_LIBRARY_VERSION
    }") but the ${
      packageName ? `"${packageName}"` : 'current'
    } package has a "core-js" field in its package.json "dependencies" object that will result in a potentially-incompatible version of core-js being installed by downstream consumers; saw: "${
      cwdPackageCoreJsDependency
    }" in ${packageRoot}/package.json`;
  },
  BadSkipArgs() {
    return 'impossible combination of skipIgnored and skipUnknown was encountered';
  },
  BadPostNpmInstallScript(path: string) {
    return `unable to execute "${path}" as a JavaScript (ESM) module. Please ensure it is syntactically sound`;
  },
  BadMjsImport(path: string) {
    return `unable to import "${path}" as a JavaScript (ESM) module. Please ensure it is syntactically sound and contains the expected exports (see documentation)`;
  },
  BadAdditionalChangelogSection(path: string) {
    return `unable to extract valid semver version from changelog section file at path: ${path}`;
  },
  BadGeneratedChangelogSection() {
    return `failed to extract valid semver version from generated changelog section`;
  },
  CannotAccessDirectory(path: string) {
    return `failed to access directory at path: ${path}`;
  },
  CannotReadFile(path: string) {
    return `failed to read from file at path: ${path}`;
  },
  CannotWriteFile(path: string) {
    return `failed to write to file at path: ${path}`;
  },
  CannotCopyFile(from: string, to: string) {
    return `failed to copy file: ${from} => ${to}`;
  },
  CannotMakeDirectory(path: string) {
    return `failed to make directory: ${path}`;
  },
  CannotUseIgnoresWithPathsOutsideProjectRoot() {
    return 'cannot use ignore functionality (like --skip-ignored) when one or more --files paths are outside of the project root';
  },
  CannotStatOutputTarget(outputTarget: string) {
    return `failed to stat output target: ${outputTarget}

This error typically occurs when TypeScript's compiler generates a bad path in a definition file. That usually happens when your source is relying on non-portable type inference when exporting types, such as that of a function with a return type that is not trivially inferable. If the output target points to a file within a package under node_modules in a monorepo, you may attempt the following:

  1. Un-hoist the package using @-xun/no-hoist or by moving it under the affected package's node_modules directory.
  2. Run the build process again. TypeScript should now alert you to the cause of the issue.
  3. Fix the issue.
  4. Remove the un-hoist workaround if desired.`;
  },
  CliProjectHasBadBinConfig() {
    return 'this project appears to be a CLI project but has one or more poorly configured "bin" entries in package.json';
  },
  CannotRunOutsideRoot() {
    return 'the current working directory must be the project root or a workspace (package) sub-root to run this command';
  },
  CannotRunInNonHybridMonorepoRootPackage() {
    return `to run this command with --scope=${DefaultGlobalScope.ThisPackage}, the current working directory must not be the root of a non-hybrid monorepo`;
  },
  CleanCalledWithoutForce() {
    return 'no deletions were performed (try again with --force)';
  },
  XChangelogMonkeyPatchFailedToTake(filename: string) {
    return `failed to acquire the patched global Proxy class in ${filename}`;
  },
  JestChangelogMonkeyPatchFailedToTake(error: unknown) {
    return `unable to monkey patch jest resolver: ${String(error)}`;
  },
  WrongProjectAttributes(
    expected: ProjectAttribute[],
    actual: RootPackage['attributes'],
    preposition = 'with'
  ) {
    return `expected a project ${preposition} the following attributes: ${expected.join(', ')}; saw ${Object.keys(actual).join(', ')} instead`;
  },
  BadProjectNameInDistributablePackageJson() {
    return `the distributable package.json file does not contain a valid "name" field`;
  },
  BadExportsInDistributablePackageJson() {
    return `the distributable package.json file does not contain a valid "exports" field`;
  },
  BadRepositoryInPackageJson(packageName: string) {
    return `the "${packageName}" package's package.json file does not contain a valid "repository" field (only GitHub FQDN repository URLs are supported)`;
  },
  BadEnginesNodeInPackageJson(path: string) {
    return `a package.json file has a missing or invalid "engines.node" field: ${path}`;
  },
  MustChooseDeployEnvironment() {
    return 'must choose either --preview or --production deployment environment';
  },
  MissingSymbioteEnvironmentVariable(variableName: string) {
    return `the expected symbiote environment variable "${variableName}" must be defined in process.env`;
  },
  MultipleConfigsWhenExpectingOnlyOne(filename1: string, filename2: string) {
    return `expected one configuration file but encountered multiple conflicting files: ${filename1} conflicts with ${filename2}`;
  },
  OptionMustBeNonNegative(name: string) {
    return `option "${name}" must have a non-negative value`;
  },
  OptionMustNotBeFalsy(name: string) {
    return `option "${name}" must have a non-empty (non-falsy) value`;
  },
  MarkdownNoUndefinedReferences() {
    return 'cannot continue with undefined references present in one or more Markdown files';
  },
  OptionValueMustBeAlone(option: string, noun: string) {
    return `the "${option}" ${noun} must not be given alongside any others`;
  },
  OptionValueMustBeAloneWhenBaseline(option: string, noun: string) {
    return ErrorMessage.OptionValueMustBeAlone(option, noun) + ' when using --baseline';
  },
  NoCurrentBranch() {
    return 'repository "HEAD" ref is not currently on an existing branch (are you in detached HEAD state?)';
  },
  LintingFailed() {
    return 'one or more linters returned a bad exit code';
  },
  MissingConfigurationFile(path: string) {
    return `this command requires the following configuration file exists: ${path}`;
  },
  TestingFailed() {
    return 'one or more test executables returned a bad exit code';
  },
  BuildOutputChecksFailed() {
    return 'one or more build output integrity checks failed';
  },
  ConfigAssetEnvironmentValidationFailed(
    subject: string,
    badValue: string,
    validValues: readonly string[]
  ) {
    return `${subject} expects NODE_ENV to be one of: ${validValues.join(', ')} (saw: "${badValue}")`;
  },
  RenovateEnvironmentValidationFailed() {
    return 'one or more renovation runtime environment validation checks failed';
  },
  ReleaseEnvironmentValidationFailed() {
    return 'one or more release runtime environment validation checks failed';
  },
  ReleaseRepositoryStateValidationFailed() {
    return 'one or more repository state validation checks failed';
  },
  ReleaseScriptExecutionFailed() {
    return 'one or more package.json scripts returned a non-zero exit code';
  },
  ReleaseRunnerExecutionFailed() {
    return 'one or more release tasks failed to complete';
  },
  PreparationRunnerExecutionFailed() {
    return 'one or more prepare tasks failed to complete';
  },
  RenovationRunnerExecutionFailed() {
    return 'one or more renovation tasks failed to complete';
  },
  RenovationSubtaskOperationFailed(index: number) {
    return `subtask operation ${index + 1} failed`;
  },
  ReleaseFinishedWithADirtyRepo() {
    return 'the release pipeline has terminated successfully but the repository remains in an unclean state. This is evidence of an incomplete or broken build process';
  },
  ReleaseFailedRepoRolledBack() {
    return '@-xun/release failed with a non-zero exit code. Act now to manually recover the repository to a stable state, if necessary';
  },
  TopologyRunScriptExecutionFailed() {
    return 'one or more scripts failed to complete';
  },
  BadReleaseSectionPath() {
    return 'the @-xun/symbiote semantic-release plugin requires the "releaseSectionPath" option be a non-empty string ending with ".md"';
  },
  BadParserOpts() {
    return 'the @-xun/symbiote semantic-release plugin requires the "parserOpts" option to be defined';
  },
  BadWriterOpts() {
    return 'the @-xun/symbiote semantic-release plugin requires the "writerOpts" option to be defined';
  },
  CodecovDownloaderOnlySupportsLinux() {
    return 'the Codecov downloader only supports the Linux operating system; ensure a suitable "codecov" binary exists in the runtime path before reattempting this command';
  },
  FailedToInstallCodecov() {
    return 'the Codecov downloader failed to make a "codecov" executable available; ensure a suitable "codecov" binary exists in the runtime path before reattempting this command';
  },
  CodecovRetrievalFailed(url: string) {
    return `failed to download a suitable codecov binary from ${url}`;
  },
  AssetRetrievalFailed(path: string) {
    return `failed to retrieve asset from transformer at ${path}`;
  },
  UnmatchedCommitType(type: string | undefined, variableName: string) {
    return `unmatched commit type ${type ? `"${type}" ` : ''}in ${variableName}`;
  },
  IssuePrefixContainsIllegalCharacters() {
    return 'issue prefixes cannot contain characters recognized by the RegExp constructor';
  },
  CannotImportConventionalConfig(path: string) {
    return `failed to import conventional configuration file: ${path}`;
  },
  CannotImportJestConfig(path: string) {
    return `failed to import jest configuration file: ${path}`;
  },
  CannotExtractTestPathIgnorePatternsFromJestConfig() {
    return `exported jest config object has non-array "testPathIgnorePatterns" property`;
  },
  CannotImportTsconfig() {
    return `failed to locate a suitable tsconfig file`;
  },
  DefaultImportFalsy() {
    return 'a default import was unexpectedly falsy';
  },
  BadParameter(name: string) {
    return `invalid value for parameter "${name}"`;
  },
  TranspilationReturnedNothing(sourcePath: string, outputPath: string) {
    return `transpilation of the following file returned an empty result: ${sourcePath} => ${outputPath}`;
  },
  TaskNotRunnable(id: string, npmScripts: string[]) {
    return npmScripts.length
      ? `task ${id} expects one of the following scripts to exist in this package's package.json file: "${npmScripts.join('", "')}`
      : `task ${id} is not runnable`;
  },
  UnsupportedRenovationScope(
    taskName: string,
    givenScope: string,
    supportedScopes: string[]
  ) {
    return `renovation task "${taskName}" only supports the \`${supportedScopes.join('` and `')}\` scope${supportedScopes.length === 1 ? '' : 's'}, but \`${givenScope}\` was seen instead`;
  },
  CannotGenerateCurrentPackagePathInUnlimitedScope(pathsLike: string[]) {
    return `an asset transformer attempted to generate a path relative to the "current package" root, but there is no "current package" when --scope=unlimited; attempt arguments: ${pathsLike.join(' ')}`;
  },
  DangerousRenovationRequiresForce(taskName: string) {
    return `renovation task "${taskName}" is DANGEROUS and therefore must be invoked with --force`;
  },
  ActionAttemptedOnPrivatePackage(actionNoun: string) {
    return `a ${actionNoun} was attempted on a package marked "private" in its package.json file; remove the "private" field or do not include this package in your release attempt`;
  },
  ActionAttemptedWithADirtyRepo(actionNoun: string) {
    return `a ${actionNoun} was attempted but the working tree is in an unclean state; please commit or stash before trying again`;
  },
  ActionAttemptedWithIllegalExperimentalVersion(
    actionNoun: string,
    modernStyleTag: string
  ) {
    const packageName = modernStyleTag.split('@').slice(0, -1).join('@');
    const fixedTag = `${packageName}@0.0.0-init`;

    return `a ${actionNoun} was attempted but the most recent version tag (${modernStyleTag}) is "semver experimental," which is not supported by xrelease; please execute the following command before trying again:\ngit tag -a '${fixedTag}' -m 'commit analysis (changelog/release) starting point for: ${packageName}' '${modernStyleTag}^{}'`;
  },
  RenovationRepositoryExtraneousRuleset(rulesetName: string) {
    return `encountered extraneous ruleset while analyzing remote repository: ${rulesetName}`;
  },
  RenovationEncounteredObsoleteProtectionRules(branch: string) {
    return `encountered obsolete legacy branch protection rules for branch: ${branch}`;
  },
  RenovationDestinationAlreadyExists(path: string) {
    return `destination path already exists; move/delete it before retrying: ${path}`;
  },
  RenovationTagAliasAlreadyExists(tag: string) {
    return `alias tag "${tag}" cannot be created because it already exists (try again with --force to delete and recreate)`;
  },
  /**
   * These are "error" messages that are not necessarily meant to be the message
   * of an {@link Error} instance, but are reported to the user in other ways
   * (such as via `rejoinder`). They may not follow the same standard
   * punctuation and capitalization rules as the other error messages.
   */
  specialized: {
    BabelCorejsVersionUnresolvable(
      coreJsLibraryVersion: string,
      CORE_JS_LIBRARY_VERSION: string
    ) {
      return `⚠️🚧 Babel is configured to use core-js@${coreJsLibraryVersion} ("${
        CORE_JS_LIBRARY_VERSION
      }"), but an attempt to resolve the "version" field from file "core-js/package.json" failed`;
    },
    BabelCorejsDependencyMissing(
      coreJsLibraryVersion: string,
      CORE_JS_LIBRARY_VERSION: string,
      cwdPackageCoreJsDependency: string | undefined,
      packageName: string | undefined,
      packageRoot: string
    ) {
      return (
        `Babel is configured to use core-js@${coreJsLibraryVersion} ("${
          CORE_JS_LIBRARY_VERSION
        }"), but the ${
          packageName ? `"${packageName}"` : 'current'
        } package is missing a semver-valid "core-js" field in its package.json "dependencies" object; if this package does not use core-js in its distributables, you may ignore this message` +
        (cwdPackageCoreJsDependency
          ? `\n  Saw "${String(
              cwdPackageCoreJsDependency
            )}" in ${packageRoot}/package.json`
          : '')
      );
    },
    BabelCorejsEgregiousPackageJsonFileInBuildOutput(
      originalSpecifier: string,
      inputFilepath: string
    ) {
      return `\n🚨 WARNING 🚨: importing specifier "${originalSpecifier}" from file "${inputFilepath}" will cause additional package.json files to be included in build output. This may SIGNIFICANTLY increase the size of distributables!\n`;
    },
    BuildOutputIntermediates() {
      return '⚠️🚧 Build output consists of intermediate files NOT SUITABLE FOR DISTRIBUTION OR PRODUCTION';
    },
    BuildOutputPartial() {
      return '⚠️🚧 The build "succeeded," but ONLY a subset of build targets were actually transpiled';
    },
    BuildSucceededButOutputCheckFailed() {
      return '⚠️🚧 The build succeeded and is available, but one or more build output integrity checks failed';
    },
    ExportSubpathsPointsToInaccessible(subpaths: [subpath: string, target: string][]) {
      return (
        '💀 Bad package.json::exports configuration: one or more entry points targets inaccessible or non-existent files:' +
        subpaths.reduce(
          (result, [subpath, target]) =>
            result + `\n  - entry point "${subpath}" ==!=> file ${target}`,
          ''
        )
      );
    },
    DistributablesSpecifiersPointToInaccessible(specifiers: ImportSpecifier[]) {
      return (
        '👹 Bad distributables specifiers: invalid import of inaccessible or non-existent files:' +
        specifiers.reduce(
          (result, [filepath, specifier]) =>
            result + `\n  - specifier "${specifier}" found in file ${filepath}`,
          ''
        )
      );
    },
    DistributablesSpecifiersPointOutsideDist(specifiers: ImportSpecifier[]) {
      return (
        '😈 Bad distributables specifiers: invalid import of files located outside distributables directory:' +
        specifiers.reduce(
          (result, [filepath, specifier]) =>
            result + `\n  - specifier "${specifier}" found in file ${filepath}`,
          ''
        )
      );
    },
    DistributablesSpecifiersDependenciesMissing(
      packageSpecifiers: [...ImportSpecifier, packageName: string][]
    ) {
      return (
        '👻 Bad distributables specifiers: one or more packages were imported without a corresponding "dependencies" or "peerDependencies" entry in package.json:' +
        packageSpecifiers.reduce(
          (result, [filepath, specifier, packageName]) =>
            result +
            `\n  - package "${packageName}" (full specifier: "${specifier}") found in file ${filepath}`,
          ''
        )
      );
    },
    DependenciesExtraneous(packagesMeta: [name: string, type: string][]) {
      return (
        '👽 Extraneous dependencies detected: the following packages are included in package.json unnecessarily and should be removed to reduce build size:' +
        packagesMeta.reduce(
          (result, [packageName, packageType]) =>
            result + `\n  - package "${packageName}" in package.json::${packageType}`,
          ''
        )
      );
    },
    OthersSpecifiersDependenciesMissing(
      packageSpecifiers: [...ImportSpecifier, packageName: string][]
    ) {
      return (
        '👻 Bad non-distributables specifiers: one or more packages were imported without a corresponding "devDependencies" entry in package.json:' +
        packageSpecifiers.reduce(
          (result, [filepath, specifier, packageName]) =>
            result +
            `\n  - package "${packageName}" (full specifier: "${specifier}") found in file ${filepath}`,
          ''
        )
      );
    }
  }
};
