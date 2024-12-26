[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/deploy](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments**: [`GlobalCliArguments`](../../../configure/type-aliases/GlobalCliArguments.md)\<[`ThisPackageGlobalScope`](../../../configure/enumerations/ThisPackageGlobalScope.md)\> & `object` & \{ `preview`: `boolean`; `previewUrl`: `string`; `production`: `boolean`; `target`: [`Vercel`](../enumerations/DeployTarget.md#vercel); \} \| \{ `host`: `string`; `target`: [`Ssh`](../enumerations/DeployTarget.md#ssh); `toPath`: `string`; \}

## Type declaration

### target

> **target**: [`DeployTarget`](../enumerations/DeployTarget.md)

## Defined in

[src/commands/deploy.ts:48](https://github.com/Xunnamius/symbiote/blob/26e756362a16f050e03cef2c4c582d94e29614cd/src/commands/deploy.ts#L48)
