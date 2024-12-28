[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / AssetPreset

# Enumeration: AssetPreset

These presets determine which assets will be returned by which transformers
when they're invoked. By specifying a preset, only the assets it represents
will be generated. All others will be ignored.

See the symbiote wiki for details.

## Enumeration Members

### Basic

> **Basic**: `"basic"`

Represents the most basic assets necessary for symbiote to be fully
functional.

This preset is the basis for all others and can be used on any
symbiote-compliant project when returning only a subset of files are
desired.

See the symbiote wiki for details.

#### Defined in

[src/assets.ts:84](https://github.com/Xunnamius/symbiote/blob/c062d7c5dc980668c9246eeeaf1aa96da42e4471/src/assets.ts#L84)

***

### Cli

> **Cli**: `"cli"`

Represents the standard assets for an symbiote-compliant command-line
interface project (such as `@black-flag/core`-powered tools like `symbiote`
itself).

See the symbiote wiki for details.

#### Defined in

[src/assets.ts:92](https://github.com/Xunnamius/symbiote/blob/c062d7c5dc980668c9246eeeaf1aa96da42e4471/src/assets.ts#L92)

***

### Lib

> **Lib**: `"lib"`

Represents the standard assets for an symbiote-compliant library project
built for both CJS and ESM consumers (such as the case with
`@black-flag/core`) and potentially also browser and other consumers as
well.

See the symbiote wiki for details.

#### Defined in

[src/assets.ts:101](https://github.com/Xunnamius/symbiote/blob/c062d7c5dc980668c9246eeeaf1aa96da42e4471/src/assets.ts#L101)

***

### LibEsm

> **LibEsm**: `"lib-esm"`

Represents the standard assets for an symbiote-compliant library project
built exclusively for ESM and ESM-compatible consumers (such as the case
with the `unified-utils` monorepo).

See the symbiote wiki for details.

#### Defined in

[src/assets.ts:109](https://github.com/Xunnamius/symbiote/blob/c062d7c5dc980668c9246eeeaf1aa96da42e4471/src/assets.ts#L109)

***

### LibWeb

> **LibWeb**: `"lib-web"`

Represents the standard assets for an symbiote-compliant library project
built exclusively for ESM consumers operating in a browser-like runtime
(such as the case with the `next-utils` monorepo).

See the symbiote wiki for details.

#### Defined in

[src/assets.ts:117](https://github.com/Xunnamius/symbiote/blob/c062d7c5dc980668c9246eeeaf1aa96da42e4471/src/assets.ts#L117)

***

### Nextjs

> **Nextjs**: `"nextjs"`

Represents the standard assets for an symbiote-compliant Next.js + React
project.

See the symbiote wiki for details.

#### Defined in

[src/assets.ts:130](https://github.com/Xunnamius/symbiote/blob/c062d7c5dc980668c9246eeeaf1aa96da42e4471/src/assets.ts#L130)

***

### React

> **React**: `"react"`

Represents the standard assets for an symbiote-compliant React project.

See the symbiote wiki for details.

#### Defined in

[src/assets.ts:123](https://github.com/Xunnamius/symbiote/blob/c062d7c5dc980668c9246eeeaf1aa96da42e4471/src/assets.ts#L123)
