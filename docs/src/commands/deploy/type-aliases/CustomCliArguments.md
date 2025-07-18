[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/deploy](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../configure/type-aliases/GlobalCliArguments.md)\<[`ThisPackageGlobalScope`](../../../configure/enumerations/ThisPackageGlobalScope.md)\> & `object` & \{ `preview`: `boolean`; `previewUrl?`: `string`; `production?`: `boolean`; `target`: [`Vercel`](../enumerations/DeployTarget.md#vercel); \} \| \{ `host`: `string`; `target`: [`Ssh`](../enumerations/DeployTarget.md#ssh); `toPath`: `string`; `userGroup`: `string`; \}

Defined in: [src/commands/deploy.ts:38](https://github.com/Xunnamius/symbiote/blob/b9e599602cbc0f1d65b094b7a5e8739743f64fd2/src/commands/deploy.ts#L38)

## Type declaration

### target

> **target**: [`DeployTarget`](../enumerations/DeployTarget.md)
