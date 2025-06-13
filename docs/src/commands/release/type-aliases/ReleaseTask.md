[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ReleaseTask

# Type Alias: ReleaseTask

> **ReleaseTask** = \{ `actionDescription?`: `string`; `allowMissingNpmScripts`: `boolean`; `emoji?`: `string`; `helpDescription`: `string`; `id`: `number`; `io`: `RunOptions`\[`"stdout"`\]; `npmScripts`: `StringKeyOf`\<`OmitIndexSignature`\<`NonNullable`\<`XPackageJson`\[`"scripts"`\]\>\>\>[]; `run?`: [`ReleaseTaskRunner`](ReleaseTaskRunner.md); `skippable`: `boolean`; `type`: `"pre"` \| `"post"`; \} \| \{ `actionDescription?`: `string`; `allowMissingNpmScripts`: `boolean`; `emoji?`: `string`; `helpDescription`: `string`; `id`: `number`; `io`: `RunOptions`\[`"stdout"`\]; `npmScripts`: `never`[]; `run?`: [`ReleaseTaskRunner`](ReleaseTaskRunner.md); `skippable`: `false`; `type`: `"release"`; \}

Defined in: [src/commands/release.ts:162](https://github.com/Xunnamius/symbiote/blob/877e3120bdc7f2c76a05ae6085d5ac57197fd79f/src/commands/release.ts#L162)

A prerelease, release, or postrelease task to be executed by this command.
