[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/distributables](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments**: [`GlobalCliArguments`](../../../../configure/type-aliases/GlobalCliArguments.md)\<[`ThisPackageGlobalScope`](../../../../configure/enumerations/ThisPackageGlobalScope.md)\> & `object`

Defined in: [src/commands/build/distributables.ts:147](https://github.com/Xunnamius/symbiote/blob/261741e26a03ae661b506c3872cb86af79a07f11/src/commands/build/distributables.ts#L147)

## Type declaration

### allowRootverseNodeModules

> **allowRootverseNodeModules**: `boolean`

### cleanOutputDir

> **cleanOutputDir**: `boolean`

### excludeInternalFiles?

> `optional` **excludeInternalFiles**: `Path`[]

### generateIntermediatesFor?

> `optional` **generateIntermediatesFor**: [`IntermediateTranspilationEnvironment`](../enumerations/IntermediateTranspilationEnvironment.md)

### generateTypes?

> `optional` **generateTypes**: `boolean`

### includeExternalAssets?

> `optional` **includeExternalAssets**: `Path`[]

### includeExternalFiles?

> `optional` **includeExternalFiles**: `Path`[]

### linkCliIntoBin?

> `optional` **linkCliIntoBin**: `boolean`

### moduleSystem?

> `optional` **moduleSystem**: [`ModuleSystem`](../enumerations/ModuleSystem.md)

### multiversal

> **multiversal**: `boolean`

### outputExtension?

> `optional` **outputExtension**: `string`

### partialFilter?

> `optional` **partialFilter**: `RegExp`[]

### prependShebang?

> `optional` **prependShebang**: `boolean`

### skipOutputBijectionCheckFor?

> `optional` **skipOutputBijectionCheckFor**: (`string` \| `RegExp`)[]

### skipOutputChecks?

> `optional` **skipOutputChecks**: `boolean`

### skipOutputExtraneityCheckFor?

> `optional` **skipOutputExtraneityCheckFor**: (`string` \| `RegExp`)[]

### skipOutputValidityCheckFor?

> `optional` **skipOutputValidityCheckFor**: (`string` \| `RegExp`)[]
