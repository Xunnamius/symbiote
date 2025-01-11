[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / determineRepoWorkingTreeDirty

# Function: determineRepoWorkingTreeDirty()

> **determineRepoWorkingTreeDirty**(): `Promise`\<\{ `gitStatusExitCode`: `undefined` \| `number`; `gitStatusOutput`: `undefined` \| `string` \| `unknown`[] \| `string`[] \| `Uint8Array`; `isDirty`: `boolean`; \}\>

Defined in: [src/util.ts:393](https://github.com/Xunnamius/symbiote/blob/130931259fdc2fa9b7d2a06a4f7ac8fdd407e67a/src/util.ts#L393)

If `gitStatusOutput` is not empty or `gitStatusExitCode` is non-zero, then
the current working tree is dirty. This can be checked quickly via the
`isDirty` property.

## Returns

`Promise`\<\{ `gitStatusExitCode`: `undefined` \| `number`; `gitStatusOutput`: `undefined` \| `string` \| `unknown`[] \| `string`[] \| `Uint8Array`; `isDirty`: `boolean`; \}\>
