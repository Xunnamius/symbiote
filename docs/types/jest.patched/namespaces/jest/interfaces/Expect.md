[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / Expect

# Interface: Expect()

Defined in: node\_modules/jest-extended/types/index.d.ts:932

The `expect` function is used every time you want to test a value.
You will rarely call `expect` by itself.

## Extends

- `CustomMatchers`\<`any`\>

## Extended by

- [`InverseAsymmetricMatchers`](InverseAsymmetricMatchers.md)

> **Expect**\<`T`\>(`actual`): [`JestMatchers`](../type-aliases/JestMatchers.md)\<`T`\>

Defined in: node\_modules/@types/jest/index.d.ts:690

The `expect` function is used every time you want to test a value.
You will rarely call `expect` by itself.

## Type Parameters

### T

`T` = `any`

## Parameters

### actual

`T`

The value to apply matchers against.

## Returns

[`JestMatchers`](../type-aliases/JestMatchers.md)\<`T`\>

## Indexable

\[`key`: `string`\]: `any`

## Properties

### not

> **not**: [`InverseAsymmetricMatchers`](InverseAsymmetricMatchers.md)

Defined in: node\_modules/@types/jest/index.d.ts:776

## Methods

### addSnapshotSerializer()

> **addSnapshotSerializer**(`serializer`): `void`

Defined in: node\_modules/@types/jest/index.d.ts:757

Adds a module to format application-specific data structures for serialization.

#### Parameters

##### serializer

`Plugin_2`

#### Returns

`void`

***

### any()

> **any**(`classType`): `any`

Defined in: node\_modules/@types/jest/index.d.ts:721

Matches anything that was created with the given constructor.
You can use it inside `toEqual` or `toBeCalledWith` instead of a literal value.

#### Parameters

##### classType

`any`

#### Returns

`any`

#### Example

```ts
function randocall(fn) {
  return fn(Math.floor(Math.random() * 6 + 1));
}

test('randocall calls its callback with a number', () => {
  const mock = jest.fn();
  randocall(mock);
  expect(mock).toBeCalledWith(expect.any(Number));
});
```

***

### anything()

> **anything**(): `any`

Defined in: node\_modules/@types/jest/index.d.ts:704

Matches anything but null or undefined. You can use it inside `toEqual` or `toBeCalledWith` instead
of a literal value. For example, if you want to check that a mock function is called with a
non-null argument:

#### Returns

`any`

#### Example

```ts
test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn();
  [1].map(x => mock(x));
  expect(mock).toBeCalledWith(expect.anything());
});
```

***

### arrayContaining()

> **arrayContaining**\<`E`\>(`arr`): `any`

Defined in: node\_modules/@types/jest/index.d.ts:729

Matches any array made up entirely of elements in the provided array.
You can use it inside `toEqual` or `toBeCalledWith` instead of a literal value.

Optionally, you can provide a type for the elements via a generic.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### arr

readonly `E`[]

#### Returns

`any`

***

### assertions()

> **assertions**(`num`): `void`

Defined in: node\_modules/@types/jest/index.d.ts:735

Verifies that a certain number of assertions are called during a test.
This is often useful when testing asynchronous code, in order to
make sure that assertions in a callback actually got called.

#### Parameters

##### num

`number`

#### Returns

`void`

***

### closeTo()

> **closeTo**(`num`, `numDigits?`): `any`

Defined in: node\_modules/@types/jest/index.d.ts:743

Useful when comparing floating point numbers in object properties or array item.
If you need to compare a number, use `.toBeCloseTo` instead.

The optional `numDigits` argument limits the number of digits to check after the decimal point.
For the default value 2, the test criterion is `Math.abs(expected - received) < 0.005` (that is, `10 ** -2 / 2`).

#### Parameters

##### num

`number`

##### numDigits?

`number`

#### Returns

`any`

***

### extend()

> **extend**(`obj`): `void`

Defined in: node\_modules/@types/jest/index.d.ts:753

You can use `expect.extend` to add your own matchers to Jest.

#### Parameters

##### obj

[`ExpectExtendMap`](ExpectExtendMap.md)

#### Returns

`void`

***

### fail()

> **fail**(`message`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:16

Note: Currently unimplemented
Failing assertion

#### Parameters

##### message

`string`

#### Returns

`any`

#### Inherited from

`CustomMatchers.fail`

***

### getState()

> **getState**(): `MatcherState` & `Record`\<`string`, `any`\>

Defined in: node\_modules/@types/jest/index.d.ts:779

#### Returns

`MatcherState` & `Record`\<`string`, `any`\>

***

### hasAssertions()

> **hasAssertions**(): `void`

Defined in: node\_modules/@types/jest/index.d.ts:749

Verifies that at least one assertion is called during a test.
This is often useful when testing asynchronous code, in order to
make sure that assertions in a callback actually got called.

#### Returns

`void`

***

### objectContaining()

> **objectContaining**\<`E`\>(`obj`): `any`

Defined in: node\_modules/@types/jest/index.d.ts:766

Matches any object that recursively matches the provided keys.
This is often handy in conjunction with other asymmetric matchers.

Optionally, you can provide a type for the object via a generic.
This ensures that the object contains the desired structure.

#### Type Parameters

##### E

`E` = \{ \}

#### Parameters

##### obj

`E`

#### Returns

`any`

***

### pass()

> **pass**(`message`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:8

Note: Currently unimplemented
Passing assertion

#### Parameters

##### message

`string`

#### Returns

`any`

#### Inherited from

`CustomMatchers.pass`

***

### setState()

> **setState**(`state`): `void`

Defined in: node\_modules/@types/jest/index.d.ts:778

#### Parameters

##### state

`object`

#### Returns

`void`

***

### stringContaining()

> **stringContaining**(`str`): `any`

Defined in: node\_modules/@types/jest/index.d.ts:774

Matches any received string that contains the exact expected string

#### Parameters

##### str

`string`

#### Returns

`any`

***

### stringMatching()

> **stringMatching**(`str`): `any`

Defined in: node\_modules/@types/jest/index.d.ts:770

Matches any string that contains the exact provided string

#### Parameters

##### str

`string` | `RegExp`

#### Returns

`any`

***

### toBeAfter()

> **toBeAfter**(`date`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:55

Use `.toBeAfter` when checking if a date occurs after `date`.

#### Parameters

##### date

`Date`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeAfter`

***

### toBeAfterOrEqualTo()

> **toBeAfterOrEqualTo**(`date`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:452

Use `.toBeAfterOrEqualTo` when checking if a date equals to or occurs after `date`.

#### Parameters

##### date

`Date`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeAfterOrEqualTo`

***

### toBeArray()

> **toBeArray**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:43

Use `.toBeArray` when checking if a value is an `Array`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeArray`

***

### toBeArrayOfSize()

> **toBeArrayOfSize**(`x`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:49

Use `.toBeArrayOfSize` when checking if a value is an `Array` of size x.

#### Parameters

##### x

`number`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeArrayOfSize`

***

### toBeBefore()

> **toBeBefore**(`date`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:61

Use `.toBeBefore` when checking if a date occurs before `date`.

#### Parameters

##### date

`Date`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeBefore`

***

### toBeBeforeOrEqualTo()

> **toBeBeforeOrEqualTo**(`date`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:446

Use `.toBeBeforeOrEqualTo` when checking if a date equals to or occurs before `date`.

#### Parameters

##### date

`Date`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeBeforeOrEqualTo`

***

### toBeBetween()

> **toBeBetween**(`startDate`, `endDate`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:440

Use `.toBeBetween` when checking if a date occurs between `startDate` and `endDate`.

#### Parameters

##### startDate

`Date`

##### endDate

`Date`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeBetween`

***

### toBeBoolean()

> **toBeBoolean**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:114

Use `.toBeBoolean` when checking if a value is a `Boolean`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeBoolean`

***

### toBeDate()

> **toBeDate**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:129

Use `.toBeDate` when checking if a value is a `Date`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeDate`

***

### toBeDateString()

> **toBeDateString**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:144

Use `.toBeDateString` when checking if a value is a valid date string.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeDateString`

***

### toBeEmpty()

> **toBeEmpty**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:21

Use .toBeEmpty when checking if a String '', Array [] or Object {} is empty.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeEmpty`

***

### toBeEmptyObject()

> **toBeEmptyObject**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:428

Use `.toBeEmptyObject` when checking if a value is an empty `Object`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeEmptyObject`

***

### toBeEven()

> **toBeEven**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:209

Use `.toBeEven` when checking if a value is an even `Number`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeEven`

***

### toBeExtensible()

> **toBeExtensible**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:344

Use `.toBeExtensible` when checking if an object is extensible.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeExtensible`

***

### toBeFalse()

> **toBeFalse**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:124

Use `.toBeFalse` when checking a value is equal (===) to `false`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeFalse`

***

### toBeFinite()

> **toBeFinite**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:194

Use `.toBeFinite` when checking if a value is a `Number`, not `NaN` or `Infinity`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeFinite`

***

### toBeFrozen()

> **toBeFrozen**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:349

Use `.toBeFrozen` when checking if an object is frozen.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeFrozen`

***

### toBeFunction()

> **toBeFunction**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:139

Use `.toBeFunction` when checking if a value is a `Function`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeFunction`

***

### toBeHexadecimal()

> **toBeHexadecimal**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:149

Use `.toBeHexadecimal` when checking if a value is a valid HTML hex color.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeHexadecimal`

***

### toBeInRange()

> **toBeInRange**(`min`, `max`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:230

Use `.toBeInRange` when checking if an array has elements in range min (inclusive) and max (exclusive).

#### Parameters

##### min

`number`

##### max

`number`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeInRange`

***

### toBeNaN()

> **toBeNaN**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:189

Use `.toBeNaN` when checking a value is `NaN`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeNaN`

***

### toBeNegative()

> **toBeNegative**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:204

Use `.toBeNegative` when checking if a value is a negative `Number`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeNegative`

***

### toBeNil()

> **toBeNil**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:32

Use `.toBeNil` when checking a value is `null` or `undefined`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeNil`

***

### toBeNumber()

> **toBeNumber**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:184

Use `.toBeNumber` when checking if a value is a `Number`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeNumber`

***

### toBeObject()

> **toBeObject**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:235

Use `.toBeObject` when checking if a value is an `Object`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeObject`

***

### toBeOdd()

> **toBeOdd**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:214

Use `.toBeOdd` when checking if a value is an odd `Number`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeOdd`

***

### toBeOneOf()

> **toBeOneOf**\<`E`\>(`members`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:27

Use .toBeOneOf when checking if a value is a member of a given Array.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

readonly `E`[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeOneOf`

***

### toBePositive()

> **toBePositive**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:199

Use `.toBePositive` when checking if a value is a positive `Number`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBePositive`

***

### toBeSealed()

> **toBeSealed**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:354

Use `.toBeSealed` when checking if an object is sealed.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeSealed`

***

### toBeString()

> **toBeString**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:369

Use `.toBeString` when checking if a value is a `String`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeString`

***

### toBeSymbol()

> **toBeSymbol**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:433

Use `.toBeSymbol` when checking if a value is a `Symbol`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeSymbol`

***

### toBeTrue()

> **toBeTrue**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:119

Use `.toBeTrue` when checking a value is equal (===) to `true`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeTrue`

***

### toBeValidDate()

> **toBeValidDate**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:134

Use `.toBeValidDate` when checking if a value is a `valid Date`.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeValidDate`

***

### toBeWithin()

> **toBeWithin**(`start`, `end`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:222

Use `.toBeWithin` when checking if a number is in between the given bounds of: start (inclusive) and end (exclusive).

#### Parameters

##### start

`number`

##### end

`number`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toBeWithin`

***

### toChange()

> **toChange**\<`E`\>(`checker`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:241

Use `.toChange` when checking if a value has changed.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### checker

() => `E`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toChange`

***

### toChangeBy()

> **toChangeBy**(`checker`, `by?`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:248

Use `.toChangeBy` when checking if a value changed by an amount.

#### Parameters

##### checker

() => `number`

##### by?

`number`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toChangeBy`

***

### toChangeTo()

> **toChangeTo**\<`E`\>(`checker`, `to`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:255

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

`any`

#### Inherited from

`CustomMatchers.toChangeTo`

***

### toContainAllEntries()

> **toContainAllEntries**\<`E`\>(`entries`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:332

Use `.toContainAllEntries` when checking if an object only contains all of the provided entries.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### entries

readonly readonly \[keyof `E`, `E`\[keyof `E`\]\][]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainAllEntries`

***

### toContainAllKeys()

> **toContainAllKeys**\<`E`\>(`keys`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:276

Use `.toContainAllKeys` when checking if an object only contains all of the provided keys.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### keys

readonly (`string` \| keyof `E`)[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainAllKeys`

***

### toContainAllValues()

> **toContainAllValues**\<`E`\>(`values`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:304

Use `.toContainAllValues` when checking if an object only contains all of the provided values.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### values

readonly `E`[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainAllValues`

***

### toContainAnyEntries()

> **toContainAnyEntries**\<`E`\>(`entries`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:339

Use `.toContainAnyEntries` when checking if an object contains at least one of the provided entries.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### entries

readonly readonly \[keyof `E`, `E`\[keyof `E`\]\][]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainAnyEntries`

***

### toContainAnyKeys()

> **toContainAnyKeys**\<`E`\>(`keys`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:283

Use `.toContainAnyKeys` when checking if an object contains at least one of the provided keys.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### keys

readonly (`string` \| keyof `E`)[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainAnyKeys`

***

### toContainAnyValues()

> **toContainAnyValues**\<`E`\>(`values`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:311

Use `.toContainAnyValues` when checking if an object contains at least one of the provided values.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### values

readonly `E`[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainAnyValues`

***

### toContainEntries()

> **toContainEntries**\<`E`\>(`entries`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:325

Use `.toContainEntries` when checking if an object contains all of the provided entries.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### entries

readonly readonly \[keyof `E`, `E`\[keyof `E`\]\][]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainEntries`

***

### toContainEntry()

> **toContainEntry**\<`E`\>(`entry`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:318

Use `.toContainEntry` when checking if an object contains the provided entry.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### entry

readonly \[keyof `E`, `E`\[keyof `E`\]\]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainEntry`

***

### toContainKey()

> **toContainKey**(`key`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:262

Use `.toContainKey` when checking if an object contains the provided key.

#### Parameters

##### key

`string`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainKey`

***

### toContainKeys()

> **toContainKeys**\<`E`\>(`keys`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:269

Use `.toContainKeys` when checking if an object has all of the provided keys.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### keys

readonly (`string` \| keyof `E`)[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainKeys`

***

### toContainValue()

> **toContainValue**\<`E`\>(`value`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:290

Use `.toContainValue` when checking if an object contains the provided value.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### value

`E`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainValue`

***

### toContainValues()

> **toContainValues**\<`E`\>(`values`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:297

Use `.toContainValues` when checking if an object contains all of the provided values.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### values

readonly `E`[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toContainValues`

***

### toEndWith()

> **toEndWith**(`suffix`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:390

Use `.toEndWith` when checking if a `String` ends with a given `String` suffix.

#### Parameters

##### suffix

`string`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toEndWith`

***

### toEqualCaseInsensitive()

> **toEqualCaseInsensitive**(`string`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:376

Use `.toEqualCaseInsensitive` when checking if a string is equal (===) to another ignoring the casing of both strings.

#### Parameters

##### string

`string`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toEqualCaseInsensitive`

***

### toEqualIgnoringWhitespace()

> **toEqualIgnoringWhitespace**(`string`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:459

Use `.toEqualIgnoringWhitespace` when checking if a `String` is equal (===) to given `String` ignoring white-space.

#### Parameters

##### string

`string`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toEqualIgnoringWhitespace`

***

### toHaveBeenCalledAfter()

> **toHaveBeenCalledAfter**(`mock`, `failIfNoFirstInvocation?`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:169

Use `.toHaveBeenCalledAfter` when checking if a `Mock` was called after another `Mock`.

Note: Required Jest version >=23

#### Parameters

##### mock

[`MockInstance`](MockInstance.md)\<`any`, `any`[]\>

##### failIfNoFirstInvocation?

`boolean`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toHaveBeenCalledAfter`

***

### toHaveBeenCalledBefore()

> **toHaveBeenCalledBefore**(`mock`, `failIfNoSecondInvocation?`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:159

Use `.toHaveBeenCalledBefore` when checking if a `Mock` was called before another `Mock`.

Note: Required Jest version >=23

#### Parameters

##### mock

[`MockInstance`](MockInstance.md)\<`any`, `any`[]\>

##### failIfNoSecondInvocation?

`boolean`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toHaveBeenCalledBefore`

***

### toHaveBeenCalledExactlyOnceWith()

> **toHaveBeenCalledExactlyOnceWith**(...`args`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:179

Use `.toHaveBeenCalledExactlyOnceWith` to check if a `Mock` was called exactly one time with the expected value.

#### Parameters

##### args

...`unknown`[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toHaveBeenCalledExactlyOnceWith`

***

### toHaveBeenCalledOnce()

> **toHaveBeenCalledOnce**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:174

Use `.toHaveBeenCalledOnce` to check if a `Mock` was called exactly one time.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toHaveBeenCalledOnce`

***

### toInclude()

> **toInclude**(`substring`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:397

Use `.toInclude` when checking if a `String` includes the given `String` substring.

#### Parameters

##### substring

`string`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toInclude`

***

### toIncludeAllMembers()

> **toIncludeAllMembers**\<`E`\>(`members`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:67

Use `.toIncludeAllMembers` when checking if an `Array` contains all of the same members of a given set.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

`E` | readonly `E`[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toIncludeAllMembers`

***

### toIncludeAllPartialMembers()

> **toIncludeAllPartialMembers**\<`E`\>(`members`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:73

Use `.toIncludeAllPartialMembers` when checking if an `Array` contains all the same partial members of a given set.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

`E` | readonly `E`[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toIncludeAllPartialMembers`

***

### toIncludeAnyMembers()

> **toIncludeAnyMembers**\<`E`\>(`members`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:85

Use `.toIncludeAnyMembers` when checking if an `Array` contains any of the members of a given set.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

`E` | readonly `E`[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toIncludeAnyMembers`

***

### toIncludeMultiple()

> **toIncludeMultiple**(`substring`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:412

Use `.toIncludeMultiple` when checking if a `String` includes all of the given substrings.

#### Parameters

##### substring

readonly `string`[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toIncludeMultiple`

***

### toIncludeRepeated()

> **toIncludeRepeated**(`substring`, `times`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:405

Use `.toIncludeRepeated` when checking if a `String` includes the given `String` substring the correct number of times.

#### Parameters

##### substring

`string`

##### times

`number`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toIncludeRepeated`

***

### toIncludeSameMembers()

> **toIncludeSameMembers**\<`E`\>(`members`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:91

Use `.toIncludeSameMembers` when checking if two arrays contain equal values, in any order.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

readonly `E`[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toIncludeSameMembers`

***

### toIncludeSamePartialMembers()

> **toIncludeSamePartialMembers**\<`E`\>(`members`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:79

Use `.toIncludeSamePartialMembers` when checking if an `Array` contains exactly the same partial members as a given set, in any order

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### members

readonly `E`[]

#### Returns

`any`

#### Inherited from

`CustomMatchers.toIncludeSamePartialMembers`

***

### toPartiallyContain()

> **toPartiallyContain**\<`E`\>(`member`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:97

Use `.toPartiallyContain` when checking if any array value matches the partial member.

#### Type Parameters

##### E

`E` = `unknown`

#### Parameters

##### member

`E`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toPartiallyContain`

***

### toReject()

> **toReject**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:364

Use `.toReject` when checking if a promise rejects.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toReject`

***

### toResolve()

> **toResolve**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:359

Use `.toResolve` when checking if a promise resolves.

#### Returns

`any`

#### Inherited from

`CustomMatchers.toResolve`

***

### toSatisfy()

> **toSatisfy**\<`E`\>(`predicate`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:38

Use `.toSatisfy` when you want to use a custom matcher by supplying a predicate function that returns a `Boolean`.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### predicate

(`x`) => `boolean`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toSatisfy`

***

### toSatisfyAll()

> **toSatisfyAll**\<`E`\>(`predicate`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:103

Use `.toSatisfyAll` when you want to use a custom matcher by supplying a predicate function that returns a `Boolean` for all values in an array.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### predicate

(`x`) => `boolean`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toSatisfyAll`

***

### toSatisfyAny()

> **toSatisfyAny**(`predicate`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:109

Use `.toSatisfyAny` when you want to use a custom matcher by supplying a predicate function that returns `true` for any matching value in an array.

#### Parameters

##### predicate

(`x`) => `boolean`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toSatisfyAny`

***

### toStartWith()

> **toStartWith**(`prefix`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:383

Use `.toStartWith` when checking if a `String` starts with a given `String` prefix.

#### Parameters

##### prefix

`string`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toStartWith`

***

### toThrowWithMessage()

> **toThrowWithMessage**(`type`, `message`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:420

Use `.toThrowWithMessage` when checking if a callback function throws an error of a given type with a given error message.

#### Parameters

##### type

(...`args`) => `object` | (...`args`) => `object`

##### message

`string` | `RegExp`

#### Returns

`any`

#### Inherited from

`CustomMatchers.toThrowWithMessage`
