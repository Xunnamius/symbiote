# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## @-xun/symbiote[@2.11.0][3] (2025-01-10)

### ✨ Features

- **commands/prepare:** execute post-npm-install scripts and other tasks with greater fidelity ([e53be8b][4])
- **packages/project-utils:** allow `isAccessible` to handle "file:///" URL-style file paths ([3058d49][5])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.9][6] (2025-01-15)

#### 🪄 Fixes

- **assets/transformers:** export and return `WritableReleaseConfig` from release asset config ([b951959][7])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.8][8] (2025-01-15)

#### 🪄 Fixes

- **assets/transformers:** escape characters considered special in Markdown when they appear in commit messages ([4196fe0][9])
- **assets/transformers:** ignore irrelevant revert commits ([e432f8a][10])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.7][11] (2025-01-14)

#### 🪄 Fixes

- **assets/templates:** update architecture.md ([e734cc6][12])
- **assets/transformers:** do not renovate root package test files if the root test directory already exists ([2b00195][13])
- **assets/transformers:** ensure default "list-tasks" script does not overwrite custom in package.json ([605e4eb][14])
- **assets/transformers:** parse architecture.md with respect to its replacer regions ([31863db][15])
- **commands/project-prepare:** do not attempt to chdir during async tasks ([e80d6e7][16])
- **packages/project-utils:** ensure `gatherPseudodecoratorEntriesFromFiles` does not choke on super-pinned dependency names ([614ba8b][17])

#### ⚙️ Build System

- **packages/cli-utils:** integrate rejoinder-listr2 ([690ad17][18])
- Tear turbo out of symbiote ([5540b7d][19])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.6][20] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** do the right thing when there is no "most recent relevant version tag" ([2dfb17d][21])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.5][22] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** fix the graceful exit error on --dry-run fix ([6f7a302][23])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.4][24] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** do not throw graceful exit error on --dry-run ([67bad27][25])
- **commands/renovate:** support camel-case options when invoked artificially ([5ab38d0][26])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.3][27] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** push any post-release metadata changes after committing them ([15d3444][28])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.2][29] (2025-01-11)

#### 🪄 Fixes

- **assets:** use proper package context when deriving codecov package flag ([16af6eb][30])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.1][31] (2025-01-11)

#### 🪄 Fixes

- Ensure readme renovation yields correct codecov badge link using derived flag ([1e0174c][32])

<br />

## @-xun/symbiote[@2.10.0][33] (2025-01-10)

### ✨ Features

- **commands/release:** refuse release attempt if most recent version tag is "semver experimental" ([900c84b][34])
- **src:** add local/global emoji to version text output ([2d7c433][35])

### 🪄 Fixes

- **assets/templates:** link to the npm registry instead of npm trends for "npm install" badge ([76bd411][36])
- **commands/release:** actually respect SYMBIOTE\_RELEASE\_WITH\_FORCE env var when present ([e264510][37])
- **commands/release:** actually throw when release finishes with a dirty repo and force not used ([ae7340f][38])
- **commands/release:** commit root package-lock.json during post-release "success" step when necessary ([bccf091][39])

### ⚙️ Build System

- Remove @-xun/debug and rejoinder multiverse workspaces in favor of published packages ([77e22ae][40])

<br />

## @-xun/symbiote[@2.9.0][41] (2025-01-10)

### ✨ Features

- **commands/release:** `--force` prevents release process from erroring if repo left in unclean state ([45a9568][42])

<br />

## @-xun/symbiote[@2.8.0][43] (2025-01-09)

### ✨ Features

- **assets:** support empty default text when compiling templates in memory ([abc2eae][44])
- **assets:** support new "+" concatenation template variables when compiling templates in memory ([152bcdb][45])
- **commands/release:** allow the release process to terminate prematurely with grace ([7fa548f][46])
- **commands/release:** rollback the repository to its pre-release state under certain error conditions ([d34d569][47])

### 🪄 Fixes

- **assets/templates:** ensure package-level readme is generated using proper logo url ([1631e8d][48])
- **assets/transformers:** include root package-lock.json in commit when releasing sub-root package ([032aa30][49])

### ⚙️ Build System

- **assets/transformers:** throw in xrelease "success" step if repo is left in a dirty state after release ([88b7f38][50])

<br />

### 🏗️ Patch @-xun/symbiote[@2.8.2][51] (2025-01-10)

#### 🪄 Fixes

- **commands/release:** do not roll repository back if `--dry-run` is used ([ecdd713][52])

<br />

### 🏗️ Patch @-xun/symbiote[@2.8.1][53] (2025-01-10)

#### 🪄 Fixes

- **assets/transformers:** do not erroneously report jest-extended as an invalid dep ([af354d0][54])
- **commands/release:** recursively check causal stack for graceful exit symbol ([4a89482][55])

<br />

## @-xun/symbiote[@2.7.0][56] (2025-01-09)

### ✨ Features

- Support windows-style paths ([28acb79][57])

### ⚙️ Build System

- **assets/transformers:** update "core-js" to 3.40 ([6f8cbe2][58])
- Completely remove all traces of spellchecker and node-gyp ([edc6cca][59])

<br />

### 🏗️ Patch @-xun/symbiote[@2.7.1][60] (2025-01-09)

#### 🪄 Fixes

- **assets/transformers:** ensure subroot tsconfigs include root test/setup.ts where appropriate ([138da87][61])

<br />

## @-xun/symbiote[@2.6.0][62] (2025-01-08)

### ✨ Features

- Support `--env` common option for cross-env-like functionality ([dddfc44][63])

### ⚙️ Build System

- Remove unnecessary jsdoc type comments ([180f85f][64])

<br />

## @-xun/symbiote[@2.5.0][65] (2025-01-04)

### ✨ Features

- **commands/renovate:** implement --generate-alias-tags renovation ([c133a92][66])

### 🪄 Fixes

- **assets/templates:** disable turbo config generation for now and add stashed configs ([6210727][67])
- **assets/templates:** use less confusing language during readme regeneration ([625451c][68])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.6][69] (2025-01-06)

#### 🪄 Fixes

- **assets:** ensure `deepMergeConfig` accepts a diverse set of overwrite objects ([2fd61c4][70])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.5][71] (2025-01-06)

#### 🪄 Fixes

- **src:** use proper path in global-vs-local binary detection ([3831af5][72])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.4][73] (2025-01-06)

#### 🪄 Fixes

- **commands/lint:** do not hide all output when `--hush` is used ([c23304e][74])

#### ⚙️ Build System

- Indicate in output topmatter whether current binary is globally or locally installed ([1411119][75])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.3][76] (2025-01-05)

#### 🪄 Fixes

- **assets/transformers:** add `--hush` to "lint" script in generated package.json files ([0dd4fb7][77])
- **assets/transformers:** generate properly formatted "breaking change" changelog notes ([607a378][78])
- **assets/transformers:** update "turbo:init" script to use "project init-turbo" command in package.json ([19492a7][79])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.2][80] (2025-01-04)

#### 🪄 Fixes

- **assets/transformers:** do not mess with "breaking change" title casing in generated changelog (via remark) ([4231719][81])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.1][82] (2025-01-04)

#### 🪄 Fixes

- **commands/release:** use emoji to reference skipped tasks in output ([b2dfed2][83])

<br />

## @-xun/symbiote[@2.4.0][84] (2025-01-03)

### ✨ Features

- **commands/documentation:** add `--baseline` and `--typedoc-options` flag support ([10f876e][85])

<br />

### 🏗️ Patch @-xun/symbiote[@2.4.3][86] (2025-01-03)

#### 🪄 Fixes

- **assets/templates:** do not capitalize package semver data in markdown files (via remark) ([7b8ca54][87])

<br />

### 🏗️ Patch @-xun/symbiote[@2.4.2][88] (2025-01-03)

#### 🪄 Fixes

- **assets/templates:** ensure real repo owner is used in support.md file link generation ([0bafa30][89])

<br />

### 🏗️ Patch @-xun/symbiote[@2.4.1][90] (2025-01-03)

#### 🪄 Fixes

- **commands/documentation:** ensure black flag uses proper argparser configuration ([02e289a][91])

<br />

## @-xun/symbiote[@2.3.0][92] (2025-01-01)

### ✨ Features

- **assets/transformers:** add eslint-config-turbo to eslint config ([23d01f3][93])
- **assets/transformers:** add new "turbo-only" asset preset available to the renovate command ([ee079c1][94])
- **commands/distributables:** implement `--skip-output-bijection-checks-for` ([c92b2cb][95])
- **packages/project-utils:** add "turbo:init" script to `XPackageJson` ([c565452][96])

### 🪄 Fixes

- **assets/transformers:** add .turbo to gitignore ([6353b4f][97])
- **assets/transformers:** ensure all project-root package.json files have a "turbo:init" script ([64a4138][98])
- **assets/transformers:** generate readme using proper title ([9304778][99])

<br />

### 🏗️ Patch @-xun/symbiote[@2.3.4][100] (2025-01-02)

#### 🪄 Fixes

- **assets/transformers:** remove commit spellchecker until commit-spell is released ([7f1f7a2][101])

<br />

### 🏗️ Patch @-xun/symbiote[@2.3.3][102] (2025-01-02)

#### 🪄 Fixes

- **commands/prepare:** exit immediately with exit code 0 when run runtime pre-checks fail ([1546ab8][103])

<br />

### 🏗️ Patch @-xun/symbiote[@2.3.2][104] (2025-01-01)

#### ⚙️ Build System

- **assets/transformers:** add "\_\_x\_\_" directories to .prettierignore and eslint ignores ([ff6ce22][105])
- **src:** add helpful verbiage to "lint" output and generated .prettierignore files ([9a456c5][106])

<br />

### 🏗️ Patch @-xun/symbiote[@2.3.1][107] (2025-01-01)

#### 🪄 Fixes

- **commands/distributables:** ensure bijection check warnings are not overshadowed by errors ([1901cfe][108])

<br />

## @-xun/symbiote[@2.2.0][109] (2024-12-28)

### ✨ Features

- **assets/transformers:** warn when updating package.json::engines that it is likely a breaking change ([0c1b93a][110])
- **commands:** expose `RawAliasMapperFunction` and `RawAliasMapperArray` helper types ([ce6a12a][111])
- **packages/cli-utils:** hoist semi-deep options configuration merge functionality from util ([14bf31f][112])

### 🪄 Fixes

- **assets/transformers:** do not allow --force to overwrite "sideEffects" field in package.json ([c263dc5][113])
- **assets/transformers:** do not allow --force to overwrite files in src ([f556644][114])
- **assets/transformers:** ensure provided aliases are added in addition to defaults ([9581339][115])
- **assets/transformers:** ensure warning-comment errors are only reported when allowed ([432a5fa][116])
- **assets/transformers:** exclude "renovate" script from sub-root package.json files ([f82fbf4][117])
- **assets/transformers:** generate proper cli as index export subpath in package.json ([a95e910][118])
- **assets/transformers:** generate proper tsconfig files for sub-root packages ([12dd3f7][119])
- **assets/transformers:** generate properly-scoped field values for sub-root package.json files ([2a3e13c][120])
- **assets/transformers:** generate valid GitHub link in "homepage" field of package.json ([b8841b5][121])
- **assets/transformers:** guess the proper asset preset for sub-root packages ([f301229][122])
- **assets/transformers:** improve license detection when generating readme ([26f78dc][123])
- **assets/transformers:** improve replacer region flexibility and fidelity when generating readme ([c63847c][124])
- **assets/transformers:** preserve all dependency-related keys in package.json ([df13f87][125])
- **assets/transformers:** regenerate package.json files more carefully ([48163ba][126])
- **commands/renovate:** do not attempt to format output when --force is given ([c4f81c0][127])

### ⚙️ Build System

- **assets/transformers:** disable broken @typescript-eslint/no-unnecessary-type-assertion eslint rule ([8338afa][128])
- **babel:** add special consideration for symbiote when building itself ([fb7752b][129])

<br />

## @-xun/symbiote[@2.1.0][130] (2024-12-27)

### ✨ Features

- **commands/distributables:** `--partial` now filters against absolute paths ([0c86cb5][131])
- **commands/distributables:** improve partial build metadata output ([0b96a6b][132])

### 🪄 Fixes

- **assets/transformers:** address incorrect capture group string in babel replacer functions ([e682734][133])
- **assets/transformers:** address incorrect extension transform in babel replacer functions ([552b89f][134])
- **assets/transformers:** address incorrect use of `toRelativePath` in babel replacer functions ([7409b67][135])
- **assets/transformers:** be more selective in when and how to replace .env and .env.default files ([2013638][136])
- **assets/transformers:** create test/util.ts instead of test/index.ts ([5057f53][137])
- **assets/transformers:** do not attempt to deep merge the eslint config array ([6c5a8fe][138])
- **assets/transformers:** do not create example definition files if root types dir already exists ([a84c523][139])
- **assets/transformers:** do not include "import" condition during resolution in babel replacer functions ([f9bdb7e][140])
- **assets/transformers:** do not overwrite existing changelog patch files ([b6927a9][141])
- **assets/transformers:** do not overwrite existing global.ts types file ([364fbb2][142])
- **assets/transformers:** populate .vscode example configs from existing or vice versa depending on force ([11bd584][143])
- **assets/transformers:** populate new .env files with full lines from corresponding .env.default files ([aee10cd][144])
- **assets/transformers:** properly construct subpath targets when resolving entry points in babel replacer functions ([d44fa79][145])
- **assets/transformers:** short circuit resolution logic for simple bare specifiers in babel replacer functions ([b7f2754][146])
- **packages/project-utils:** ensure aliases are generated in verse-specificity order ([f592d5f][147])
- **src:** replace xscripts with symbiote in configuration version self-check ([7e66183][148])

