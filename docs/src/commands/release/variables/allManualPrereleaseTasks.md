[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / allManualPrereleaseTasks

# Variable: allManualPrereleaseTasks

> `const` **allManualPrereleaseTasks**: `"manual"` = `'manual'`

Defined in: [src/commands/release.ts:126](https://github.com/Xunnamius/symbiote/blob/2fd61c45d5639f5e6f8edadc3b7d4851011bc365/src/commands/release.ts#L126)

A string that can be passed to --skip-tasks representing all prerelease tasks
that should be skipped when following "Manual Release Method 2" in
`MAINTAINING.md`.

The skipped tasks are those manageable by an outside scheduler, making this
mode useful when integrating with tools like Turbo.
