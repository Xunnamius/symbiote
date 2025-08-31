[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ProtoReleaseTaskRunner

# Type Alias: ProtoReleaseTaskRunner()

> **ProtoReleaseTaskRunner** = (`executionContext`, `argv`, `taskContext`) => `ReturnType`\<[`ReleaseTaskRunner`](ReleaseTaskRunner.md)\>

Defined in: [src/commands/release.ts:158](https://github.com/Xunnamius/symbiote/blob/dc192a66d47b6c3a3464852ad43eb71fe137ca73/src/commands/release.ts#L158)

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
