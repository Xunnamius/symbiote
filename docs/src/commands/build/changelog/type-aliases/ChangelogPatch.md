[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ChangelogPatch

# Type Alias: ChangelogPatch

> **ChangelogPatch**: \[`string` \| `RegExp`, `string`\]

Defined in: [src/commands/build/changelog.ts:71](https://github.com/Xunnamius/symbiote/blob/baed18cf2f0c1f93d21647c3399a412c1e0a2c32/src/commands/build/changelog.ts#L71)

A changelog patch that will be applied to the changelog file.

It mirrors the parameters of String.prototype.replace in form and
function. That is: each `ChangelogPatch` `searchValue` will be replaced by
`replaceValue` in the changelog file.

Note that replacements are made in-place, meaning order does matter.
