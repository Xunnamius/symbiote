[**@-xun/scripts**](../../README.md) • **Docs**

***

[@-xun/scripts](../../README.md) / [configure](../README.md) / CustomExecutionContext

# Type alias: CustomExecutionContext

> **CustomExecutionContext**: `ExecutionContext` & `object`

## Type declaration

### debug\_

> **debug\_**: `ExtendedDebugger`

The ExtendedDebugger for the CLI.

### log

> **log**: `ExtendedLogger`

The ExtendedLogger for the CLI.

### state

> **state**: `object`

### state.isHushed

> **isHushed**: `boolean`

If `true`, the program should output only the most pertinent information.

### state.isQuieted

> **isQuieted**: `boolean`

If `true`, the program should be dramatically less verbose. It also
implies `isHushed` is `true`.

### state.isSilenced

> **isSilenced**: `boolean`

If `true`, the program should not output anything at all. It also implies
`isQuieted` and `isHushed` are both `true`.

### state.startTime

> **startTime**: `Date`

A `Date` object representing the start time of execution.

## Source

[src/configure.ts:34](https://github.com/Xunnamius/xscripts/blob/89d81a3e405096de202bc1f6be61ab5d58fc3e1e/src/configure.ts#L34)
