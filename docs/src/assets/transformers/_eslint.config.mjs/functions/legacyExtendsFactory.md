[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_eslint.config.mjs](../README.md) / legacyExtendsFactory

# Function: legacyExtendsFactory()

> **legacyExtendsFactory**(`flatCompat`): (`extension`, `name`) => `Config`

Defined in: [src/assets/transformers/\_eslint.config.mjs.ts:978](https://github.com/Xunnamius/symbiote/blob/1ec1b7bdf126210dcfd31b34e7c9448cbcc26d1c/src/assets/transformers/_eslint.config.mjs.ts#L978)

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
