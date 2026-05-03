[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ProtoReleaseTaskRunner

# Type Alias: ProtoReleaseTaskRunner

> **ProtoReleaseTaskRunner** = (`executionContext`, `argv`, `taskContext`) => `ReturnType`\<[`ReleaseTaskRunner`](ReleaseTaskRunner.md)\>

Defined in: [src/commands/release.ts:158](https://github.com/Xunnamius/symbiote/blob/c224670ed4152319490e37dbcda7cf2d057821a9/src/commands/release.ts#L158)

A partial release task with loose typings for quickly authoring new tasks.

## Parameters

### executionContext

[`ExecutionContextWithProjectMetadata`](ExecutionContextWithProjectMetadata.md)

### argv

`Parameters`\<`NonNullable`\<`ReturnType`\<*typeof* [`default`](../functions/default.md)\>\[`"handler"`\]\>\>\[`0`\]

### taskContext

[`ReleaseTaskContext`](ReleaseTaskContext.md)

## Returns

`ReturnType`\<[`ReleaseTaskRunner`](ReleaseTaskRunner.md)\>
