[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / SkippableTasksGroup

# Enumeration: SkippableTasksGroup

Defined in: [src/commands/release.ts:95](https://github.com/Xunnamius/symbiote/blob/3708c142929779cedae6f80fd8d92e8d468daaf9/src/commands/release.ts#L95)

Well-known names representing groups of tasks to be skipped when running the
release process.

## Enumeration Members

### AllManualPrereleaseTasks

> **AllManualPrereleaseTasks**: `"manual"`

Defined in: [src/commands/release.ts:116](https://github.com/Xunnamius/symbiote/blob/3708c142929779cedae6f80fd8d92e8d468daaf9/src/commands/release.ts#L116)

A string that can be passed to --skip-tasks representing all prerelease
tasks that should be skipped when following "Manual Release Method 2" in
`MAINTAINING.md`.

***

### AllPostReleaseTasks

> **AllPostReleaseTasks**: `"postrelease"`

Defined in: [src/commands/release.ts:110](https://github.com/Xunnamius/symbiote/blob/3708c142929779cedae6f80fd8d92e8d468daaf9/src/commands/release.ts#L110)

A string that can be passed to --skip-tasks representing all postrelease
tasks.

***

### AllPrereleaseTasks

> **AllPrereleaseTasks**: `"prerelease"`

Defined in: [src/commands/release.ts:105](https://github.com/Xunnamius/symbiote/blob/3708c142929779cedae6f80fd8d92e8d468daaf9/src/commands/release.ts#L105)

A string that can be passed to --skip-tasks representing all prerelease
tasks.

***

### AllTasks

> **AllTasks**: `"all"`

Defined in: [src/commands/release.ts:100](https://github.com/Xunnamius/symbiote/blob/3708c142929779cedae6f80fd8d92e8d468daaf9/src/commands/release.ts#L100)

A string that can be passed to --skip-tasks representing all prerelease and
postrelease tasks.
