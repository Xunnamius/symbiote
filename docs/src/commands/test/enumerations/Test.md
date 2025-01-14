[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Defined in: [src/commands/test.ts:64](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/commands/test.ts#L64)

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Defined in: [src/commands/test.ts:94](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/commands/test.ts#L94)

Include _all possible tests_ from the chosen scope.

Does not include code coverage results by default.

***

### AllLocal

> **AllLocal**: `"all-local"`

Defined in: [src/commands/test.ts:101](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/commands/test.ts#L101)

This option is identical to [Test.All](Test.md#all) except it _excludes end-to-end
tests_.

Will also include code coverage results by default.

***

### EndToEnd

> **EndToEnd**: `"end-to-end"`

Defined in: [src/commands/test.ts:88](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/commands/test.ts#L88)

Include end-to-end tests from the chosen scope.

Does not include code coverage results by default.

***

### Integration

> **Integration**: `"integration"`

Defined in: [src/commands/test.ts:82](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/commands/test.ts#L82)

Include integration tests from the chosen scope.

Does not include code coverage results by default.

***

### Type

> **Type**: `"type"`

Defined in: [src/commands/test.ts:70](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/commands/test.ts#L70)

Include type tests from the chosen scope.

Does not include code coverage results by default.

***

### Unit

> **Unit**: `"unit"`

Defined in: [src/commands/test.ts:76](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/commands/test.ts#L76)

Include unit tests from the chosen scope.

Does not include code coverage results by default.
