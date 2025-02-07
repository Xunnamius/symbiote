[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_jest.config.mjs](../README.md) / baseConfig

# Function: baseConfig()

> **baseConfig**(`__namedParameters`): `object`

Defined in: [src/assets/transformers/\_jest.config.mjs.ts:57](https://github.com/Xunnamius/symbiote/blob/baed18cf2f0c1f93d21647c3399a412c1e0a2c32/src/assets/transformers/_jest.config.mjs.ts#L57)

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
