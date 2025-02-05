[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / deepMergeConfig

# Function: deepMergeConfig()

> **deepMergeConfig**\<`ConfigurationType`\>(`originalConfiguration`, `overwrites`, `customReplacer`?): `ConfigurationType`

Defined in: [src/assets.ts:619](https://github.com/Xunnamius/symbiote/blob/f5dbcf226533401d9fc449ad30ae068d637c3138/src/assets.ts#L619)

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
