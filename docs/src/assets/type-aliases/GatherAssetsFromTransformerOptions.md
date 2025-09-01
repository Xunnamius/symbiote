[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / GatherAssetsFromTransformerOptions

# Type Alias: GatherAssetsFromTransformerOptions

> **GatherAssetsFromTransformerOptions** = `object`

Defined in: [src/assets.ts:356](https://github.com/Xunnamius/symbiote/blob/d58f752a47908197bf2e7050b119b5cca3d1f350/src/assets.ts#L356)

Options to tweak the runtime of [gatherAssetsFromTransformer](../functions/gatherAssetsFromTransformer.md) and
related functions.

## Properties

### transformerFiletype?

> `optional` **transformerFiletype**: `"js"` \| `"ts"`

Defined in: [src/assets.ts:366](https://github.com/Xunnamius/symbiote/blob/d58f752a47908197bf2e7050b119b5cca3d1f350/src/assets.ts#L366)

Whether an attempt should be made to retrieve a transformer file ending in
`.js` versus `.ts`.

This is primarily useful in situations where we do not have access to the
transpiled `.js` versions of the source `.ts` files.

#### Default

```ts
'js'
```
