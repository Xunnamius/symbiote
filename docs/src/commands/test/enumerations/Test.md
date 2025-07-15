[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Defined in: [src/commands/test.ts:54](https://github.com/Xunnamius/symbiote/blob/f7710f4f934dcf5d1854513049f64b1f4706241a/src/commands/test.ts#L54)

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Defined in: [src/commands/test.ts:100](https://github.com/Xunnamius/symbiote/blob/f7710f4f934dcf5d1854513049f64b1f4706241a/src/commands/test.ts#L100)

Include _all possible tests_ from the chosen scope, and runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment
variable. This will run any end-to-end tests by actually downloading the
items under test from the internet.

Will also include code coverage results by default when scope is
[TesterScope.Unlimited](../../../configure/enumerations/DefaultGlobalScope.md#unlimited).

***

### AllLocal

> **AllLocal**: `"all-local"`

Defined in: [src/commands/test.ts:110](https://github.com/Xunnamius/symbiote/blob/f7710f4f934dcf5d1854513049f64b1f4706241a/src/commands/test.ts#L110)

This option is identical to [Test.All](#all) except it runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
environment variable. This will run any end-to-end tests by copying the
items under test from the local filesystem.

Will also include code coverage results by default when scope is
[TesterScope.Unlimited](../../../configure/enumerations/DefaultGlobalScope.md#unlimited).

***

### EndToEnd

> **EndToEnd**: `"e2e"`

Defined in: [src/commands/test.ts:81](https://github.com/Xunnamius/symbiote/blob/f7710f4f934dcf5d1854513049f64b1f4706241a/src/commands/test.ts#L81)

Include end-to-end tests from the chosen scope with the
`SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment variable. This
will run any end-to-end tests by actually downloading the items under test
from the internet.

Does not include code coverage results by default.

***

### EndToEndLocal

> **EndToEndLocal**: `"e2e-local"`

Defined in: [src/commands/test.ts:90](https://github.com/Xunnamius/symbiote/blob/f7710f4f934dcf5d1854513049f64b1f4706241a/src/commands/test.ts#L90)

This option is identical to [Test.EndToEnd](#endtoend) except it runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
environment variable. This will run any end-to-end tests by copying the
items under test from the local filesystem.

Does not include code coverage results by default.

***

### Integration

> **Integration**: `"integration"`

Defined in: [src/commands/test.ts:72](https://github.com/Xunnamius/symbiote/blob/f7710f4f934dcf5d1854513049f64b1f4706241a/src/commands/test.ts#L72)

Include integration tests from the chosen scope.

Does not include code coverage results by default.

***

### Type

> **Type**: `"type"`

Defined in: [src/commands/test.ts:60](https://github.com/Xunnamius/symbiote/blob/f7710f4f934dcf5d1854513049f64b1f4706241a/src/commands/test.ts#L60)

Include type tests from the chosen scope.

Does not include code coverage results by default.

***

### Unit

> **Unit**: `"unit"`

Defined in: [src/commands/test.ts:66](https://github.com/Xunnamius/symbiote/blob/f7710f4f934dcf5d1854513049f64b1f4706241a/src/commands/test.ts#L66)

Include unit tests from the chosen scope.

Does not include code coverage results by default.
