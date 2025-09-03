[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [types/glob-gitignore](../README.md) / GlobGitignoreOptions

# Type Alias: GlobGitignoreOptions

> **GlobGitignoreOptions** = `Omit`\<`GlobOptions`, `"ignore"`\> & `object`

Defined in: [types/glob-gitignore.d.ts:4](https://github.com/Xunnamius/symbiote/blob/79d395cced979d17188580f3f3b776aa6e57df18/types/glob-gitignore.d.ts#L4)

## Type Declaration

### ignore?

> `optional` **ignore**: `string` \| `string`[]

A string or array of strings used to determine which globbed paths are
ignored. Typically this is the result of parsing a .gitignore file (or file
with compatible format) split by `"\n"`.
