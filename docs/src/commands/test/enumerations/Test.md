[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Defined in: [src/commands/test.ts:48](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/commands/test.ts#L48)

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Defined in: [src/commands/test.ts:94](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/commands/test.ts#L94)

Include _all possible tests_ from the chosen scope, and runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment
variable. This will run any end-to-end tests by actually downloading the
items under test from the internet.

Will also include code coverage results by default when scope is
[TesterScope.Unlimited](../../../configure/enumerations/DefaultGlobalScope.md#unlimited).

***

### AllLocal

> **AllLocal**: `"all-local"`

Defined in: [src/commands/test.ts:104](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/commands/test.ts#L104)

This option is identical to [Test.All](Test.md#all) except it runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
environment variable. This will run any end-to-end tests by copying the
items under test from the local filesystem.

Will also include code coverage results by default when scope is
[TesterScope.Unlimited](../../../configure/enumerations/DefaultGlobalScope.md#unlimited).

***

### EndToEnd

> **EndToEnd**: `"e2e"`

Defined in: [src/commands/test.ts:75](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/commands/test.ts#L75)

Include end-to-end tests from the chosen scope with the
`SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment variable. This
will run any end-to-end tests by actually downloading the items under test
from the internet.

Does not include code coverage results by default.

***

### EndToEndLocal

> **EndToEndLocal**: `"e2e-local"`

Defined in: [src/commands/test.ts:84](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/commands/test.ts#L84)

This option is identical to [Test.EndToEnd](Test.md#endtoend) except it runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
environment variable. This will run any end-to-end tests by copying the
items under test from the local filesystem.

Does not include code coverage results by default.

***

### Integration

> **Integration**: `"integration"`

Defined in: [src/commands/test.ts:66](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/commands/test.ts#L66)

Include integration tests from the chosen scope.

Does not include code coverage results by default.

***

### Type

> **Type**: `"type"`

Defined in: [src/commands/test.ts:54](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/commands/test.ts#L54)

Include type tests from the chosen scope.

Does not include code coverage results by default.

***

### Unit

> **Unit**: `"unit"`

Defined in: [src/commands/test.ts:60](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/commands/test.ts#L60)

Include unit tests from the chosen scope.

Does not include code coverage results by default.
