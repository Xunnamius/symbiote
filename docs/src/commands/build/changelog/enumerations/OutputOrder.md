[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / OutputOrder

# Enumeration: OutputOrder

Determines the output format of the changelog file.

## Enumeration Members

### Descending

> **Descending**: `"descending"`

The default changelog formatting where sections are listed in chronological
release order.

#### Defined in

[src/commands/build/changelog.ts:126](https://github.com/Xunnamius/symbiote/blob/26e756362a16f050e03cef2c4c582d94e29614cd/src/commands/build/changelog.ts#L126)

***

### Storybook

> **Storybook**: `"storybook"`

Sections (heading level 2) are comprised of major and minor releases with
patch changes becoming subsections (heading level 3) of their nearest
major/minor release section.

Such changelogs read as a "storybook".

#### Defined in

[src/commands/build/changelog.ts:121](https://github.com/Xunnamius/symbiote/blob/26e756362a16f050e03cef2c4c582d94e29614cd/src/commands/build/changelog.ts#L121)
