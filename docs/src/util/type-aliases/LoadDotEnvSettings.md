[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / LoadDotEnvSettings

# Type Alias: LoadDotEnvSettings

> **LoadDotEnvSettings**: `object` & `Pick`\<`DotenvConfigOptions`, `"override"`\>

Defined in: [src/util.ts:753](https://github.com/Xunnamius/symbiote/blob/c3f7fbdb0b36164c8890b842485989d2e0a3c698/src/util.ts#L753)

## Type declaration

### dotEnvFilePaths

> **dotEnvFilePaths**: `AbsolutePath`[]

Variables from files earlier in this list will be overwritten by
variables from files later in the list.

### failInstructions

> **failInstructions**: `string`

Further instructions for the user upon environment validation failure.

### force

> **force**: `boolean`

If `true`, do not throw on errors.

### log

> **log**: `ExtendedLogger`

### onFail()

> **onFail**: () => `void`

Action to take upon environment validation failure.

#### Returns

`void`

### updateProcessEnv?

> `optional` **updateProcessEnv**: `boolean`

If `true`, loaded environment variables will be added to `process.env`
with respect to `override`, and this function will return `void`. If
`false`, the environment variables will be returned instead and
`override` is ignored.

#### Default

```ts
true
```
