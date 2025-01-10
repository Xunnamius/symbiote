[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/configure](../README.md) / GlobalExecutionContext

# Type Alias: GlobalExecutionContext

> **GlobalExecutionContext**: `StandardExecutionContext` & `object`

Defined in: [src/configure.ts:41](https://github.com/Xunnamius/symbiote/blob/ecdd713c4d242b92209fafa38beadafe2769795c/src/configure.ts#L41)

## Type declaration

### isUsingLocalInstallation

> **isUsingLocalInstallation**: `boolean`

Whether symbiote is being run from within the current project or from
elsewhere in the filesystem.

### projectMetadata

> **projectMetadata**: `ProjectMetadata` \| `undefined`

A collection of useful information about the current project. Never
includes unnamed workspace packages.
