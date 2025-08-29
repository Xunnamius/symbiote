[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / TransformerContext

# Type Alias: TransformerContext

> **TransformerContext** = `object`

Defined in: [src/assets.ts:214](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L214)

A union of well-known context keys passed directly to each transformer
[Transformer](Transformer.md).

**INSTANCES OF `TransformerContext` MUST NOT CONTAIN ANY SENSITIVE
INFORMATION!**

## Properties

### additionalRawAliasMappings

> **additionalRawAliasMappings**: `RawAliasMapping`[]

Defined in: [src/assets.ts:286](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L286)

An array of RawAliasMappings that will be included when deriving
aliases during content generation.

***

### asset

> **asset**: `string`

Defined in: [src/assets.ts:222](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L222)

The value of the `asset` parameter passed to
[gatherAssetsFromTransformer](../functions/gatherAssetsFromTransformer.md) and related functions.

For transformers returning a single asset, this can be used to construct
the asset path.

***

### assetPreset

> **assetPreset**: [`AssetPreset`](../enumerations/AssetPreset.md) \| `undefined`

Defined in: [src/assets.ts:268](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L268)

A relevant [AssetPreset](../enumerations/AssetPreset.md) or `undefined` when generic versions of
assets should be generated.

This is the preset that was passed in from a wider context, such as a
renovation or initialization command. Therefore, it only applies to the
current package and should be relied upon with caution when generating
per-package assets. It is usually best to assume a library-like preset
(e.g. "lib-cjs") and rely on each package's attributes (i.e.
`WorkspaceAttribute`).

***

### chooserBlockEnd

> **chooserBlockEnd**: `string`

Defined in: [src/assets.ts:337](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L337)

The standard markdown text denoting the end of a "chooser block".

***

### chooserBlockSplit

> **chooserBlockSplit**: `string`

Defined in: [src/assets.ts:333](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L333)

The standard markdown text denoting the beginning of a new choice in a
"chooser block".

***

### chooserBlockStart

> **chooserBlockStart**: `string`

Defined in: [src/assets.ts:328](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L328)

The standard markdown text denoting the start of a "chooser block".

***

### codecovFlag

> **codecovFlag**: `string`

Defined in: [src/assets.ts:324](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L324)

The flag used when generating codecov badges and related links.

***

### cwdPackagePartialImportSpecifier

> **cwdPackagePartialImportSpecifier**: `string`

Defined in: [src/assets.ts:281](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L281)

A partial import alias string that can be used as part of a specifier to
import from the current package. If the current package is the root
package, this will be an empty string. Otherwise, it will begin with a plus
sign (`+`).

Example: `"+graph"` (for the `@-xun/project-graph` sub-root package)

***

### debug

> **debug**: `ExtendedDebugger`

Defined in: [src/assets.ts:231](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L231)

Global debugging function.

***

### forceOverwritePotentiallyDestructive

> **forceOverwritePotentiallyDestructive**: `boolean`

Defined in: [src/assets.ts:256](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L256)

Whether or not to overwrite certain files (such as .env files, and .md
files with replacer regions) in a potentially destructive way.

***

### lintNpmScript

> **lintNpmScript**: `string`

Defined in: [src/assets.ts:297](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L297)

The "lint" npm command used in husky scripts. This command will be
different for monorepos (including hybridrepos) than it is for polyrepos.

***

### log

> **log**: `ExtendedLogger`

Defined in: [src/assets.ts:227](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L227)

Global logging function.

***

### monorepoPackagesList

> **monorepoPackagesList**: `string`

Defined in: [src/assets.ts:291](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L291)

A markdown list of the current packages in the repository, if it is a
monorepo. Does not include the root package.

***

### projectMetadata

> **projectMetadata**: `ProjectMetadata`

Defined in: [src/assets.ts:272](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L272)

#### See

ProjectMetadata

***

### repoName

> **repoName**: `string`

Defined in: [src/assets.ts:316](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L316)

The name of the repository on GitHub or other service.

This string is always a URL-safe and valid GitHub repository name.

***

### repoOwner

> **repoOwner**: `string`

Defined in: [src/assets.ts:310](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L310)

The owner of the repository on GitHub or other service.

This string is always a URL-safe and valid GitHub repository owner.

***

### scope

> **scope**: [`DefaultGlobalScope`](../../configure/enumerations/DefaultGlobalScope.md)

Defined in: [src/assets.ts:251](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L251)

The scope to consider when determining which assets to return.

***

### shouldDeriveAliases

> **shouldDeriveAliases**: `boolean`

Defined in: [src/assets.ts:247](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L247)

Whether or not to derive aliases and inject them into the configuration.

***

### testNpmScript

> **testNpmScript**: `string`

Defined in: [src/assets.ts:303](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L303)

The "test" npm command used in husky scripts. This command will be
different for monorepos (not including hybridrepos) than it is for
polyrepos and hybridrepos.

***

### toPackageAbsolutePath()

> **toPackageAbsolutePath**: (...`pathsLike`) => `AbsolutePath`

Defined in: [src/assets.ts:242](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L242)

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

Defined in: [src/assets.ts:237](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L237)

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

Defined in: [src/assets.ts:320](https://github.com/Xunnamius/symbiote/blob/50bd26ba580f69a990fc1f7bdf0f09da69c3cfeb/src/assets.ts#L320)

The year as shown in various generated documents like `LICENSE.md`.
