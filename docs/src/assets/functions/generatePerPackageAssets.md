[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / generatePerPackageAssets

# Function: generatePerPackageAssets()

> **generatePerPackageAssets**(`transformerContext`, `adder`, `__namedParameters`): `Promise`\<[`Asset`](../type-aliases/Asset.md)[]\>

Defined in: [src/assets.ts:673](https://github.com/Xunnamius/symbiote/blob/16e65ca9568c2c290d9cbc170fcee40ca3a63520/src/assets.ts#L673)

Takes a [TransformerContext](../type-aliases/TransformerContext.md) and an adder function and returns an array
of [Asset](../type-aliases/Asset.md)s generated per each package in ProjectMetadata,
including the root package in hybridrepos and polyrepos (but not in
non-hybrid monorepos).

**WARNING: be wary relying on an external [TransformerContext](../type-aliases/TransformerContext.md) when
using this function. When context access is required, use the
`contextWithCwdPackage` parameter provided to each adder function.**

## Parameters

### transformerContext

[`TransformerContext`](../type-aliases/TransformerContext.md)

### adder

(`helpers`) => `Promisable`\<`undefined` \| [`Asset`](../type-aliases/Asset.md)[]\>

### \_\_namedParameters

#### includeRootPackageInNonHybridMonorepo?

`boolean` = `false`

If `true`, the root workspace package will be included among the
Packages passed to `adder` even when the ProjectMetadata
indicates that this monorepo does not actually have a publishable root
package containing source code or tests.

Note that, if `cwdPackage` in [TransformerContext.projectMetadata](../type-aliases/TransformerContext.md#projectmetadata)
is the non-hybrid monorepo root and scope is `"this-package"`, the
package will be included regardless of this option.

**Default**

```ts
false
```

## Returns

`Promise`\<[`Asset`](../type-aliases/Asset.md)[]\>
