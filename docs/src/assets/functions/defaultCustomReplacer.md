[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / defaultCustomReplacer

# Function: defaultCustomReplacer()

> **defaultCustomReplacer**(`objValue`, `srcValue`, `key`, `object`, `source`): `any`[] \| `undefined`

Defined in: [src/assets.ts:668](https://github.com/Xunnamius/symbiote/blob/f20b0099c70f0313928eae8f1b370bfc00e9dda1/src/assets.ts#L668)

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

`Record`\<`string`, `unknown`\> \| `undefined`

### source

`Record`\<`string`, `unknown`\> \| `undefined`

## Returns

`any`[] \| `undefined`

## See

https://lodash.com/docs/4.17.15#mergeWith
