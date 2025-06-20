[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / MockContext

# Interface: MockContext\<T, Y, C\>

Defined in: node\_modules/@types/jest/index.d.ts:1456

## Type Parameters

### T

`T`

### Y

`Y` *extends* `any`[]

### C

`C` = `any`

## Properties

### calls

> **calls**: `Y`[]

Defined in: node\_modules/@types/jest/index.d.ts:1460

List of the call arguments of all calls that have been made to the mock.

***

### contexts

> **contexts**: `C`[]

Defined in: node\_modules/@types/jest/index.d.ts:1464

List of the call contexts of all calls that have been made to the mock.

***

### instances

> **instances**: `T`[]

Defined in: node\_modules/@types/jest/index.d.ts:1468

List of all the object instances that have been instantiated from the mock.

***

### invocationCallOrder

> **invocationCallOrder**: `number`[]

Defined in: node\_modules/@types/jest/index.d.ts:1473

List of the call order indexes of the mock. Jest is indexing the order of
invocations of all mocks in a test file. The index is starting with `1`.

***

### lastCall?

> `optional` **lastCall**: `Y`

Defined in: node\_modules/@types/jest/index.d.ts:1478

List of the call arguments of the last call that was made to the mock.
If the function was not called, it will return `undefined`.

***

### results

> **results**: [`MockResult`](../type-aliases/MockResult.md)\<`T`\>[]

Defined in: node\_modules/@types/jest/index.d.ts:1482

List of the results of all calls that have been made to the mock.
