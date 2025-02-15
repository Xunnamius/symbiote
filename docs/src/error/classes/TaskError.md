[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/error](../README.md) / TaskError

# Class: TaskError

Defined in: [packages/cli-utils/src/error.ts:10](https://github.com/Xunnamius/symbiote/blob/1d06f9ec4e479041c7ca032d17fcdd92ac8edf8e/packages/cli-utils/src/error.ts#L10)

An `Error` class where the first letter of the message is capitalized.

## Extends

- `Error`

## Constructors

### new TaskError()

> **new TaskError**(...`args`): [`TaskError`](TaskError.md)

Defined in: [packages/cli-utils/src/error.ts:11](https://github.com/Xunnamius/symbiote/blob/1d06f9ec4e479041c7ca032d17fcdd92ac8edf8e/packages/cli-utils/src/error.ts#L11)

#### Parameters

##### args

...\[`string`, `ErrorOptions`\]

#### Returns

[`TaskError`](TaskError.md)

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

`Error.cause`

***

### message

> **message**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

#### Parameters

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:145

#### Inherited from

`Error.stackTraceLimit`

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

#### Parameters

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`
