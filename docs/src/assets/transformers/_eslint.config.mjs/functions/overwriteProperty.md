[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_eslint.config.mjs](../README.md) / overwriteProperty

# Function: overwriteProperty()

> **overwriteProperty**\<`T`\>(`configs`, `property`, `value`): [`EslintConfig`](../type-aliases/EslintConfig.md)[]

Defined in: [src/assets/transformers/\_eslint.config.mjs.ts:925](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/assets/transformers/_eslint.config.mjs.ts#L925)

Accepts an [EslintConfig](../type-aliases/EslintConfig.md) object (or an array of them) and returns a
flattened array with each object's `property` property overwritten by the
given `value`.

For example:

```typescript
const eslintConfig = makeTsEslintConfig({
  // some other configs...
},
...[
  legacyExtends('plugin:import/recommended', 'eslint-plugin-import:recommended'),
  legacyExtends('plugin:import/typescript', 'eslint-plugin-import:typescript')
]).flatMap((configs) =>
  overwriteProperty(configs, 'files', ['*.{js,jsx,cjs,mjs}'])
);

## Type Parameters

• **T** *extends* keyof `Config`

## Parameters

### configs

`Config` | `Config`[]

### property

`T`

### value

`Config`\[`T`\]

## Returns

[`EslintConfig`](../type-aliases/EslintConfig.md)[]
