[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/project/topology](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../../configure/type-aliases/GlobalCliArguments.md)\<[`UnlimitedGlobalScope`](../../../../configure/enumerations/UnlimitedGlobalScope.md)\> & `object` & \{ `describe`: `false`; `runScript`: [`TopologyScript`](../enumerations/TopologyScript.md); \} \| \{ `describe`: `true`; `runScript?`: `undefined`; \}

Defined in: [src/commands/project/topology.ts:46](https://github.com/Xunnamius/symbiote/blob/69d7b76e5696ff589285094e16ec41aa92317af3/src/commands/project/topology.ts#L46)

## Type declaration

### parallel

> **parallel**: `boolean`

### runToCompletion

> **runToCompletion**: `boolean`

### scriptOptions

> **scriptOptions**: `string`[]

### skipPackages

> **skipPackages**: `RegExp`[]
