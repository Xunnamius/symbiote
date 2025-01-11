[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/build/changelog](../README.md) / OutputOrder

# Enumeration: OutputOrder

Defined in: [src/commands/build/changelog.ts:114](https://github.com/Xunnamius/symbiote/blob/1e0174c32cff28e404202c1cf920e474b94cfe7b/src/commands/build/changelog.ts#L114)

Determines the output format of the changelog file.

## Enumeration Members

### Descending

> **Descending**: `"descending"`

Defined in: [src/commands/build/changelog.ts:127](https://github.com/Xunnamius/symbiote/blob/1e0174c32cff28e404202c1cf920e474b94cfe7b/src/commands/build/changelog.ts#L127)

The default changelog formatting where sections are listed in chronological
release order.

***

### Storybook

> **Storybook**: `"storybook"`

Defined in: [src/commands/build/changelog.ts:122](https://github.com/Xunnamius/symbiote/blob/1e0174c32cff28e404202c1cf920e474b94cfe7b/src/commands/build/changelog.ts#L122)

Sections (heading level 2) are comprised of major and minor releases with
patch changes becoming subsections (heading level 3) of their nearest
major/minor release section.

Such changelogs read as a "storybook".
