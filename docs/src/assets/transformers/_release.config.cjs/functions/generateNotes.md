[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_release.config.cjs](../README.md) / generateNotes

# Function: generateNotes()

> **generateNotes**(`__namedParameters`, `context`): `Promise`\<`string`\>

Defined in: [src/assets/transformers/\_release.config.cjs.ts:400](https://github.com/Xunnamius/symbiote/blob/684c98756883770dff30034f576ce171f943b9a2/src/assets/transformers/_release.config.cjs.ts#L400)

This is a custom semantic-release plugin step that replaces
`nextRelease.notes` with the version patched by symbiote.

## Parameters

### \_\_namedParameters

[`PluginConfig`](../type-aliases/PluginConfig.md)

### context

`VerifyReleaseContext`

## Returns

`Promise`\<`string`\>
