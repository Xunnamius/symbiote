[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ChangelogPatch

# Type Alias: ChangelogPatch

> **ChangelogPatch**: \[`string` \| `RegExp`, `string`\]

Defined in: [src/commands/build/changelog.ts:76](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/commands/build/changelog.ts#L76)

A changelog patch that will be applied to the changelog file.

It mirrors the parameters of String.prototype.replace in form and
function. That is: each `ChangelogPatch` `searchValue` will be replaced by
`replaceValue` in the changelog file.

Note that replacements are made in-place, meaning order does matter.
