[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/configure](../README.md) / GlobalExecutionContext

# Type Alias: GlobalExecutionContext

> **GlobalExecutionContext**: `StandardExecutionContext` & `object`

Defined in: [src/configure.ts:42](https://github.com/Xunnamius/symbiote/blob/03d0f5ec06412a1a9df5554ab91ab42206eb76e6/src/configure.ts#L42)

## Type declaration

### isUsingLocalInstallation

> **isUsingLocalInstallation**: `boolean`

Whether symbiote is being run from within the current project or from
elsewhere in the filesystem.

### projectMetadata

> **projectMetadata**: `ProjectMetadata` \| `undefined`

A collection of useful information about the current project. Never
includes unnamed workspace packages.
