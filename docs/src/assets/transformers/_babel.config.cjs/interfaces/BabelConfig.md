[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_babel.config.cjs](../README.md) / BabelConfig

# Interface: BabelConfig

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:29

## Properties

### assumptions?

> `optional` **assumptions**: `null` \| \{[`name`: `string`]: `boolean`; \}

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:36

Specify which assumptions it can make about your code, to better optimize the compilation result. **NOTE**: This replaces the various `loose` options in plugins in favor of
top-level options that can apply to multiple plugins

#### See

https://babeljs.io/docs/en/assumptions

***

### ast?

> `optional` **ast**: `null` \| `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:43

Include the AST in the returned object

Default: `false`

***

### auxiliaryCommentAfter?

> `optional` **auxiliaryCommentAfter**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:50

Attach a comment after all non-user injected code

Default: `null`

***

### auxiliaryCommentBefore?

> `optional` **auxiliaryCommentBefore**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:57

Attach a comment before all non-user injected code

Default: `null`

***

### babelrc?

> `optional` **babelrc**: `null` \| `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:88

Specify whether or not to use .babelrc and
.babelignore files.

Default: `true`

***

### babelrcRoots?

> `optional` **babelrcRoots**: `null` \| `boolean` \| `MatchPattern` \| `MatchPattern`[]

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:96

Specify which packages should be search for .babelrc files when they are being compiled. `true` to always search, or a path string or an array of paths to packages to search
inside of. Defaults to only searching the "root" package.

Default: `(root)`

***

### browserslistConfigFile?

> `optional` **browserslistConfigFile**: `null` \| `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:107

Toggles whether or not browserslist config sources are used, which includes searching for any browserslist files or referencing the browserslist key inside package.json.
This is useful for projects that use a browserslist config for files that won't be compiled with Babel.

If a string is specified, it must represent the path of a browserslist configuration file. Relative paths are resolved relative to the configuration file which specifies
this option, or to `cwd` when it's passed as part of the programmatic options.

Default: `true`

***

### browserslistEnv?

> `optional` **browserslistEnv**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:114

The Browserslist environment to use.

Default: `undefined`

***

### caller?

> `optional` **caller**: `TransformCaller`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:170

Utilities may pass a caller object to identify themselves to Babel and
pass capability-related flags for use by configs, presets and plugins.

#### See

https://babeljs.io/docs/en/next/options#caller

***

### cloneInputAst?

> `optional` **cloneInputAst**: `null` \| `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:122

By default `babel.transformFromAst` will clone the input AST to avoid mutations.
Specifying `cloneInputAst: false` can improve parsing performance if the input AST is not used elsewhere.

Default: `true`

***

### code?

> `optional` **code**: `null` \| `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:141

Enable code generation

Default: `true`

***

### comments?

> `optional` **comments**: `null` \| `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:148

Output comments in generated output

Default: `true`

***

### compact?

> `optional` **compact**: `null` \| `boolean` \| `"auto"`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:155

Do not include superfluous whitespace characters and line terminators. When set to `"auto"` compact is set to `true` on input sizes of >500KB

Default: `"auto"`

***

### configFile?

> `optional` **configFile**: `null` \| `string` \| `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:80

The config file to load Babel's config from. Defaults to searching for "babel.config.js" inside the "root" folder. `false` will disable searching for config files.

Default: `undefined`

***

### cwd?

> `optional` **cwd**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:162

The working directory that Babel's programmatic options are loaded relative to.

Default: `"."`

***

### env?

> `optional` **env**: `null` \| \{[`index`: `string`]: `undefined` \| `null` \| `TransformOptions`; \}

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:178

This is an object of keys that represent different environments. For example, you may have: `{ env: { production: { /* specific options */ } } }`
which will use those options when the `envName` is `production`

Default: `{}`

***

### envName?

> `optional` **envName**: `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:129

Defaults to environment variable `BABEL_ENV` if set, or else `NODE_ENV` if set, or else it defaults to `"development"`

Default: env vars

***

### exclude?

> `optional` **exclude**: `MatchPattern` \| `MatchPattern`[]

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:134

If any of patterns match, the current configuration object is considered inactive and is ignored during config processing.

***

### extends?

> `optional` **extends**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:185

A path to a `.babelrc` file to extend

Default: `null`

***

### filename?

> `optional` **filename**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:192

Filename for use in errors etc

Default: `"unknown"`

***

### filenameRelative?

> `optional` **filenameRelative**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:199

Filename relative to `sourceRoot`

Default: `(filename)`

***

### generatorOpts?

> `optional` **generatorOpts**: `null` \| `GeneratorOptions`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:206

An object containing the options to be passed down to the babel code generator, @babel/generator

Default: `{}`

***

### getModuleId?

> `optional` **getModuleId**: `null` \| (`moduleName`) => `undefined` \| `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:213

Specify a custom callback to generate a module id with. Called as `getModuleId(moduleName)`. If falsy value is returned then the generated module id is used

Default: `null`

***

### highlightCode?

> `optional` **highlightCode**: `null` \| `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:220

ANSI highlight syntax error code frames

Default: `true`

***

### ignore?

> `optional` **ignore**: `null` \| `MatchPattern`[]

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:227

Opposite to the `only` option. `ignore` is disregarded if `only` is specified

Default: `null`

***

### include?

> `optional` **include**: `MatchPattern` \| `MatchPattern`[]

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:232

This option is a synonym for "test"

***

### inputSourceMap?

> `optional` **inputSourceMap**: `null` \| `InputSourceMap`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:239

