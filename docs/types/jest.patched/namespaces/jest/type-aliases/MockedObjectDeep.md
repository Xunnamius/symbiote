[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / MockedObjectDeep

# Type Alias: MockedObjectDeep\<T\>

> **MockedObjectDeep**\<`T`\>: [`MaybeMockedConstructor`](MaybeMockedConstructor.md)\<`T`\> & `{ [K in MethodKeysOf<T>]: T[K] extends MockableFunction ? MockedFunctionDeep<T[K]> : T[K] }` & `{ [K in PropertyKeysOf<T>]: MaybeMockedDeep<T[K]> }`

Defined in: node\_modules/@types/jest/index.d.ts:459

## Type Parameters

• **T**
