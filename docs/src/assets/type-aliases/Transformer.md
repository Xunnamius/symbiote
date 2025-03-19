[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / Transformer

# Type Alias: Transformer()

> **Transformer** = (`this`, `context`, `options`?) => `Promise`\<[`ReifiedAssets`](ReifiedAssets.md)\>

Defined in: [src/assets.ts:175](https://github.com/Xunnamius/symbiote/blob/3cb0503ce3cd2a8bfb437c5dfd67c1fcba9d10cc/src/assets.ts#L175)

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
