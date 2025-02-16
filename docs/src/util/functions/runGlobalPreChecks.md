[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / runGlobalPreChecks

# Function: runGlobalPreChecks()

> **runGlobalPreChecks**(`__namedParameters`): `Promise`\<\{ `projectMetadata`: `ProjectMetadata`; \}\>

Defined in: [src/util.ts:313](https://github.com/Xunnamius/symbiote/blob/726d79e4b4249d13e12a53938af9a921099a47e6/src/util.ts#L313)

This function runs common checks against the runtime to ensure the
environment is suitable for running symbiote.

This function should be called at the top of just about every command
handler.

This command also asserts that the `projectMetadata` property is defined by
returning it (or throwing a CliError if undefined).

## Parameters

### \_\_namedParameters

#### projectMetadata_

`undefined` \| `ProjectMetadata`

#### scope

`LiteralUnion`\<[`DefaultGlobalScope`](../../configure/enumerations/DefaultGlobalScope.md), `string`\>

#### standardDebug

`ExtendedDebugger`

## Returns

`Promise`\<\{ `projectMetadata`: `ProjectMetadata`; \}\>
