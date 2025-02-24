[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/commands/project/renovate](../README.md) / renovationTasks

# Variable: renovationTasks

> `const` **renovationTasks**: `object`

Defined in: [src/commands/project/renovate.ts:765](https://github.com/Xunnamius/symbiote/blob/c8e7e58364e34d94a79ee4d48272a3e971d09e09/src/commands/project/renovate.ts#L765)

## Type declaration

### full-deprecate

> `readonly` **full-deprecate**: `object`

#### full-deprecate.actionDescription

> `readonly` **actionDescription**: `"Deprecating package"` = `'Deprecating package'`

#### full-deprecate.conflicts

> `readonly` **conflicts**: `object`[]

##### Index Signature

\[`key`: `string`\]: `boolean`

#### full-deprecate.emoji

> `readonly` **emoji**: `"🪦"` = `'🪦'`

#### full-deprecate.longHelpDescription

> `readonly` **longHelpDescription**: "This renovation will execute the standard deprecation procedure on the current package. See the symbiote wiki for details on the standard deprecation procedure.\n\n    Regardless of --scope, if this renovation is used on a polyrepo, the entire repository will also be deprecated; if this renovation is used on a monorepo, it will apply only to the current package unless the repository is a hybridrepo and deprecating the current package would result in all packages having been deprecated. In case of the latter, the entire repository will also be deprecated."

#### full-deprecate.requiresForce

> `readonly` **requiresForce**: `true` = `true`

#### full-deprecate.shortHelpDescription

> `readonly` **shortHelpDescription**: `"Deprecate the current package and possibly the entire repository"` = `'Deprecate the current package and possibly the entire repository'`

#### full-deprecate.subOptions

> `readonly` **subOptions**: `object` = `{}`

#### full-deprecate.supportedScopes

> `readonly` **supportedScopes**: \[[`ThisPackage`](../../../../configure/enumerations/DefaultGlobalScope.md#thispackage)\]

#### full-deprecate.taskAliases

> `readonly` **taskAliases**: \[\] = `[]`

#### full-deprecate.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

### full-undeprecate

> `readonly` **full-undeprecate**: `object`

#### full-undeprecate.actionDescription

> `readonly` **actionDescription**: `"Un-deprecating package"` = `'Un-deprecating package'`

#### full-undeprecate.conflicts

> `readonly` **conflicts**: `object`[]

##### Index Signature

\[`key`: `string`\]: `boolean`

#### full-undeprecate.emoji

> `readonly` **emoji**: `"🧟"` = `'🧟'`

#### full-undeprecate.longHelpDescription

> `readonly` **longHelpDescription**: "This renovation will make a best effort at undoing the standard deprecation procedure on the current package and its containing repository, effectively \"un-deprecating\" them both. See the symbiote wiki for details on the standard deprecation procedure and what the ramifications of an \"un-deprecation\" are."

#### full-undeprecate.requiresForce

> `readonly` **requiresForce**: `true` = `true`

#### full-undeprecate.shortHelpDescription

> `readonly` **shortHelpDescription**: `"Reverse the deprecation of the current package and repository"` = `'Reverse the deprecation of the current package and repository'`

#### full-undeprecate.subOptions

> `readonly` **subOptions**: `object` = `{}`

#### full-undeprecate.supportedScopes

> `readonly` **supportedScopes**: \[[`ThisPackage`](../../../../configure/enumerations/DefaultGlobalScope.md#thispackage)\]

#### full-undeprecate.taskAliases

> `readonly` **taskAliases**: \[\] = `[]`

#### full-undeprecate.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

### generate-alias-tags

> `readonly` **generate-alias-tags**: `object`

#### generate-alias-tags.actionDescription

> `readonly` **actionDescription**: `"Creating aliases for matching tags"` = `'Creating aliases for matching tags'`

#### generate-alias-tags.conflicts

> `readonly` **conflicts**: `object`[]

##### Index Signature

\[`key`: `string`\]: `boolean`

#### generate-alias-tags.emoji

> `readonly` **emoji**: `"⚓"` = `'⚓'`

#### generate-alias-tags.longHelpDescription

> `readonly` **longHelpDescription**: "This renovation creates an alias of every tag in the repository with --old-scope. The alias tag names are derived by taking the existing tag name and replacing --old-scope with --new-scope. If --force is given, alias tags (e.g. \"new-package-name@1.2.3\") will be created for any existing tags with old-style semver valid names (e.g. \"v1.2.3\") as well.\n\nFor example, to only create new-style aliases of all tags with old-style semver valid names, i.e. alias tag \"new-package-name@1.2.3\" for existing tag \"v1.2.3\":\n\n\`symbiote project renovate --generate-alias-tags --new-scope='new-package-name' --force\`\n\nOr to generate aliases for existing modern scoped tags, i.e. alias tag \"@new/package-name@1.2.3\" for existing tag \"existing-scope@1.2.3\":\n\n\`symbiote project renovate --generate-alias-tags --old-scope='existing-scope' --new-scope='@new/package-name'\`\n\nUse --rename-matching-releases to control if releases on GitHub with names matching --old-scope will have that scope replaced with --new-scope.\n\nNote that this command never deletes tags."

#### generate-alias-tags.requiresForce

> `readonly` **requiresForce**: `false` = `false`

#### generate-alias-tags.shortHelpDescription

> `readonly` **shortHelpDescription**: `"Create tag aliases for each existing tag with matching scope"` = `'Create tag aliases for each existing tag with matching scope'`

#### generate-alias-tags.subOptions

> `readonly` **subOptions**: `object`

#### generate-alias-tags.subOptions.new-scope

> `readonly` **new-scope**: `object`

#### generate-alias-tags.subOptions.new-scope.description

> `readonly` **description**: "The characters preceding \"@\" in generated alias tags" = `'The characters preceding "@" in generated alias tags'`

#### generate-alias-tags.subOptions.new-scope.string

> `readonly` **string**: `true` = `true`

#### generate-alias-tags.subOptions.new-scope.subOptionOf

> `readonly` **subOptionOf**: `object`

#### generate-alias-tags.subOptions.new-scope.subOptionOf.generate-alias-tags

> `readonly` **generate-alias-tags**: `object`

#### generate-alias-tags.subOptions.new-scope.subOptionOf.generate-alias-tags.when()

> `readonly` **when**: (`superOptionValue`) => `any`

##### Parameters

###### superOptionValue

`any`

##### Returns

`any`

#### generate-alias-tags.subOptions.new-scope.subOptionOf.generate-alias-tags.update()

##### Parameters

###### oldOptionConfig

`BfeBuilderObjectValueWithoutSubOptionOfExtension`\<`Record`\<`string`, `unknown`\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\>

##### Returns

`object`

###### alias?

> `optional` **alias**: `string` \| readonly `string`[]

string or array of strings, alias(es) for the canonical option key, see `alias()`

###### array?

> `optional` **array**: `boolean`

boolean, interpret option as an array, see `array()`

###### boolean?

> `optional` **boolean**: `boolean`

boolean, interpret option as a boolean flag, see `boolean()`

###### check?

> `optional` **check**: `BfeCheckFunction`\<`Record`\<`string`, `unknown`\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\> \| `BfeCheckFunction`\<`Record`\<..., ...\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\>[]

`check` is the declarative option-specific version of vanilla yargs's
`yargs::check()`. Also supports async and promise-returning functions.

This function receives the `currentArgumentValue`, which you are free to
type as you please, and the fully parsed `argv`. If this function throws,
the exception will bubble. If this function returns an instance of `Error`,
a string, or any non-truthy value (including `undefined` or not returning
anything), Black Flag will throw a `CliError` on your behalf.

You may also pass an array of check functions, each being executed after
the other. Note that providing an array of one or more async check
functions will result in them being awaited concurrently.

See [the
documentation](https://github.com/Xunnamius/black-flag-extensions?tab=readme-ov-file#check)
for details.

###### choices?

> `optional` **choices**: `Choices`

value or array of values, limit valid option arguments to a predefined set, see `choices()`

###### coerce()?

> `optional` **coerce**: (`arg`) => `any`

`coerce` transforms an original `argv` value into another one. This is
equivalent to `coerce` from vanilla yargs.

However, unlike vanilla yargs and Black Flag, the `coerce` function will
_always_ receive an array if the option was configured with `{ array: true
}`.

Note that **a defaulted argument will not result in this function being
called.** Only arguments given via `argv` trigger `coerce`. This is vanilla
yargs behavior.

###### Parameters

###### arg

`any`

###### Returns

`any`

###### config?

> `optional` **config**: `boolean`

boolean, interpret option as a path to a JSON config file, see `config()`

###### configParser()?

> `optional` **configParser**: (`configPath`) => `object`

function, provide a custom config parsing function, see `config()`

###### Parameters

###### configPath

`string`

###### Returns

`object`

###### conflicts?

> `optional` **conflicts**: `BfeBuilderObjectValueExtensionValue`

`conflicts` enables checks to ensure the specified arguments, or
argument-value pairs, are _never_ given conditioned on the existence of
another argument. For example:

```jsonc
{
  "x": { "conflicts": "y" }, // ◄ Disallows y if x is given
  "y": {}
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### count?

> `optional` **count**: `boolean`

boolean, interpret option as a count of boolean flags, see `count()`

###### default?

> `optional` **default**: `unknown`

`default` will set a default value for an argument. This is equivalent to
`default` from vanilla yargs.

However, unlike vanilla yargs and Black Flag, this default value is applied
towards the end of BFE's execution, enabling its use alongside keys like
`conflicts`. See [the
documentation](https://github.com/Xunnamius/black-flag-extensions?tab=readme-ov-file#support-for-default-with-conflictsrequiresetc)
for details.

Note also that a defaulted argument will not be coerced by the `coerce`
setting. Only arguments given via `argv` trigger `coerce`. This is vanilla
yargs behavior.

###### defaultDescription?

> `optional` **defaultDescription**: `string`

string, use this description for the default value in help content, see `default()`

###### demandThisOption

> **demandThisOption**: `true` = `true`

###### demandThisOptionIf?

> `optional` **demandThisOptionIf**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionIf` enables checks to ensure an argument is given when at
least one of the specified groups of arguments, or argument-value pairs, is
also given. For example:

```jsonc
{
  "x": {},
  "y": { "demandThisOptionIf": "x" }, // ◄ Demands y if x is given
  "z": { "demandThisOptionIf": "x" } // ◄ Demands z if x is given
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### demandThisOptionOr?

> `optional` **demandThisOptionOr**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionOr` enables non-optional inclusive disjunction checks per
group. Put another way, `demandThisOptionOr` enforces a "logical or"
relation within groups of required options. For example:

```jsonc
{
  "x": { "demandThisOptionOr": ["y", "z"] }, // ◄ Demands x or y or z
  "y": { "demandThisOptionOr": ["x", "z"] },
  "z": { "demandThisOptionOr": ["x", "y"] }
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### demandThisOptionXor?

> `optional` **demandThisOptionXor**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionXor` enables non-optional exclusive disjunction checks per
exclusivity group. Put another way, `demandThisOptionXor` enforces mutual
exclusivity within groups of required options. For example:

```jsonc
{
  // ▼ Disallows ∅, z, w, xy, xyw, xyz, xyzw
  "x": { "demandThisOptionXor": ["y"] },
  "y": { "demandThisOptionXor": ["x"] },
  // ▼ Disallows ∅, x, y, zw, xzw, yzw, xyzw
  "z": { "demandThisOptionXor": ["w"] },
  "w": { "demandThisOptionXor": ["z"] }
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### deprecate?

> `optional` **deprecate**: `string` \| `boolean`

boolean or string, mark the argument as deprecated, see `deprecateOption()`

###### deprecated?

> `optional` **deprecated**: `string` \| `boolean`

boolean or string, mark the argument as deprecated, see `deprecateOption()`

###### desc?

> `optional` **desc**: `string`

string, the option description for help content, see `describe()`

###### describe?

> `optional` **describe**: `string`

string, the option description for help content, see `describe()`

###### description?

> `optional` **description**: `string`

string, the option description for help content, see `describe()`

###### global?

> `optional` **global**: `boolean`

boolean, indicate that this key should not be reset when a command is invoked, see `global()`

###### group?

> `optional` **group**: `string`

string, when displaying usage instructions place the option under an alternative group heading, see `group()`

###### hidden?

> `optional` **hidden**: `boolean`

don't display option in help output.

###### implies?

> `optional` **implies**: `BfeBuilderObjectValueExtensionObject` \| `BfeBuilderObjectValueExtensionObject`[]

`implies` will set default values for the specified arguments conditioned
on the existence of another argument. These implied defaults will override
any `default` configurations of the specified arguments.

If any of the specified arguments are explicitly given on the command line,
their values must match the specified argument-value pairs respectively
(which is the behavior of `requires`/`conflicts`). Use `looseImplications`
to modify this behavior.

Hence, `implies` only accepts one or more argument-value pairs and not raw
strings. For example:

```jsonc
{
  "x": { "implies": { "y": true } }, // ◄ x is now synonymous with xy
  "y": {}
}
```

###### See

 - BfeBuilderObjectValueExtensions.looseImplications
 - BfeBuilderObjectValueExtensions.vacuousImplications

###### looseImplications?

> `optional` **looseImplications**: `boolean`

When `looseImplications` is set to `true`, any implied arguments, when
explicitly given on the command line, will _override_ their configured
implications instead of causing an error.

###### Default

```ts
false
```

###### See

BfeBuilderObjectValueExtensions.implies

###### nargs?

> `optional` **nargs**: `number`

number, specify how many arguments should be consumed for the option, see `nargs()`

###### normalize?

> `optional` **normalize**: `boolean`

boolean, apply path.normalize() to the option, see `normalize()`

###### number?

> `optional` **number**: `boolean`

boolean, interpret option as a number, `number()`

###### requires?

> `optional` **requires**: `BfeBuilderObjectValueExtensionValue`

`requires` enables checks to ensure the specified arguments, or
argument-value pairs, are given conditioned on the existence of another
argument. For example:

```jsonc
{
  "x": { "requires": "y" }, // ◄ Disallows x without y
  "y": {}
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### requiresArg?

> `optional` **requiresArg**: `boolean`

boolean, require the option be specified with a value, see `requiresArg()`

###### skipValidation?

> `optional` **skipValidation**: `boolean`

boolean, skips validation if the option is present, see `skipValidation()`

###### string?

> `optional` **string**: `boolean`

boolean, interpret option as a string, see `string()`

###### type?

> `optional` **type**: `"array"` \| `"count"` \| `PositionalOptionsType`

###### vacuousImplications?

> `optional` **vacuousImplications**: `boolean`

When `vacuousImplications` is set to `true` and the option is also
configured as a "boolean" type, the implications configured via `implies`
will still be applied to `argv` even if said option has a `false` value in
`argv`. In the same scenario except with `vacuousImplications` set to
`false`, the implications configured via `implies` are instead ignored.

###### Default

```ts
false
```

###### See

BfeBuilderObjectValueExtensions.implies

#### generate-alias-tags.subOptions.old-scope

> `readonly` **old-scope**: `object`

#### generate-alias-tags.subOptions.old-scope.default

> `readonly` **default**: `""` = `''`

#### generate-alias-tags.subOptions.old-scope.defaultDescription

> `readonly` **defaultDescription**: `"if omitted while --force is used, only old-style tags are aliased"` = `'if omitted while --force is used, only old-style tags are aliased'`

#### generate-alias-tags.subOptions.old-scope.description

> `readonly` **description**: "The characters preceding \"@\" in existing target tags" = `'The characters preceding "@" in existing target tags'`

#### generate-alias-tags.subOptions.old-scope.string

> `readonly` **string**: `true` = `true`

#### generate-alias-tags.subOptions.rename-matching-releases

> `readonly` **rename-matching-releases**: `object`

#### generate-alias-tags.subOptions.rename-matching-releases.boolean

> `readonly` **boolean**: `true` = `true`

#### generate-alias-tags.subOptions.rename-matching-releases.default

> `readonly` **default**: `false` = `false`

#### generate-alias-tags.subOptions.rename-matching-releases.description

> `readonly` **description**: `"Whether to rename matching GitHub releases"` = `'Whether to rename matching GitHub releases'`

#### generate-alias-tags.supportedScopes

> `readonly` **supportedScopes**: \[[`Unlimited`](../../../../configure/enumerations/DefaultGlobalScope.md#unlimited)\]

#### generate-alias-tags.taskAliases

> `readonly` **taskAliases**: \[\] = `[]`

#### generate-alias-tags.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

### github-clone-remote-wiki

> `readonly` **github-clone-remote-wiki**: `object`

#### github-clone-remote-wiki.actionDescription

> `readonly` **actionDescription**: `"Cloning origin repository wiki into project root"` = `'Cloning origin repository wiki into project root'`

#### github-clone-remote-wiki.conflicts

> `readonly` **conflicts**: `object`[]

##### Index Signature

\[`key`: `string`\]: `boolean`

#### github-clone-remote-wiki.emoji

> `readonly` **emoji**: `"📡"` = `'📡'`

#### github-clone-remote-wiki.longHelpDescription

> `readonly` **longHelpDescription**: `"This renovation will enable the wiki for the origin repository (if it is not enabled already) and then clone that wiki into the (gitignored) .wiki/ directory at the project root."`

#### github-clone-remote-wiki.requiresForce

> `readonly` **requiresForce**: `false` = `false`

#### github-clone-remote-wiki.shortHelpDescription

> `readonly` **shortHelpDescription**: `"Clone the origin repository's wiki into a (gitignored) directory"` = `"Clone the origin repository's wiki into a (gitignored) directory"`

#### github-clone-remote-wiki.subOptions

> `readonly` **subOptions**: `object` = `{}`

#### github-clone-remote-wiki.supportedScopes

> `readonly` **supportedScopes**: \[[`Unlimited`](../../../../configure/enumerations/DefaultGlobalScope.md#unlimited)\]

#### github-clone-remote-wiki.taskAliases

> `readonly` **taskAliases**: \[\] = `[]`

#### github-clone-remote-wiki.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

### github-delete-all-releases

> `readonly` **github-delete-all-releases**: `object`

#### github-delete-all-releases.actionDescription

> `readonly` **actionDescription**: `"Permanently deleting all origin repository releases"` = `'Permanently deleting all origin repository releases'`

#### github-delete-all-releases.conflicts

> `readonly` **conflicts**: `object`[]

##### Index Signature

\[`key`: `string`\]: `boolean`

#### github-delete-all-releases.emoji

> `readonly` **emoji**: `"☢️"` = `'☢️'`

#### github-delete-all-releases.longHelpDescription

> `readonly` **longHelpDescription**: "This renovation will delete from the origin repository all releases associated with the current package (if --scope=this-package) or every possible release in existence (if --scope=unlimited).\n\n⚠️🚧 This is an INCREDIBLY DANGEROUS command that should ONLY be used to clear out unrelated releases after forking a repository."

#### github-delete-all-releases.requiresForce

> `readonly` **requiresForce**: `true` = `true`

#### github-delete-all-releases.shortHelpDescription

> `readonly` **shortHelpDescription**: `"Delete all releases associated with the origin repository"` = `'Delete all releases associated with the origin repository'`

#### github-delete-all-releases.subOptions

> `readonly` **subOptions**: `object` = `{}`

#### github-delete-all-releases.supportedScopes

> `readonly` **supportedScopes**: [`DefaultGlobalScope`](../../../../configure/enumerations/DefaultGlobalScope.md)[] = `projectRenovateScopes`

#### github-delete-all-releases.taskAliases

> `readonly` **taskAliases**: \[\] = `[]`

#### github-delete-all-releases.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

### github-kill-master

> `readonly` **github-kill-master**: `object`

#### github-kill-master.actionDescription

> `readonly` **actionDescription**: "Renaming default branch to \"main\" and finishing off \"master\"" = `'Renaming default branch to "main" and finishing off "master"'`

#### github-kill-master.conflicts

> `readonly` **conflicts**: `object`[]

##### Index Signature

\[`key`: `string`\]: `boolean`

#### github-kill-master.emoji

> `readonly` **emoji**: `"🚷"` = `'🚷'`

#### github-kill-master.longHelpDescription

> `readonly` **longHelpDescription**: "This renovation will kill any and all references to any \"master\" ref throughout the repository. This includes renaming the \"master\" branch to \"main,\" deleting the \"master\" branch on the origin repository, and setting the default branch to \"main\" both locally and remotely if it is not the case already."

#### github-kill-master.requiresForce

> `readonly` **requiresForce**: `false` = `false`

#### github-kill-master.shortHelpDescription

> `readonly` **shortHelpDescription**: "Rename and remove all references to any legacy \"master\" ref(s)" = `'Rename and remove all references to any legacy "master" ref(s)'`

#### github-kill-master.subOptions

> `readonly` **subOptions**: `object` = `{}`

#### github-kill-master.supportedScopes

> `readonly` **supportedScopes**: \[[`Unlimited`](../../../../configure/enumerations/DefaultGlobalScope.md#unlimited)\]

#### github-kill-master.taskAliases

> `readonly` **taskAliases**: \[\] = `[]`

#### github-kill-master.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

### github-pause-rulesets

> `readonly` **github-pause-rulesets**: `object`

#### github-pause-rulesets.actionDescription

> `readonly` **actionDescription**: `"Pausing ruleset protections for 5 minutes"`

#### github-pause-rulesets.conflicts

> `readonly` **conflicts**: `object`[]

##### Index Signature

\[`key`: `string`\]: `boolean`

#### github-pause-rulesets.emoji

> `readonly` **emoji**: `"🛸"` = `'🛸'`

#### github-pause-rulesets.longHelpDescription

> `readonly` **longHelpDescription**: "This renovation will temporarily deactivate all rulesets in the repository for 5 minutes, after which this command will reactivate them.\n\nUpon executing this renovation, you will be presented with a countdown until protections will be reactivated. You may press any key to immediately reactivate protections and exit the program.\n\nIf this renovation does not exit cleanly, re-running it (or --github-reconfigure-repo) will reactivate any erroneously disabled rulesets."

#### github-pause-rulesets.requiresForce

> `readonly` **requiresForce**: `false` = `false`

#### github-pause-rulesets.shortHelpDescription

> `readonly` **shortHelpDescription**: `"Temporarily deactivate origin repository ruleset protections"`

#### github-pause-rulesets.subOptions

> `readonly` **subOptions**: `object` = `{}`

#### github-pause-rulesets.supportedScopes

> `readonly` **supportedScopes**: \[[`Unlimited`](../../../../configure/enumerations/DefaultGlobalScope.md#unlimited)\]

#### github-pause-rulesets.taskAliases

> `readonly` **taskAliases**: \[\] = `[]`

#### github-pause-rulesets.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

### github-reconfigure-repo

> `readonly` **github-reconfigure-repo**: `object`

#### github-reconfigure-repo.actionDescription

> `readonly` **actionDescription**: `"Reconfiguring origin repository settings"` = `'Reconfiguring origin repository settings'`

#### github-reconfigure-repo.conflicts

> `readonly` **conflicts**: `object`[]

##### Index Signature

\[`key`: `string`\]: `boolean`

#### github-reconfigure-repo.emoji

> `readonly` **emoji**: `"🎚️"` = `'🎚️'`

#### github-reconfigure-repo.longHelpDescription

> `readonly` **longHelpDescription**: `` `This renovation will apply a standard configuration preset to the origin repository. Specifically, this renovation will:

- Update the repository's metadata
${string} - Set description to package.json::description only if not already set
${string}${string} - With default emoji prefix: ⚡
${string} - Set homepage to "https://npm.im/pkg-name" only if not already set
${string} - Enable ambient repository-wide secret scanning
${string} - Enable scanning pushes for secrets
${string} - Enable issues
${string} - Enable projects
${string} - Enable squash merging for pull requests
${string} - Disable normal merging for pull requests
${string} - Enable rebase merging for pull requests
${string} - Disable branch deletion on successful pull request merge
${string} - Enable suggesting forced-synchronization of pull request branches
${string} - Set topics to lowercased package.json::keywords
- Set the repository to "starred" by the current user
- Set the repository to "watched" (via "all activity") by the current user
- Create/enable the "standard-protect" and "canary-protect" rulesets
${string} - If the rulesets already exist and --force was given, they're deleted, recreated, then enabled
${string} - If the rulesets already exist and --force wasn't given, they're enabled
${string} - A warning is issued if any other ruleset is encountered
${string} - A warning is issued if a legacy "classic branch protection" setting is encountered for well-known branches
- Upload missing GitHub Actions environment secrets (encrypted)
${string} - Only secrets that do not already exist will be uploaded
${string} - If --force was given, all existing secrets will be deleted before the upload
${string} - Secrets will be sourced from the package and project .env files
${string}${string} - Empty/unset variables in .env files will be ignored

Due to the current limitations of GitHub's REST API, the following renovations are not able to be automated and should be configured manually:

- Include "Releases" and remove "Packages" and "Deployments" sidebar sections
- Enable sponsorships
- Enable repository preservation (arctic code vault)
- Enable discussions
- Enable "private vulnerability reporting"
- Enable "dependency graph"
- Enable "dependabot" (i.e. "dependabot alerts" and "dependabot security updates")

By default, this command will preserve the origin repository's pre-existing configuration. Run this command with --force to overwrite any pre-existing configuration EXCEPT the origin repository's description and homepage, which can never be overwritten by this renovation.` ``

#### github-reconfigure-repo.requiresForce

> `readonly` **requiresForce**: `false` = `false`

#### github-reconfigure-repo.shortHelpDescription

> `readonly` **shortHelpDescription**: `"(Re-)configure the origin GitHub repository settings"` = `'(Re-)configure the origin GitHub repository settings'`

#### github-reconfigure-repo.subOptions

> `readonly` **subOptions**: `object` = `{}`

#### github-reconfigure-repo.supportedScopes

> `readonly` **supportedScopes**: \[[`Unlimited`](../../../../configure/enumerations/DefaultGlobalScope.md#unlimited)\]

#### github-reconfigure-repo.taskAliases

> `readonly` **taskAliases**: \[\] = `[]`

#### github-reconfigure-repo.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

### github-rename-root

> `readonly` **github-rename-root**: `object`

#### github-rename-root.actionDescription

> `readonly` **actionDescription**: `"Updating origin repository name and relevant metadata"` = `'Updating origin repository name and relevant metadata'`

#### github-rename-root.conflicts

> `readonly` **conflicts**: `object`[]

##### Index Signature

\[`key`: `string`\]: `boolean`

#### github-rename-root.emoji

> `readonly` **emoji**: `"🧬"` = `'🧬'`

#### github-rename-root.longHelpDescription

> `readonly` **longHelpDescription**: "This renovation will:\n\n1. Rename the origin repository on GitHub.\n\n2. Update the origin repository's GitHub release names that are scoped to the old root package's name. If --force is given, all releases with old-style semver valid names (e.g. \"v1.2.3\") will be updated (to e.g. \"new-package-name@1.2.3\") as well.\n\n3. Update the name field in the root package's package.json file.\n\n4. Update the package.json::repository of all packages in the project.\n\n5. Update the origin remote url in \`.git/config\` if it matches the old origin url. If --force is given, the origin remote url will always be updated regardless of its value.\n\n6. In a hybridrepo or polyrepo, add new annotated tags with the updated root package name as respective aliases of tags with the old package name, and then push them to the origin repository. If --force is given, alias tags (e.g. \"new-package-name@1.2.3\") will be created for any existing tags with old-style semver valid names (e.g. \"v1.2.3\") as well.\n\n7. Rename (move) the repository directory on the local filesystem, if the repository name has changed. If the destination directory path already exists, this step will fail.\n\nIf any step fails, the renovation will abort immediately. Further, this command never deletes tags.\n\nTo create and recreate alias tags for existing release tags more generally, see the --generate-alias-tags renovation."

#### github-rename-root.requiresForce

> `readonly` **requiresForce**: `false` = `false`

#### github-rename-root.shortHelpDescription

> `readonly` **shortHelpDescription**: `"Rename the origin repo and root package, and update metadata"` = `'Rename the origin repo and root package, and update metadata'`

#### github-rename-root.subOptions

> `readonly` **subOptions**: `object`

#### github-rename-root.subOptions.new-repo-name

> `readonly` **new-repo-name**: `object`

#### github-rename-root.subOptions.new-repo-name.description

> `readonly` **description**: `"The repository's new name"` = `"The repository's new name"`

#### github-rename-root.subOptions.new-repo-name.string

> `readonly` **string**: `true` = `true`

#### github-rename-root.subOptions.new-repo-name.subOptionOf

> `readonly` **subOptionOf**: `object`

#### github-rename-root.subOptions.new-repo-name.subOptionOf.github-rename-root

> `readonly` **github-rename-root**: `object`

#### github-rename-root.subOptions.new-repo-name.subOptionOf.github-rename-root.when()

> `readonly` **when**: (`superOptionValue`) => `any`

##### Parameters

###### superOptionValue

`any`

##### Returns

`any`

#### github-rename-root.subOptions.new-repo-name.subOptionOf.github-rename-root.update()

##### Parameters

###### oldOptionConfig

`BfeBuilderObjectValueWithoutSubOptionOfExtension`\<`Record`\<`string`, `unknown`\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\>

##### Returns

`object`

###### alias?

> `optional` **alias**: `string` \| readonly `string`[]

string or array of strings, alias(es) for the canonical option key, see `alias()`

###### array?

> `optional` **array**: `boolean`

boolean, interpret option as an array, see `array()`

###### boolean?

> `optional` **boolean**: `boolean`

boolean, interpret option as a boolean flag, see `boolean()`

###### check?

> `optional` **check**: `BfeCheckFunction`\<`Record`\<`string`, `unknown`\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\> \| `BfeCheckFunction`\<`Record`\<..., ...\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\>[]

`check` is the declarative option-specific version of vanilla yargs's
`yargs::check()`. Also supports async and promise-returning functions.

This function receives the `currentArgumentValue`, which you are free to
type as you please, and the fully parsed `argv`. If this function throws,
the exception will bubble. If this function returns an instance of `Error`,
a string, or any non-truthy value (including `undefined` or not returning
anything), Black Flag will throw a `CliError` on your behalf.

You may also pass an array of check functions, each being executed after
the other. Note that providing an array of one or more async check
functions will result in them being awaited concurrently.

See [the
documentation](https://github.com/Xunnamius/black-flag-extensions?tab=readme-ov-file#check)
for details.

###### choices?

> `optional` **choices**: `Choices`

value or array of values, limit valid option arguments to a predefined set, see `choices()`

###### coerce()?

> `optional` **coerce**: (`arg`) => `any`

`coerce` transforms an original `argv` value into another one. This is
equivalent to `coerce` from vanilla yargs.

However, unlike vanilla yargs and Black Flag, the `coerce` function will
_always_ receive an array if the option was configured with `{ array: true
}`.

Note that **a defaulted argument will not result in this function being
called.** Only arguments given via `argv` trigger `coerce`. This is vanilla
yargs behavior.

###### Parameters

###### arg

`any`

###### Returns

`any`

###### config?

> `optional` **config**: `boolean`

boolean, interpret option as a path to a JSON config file, see `config()`

###### configParser()?

> `optional` **configParser**: (`configPath`) => `object`

function, provide a custom config parsing function, see `config()`

###### Parameters

###### configPath

`string`

###### Returns

`object`

###### conflicts?

> `optional` **conflicts**: `BfeBuilderObjectValueExtensionValue`

`conflicts` enables checks to ensure the specified arguments, or
argument-value pairs, are _never_ given conditioned on the existence of
another argument. For example:

```jsonc
{
  "x": { "conflicts": "y" }, // ◄ Disallows y if x is given
  "y": {}
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### count?

> `optional` **count**: `boolean`

boolean, interpret option as a count of boolean flags, see `count()`

###### default?

> `optional` **default**: `unknown`

`default` will set a default value for an argument. This is equivalent to
`default` from vanilla yargs.

However, unlike vanilla yargs and Black Flag, this default value is applied
towards the end of BFE's execution, enabling its use alongside keys like
`conflicts`. See [the
documentation](https://github.com/Xunnamius/black-flag-extensions?tab=readme-ov-file#support-for-default-with-conflictsrequiresetc)
for details.

Note also that a defaulted argument will not be coerced by the `coerce`
setting. Only arguments given via `argv` trigger `coerce`. This is vanilla
yargs behavior.

###### defaultDescription?

> `optional` **defaultDescription**: `string`

string, use this description for the default value in help content, see `default()`

###### demandThisOption

> **demandThisOption**: `true` = `true`

###### demandThisOptionIf?

> `optional` **demandThisOptionIf**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionIf` enables checks to ensure an argument is given when at
least one of the specified groups of arguments, or argument-value pairs, is
also given. For example:

```jsonc
{
  "x": {},
  "y": { "demandThisOptionIf": "x" }, // ◄ Demands y if x is given
  "z": { "demandThisOptionIf": "x" } // ◄ Demands z if x is given
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### demandThisOptionOr?

> `optional` **demandThisOptionOr**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionOr` enables non-optional inclusive disjunction checks per
group. Put another way, `demandThisOptionOr` enforces a "logical or"
relation within groups of required options. For example:

```jsonc
{
  "x": { "demandThisOptionOr": ["y", "z"] }, // ◄ Demands x or y or z
  "y": { "demandThisOptionOr": ["x", "z"] },
  "z": { "demandThisOptionOr": ["x", "y"] }
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### demandThisOptionXor?

> `optional` **demandThisOptionXor**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionXor` enables non-optional exclusive disjunction checks per
exclusivity group. Put another way, `demandThisOptionXor` enforces mutual
exclusivity within groups of required options. For example:

```jsonc
{
  // ▼ Disallows ∅, z, w, xy, xyw, xyz, xyzw
  "x": { "demandThisOptionXor": ["y"] },
  "y": { "demandThisOptionXor": ["x"] },
  // ▼ Disallows ∅, x, y, zw, xzw, yzw, xyzw
  "z": { "demandThisOptionXor": ["w"] },
  "w": { "demandThisOptionXor": ["z"] }
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### deprecate?

> `optional` **deprecate**: `string` \| `boolean`

boolean or string, mark the argument as deprecated, see `deprecateOption()`

###### deprecated?

> `optional` **deprecated**: `string` \| `boolean`

boolean or string, mark the argument as deprecated, see `deprecateOption()`

###### desc?

> `optional` **desc**: `string`

string, the option description for help content, see `describe()`

###### describe?

> `optional` **describe**: `string`

string, the option description for help content, see `describe()`

###### description?

> `optional` **description**: `string`

string, the option description for help content, see `describe()`

###### global?

> `optional` **global**: `boolean`

boolean, indicate that this key should not be reset when a command is invoked, see `global()`

###### group?

> `optional` **group**: `string`

string, when displaying usage instructions place the option under an alternative group heading, see `group()`

###### hidden?

> `optional` **hidden**: `boolean`

don't display option in help output.

###### implies?

> `optional` **implies**: `BfeBuilderObjectValueExtensionObject` \| `BfeBuilderObjectValueExtensionObject`[]

`implies` will set default values for the specified arguments conditioned
on the existence of another argument. These implied defaults will override
any `default` configurations of the specified arguments.

If any of the specified arguments are explicitly given on the command line,
their values must match the specified argument-value pairs respectively
(which is the behavior of `requires`/`conflicts`). Use `looseImplications`
to modify this behavior.

Hence, `implies` only accepts one or more argument-value pairs and not raw
strings. For example:

```jsonc
{
  "x": { "implies": { "y": true } }, // ◄ x is now synonymous with xy
  "y": {}
}
```

###### See

 - BfeBuilderObjectValueExtensions.looseImplications
 - BfeBuilderObjectValueExtensions.vacuousImplications

###### looseImplications?

> `optional` **looseImplications**: `boolean`

When `looseImplications` is set to `true`, any implied arguments, when
explicitly given on the command line, will _override_ their configured
implications instead of causing an error.

###### Default

```ts
false
```

###### See

BfeBuilderObjectValueExtensions.implies

###### nargs?

> `optional` **nargs**: `number`

number, specify how many arguments should be consumed for the option, see `nargs()`

###### normalize?

> `optional` **normalize**: `boolean`

boolean, apply path.normalize() to the option, see `normalize()`

###### number?

> `optional` **number**: `boolean`

boolean, interpret option as a number, `number()`

###### requires?

> `optional` **requires**: `BfeBuilderObjectValueExtensionValue`

`requires` enables checks to ensure the specified arguments, or
argument-value pairs, are given conditioned on the existence of another
argument. For example:

```jsonc
{
  "x": { "requires": "y" }, // ◄ Disallows x without y
  "y": {}
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### requiresArg?

> `optional` **requiresArg**: `boolean`

boolean, require the option be specified with a value, see `requiresArg()`

###### skipValidation?

> `optional` **skipValidation**: `boolean`

boolean, skips validation if the option is present, see `skipValidation()`

###### string?

> `optional` **string**: `boolean`

boolean, interpret option as a string, see `string()`

###### type?

> `optional` **type**: `"array"` \| `"count"` \| `PositionalOptionsType`

###### vacuousImplications?

> `optional` **vacuousImplications**: `boolean`

When `vacuousImplications` is set to `true` and the option is also
configured as a "boolean" type, the implications configured via `implies`
will still be applied to `argv` even if said option has a `false` value in
`argv`. In the same scenario except with `vacuousImplications` set to
`false`, the implications configured via `implies` are instead ignored.

###### Default

```ts
false
```

###### See

BfeBuilderObjectValueExtensions.implies

#### github-rename-root.subOptions.new-root-package-name

> `readonly` **new-root-package-name**: `object`

#### github-rename-root.subOptions.new-root-package-name.description

> `readonly` **description**: `"The root package's new name"` = `"The root package's new name"`

#### github-rename-root.subOptions.new-root-package-name.string

> `readonly` **string**: `true` = `true`

#### github-rename-root.subOptions.new-root-package-name.subOptionOf

> `readonly` **subOptionOf**: `object`

#### github-rename-root.subOptions.new-root-package-name.subOptionOf.github-rename-root

> `readonly` **github-rename-root**: `object`

#### github-rename-root.subOptions.new-root-package-name.subOptionOf.github-rename-root.when()

> `readonly` **when**: (`superOptionValue`) => `any`

##### Parameters

###### superOptionValue

`any`

##### Returns

`any`

#### github-rename-root.subOptions.new-root-package-name.subOptionOf.github-rename-root.update()

##### Parameters

###### oldOptionConfig

`BfeBuilderObjectValueWithoutSubOptionOfExtension`\<`Record`\<`string`, `unknown`\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\>

##### Returns

`object`

###### alias?

> `optional` **alias**: `string` \| readonly `string`[]

string or array of strings, alias(es) for the canonical option key, see `alias()`

###### array?

> `optional` **array**: `boolean`

boolean, interpret option as an array, see `array()`

###### boolean?

> `optional` **boolean**: `boolean`

boolean, interpret option as a boolean flag, see `boolean()`

###### check?

> `optional` **check**: `BfeCheckFunction`\<`Record`\<`string`, `unknown`\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\> \| `BfeCheckFunction`\<`Record`\<..., ...\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\>[]

`check` is the declarative option-specific version of vanilla yargs's
`yargs::check()`. Also supports async and promise-returning functions.

This function receives the `currentArgumentValue`, which you are free to
type as you please, and the fully parsed `argv`. If this function throws,
the exception will bubble. If this function returns an instance of `Error`,
a string, or any non-truthy value (including `undefined` or not returning
anything), Black Flag will throw a `CliError` on your behalf.

You may also pass an array of check functions, each being executed after
the other. Note that providing an array of one or more async check
functions will result in them being awaited concurrently.

See [the
documentation](https://github.com/Xunnamius/black-flag-extensions?tab=readme-ov-file#check)
for details.

###### choices?

> `optional` **choices**: `Choices`

value or array of values, limit valid option arguments to a predefined set, see `choices()`

###### coerce()?

> `optional` **coerce**: (`arg`) => `any`

`coerce` transforms an original `argv` value into another one. This is
equivalent to `coerce` from vanilla yargs.

However, unlike vanilla yargs and Black Flag, the `coerce` function will
_always_ receive an array if the option was configured with `{ array: true
}`.

Note that **a defaulted argument will not result in this function being
called.** Only arguments given via `argv` trigger `coerce`. This is vanilla
yargs behavior.

###### Parameters

###### arg

`any`

###### Returns

`any`

###### config?

> `optional` **config**: `boolean`

boolean, interpret option as a path to a JSON config file, see `config()`

###### configParser()?

> `optional` **configParser**: (`configPath`) => `object`

function, provide a custom config parsing function, see `config()`

###### Parameters

###### configPath

`string`

###### Returns

`object`

###### conflicts?

> `optional` **conflicts**: `BfeBuilderObjectValueExtensionValue`

`conflicts` enables checks to ensure the specified arguments, or
argument-value pairs, are _never_ given conditioned on the existence of
another argument. For example:

```jsonc
{
  "x": { "conflicts": "y" }, // ◄ Disallows y if x is given
  "y": {}
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### count?

> `optional` **count**: `boolean`

boolean, interpret option as a count of boolean flags, see `count()`

###### default?

> `optional` **default**: `unknown`

`default` will set a default value for an argument. This is equivalent to
`default` from vanilla yargs.

However, unlike vanilla yargs and Black Flag, this default value is applied
towards the end of BFE's execution, enabling its use alongside keys like
`conflicts`. See [the
documentation](https://github.com/Xunnamius/black-flag-extensions?tab=readme-ov-file#support-for-default-with-conflictsrequiresetc)
for details.

Note also that a defaulted argument will not be coerced by the `coerce`
setting. Only arguments given via `argv` trigger `coerce`. This is vanilla
yargs behavior.

###### defaultDescription?

> `optional` **defaultDescription**: `string`

string, use this description for the default value in help content, see `default()`

###### demandThisOption

> **demandThisOption**: `true` = `true`

###### demandThisOptionIf?

> `optional` **demandThisOptionIf**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionIf` enables checks to ensure an argument is given when at
least one of the specified groups of arguments, or argument-value pairs, is
also given. For example:

```jsonc
{
  "x": {},
  "y": { "demandThisOptionIf": "x" }, // ◄ Demands y if x is given
  "z": { "demandThisOptionIf": "x" } // ◄ Demands z if x is given
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### demandThisOptionOr?

> `optional` **demandThisOptionOr**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionOr` enables non-optional inclusive disjunction checks per
group. Put another way, `demandThisOptionOr` enforces a "logical or"
relation within groups of required options. For example:

```jsonc
{
  "x": { "demandThisOptionOr": ["y", "z"] }, // ◄ Demands x or y or z
  "y": { "demandThisOptionOr": ["x", "z"] },
  "z": { "demandThisOptionOr": ["x", "y"] }
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### demandThisOptionXor?

> `optional` **demandThisOptionXor**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionXor` enables non-optional exclusive disjunction checks per
exclusivity group. Put another way, `demandThisOptionXor` enforces mutual
exclusivity within groups of required options. For example:

```jsonc
{
  // ▼ Disallows ∅, z, w, xy, xyw, xyz, xyzw
  "x": { "demandThisOptionXor": ["y"] },
  "y": { "demandThisOptionXor": ["x"] },
  // ▼ Disallows ∅, x, y, zw, xzw, yzw, xyzw
  "z": { "demandThisOptionXor": ["w"] },
  "w": { "demandThisOptionXor": ["z"] }
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### deprecate?

> `optional` **deprecate**: `string` \| `boolean`

boolean or string, mark the argument as deprecated, see `deprecateOption()`

###### deprecated?

> `optional` **deprecated**: `string` \| `boolean`

boolean or string, mark the argument as deprecated, see `deprecateOption()`

###### desc?

> `optional` **desc**: `string`

string, the option description for help content, see `describe()`

###### describe?

> `optional` **describe**: `string`

string, the option description for help content, see `describe()`

###### description?

> `optional` **description**: `string`

string, the option description for help content, see `describe()`

###### global?

> `optional` **global**: `boolean`

boolean, indicate that this key should not be reset when a command is invoked, see `global()`

###### group?

> `optional` **group**: `string`

string, when displaying usage instructions place the option under an alternative group heading, see `group()`

###### hidden?

> `optional` **hidden**: `boolean`

don't display option in help output.

###### implies?

> `optional` **implies**: `BfeBuilderObjectValueExtensionObject` \| `BfeBuilderObjectValueExtensionObject`[]

`implies` will set default values for the specified arguments conditioned
on the existence of another argument. These implied defaults will override
any `default` configurations of the specified arguments.

If any of the specified arguments are explicitly given on the command line,
their values must match the specified argument-value pairs respectively
(which is the behavior of `requires`/`conflicts`). Use `looseImplications`
to modify this behavior.

Hence, `implies` only accepts one or more argument-value pairs and not raw
strings. For example:

```jsonc
{
  "x": { "implies": { "y": true } }, // ◄ x is now synonymous with xy
  "y": {}
}
```

###### See

 - BfeBuilderObjectValueExtensions.looseImplications
 - BfeBuilderObjectValueExtensions.vacuousImplications

###### looseImplications?

> `optional` **looseImplications**: `boolean`

When `looseImplications` is set to `true`, any implied arguments, when
explicitly given on the command line, will _override_ their configured
implications instead of causing an error.

###### Default

```ts
false
```

###### See

BfeBuilderObjectValueExtensions.implies

###### nargs?

> `optional` **nargs**: `number`

number, specify how many arguments should be consumed for the option, see `nargs()`

###### normalize?

> `optional` **normalize**: `boolean`

boolean, apply path.normalize() to the option, see `normalize()`

###### number?

> `optional` **number**: `boolean`

boolean, interpret option as a number, `number()`

###### requires?

> `optional` **requires**: `BfeBuilderObjectValueExtensionValue`

`requires` enables checks to ensure the specified arguments, or
argument-value pairs, are given conditioned on the existence of another
argument. For example:

```jsonc
{
  "x": { "requires": "y" }, // ◄ Disallows x without y
  "y": {}
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### requiresArg?

> `optional` **requiresArg**: `boolean`

boolean, require the option be specified with a value, see `requiresArg()`

###### skipValidation?

> `optional` **skipValidation**: `boolean`

boolean, skips validation if the option is present, see `skipValidation()`

###### string?

> `optional` **string**: `boolean`

boolean, interpret option as a string, see `string()`

###### type?

> `optional` **type**: `"array"` \| `"count"` \| `PositionalOptionsType`

###### vacuousImplications?

> `optional` **vacuousImplications**: `boolean`

When `vacuousImplications` is set to `true` and the option is also
configured as a "boolean" type, the implications configured via `implies`
will still be applied to `argv` even if said option has a `false` value in
`argv`. In the same scenario except with `vacuousImplications` set to
`false`, the implications configured via `implies` are instead ignored.

###### Default

```ts
false
```

###### See

BfeBuilderObjectValueExtensions.implies

#### github-rename-root.supportedScopes

> `readonly` **supportedScopes**: \[[`Unlimited`](../../../../configure/enumerations/DefaultGlobalScope.md#unlimited)\]

#### github-rename-root.taskAliases

> `readonly` **taskAliases**: \[\] = `[]`

#### github-rename-root.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

### regenerate-assets

> `readonly` **regenerate-assets**: `object`

#### regenerate-assets.actionDescription

> `readonly` **actionDescription**: `"Regenerating targeted configuration and template assets"` = `'Regenerating targeted configuration and template assets'`

#### regenerate-assets.conflicts

> `readonly` **conflicts**: \[`"synchronize-interdependencies"`, `"full-deprecate"`, `"full-undeprecate"`, `"github-rename-root"`, `"github-clone-remote-wiki"`\]

#### regenerate-assets.emoji

> `readonly` **emoji**: `"♻️"` = `'♻️'`

#### regenerate-assets.implies

> `readonly` **implies**: `object`

#### regenerate-assets.implies.hush

> `readonly` **hush**: `true` = `true`

#### regenerate-assets.longHelpDescription

> `readonly` **longHelpDescription**: `` `
This renovation will regenerate one or more files in the project, each represented by an "asset". An asset is a collection mapping output paths to generated content. When writing out content to an output path, existing files are overwritten, missing files are created, and obsolete files are deleted.

Provide --assets-preset to specify which assets to regenerate. Note that, in a monorepo context, this preset is applied "generally" across the entire project; heuristic analysis is used to determine which preset to apply per sub-package (see symbiote wiki for more details). The parameter accepts one of the following presets: ${string}. The paths of assets included in the preset will be targeted for renovation with respect to --exclude-asset-paths and --include-asset-paths/--only-aliases, if provided.

Use either --exclude-asset-paths or --include-asset-paths to further narrow which files are regenerated. These parameters accept regular expressions that are matched against paths (relative to the project root) to be written out. Any paths matching one of the regular expressions provided by --exclude-asset-paths, or not matching one of the regular expressions provided by --include-asset-paths, will have their contents discarded instead of written out. Providing both --exclude-asset-paths and --include-asset-paths in the same command will cause an error.

This renovation attempts to import the "alias.config.mjs" file if it exists at the root of the project. Use this file to provide additional `RawAliasMapping[]`s to include when regenerating files defining the project's import aliases. See the symbiote wiki documentation for further details.

When renovating Markdown files with templates divided into replacer regions via the magic comments "${string}" and "<!-- symbiote-template-region-end -->", this command will perform so-called "regional replacements" where only the content between the "start" and "end" comments will be modified. Regions without matching ids are ignored.

When regional replacements are performed, matching non-numeric reference definitions will be overwritten respectively, and new definitions will be appended. However, when attempting to renovate a Markdown file and either (1) it does not have replacer regions when its corresponding template contains replacer regions or (2) --force is used, the entire file will be overwritten instead.

Note that only certain Markdown files support regional replacements. See the symbiote wiki documentation for more details.

After invoking this renovation, you should use your IDE's diff tools to compare and contrast the latest best practices with the project's current configuration setup.

This renovation should be re-run each time a package is added to, or removed from, a symbiote-compliant monorepo but should NEVER be run in a CI environment or anywhere logs can be viewed publicly. Project compliant with symbiote can use the "renovate:aliases" NPM script.

See the symbiote wiki documentation for more details on this command and all available assets.
` ``

#### regenerate-assets.requiresForce

> `readonly` **requiresForce**: `false` = `false`

#### regenerate-assets.shortHelpDescription

> `readonly` **shortHelpDescription**: `"Regenerate targeted configuration and template asset files"` = `'Regenerate targeted configuration and template asset files'`

#### regenerate-assets.subOptions

> `readonly` **subOptions**: `object`

#### regenerate-assets.subOptions.assets-preset

> `readonly` **assets-preset**: `object`

#### regenerate-assets.subOptions.assets-preset.alias

> `readonly` **alias**: `"preset"` = `'preset'`

#### regenerate-assets.subOptions.assets-preset.choices

> `readonly` **choices**: [`AssetPreset`](../../../../assets/enumerations/AssetPreset.md)[] = `assetPresets`

#### regenerate-assets.subOptions.assets-preset.description

> `readonly` **description**: `"Select a set of assets to target for regeneration"` = `'Select a set of assets to target for regeneration'`

#### regenerate-assets.subOptions.assets-preset.subOptionOf

> `readonly` **subOptionOf**: `object`

#### regenerate-assets.subOptions.assets-preset.subOptionOf.regenerate-assets

> `readonly` **regenerate-assets**: `object`

#### regenerate-assets.subOptions.assets-preset.subOptionOf.regenerate-assets.when()

> `readonly` **when**: (`superOptionValue`) => `any`

##### Parameters

###### superOptionValue

`any`

##### Returns

`any`

#### regenerate-assets.subOptions.assets-preset.subOptionOf.regenerate-assets.update()

##### Parameters

###### oldOptionConfig

`BfeBuilderObjectValueWithoutSubOptionOfExtension`\<`Record`\<`string`, `unknown`\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\>

##### Returns

`object`

###### alias?

> `optional` **alias**: `string` \| readonly `string`[]

string or array of strings, alias(es) for the canonical option key, see `alias()`

###### array?

> `optional` **array**: `boolean`

boolean, interpret option as an array, see `array()`

###### boolean?

> `optional` **boolean**: `boolean`

boolean, interpret option as a boolean flag, see `boolean()`

###### check?

> `optional` **check**: `BfeCheckFunction`\<`Record`\<`string`, `unknown`\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\> \| `BfeCheckFunction`\<`Record`\<..., ...\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\>[]

`check` is the declarative option-specific version of vanilla yargs's
`yargs::check()`. Also supports async and promise-returning functions.

This function receives the `currentArgumentValue`, which you are free to
type as you please, and the fully parsed `argv`. If this function throws,
the exception will bubble. If this function returns an instance of `Error`,
a string, or any non-truthy value (including `undefined` or not returning
anything), Black Flag will throw a `CliError` on your behalf.

You may also pass an array of check functions, each being executed after
the other. Note that providing an array of one or more async check
functions will result in them being awaited concurrently.

See [the
documentation](https://github.com/Xunnamius/black-flag-extensions?tab=readme-ov-file#check)
for details.

###### choices?

> `optional` **choices**: `Choices`

value or array of values, limit valid option arguments to a predefined set, see `choices()`

###### coerce()?

> `optional` **coerce**: (`arg`) => `any`

`coerce` transforms an original `argv` value into another one. This is
equivalent to `coerce` from vanilla yargs.

However, unlike vanilla yargs and Black Flag, the `coerce` function will
_always_ receive an array if the option was configured with `{ array: true
}`.

Note that **a defaulted argument will not result in this function being
called.** Only arguments given via `argv` trigger `coerce`. This is vanilla
yargs behavior.

###### Parameters

###### arg

`any`

###### Returns

`any`

###### config?

> `optional` **config**: `boolean`

boolean, interpret option as a path to a JSON config file, see `config()`

###### configParser()?

> `optional` **configParser**: (`configPath`) => `object`

function, provide a custom config parsing function, see `config()`

###### Parameters

###### configPath

`string`

###### Returns

`object`

###### conflicts?

> `optional` **conflicts**: `BfeBuilderObjectValueExtensionValue`

`conflicts` enables checks to ensure the specified arguments, or
argument-value pairs, are _never_ given conditioned on the existence of
another argument. For example:

```jsonc
{
  "x": { "conflicts": "y" }, // ◄ Disallows y if x is given
  "y": {}
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### count?

> `optional` **count**: `boolean`

boolean, interpret option as a count of boolean flags, see `count()`

###### default?

> `optional` **default**: `unknown`

`default` will set a default value for an argument. This is equivalent to
`default` from vanilla yargs.

However, unlike vanilla yargs and Black Flag, this default value is applied
towards the end of BFE's execution, enabling its use alongside keys like
`conflicts`. See [the
documentation](https://github.com/Xunnamius/black-flag-extensions?tab=readme-ov-file#support-for-default-with-conflictsrequiresetc)
for details.

Note also that a defaulted argument will not be coerced by the `coerce`
setting. Only arguments given via `argv` trigger `coerce`. This is vanilla
yargs behavior.

###### defaultDescription?

> `optional` **defaultDescription**: `string`

string, use this description for the default value in help content, see `default()`

###### demandThisOption

> **demandThisOption**: `true` = `true`

###### demandThisOptionIf?

> `optional` **demandThisOptionIf**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionIf` enables checks to ensure an argument is given when at
least one of the specified groups of arguments, or argument-value pairs, is
also given. For example:

```jsonc
{
  "x": {},
  "y": { "demandThisOptionIf": "x" }, // ◄ Demands y if x is given
  "z": { "demandThisOptionIf": "x" } // ◄ Demands z if x is given
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### demandThisOptionOr?

> `optional` **demandThisOptionOr**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionOr` enables non-optional inclusive disjunction checks per
group. Put another way, `demandThisOptionOr` enforces a "logical or"
relation within groups of required options. For example:

```jsonc
{
  "x": { "demandThisOptionOr": ["y", "z"] }, // ◄ Demands x or y or z
  "y": { "demandThisOptionOr": ["x", "z"] },
  "z": { "demandThisOptionOr": ["x", "y"] }
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### demandThisOptionXor?

> `optional` **demandThisOptionXor**: `BfeBuilderObjectValueExtensionValue`

`demandThisOptionXor` enables non-optional exclusive disjunction checks per
exclusivity group. Put another way, `demandThisOptionXor` enforces mutual
exclusivity within groups of required options. For example:

```jsonc
{
  // ▼ Disallows ∅, z, w, xy, xyw, xyz, xyzw
  "x": { "demandThisOptionXor": ["y"] },
  "y": { "demandThisOptionXor": ["x"] },
  // ▼ Disallows ∅, x, y, zw, xzw, yzw, xyzw
  "z": { "demandThisOptionXor": ["w"] },
  "w": { "demandThisOptionXor": ["z"] }
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### deprecate?

> `optional` **deprecate**: `string` \| `boolean`

boolean or string, mark the argument as deprecated, see `deprecateOption()`

###### deprecated?

> `optional` **deprecated**: `string` \| `boolean`

boolean or string, mark the argument as deprecated, see `deprecateOption()`

###### desc?

> `optional` **desc**: `string`

string, the option description for help content, see `describe()`

###### describe?

> `optional` **describe**: `string`

string, the option description for help content, see `describe()`

###### description?

> `optional` **description**: `string`

string, the option description for help content, see `describe()`

###### global?

> `optional` **global**: `boolean`

boolean, indicate that this key should not be reset when a command is invoked, see `global()`

###### group?

> `optional` **group**: `string`

string, when displaying usage instructions place the option under an alternative group heading, see `group()`

###### hidden?

> `optional` **hidden**: `boolean`

don't display option in help output.

###### implies?

> `optional` **implies**: `BfeBuilderObjectValueExtensionObject` \| `BfeBuilderObjectValueExtensionObject`[]

`implies` will set default values for the specified arguments conditioned
on the existence of another argument. These implied defaults will override
any `default` configurations of the specified arguments.

If any of the specified arguments are explicitly given on the command line,
their values must match the specified argument-value pairs respectively
(which is the behavior of `requires`/`conflicts`). Use `looseImplications`
to modify this behavior.

Hence, `implies` only accepts one or more argument-value pairs and not raw
strings. For example:

```jsonc
{
  "x": { "implies": { "y": true } }, // ◄ x is now synonymous with xy
  "y": {}
}
```

###### See

 - BfeBuilderObjectValueExtensions.looseImplications
 - BfeBuilderObjectValueExtensions.vacuousImplications

###### looseImplications?

> `optional` **looseImplications**: `boolean`

When `looseImplications` is set to `true`, any implied arguments, when
explicitly given on the command line, will _override_ their configured
implications instead of causing an error.

###### Default

```ts
false
```

###### See

BfeBuilderObjectValueExtensions.implies

###### nargs?

> `optional` **nargs**: `number`

number, specify how many arguments should be consumed for the option, see `nargs()`

###### normalize?

> `optional` **normalize**: `boolean`

boolean, apply path.normalize() to the option, see `normalize()`

###### number?

> `optional` **number**: `boolean`

boolean, interpret option as a number, `number()`

###### requires?

> `optional` **requires**: `BfeBuilderObjectValueExtensionValue`

`requires` enables checks to ensure the specified arguments, or
argument-value pairs, are given conditioned on the existence of another
argument. For example:

```jsonc
{
  "x": { "requires": "y" }, // ◄ Disallows x without y
  "y": {}
}
```

Note: if an argument-value pair is specified and said argument is
configured as an array (`{ array: true }`), it will be searched for the
specified value. Otherwise, a strict deep equality check is performed.

###### requiresArg?

> `optional` **requiresArg**: `boolean`

boolean, require the option be specified with a value, see `requiresArg()`

###### skipValidation?

> `optional` **skipValidation**: `boolean`

boolean, skips validation if the option is present, see `skipValidation()`

###### string?

> `optional` **string**: `boolean`

boolean, interpret option as a string, see `string()`

###### type?

> `optional` **type**: `"array"` \| `"count"` \| `PositionalOptionsType`

###### vacuousImplications?

> `optional` **vacuousImplications**: `boolean`

When `vacuousImplications` is set to `true` and the option is also
configured as a "boolean" type, the implications configured via `implies`
will still be applied to `argv` even if said option has a `false` value in
`argv`. In the same scenario except with `vacuousImplications` set to
`false`, the implications configured via `implies` are instead ignored.

###### Default

```ts
false
```

###### See

BfeBuilderObjectValueExtensions.implies

#### regenerate-assets.subOptions.exclude-asset-paths

> `readonly` **exclude-asset-paths**: `object`

#### regenerate-assets.subOptions.exclude-asset-paths.alias

> `readonly` **alias**: readonly \[`"exclude-asset-path"`, `"exclude"`, `"skip"`\]

#### regenerate-assets.subOptions.exclude-asset-paths.array

> `readonly` **array**: `true` = `true`

#### regenerate-assets.subOptions.exclude-asset-paths.conflicts

> `readonly` **conflicts**: \[`"include-asset-paths"`, `"only-aliases"`\]

#### regenerate-assets.subOptions.exclude-asset-paths.default

> `readonly` **default**: readonly \[\] = `[]`

#### regenerate-assets.subOptions.exclude-asset-paths.description

> `readonly` **description**: `"Skip regenerating assets matching a regular expression"` = `'Skip regenerating assets matching a regular expression'`

#### regenerate-assets.subOptions.exclude-asset-paths.implies

> `readonly` **implies**: `object`

#### regenerate-assets.subOptions.exclude-asset-paths.implies.hush

> `readonly` **hush**: `false` = `false`

#### regenerate-assets.subOptions.exclude-asset-paths.looseImplications

> `readonly` **looseImplications**: `true` = `true`

#### regenerate-assets.subOptions.exclude-asset-paths.string

> `readonly` **string**: `true` = `true`

#### regenerate-assets.subOptions.exclude-asset-paths.coerce()

##### Parameters

###### paths

`string`[]

##### Returns

`RegExp`[]

#### regenerate-assets.subOptions.include-asset-paths

> `readonly` **include-asset-paths**: `object`

#### regenerate-assets.subOptions.include-asset-paths.alias

> `readonly` **alias**: readonly \[`"include-asset-path"`, `"include"`, `"only"`\]

#### regenerate-assets.subOptions.include-asset-paths.array

> `readonly` **array**: `true` = `true`

#### regenerate-assets.subOptions.include-asset-paths.conflicts

> `readonly` **conflicts**: \[`"exclude-asset-paths"`, `"only-aliases"`\]

#### regenerate-assets.subOptions.include-asset-paths.default

> `readonly` **default**: readonly \[\] = `[]`

#### regenerate-assets.subOptions.include-asset-paths.description

> `readonly` **description**: `"Only regenerate assets matching a regular expression"` = `'Only regenerate assets matching a regular expression'`

#### regenerate-assets.subOptions.include-asset-paths.implies

> `readonly` **implies**: `object`

#### regenerate-assets.subOptions.include-asset-paths.implies.hush

> `readonly` **hush**: `false` = `false`

#### regenerate-assets.subOptions.include-asset-paths.looseImplications

> `readonly` **looseImplications**: `true` = `true`

#### regenerate-assets.subOptions.include-asset-paths.string

> `readonly` **string**: `true` = `true`

#### regenerate-assets.subOptions.include-asset-paths.coerce()

##### Parameters

###### paths

`string`[]

##### Returns

`RegExp`[]

#### regenerate-assets.subOptions.only-aliases

> `readonly` **only-aliases**: `object`

#### regenerate-assets.subOptions.only-aliases.boolean

> `readonly` **boolean**: `true` = `true`

#### regenerate-assets.subOptions.only-aliases.conflicts

> `readonly` **conflicts**: \[`"include-asset-paths"`, `"exclude-asset-paths"`\]

#### regenerate-assets.subOptions.only-aliases.default

> `readonly` **default**: `false` = `false`

#### regenerate-assets.subOptions.only-aliases.description

> `readonly` **description**: `"Only regenerate assets containing aliases"` = `'Only regenerate assets containing aliases'`

#### regenerate-assets.subOptions.only-aliases.implies

> `readonly` **implies**: `object`

#### regenerate-assets.subOptions.only-aliases.implies.hush

> `readonly` **hush**: `false` = `false`

#### regenerate-assets.subOptions.only-aliases.looseImplications

> `readonly` **looseImplications**: `true` = `true`

#### regenerate-assets.supportedScopes

> `readonly` **supportedScopes**: \[[`Unlimited`](../../../../configure/enumerations/DefaultGlobalScope.md#unlimited)\]

#### regenerate-assets.taskAliases

> `readonly` **taskAliases**: \[\] = `[]`

#### regenerate-assets.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

### synchronize-interdependencies

> `readonly` **synchronize-interdependencies**: `object`

#### synchronize-interdependencies.actionDescription

> `readonly` **actionDescription**: `"Synchronizing package interdependencies"` = `'Synchronizing package interdependencies'`

#### synchronize-interdependencies.conflicts

> `readonly` **conflicts**: \[`"full-deprecate"`, `"full-undeprecate"`, `"github-rename-root"`\]

#### synchronize-interdependencies.emoji

> `readonly` **emoji**: `"🔗"` = `'🔗'`

#### synchronize-interdependencies.longHelpDescription

> `readonly` **longHelpDescription**: "This renovation will analyze dependencies in one or more package.json files (depending on --scope), select dependencies in those files that match a package name in this project, and update those dependencies' ranges to match their respective package versions as they are in the project. This is useful in monorepos with published packages that rely on other published packages in the same repo. This renovation ensures a package released from this project will always install the latest version of the other packages released from this project.\n\nIf this repository is a polyrepo, this renovation is essentially a no-op." = `"This renovation will analyze dependencies in one or more package.json files (depending on --scope), select dependencies in those files that match a package name in this project, and update those dependencies' ranges to match their respective package versions as they are in the project. This is useful in monorepos with published packages that rely on other published packages in the same repo. This renovation ensures a package released from this project will always install the latest version of the other packages released from this project.\n\nIf this repository is a polyrepo, this renovation is essentially a no-op."`

#### synchronize-interdependencies.requiresForce

> `readonly` **requiresForce**: `false` = `false`

#### synchronize-interdependencies.shortHelpDescription

> `readonly` **shortHelpDescription**: `"Update package.json dependencies to match their monorepo versions"` = `'Update package.json dependencies to match their monorepo versions'`

#### synchronize-interdependencies.subOptions

> `readonly` **subOptions**: `object` = `{}`

#### synchronize-interdependencies.supportedScopes

> `readonly` **supportedScopes**: [`DefaultGlobalScope`](../../../../configure/enumerations/DefaultGlobalScope.md)[] = `projectRenovateScopes`

#### synchronize-interdependencies.taskAliases

> `readonly` **taskAliases**: \[`"sync-deps"`\]

#### synchronize-interdependencies.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

### update-dependencies

> `readonly` **update-dependencies**: `object`

#### update-dependencies.actionDescription

> `readonly` **actionDescription**: `"Launching interactive dependency check for latest versions"` = `'Launching interactive dependency check for latest versions'`

#### update-dependencies.check

> `readonly` **check**: `undefined` \| `BfeCheckFunction`\<`Record`\<`string`, `unknown`\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\> \| `BfeCheckFunction`\<`Record`\<`string`, `unknown`\>, [`GlobalExecutionContext`](../../../../configure/type-aliases/GlobalExecutionContext.md)\>[]

#### update-dependencies.emoji

> `readonly` **emoji**: `"⚕️"` = `'⚕️'`

#### update-dependencies.longHelpDescription

> `readonly` **longHelpDescription**: "This renovation allows the user to interactively select and update dependencies in package.json files belong to packages across the entire project (depending on --scope). Each updated dependency will generate either a chore-type commit (for package.json::devDependency updates) or a build-type commit (for any other kind of dependency in package.json) with a short simple commit message tailored to the dependency being updated. Afterwards, \"npm install --force\" will be executed and the resulting package-lock.json committed." = `'This renovation allows the user to interactively select and update dependencies in package.json files belong to packages across the entire project (depending on --scope). Each updated dependency will generate either a chore-type commit (for package.json::devDependency updates) or a build-type commit (for any other kind of dependency in package.json) with a short simple commit message tailored to the dependency being updated. Afterwards, "npm install --force" will be executed and the resulting package-lock.json committed.'`

#### update-dependencies.requiresForce

> `readonly` **requiresForce**: `false` = `false`

#### update-dependencies.shortHelpDescription

> `readonly` **shortHelpDescription**: `"Interactively update dependencies in package.json"` = `'Interactively update dependencies in package.json'`

#### update-dependencies.subOptions

> `readonly` **subOptions**: `object` = `{}`

#### update-dependencies.supportedScopes

> `readonly` **supportedScopes**: [`DefaultGlobalScope`](../../../../configure/enumerations/DefaultGlobalScope.md)[] = `projectRenovateScopes`

#### update-dependencies.taskAliases

> `readonly` **taskAliases**: \[\] = `[]`

#### update-dependencies.run()

##### Parameters

###### argv\_

`unknown`

###### \_\_namedParameters

[`RenovationTaskContext`](../type-aliases/RenovationTaskContext.md)

##### Returns

`Promise`\<`undefined`\>

## See

RenovationTask
