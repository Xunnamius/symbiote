[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [types/jest.patched](../../../README.md) / [jest](../README.md) / MockedFunction

# Type Alias: MockedFunction\<T\>

> **MockedFunction**\<`T`\> = [`MockInstance`](../interfaces/MockInstance.md)\<`ReturnType`\<`T`\>, [`ArgsType`](ArgsType.md)\<`T`\>, `T` *extends* (`this`, ...`args`) => `any` ? `C` : `never`\> & `T`

Defined in: node\_modules/@types/jest/index.d.ts:1264

Wrap a function with mock definitions

## Type Parameters

### T

`T` *extends* (...`args`) => `any`

## Example

```ts
import { myFunction } from "./library";
 jest.mock("./library");

 const mockMyFunction = myFunction as jest.MockedFunction<typeof myFunction>;
 expect(mockMyFunction.mock.calls[0][0]).toBe(42);
```
