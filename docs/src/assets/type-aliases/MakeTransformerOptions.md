[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / MakeTransformerOptions

# Type Alias: MakeTransformerOptions

> **MakeTransformerOptions** = `object`

Defined in: [src/assets.ts:327](https://github.com/Xunnamius/symbiote/blob/75014db0d306eae609fdd593e692bde4e3ec6d31/src/assets.ts#L327)

Options to tweak the runtime of [makeTransformer](../functions/makeTransformer.md).

## Properties

### trimContents?

> `optional` **trimContents**: `"start"` \| `"end"` \| `"both"` \| `"both-then-append-newline"` \| `false`

Defined in: [src/assets.ts:333](https://github.com/Xunnamius/symbiote/blob/75014db0d306eae609fdd593e692bde4e3ec6d31/src/assets.ts#L333)

Whether the generated asset contents should be trimmed and how.

#### Default

```ts
'both-then-append-newline'
```
