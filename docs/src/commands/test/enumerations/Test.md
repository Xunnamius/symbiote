[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Defined in: [src/commands/test.ts:48](https://github.com/Xunnamius/symbiote/blob/c8e7e58364e34d94a79ee4d48272a3e971d09e09/src/commands/test.ts#L48)

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Defined in: [src/commands/test.ts:78](https://github.com/Xunnamius/symbiote/blob/c8e7e58364e34d94a79ee4d48272a3e971d09e09/src/commands/test.ts#L78)

Include _all possible tests_ from the chosen scope.

Does not include code coverage results by default.

***

### AllLocal

> **AllLocal**: `"all-local"`

Defined in: [src/commands/test.ts:85](https://github.com/Xunnamius/symbiote/blob/c8e7e58364e34d94a79ee4d48272a3e971d09e09/src/commands/test.ts#L85)

This option is identical to [Test.All](Test.md#all) except it _excludes end-to-end
tests_.

Will also include code coverage results by default.

***

### EndToEnd

> **EndToEnd**: `"end-to-end"`

Defined in: [src/commands/test.ts:72](https://github.com/Xunnamius/symbiote/blob/c8e7e58364e34d94a79ee4d48272a3e971d09e09/src/commands/test.ts#L72)

Include end-to-end tests from the chosen scope.

Does not include code coverage results by default.

***

### Integration

> **Integration**: `"integration"`

Defined in: [src/commands/test.ts:66](https://github.com/Xunnamius/symbiote/blob/c8e7e58364e34d94a79ee4d48272a3e971d09e09/src/commands/test.ts#L66)

Include integration tests from the chosen scope.

Does not include code coverage results by default.

***

### Type

> **Type**: `"type"`

Defined in: [src/commands/test.ts:54](https://github.com/Xunnamius/symbiote/blob/c8e7e58364e34d94a79ee4d48272a3e971d09e09/src/commands/test.ts#L54)

Include type tests from the chosen scope.

Does not include code coverage results by default.

***

### Unit

> **Unit**: `"unit"`

Defined in: [src/commands/test.ts:60](https://github.com/Xunnamius/symbiote/blob/c8e7e58364e34d94a79ee4d48272a3e971d09e09/src/commands/test.ts#L60)

Include unit tests from the chosen scope.

Does not include code coverage results by default.
