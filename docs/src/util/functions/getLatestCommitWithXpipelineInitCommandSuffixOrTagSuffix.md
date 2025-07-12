[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix

# Function: getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix()

> **getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix**(`tagPrefix`): `Promise`\<`string`\>

Defined in: [src/util.ts:1135](https://github.com/Xunnamius/symbiote/blob/0855f0d5d62e664369271e18eb03d2b348113c71/src/util.ts#L1135)

Return the commit-ish (SHA hash) of the most recent commit containing the
Xpipeline command suffix `[INIT]`, or being pointed to by a
`${tagPrefix}0.0.0-init` version tag. If no such commit could be found,
[noSpecialInitialCommitIndicator](../variables/noSpecialInitialCommitIndicator.md) is returned.

## Parameters

### tagPrefix

`string`

## Returns

`Promise`\<`string`\>

## See

XchangelogConfig
