[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / SkippableTasksGroup

# Enumeration: SkippableTasksGroup

Defined in: [src/commands/release.ts:113](https://github.com/Xunnamius/symbiote/blob/8fd852f7d3d2b033b941b077eff32144929c5b55/src/commands/release.ts#L113)

Well-known names representing groups of tasks to be skipped when running the
release process.

## Enumeration Members

### AllManualPrereleaseTasks

> **AllManualPrereleaseTasks**: `"manual"`

Defined in: [src/commands/release.ts:134](https://github.com/Xunnamius/symbiote/blob/8fd852f7d3d2b033b941b077eff32144929c5b55/src/commands/release.ts#L134)

A string that can be passed to --skip-tasks representing all prerelease
tasks that should be skipped when following "Manual Release Method 2" in
`MAINTAINING.md`.

***

### AllPostReleaseTasks

> **AllPostReleaseTasks**: `"postrelease"`

Defined in: [src/commands/release.ts:128](https://github.com/Xunnamius/symbiote/blob/8fd852f7d3d2b033b941b077eff32144929c5b55/src/commands/release.ts#L128)

A string that can be passed to --skip-tasks representing all postrelease
tasks.

***

### AllPrereleaseTasks

> **AllPrereleaseTasks**: `"prerelease"`

Defined in: [src/commands/release.ts:123](https://github.com/Xunnamius/symbiote/blob/8fd852f7d3d2b033b941b077eff32144929c5b55/src/commands/release.ts#L123)

A string that can be passed to --skip-tasks representing all prerelease
tasks.

***

### AllTasks

> **AllTasks**: `"all"`

Defined in: [src/commands/release.ts:118](https://github.com/Xunnamius/symbiote/blob/8fd852f7d3d2b033b941b077eff32144929c5b55/src/commands/release.ts#L118)

A string that can be passed to --skip-tasks representing all prerelease and
postrelease tasks.
