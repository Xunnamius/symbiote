[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / OutputOrder

# Enumeration: OutputOrder

Defined in: [src/commands/build/changelog.ts:101](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/commands/build/changelog.ts#L101)

Determines the output format of the changelog file.

## Enumeration Members

### Descending

> **Descending**: `"descending"`

Defined in: [src/commands/build/changelog.ts:114](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/commands/build/changelog.ts#L114)

The default changelog formatting where sections are listed in chronological
release order.

***

### Storybook

> **Storybook**: `"storybook"`

Defined in: [src/commands/build/changelog.ts:109](https://github.com/Xunnamius/symbiote/blob/9f696d86c2382405dbee8c9ec7da955f46194e6a/src/commands/build/changelog.ts#L109)

Sections (heading level 2) are comprised of major and minor releases with
patch changes becoming subsections (heading level 3) of their nearest
major/minor release section.

Such changelogs read as a "storybook".
