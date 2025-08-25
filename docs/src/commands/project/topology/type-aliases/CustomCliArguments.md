[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/project/topology](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../../configure/type-aliases/GlobalCliArguments.md)\<[`UnlimitedGlobalScope`](../../../../configure/enumerations/UnlimitedGlobalScope.md)\> & `object` & \{ `describe`: `false`; `runScript`: [`TopologyScript`](../enumerations/TopologyScript.md); \} \| \{ `describe`: `true`; `runScript?`: `undefined`; \}

Defined in: [src/commands/project/topology.ts:46](https://github.com/Xunnamius/symbiote/blob/8c20d618d9f5aba2b98dbaa28f75ebe8791b6067/src/commands/project/topology.ts#L46)

## Type Declaration

### parallel

> **parallel**: `boolean`

### runToCompletion

> **runToCompletion**: `boolean`

### scriptOptions

> **scriptOptions**: `string`[]

### skipPackages

> **skipPackages**: `RegExp`[]
