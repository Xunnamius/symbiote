[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / runOnlyPendingTimersAsync

# Function: runOnlyPendingTimersAsync()

> **runOnlyPendingTimersAsync**(): `Promise`\<`void`\>

Defined in: node\_modules/@types/jest/index.d.ts:371

Asynchronous equivalent of `jest.runOnlyPendingTimers()`. It also yields to the event loop,
allowing any scheduled promise callbacks to execute _before_ running the timers.

## Returns

`Promise`\<`void`\>

## Remarks

Not available when using legacy fake timers implementation.
