[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/deploy](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments**: [`GlobalCliArguments`](../../../configure/type-aliases/GlobalCliArguments.md)\<[`ThisPackageGlobalScope`](../../../configure/enumerations/ThisPackageGlobalScope.md)\> & `object` & \{ `preview`: `boolean`; `previewUrl`: `string`; `production`: `boolean`; `target`: [`Vercel`](../enumerations/DeployTarget.md#vercel); \} \| \{ `host`: `string`; `target`: [`Ssh`](../enumerations/DeployTarget.md#ssh); `toPath`: `string`; \}

Defined in: [src/commands/deploy.ts:48](https://github.com/Xunnamius/symbiote/blob/ff6ce22d3a3433c07460af5758ce7920a1d9aa5a/src/commands/deploy.ts#L48)

## Type declaration

### target

> **target**: [`DeployTarget`](../enumerations/DeployTarget.md)
