[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / SkippableTasksGroup

# Enumeration: SkippableTasksGroup

Defined in: [src/commands/release.ts:93](https://github.com/Xunnamius/symbiote/blob/b809268e30856c31f49ff4f21b64fdeab8d49e28/src/commands/release.ts#L93)

Well-known names representing groups of tasks to be skipped when running the
release process.

## Enumeration Members

### AllManualPrereleaseTasks

> **AllManualPrereleaseTasks**: `"manual"`

Defined in: [src/commands/release.ts:114](https://github.com/Xunnamius/symbiote/blob/b809268e30856c31f49ff4f21b64fdeab8d49e28/src/commands/release.ts#L114)

A string that can be passed to --skip-tasks representing all prerelease
tasks that should be skipped when following "Manual Release Method 2" in
`MAINTAINING.md`.

***

### AllPostReleaseTasks

> **AllPostReleaseTasks**: `"postrelease"`

Defined in: [src/commands/release.ts:108](https://github.com/Xunnamius/symbiote/blob/b809268e30856c31f49ff4f21b64fdeab8d49e28/src/commands/release.ts#L108)

A string that can be passed to --skip-tasks representing all postrelease
tasks.

***

### AllPrereleaseTasks

> **AllPrereleaseTasks**: `"prerelease"`

Defined in: [src/commands/release.ts:103](https://github.com/Xunnamius/symbiote/blob/b809268e30856c31f49ff4f21b64fdeab8d49e28/src/commands/release.ts#L103)

A string that can be passed to --skip-tasks representing all prerelease
tasks.

***

### AllTasks

> **AllTasks**: `"all"`

Defined in: [src/commands/release.ts:98](https://github.com/Xunnamius/symbiote/blob/b809268e30856c31f49ff4f21b64fdeab8d49e28/src/commands/release.ts#L98)

A string that can be passed to --skip-tasks representing all prerelease and
postrelease tasks.
