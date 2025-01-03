[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/commands](../README.md) / default

# Function: default()

> **default**(`__namedParameters`): `object`

Defined in: [src/commands/index.ts:22](https://github.com/Xunnamius/symbiote/blob/10f876ec625b234388ec5689f4d10663cabb4139/src/commands/index.ts#L22)

## Parameters

### \_\_namedParameters

`AsStrictExecutionContext`\<[`GlobalExecutionContext`](../../configure/type-aliases/GlobalExecutionContext.md)\>

## Returns

`object`

### builder

> **builder**: `BfeBuilderFunction`\<[`CustomCliArguments`](../type-aliases/CustomCliArguments.md), [`GlobalExecutionContext`](../../configure/type-aliases/GlobalExecutionContext.md)\>

### description

> **description**: `string` = `"A collection of commands for interacting with Xunnamius's NPM-based projects"`

### handler()

> **handler**: (`argv`) => `Promisable`\<`void`\>

#### Parameters

##### argv

`Arguments`\<[`CustomCliArguments`](../type-aliases/CustomCliArguments.md), [`GlobalExecutionContext`](../../configure/type-aliases/GlobalExecutionContext.md)\>

#### Returns

`Promisable`\<`void`\>

### name

> **name**: `string` = `globalCliName`

### usage

> **usage**: `string`