A source map object that the output source map will be based on

Default: `null`

***

### minified?

> `optional` **minified**: `null` \| `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:246

Should the output be minified (not printing last semicolons in blocks, printing literal string values instead of escaped ones, stripping `()` from `new` when safe)

Default: `false`

***

### moduleId?

> `optional` **moduleId**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:253

Specify a custom name for module ids

Default: `null`

***

### moduleIds?

> `optional` **moduleIds**: `null` \| `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:260

If truthy, insert an explicit id for modules. By default, all modules are anonymous. (Not available for `common` modules)

Default: `false`

***

### moduleRoot?

> `optional` **moduleRoot**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:267

Optional prefix for the AMD module formatter that will be prepend to the filename on module definitions

Default: `(sourceRoot)`

***

### only?

> `optional` **only**: `null` \| `MatchPattern`[]

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:275

A glob, regex, or mixed array of both, matching paths to **only** compile. Can also be an array of arrays containing paths to explicitly match. When attempting to compile
a non-matching file it's returned verbatim

Default: `null`

***

### overrides?

> `optional` **overrides**: `TransformOptions`[]

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:281

Allows users to provide an array of options that will be merged into the current configuration one at a time.
This feature is best used alongside the "test"/"include"/"exclude" options to provide conditions for which an override should apply

***

### parserOpts?

> `optional` **parserOpts**: `null` \| `Partial`\<`Options`\>

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:288

An object containing the options to be passed down to the babel parser, @babel/parser

Default: `{}`

***

### plugins?

> `optional` **plugins**: `null` \| `PluginItem`[]

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:295

List of plugins to load and use

Default: `[]`

***

### presets?

> `optional` **presets**: `null` \| `PluginItem`[]

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:302

List of presets (a set of plugins) to load and use

Default: `[]`

***

### retainLines?

> `optional` **retainLines**: `null` \| `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:309

Retain line numbers. This will lead to wacky code but is handy for scenarios where you can't use source maps. (**NOTE**: This will not retain the columns)

Default: `false`

***

### root?

> `optional` **root**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:64

Specify the "root" folder that defines the location to search for "babel.config.js", and the default folder to allow `.babelrc` files inside of.

Default: `"."`

***

### rootMode?

> `optional` **rootMode**: `"root"` \| `"upward"` \| `"upward-optional"`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:73

This option, combined with the "root" value, defines how Babel chooses its project root.
The different modes define different ways that Babel can process the "root" value to get
the final project root.

#### See

https://babeljs.io/docs/en/next/options#rootmode

***

### shouldPrintComment?

> `optional` **shouldPrintComment**: `null` \| (`commentContents`) => `boolean`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:316

An optional callback that controls whether a comment should be output or not. Called as `shouldPrintComment(commentContents)`. **NOTE**: This overrides the `comment` option when used

Default: `null`

***

### sourceFileName?

> `optional` **sourceFileName**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:323

Set `sources[0]` on returned source map

Default: `(filenameRelative)`

***

### sourceMaps?

> `optional` **sourceMaps**: `null` \| `boolean` \| `"both"` \| `"inline"`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:331

If truthy, adds a `map` property to returned output. If set to `"inline"`, a comment with a sourceMappingURL directive is added to the bottom of the returned code. If set to `"both"`
then a `map` property is returned as well as a source map comment appended. **This does not emit sourcemap files by itself!**

Default: `false`

***

### sourceRoot?

> `optional` **sourceRoot**: `null` \| `string`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:338

The root from which all sources are relative

Default: `(moduleRoot)`

***

### sourceType?

> `optional` **sourceType**: `null` \| `"module"` \| `"script"` \| `"unambiguous"`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:346

Indicate the mode the code should be parsed in. Can be one of "script", "module", or "unambiguous". `"unambiguous"` will make Babel attempt to guess, based on the presence of ES6
`import` or `export` statements. Files with ES6 `import`s and `export`s are considered `"module"` and are otherwise `"script"`.

Default: `("module")`

***

### targets?

> `optional` **targets**: `string` \| `string`[] \| \{ `android?`: `string`; `browsers?`: `string` \| `string`[]; `chrome?`: `string`; `deno?`: `string`; `edge?`: `string`; `electron?`: `string`; `esmodules?`: `boolean`; `firefox?`: `string`; `ie?`: `string`; `ios?`: `string`; `node?`: `true` \| `"current"` \| `Omit`\<`string`, `"current"`\>; `opera?`: `string`; `rhino?`: `string`; `safari?`: `"tp"` \| `Omit`\<`string`, `"tp"`\>; `samsung?`: `string`; \}

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:359

Describes the environments you support/target for your project.
This can either be a [browserslist-compatible](https://github.com/ai/browserslist) query (with [caveats](https://babeljs.io/docs/en/babel-preset-env#ineffective-browserslist-queries))

Default: `{}`

***

### test?

> `optional` **test**: `MatchPattern` \| `MatchPattern`[]

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:351

If all patterns fail to match, the current configuration object is considered inactive and is ignored during config processing.

***

### wrapPluginVisitorMethod?

> `optional` **wrapPluginVisitorMethod**: `null` \| (`pluginAlias`, `visitorType`, `callback`) => (`path`, `state`) => `void`

Defined in: node\_modules/@types/babel\_\_core/index.d.ts:384

An optional callback that can be used to wrap visitor methods. **NOTE**: This is useful for things like introspection, and not really needed for implementing anything. Called as
`wrapPluginVisitorMethod(pluginAlias, visitorType, callback)`.
