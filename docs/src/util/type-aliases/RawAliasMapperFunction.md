[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / RawAliasMapperFunction

# Type Alias: RawAliasMapperFunction()

> **RawAliasMapperFunction**: (`projectMetadata`, `outputFunctions`) => [`RawAliasMapperArray`](RawAliasMapperArray.md)

Defined in: [src/util.ts:105](https://github.com/Xunnamius/symbiote/blob/cfd701ad0628c5e146048c1316e66e821d0bb3c4/src/util.ts#L105)

A function that receives the current ProjectMetadata and must return
an array of RawAliasMappings.

Note that import map files can export via default either
`RawAliasMapperFunction` or a [RawAliasMapperArray](RawAliasMapperArray.md).

## Parameters

### projectMetadata

`ProjectMetadata`

### outputFunctions

#### debug

`ExtendedDebugger`

#### log

`ExtendedLogger`

## Returns

[`RawAliasMapperArray`](RawAliasMapperArray.md)

## See

[ImportedAliasMap](ImportedAliasMap.md)
