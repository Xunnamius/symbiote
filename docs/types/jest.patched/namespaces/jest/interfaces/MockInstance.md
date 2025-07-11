[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / MockInstance

# Interface: MockInstance\<T, Y, C\>

Defined in: node\_modules/@types/jest/index.d.ts:1259

## Extended by

- [`MockWithArgs`](MockWithArgs.md)
- [`Mock`](Mock.md)
- [`SpyInstance`](SpyInstance.md)

## Type Parameters

### T

`T`

### Y

`Y` *extends* `any`[]

### C

`C` = `any`

## Properties

### mock

> **mock**: [`MockContext`](MockContext.md)\<`T`, `Y`, `C`\>

Defined in: node\_modules/@types/jest/index.d.ts:1263

Provides access to the mock's metadata

## Methods

### getMockImplementation()

> **getMockImplementation**(): `undefined` \| (...`args`) => `T`

Defined in: node\_modules/@types/jest/index.d.ts:1299

Returns the function that was set as the implementation of the mock (using mockImplementation).

#### Returns

`undefined` \| (...`args`) => `T`

***

### getMockName()

> **getMockName**(): `string`

Defined in: node\_modules/@types/jest/index.d.ts:1261

Returns the mock name string set by calling `mockFn.mockName(value)`.

#### Returns

`string`

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
