[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_package.json](../README.md) / generateHybridrepoProjectXPackageJson

# Function: generateHybridrepoProjectXPackageJson()

> **generateHybridrepoProjectXPackageJson**(...`__namedParameters`): `object`

Defined in: [src/assets/transformers/\_package.json.ts:269](https://github.com/Xunnamius/symbiote/blob/02e289a9c890d4a9fb9b9f17fa7e8731f4ab9d2b/src/assets/transformers/_package.json.ts#L269)

## Parameters

### \_\_namedParameters

...[`GeneratorParameters`](../type-aliases/GeneratorParameters.md)

## Returns

`object`

### author

> `readonly` **author**: `Person`

### bin?

> `optional` **bin**: `string` \| `Record`\<`string`, `string`\>

### browser?

> `optional` **browser**: `string` \| `Partial`\<`Record`\<`string`, `string` \| `false`\>\>

A hint to JavaScript bundlers or component tools when packaging modules for client side use.

### bugs

> `readonly` **bugs**: `object`

#### bugs.url

> `readonly` **url**: `` `${string}/issues` ``

### bundledDependencies?

> `optional` **bundledDependencies**: `string`[]

Package names that are bundled when the package is published.

### bundleDependencies?

> `optional` **bundleDependencies**: `string`[]

Alias of `bundledDependencies`.

### config?

> `optional` **config**: `JsonObject`

Is used to set configuration parameters used in package scripts that persist across upgrades.

### contributors?

> `optional` **contributors**: `Person`[]

A list of people who contributed to the package.

### cpu?

> `optional` **cpu**: `LiteralUnion`\<`"arm"` \| `"arm64"` \| `"ia32"` \| `"mips"` \| `"mipsel"` \| `"ppc"` \| `"ppc64"` \| `"s390"` \| `"s390x"` \| `"x32"` \| `"x64"` \| `"!arm"` \| `"!arm64"` \| `"!ia32"` \| `"!mips"` \| `"!mipsel"` \| `"!ppc"` \| `"!ppc64"` \| `"!s390"` \| `"!s390x"` \| `"!x32"` \| `"!x64"`, `string`\>[]

CPU architectures the module runs on.

### dependencies

> `readonly` **dependencies**: `Partial`\<`Record`\<`string`, `string`\>\>

### description

> `readonly` **description**: `string` = `incomingPackageJson.description`

### devDependencies

> `readonly` **devDependencies**: `Partial`\<`Record`\<`string`, `string`\>\>

### directories?

> `optional` **directories**: `DirectoryLocations`

Indicates the structure of the package.

### engines

> `readonly` **engines**: `object`

#### Index Signature

\[`key`: `string`\]: `undefined` \| `string`

### ~~engineStrict?~~

> `optional` **engineStrict**: `boolean`

#### Deprecated

### esnext?

> `optional` **esnext**: `string` \| \{ `[moduleName: string]`: `undefined` \| `string`;  `browser`: `string`; `main`: `string`; \}

A module ID with untranspiled code that is the primary entry point to the program.

### exports

> `readonly` **exports**: `string` \| (`string` \| `ExportConditions`)[] \| `ExportConditions` \| \{ `.`: \{ `default`: `string`; `types`: `string`; \}; `./commands/*`: \{ `default`: `string`; `types`: `string`; \}; `./configure`: \{ `default`: `string`; `types`: `string`; \}; `./package`: `string`; `./package.json`: `string`; \} \| \{ `.`: \{ `default`: `string`; `types`: `string`; \}; `./package`: `string`; `./package.json`: `string`; \}

### files

> `readonly` **files**: `string`[]

### flat?

> `optional` **flat**: `boolean`

If your package only allows one version of a given dependency, and you’d like to enforce the same behavior as `yarn install --flat` on the command-line, set this to `true`.

Note that if your `package.json` contains `"flat": true` and other packages depend on yours (e.g. you are building a library rather than an app), those other packages will also need `"flat": true` in their `package.json` or be installed with `yarn install --flat` on the command-line.

### funding?

> `optional` **funding**: `string` \| \{ `type`: `LiteralUnion`\<`"github"` \| `"opencollective"` \| `"patreon"` \| `"individual"` \| `"foundation"` \| `"corporation"`, `string`\>; `url`: `string`; \}

Describes and notifies consumers of a package's monetary support information.

[Read more.](https://github.com/npm/rfcs/blob/latest/accepted/0017-add-funding-support.md)

#### Type declaration

`string`

\{ `type`: `LiteralUnion`\<`"github"` \| `"opencollective"` \| `"patreon"` \| `"individual"` \| `"foundation"` \| `"corporation"`, `string`\>; `url`: `string`; \}

### homepage

> `readonly` **homepage**: `` `${string}${string}#readme` ``

### imports?

> `optional` **imports**: `Imports`

Subpath imports to define internal package import maps that only apply to import specifiers from within the package itself.

[Read more.](https://nodejs.org/api/packages.html#subpath-imports)

### jspm?

> `optional` **jspm**: `PackageJson`

JSPM configuration.

### keywords

> `readonly` **keywords**: `string`[]

### license

> `readonly` **license**: `string`

### licenses?

> `optional` **licenses**: `object`[]

The licenses for the package.

### main?

> `optional` **main**: `string`

The module ID that is the primary entry point to the program.

### maintainers?

> `optional` **maintainers**: `Person`[]

A list of people who maintain the package.

### man?

> `optional` **man**: `string` \| `string`[]

Filenames to put in place for the `man` program to find.

### module?

> `optional` **module**: `string`

An ECMAScript module ID that is the primary entry point to the program.

### name

> `readonly` **name**: `string` = `incomingPackageJson.name`

### optionalDependencies?

> `optional` **optionalDependencies**: `Partial`\<`Record`\<`string`, `string`\>\>

Dependencies that are skipped if they fail to install.

### os?

> `optional` **os**: `LiteralUnion`\<`"aix"` \| `"darwin"` \| `"freebsd"` \| `"linux"` \| `"openbsd"` \| `"sunos"` \| `"win32"` \| `"!aix"` \| `"!darwin"` \| `"!freebsd"` \| `"!linux"` \| `"!openbsd"` \| `"!sunos"` \| `"!win32"`, `string`\>[]

Operating systems the module runs on.

### packageManager?

> `optional` **packageManager**: `string`

Defines which package manager is expected to be used when working on the current project. It can set to any of the [supported package managers](https://nodejs.org/api/corepack.html#supported-package-managers), and will ensure that your teams use the exact same package manager versions without having to install anything else than Node.js.

__This field is currently experimental and needs to be opted-in; check the [Corepack](https://nodejs.org/api/corepack.html) page for details about the procedure.__

#### Example

```json
{
	"packageManager": "<package manager name>@<version>"
}
```

### peerDependencies?

> `optional` **peerDependencies**: `Partial`\<`Record`\<`string`, `string`\>\>

Dependencies that will usually be required by the package user directly or via another dependency.

### peerDependenciesMeta?

> `optional` **peerDependenciesMeta**: `Partial`\<`Record`\<`string`, \{ `optional`: `true`; \}\>\>

Indicate peer dependencies that are optional.

### ~~preferGlobal?~~

> `optional` **preferGlobal**: `boolean`

If set to `true`, a warning will be shown if package is installed locally. Useful if the package is primarily a command-line application that should be installed globally.

#### Deprecated

### private?

> `readonly` `optional` **private**: `boolean`

If set to `true`, then npm will refuse to publish it.

### publishConfig

> `readonly` **publishConfig**: `object`

#### publishConfig.access

> **access**: `"public"` \| `"restricted"` = `'public'`

When publishing scoped packages, the access level defaults to restricted. If you want your scoped package to be publicly viewable (and installable) set `--access=public`. The only valid values for access are public and restricted. Unscoped packages always have an access level of public.

#### publishConfig.registry

> **registry**: `string` = `'https://registry.npmjs.org'`

The base URL of the npm registry.

Default: `'https://registry.npmjs.org/'`

#### publishConfig.tag?

> `readonly` `optional` **tag**: `string`

The tag to publish the package under.

Default: `'latest'`

### repository

> `readonly` **repository**: `object`

#### repository.type

> **type**: `string` = `'git'`

#### repository.url

> **url**: `string`

### resolutions?

> `optional` **resolutions**: `Partial`\<`Record`\<`string`, `string`\>\>

Selective version resolutions. Allows the definition of custom package versions inside dependencies without manual edits in the `yarn.lock` file.

### scripts

> `readonly` **scripts**: `object`

#### scripts.build

> **build**: `string` = `'npm run build:dist --'`

Run by users, symbiote, and related tooling when building the current
package's production-ready distributables.

This script is usually a reference to `npm run build:dist`.

##### Example

```ts
`npm run build:dist --`
```

#### scripts.build:changelog

> **build:changelog**: `string` = `'NODE_NO_WARNINGS=1 symbiote build changelog'`

Run by users, symbiote, and related tooling when building the current
package's `CHANGELOG.md` file.

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote build changelog`
```

#### scripts.build:dist

> **build:dist**: `string` = `'NODE_NO_WARNINGS=1 symbiote build distributables'`

Run by users, symbiote, and related tooling when building the current
package's production-ready distributables.

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote build distributables`
```

#### scripts.build:docs

> **build:docs**: `string` = `'NODE_NO_WARNINGS=1 symbiote build docs'`

Run by users, symbiote, and related tooling when building the current
package's documentation (typically found under `docs/`).

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote build docs`
```

#### scripts.clean

> **clean**: `string` = `'NODE_NO_WARNINGS=1 symbiote clean'`

Run by users, symbiote, and related tooling when removing files from the
project or package that are ignored by git (with exceptions).

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote clean`
```

#### scripts.deploy?

> `readonly` `optional` **deploy**: `string`

Run by users, symbiote, and related tooling when deploying built
distributables to the appropriate remote system(s).

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote deploy --target ssh --host prod.x.y.com --to-path /prod/some/path`
```

#### scripts.dev?

> `readonly` `optional` **dev**: `string`

Run by users, symbiote, and related tooling when spinning up a project's
local development environment.

#### scripts.format

> **format**: `string` = `'NODE_NO_WARNINGS=1 symbiote format --hush'`

Run by users, symbiote, and related tooling when formatting the project
or package.

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote format --hush`
```

#### scripts.info

> **info**: `string` = `'NODE_NO_WARNINGS=1 symbiote project info'`

Run by users, symbiote, and related tooling when printing information
about the current project or package.

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote project info`
```

#### scripts.install?

> `readonly` `optional` **install**: `string`

Run **after** the package is installed.

#### scripts.lint

> **lint**: `string` = `'npm run lint:package --'`

Run by users, symbiote, and related tooling when linting the current
package's files.

This script is usually a reference to `npm run lint:package`.

##### Example

```ts
`npm run lint:package --`
```

#### scripts.lint:package

> **lint:package**: `string` = `'NODE_NO_WARNINGS=1 symbiote lint'`

Run by users, symbiote, and related tooling when linting all of the
lintable files under the current package's root along with any other
source files that comprise this package's build targets (see
gatherPackageBuildTargets).

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote lint --scope this-package`
```

#### scripts.lint:packages

> **lint:packages**: `string`

Run by users, symbiote, and related tooling when linting all lintable
files in the entire project.

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote lint --scope unlimited`
```

#### scripts.lint:project

> **lint:project**: `string` = `'NODE_NO_WARNINGS=1 symbiote project lint'`

Run by users, symbiote, and related tooling when linting a project's
metadata, such as its file structure and configuration settings.

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote project lint`
```

#### scripts.list-tasks

> **list-tasks**: `string`

Run by users, symbiote, and related tooling when printing information
about available scripts in `package.json`.

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote list-tasks`
```

#### scripts.postinstall?

> `readonly` `optional` **postinstall**: `string`

Run **after** the package is installed and after `install`.

#### scripts.postpack?

> `readonly` `optional` **postpack**: `string`

Run **after** the tarball has been generated and moved to its final destination.

#### scripts.postpublish?

> `readonly` `optional` **postpublish**: `string`

Run **after** the package is published.

#### scripts.postrestart?

> `readonly` `optional` **postrestart**: `string`

Run with the `npm restart` command, after `restart`. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.

#### scripts.poststart?

> `readonly` `optional` **poststart**: `string`

Run with the `npm start` command, after `start`.

#### scripts.poststop?

> `readonly` `optional` **poststop**: `string`

Run with the `npm stop` command, after `stop`.

#### scripts.posttest?

> `readonly` `optional` **posttest**: `string`

Run with the `npm test` command, after `test`.

#### scripts.postuninstall?

> `readonly` `optional` **postuninstall**: `string`

Run **after** the package is uninstalled.

#### scripts.postversion?

> `readonly` `optional` **postversion**: `string`

Run **after** bump the package version.

#### scripts.preinstall?

> `readonly` `optional` **preinstall**: `string`

Run **before** the package is installed.

#### scripts.prepack?

> `readonly` `optional` **prepack**: `string`

Run **before** a tarball is packed (on `npm pack`, `npm publish`, and when installing git dependencies).

#### scripts.prepare

> **prepare**: `string` = `'NODE_NO_WARNINGS=1 symbiote project prepare'`

Run both **before** the package is packed and published, and on local `npm install` without any arguments. This is run **after** `prepublish`, but **before** `prepublishOnly`.

#### scripts.prepublish?

> `readonly` `optional` **prepublish**: `string`

Run **before** the package is published (Also run on local `npm install` without any arguments).

#### scripts.prepublishOnly?

> `readonly` `optional` **prepublishOnly**: `string`

Run **before** the package is prepared and packed, **only** on `npm publish`.

#### scripts.prerestart?

> `readonly` `optional` **prerestart**: `string`

Run with the `npm restart` command, before `restart`. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.

#### scripts.prestart?

> `readonly` `optional` **prestart**: `string`

Run with the `npm start` command, before `start`.

#### scripts.prestop?

> `readonly` `optional` **prestop**: `string`

Run with the `npm stop` command, before `stop`.

#### scripts.pretest?

> `readonly` `optional` **pretest**: `string`

Run with the `npm test` command, before `test`.

#### scripts.preuninstall?

> `readonly` `optional` **preuninstall**: `string`

Run **before** the package is uninstalled and before `uninstall`.

#### scripts.preversion?

> `readonly` `optional` **preversion**: `string`

Run **before** bump the package version and before `version`.

#### scripts.publish?

> `readonly` `optional` **publish**: `string`

Run **after** the package is published.

#### scripts.release

> **release**: `string` = `'NODE_NO_WARNINGS=1 symbiote release'`

Run by users, symbiote, and related tooling when potentially releasing
the next version of a package.

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote release`
```

#### scripts.renovate

> **renovate**: `string`

Run by users, symbiote, and related tooling when manipulating a project's
_metadata_, such as its file structure and configuration settings, with the
goal of bringing the project up to date with latest best practices.

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote project renovate
--github-reconfigure-repo --regenerate-assets --assets-preset basic`
```

#### scripts.restart?

> `readonly` `optional` **restart**: `string`

Run with the `npm restart` command. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.

#### scripts.start

> **start**: `string` = `'NODE_NO_WARNINGS=1 symbiote start --'`

Run with the `npm start` command.

#### scripts.stop?

> `readonly` `optional` **stop**: `string`

Run with the `npm stop` command.

#### scripts.test

> **test**: `string` = `'npm run test:package:unit --'`

Run with the `npm test` command.

#### scripts.test:package:all

> **test:package:all**: `string` = `'NODE_NO_WARNINGS=1 symbiote test --coverage'`

Run by users, symbiote, and related tooling when executing all possible
tests against the current package. In a monorepo context, this script
will also run the tests of any package that this package depends on
(including transitive dependencies).

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote test --scope this-package --coverage`
```

#### scripts.test:package:e2e

> **test:package:e2e**: `string` = `'NODE_NO_WARNINGS=1 symbiote test --tests end-to-end'`

Run by users, symbiote, and related tooling when executing end-to-end
tests against the current package. In a monorepo context, this script
will also run the tests of any package that this package depends on
(including transitive dependencies).

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote test --scope this-package --tests end-to-end`
```

#### scripts.test:package:integration

> **test:package:integration**: `string` = `'NODE_NO_WARNINGS=1 symbiote test --tests integration'`

Run by users, symbiote, and related tooling when executing integration
tests against the current package. In a monorepo context, this script
will also run the tests of any package that this package depends on
(including transitive dependencies).

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote test --scope this-package --tests integration`
```

#### scripts.test:package:unit

> **test:package:unit**: `string` = `'NODE_NO_WARNINGS=1 symbiote test --tests unit'`

Run by users, symbiote, and related tooling when executing unit tests
against the current package. In a monorepo context, this script
will also run the tests of any package that this package depends on
(including transitive dependencies).

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote test --scope this-package --tests unit`
```

#### scripts.test:packages:all

> **test:packages:all**: `string`

Run by users, symbiote, and related tooling when executing all possible
tests across the entire project.

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote test --scope unlimited --coverage`
```

#### scripts.turbo:init?

> `readonly` `optional` **turbo:init**: `string`

Run exclusively by Turbo tasks in non-hybrid monorepos as a pre-execution
step to rebuild the project's turbo.json files when necessary. It is
therefore important that this command completes as fast as possible!

##### Example

```ts
`NODE_NO_WARNINGS=1 symbiote project renovate --regenerate-assets
--preset turbo-only`
```

#### scripts.uninstall?

> `readonly` `optional` **uninstall**: `string`

Run **before** the package is uninstalled.

#### scripts.version?

> `readonly` `optional` **version**: `string`

Run **before** bump the package version.

### sideEffects

> `readonly` **sideEffects**: `boolean` \| `string`[]

### type

> `readonly` **type**: `"module"` \| `"commonjs"`

### types?

> `optional` **types**: `string`

Location of the bundled TypeScript declaration file.

### typesVersions

> `readonly` **typesVersions**: `Partial`\<`Record`\<`string`, `Partial`\<`Record`\<`string`, `string`[]\>\>\>\>

### typings?

> `optional` **typings**: `string`

Location of the bundled TypeScript declaration file. Alias of `types`.

### version

> `readonly` **version**: `string` = `incomingPackageJson.version`

### workspaces

> **workspaces**: `string`[] \| `WorkspaceConfig`

Used to configure [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) / [Yarn workspaces](https://classic.yarnpkg.com/docs/workspaces/).

Workspaces allow you to manage multiple packages within the same repository in such a way that you only need to run your install command once in order to install all of them in a single pass.

Please note that the top-level `private` property of `package.json` **must** be set to `true` in order to use workspaces.
