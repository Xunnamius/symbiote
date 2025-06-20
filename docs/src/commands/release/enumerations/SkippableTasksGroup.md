[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / SkippableTasksGroup

# Enumeration: SkippableTasksGroup

Defined in: [src/commands/release.ts:96](https://github.com/Xunnamius/symbiote/blob/c1464a297410c83c8e7e7e880f016b0d4a6a426a/src/commands/release.ts#L96)

Well-known names representing groups of tasks to be skipped when running the
release process.

## Enumeration Members

### AllManualPrereleaseTasks

> **AllManualPrereleaseTasks**: `"manual"`

Defined in: [src/commands/release.ts:117](https://github.com/Xunnamius/symbiote/blob/c1464a297410c83c8e7e7e880f016b0d4a6a426a/src/commands/release.ts#L117)

A string that can be passed to --skip-tasks representing all prerelease
tasks that should be skipped when following "Manual Release Method 2" in
`MAINTAINING.md`.

***

### AllPostReleaseTasks

> **AllPostReleaseTasks**: `"postrelease"`

Defined in: [src/commands/release.ts:111](https://github.com/Xunnamius/symbiote/blob/c1464a297410c83c8e7e7e880f016b0d4a6a426a/src/commands/release.ts#L111)

A string that can be passed to --skip-tasks representing all postrelease
tasks.

***

### AllPrereleaseTasks

> **AllPrereleaseTasks**: `"prerelease"`

Defined in: [src/commands/release.ts:106](https://github.com/Xunnamius/symbiote/blob/c1464a297410c83c8e7e7e880f016b0d4a6a426a/src/commands/release.ts#L106)

A string that can be passed to --skip-tasks representing all prerelease
tasks.

***

### AllTasks

> **AllTasks**: `"all"`

Defined in: [src/commands/release.ts:101](https://github.com/Xunnamius/symbiote/blob/c1464a297410c83c8e7e7e880f016b0d4a6a426a/src/commands/release.ts#L101)

A string that can be passed to --skip-tasks representing all prerelease and
postrelease tasks.
