[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_.remarkrc.mjs](../README.md) / wellKnownGithubAlerts

# Variable: wellKnownGithubAlerts

> `const` **wellKnownGithubAlerts**: readonly \[`"[!NOTE]"`, `"[!TIP]"`, `"[!IMPORTANT]"`, `"[!WARNING]"`, `"[!CAUTION]"`\]

Defined in: [src/assets/transformers/\_.remarkrc.mjs.ts:46](https://github.com/Xunnamius/symbiote/blob/ff6ce22d3a3433c07460af5758ce7920a1d9aa5a/src/assets/transformers/_.remarkrc.mjs.ts#L46)

We track these so that we may prevent mdast-util-markdown from mangling them
with an escape character, which sometimes does not render properly on GitHub
or with GFM-compatible tooling.

## See

https://github.com/orgs/community/discussions/16925
