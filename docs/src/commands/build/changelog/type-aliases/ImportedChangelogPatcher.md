[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ImportedChangelogPatcher

# Type Alias: ImportedChangelogPatcher

> **ImportedChangelogPatcher**: [`ChangelogPatches`](ChangelogPatches.md) \| [`ChangelogPatcherFunction`](ChangelogPatcherFunction.md)

Defined in: [src/commands/build/changelog.ts:108](https://github.com/Xunnamius/symbiote/blob/510118102ef530d135a286522a7a776ec12a8a72/src/commands/build/changelog.ts#L108)

Represents the result of importing a `changelog.patch.mjs` file.
`changelog.patch.mjs` can export via default either
[ChangelogPatcherFunction](ChangelogPatcherFunction.md) or a [ChangelogPatches](ChangelogPatches.md) array.
