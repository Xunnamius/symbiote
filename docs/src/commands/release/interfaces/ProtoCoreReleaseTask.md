[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ProtoCoreReleaseTask

# Interface: ProtoCoreReleaseTask

Defined in: [src/commands/release.ts:265](https://github.com/Xunnamius/symbiote/blob/c3f7fbdb0b36164c8890b842485989d2e0a3c698/src/commands/release.ts#L265)

A partially defined release-`type` [ReleaseTask](../type-aliases/ReleaseTask.md).

## Extends

- `Omit`\<[`BaseProtoTask`](BaseProtoTask.md), `"skippable"` \| `"npmScripts"` \| `"emoji"`\>

## Properties

### actionDescription?

> `optional` **actionDescription**: `string`

Defined in: [src/commands/release.ts:217](https://github.com/Xunnamius/symbiote/blob/c3f7fbdb0b36164c8890b842485989d2e0a3c698/src/commands/release.ts#L217)

The description reported to the user when the task is run.

#### Default

`Running task #${id}`

#### Inherited from

`Omit.actionDescription`

***

### allowMissingNpmScripts?

> `optional` **allowMissingNpmScripts**: `boolean`

Defined in: [src/commands/release.ts:206](https://github.com/Xunnamius/symbiote/blob/c3f7fbdb0b36164c8890b842485989d2e0a3c698/src/commands/release.ts#L206)

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

Defined in: [src/commands/release.ts:269](https://github.com/Xunnamius/symbiote/blob/c3f7fbdb0b36164c8890b842485989d2e0a3c698/src/commands/release.ts#L269)

***

### helpDescription

> **helpDescription**: `string`

Defined in: [src/commands/release.ts:221](https://github.com/Xunnamius/symbiote/blob/c3f7fbdb0b36164c8890b842485989d2e0a3c698/src/commands/release.ts#L221)

The description reported to the user when `--help` is called.

#### Inherited from

`Omit.helpDescription`

***

### io?

> `optional` **io**: `StdoutStderrOptionCommon`\<`false`\>

Defined in: [src/commands/release.ts:241](https://github.com/Xunnamius/symbiote/blob/c3f7fbdb0b36164c8890b842485989d2e0a3c698/src/commands/release.ts#L241)

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

Defined in: [src/commands/release.ts:268](https://github.com/Xunnamius/symbiote/blob/c3f7fbdb0b36164c8890b842485989d2e0a3c698/src/commands/release.ts#L268)

***

### run?

> `optional` **run**: [`ProtoReleaseTaskRunner`](../type-aliases/ProtoReleaseTaskRunner.md)

Defined in: [src/commands/release.ts:245](https://github.com/Xunnamius/symbiote/blob/c3f7fbdb0b36164c8890b842485989d2e0a3c698/src/commands/release.ts#L245)

A function called when the task is triggered.

#### Inherited from

`Omit.run`

***

### skippable?

> `optional` **skippable**: `false`

Defined in: [src/commands/release.ts:267](https://github.com/Xunnamius/symbiote/blob/c3f7fbdb0b36164c8890b842485989d2e0a3c698/src/commands/release.ts#L267)
