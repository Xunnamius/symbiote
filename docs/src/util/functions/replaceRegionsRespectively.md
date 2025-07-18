[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / replaceRegionsRespectively

# Function: replaceRegionsRespectively()

> **replaceRegionsRespectively**(`__namedParameters`): `Promise`\<`string`\>

Defined in: [src/util.ts:449](https://github.com/Xunnamius/symbiote/blob/b9e599602cbc0f1d65b094b7a5e8739743f64fd2/src/util.ts#L449)

Performs regional replacement on a Markdown file's contents, including
overwriting existing non-numeric reference definitions that match those
generated by the template (and leaving the others).

## Parameters

### \_\_namedParameters

#### context

[`TransformerContext`](../../assets/type-aliases/TransformerContext.md)

#### outputPath

`AbsolutePath`

The path to a potentially-existing file, potentially with replaceable
regions.

#### templateContent

`string`

The compiled template contents (typically the result of calling
`compileTemplate`).

## Returns

`Promise`\<`string`\>
