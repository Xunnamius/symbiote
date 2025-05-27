[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [test/util](../README.md) / asMocked

# Function: asMocked()

## Call Signature

> **asMocked**\<`T`\>(`options?`): [`MaybeMockedDeep`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMockedDeep.md)\<`T`\>

Defined in: node\_modules/@-xun/jest/dist/packages/jest/src/index.d.ts:47

Return a function representing `T` but wrapped with Jest mock definitions.
Pass `{shallow: true}` as the only parameter to disable the deep mocking of
`T`, which otherwise occurs by default.

This is a more powerful version of Jest's own [jest.mocked](../../../types/jest.patched/namespaces/jest/functions/mocked.md) and
[jest.MockedFn](../../../types/jest.patched/namespaces/jest/type-aliases/MockedFn.md).

### Type Parameters

#### T

`T` *extends* (...`args`) => `any`

### Parameters

#### options?

##### shallow?

`false`

### Returns

[`MaybeMockedDeep`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMockedDeep.md)\<`T`\>

### Example

```ts
import type { MyFunctionType } from "./library";
jest.mock("./library");

const mockRepresentingMyFunctionType = asMocked<MyFunctionType>();
// ...
expect(mockRepresentingMyFunctionType.mock.calls[0][0]).toBe(42);
```

## Call Signature

> **asMocked**\<`T`\>(`options`): [`MaybeMocked`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMocked.md)\<`T`\>

Defined in: node\_modules/@-xun/jest/dist/packages/jest/src/index.d.ts:66

Return a function representing `T` but wrapped (shallowly) with Jest mock
definitions.

This is a more powerful version of Jest's own [jest.mocked](../../../types/jest.patched/namespaces/jest/functions/mocked.md) and
[jest.MockedFn](../../../types/jest.patched/namespaces/jest/type-aliases/MockedFn.md).

### Type Parameters

#### T

`T` *extends* (...`args`) => `any`

### Parameters

#### options

##### shallow

`true`

### Returns

[`MaybeMocked`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMocked.md)\<`T`\>

### Example

```ts
import type { MyFunctionType } from "./library";
jest.mock("./library");

const mockRepresentingMyFunctionType = asMocked<MyFunctionType>({ shallow: true });
// ...
expect(mockRepresentingMyFunctionType.mock.calls[0][0]).toBe(42);
```

## Call Signature

> **asMocked**\<`T`\>(`source`, `options?`): [`MaybeMockedDeep`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMockedDeep.md)\<`T`\>

Defined in: node\_modules/@-xun/jest/dist/packages/jest/src/index.d.ts:83

Wrap the non-nullish `source` with Jest mock definitions. Pass `{shallow:
true}` as the second parameter to disable the default deep mocking behavior.

This is a more powerful version of Jest's own [jest.mocked](../../../types/jest.patched/namespaces/jest/functions/mocked.md) function.

### Type Parameters

#### T

`T` *extends* `object`

### Parameters

#### source

`T`

#### options?

##### shallow

`false`

### Returns

[`MaybeMockedDeep`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMockedDeep.md)\<`T`\>

### Example

```ts
import { myFunction } from "./library";
jest.mock("./library");

const mockMyFunction = asMocked(myFunction);
expect(mockMyFunction.mock.calls[0][0]).toBe(42);
```

## Call Signature

> **asMocked**\<`T`\>(`source`, `options`): [`MaybeMocked`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMocked.md)\<`T`\>

Defined in: node\_modules/@-xun/jest/dist/packages/jest/src/index.d.ts:99

Shallowly wrap the non-nullish `source` with Jest mock definitions.

This is a more powerful version of Jest's own [jest.mocked](../../../types/jest.patched/namespaces/jest/functions/mocked.md) function.

### Type Parameters

#### T

`T` *extends* `object`

### Parameters

#### source

`T`

#### options

##### shallow

`true`

### Returns

[`MaybeMocked`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMocked.md)\<`T`\>

### Example

```ts
import { myFunction } from "./library";
jest.mock("./library");

const mockMyFunction = asMocked(myFunction, { shallow: true });
expect(mockMyFunction.mock.calls[0][0]).toBe(42);
```

## Call Signature

> **asMocked**\<`T`\>(...`args`): [`MaybeMockedDeep`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMockedDeep.md)\<`T`\> \| [`MaybeMocked`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMocked.md)\<`T`\>

Defined in: node\_modules/@-xun/jest/dist/packages/jest/src/index.d.ts:116

Wrap the non-nullish `source` (or `T` itself is `source` is omitted) with
Jest mock definitions.

This is a more powerful version of Jest's own [jest.mocked](../../../types/jest.patched/namespaces/jest/functions/mocked.md) function.

### Type Parameters

#### T

`T` *extends* `object`

### Parameters

#### args

\[`object`\] | \[`T`, `object`\]

### Returns

[`MaybeMockedDeep`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMockedDeep.md)\<`T`\> \| [`MaybeMocked`](../../../types/jest.patched/namespaces/jest/type-aliases/MaybeMocked.md)\<`T`\>

### Example

```ts
import { myFunction } from "./library";
jest.mock("./library");

const mockMyFunction = asMocked(myFunction);
expect(mockMyFunction.mock.calls[0][0]).toBe(42);
```
