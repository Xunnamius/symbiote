[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / TransformerContext

# Type Alias: TransformerContext

> **TransformerContext** = `object`

Defined in: [src/assets.ts:198](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L198)

A union of well-known context keys passed directly to each transformer
[Transformer](Transformer.md).

**INSTANCES OF `TransformerContext` MUST NOT CONTAIN ANY SENSITIVE
INFORMATION!**

## Properties

### additionalRawAliasMappings

> **additionalRawAliasMappings**: `RawAliasMapping`[]

Defined in: [src/assets.ts:270](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L270)

An array of RawAliasMappings that will be included when deriving
aliases during content generation.

***

### asset

> **asset**: `string`

Defined in: [src/assets.ts:206](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L206)

The value of the `asset` parameter passed to
[gatherAssetsFromTransformer](../functions/gatherAssetsFromTransformer.md) and related functions.

For transformers returning a single asset, this can be used to construct
the asset path.

***

### assetPreset

> **assetPreset**: [`AssetPreset`](../enumerations/AssetPreset.md) \| `undefined`

Defined in: [src/assets.ts:252](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L252)

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

Defined in: [src/assets.ts:321](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L321)

The standard markdown text denoting the end of a "chooser block".

***

### chooserBlockSplit

> **chooserBlockSplit**: `string`

Defined in: [src/assets.ts:317](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L317)

The standard markdown text denoting the beginning of a new choice in a
"chooser block".

***

### chooserBlockStart

> **chooserBlockStart**: `string`

Defined in: [src/assets.ts:312](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L312)

The standard markdown text denoting the start of a "chooser block".

***

### codecovFlag

> **codecovFlag**: `string`

Defined in: [src/assets.ts:308](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L308)

The flag used when generating codecov badges and related links.

***

### cwdPackagePartialImportSpecifier

> **cwdPackagePartialImportSpecifier**: `string`

Defined in: [src/assets.ts:265](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L265)

A partial import alias string that can be used as part of a specifier to
import from the current package. If the current package is the root
package, this will be an empty string. Otherwise, it will begin with a plus
sign (`+`).

Example: `"+graph"` (for the `@-xun/project-graph` sub-root package)

***

### debug

> **debug**: `ExtendedDebugger`

Defined in: [src/assets.ts:215](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L215)

Global debugging function.

***

### forceOverwritePotentiallyDestructive

> **forceOverwritePotentiallyDestructive**: `boolean`

Defined in: [src/assets.ts:240](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L240)

Whether or not to overwrite certain files (such as .env files, and .md
files with replacer regions) in a potentially destructive way.

***

### lintNpmScript

> **lintNpmScript**: `string`

Defined in: [src/assets.ts:281](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L281)

The "lint" npm command used in husky scripts. This command will be
different for monorepos (including hybridrepos) than it is for polyrepos.

***

### log

> **log**: `ExtendedLogger`

Defined in: [src/assets.ts:211](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L211)

Global logging function.

***

### monorepoPackagesList

> **monorepoPackagesList**: `string`

Defined in: [src/assets.ts:275](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L275)

A markdown list of the current packages in the repository, if it is a
monorepo. Does not include the root package.

***

### projectMetadata

> **projectMetadata**: `ProjectMetadata`

Defined in: [src/assets.ts:256](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L256)

#### See

ProjectMetadata

***

### repoName

> **repoName**: `string`

Defined in: [src/assets.ts:300](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L300)

The name of the repository on GitHub or other service.

This string is always a URL-safe and valid GitHub repository name.

***

### repoOwner

> **repoOwner**: `string`

Defined in: [src/assets.ts:294](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L294)

The owner of the repository on GitHub or other service.

This string is always a URL-safe and valid GitHub repository owner.

***

### scope

> **scope**: [`DefaultGlobalScope`](../../configure/enumerations/DefaultGlobalScope.md)

Defined in: [src/assets.ts:235](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L235)

The scope to consider when determining which assets to return.

***

### shouldDeriveAliases

> **shouldDeriveAliases**: `boolean`

Defined in: [src/assets.ts:231](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L231)

Whether or not to derive aliases and inject them into the configuration.

***

### testNpmScript

> **testNpmScript**: `string`

Defined in: [src/assets.ts:287](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L287)

The "test" npm command used in husky scripts. This command will be
different for monorepos (not including hybridrepos) than it is for
polyrepos and hybridrepos.

***

### toPackageAbsolutePath()

> **toPackageAbsolutePath**: (...`pathsLike`) => `AbsolutePath`

Defined in: [src/assets.ts:226](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L226)

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

Defined in: [src/assets.ts:221](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L221)

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

Defined in: [src/assets.ts:304](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/assets.ts#L304)

The year as shown in various generated documents like `LICENSE.md`.
