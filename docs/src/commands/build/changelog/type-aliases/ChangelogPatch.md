[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ChangelogPatch

# Type Alias: ChangelogPatch

> **ChangelogPatch**: \[`string` \| `RegExp`, `string`\]

Defined in: [src/commands/build/changelog.ts:76](https://github.com/Xunnamius/symbiote/blob/5ab38d0bb0a593488721fdd41b6c1fcc4618d081/src/commands/build/changelog.ts#L76)

A changelog patch that will be applied to the changelog file.

It mirrors the parameters of String.prototype.replace in form and
function. That is: each `ChangelogPatch` `searchValue` will be replaced by
`replaceValue` in the changelog file.

Note that replacements are made in-place, meaning order does matter.
