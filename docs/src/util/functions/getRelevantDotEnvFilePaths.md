[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / getRelevantDotEnvFilePaths

# Function: getRelevantDotEnvFilePaths()

> **getRelevantDotEnvFilePaths**(`projectMetadata`, `scope?`): `AbsolutePath`[]

Defined in: [src/util.ts:405](https://github.com/Xunnamius/symbiote/blob/c224670ed4152319490e37dbcda7cf2d057821a9/src/util.ts#L405)

Returns all dotenv file paths relevant to the current package in reverse
order of precedence; the most important dotenv file will be last in the
returned array.

Use `scope` (default: `"both"`) to narrow which dotenv paths are returned.

## Parameters

### projectMetadata

`GenericProjectMetadata` \| `undefined`

### scope?

`"both"` \| `"package-only"` \| `"project-only"`

## Returns

`AbsolutePath`[]
