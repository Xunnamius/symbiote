[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ChangelogPatch

# Type Alias: ChangelogPatch

> **ChangelogPatch** = \[`string` \| `RegExp`, `string`\]

Defined in: [src/commands/build/changelog.ts:63](https://github.com/Xunnamius/symbiote/blob/c1464a297410c83c8e7e7e880f016b0d4a6a426a/src/commands/build/changelog.ts#L63)

A changelog patch that will be applied to the changelog file.

It mirrors the parameters of String.prototype.replace in form and
function. That is: each `ChangelogPatch` `searchValue` will be replaced by
`replaceValue` in the changelog file.

Note that replacements are made in-place, meaning order does matter.
