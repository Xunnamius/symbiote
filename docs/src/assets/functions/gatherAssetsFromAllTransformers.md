[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / gatherAssetsFromAllTransformers

# Function: gatherAssetsFromAllTransformers()

> **gatherAssetsFromAllTransformers**(`__namedParameters`): `Promise`\<[`ReifiedAssets`](../type-aliases/ReifiedAssets.md)\>

Defined in: [src/assets.ts:432](https://github.com/Xunnamius/symbiote/blob/d58f752a47908197bf2e7050b119b5cca3d1f350/src/assets.ts#L432)

Retrieve all available assets conditioned on `transformerContext`. Since
computing asset file contents are deferred until the generator function is
called, calling this function is **quick and safe** and will _not_
immediately load a bunch of assets into memory.

## Parameters

### \_\_namedParameters

#### options?

[`MakeTransformerOptions`](../type-aliases/MakeTransformerOptions.md) = `{}`

#### transformerContext

[`IncomingTransformerContext`](../type-aliases/IncomingTransformerContext.md)

## Returns

`Promise`\<[`ReifiedAssets`](../type-aliases/ReifiedAssets.md)\>

## See

[gatherAssetsFromTransformer](gatherAssetsFromTransformer.md)
