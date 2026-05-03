[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / Transformer

# Type Alias: Transformer

> **Transformer** = (`this`, `context`, `options?`) => `Promise`\<[`ReifiedAssets`](ReifiedAssets.md)\>

Defined in: [src/assets.ts:191](https://github.com/Xunnamius/symbiote/blob/4622d77b8dbe6c643a89cc16b7f2f59cc5d27edf/src/assets.ts#L191)

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
