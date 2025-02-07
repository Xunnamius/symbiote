[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_conventional.config.cjs](../README.md) / defaultTemplates

# Variable: defaultTemplates

> `const` **defaultTemplates**: `object`

Defined in: [src/assets/transformers/\_conventional.config.cjs.ts:289](https://github.com/Xunnamius/symbiote/blob/baed18cf2f0c1f93d21647c3399a412c1e0a2c32/src/assets/transformers/_conventional.config.cjs.ts#L289)

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
