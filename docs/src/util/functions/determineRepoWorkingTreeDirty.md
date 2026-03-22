[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / determineRepoWorkingTreeDirty

# Function: determineRepoWorkingTreeDirty()

> **determineRepoWorkingTreeDirty**(): `Promise`\<\{ `gitStatusExitCode`: `number` \| `undefined`; `gitStatusOutput`: `string`; `isDirty`: `boolean`; \}\>

Defined in: [src/util.ts:372](https://github.com/Xunnamius/symbiote/blob/68dd659d6dfd3bcf6be03ab6772222ae59d5b644/src/util.ts#L372)

If `gitStatusOutput` is not empty or `gitStatusExitCode` is non-zero, then
the current working tree is dirty. This can be checked quickly via the
`isDirty` property.

## Returns

`Promise`\<\{ `gitStatusExitCode`: `number` \| `undefined`; `gitStatusOutput`: `string`; `isDirty`: `boolean`; \}\>
