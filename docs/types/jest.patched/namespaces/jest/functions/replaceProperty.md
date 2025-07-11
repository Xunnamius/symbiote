[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / replaceProperty

# Function: replaceProperty()

> **replaceProperty**\<`T`, `K`\>(`obj`, `key`, `value`): [`ReplaceProperty`](../interfaces/ReplaceProperty.md)\<`T`\[`K`\]\>

Defined in: node\_modules/@types/jest/index.d.ts:333

Replaces property on an object with another value.

## Type Parameters

### T

`T` *extends* `object`

### K

`K` *extends* `string` \| `number` \| `symbol`

## Parameters

### obj

`T`

### key

`K`

### value

`T`\[`K`\]

## Returns

[`ReplaceProperty`](../interfaces/ReplaceProperty.md)\<`T`\[`K`\]\>

## Remarks

For mocking functions, and 'get' or 'set' accessors, use `jest.spyOn()` instead.
