[**@-xun/scripts**](../../../README.md) • **Docs**

***

[@-xun/scripts](../../../README.md) / [test/setup](../README.md) / mockFixtureFactory

# Function: mockFixtureFactory()

> **mockFixtureFactory**\<`CustomOptions`, `CustomContext`\>(`testIdentifier`, `options`?): (`fn`) => `Promise`\<`void`\>

## Type Parameters

• **CustomOptions** *extends* `Record`\<`string`, `unknown`\> = `object`

• **CustomContext** *extends* `Record`\<`string`, `unknown`\> = `object`

## Parameters

• **testIdentifier**: `string`

• **options?**: `Partial`\<[`FixtureOptions`](../interfaces/FixtureOptions.md) & `CustomOptions`\>

## Returns

`Function`

### Parameters

• **fn**: [`FixtureAction`](../type-aliases/FixtureAction.md)\<[`FixtureContext`](../interfaces/FixtureContext.md)\<[`FixtureOptions`](../interfaces/FixtureOptions.md) & `Partial`\<`Record`\<`string`, `unknown`\> & `CustomOptions`\>\> & `CustomContext`\>

### Returns

`Promise`\<`void`\>

## Defined in

[test/setup.ts:1104](https://github.com/Xunnamius/xscripts/blob/05e56e787e73d42855fcd3ce10aff7f8f6e6c4c7/test/setup.ts#L1104)