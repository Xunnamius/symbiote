[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/deploy](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../configure/type-aliases/GlobalCliArguments.md)\<[`ThisPackageGlobalScope`](../../../configure/enumerations/ThisPackageGlobalScope.md)\> & `object` & \{ `preview`: `boolean`; `previewUrl?`: `string`; `production?`: `boolean`; `target`: [`Vercel`](../enumerations/DeployTarget.md#vercel); \} \| \{ `host`: `string`; `target`: [`Ssh`](../enumerations/DeployTarget.md#ssh); `toPath`: `string`; `userGroup`: `string`; \}

Defined in: [src/commands/deploy.ts:38](https://github.com/Xunnamius/symbiote/blob/c224670ed4152319490e37dbcda7cf2d057821a9/src/commands/deploy.ts#L38)

## Type Declaration

### target

> **target**: [`DeployTarget`](../enumerations/DeployTarget.md)
