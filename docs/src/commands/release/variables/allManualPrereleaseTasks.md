[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / allManualPrereleaseTasks

# Variable: allManualPrereleaseTasks

> `const` **allManualPrereleaseTasks**: `"manual"` = `'manual'`

Defined in: [src/commands/release.ts:126](https://github.com/Xunnamius/symbiote/blob/1546ab8527a571efe54081d7614bd35a9d6e0c3c/src/commands/release.ts#L126)

A string that can be passed to --skip-tasks representing all prerelease tasks
that should be skipped when following "Manual Release Method 2" in
`MAINTAINING.md`.

The skipped tasks are those manageable by an outside scheduler, making this
mode useful when integrating with tools like Turbo.
