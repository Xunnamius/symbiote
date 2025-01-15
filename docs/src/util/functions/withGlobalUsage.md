[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / withGlobalUsage

# Function: withGlobalUsage()

> **withGlobalUsage**(`altDescription`, `__namedParameters`): `string`

Defined in: [packages/bfe/src/index.ts:1296](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/packages/bfe/src/index.ts#L1296)

Generate command usage text consistently yet flexibly.

Defaults to: `Usage: $000\n\n${altDescription}` where `altDescription` is
`$1.`

## Parameters

### altDescription

`string` = `'$1.'`

### \_\_namedParameters

#### appendPeriod

`boolean` = `true`

Whether a period will be appended to the resultant string or not. A
period is only appended if one is not already appended.

**Default**

```ts
true
```

#### includeOptions

`boolean` = `prependNewlines`

Whether the string `' [...options]'` will be appended to the first line of usage text

**Default**

```ts
options.prependNewlines
```

#### prependNewlines

`boolean` = `true`

Whether newlines will be prepended to `altDescription` or not.

**Default**

```ts
true
```

#### trim

`boolean` = `true`

Whether `altDescription` will be `trim()`'d or not.

**Default**

```ts
true
```

## Returns

`string`
