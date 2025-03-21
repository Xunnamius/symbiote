[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / gatherAssetsFromAllTransformers

# Function: gatherAssetsFromAllTransformers()

> **gatherAssetsFromAllTransformers**(`__namedParameters`): `Promise`\<[`ReifiedAssets`](../type-aliases/ReifiedAssets.md)\>

Defined in: [src/assets.ts:416](https://github.com/Xunnamius/symbiote/blob/2a4f9c137a879b6e0d19dc7269398051d3a84f5e/src/assets.ts#L416)

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
