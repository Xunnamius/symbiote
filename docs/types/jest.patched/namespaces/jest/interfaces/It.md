[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / It

# Interface: It()

Defined in: [types/jest.patched.d.ts:10](https://github.com/Xunnamius/symbiote/blob/b9e599602cbc0f1d65b094b7a5e8739743f64fd2/types/jest.patched.d.ts#L10)

Creates a test closure

> **It**(`name`, `fn?`, `timeout?`): `void`

Defined in: node\_modules/@types/jest/index.d.ts:567

Creates a test closure.

## Parameters

### name

`string`

The name of your test

### fn?

[`ProvidesCallback`](../type-aliases/ProvidesCallback.md)

The function for your test

### timeout?

`number`

The timeout for an async function test

## Returns

`void`

## Properties

### concurrent

> **concurrent**: `It`

Defined in: node\_modules/@types/jest/index.d.ts:589

Experimental and should be avoided.

***

### each

> **each**: [`Each`](Each.md)

Defined in: node\_modules/@types/jest/index.d.ts:628

Use if you keep duplicating the same test with different data. `.each` allows you to write the
test once and pass data in.

`.each` is available with two APIs:

#### 1  `test.each(table)(name, fn)`

- `table`: Array of Arrays with the arguments that are passed into the test fn for each row.
- `name`: String the title of the test block.
- `fn`: Function the test to be run, this is the function that will receive the parameters in each row as function arguments.

#### 2  `test.each table(name, fn)`

- `table`: Tagged Template Literal
- `name`: String the title of the test, use `$variable` to inject test data into the test title from the tagged template expressions.
- `fn`: Function the test to be run, this is the function that will receive the test data object.

#### Example

```ts
// API 1
test.each([[1, 1, 2], [1, 2, 3], [2, 1, 3]])(
  '.add(%i, %i)',
  (a, b, expected) => {
    expect(a + b).toBe(expected);
  },
);

// API 2
test.each`
a    | b    | expected
${1} | ${1} | ${2}
${1} | ${2} | ${3}
${2} | ${1} | ${3}
`('returns $expected when $a is added $b', ({a, b, expected}) => {
   expect(a + b).toBe(expected);
});
```

***

### failing

> **failing**: `It`

Defined in: node\_modules/@types/jest/index.d.ts:577

Mark this test as expecting to fail.

Only available in the default `jest-circus` runner.

***

### noskip

> **noskip**: `It`

Defined in: [types/jest.patched.d.ts:15](https://github.com/Xunnamius/symbiote/blob/b9e599602cbc0f1d65b094b7a5e8739743f64fd2/types/jest.patched.d.ts#L15)

Ensures this test is run regardless of the invocation of
`reconfigureJestGlobalsToSkipTestsInThisFileIfRequested`.

***

### only

> **only**: `It`

Defined in: node\_modules/@types/jest/index.d.ts:571

Only runs this test in the current file.

***

### skip

> **skip**: `It`

Defined in: node\_modules/@types/jest/index.d.ts:581

Skips running this test in the current file.

***

### todo()

> **todo**: (`name`) => `void`

Defined in: node\_modules/@types/jest/index.d.ts:585

Sketch out which tests to write in the future.

#### Parameters

##### name

`string`

#### Returns

`void`
