[**@-xun/scripts**](../../../../README.md) • **Docs**

***

[@-xun/scripts](../../../../README.md) / [src/commands/build](../README.md) / default

# Function: default()

> **default**(`globalExecutionContext`): `object`

## Parameters

• **globalExecutionContext**: [`AsStrictExecutionContext`](../../../../lib/@black-flag/extensions/type-aliases/AsStrictExecutionContext.md)\<[`GlobalExecutionContext`](../../../configure/type-aliases/GlobalExecutionContext.md)\>

## Returns

`object`

### aliases

> **aliases**: `never`[] = `[]`

### builder

> **builder**: [`BfeBuilderFunction`](../../../../lib/@black-flag/extensions/type-aliases/BfeBuilderFunction.md)\<[`CustomCliArguments`](../distributables/type-aliases/CustomCliArguments.md), [`GlobalExecutionContext`](../../../configure/type-aliases/GlobalExecutionContext.md)\>

### description

> **description**: `string` = `'Transpile source and assets into production-ready distributables'`

### handler()

> **handler**: (`argv`) => `Promisable`\<`void`\>

#### Parameters

• **argv**: `Arguments`\<[`CustomCliArguments`](../distributables/type-aliases/CustomCliArguments.md), [`GlobalExecutionContext`](../../../configure/type-aliases/GlobalExecutionContext.md)\>

#### Returns

`Promisable`\<`void`\>

### usage

> **usage**: `string`

## Defined in

[src/commands/build/index.ts:13](https://github.com/Xunnamius/xscripts/blob/05e56e787e73d42855fcd3ce10aff7f8f6e6c4c7/src/commands/build/index.ts#L13)