[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / getRelevantDotEnvFilePaths

# Function: getRelevantDotEnvFilePaths()

> **getRelevantDotEnvFilePaths**(`projectMetadata`, `scope`): `AbsolutePath`[]

Defined in: [src/util.ts:426](https://github.com/Xunnamius/symbiote/blob/4058415994948905c0e64092da29324812f36a24/src/util.ts#L426)

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
