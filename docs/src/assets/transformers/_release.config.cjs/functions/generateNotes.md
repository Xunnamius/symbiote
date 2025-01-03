[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_release.config.cjs](../README.md) / generateNotes

# Function: generateNotes()

> **generateNotes**(`__namedParameters`, `context`): `Promise`\<`string`\>

Defined in: [src/assets/transformers/\_release.config.cjs.ts:311](https://github.com/Xunnamius/symbiote/blob/0bafa3046d16effe919127463c68cff1fb657848/src/assets/transformers/_release.config.cjs.ts#L311)

This is a custom semantic-release plugin step that replaces
`nextRelease.notes` with the version patched by symbiote.

## Parameters

### \_\_namedParameters

[`PluginConfig`](../type-aliases/PluginConfig.md)

### context

`VerifyReleaseContext`

## Returns

`Promise`\<`string`\>
