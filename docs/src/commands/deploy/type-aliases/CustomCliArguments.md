[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/deploy](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../configure/type-aliases/GlobalCliArguments.md)\<[`ThisPackageGlobalScope`](../../../configure/enumerations/ThisPackageGlobalScope.md)\> & `object` & \{ `preview`: `boolean`; `previewUrl?`: `string`; `production?`: `boolean`; `target`: [`Vercel`](../enumerations/DeployTarget.md#vercel); \} \| \{ `host`: `string`; `target`: [`Ssh`](../enumerations/DeployTarget.md#ssh); `toPath`: `string`; \}

Defined in: [src/commands/deploy.ts:38](https://github.com/Xunnamius/symbiote/blob/a1f5561e6e036b3d2f78a95f5bba872cff737ed5/src/commands/deploy.ts#L38)

## Type declaration

### target

> **target**: [`DeployTarget`](../enumerations/DeployTarget.md)
