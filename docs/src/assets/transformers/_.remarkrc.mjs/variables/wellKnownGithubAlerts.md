[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_.remarkrc.mjs](../README.md) / wellKnownGithubAlerts

# Variable: wellKnownGithubAlerts

> `const` **wellKnownGithubAlerts**: readonly [`"[!NOTE]"`, `"[!TIP]"`, `"[!IMPORTANT]"`, `"[!WARNING]"`, `"[!CAUTION]"`]

We track these so that we may prevent mdast-util-markdown from mangling them
with an escape character, which sometimes does not render properly on GitHub
or with GFM-compatible tooling.

## See

https://github.com/orgs/community/discussions/16925

## Defined in

[src/assets/transformers/\_.remarkrc.mjs.ts:41](https://github.com/Xunnamius/symbiote/blob/26e756362a16f050e03cef2c4c582d94e29614cd/src/assets/transformers/_.remarkrc.mjs.ts#L41)
