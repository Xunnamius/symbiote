[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / isGitReferenceMoreRecent

# Function: isGitReferenceMoreRecent()

> **isGitReferenceMoreRecent**(`ref`, `moreRecentThan`): `Promise`\<`boolean`\>

Defined in: [src/util.ts:1223](https://github.com/Xunnamius/symbiote/blob/4058415994948905c0e64092da29324812f36a24/src/util.ts#L1223)

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
