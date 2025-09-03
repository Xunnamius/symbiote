[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ReleaseTask

# Type Alias: ReleaseTask

> **ReleaseTask** = \{ `actionDescription?`: `string`; `allowMissingNpmScripts`: `boolean`; `emoji?`: `string`; `helpDescription`: `string`; `id`: `number`; `io`: `RunOptions`\[`"stdout"`\]; `npmScripts`: `StringKeyOf`\<`OmitIndexSignature`\<`NonNullable`\<`XPackageJson`\[`"scripts"`\]\>\>\>[]; `run?`: [`ReleaseTaskRunner`](ReleaseTaskRunner.md); `skippable`: `boolean`; `type`: `"pre"` \| `"post"`; \} \| \{ `actionDescription?`: `string`; `allowMissingNpmScripts`: `boolean`; `emoji?`: `string`; `helpDescription`: `string`; `id`: `number`; `io`: `RunOptions`\[`"stdout"`\]; `npmScripts`: `never`[]; `run?`: [`ReleaseTaskRunner`](ReleaseTaskRunner.md); `skippable`: `false`; `type`: `"release"`; \}

Defined in: [src/commands/release.ts:167](https://github.com/Xunnamius/symbiote/blob/5baec034070630bef8d87e6af86e863ce8273a75/src/commands/release.ts#L167)

A prerelease, release, or postrelease task to be executed by this command.
