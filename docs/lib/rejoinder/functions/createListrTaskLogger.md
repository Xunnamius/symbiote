[**@-xun/scripts**](../../../README.md) • **Docs**

***

[@-xun/scripts](../../../README.md) / [lib/rejoinder](../README.md) / createListrTaskLogger

# Function: createListrTaskLogger()

> **createListrTaskLogger**(`__namedParameters`): [`ExtendedLogger`](../interfaces/ExtendedLogger.md)

Create and return a new set of logger instances configured to output via a
Listr2 task.

## Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.namespace**: `string`

The namespace of the logger. The namespace must be a valid [`debug`
namespace](https://npm.im/debug#namespace-colors).

**See**

https://npm.im/debug#namespace-colors

• **\_\_namedParameters.task**: `GenericListrTask`

The task to which logging output will be sent.

## Returns

[`ExtendedLogger`](../interfaces/ExtendedLogger.md)

## Defined in

[lib/rejoinder/index.ts:197](https://github.com/Xunnamius/xscripts/blob/05e56e787e73d42855fcd3ce10aff7f8f6e6c4c7/lib/rejoinder/index.ts#L197)