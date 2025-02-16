[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / deepMergeConfig

# Function: deepMergeConfig()

> **deepMergeConfig**\<`ConfigurationType`\>(`originalConfiguration`, `overwrites`, `customReplacer`?): `ConfigurationType`

Defined in: [src/assets.ts:615](https://github.com/Xunnamius/symbiote/blob/261741e26a03ae661b506c3872cb86af79a07f11/src/assets.ts#L615)

A thin wrapper around lodash's mergeWith that does not mutate
`originalConfiguration`.

## Type Parameters

• **ConfigurationType**

## Parameters

### originalConfiguration

`ConfigurationType`

### overwrites

`ConfigurationType` | `EmptyObject`

### customReplacer?

(`value`, `srcValue`, `key`, `object`, `source`, `stack`) => `any`

## Returns

`ConfigurationType`
