[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / deriveScopeNarrowingPathspecs

# Function: deriveScopeNarrowingPathspecs()

> **deriveScopeNarrowingPathspecs**(`__namedParameters`): `string`[]

Defined in: [src/util.ts:634](https://github.com/Xunnamius/symbiote/blob/2816aa5c7580c21865c6837f71b54d0f60e224da/src/util.ts#L634)

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
