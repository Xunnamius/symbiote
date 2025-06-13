[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / compileTemplate

# Function: compileTemplate()

> **compileTemplate**(`templatePath`, `context`): `Promise`\<`string`\>

Defined in: [src/assets.ts:529](https://github.com/Xunnamius/symbiote/blob/7fbd108cee2f783e7fe92308d969f39ae3bc1d0c/src/assets.ts#L529)

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
