[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / JestMatchersShape

# Type Alias: JestMatchersShape\<TNonPromise, TPromise\>

> **JestMatchersShape**\<`TNonPromise`, `TPromise`\> = `object` & [`AndNot`](AndNot.md)\<`TNonPromise`\>

Defined in: node\_modules/@types/jest/index.d.ts:784

## Type declaration

### rejects

> **rejects**: [`AndNot`](AndNot.md)\<`TPromise`\>

Unwraps the reason of a rejected promise so any other matcher can be chained.
If the promise is fulfilled the assertion fails.

### resolves

> **resolves**: [`AndNot`](AndNot.md)\<`TPromise`\>

Use resolves to unwrap the value of a fulfilled promise so any other
matcher can be chained. If the promise is rejected the assertion fails.

## Type Parameters

### TNonPromise

`TNonPromise` *extends* `object` = \{ \}

### TPromise

`TPromise` *extends* `object` = \{ \}
