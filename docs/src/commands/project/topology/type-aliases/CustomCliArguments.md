[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/project/topology](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../../configure/type-aliases/GlobalCliArguments.md)\<[`UnlimitedGlobalScope`](../../../../configure/enumerations/UnlimitedGlobalScope.md)\> & `object` & \{ `describe`: `false`; `runScript`: [`TopologyScript`](../enumerations/TopologyScript.md); \} \| \{ `describe`: `true`; `runScript?`: `undefined`; \}

Defined in: [src/commands/project/topology.ts:46](https://github.com/Xunnamius/symbiote/blob/cdf76d04fad879da3fde112c8b68cb31ead45b72/src/commands/project/topology.ts#L46)

## Type declaration

### parallel

> **parallel**: `boolean`

### runToCompletion

> **runToCompletion**: `boolean`

### scriptOptions

> **scriptOptions**: `string`[]

### skipPackages

> **skipPackages**: `RegExp`[]
