[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / GatherAssetsFromTransformerOptions

# Type Alias: GatherAssetsFromTransformerOptions

> **GatherAssetsFromTransformerOptions**: `object`

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

## Defined in

[src/assets.ts:297](https://github.com/Xunnamius/symbiote/blob/6888363ae81ec0a004cfcb164e5a634c45aca6a9/src/assets.ts#L297)
