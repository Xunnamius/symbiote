[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / RemoveIndex

# Type Alias: RemoveIndex\<T\>

> **RemoveIndex**\<`T`\>: `{ [P in keyof T as string extends P ? never : number extends P ? never : P]: T[P] }`

Defined in: node\_modules/@types/jest/index.d.ts:485

## Type Parameters

• **T**
