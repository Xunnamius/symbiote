[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / gatherAssetsFromTransformer

# Function: gatherAssetsFromTransformer()

> **gatherAssetsFromTransformer**(`__namedParameters`): `Promise`\<[`ReifiedAssets`](../type-aliases/ReifiedAssets.md)\>

Defined in: [src/assets.ts:387](https://github.com/Xunnamius/symbiote/blob/b9e599602cbc0f1d65b094b7a5e8739743f64fd2/src/assets.ts#L387)

Retrieve one or more assets, conditioned on `transformerContext`, by invoking
a single transformer. For example, to retrieve the `eslint.config.mjs` asset
file and its generated contents, the transformer source for which exists in
`${directoryAssetTransformers}/_eslint.config.mjs.ts`, pass
`"eslint.config.mjs"` as `transformerId`.

Note that it cannot be assumed that the `transformerId` and the filename of
the returned asset will always be the same, nor can it be assumed that a
transformer returns only a single asset.

This function returns a [ReifiedAssets](../type-aliases/ReifiedAssets.md) instance or throws if no
corresponding transformer for `transformerId` can be found.

## Parameters

### \_\_namedParameters

#### options?

[`MakeTransformerOptions`](../type-aliases/MakeTransformerOptions.md) & [`GatherAssetsFromTransformerOptions`](../type-aliases/GatherAssetsFromTransformerOptions.md) = `{}`

#### transformerContext

[`IncomingTransformerContext`](../type-aliases/IncomingTransformerContext.md)

#### transformerId

`string`

## Returns

`Promise`\<[`ReifiedAssets`](../type-aliases/ReifiedAssets.md)\>

## See

[gatherAssetsFromAllTransformers](gatherAssetsFromAllTransformers.md)
