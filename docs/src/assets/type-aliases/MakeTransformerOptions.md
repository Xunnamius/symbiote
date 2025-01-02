[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / MakeTransformerOptions

# Type Alias: MakeTransformerOptions

> **MakeTransformerOptions**: `object`

Defined in: [src/assets.ts:322](https://github.com/Xunnamius/symbiote/blob/1546ab8527a571efe54081d7614bd35a9d6e0c3c/src/assets.ts#L322)

Options to tweak the runtime of [makeTransformer](../functions/makeTransformer.md).

## Type declaration

### trimContents?

> `optional` **trimContents**: `"start"` \| `"end"` \| `"both"` \| `"both-then-append-newline"` \| `false`

Whether the generated asset contents should be trimmed and how.

#### Default

```ts
'both-then-append-newline'
```
