[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / compileTemplates

# Function: compileTemplates()

> **compileTemplates**(`templates`, `context`): `Promise`\<[`Asset`](../type-aliases/Asset.md)[]\>

Defined in: [src/assets.ts:506](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/assets.ts#L506)

This function takes an object of absolute path keys with relative path
values; each pair represents an output path and an input path relative to the
template asset directory. This function returns a [ReifiedAssets](../type-aliases/ReifiedAssets.md)
instance with values that lazily invoke [compileTemplate](compileTemplate.md).

## Parameters

### templates

`Record`\<`AbsolutePath`, `RelativePath`\>

### context

[`TransformerContext`](../type-aliases/TransformerContext.md)

## Returns

`Promise`\<[`Asset`](../type-aliases/Asset.md)[]\>
