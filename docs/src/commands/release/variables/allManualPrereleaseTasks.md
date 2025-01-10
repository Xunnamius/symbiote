[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / allManualPrereleaseTasks

# Variable: allManualPrereleaseTasks

> `const` **allManualPrereleaseTasks**: `"manual"` = `'manual'`

Defined in: [src/commands/release.ts:129](https://github.com/Xunnamius/symbiote/blob/ecdd713c4d242b92209fafa38beadafe2769795c/src/commands/release.ts#L129)

A string that can be passed to --skip-tasks representing all prerelease tasks
that should be skipped when following "Manual Release Method 2" in
`MAINTAINING.md`.

The skipped tasks are those manageable by an outside scheduler, making this
mode useful when integrating with tools like Turbo.
