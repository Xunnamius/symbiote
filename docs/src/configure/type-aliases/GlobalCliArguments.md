[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/configure](../README.md) / GlobalCliArguments

# Type Alias: GlobalCliArguments\<Scope\>

> **GlobalCliArguments**\<`Scope`\>: `StandardCommonCliArguments` & `object`

Defined in: [src/configure.ts:116](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/configure.ts#L116)

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

• **Scope** *extends* `string` = [`DefaultGlobalScope`](../enumerations/DefaultGlobalScope.md)

## See

StandardCommonCliArguments
