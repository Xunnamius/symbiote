[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / AssetPreset

# Enumeration: AssetPreset

Defined in: [src/assets.ts:73](https://github.com/Xunnamius/symbiote/blob/1546ab8527a571efe54081d7614bd35a9d6e0c3c/src/assets.ts#L73)

These presets determine which assets will be returned by which transformers
when they're invoked. By specifying a preset, only the assets it represents
will be generated. All others will be ignored.

See the symbiote wiki for details.

## Enumeration Members

### Basic

> **Basic**: `"basic"`

Defined in: [src/assets.ts:84](https://github.com/Xunnamius/symbiote/blob/1546ab8527a571efe54081d7614bd35a9d6e0c3c/src/assets.ts#L84)

Represents the most basic assets necessary for symbiote to be fully
functional.

This preset is the basis for all others and can be used on any
symbiote-compliant project when returning only a subset of files are
desired.

See the symbiote wiki for details.

***

### Cli

> **Cli**: `"cli"`

Defined in: [src/assets.ts:92](https://github.com/Xunnamius/symbiote/blob/1546ab8527a571efe54081d7614bd35a9d6e0c3c/src/assets.ts#L92)

Represents the standard assets for an symbiote-compliant command-line
interface project (such as `@black-flag/core`-powered tools like `symbiote`
itself).

See the symbiote wiki for details.

***

### Lib

> **Lib**: `"lib"`

Defined in: [src/assets.ts:101](https://github.com/Xunnamius/symbiote/blob/1546ab8527a571efe54081d7614bd35a9d6e0c3c/src/assets.ts#L101)

Represents the standard assets for an symbiote-compliant library project
built for both CJS and ESM consumers (such as the case with
`@black-flag/core`) and potentially also browser and other consumers as
well.

See the symbiote wiki for details.

***

### LibEsm

> **LibEsm**: `"lib-esm"`

Defined in: [src/assets.ts:109](https://github.com/Xunnamius/symbiote/blob/1546ab8527a571efe54081d7614bd35a9d6e0c3c/src/assets.ts#L109)

Represents the standard assets for an symbiote-compliant library project
built exclusively for ESM and ESM-compatible consumers (such as the case
with the `unified-utils` monorepo).

See the symbiote wiki for details.

***

### LibWeb

> **LibWeb**: `"lib-web"`

Defined in: [src/assets.ts:117](https://github.com/Xunnamius/symbiote/blob/1546ab8527a571efe54081d7614bd35a9d6e0c3c/src/assets.ts#L117)

Represents the standard assets for an symbiote-compliant library project
built exclusively for ESM consumers operating in a browser-like runtime
(such as the case with the `next-utils` monorepo).

See the symbiote wiki for details.

***

### Nextjs

> **Nextjs**: `"nextjs"`

Defined in: [src/assets.ts:130](https://github.com/Xunnamius/symbiote/blob/1546ab8527a571efe54081d7614bd35a9d6e0c3c/src/assets.ts#L130)

Represents the standard assets for an symbiote-compliant Next.js + React
project.

See the symbiote wiki for details.

***

### React

> **React**: `"react"`

Defined in: [src/assets.ts:123](https://github.com/Xunnamius/symbiote/blob/1546ab8527a571efe54081d7614bd35a9d6e0c3c/src/assets.ts#L123)

Represents the standard assets for an symbiote-compliant React project.

See the symbiote wiki for details.

***

### TurboOnly

> **TurboOnly**: `"turbo-only"`

Defined in: [src/assets.ts:137](https://github.com/Xunnamius/symbiote/blob/1546ab8527a571efe54081d7614bd35a9d6e0c3c/src/assets.ts#L137)

Represents exclusively targeting `turbo.json` assets across the entire
project.

See the symbiote wiki for details.
