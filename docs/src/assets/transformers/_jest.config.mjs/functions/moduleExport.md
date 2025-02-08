[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_jest.config.mjs](../README.md) / moduleExport

# Function: moduleExport()

> **moduleExport**(`__namedParameters`): [`JestConfig`](../type-aliases/JestConfig.md)

Defined in: [src/assets/transformers/\_jest.config.mjs.ts:117](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/assets/transformers/_jest.config.mjs.ts#L117)

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
