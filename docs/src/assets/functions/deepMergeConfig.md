[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / deepMergeConfig

# Function: deepMergeConfig()

> **deepMergeConfig**\<`ConfigurationType`\>(`originalConfiguration`, `overwrites`, `customReplacer`): `ConfigurationType`

Defined in: [src/assets.ts:648](https://github.com/Xunnamius/symbiote/blob/f1a40b5448c4c0e7d4ef29eadf33bfec36be686d/src/assets.ts#L648)

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
