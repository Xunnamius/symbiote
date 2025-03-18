[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / NonFunctionPropertyNames

# Type Alias: NonFunctionPropertyNames\<T\>

> **NonFunctionPropertyNames**\<`T`\> = keyof `{ [K in keyof T as T[K] extends Func ? never : K]: T[K] }`

Defined in: node\_modules/@types/jest/index.d.ts:477

## Type Parameters

### T

`T`
