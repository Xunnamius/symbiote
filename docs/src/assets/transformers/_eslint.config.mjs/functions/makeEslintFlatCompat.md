[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_eslint.config.mjs](../README.md) / makeEslintFlatCompat

# Function: makeEslintFlatCompat()

> **makeEslintFlatCompat**(`projectRoot`): `Promise`\<`FlatCompat`\>

Defined in: [src/assets/transformers/\_eslint.config.mjs.ts:892](https://github.com/Xunnamius/symbiote/blob/baed18cf2f0c1f93d21647c3399a412c1e0a2c32/src/assets/transformers/_eslint.config.mjs.ts#L892)

Accepts an absolute path to the project root and returns a FlatCompat
instance.

Only useful when interfacing with legacy plugins built for `eslint@<9`.

## Parameters

### projectRoot

`AbsolutePath`

## Returns

`Promise`\<`FlatCompat`\>
