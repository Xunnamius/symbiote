[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / MakeTransformerOptions

# Type Alias: MakeTransformerOptions

> **MakeTransformerOptions**: `object`

Defined in: [src/assets.ts:311](https://github.com/Xunnamius/symbiote/blob/e2a70374b9e5c61d555e2445ff09c823f586ccb3/src/assets.ts#L311)

Options to tweak the runtime of [makeTransformer](../functions/makeTransformer.md).

## Type declaration

### trimContents?

> `optional` **trimContents**: `"start"` \| `"end"` \| `"both"` \| `"both-then-append-newline"` \| `false`

Whether the generated asset contents should be trimmed and how.

#### Default

```ts
'both-then-append-newline'
```
