[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/deploy](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments**: [`GlobalCliArguments`](../../../configure/type-aliases/GlobalCliArguments.md)\<[`ThisPackageGlobalScope`](../../../configure/enumerations/ThisPackageGlobalScope.md)\> & `object` & \{ `preview`: `boolean`; `previewUrl`: `string`; `production`: `boolean`; `target`: [`Vercel`](../enumerations/DeployTarget.md#vercel); \} \| \{ `host`: `string`; `target`: [`Ssh`](../enumerations/DeployTarget.md#ssh); `toPath`: `string`; \}

Defined in: [src/commands/deploy.ts:38](https://github.com/Xunnamius/symbiote/blob/51eddb5973356cb1aa2a534c04d214fae24d5526/src/commands/deploy.ts#L38)

## Type declaration

### target

> **target**: [`DeployTarget`](../enumerations/DeployTarget.md)
