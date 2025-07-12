[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / MakeTransformerOptions

# Type Alias: MakeTransformerOptions

> **MakeTransformerOptions** = `object`

Defined in: [src/assets.ts:334](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L334)

Options to tweak the runtime of [makeTransformer](../functions/makeTransformer.md).

## Properties

### trimContents?

> `optional` **trimContents**: `"start"` \| `"end"` \| `"both"` \| `"both-then-append-newline"` \| `false`

Defined in: [src/assets.ts:340](https://github.com/Xunnamius/symbiote/blob/1c36264a9ee1bf4cdf92c895c1434941f105e56c/src/assets.ts#L340)

Whether the generated asset contents should be trimmed and how.

#### Default

```ts
'both-then-append-newline'
```
