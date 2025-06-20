[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / onGenerateMock

# Function: onGenerateMock()

> **onGenerateMock**\<`T`\>(`cb`): *typeof* [`jest`](../README.md)

Defined in: node\_modules/@types/jest/index.d.ts:291

Registers a callback function that is invoked whenever a mock is generated for a module.
This callback is passed the module path and the newly created mock object, and must return
the (potentially modified) mock object.

If multiple callbacks are registered, they will be called in the order they were added.
Each callback receives the result of the previous callback as the `moduleMock` parameter,
making it possible to apply sequential transformations.

## Type Parameters

### T

`T`

## Parameters

### cb

(`modulePath`, `moduleMock`) => `T`

## Returns

*typeof* [`jest`](../README.md)
