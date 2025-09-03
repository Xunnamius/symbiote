[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / runGlobalPreChecks

# Function: runGlobalPreChecks()

> **runGlobalPreChecks**(`__namedParameters`): `Promise`\<\{ `projectMetadata`: `ProjectMetadata`; \}\>

Defined in: [src/util.ts:309](https://github.com/Xunnamius/symbiote/blob/79d395cced979d17188580f3f3b776aa6e57df18/src/util.ts#L309)

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
