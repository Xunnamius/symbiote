[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / GatherAssetsFromTransformerOptions

# Type Alias: GatherAssetsFromTransformerOptions

> **GatherAssetsFromTransformerOptions**: `object`

Defined in: [src/assets.ts:318](https://github.com/Xunnamius/symbiote/blob/6997faa5359efb83c247c1b6e5dcf27da55db104/src/assets.ts#L318)

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
