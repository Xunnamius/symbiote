[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / RawAliasMapperFunction

# Type Alias: RawAliasMapperFunction()

> **RawAliasMapperFunction**: (`projectMetadata`, `outputFunctions`) => `RawAliasMapping`[]

A function that receives the current ProjectMetadata and must return
an array of RawAliasMappings.

`aliases.config.mjs` can export via default either `RawAliasMapperFunction`
or an array of RawAliasMappings.

## Parameters

### projectMetadata

`ProjectMetadata`

### outputFunctions

#### debug

`ExtendedDebugger`

#### log

`ExtendedLogger`

## Returns

`RawAliasMapping`[]

## Defined in

[src/util.ts:109](https://github.com/Xunnamius/symbiote/blob/26e756362a16f050e03cef2c4c582d94e29614cd/src/util.ts#L109)
