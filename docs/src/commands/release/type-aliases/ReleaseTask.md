[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/release](../README.md) / ReleaseTask

# Type Alias: ReleaseTask

> **ReleaseTask**: \{ `actionDescription`: `string`; `allowMissingNpmScripts`: `boolean`; `emoji`: `string`; `helpDescription`: `string`; `id`: `number`; `io`: `RunOptions`\[`"stdout"`\]; `npmScripts`: `StringKeyOf`\<`OmitIndexSignature`\<`NonNullable`\<`XPackageJson`\[`"scripts"`\]\>\>\>[]; `run`: [`ReleaseTaskRunner`](ReleaseTaskRunner.md); `skippable`: `boolean`; `type`: `"pre"` \| `"post"`; \} \| \{ `actionDescription`: `string`; `allowMissingNpmScripts`: `boolean`; `emoji`: `string`; `helpDescription`: `string`; `id`: `number`; `io`: `RunOptions`\[`"stdout"`\]; `npmScripts`: `never`[]; `run`: [`ReleaseTaskRunner`](ReleaseTaskRunner.md); `skippable`: `false`; `type`: `"release"`; \}

Defined in: [src/commands/release.ts:173](https://github.com/Xunnamius/symbiote/blob/5ab38d0bb0a593488721fdd41b6c1fcc4618d081/src/commands/release.ts#L173)

A prerelease, release, or postrelease task to be executed by this command.
