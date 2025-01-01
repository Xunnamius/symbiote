[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / runAllTimersAsync

# Function: runAllTimersAsync()

> **runAllTimersAsync**(): `Promise`\<`void`\>

Defined in: node\_modules/@types/jest/index.d.ts:316

Asynchronous equivalent of `jest.runAllTimers()`. It also yields to the event loop,
allowing any scheduled promise callbacks to execute _before_ running the timers.

## Returns

`Promise`\<`void`\>

## Remarks

Not available when using legacy fake timers implementation.
