[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / isGitReferenceMoreRecent

# Function: isGitReferenceMoreRecent()

> **isGitReferenceMoreRecent**(`ref`, `moreRecentThan`): `Promise`\<`boolean`\>

Defined in: [src/util.ts:1210](https://github.com/Xunnamius/symbiote/blob/1d06f9ec4e479041c7ca032d17fcdd92ac8edf8e/src/util.ts#L1210)

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
