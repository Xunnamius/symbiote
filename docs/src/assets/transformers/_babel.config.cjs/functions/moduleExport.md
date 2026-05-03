[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_babel.config.cjs](../README.md) / moduleExport

# Function: moduleExport()

> **moduleExport**(`__namedParameters`): `object`

Defined in: [src/assets/transformers/\_babel.config.cjs.ts:283](https://github.com/Xunnamius/symbiote/blob/f20b0099c70f0313928eae8f1b370bfc00e9dda1/src/assets/transformers/_babel.config.cjs.ts#L283)

## Parameters

### \_\_namedParameters

#### derivedAliases

\{\[`k`: `string`\]: `string`; \}

#### packageRoot

`AbsolutePath`

#### projectRoot

`AbsolutePath`

## Returns

### assumptions?

> `optional` **assumptions?**: \{\[`name`: `string`\]: `boolean`; \} \| `null`

Specify which assumptions it can make about your code, to better optimize the compilation result. **NOTE**: This replaces the various `loose` options in plugins in favor of
top-level options that can apply to multiple plugins

#### See

https://babeljs.io/docs/en/assumptions

### ast?

> `optional` **ast?**: `boolean` \| `null`

Include the AST in the returned object

Default: `false`

### auxiliaryCommentAfter?

> `optional` **auxiliaryCommentAfter?**: `string` \| `null`

Attach a comment after all non-user injected code

Default: `null`

### auxiliaryCommentBefore?

> `optional` **auxiliaryCommentBefore?**: `string` \| `null`

Attach a comment before all non-user injected code

Default: `null`

### babelrc?

> `optional` **babelrc?**: `boolean` \| `null`

Specify whether or not to use .babelrc and
.babelignore files.

Default: `true`

### babelrcRoots?

> `optional` **babelrcRoots?**: `boolean` \| `MatchPattern` \| `MatchPattern`[] \| `null`

Specify which packages should be search for .babelrc files when they are being compiled. `true` to always search, or a path string or an array of paths to packages to search
inside of. Defaults to only searching the "root" package.

Default: `(root)`

### browserslistConfigFile?

> `optional` **browserslistConfigFile?**: `boolean` \| `null`

Toggles whether or not browserslist config sources are used, which includes searching for any browserslist files or referencing the browserslist key inside package.json.
This is useful for projects that use a browserslist config for files that won't be compiled with Babel.

If a string is specified, it must represent the path of a browserslist configuration file. Relative paths are resolved relative to the configuration file which specifies
this option, or to `cwd` when it's passed as part of the programmatic options.

Default: `true`

### browserslistEnv?

> `optional` **browserslistEnv?**: `string` \| `null`

The Browserslist environment to use.

Default: `undefined`

### caller?

> `optional` **caller?**: `TransformCaller`

Utilities may pass a caller object to identify themselves to Babel and
pass capability-related flags for use by configs, presets and plugins.

#### See

https://babeljs.io/docs/en/next/options#caller

### cloneInputAst?

> `optional` **cloneInputAst?**: `boolean` \| `null`

By default `babel.transformFromAst` will clone the input AST to avoid mutations.
Specifying `cloneInputAst: false` can improve parsing performance if the input AST is not used elsewhere.

Default: `true`

### code?

> `optional` **code?**: `boolean` \| `null`

Enable code generation

Default: `true`

### comments?

> `optional` **comments?**: `boolean` \| `null`

Output comments in generated output

Default: `true`

### compact?

> `optional` **compact?**: `boolean` \| `"auto"` \| `null`

Do not include superfluous whitespace characters and line terminators. When set to `"auto"` compact is set to `true` on input sizes of >500KB

Default: `"auto"`

### configFile?

> `optional` **configFile?**: `string` \| `boolean` \| `null`

The config file to load Babel's config from. Defaults to searching for "babel.config.js" inside the "root" folder. `false` will disable searching for config files.

Default: `undefined`

### cwd?

> `optional` **cwd?**: `string` \| `null`

The working directory that Babel's programmatic options are loaded relative to.

Default: `"."`

### env

> **env**: `object`

#### env.development?

> `optional` **development?**: [`BabelConfig`](../interfaces/BabelConfig.md) = `{}`

#### env.production?

> `optional` **production?**: [`BabelConfig`](../interfaces/BabelConfig.md) = `{}`

#### env.production-browser?

> `optional` **production-browser?**: [`BabelConfig`](../interfaces/BabelConfig.md)

#### env.production-cjs?

> `optional` **production-cjs?**: [`BabelConfig`](../interfaces/BabelConfig.md)

#### env.production-esm?

> `optional` **production-esm?**: [`BabelConfig`](../interfaces/BabelConfig.md)

#### env.production-types?

> `optional` **production-types?**: [`BabelConfig`](../interfaces/BabelConfig.md)

#### env.test?

> `optional` **test?**: [`BabelConfig`](../interfaces/BabelConfig.md)

### envName?

> `optional` **envName?**: `string`

Defaults to environment variable `BABEL_ENV` if set, or else `NODE_ENV` if set, or else it defaults to `"development"`

Default: env vars

### exclude?

> `optional` **exclude?**: `MatchPattern` \| `MatchPattern`[]

If any of patterns match, the current configuration object is considered inactive and is ignored during config processing.

### extends?

> `optional` **extends?**: `string` \| `null`

A path to a `.babelrc` file to extend

Default: `null`

### filename?

> `optional` **filename?**: `string` \| `null`

Filename for use in errors etc

Default: `"unknown"`

### filenameRelative?

> `optional` **filenameRelative?**: `string` \| `null`

Filename relative to `sourceRoot`

Default: `(filename)`

### generatorOpts?

> `optional` **generatorOpts?**: `GeneratorOptions` \| `null`

An object containing the options to be passed down to the babel code generator, @babel/generator

Default: `{}`

### getModuleId?

> `optional` **getModuleId?**: ((`moduleName`) => `string` \| `null` \| `undefined`) \| `null`

Specify a custom callback to generate a module id with. Called as `getModuleId(moduleName)`. If falsy value is returned then the generated module id is used

Default: `null`

### highlightCode?

> `optional` **highlightCode?**: `boolean` \| `null`

ANSI highlight syntax error code frames

Default: `true`

### ignore?

> `optional` **ignore?**: `MatchPattern`[] \| `null`

Opposite to the `only` option. `ignore` is disregarded if `only` is specified

Default: `null`

### include?

> `optional` **include?**: `MatchPattern` \| `MatchPattern`[]

This option is a synonym for "test"

### inputSourceMap?

> `optional` **inputSourceMap?**: `InputSourceMap` \| `null`

A source map object that the output source map will be based on

Default: `null`

### minified?

> `optional` **minified?**: `boolean` \| `null`

Should the output be minified (not printing last semicolons in blocks, printing literal string values instead of escaped ones, stripping `()` from `new` when safe)

Default: `false`

### moduleId?

> `optional` **moduleId?**: `string` \| `null`

Specify a custom name for module ids

Default: `null`

### moduleIds?

> `optional` **moduleIds?**: `boolean` \| `null`

If truthy, insert an explicit id for modules. By default, all modules are anonymous. (Not available for `common` modules)

Default: `false`

### moduleRoot?

> `optional` **moduleRoot?**: `string` \| `null`

Optional prefix for the AMD module formatter that will be prepend to the filename on module definitions

Default: `(sourceRoot)`

### only?

> `optional` **only?**: `MatchPattern`[] \| `null`

A glob, regex, or mixed array of both, matching paths to **only** compile. Can also be an array of arrays containing paths to explicitly match. When attempting to compile
a non-matching file it's returned verbatim

Default: `null`

### overrides?

> `optional` **overrides?**: [`BabelConfig`](../interfaces/BabelConfig.md)[]

Allows users to provide an array of options that will be merged into the current configuration one at a time.
This feature is best used alongside the "test"/"include"/"exclude" options to provide conditions for which an override should apply

### parserOpts?

> `optional` **parserOpts?**: `Partial`\<`Options`\> \| `null`

An object containing the options to be passed down to the babel parser, @babel/parser

Default: `{}`

### plugins?

> `optional` **plugins?**: `PluginItem`[] \| `null`

List of plugins to load and use

Default: `[]`

### presets?

> `optional` **presets?**: `PluginItem`[] \| `null`

List of presets (a set of plugins) to load and use

Default: `[]`

### retainLines?

> `optional` **retainLines?**: `boolean` \| `null`

Retain line numbers. This will lead to wacky code but is handy for scenarios where you can't use source maps. (**NOTE**: This will not retain the columns)

Default: `false`

### root?

> `optional` **root?**: `string` \| `null`

Specify the "root" folder that defines the location to search for "babel.config.js", and the default folder to allow `.babelrc` files inside of.

Default: `"."`

### rootMode?

> `optional` **rootMode?**: `"root"` \| `"upward"` \| `"upward-optional"`

This option, combined with the "root" value, defines how Babel chooses its project root.
The different modes define different ways that Babel can process the "root" value to get
the final project root.

#### See

https://babeljs.io/docs/en/next/options#rootmode

### shouldPrintComment?

> `optional` **shouldPrintComment?**: ((`commentContents`) => `boolean`) \| `null`

An optional callback that controls whether a comment should be output or not. Called as `shouldPrintComment(commentContents)`. **NOTE**: This overrides the `comment` option when used

Default: `null`

### sourceFileName?

> `optional` **sourceFileName?**: `string` \| `null`

Set `sources[0]` on returned source map

Default: `(filenameRelative)`

### sourceMaps?

> `optional` **sourceMaps?**: `boolean` \| `"both"` \| `"inline"` \| `null`

If truthy, adds a `map` property to returned output. If set to `"inline"`, a comment with a sourceMappingURL directive is added to the bottom of the returned code. If set to `"both"`
then a `map` property is returned as well as a source map comment appended. **This does not emit sourcemap files by itself!**

Default: `false`

### sourceRoot?

> `optional` **sourceRoot?**: `string` \| `null`

The root from which all sources are relative

Default: `(moduleRoot)`

### sourceType?

> `optional` **sourceType?**: `"module"` \| `"script"` \| `"unambiguous"` \| `null`

Indicate the mode the code should be parsed in. Can be one of "script", "module", or "unambiguous". `"unambiguous"` will make Babel attempt to guess, based on the presence of ES6
`import` or `export` statements. Files with ES6 `import`s and `export`s are considered `"module"` and are otherwise `"script"`.

Default: `("module")`

### targets?

> `optional` **targets?**: `string` \| `string`[] \| \{ `android?`: `string`; `browsers?`: `string` \| `string`[]; `chrome?`: `string`; `deno?`: `string`; `edge?`: `string`; `electron?`: `string`; `esmodules?`: `boolean`; `firefox?`: `string`; `ie?`: `string`; `ios?`: `string`; `node?`: `true` \| `"current"` \| `Omit`\<`string`, `"current"`\>; `opera?`: `string`; `rhino?`: `string`; `safari?`: `"tp"` \| `Omit`\<`string`, `"tp"`\>; `samsung?`: `string`; \}

Describes the environments you support/target for your project.
This can either be a [browserslist-compatible](https://github.com/ai/browserslist) query (with [caveats](https://babeljs.io/docs/en/babel-preset-env#ineffective-browserslist-queries))

Default: `{}`

### test?

> `optional` **test?**: `MatchPattern` \| `MatchPattern`[]

If all patterns fail to match, the current configuration object is considered inactive and is ignored during config processing.

### wrapPluginVisitorMethod?

> `optional` **wrapPluginVisitorMethod?**: ((`pluginAlias`, `visitorType`, `callback`) => (`path`, `state`) => `void`) \| `null`

An optional callback that can be used to wrap visitor methods. **NOTE**: This is useful for things like introspection, and not really needed for implementing anything. Called as
`wrapPluginVisitorMethod(pluginAlias, visitorType, callback)`.
