[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/configure](../README.md) / globalCliArguments

# Variable: globalCliArguments

> `const` **globalCliArguments**: `object`

Defined in: [src/configure.ts:140](https://github.com/Xunnamius/symbiote/blob/16c5abb574a56340fcb49cdcf402702ed3917f82/src/configure.ts#L140)

This BfeBuilderObject instance describes the CLI arguments available
in the `argv` object of any command that uses [withGlobalBuilder](../../util/functions/withGlobalBuilder.md) to
construct its `builder`.

This object is manually synchronized with [GlobalCliArguments](../type-aliases/GlobalCliArguments.md), but the
keys may differ slightly (e.g. hyphens may be elided in favor of camelCase).

When providing a custom BfeBuilderObject instance to
[withGlobalBuilder](../../util/functions/withGlobalBuilder.md), any key specified in that instance that is also a
key in this object (`globalCliArguments`) will have its value merged with the
value in this object _instead_ of fully overwriting it. This means you can
pass minimal configuration values for the keys that are also in
`globalCliArguments` and those values will be merged over the corresponding
default configuration value in `globalCliArguments`.

## Type declaration

### env

> **env**: `object`

#### env.array

> **array**: `true` = `true`

#### env.default

> **default**: `never`[] = `[]`

#### env.description

> **description**: `string` = `'Set cross-platform environment variables using Bourne syntax'`

#### env.string

> **string**: `true` = `true`

### scope

> **scope**: `object`

#### scope.choices

> **choices**: [`DefaultGlobalScope`](../enumerations/DefaultGlobalScope.md)[]

#### scope.default

> **default**: [`DefaultGlobalScope`](../enumerations/DefaultGlobalScope.md) = `DefaultGlobalScope.ThisPackage`

#### scope.description

> **description**: `string` = `'Which files this command will consider when scanning the filesystem'`

#### scope.string

> **string**: `true` = `true`

## See

StandardCommonCliArguments
