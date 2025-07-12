[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / isGitReferenceMoreRecent

# Function: isGitReferenceMoreRecent()

> **isGitReferenceMoreRecent**(`ref`, `moreRecentThan`): `Promise`\<`boolean`\>

Defined in: [src/util.ts:1197](https://github.com/Xunnamius/symbiote/blob/83ef2df2474c2254d82f0b3ae0574d283c20aaeb/src/util.ts#L1197)

Returns `true` if `ref` is "more recent than" `moreRecentThan`.

In other words: `true` is returned iff `moreRecentThan` is or points to a
commit that is an ancestor of `ref`. Returns `false` otherwise, including
when `ref === moreRecentThan`.

## Parameters

### ref

`string`

### moreRecentThan

`string`

## Returns

`Promise`\<`boolean`\>
