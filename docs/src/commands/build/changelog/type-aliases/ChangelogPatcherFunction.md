[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / ChangelogPatcherFunction

# Type Alias: ChangelogPatcherFunction()

> **ChangelogPatcherFunction** = (`changelog`, `patcher`) => `Promisable`\<`string`\>

Defined in: [src/commands/build/changelog.ts:86](https://github.com/Xunnamius/symbiote/blob/2a4f9c137a879b6e0d19dc7269398051d3a84f5e/src/commands/build/changelog.ts#L86)

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
