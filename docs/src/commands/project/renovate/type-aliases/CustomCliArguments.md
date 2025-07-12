[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/project/renovate](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../../configure/type-aliases/GlobalCliArguments.md) & `object` & `CamelCasedProperties`\<`Record`\<keyof *typeof* `renovationTasks`, `boolean`\> & `Partial`\<`Record`\<`KeysOfUnion`\<*typeof* `renovationTasks`\[keyof *typeof* `renovationTasks`\]\[`"subOptions"`\]\>, `unknown`\>\>\>

Defined in: [src/commands/project/renovate.ts:274](https://github.com/Xunnamius/symbiote/blob/b62abf3b41ef4fb16014d3e799397a1e70b68b47/src/commands/project/renovate.ts#L274)

## Type declaration

### force

> **force**: `boolean`

### parallel

> **parallel**: `boolean`

### runToCompletion

> **runToCompletion**: `boolean`
