[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Defined in: [src/commands/test.ts:57](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/test.ts#L57)

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Defined in: [src/commands/test.ts:87](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/test.ts#L87)

Include _all possible tests_ from the chosen scope.

Does not include code coverage results by default.

***

### AllLocal

> **AllLocal**: `"all-local"`

Defined in: [src/commands/test.ts:94](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/test.ts#L94)

This option is identical to [Test.All](Test.md#all) except it _excludes end-to-end
tests_.

Will also include code coverage results by default.

***

### EndToEnd

> **EndToEnd**: `"end-to-end"`

Defined in: [src/commands/test.ts:81](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/test.ts#L81)

Include end-to-end tests from the chosen scope.

Does not include code coverage results by default.

***

### Integration

> **Integration**: `"integration"`

Defined in: [src/commands/test.ts:75](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/test.ts#L75)

Include integration tests from the chosen scope.

Does not include code coverage results by default.

***

### Type

> **Type**: `"type"`

Defined in: [src/commands/test.ts:63](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/test.ts#L63)

Include type tests from the chosen scope.

Does not include code coverage results by default.

***

### Unit

> **Unit**: `"unit"`

Defined in: [src/commands/test.ts:69](https://github.com/Xunnamius/symbiote/blob/9de5a7b290875af95f8ef5a319559df825226df8/src/commands/test.ts#L69)

Include unit tests from the chosen scope.

Does not include code coverage results by default.
