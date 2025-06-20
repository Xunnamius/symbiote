[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / getRealSystemTime

# Function: getRealSystemTime()

> **getRealSystemTime**(): `number`

Defined in: node\_modules/@types/jest/index.d.ts:211

When mocking time, Date.now() will also be mocked. If you for some
reason need access to the real current time, you can invoke this
function.

> Note: This function is only available when using modern fake timers
> implementation

## Returns

`number`
