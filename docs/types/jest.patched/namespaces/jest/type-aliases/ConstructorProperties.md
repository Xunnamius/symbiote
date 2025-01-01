[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / ConstructorProperties

# Type Alias: ConstructorProperties\<T\>

> **ConstructorProperties**\<`T`\>: `{ [K in keyof RemoveIndex<T> as RemoveIndex<T>[K] extends Constructor ? K : never]: RemoveIndex<T>[K] }`

Defined in: node\_modules/@types/jest/index.d.ts:489

## Type Parameters

• **T**
