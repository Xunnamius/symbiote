[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / Transformer

# Type Alias: Transformer()

> **Transformer** = (`this`, `context`, `options?`) => `Promise`\<[`ReifiedAssets`](ReifiedAssets.md)\>

Defined in: [src/assets.ts:175](https://github.com/Xunnamius/symbiote/blob/cdafea2baa38b239d5977b443b3a3091b1a1c2e6/src/assets.ts#L175)

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
