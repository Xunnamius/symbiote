[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/configure](../README.md) / GlobalExecutionContext

# Type Alias: GlobalExecutionContext

> **GlobalExecutionContext**: `StandardExecutionContext` & `object`

Defined in: [src/configure.ts:42](https://github.com/Xunnamius/symbiote/blob/5a6b8fdd6bad1753f065e8a0fabc20b629cd4120/src/configure.ts#L42)

## Type declaration

### isUsingLocalInstallation

> **isUsingLocalInstallation**: `boolean`

Whether symbiote is being run from within the current project or from
elsewhere in the filesystem.

### projectMetadata

> **projectMetadata**: `ProjectMetadata` \| `undefined`

A collection of useful information about the current project. Never
includes unnamed workspace packages.
