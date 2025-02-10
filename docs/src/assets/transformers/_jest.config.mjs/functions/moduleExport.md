[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_jest.config.mjs](../README.md) / moduleExport

# Function: moduleExport()

> **moduleExport**(`__namedParameters`): [`JestConfig`](../type-aliases/JestConfig.md)

Defined in: [src/assets/transformers/\_jest.config.mjs.ts:120](https://github.com/Xunnamius/symbiote/blob/ea9edf73ee9a095bf3bea5793333d39906fa49d1/src/assets/transformers/_jest.config.mjs.ts#L120)

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
