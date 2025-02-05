[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / deriveScopeNarrowingPathspecs

# Function: deriveScopeNarrowingPathspecs()

> **deriveScopeNarrowingPathspecs**(`__namedParameters`): `string`[]

Defined in: [src/util.ts:634](https://github.com/Xunnamius/symbiote/blob/6cd9803a2f37849e57efc78412bcf20f1a002bf9/src/util.ts#L634)

Return pathspecs for including only certain paths for consideration depending
on the project structure and the current working directory.

This function takes into account WorkspaceAttribute.Shared packages
and is useful for narrowing the scope of tooling like xchangelog and
xrelease.

## Parameters

### \_\_namedParameters

#### projectMetadata

`ProjectMetadata`

## Returns

`string`[]
