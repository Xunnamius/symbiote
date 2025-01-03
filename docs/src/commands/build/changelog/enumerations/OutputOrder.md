[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / OutputOrder

# Enumeration: OutputOrder

Defined in: [src/commands/build/changelog.ts:113](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/build/changelog.ts#L113)

Determines the output format of the changelog file.

## Enumeration Members

### Descending

> **Descending**: `"descending"`

Defined in: [src/commands/build/changelog.ts:126](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/build/changelog.ts#L126)

The default changelog formatting where sections are listed in chronological
release order.

***

### Storybook

> **Storybook**: `"storybook"`

Defined in: [src/commands/build/changelog.ts:121](https://github.com/Xunnamius/symbiote/blob/7b8ca545f93c3e9d22b693c6c58dbb29604867ff/src/commands/build/changelog.ts#L121)

Sections (heading level 2) are comprised of major and minor releases with
patch changes becoming subsections (heading level 3) of their nearest
major/minor release section.

Such changelogs read as a "storybook".
