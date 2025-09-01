[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_eslint.config.mjs](../README.md) / makeEslintFlatCompat

# Function: makeEslintFlatCompat()

> **makeEslintFlatCompat**(`projectRoot`): `Promise`\<`FlatCompat`\>

Defined in: [src/assets/transformers/\_eslint.config.mjs.ts:1016](https://github.com/Xunnamius/symbiote/blob/feca973a0a29b4194f5e9720a5df04c799f6fa94/src/assets/transformers/_eslint.config.mjs.ts#L1016)

Accepts an absolute path to the project root and returns a FlatCompat
instance.

Only useful when interfacing with legacy plugins built for `eslint@<9`.

## Parameters

### projectRoot

`AbsolutePath`

## Returns

`Promise`\<`FlatCompat`\>
