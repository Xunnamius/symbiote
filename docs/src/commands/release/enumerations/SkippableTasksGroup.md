[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / SkippableTasksGroup

# Enumeration: SkippableTasksGroup

Defined in: [src/commands/release.ts:101](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/release.ts#L101)

Well-known names representing groups of tasks to be skipped when running the
release process.

## Enumeration Members

### AllManualPrereleaseTasks

> **AllManualPrereleaseTasks**: `"manual"`

Defined in: [src/commands/release.ts:122](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/release.ts#L122)

A string that can be passed to --skip-tasks representing all prerelease
tasks that should be skipped when following "Manual Release Method 2" in
`MAINTAINING.md`.

***

### AllPostReleaseTasks

> **AllPostReleaseTasks**: `"postrelease"`

Defined in: [src/commands/release.ts:116](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/release.ts#L116)

A string that can be passed to --skip-tasks representing all postrelease
tasks.

***

### AllPrereleaseTasks

> **AllPrereleaseTasks**: `"prerelease"`

Defined in: [src/commands/release.ts:111](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/release.ts#L111)

A string that can be passed to --skip-tasks representing all prerelease
tasks.

***

### AllTasks

> **AllTasks**: `"all"`

Defined in: [src/commands/release.ts:106](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/release.ts#L106)

A string that can be passed to --skip-tasks representing all prerelease and
postrelease tasks.