### ⚙️ Build System

- **babel:** regenerate configuration asset ([98c028a][149])
- **package:** include missing dependency ([3030eb9][150])

<br />

## @-xun/symbiote[@2.0.0][151] (2024-12-26)

### 💥 BREAKING CHANGES 💥

- `@-xun/scripts` is now deprecated. Use `@-xun/symbiote` instead.

### ✨ Features

- **assets:** expose to per-package asset adders a per-package version of `TransformerContext` ([b7b101e][152])
- **commands/renovate:** add tag aliasing to --github-rename-root renovation ([057f400][153])
- **commands/renovate:** implement --github-rename-root renovation ([d22de31][154])
- **commands/test:** all "Test.AllLocal" meta test kind and make it the default ([e83f2f2][155])

### 🪄 Fixes

- **assets/transformers:** do not throw on bad engines field in package.json (eslint) ([ad83e56][156])
- **assets/transformers:** do not use sync API in eslint.config.mjs ([0a19ce6][157])
- **assets/transformers:** ensure alias functions and related imports are generated with proper syntax ([70b5134][158])
- **assets/transformers:** ensure certain outputs do not trigger eslint errors ([1a522e8][159])
- **assets/transformers:** ensure certain outputs do not trigger eslint errors ([9d05b8b][160])
- **assets/transformers:** generate integration configuration file with proper name ([7a8eee6][161])
- **assets/transformers:** import `assertEnvironment` in release config template ([abbc2da][162])
- **assets/transformers:** only generate .browserslistrc on web-related presets ([53409fa][163])
- **assets/transformers:** remove unnecessary spacing from tsconfig.json output ([2bd57b5][164])
- **assets/transformers:** use actual esm import syntax when generating commitlint config ([a40f886][165])
- **assets/transformers:** use non-broken links in maintenance docs template ([f2bb03d][166])
- **assets/transformers:** use repository name when generating all-contributors config ([641b57b][167])
- **commands/renovate:** prevent attempts to resolve package root relative path in nonsensical scopes ([177a5dc][168])
- **packages/bfe:** ensure `getInvocableExtendedHandler` handler invocation does not trigger bfe checks ([c331ae1][169])
- **packages/bfe:** properly track canonical option name expansions in extended builders ([8724515][170])
- **packages/project-utils:** never derive broken RegExp-based aliases for babel and jest ([a6f02e0][171])
- **src:** use absolute paths when outputting and deleting files; use recursive mkdir ([5e99d88][172])

### ⚡️ Optimizations

- **src:** combine lint-staged formatter invocations into a single command ([f511249][173])
- **src:** use real package name instead of bin alias with npx during lint-staged formatting ([577710b][174])

### ⚙️ Build System

- **commitlint.config:** reduce header-max-length severity from "error" to "warning" ([2841d26][175])
- **jest:** regenerate configuration asset ([5c66c17][176])
- Regenerate several other configuration assets ([6a44488][177])
- Regenerate several other configuration assets ([26fb034][178])
- Transmute remaining files @-xun/scripts => @-xun/symbiote ([4f8d351][179])

### 💎 Aesthetics

- **package:** transmute @-xun/scripts => @-xun/symbiote ([26e7563][180])

<br />

### 🏗️ Patch @-xun/symbiote[@2.0.1][181] (2024-12-26)

#### ⚙️ Build System

- **package:** force CD pipeline to complete ([e42722b][182])

<br />

## @-xun/symbiote[@1.33.0][183] (2024-12-22)

### ✨ Features

- **commands/release:** add `allowMissingNpmScripts` task init option; skippable coverage upload ([f1e8e8e][184])
- **commands:** take advantage of improved target gathering functions ([4925885][185])
- **packages/babel-plugin-metadata-accumulator:** always include type-only import metadata ([ca87588][186])
- **packages/bfe:** add "options" to usage string in help text by default ([410a05a][187])
- **packages/project-utils:** exclude type-only imports from build targets (but keep them elsewhere) ([1d9accc][188])
- **packages/project-utils:** introduce `toDirname` typed analogue of node:fs `dirname` ([51ab454][189])
- **packages/project-utils:** provide richer metadata to consumers of `gatherPackageBuildTargets` ([c2bee3b][190])
- Upgrade to experimental asset generation engine ([b057430][191])

### 🪄 Fixes

- **assets/transformers:** ensure package.json generated for non-hybrid monorepo roots ([eec0ed9][192])
- **assets/transformers:** make env.default transformer resilient to non-existence of .env ([16f64e1][193])
- **commands/test:** ensure all the current package's multiversal dependencies' tests are run ([413dc39][194])
- **commands/test:** ensure test coverage directory is always generated at the current package root ([28c221b][195])
- **packages/project-utils:** ensure alias calculation uses correct relative directory src path ([da7e953][196])
- **util:** consider scope during precheck phase ([578d631][197])

### ⚙️ Build System

- **commands/deploy:** remove dummy release option ([bf993c9][198])
- **husky:** skip slow unit tests ([c52b3f1][199])
- **package:** downgrade typescript-eslint to 8.18.0 and pin it until it is fixed ([cdfd48d][200])
- Regenerate conventional and release assets ([a33aed8][201])

<br />

## @-xun/symbiote[@1.32.0][202] (2024-12-11)

### ✨ Features

- **commands/renovate:** complete --sync-deps and --github-reconfigure-repo renovations ([c9a6e8b][203])
- **packages/project-utils:** add `relativeRoot` to `ProjectMetadata` ([e17adfb][204])

### 🪄 Fixes

- **commands/renovate:** do not update existing origin secrets unless --force ([c5cd76a][205])
- Rewrite assets interface to avoid impedance mismatch ([56e576c][206])

### ⚙️ Build System

- **babel:** `readPackageJsonAtRoot` => `readXPackageJsonAtRoot` ([aa60eeb][207])
- **prettier.config:** reduce typescript print width to 89 (vscode shrunk) ([c248757][208])

<br />

## @-xun/symbiote[@1.31.0][209] (2024-12-07)

### ✨ Features

- **commands/renovate:** add initial stub version of "project renovate" ([8f7777c][210])
- **src:** allow multiple choice string replacements in markdown asset templates ([6fc66d8][211])

### 🪄 Fixes

- **assets/conventional:** ensure `issuePrefixes` xchangelog setting propagates throughout config object ([8a5fd8a][212])
- **commands/release:** only rebuild changelog if the relevant task is not skipped ([68d5bda][213])
- **commands/renovate:** account for vacuous case in bfe check functions ([ef6927b][214])
- **src:** actually invoke "project renovate" command from within "release" command ([ceb6c62][215])
- **src:** factor out shared runner wrapper; ensure runner rejects when it should ([ce93443][216])
- **src:** support parameters in handlebars-style template strings ([6ce819a][217])

### ⚙️ Build System

- **husky:** use proper lint command ([62a5a12][218])

<br />

### 🏗️ Patch @-xun/symbiote[@1.31.2][219] (2024-12-08)

#### 🪄 Fixes

- **commands/test:** ensure all relevant source files are included when calculating coverage ([0565333][220])

#### ⚙️ Build System

- Remove execa bridge dependency now that we use @-xun/run exclusively ([f4ecfc9][221])

<br />

### 🏗️ Patch @-xun/symbiote[@1.31.1][222] (2024-12-08)

#### 🪄 Fixes

- **command/release:** ensure "release" calls "project renovate" with --force ([cfe28e3][223])
- **packages/bfe:** ensure `withUsageExtensions` configurations function as advertised ([8935008][224])
- **packages/bfe:** handle declarative `group` option configurations in bfe instead of bf/yargs ([39e37a8][225])
- **src:** use more specific conflicts for --deprecate vs --undeprecate ([58a6223][226])

<br />

## @-xun/symbiote[@1.30.0][227] (2024-11-25)

### ✨ Features

- **commands/list-tasks:** allow filtering tasks by string ([3710988][228])
- **packages/bfe:** add support for `prependNewlines` ([e163302][229])

### 🪄 Fixes

- **commands/release:** ensure codecov uploader is passed the proper arguments ([ca47d93][230])

<br />

### 🏗️ Patch @-xun/symbiote[@1.30.3][231] (2024-12-04)

#### 🪄 Fixes

- **packages/project-utils:** ensure meaningful error output from `readJsonc` ([01dca03][232])
- **src:** allow testverse imports in non-source typescript files ([b923d6d][233])

<br />

### 🏗️ Patch @-xun/symbiote[@1.30.2][234] (2024-11-26)

#### ⚙️ Build System

- **remarkrc:** ensure remark doesn't mangle GFM alerts with escape characters ([98a868e][235])

<br />

### 🏗️ Patch @-xun/symbiote[@1.30.1][236] (2024-11-25)

#### 🪄 Fixes

- **config/conventional:** fix global patch detection logic ([89eebe7][237])

<br />

## @-xun/symbiote[@1.29.0][238] (2024-11-24)

### ✨ Features

- **packages/bfe:** allow more control over `withUsageExtensions` result ([053bf3e][239])
- **src:** add support for init version tag suffixes to "build changelog" ([002431f][240])

### 🪄 Fixes

- **src:** ensure "clean" command does not delete ignored packages ([65b8c0b][241])

<br />

### 🏗️ Patch @-xun/symbiote[@1.29.2][242] (2024-11-25)

#### ⚙️ Build System

- **package:** upgrade @-xun/changelog to 1.0.0 ([d89809b][243])

<br />

### 🏗️ Patch @-xun/symbiote[@1.29.1][244] (2024-11-24)

#### ⚙️ Build System

- **remarkrc:** fix faulty array reference ([8feaaa7][245])

<br />

## @-xun/symbiote[@1.28.0][246] (2024-11-24)

### ✨ Features

- **babel:** use reverse entrypoint resolver to fix tsc output ([c3fc126][247])
- **packages/project-utils:** add `try` option to json reading functions ([a91e7fa][248])

### 🪄 Fixes

- **eslint:** do not collapse path group overrides ([71b17c8][249])
- **packages/project-utils:** ensure external and internal build target sets are mutually exclusive ([7fed439][250])
- Remove unnecessary restrictions on universe imports; bail out when an import is rejected ([11b585d][251])
- **src:** warn when release process ends with a dirty repo ([cf5b25b][252])

### ⚙️ Build System

- **babel:** add core-js validation checks ([55ee62d][253])
- **babel:** fix incorrect regexp stringification when using transform-rewrite-imports ([56b706a][254])

<br />

## @-xun/symbiote[@1.27.0][255] (2024-11-23)

### ✨ Features

- **project-utils:** expose `process.cwd` replacement exports ([1a69887][256])

### 🪄 Fixes

- **distributables.ts:** do not output "build succeeded but" message unless build actually succeeded ([1262cc8][257])

### ⚙️ Build System

- **eslint:** add `instanceof` and `process.cwd` usage restrictions ([645473d][258])
- **package:** make scripts less verbose ([c5c742e][259])

<br />

## @-xun/symbiote[@1.26.0][260] (2024-11-22)

### ✨ Features

- **packages/bfe:** ensure `coerce` function always receive an array when so configured ([5c8816d][261])
- **src:** implement "release" command ([44be676][262])
- **src:** implement new graph algorithm for lint target determination ([3323fc3][263])
- **src:** implement new graph algorithm for test target determination ([8a67d70][264])

### 🪄 Fixes

- **packages/bfe:** ensure downstream builder functions receive nullable argv ([9b551a7][265])
- **packages/bfe:** force `BfeStrictArgs` to be partial in argv to make usage easier ([0924dd3][266])
- **packages/bfe:** use more intuitive arg-val interpretation when given argument value is an array ([ce72af2][267])
- **packages/cli-utils:** do not propagate upstream error messages ([6ac3376][268])
- **src:** ignore root package properly when releasing package ([09373fa][269])
- **src:** improve dev version detection ([b3e95e7][270])
- **src:** improve outputs; fix crash due to shifting arg type ([d27007d][271])
- **src:** patch globals to deal with design decisions from upstream conventional-changelog-core ([998218d][272])

### ⚙️ Build System

- **eslint:** allow "arg" as a variable name ([9087086][273])
- **eslint:** update to use experimental features of @-xun/eslint-plugin-import-experimental ([36016b1][274])
- **jest:** ensure jest and jest-haste-map ignore ignored packages ([86fca58][275])
- **src:** update with latest launch.json ([bb6bde9][276])

<br />

## @-xun/symbiote[@1.25.0][277] (2024-11-14)

### ✨ Features

