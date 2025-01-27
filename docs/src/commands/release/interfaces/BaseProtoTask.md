[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / BaseProtoTask

# Interface: BaseProtoTask

Defined in: [src/commands/release.ts:207](https://github.com/Xunnamius/symbiote/blob/29281df9337a36c0ddbf254c8452a1b8a68bf1a8/src/commands/release.ts#L207)

## Extended by

- [`ProtoPrereleaseTask`](ProtoPrereleaseTask.md)
- [`ProtoPostreleaseTask`](ProtoPostreleaseTask.md)

## Properties

### actionDescription?

> `optional` **actionDescription**: `string`

Defined in: [src/commands/release.ts:229](https://github.com/Xunnamius/symbiote/blob/29281df9337a36c0ddbf254c8452a1b8a68bf1a8/src/commands/release.ts#L229)

The description reported to the user when the task is run.

#### Default

`Running task #${id}`

***

### allowMissingNpmScripts?

> `optional` **allowMissingNpmScripts**: `boolean`

Defined in: [src/commands/release.ts:218](https://github.com/Xunnamius/symbiote/blob/29281df9337a36c0ddbf254c8452a1b8a68bf1a8/src/commands/release.ts#L218)

Whether the task will automatically fail if none of the scripts given in
`npmScripts` exist in the package's `package.json`.

#### Default

```ts
false
```

***

### emoji?

> `optional` **emoji**: `string`

Defined in: [src/commands/release.ts:238](https://github.com/Xunnamius/symbiote/blob/29281df9337a36c0ddbf254c8452a1b8a68bf1a8/src/commands/release.ts#L238)

A symbol that will be placed before symbiote output text concerning this
task.

***

### helpDescription

> **helpDescription**: `string`

Defined in: [src/commands/release.ts:233](https://github.com/Xunnamius/symbiote/blob/29281df9337a36c0ddbf254c8452a1b8a68bf1a8/src/commands/release.ts#L233)

The description reported to the user when `--help` is called.

***

### io?

> `optional` **io**: `StdoutStderrOptionCommon`\<`false`\>

Defined in: [src/commands/release.ts:253](https://github.com/Xunnamius/symbiote/blob/29281df9337a36c0ddbf254c8452a1b8a68bf1a8/src/commands/release.ts#L253)

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

***

### npmScripts?

> `optional` **npmScripts**: (`"version"` \| `"prepublish"` \| `"prepare"` \| `"prepublishOnly"` \| `"prepack"` \| `"postpack"` \| `"publish"` \| `"postpublish"` \| `"preinstall"` \| `"install"` \| `"postinstall"` \| `"preuninstall"` \| `"uninstall"` \| `"postuninstall"` \| `"preversion"` \| `"postversion"` \| `"pretest"` \| `"test"` \| `"posttest"` \| `"prestop"` \| `"stop"` \| `"poststop"` \| `"prestart"` \| `"start"` \| `"poststart"` \| `"prerestart"` \| `"restart"` \| `"postrestart"` \| `"build"` \| `"build:changelog"` \| `"build:dist"` \| `"build:docs"` \| `"build:topological"` \| `"clean"` \| `"deploy"` \| `"format"` \| `"info"` \| `"lint"` \| `"lint:package"` \| `"lint:packages"` \| `"lint:project"` \| `"list-tasks"` \| `"lint:topological"` \| `"release"` \| `"release:topological"` \| `"renovate"` \| `"dev"` \| `"test:package:all"` \| `"test:package:e2e"` \| `"test:package:integration"` \| `"test:package:unit"` \| `"test:packages:all"` \| `"test:topological"`)[]

Defined in: [src/commands/release.ts:223](https://github.com/Xunnamius/symbiote/blob/29281df9337a36c0ddbf254c8452a1b8a68bf1a8/src/commands/release.ts#L223)

Run only the first NPM script in `npmScripts` that is found in the
package's `package.json`.

***

### run?

> `optional` **run**: [`ProtoReleaseTaskRunner`](../type-aliases/ProtoReleaseTaskRunner.md)

Defined in: [src/commands/release.ts:257](https://github.com/Xunnamius/symbiote/blob/29281df9337a36c0ddbf254c8452a1b8a68bf1a8/src/commands/release.ts#L257)

A function called when the task is triggered.

***

### skippable

> **skippable**: `boolean`

Defined in: [src/commands/release.ts:211](https://github.com/Xunnamius/symbiote/blob/29281df9337a36c0ddbf254c8452a1b8a68bf1a8/src/commands/release.ts#L211)

Whether the task can be skipped by the user or not.
