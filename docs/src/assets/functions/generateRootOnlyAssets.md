[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / generateRootOnlyAssets

# Function: generateRootOnlyAssets()

> **generateRootOnlyAssets**(`transformerContext`, `adder`): `Promise`\<[`Asset`](../type-aliases/Asset.md)[]\>

Defined in: [src/assets.ts:748](https://github.com/Xunnamius/symbiote/blob/b0f6e46275dcd7f80ceb92f05b1e0795869afaf6/src/assets.ts#L748)

Takes a [TransformerContext](../type-aliases/TransformerContext.md) and an adder function and returns an array
of [Asset](../type-aliases/Asset.md)s when the current package is a RootPackage or scope
is set to [DefaultGlobalScope.Unlimited](../../configure/enumerations/DefaultGlobalScope.md#unlimited).

## Parameters

### transformerContext

[`TransformerContext`](../type-aliases/TransformerContext.md)

### adder

(`helpers`) => `Promisable`\<`undefined` \| [`Asset`](../type-aliases/Asset.md)[]\>

## Returns

`Promise`\<[`Asset`](../type-aliases/Asset.md)[]\>
