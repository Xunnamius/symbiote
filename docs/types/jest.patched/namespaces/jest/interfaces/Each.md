[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / Each

# Interface: Each()

Defined in: node\_modules/@types/jest/index.d.ts:509

## Call Signature

> **Each**\<`T`\>(`cases`): (`name`, `fn`, `timeout?`) => `void`

Defined in: node\_modules/@types/jest/index.d.ts:511

### Type Parameters

#### T

`T` *extends* `any`[] \| \[`any`\]

### Parameters

#### cases

readonly `T`[]

### Returns

> (`name`, `fn`, `timeout?`): `void`

#### Parameters

##### name

`string`

##### fn

(...`args`) => `any`

##### timeout?

`number`

#### Returns

`void`

## Call Signature

> **Each**\<`T`\>(`cases`): (`name`, `fn`, `timeout?`) => `void`

Defined in: node\_modules/@types/jest/index.d.ts:516

### Type Parameters

#### T

`T` *extends* readonly `any`[]

### Parameters

#### cases

readonly `T`[]

### Returns

> (`name`, `fn`, `timeout?`): `void`

#### Parameters

##### name

`string`

##### fn

(...`args`) => `any`

##### timeout?

`number`

#### Returns

`void`

## Call Signature

> **Each**\<`T`\>(`cases`): (`name`, `fn`, `timeout?`) => `void`

Defined in: node\_modules/@types/jest/index.d.ts:522

### Type Parameters

#### T

`T`

### Parameters

#### cases

readonly `T`[]

### Returns

> (`name`, `fn`, `timeout?`): `void`

#### Parameters

##### name

`string`

##### fn

(`arg`, `done`) => `any`

##### timeout?

`number`

#### Returns

`void`

## Call Signature

> **Each**(`cases`): (`name`, `fn`, `timeout?`) => `void`

Defined in: node\_modules/@types/jest/index.d.ts:523

### Parameters

#### cases

readonly readonly `any`[][]

### Returns

> (`name`, `fn`, `timeout?`): `void`

#### Parameters

##### name

`string`

##### fn

(...`args`) => `any`

##### timeout?

`number`

#### Returns

`void`

## Call Signature

> **Each**(`strings`, ...`placeholders`): (`name`, `fn`, `timeout?`) => `void`

Defined in: node\_modules/@types/jest/index.d.ts:528

### Parameters

#### strings

`TemplateStringsArray`

#### placeholders

...`any`[]

### Returns

> (`name`, `fn`, `timeout?`): `void`

#### Parameters

##### name

`string`

##### fn

(`arg`, `done`) => `any`

##### timeout?

`number`

#### Returns

`void`
