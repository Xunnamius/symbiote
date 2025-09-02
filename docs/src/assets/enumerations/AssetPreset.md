[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / AssetPreset

# Enumeration: AssetPreset

Defined in: [src/assets.ts:75](https://github.com/Xunnamius/symbiote/blob/bf93fc6ee8086ef7d92447ad716f3811a334edee/src/assets.ts#L75)

These presets determine which assets will be returned by which transformers
when they're invoked. By specifying a preset, only the assets it represents
will be generated. All others will be ignored.

See the symbiote wiki for details.

## Enumeration Members

### Basic

> **Basic**: `"basic"`

Defined in: [src/assets.ts:86](https://github.com/Xunnamius/symbiote/blob/bf93fc6ee8086ef7d92447ad716f3811a334edee/src/assets.ts#L86)

Represents the most basic assets necessary for symbiote to be fully
functional.

This preset is the basis for all others and can be used on any
symbiote-compliant project when targeting only a subset of files is desired
(e.g. via `--include-asset-paths`/`--exclude-asset-paths` when renovating).

See the symbiote wiki for details.

***

### Cli

> **Cli**: `"cli"`

Defined in: [src/assets.ts:94](https://github.com/Xunnamius/symbiote/blob/bf93fc6ee8086ef7d92447ad716f3811a334edee/src/assets.ts#L94)

Represents the standard assets for an symbiote-compliant command-line
interface project (such as `@-xun/cli`-powered tools like `symbiote`
itself).

See the symbiote wiki for details.

***

### Lib

> **Lib**: `"lib"`

Defined in: [src/assets.ts:103](https://github.com/Xunnamius/symbiote/blob/bf93fc6ee8086ef7d92447ad716f3811a334edee/src/assets.ts#L103)

Represents the standard assets for an symbiote-compliant library project
built for both CJS and ESM consumers (such as the case with
`@-xun/cli`) and potentially also browser and other consumers as
well.

See the symbiote wiki for details.

***

### LibEsm

> **LibEsm**: `"lib-esm"`

Defined in: [src/assets.ts:111](https://github.com/Xunnamius/symbiote/blob/bf93fc6ee8086ef7d92447ad716f3811a334edee/src/assets.ts#L111)

Represents the standard assets for an symbiote-compliant library project
built exclusively for ESM and ESM-compatible consumers (such as the case
with the `unified-utils` monorepo).

See the symbiote wiki for details.

***

### LibWeb

> **LibWeb**: `"lib-web"`

Defined in: [src/assets.ts:119](https://github.com/Xunnamius/symbiote/blob/bf93fc6ee8086ef7d92447ad716f3811a334edee/src/assets.ts#L119)

Represents the standard assets for an symbiote-compliant library project
built exclusively for ESM consumers operating in a browser-like runtime
(such as the case with the `next-utils` monorepo).

See the symbiote wiki for details.

***

### Nextjs

> **Nextjs**: `"nextjs"`

Defined in: [src/assets.ts:132](https://github.com/Xunnamius/symbiote/blob/bf93fc6ee8086ef7d92447ad716f3811a334edee/src/assets.ts#L132)

Represents the standard assets for an symbiote-compliant Next.js + React
project.

See the symbiote wiki for details.

***

### React

> **React**: `"react"`

Defined in: [src/assets.ts:125](https://github.com/Xunnamius/symbiote/blob/bf93fc6ee8086ef7d92447ad716f3811a334edee/src/assets.ts#L125)

Represents the standard assets for an symbiote-compliant React project.

See the symbiote wiki for details.

***

### Wrangler

> **Wrangler**: `"wrangler"`

Defined in: [src/assets.ts:139](https://github.com/Xunnamius/symbiote/blob/bf93fc6ee8086ef7d92447ad716f3811a334edee/src/assets.ts#L139)

Represents the standard assets for an symbiote-compliant project built on
Cloudflare's Wrangler tool.

See the symbiote wiki for details.
