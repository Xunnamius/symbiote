[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / advanceTimersByTimeAsync

# Function: advanceTimersByTimeAsync()

> **advanceTimersByTimeAsync**(`msToRun`): `Promise`\<`void`\>

Defined in: node\_modules/@types/jest/index.d.ts:128

Asynchronous equivalent of `jest.advanceTimersByTime()`. It also yields to the event loop,
allowing any scheduled promise callbacks to execute _before_ running the timers.

## Parameters

### msToRun

`number`

## Returns

`Promise`\<`void`\>

## Remarks

Not available when using legacy fake timers implementation.
