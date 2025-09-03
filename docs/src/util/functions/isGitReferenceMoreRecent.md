[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / isGitReferenceMoreRecent

# Function: isGitReferenceMoreRecent()

> **isGitReferenceMoreRecent**(`ref`, `moreRecentThan`): `Promise`\<`boolean`\>

Defined in: [src/util.ts:1195](https://github.com/Xunnamius/symbiote/blob/5baec034070630bef8d87e6af86e863ce8273a75/src/util.ts#L1195)

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
