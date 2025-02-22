[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ChangelogPatcherFunction

# Type Alias: ChangelogPatcherFunction()

> **ChangelogPatcherFunction**: (`changelog`, `patcher`) => `Promisable`\<`string`\>

Defined in: [src/commands/build/changelog.ts:87](https://github.com/Xunnamius/symbiote/blob/4f71380506e8b2505a907d817794b6730bca4f95/src/commands/build/changelog.ts#L87)

A function that receives the current contents of the changelog file and a
`patcher` function. `ChangelogPatcherFunction` must return a string that will
become the new contents of the changelog file.

`patcher` is the optional second parameter of `ChangelogPatcherFunction` that
accepts a `changelog` string and `patches`, which is an array of
[ChangelogPatches](ChangelogPatches.md). `patcher` can be used to quickly apply an array of
`patches` to the given `changelog` string. Its use is entirely optional.

`changelog.patch.mjs` can export via default either
`ChangelogPatcherFunction` or a [ChangelogPatches](ChangelogPatches.md) array.

## Parameters

### changelog

`string`

### patcher

(`changelog`, `patches`) => `string`

## Returns

`Promisable`\<`string`\>
