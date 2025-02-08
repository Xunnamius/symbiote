[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / MakeTransformerOptions

# Type Alias: MakeTransformerOptions

> **MakeTransformerOptions**: `object`

Defined in: [src/assets.ts:306](https://github.com/Xunnamius/symbiote/blob/93db40a191a3211953c897ee68551b6408725320/src/assets.ts#L306)

Options to tweak the runtime of [makeTransformer](../functions/makeTransformer.md).

## Type declaration

### trimContents?

> `optional` **trimContents**: `"start"` \| `"end"` \| `"both"` \| `"both-then-append-newline"` \| `false`

Whether the generated asset contents should be trimmed and how.

#### Default

```ts
'both-then-append-newline'
```
