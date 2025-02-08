[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / isGitReferenceMoreRecent

# Function: isGitReferenceMoreRecent()

> **isGitReferenceMoreRecent**(`ref`, `moreRecentThan`): `Promise`\<`boolean`\>

Defined in: [src/util.ts:1210](https://github.com/Xunnamius/symbiote/blob/559506ed93a747d618979a74bc2b1db446959ba9/src/util.ts#L1210)

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
