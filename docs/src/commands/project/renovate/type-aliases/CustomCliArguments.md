[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/project/renovate](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../../configure/type-aliases/GlobalCliArguments.md) & `object` & `CamelCasedProperties`\<`Record`\<keyof *typeof* `renovationTasks`, `boolean`\> & `Partial`\<`Record`\<`KeysOfUnion`\<*typeof* `renovationTasks`\[keyof *typeof* `renovationTasks`\]\[`"subOptions"`\]\>, `unknown`\>\>\>

Defined in: [src/commands/project/renovate.ts:274](https://github.com/Xunnamius/symbiote/blob/877e3120bdc7f2c76a05ae6085d5ac57197fd79f/src/commands/project/renovate.ts#L274)

## Type declaration

### force

> **force**: `boolean`

### parallel

> **parallel**: `boolean`

### runToCompletion

> **runToCompletion**: `boolean`
