[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / GatherAssetsFromTransformerOptions

# Type Alias: GatherAssetsFromTransformerOptions

> **GatherAssetsFromTransformerOptions**: `object`

Defined in: [src/assets.ts:335](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/assets.ts#L335)

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
