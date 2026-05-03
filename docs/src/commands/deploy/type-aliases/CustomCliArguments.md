[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/deploy](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../configure/type-aliases/GlobalCliArguments.md)\<[`ThisPackageGlobalScope`](../../../configure/enumerations/ThisPackageGlobalScope.md)\> & `object` & \{ `preview`: `boolean`; `previewUrl?`: `string`; `production?`: `boolean`; `target`: [`Vercel`](../enumerations/DeployTarget.md#vercel); \} \| \{ `host`: `string`; `target`: [`Ssh`](../enumerations/DeployTarget.md#ssh); `toPath`: `string`; `userGroup`: `string`; \}

Defined in: [src/commands/deploy.ts:38](https://github.com/Xunnamius/symbiote/blob/4622d77b8dbe6c643a89cc16b7f2f59cc5d27edf/src/commands/deploy.ts#L38)

## Type Declaration

### target

> **target**: [`DeployTarget`](../enumerations/DeployTarget.md)
