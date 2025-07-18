[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / defaultCustomReplacer

# Function: defaultCustomReplacer()

> **defaultCustomReplacer**(`objValue`, `srcValue`, `key`, `object`, `source`): `undefined` \| `any`[]

Defined in: [src/assets.ts:659](https://github.com/Xunnamius/symbiote/blob/b9e599602cbc0f1d65b094b7a5e8739743f64fd2/src/assets.ts#L659)

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
