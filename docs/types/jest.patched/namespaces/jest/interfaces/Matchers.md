[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / Matchers

# Interface: Matchers\<R, T\>

Defined in: node\_modules/jest-extended/types/index.d.ts:470

## Type Parameters

### R

`R`

### T

`T` = \{ \}

## Methods

### fail()

> **fail**(`message`): `never`

Defined in: node\_modules/jest-extended/types/index.d.ts:485

Note: Currently unimplemented
Failing assertion

#### Parameters

##### message

`string`

#### Returns

`never`

***

### pass()

> **pass**(`message`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:477

Note: Currently unimplemented
Passing assertion

#### Parameters

##### message

`string`

#### Returns

`R`

***

### toBe()

> **toBe**\<`E`\>(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:842

Checks that a value is what you expect. It uses `Object.is` to check strict equality.
Don't use `toBe` with floating-point numbers.

Optionally, you can provide a type for the expected value via a generic.
This is particularly useful for ensuring expected objects have the right structure.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### expected

`E`

#### Returns

`R`

***

### toBeAfter()

> **toBeAfter**(`date`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:524

Use `.toBeAfter` when checking if a date occurs after `date`.

#### Parameters

##### date

`Date`

#### Returns

`R`

***

### toBeAfterOrEqualTo()

> **toBeAfterOrEqualTo**(`date`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:932

Use `.toBeAfterOrEqualTo` when checking if a date equals to or occurs after `date`.

#### Parameters

##### date

`Date`

#### Returns

`R`

***

### toBeArray()

> **toBeArray**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:512

Use `.toBeArray` when checking if a value is an `Array`.

#### Returns

`R`

***

### toBeArrayOfSize()

> **toBeArrayOfSize**(`x`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:518

Use `.toBeArrayOfSize` when checking if a value is an `Array` of size x.

#### Parameters

##### x

`number`

#### Returns

`R`

***

### toBeBefore()

> **toBeBefore**(`date`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:530

Use `.toBeBefore` when checking if a date occurs before `date`.

#### Parameters

##### date

`Date`

#### Returns

`R`

***

### toBeBeforeOrEqualTo()

> **toBeBeforeOrEqualTo**(`date`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:926

Use `.toBeBeforeOrEqualTo` when checking if a date equals to or occurs before `date`.

#### Parameters

##### date

`Date`

#### Returns

`R`

***

### toBeBetween()

> **toBeBetween**(`startDate`, `endDate`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:920

Use `.toBeBetween` when checking if a date occurs between `startDate` and `endDate`.

#### Parameters

##### startDate

`Date`

##### endDate

`Date`

#### Returns

`R`

***

### toBeBigInt()

> **toBeBigInt**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:535

Use `.toBeBigInt` when checking if a value is a `BigInt`.

#### Returns

`R`

***

### toBeBoolean()

> **toBeBoolean**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:588

Use `.toBeBoolean` when checking if a value is a `Boolean`.

#### Returns

`R`

***

### toBeCloseTo()

> **toBeCloseTo**(`expected`, `numDigits?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:848

Using exact equality with floating point numbers is a bad idea.
Rounding means that intuitive things fail.
The default for numDigits is 2.

#### Parameters

##### expected

`number`

##### numDigits?

`number`

#### Returns

`R`

***

### toBeDate()

> **toBeDate**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:603

Use `.toBeDate` when checking if a value is a `Date`.

#### Returns

`R`

***

### toBeDateString()

> **toBeDateString**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:618

Use `.toBeDateString` when checking if a value is a valid date string.

#### Returns

`R`

***

### toBeDefined()

> **toBeDefined**(): `R`

Defined in: node\_modules/@types/jest/index.d.ts:852

Ensure that a variable is not undefined.

#### Returns

`R`

***

### toBeEmpty()

> **toBeEmpty**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:490

Use .toBeEmpty when checking if a String '', Array [], Object {} or Iterable (i.e. Map, Set) is empty.

#### Returns

`R`

***

### toBeEmptyObject()

> **toBeEmptyObject**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:908

Use `.toBeEmptyObject` when checking if a value is an empty `Object`.

#### Returns

`R`

***

### toBeEven()

> **toBeEven**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:683

Use `.toBeEven` when checking if a value is an even `Number` or `BigInt`.

#### Returns

`R`

***

### toBeExtensible()

> **toBeExtensible**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:824

Use `.toBeExtensible` when checking if an object is extensible.

#### Returns

`R`

***

### toBeFalse()

> **toBeFalse**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:598

Use `.toBeFalse` when checking a value is equal (===) to `false`.

#### Returns

`R`

***

### toBeFalsy()

> **toBeFalsy**(): `R`

Defined in: node\_modules/@types/jest/index.d.ts:857

When you don't care what a value is, you just want to
ensure a value is false in a boolean context.

#### Returns

`R`

***

### toBeFinite()

> **toBeFinite**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:668

Use `.toBeFinite` when checking if a value is a `Number`, not `NaN` or `Infinity`, or a `BigInt`.

#### Returns

`R`

***

### toBeFrozen()

> **toBeFrozen**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:829

Use `.toBeFrozen` when checking if an object is frozen.

#### Returns

`R`

***

### toBeFunction()

> **toBeFunction**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:613

Use `.toBeFunction` when checking if a value is a `Function`.

#### Returns

`R`

***

### toBeGreaterThan()

> **toBeGreaterThan**(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:861

For comparing floating point or big integer numbers.

#### Parameters

##### expected

`number` | `bigint`

#### Returns

`R`

***

### toBeGreaterThanOrEqual()

> **toBeGreaterThanOrEqual**(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:865

For comparing floating point or big integer numbers.

#### Parameters

##### expected

`number` | `bigint`

#### Returns

`R`

***

### toBeHexadecimal()

> **toBeHexadecimal**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:623

Use `.toBeHexadecimal` when checking if a value is a valid HTML hex color.

#### Returns

`R`

***

### toBeInRange()

> **toBeInRange**(`min`, `max`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:705

Use `.toBeInRange` when checking if an array has elements in range min (inclusive) and max (exclusive).
Supports both number and BigInt values.

#### Parameters

##### min

`number` | `bigint`

##### max

`number` | `bigint`

#### Returns

`R`

***

### toBeInstanceOf()

> **toBeInstanceOf**\<`E`\>(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:874

Ensure that an object is an instance of a class.
This matcher uses `instanceof` underneath.

Optionally, you can provide a type for the expected value via a generic.
This is particularly useful for ensuring expected objects have the right structure.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### expected

`E`

#### Returns

`R`

***

### toBeInteger()

> **toBeInteger**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:710

Use `.toBeInteger` when checking if a value is an integer.

#### Returns

`R`

***

### toBeLessThan()

> **toBeLessThan**(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:878

For comparing floating point or big integer numbers.

#### Parameters

##### expected

`number` | `bigint`

#### Returns

`R`

***

### toBeLessThanOrEqual()

> **toBeLessThanOrEqual**(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:882

For comparing floating point or big integer numbers.

#### Parameters

##### expected

`number` | `bigint`

#### Returns

`R`

***

### toBeNaN()

#### Call Signature

> **toBeNaN**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:663

Use `.toBeNaN` when checking a value is `NaN`.

##### Returns

`R`

#### Call Signature

> **toBeNaN**(): `R`

Defined in: node\_modules/@types/jest/index.d.ts:901

Used to check that a variable is NaN.

##### Returns

`R`

***

### toBeNegative()

> **toBeNegative**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:678

Use `.toBeNegative` when checking if a value is a negative `Number` or `BigInt`.

#### Returns

`R`

***

### toBeNil()

> **toBeNil**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:501

Use `.toBeNil` when checking a value is `null` or `undefined`.

#### Returns

`R`

***

### toBeNull()

> **toBeNull**(): `R`

Defined in: node\_modules/@types/jest/index.d.ts:887

This is the same as `.toBe(null)` but the error messages are a bit nicer.
So use `.toBeNull()` when you want to check that something is null.

#### Returns

`R`

***

### toBeNumber()

> **toBeNumber**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:658

Use `.toBeNumber` when checking if a value is a `Number` or `BigInt`.

#### Returns

`R`

***

### toBeObject()

> **toBeObject**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:715

Use `.toBeObject` when checking if a value is an `Object`.

#### Returns

`R`

***

### toBeOdd()

> **toBeOdd**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:688

Use `.toBeOdd` when checking if a value is an odd `Number` or `BigInt`.

#### Returns

`R`

***

### toBeOneOf()

> **toBeOneOf**\<`E`\>(`members`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:496

Use .toBeOneOf when checking if a value is a member of a given Array.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

readonly `E`[]

#### Returns

`R`

***

### toBePositive()

> **toBePositive**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:673

Use `.toBePositive` when checking if a value is a positive `Number` or `BigInt`.

#### Returns

`R`

***

### toBeSealed()

> **toBeSealed**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:834

Use `.toBeSealed` when checking if an object is sealed.

#### Returns

`R`

***

### toBeString()

> **toBeString**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:849

Use `.toBeString` when checking if a value is a `String`.

#### Returns

`R`

***

### toBeSymbol()

> **toBeSymbol**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:913

Use `.toBeSymbol` when checking if a value is a `Symbol`.

#### Returns

`R`

***

### toBeTrue()

> **toBeTrue**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:593

Use `.toBeTrue` when checking a value is equal (===) to `true`.

#### Returns

`R`

***

### toBeTruthy()

> **toBeTruthy**(): `R`

Defined in: node\_modules/@types/jest/index.d.ts:893

Use when you don't care what a value is, you just want to ensure a value
is true in a boolean context. In JavaScript, there are six falsy values:
`false`, `0`, `''`, `null`, `undefined`, and `NaN`. Everything else is truthy.

#### Returns

`R`

***

### toBeUndefined()

> **toBeUndefined**(): `R`

Defined in: node\_modules/@types/jest/index.d.ts:897

Used to check that a variable is undefined.

#### Returns

`R`

***

### toBeValidDate()

> **toBeValidDate**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:608

Use `.toBeValidDate` when checking if a value is a `valid Date`.

#### Returns

`R`

***

### toBeWithin()

> **toBeWithin**(`start`, `end`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:696

Use `.toBeWithin` when checking if a number is in between the given bounds of: start (inclusive) and end (exclusive).

#### Parameters

##### start

`number`

##### end

`number`

#### Returns

`R`

***

### toChange()

> **toChange**\<`E`\>(`checker`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:721

Use `.toChange` when checking if a value has changed.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### checker

() => `E`

#### Returns

`R`

***

### toChangeBy()

> **toChangeBy**(`checker`, `by?`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:728

Use `.toChangeBy` when checking if a value changed by an amount.

#### Parameters

##### checker

() => `number` \| `bigint`

##### by?

`number` | `bigint`

#### Returns

`R`

***

### toChangeTo()

> **toChangeTo**\<`E`\>(`checker`, `to`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:735

Use `.toChangeTo` when checking if a value changed to a specific value.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### checker

() => `E`

##### to

`E`

#### Returns

`R`

***

### toContain()

> **toContain**\<`E`\>(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:911

Used when you want to check that an item is in a list.
For testing the items in the list, this uses `===`, a strict equality check.
It can also check whether a string is a substring of another string.

Optionally, you can provide a type for the expected value via a generic.
This is particularly useful for ensuring expected objects have the right structure.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### expected

`E`

#### Returns

`R`

***

### toContainAllEntries()

> **toContainAllEntries**\<`E`\>(`entries`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:812

Use `.toContainAllEntries` when checking if an object only contains all the provided entries.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### entries

readonly readonly \[keyof `E`, `E`\[keyof `E`\]\][]

#### Returns

`R`

***

### toContainAllKeys()

> **toContainAllKeys**\<`E`\>(`keys`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:756

Use `.toContainAllKeys` when checking if an object only contains all of the provided keys.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### keys

readonly (`string` \| keyof `E`)[]

#### Returns

`R`

***

### toContainAllValues()

> **toContainAllValues**\<`E`\>(`values`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:784

Use `.toContainAllValues` when checking if an object only contains all of the provided values.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### values

readonly `E`[]

#### Returns

`R`

***

### toContainAnyEntries()

> **toContainAnyEntries**\<`E`\>(`entries`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:819

Use `.toContainAnyEntries` when checking if an object contains at least one of the provided entries.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### entries

readonly readonly \[keyof `E`, `E`\[keyof `E`\]\][]

#### Returns

`R`

***

### toContainAnyKeys()

> **toContainAnyKeys**\<`E`\>(`keys`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:763

Use `.toContainAnyKeys` when checking if an object contains at least one of the provided keys.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### keys

readonly (`string` \| keyof `E`)[]

#### Returns

`R`

***

### toContainAnyValues()

> **toContainAnyValues**\<`E`\>(`values`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:791

Use `.toContainAnyValues` when checking if an object contains at least one of the provided values.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### values

readonly `E`[]

#### Returns

`R`

***

### toContainEntries()

> **toContainEntries**\<`E`\>(`entries`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:805

Use `.toContainEntries` when checking if an object contains all the provided entries.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### entries

readonly readonly \[keyof `E`, `E`\[keyof `E`\]\][]

#### Returns

`R`

***

### toContainEntry()

> **toContainEntry**\<`E`\>(`entry`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:798

Use `.toContainEntry` when checking if an object contains the provided entry.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### entry

readonly \[keyof `E`, `E`\[keyof `E`\]\]

#### Returns

`R`

***

### toContainEqual()

> **toContainEqual**\<`E`\>(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:921

Used when you want to check that an item is in a list.
For testing the items in the list, this matcher recursively checks the
equality of all fields, rather than checking for object identity.

Optionally, you can provide a type for the expected value via a generic.
This is particularly useful for ensuring expected objects have the right structure.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### expected

`E`

#### Returns

`R`

***

### toContainKey()

> **toContainKey**\<`E`\>(`key`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:742

Use `.toContainKey` when checking if an object contains the provided key.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### key

`string` | keyof `E`

#### Returns

`R`

***

### toContainKeys()

> **toContainKeys**\<`E`\>(`keys`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:749

Use `.toContainKeys` when checking if an object has all of the provided keys.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### keys

readonly (`string` \| keyof `E`)[]

#### Returns

`R`

***

### toContainValue()

> **toContainValue**\<`E`\>(`value`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:770

Use `.toContainValue` when checking if an object contains the provided value.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### value

`E`

#### Returns

`R`

***

### toContainValues()

> **toContainValues**\<`E`\>(`values`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:777

Use `.toContainValues` when checking if an object contains all of the provided values.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### values

readonly `E`[]

#### Returns

`R`

***

### toEndWith()

> **toEndWith**(`suffix`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:870

Use `.toEndWith` when checking if a `String` ends with a given `String` suffix.

#### Parameters

##### suffix

`string`

#### Returns

`R`

***

### toEqual()

> **toEqual**\<`E`\>(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:930

Used when you want to check that two objects have the same value.
This matcher recursively checks the equality of all fields, rather than checking for object identity.

Optionally, you can provide a type for the expected value via a generic.
This is particularly useful for ensuring expected objects have the right structure.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### expected

`E`

#### Returns

`R`

***

### toEqualCaseInsensitive()

> **toEqualCaseInsensitive**(`string`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:856

Use `.toEqualCaseInsensitive` when checking if a string is equal (===) to another ignoring the casing of both strings.

#### Parameters

##### string

`string`

#### Returns

`R`

***

### toEqualIgnoringWhitespace()

> **toEqualIgnoringWhitespace**(`string`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:939

Use `.toEqualIgnoringWhitespace` when checking if a `String` is equal (===) to given `String` ignoring white-space.

#### Parameters

##### string

`string`

#### Returns

`R`

***

### toHaveBeenCalled()

> **toHaveBeenCalled**(): `R`

Defined in: node\_modules/@types/jest/index.d.ts:934

Ensures that a mock function is called.

#### Returns

`R`

***

### toHaveBeenCalledAfter()

> **toHaveBeenCalledAfter**(`mock`, `failIfNoFirstInvocation?`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:643

Use `.toHaveBeenCalledAfter` when checking if a `Mock` was called after another `Mock`.

Note: Required Jest version >=23

#### Parameters

##### mock

[`MockInstance`](MockInstance.md)\<`any`, `any`[]\>

##### failIfNoFirstInvocation?

`boolean`

#### Returns

`R`

***

### toHaveBeenCalledBefore()

> **toHaveBeenCalledBefore**(`mock`, `failIfNoSecondInvocation?`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:633

Use `.toHaveBeenCalledBefore` when checking if a `Mock` was called before another `Mock`.

Note: Required Jest version >=23

#### Parameters

##### mock

[`MockInstance`](MockInstance.md)\<`any`, `any`[]\>

##### failIfNoSecondInvocation?

`boolean`

#### Returns

`R`

***

### toHaveBeenCalledExactlyOnceWith()

> **toHaveBeenCalledExactlyOnceWith**(...`args`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:653

Use `.toHaveBeenCalledExactlyOnceWith` to check if a `Mock` was called exactly one time with the expected value.

#### Parameters

##### args

...`unknown`[]

#### Returns

`R`

***

### toHaveBeenCalledOnce()

> **toHaveBeenCalledOnce**(): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:648

Use `.toHaveBeenCalledOnce` to check if a `Mock` was called exactly one time.

#### Returns

`R`

***

### toHaveBeenCalledTimes()

> **toHaveBeenCalledTimes**(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:938

Ensures that a mock function is called an exact number of times.

#### Parameters

##### expected

`number`

#### Returns

`R`

***

### toHaveBeenCalledWith()

> **toHaveBeenCalledWith**\<`E`\>(...`params`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:946

Ensure that a mock function is called with specific arguments.

Optionally, you can provide a type for the expected arguments via a generic.
Note that the type must be either an array or a tuple.

#### Type Parameters

##### E

`E` *extends* `any`[]

#### Parameters

##### params

...`E`

#### Returns

`R`

***

### toHaveBeenLastCalledWith()

> **toHaveBeenLastCalledWith**\<`E`\>(...`params`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:963

If you have a mock function, you can use `.toHaveBeenLastCalledWith`
to test what arguments it was last called with.

Optionally, you can provide a type for the expected arguments via a generic.
Note that the type must be either an array or a tuple.

#### Type Parameters

##### E

`E` *extends* `any`[]

#### Parameters

##### params

...`E`

#### Returns

`R`

***

### toHaveBeenNthCalledWith()

> **toHaveBeenNthCalledWith**\<`E`\>(`nthCall`, ...`params`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:954

Ensure that a mock function is called with specific arguments on an Nth call.

Optionally, you can provide a type for the expected arguments via a generic.
Note that the type must be either an array or a tuple.

#### Type Parameters

##### E

`E` *extends* `any`[]

#### Parameters

##### nthCall

`number`

##### params

...`E`

#### Returns

`R`

***

### toHaveLastReturnedWith()

> **toHaveLastReturnedWith**\<`E`\>(`expected?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:973

Use to test the specific value that a mock function last returned.
If the last call to the mock function threw an error, then this matcher will fail
no matter what value you provided as the expected return value.

Optionally, you can provide a type for the expected value via a generic.
This is particularly useful for ensuring expected objects have the right structure.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### expected?

`E`

#### Returns

`R`

***

### toHaveLength()

> **toHaveLength**(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:978

Used to check that an object has a `.length` property
and it is set to a certain numeric value.

#### Parameters

##### expected

`number`

#### Returns

`R`

***

### toHaveNthReturnedWith()

> **toHaveNthReturnedWith**\<`E`\>(`nthCall`, `expected?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:988

Use to test the specific value that a mock function returned for the nth call.
If the nth call to the mock function threw an error, then this matcher will fail
no matter what value you provided as the expected return value.

Optionally, you can provide a type for the expected value via a generic.
This is particularly useful for ensuring expected objects have the right structure.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### nthCall

`number`

##### expected?

`E`

#### Returns

`R`

***

### toHaveProperty()

> **toHaveProperty**\<`E`\>(`propertyPath`, `value?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1003

Use to check if property at provided reference keyPath exists for an object.
For checking deeply nested properties in an object you may use dot notation or an array containing
the keyPath for deep references.

Optionally, you can provide a value to check if it's equal to the value present at keyPath
on the target object. This matcher uses 'deep equality' (like `toEqual()`) and recursively checks
the equality of all fields.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### propertyPath

`string` | readonly `any`[]

##### value?

`E`

#### Returns

`R`

#### Example

```ts
expect(houseForSale).toHaveProperty('kitchen.area', 20);
```

***

### toHaveReturned()

> **toHaveReturned**(): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1007

Use to test that the mock function successfully returned (i.e., did not throw an error) at least one time

#### Returns

`R`

***

### toHaveReturnedTimes()

> **toHaveReturnedTimes**(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1012

Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
Any calls to the mock function that throw an error are not counted toward the number of times the function returned.

#### Parameters

##### expected

`number`

#### Returns

`R`

***

### toHaveReturnedWith()

> **toHaveReturnedWith**\<`E`\>(`expected?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1020

Use to ensure that a mock function returned a specific value.

Optionally, you can provide a type for the expected value via a generic.
This is particularly useful for ensuring expected objects have the right structure.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### expected?

`E`

#### Returns

`R`

***

### toInclude()

> **toInclude**(`substring`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:877

Use `.toInclude` when checking if a `String` includes the given `String` substring.

#### Parameters

##### substring

`string`

#### Returns

`R`

***

### toIncludeAllMembers()

> **toIncludeAllMembers**\<`E`\>(`members`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:541

Use `.toIncludeAllMembers` when checking if an `Array` contains all the same members of a given set.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

`E` | readonly `E`[]

#### Returns

`R`

***

### toIncludeAllPartialMembers()

> **toIncludeAllPartialMembers**\<`E`\>(`members`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:547

Use `.toIncludeAllPartialMembers` when checking if an `Array` contains all the same partial members of a given set.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

`E` | readonly `E`[]

#### Returns

`R`

***

### toIncludeAnyMembers()

> **toIncludeAnyMembers**\<`E`\>(`members`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:559

Use `.toIncludeAnyMembers` when checking if an `Array` contains any of the members of a given set.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

`E` | readonly `E`[]

#### Returns

`R`

***

### toIncludeMultiple()

> **toIncludeMultiple**(`substring`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:892

Use `.toIncludeMultiple` when checking if a `String` includes all of the given substrings.

#### Parameters

##### substring

readonly `string`[]

#### Returns

`R`

***

### toIncludeRepeated()

> **toIncludeRepeated**(`substring`, `times`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:885

Use `.toIncludeRepeated` when checking if a `String` includes the given `String` substring the correct number of times.

#### Parameters

##### substring

`string`

##### times

`number`

#### Returns

`R`

***

### toIncludeSameMembers()

> **toIncludeSameMembers**\<`E`\>(`members`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:565

Use `.toIncludeSameMembers` when checking if two arrays contain equal values, in any order.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

readonly `E`[]

#### Returns

`R`

***

### toIncludeSamePartialMembers()

> **toIncludeSamePartialMembers**\<`E`\>(`members`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:553

Use `.toIncludeSamePartialMembers` when checking if an `Array` contains exactly the same partial members as a given set, in any order

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

readonly `E`[]

#### Returns

`R`

***

### toMatch()

> **toMatch**(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1024

Check that a string matches a regular expression.

#### Parameters

##### expected

`string` | `RegExp`

#### Returns

`R`

***

### toMatchInlineSnapshot()

#### Call Signature

> **toMatchInlineSnapshot**\<`U`\>(`propertyMatchers`, `snapshot?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1064

This ensures that a value matches the most recent snapshot with property matchers.
Instead of writing the snapshot value to a .snap file, it will be written into the source code automatically.
Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.

##### Type Parameters

###### U

`U` *extends* \{ \[P in string \| number \| symbol\]: any \}

##### Parameters

###### propertyMatchers

`Partial`\<`U`\>

###### snapshot?

`string`

##### Returns

`R`

#### Call Signature

> **toMatchInlineSnapshot**(`snapshot?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1070

This ensures that a value matches the most recent snapshot with property matchers.
Instead of writing the snapshot value to a .snap file, it will be written into the source code automatically.
Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.

##### Parameters

###### snapshot?

`string`

##### Returns

`R`

***

### toMatchObject()

> **toMatchObject**\<`E`\>(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1046

Used to check that a JavaScript object matches a subset of the properties of an object

Optionally, you can provide an object to use as Generic type for the expected value.
This ensures that the matching object matches the structure of the provided object-like type.

#### Type Parameters

##### E

`E` *extends* \{ \} \| `any`[]

#### Parameters

##### expected

`E`

#### Returns

`R`

#### Example

```ts
type House = {
  bath: boolean;
  bedrooms: number;
  kitchen: {
    amenities: string[];
    area: number;
    wallColor: string;
  }
};

expect(desiredHouse).toMatchObject<House>({...standardHouse, kitchen: {area: 20}}) // wherein standardHouse is some base object of type House
```

***

### toMatchSnapshot()

#### Call Signature

> **toMatchSnapshot**\<`U`\>(`propertyMatchers`, `snapshotName?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1052

This ensures that a value matches the most recent snapshot with property matchers.
Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.

##### Type Parameters

###### U

`U` *extends* \{ \[P in string \| number \| symbol\]: any \}

##### Parameters

###### propertyMatchers

`Partial`\<`U`\>

###### snapshotName?

`string`

##### Returns

`R`

#### Call Signature

> **toMatchSnapshot**(`snapshotName?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1057

This ensures that a value matches the most recent snapshot.
Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.

##### Parameters

###### snapshotName?

`string`

##### Returns

`R`

***

### toPartiallyContain()

> **toPartiallyContain**\<`E`\>(`member`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:571

Use `.toPartiallyContain` when checking if any array value matches the partial member.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### member

`E`

#### Returns

`R`

***

### toReject()

> **toReject**(): `Promise`\<`R`\>

Defined in: node\_modules/jest-extended/types/index.d.ts:844

Use `.toReject` when checking if a promise rejects.

#### Returns

`Promise`\<`R`\>

***

### toResolve()

> **toResolve**(): `Promise`\<`R`\>

Defined in: node\_modules/jest-extended/types/index.d.ts:839

Use `.toResolve` when checking if a promise resolves.

#### Returns

`Promise`\<`R`\>

***

### toSatisfy()

> **toSatisfy**\<`E`\>(`predicate`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:507

Use `.toSatisfy` when you want to use a custom matcher by supplying a predicate function that returns a `Boolean`.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### predicate

(`x`) => `boolean`

#### Returns

`R`

***

### toSatisfyAll()

> **toSatisfyAll**\<`E`\>(`predicate`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:577

Use `.toSatisfyAll` when you want to use a custom matcher by supplying a predicate function that returns a `Boolean` for all values in an array.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### predicate

(`x`) => `boolean`

#### Returns

`R`

***

### toSatisfyAny()

> **toSatisfyAny**(`predicate`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:583

Use `.toSatisfyAny` when you want to use a custom matcher by supplying a predicate function that returns `true` for any matching value in an array.

#### Parameters

##### predicate

(`x`) => `boolean`

#### Returns

`R`

***

### toStartWith()

> **toStartWith**(`prefix`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:863

Use `.toStartWith` when checking if a `String` starts with a given `String` prefix.

#### Parameters

##### prefix

`string`

#### Returns

`R`

***

### toStrictEqual()

> **toStrictEqual**\<`E`\>(`expected`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1078

Use to test that objects have the same types as well as structure.

Optionally, you can provide a type for the expected value via a generic.
This is particularly useful for ensuring expected objects have the right structure.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### expected

`E`

#### Returns

`R`

***

### toThrow()

> **toThrow**(`error?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1082

Used to test that a function throws when it is called.

#### Parameters

##### error?

`string` | `RegExp` | `Error` | [`Constructable`](Constructable.md)

#### Returns

`R`

***

### toThrowErrorMatchingInlineSnapshot()

> **toThrowErrorMatchingInlineSnapshot**(`snapshot?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1091

Used to test that a function throws a error matching the most recent snapshot when it is called.
Instead of writing the snapshot value to a .snap file, it will be written into the source code automatically.

#### Parameters

##### snapshot?

`string`

#### Returns

`R`

***

### toThrowErrorMatchingSnapshot()

> **toThrowErrorMatchingSnapshot**(`snapshotName?`): `R`

Defined in: node\_modules/@types/jest/index.d.ts:1086

Used to test that a function throws a error matching the most recent snapshot when it is called.

#### Parameters

##### snapshotName?

`string`

#### Returns

`R`

***

### toThrowWithMessage()

> **toThrowWithMessage**(`type`, `message`): `R`

Defined in: node\_modules/jest-extended/types/index.d.ts:900

Use `.toThrowWithMessage` when checking if a callback function throws an error of a given type with a given error message.

#### Parameters

##### type

(...`args`) => `object` | (...`args`) => `object`

##### message

`string` | `RegExp`

#### Returns

`R`
