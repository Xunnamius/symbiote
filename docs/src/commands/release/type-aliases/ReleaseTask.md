[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ReleaseTask

# Type Alias: ReleaseTask

> **ReleaseTask** = \{ `actionDescription?`: `string`; `allowMissingNpmScripts`: `boolean`; `emoji?`: `string`; `helpDescription`: `string`; `id`: `number`; `io`: `RunOptions`\[`"stdout"`\]; `npmScripts`: `KeyAsString`\<`OmitIndexSignature`\<`NonNullable`\<`XPackageJson`\[`"scripts"`\]\>\>\>[]; `run?`: [`ReleaseTaskRunner`](ReleaseTaskRunner.md); `skippable`: `boolean`; `type`: `"pre"` \| `"post"`; \} \| \{ `actionDescription?`: `string`; `allowMissingNpmScripts`: `boolean`; `emoji?`: `string`; `helpDescription`: `string`; `id`: `number`; `io`: `RunOptions`\[`"stdout"`\]; `npmScripts`: `never`[]; `run?`: [`ReleaseTaskRunner`](ReleaseTaskRunner.md); `skippable`: `false`; `type`: `"release"`; \}

Defined in: [src/commands/release.ts:167](https://github.com/Xunnamius/symbiote/blob/f20b0099c70f0313928eae8f1b370bfc00e9dda1/src/commands/release.ts#L167)

A prerelease, release, or postrelease task to be executed by this command.
