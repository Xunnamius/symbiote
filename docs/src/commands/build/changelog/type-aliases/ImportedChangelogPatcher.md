[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ImportedChangelogPatcher

# Type Alias: ImportedChangelogPatcher

> **ImportedChangelogPatcher** = [`ChangelogPatches`](ChangelogPatches.md) \| [`ChangelogPatcherFunction`](ChangelogPatcherFunction.md)

Defined in: [src/commands/build/changelog.ts:96](https://github.com/Xunnamius/symbiote/blob/de44cf3f9abbc7550310bea0f718d51d9fdbe834/src/commands/build/changelog.ts#L96)

Represents the result of importing a `changelog.patch.mjs` file.
`changelog.patch.mjs` can export via default either
[ChangelogPatcherFunction](ChangelogPatcherFunction.md) or a [ChangelogPatches](ChangelogPatches.md) array.
