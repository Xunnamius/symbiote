[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/distributables](../README.md) / CustomCliArguments

# Type Alias: CustomCliArguments

> **CustomCliArguments** = [`GlobalCliArguments`](../../../../configure/type-aliases/GlobalCliArguments.md)\<[`ThisPackageGlobalScope`](../../../../configure/enumerations/ThisPackageGlobalScope.md)\> & `object`

Defined in: [src/commands/build/distributables.ts:152](https://github.com/Xunnamius/symbiote/blob/d58f752a47908197bf2e7050b119b5cca3d1f350/src/commands/build/distributables.ts#L152)

## Type Declaration

### allowIncompatibleCoreJs

> **allowIncompatibleCoreJs**: `boolean`

### allowMultiversalImportsInNonSource

> **allowMultiversalImportsInNonSource**: `boolean`

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

### skipOutputTypeResolutionChecks?

> `optional` **skipOutputTypeResolutionChecks**: `boolean`

### skipOutputValidityCheckFor?

> `optional` **skipOutputValidityCheckFor**: (`string` \| `RegExp`)[]
