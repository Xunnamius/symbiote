[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Defined in: [src/commands/test.ts:55](https://github.com/Xunnamius/symbiote/blob/79d395cced979d17188580f3f3b776aa6e57df18/src/commands/test.ts#L55)

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Defined in: [src/commands/test.ts:101](https://github.com/Xunnamius/symbiote/blob/79d395cced979d17188580f3f3b776aa6e57df18/src/commands/test.ts#L101)

Include _all possible tests_ from the chosen scope, and runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment
variable. This will run any end-to-end tests by actually downloading the
items under test from the internet.

Will also include code coverage results by default when scope is
[TesterScope.Unlimited](../../../configure/enumerations/DefaultGlobalScope.md#unlimited).

***

### AllLocal

> **AllLocal**: `"all-local"`

Defined in: [src/commands/test.ts:111](https://github.com/Xunnamius/symbiote/blob/79d395cced979d17188580f3f3b776aa6e57df18/src/commands/test.ts#L111)

This option is identical to [Test.All](#all) except it runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
environment variable. This will run any end-to-end tests by copying the
items under test from the local filesystem.

Will also include code coverage results by default when scope is
[TesterScope.Unlimited](../../../configure/enumerations/DefaultGlobalScope.md#unlimited).

***

### EndToEnd

> **EndToEnd**: `"e2e"`

Defined in: [src/commands/test.ts:82](https://github.com/Xunnamius/symbiote/blob/79d395cced979d17188580f3f3b776aa6e57df18/src/commands/test.ts#L82)

Include end-to-end tests from the chosen scope with the
`SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment variable. This
will run any end-to-end tests by actually downloading the items under test
from the internet.

Does not include code coverage results by default.

***

### EndToEndLocal

> **EndToEndLocal**: `"e2e-local"`

Defined in: [src/commands/test.ts:91](https://github.com/Xunnamius/symbiote/blob/79d395cced979d17188580f3f3b776aa6e57df18/src/commands/test.ts#L91)

This option is identical to [Test.EndToEnd](#endtoend) except it runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
environment variable. This will run any end-to-end tests by copying the
items under test from the local filesystem.

Does not include code coverage results by default.

***

### Integration

> **Integration**: `"integration"`

Defined in: [src/commands/test.ts:73](https://github.com/Xunnamius/symbiote/blob/79d395cced979d17188580f3f3b776aa6e57df18/src/commands/test.ts#L73)

Include integration tests from the chosen scope.

Does not include code coverage results by default.

***

### Type

> **Type**: `"type"`

Defined in: [src/commands/test.ts:61](https://github.com/Xunnamius/symbiote/blob/79d395cced979d17188580f3f3b776aa6e57df18/src/commands/test.ts#L61)

Include type tests from the chosen scope.

Does not include code coverage results by default.

***

### Unit

> **Unit**: `"unit"`

Defined in: [src/commands/test.ts:67](https://github.com/Xunnamius/symbiote/blob/79d395cced979d17188580f3f3b776aa6e57df18/src/commands/test.ts#L67)

Include unit tests from the chosen scope.

Does not include code coverage results by default.
