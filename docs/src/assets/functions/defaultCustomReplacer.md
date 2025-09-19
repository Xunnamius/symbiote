[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / defaultCustomReplacer

# Function: defaultCustomReplacer()

> **defaultCustomReplacer**(`objValue`, `srcValue`, `key`, `object`, `source`): `undefined` \| `any`[]

Defined in: [src/assets.ts:668](https://github.com/Xunnamius/symbiote/blob/25135a1844b8500302680a71b90428852179ec2c/src/assets.ts#L668)

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
