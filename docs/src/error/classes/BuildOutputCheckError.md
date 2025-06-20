[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/error](../README.md) / BuildOutputCheckError

# Class: BuildOutputCheckError

Defined in: [src/error.ts:39](https://github.com/Xunnamius/symbiote/blob/090a7857a95973f8ad6febe2e79edda5e1f32856/src/error.ts#L39)

Represents encountering a project that is not a git repository.

## Extends

- `ProjectError`

## Constructors

### Constructor

> **new BuildOutputCheckError**(): `BuildOutputCheckError`

Defined in: [src/error.ts:45](https://github.com/Xunnamius/symbiote/blob/090a7857a95973f8ad6febe2e79edda5e1f32856/src/error.ts#L45)

Represents encountering a project that is not a git repository.

#### Returns

`BuildOutputCheckError`

#### Overrides

`ProjectError.constructor`

### Constructor

> **new BuildOutputCheckError**(`message`): `BuildOutputCheckError`

Defined in: [src/error.ts:50](https://github.com/Xunnamius/symbiote/blob/090a7857a95973f8ad6febe2e79edda5e1f32856/src/error.ts#L50)

This constructor syntax is used by subclasses when calling this constructor
via `super`.

#### Parameters

##### message

`string`

#### Returns

`BuildOutputCheckError`

#### Overrides

`ProjectError.constructor`

## Properties

### \[$type\]

> **\[$type\]**: `symbol`[]

Defined in: [src/error.ts:41](https://github.com/Xunnamius/symbiote/blob/090a7857a95973f8ad6febe2e79edda5e1f32856/src/error.ts#L41)

***

### \[$type\]

> **\[$type\]**: `symbol`[]

Defined in: node\_modules/@-xun/project/dist/packages/common/src/error.d.ts:42

#### Inherited from

`ProjectError.[$type]`

***

### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

`ProjectError.cause`

***

### message

> **message**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`ProjectError.message`

***

### name

> **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`ProjectError.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`ProjectError.stack`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:162

The `Error.stackTraceLimit` property specifies the number of stack frames
collected by a stack trace (whether generated by `new Error().stack` or
`Error.captureStackTrace(obj)`).

The default value is `10` but may be set to any valid JavaScript number. Changes
will affect any stack trace captured _after_ the value has been changed.

If set to a non-number value, or set to a negative number, stack traces will
not capture any frames.

#### Inherited from

`ProjectError.stackTraceLimit`

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Defined in: node\_modules/@types/node/globals.d.ts:146

Creates a `.stack` property on `targetObject`, which when accessed returns
a string representing the location in the code at which
`Error.captureStackTrace()` was called.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

The first line of the trace will be prefixed with
`${myObject.name}: ${myObject.message}`.

The optional `constructorOpt` argument accepts a function. If given, all frames
above `constructorOpt`, including `constructorOpt`, will be omitted from the
generated stack trace.

The `constructorOpt` argument is useful for hiding implementation
details of error generation from the user. For instance:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Create an error without stack trace to avoid calculating the stack trace twice.
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // Capture the stack trace above function b
  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace
  throw error;
}

a();
```

#### Parameters

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Returns

`void`

#### Inherited from

`ProjectError.captureStackTrace`

***

### prepareStackTrace()

> `static` **prepareStackTrace**(`err`, `stackTraces`): `any`

Defined in: node\_modules/@types/node/globals.d.ts:150

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

`ProjectError.prepareStackTrace`
