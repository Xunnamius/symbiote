[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_wrangler.json](../README.md) / config

# Function: config()

> **config**(): `object`

Defined in: [src/assets/transformers/\_wrangler.json.ts:13](https://github.com/Xunnamius/symbiote/blob/49b68300bfb7b09f7c437e515711c99015f99f81/src/assets/transformers/_wrangler.json.ts#L13)

## Returns

`object`

### $schema

> **$schema**: `string` = `'https://unpkg.com/wrangler@latest/config-schema.json'`

### compatibility\_date

> **compatibility\_date**: `string`

### env

> **env**: `object`

#### env.development

> **development**: `object`

#### env.development.name

> **name**: `string` = `'dev-unnamed-app-worker'`

#### env.development.vars

> **vars**: `object` = `{}`

#### env.preview

> **preview**: `object`

#### env.preview.name

> **name**: `string` = `'prev-unnamed-app-worker'`

#### env.preview.route

> **route**: `object`

#### env.preview.route.pattern

> **pattern**: `string` = `'https://example.com/path/preview-endpoint'`

#### env.preview.route.zone\_name

> **zone\_name**: `string` = `'example.com'`

### main

> **main**: `string` = `'src/worker.ts'`

### name

> **name**: `string` = `'unnamed-app-worker'`

### route

> **route**: `object`

#### route.pattern

> **pattern**: `string` = `'https://example.com/path/endpoint'`

#### route.zone\_name

> **zone\_name**: `string` = `'example.com'`

### vars

> **vars**: `object` = `{}`

### workers\_dev

> **workers\_dev**: `boolean` = `false`
