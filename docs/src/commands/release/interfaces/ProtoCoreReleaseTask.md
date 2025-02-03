[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ProtoCoreReleaseTask

# Interface: ProtoCoreReleaseTask

Defined in: [src/commands/release.ts:277](https://github.com/Xunnamius/symbiote/blob/c906eda89d66141c6f3c16d7f7097163c518f8e6/src/commands/release.ts#L277)

A partially defined release-`type` [ReleaseTask](../type-aliases/ReleaseTask.md).

## Extends

- `Omit`\<[`BaseProtoTask`](BaseProtoTask.md), `"skippable"` \| `"npmScripts"` \| `"emoji"`\>

## Properties

### actionDescription?

> `optional` **actionDescription**: `string`

Defined in: [src/commands/release.ts:229](https://github.com/Xunnamius/symbiote/blob/c906eda89d66141c6f3c16d7f7097163c518f8e6/src/commands/release.ts#L229)

The description reported to the user when the task is run.

#### Default

`Running task #${id}`

#### Inherited from

`Omit.actionDescription`

***

### allowMissingNpmScripts?

> `optional` **allowMissingNpmScripts**: `boolean`

Defined in: [src/commands/release.ts:218](https://github.com/Xunnamius/symbiote/blob/c906eda89d66141c6f3c16d7f7097163c518f8e6/src/commands/release.ts#L218)

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

Defined in: [src/commands/release.ts:281](https://github.com/Xunnamius/symbiote/blob/c906eda89d66141c6f3c16d7f7097163c518f8e6/src/commands/release.ts#L281)

***

### helpDescription

> **helpDescription**: `string`

Defined in: [src/commands/release.ts:233](https://github.com/Xunnamius/symbiote/blob/c906eda89d66141c6f3c16d7f7097163c518f8e6/src/commands/release.ts#L233)

The description reported to the user when `--help` is called.

#### Inherited from

`Omit.helpDescription`

***

### io?

> `optional` **io**: `StdoutStderrOptionCommon`\<`false`\>

Defined in: [src/commands/release.ts:253](https://github.com/Xunnamius/symbiote/blob/c906eda89d66141c6f3c16d7f7097163c518f8e6/src/commands/release.ts#L253)

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

Defined in: [src/commands/release.ts:280](https://github.com/Xunnamius/symbiote/blob/c906eda89d66141c6f3c16d7f7097163c518f8e6/src/commands/release.ts#L280)

***

### run?

> `optional` **run**: [`ProtoReleaseTaskRunner`](../type-aliases/ProtoReleaseTaskRunner.md)

Defined in: [src/commands/release.ts:257](https://github.com/Xunnamius/symbiote/blob/c906eda89d66141c6f3c16d7f7097163c518f8e6/src/commands/release.ts#L257)

A function called when the task is triggered.

#### Inherited from

`Omit.run`

***

### skippable?

> `optional` **skippable**: `false`

Defined in: [src/commands/release.ts:279](https://github.com/Xunnamius/symbiote/blob/c906eda89d66141c6f3c16d7f7097163c518f8e6/src/commands/release.ts#L279)
