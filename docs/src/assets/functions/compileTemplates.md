[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / compileTemplates

# Function: compileTemplates()

> **compileTemplates**(`templates`, `context`): `Promise`\<[`Asset`](../type-aliases/Asset.md)[]\>

Defined in: [src/assets.ts:517](https://github.com/Xunnamius/symbiote/blob/0855f0d5d62e664369271e18eb03d2b348113c71/src/assets.ts#L517)

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