- Integrate @-xun/changelog ([31c7bbb][278])
- Integrate @-xun/release ([4f807cf][279])
- Integrate @-xun/run ([d22cee3][280])
- Integrate Tstyche into "test" command ([9045cd7][281])
- **packages/project-utils:** add `typescriptTestFiles` to `ProjectFiles` objects ([e7c4b6e][282])
- **packages/project-utils:** add support for `.shared` files at package roots ([c62261b][283])
- **packages/project-utils:** ensure packages with id matching `*.ignore` are excluded from analysis ([4d5ddb6][284])
- **packages/test-utils:** split off test utilities into new package ([576dd64][285])
- **src:** "test" prevents propagation of DEBUG env var by default unless `--debug` given ([ffcad30][286])
- **src:** ensure "build changelog" prints out full package name and version ([4059ed7][287])
- **src:** ensure current package is always printed last for "list-tasks" ([5ea7f8a][288])
- **src:** expand "build" pre-check to include all of a package's TS files ([d4d3756][289])
- **src:** explicitly allow arbitrary options passed to executables in "lint" and "test" ([d915727][290])
- **src:** implement "build" support for partial builds via `--partial` ([5d61e87][291])

### 🪄 Fixes

- **assets/config:** update conventional configuration to support both monorepos and polyrepos ([1d0dee8][292])
- **packages/project-utils:** ensure `isRootPackage` differentiates from non-root packages ([2b46883][293])
- **packages/project-utils:** ensure specifier-ok checks are also performed on type-only imports ([95b0f68][294])
- **src:** ambient types are only allowed at package root types/ dir ([81ba7bc][295])
- **src:** do not run prettier on files not targeted by `--files` ([128e83a][296])
- **src:** ensure "format" functions properly in a monorepo context given `--scope` ([c4016a8][297])
- **src:** ensure "lint" functions properly in monorepo context given `--scope` ([0f4c7b1][298])
- **src:** ensure "test" functions properly in a monorepo context given `--scope` ([1894d80][299])
- **src:** ensure BF context receives the correct version number from own package.json ([351ee50][300])
- **src:** ensure prettier always gets a pass at markdown and json files in "format" command ([74ab5d9][301])
- **src:** ensure tstyche is only run when type-only tests exist ([18dbad0][302])
- **src:** ensure version extraction regexp behaves robustly ([8e82ac1][303])
- **src:** improve "build distributables" options configuration ([f323a6a][304])
- **src:** improve command output aesthetics ([4a6e254][305])
- **src:** improved `--version` support ([4e3cdc0][306])
- **src:** include full package name and version in release commit subject ([5e00587][307])
- **src:** only match xpipeline commands that are proper suffixes ([9b8b41a][308])
- **src:** use proper gitLogOptions.paths property (fixes typo) ([e22403c][309])

### ⚙️ Build System

- **eslint:** ensure .transpiled directory is ignored ([c34a549][310])
- **gitignore:** upgrade to more robust .gitignore ([43da882][311])
- **husky:** add husky pre-push protective hook ([33af2bc][312])
- **jest:** ensure .transpiled directory is ignored ([c1ac811][313])
- **jest:** ensure .transpiled directory is ignored by jest-haste-map etc ([901d853][314])
- **jest:** ignore type-only tests ([1fb8568][315])
- **package:** correct typo in bug.url ([3373208][316])
- **package:** use `--no-parallel` in "release" script ([5eb9def][317])
- **prettierignore:** ignore license files ([b928e8a][318])
- **remarkrc:** never automatically capitalize our packages' names in markdown headings ([45bcd8c][319])
- **src:** patch both `Proxy` and `spawn` as a side effect ([f50abaf][320])
- Use consistent exclusions across TS configurations ([98a1dd7][321])

<br />

## @-xun/symbiote[@1.24.0][322] (2024-11-01)

### ✨ Features

- **packages/project-utils:** re-implement caching subsystem ([472af2c][323])

### 🪄 Fixes

- **packages/project-utils:** remove overengineered sync/async plumbing functions ([8ab4eec][324])
- **src:** ensure build pre-checks run before the ./dist dir is cleared ([69f2dc0][325])
- **src:** ignore internal-resolution-errors with attw since we do our own internal checks ([8dc4a96][326])
- **src:** prevent clean command from obliterating cwd ([e3fa185][327])
- **src:** use upward root mode when searching for babel configs ([89b57c4][328])

### ⚡️ Optimizations

- **eslint:** use \_\_dirname assumption instead of analyzing the entire project ([b8b82d9][329])

### ⚙️ Build System

- **package:** narrow scope of the lint npm script ([556f17e][330])
- **package:** use no-hoist to block execa hoisting ([74d58d6][331])

<br />

## @-xun/symbiote[@1.23.0][332] (2024-10-27)

### ✨ Features

- **babel:** replace tsconfig-replace-paths with babel-plugin-transform-rewrite-import ([1bdceca][333])
- **packages/project-utils:** implement support for pseudodecorators ([6ff2bd3][334])
- **src:** perform validity and extraneity checks on build output for "build distributables" ([a1d3657][335])

### 🪄 Fixes

- **eslint:** use latest `analyzeProjectStructure()` function ([fa2a97f][336])
- **packages/project-utils:** ensure ".git" is already returned regardless of .gitignore ([6e3f599][337])
- **packages/project-utils:** ensure analysis cache uses entire call signature when memoizing ([ca021f8][338])
- **packages/project-utils:** repair caching mechanism for analyze-project-structure ([b9218ee][339])

### ⚙️ Build System

- Add pseudodecorators where appropriate ([dc47cfb][340])
- **package:** fix dependency issues identified by xscripts when analyzing its own project structure ([ebb4fb5][341])
- **package:** remove extraneous dependencies ([ccc82b3][342])

<br />

## @-xun/symbiote[@1.22.0][343] (2024-10-24)

### ✨ Features

- **src:** make `--run-to-completion` default to `true` for "lint" command ([8bdf28b][344])

### 🪄 Fixes

- **eslint:** disable no-unsupported-features checks, generalize `overwriteFileProperty`, fix eslint-plugin-n bug ([0c3f85c][345])
- **src:** ensure CannotRunOutsideRoot error only triggers when outside root ([531d3ea][346])
- **src:** properly add the development tag when using self-referential xscripts ([a7a66d9][347])

### ⚙️ Build System

- **eslint:** modernize eslint config ([e37006e][348])
- **package:** expand engines.node to all maintained node versions ([349cf20][349])
- **package:** remove more rarely used scripts ([d8b7442][350])
- **package:** use consistent script names ([c7fe410][351])
- **src:** fix import missing extension ([2c40974][352])
- **src:** fix import missing extension ([f5fb1bc][353])

<br />

## @-xun/symbiote[@1.21.0][354] (2024-10-18)

### ✨ Features

- **@-xun/babel-plugin-metadata-accumulator:** create accumulator babel plugin ([bf9514f][355])
- **src:** upgrade commands with scope (monorepo) support ([7ad96c5][356])

### 🪄 Fixes

- **src:** improve conventional-commits config monorepo support ([d54cfa0][357])

### ⚙️ Build System

- **commitlint:** update commitlint configuration from cjs (js) to esm (mjs) ([cd82265][358])
- **eslint.config:** activate several new rules ([94a2253][359])
- **eslint:** update with alias test and latest rule updates ([db0c6d7][360])
- **eslint:** upgrade eslint-plugin-import usage to take advantage of v9 support ([7dcbf56][361])
- **jest:** update jest configuration from cjs (js) to esm (mjs) ([e334962][362])
- **lint-staged:** update lint-staged configuration from cjs (js) to esm (mjs) ([8833e0a][363])
- **ncurc:** pin non-broken remark-lint-no-inline-padding ([5070ab4][364])
- **package:** add dependency aliases for find-up\@5 and escape-string-regexp\@4 ([1eff5cb][365])
- **prettier:** update prettier configuration from cjs (js) to esm (mjs) ([0eb7fd3][366])
- **remarkrc:** add lint-no-undef NODE\_ENV support ([e169f47][367])
- Split tsconfig into project vs package configurations ([e7b8579][368])
- Update .gitignore and .prettierignore with improved documentation and latest best practices ([a35f4c0][369])
- **vscode:** update full project lint vscode task example ([3f1a5a9][370])

<br />

## @-xun/symbiote[@1.20.0][371] (2024-08-20)

### ✨ Features

- Ensure `--changelog-file` is added to "build changelog" ([d84b35f][372])
- **src:** add `--import-section-file` and `--changelog-file` flags to "build changelog" ([8cf99a9][373])

### 🪄 Fixes

- **src:** ensure "format" ignores .remarkignore; ensure "lint" respects .remarkignore ([3dd5d78][374])
- **src:** ensure changelog prints patches (including imports) in proper order ([5c3ed73][375])
- **src:** properly section off patch notes using dividers ([c912b09][376])

### ⚙️ Build System

- **package:** update repository url to conform with GHA provenance guidelines ([9cb2d72][377])
- **src/assets:** disable remark-validate-links for template files ([ce03500][378])
- **tsconfig:** set declaration=false by default ([22f2f41][379])

<br />

### 🏗️ Patch @-xun/symbiote[@1.20.8][380] (2024-08-23)

#### 🪄 Fixes

- **src:** ensure release notes have headers at level 2 ([ce701f3][381])

<br />

### 🏗️ Patch @-xun/symbiote[@1.20.7][382] (2024-08-23)

#### 🪄 Fixes

- **src:** ensure only the start of the release notes are trimmed ([3c48ae1][383])

<br />

### 🏗️ Patch @-xun/symbiote[@1.20.6][384] (2024-08-23)

#### 🪄 Fixes

- **src/assets:** remove first line from semantic-release plugin generated release notes ([76992d9][385])

<br />

### 🏗️ Patch @-xun/symbiote[@1.20.5][386] (2024-08-22)

#### 🪄 Fixes

- Ensure xscripts supports limited invocations outside of project root ([0864f92][387])
- **src/commands/lint:** ensure no erroneous whitespaces are inserted between outputs ([ff3853f][388])

<br />

### 🏗️ Patch @-xun/symbiote[@1.20.4][389] (2024-08-21)

#### 🪄 Fixes

- Remove deep import ([0bf89ca][390])

<br />

### 🏗️ Patch @-xun/symbiote[@1.20.3][391] (2024-08-21)

#### 🪄 Fixes

- **src:** move deep import with respect to new deduped location ([dd265b4][392])
- **src:** remove utf8 symbols from changelog generator output ([cf21d7d][393])

<br />

### 🏗️ Patch @-xun/symbiote[@1.20.2][394] (2024-08-21)

#### 🪄 Fixes

- **src:** ensure calls to remark include an explicit --rc-path ([bc2a56b][395])
- **src:** ensure robust handling of formatter errors when running "format" ([5211547][396])
- **src:** make "build changelog" `CustomCliArguments` type more accurate ([8735f61][397])
- **src:** work around glob-gitignore bug in "format" ([a86884f][398])

#### ⚙️ Build System

- **eslint.config:** update @typescript-eslint/require-await linting config ([b23b12b][399])
- **release.config:** subsume semantic-release plugin functionality into custom release conf plugin ([8b54237][400])
- **src/assets:** move custom semantic-release plugin into config asset ([25e7a3b][401])
- **src:** ensure custom semantic-release plugin does not allow non-md files ([904c9ac][402])

<br />

### 🏗️ Patch @-xun/symbiote[@1.20.1][403] (2024-08-20)

#### ⚙️ Build System

- **release:** fix incorrect use of lodash template evaluate delimiter ([35876a1][404])

## @-xun/symbiote[@1.19.1][405] (2024-07-29)

#### 🪄 Fixes

- **package:** fix asset config import configuration ([d201164][406])

## @-xun/symbiote[@1.19.0][407] (2024-07-29)

### ✨ Features

- **src:** implement `--output-sort` for "build changelog"; integrate conventional core and drop cli ([587a354][408])

### ⚙️ Build System

- **commitlint.config:** expand to include several useful rules ([909949d][409])

## @-xun/symbiote[@1.18.0][410] (2024-07-27)

### ✨ Features

- **src:** "build changelog" now accepts `--only-patch-changelog` and `--output-unreleased` ([6c7ae27][411])
- **src:** "lint" now accepts `--run-to-completion` and `--ignore-warnings` ([e833523][412])

### 🪄 Fixes

- **package:** downgrade @arethetypeswrong/cli to ^0.15.0 ([0383586][413])
- **src:** ensure node options are concatenated properly ([3a3489c][414])

### ⚡️ Optimizations

- **src:** take advantage of [tsc@5.6-beta][415] `--noCheck` argument in "build distributables" ([4e75096][416])

### ⚙️ Build System

- **eslint.config:** update @typescript-eslint/unbound-method linting config ([f6515ea][417])
- Update source aliases to latest ([8d71521][418])
- **vscode:** take advantage of new `--run-to-completion` flag ([d9b4b80][419])
- **vscode:** update example with latest best practices ([64b7309][420])

## @-xun/symbiote[@1.17.0][421] (2024-07-23)

### ⚙️ Build System

- **eslint.config:** update to eslint flat config (eslint.config.mjs) ([609fca8][422])
- **husky:** update husky scripts ([e55a88e][423])
- **package:** add semver; force install alpha versions of typescript-eslint et al ([b56fd66][424])
- **package:** update exports, dependencies, and scripts ([323579d][425])
- Update to eslint\@9; begin transition to eslint.config.js flat ([52763c5][426])

### @-xun/symbiote[@1.16.1][427] (2024-07-14)

#### 🪄 Fixes

- **src:** place --copy-files argument in proper order in babel build sub-command ([8f1d25d][428])

## @-xun/symbiote[@1.16.0][429] (2024-07-14)

### ✨ Features

- **src:** implement "lint" command ([346b4ac][430])

