[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/configure](../README.md) / DefaultGlobalScope

# Enumeration: DefaultGlobalScope

Defined in: [src/configure.ts:70](https://github.com/Xunnamius/symbiote/blob/6c12fe85338c1ca20a9b3dedd0e391ce548a98a4/src/configure.ts#L70)

Determines which project files are considered within a command's purview.
Files outside of a command's purview will be treated by symbiote as if they
do not exist where possible.

This enum is essentially [ThisPackageGlobalScope](ThisPackageGlobalScope.md) +
[UnlimitedGlobalScope](UnlimitedGlobalScope.md).

## Enumeration Members

### ThisPackage

> **ThisPackage**: `"this-package"`

Defined in: [src/configure.ts:79](https://github.com/Xunnamius/symbiote/blob/6c12fe85338c1ca20a9b3dedd0e391ce548a98a4/src/configure.ts#L79)

Limit the command to _all_ relevant files contained within the current
package (as determined by the current working directory), excluding the
files of any other (named) workspace packages. Hence, this scope is only
meaningful in a monorepo context.

This is the default scope for most commands.

***

### Unlimited

> **Unlimited**: `"unlimited"`

Defined in: [src/configure.ts:86](https://github.com/Xunnamius/symbiote/blob/6c12fe85338c1ca20a9b3dedd0e391ce548a98a4/src/configure.ts#L86)

Do not limit or exclude any files by default when running the command.

This is useful, for instance, when attempting to manually lint an entire
monorepo at once; e.g. `npx symbiote lint --scope=unlimited`.
