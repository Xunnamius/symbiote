[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / runAllTimers

# Function: runAllTimers()

> **runAllTimers**(): `void`

Defined in: node\_modules/@types/jest/index.d.ts:350

Exhausts both the macro-task queue (i.e., tasks queued by `setTimeout()`, `setInterval()`
and `setImmediate()`) and the micro-task queue (i.e., tasks in Node.js scheduled with
`process.nextTick()`).

## Returns

`void`
