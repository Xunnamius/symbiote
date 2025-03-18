[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / withGlobalBuilder

# Function: withGlobalBuilder()

> **withGlobalBuilder**\<`CustomCliArguments`\>(...`__namedParameters`): `WithBuilderExtensionsReturnType`\<`CustomCliArguments`\>

Defined in: [src/util.ts:240](https://github.com/Xunnamius/symbiote/blob/beb889fb40f0cd320367d5f94d02e29b1efb13ab/src/util.ts#L240)

A version of withStandardBuilder that expects `CustomCliArguments` to
extend [GlobalCliArguments](../../configure/type-aliases/GlobalCliArguments.md) and implements any related global handler
functionality.

[globalCliArguments](../../configure/variables/globalCliArguments.md) is included in `additionalCommonOptions`
automatically. See withStandardBuilder for more details on how this
function semi-deep merges various common option configurations.

## Type Parameters

### CustomCliArguments

`CustomCliArguments` *extends* [`GlobalCliArguments`](../../configure/type-aliases/GlobalCliArguments.md)\<`string`\>

## Parameters

### \_\_namedParameters

...\[`BfeBuilderObject`\<`CustomCliArguments`, [`GlobalExecutionContext`](../../configure/type-aliases/GlobalExecutionContext.md)\> \| (...`args`) => `void` \| `BfeBuilderObject`\<`CustomCliArguments`, [`GlobalExecutionContext`](../../configure/type-aliases/GlobalExecutionContext.md)\>, `Omit`\<`WithBuilderExtensionsConfig`\<`CustomCliArguments`\>, `"commonOptions"` \| `"enableAutomaticSorting"`\> & `object`?\]

## Returns

`WithBuilderExtensionsReturnType`\<`CustomCliArguments`\>
