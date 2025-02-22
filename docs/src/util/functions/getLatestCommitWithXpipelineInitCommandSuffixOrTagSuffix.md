[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix

# Function: getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix()

> **getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix**(`tagPrefix`): `Promise`\<`string`\>

Defined in: [src/util.ts:1167](https://github.com/Xunnamius/symbiote/blob/4f71380506e8b2505a907d817794b6730bca4f95/src/util.ts#L1167)

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
