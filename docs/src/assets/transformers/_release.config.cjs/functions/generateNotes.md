[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_release.config.cjs](../README.md) / generateNotes

# Function: generateNotes()

> **generateNotes**(`__namedParameters`, `context`): `Promise`\<`string`\>

Defined in: [src/assets/transformers/\_release.config.cjs.ts:353](https://github.com/Xunnamius/symbiote/blob/6cd9803a2f37849e57efc78412bcf20f1a002bf9/src/assets/transformers/_release.config.cjs.ts#L353)

This is a custom semantic-release plugin step that replaces
`nextRelease.notes` with the version patched by symbiote.

## Parameters

### \_\_namedParameters

[`PluginConfig`](../type-aliases/PluginConfig.md)

### context

`VerifyReleaseContext`

## Returns

`Promise`\<`string`\>
