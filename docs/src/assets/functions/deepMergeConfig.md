[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / deepMergeConfig

# Function: deepMergeConfig()

> **deepMergeConfig**\<`ConfigurationType`\>(`originalConfiguration`, `overwrites`, `customReplacer`?): `ConfigurationType`

Defined in: [src/assets.ts:606](https://github.com/Xunnamius/symbiote/blob/ecdd713c4d242b92209fafa38beadafe2769795c/src/assets.ts#L606)

A thin wrapper around lodash's mergeWith that does not mutate
`originalConfiguration`.

## Type Parameters

• **ConfigurationType**

## Parameters

### originalConfiguration

`ConfigurationType`

### overwrites

`ConfigurationType` | `Record`\<`string`, `unknown`\> | `EmptyObject`

### customReplacer?

(`value`, `srcValue`, `key`, `object`, `source`) => `any`

## Returns

`ConfigurationType`
