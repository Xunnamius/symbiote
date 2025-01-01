[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / RawAliasMapperFunction

# Type Alias: RawAliasMapperFunction()

> **RawAliasMapperFunction**: (`projectMetadata`, `outputFunctions`) => [`RawAliasMapperArray`](RawAliasMapperArray.md)

Defined in: [src/util.ts:117](https://github.com/Xunnamius/symbiote/blob/1901cfe78a48fcd1dfae4e3760acf197e8812676/src/util.ts#L117)

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
