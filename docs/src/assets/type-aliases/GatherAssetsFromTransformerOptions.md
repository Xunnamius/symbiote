[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / GatherAssetsFromTransformerOptions

# Type Alias: GatherAssetsFromTransformerOptions

> **GatherAssetsFromTransformerOptions**: `object`

Defined in: [src/assets.ts:320](https://github.com/Xunnamius/symbiote/blob/71ec833685b57a820bf8f2491ca78156a6893662/src/assets.ts#L320)

Options to tweak the runtime of [gatherAssetsFromTransformer](../functions/gatherAssetsFromTransformer.md) and
related functions.

## Type declaration

### transformerFiletype?

> `optional` **transformerFiletype**: `"js"` \| `"ts"`

Whether an attempt should be made to retrieve a transformer file ending in
`.js` versus `.ts`.

This is primarily useful in situations where we do not have access to the
transpiled `.js` versions of the source `.ts` files.

#### Default

```ts
'js'
```
