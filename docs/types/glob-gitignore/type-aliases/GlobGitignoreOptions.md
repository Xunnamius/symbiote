[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [types/glob-gitignore](../README.md) / GlobGitignoreOptions

# Type Alias: GlobGitignoreOptions

> **GlobGitignoreOptions** = `Omit`\<`GlobOptions`, `"ignore"`\> & `object`

Defined in: [types/glob-gitignore.d.ts:4](https://github.com/Xunnamius/symbiote/blob/ffa2219b5458551337af8081b76f7ffb8422c513/types/glob-gitignore.d.ts#L4)

## Type declaration

### ignore?

> `optional` **ignore**: `string` \| `string`[]

A string or array of strings used to determine which globbed paths are
ignored. Typically this is the result of parsing a .gitignore file (or file
with compatible format) split by `"\n"`.
