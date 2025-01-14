[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / AssetPreset

# Enumeration: AssetPreset

Defined in: [src/assets.ts:76](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/assets.ts#L76)

These presets determine which assets will be returned by which transformers
when they're invoked. By specifying a preset, only the assets it represents
will be generated. All others will be ignored.

See the symbiote wiki for details.

## Enumeration Members

### Basic

> **Basic**: `"basic"`

Defined in: [src/assets.ts:87](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/assets.ts#L87)

Represents the most basic assets necessary for symbiote to be fully
functional.

This preset is the basis for all others and can be used on any
symbiote-compliant project when returning only a subset of files are
desired.

See the symbiote wiki for details.

***

### Cli

> **Cli**: `"cli"`

Defined in: [src/assets.ts:95](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/assets.ts#L95)

Represents the standard assets for an symbiote-compliant command-line
interface project (such as `@black-flag/core`-powered tools like `symbiote`
itself).

See the symbiote wiki for details.

***

### Lib

> **Lib**: `"lib"`

Defined in: [src/assets.ts:104](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/assets.ts#L104)

Represents the standard assets for an symbiote-compliant library project
built for both CJS and ESM consumers (such as the case with
`@black-flag/core`) and potentially also browser and other consumers as
well.

See the symbiote wiki for details.

***

### LibEsm

> **LibEsm**: `"lib-esm"`

Defined in: [src/assets.ts:112](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/assets.ts#L112)

Represents the standard assets for an symbiote-compliant library project
built exclusively for ESM and ESM-compatible consumers (such as the case
with the `unified-utils` monorepo).

See the symbiote wiki for details.

***

### LibWeb

> **LibWeb**: `"lib-web"`

Defined in: [src/assets.ts:120](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/assets.ts#L120)

Represents the standard assets for an symbiote-compliant library project
built exclusively for ESM consumers operating in a browser-like runtime
(such as the case with the `next-utils` monorepo).

See the symbiote wiki for details.

***

### Nextjs

> **Nextjs**: `"nextjs"`

Defined in: [src/assets.ts:133](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/assets.ts#L133)

Represents the standard assets for an symbiote-compliant Next.js + React
project.

See the symbiote wiki for details.

***

### React

> **React**: `"react"`

Defined in: [src/assets.ts:126](https://github.com/Xunnamius/symbiote/blob/b951959a4a12ac484c8addc839f912c4e5767875/src/assets.ts#L126)

Represents the standard assets for an symbiote-compliant React project.

See the symbiote wiki for details.
