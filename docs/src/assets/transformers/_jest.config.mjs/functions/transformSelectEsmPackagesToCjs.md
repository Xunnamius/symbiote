[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_jest.config.mjs](../README.md) / transformSelectEsmPackagesToCjs

# Function: transformSelectEsmPackagesToCjs()

> **transformSelectEsmPackagesToCjs**(`packageNames`): [`JestConfig`](../type-aliases/JestConfig.md)\[`"transformIgnorePatterns"`\]

Defined in: [src/assets/transformers/\_jest.config.mjs.ts:229](https://github.com/Xunnamius/symbiote/blob/385866d2602d36dd6b86c7f4511dc3df19a6ef56/src/assets/transformers/_jest.config.mjs.ts#L229)

This function generates several regular expression _pattern strings_ meant to
be supplied as the value of JestConfig.transformIgnorePatterns in a
jest configuration object. This will result in any packages with names
matching `packageNames` being transpiled into CJS on the fly while preserving
jest's default behavior (i.e. no transpilation) in every other case.

This is useful when, for instance, an ESM package needs to be mocked via a
top-level import.

Note that package names will have any special characters (in the context of
regular expressions) escaped.

## Parameters

### packageNames

`string`[]

## Returns

[`JestConfig`](../type-aliases/JestConfig.md)\[`"transformIgnorePatterns"`\]

## See

https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
