[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / TransformerContext

# Type Alias: TransformerContext

> **TransformerContext**: `object`

Defined in: [src/assets.ts:198](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/assets.ts#L198)

A union of well-known context keys passed directly to each transformer
[Transformer](Transformer.md).

**INSTANCES OF `TransformerContext` MUST NOT CONTAIN ANY SENSITIVE
INFORMATION!**

## Type declaration

### additionalRawAliasMappings

> **additionalRawAliasMappings**: `RawAliasMapping`[]

An array of RawAliasMappings that will be included when deriving
aliases during content generation.

### asset

> **asset**: `string`

The value of the `asset` parameter passed to
[gatherAssetsFromTransformer](../functions/gatherAssetsFromTransformer.md) and related functions.

For transformers returning a single asset, this can be used to construct
the asset path.

### assetPreset

> **assetPreset**: [`AssetPreset`](../enumerations/AssetPreset.md) \| `undefined`

A relevant [AssetPreset](../enumerations/AssetPreset.md) or `undefined` when generic versions of
assets should be generated.

This is the preset that was passed in from a wider context, such as a
renovation or initialization command. Therefore, it only applies to the
current package and should be relied upon with caution when generating
per-package assets. It is usually best to and assume a library-like preset
(e.g. "lib-cjs") and rely on each package's attributes (i.e.
`WorkspaceAttribute`).

### chooserBlockEnd

> **chooserBlockEnd**: `string`

The standard markdown text denoting the end of a "chooser block".

### chooserBlockSplit

> **chooserBlockSplit**: `string`

The standard markdown text denoting the beginning of a new choice in a
"chooser block".

### chooserBlockStart

> **chooserBlockStart**: `string`

The standard markdown text denoting the start of a "chooser block".

### codecovFlag

> **codecovFlag**: `string`

The flag used when generating codecov badges and related links.

### cwdPackagePartialImportSpecifier

> **cwdPackagePartialImportSpecifier**: `string`

A partial import alias string that can be used as part of a specifier to
import from the current package. If the current package is the root
package, this will be an empty string. Otherwise, it will begin with a plus
sign (`+`).

Example: `"+graph"` (for the `@-xun/project-graph` sub-root package)

### debug

> **debug**: `ExtendedDebugger`

Global debugging function.

### forceOverwritePotentiallyDestructive

> **forceOverwritePotentiallyDestructive**: `boolean`

Whether or not to overwrite certain files (such as .env files, and .md
files with replacer regions) in a potentially destructive way.

### lintNpmScript

> **lintNpmScript**: `string`

The "lint" npm command used in husky scripts. This command will be
different for monorepos (including hybridrepos) than it is for polyrepos.

### log

> **log**: `ExtendedLogger`

Global logging function.

### monorepoPackagesList

> **monorepoPackagesList**: `string`

A markdown list of the current packages in the repository, if it is a
monorepo. Does not include the root package.

### projectMetadata

> **projectMetadata**: `ProjectMetadata`

#### See

ProjectMetadata

### repoName

> **repoName**: `string`

The name of the repository on GitHub or other service.

This string is always a URL-safe and valid GitHub repository name.

### repoOwner

> **repoOwner**: `string`

The owner of the repository on GitHub or other service.

This string is always a URL-safe and valid GitHub repository owner.

### scope

> **scope**: [`DefaultGlobalScope`](../../configure/enumerations/DefaultGlobalScope.md)

The scope to consider when determining which assets to return.

### shouldDeriveAliases

> **shouldDeriveAliases**: `boolean`

Whether or not to derive aliases and inject them into the configuration.

### testNpmScript

> **testNpmScript**: `string`

The "test" npm command used in husky scripts. This command will be
different for monorepos (not including hybridrepos) than it is for
polyrepos and hybridrepos.

### toPackageAbsolutePath()

> **toPackageAbsolutePath**: (...`pathsLike`) => `AbsolutePath`

Takes a RelativePath-like object and joins it to `cwdPackage.root`
from ProjectMetadata.

#### Parameters

##### pathsLike

...(`RelativePath` \| `string`)[]

#### Returns

`AbsolutePath`

### toProjectAbsolutePath()

> **toProjectAbsolutePath**: (...`pathsLike`) => `AbsolutePath`

Takes a RelativePath-like object and joins it to `rootPackage.root`
from ProjectMetadata.

#### Parameters

##### pathsLike

...(`RelativePath` \| `string`)[]

#### Returns

`AbsolutePath`

### year

> **year**: `string`

The year as shown in various generated documents like `LICENSE.md`.
