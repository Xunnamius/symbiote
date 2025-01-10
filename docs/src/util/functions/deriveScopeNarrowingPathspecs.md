[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/util](../README.md) / deriveScopeNarrowingPathspecs

# Function: deriveScopeNarrowingPathspecs()

> **deriveScopeNarrowingPathspecs**(`__namedParameters`): `string`[]

Defined in: [src/util.ts:632](https://github.com/Xunnamius/symbiote/blob/45a95680565f7437367edb2f8cc44a33e7541aa0/src/util.ts#L632)

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
