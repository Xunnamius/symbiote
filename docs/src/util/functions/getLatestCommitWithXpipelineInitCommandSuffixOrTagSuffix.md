[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix

# Function: getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix()

> **getLatestCommitWithXpipelineInitCommandSuffixOrTagSuffix**(`tagPrefix`): `Promise`\<`string`\>

Defined in: [src/util.ts:1072](https://github.com/Xunnamius/symbiote/blob/3831af5468c04bc48a0849a15233d1d644e5c45b/src/util.ts#L1072)

Return the commit-ish (SHA hash) of the most recent commit containing the
Xpipeline command suffix `[INIT]`, or being pointed to by a
`package-name@0.0.0-init` version tag. If no such commit could be found,
[noSpecialInitialCommitIndicator](../variables/noSpecialInitialCommitIndicator.md) is returned.

## Parameters

### tagPrefix

`string`

## Returns

`Promise`\<`string`\>

## See

XchangelogConfig
