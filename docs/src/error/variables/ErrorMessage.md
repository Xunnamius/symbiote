[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/error](../README.md) / ErrorMessage

# Variable: ErrorMessage

> `const` **ErrorMessage**: `object`

Defined in: [src/error.ts:40](https://github.com/Xunnamius/symbiote/blob/ff83c030b043e6b14171cac5526d31c5c826c51f/src/error.ts#L40)

A collection of possible error and warning messages.

## Type declaration

### specialized

> **specialized**: `object`

These are "error" messages that are not necessarily meant to be the message
of an Error instance, but are reported to the user in other ways
(such as via `rejoinder`). They may not follow the same standard
punctuation and capitalization rules as the other error messages.

#### specialized.BabelCorejsDependencyMissing()

> **BabelCorejsDependencyMissing**(`coreJsLibraryVersion`, `CORE_JS_LIBRARY_VERSION`, `cwdPackageCoreJsDependency`, `packageName`, `packageRoot`): `string`

##### Parameters

###### coreJsLibraryVersion

`string`

###### CORE\_JS\_LIBRARY\_VERSION

`string`

###### cwdPackageCoreJsDependency

`undefined` | `string`

###### packageName

`undefined` | `string`

###### packageRoot

`string`

##### Returns

`string`

#### specialized.BabelCorejsEgregiousPackageJsonFileInBuildOutput()

> **BabelCorejsEgregiousPackageJsonFileInBuildOutput**(`originalSpecifier`, `inputFilepath`): `string`

##### Parameters

###### originalSpecifier

`string`

###### inputFilepath

`string`

##### Returns

`string`

#### specialized.BabelCorejsVersionUnresolvable()

> **BabelCorejsVersionUnresolvable**(`coreJsLibraryVersion`, `CORE_JS_LIBRARY_VERSION`): `string`

##### Parameters

###### coreJsLibraryVersion

`string`

###### CORE\_JS\_LIBRARY\_VERSION

`string`

##### Returns

`string`

#### specialized.BuildOutputIntermediates()

> **BuildOutputIntermediates**(): `string`

##### Returns

`string`

#### specialized.BuildOutputPartial()

> **BuildOutputPartial**(): `string`

##### Returns

`string`

#### specialized.BuildSucceededButOutputCheckFailed()

> **BuildSucceededButOutputCheckFailed**(): `string`

##### Returns

`string`

#### specialized.DependenciesExtraneous()

> **DependenciesExtraneous**(`packagesMeta`): `string`

##### Parameters

###### packagesMeta

\[`string`, `string`\][]

##### Returns

`string`

#### specialized.DistributablesSpecifiersDependenciesMissing()

> **DistributablesSpecifiersDependenciesMissing**(`packageSpecifiers`): `string`

##### Parameters

###### packageSpecifiers

\[`AbsolutePath`, `string`, `string`\][]

##### Returns

`string`

#### specialized.DistributablesSpecifiersPointOutsideDist()

> **DistributablesSpecifiersPointOutsideDist**(`specifiers`): `string`

##### Parameters

###### specifiers

`ImportSpecifier`[]

##### Returns

`string`

#### specialized.DistributablesSpecifiersPointToInaccessible()

> **DistributablesSpecifiersPointToInaccessible**(`specifiers`): `string`

##### Parameters

###### specifiers

`ImportSpecifier`[]

##### Returns

`string`

#### specialized.ExportSubpathsPointsToInaccessible()

> **ExportSubpathsPointsToInaccessible**(`subpaths`): `string`

##### Parameters

###### subpaths

\[`string`, `string`\][]

##### Returns

`string`

#### specialized.OthersSpecifiersDependenciesMissing()

> **OthersSpecifiersDependenciesMissing**(`packageSpecifiers`): `string`

##### Parameters

###### packageSpecifiers

\[`AbsolutePath`, `string`, `string`\][]

##### Returns

`string`

### ActionAttemptedOnPrivatePackage()

> **ActionAttemptedOnPrivatePackage**(`actionNoun`): `string`

#### Parameters

##### actionNoun

`string`

#### Returns

`string`

### ActionAttemptedWithADirtyRepo()

> **ActionAttemptedWithADirtyRepo**(`actionNoun`): `string`

#### Parameters

##### actionNoun

`string`

#### Returns

`string`

### ActionAttemptedWithIllegalExperimentalVersion()

> **ActionAttemptedWithIllegalExperimentalVersion**(`actionNoun`, `modernStyleTag`): `string`

#### Parameters

##### actionNoun

`string`

##### modernStyleTag

`string`

#### Returns

`string`

### AssetRetrievalFailed()

> **AssetRetrievalFailed**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### BabelCorejsInstalledVersionRangeNotSatisfactory()

> **BabelCorejsInstalledVersionRangeNotSatisfactory**(`coreJsLibraryVersion`, `CORE_JS_LIBRARY_VERSION`, `cwdPackageCoreJsDependency`, `packageName`, `packageRoot`): `string`

#### Parameters

##### coreJsLibraryVersion

`string`

##### CORE\_JS\_LIBRARY\_VERSION

`string`

##### cwdPackageCoreJsDependency

`string`

##### packageName

`undefined` | `string`

##### packageRoot

`string`

#### Returns

`string`

### BabelCorejsInstalledVersionTooOld()

> **BabelCorejsInstalledVersionTooOld**(`coreJsLibraryVersion`, `CORE_JS_LIBRARY_VERSION`, `resolvedCoreJsVersion`, `packageRoot`): `string`

#### Parameters

##### coreJsLibraryVersion

`string`

##### CORE\_JS\_LIBRARY\_VERSION

`string`

##### resolvedCoreJsVersion

`string`

##### packageRoot

`string`

#### Returns

`string`

### BadAdditionalChangelogSection()

> **BadAdditionalChangelogSection**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### BadEnginesNodeInPackageJson()

> **BadEnginesNodeInPackageJson**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### BadExportsInDistributablePackageJson()

> **BadExportsInDistributablePackageJson**(): `string`

#### Returns

`string`

### BadGeneratedChangelogSection()

> **BadGeneratedChangelogSection**(): `string`

#### Returns

`string`

### BadMjsImport()

> **BadMjsImport**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### BadOptionValue()

> **BadOptionValue**(`name`, `value`, `context?`): `string`

#### Parameters

##### name

`string`

##### value

`unknown`

##### context?

`string`

#### Returns

`string`

### BadParameter()

> **BadParameter**(`name`): `string`

#### Parameters

##### name

`string`

#### Returns

`string`

### BadParserOpts()

> **BadParserOpts**(): `string`

#### Returns

`string`

### BadPostNpmInstallScript()

> **BadPostNpmInstallScript**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### BadProjectNameInDistributablePackageJson()

> **BadProjectNameInDistributablePackageJson**(): `string`

#### Returns

`string`

### BadReleaseSectionPath()

> **BadReleaseSectionPath**(): `string`

#### Returns

`string`

### BadRepositoryInPackageJson()

> **BadRepositoryInPackageJson**(`packageName`): `string`

#### Parameters

##### packageName

`string`

#### Returns

`string`

### BadSkipArgs()

> **BadSkipArgs**(): `string`

#### Returns

`string`

### BadUserGroup()

> **BadUserGroup**(`userGroup`): `string`

#### Parameters

##### userGroup

`string`

#### Returns

`string`

### BadWriterOpts()

> **BadWriterOpts**(): `string`

#### Returns

`string`

### BuildOutputChecksFailed()

> **BuildOutputChecksFailed**(): `string`

#### Returns

`string`

### CannotAccessDirectory()

> **CannotAccessDirectory**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### CannotCopyFile()

> **CannotCopyFile**(`from`, `to`): `string`

#### Parameters

##### from

`string`

##### to

`string`

#### Returns

`string`

### CannotExtractTestPathIgnorePatternsFromJestConfig()

> **CannotExtractTestPathIgnorePatternsFromJestConfig**(): `string`

#### Returns

`string`

### CannotGenerateCurrentPackagePathInUnlimitedScope()

> **CannotGenerateCurrentPackagePathInUnlimitedScope**(`pathsLike`): `string`

#### Parameters

##### pathsLike

`string`[]

#### Returns

`string`

### CannotImportConventionalConfig()

> **CannotImportConventionalConfig**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### CannotImportJestConfig()

> **CannotImportJestConfig**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### CannotImportTsconfig()

> **CannotImportTsconfig**(): `string`

#### Returns

`string`

### CannotMakeDirectory()

> **CannotMakeDirectory**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### CannotReadFile()

> **CannotReadFile**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### CannotRunInNonHybridMonorepoRootPackage()

> **CannotRunInNonHybridMonorepoRootPackage**(): `string`

#### Returns

`string`

### CannotRunOutsideRoot()

> **CannotRunOutsideRoot**(): `string`

#### Returns

`string`

### CannotStatOutputTarget()

> **CannotStatOutputTarget**(`outputTarget`): `string`

#### Parameters

##### outputTarget

`string`

#### Returns

`string`

### CannotUseIgnoresWithPathsOutsideProjectRoot()

> **CannotUseIgnoresWithPathsOutsideProjectRoot**(): `string`

#### Returns

`string`

### CannotUseNodeOptionsOnNonNodeRuntime()

> **CannotUseNodeOptionsOnNonNodeRuntime**(): `string`

#### Returns

`string`

### CannotWriteFile()

> **CannotWriteFile**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### CleanCalledWithoutForce()

> **CleanCalledWithoutForce**(): `string`

#### Returns

`string`

### CliProjectHasBadBinConfig()

> **CliProjectHasBadBinConfig**(): `string`

#### Returns

`string`

### CodecovDownloaderOnlySupportsLinux()

> **CodecovDownloaderOnlySupportsLinux**(): `string`

#### Returns

`string`

### CodecovRetrievalFailed()

> **CodecovRetrievalFailed**(`url`): `string`

#### Parameters

##### url

`string`

#### Returns

`string`

### CommandDidNotComplete()

> **CommandDidNotComplete**(`command`): `string`

#### Parameters

##### command

`string`

#### Returns

`string`

### ConfigAssetEnvironmentValidationFailed()

> **ConfigAssetEnvironmentValidationFailed**(`subject`, `badValue`, `validValues`): `string`

#### Parameters

##### subject

`string`

##### badValue

`string`

##### validValues

readonly `string`[]

#### Returns

`string`

### DangerousRenovationRequiresForce()

> **DangerousRenovationRequiresForce**(`taskName`): `string`

#### Parameters

##### taskName

`string`

#### Returns

`string`

### DefaultImportFalsy()

> **DefaultImportFalsy**(): `string`

#### Returns

`string`

### EslintPluginReturnedSomethingUnexpected()

> **EslintPluginReturnedSomethingUnexpected**(`identifier`): `string`

#### Parameters

##### identifier

`string`

#### Returns

`string`

### FailedToInstallCodecov()

> **FailedToInstallCodecov**(): `string`

#### Returns

`string`

### GuruMeditation()

> **GuruMeditation**(): `string`

#### Returns

`string`

### IgnoredOptions()

> **IgnoredOptions**(`args`): `string`

#### Parameters

##### args

`string`[]

#### Returns

`string`

### InvalidRuntime()

> **InvalidRuntime**(): `string`

#### Returns

`string`

### IssuePrefixContainsIllegalCharacters()

> **IssuePrefixContainsIllegalCharacters**(): `string`

#### Returns

`string`

### JestChangelogMonkeyPatchFailedToTake()

> **JestChangelogMonkeyPatchFailedToTake**(`error`): `string`

#### Parameters

##### error

`unknown`

#### Returns

`string`

### LintingFailed()

> **LintingFailed**(): `string`

#### Returns

`string`

### MarkdownNoUndefinedReferences()

> **MarkdownNoUndefinedReferences**(): `string`

#### Returns

`string`

### MissingConfigurationFile()

> **MissingConfigurationFile**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### MissingSymbioteEnvironmentVariable()

> **MissingSymbioteEnvironmentVariable**(`variableName`): `string`

#### Parameters

##### variableName

`string`

#### Returns

`string`

### MultipleConfigsWhenExpectingOnlyOne()

> **MultipleConfigsWhenExpectingOnlyOne**(`filename1`, `filename2`): `string`

#### Parameters

##### filename1

`string`

##### filename2

`string`

#### Returns

`string`

### MustChooseDeployEnvironment()

> **MustChooseDeployEnvironment**(): `string`

#### Returns

`string`

### MustInstallSymbioteToRunThisCommand()

> **MustInstallSymbioteToRunThisCommand**(): `string`

#### Returns

`string`

### NoCurrentBranch()

> **NoCurrentBranch**(): `string`

#### Returns

`string`

### PreparationRunnerExecutionFailed()

> **PreparationRunnerExecutionFailed**(): `string`

#### Returns

`string`

### ReleaseEnvironmentValidationFailed()

> **ReleaseEnvironmentValidationFailed**(): `string`

#### Returns

`string`

### ReleaseFailedRepoRolledBack()

> **ReleaseFailedRepoRolledBack**(): `string`

#### Returns

`string`

### ReleaseFinishedWithADirtyRepo()

> **ReleaseFinishedWithADirtyRepo**(): `string`

#### Returns

`string`

### ReleaseRepositoryStateValidationFailed()

> **ReleaseRepositoryStateValidationFailed**(): `string`

#### Returns

`string`

### ReleaseRunnerExecutionFailed()

> **ReleaseRunnerExecutionFailed**(): `string`

#### Returns

`string`

### ReleaseScriptExecutionFailed()

> **ReleaseScriptExecutionFailed**(): `string`

#### Returns

`string`

### RenovateEnvironmentValidationFailed()

> **RenovateEnvironmentValidationFailed**(): `string`

#### Returns

`string`

### RenovationDestinationAlreadyExists()

> **RenovationDestinationAlreadyExists**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

### RenovationEncounteredObsoleteProtectionRules()

> **RenovationEncounteredObsoleteProtectionRules**(`branch`): `string`

#### Parameters

##### branch

`string`

#### Returns

`string`

### RenovationRepositoryExtraneousRuleset()

> **RenovationRepositoryExtraneousRuleset**(`rulesetName`): `string`

#### Parameters

##### rulesetName

`string`

#### Returns

`string`

### RenovationRunnerExecutionFailed()

> **RenovationRunnerExecutionFailed**(): `string`

#### Returns

`string`

### RenovationSubtaskOperationFailed()

> **RenovationSubtaskOperationFailed**(`index`): `string`

#### Parameters

##### index

`number`

#### Returns

`string`

### RenovationTagAliasAlreadyExists()

> **RenovationTagAliasAlreadyExists**(`tag`): `string`

#### Parameters

##### tag

`string`

#### Returns

`string`

### TaskNotRunnable()

> **TaskNotRunnable**(`id`, `npmScripts`): `string`

#### Parameters

##### id

`string`

##### npmScripts

`string`[]

#### Returns

`string`

### TestingFailed()

> **TestingFailed**(): `string`

#### Returns

`string`

### TopologyRunScriptExecutionFailed()

> **TopologyRunScriptExecutionFailed**(): `string`

#### Returns

`string`

### TranspilationReturnedNothing()

> **TranspilationReturnedNothing**(`sourcePath`, `outputPath`): `string`

#### Parameters

##### sourcePath

`string`

##### outputPath

`string`

#### Returns

`string`

### UnmatchedCommitType()

> **UnmatchedCommitType**(`type`, `variableName`): `string`

#### Parameters

##### type

`undefined` | `string`

##### variableName

`string`

#### Returns

`string`

### UnsupportedCommand()

> **UnsupportedCommand**(): `string`

#### Returns

`string`

### UnsupportedFeature()

> **UnsupportedFeature**(`feature`): `string`

#### Parameters

##### feature

`string`

#### Returns

`string`

### UnsupportedRenovationScope()

> **UnsupportedRenovationScope**(`taskName`, `givenScope`, `supportedScopes`): `string`

#### Parameters

##### taskName

`string`

##### givenScope

`string`

##### supportedScopes

`string`[]

#### Returns

`string`

### WrongProjectAttributes()

> **WrongProjectAttributes**(`expected`, `actual`, `preposition`): `string`

#### Parameters

##### expected

`ProjectAttribute`[]

##### actual

###### cjs?

`boolean`

###### cli?

`boolean`

###### esm?

`boolean`

###### hybridrepo?

`boolean`

###### monorepo?

`boolean`

###### multiversal?

`boolean`

###### nextjs?

`boolean`

###### polyrepo?

`boolean`

###### private?

`boolean`

###### vercel?

`boolean`

###### webpack?

`boolean`

##### preposition

`string` = `'with'`

#### Returns

`string`

### XChangelogMonkeyPatchFailedToTake()

> **XChangelogMonkeyPatchFailedToTake**(`filename`): `string`

#### Parameters

##### filename

`string`

#### Returns

`string`
