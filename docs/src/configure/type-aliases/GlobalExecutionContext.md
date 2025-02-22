[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/configure](../README.md) / GlobalExecutionContext

# Type Alias: GlobalExecutionContext

> **GlobalExecutionContext**: `StandardExecutionContext` & `object`

Defined in: [src/configure.ts:49](https://github.com/Xunnamius/symbiote/blob/3911bb5748d7ecd905ce3bbd9106aa0ea0787160/src/configure.ts#L49)

## Type declaration

### isUsingLocalInstallation

> **isUsingLocalInstallation**: `boolean`

Whether symbiote is being run from within the current project or from
elsewhere in the filesystem.

### projectMetadata

> **projectMetadata**: `ProjectMetadata` \| `undefined`

A collection of useful information about the current project. Never
includes unnamed workspace packages.
