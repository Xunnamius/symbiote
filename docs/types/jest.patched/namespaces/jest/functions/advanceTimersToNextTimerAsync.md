[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / advanceTimersToNextTimerAsync

# Function: advanceTimersToNextTimerAsync()

> **advanceTimersToNextTimerAsync**(`steps?`): `Promise`\<`void`\>

Defined in: node\_modules/@types/jest/index.d.ts:149

Asynchronous equivalent of `jest.advanceTimersToNextTimer()`. It also yields to the event loop,
allowing any scheduled promise callbacks to execute _before_ running the timers.

## Parameters

### steps?

`number`

## Returns

`Promise`\<`void`\>

## Remarks

Not available when using legacy fake timers implementation.
