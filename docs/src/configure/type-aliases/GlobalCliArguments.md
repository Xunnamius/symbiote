[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/configure](../README.md) / GlobalCliArguments

# Type Alias: GlobalCliArguments\<Scope\>

> **GlobalCliArguments**\<`Scope`\> = `StandardCommonCliArguments` & `object`

Defined in: [src/configure.ts:124](https://github.com/Xunnamius/symbiote/blob/0557e914d494aeba06238075ebcfa60296d71fba/src/configure.ts#L124)

These properties will be available in the `argv` object of any command that
uses [withGlobalBuilder](../../util/functions/withGlobalBuilder.md) to construct its `builder`.

This type is manually synchronized with [globalCliArguments](../variables/globalCliArguments.md), but the
keys may differ slightly (e.g. hyphens may be elided in favor of camelCase).

## Type declaration

### env

> **env**: `string`[]

### scope

> **scope**: `Scope`

## Type Parameters

### Scope

`Scope` *extends* `string` = [`DefaultGlobalScope`](../enumerations/DefaultGlobalScope.md)

## See

StandardCommonCliArguments
