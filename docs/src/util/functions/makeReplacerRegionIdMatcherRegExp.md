[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / makeReplacerRegionIdMatcherRegExp

# Function: makeReplacerRegionIdMatcherRegExp()

> **makeReplacerRegionIdMatcherRegExp**(`id`, `__namedParameters`): `RegExp`

Defined in: [src/util.ts:186](https://github.com/Xunnamius/symbiote/blob/4f71380506e8b2505a907d817794b6730bca4f95/src/util.ts#L186)

Create a regular expression that will match a specific replacer region in a
string. Contains one unnamed matching group by default: `contents`.

Note that `id` is NOT escaped.

## Parameters

### id

`string`

### \_\_namedParameters

#### includeMagic?

`boolean` = `true`

If `true`, the start and end comments that denote the beginning and the
end of the region will be included in the match (and therefore subject to
replacement). If `false`, they will not be included in the match;
however, their newlines will be, so take that into account when
generating replacement content.

**Default**

```ts
true
```

## Returns

`RegExp`
