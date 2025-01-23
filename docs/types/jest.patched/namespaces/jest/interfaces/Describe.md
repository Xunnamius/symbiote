[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / Describe

# Interface: Describe()

Defined in: [types/jest.patched.d.ts:2](https://github.com/Xunnamius/symbiote/blob/ec67adb5324eeca6085e3ddc4126fe7798bea916/types/jest.patched.d.ts#L2)

> **Describe**(`name`, `fn`): `void`

Defined in: node\_modules/@types/jest/index.d.ts:612

## Parameters

### name

`string` | `number` | `Function` | [`FunctionLike`](FunctionLike.md)

### fn

[`EmptyFunction`](../type-aliases/EmptyFunction.md)

## Returns

`void`

## Properties

### each

> **each**: [`Each`](Each.md)

Defined in: node\_modules/@types/jest/index.d.ts:617

***

### noskip

> **noskip**: [`Describe`](Describe.md)

Defined in: [types/jest.patched.d.ts:7](https://github.com/Xunnamius/symbiote/blob/ec67adb5324eeca6085e3ddc4126fe7798bea916/types/jest.patched.d.ts#L7)

Ensures the test contained by this function are run regardless of the
invocation of `reconfigureJestGlobalsToSkipTestsInThisFileIfRequested`.

***

### only

> **only**: [`Describe`](Describe.md)

Defined in: node\_modules/@types/jest/index.d.ts:614

Only runs the tests inside this `describe` for the current file

***

### skip

> **skip**: [`Describe`](Describe.md)

Defined in: node\_modules/@types/jest/index.d.ts:616

Skips running the tests inside this `describe` for the current file
