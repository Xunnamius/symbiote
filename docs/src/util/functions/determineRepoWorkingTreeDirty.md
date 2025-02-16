[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / determineRepoWorkingTreeDirty

# Function: determineRepoWorkingTreeDirty()

> **determineRepoWorkingTreeDirty**(): `Promise`\<\{ `gitStatusExitCode`: `undefined` \| `number`; `gitStatusOutput`: `undefined` \| `string` \| `unknown`[] \| `string`[] \| `Uint8Array`\<`ArrayBufferLike`\>; `isDirty`: `boolean`; \}\>

Defined in: [src/util.ts:376](https://github.com/Xunnamius/symbiote/blob/261741e26a03ae661b506c3872cb86af79a07f11/src/util.ts#L376)

If `gitStatusOutput` is not empty or `gitStatusExitCode` is non-zero, then
the current working tree is dirty. This can be checked quickly via the
`isDirty` property.

## Returns

`Promise`\<\{ `gitStatusExitCode`: `undefined` \| `number`; `gitStatusOutput`: `undefined` \| `string` \| `unknown`[] \| `string`[] \| `Uint8Array`\<`ArrayBufferLike`\>; `isDirty`: `boolean`; \}\>
