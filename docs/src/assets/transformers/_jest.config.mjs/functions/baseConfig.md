[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_jest.config.mjs](../README.md) / baseConfig

# Function: baseConfig()

> **baseConfig**(`__namedParameters`): `object`

Defined in: [src/assets/transformers/\_jest.config.mjs.ts:62](https://github.com/Xunnamius/symbiote/blob/090a7857a95973f8ad6febe2e79edda5e1f32856/src/assets/transformers/_jest.config.mjs.ts#L62)

Return a partial configuration that must be initialized further.

## Parameters

### \_\_namedParameters

#### isDebugging?

`boolean` = `false`

**Default**

```ts
false
```

## Returns

`object`

### clearMocks

> `readonly` **clearMocks**: `true` = `true`

### maxConcurrency

> `readonly` **maxConcurrency**: `number`

### modulePathIgnorePatterns

> `readonly` **modulePathIgnorePatterns**: \[`"/test/fixtures/"`, `...string[]`, `string`\]

### resetMocks

> `readonly` **resetMocks**: `true` = `true`

### restoreMocks

> `readonly` **restoreMocks**: `true` = `true`

### setupFilesAfterEnv

> `readonly` **setupFilesAfterEnv**: \[`"<rootDir>/test/setup.js"` \| `"<rootDir>/test/setup.ts"`\]

### testEnvironment

> `readonly` **testEnvironment**: `"node"` = `'node'`

### testPathIgnorePatterns

> `readonly` **testPathIgnorePatterns**: \[`"/node_modules/"`, `"/dist/"`, `"/src/"`, `...string[]`, `"/test/fixtures/"`, `"<rootDir>/dummies/"`, `string`, `string`\]

### testRunner

> `readonly` **testRunner**: `"jest-circus/runner"` = `'jest-circus/runner'`

### testTimeout

> `readonly` **testTimeout**: `number`

### verbose

> `readonly` **verbose**: `false` = `false`
