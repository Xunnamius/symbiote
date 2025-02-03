[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / MakeTransformerOptions

# Type Alias: MakeTransformerOptions

> **MakeTransformerOptions**: `object`

Defined in: [src/assets.ts:322](https://github.com/Xunnamius/symbiote/blob/d10510b26b60a15206271bb6da7ebcd862e067c4/src/assets.ts#L322)

Options to tweak the runtime of [makeTransformer](../functions/makeTransformer.md).

## Type declaration

### trimContents?

> `optional` **trimContents**: `"start"` \| `"end"` \| `"both"` \| `"both-then-append-newline"` \| `false`

Whether the generated asset contents should be trimmed and how.

#### Default

```ts
'both-then-append-newline'
```
