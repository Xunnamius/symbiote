[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / TransformerContext

# Type Alias: TransformerContext

> **TransformerContext** = `object`

Defined in: [src/assets.ts:205](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L205)

A union of well-known context keys passed directly to each transformer
[Transformer](Transformer.md).

**INSTANCES OF `TransformerContext` MUST NOT CONTAIN ANY SENSITIVE
INFORMATION!**

## Properties

### additionalRawAliasMappings

> **additionalRawAliasMappings**: `RawAliasMapping`[]

Defined in: [src/assets.ts:277](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L277)

An array of RawAliasMappings that will be included when deriving
aliases during content generation.

***

### asset

> **asset**: `string`

Defined in: [src/assets.ts:213](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L213)

The value of the `asset` parameter passed to
[gatherAssetsFromTransformer](../functions/gatherAssetsFromTransformer.md) and related functions.

For transformers returning a single asset, this can be used to construct
the asset path.

***

### assetPreset

> **assetPreset**: [`AssetPreset`](../enumerations/AssetPreset.md) \| `undefined`

Defined in: [src/assets.ts:259](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L259)

A relevant [AssetPreset](../enumerations/AssetPreset.md) or `undefined` when generic versions of
assets should be generated.

This is the preset that was passed in from a wider context, such as a
renovation or initialization command. Therefore, it only applies to the
current package and should be relied upon with caution when generating
per-package assets. It is usually best to and assume a library-like preset
(e.g. "lib-cjs") and rely on each package's attributes (i.e.
`WorkspaceAttribute`).

***

### chooserBlockEnd

> **chooserBlockEnd**: `string`

Defined in: [src/assets.ts:328](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L328)

The standard markdown text denoting the end of a "chooser block".

***

### chooserBlockSplit

> **chooserBlockSplit**: `string`

Defined in: [src/assets.ts:324](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L324)

The standard markdown text denoting the beginning of a new choice in a
"chooser block".

***

### chooserBlockStart

> **chooserBlockStart**: `string`

Defined in: [src/assets.ts:319](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L319)

The standard markdown text denoting the start of a "chooser block".

***

### codecovFlag

> **codecovFlag**: `string`

Defined in: [src/assets.ts:315](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L315)

The flag used when generating codecov badges and related links.

***

### cwdPackagePartialImportSpecifier

> **cwdPackagePartialImportSpecifier**: `string`

Defined in: [src/assets.ts:272](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L272)

A partial import alias string that can be used as part of a specifier to
import from the current package. If the current package is the root
package, this will be an empty string. Otherwise, it will begin with a plus
sign (`+`).

Example: `"+graph"` (for the `@-xun/project-graph` sub-root package)

***

### debug

> **debug**: `ExtendedDebugger`

Defined in: [src/assets.ts:222](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L222)

Global debugging function.

***

### forceOverwritePotentiallyDestructive

> **forceOverwritePotentiallyDestructive**: `boolean`

Defined in: [src/assets.ts:247](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L247)

Whether or not to overwrite certain files (such as .env files, and .md
files with replacer regions) in a potentially destructive way.

***

### lintNpmScript

> **lintNpmScript**: `string`

Defined in: [src/assets.ts:288](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L288)

The "lint" npm command used in husky scripts. This command will be
different for monorepos (including hybridrepos) than it is for polyrepos.

***

### log

> **log**: `ExtendedLogger`

Defined in: [src/assets.ts:218](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L218)

Global logging function.

***

### monorepoPackagesList

> **monorepoPackagesList**: `string`

Defined in: [src/assets.ts:282](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L282)

A markdown list of the current packages in the repository, if it is a
monorepo. Does not include the root package.

***

### projectMetadata

> **projectMetadata**: `ProjectMetadata`

Defined in: [src/assets.ts:263](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L263)

#### See

ProjectMetadata

***

### repoName

> **repoName**: `string`

Defined in: [src/assets.ts:307](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L307)

The name of the repository on GitHub or other service.

This string is always a URL-safe and valid GitHub repository name.

***

### repoOwner

> **repoOwner**: `string`

Defined in: [src/assets.ts:301](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L301)

The owner of the repository on GitHub or other service.

This string is always a URL-safe and valid GitHub repository owner.

***

### scope

> **scope**: [`DefaultGlobalScope`](../../configure/enumerations/DefaultGlobalScope.md)

Defined in: [src/assets.ts:242](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L242)

The scope to consider when determining which assets to return.

***

### shouldDeriveAliases

> **shouldDeriveAliases**: `boolean`

Defined in: [src/assets.ts:238](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L238)

Whether or not to derive aliases and inject them into the configuration.

***

### testNpmScript

> **testNpmScript**: `string`

Defined in: [src/assets.ts:294](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L294)

The "test" npm command used in husky scripts. This command will be
different for monorepos (not including hybridrepos) than it is for
polyrepos and hybridrepos.

***

### toPackageAbsolutePath()

> **toPackageAbsolutePath**: (...`pathsLike`) => `AbsolutePath`

Defined in: [src/assets.ts:233](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L233)

Takes a RelativePath-like object and joins it to `cwdPackage.root`
from ProjectMetadata.

#### Parameters

##### pathsLike

...(`RelativePath` \| `string`)[]

#### Returns

`AbsolutePath`

***

### toProjectAbsolutePath()

> **toProjectAbsolutePath**: (...`pathsLike`) => `AbsolutePath`

Defined in: [src/assets.ts:228](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L228)

Takes a RelativePath-like object and joins it to `rootPackage.root`
from ProjectMetadata.

#### Parameters

##### pathsLike

...(`RelativePath` \| `string`)[]

#### Returns

`AbsolutePath`

***

### year

> **year**: `string`

Defined in: [src/assets.ts:311](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L311)

The year as shown in various generated documents like `LICENSE.md`.
