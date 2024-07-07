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

[lib/@-xun/cli-utils/extensions.ts:141](https://github.com/Xunnamius/xscripts/blob/4c305ac01bcb5579e4796a0cd2b08508dc5de5e1/lib/@-xun/cli-utils/extensions.ts#L141)
