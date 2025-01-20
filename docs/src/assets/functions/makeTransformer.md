[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / makeTransformer

# Function: makeTransformer()

> **makeTransformer**(`transform`): [`TransformerContainer`](../type-aliases/TransformerContainer.md)

Defined in: [src/assets.ts:454](https://github.com/Xunnamius/symbiote/blob/3b6f45301765b7eab22ef0b67ed645f03c5935c3/src/assets.ts#L454)

Accepts a [Transform](../type-aliases/Transform.md) function and returns a
[TransformerContainer](../type-aliases/TransformerContainer.md) containing a single [Transformer](../type-aliases/Transformer.md).

[Transformer](../type-aliases/Transformer.md)s are responsible for returning only relevant asset paths
(and their lazily-generated contents) conditioned on the current context.

## Parameters

### transform

[`Transform`](../type-aliases/Transform.md)

## Returns

[`TransformerContainer`](../type-aliases/TransformerContainer.md)
