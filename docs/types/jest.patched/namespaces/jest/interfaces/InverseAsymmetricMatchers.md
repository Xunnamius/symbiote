[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / InverseAsymmetricMatchers

# Interface: InverseAsymmetricMatchers()

Defined in: node\_modules/jest-extended/types/index.d.ts:948

The `expect` function is used every time you want to test a value.
You will rarely call `expect` by itself.

## Extends

- [`Expect`](Expect.md)

> **InverseAsymmetricMatchers**\<`T`\>(`actual`): [`JestMatchers`](../type-aliases/JestMatchers.md)\<`T`\>

Defined in: node\_modules/jest-extended/types/index.d.ts:948

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

> **not**: `InverseAsymmetricMatchers`

Defined in: node\_modules/@types/jest/index.d.ts:776

#### Inherited from

[`Expect`](Expect.md).[`not`](Expect.md#not)

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

#### Inherited from

[`Expect`](Expect.md).[`addSnapshotSerializer`](Expect.md#addsnapshotserializer)

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

#### Inherited from

[`Expect`](Expect.md).[`any`](Expect.md#any)

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

#### Inherited from

[`Expect`](Expect.md).[`anything`](Expect.md#anything)

***

### arrayContaining()

> **arrayContaining**\<`E`\>(`arr`): `any`

Defined in: node\_modules/@types/jest/index.d.ts:652

`expect.not.arrayContaining(array)` matches a received array which
does not contain all of the elements in the expected array. That is,
the expected array is not a subset of the received array. It is the
inverse of `expect.arrayContaining`.

Optionally, you can provide a type for the elements via a generic.

#### Type Parameters

##### E

`E` = `any`

#### Parameters

##### arr

readonly `E`[]

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`arrayContaining`](Expect.md#arraycontaining)

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

#### Inherited from

[`Expect`](Expect.md).[`assertions`](Expect.md#assertions)

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

#### Inherited from

[`Expect`](Expect.md).[`closeTo`](Expect.md#closeto)

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

#### Inherited from

[`Expect`](Expect.md).[`extend`](Expect.md#extend)

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

[`Expect`](Expect.md).[`fail`](Expect.md#fail)

***

### getState()

> **getState**(): `MatcherState` & `Record`\<`string`, `any`\>

Defined in: node\_modules/@types/jest/index.d.ts:779

#### Returns

`MatcherState` & `Record`\<`string`, `any`\>

#### Inherited from

[`Expect`](Expect.md).[`getState`](Expect.md#getstate)

***

### hasAssertions()

> **hasAssertions**(): `void`

Defined in: node\_modules/@types/jest/index.d.ts:749

Verifies that at least one assertion is called during a test.
This is often useful when testing asynchronous code, in order to
make sure that assertions in a callback actually got called.

#### Returns

`void`

#### Inherited from

[`Expect`](Expect.md).[`hasAssertions`](Expect.md#hasassertions)

***

### objectContaining()

> **objectContaining**\<`E`\>(`obj`): `any`

Defined in: node\_modules/@types/jest/index.d.ts:664

`expect.not.objectContaining(object)` matches any received object
that does not recursively match the expected properties. That is, the
expected object is not a subset of the received object. Therefore,
it matches a received object which contains properties that are not
in the expected object. It is the inverse of `expect.objectContaining`.

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

#### Inherited from

[`Expect`](Expect.md).[`objectContaining`](Expect.md#objectcontaining)

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

[`Expect`](Expect.md).[`pass`](Expect.md#pass)

***

### setState()

> **setState**(`state`): `void`

Defined in: node\_modules/@types/jest/index.d.ts:778

#### Parameters

##### state

`object`

#### Returns

`void`

#### Inherited from

[`Expect`](Expect.md).[`setState`](Expect.md#setstate)

***

### stringContaining()

> **stringContaining**(`str`): `any`

Defined in: node\_modules/@types/jest/index.d.ts:676

`expect.not.stringContaining(string)` matches the received string
that does not contain the exact expected string. It is the inverse of
`expect.stringContaining`.

#### Parameters

##### str

`string`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`stringContaining`](Expect.md#stringcontaining)

***

### stringMatching()

> **stringMatching**(`str`): `any`

Defined in: node\_modules/@types/jest/index.d.ts:670

`expect.not.stringMatching(string | regexp)` matches the received
string that does not match the expected regexp. It is the inverse of
`expect.stringMatching`.

#### Parameters

##### str

`string` | `RegExp`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`stringMatching`](Expect.md#stringmatching)

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

[`Expect`](Expect.md).[`toBeAfter`](Expect.md#tobeafter)

***

### toBeAfterOrEqualTo()

> **toBeAfterOrEqualTo**(`date`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:458

Use `.toBeAfterOrEqualTo` when checking if a date equals to or occurs after `date`.

#### Parameters

##### date

`Date`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeAfterOrEqualTo`](Expect.md#tobeafterorequalto)

***

### toBeArray()

> **toBeArray**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:43

Use `.toBeArray` when checking if a value is an `Array`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeArray`](Expect.md#tobearray)

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

[`Expect`](Expect.md).[`toBeArrayOfSize`](Expect.md#tobearrayofsize)

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

[`Expect`](Expect.md).[`toBeBefore`](Expect.md#tobebefore)

***

### toBeBeforeOrEqualTo()

> **toBeBeforeOrEqualTo**(`date`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:452

Use `.toBeBeforeOrEqualTo` when checking if a date equals to or occurs before `date`.

#### Parameters

##### date

`Date`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeBeforeOrEqualTo`](Expect.md#tobebeforeorequalto)

***

### toBeBetween()

> **toBeBetween**(`startDate`, `endDate`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:446

Use `.toBeBetween` when checking if a date occurs between `startDate` and `endDate`.

#### Parameters

##### startDate

`Date`

##### endDate

`Date`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeBetween`](Expect.md#tobebetween)

***

### toBeBigInt()

> **toBeBigInt**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:66

Use `.toBeBigInt` when checking if a value is a `BigInt`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeBigInt`](Expect.md#tobebigint)

***

### toBeBoolean()

> **toBeBoolean**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:119

Use `.toBeBoolean` when checking if a value is a `Boolean`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeBoolean`](Expect.md#tobeboolean)

***

### toBeDate()

> **toBeDate**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:134

Use `.toBeDate` when checking if a value is a `Date`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeDate`](Expect.md#tobedate)

***

### toBeDateString()

> **toBeDateString**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:149

Use `.toBeDateString` when checking if a value is a valid date string.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeDateString`](Expect.md#tobedatestring)

***

### toBeEmpty()

> **toBeEmpty**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:21

Use .toBeEmpty when checking if a String '', Array [] or Object {} is empty.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeEmpty`](Expect.md#tobeempty)

***

### toBeEmptyObject()

> **toBeEmptyObject**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:434

Use `.toBeEmptyObject` when checking if a value is an empty `Object`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeEmptyObject`](Expect.md#tobeemptyobject)

***

### toBeEven()

> **toBeEven**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:214

Use `.toBeEven` when checking if a value is an even `Number` or `BigInt`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeEven`](Expect.md#tobeeven)

***

### toBeExtensible()

> **toBeExtensible**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:350

Use `.toBeExtensible` when checking if an object is extensible.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeExtensible`](Expect.md#tobeextensible)

***

### toBeFalse()

> **toBeFalse**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:129

Use `.toBeFalse` when checking a value is equal (===) to `false`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeFalse`](Expect.md#tobefalse)

***

### toBeFinite()

> **toBeFinite**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:199

Use `.toBeFinite` when checking if a value is a `Number`, not `NaN` or `Infinity`, or a `BigInt`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeFinite`](Expect.md#tobefinite)

***

### toBeFrozen()

> **toBeFrozen**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:355

Use `.toBeFrozen` when checking if an object is frozen.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeFrozen`](Expect.md#tobefrozen)

***

### toBeFunction()

> **toBeFunction**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:144

Use `.toBeFunction` when checking if a value is a `Function`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeFunction`](Expect.md#tobefunction)

***

### toBeHexadecimal()

> **toBeHexadecimal**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:154

Use `.toBeHexadecimal` when checking if a value is a valid HTML hex color.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeHexadecimal`](Expect.md#tobehexadecimal)

***

### toBeInRange()

> **toBeInRange**(`min`, `max`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:236

Use `.toBeInRange` when checking if an array has elements in range min (inclusive) and max (exclusive).
Supports both number and BigInt values.

#### Parameters

##### min

`number` | `bigint`

##### max

`number` | `bigint`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeInRange`](Expect.md#tobeinrange)

***

### toBeNaN()

> **toBeNaN**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:194

Use `.toBeNaN` when checking a value is `NaN`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeNaN`](Expect.md#tobenan)

***

### toBeNegative()

> **toBeNegative**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:209

Use `.toBeNegative` when checking if a value is a negative `Number` or `BigInt`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeNegative`](Expect.md#tobenegative)

***

### toBeNil()

> **toBeNil**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:32

Use `.toBeNil` when checking a value is `null` or `undefined`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeNil`](Expect.md#tobenil)

***

### toBeNumber()

> **toBeNumber**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:189

Use `.toBeNumber` when checking if a value is a `Number` or `BigInt`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeNumber`](Expect.md#tobenumber)

***

### toBeObject()

> **toBeObject**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:241

Use `.toBeObject` when checking if a value is an `Object`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeObject`](Expect.md#tobeobject)

***

### toBeOdd()

> **toBeOdd**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:219

Use `.toBeOdd` when checking if a value is an odd `Number` or `BigInt`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeOdd`](Expect.md#tobeodd)

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

[`Expect`](Expect.md).[`toBeOneOf`](Expect.md#tobeoneof)

***

### toBePositive()

> **toBePositive**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:204

Use `.toBePositive` when checking if a value is a positive `Number` or `BigInt`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBePositive`](Expect.md#tobepositive)

***

### toBeSealed()

> **toBeSealed**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:360

Use `.toBeSealed` when checking if an object is sealed.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeSealed`](Expect.md#tobesealed)

***

### toBeString()

> **toBeString**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:375

Use `.toBeString` when checking if a value is a `String`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeString`](Expect.md#tobestring)

***

### toBeSymbol()

> **toBeSymbol**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:439

Use `.toBeSymbol` when checking if a value is a `Symbol`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeSymbol`](Expect.md#tobesymbol)

***

### toBeTrue()

> **toBeTrue**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:124

Use `.toBeTrue` when checking a value is equal (===) to `true`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeTrue`](Expect.md#tobetrue)

***

### toBeValidDate()

> **toBeValidDate**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:139

Use `.toBeValidDate` when checking if a value is a `valid Date`.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeValidDate`](Expect.md#tobevaliddate)

***

### toBeWithin()

> **toBeWithin**(`start`, `end`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:227

Use `.toBeWithin` when checking if a number is in between the given bounds of: start (inclusive) and end (exclusive).

#### Parameters

##### start

`number`

##### end

`number`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toBeWithin`](Expect.md#tobewithin)

***

### toChange()

> **toChange**\<`E`\>(`checker`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:247

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

[`Expect`](Expect.md).[`toChange`](Expect.md#tochange)

***

### toChangeBy()

> **toChangeBy**(`checker`, `by?`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:254

Use `.toChangeBy` when checking if a value changed by an amount.

#### Parameters

##### checker

() => `number` \| `bigint`

##### by?

`number` | `bigint`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toChangeBy`](Expect.md#tochangeby)

***

### toChangeTo()

> **toChangeTo**\<`E`\>(`checker`, `to`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:261

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

[`Expect`](Expect.md).[`toChangeTo`](Expect.md#tochangeto)

***

### toContainAllEntries()

> **toContainAllEntries**\<`E`\>(`entries`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:338

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

[`Expect`](Expect.md).[`toContainAllEntries`](Expect.md#tocontainallentries)

***

### toContainAllKeys()

> **toContainAllKeys**\<`E`\>(`keys`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:282

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

[`Expect`](Expect.md).[`toContainAllKeys`](Expect.md#tocontainallkeys)

***

### toContainAllValues()

> **toContainAllValues**\<`E`\>(`values`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:310

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

[`Expect`](Expect.md).[`toContainAllValues`](Expect.md#tocontainallvalues)

***

### toContainAnyEntries()

> **toContainAnyEntries**\<`E`\>(`entries`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:345

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

[`Expect`](Expect.md).[`toContainAnyEntries`](Expect.md#tocontainanyentries)

***

### toContainAnyKeys()

> **toContainAnyKeys**\<`E`\>(`keys`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:289

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

[`Expect`](Expect.md).[`toContainAnyKeys`](Expect.md#tocontainanykeys)

***

### toContainAnyValues()

> **toContainAnyValues**\<`E`\>(`values`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:317

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

[`Expect`](Expect.md).[`toContainAnyValues`](Expect.md#tocontainanyvalues)

***

### toContainEntries()

> **toContainEntries**\<`E`\>(`entries`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:331

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

[`Expect`](Expect.md).[`toContainEntries`](Expect.md#tocontainentries)

***

### toContainEntry()

> **toContainEntry**\<`E`\>(`entry`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:324

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

[`Expect`](Expect.md).[`toContainEntry`](Expect.md#tocontainentry)

***

### toContainKey()

> **toContainKey**(`key`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:268

Use `.toContainKey` when checking if an object contains the provided key.

#### Parameters

##### key

`string`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toContainKey`](Expect.md#tocontainkey)

***

### toContainKeys()

> **toContainKeys**\<`E`\>(`keys`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:275

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

[`Expect`](Expect.md).[`toContainKeys`](Expect.md#tocontainkeys)

***

### toContainValue()

> **toContainValue**\<`E`\>(`value`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:296

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

[`Expect`](Expect.md).[`toContainValue`](Expect.md#tocontainvalue)

***

### toContainValues()

> **toContainValues**\<`E`\>(`values`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:303

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

[`Expect`](Expect.md).[`toContainValues`](Expect.md#tocontainvalues)

***

### toEndWith()

> **toEndWith**(`suffix`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:396

Use `.toEndWith` when checking if a `String` ends with a given `String` suffix.

#### Parameters

##### suffix

`string`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toEndWith`](Expect.md#toendwith)

***

### toEqualCaseInsensitive()

> **toEqualCaseInsensitive**(`string`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:382

Use `.toEqualCaseInsensitive` when checking if a string is equal (===) to another ignoring the casing of both strings.

#### Parameters

##### string

`string`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toEqualCaseInsensitive`](Expect.md#toequalcaseinsensitive)

***

### toEqualIgnoringWhitespace()

> **toEqualIgnoringWhitespace**(`string`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:465

Use `.toEqualIgnoringWhitespace` when checking if a `String` is equal (===) to given `String` ignoring white-space.

#### Parameters

##### string

`string`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toEqualIgnoringWhitespace`](Expect.md#toequalignoringwhitespace)

***

### toHaveBeenCalledAfter()

> **toHaveBeenCalledAfter**(`mock`, `failIfNoFirstInvocation?`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:174

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

[`Expect`](Expect.md).[`toHaveBeenCalledAfter`](Expect.md#tohavebeencalledafter)

***

### toHaveBeenCalledBefore()

> **toHaveBeenCalledBefore**(`mock`, `failIfNoSecondInvocation?`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:164

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

[`Expect`](Expect.md).[`toHaveBeenCalledBefore`](Expect.md#tohavebeencalledbefore)

***

### toHaveBeenCalledExactlyOnceWith()

> **toHaveBeenCalledExactlyOnceWith**(...`args`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:184

Use `.toHaveBeenCalledExactlyOnceWith` to check if a `Mock` was called exactly one time with the expected value.

#### Parameters

##### args

...`unknown`[]

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toHaveBeenCalledExactlyOnceWith`](Expect.md#tohavebeencalledexactlyoncewith)

***

### toHaveBeenCalledOnce()

> **toHaveBeenCalledOnce**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:179

Use `.toHaveBeenCalledOnce` to check if a `Mock` was called exactly one time.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toHaveBeenCalledOnce`](Expect.md#tohavebeencalledonce)

***

### toInclude()

> **toInclude**(`substring`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:403

Use `.toInclude` when checking if a `String` includes the given `String` substring.

#### Parameters

##### substring

`string`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toInclude`](Expect.md#toinclude)

***

### toIncludeAllMembers()

> **toIncludeAllMembers**\<`E`\>(`members`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:72

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

[`Expect`](Expect.md).[`toIncludeAllMembers`](Expect.md#toincludeallmembers)

***

### toIncludeAllPartialMembers()

> **toIncludeAllPartialMembers**\<`E`\>(`members`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:78

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

[`Expect`](Expect.md).[`toIncludeAllPartialMembers`](Expect.md#toincludeallpartialmembers)

***

### toIncludeAnyMembers()

> **toIncludeAnyMembers**\<`E`\>(`members`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:90

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

[`Expect`](Expect.md).[`toIncludeAnyMembers`](Expect.md#toincludeanymembers)

***

### toIncludeMultiple()

> **toIncludeMultiple**(`substring`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:418

Use `.toIncludeMultiple` when checking if a `String` includes all of the given substrings.

#### Parameters

##### substring

readonly `string`[]

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toIncludeMultiple`](Expect.md#toincludemultiple)

***

### toIncludeRepeated()

> **toIncludeRepeated**(`substring`, `times`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:411

Use `.toIncludeRepeated` when checking if a `String` includes the given `String` substring the correct number of times.

#### Parameters

##### substring

`string`

##### times

`number`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toIncludeRepeated`](Expect.md#toincluderepeated)

***

### toIncludeSameMembers()

> **toIncludeSameMembers**\<`E`\>(`members`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:96

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

[`Expect`](Expect.md).[`toIncludeSameMembers`](Expect.md#toincludesamemembers)

***

### toIncludeSamePartialMembers()

> **toIncludeSamePartialMembers**\<`E`\>(`members`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:84

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

[`Expect`](Expect.md).[`toIncludeSamePartialMembers`](Expect.md#toincludesamepartialmembers)

***

### toPartiallyContain()

> **toPartiallyContain**\<`E`\>(`member`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:102

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

[`Expect`](Expect.md).[`toPartiallyContain`](Expect.md#topartiallycontain)

***

### toReject()

> **toReject**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:370

Use `.toReject` when checking if a promise rejects.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toReject`](Expect.md#toreject)

***

### toResolve()

> **toResolve**(): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:365

Use `.toResolve` when checking if a promise resolves.

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toResolve`](Expect.md#toresolve)

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

[`Expect`](Expect.md).[`toSatisfy`](Expect.md#tosatisfy)

***

### toSatisfyAll()

> **toSatisfyAll**\<`E`\>(`predicate`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:108

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

[`Expect`](Expect.md).[`toSatisfyAll`](Expect.md#tosatisfyall)

***

### toSatisfyAny()

> **toSatisfyAny**(`predicate`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:114

Use `.toSatisfyAny` when you want to use a custom matcher by supplying a predicate function that returns `true` for any matching value in an array.

#### Parameters

##### predicate

(`x`) => `boolean`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toSatisfyAny`](Expect.md#tosatisfyany)

***

### toStartWith()

> **toStartWith**(`prefix`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:389

Use `.toStartWith` when checking if a `String` starts with a given `String` prefix.

#### Parameters

##### prefix

`string`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toStartWith`](Expect.md#tostartwith)

***

### toThrowWithMessage()

> **toThrowWithMessage**(`type`, `message`): `any`

Defined in: node\_modules/jest-extended/types/index.d.ts:426

Use `.toThrowWithMessage` when checking if a callback function throws an error of a given type with a given error message.

#### Parameters

##### type

(...`args`) => `object` | (...`args`) => `object`

##### message

`string` | `RegExp`

#### Returns

`any`

#### Inherited from

[`Expect`](Expect.md).[`toThrowWithMessage`](Expect.md#tothrowwithmessage)
