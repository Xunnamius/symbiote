[**@-xun/scripts**](../../../../README.md) • **Docs**

***

[@-xun/scripts](../../../../README.md) / [lib/@black-flag/extensions](../README.md) / BfeCustomBuilderFunctionParameters

# Type Alias: BfeCustomBuilderFunctionParameters\<CustomCliArguments, CustomExecutionContext, P\>

> **BfeCustomBuilderFunctionParameters**\<`CustomCliArguments`, `CustomExecutionContext`, `P`\>: `P` *extends* [infer R, `...(infer S)`] ? `S` *extends* [infer T, `...(infer _U)`] ? [`R` & `object`, `T`, [`BfeStrictArguments`](BfeStrictArguments.md)\<`CustomCliArguments`, `CustomExecutionContext`\>] : [`R` & `object`, `...S`] : `never`

A version of Black Flag's `builder` function parameters that exclude yargs
methods that are not supported by BFE.

## See

[withBuilderExtensions](../functions/withBuilderExtensions.md)

## Type Parameters

• **CustomCliArguments** *extends* `Record`\<`string`, `unknown`\>

• **CustomExecutionContext** *extends* `ExecutionContext`

• **P** = `Parameters`\<[`BfBuilderFunction`](BfBuilderFunction.md)\<`CustomCliArguments`, `CustomExecutionContext`\>\>

## Defined in

[lib/@black-flag/extensions/index.ts:459](https://github.com/Xunnamius/xscripts/blob/05e56e787e73d42855fcd3ce10aff7f8f6e6c4c7/lib/@black-flag/extensions/index.ts#L459)