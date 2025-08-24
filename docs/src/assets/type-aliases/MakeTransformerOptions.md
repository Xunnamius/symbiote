[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / MakeTransformerOptions

# Type Alias: MakeTransformerOptions

> **MakeTransformerOptions** = `object`

Defined in: [src/assets.ts:343](https://github.com/Xunnamius/symbiote/blob/a432129d36367c9c0fe2512d6ba837487d12f425/src/assets.ts#L343)

Options to tweak the runtime of [makeTransformer](../functions/makeTransformer.md).

## Properties

### trimContents?

> `optional` **trimContents**: `"start"` \| `"end"` \| `"both"` \| `"both-then-append-newline"` \| `false`

Defined in: [src/assets.ts:349](https://github.com/Xunnamius/symbiote/blob/a432129d36367c9c0fe2512d6ba837487d12f425/src/assets.ts#L349)

Whether the generated asset contents should be trimmed and how.

#### Default

```ts
'both-then-append-newline'
```
