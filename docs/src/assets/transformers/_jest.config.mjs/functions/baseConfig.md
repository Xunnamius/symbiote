[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_jest.config.mjs](../README.md) / baseConfig

# Function: baseConfig()

> **baseConfig**(`__namedParameters`): `object`

Defined in: [src/assets/transformers/\_jest.config.mjs.ts:51](https://github.com/Xunnamius/symbiote/blob/385866d2602d36dd6b86c7f4511dc3df19a6ef56/src/assets/transformers/_jest.config.mjs.ts#L51)

Return a partial configuration that must be initialized further.

## Parameters

### \_\_namedParameters

#### isDebugging

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

> `readonly` **modulePathIgnorePatterns**: \[`"/test/fixtures/"`, `"/.transpiled/"`, `string`\]

### resetMocks

> `readonly` **resetMocks**: `true` = `true`

### restoreMocks

> `readonly` **restoreMocks**: `true` = `true`

### setupFilesAfterEnv

> `readonly` **setupFilesAfterEnv**: \[`"./test/setup.ts"`\]

### testEnvironment

> `readonly` **testEnvironment**: `"node"` = `'node'`

### testPathIgnorePatterns

> `readonly` **testPathIgnorePatterns**: \[`"/node_modules/"`, `"/dist/"`, `"/src/"`, `"/.transpiled/"`, `string`, `string`\]

### testRunner

> `readonly` **testRunner**: `"jest-circus/runner"` = `'jest-circus/runner'`

### testTimeout

> `readonly` **testTimeout**: `number`

### verbose

> `readonly` **verbose**: `false` = `false`
