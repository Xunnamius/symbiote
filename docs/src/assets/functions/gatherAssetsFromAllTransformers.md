[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / gatherAssetsFromAllTransformers

# Function: gatherAssetsFromAllTransformers()

> **gatherAssetsFromAllTransformers**(`__namedParameters`): `Promise`\<[`ReifiedAssets`](../type-aliases/ReifiedAssets.md)\>

Defined in: [src/assets.ts:401](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/assets.ts#L401)

Retrieve all available assets conditioned on `transformerContext`. Since
computing asset file contents are deferred until the generator function is
called, calling this function is **quick and safe** and will _not_
immediately load a bunch of assets into memory.

## Parameters

### \_\_namedParameters

#### options

[`MakeTransformerOptions`](../type-aliases/MakeTransformerOptions.md) = `{}`

#### transformerContext

[`IncomingTransformerContext`](../type-aliases/IncomingTransformerContext.md)

## Returns

`Promise`\<[`ReifiedAssets`](../type-aliases/ReifiedAssets.md)\>

## See

[gatherAssetsFromTransformer](gatherAssetsFromTransformer.md)
