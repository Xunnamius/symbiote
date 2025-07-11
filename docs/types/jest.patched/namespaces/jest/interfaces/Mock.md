[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / Mock

# Interface: Mock()\<T, Y, C\>

Defined in: node\_modules/@types/jest/index.d.ts:1151

## Extends

- `Function`.[`MockInstance`](MockInstance.md)\<`T`, `Y`, `C`\>

## Type Parameters

### T

`T` = `any`

### Y

`Y` *extends* `any`[] = `any`

### C

`C` = `any`

> **Mock**(`this`, ...`args`): `T`

Defined in: node\_modules/@types/jest/index.d.ts:1153

## Parameters

### this

`C`

### args

...`Y`

## Returns

`T`

## Constructors

### Constructor

> **new Mock**(...`args`): `T`

Defined in: node\_modules/@types/jest/index.d.ts:1152

#### Parameters

##### args

...`Y`

#### Returns

`T`

#### Inherited from

`Function.constructor`

## Properties

### \[metadata\]

> **\[metadata\]**: `null` \| `DecoratorMetadataObject`

Defined in: node\_modules/typescript/lib/lib.esnext.decorators.d.ts:27

#### Inherited from

`Function.[metadata]`

***

### arguments

> **arguments**: `any`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:305

#### Inherited from

`Function.arguments`

***

### caller

> **caller**: `Function`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:306

#### Inherited from

`Function.caller`

***

### length

> `readonly` **length**: `number`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:302

#### Inherited from

`Function.length`

***

### mock

> **mock**: [`MockContext`](MockContext.md)\<`T`, `Y`, `C`\>

Defined in: node\_modules/@types/jest/index.d.ts:1263

Provides access to the mock's metadata

#### Inherited from

[`MockInstance`](MockInstance.md).[`mock`](MockInstance.md#mock)

***

### name

> `readonly` **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es2015.core.d.ts:97

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

`Function.name`

***

### prototype

> **prototype**: `any`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:301

#### Inherited from

`Function.prototype`

## Methods

### \[hasInstance\]()

> **\[hasInstance\]**(`value`): `boolean`

Defined in: node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

#### Parameters

##### value

`any`

#### Returns

`boolean`

#### Inherited from

`Function.[hasInstance]`

***

### apply()

> **apply**(`this`, `thisArg`, `argArray?`): `any`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:281

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

#### Parameters

##### this

`Function`

##### thisArg

`any`

The object to be used as the this object.

##### argArray?

`any`

A set of arguments to be passed to the function.

#### Returns

`any`

#### Inherited from

`Function.apply`

***

### bind()

> **bind**(`this`, `thisArg`, ...`argArray`): `any`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:296

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Parameters

##### this

`Function`

##### thisArg

`any`

An object to which the this keyword can refer inside the new function.

##### argArray

...`any`[]

A list of arguments to be passed to the new function.

#### Returns

`any`

#### Inherited from

`Function.bind`

***

### call()

> **call**(`this`, `thisArg`, ...`argArray`): `any`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:288

Calls a method of an object, substituting another object for the current object.

#### Parameters

##### this

`Function`

##### thisArg

`any`

The object to be used as the current object.

##### argArray

...`any`[]

A list of arguments to be passed to the method.

#### Returns

`any`

#### Inherited from

`Function.call`

***

### getMockImplementation()

> **getMockImplementation**(): `undefined` \| (...`args`) => `T`

Defined in: node\_modules/@types/jest/index.d.ts:1299

Returns the function that was set as the implementation of the mock (using mockImplementation).

#### Returns

`undefined` \| (...`args`) => `T`

#### Inherited from

[`MockInstance`](MockInstance.md).[`getMockImplementation`](MockInstance.md#getmockimplementation)

***

### getMockName()

> **getMockName**(): `string`

Defined in: node\_modules/@types/jest/index.d.ts:1261

Returns the mock name string set by calling `mockFn.mockName(value)`.

#### Returns

`string`

#### Inherited from

[`MockInstance`](MockInstance.md).[`getMockName`](MockInstance.md#getmockname)

***

### mockClear()

> **mockClear**(): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1273

Resets all information stored in the mockFn.mock.calls and mockFn.mock.instances arrays.

Often this is useful when you want to clean up a mock's usage data between two assertions.

Beware that `mockClear` will replace `mockFn.mock`, not just `mockFn.mock.calls` and `mockFn.mock.instances`.
You should therefore avoid assigning mockFn.mock to other variables, temporary or not, to make sure you
don't access stale data.

#### Returns

`this`

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockClear`](MockInstance.md#mockclear)

***

### mockImplementation()

> **mockImplementation**(`fn?`): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1307

Accepts a function that should be used as the implementation of the mock. The mock itself will still record
all calls that go into and instances that come from itself – the only difference is that the implementation
will also be executed when the mock is called.

Note: `jest.fn(implementation)` is a shorthand for `jest.fn().mockImplementation(implementation)`.

#### Parameters

##### fn?

(...`args`) => `T`

#### Returns

`this`

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockImplementation`](MockInstance.md#mockimplementation)

***

### mockImplementationOnce()

> **mockImplementationOnce**(`fn`): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1323

Accepts a function that will be used as an implementation of the mock for one call to the mocked function.
Can be chained so that multiple function calls produce different results.

#### Parameters

##### fn

(...`args`) => `T`

#### Returns

`this`

#### Example

```ts
const myMockFn = jest
  .fn()
   .mockImplementationOnce(cb => cb(null, true))
   .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val)); // true

myMockFn((err, val) => console.log(val)); // false
```

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockImplementationOnce`](MockInstance.md#mockimplementationonce)

***

### mockName()

> **mockName**(`name`): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1339

Sets the name of the mock.

#### Parameters

##### name

`string`

#### Returns

`this`

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockName`](MockInstance.md#mockname)

***

### mockRejectedValue()

> **mockRejectedValue**(`value`): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1412

Simple sugar function for: `jest.fn().mockImplementation(() => Promise.reject(value));`

#### Parameters

##### value

[`RejectedValue`](../type-aliases/RejectedValue.md)\<`T`\>

#### Returns

`this`

#### Example

```ts
test('async test', async () => {
  const asyncMock = jest.fn().mockRejectedValue(new Error('Async error'));

  await asyncMock(); // throws "Async error"
});
```

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockRejectedValue`](MockInstance.md#mockrejectedvalue)

***

### mockRejectedValueOnce()

> **mockRejectedValueOnce**(`value`): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1429

Simple sugar function for: `jest.fn().mockImplementationOnce(() => Promise.reject(value));`

#### Parameters

##### value

[`RejectedValue`](../type-aliases/RejectedValue.md)\<`T`\>

#### Returns

`this`

#### Example

```ts
test('async test', async () => {
 const asyncMock = jest
   .fn()
   .mockResolvedValueOnce('first call')
   .mockRejectedValueOnce(new Error('Async error'));

 await asyncMock(); // first call
 await asyncMock(); // throws "Async error"
});
```

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockRejectedValueOnce`](MockInstance.md#mockrejectedvalueonce)

***

### mockReset()

> **mockReset**(): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1283

Resets all information stored in the mock, including any initial implementation and mock name given.

This is useful when you want to completely restore a mock back to its initial state.

Beware that `mockReset` will replace `mockFn.mock`, not just `mockFn.mock.calls` and `mockFn.mock.instances`.
You should therefore avoid assigning mockFn.mock to other variables, temporary or not, to make sure you
don't access stale data.

#### Returns

`this`

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockReset`](MockInstance.md#mockreset)

***

### mockResolvedValue()

> **mockResolvedValue**(`value`): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1381

Simple sugar function for: `jest.fn().mockImplementation(() => Promise.resolve(value));`

#### Parameters

##### value

[`ResolvedValue`](../type-aliases/ResolvedValue.md)\<`T`\>

#### Returns

`this`

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockResolvedValue`](MockInstance.md#mockresolvedvalue)

***

### mockResolvedValueOnce()

> **mockResolvedValueOnce**(`value`): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1400

Simple sugar function for: `jest.fn().mockImplementationOnce(() => Promise.resolve(value));`

#### Parameters

##### value

[`ResolvedValue`](../type-aliases/ResolvedValue.md)\<`T`\>

#### Returns

`this`

#### Example

```ts
test('async test', async () => {
 const asyncMock = jest
   .fn()
   .mockResolvedValue('default')
   .mockResolvedValueOnce('first call')
   .mockResolvedValueOnce('second call');

 await asyncMock(); // first call
 await asyncMock(); // second call
 await asyncMock(); // default
 await asyncMock(); // default
});
```

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockResolvedValueOnce`](MockInstance.md#mockresolvedvalueonce)

***

### mockRestore()

> **mockRestore**(): `void`

Defined in: node\_modules/@types/jest/index.d.ts:1295

Does everything that `mockFn.mockReset()` does, and also restores the original (non-mocked) implementation.

This is useful when you want to mock functions in certain test cases and restore the original implementation in others.

Beware that `mockFn.mockRestore` only works when mock was created with `jest.spyOn`. Thus you have to take care of restoration
yourself when manually assigning `jest.fn()`.

The [`restoreMocks`](https://jestjs.io/docs/en/configuration.html#restoremocks-boolean) configuration option is available
to restore mocks automatically between tests.

#### Returns

`void`

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockRestore`](MockInstance.md#mockrestore)

***

### mockReturnThis()

> **mockReturnThis**(): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1349

Just a simple sugar function for:

#### Returns

`this`

#### Example

```ts
jest.fn(function() {
    return this;
  });
```

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockReturnThis`](MockInstance.md#mockreturnthis)

***

### mockReturnValue()

> **mockReturnValue**(`value`): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1361

Accepts a value that will be returned whenever the mock function is called.

#### Parameters

##### value

`T`

#### Returns

`this`

#### Example

```ts
const mock = jest.fn();
mock.mockReturnValue(42);
mock(); // 42
mock.mockReturnValue(43);
mock(); // 43
```

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockReturnValue`](MockInstance.md#mockreturnvalue)

***

### mockReturnValueOnce()

> **mockReturnValueOnce**(`value`): `this`

Defined in: node\_modules/@types/jest/index.d.ts:1377

Accepts a value that will be returned for one call to the mock function. Can be chained so that
successive calls to the mock function return different values. When there are no more
`mockReturnValueOnce` values to use, calls will return a value specified by `mockReturnValue`.

#### Parameters

##### value

`T`

#### Returns

`this`

#### Example

```ts
const myMockFn = jest.fn()
  .mockReturnValue('default')
  .mockReturnValueOnce('first call')
  .mockReturnValueOnce('second call');

// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
```

#### Inherited from

[`MockInstance`](MockInstance.md).[`mockReturnValueOnce`](MockInstance.md#mockreturnvalueonce)

***

### toString()

> **toString**(): `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:299

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

`Function.toString`

***

### withImplementation()

#### Call Signature

> **withImplementation**(`fn`, `callback`): `Promise`\<`void`\>

Defined in: node\_modules/@types/jest/index.d.ts:1332

Temporarily overrides the default mock implementation within the callback,
then restores its previous implementation.

##### Parameters

###### fn

(...`args`) => `T`

###### callback

() => `Promise`\<`unknown`\>

##### Returns

`Promise`\<`void`\>

##### Remarks

If the callback is async or returns a `thenable`, `withImplementation` will return a promise.
Awaiting the promise will await the callback and reset the implementation.

##### Inherited from

[`MockInstance`](MockInstance.md).[`withImplementation`](MockInstance.md#withimplementation)

#### Call Signature

> **withImplementation**(`fn`, `callback`): `void`

Defined in: node\_modules/@types/jest/index.d.ts:1337

Temporarily overrides the default mock implementation within the callback,
then restores its previous implementation.

##### Parameters

###### fn

(...`args`) => `T`

###### callback

() => `void`

##### Returns

`void`

##### Inherited from

[`MockInstance`](MockInstance.md).[`withImplementation`](MockInstance.md#withimplementation)
