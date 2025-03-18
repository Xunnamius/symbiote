[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / MaybeMockedConstructor

# Type Alias: MaybeMockedConstructor\<T\>

> **MaybeMockedConstructor**\<`T`\> = `T` *extends* (...`args`) => infer R ? [`MockInstance`](../interfaces/MockInstance.md)\<`R`, [`ConstructorArgumentsOf`](ConstructorArgumentsOf.md)\<`T`\>, `R`\> : `T`

Defined in: node\_modules/@types/jest/index.d.ts:448

## Type Parameters

### T

`T`
