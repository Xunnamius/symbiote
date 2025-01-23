[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ProtoPrereleaseTask

# Interface: ProtoPrereleaseTask

Defined in: [src/commands/release.ts:263](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/commands/release.ts#L263)

A partially defined prerelease-`type` [ReleaseTask](../type-aliases/ReleaseTask.md).

## Extends

- [`BaseProtoTask`](BaseProtoTask.md)

## Properties

### actionDescription?

> `optional` **actionDescription**: `string`

Defined in: [src/commands/release.ts:229](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/commands/release.ts#L229)

The description reported to the user when the task is run.

#### Default

`Running task #${id}`

#### Inherited from

[`BaseProtoTask`](BaseProtoTask.md).[`actionDescription`](BaseProtoTask.md#actiondescription)

***

### allowMissingNpmScripts?

> `optional` **allowMissingNpmScripts**: `boolean`

Defined in: [src/commands/release.ts:218](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/commands/release.ts#L218)

Whether the task will automatically fail if none of the scripts given in
`npmScripts` exist in the package's `package.json`.

#### Default

```ts
false
```

#### Inherited from

[`BaseProtoTask`](BaseProtoTask.md).[`allowMissingNpmScripts`](BaseProtoTask.md#allowmissingnpmscripts)

***

### emoji?

> `optional` **emoji**: `string`

Defined in: [src/commands/release.ts:238](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/commands/release.ts#L238)

A symbol that will be placed before symbiote output text concerning this
task.

#### Inherited from

[`BaseProtoTask`](BaseProtoTask.md).[`emoji`](BaseProtoTask.md#emoji)

***

### helpDescription

> **helpDescription**: `string`

Defined in: [src/commands/release.ts:233](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/commands/release.ts#L233)

The description reported to the user when `--help` is called.

#### Inherited from

[`BaseProtoTask`](BaseProtoTask.md).[`helpDescription`](BaseProtoTask.md#helpdescription)

***

### io?

> `optional` **io**: `StdoutStderrOptionCommon`\<`false`\>

Defined in: [src/commands/release.ts:253](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/commands/release.ts#L253)

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

[`BaseProtoTask`](BaseProtoTask.md).[`io`](BaseProtoTask.md#io)

***

### npmScripts?

> `optional` **npmScripts**: (`"version"` \| `"prepublish"` \| `"prepare"` \| `"prepublishOnly"` \| `"prepack"` \| `"postpack"` \| `"publish"` \| `"postpublish"` \| `"preinstall"` \| `"install"` \| `"postinstall"` \| `"preuninstall"` \| `"uninstall"` \| `"postuninstall"` \| `"preversion"` \| `"postversion"` \| `"pretest"` \| `"test"` \| `"posttest"` \| `"prestop"` \| `"stop"` \| `"poststop"` \| `"prestart"` \| `"start"` \| `"poststart"` \| `"prerestart"` \| `"restart"` \| `"postrestart"` \| `"build"` \| `"build:changelog"` \| `"build:dist"` \| `"build:docs"` \| `"build:topological"` \| `"clean"` \| `"deploy"` \| `"format"` \| `"info"` \| `"lint"` \| `"lint:package"` \| `"lint:packages"` \| `"lint:project"` \| `"list-tasks"` \| `"lint:topological"` \| `"release"` \| `"release:topological"` \| `"renovate"` \| `"dev"` \| `"test:package:all"` \| `"test:package:e2e"` \| `"test:package:integration"` \| `"test:package:unit"` \| `"test:packages:all"` \| `"test:topological"`)[]

Defined in: [src/commands/release.ts:223](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/commands/release.ts#L223)

Run only the first NPM script in `npmScripts` that is found in the
package's `package.json`.

#### Inherited from

[`BaseProtoTask`](BaseProtoTask.md).[`npmScripts`](BaseProtoTask.md#npmscripts)

***

### run?

> `optional` **run**: [`ProtoReleaseTaskRunner`](../type-aliases/ProtoReleaseTaskRunner.md)

Defined in: [src/commands/release.ts:257](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/commands/release.ts#L257)

A function called when the task is triggered.

#### Inherited from

[`BaseProtoTask`](BaseProtoTask.md).[`run`](BaseProtoTask.md#run)

***

### skippable

> **skippable**: `boolean`

Defined in: [src/commands/release.ts:211](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/commands/release.ts#L211)

Whether the task can be skipped by the user or not.

#### Inherited from

[`BaseProtoTask`](BaseProtoTask.md).[`skippable`](BaseProtoTask.md#skippable)

***

### type?

> `optional` **type**: `"pre"`

Defined in: [src/commands/release.ts:264](https://github.com/Xunnamius/symbiote/blob/da0014a3d8fa3571177d2af968ce57f9fecbb1ee/src/commands/release.ts#L264)
