[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / SkippableTasksGroup

# Enumeration: SkippableTasksGroup

Defined in: [src/commands/release.ts:112](https://github.com/Xunnamius/symbiote/blob/a116b07afe112308bfdfdf94cf09246be76165ef/src/commands/release.ts#L112)

Well-known names representing groups of tasks to be skipped when running the
release process.

## Enumeration Members

### AllManualPrereleaseTasks

> **AllManualPrereleaseTasks**: `"manual"`

Defined in: [src/commands/release.ts:133](https://github.com/Xunnamius/symbiote/blob/a116b07afe112308bfdfdf94cf09246be76165ef/src/commands/release.ts#L133)

A string that can be passed to --skip-tasks representing all prerelease
tasks that should be skipped when following "Manual Release Method 2" in
`MAINTAINING.md`.

***

### AllPostReleaseTasks

> **AllPostReleaseTasks**: `"postrelease"`

Defined in: [src/commands/release.ts:127](https://github.com/Xunnamius/symbiote/blob/a116b07afe112308bfdfdf94cf09246be76165ef/src/commands/release.ts#L127)

A string that can be passed to --skip-tasks representing all postrelease
tasks.

***

### AllPrereleaseTasks

> **AllPrereleaseTasks**: `"prerelease"`

Defined in: [src/commands/release.ts:122](https://github.com/Xunnamius/symbiote/blob/a116b07afe112308bfdfdf94cf09246be76165ef/src/commands/release.ts#L122)

A string that can be passed to --skip-tasks representing all prerelease
tasks.

***

### AllTasks

> **AllTasks**: `"all"`

Defined in: [src/commands/release.ts:117](https://github.com/Xunnamius/symbiote/blob/a116b07afe112308bfdfdf94cf09246be76165ef/src/commands/release.ts#L117)

A string that can be passed to --skip-tasks representing all prerelease and
postrelease tasks.
