[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ReleaseTask

# Type Alias: ReleaseTask

> **ReleaseTask**: \{ `actionDescription`: `string`; `allowMissingNpmScripts`: `boolean`; `emoji`: `string`; `helpDescription`: `string`; `id`: `number`; `io`: `RunOptions`\[`"stdout"`\]; `npmScripts`: `StringKeyOf`\<`OmitIndexSignature`\<`NonNullable`\<`XPackageJson`\[`"scripts"`\]\>\>\>[]; `run`: [`ReleaseTaskRunner`](ReleaseTaskRunner.md); `skippable`: `boolean`; `type`: `"pre"` \| `"post"`; \} \| \{ `actionDescription`: `string`; `allowMissingNpmScripts`: `boolean`; `emoji`: `string`; `helpDescription`: `string`; `id`: `number`; `io`: `RunOptions`\[`"stdout"`\]; `npmScripts`: `never`[]; `run`: [`ReleaseTaskRunner`](ReleaseTaskRunner.md); `skippable`: `false`; `type`: `"release"`; \}

Defined in: [src/commands/release.ts:179](https://github.com/Xunnamius/symbiote/blob/150bd8f520450f76cdfe81296a884f439e925685/src/commands/release.ts#L179)

A prerelease, release, or postrelease task to be executed by this command.
