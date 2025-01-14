[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ImportedChangelogPatcher

# Type Alias: ImportedChangelogPatcher

> **ImportedChangelogPatcher**: [`ChangelogPatches`](ChangelogPatches.md) \| [`ChangelogPatcherFunction`](ChangelogPatcherFunction.md)

Defined in: [src/commands/build/changelog.ts:109](https://github.com/Xunnamius/symbiote/blob/e4a3480a34344acbb42f5fad75ae58e0064f0a51/src/commands/build/changelog.ts#L109)

Represents the result of importing a `changelog.patch.mjs` file.
`changelog.patch.mjs` can export via default either
[ChangelogPatcherFunction](ChangelogPatcherFunction.md) or a [ChangelogPatches](ChangelogPatches.md) array.
