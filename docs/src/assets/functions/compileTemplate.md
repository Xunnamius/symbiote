[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / compileTemplate

# Function: compileTemplate()

> **compileTemplate**(`templatePath`, `context`): `Promise`\<`string`\>

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

## Defined in

[src/assets.ts:489](https://github.com/Xunnamius/symbiote/blob/26e756362a16f050e03cef2c4c582d94e29614cd/src/assets.ts#L489)
