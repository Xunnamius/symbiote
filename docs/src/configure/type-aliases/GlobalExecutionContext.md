[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/configure](../README.md) / GlobalExecutionContext

# Type Alias: GlobalExecutionContext

> **GlobalExecutionContext** = `StandardExecutionContext` & `object`

Defined in: [src/configure.ts:49](https://github.com/Xunnamius/symbiote/blob/5bc8cc1bc3878913c89597fb873ade336adb86bd/src/configure.ts#L49)

## Type declaration

### isUsingLocalInstallation

> **isUsingLocalInstallation**: `boolean`

Whether symbiote is being run from within the current project or from
elsewhere in the filesystem.

### projectMetadata

> **projectMetadata**: `ProjectMetadata` \| `undefined`

A collection of useful information about the current project. Never
includes unnamed workspace packages.
