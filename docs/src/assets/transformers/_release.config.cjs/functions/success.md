[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_release.config.cjs](../README.md) / success

# Function: success()

> **success**(`_pluginConfig`, `context`): `Promise`\<`void`\>

Defined in: [src/assets/transformers/\_release.config.cjs.ts:432](https://github.com/Xunnamius/symbiote/blob/510118102ef530d135a286522a7a776ec12a8a72/src/assets/transformers/_release.config.cjs.ts#L432)

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
