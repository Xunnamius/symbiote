[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / MockedObject

# Type Alias: MockedObject\<T\>

> **MockedObject**\<`T`\> = [`MaybeMockedConstructor`](MaybeMockedConstructor.md)\<`T`\> & `{ [K in MethodKeysOf<T>]: T[K] extends MockableFunction ? MockedFn<T[K]> : T[K] }` & `{ [K in PropertyKeysOf<T>]: T[K] }`

Defined in: node\_modules/@types/jest/index.d.ts:474

## Type Parameters

### T

`T`
