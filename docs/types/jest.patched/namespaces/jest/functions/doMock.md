[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / doMock

# Function: doMock()

> **doMock**\<`T`\>(`moduleName`, `factory`?, `options`?): *typeof* [`jest`](../README.md)

Defined in: node\_modules/@types/jest/index.d.ts:199

Mocks a module with an auto-mocked version when it is being required.

## Type Parameters

### T

`T` = `unknown`

## Parameters

### moduleName

`string`

### factory?

() => `T`

### options?

[`MockOptions`](../interfaces/MockOptions.md)

## Returns

*typeof* [`jest`](../README.md)
