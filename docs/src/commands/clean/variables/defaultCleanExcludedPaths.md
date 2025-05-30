[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/clean](../README.md) / defaultCleanExcludedPaths

# Variable: defaultCleanExcludedPaths

> `const` **defaultCleanExcludedPaths**: `string`[]

Defined in: [src/commands/clean.ts:36](https://github.com/Xunnamius/symbiote/blob/b4ce62825fc0ab0648e371a38e522f8ee71b6ea1/src/commands/clean.ts#L36)

These are the default regular expressions matching paths that are excluded
from deletion when running the "clean" command.

Paths that should only match directories must include a trailing slash. Paths
that should match at any depth (including project root) should be prefixed
with `(^|/)`. Note that periods must be escaped (i.e. `'\\.'`).
