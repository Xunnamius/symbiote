[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / defaultCustomReplacer

# Function: defaultCustomReplacer()

> **defaultCustomReplacer**(`objValue`, `srcValue`, `key`, `object`, `source`): `undefined` \| `any`[]

Defined in: [src/assets.ts:652](https://github.com/Xunnamius/symbiote/blob/d690f89078e542b7ce30292e44cc1a492eab16bd/src/assets.ts#L652)

Custom lodash merge customizer that causes successive `undefined` source
values to unset (delete) the destination property if it exists, and to
completely overwrite the destination property if the source property is an
array.

Additionally, this customizer **does not** recursively merge array values,
only a shallow non-recursive merge is performed (latter array values are
concatenated to the old array).

## Parameters

### objValue

`unknown`

### srcValue

`unknown`

### key

`string`

### object

`undefined` | `Record`\<`string`, `unknown`\>

### source

`undefined` | `Record`\<`string`, `unknown`\>

## Returns

`undefined` \| `any`[]

## See

https://lodash.com/docs/4.17.15#mergeWith
