[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / compileTemplate

# Function: compileTemplate()

> **compileTemplate**(`templatePath`, `context`): `Promise`\<`string`\>

Defined in: [src/assets.ts:536](https://github.com/Xunnamius/symbiote/blob/ff83c030b043e6b14171cac5526d31c5c826c51f/src/assets.ts#L536)

Takes a path relative to the `src/assets/templates` directory and returns the
template at that path with all handlebars-style template variables (e.g.
`{{variableName}}`) with matching keys in `TemplateContext` replaced with
their contextual values.

## Parameters

### templatePath

`RelativePath`

### context

[`TransformerContext`](../type-aliases/TransformerContext.md)

## Returns

`Promise`\<`string`\>
