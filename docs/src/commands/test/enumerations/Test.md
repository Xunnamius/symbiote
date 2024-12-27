[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Include _all possible tests_ from the chosen scope.

Does not include code coverage results by default.

#### Defined in

[src/commands/test.ts:95](https://github.com/Xunnamius/symbiote/blob/6888363ae81ec0a004cfcb164e5a634c45aca6a9/src/commands/test.ts#L95)

***

### AllLocal

> **AllLocal**: `"all-local"`

This option is identical to [Test.All](Test.md#all) except it _excludes end-to-end
tests_.

Will also include code coverage results by default.

#### Defined in

[src/commands/test.ts:102](https://github.com/Xunnamius/symbiote/blob/6888363ae81ec0a004cfcb164e5a634c45aca6a9/src/commands/test.ts#L102)

***

### EndToEnd

> **EndToEnd**: `"end-to-end"`

Include end-to-end tests from the chosen scope.

Does not include code coverage results by default.

#### Defined in

[src/commands/test.ts:89](https://github.com/Xunnamius/symbiote/blob/6888363ae81ec0a004cfcb164e5a634c45aca6a9/src/commands/test.ts#L89)

***

### Integration

> **Integration**: `"integration"`

Include integration tests from the chosen scope.

Does not include code coverage results by default.

#### Defined in

[src/commands/test.ts:83](https://github.com/Xunnamius/symbiote/blob/6888363ae81ec0a004cfcb164e5a634c45aca6a9/src/commands/test.ts#L83)

***

### Type

> **Type**: `"type"`

Include type tests from the chosen scope.

Does not include code coverage results by default.

#### Defined in

[src/commands/test.ts:71](https://github.com/Xunnamius/symbiote/blob/6888363ae81ec0a004cfcb164e5a634c45aca6a9/src/commands/test.ts#L71)

***

### Unit

> **Unit**: `"unit"`

Include unit tests from the chosen scope.

Does not include code coverage results by default.

#### Defined in

[src/commands/test.ts:77](https://github.com/Xunnamius/symbiote/blob/6888363ae81ec0a004cfcb164e5a634c45aca6a9/src/commands/test.ts#L77)
