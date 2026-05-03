[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/project/renovate](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../../configure/type-aliases/GlobalCliArguments.md) & `object` & `CamelCasedProperties`\<`Record`\<keyof *typeof* `renovationTasks`, `boolean`\> & `Partial`\<`Record`\<`KeysOfUnion`\<*typeof* `renovationTasks`\[keyof *typeof* `renovationTasks`\]\[`"subOptions"`\]\>, `unknown`\>\>\>

Defined in: [src/commands/project/renovate.ts:279](https://github.com/Xunnamius/symbiote/blob/f20b0099c70f0313928eae8f1b370bfc00e9dda1/src/commands/project/renovate.ts#L279)

## Type Declaration

### force

> **force**: `boolean`

### parallel

> **parallel**: `boolean`

### runToCompletion

> **runToCompletion**: `boolean`
