[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_release.config.cjs](../README.md) / success

# Function: success()

> **success**(`__namedParameters`, `context`): `Promise`\<`void`\>

Defined in: [src/assets/transformers/\_release.config.cjs.ts:475](https://github.com/Xunnamius/symbiote/blob/ec67adb5324eeca6085e3ddc4126fe7798bea916/src/assets/transformers/_release.config.cjs.ts#L475)

This is a custom semantic-release plugin step that logs a GitHub Actions (or
other) warning if the release pipeline ends with the repository in an unclean
state.

## Parameters

### \_\_namedParameters

[`PluginConfig`](../type-aliases/PluginConfig.md)

### context

`VerifyReleaseContext`

## Returns

`Promise`\<`void`\>
