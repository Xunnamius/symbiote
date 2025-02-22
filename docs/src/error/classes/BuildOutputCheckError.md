[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/error](../README.md) / BuildOutputCheckError

# Class: BuildOutputCheckError

Defined in: [src/error.ts:37](https://github.com/Xunnamius/symbiote/blob/9d125f863e55b05b020914ff4ddfee626423b9b7/src/error.ts#L37)

Represents encountering a project that is not a git repository.

## Extends

- `ProjectError`

## Constructors

### new BuildOutputCheckError()

> **new BuildOutputCheckError**(): [`BuildOutputCheckError`](BuildOutputCheckError.md)

Defined in: [src/error.ts:43](https://github.com/Xunnamius/symbiote/blob/9d125f863e55b05b020914ff4ddfee626423b9b7/src/error.ts#L43)

Represents encountering a project that is not a git repository.

#### Returns

[`BuildOutputCheckError`](BuildOutputCheckError.md)

#### Overrides

`ProjectError.constructor`

### new BuildOutputCheckError()

> **new BuildOutputCheckError**(`message`): [`BuildOutputCheckError`](BuildOutputCheckError.md)

Defined in: [src/error.ts:48](https://github.com/Xunnamius/symbiote/blob/9d125f863e55b05b020914ff4ddfee626423b9b7/src/error.ts#L48)

This constructor syntax is used by subclasses when calling this constructor
via `super`.

#### Parameters

##### message

`string`

#### Returns

[`BuildOutputCheckError`](BuildOutputCheckError.md)

#### Overrides

`ProjectError.constructor`

## Properties

### \[$type\]

> **\[$type\]**: `symbol`[]

Defined in: [src/error.ts:39](https://github.com/Xunnamius/symbiote/blob/9d125f863e55b05b020914ff4ddfee626423b9b7/src/error.ts#L39)

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

`ProjectError.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:145

#### Inherited from

`ProjectError.stackTraceLimit`

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

`ProjectError.captureStackTrace`