### 🪄 Fixes

- **package:** include missing listr2 dependency ([f42f4ab][431])
- **src:** ensure "build distributables" copies non-compiled files into ./dist ([e596e5b][432])
- **src:** ensure "lint" command linter subprocesses don't write to stdout or hang after error ([d96ae1d][433])
- **src:** ensure proper checks with various arguments ([c9e254a][434])

### ⚙️ Build System

- **husky:** update lint script to use latest name ([ea6aaff][435])
- **package:** add final npm scripts ([eb5631b][436])
- **package:** replace typescript babel preset dependency with syntax plugin ([b72401a][437])
- **package:** update lint scripts to use xscripts ([7c1e7f1][438])

## @-xun/symbiote[@1.15.0][439] (2024-07-07)

### ✨ Features

- **src:** implement "test" script/command ([b665723][441])

## @-xun/symbiote[@1.14.0][442] (2024-07-07)

### ✨ Features

- **src:** add --clean-output-dir option to "build distributables" command ([a507530][443])
- **src:** add struts for projector-js replacement "project" commands ([489e75a][444])
- **src:** merge "build distributables" and "build transpiled" commands ([1b6c72a][445])

### 🪄 Fixes

- **src:** add .tsx to babel --extensions arg ([68c5582][446])
- **src:** ensure "build distributables" --generate-intermediates-for includes tests ([2ed4344][447])
- **src:** remove bad options references from "format" command ([cafeb73][448])

### ⚙️ Build System

- **maintaining:** note that resetting the working tree before publishing is optional ([f08250c][449])

## @-xun/symbiote[@1.13.0][450] (2024-07-02)

### ✨ Features

- **src:** implement "build documentation" script ([05e56e7][451])
- **src:** implement "build externals" script ([1336341][452])

### ⚙️ Build System

- Ensure local ecosystem ignores only relevant files ([e4a1e0b][453])

## @-xun/symbiote[@1.12.0][454] (2024-07-01)

### ✨ Features

- **src:** implement "build changelog" script ([8d4bb6d][455])
- Transmute "format" command's --skip-docs into the more versatile --skip-ignored ([7364616][456])

### ⚙️ Build System

- **changelog:** add new CHANGELOG.md typo patches ([b9b106a][457])
- Hide all warnings from nodejs ([c1a4b9c][458])
- **package:** update scripts (and release.config.js) to use "build changelog" command ([5b11c68][459])
- **remarkrc:** always translate normal links into reference links ([99c7b33][460])

### 🔥 Reverted

- _"build(prettierignore): no longer ignore CHANGELOG.md when formatting"_ ([ddd9192][461])

## @-xun/symbiote[@1.11.0][462] (2024-06-30)

### ✨ Features

- **src:** add all-contributors regeneration to "format" command ([d74f099][463])

### 🪄 Fixes

- **src:** ensure --files never hands prettier paths it can't handle when running "format" command ([0f4dd16][464])
- **src:** ensure "format" command all-contributors regeneration only targets root README.md ([2cd56d1][465])
- **src:** ensure all glob relevant glob calls never return directories ([9764967][466])
- **src:** ensure, when --files is given, at least one option given for "format" command ([fd86f3f][467])
- **src:** fix fix fd86f3f ([e295a02][468])

### ⚙️ Build System

- **lint-staged.config:** update to use xscripts ([d290ba5][469])
- Reorganize deps/devdeps and re-enable commit-spell ([4ea8aa4][470])

### @-xun/symbiote[@1.10.1][471] (2024-06-29)

#### 🪄 Fixes

- **src:** ensure --files is respected by prettier in "format" command ([483f036][472])

## @-xun/symbiote[@1.10.0][473] (2024-06-29)

### ✨ Features

- **src:** add --prepend-shebang, Next.js support to "build distributables" command ([6575d49][474])
- **src:** improve capabilities of "format" command ([7d33dfe][475])

### 🪄 Fixes

- **src:** actually implement --skip-docs functionality in "format" command ([d535b78][476])
- **src:** restrict root/sub-root check to certain commands ([1b65f46][477])

## @-xun/symbiote[@1.9.0][478] (2024-06-28)

### ✨ Features

- **src:** add `--full` argument to "list-tasks" command ([f47742b][479])
- **src:** prevent cli from running if not in root or sub-root ([4f280dc][480])

### 🪄 Fixes

- **src:** fix lib output and improve other aspects of the "build distributables" command ([159d771][481])

## @-xun/symbiote[@1.8.0][482] (2024-06-27)

### ✨ Features

- **src:** commit initial version of "build" command ([c7b7623][483])

### ⚙️ Build System

- **eslintrc:** do not ignore src/build ([847cc63][484])
- **gitignore:** do not ignore src files anymore ([fd210c5][485])

## @-xun/symbiote[@1.7.0][486] (2024-06-26)

### ✨ Features

- **src:** implement "format" script ([7824c25][487])

### 🪄 Fixes

- **remarkrc:** improve output of "format" command" ([b4c296e][488])

### ⚙️ Build System

- **package:** replace format script with "format" command ([005e378][489])
- **package:** use --hush over --quiet for "format" command ([9e4ae59][490])

## @-xun/symbiote[@1.6.0][491] (2024-06-24)

### ✨ Features

- **src:** implement "deploy" script ([62e673b][492])

## @-xun/symbiote[@1.5.0][493] (2024-06-23)

### 🪄 Fixes

- **clean.ts:** add .vercel to list of ignored directories ([fd903a4][494])
- **src:** use loose implications with deploy command ([8e11d66][495])

### ⚙️ Build System

- **package:** disable tty in debug when running tests ([b57a6be][496])
- **package:** fix bad overwrite of ignore patterns ([8d03799][497])

### @-xun/symbiote[@1.4.1][498] (2024-06-02)

#### 🪄 Fixes

- **src:** pass arbitrary args to downstream executable ([4b94a07][499])

#### ⚙️ Build System

- **package:** update "start" script to ensure arbitrary args are not erroneously parsed ([a8ddaa5][500])

## @-xun/symbiote[@1.4.0][501] (2024-06-01)

### ✨ Features

- **src:** implement "dev" script ([4eeba00][502])

### ⚙️ Build System

- **package:** use real path to devdep version of xscripts ([99d5786][503])

## @-xun/symbiote[@1.3.0][504] (2024-06-01)

### ✨ Features

- **src:** implement "start" script ([cf66045][505])

### 🪄 Fixes

- **package:** add workaround for npx being unable to deal with this type of recursion ([b999593][506])
- **src:** do not inherit IO when executing "clean" script ([380c055][507])
- **src:** execute husky post-checkout hook if available ([f0b3b8c][508])

## @-xun/symbiote[@1.2.0][509] (2024-05-31)

### ✨ Features

- Implement "prepare" script ([6426d70][510])

## @-xun/symbiote[@1.1.0][511] (2024-05-31)

### ✨ Features

- Implement "list-tasks" script ([ac5a9ba][512])

## @-xun/symbiote[@1.0.0][513] (2024-05-31)

### ✨ Features

- **src:** implement "clean" script ([89d81a3][514])

### ⚙️ Build System

