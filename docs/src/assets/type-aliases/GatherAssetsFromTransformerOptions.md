[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / GatherAssetsFromTransformerOptions

# Type Alias: GatherAssetsFromTransformerOptions

> **GatherAssetsFromTransformerOptions** = `object`

Defined in: [src/assets.ts:340](https://github.com/Xunnamius/symbiote/blob/b6645a7e13ad9c4a85e6a278cbf060db1e4bf320/src/assets.ts#L340)

Options to tweak the runtime of [gatherAssetsFromTransformer](../functions/gatherAssetsFromTransformer.md) and
related functions.

## Properties

### transformerFiletype?

> `optional` **transformerFiletype**: `"js"` \| `"ts"`

Defined in: [src/assets.ts:350](https://github.com/Xunnamius/symbiote/blob/b6645a7e13ad9c4a85e6a278cbf060db1e4bf320/src/assets.ts#L350)

Whether an attempt should be made to retrieve a transformer file ending in
`.js` versus `.ts`.

This is primarily useful in situations where we do not have access to the
transpiled `.js` versions of the source `.ts` files.

#### Default

```ts
'js'
```
