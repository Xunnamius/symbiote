[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ChangelogPatch

# Type Alias: ChangelogPatch

> **ChangelogPatch** = \[`string` \| `RegExp`, `string`\]

Defined in: [src/commands/build/changelog.ts:66](https://github.com/Xunnamius/symbiote/blob/4622d77b8dbe6c643a89cc16b7f2f59cc5d27edf/src/commands/build/changelog.ts#L66)

A changelog patch that will be applied to the changelog file.

It mirrors the parameters of String.prototype.replace in form and
function. That is: each `ChangelogPatch` `searchValue` will be replaced by
`replaceValue` in the changelog file.

Note that replacements are made in-place, meaning order does matter.
