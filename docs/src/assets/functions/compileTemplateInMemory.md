[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / compileTemplateInMemory

# Function: compileTemplateInMemory()

> **compileTemplateInMemory**(`rawTemplate`, `context`): `string`

Defined in: [src/assets.ts:554](https://github.com/Xunnamius/symbiote/blob/7fbd108cee2f783e7fe92308d969f39ae3bc1d0c/src/assets.ts#L554)

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
