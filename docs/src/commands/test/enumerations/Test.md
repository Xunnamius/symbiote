[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Defined in: [src/commands/test.ts:65](https://github.com/Xunnamius/symbiote/blob/2e287e33709b516a0ca83d4aca24e98dc1018688/src/commands/test.ts#L65)

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Defined in: [src/commands/test.ts:95](https://github.com/Xunnamius/symbiote/blob/2e287e33709b516a0ca83d4aca24e98dc1018688/src/commands/test.ts#L95)

Include _all possible tests_ from the chosen scope.

Does not include code coverage results by default.

***

### AllLocal

> **AllLocal**: `"all-local"`

Defined in: [src/commands/test.ts:102](https://github.com/Xunnamius/symbiote/blob/2e287e33709b516a0ca83d4aca24e98dc1018688/src/commands/test.ts#L102)

This option is identical to [Test.All](Test.md#all) except it _excludes end-to-end
tests_.

Will also include code coverage results by default.

***

### EndToEnd

> **EndToEnd**: `"end-to-end"`

Defined in: [src/commands/test.ts:89](https://github.com/Xunnamius/symbiote/blob/2e287e33709b516a0ca83d4aca24e98dc1018688/src/commands/test.ts#L89)

Include end-to-end tests from the chosen scope.

Does not include code coverage results by default.

***

### Integration

> **Integration**: `"integration"`

Defined in: [src/commands/test.ts:83](https://github.com/Xunnamius/symbiote/blob/2e287e33709b516a0ca83d4aca24e98dc1018688/src/commands/test.ts#L83)

Include integration tests from the chosen scope.

Does not include code coverage results by default.

***

### Type

> **Type**: `"type"`

Defined in: [src/commands/test.ts:71](https://github.com/Xunnamius/symbiote/blob/2e287e33709b516a0ca83d4aca24e98dc1018688/src/commands/test.ts#L71)

Include type tests from the chosen scope.

Does not include code coverage results by default.

***

### Unit

> **Unit**: `"unit"`

Defined in: [src/commands/test.ts:77](https://github.com/Xunnamius/symbiote/blob/2e287e33709b516a0ca83d4aca24e98dc1018688/src/commands/test.ts#L77)

Include unit tests from the chosen scope.

Does not include code coverage results by default.
