[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Defined in: [src/commands/test.ts:55](https://github.com/Xunnamius/symbiote/blob/ea9edf73ee9a095bf3bea5793333d39906fa49d1/src/commands/test.ts#L55)

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Defined in: [src/commands/test.ts:85](https://github.com/Xunnamius/symbiote/blob/ea9edf73ee9a095bf3bea5793333d39906fa49d1/src/commands/test.ts#L85)

Include _all possible tests_ from the chosen scope.

Does not include code coverage results by default.

***

### AllLocal

> **AllLocal**: `"all-local"`

Defined in: [src/commands/test.ts:92](https://github.com/Xunnamius/symbiote/blob/ea9edf73ee9a095bf3bea5793333d39906fa49d1/src/commands/test.ts#L92)

This option is identical to [Test.All](Test.md#all) except it _excludes end-to-end
tests_.

Will also include code coverage results by default.

***

### EndToEnd

> **EndToEnd**: `"end-to-end"`

Defined in: [src/commands/test.ts:79](https://github.com/Xunnamius/symbiote/blob/ea9edf73ee9a095bf3bea5793333d39906fa49d1/src/commands/test.ts#L79)

Include end-to-end tests from the chosen scope.

Does not include code coverage results by default.

***

### Integration

> **Integration**: `"integration"`

Defined in: [src/commands/test.ts:73](https://github.com/Xunnamius/symbiote/blob/ea9edf73ee9a095bf3bea5793333d39906fa49d1/src/commands/test.ts#L73)

Include integration tests from the chosen scope.

Does not include code coverage results by default.

***

### Type

> **Type**: `"type"`

Defined in: [src/commands/test.ts:61](https://github.com/Xunnamius/symbiote/blob/ea9edf73ee9a095bf3bea5793333d39906fa49d1/src/commands/test.ts#L61)

Include type tests from the chosen scope.

Does not include code coverage results by default.

***

### Unit

> **Unit**: `"unit"`

Defined in: [src/commands/test.ts:67](https://github.com/Xunnamius/symbiote/blob/ea9edf73ee9a095bf3bea5793333d39906fa49d1/src/commands/test.ts#L67)

Include unit tests from the chosen scope.

Does not include code coverage results by default.
