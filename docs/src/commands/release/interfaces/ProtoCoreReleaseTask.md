[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ProtoCoreReleaseTask

# Interface: ProtoCoreReleaseTask

Defined in: [src/commands/release.ts:272](https://github.com/Xunnamius/symbiote/blob/0437dc127bb0574f19f66370b2ed3a70bfedfd5d/src/commands/release.ts#L272)

A partially defined release-`type` [ReleaseTask](../type-aliases/ReleaseTask.md).

## Extends

- `Omit`\<[`BaseProtoTask`](BaseProtoTask.md), `"skippable"` \| `"npmScripts"` \| `"emoji"`\>

## Properties

### actionDescription?

> `optional` **actionDescription**: `string`

Defined in: [src/commands/release.ts:224](https://github.com/Xunnamius/symbiote/blob/0437dc127bb0574f19f66370b2ed3a70bfedfd5d/src/commands/release.ts#L224)

The description reported to the user when the task is run.

#### Default

`Running task #${id}`

#### Inherited from

`Omit.actionDescription`

***

### allowMissingNpmScripts?

> `optional` **allowMissingNpmScripts**: `boolean`

Defined in: [src/commands/release.ts:213](https://github.com/Xunnamius/symbiote/blob/0437dc127bb0574f19f66370b2ed3a70bfedfd5d/src/commands/release.ts#L213)

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

Defined in: [src/commands/release.ts:276](https://github.com/Xunnamius/symbiote/blob/0437dc127bb0574f19f66370b2ed3a70bfedfd5d/src/commands/release.ts#L276)

***

### helpDescription

> **helpDescription**: `string`

Defined in: [src/commands/release.ts:228](https://github.com/Xunnamius/symbiote/blob/0437dc127bb0574f19f66370b2ed3a70bfedfd5d/src/commands/release.ts#L228)

The description reported to the user when `--help` is called.

#### Inherited from

`Omit.helpDescription`

***

### io?

> `optional` **io**: `StdoutStderrOptionCommon`\<`false`\>

Defined in: [src/commands/release.ts:248](https://github.com/Xunnamius/symbiote/blob/0437dc127bb0574f19f66370b2ed3a70bfedfd5d/src/commands/release.ts#L248)

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

Defined in: [src/commands/release.ts:275](https://github.com/Xunnamius/symbiote/blob/0437dc127bb0574f19f66370b2ed3a70bfedfd5d/src/commands/release.ts#L275)

***

### run?

> `optional` **run**: [`ProtoReleaseTaskRunner`](../type-aliases/ProtoReleaseTaskRunner.md)

Defined in: [src/commands/release.ts:252](https://github.com/Xunnamius/symbiote/blob/0437dc127bb0574f19f66370b2ed3a70bfedfd5d/src/commands/release.ts#L252)

A function called when the task is triggered.

#### Inherited from

`Omit.run`

***

### skippable?

> `optional` **skippable**: `false`

Defined in: [src/commands/release.ts:274](https://github.com/Xunnamius/symbiote/blob/0437dc127bb0574f19f66370b2ed3a70bfedfd5d/src/commands/release.ts#L274)
