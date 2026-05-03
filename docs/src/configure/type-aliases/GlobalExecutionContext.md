[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/configure](../README.md) / GlobalExecutionContext

# Type Alias: GlobalExecutionContext

> **GlobalExecutionContext** = `StandardExecutionContext` & `object`

Defined in: [src/configure.ts:49](https://github.com/Xunnamius/symbiote/blob/71cf4058a7d60956563b1b93abfba27549fc9444/src/configure.ts#L49)

## Type Declaration

### isUsingLocalInstallation

> **isUsingLocalInstallation**: `boolean`

Whether symbiote is being run from within the current project or from
elsewhere in the filesystem.

### projectMetadata

> **projectMetadata**: `ProjectMetadata` \| `undefined`

A collection of useful information about the current project. Never
includes unnamed workspace packages.
