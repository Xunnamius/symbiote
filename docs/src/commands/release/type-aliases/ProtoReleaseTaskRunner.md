[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ProtoReleaseTaskRunner

# Type Alias: ProtoReleaseTaskRunner()

> **ProtoReleaseTaskRunner** = (`executionContext`, `argv`, `taskContext`) => `ReturnType`\<[`ReleaseTaskRunner`](ReleaseTaskRunner.md)\>

Defined in: [src/commands/release.ts:153](https://github.com/Xunnamius/symbiote/blob/69d7b76e5696ff589285094e16ec41aa92317af3/src/commands/release.ts#L153)

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
