[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / AssetPreset

# Enumeration: AssetPreset

Defined in: [src/assets.ts:82](https://github.com/Xunnamius/symbiote/blob/99b7edbb8da48599bbf2df3d7283dc44dcebb760/src/assets.ts#L82)

These presets determine which assets will be returned by which transformers
when they're invoked. By specifying a preset, only the assets it represents
will be generated. All others will be ignored.

See the symbiote wiki for details.

## Enumeration Members

### Basic

> **Basic**: `"basic"`

Defined in: [src/assets.ts:93](https://github.com/Xunnamius/symbiote/blob/99b7edbb8da48599bbf2df3d7283dc44dcebb760/src/assets.ts#L93)

Represents the most basic assets necessary for symbiote to be fully
functional.

This preset is the basis for all others and can be used on any
symbiote-compliant project when returning only a subset of files are
desired.

See the symbiote wiki for details.

***

### Cli

> **Cli**: `"cli"`

Defined in: [src/assets.ts:101](https://github.com/Xunnamius/symbiote/blob/99b7edbb8da48599bbf2df3d7283dc44dcebb760/src/assets.ts#L101)

Represents the standard assets for an symbiote-compliant command-line
interface project (such as `@black-flag/core`-powered tools like `symbiote`
itself).

See the symbiote wiki for details.

***

### Lib

> **Lib**: `"lib"`

Defined in: [src/assets.ts:110](https://github.com/Xunnamius/symbiote/blob/99b7edbb8da48599bbf2df3d7283dc44dcebb760/src/assets.ts#L110)

Represents the standard assets for an symbiote-compliant library project
built for both CJS and ESM consumers (such as the case with
`@black-flag/core`) and potentially also browser and other consumers as
well.

See the symbiote wiki for details.

***

### LibEsm

> **LibEsm**: `"lib-esm"`

Defined in: [src/assets.ts:118](https://github.com/Xunnamius/symbiote/blob/99b7edbb8da48599bbf2df3d7283dc44dcebb760/src/assets.ts#L118)

Represents the standard assets for an symbiote-compliant library project
built exclusively for ESM and ESM-compatible consumers (such as the case
with the `unified-utils` monorepo).

See the symbiote wiki for details.

***

### LibWeb

> **LibWeb**: `"lib-web"`

Defined in: [src/assets.ts:126](https://github.com/Xunnamius/symbiote/blob/99b7edbb8da48599bbf2df3d7283dc44dcebb760/src/assets.ts#L126)

Represents the standard assets for an symbiote-compliant library project
built exclusively for ESM consumers operating in a browser-like runtime
(such as the case with the `next-utils` monorepo).

See the symbiote wiki for details.

***

### Nextjs

> **Nextjs**: `"nextjs"`

Defined in: [src/assets.ts:139](https://github.com/Xunnamius/symbiote/blob/99b7edbb8da48599bbf2df3d7283dc44dcebb760/src/assets.ts#L139)

Represents the standard assets for an symbiote-compliant Next.js + React
project.

See the symbiote wiki for details.

***

### React

> **React**: `"react"`

Defined in: [src/assets.ts:132](https://github.com/Xunnamius/symbiote/blob/99b7edbb8da48599bbf2df3d7283dc44dcebb760/src/assets.ts#L132)

Represents the standard assets for an symbiote-compliant React project.

See the symbiote wiki for details.
