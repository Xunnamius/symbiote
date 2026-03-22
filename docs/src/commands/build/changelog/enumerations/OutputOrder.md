[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / OutputOrder

# Enumeration: OutputOrder

Defined in: [src/commands/build/changelog.ts:104](https://github.com/Xunnamius/symbiote/blob/68dd659d6dfd3bcf6be03ab6772222ae59d5b644/src/commands/build/changelog.ts#L104)

Determines the output format of the changelog file.

## Enumeration Members

### Descending

> **Descending**: `"descending"`

Defined in: [src/commands/build/changelog.ts:117](https://github.com/Xunnamius/symbiote/blob/68dd659d6dfd3bcf6be03ab6772222ae59d5b644/src/commands/build/changelog.ts#L117)

The default changelog formatting where sections are listed in chronological
release order.

***

### Storybook

> **Storybook**: `"storybook"`

Defined in: [src/commands/build/changelog.ts:112](https://github.com/Xunnamius/symbiote/blob/68dd659d6dfd3bcf6be03ab6772222ae59d5b644/src/commands/build/changelog.ts#L112)

Sections (heading level 2) are comprised of major and minor releases with
patch changes becoming subsections (heading level 3) of their nearest
major/minor release section.

Such changelogs read as a "storybook".
