[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_eslint.config.mjs](../README.md) / legacyExtendsFactory

# Function: legacyExtendsFactory()

> **legacyExtendsFactory**(`flatCompat`): (`extension`, `name`) => `Config`

Defined in: [src/assets/transformers/\_eslint.config.mjs.ts:972](https://github.com/Xunnamius/symbiote/blob/2a4f9c137a879b6e0d19dc7269398051d3a84f5e/src/assets/transformers/_eslint.config.mjs.ts#L972)

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

`Function`

### Parameters

#### extension

`string`

#### name

`string`

### Returns

`Config`
