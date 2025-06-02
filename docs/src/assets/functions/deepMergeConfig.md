[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / deepMergeConfig

# Function: deepMergeConfig()

> **deepMergeConfig**\<`ConfigurationType`\>(`originalConfiguration`, `overwrites`, `customReplacer?`): `ConfigurationType`

Defined in: [src/assets.ts:624](https://github.com/Xunnamius/symbiote/blob/450f56aebb4b9ee6be666259169f3898916253ca/src/assets.ts#L624)

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
