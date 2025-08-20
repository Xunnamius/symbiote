[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / GatherAssetsFromTransformerOptions

# Type Alias: GatherAssetsFromTransformerOptions

> **GatherAssetsFromTransformerOptions** = `object`

Defined in: [src/assets.ts:347](https://github.com/Xunnamius/symbiote/blob/49b68300bfb7b09f7c437e515711c99015f99f81/src/assets.ts#L347)

Options to tweak the runtime of [gatherAssetsFromTransformer](../functions/gatherAssetsFromTransformer.md) and
related functions.

## Properties

### transformerFiletype?

> `optional` **transformerFiletype**: `"js"` \| `"ts"`

Defined in: [src/assets.ts:357](https://github.com/Xunnamius/symbiote/blob/49b68300bfb7b09f7c437e515711c99015f99f81/src/assets.ts#L357)

Whether an attempt should be made to retrieve a transformer file ending in
`.js` versus `.ts`.

This is primarily useful in situations where we do not have access to the
transpiled `.js` versions of the source `.ts` files.

#### Default

```ts
'js'
```
