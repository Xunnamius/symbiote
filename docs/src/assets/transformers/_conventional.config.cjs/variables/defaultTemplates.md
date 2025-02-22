[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_conventional.config.cjs](../README.md) / defaultTemplates

# Variable: defaultTemplates

> `const` **defaultTemplates**: `object`

Defined in: [src/assets/transformers/\_conventional.config.cjs.ts:288](https://github.com/Xunnamius/symbiote/blob/4f71380506e8b2505a907d817794b6730bca4f95/src/assets/transformers/_conventional.config.cjs.ts#L288)

Handlebars template data (not processed by our custom configuration).

## Type declaration

### commit

> **commit**: `string`

### footer

> **footer**: `string`

### header

> **header**: `string`

### partials

> **partials**: `object`

#### partials.host

> **host**: `string` = `'{{~@root.host}}'`

#### partials.owner

> **owner**: `string` = `'{{#if this.owner}}{{~this.owner}}{{else}}{{~@root.owner}}{{/if}}'`

#### partials.repository

> **repository**: `string` = `'{{#if this.repository}}{{~this.repository}}{{else}}{{~@root.repository}}{{/if}}'`

### template

> **template**: `string`
