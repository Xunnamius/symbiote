[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Defined in: [src/commands/test.ts:47](https://github.com/Xunnamius/symbiote/blob/62ec6fdd59d5511dd7b872237f3ff5bf7673e789/src/commands/test.ts#L47)

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Defined in: [src/commands/test.ts:93](https://github.com/Xunnamius/symbiote/blob/62ec6fdd59d5511dd7b872237f3ff5bf7673e789/src/commands/test.ts#L93)

Include _all possible tests_ from the chosen scope, and runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment
variable. This will run any end-to-end tests by actually downloading the
items under test from the internet.

Will also include code coverage results by default when scope is
[TesterScope.Unlimited](../../../configure/enumerations/DefaultGlobalScope.md#unlimited).

***

### AllLocal

> **AllLocal**: `"all-local"`

Defined in: [src/commands/test.ts:103](https://github.com/Xunnamius/symbiote/blob/62ec6fdd59d5511dd7b872237f3ff5bf7673e789/src/commands/test.ts#L103)

This option is identical to [Test.All](#all) except it runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
environment variable. This will run any end-to-end tests by copying the
items under test from the local filesystem.

Will also include code coverage results by default when scope is
[TesterScope.Unlimited](../../../configure/enumerations/DefaultGlobalScope.md#unlimited).

***

### EndToEnd

> **EndToEnd**: `"e2e"`

Defined in: [src/commands/test.ts:74](https://github.com/Xunnamius/symbiote/blob/62ec6fdd59d5511dd7b872237f3ff5bf7673e789/src/commands/test.ts#L74)

Include end-to-end tests from the chosen scope with the
`SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment variable. This
will run any end-to-end tests by actually downloading the items under test
from the internet.

Does not include code coverage results by default.

***

### EndToEndLocal

> **EndToEndLocal**: `"e2e-local"`

Defined in: [src/commands/test.ts:83](https://github.com/Xunnamius/symbiote/blob/62ec6fdd59d5511dd7b872237f3ff5bf7673e789/src/commands/test.ts#L83)

This option is identical to [Test.EndToEnd](#endtoend) except it runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
environment variable. This will run any end-to-end tests by copying the
items under test from the local filesystem.

Does not include code coverage results by default.

***

### Integration

> **Integration**: `"integration"`

Defined in: [src/commands/test.ts:65](https://github.com/Xunnamius/symbiote/blob/62ec6fdd59d5511dd7b872237f3ff5bf7673e789/src/commands/test.ts#L65)

Include integration tests from the chosen scope.

Does not include code coverage results by default.

***

### Type

> **Type**: `"type"`

Defined in: [src/commands/test.ts:53](https://github.com/Xunnamius/symbiote/blob/62ec6fdd59d5511dd7b872237f3ff5bf7673e789/src/commands/test.ts#L53)

Include type tests from the chosen scope.

Does not include code coverage results by default.

***

### Unit

> **Unit**: `"unit"`

Defined in: [src/commands/test.ts:59](https://github.com/Xunnamius/symbiote/blob/62ec6fdd59d5511dd7b872237f3ff5bf7673e789/src/commands/test.ts#L59)

Include unit tests from the chosen scope.

Does not include code coverage results by default.
