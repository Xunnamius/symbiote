[**@-xun/scripts**](../../../../../README.md) • **Docs**

***

[@-xun/scripts](../../../../../README.md) / [lib/@-xun/cli-utils/extensions](../README.md) / standardCommonCliArgumentsKeys

# Variable: standardCommonCliArgumentsKeys

> `const` **standardCommonCliArgumentsKeys**: (`"silent"` \| `"hush"` \| `"quiet"`)[]

This is an array of the keys in [standardCommonCliArguments](standardCommonCliArguments.md), each of
which have a one-to-one relation with a key of
[StandardCommonCliArguments](../type-aliases/StandardCommonCliArguments.md).

Note that this array purposely excludes `'help'` and `'version'`, which are
considered standard common CLI arguments by this package and are therefore
automatically included when appropriate.

## Defined in

[lib/@-xun/cli-utils/extensions.ts:140](https://github.com/Xunnamius/xscripts/blob/154567d6fca3f6cf244137e710b029af872e1d9e/lib/@-xun/cli-utils/extensions.ts#L140)
