[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / makeTransformer

# Function: makeTransformer()

> **makeTransformer**(`transform`): [`TransformerContainer`](../type-aliases/TransformerContainer.md)

Defined in: [src/assets.ts:458](https://github.com/Xunnamius/symbiote/blob/0bafa3046d16effe919127463c68cff1fb657848/src/assets.ts#L458)

Accepts a [Transform](../type-aliases/Transform.md) function and returns a
[TransformerContainer](../type-aliases/TransformerContainer.md) containing a single [Transformer](../type-aliases/Transformer.md).

[Transformer](../type-aliases/Transformer.md)s are responsible for returning only relevant asset paths
(and their lazily-generated contents) conditioned on the current context.

## Parameters

### transform

[`Transform`](../type-aliases/Transform.md)

## Returns

[`TransformerContainer`](../type-aliases/TransformerContainer.md)
