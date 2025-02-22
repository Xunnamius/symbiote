[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_release.config.cjs](../README.md) / generateNotes

# Function: generateNotes()

> **generateNotes**(`__namedParameters`, `context`): `Promise`\<`string`\>

Defined in: [src/assets/transformers/\_release.config.cjs.ts:344](https://github.com/Xunnamius/symbiote/blob/9d125f863e55b05b020914ff4ddfee626423b9b7/src/assets/transformers/_release.config.cjs.ts#L344)

This is a custom semantic-release plugin step that replaces
`nextRelease.notes` with the version patched by symbiote.

## Parameters

### \_\_namedParameters

[`PluginConfig`](../type-aliases/PluginConfig.md)

### context

`VerifyReleaseContext`

## Returns

`Promise`\<`string`\>
