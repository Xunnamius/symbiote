[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / ExtendedMatchers

# Type Alias: ExtendedMatchers\<TMatchers, TMatcherReturn, TActual\>

> **ExtendedMatchers**\<`TMatchers`, `TMatcherReturn`, `TActual`\>: [`Matchers`](../interfaces/Matchers.md)\<`TMatcherReturn`, `TActual`\> & `{ [K in keyof TMatchers]: CustomJestMatcher<TMatchers[K], TMatcherReturn> }`

Defined in: node\_modules/@types/jest/index.d.ts:1180

## Type Parameters

• **TMatchers** *extends* [`ExpectExtendMap`](../interfaces/ExpectExtendMap.md)

• **TMatcherReturn**

• **TActual**
