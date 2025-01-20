[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / loadDotEnv

# Function: loadDotEnv()

## Call Signature

> **loadDotEnv**(`settings`): `DotenvParseOutput`

Defined in: [src/util.ts:820](https://github.com/Xunnamius/symbiote/blob/e90857acb3d261d6e9bd248ab0e38c7f0e05d449/src/util.ts#L820)

Loads environment variables from the given `dotEnvFilePaths` files, with
variables from files earlier in the list being overwritten by variables from
files later in the list.

`process.env` will be updated, and then an object containing only the loaded
environment variables is returned.

**Note that this function internally caches the result of loading the dotenv
files, meaning they'll only be read once.**

### Parameters

#### settings

`object` & `object`

### Returns

`DotenvParseOutput`

## Call Signature

> **loadDotEnv**(`settings`): `DotenvParseOutput`

Defined in: [src/util.ts:834](https://github.com/Xunnamius/symbiote/blob/e90857acb3d261d6e9bd248ab0e38c7f0e05d449/src/util.ts#L834)

Loads environment variables from the given `dotEnvFilePaths` files, with
variables from files earlier in the list being overwritten by variables from
files later in the list.

An object containing only the loaded environment variables is returned.
**`process.env` will NOT be updated!**

**Note that this function internally caches the result of loading the dotenv
files, meaning they'll only be read once.**

### Parameters

#### settings

`object` & `object`

### Returns

`DotenvParseOutput`

## Call Signature

> **loadDotEnv**(`expectedEnvironmentVariables`, `settings`): `DotenvParseOutput`

Defined in: [src/util.ts:851](https://github.com/Xunnamius/symbiote/blob/e90857acb3d261d6e9bd248ab0e38c7f0e05d449/src/util.ts#L851)

Loads environment variables from the given `dotEnvFilePaths` files, with
variables from files earlier in the list being overwritten by variables from
files later in the list.

`process.env` will be updated, and the resulting environment object (after
`overrides` and `updateProcessEnv` are considered) will be checked for the
existence of the variables in `expectedEnvironmentVariables`. If the check is
successful, an object containing only the loaded environment variables is
returned. Otherwise, an error is thrown.

**Note that this function internally caches the result of loading the dotenv
files, meaning they'll only be read once.**

### Parameters

#### expectedEnvironmentVariables

`string`[]

#### settings

`object` & `Pick`\<`DotenvConfigOptions`, `"override"`\> & `object`

### Returns

`DotenvParseOutput`

## Call Signature

> **loadDotEnv**(`expectedEnvironmentVariables`, `settings`): `DotenvParseOutput`

Defined in: [src/util.ts:869](https://github.com/Xunnamius/symbiote/blob/e90857acb3d261d6e9bd248ab0e38c7f0e05d449/src/util.ts#L869)

Loads environment variables from the given `dotEnvFilePaths` files, with
variables from files earlier in the list being overwritten by variables from
files later in the list.

The resulting environment object (after `overrides` and `updateProcessEnv`
are considered) will be checked for the existence of the variables in
`expectedEnvironmentVariables`, but **`process.env` will NOT be updated!**.
If the check is successful, an object containing only the loaded environment
variables is returned. Otherwise, an error is thrown.

**Note that this function internally caches the result of loading the dotenv
files, meaning they'll only be read once.**

### Parameters

#### expectedEnvironmentVariables

`string`[]

#### settings

`object` & `Pick`\<`DotenvConfigOptions`, `"override"`\> & `object`

### Returns

`DotenvParseOutput`
