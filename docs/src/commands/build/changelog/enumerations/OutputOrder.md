[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / OutputOrder

# Enumeration: OutputOrder

Defined in: [src/commands/build/changelog.ts:102](https://github.com/Xunnamius/symbiote/blob/520897b087b8e240c6e7c9236ad875776c29a907/src/commands/build/changelog.ts#L102)

Determines the output format of the changelog file.

## Enumeration Members

### Descending

> **Descending**: `"descending"`

Defined in: [src/commands/build/changelog.ts:115](https://github.com/Xunnamius/symbiote/blob/520897b087b8e240c6e7c9236ad875776c29a907/src/commands/build/changelog.ts#L115)

The default changelog formatting where sections are listed in chronological
release order.

***

### Storybook

> **Storybook**: `"storybook"`

Defined in: [src/commands/build/changelog.ts:110](https://github.com/Xunnamius/symbiote/blob/520897b087b8e240c6e7c9236ad875776c29a907/src/commands/build/changelog.ts#L110)

Sections (heading level 2) are comprised of major and minor releases with
patch changes becoming subsections (heading level 3) of their nearest
major/minor release section.

Such changelogs read as a "storybook".
