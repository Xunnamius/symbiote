[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / Transformer

# Type Alias: Transformer

> **Transformer** = (`this`, `context`, `options?`) => `Promise`\<[`ReifiedAssets`](ReifiedAssets.md)\>

Defined in: [src/assets.ts:191](https://github.com/Xunnamius/symbiote/blob/c224670ed4152319490e37dbcda7cf2d057821a9/src/assets.ts#L191)

A function that accepts a [TransformerContext](TransformerContext.md) and returns one or more
[Asset](Asset.md)s.

## Parameters

### this

`void`

### context

[`TransformerContext`](TransformerContext.md)

### options?

[`MakeTransformerOptions`](MakeTransformerOptions.md)

## Returns

`Promise`\<[`ReifiedAssets`](ReifiedAssets.md)\>
