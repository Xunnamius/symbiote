[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Defined in: [src/commands/test.ts:60](https://github.com/Xunnamius/symbiote/blob/ee28fd25e233e1ad9b7043e0faa8defae74dbe7b/src/commands/test.ts#L60)

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Defined in: [src/commands/test.ts:90](https://github.com/Xunnamius/symbiote/blob/ee28fd25e233e1ad9b7043e0faa8defae74dbe7b/src/commands/test.ts#L90)

Include _all possible tests_ from the chosen scope.

Does not include code coverage results by default.

***

### AllLocal

> **AllLocal**: `"all-local"`

Defined in: [src/commands/test.ts:97](https://github.com/Xunnamius/symbiote/blob/ee28fd25e233e1ad9b7043e0faa8defae74dbe7b/src/commands/test.ts#L97)

This option is identical to [Test.All](Test.md#all) except it _excludes end-to-end
tests_.

Will also include code coverage results by default.

***

### EndToEnd

> **EndToEnd**: `"end-to-end"`

Defined in: [src/commands/test.ts:84](https://github.com/Xunnamius/symbiote/blob/ee28fd25e233e1ad9b7043e0faa8defae74dbe7b/src/commands/test.ts#L84)

Include end-to-end tests from the chosen scope.

Does not include code coverage results by default.

***

### Integration

> **Integration**: `"integration"`

Defined in: [src/commands/test.ts:78](https://github.com/Xunnamius/symbiote/blob/ee28fd25e233e1ad9b7043e0faa8defae74dbe7b/src/commands/test.ts#L78)

Include integration tests from the chosen scope.

Does not include code coverage results by default.

***

### Type

> **Type**: `"type"`

Defined in: [src/commands/test.ts:66](https://github.com/Xunnamius/symbiote/blob/ee28fd25e233e1ad9b7043e0faa8defae74dbe7b/src/commands/test.ts#L66)

Include type tests from the chosen scope.

Does not include code coverage results by default.

***

### Unit

> **Unit**: `"unit"`

Defined in: [src/commands/test.ts:72](https://github.com/Xunnamius/symbiote/blob/ee28fd25e233e1ad9b7043e0faa8defae74dbe7b/src/commands/test.ts#L72)

Include unit tests from the chosen scope.

Does not include code coverage results by default.
