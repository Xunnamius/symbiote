[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / LoadDotEnvSettings

# Type Alias: LoadDotEnvSettings

> **LoadDotEnvSettings**: `object` & `Pick`\<`DotenvConfigOptions`, `"override"`\>

Defined in: [src/util.ts:762](https://github.com/Xunnamius/symbiote/blob/15d3444639e5919af49429f7c60a387a77f22b82/src/util.ts#L762)

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
