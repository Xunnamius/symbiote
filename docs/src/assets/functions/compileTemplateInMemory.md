[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / compileTemplateInMemory

# Function: compileTemplateInMemory()

> **compileTemplateInMemory**(`rawTemplate`, `context`): `string`

Defined in: [src/assets.ts:544](https://github.com/Xunnamius/symbiote/blob/5ae97ccbe27456f6fdcc9cdb8c1bf89ff370984a/src/assets.ts#L544)

Takes a string and returns that string with all handlebars-style "template
variables" (e.g. `{{variableName}}`) with matching keys in `TemplateContext`
replaced with their contextual values. All such values are stringified using
`String(value)`. Object-valued variables can have their properties referenced
using dot notation, i.e.: `{{variableName.prop.sub-prop.length}}`.

Template variables accept an optional `linkText` parameter which, if given,
will be replaced by a link of the form `[linkText](contextual-value)`. The
parameter is separated from the key by a colon, e.g. `{{variableName:link
text}}` will be replaced with `[link text](variableName's-contextual-value)`.

## Parameters

### rawTemplate

`string`

### context

[`TransformerContext`](../type-aliases/TransformerContext.md)

## Returns

`string`
