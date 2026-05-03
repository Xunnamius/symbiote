[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/project/renovate](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../../configure/type-aliases/GlobalCliArguments.md) & `object` & `CamelCasedProperties`\<`Record`\<keyof *typeof* `renovationTasks`, `boolean`\> & `Partial`\<`Record`\<`KeysOfUnion`\<*typeof* `renovationTasks`\[keyof *typeof* `renovationTasks`\]\[`"subOptions"`\]\>, `unknown`\>\>\>

Defined in: [src/commands/project/renovate.ts:279](https://github.com/Xunnamius/symbiote/blob/4622d77b8dbe6c643a89cc16b7f2f59cc5d27edf/src/commands/project/renovate.ts#L279)

## Type Declaration

### force

> **force**: `boolean`

### parallel

> **parallel**: `boolean`

### runToCompletion

> **runToCompletion**: `boolean`
