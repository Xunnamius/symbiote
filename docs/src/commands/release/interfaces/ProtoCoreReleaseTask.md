[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ProtoCoreReleaseTask

# Interface: ProtoCoreReleaseTask

Defined in: [src/commands/release.ts:263](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/release.ts#L263)

A partially defined release-`type` [ReleaseTask](../type-aliases/ReleaseTask.md).

## Extends

- `Omit`\<[`BaseProtoTask`](BaseProtoTask.md), `"skippable"` \| `"npmScripts"` \| `"emoji"`\>

## Properties

### actionDescription?

> `optional` **actionDescription**: `string`

Defined in: [src/commands/release.ts:215](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/release.ts#L215)

The description reported to the user when the task is run.

#### Default

`Running task #${id}`

#### Inherited from

`Omit.actionDescription`

***

### allowMissingNpmScripts?

> `optional` **allowMissingNpmScripts**: `boolean`

Defined in: [src/commands/release.ts:204](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/release.ts#L204)

Whether the task will automatically fail if none of the scripts given in
`npmScripts` exist in the package's `package.json`.

#### Default

```ts
false
```

#### Inherited from

`Omit.allowMissingNpmScripts`

***

### emoji?

> `optional` **emoji**: `""`

Defined in: [src/commands/release.ts:267](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/release.ts#L267)

***

### helpDescription

> **helpDescription**: `string`

Defined in: [src/commands/release.ts:219](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/release.ts#L219)

The description reported to the user when `--help` is called.

#### Inherited from

`Omit.helpDescription`

***

### io?

> `optional` **io**: `StdoutStderrOptionCommon`\<`false`\>

Defined in: [src/commands/release.ts:239](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/release.ts#L239)

Determines how the process's `stdout` and `stdin` streams will be
configured when executing [npmScripts](BaseProtoTask.md#npmscripts). Does not apply to `run` or
[ProtoReleaseTaskRunner](../type-aliases/ProtoReleaseTaskRunner.md).

This should always be left as `'pipe'` (the default) unless the task is the
only member of its task group (in which case `'inherit'` may be
appropriate).

Note that this value may be overridden (with `'ignore'`) if the user
supplies `--hush`/`--quiet`/`--silent`.

#### Default

```ts
'pipe'
```

#### Inherited from

`Omit.io`

***

### npmScripts?

> `optional` **npmScripts**: `never`[]

Defined in: [src/commands/release.ts:266](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/release.ts#L266)

***

### run?

> `optional` **run**: [`ProtoReleaseTaskRunner`](../type-aliases/ProtoReleaseTaskRunner.md)

Defined in: [src/commands/release.ts:243](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/release.ts#L243)

A function called when the task is triggered.

#### Inherited from

`Omit.run`

***

### skippable?

> `optional` **skippable**: `false`

Defined in: [src/commands/release.ts:265](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/release.ts#L265)
