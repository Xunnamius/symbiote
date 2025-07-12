[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / determineRepoWorkingTreeDirty

# Function: determineRepoWorkingTreeDirty()

> **determineRepoWorkingTreeDirty**(): `Promise`\<\{ `gitStatusExitCode`: `undefined` \| `number`; `gitStatusOutput`: `string`; `isDirty`: `boolean`; \}\>

Defined in: [src/util.ts:372](https://github.com/Xunnamius/symbiote/blob/b62abf3b41ef4fb16014d3e799397a1e70b68b47/src/util.ts#L372)

If `gitStatusOutput` is not empty or `gitStatusExitCode` is non-zero, then
the current working tree is dirty. This can be checked quickly via the
`isDirty` property.

## Returns

`Promise`\<\{ `gitStatusExitCode`: `undefined` \| `number`; `gitStatusOutput`: `string`; `isDirty`: `boolean`; \}\>
