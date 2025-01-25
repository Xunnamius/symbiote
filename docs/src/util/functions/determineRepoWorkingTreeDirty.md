[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / determineRepoWorkingTreeDirty

# Function: determineRepoWorkingTreeDirty()

> **determineRepoWorkingTreeDirty**(): `Promise`\<\{ `gitStatusExitCode`: `undefined` \| `number`; `gitStatusOutput`: `undefined` \| `string` \| `unknown`[] \| `string`[] \| `Uint8Array`; `isDirty`: `boolean`; \}\>

Defined in: [src/util.ts:393](https://github.com/Xunnamius/symbiote/blob/5a6b8fdd6bad1753f065e8a0fabc20b629cd4120/src/util.ts#L393)

If `gitStatusOutput` is not empty or `gitStatusExitCode` is non-zero, then
the current working tree is dirty. This can be checked quickly via the
`isDirty` property.

## Returns

`Promise`\<\{ `gitStatusExitCode`: `undefined` \| `number`; `gitStatusOutput`: `undefined` \| `string` \| `unknown`[] \| `string`[] \| `Uint8Array`; `isDirty`: `boolean`; \}\>
