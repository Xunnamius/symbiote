[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_package.json](../README.md) / generateNonHybridMonorepoProjectXPackageJson

# Function: generateNonHybridMonorepoProjectXPackageJson()

> **generateNonHybridMonorepoProjectXPackageJson**(...`__namedParameters`): `object`

Defined in: [src/assets/transformers/\_package.json.ts:236](https://github.com/Xunnamius/symbiote/blob/cdafea2baa38b239d5977b443b3a3091b1a1c2e6/src/assets/transformers/_package.json.ts#L236)

## Parameters

### \_\_namedParameters

...[`GeneratorParameters`](../type-aliases/GeneratorParameters.md)

## Returns

### author

> `readonly` **author**: `Person`

### bin?

> `readonly` `optional` **bin**: `string` \| `Record`\<`string`, `string`\>

### browser?

> `readonly` `optional` **browser**: `string` \| `Partial`\<`Record`\<`string`, `string` \| `false`\>\>

A hint to JavaScript bundlers or component tools when packaging modules for client side use.

### bugs

> `readonly` **bugs**: `object`

#### bugs.url

> `readonly` **url**: `` `${string}/issues` ``

### bundledDependencies?

> `readonly` `optional` **bundledDependencies**: `string`[]

Package names that are bundled when the package is published.

### bundleDependencies?

> `readonly` `optional` **bundleDependencies**: `string`[]

Alias of `bundledDependencies`.

### config?

> `readonly` `optional` **config**: `JsonObject`

Is used to set configuration parameters used in package scripts that persist across upgrades.

### contributors?

> `readonly` `optional` **contributors**: `Person`[]

A list of people who contributed to the package.

### cpu?

> `readonly` `optional` **cpu**: `LiteralUnion`\<`"arm"` \| `"arm64"` \| `"ia32"` \| `"mips"` \| `"mipsel"` \| `"ppc"` \| `"ppc64"` \| `"s390"` \| `"s390x"` \| `"x32"` \| `"x64"` \| `"!arm"` \| `"!arm64"` \| `"!ia32"` \| `"!mips"` \| `"!mipsel"` \| `"!ppc"` \| `"!ppc64"` \| `"!s390"` \| `"!s390x"` \| `"!x32"` \| `"!x64"`, `string`\>[]

CPU architectures the module runs on.

### description

> `readonly` **description**: `string` = `incomingPackageJson.description`

### devDependencies

> `readonly` **devDependencies**: `Partial`\<`Record`\<`string`, `string`\>\>

Additional tooling dependencies that are not required for the package to work. Usually test, build, or documentation tooling.

### directories?

> `readonly` `optional` **directories**: `DirectoryLocations`

Indicates the structure of the package.

### engines

> `readonly` **engines**: `object`

#### Index Signature

\[`key`: `string`\]: `undefined` \| `string`

### ~~engineStrict?~~

> `readonly` `optional` **engineStrict**: `boolean`

#### Deprecated

### esnext?

> `readonly` `optional` **esnext**: `string` \| \{[`moduleName`: `string`]: `undefined` \| `string`; `browser?`: `string`; `main?`: `string`; \}

A module ID with untranspiled code that is the primary entry point to the program.

### flat?

> `readonly` `optional` **flat**: `boolean`

If your package only allows one version of a given dependency, and you’d like to enforce the same behavior as `yarn install --flat` on the command-line, set this to `true`.

Note that if your `package.json` contains `"flat": true` and other packages depend on yours (e.g. you are building a library rather than an app), those other packages will also need `"flat": true` in their `package.json` or be installed with `yarn install --flat` on the command-line.

### funding?

> `readonly` `optional` **funding**: `string` \| \{ `type?`: `LiteralUnion`\<`"github"` \| `"opencollective"` \| `"patreon"` \| `"individual"` \| `"foundation"` \| `"corporation"`, `string`\>; `url`: `string`; \}

Describes and notifies consumers of a package's monetary support information.

[Read more.](https://github.com/npm/rfcs/blob/latest/accepted/0017-add-funding-support.md)

#### Type declaration

`string`

\{ `type?`: `LiteralUnion`\<`"github"` \| `"opencollective"` \| `"patreon"` \| `"individual"` \| `"foundation"` \| `"corporation"`, `string`\>; `url`: `string`; \}

### homepage

> `readonly` **homepage**: `` `${string}${string}#readme` ``

### imports?

> `readonly` `optional` **imports**: `Imports`

Subpath imports to define internal package import maps that only apply to import specifiers from within the package itself.

[Read more.](https://nodejs.org/api/packages.html#subpath-imports)

### jspm?

> `readonly` `optional` **jspm**: `PackageJson`

JSPM configuration.

### keywords

> `readonly` **keywords**: `string`[]

### license

> `readonly` **license**: `string`

### licenses?

> `readonly` `optional` **licenses**: `object`[]

The licenses for the package.

### main?

> `readonly` `optional` **main**: `string`

The module ID that is the primary entry point to the program.

### maintainers?

> `readonly` `optional` **maintainers**: `Person`[]

A list of people who maintain the package.

### man?

> `readonly` `optional` **man**: `string` \| `string`[]

Filenames to put in place for the `man` program to find.

### module?

> `readonly` `optional` **module**: `string`

An ECMAScript module ID that is the primary entry point to the program.

### name

> `readonly` **name**: `string`

### optionalDependencies?

> `readonly` `optional` **optionalDependencies**: `Partial`\<`Record`\<`string`, `string`\>\>

Dependencies that are skipped if they fail to install.

### os?

> `readonly` `optional` **os**: `LiteralUnion`\<`"aix"` \| `"darwin"` \| `"freebsd"` \| `"linux"` \| `"openbsd"` \| `"sunos"` \| `"win32"` \| `"!aix"` \| `"!darwin"` \| `"!freebsd"` \| `"!linux"` \| `"!openbsd"` \| `"!sunos"` \| `"!win32"`, `string`\>[]

Operating systems the module runs on.

### packageManager?

> `readonly` `optional` **packageManager**: `string`

Defines which package manager is expected to be used when working on the current project. It can set to any of the [supported package managers](https://nodejs.org/api/corepack.html#supported-package-managers), and will ensure that your teams use the exact same package manager versions without having to install anything else than Node.js.

__This field is currently experimental and needs to be opted-in; check the [Corepack](https://nodejs.org/api/corepack.html) page for details about the procedure.__

#### Example

```json
{
	"packageManager": "<package manager name>@<version>"
}
```

### peerDependencies?

> `readonly` `optional` **peerDependencies**: `Partial`\<`Record`\<`string`, `string`\>\>

Dependencies that will usually be required by the package user directly or via another dependency.

### peerDependenciesMeta?

> `readonly` `optional` **peerDependenciesMeta**: `Partial`\<`Record`\<`string`, \{ `optional`: `true`; \}\>\>

Indicate peer dependencies that are optional.

### ~~preferGlobal?~~

> `readonly` `optional` **preferGlobal**: `boolean`

If set to `true`, a warning will be shown if package is installed locally. Useful if the package is primarily a command-line application that should be installed globally.

#### Deprecated

### private

> `readonly` **private**: `true` = `true`

### repository

> `readonly` **repository**: `object`

#### repository.type

> **type**: `string` = `'git'`

#### repository.url

> **url**: `string`

### resolutions?

> `readonly` `optional` **resolutions**: `Partial`\<`Record`\<`string`, `string`\>\>

Selective version resolutions. Allows the definition of custom package versions inside dependencies without manual edits in the `yarn.lock` file.

### scripts

> `readonly` **scripts**: `object`

#### scripts.build?

> `readonly` `optional` **build**: `string`

Run by users, symbiote, and related tooling when building the current
package's production-ready distributables.

This script is usually a reference to `npm run build:dist`.

##### Example

```ts
`npm run build:dist --`
```

#### scripts.build:changelog?

> `readonly` `optional` **build:changelog**: `string`

Run by users, symbiote, and related tooling when building the current
package's `CHANGELOG.md` file.

##### Example

```ts
`symbiote build changelog`
```

#### scripts.build:dist?

> `readonly` `optional` **build:dist**: `string`

Run by users, symbiote, and related tooling when building the current
package's production-ready distributables.

##### Example

```ts
`symbiote build distributables --not-multiversal`
```

#### scripts.build:docs?

> `readonly` `optional` **build:docs**: `string`

Run by users, symbiote, and related tooling when building the current
package's documentation (typically found under `docs/`).

##### Example

```ts
`symbiote build docs`
```

#### scripts.build:topological

> **build:topological**: `string` = `'symbiote project topology --run build --env NODE_NO_WARNINGS=1'`

Run by users, symbiote, and related tooling when building, in topological
order, production-ready distributables across all packages in the project.

##### Example

```ts
`symbiote project topology --run build`
```

#### scripts.clean

> **clean**: `string` = `'symbiote clean --env NODE_NO_WARNINGS=1'`

Run by users, symbiote, and related tooling when removing files from the
project or package that are ignored by git (with exceptions).

##### Example

```ts
`symbiote clean`
```

#### scripts.deploy?

> `optional` **deploy**: `string`

Run by users, symbiote, and related tooling when deploying built
distributables to the appropriate remote system(s).

##### Example

```ts
`symbiote deploy --target ssh --host prod.x.y.com --to-path
/prod/some/path`
```

#### scripts.dev?

> `optional` **dev**: `string`

Run by users, symbiote, and related tooling when spinning up a project's
local development environment.

#### scripts.format

> **format**: `string` = `'symbiote format --env NODE_NO_WARNINGS=1 --hush'`

Run by users, symbiote, and related tooling when formatting the project or
package.

##### Example

```ts
`symbiote format --hush`
```

#### scripts.info

> **info**: `string` = `'symbiote project info --env NODE_NO_WARNINGS=1'`

Run by users, symbiote, and related tooling when printing information about
the current project or package.

##### Example

```ts
`symbiote project info`
```

#### scripts.install?

> `optional` **install**: `string`

Run **after** the package is installed.

#### scripts.lint?

> `readonly` `optional` **lint**: `string`

Run by users, symbiote, and related tooling when linting the current
package's files.

This script is usually a reference to `npm run lint:package`.

##### Example

```ts
`npm run lint:package --`
```

#### scripts.lint:package?

> `readonly` `optional` **lint:package**: `string`

Run by users, symbiote, and related tooling when linting all of the
lintable files under the current package's root along with any other source
files that comprise this package's build targets (see
gatherPackageBuildTargets).

##### Example

```ts
`symbiote lint --scope this-package`
```

#### scripts.lint:packages

> **lint:packages**: `string`

Run by users, symbiote, and related tooling when linting all lintable files
in the entire project.

##### Example

```ts
`symbiote lint --scope unlimited`
```

#### scripts.lint:project

> **lint:project**: `string` = `'symbiote project lint --env NODE_NO_WARNINGS=1'`

Run by users, symbiote, and related tooling when linting a project's
metadata, such as its file structure and configuration settings.

##### Example

```ts
`symbiote project lint`
```

#### scripts.lint:topological

> **lint:topological**: `string` = `'symbiote project topology --run lint --env NODE_NO_WARNINGS=1'`

Run by users, symbiote, and related tooling when linting, in topological
order, files belonging to packages across the project.

##### Example

```ts
`symbiote project topology --run lint`
```

#### scripts.list-tasks

> **list-tasks**: `string`

Run by users, symbiote, and related tooling when printing information about
available scripts in `package.json`.

##### Example

```ts
`symbiote list-tasks`
```

#### scripts.postinstall?

> `optional` **postinstall**: `string`

Run **after** the package is installed and after `install`.

#### scripts.postpack?

> `optional` **postpack**: `string`

Run **after** the tarball has been generated and moved to its final destination.

#### scripts.postpublish?

> `optional` **postpublish**: `string`

Run **after** the package is published.

#### scripts.postrestart?

> `optional` **postrestart**: `string`

Run with the `npm restart` command, after `restart`. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.

#### scripts.poststart?

> `optional` **poststart**: `string`

Run with the `npm start` command, after `start`.

#### scripts.poststop?

> `optional` **poststop**: `string`

Run with the `npm stop` command, after `stop`.

#### scripts.posttest?

> `optional` **posttest**: `string`

Run with the `npm test` command, after `test`.

#### scripts.postuninstall?

> `optional` **postuninstall**: `string`

Run **after** the package is uninstalled.

#### scripts.postversion?

> `optional` **postversion**: `string`

Run **after** bump the package version.

#### scripts.preinstall?

> `optional` **preinstall**: `string`

Run **before** the package is installed.

#### scripts.prepack?

> `optional` **prepack**: `string`

Run **before** a tarball is packed (on `npm pack`, `npm publish`, and when installing git dependencies).

#### scripts.prepare

> **prepare**: `string` = `'symbiote project prepare --env NODE_NO_WARNINGS=1'`

Run both **before** the package is packed and published, and on local `npm install` without any arguments. This is run **after** `prepublish`, but **before** `prepublishOnly`.

#### scripts.prepublish?

> `optional` **prepublish**: `string`

Run **before** the package is published (Also run on local `npm install` without any arguments).

#### scripts.prepublishOnly?

> `optional` **prepublishOnly**: `string`

Run **before** the package is prepared and packed, **only** on `npm publish`.

#### scripts.prerestart?

> `optional` **prerestart**: `string`

Run with the `npm restart` command, before `restart`. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.

#### scripts.prestart?

> `optional` **prestart**: `string`

Run with the `npm start` command, before `start`.

#### scripts.prestop?

> `optional` **prestop**: `string`

Run with the `npm stop` command, before `stop`.

#### scripts.pretest?

> `optional` **pretest**: `string`

Run with the `npm test` command, before `test`.

#### scripts.preuninstall?

> `optional` **preuninstall**: `string`

Run **before** the package is uninstalled and before `uninstall`.

#### scripts.preversion?

> `optional` **preversion**: `string`

Run **before** bump the package version and before `version`.

#### scripts.publish?

> `optional` **publish**: `string`

Run **after** the package is published.

#### scripts.release?

> `readonly` `optional` **release**: `string`

Run by users, symbiote, and related tooling when potentially releasing the
next version of a package.

##### Example

```ts
`symbiote release --no-parallel`
```

#### scripts.release:topological

> **release:topological**: `string` = `'symbiote project topology --run release --env NODE_NO_WARNINGS=1'`

Run by users, symbiote, and related tooling when potentially releasing, in
topological order, the next version of each package in the project.

##### Example

```ts
`symbiote project topology --run release`
```

#### scripts.renovate

> **renovate**: `string`

Run by users, symbiote, and related tooling when manipulating a project's
_metadata_, such as its file structure and configuration settings, with the
goal of bringing the project up to date with latest best practices.

##### Example

```ts
`symbiote project renovate --github-reconfigure-repo
--regenerate-assets --assets-preset basic`
```

#### scripts.renovate:aliases

> `readonly` **renovate:aliases**: `` `symbiote project renovate --env NODE_NO_WARNINGS=1 --regenerate-assets --assets-preset ${string} --only-aliases` ``

#### scripts.restart?

> `optional` **restart**: `string`

Run with the `npm restart` command. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.

#### scripts.start

> **start**: `string` = `'symbiote start --env NODE_NO_WARNINGS=1 --'`

Run with the `npm start` command.

#### scripts.stop?

> `optional` **stop**: `string`

Run with the `npm stop` command.

#### scripts.test?

> `readonly` `optional` **test**: `string`

Run with the `npm test` command.

#### scripts.test:package:all?

> `readonly` `optional` **test:package:all**: `string`

Run by users, symbiote, and related tooling when executing all possible
tests against the current package. In a monorepo context, this script will
also run the tests of any package that this package depends on (including
transitive dependencies).

##### Example

```ts
`symbiote test --scope this-package --coverage`
```

#### scripts.test:package:e2e?

> `readonly` `optional` **test:package:e2e**: `string`

Run by users, symbiote, and related tooling when executing end-to-end tests
against the current package. In a monorepo context, this script will also
run the tests of any package that this package depends on (including
transitive dependencies).

##### Example

```ts
`symbiote test --scope this-package --tests e2e-local`
```

#### scripts.test:package:integration?

> `readonly` `optional` **test:package:integration**: `string`

Run by users, symbiote, and related tooling when executing integration
tests against the current package. In a monorepo context, this script will
also run the tests of any package that this package depends on (including
transitive dependencies).

##### Example

```ts
`symbiote test --scope this-package --tests integration`
```

#### scripts.test:package:unit?

> `readonly` `optional` **test:package:unit**: `string`

Run by users, symbiote, and related tooling when executing unit tests
against the current package. In a monorepo context, this script will also
run the tests of any package that this package depends on (including
transitive dependencies).

##### Example

```ts
`symbiote test --scope this-package --tests unit`
```

#### scripts.test:packages:all

> **test:packages:all**: `string`

Run by users, symbiote, and related tooling when executing all possible
tests across the entire project.

##### Example

```ts
`symbiote test --scope unlimited --coverage`
```

#### scripts.test:packages:all:unit

> `readonly` **test:packages:all:unit**: `"symbiote test --env NODE_NO_WARNINGS=1 --tests unit type --scope unlimited --coverage"`

#### scripts.test:topological

> **test:topological**: `string` = `'symbiote project topology --run test --env NODE_NO_WARNINGS=1'`

Run by users, symbiote, and related tooling when executing tests against
packages, in topological order, across the entire project.

##### Example

```ts
`symbiote project topology --run test`
```

#### scripts.uninstall?

> `optional` **uninstall**: `string`

Run **before** the package is uninstalled.

#### scripts.version?

> `optional` **version**: `string`

Run **before** bump the package version.

### sideEffects

> `readonly` **sideEffects**: `boolean` \| `string`[]

### type

> `readonly` **type**: `"module"` \| `"commonjs"`

### types?

> `readonly` `optional` **types**: `string`

Location of the bundled TypeScript declaration file.

### typings?

> `readonly` `optional` **typings**: `string`

Location of the bundled TypeScript declaration file. Alias of `types`.

### version

> `readonly` **version**: `string`

### workspaces

> `readonly` **workspaces**: `string`[] \| `WorkspaceConfig`

Used to configure [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) / [Yarn workspaces](https://classic.yarnpkg.com/docs/workspaces/).

Workspaces allow you to manage multiple packages within the same repository in such a way that you only need to run your install command once in order to install all of them in a single pass.

Please note that the top-level `private` property of `package.json` **must** be set to `true` in order to use workspaces.
