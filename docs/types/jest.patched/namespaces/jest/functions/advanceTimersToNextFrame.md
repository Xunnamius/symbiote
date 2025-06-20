[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / advanceTimersToNextFrame

# Function: advanceTimersToNextFrame()

> **advanceTimersToNextFrame**(): `void`

Defined in: node\_modules/@types/jest/index.d.ts:136

Advances all timers by the needed milliseconds to execute callbacks currently scheduled with `requestAnimationFrame`.
`advanceTimersToNextFrame()` is a helpful way to execute code that is scheduled using `requestAnimationFrame`.

## Returns

`void`

## Remarks

Not available when using legacy fake timers implementation.
