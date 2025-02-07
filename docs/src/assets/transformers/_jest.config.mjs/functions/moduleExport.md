[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_jest.config.mjs](../README.md) / moduleExport

# Function: moduleExport()

> **moduleExport**(`__namedParameters`): [`JestConfig`](../type-aliases/JestConfig.md)

Defined in: [src/assets/transformers/\_jest.config.mjs.ts:107](https://github.com/Xunnamius/symbiote/blob/385866d2602d36dd6b86c7f4511dc3df19a6ef56/src/assets/transformers/_jest.config.mjs.ts#L107)

## Parameters

### \_\_namedParameters

#### derivedAliases

\{\}

#### isDebugging

`boolean`

#### skipSlowTestsLevel

`number`

Skip slow tests depending on the level given. `0` disables test skipping.
`1` implements the skip by augmenting jest globals. `2` has the same effect
as `1` while entirely skipping tests from files with names containing
`-slow.`.

## Returns

[`JestConfig`](../type-aliases/JestConfig.md)

## See

[assertEnvironment](assertEnvironment.md)
