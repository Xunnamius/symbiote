[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / deepMergeConfig

# Function: deepMergeConfig()

> **deepMergeConfig**\<`ConfigurationType`\>(`originalConfiguration`, `overwrites`, `customReplacer?`): `ConfigurationType`

Defined in: [src/assets.ts:624](https://github.com/Xunnamius/symbiote/blob/7fbd108cee2f783e7fe92308d969f39ae3bc1d0c/src/assets.ts#L624)

A thin wrapper around lodash's mergeWith that does not mutate
`originalConfiguration`.

## Type Parameters

### ConfigurationType

`ConfigurationType`

## Parameters

### originalConfiguration

`ConfigurationType`

### overwrites

`ConfigurationType` | `EmptyObject`

### customReplacer?

(`value`, `srcValue`, `key`, `object`, `source`, `stack`) => `any`

## Returns

`ConfigurationType`
