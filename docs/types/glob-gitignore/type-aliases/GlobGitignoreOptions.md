[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [types/glob-gitignore](../README.md) / GlobGitignoreOptions

# Type Alias: GlobGitignoreOptions

> **GlobGitignoreOptions** = `Omit`\<`GlobOptions`, `"ignore"`\> & `object`

Defined in: [types/glob-gitignore.d.ts:4](https://github.com/Xunnamius/symbiote/blob/2a4f9c137a879b6e0d19dc7269398051d3a84f5e/types/glob-gitignore.d.ts#L4)

## Type declaration

### ignore?

> `optional` **ignore**: `string` \| `string`[]

A string or array of strings used to determine which globbed paths are
ignored. Typically this is the result of parsing a .gitignore file (or file
with compatible format) split by `"\n"`.
