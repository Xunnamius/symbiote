[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / deepMergeConfig

# Function: deepMergeConfig()

> **deepMergeConfig**\<`ConfigurationType`\>(`originalConfiguration`, `overwrites`, `customReplacer`): `ConfigurationType`

Defined in: [src/assets.ts:632](https://github.com/Xunnamius/symbiote/blob/6c12fe85338c1ca20a9b3dedd0e391ce548a98a4/src/assets.ts#L632)

A thin wrapper around lodash's mergeWith that does not mutate
`originalConfiguration`.

By default, a custom replacer is provided that **does not** recursively merge
array values, only a shallow non-recursive merge is performed (latter array
values are concatenated to the old array). Additionally, `undefined`
properties will unset previously defined properties.

## Type Parameters

### ConfigurationType

`ConfigurationType`

## Parameters

### originalConfiguration

`ConfigurationType`

### overwrites

`ConfigurationType` | `EmptyObject`

### customReplacer

(`value`, `srcValue`, `key`, `object`, `source`, `stack`) => `any`

## Returns

`ConfigurationType`

## See

 - [defaultCustomReplacer](defaultCustomReplacer.md)
 - https://lodash.info/doc/merge
