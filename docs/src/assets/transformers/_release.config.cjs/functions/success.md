[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_release.config.cjs](../README.md) / success

# Function: success()

> **success**(`_pluginConfig`, `context`): `Promise`\<`void`\>

Defined in: [src/assets/transformers/\_release.config.cjs.ts:432](https://github.com/Xunnamius/symbiote/blob/2e287e33709b516a0ca83d4aca24e98dc1018688/src/assets/transformers/_release.config.cjs.ts#L432)

This is a custom semantic-release plugin step that logs a GitHub Actions (or
other) warning if the release pipeline ends with the repository in an unclean
state.

## Parameters

### \_pluginConfig

[`PluginConfig`](../type-aliases/PluginConfig.md)

### context

`VerifyReleaseContext`

## Returns

`Promise`\<`void`\>
