[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / determineRepoWorkingTreeDirty

# Function: determineRepoWorkingTreeDirty()

> **determineRepoWorkingTreeDirty**(): `Promise`\<\{ `gitStatusExitCode`: `undefined` \| `number`; `gitStatusOutput`: `string`; `isDirty`: `boolean`; \}\>

Defined in: [src/util.ts:372](https://github.com/Xunnamius/symbiote/blob/69d7b76e5696ff589285094e16ec41aa92317af3/src/util.ts#L372)

If `gitStatusOutput` is not empty or `gitStatusExitCode` is non-zero, then
the current working tree is dirty. This can be checked quickly via the
`isDirty` property.

## Returns

`Promise`\<\{ `gitStatusExitCode`: `undefined` \| `number`; `gitStatusOutput`: `string`; `isDirty`: `boolean`; \}\>
