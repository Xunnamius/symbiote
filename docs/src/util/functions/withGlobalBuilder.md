[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / withGlobalBuilder

# Function: withGlobalBuilder()

> **withGlobalBuilder**\<`CustomCliArguments`\>(...`__namedParameters`): `ReturnType`\<*typeof* `withStandardBuilder`\>

Defined in: [src/util.ts:259](https://github.com/Xunnamius/symbiote/blob/ecdd713c4d242b92209fafa38beadafe2769795c/src/util.ts#L259)

A version of withStandardBuilder that expects `CustomCliArguments` to
extend [GlobalCliArguments](../../configure/type-aliases/GlobalCliArguments.md) and implements any related global handler
functionality.

[globalCliArguments](../../configure/variables/globalCliArguments.md) is included in `additionalCommonOptions`
automatically. See withStandardBuilder for more details on how this
function semi-deep merges various common option configurations.

## Type Parameters

• **CustomCliArguments** *extends* [`GlobalCliArguments`](../../configure/type-aliases/GlobalCliArguments.md)\<`string`\>

## Parameters

### \_\_namedParameters

...\[`BfeBuilderObject`\<`CustomCliArguments`, [`GlobalExecutionContext`](../../configure/type-aliases/GlobalExecutionContext.md)\> \| (...`args`) => `void` \| `BfeBuilderObject`\<`CustomCliArguments`, [`GlobalExecutionContext`](../../configure/type-aliases/GlobalExecutionContext.md)\>, `Omit`\<`WithBuilderExtensionsConfig`\<`CustomCliArguments`\>, `"commonOptions"`\> & `object`?\]

## Returns

`ReturnType`\<*typeof* `withStandardBuilder`\>
