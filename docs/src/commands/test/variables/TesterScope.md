[**@-xun/symbiote**](../../../../README.md)

***

[@-xun/symbiote](../../../../README.md) / [src/commands/test](../README.md) / TesterScope

# Variable: TesterScope

> **TesterScope**: `object`

Defined in: [src/commands/test.ts:126](https://github.com/Xunnamius/symbiote/blob/450f56aebb4b9ee6be666259169f3898916253ca/src/commands/test.ts#L126)

The context in which to search for test files.

## Type declaration

### ThisPackage

> **ThisPackage**: `"this-package"`

Limit the command to _all_ relevant files contained within the current
package (as determined by the current working directory), excluding the
files of any other (named) workspace packages. Hence, this scope is only
meaningful in a monorepo context.

This is the default scope for most commands.

### ThisPackageIntermediates

> **ThisPackageIntermediates**: `"this-package-intermediates"`

Limit the command to relevant _transpiled_ tests (aka "intermediates")
within `./.transpiled` (with respect to the current working directory).

### Unlimited

> **Unlimited**: `"unlimited"`

Do not limit or exclude any files by default when running the command.

This is useful, for instance, when attempting to manually lint an entire
monorepo at once; e.g. `npx symbiote lint --scope=unlimited`.
