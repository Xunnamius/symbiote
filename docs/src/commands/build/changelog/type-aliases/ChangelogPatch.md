[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ChangelogPatch

# Type Alias: ChangelogPatch

> **ChangelogPatch** = \[`string` \| `RegExp`, `string`\]

Defined in: [src/commands/build/changelog.ts:63](https://github.com/Xunnamius/symbiote/blob/3cb0503ce3cd2a8bfb437c5dfd67c1fcba9d10cc/src/commands/build/changelog.ts#L63)

A changelog patch that will be applied to the changelog file.

It mirrors the parameters of String.prototype.replace in form and
function. That is: each `ChangelogPatch` `searchValue` will be replaced by
`replaceValue` in the changelog file.

Note that replacements are made in-place, meaning order does matter.
