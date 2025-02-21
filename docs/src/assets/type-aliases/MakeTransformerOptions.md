[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / MakeTransformerOptions

# Type Alias: MakeTransformerOptions

> **MakeTransformerOptions**: `object`

Defined in: [src/assets.ts:327](https://github.com/Xunnamius/symbiote/blob/520897b087b8e240c6e7c9236ad875776c29a907/src/assets.ts#L327)

Options to tweak the runtime of [makeTransformer](../functions/makeTransformer.md).

## Type declaration

### trimContents?

> `optional` **trimContents**: `"start"` \| `"end"` \| `"both"` \| `"both-then-append-newline"` \| `false`

Whether the generated asset contents should be trimmed and how.

#### Default

```ts
'both-then-append-newline'
```
