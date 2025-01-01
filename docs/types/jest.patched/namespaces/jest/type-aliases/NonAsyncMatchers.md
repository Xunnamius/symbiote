[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / NonAsyncMatchers

# Type Alias: NonAsyncMatchers\<TMatchers\>

> **NonAsyncMatchers**\<`TMatchers`\>: `{ [K in keyof TMatchers]: ReturnType<TMatchers[K]> extends Promise<CustomMatcherResult> ? never : K }`\[keyof `TMatchers`\]

Defined in: node\_modules/@types/jest/index.d.ts:1159

## Type Parameters

• **TMatchers** *extends* [`ExpectExtendMap`](../interfaces/ExpectExtendMap.md)
