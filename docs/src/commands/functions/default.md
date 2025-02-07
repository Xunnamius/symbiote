[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/commands](../README.md) / default

# Function: default()

> **default**(`__namedParameters`): `object`

Defined in: [src/commands/index.ts:20](https://github.com/Xunnamius/symbiote/blob/b82f5db0ddf304d345bd71e41da6d798adaa5156/src/commands/index.ts#L20)

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
