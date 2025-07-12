[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_release.config.cjs](../README.md) / success

# Function: success()

> **success**(`_`, `context`): `Promise`\<`void`\>

Defined in: [src/assets/transformers/\_release.config.cjs.ts:540](https://github.com/Xunnamius/symbiote/blob/b62abf3b41ef4fb16014d3e799397a1e70b68b47/src/assets/transformers/_release.config.cjs.ts#L540)

This is a custom semantic-release plugin step that logs a GitHub Actions (or
other) warning if the release pipeline ends with the repository in an unclean
state.

## Parameters

### \_

[`PluginConfig`](../type-aliases/PluginConfig.md)

### context

`VerifyReleaseContext`

## Returns

`Promise`\<`void`\>
