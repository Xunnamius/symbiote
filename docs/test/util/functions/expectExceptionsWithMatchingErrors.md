[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [test/util](../README.md) / expectExceptionsWithMatchingErrors

# Function: expectExceptionsWithMatchingErrors()

## Call Signature

> **expectExceptionsWithMatchingErrors**\<`Params`\>(`spec`, `errorFn`, `options`): `Promise`\<`void`\>

Defined in: node\_modules/@-xun/jest/dist/packages/jest/src/index.d.ts:275

Maps each element of the `spec` array into a Jest expectation asserting that
`errorFn` either throws an error or rejects. If an assertion fails, a helpful
error message is thrown.

Example:

```typescript
await expectExceptionsWithMatchingErrors([
 [[param1, param2], 'expected error message 1'],
 [[1, 2, 3], 'expected error message 2']
],
() => {
  // ...
});
```

Note: if you're getting a type error about no matching overloads, make sure
you've set `options.singleParameter` to `true` if you're passing in a
[ExpectExceptionsWithMatchingErrorsSpec](../type-aliases/ExpectExceptionsWithMatchingErrorsSpec.md) typed with
`'single-parameter'` as its second type parameter.

### Type Parameters

#### Params

`Params`

### Parameters

#### spec

[`ExpectExceptionsWithMatchingErrorsSpec`](../type-aliases/ExpectExceptionsWithMatchingErrorsSpec.md)\<\[`Params`\], `"single-parameter"`\>

#### errorFn

[`ExpectExceptionsWithMatchingErrorsFunction`](../type-aliases/ExpectExceptionsWithMatchingErrorsFunction.md)\<\[`Params`\]\>

#### options

[`ExpectExceptionsWithMatchingErrorsOptions`](../type-aliases/ExpectExceptionsWithMatchingErrorsOptions.md) & `object`

### Returns

`Promise`\<`void`\>

## Call Signature

> **expectExceptionsWithMatchingErrors**\<`Params`\>(`spec`, `errorFn`, `options?`): `Promise`\<`void`\>

Defined in: node\_modules/@-xun/jest/dist/packages/jest/src/index.d.ts:278

Maps each element of the `spec` array into a Jest expectation asserting that
`errorFn` either throws an error or rejects. If an assertion fails, a helpful
error message is thrown.

Example:

```typescript
await expectExceptionsWithMatchingErrors([
 [[param1, param2], 'expected error message 1'],
 [[1, 2, 3], 'expected error message 2']
],
() => {
  // ...
});
```

Note: if you're getting a type error about no matching overloads, make sure
you've set `options.singleParameter` to `true` if you're passing in a
[ExpectExceptionsWithMatchingErrorsSpec](../type-aliases/ExpectExceptionsWithMatchingErrorsSpec.md) typed with
`'single-parameter'` as its second type parameter.

### Type Parameters

#### Params

`Params` *extends* `unknown`[]

### Parameters

#### spec

[`ExpectExceptionsWithMatchingErrorsSpec`](../type-aliases/ExpectExceptionsWithMatchingErrorsSpec.md)\<`Params`\>

#### errorFn

[`ExpectExceptionsWithMatchingErrorsFunction`](../type-aliases/ExpectExceptionsWithMatchingErrorsFunction.md)\<`Params`\>

#### options?

[`ExpectExceptionsWithMatchingErrorsOptions`](../type-aliases/ExpectExceptionsWithMatchingErrorsOptions.md)

### Returns

`Promise`\<`void`\>
