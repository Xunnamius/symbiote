[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / Test

# Enumeration: Test

Defined in: [src/commands/test.ts:53](https://github.com/Xunnamius/symbiote/blob/ee4f1b782c259495505171a8374c784c706e4a7d/src/commands/test.ts#L53)

Which kind of test to run.

## Enumeration Members

### All

> **All**: `"all"`

Defined in: [src/commands/test.ts:99](https://github.com/Xunnamius/symbiote/blob/ee4f1b782c259495505171a8374c784c706e4a7d/src/commands/test.ts#L99)

Include _all possible tests_ from the chosen scope, and runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment
variable. This will run any end-to-end tests by actually downloading the
items under test from the internet.

Will also include code coverage results by default when scope is
[TesterScope.Unlimited](../../../configure/enumerations/DefaultGlobalScope.md#unlimited).

***

### AllLocal

> **AllLocal**: `"all-local"`

Defined in: [src/commands/test.ts:109](https://github.com/Xunnamius/symbiote/blob/ee4f1b782c259495505171a8374c784c706e4a7d/src/commands/test.ts#L109)

This option is identical to [Test.All](#all) except it runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
environment variable. This will run any end-to-end tests by copying the
items under test from the local filesystem.

Will also include code coverage results by default when scope is
[TesterScope.Unlimited](../../../configure/enumerations/DefaultGlobalScope.md#unlimited).

***

### EndToEnd

> **EndToEnd**: `"e2e"`

Defined in: [src/commands/test.ts:80](https://github.com/Xunnamius/symbiote/blob/ee4f1b782c259495505171a8374c784c706e4a7d/src/commands/test.ts#L80)

Include end-to-end tests from the chosen scope with the
`SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment variable. This
will run any end-to-end tests by actually downloading the items under test
from the internet.

Does not include code coverage results by default.

***

### EndToEndLocal

> **EndToEndLocal**: `"e2e-local"`

Defined in: [src/commands/test.ts:89](https://github.com/Xunnamius/symbiote/blob/ee4f1b782c259495505171a8374c784c706e4a7d/src/commands/test.ts#L89)

This option is identical to [Test.EndToEnd](#endtoend) except it runs end-to-end
tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
environment variable. This will run any end-to-end tests by copying the
items under test from the local filesystem.

Does not include code coverage results by default.

***

### Integration

> **Integration**: `"integration"`

Defined in: [src/commands/test.ts:71](https://github.com/Xunnamius/symbiote/blob/ee4f1b782c259495505171a8374c784c706e4a7d/src/commands/test.ts#L71)

Include integration tests from the chosen scope.

Does not include code coverage results by default.

***

### Type

> **Type**: `"type"`

Defined in: [src/commands/test.ts:59](https://github.com/Xunnamius/symbiote/blob/ee4f1b782c259495505171a8374c784c706e4a7d/src/commands/test.ts#L59)

Include type tests from the chosen scope.

Does not include code coverage results by default.

***

### Unit

> **Unit**: `"unit"`

Defined in: [src/commands/test.ts:65](https://github.com/Xunnamius/symbiote/blob/ee4f1b782c259495505171a8374c784c706e4a7d/src/commands/test.ts#L65)

Include unit tests from the chosen scope.

Does not include code coverage results by default.
