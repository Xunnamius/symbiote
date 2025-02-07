[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_release.config.cjs](../README.md) / generateNotes

# Function: generateNotes()

> **generateNotes**(`__namedParameters`, `context`): `Promise`\<`string`\>

Defined in: [src/assets/transformers/\_release.config.cjs.ts:349](https://github.com/Xunnamius/symbiote/blob/385866d2602d36dd6b86c7f4511dc3df19a6ef56/src/assets/transformers/_release.config.cjs.ts#L349)

This is a custom semantic-release plugin step that replaces
`nextRelease.notes` with the version patched by symbiote.

## Parameters

### \_\_namedParameters

[`PluginConfig`](../type-aliases/PluginConfig.md)

### context

`VerifyReleaseContext`

## Returns

`Promise`\<`string`\>