- **package:** update build scripts ([589fcb0][515])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.10.0...@-xun/symbiote@2.11.0
[4]: https://github.com/Xunnamius/symbiote/commit/e53be8bb276c3ab03251512811746295ebcce71d
[5]: https://github.com/Xunnamius/symbiote/commit/3058d4933a16c9b3de7104ae0e599e7d77b2e339
[6]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.8...@-xun/symbiote@2.11.9
[7]: https://github.com/Xunnamius/symbiote/commit/b951959a4a12ac484c8addc839f912c4e5767875
[8]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.7...@-xun/symbiote@2.11.8
[9]: https://github.com/Xunnamius/symbiote/commit/4196fe07541a75af2564b9958d306439f0e664b6
[10]: https://github.com/Xunnamius/symbiote/commit/e432f8a8dd0c76de7524baa20d622cf287bdc289
[11]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.6...@-xun/symbiote@2.11.7
[12]: https://github.com/Xunnamius/symbiote/commit/e734cc60de727300331625325b12bb8a19c93bef
[13]: https://github.com/Xunnamius/symbiote/commit/2b00195a42f9d7d1a8909bc48acff23d25d34557
[14]: https://github.com/Xunnamius/symbiote/commit/605e4ebf5a17a91c7b1c771cbfe4a217cacfff57
[15]: https://github.com/Xunnamius/symbiote/commit/31863db510c943499d349ca604a5824391f5261b
[16]: https://github.com/Xunnamius/symbiote/commit/e80d6e7a12cf1540568724ac2379ae6205268809
[17]: https://github.com/Xunnamius/symbiote/commit/614ba8b3d2b60d90186cbf83755dd786568a1ea7
[18]: https://github.com/Xunnamius/symbiote/commit/690ad178dfc81b1dc835586ab9cfef3999a0a47f
[19]: https://github.com/Xunnamius/symbiote/commit/5540b7dc1f00515b624396cb6229f5833bd912ff
[20]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.5...@-xun/symbiote@2.11.6
[21]: https://github.com/Xunnamius/symbiote/commit/2dfb17d9dea82a0725c47d3a236cced0f89ec2df
[22]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.4...@-xun/symbiote@2.11.5
[23]: https://github.com/Xunnamius/symbiote/commit/6f7a3022b9b1bbbdc6b044a195e88e0c241bf056
[24]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.3...@-xun/symbiote@2.11.4
[25]: https://github.com/Xunnamius/symbiote/commit/67bad2710e22c0646c53c8f1756c6dae869c8da4
[26]: https://github.com/Xunnamius/symbiote/commit/5ab38d0bb0a593488721fdd41b6c1fcc4618d081
[27]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.2...@-xun/symbiote@2.11.3
[28]: https://github.com/Xunnamius/symbiote/commit/15d3444639e5919af49429f7c60a387a77f22b82
[29]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.1...@-xun/symbiote@2.11.2
[30]: https://github.com/Xunnamius/symbiote/commit/16af6eb8c522458468176444e3f6b3699de64d72
[31]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.0...@-xun/symbiote@2.11.1
[32]: https://github.com/Xunnamius/symbiote/commit/1e0174c32cff28e404202c1cf920e474b94cfe7b
[33]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.9.0...@-xun/symbiote@2.10.0
[34]: https://github.com/Xunnamius/symbiote/commit/900c84b80913f7ae692320e081e53426405703b5
[35]: https://github.com/Xunnamius/symbiote/commit/2d7c4335de2455d1f751317edae49a754f9d254d
[36]: https://github.com/Xunnamius/symbiote/commit/76bd411502e2a42519463cb94808106b819f9e7b
[37]: https://github.com/Xunnamius/symbiote/commit/e264510ce9ff4a5efdae156d17b4f45deae13ee5
[38]: https://github.com/Xunnamius/symbiote/commit/ae7340fc0add85fe6fd58d8a754fecad0baf897c
[39]: https://github.com/Xunnamius/symbiote/commit/bccf09153de508954f27e763e79a4f013585523d
[40]: https://github.com/Xunnamius/symbiote/commit/77e22aeee55495616049bd79e99271de7ec41788
[41]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.8.2...@-xun/symbiote@2.9.0
[42]: https://github.com/Xunnamius/symbiote/commit/45a95680565f7437367edb2f8cc44a33e7541aa0
[43]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.7.1...@-xun/symbiote@2.8.0
[44]: https://github.com/Xunnamius/symbiote/commit/abc2eae40665c876d11cda8ecb8f3268af247f8c
[45]: https://github.com/Xunnamius/symbiote/commit/152bcdb594f0d452379b3dbaae56fb6765c476ee
[46]: https://github.com/Xunnamius/symbiote/commit/7fa548ff9a16b0397fd87c97dad6f6904861c4b0
[47]: https://github.com/Xunnamius/symbiote/commit/d34d5690d5677e45d31b42d2dc77bf19fe36b1ac
[48]: https://github.com/Xunnamius/symbiote/commit/1631e8da95ed843f732daf06a010f8966abc280a
[49]: https://github.com/Xunnamius/symbiote/commit/032aa3047de161ffa5a57c482156b7b11c604f61
[50]: https://github.com/Xunnamius/symbiote/commit/88b7f3835ae27fef939e0a5c61c1aaa9489f4114
[51]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.8.1...@-xun/symbiote@2.8.2
[52]: https://github.com/Xunnamius/symbiote/commit/ecdd713c4d242b92209fafa38beadafe2769795c
[53]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.8.0...@-xun/symbiote@2.8.1
[54]: https://github.com/Xunnamius/symbiote/commit/af354d0d777efcad54c5b9fef571837497afd230
[55]: https://github.com/Xunnamius/symbiote/commit/4a8948281f4836cc6fa64e7c42308f2f0237688c
[56]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.6.0...@-xun/symbiote@2.7.0
[57]: https://github.com/Xunnamius/symbiote/commit/28acb7961df65f3e39ec6b549117698f529b083c
[58]: https://github.com/Xunnamius/symbiote/commit/6f8cbe26308839edf019112bb191cb4e7c8a18a8
[59]: https://github.com/Xunnamius/symbiote/commit/edc6cca484e3748ffa96bf6f6831c7193e830976
[60]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.7.0...@-xun/symbiote@2.7.1
[61]: https://github.com/Xunnamius/symbiote/commit/138da875f3247f966687e95b91c7caf822df3c49
[62]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.6...@-xun/symbiote@2.6.0
[63]: https://github.com/Xunnamius/symbiote/commit/dddfc44396c55ebfc704f8d576edac2868fe28cc
[64]: https://github.com/Xunnamius/symbiote/commit/180f85f730f6f4763c685986886d65a870f73558
[65]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.3...@-xun/symbiote@2.5.0
[66]: https://github.com/Xunnamius/symbiote/commit/c133a92a38c285bf0a63dd9098f7c876155f3274
[67]: https://github.com/Xunnamius/symbiote/commit/6210727d4bc9b20c2064df6f0a987bc509ba512a
[68]: https://github.com/Xunnamius/symbiote/commit/625451cb712d5ebe6ef89478fed8669af6fa7236
[69]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.5...@-xun/symbiote@2.5.6
[70]: https://github.com/Xunnamius/symbiote/commit/2fd61c45d5639f5e6f8edadc3b7d4851011bc365
[71]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.4...@-xun/symbiote@2.5.5
[72]: https://github.com/Xunnamius/symbiote/commit/3831af5468c04bc48a0849a15233d1d644e5c45b
[73]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.3...@-xun/symbiote@2.5.4
[74]: https://github.com/Xunnamius/symbiote/commit/c23304e8bb55d71623ce6f30acd2195d704326aa
[75]: https://github.com/Xunnamius/symbiote/commit/141111918245fc7294e26b6ee944d4c6977e4f25
[76]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.2...@-xun/symbiote@2.5.3
[77]: https://github.com/Xunnamius/symbiote/commit/0dd4fb76481355ace84b39c7eeba5c230951a237
[78]: https://github.com/Xunnamius/symbiote/commit/607a378f58157a1b6b0a3a16880d3c2ba9e9d2e0
[79]: https://github.com/Xunnamius/symbiote/commit/19492a702140242c81a8ef20cd42d9908f722b28
[80]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.1...@-xun/symbiote@2.5.2
[81]: https://github.com/Xunnamius/symbiote/commit/4231719a4050b5b3956e3e19d12d8c469fd0bd37
[82]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.0...@-xun/symbiote@2.5.1
[83]: https://github.com/Xunnamius/symbiote/commit/b2dfed2c46fd5bceb7922642e9955bce5a5c424b
[84]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.4...@-xun/symbiote@2.4.0
[85]: https://github.com/Xunnamius/symbiote/commit/10f876ec625b234388ec5689f4d10663cabb4139
[86]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.2...@-xun/symbiote@2.4.3
[87]: https://github.com/Xunnamius/symbiote/commit/7b8ca545f93c3e9d22b693c6c58dbb29604867ff
[88]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.1...@-xun/symbiote@2.4.2
[89]: https://github.com/Xunnamius/symbiote/commit/0bafa3046d16effe919127463c68cff1fb657848
[90]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.0...@-xun/symbiote@2.4.1
[91]: https://github.com/Xunnamius/symbiote/commit/02e289a9c890d4a9fb9b9f17fa7e8731f4ab9d2b
[92]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.2.0...@-xun/symbiote@2.3.0
[93]: https://github.com/Xunnamius/symbiote/commit/23d01f3f75587880142e8b0ffdaa5873a38a84c7
[94]: https://github.com/Xunnamius/symbiote/commit/ee079c1feb775313923680cea371b862fa61c083
[95]: https://github.com/Xunnamius/symbiote/commit/c92b2cbb33a4cd6367604b98422a0248a129d9bd
[96]: https://github.com/Xunnamius/symbiote/commit/c565452e8b3b261e37e21b0b09dd52d395ccaa35
[97]: https://github.com/Xunnamius/symbiote/commit/6353b4f3774f70fa5299ed6666a14165faacb829
[98]: https://github.com/Xunnamius/symbiote/commit/64a41385dbcf83b268fe4d03f2ba1d60b705b634
[99]: https://github.com/Xunnamius/symbiote/commit/9304778395eb8c9f48164e2c1d71660a7da484f6
[100]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.3...@-xun/symbiote@2.3.4
[101]: https://github.com/Xunnamius/symbiote/commit/7f1f7a2772751006b2f87a140f0b00c116f4412c
[102]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.2...@-xun/symbiote@2.3.3
[103]: https://github.com/Xunnamius/symbiote/commit/1546ab8527a571efe54081d7614bd35a9d6e0c3c
[104]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.1...@-xun/symbiote@2.3.2
[105]: https://github.com/Xunnamius/symbiote/commit/ff6ce22d3a3433c07460af5758ce7920a1d9aa5a
[106]: https://github.com/Xunnamius/symbiote/commit/9a456c5795616fcf9f8cafa0c625eb12cf85cf50
[107]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.0...@-xun/symbiote@2.3.1
[108]: https://github.com/Xunnamius/symbiote/commit/1901cfe78a48fcd1dfae4e3760acf197e8812676
[109]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.1.0...@-xun/symbiote@2.2.0
[110]: https://github.com/Xunnamius/symbiote/commit/0c1b93abd02cb8ad4eec4362b917e5484000cae4
[111]: https://github.com/Xunnamius/symbiote/commit/ce6a12a98f74e554db875dfa2e53e0fb3a45510a
[112]: https://github.com/Xunnamius/symbiote/commit/14bf31ff01c26186bce6a35150f4e002e6f74475
[113]: https://github.com/Xunnamius/symbiote/commit/c263dc5aa35ce06d85077337af7b4ca35564504d
[114]: https://github.com/Xunnamius/symbiote/commit/f55664476107f5f2aaefbfe11df6c0e59e7bd7f6
[115]: https://github.com/Xunnamius/symbiote/commit/9581339cf055172c61e96900096f7e6f3be04ff2
[116]: https://github.com/Xunnamius/symbiote/commit/432a5faebe68d65bac4e627e9e022b4687917552
[117]: https://github.com/Xunnamius/symbiote/commit/f82fbf4583d23478cfc54d320d4075f42cec86e8
[118]: https://github.com/Xunnamius/symbiote/commit/a95e9104912da7d85cc6e908cf6f359ae0d74a50
[119]: https://github.com/Xunnamius/symbiote/commit/12dd3f71aca30c382e26451fed7e15d6359cd624
[120]: https://github.com/Xunnamius/symbiote/commit/2a3e13c79fb4a96dc5da63a1a3740be799be38c0
[121]: https://github.com/Xunnamius/symbiote/commit/b8841b52f736c86ff811fc26b8db2a9ba638f693
[122]: https://github.com/Xunnamius/symbiote/commit/f3012291ad31b4c57b3b592eaf687ac83162e1ba
[123]: https://github.com/Xunnamius/symbiote/commit/26f78dcd18c0d83e4adc060449edff2071bc0adb
[124]: https://github.com/Xunnamius/symbiote/commit/c63847c764bed07ff07a3b461170bf82b0fa5202
[125]: https://github.com/Xunnamius/symbiote/commit/df13f8755a08757c99f20c71c55647e3478243fc
[126]: https://github.com/Xunnamius/symbiote/commit/48163ba158b463dd21ffd6ad431f6f0714c93003
[127]: https://github.com/Xunnamius/symbiote/commit/c4f81c0568db69961282c771dd28370d1357f4d8
[128]: https://github.com/Xunnamius/symbiote/commit/8338afa2ed9f0cc68144505d32b9578e82661549
[129]: https://github.com/Xunnamius/symbiote/commit/fb7752b12394e6c92912bc59517df8baff5be223
[130]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.0.1...@-xun/symbiote@2.1.0
[131]: https://github.com/Xunnamius/symbiote/commit/0c86cb529724eb2576b8d62e8c7f0addc3ea7084
[132]: https://github.com/Xunnamius/symbiote/commit/0b96a6b7274a4b840e73bf97bf9b5455cba08666
[133]: https://github.com/Xunnamius/symbiote/commit/e6827346cceeb12e8ce9f7aa52b868ccc9272253
[134]: https://github.com/Xunnamius/symbiote/commit/552b89f4a78d09be4281b7001bbd2e37880f195f
[135]: https://github.com/Xunnamius/symbiote/commit/7409b67ee7863d79fa9c689d34cb23378aa8707e
[136]: https://github.com/Xunnamius/symbiote/commit/2013638bd9d290bd619fb188ae96d077510170be
[137]: https://github.com/Xunnamius/symbiote/commit/5057f5376c96d6c9660cc672982f808454dd5ee7
[138]: https://github.com/Xunnamius/symbiote/commit/6c5a8fe3b009a49f44c3a476433bb41204827ddb
[139]: https://github.com/Xunnamius/symbiote/commit/a84c5235025ae7fe18d8bec997eb19472dce1b06
[140]: https://github.com/Xunnamius/symbiote/commit/f9bdb7ed796e77ce7d3dad3e0f4b04960984a1f8
[141]: https://github.com/Xunnamius/symbiote/commit/b6927a9b6e40937047008bc4337573e1eaafc4e8
[142]: https://github.com/Xunnamius/symbiote/commit/364fbb2c1b1981e96aab54503b54ffa496b33898
[143]: https://github.com/Xunnamius/symbiote/commit/11bd584b8b0d49b7f7e0184995922fbfad653666
[144]: https://github.com/Xunnamius/symbiote/commit/aee10cdf72edb6a1741d2880fd4cff8aa5dd8f71
[145]: https://github.com/Xunnamius/symbiote/commit/d44fa79bf7df8ae47acff4da881cdc7450cb64d1
[146]: https://github.com/Xunnamius/symbiote/commit/b7f27541e4b8d8540c70decab93b1e0df2b330bf
[147]: https://github.com/Xunnamius/symbiote/commit/f592d5faf07a02a50f3f3ed99baf8f23af94ee59
[148]: https://github.com/Xunnamius/symbiote/commit/7e6618353b307cbe03f2e9d5429639a78fac738f
[149]: https://github.com/Xunnamius/symbiote/commit/98c028a88e194a6085b320f7458a0a7de1ec7c62
[150]: https://github.com/Xunnamius/symbiote/commit/3030eb9258c22141352cb27d69e1c84037bc9a50
[151]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.33.0...@-xun/symbiote@2.0.0
[152]: https://github.com/Xunnamius/symbiote/commit/b7b101e38446127aca8e7cd55b60f3731ab81ac0
[153]: https://github.com/Xunnamius/symbiote/commit/057f400cc043f1e13e701a97d2e67b93be4719d3
[154]: https://github.com/Xunnamius/symbiote/commit/d22de31fff57a3eabff39d5f564d04ca24051fda
[155]: https://github.com/Xunnamius/symbiote/commit/e83f2f27cd2e5c01c4c32532fb39bf16557b62b4
[156]: https://github.com/Xunnamius/symbiote/commit/ad83e562e1049d816498af50afc8a5bd3efca059
[157]: https://github.com/Xunnamius/symbiote/commit/0a19ce6bf1c302624d6c6d68b0d5ee3aff17aeda
[158]: https://github.com/Xunnamius/symbiote/commit/70b513431bf2d90c8590ecb68cedce9482ec0026
[159]: https://github.com/Xunnamius/symbiote/commit/1a522e88ed38c4e2d051bd2809293a66b86e48ef
[160]: https://github.com/Xunnamius/symbiote/commit/9d05b8bd93b6c28c218a060264253d403fe09617
[161]: https://github.com/Xunnamius/symbiote/commit/7a8eee69e839138e96fe3937ae8c178e44148e27
[162]: https://github.com/Xunnamius/symbiote/commit/abbc2da0ff368d976c2a73e0af1848d81e0ee05b
[163]: https://github.com/Xunnamius/symbiote/commit/53409fa0bd5d3b104a74f7ad7eb060334ac48bca
[164]: https://github.com/Xunnamius/symbiote/commit/2bd57b5ac1bbe3c23f772a9194ad604a01715290
[165]: https://github.com/Xunnamius/symbiote/commit/a40f886ca5f4abdffdee5df1b5259b5165e69c4f
[166]: https://github.com/Xunnamius/symbiote/commit/f2bb03d127d347d69b3f6c253cfbb286943c85fe
[167]: https://github.com/Xunnamius/symbiote/commit/641b57b7d0dd966573747fbdcb220f3f8bacdf05
[168]: https://github.com/Xunnamius/symbiote/commit/177a5dcf060e7d2a90e183ad6cf6d162e0746100
[169]: https://github.com/Xunnamius/symbiote/commit/c331ae1339dce62af60a59c171dd4d8fe3db3ed3
[170]: https://github.com/Xunnamius/symbiote/commit/87245154b394d12f43ac5f96675a8e0adcf7e7fe
[171]: https://github.com/Xunnamius/symbiote/commit/a6f02e0b4e4b157c3d98ffece54f4765515376d2
[172]: https://github.com/Xunnamius/symbiote/commit/5e99d888275bc8dd3d62e0add9cc3448476a2bda
[173]: https://github.com/Xunnamius/symbiote/commit/f511249a44a64a3e5885f2e51822af539f427e0f
[174]: https://github.com/Xunnamius/symbiote/commit/577710bf9ba5c47dff34554dd4bb1d20b9844d14
[175]: https://github.com/Xunnamius/symbiote/commit/2841d263ae20fdc5d875afe74ce3fd6eb309105e
[176]: https://github.com/Xunnamius/symbiote/commit/5c66c170ade8c6ab34e8003833eedb2fd35f13e5
[177]: https://github.com/Xunnamius/symbiote/commit/6a44488ce9daf5ec86b6df8257fd06f6444bd4bf
[178]: https://github.com/Xunnamius/symbiote/commit/26fb0346ccac211d0ab3deecc332eb8d047da9ea
[179]: https://github.com/Xunnamius/symbiote/commit/4f8d351103c48f8114f47f07a37f1f6fe8c21c3f
[180]: https://github.com/Xunnamius/symbiote/commit/26e756362a16f050e03cef2c4c582d94e29614cd
[181]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.0.0...@-xun/symbiote@2.0.1
[182]: https://github.com/Xunnamius/symbiote/commit/e42722b37c4b6d2ec1e39b5f7d10d304ac147bcc
[183]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.32.0...@-xun/symbiote@1.33.0
[184]: https://github.com/Xunnamius/symbiote/commit/f1e8e8e08a4139a060af4c155aa1ee4e73c344e0
[185]: https://github.com/Xunnamius/symbiote/commit/49258852c3fcd7dd992c2b244bb7a7e50c88dbd7
[186]: https://github.com/Xunnamius/symbiote/commit/ca87588aee7f76fe8635e4e7f2f712b7b96671bb
[187]: https://github.com/Xunnamius/symbiote/commit/410a05ae14f91c62d0c43e624a9a8f815c0885c6
[188]: https://github.com/Xunnamius/symbiote/commit/1d9accc2d1627d74a04f1bb7f776a4e4b2049f9a
[189]: https://github.com/Xunnamius/symbiote/commit/51ab45426d8058a8a84b8206feda4242d780f53a
[190]: https://github.com/Xunnamius/symbiote/commit/c2bee3ba59f700348dc33e31ad742d2348169ec0
[191]: https://github.com/Xunnamius/symbiote/commit/b057430a463e47e5774bef53a00e8a0677914291
[192]: https://github.com/Xunnamius/symbiote/commit/eec0ed930df8cfaec7a98459b4d56849aac01749
[193]: https://github.com/Xunnamius/symbiote/commit/16f64e190ca4798c6fc148de2e354b7973750784
[194]: https://github.com/Xunnamius/symbiote/commit/413dc399483771459ce358ca126bba405f1233c6
[195]: https://github.com/Xunnamius/symbiote/commit/28c221bb8a859e69003ba2447e3f5763dc92a0ec
[196]: https://github.com/Xunnamius/symbiote/commit/da7e953744dde41a45c249d74e7f4007719eece4
[197]: https://github.com/Xunnamius/symbiote/commit/578d631717f64f0a1405a5fe40106ff9e8520a22
[198]: https://github.com/Xunnamius/symbiote/commit/bf993c947a42aaaa96060bc9ac29f334e28db0ea
[199]: https://github.com/Xunnamius/symbiote/commit/c52b3f184ba122013ac555d962b3df41c9329d0c
[200]: https://github.com/Xunnamius/symbiote/commit/cdfd48df4a6a422042c7f239bc2246f033da91c2
[201]: https://github.com/Xunnamius/symbiote/commit/a33aed8d5b0262dd81b375fcef062e5f7d1b5601
[202]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.31.2...@-xun/symbiote@1.32.0
[203]: https://github.com/Xunnamius/symbiote/commit/c9a6e8b7ee5518f658bcd62a800be0b065feffb7
[204]: https://github.com/Xunnamius/symbiote/commit/e17adfb5fcd7395225e1fb530ebce697dce1b40d
[205]: https://github.com/Xunnamius/symbiote/commit/c5cd76a0fbb13149871b4b5b1d8badf6277c455a
[206]: https://github.com/Xunnamius/symbiote/commit/56e576cb940a966292d7378200f153215b55351a
[207]: https://github.com/Xunnamius/symbiote/commit/aa60eebffcdbbf28d8ce6943dc7ed6cb6b50150b
[208]: https://github.com/Xunnamius/symbiote/commit/c248757d6afb672ef03d93c652f5385bd80670df
[209]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.3...@-xun/symbiote@1.31.0
[210]: https://github.com/Xunnamius/symbiote/commit/8f7777c426ce028f106db4654c8bd3535da7151b
[211]: https://github.com/Xunnamius/symbiote/commit/6fc66d8a50979c2ee7424a94dd0c98179f9ac47b
[212]: https://github.com/Xunnamius/symbiote/commit/8a5fd8a05a1b7cd3a9d820f594145e2be76bb746
[213]: https://github.com/Xunnamius/symbiote/commit/68d5bda031da6af194e5d5f3199eeac7c7416076
[214]: https://github.com/Xunnamius/symbiote/commit/ef6927b763b236d731e9013c739a5336d02193d2
[215]: https://github.com/Xunnamius/symbiote/commit/ceb6c6280370ff13d3eb9fcd5d6b9ec2b4b993f3
[216]: https://github.com/Xunnamius/symbiote/commit/ce934437a7db5039d1c572906332ee6389bcf5a2
[217]: https://github.com/Xunnamius/symbiote/commit/6ce819a34df36aaf26bf7b8d7e87b6085547183f
[218]: https://github.com/Xunnamius/symbiote/commit/62a5a128781629f5df99e05eff025da3e88022a6
[219]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.31.1...@-xun/symbiote@1.31.2
[220]: https://github.com/Xunnamius/symbiote/commit/0565333411580fd45659aad0e9727012cea9a699
[221]: https://github.com/Xunnamius/symbiote/commit/f4ecfc9dd682e307a08becf562a877450fe903ef
[222]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.31.0...@-xun/symbiote@1.31.1
[223]: https://github.com/Xunnamius/symbiote/commit/cfe28e3d801ec1b719b0dedbda4e9f63d7924b77
[224]: https://github.com/Xunnamius/symbiote/commit/89350088d45a927b2d85ce710a21d89af74c1d21
[225]: https://github.com/Xunnamius/symbiote/commit/39e37a8070e22e93b0042ae80f80207b67cf3ed2
[226]: https://github.com/Xunnamius/symbiote/commit/58a6223696187f874d98bb91ec3f37719e7f33bd
[227]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.29.2...@-xun/symbiote@1.30.0
[228]: https://github.com/Xunnamius/symbiote/commit/3710988e3577a60357c780a19fa9a28e0dd58332
[229]: https://github.com/Xunnamius/symbiote/commit/e1633023dfcc7b2ea7a213c11139b589bd99d1b7
[230]: https://github.com/Xunnamius/symbiote/commit/ca47d93f4c507108c23cfd2e613ff758fd56d1c9
[231]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.2...@-xun/symbiote@1.30.3
[232]: https://github.com/Xunnamius/symbiote/commit/01dca03e237882091b9f849a4beeb06537d27ecd
[233]: https://github.com/Xunnamius/symbiote/commit/b923d6daa24240ab9930bade670683e950e36e30
[234]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.1...@-xun/symbiote@1.30.2
[235]: https://github.com/Xunnamius/symbiote/commit/98a868e21d0126772abbbb69bb64a9b56da229ac
[236]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.0...@-xun/symbiote@1.30.1
[237]: https://github.com/Xunnamius/symbiote/commit/89eebe76ad675b35907b3379b29bfde27fd5a5b8
[238]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.28.0...@-xun/symbiote@1.29.0
[239]: https://github.com/Xunnamius/symbiote/commit/053bf3e15be94ed90e9b2b9fdf82c0b0b7c6da0d
[240]: https://github.com/Xunnamius/symbiote/commit/002431f7c880bdd55c6cc71f7660dec8ba84966f
[241]: https://github.com/Xunnamius/symbiote/commit/65b8c0b01acf9c60fc3cb5a1904832fd99f95329
[242]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.29.1...@-xun/symbiote@1.29.2
[243]: https://github.com/Xunnamius/symbiote/commit/d89809b1811fb99fb24fbfe0c6960a0e087bcc27
[244]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.29.0...@-xun/symbiote@1.29.1
[245]: https://github.com/Xunnamius/symbiote/commit/8feaaa78a9f524f02e4cc9204ef84f329d31ab94
[246]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.27.0...@-xun/symbiote@1.28.0
[247]: https://github.com/Xunnamius/symbiote/commit/c3fc1264932eb8224289ef973366fc0cb5435f59
[248]: https://github.com/Xunnamius/symbiote/commit/a91e7fa7a369d3d71bc98b147279c01b8f87af3c
[249]: https://github.com/Xunnamius/symbiote/commit/71b17c8574fe55da23831cd1be11457e7cb4bdb5
[250]: https://github.com/Xunnamius/symbiote/commit/7fed43963c71aad0d9b37b72a52dad1c55226140
[251]: https://github.com/Xunnamius/symbiote/commit/11b585ddfa1954ce0380fa64b5c4120773dc55d2
[252]: https://github.com/Xunnamius/symbiote/commit/cf5b25b85bacd164e57f5e26863cf6c1581d8c68
[253]: https://github.com/Xunnamius/symbiote/commit/55ee62d4a379fc1aae845c6847adc0a9c8a8db6f
[254]: https://github.com/Xunnamius/symbiote/commit/56b706a90fbab254ee74509f45cf632157a0cfdc
[255]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.26.0...@-xun/symbiote@1.27.0
[256]: https://github.com/Xunnamius/symbiote/commit/1a69887158a00db7133cf0a2eee85146ec6d1399
[257]: https://github.com/Xunnamius/symbiote/commit/1262cc85e615a3e0ac7766099e166aeae6a1e3e1
[258]: https://github.com/Xunnamius/symbiote/commit/645473d084f3d4033afe39d72802b0a2a89e112d
[259]: https://github.com/Xunnamius/symbiote/commit/c5c742e64b9a56894866c0110cb3161ae3321b0f
[260]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.25.0...@-xun/symbiote@1.26.0
[261]: https://github.com/Xunnamius/symbiote/commit/5c8816d895864b48e3106b178284d57e9fdc3687
[262]: https://github.com/Xunnamius/symbiote/commit/44be676ca04207bd17553941d367abda2325c0ee
[263]: https://github.com/Xunnamius/symbiote/commit/3323fc3580b663f00518e7ca7bd9f52a7e50b80f
[264]: https://github.com/Xunnamius/symbiote/commit/8a67d707c540f5e23d6f3ad8f6efe2d79cb35361
[265]: https://github.com/Xunnamius/symbiote/commit/9b551a7be83a12c43408f9d33d117c3a6218cff4
[266]: https://github.com/Xunnamius/symbiote/commit/0924dd3f6544d39ab5f4f7f50c5173704aab3909
[267]: https://github.com/Xunnamius/symbiote/commit/ce72af261f1d9c15f89e11251ad8c5f000ff8afa
[268]: https://github.com/Xunnamius/symbiote/commit/6ac3376124a2d86316f248b662f327ceee470b58
[269]: https://github.com/Xunnamius/symbiote/commit/09373fa4830377ba42824797eb0791655da0fa34
[270]: https://github.com/Xunnamius/symbiote/commit/b3e95e72ccfdce365933aeb27afe5a8bb64bdec5
[271]: https://github.com/Xunnamius/symbiote/commit/d27007d1ebda295a05b6ed116a0421d7610aff42
[272]: https://github.com/Xunnamius/symbiote/commit/998218d7d3f3a654dcdd33e2e1c5ce033927774e
[273]: https://github.com/Xunnamius/symbiote/commit/9087086d6944cb6a847f325142753a63be2ca30c
[274]: https://github.com/Xunnamius/symbiote/commit/36016b10da47bb5799d3e558831a96eda878c10e
[275]: https://github.com/Xunnamius/symbiote/commit/86fca5843564773f9e0ec53c454c72109befbec6
[276]: https://github.com/Xunnamius/symbiote/commit/bb6bde93dffe0a8f565dace3bfc970b52ff88c79
[277]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.24.0...@-xun/symbiote@1.25.0
[278]: https://github.com/Xunnamius/symbiote/commit/31c7bbb45d313ca9a1edaf9c682da438fde76830
[279]: https://github.com/Xunnamius/symbiote/commit/4f807cf260af20ae6a60138dae1e4b7204eed570
[280]: https://github.com/Xunnamius/symbiote/commit/d22cee3b292da80ab45e4513bba3b2157fa72245
[281]: https://github.com/Xunnamius/symbiote/commit/9045cd704121600e07d84839c3e23b407e184f6b
[282]: https://github.com/Xunnamius/symbiote/commit/e7c4b6e1bc996d5a975a497cd3ca0e4774a39a85
[283]: https://github.com/Xunnamius/symbiote/commit/c62261b48969a52b54464de106eb02edb170fd5a
[284]: https://github.com/Xunnamius/symbiote/commit/4d5ddb62d49f74d07dc8c24887bcf3ec50c00362
[285]: https://github.com/Xunnamius/symbiote/commit/576dd649da2775841e9a2e985b02e564a2be1caa
[286]: https://github.com/Xunnamius/symbiote/commit/ffcad30844a8223d29369bb5303468f1534176a4
[287]: https://github.com/Xunnamius/symbiote/commit/4059ed7d534afa9b74bd93f761f92e5d5996990a
[288]: https://github.com/Xunnamius/symbiote/commit/5ea7f8a45c16bd07ff0f5bcdc8e4f6fa82908df0
[289]: https://github.com/Xunnamius/symbiote/commit/d4d37566ea09a69679ec61da20c3a5aca9a8720f
[290]: https://github.com/Xunnamius/symbiote/commit/d91572787be84252d2b37f3f6c1fa72e7528c62b
[291]: https://github.com/Xunnamius/symbiote/commit/5d61e8783923775def0a0fcd1fc9fd57e65ab184
[292]: https://github.com/Xunnamius/symbiote/commit/1d0dee8044cdd8cd88c6d8ccfe10c95c7b6a36bd
[293]: https://github.com/Xunnamius/symbiote/commit/2b46883f153688f590ac3e1baed996bde3c4e1e6
[294]: https://github.com/Xunnamius/symbiote/commit/95b0f6899582ed0bbb4f78bb12ce556079d36b67
[295]: https://github.com/Xunnamius/symbiote/commit/81ba7bcaea006b1094131d0f0bb3c3dd0828cf13
[296]: https://github.com/Xunnamius/symbiote/commit/128e83acfd2dd1f5b3ffca6b1feb7892a2fa38b3
[297]: https://github.com/Xunnamius/symbiote/commit/c4016a8318afb13d6fd6ff9b5bf58a30231e5002
[298]: https://github.com/Xunnamius/symbiote/commit/0f4c7b1e678f56ff0cb5112c8858f0da57254d91
[299]: https://github.com/Xunnamius/symbiote/commit/1894d80efed02438233672074116dfa06e0c91f7
[300]: https://github.com/Xunnamius/symbiote/commit/351ee50466956e8fc31eeaf1de79418f8ab04c16
[301]: https://github.com/Xunnamius/symbiote/commit/74ab5d91a21dd66aa7a0412fb3ce2ad89de3c1bc
[302]: https://github.com/Xunnamius/symbiote/commit/18dbad0840fc762fab169d38d606afd41316dd1b
[303]: https://github.com/Xunnamius/symbiote/commit/8e82ac18456a552cdf55fe75be9e7e11f958aa65
[304]: https://github.com/Xunnamius/symbiote/commit/f323a6ad34c69bca84a2618598f0801f26a0df82
[305]: https://github.com/Xunnamius/symbiote/commit/4a6e25433385507c2d326f40c56093bcd54b171d
[306]: https://github.com/Xunnamius/symbiote/commit/4e3cdc092ad2bf0f716a41ff16e2d6fb2267cc5a
[307]: https://github.com/Xunnamius/symbiote/commit/5e0058708501603a5ed40fbd3934a2d01842c3fa
[308]: https://github.com/Xunnamius/symbiote/commit/9b8b41a72605c3beabdf11c9155733bf1eb99ec0
[309]: https://github.com/Xunnamius/symbiote/commit/e22403c276eda0e6281085198933d6df3a1dcc90
[310]: https://github.com/Xunnamius/symbiote/commit/c34a5499cb58878fdaa42e83063e1c36a0582e06
[311]: https://github.com/Xunnamius/symbiote/commit/43da8828df733ab8fd835d1a40c2a2c0c98fdd9b
[312]: https://github.com/Xunnamius/symbiote/commit/33af2bc79370b38bc94633617180bcd283b5a0bf
[313]: https://github.com/Xunnamius/symbiote/commit/c1ac811d2d7500a4b665d4d1531b5d51a9da2c19
[314]: https://github.com/Xunnamius/symbiote/commit/901d85357b06b854b6c37a34ac2b37948376660c
[315]: https://github.com/Xunnamius/symbiote/commit/1fb8568e874687f25f13bcd31db7e94a8eb43282
[316]: https://github.com/Xunnamius/symbiote/commit/3373208a68bb1c11e75e68b0c53ff04cb0446035
[317]: https://github.com/Xunnamius/symbiote/commit/5eb9deff748ee6e4af3c57a16f6370d16bb97bfb
[318]: https://github.com/Xunnamius/symbiote/commit/b928e8a92064bcc4a0ef17b45eb6af40654208f2
[319]: https://github.com/Xunnamius/symbiote/commit/45bcd8c56f38ccbc330b4088c6f8a5812714611a
[320]: https://github.com/Xunnamius/symbiote/commit/f50abaf0309ca2e0e0f21b429683c8369e5e2210
[321]: https://github.com/Xunnamius/symbiote/commit/98a1dd7eacac964a7fbab47ded92c33173383f11
[322]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.23.0...@-xun/symbiote@1.24.0
[323]: https://github.com/Xunnamius/symbiote/commit/472af2c847833e17c6d88d61d8cc2e885ef21338
[324]: https://github.com/Xunnamius/symbiote/commit/8ab4eecd7242de0447c86f2535ccdd31c5d5291e
[325]: https://github.com/Xunnamius/symbiote/commit/69f2dc0d929150f46c3fc4990a37338111d1a4f6
[326]: https://github.com/Xunnamius/symbiote/commit/8dc4a962ae457c82585e3c34d1ee02c731aedec3
[327]: https://github.com/Xunnamius/symbiote/commit/e3fa185ffa33d801bc1f7d9faeda1d40eaa8a117
[328]: https://github.com/Xunnamius/symbiote/commit/89b57c4e38f74970a301e6261acdfeca27982d44
[329]: https://github.com/Xunnamius/symbiote/commit/b8b82d942c478673b10b2d071802c73461c42961
[330]: https://github.com/Xunnamius/symbiote/commit/556f17ec5b274c0bf08d364905a99b8e27bfff63
[331]: https://github.com/Xunnamius/symbiote/commit/74d58d66649401b6e8f17e53076ea4972bc1d888
[332]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.22.0...@-xun/symbiote@1.23.0
[333]: https://github.com/Xunnamius/symbiote/commit/1bdceca9e23b28bffb12b84013ba95ef54c5ac81
[334]: https://github.com/Xunnamius/symbiote/commit/6ff2bd3423e7b7e9af224e937200bee1fb5691ea
[335]: https://github.com/Xunnamius/symbiote/commit/a1d36577666cddfce19970975144e085c7a0c353
[336]: https://github.com/Xunnamius/symbiote/commit/fa2a97f118389cdaf4227a07a9bf5a5bc4cc2dfe
[337]: https://github.com/Xunnamius/symbiote/commit/6e3f599ab734f0a7fcd2faff59e2c377eeec3fa1
[338]: https://github.com/Xunnamius/symbiote/commit/ca021f8fb5d821cc21129c4a29e6d43e24166183
[339]: https://github.com/Xunnamius/symbiote/commit/b9218ee5f94be5da6a48d961950ed32307ad7f96
[340]: https://github.com/Xunnamius/symbiote/commit/dc47cfbbdc869aa2d149924c72bb5414b0f46f07
[341]: https://github.com/Xunnamius/symbiote/commit/ebb4fb597a47fa0d748735e3b0a2832434b7a637
[342]: https://github.com/Xunnamius/symbiote/commit/ccc82b396baeb2445174d0c8b9da97522cb66066
[343]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.21.0...@-xun/symbiote@1.22.0
[344]: https://github.com/Xunnamius/symbiote/commit/8bdf28b7ba33aae68f04ee62f6b2d72d39c62012
[345]: https://github.com/Xunnamius/symbiote/commit/0c3f85c0e926cff1645b6a329edcc6304b8ac189
[346]: https://github.com/Xunnamius/symbiote/commit/531d3eae3ffb883e69799688a89c28e55cdcf177
[347]: https://github.com/Xunnamius/symbiote/commit/a7a66d9ffeecb4ba1d8b8519a97fc10f1fea72a6
[348]: https://github.com/Xunnamius/symbiote/commit/e37006ee62471c2cf178a89023e34a9b691b7574
[349]: https://github.com/Xunnamius/symbiote/commit/349cf201e0cbfdc2b925690744b4ff6737a008b3
[350]: https://github.com/Xunnamius/symbiote/commit/d8b7442d320a4c4efbe03cb0a502ad337211caee
[351]: https://github.com/Xunnamius/symbiote/commit/c7fe4109820fb109db7a0ea07985089d1b488535
[352]: https://github.com/Xunnamius/symbiote/commit/2c40974df517c6226d351e0ab9d8f66675792272
[353]: https://github.com/Xunnamius/symbiote/commit/f5fb1bcbafb797b2c7d88655895e185b03f2e1db
[354]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.8...@-xun/symbiote@1.21.0
[355]: https://github.com/Xunnamius/symbiote/commit/bf9514f27e8299b6f489dab44174a3ce9f0c2c09
[356]: https://github.com/Xunnamius/symbiote/commit/7ad96c5edd2c8a6275e94cde9a1c5721cdd88dda
[357]: https://github.com/Xunnamius/symbiote/commit/d54cfa03ffcfc52779cb283802e447df42a0cfed
[358]: https://github.com/Xunnamius/symbiote/commit/cd82265731cd411d9b374c3bbe3c642c93a053fe
[359]: https://github.com/Xunnamius/symbiote/commit/94a2253a2888d5d2b34290d7b0180fdee2a2a104
[360]: https://github.com/Xunnamius/symbiote/commit/db0c6d71e780edd2d6ab295abc136ac3fa3979d7
[361]: https://github.com/Xunnamius/symbiote/commit/7dcbf56f1d89bddc9ad635e47a6f27a13274e799
[362]: https://github.com/Xunnamius/symbiote/commit/e334962ae950f510b35d09bb5d6ed6326a586de0
[363]: https://github.com/Xunnamius/symbiote/commit/8833e0a06f0733e89b4496719aa8b71050783339
[364]: https://github.com/Xunnamius/symbiote/commit/5070ab49e00314a91a6c87aa1715846939531023
[365]: https://github.com/Xunnamius/symbiote/commit/1eff5cb11f90533bd4ceeca8c269e8a4e5b998c0
[366]: https://github.com/Xunnamius/symbiote/commit/0eb7fd3b75fe765781b5ca482abbd38e3b0a1a65
[367]: https://github.com/Xunnamius/symbiote/commit/e169f47888b112eda08cb8518b69ba3bfd9f2b26
[368]: https://github.com/Xunnamius/symbiote/commit/e7b857926d572780c951aa1161133186d2cf1784
[369]: https://github.com/Xunnamius/symbiote/commit/a35f4c0e581dff4a7667277284052a7fa71b672e
[370]: https://github.com/Xunnamius/symbiote/commit/3f1a5a9a6c7ce7cd8aba5c521fb95c6beed3394e
[371]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.19.1...@-xun/symbiote@1.20.0
[372]: https://github.com/Xunnamius/symbiote/commit/d84b35ff2b28040920fb62a405e29f2e54d29d4f
[373]: https://github.com/Xunnamius/symbiote/commit/8cf99a986ddf05e8d2a740d58e9ccdf5a0675e43
[374]: https://github.com/Xunnamius/symbiote/commit/3dd5d787a3de11f375bb9ca815840400fbe8cdf3
[375]: https://github.com/Xunnamius/symbiote/commit/5c3ed7323a7bf5f3dd1a3d7dd73c8511ef04ff82
[376]: https://github.com/Xunnamius/symbiote/commit/c912b0992a3033ed5d978d7f5c139569f2bd0608
[377]: https://github.com/Xunnamius/symbiote/commit/9cb2d72efc872c4003dabc8c68856b72e8f7c3a4
[378]: https://github.com/Xunnamius/symbiote/commit/ce035004c4bea999ba5cf583c16fc1dbc8a232a6
[379]: https://github.com/Xunnamius/symbiote/commit/22f2f41be642d3d94fc4e5a50014a61ab68c50b4
[380]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.7...@-xun/symbiote@1.20.8
[381]: https://github.com/Xunnamius/symbiote/commit/ce701f3d57da9f82ee0036320bc62d5c51233011
[382]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.6...@-xun/symbiote@1.20.7
[383]: https://github.com/Xunnamius/symbiote/commit/3c48ae1560cd1d689340739f550f4feb18754e81
[384]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.5...@-xun/symbiote@1.20.6
[385]: https://github.com/Xunnamius/symbiote/commit/76992d930b92919b8ab95f195cec98ddb91fb390
[386]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.4...@-xun/symbiote@1.20.5
[387]: https://github.com/Xunnamius/symbiote/commit/0864f9221ff2134311ba716cc2eca83aa044fa12
[388]: https://github.com/Xunnamius/symbiote/commit/ff3853fa7835e9b2f89e2a9a846db76d6b2dd4a5
[389]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.3...@-xun/symbiote@1.20.4
[390]: https://github.com/Xunnamius/symbiote/commit/0bf89cad7426062a1d0f1ed6b9e69c1e60c734aa
[391]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.2...@-xun/symbiote@1.20.3
[392]: https://github.com/Xunnamius/symbiote/commit/dd265b47f6ff85a27a80867a60ffbc8aa87e15de
[393]: https://github.com/Xunnamius/symbiote/commit/cf21d7d56b8d28fe14e87a975ec151c9f16e4717
[394]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.1...@-xun/symbiote@1.20.2
[395]: https://github.com/Xunnamius/symbiote/commit/bc2a56b8e3bb237caba1768c1673d3848d97e0d6
[396]: https://github.com/Xunnamius/symbiote/commit/52115470ce25670c0355bba2653789a6df8b3aaa
[397]: https://github.com/Xunnamius/symbiote/commit/8735f612072b02c3af08054d8f858b5764aab92d
[398]: https://github.com/Xunnamius/symbiote/commit/a86884fbde354ac7d2cbd5c355d67b536e90f3e6
[399]: https://github.com/Xunnamius/symbiote/commit/b23b12b64b968429652269db3ae710f79c3ce356
[400]: https://github.com/Xunnamius/symbiote/commit/8b54237af01ef168984d9b306063e60e7914c936
[401]: https://github.com/Xunnamius/symbiote/commit/25e7a3b93bd0cfd32df2aaaa83ee055bc7ba1c92
[402]: https://github.com/Xunnamius/symbiote/commit/904c9ac9bb6b4b1d3b047124e749c9f33f8878c9
[403]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.0...@-xun/symbiote@1.20.1
[404]: https://github.com/Xunnamius/symbiote/commit/35876a1903ae9180624905e176f7c4b2e1d870a1
[405]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.19.0...@-xun/symbiote@1.19.1
[406]: https://github.com/Xunnamius/symbiote/commit/d2011645a568e76bdf61dde14dd0e15dbce243dc
[407]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.18.0...@-xun/symbiote@1.19.0
[408]: https://github.com/Xunnamius/symbiote/commit/587a354329e46ca03f056ca1414915145928736c
[409]: https://github.com/Xunnamius/symbiote/commit/909949d58e2ddecf4ad606fe0dd9525ec540a8fb
[410]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.17.0...@-xun/symbiote@1.18.0
[411]: https://github.com/Xunnamius/symbiote/commit/6c7ae27d3d93d36e7cbcae873b8717d252cf6670
[412]: https://github.com/Xunnamius/symbiote/commit/e833523e6085950c3477ca6e44ae92ef7b1fad46
[413]: https://github.com/Xunnamius/symbiote/commit/0383586f6ccbb0bc503df636f515d19618548f92
[414]: https://github.com/Xunnamius/symbiote/commit/3a3489c43d2ce10ac752d70ab23066bd3477a675
[415]: mailto:tsc@5.6-beta
[416]: https://github.com/Xunnamius/symbiote/commit/4e7509611f72d2c953572dbc67bb51aabf2304d6
[417]: https://github.com/Xunnamius/symbiote/commit/f6515ea793a72cfd42cb6d3f74675b2ae3a9b2e1
[418]: https://github.com/Xunnamius/symbiote/commit/8d7152112e4927f566e048c6b0be7dfce4a6c430
[419]: https://github.com/Xunnamius/symbiote/commit/d9b4b80db15e6104a2a3ab7325996a08a350ea6d
[420]: https://github.com/Xunnamius/symbiote/commit/64b7309fcb28c1214f1edcc8319960c1c94f72b0
[421]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.16.1...@-xun/symbiote@1.17.0
[422]: https://github.com/Xunnamius/symbiote/commit/609fca8cde508ecdb6c74ff8d1884821afdd5eb3
[423]: https://github.com/Xunnamius/symbiote/commit/e55a88e728a9c4ccbd38648e85328ab563add014
[424]: https://github.com/Xunnamius/symbiote/commit/b56fd666cfcccbc7d941df7afb6fcfc74ec0ae56
[425]: https://github.com/Xunnamius/symbiote/commit/323579d026f46d2d0f70aa44440543eecbc7b4e2
[426]: https://github.com/Xunnamius/symbiote/commit/52763c5b795e9ee0485e9a20a4cb5264eae0ef3c
[427]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.16.0...@-xun/symbiote@1.16.1
[428]: https://github.com/Xunnamius/symbiote/commit/8f1d25d7356419160a65f4a4dd764a6192df2f26
[429]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.15.0...@-xun/symbiote@1.16.0
[430]: https://github.com/Xunnamius/symbiote/commit/346b4ac5d27ea045cd037c4987401786f7fa572b
[431]: https://github.com/Xunnamius/symbiote/commit/f42f4ab7c83a05fed253475de7bf2df4ce53d48f
[432]: https://github.com/Xunnamius/symbiote/commit/e596e5bc36b9ed024f8c524cd6d55f15b813bcfc
[433]: https://github.com/Xunnamius/symbiote/commit/d96ae1df1940941fbdf491e0b36c200574179bea
[434]: https://github.com/Xunnamius/symbiote/commit/c9e254a5eece3c3ed51348d28897ed354725643f
[435]: https://github.com/Xunnamius/symbiote/commit/ea6aafff5d49f6acd8cac65b3c92e6cfd940e4b5
[436]: https://github.com/Xunnamius/symbiote/commit/eb5631b6a316d808bb88928e27fe88ee818d230b
[437]: https://github.com/Xunnamius/symbiote/commit/b72401ad18cead8a6d8571d8e35a6235c23b5381
[438]: https://github.com/Xunnamius/symbiote/commit/7c1e7f14e28518285bc554c730f7eaea933a2e52
[439]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.14.0...@-xun/symbiote@1.15.0
[440]: https://github.com/Xunnamius/symbiote/commit/8554e1a4fd20b72d6b917f92cdb9e084b4086b25
[441]: https://github.com/Xunnamius/symbiote/commit/b66572376dd63858df091755bb1eb184b56f2c7b
[442]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.13.0...@-xun/symbiote@1.14.0
[443]: https://github.com/Xunnamius/symbiote/commit/a5075305e5d9a3cf5451ca5c156c3ffe307f7018
[444]: https://github.com/Xunnamius/symbiote/commit/489e75a7916d4b77b6a37f6b557cbbd4b7c15e5e
[445]: https://github.com/Xunnamius/symbiote/commit/1b6c72ae8007c801207547a74de598d38b769968
[446]: https://github.com/Xunnamius/symbiote/commit/68c55821991d1eaf821dfe603cfee1a9aca83d4f
[447]: https://github.com/Xunnamius/symbiote/commit/2ed43444661b4fba89c20bb5f2a0341faf535a9b
[448]: https://github.com/Xunnamius/symbiote/commit/cafeb73773b2e08137d9c6d7f7432802cc9d3b88
[449]: https://github.com/Xunnamius/symbiote/commit/f08250c17077cff70cdf722d2e9c3b16d3841ebf
[450]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.12.0...@-xun/symbiote@1.13.0
[451]: https://github.com/Xunnamius/symbiote/commit/05e56e787e73d42855fcd3ce10aff7f8f6e6c4c7
[452]: https://github.com/Xunnamius/symbiote/commit/133634118118c7cff04eaaf7a65ead7c80329234
[453]: https://github.com/Xunnamius/symbiote/commit/e4a1e0b3d6a20ae598f5a6feb2cf2b7ba077b6a7
[454]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.11.0...@-xun/symbiote@1.12.0
[455]: https://github.com/Xunnamius/symbiote/commit/8d4bb6d52de509c2ad8c5c82c8953d51e17c2d85
[456]: https://github.com/Xunnamius/symbiote/commit/7364616ea349761591231a3547bd697ec67ed34b
[457]: https://github.com/Xunnamius/symbiote/commit/b9b106aff4ff729fb1f8e70efe295ba058a50cfb
[458]: https://github.com/Xunnamius/symbiote/commit/c1a4b9cb21d1c3e6941d6fbd6108edc694c2d4ed
[459]: https://github.com/Xunnamius/symbiote/commit/5b11c68aebc8099007ffcf50444707165939e061
[460]: https://github.com/Xunnamius/symbiote/commit/99c7b3396ff73868208060410f7430538f6d48d6
[461]: https://github.com/Xunnamius/symbiote/commit/ddd9192c05110fca3ae0d93bac276426932269ef
[462]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.10.1...@-xun/symbiote@1.11.0
[463]: https://github.com/Xunnamius/symbiote/commit/d74f099ac798fd0c925ea4aad0b1860b8a8a741f
[464]: https://github.com/Xunnamius/symbiote/commit/0f4dd160eb1181306899031186b4a3c7e64d936c
[465]: https://github.com/Xunnamius/symbiote/commit/2cd56d132e3cd7318744839cbf119b126cc35c98
[466]: https://github.com/Xunnamius/symbiote/commit/9764967b4ca5aab46b32317ddb14bc4e843d8674
[467]: https://github.com/Xunnamius/symbiote/commit/fd86f3f321889f759eda02880982117b5a0aba16
[468]: https://github.com/Xunnamius/symbiote/commit/e295a0270f8ae743771d79966cccb3fdb14f19fd
[469]: https://github.com/Xunnamius/symbiote/commit/d290ba57054479eb873d3cdc785db602432fca09
[470]: https://github.com/Xunnamius/symbiote/commit/4ea8aa453186568651849102a2ade4df2f6c5cee
[471]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.10.0...@-xun/symbiote@1.10.1
[472]: https://github.com/Xunnamius/symbiote/commit/483f03697f1cf01847759fa5c1cf61f5af578a3f
[473]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.9.0...@-xun/symbiote@1.10.0
[474]: https://github.com/Xunnamius/symbiote/commit/6575d493c2c0ff291a3bd7bf4b595198c46c0c70
[475]: https://github.com/Xunnamius/symbiote/commit/7d33dfe2ea50a0fbf45641ef997ce2b7d0265aca
[476]: https://github.com/Xunnamius/symbiote/commit/d535b785c9d45c87b29a5fbe5698c6021067570b
[477]: https://github.com/Xunnamius/symbiote/commit/1b65f4667e138907ac8a1b90f06937f5fa4eb1b9
[478]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.8.0...@-xun/symbiote@1.9.0
[479]: https://github.com/Xunnamius/symbiote/commit/f47742b0bca31b054ec83d5b01089715e9925e39
[480]: https://github.com/Xunnamius/symbiote/commit/4f280dc3af5bf633259d80cc8733fae31c903e04
[481]: https://github.com/Xunnamius/symbiote/commit/159d771c90a65e05194cde9b8aec2478be7b97ff
[482]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.7.0...@-xun/symbiote@1.8.0
[483]: https://github.com/Xunnamius/symbiote/commit/c7b7623d68bde02438cbd8cbc80302079356914d
[484]: https://github.com/Xunnamius/symbiote/commit/847cc63e9965c6c970e63d351fe8388ef666a1b6
[485]: https://github.com/Xunnamius/symbiote/commit/fd210c55c4aff0ad663381a67b8b591dffc2a49c
[486]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.6.0...@-xun/symbiote@1.7.0
[487]: https://github.com/Xunnamius/symbiote/commit/7824c25d1d5db8ab824960b502c41e54a1f9ee03
[488]: https://github.com/Xunnamius/symbiote/commit/b4c296eb75a142ede16da32a997e9999dd8074f3
[489]: https://github.com/Xunnamius/symbiote/commit/005e378059ba0b3181031ff938854f54898e0437
[490]: https://github.com/Xunnamius/symbiote/commit/9e4ae592d211ae39bacdc3f665b3078e69c73062
[491]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.5.0...@-xun/symbiote@1.6.0
[492]: https://github.com/Xunnamius/symbiote/commit/62e673b1ab8679e586b1b4337fe20c537c408fff
[493]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.4.1...@-xun/symbiote@1.5.0
[494]: https://github.com/Xunnamius/symbiote/commit/fd903a41ad88342ebd1896ffe3e46a6b81583711
[495]: https://github.com/Xunnamius/symbiote/commit/8e11d6670bec0c605d781ecec695de4d6af1edd2
[496]: https://github.com/Xunnamius/symbiote/commit/b57a6be3f30c8c0a2692b256135acbd661d0e92b
[497]: https://github.com/Xunnamius/symbiote/commit/8d03799cbd574e0eed0667f1d91827116da6ff15
[498]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.4.0...@-xun/symbiote@1.4.1
[499]: https://github.com/Xunnamius/symbiote/commit/4b94a07feff53f35ff23d5c0456edd00b2e9f180
[500]: https://github.com/Xunnamius/symbiote/commit/a8ddaa595b00d4730cdce60f5340175b3e9afbcc
[501]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.3.0...@-xun/symbiote@1.4.0
[502]: https://github.com/Xunnamius/symbiote/commit/4eeba0093c58c5ae075542203854b4a3add2907a
[503]: https://github.com/Xunnamius/symbiote/commit/99d57864cb024e23115bc3b9c4b1529d2f3d9bf5
[504]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.2.0...@-xun/symbiote@1.3.0
[505]: https://github.com/Xunnamius/symbiote/commit/cf660452df6ac9781bd9b61d4cc225e926cd4e15
[506]: https://github.com/Xunnamius/symbiote/commit/b999593e14846c8f87949286cd995e7ef92177a1
[507]: https://github.com/Xunnamius/symbiote/commit/380c055b2920c8b96b65dc89b97b6497f996c452
[508]: https://github.com/Xunnamius/symbiote/commit/f0b3b8ce97a389c4656d37f4745eaedb7d684f42
[509]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.1.0...@-xun/symbiote@1.2.0
[510]: https://github.com/Xunnamius/symbiote/commit/6426d70a844a1c3242d719bd648b2a5caf61a12c
[511]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.0.0...@-xun/symbiote@1.1.0
[512]: https://github.com/Xunnamius/symbiote/commit/ac5a9ba2ac77873619069cecc5a364cd09a74d43
[513]: https://github.com/Xunnamius/symbiote/compare/589fcb01d65182c25a9604c55909b2667bd1b1e0...@-xun/symbiote@1.0.0
[514]: https://github.com/Xunnamius/symbiote/commit/89d81a3e405096de202bc1f6be61ab5d58fc3e1e
[515]: https://github.com/Xunnamius/symbiote/commit/589fcb01d65182c25a9604c55909b2667bd1b1e0
