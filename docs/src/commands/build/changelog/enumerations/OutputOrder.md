[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / OutputOrder

# Enumeration: OutputOrder

Defined in: [src/commands/build/changelog.ts:103](https://github.com/Xunnamius/symbiote/blob/2addc204c768058478c644c99aa7f180ba8bd721/src/commands/build/changelog.ts#L103)

Determines the output format of the changelog file.

## Enumeration Members

### Descending

> **Descending**: `"descending"`

Defined in: [src/commands/build/changelog.ts:116](https://github.com/Xunnamius/symbiote/blob/2addc204c768058478c644c99aa7f180ba8bd721/src/commands/build/changelog.ts#L116)

The default changelog formatting where sections are listed in chronological
release order.

***

### Storybook

> **Storybook**: `"storybook"`

Defined in: [src/commands/build/changelog.ts:111](https://github.com/Xunnamius/symbiote/blob/2addc204c768058478c644c99aa7f180ba8bd721/src/commands/build/changelog.ts#L111)

Sections (heading level 2) are comprised of major and minor releases with
patch changes becoming subsections (heading level 3) of their nearest
major/minor release section.

Such changelogs read as a "storybook".
