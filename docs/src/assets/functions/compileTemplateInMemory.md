[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / compileTemplateInMemory

# Function: compileTemplateInMemory()

> **compileTemplateInMemory**(`rawTemplate`, `context`): `string`

Defined in: [src/assets.ts:545](https://github.com/Xunnamius/symbiote/blob/726d79e4b4249d13e12a53938af9a921099a47e6/src/assets.ts#L545)

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
