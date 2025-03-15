[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_eslint.config.mjs](../README.md) / makeEslintFlatCompat

# Function: makeEslintFlatCompat()

> **makeEslintFlatCompat**(`projectRoot`): `Promise`\<`FlatCompat`\>

Defined in: [src/assets/transformers/\_eslint.config.mjs.ts:917](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/assets/transformers/_eslint.config.mjs.ts#L917)

Accepts an absolute path to the project root and returns a FlatCompat
instance.

Only useful when interfacing with legacy plugins built for `eslint@<9`.

## Parameters

### projectRoot

`AbsolutePath`

## Returns

`Promise`\<`FlatCompat`\>
