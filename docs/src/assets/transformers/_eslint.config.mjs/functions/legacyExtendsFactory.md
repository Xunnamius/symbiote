[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_eslint.config.mjs](../README.md) / legacyExtendsFactory

# Function: legacyExtendsFactory()

> **legacyExtendsFactory**(`flatCompat`): (`extension`, `name`) => `Config`

Defined in: [src/assets/transformers/\_eslint.config.mjs.ts:1071](https://github.com/Xunnamius/symbiote/blob/421daaf5e320e2f5d7cb32f23e410fefd48b6891/src/assets/transformers/_eslint.config.mjs.ts#L1071)

Returns a function that, when invoked, returns an `eslint@>=9` configuration
object that adapts a legacy `eslint@<9` plugin's exposed rule extension.

For example:

```typescript
const eslintConfig = makeTsEslintConfig(
  legacyExtends('plugin:import/recommended', 'eslint-plugin-import:recommended'),
  legacyExtends('plugin:import/typescript', 'eslint-plugin-import:typescript')
);
```

## Parameters

### flatCompat

`FlatCompat`

## Returns

> (`extension`, `name`): `Config`

### Parameters

#### extension

`string`

#### name

`string`

### Returns

`Config`
