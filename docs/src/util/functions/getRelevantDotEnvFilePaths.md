[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / getRelevantDotEnvFilePaths

# Function: getRelevantDotEnvFilePaths()

> **getRelevantDotEnvFilePaths**(`projectMetadata`, `scope`): `AbsolutePath`[]

Defined in: [src/util.ts:409](https://github.com/Xunnamius/symbiote/blob/177b18c16bd1c04c96d8c434ec7a45a66c3f0201/src/util.ts#L409)

Returns all dotenv file paths relevant to the current package in reverse
order of precedence; the most important dotenv file will be last in the
returned array.

Use `scope` (default: `"both"`) to narrow which dotenv paths are returned.

## Parameters

### projectMetadata

`undefined` | `GenericProjectMetadata`

### scope

`"both"` | `"package-only"` | `"project-only"`

## Returns

`AbsolutePath`[]
