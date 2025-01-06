[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / withGlobalBuilder

# Function: withGlobalBuilder()

> **withGlobalBuilder**\<`CustomCliArguments`\>(...`__namedParameters`): `ReturnType`\<*typeof* `withStandardBuilder`\>

Defined in: [src/util.ts:251](https://github.com/Xunnamius/symbiote/blob/3831af5468c04bc48a0849a15233d1d644e5c45b/src/util.ts#L251)

A version of withStandardBuilder that expects `CustomCliArguments` to
extend [GlobalCliArguments](../../configure/type-aliases/GlobalCliArguments.md).

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
