[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / makeReplacerRegionIdMatcherRegExp

# Function: makeReplacerRegionIdMatcherRegExp()

> **makeReplacerRegionIdMatcherRegExp**(`id`, `__namedParameters`): `RegExp`

Defined in: [src/util.ts:205](https://github.com/Xunnamius/symbiote/blob/28acb7961df65f3e39ec6b549117698f529b083c/src/util.ts#L205)

Create a regular expression that will match a specific replacer region in a
string. Contains one unnamed matching group by default: `contents`.

Note that `id` is NOT escaped.

## Parameters

### id

`string`

### \_\_namedParameters

#### includeMagic

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
