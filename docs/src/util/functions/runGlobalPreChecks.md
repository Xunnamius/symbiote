[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / runGlobalPreChecks

# Function: runGlobalPreChecks()

> **runGlobalPreChecks**(`__namedParameters`): `Promise`\<\{ `projectMetadata`: `NonNullable`\<[`GlobalExecutionContext`](../../configure/type-aliases/GlobalExecutionContext.md)\[`"projectMetadata"`\]\>; \}\>

Defined in: [src/util.ts:330](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/util.ts#L330)

This function runs common checks against the runtime to ensure the
environment is suitable for running symbiote.

This function should be called at the top of just about every command
handler.

This command also asserts that the `projectMetadata` property is defined by
returning it (or throwing a CliError if undefined).

## Parameters

### \_\_namedParameters

#### debug_

`ExtendedDebugger`

#### projectMetadata_

`undefined` \| `ProjectMetadata`

#### scope

`LiteralUnion`\<[`DefaultGlobalScope`](../../configure/enumerations/DefaultGlobalScope.md), `string`\>

## Returns

`Promise`\<\{ `projectMetadata`: `NonNullable`\<[`GlobalExecutionContext`](../../configure/type-aliases/GlobalExecutionContext.md)\[`"projectMetadata"`\]\>; \}\>
