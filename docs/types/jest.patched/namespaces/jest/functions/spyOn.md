[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / spyOn

# Function: spyOn()

## Call Signature

> **spyOn**\<`T`, `Key`, `A`, `Value`\>(`object`, `method`, `accessType`): `A` *extends* `"set"` ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`void`, \[`Value`\], `any`\> : `A` *extends* `"get"` ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`Value`, \[\], `any`\> : `Value` *extends* [`Constructor`](../type-aliases/Constructor.md) ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`InstanceType`\<`Value`\<`Value`\>\>, [`ConstructorArgsType`](../type-aliases/ConstructorArgsType.md)\<`Value`\<`Value`\>\>, `any`\> : `Value` *extends* [`Func`](../type-aliases/Func.md) ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`ReturnType`\<`Value`\<`Value`\>\>, [`ArgsType`](../type-aliases/ArgsType.md)\<`Value`\<`Value`\>\>, `any`\> : `never`

Defined in: node\_modules/@types/jest/index.d.ts:389

Creates a mock function similar to jest.fn but also tracks calls to `object[methodName]`

Note: By default, jest.spyOn also calls the spied method. This is different behavior from most
other test libraries.

### Type Parameters

• **T** *extends* `object`

• **Key** *extends* `string` \| `number` \| `symbol`

• **A** *extends* `"set"` \| `"get"` = [`PropertyAccessors`](../type-aliases/PropertyAccessors.md)\<`Key`, `T`\>

• **Value** = `Required`\<`T`\>\[`Key`\]

### Parameters

#### object

`T`

#### method

`Key`

#### accessType

`A`

### Returns

`A` *extends* `"set"` ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`void`, \[`Value`\], `any`\> : `A` *extends* `"get"` ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`Value`, \[\], `any`\> : `Value` *extends* [`Constructor`](../type-aliases/Constructor.md) ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`InstanceType`\<`Value`\<`Value`\>\>, [`ConstructorArgsType`](../type-aliases/ConstructorArgsType.md)\<`Value`\<`Value`\>\>, `any`\> : `Value` *extends* [`Func`](../type-aliases/Func.md) ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`ReturnType`\<`Value`\<`Value`\>\>, [`ArgsType`](../type-aliases/ArgsType.md)\<`Value`\<`Value`\>\>, `any`\> : `never`

### Example

```ts
const video = require('./video');

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockReset();
  spy.mockRestore();
});
```

## Call Signature

> **spyOn**\<`T`, `M`\>(`object`, `method`): [`ConstructorProperties`](../type-aliases/ConstructorProperties.md)\<`Required`\<`T`\>\>\[`M`\] *extends* (...`args`) => `any` ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`InstanceType`\<`any`\[`any`\]\>, [`ConstructorArgsType`](../type-aliases/ConstructorArgsType.md)\<`any`\[`any`\]\>, `any`\> : `never`

Defined in: node\_modules/@types/jest/index.d.ts:403

Creates a mock function similar to jest.fn but also tracks calls to `object[methodName]`

Note: By default, jest.spyOn also calls the spied method. This is different behavior from most
other test libraries.

### Type Parameters

• **T** *extends* `object`

• **M** *extends* `string` \| `number` \| `symbol`

### Parameters

#### object

`T`

#### method

`M`

### Returns

[`ConstructorProperties`](../type-aliases/ConstructorProperties.md)\<`Required`\<`T`\>\>\[`M`\] *extends* (...`args`) => `any` ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`InstanceType`\<`any`\[`any`\]\>, [`ConstructorArgsType`](../type-aliases/ConstructorArgsType.md)\<`any`\[`any`\]\>, `any`\> : `never`

### Example

```ts
const video = require('./video');

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockReset();
  spy.mockRestore();
});
```

## Call Signature

> **spyOn**\<`T`, `M`\>(`object`, `method`): [`FunctionProperties`](../type-aliases/FunctionProperties.md)\<`Required`\<`T`\>\>\[`M`\] *extends* [`Func`](../type-aliases/Func.md) ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`ReturnType`\<`any`\[`any`\]\>, [`ArgsType`](../type-aliases/ArgsType.md)\<`any`\[`any`\]\>, `any`\> : `never`

Defined in: node\_modules/@types/jest/index.d.ts:411

Creates a mock function similar to jest.fn but also tracks calls to `object[methodName]`

Note: By default, jest.spyOn also calls the spied method. This is different behavior from most
other test libraries.

### Type Parameters

• **T** *extends* `object`

• **M** *extends* `string` \| `number` \| `symbol`

### Parameters

#### object

`T`

#### method

`M`

### Returns

[`FunctionProperties`](../type-aliases/FunctionProperties.md)\<`Required`\<`T`\>\>\[`M`\] *extends* [`Func`](../type-aliases/Func.md) ? [`SpyInstance`](../interfaces/SpyInstance.md)\<`ReturnType`\<`any`\[`any`\]\>, [`ArgsType`](../type-aliases/ArgsType.md)\<`any`\[`any`\]\>, `any`\> : `never`

### Example

```ts
const video = require('./video');

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockReset();
  spy.mockRestore();
});
```
