[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/project/topology](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../../configure/type-aliases/GlobalCliArguments.md)\<[`UnlimitedGlobalScope`](../../../../configure/enumerations/UnlimitedGlobalScope.md)\> & `object` & \{ `describe`: `false`; `runScript`: [`TopologyScript`](../enumerations/TopologyScript.md); \} \| \{ `describe`: `true`; `runScript?`: `undefined`; \}

Defined in: [src/commands/project/topology.ts:46](https://github.com/Xunnamius/symbiote/blob/d4d5b078ef9485d85dd433ed75cef391a4a9376d/src/commands/project/topology.ts#L46)

## Type Declaration

### parallel

> **parallel**: `boolean`

### runToCompletion

> **runToCompletion**: `boolean`

### scriptOptions

> **scriptOptions**: `string`[]

### skipPackages

> **skipPackages**: `RegExp`[]
