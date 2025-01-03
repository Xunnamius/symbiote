[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ImportedChangelogPatcher

# Type Alias: ImportedChangelogPatcher

> **ImportedChangelogPatcher**: [`ChangelogPatches`](ChangelogPatches.md) \| [`ChangelogPatcherFunction`](ChangelogPatcherFunction.md)

Defined in: [src/commands/build/changelog.ts:108](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/build/changelog.ts#L108)

Represents the result of importing a `changelog.patch.mjs` file.
`changelog.patch.mjs` can export via default either
[ChangelogPatcherFunction](ChangelogPatcherFunction.md) or a [ChangelogPatches](ChangelogPatches.md) array.
