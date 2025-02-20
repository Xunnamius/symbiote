[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [test/util](../README.md) / MockedOutputSpies

# Type Alias: MockedOutputSpies

> **MockedOutputSpies**: `object`

Defined in: node\_modules/@-xun/test-mock-output/dist/packages/test-mock-output/src/index.d.ts:26

## Type declaration

### errorSpy

> **errorSpy**: [`SpyInstance`](../../../types/jest.patched/namespaces/jest/interfaces/SpyInstance.md)

Spies on `globalThis.console.error`.

### infoSpy

> **infoSpy**: [`SpyInstance`](../../../types/jest.patched/namespaces/jest/interfaces/SpyInstance.md)

Spies on `globalThis.console.info`.

### logSpy

> **logSpy**: [`SpyInstance`](../../../types/jest.patched/namespaces/jest/interfaces/SpyInstance.md)

Spies on `globalThis.console.log`.

### nodeErrorSpy

> **nodeErrorSpy**: [`SpyInstance`](../../../types/jest.patched/namespaces/jest/interfaces/SpyInstance.md)

Spies on `require('node:console').error`.

### nodeInfoSpy

> **nodeInfoSpy**: [`SpyInstance`](../../../types/jest.patched/namespaces/jest/interfaces/SpyInstance.md)

Spies on `require('node:console').info`.

### nodeLogSpy

> **nodeLogSpy**: [`SpyInstance`](../../../types/jest.patched/namespaces/jest/interfaces/SpyInstance.md)

Spies on `require('node:console').log`.

### nodeWarnSpy

> **nodeWarnSpy**: [`SpyInstance`](../../../types/jest.patched/namespaces/jest/interfaces/SpyInstance.md)

Spies on `require('node:console').warn`.

### stderrSpy

> **stderrSpy**: [`SpyInstance`](../../../types/jest.patched/namespaces/jest/interfaces/SpyInstance.md)

Spies on `process.stderr.write`.

### stdoutSpy

> **stdoutSpy**: [`SpyInstance`](../../../types/jest.patched/namespaces/jest/interfaces/SpyInstance.md)

Spies on `process.stdout.write`.

### warnSpy

> **warnSpy**: [`SpyInstance`](../../../types/jest.patched/namespaces/jest/interfaces/SpyInstance.md)

Spies on `globalThis.console.warn`.

## See

[withMockedOutput](../functions/withMockedOutput.md)
