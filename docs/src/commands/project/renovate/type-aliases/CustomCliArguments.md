[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/project/renovate](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../../configure/type-aliases/GlobalCliArguments.md) & `object` & `CamelCasedProperties`\<`Record`\<keyof *typeof* [`renovationTasks`](../variables/renovationTasks.md), `boolean`\> & `Partial`\<`Record`\<`KeysOfUnion`\<*typeof* [`renovationTasks`](../variables/renovationTasks.md)\[keyof *typeof* [`renovationTasks`](../variables/renovationTasks.md)\]\[`"subOptions"`\]\>, `unknown`\>\>\>

Defined in: [src/commands/project/renovate.ts:274](https://github.com/Xunnamius/symbiote/blob/beb889fb40f0cd320367d5f94d02e29b1efb13ab/src/commands/project/renovate.ts#L274)

## Type declaration

### force

> **force**: `boolean`

### parallel

> **parallel**: `boolean`

### runToCompletion

> **runToCompletion**: `boolean`
