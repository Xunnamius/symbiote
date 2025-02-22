[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_conventional.config.cjs](../README.md) / defaultTemplates

# Variable: defaultTemplates

> `const` **defaultTemplates**: `object`

Defined in: [src/assets/transformers/\_conventional.config.cjs.ts:288](https://github.com/Xunnamius/symbiote/blob/3911bb5748d7ecd905ce3bbd9106aa0ea0787160/src/assets/transformers/_conventional.config.cjs.ts#L288)

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
