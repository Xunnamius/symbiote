# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## @-xun/symbiote[@3.3.0][3] (2025-02-22)

### ✨ Features

- **commands/project-prepare:** symlink bundled dependencies into node\_modules when they are missing ([ea85093][4])

### 🪄 Fixes

- **commands/project-renovate:** do not run "npm install" if no dependencies were updated during `--update-dependencies` ([4f71380][5])

<br />

### 🏗️ Patch @-xun/symbiote[@3.3.8][6] (2025-02-24)

#### 🪄 Fixes

- **commands/prepare:** always install self-referential node\_modules symlink for hybridrepos ([892f282][7])

<br />

### 🏗️ Patch @-xun/symbiote[@3.3.7][8] (2025-02-24)

#### ⚙️ Build System

- **deps:** bump @-xun/jest from 1.1.5 to 1.1.6 ([f3cf0e3][9])
- **deps:** bump @-xun/project from 1.0.2 to 1.0.3 ([ca139ff][10])

<br />

### 🏗️ Patch @-xun/symbiote[@3.3.6][11] (2025-02-24)

#### 🪄 Fixes

- **commands/project-prepare:** symlink the root project back onto itself in hybridrepo node\_modules ([f51a9f7][12])

<br />

### 🏗️ Patch @-xun/symbiote[@3.3.5][13] (2025-02-24)

#### 🪄 Fixes

- **assets/transformers:** defensively re-run prepare step during release process ([03c423f][14])

#### ⚙️ Build System

- **deps:** bump npm-check-updates from 17.1.14 to 17.1.15 ([18ac9a6][15])

<br />

### 🏗️ Patch @-xun/symbiote[@3.3.4][16] (2025-02-24)

#### 🪄 Fixes

- **commands/prepare:** always symlink bundled deps into node\_modules even in CI and non-dev environments ([8ae1126][17])

<br />

### 🏗️ Patch @-xun/symbiote[@3.3.3][18] (2025-02-22)

#### 🪄 Fixes

- **commands/project-renovate:** add newline to the end of package.json output for `--update-dependencies` ([3911bb5][19])

<br />

### 🏗️ Patch @-xun/symbiote[@3.3.2][20] (2025-02-22)

#### ⚙️ Build System

- **package:** bundle "remark-reference-links" to work around npm hoisting issue ([e3c8f9a][21])

<br />

### 🏗️ Patch @-xun/symbiote[@3.3.1][22] (2025-02-22)

#### 🪄 Fixes

- **commands/project-prepare:** shorten preparation output path length ([e62a8e2][23])

<br />

## @-xun/symbiote[@3.2.0][24] (2025-02-22)

### ✨ Features

- **commands/project-renovate:** implement `--github-pause-rulesets` ([a16e9cd][25])
- **commands/project-renovate:** implement `--update-dependencies` ([ed344de][26])

### 🪄 Fixes

- **assets/transformers:** ensure "type" tests are included in package.json "test:packages:all:unit" script ([ccf56bb][27])
- **commands/clean:** output "nothing to delete" even if hushed ([18f0a89][28])
- **commands/project-renovate:** limit `--hush=true` default to `--regenerate-assets` only ([e98f860][29])

### ⚙️ Build System

- **deps:** bump @-xun/run from 1.0.2 to 1.0.3 ([044e24c][30])
- **deps:** bump prettier from 3.5.1 to 3.5.2 ([6219cb0][31])
- **deps:** bump typedoc from 0.27.7 to 0.27.8 ([89aa4f8][32])
- **package:** bundle dependencies that are built using symbiote to prevent cyclical issues ([fd59e6d][33])

<br />

## @-xun/symbiote[@3.1.0][34] (2025-02-20)

### ✨ Features

- **assets/templates:** delete empty directories during husky pre-commit hook ([50f4bc7][35])
- **assets/templates:** scan for erroneously focused tests in husky pre-push hook ([935e6fc][36])
- **assets:** add support for so-called "error comments" in husky pre-push hook and eslint ([e1fde96][37])
- **commands/clean:** add `--only-empty-directories` flag ([8c752be][38])

### 🪄 Fixes

- **commands/project-renovate:** ensure non-multiversal hybridrepos run husky pre-commit tests across the entire project ([078831b][39])
- Ensure integration and e2e stub tests are generated with correct imports ([03fdcb8][40])

<br />

### 🏗️ Patch @-xun/symbiote[@3.1.4][41] (2025-02-21)

#### 🪄 Fixes

- **commands/project-renovate:** ensure --generate-alias-tags loads GITHUB\_TOKEN env variable ([b809268][42])

<br />

### 🏗️ Patch @-xun/symbiote[@3.1.3][43] (2025-02-21)

#### ⚙️ Build System

- **package:** update @-xun/cli to 1.1.2 ([520897b][44])

<br />

### 🏗️ Patch @-xun/symbiote[@3.1.2][45] (2025-02-21)

#### ⚙️ Build System

- Bundle @semantic-release/exec into symbiote's dependencies ([2e19fbb][46])

<br />

### 🏗️ Patch @-xun/symbiote[@3.1.1][47] (2025-02-20)

#### ⚙️ Build System

- **package:** pin semantic-release (@-xun/release) version ([a1a1659][48])

<br />

## @-xun/symbiote[@3.0.0][49] (2025-02-18)

### 💥 BREAKING CHANGES 💥

- The eslint config transformer's `moduleExport` export is now an async function and must be awaited. Projects updating to this version of symbiote should run their local renovation command, which will bring them into compliance automatically.

### ✨ Features

- Add more muscular integration and e2e stub tests ([597b698][50])

### 🪄 Fixes

- **assets/transformers:** deal with eslint-plugin-unicorn becoming a pure ESM package 🙄 ([6d14d70][51])
- **assets/transformers:** disable unicorn/consistent-assert; fix unicorn/no-instanceof-builtins ([cb5b704][52])
- **assets/transformers:** re-enable @typescript-eslint/no-unnecessary-type-assertion ([e793760][53])
- **assets/transformers:** update eslint unicorn no-instanceof-array to no-instanceof-builtin-object ([0b15d19][54])

### ⚙️ Build System

- **package:** remove unused dependencies ([e49ef2f][55])

<br />

## @-xun/symbiote[@2.25.0][56] (2025-02-16)

### ✨ Features

- Update to and integrate latest @-xun/run ([726d79e][57])

<br />

### 🏗️ Patch @-xun/symbiote[@2.25.1][58] (2025-02-17)

#### 🪄 Fixes

- **commands:** imply --scope=unlimited instead of conflicting on --scope for test/lint commands ([16e65ca][59])

<br />

## @-xun/symbiote[@2.24.0][60] (2025-02-15)

### ✨ Features

- **assets/transformers:** add "test:packages:all:unit" npm script to package.json ([7342275][61])

### 🪄 Fixes

- **assets/templates:** ensure husky uses global test command (units only) by default in monorepos ([842e15e][62])

<br />

### 🏗️ Patch @-xun/symbiote[@2.24.1][63] (2025-02-16)

#### 🪄 Fixes

- **commands/release:** move "build-docs" task into the same tier as "build-dist" ([261741e][64])

<br />

## @-xun/symbiote[@2.23.0][65] (2025-02-07)

### ✨ Features

- **assets/transformers:** allow `transformSelectEsmPackagesToCjs` to monkey patch jest-resolve ([a3bd022][66])

<br />

### 🏗️ Patch @-xun/symbiote[@2.23.11][67] (2025-02-15)

#### 🪄 Fixes

- **assets/templates:** ensure husky uses global lint command by default in monorepos ([5646719][68])

<br />

### 🏗️ Patch @-xun/symbiote[@2.23.10][69] (2025-02-15)

#### 🪄 Fixes

- **commands/build-distributables:** include root "other" package files in subroot package bijection-ok checks ([0374298][70])

<br />

### 🏗️ Patch @-xun/symbiote[@2.23.9][71] (2025-02-12)

#### 🪄 Fixes

- **assets/transformers:** do not use single quotes in npm scripts (windows cmd compat) ([f616a8e][72])
- **commands/test:** ensure tstyche only sees a package's own tests when scope is "this-package" ([88a83ba][73])

<br />

### 🏗️ Patch @-xun/symbiote[@2.23.8][74] (2025-02-11)

#### 🪄 Fixes

- **assets/transformers:** generate tstyche with pseudodecorator embedded in $scheme url ([80c010a][75])
- **package:** upgrade to @-xun/changelog 1.0.2 ([0240ff8][76])

<br />

### 🏗️ Patch @-xun/symbiote[@2.23.7][77] (2025-02-10)

#### 🪄 Fixes

- **assets/transformers:** catch and rethrow stat errors from bad node\_modules fixup attempts wrapped with useful guidance ([c783620][78])
- **assets/transformers:** remove redundant integration test renovation ([d987d66][79])

<br />

### 🏗️ Patch @-xun/symbiote[@2.23.6][80] (2025-02-08)

#### 🪄 Fixes

- **assets/transformers:** mark tstyche package as not-invalid via pseudodecorator ([cabd5a9][81])
- **assets/transformers:** only recreate all-contributors file if it does not already exist ([3d17966][82])

<br />

### 🏗️ Patch @-xun/symbiote[@2.23.5][83] (2025-02-08)

#### 🪄 Fixes

- **assets/transformers:** add `rejectAnyType` and `rejectNeverType` to tstyche config ([dfa62f9][84])
- **assets/transformers:** ensure jest config ignores all tstyche tests ([70bdc66][85])
- **assets/transformers:** ensure jest config ignores dummy/fixture test files ([41c1127][86])
- **assets/transformers:** ensure tstyche tests are run alongisde jest units as part of "test:package:unit" script ([c11a37f][87])

<br />

### 🏗️ Patch @-xun/symbiote[@2.23.4][88] (2025-02-08)

#### 🪄 Fixes

- **commands/test:** allow tstyche to see simple "type.test.tsx?" files ([98342be][89])

<br />

### 🏗️ Patch @-xun/symbiote[@2.23.3][90] (2025-02-07)

#### 🪄 Fixes

- **assets/transformers:** use a more powerful patching algorithm when monkey patching jest-resolve ([b82f5db][91])

<br />

### 🏗️ Patch @-xun/symbiote[@2.23.2][92] (2025-02-07)

#### 🪄 Fixes

- **assets/transformers:** allow booleans in eslint template expression checks ([ee28fd2][93])

<br />

### 🏗️ Patch @-xun/symbiote[@2.23.1][94] (2025-02-07)

#### 🪄 Fixes

- **assets/transformers:** add "debug" to list of allowed functions outside jest test hooks ([baed18c][95])

<br />

## @-xun/symbiote[@2.22.0][96] (2025-02-07)

### ✨ Features

- **assets/transformers:** export `transformSelectEsmPackagesToCjs` for jest configs ([385866d][97])

### 🪄 Fixes

- **assets/transformers:** add tar.gz files to gitignored extensions ([57bf52c][98])
- **assets:** do not clobber `ConfigurationType` in `deepMergeConfig` ([89f25ff][99])

<br />

## @-xun/symbiote[@2.21.0][100] (2025-02-06)

### ✨ Features

- **assets/transformers:** reconfigure eslint to strictly prefer top-level type-only imports ([ffbc0c5][101])
- **assets/transformers:** use strictest tsconfig `noX` checks where sensible ([8bc3c0a][102])

### 🪄 Fixes

- **assets/transformers:** allow several useful abbreviations in variable names via eslint ([a8c4f36][103])
- **assets/transformers:** ensure types imported without the "type" keyword are considered errors ([623cc86][104])
- **commands/project-topology:** use proper flag name for skipping packages ([aa26f6b][105])
- **util.ts:** ignore negated paths when deriving scope narrowing pathspecs using package.json::files ([374f05c][106])

### ⚙️ Build System

- **post-npm-install:** add post-npm-install script to initialize common dummies ([b234ba1][107])
- Switch to using factored-out package APIs ([dbfedff][108])

<br />

## @-xun/symbiote[@2.20.0][109] (2025-02-05)

### ✨ Features

- **assets/templates:** add "renovate:aliases" script to root package.json ([d2b0fa2][110])
- **commands/project-renovate:** add `--exclude-asset-paths` and `--include-asset-paths` to "regenerate-assets" ([42ea1cb][111])
- **commands/project-renovate:** add `--only-aliases` to "regenerate-assets" ([8a17ad8][112])

### 🪄 Fixes

- **commands/project-renovate:** only attempt to skip assets when one of the inclusion/exclusion flags given ([2fc5abf][113])

<br />

## @-xun/symbiote[@2.19.0][114] (2025-02-05)

### ✨ Features

- **assets/templates:** check for unmerged replacer regions during husky pre-push hook ([02bd1f4][115])

<br />

## @-xun/symbiote[@2.18.0][116] (2025-01-31)

### ✨ Features

- **commands/project-topology:** implement support for `--run-to-completion` ([2b9d383][117])

### 🪄 Fixes

- **assets/transformers:** elide publishConfig from package.json if package is private ([3c4d07d][118])

<br />

### 🏗️ Patch @-xun/symbiote[@2.18.6][119] (2025-02-05)

#### 🪄 Fixes

- **assets/transformers:** only ignore fixtures/ dir when it appears at some depth under a test/ dir ([61b0c6f][120])

#### ⚙️ Build System

- Bundle @-xun/jest and include it in renovation output ([feae4de][121])

<br />

### 🏗️ Patch @-xun/symbiote[@2.18.5][122] (2025-02-03)

#### 🪄 Fixes

- **assets/transformers:** reduce warning about minor core-js "issues" to a debug output ([a0fabf1][123])

<br />

### 🏗️ Patch @-xun/symbiote[@2.18.4][124] (2025-02-03)

#### 🪄 Fixes

- **assets/transformers:** collect and commit any remaining changes in the repository after release ([1dd3c8b][125])
- **commands/release:** do not attempt rollback on failure if --ci=true ([03d0f5e][126])

<br />

### 🏗️ Patch @-xun/symbiote[@2.18.3][127] (2025-02-03)

#### 🪄 Fixes

- **assets/transformers:** disable import/export eslint rule since it does not work consistently ([d10510b][128])
- **src:** do not include random garbage in taskrunner output ([9ad3cda][129])

<br />

### 🏗️ Patch @-xun/symbiote[@2.18.2][130] (2025-02-03)

#### 🪄 Fixes

- **src:** make output colors consistent for easier reviewing experience ([c906eda][131])

<br />

### 🏗️ Patch @-xun/symbiote[@2.18.1][132] (2025-02-01)

#### 🪄 Fixes

- **assets/transformers:** do not warn about minor core-js issues during test runs ([2816aa5][133])

<br />

## @-xun/symbiote[@2.17.0][134] (2025-01-30)

### ✨ Features

- **commands/project-topology:** implement support for `--skip-packages` ([3e1e6c6][135])
- **commands/project-topology:** support regular expressions via `--skip-packages` ([df3174d][136])
- **packages/project-utils:** purify sort-packages-topologically result (same input always equals same output) ([eed08a0][137])

<br />

### 🏗️ Patch @-xun/symbiote[@2.17.3][138] (2025-01-30)

#### 🪄 Fixes

- **assets/transformers:** do not elide build scripts from package.json if package is not private ([697c638][139])

<br />

### 🏗️ Patch @-xun/symbiote[@2.17.2][140] (2025-01-30)

#### 🪄 Fixes

- **src:** add "global" signifier to --version output when project metadata unavailable ([3c34513][141])

<br />

### 🏗️ Patch @-xun/symbiote[@2.17.1][142] (2025-01-30)

#### 🪄 Fixes

- **assets/templates:** update package readme template (minor cosmetics) ([d1d3838][143])
- **assets/transformers:** ensure package.json files for packages are not erroneously marked "private" ([22889a3][144])

<br />

## @-xun/symbiote[@2.16.0][145] (2025-01-25)

### ✨ Features

- **commands/build-distributables:** implement support for `--include-external-assets` ([5a6b8fd][146])

### 🪄 Fixes

- **commands/test:** ensure test command imports jest config from project root package ([50e60da][147])

<br />

### 🏗️ Patch @-xun/symbiote[@2.16.6][148] (2025-01-29)

#### 🪄 Fixes

- **commands/build-distributables:** include some "other" package files in non-source specifier-ok checks ([49cbe95][149])
- **commands/build-distributables:** only subject relevant files to post-build dependency bijection check ([f9678b8][150])

#### 🔥 Reverted

- _"fix(assets/transformers): ensure babel extension check functions properly exclude definition file extensions"_ ([c39983c][151])

<br />

### 🏗️ Patch @-xun/symbiote[@2.16.5][152] (2025-01-27)

#### 🪄 Fixes

- **commands/build-distributables:** use proper root directory when limiting bijection check ([8eac971][153])

<br />

### 🏗️ Patch @-xun/symbiote[@2.16.4][154] (2025-01-27)

#### 🪄 Fixes

- **commands/build-distributables:** limit bijection check in `dist` dir to `dist/src` subdir ([29281df][155])

<br />

### 🏗️ Patch @-xun/symbiote[@2.16.3][156] (2025-01-27)

#### 🪄 Fixes

- **commands/build-distributables:** ensure destination exists before attempting to copy assets ([f7f4f11][157])

<br />

### 🏗️ Patch @-xun/symbiote[@2.16.2][158] (2025-01-27)

#### 🪄 Fixes

- **src:** do not include "other" package files in non-source specifier-ok checks ([450d03a][159])

<br />

### 🏗️ Patch @-xun/symbiote[@2.16.1][160] (2025-01-25)

#### 🪄 Fixes

- **commands/test:** ensure local jest config is imported with expected NODE\_ENV ([52d5f44][161])
- **packages/cli-utils:** improve debug output during errors (dump full error to console) ([5f35a77][162])

<br />

## @-xun/symbiote[@2.15.0][163] (2025-01-23)

### ✨ Features

- **assets:** add support for `monorepoPackagesList` to `TransformerContext` ([229d304][164])

### 🪄 Fixes

- **assets/templates:** update non-hybrid monorepo root readme template ([13d185c][165])
- **assets/transformers:** remove unused keys from non-hybrid monorepo root package.json ([52bef91][166])
- **commands/project-renovate:** integrate `monorepoPackagesList` into asset regeneration ([d5fff49][167])
- **commands/release:** move "build-dist" task into its own tier; other build tasks are now executed after ([0608290][168])

<br />

## @-xun/symbiote[@2.14.0][169] (2025-01-20)

### ✨ Features

- **commands/build-distributables:** implement support for togglable multiversal build and validation features ([1301043][170])
- **packages/project-utils:** add `Multiversal` to `ProjectAttributes` and `WorkspaceAttributes` ([f20ab42][171])
- **packages/project-utils:** support sub-root "universe" import aliases; greatly improve fidelity of post-build import validation ([d8e32c7][172])

### 🪄 Fixes

- **assets/templates:** update maintaining.md template with topology-related commands ([9223639][173])
- **assets/transformers:** move `--multiversal` and related flags to "build:dist" npm script ([a7ed2d2][174])
- **packages/project-utils:** improve error message outputs ([71f3d43][175])
- **src:** use gentler language around core-js warning ([7d7e837][176])

### ⚙️ Build System

- **package:** opt into multiversal featureset for symbiote's own build process ([251f2c1][177])

<br />

### 🏗️ Patch @-xun/symbiote[@2.14.6][178] (2025-01-23)

#### 🪄 Fixes

- **assets/transformers:** remove `--hush` from package.json npm renovation script ([9e8658f][179])
- **commands/project-renovate:** improve output of various renovations ([a6db0c4][180])

#### ⚙️ Build System

- **package:** remove `--hush` from renovation script ([7621c5f][181])

<br />

### 🏗️ Patch @-xun/symbiote[@2.14.5][182] (2025-01-23)

#### 🪄 Fixes

- **commands/project-release:** move lint task after build-documentation task ([da0014a][183])

<br />

### 🏗️ Patch @-xun/symbiote[@2.14.4][184] (2025-01-20)

#### 🪄 Fixes

- **commands/project-topology:** inherit stdio when not running in parallel ([3b6f453][185])

<br />

### 🏗️ Patch @-xun/symbiote[@2.14.3][186] (2025-01-20)

#### 🪄 Fixes

- **assets/transformers:** do not mark released sub-root packages as "private" ([e27824c][187])
- **assets/transformers:** do not remove scripts from sub-root packages without --force ([17742f7][188])

<br />

### 🏗️ Patch @-xun/symbiote[@2.14.2][189] (2025-01-20)

#### 🪄 Fixes

- **commands/release:** work around strange codecov issues to ensure proper flag-based upload support ([99b7edb][190])

<br />

### 🏗️ Patch @-xun/symbiote[@2.14.1][191] (2025-01-20)

#### 🪄 Fixes

- **commands/project-release:** fail release process if current package.json has a `private: true` field ([ceda91b][192])
- **commands/project-topology:** do not attempt to release private packages unless user has misconfigured dependencies ([bc7742b][193])
- **commands/project-topology:** ensure `--options` receives all proceeding unrecognized args ([9f4668c][194])
- **commands/project-topology:** warn visually when a topological dependency is private ([e90857a][195])
- **packages/project-utils:** allow `sortPackagesTopologically` to skip private packages on first iteration by default ([8bd33e6][196])

<br />

## @-xun/symbiote[@2.13.0][197] (2025-01-18)

### ✨ Features

- **commands/topology:** implement new "project topology" command ([e5a994b][198])
- **packages/project-utils:** implement topological dependency sorting algorithm `sortPackagesTopologically` ([aa28cc2][199])

### 🪄 Fixes

- **assets/transformers:** manually set codecov default branch to "main" by default ([87c9c3c][200])
- **assets/transformers:** update package.json outputs with latest best practices ([7f98295][201])

<br />

## @-xun/symbiote[@2.12.0][202] (2025-01-16)

### ✨ Features

- **src:** support debug output activation given the presence of GHA debug env variables ([e2584fc][203])

### ⚙️ Build System

- **packages/cli-utils:** update rejoinder-listr2 to 1.0.1 ([443eb13][204])
- **package:** update rejoinder 1.2.1 ([a01453f][205])
- **src:** integrate rejoinder-github-actions ([721eb51][206])

<br />

## @-xun/symbiote[@2.11.0][207] (2025-01-10)

### ✨ Features

- **commands/prepare:** execute post-npm-install scripts and other tasks with greater fidelity ([e53be8b][208])
- **packages/project-utils:** allow `isAccessible` to handle "file:///" URL-style file paths ([3058d49][209])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.9][210] (2025-01-15)

#### 🪄 Fixes

- **assets/transformers:** export and return `WritableReleaseConfig` from release asset config ([b951959][211])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.8][212] (2025-01-15)

#### 🪄 Fixes

- **assets/transformers:** escape characters considered special in Markdown when they appear in commit messages ([4196fe0][213])
- **assets/transformers:** ignore irrelevant revert commits ([e432f8a][214])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.7][215] (2025-01-14)

#### 🪄 Fixes

- **assets/templates:** update architecture.md ([e734cc6][216])
- **assets/transformers:** do not renovate root package test files if the root test directory already exists ([2b00195][217])
- **assets/transformers:** ensure default "list-tasks" script does not overwrite custom in package.json ([605e4eb][218])
- **assets/transformers:** parse architecture.md with respect to its replacer regions ([31863db][219])
- **commands/project-prepare:** do not attempt to chdir during async tasks ([e80d6e7][220])
- **packages/project-utils:** ensure `gatherPseudodecoratorEntriesFromFiles` does not choke on super-pinned dependency names ([614ba8b][221])

#### ⚙️ Build System

- **packages/cli-utils:** integrate rejoinder-listr2 ([690ad17][222])
- Tear turbo out of symbiote ([5540b7d][223])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.6][224] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** do the right thing when there is no "most recent relevant version tag" ([2dfb17d][225])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.5][226] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** fix the graceful exit error on --dry-run fix ([6f7a302][227])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.4][228] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** do not throw graceful exit error on --dry-run ([67bad27][229])
- **commands/renovate:** support camel-case options when invoked artificially ([5ab38d0][230])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.3][231] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** push any post-release metadata changes after committing them ([15d3444][232])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.2][233] (2025-01-11)

#### 🪄 Fixes

- **assets:** use proper package context when deriving codecov package flag ([16af6eb][234])

<br />

### 🏗️ Patch @-xun/symbiote[@2.11.1][235] (2025-01-11)

#### 🪄 Fixes

- Ensure readme renovation yields correct codecov badge link using derived flag ([1e0174c][236])

<br />

## @-xun/symbiote[@2.10.0][237] (2025-01-10)

### ✨ Features

- **commands/release:** refuse release attempt if most recent version tag is "semver experimental" ([900c84b][238])
- **src:** add local/global emoji to version text output ([2d7c433][239])

### 🪄 Fixes

- **assets/templates:** link to the npm registry instead of npm trends for "npm install" badge ([76bd411][240])
- **commands/release:** actually respect SYMBIOTE\_RELEASE\_WITH\_FORCE env var when present ([e264510][241])
- **commands/release:** actually throw when release finishes with a dirty repo and force not used ([ae7340f][242])
- **commands/release:** commit root package-lock.json during post-release "success" step when necessary ([bccf091][243])

### ⚙️ Build System

- Remove @-xun/debug and rejoinder multiverse workspaces in favor of published packages ([77e22ae][244])

<br />

## @-xun/symbiote[@2.9.0][245] (2025-01-10)

### ✨ Features

- **commands/release:** `--force` prevents release process from erroring if repo left in unclean state ([45a9568][246])

<br />

## @-xun/symbiote[@2.8.0][247] (2025-01-09)

### ✨ Features

- **assets:** support empty default text when compiling templates in memory ([abc2eae][248])
- **assets:** support new "+" concatenation template variables when compiling templates in memory ([152bcdb][249])
- **commands/release:** allow the release process to terminate prematurely with grace ([7fa548f][250])
- **commands/release:** rollback the repository to its pre-release state under certain error conditions ([d34d569][251])

### 🪄 Fixes

- **assets/templates:** ensure package-level readme is generated using proper logo url ([1631e8d][252])
- **assets/transformers:** include root package-lock.json in commit when releasing sub-root package ([032aa30][253])

### ⚙️ Build System

- **assets/transformers:** throw in xrelease "success" step if repo is left in a dirty state after release ([88b7f38][254])

<br />

### 🏗️ Patch @-xun/symbiote[@2.8.2][255] (2025-01-10)

#### 🪄 Fixes

- **commands/release:** do not roll repository back if `--dry-run` is used ([ecdd713][256])

<br />

### 🏗️ Patch @-xun/symbiote[@2.8.1][257] (2025-01-10)

#### 🪄 Fixes

- **assets/transformers:** do not erroneously report jest-extended as an invalid dep ([af354d0][258])
- **commands/release:** recursively check causal stack for graceful exit symbol ([4a89482][259])

<br />

## @-xun/symbiote[@2.7.0][260] (2025-01-09)

### ✨ Features

- Support windows-style paths ([28acb79][261])

### ⚙️ Build System

- **assets/transformers:** update "core-js" to 3.40 ([6f8cbe2][262])
- Completely remove all traces of spellchecker and node-gyp ([edc6cca][263])

<br />

### 🏗️ Patch @-xun/symbiote[@2.7.1][264] (2025-01-09)

#### 🪄 Fixes

- **assets/transformers:** ensure subroot tsconfigs include root test/setup.ts where appropriate ([138da87][265])

<br />

## @-xun/symbiote[@2.6.0][266] (2025-01-08)

### ✨ Features

- Support `--env` common option for cross-env-like functionality ([dddfc44][267])

### ⚙️ Build System

- Remove unnecessary jsdoc type comments ([180f85f][268])

<br />

## @-xun/symbiote[@2.5.0][269] (2025-01-04)

### ✨ Features

- **commands/renovate:** implement --generate-alias-tags renovation ([c133a92][270])

### 🪄 Fixes

- **assets/templates:** disable turbo config generation for now and add stashed configs ([6210727][271])
- **assets/templates:** use less confusing language during readme regeneration ([625451c][272])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.6][273] (2025-01-06)

#### 🪄 Fixes

- **assets:** ensure `deepMergeConfig` accepts a diverse set of overwrite objects ([2fd61c4][274])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.5][275] (2025-01-06)

#### 🪄 Fixes

- **src:** use proper path in global-vs-local binary detection ([3831af5][276])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.4][277] (2025-01-06)

#### 🪄 Fixes

- **commands/lint:** do not hide all output when `--hush` is used ([c23304e][278])

#### ⚙️ Build System

- Indicate in output topmatter whether current binary is globally or locally installed ([1411119][279])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.3][280] (2025-01-05)

#### 🪄 Fixes

- **assets/transformers:** add `--hush` to "lint" script in generated package.json files ([0dd4fb7][281])
- **assets/transformers:** generate properly formatted "breaking change" changelog notes ([607a378][282])
- **assets/transformers:** update "turbo:init" script to use "project init-turbo" command in package.json ([19492a7][283])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.2][284] (2025-01-04)

#### 🪄 Fixes

- **assets/transformers:** do not mess with "breaking change" title casing in generated changelog (via remark) ([4231719][285])

<br />

### 🏗️ Patch @-xun/symbiote[@2.5.1][286] (2025-01-04)

#### 🪄 Fixes

- **commands/release:** use emoji to reference skipped tasks in output ([b2dfed2][287])

<br />

## @-xun/symbiote[@2.4.0][288] (2025-01-03)

### ✨ Features

- **commands/documentation:** add `--baseline` and `--typedoc-options` flag support ([10f876e][289])

<br />

### 🏗️ Patch @-xun/symbiote[@2.4.3][290] (2025-01-03)

#### 🪄 Fixes

- **assets/templates:** do not capitalize package semver data in markdown files (via remark) ([7b8ca54][291])

<br />

### 🏗️ Patch @-xun/symbiote[@2.4.2][292] (2025-01-03)

#### 🪄 Fixes

- **assets/templates:** ensure real repo owner is used in support.md file link generation ([0bafa30][293])

<br />

### 🏗️ Patch @-xun/symbiote[@2.4.1][294] (2025-01-03)

#### 🪄 Fixes

- **commands/documentation:** ensure black flag uses proper argparser configuration ([02e289a][295])

<br />

## @-xun/symbiote[@2.3.0][296] (2025-01-01)

### ✨ Features

- **assets/transformers:** add eslint-config-turbo to eslint config ([23d01f3][297])
- **assets/transformers:** add new "turbo-only" asset preset available to the renovate command ([ee079c1][298])
- **commands/distributables:** implement `--skip-output-bijection-checks-for` ([c92b2cb][299])
- **packages/project-utils:** add "turbo:init" script to `XPackageJson` ([c565452][300])

### 🪄 Fixes

- **assets/transformers:** add .turbo to gitignore ([6353b4f][301])
- **assets/transformers:** ensure all project-root package.json files have a "turbo:init" script ([64a4138][302])
- **assets/transformers:** generate readme using proper title ([9304778][303])

<br />

### 🏗️ Patch @-xun/symbiote[@2.3.4][304] (2025-01-02)

#### 🪄 Fixes

- **assets/transformers:** remove commit spellchecker until commit-spell is released ([7f1f7a2][305])

<br />

### 🏗️ Patch @-xun/symbiote[@2.3.3][306] (2025-01-02)

#### 🪄 Fixes

- **commands/prepare:** exit immediately with exit code 0 when run runtime pre-checks fail ([1546ab8][307])

<br />

### 🏗️ Patch @-xun/symbiote[@2.3.2][308] (2025-01-01)

#### ⚙️ Build System

- **assets/transformers:** add "\_\_x\_\_" directories to .prettierignore and eslint ignores ([ff6ce22][309])
- **src:** add helpful verbiage to "lint" output and generated .prettierignore files ([9a456c5][310])

<br />

### 🏗️ Patch @-xun/symbiote[@2.3.1][311] (2025-01-01)

#### 🪄 Fixes

- **commands/distributables:** ensure bijection check warnings are not overshadowed by errors ([1901cfe][312])

<br />

## @-xun/symbiote[@2.2.0][313] (2024-12-28)

### ✨ Features

- **assets/transformers:** warn when updating package.json::engines that it is likely a breaking change ([0c1b93a][314])
- **commands:** expose `RawAliasMapperFunction` and `RawAliasMapperArray` helper types ([ce6a12a][315])
- **packages/cli-utils:** hoist semi-deep options configuration merge functionality from util ([14bf31f][316])

### 🪄 Fixes

- **assets/transformers:** do not allow --force to overwrite "sideEffects" field in package.json ([c263dc5][317])
- **assets/transformers:** do not allow --force to overwrite files in src ([f556644][318])
- **assets/transformers:** ensure provided aliases are added in addition to defaults ([9581339][319])
- **assets/transformers:** ensure warning-comment errors are only reported when allowed ([432a5fa][320])
- **assets/transformers:** exclude "renovate" script from sub-root package.json files ([f82fbf4][321])
- **assets/transformers:** generate proper cli as index export subpath in package.json ([a95e910][322])
- **assets/transformers:** generate proper tsconfig files for sub-root packages ([12dd3f7][323])
- **assets/transformers:** generate properly-scoped field values for sub-root package.json files ([2a3e13c][324])
- **assets/transformers:** generate valid GitHub link in "homepage" field of package.json ([b8841b5][325])
- **assets/transformers:** guess the proper asset preset for sub-root packages ([f301229][326])
- **assets/transformers:** improve license detection when generating readme ([26f78dc][327])
- **assets/transformers:** improve replacer region flexibility and fidelity when generating readme ([c63847c][328])
- **assets/transformers:** preserve all dependency-related keys in package.json ([df13f87][329])
- **assets/transformers:** regenerate package.json files more carefully ([48163ba][330])
- **commands/renovate:** do not attempt to format output when --force is given ([c4f81c0][331])

### ⚙️ Build System

- **assets/transformers:** disable broken @typescript-eslint/no-unnecessary-type-assertion eslint rule ([8338afa][332])
- **babel:** add special consideration for symbiote when building itself ([fb7752b][333])

<br />

## @-xun/symbiote[@2.1.0][334] (2024-12-27)

### ✨ Features

- **commands/distributables:** `--partial` now filters against absolute paths ([0c86cb5][335])
- **commands/distributables:** improve partial build metadata output ([0b96a6b][336])

### 🪄 Fixes

- **assets/transformers:** address incorrect capture group string in babel replacer functions ([e682734][337])
- **assets/transformers:** address incorrect extension transform in babel replacer functions ([552b89f][338])
- **assets/transformers:** address incorrect use of `toRelativePath` in babel replacer functions ([7409b67][339])
- **assets/transformers:** be more selective in when and how to replace .env and .env.default files ([2013638][340])
- **assets/transformers:** create test/util.ts instead of test/index.ts ([5057f53][341])
- **assets/transformers:** do not attempt to deep merge the eslint config array ([6c5a8fe][342])
- **assets/transformers:** do not create example definition files if root types dir already exists ([a84c523][343])
- **assets/transformers:** do not include "import" condition during resolution in babel replacer functions ([f9bdb7e][344])
- **assets/transformers:** do not overwrite existing changelog patch files ([b6927a9][345])
- **assets/transformers:** do not overwrite existing global.ts types file ([364fbb2][346])
- **assets/transformers:** populate .vscode example configs from existing or vice versa depending on force ([11bd584][347])
- **assets/transformers:** populate new .env files with full lines from corresponding .env.default files ([aee10cd][348])
- **assets/transformers:** properly construct subpath targets when resolving entry points in babel replacer functions ([d44fa79][349])
- **assets/transformers:** short circuit resolution logic for simple bare specifiers in babel replacer functions ([b7f2754][350])
- **packages/project-utils:** ensure aliases are generated in verse-specificity order ([f592d5f][351])
- **src:** replace xscripts with symbiote in configuration version self-check ([7e66183][352])

### ⚙️ Build System

- **babel:** regenerate configuration asset ([98c028a][353])
- **package:** include missing dependency ([3030eb9][354])

<br />

## @-xun/symbiote[@2.0.0][355] (2024-12-26)

### 💥 BREAKING CHANGES 💥

- `@-xun/scripts` is now deprecated. Use `@-xun/symbiote` instead.

### ✨ Features

- **assets:** expose to per-package asset adders a per-package version of `TransformerContext` ([b7b101e][356])
- **commands/renovate:** add tag aliasing to --github-rename-root renovation ([057f400][357])
- **commands/renovate:** implement --github-rename-root renovation ([d22de31][358])
- **commands/test:** all "Test.AllLocal" meta test kind and make it the default ([e83f2f2][359])

### 🪄 Fixes

- **assets/transformers:** do not throw on bad engines field in package.json (eslint) ([ad83e56][360])
- **assets/transformers:** do not use sync API in eslint.config.mjs ([0a19ce6][361])
- **assets/transformers:** ensure alias functions and related imports are generated with proper syntax ([70b5134][362])
- **assets/transformers:** ensure certain outputs do not trigger eslint errors ([1a522e8][363])
- **assets/transformers:** ensure certain outputs do not trigger eslint errors ([9d05b8b][364])
- **assets/transformers:** generate integration configuration file with proper name ([7a8eee6][365])
- **assets/transformers:** import `assertEnvironment` in release config template ([abbc2da][366])
- **assets/transformers:** only generate .browserslistrc on web-related presets ([53409fa][367])
- **assets/transformers:** remove unnecessary spacing from tsconfig.json output ([2bd57b5][368])
- **assets/transformers:** use actual esm import syntax when generating commitlint config ([a40f886][369])
- **assets/transformers:** use non-broken links in maintenance docs template ([f2bb03d][370])
- **assets/transformers:** use repository name when generating all-contributors config ([641b57b][371])
- **commands/renovate:** prevent attempts to resolve package root relative path in nonsensical scopes ([177a5dc][372])
- **packages/bfe:** ensure `getInvocableExtendedHandler` handler invocation does not trigger bfe checks ([c331ae1][373])
- **packages/bfe:** properly track canonical option name expansions in extended builders ([8724515][374])
- **packages/project-utils:** never derive broken RegExp-based aliases for babel and jest ([a6f02e0][375])
- **src:** use absolute paths when outputting and deleting files; use recursive mkdir ([5e99d88][376])

### ⚡️ Optimizations

- **src:** combine lint-staged formatter invocations into a single command ([f511249][377])
- **src:** use real package name instead of bin alias with npx during lint-staged formatting ([577710b][378])

### ⚙️ Build System

- **commitlint.config:** reduce header-max-length severity from "error" to "warning" ([2841d26][379])
- **jest:** regenerate configuration asset ([5c66c17][380])
- Regenerate several other configuration assets ([6a44488][381])
- Regenerate several other configuration assets ([26fb034][382])
- Transmute remaining files @-xun/scripts => @-xun/symbiote ([4f8d351][383])

### 💎 Aesthetics

- **package:** transmute @-xun/scripts => @-xun/symbiote ([26e7563][384])

<br />

### 🏗️ Patch @-xun/symbiote[@2.0.1][385] (2024-12-26)

#### ⚙️ Build System

- **package:** force CD pipeline to complete ([e42722b][386])

<br />

## @-xun/symbiote[@1.33.0][387] (2024-12-22)

### ✨ Features

- **commands/release:** add `allowMissingNpmScripts` task init option; skippable coverage upload ([f1e8e8e][388])
- **commands:** take advantage of improved target gathering functions ([4925885][389])
- **packages/babel-plugin-metadata-accumulator:** always include type-only import metadata ([ca87588][390])
- **packages/bfe:** add "options" to usage string in help text by default ([410a05a][391])
- **packages/debug:** support and expand upstream debug's process.env.DEBUG activation behavior ([f111552][392])
- **packages/project-utils:** exclude type-only imports from build targets (but keep them elsewhere) ([1d9accc][393])
- **packages/project-utils:** introduce `toDirname` typed analogue of node:fs `dirname` ([51ab454][394])
- **packages/project-utils:** provide richer metadata to consumers of `gatherPackageBuildTargets` ([c2bee3b][395])
- Upgrade to experimental asset generation engine ([b057430][396])

### 🪄 Fixes

- **assets/transformers:** ensure package.json generated for non-hybrid monorepo roots ([eec0ed9][397])
- **assets/transformers:** make env.default transformer resilient to non-existence of .env ([16f64e1][398])
- **commands/test:** ensure all the current package's multiversal dependencies' tests are run ([413dc39][399])
- **commands/test:** ensure test coverage directory is always generated at the current package root ([28c221b][400])
- **packages/debug:** add interop necessary to preserve upstream DEBUG env var activation behavior ([6a8c411][401])
- **packages/project-utils:** ensure alias calculation uses correct relative directory src path ([da7e953][402])
- **packages/rejoinder:** ensure sub-instance loggers are included in internal tracking ([edec64f][403])
- **util:** consider scope during precheck phase ([578d631][404])

### ⚙️ Build System

- **commands/deploy:** remove dummy release option ([bf993c9][405])
- **husky:** skip slow unit tests ([c52b3f1][406])
- **package:** downgrade typescript-eslint to 8.18.0 and pin it until it is fixed ([cdfd48d][407])
- **packages/babel-plugin-metadata-accumulator:** remove extraneous dependencies ([d6a0c06][408])
- Regenerate conventional and release assets ([a33aed8][409])

## @-xun/symbiote[@1.32.0][410] (2024-12-11)

### ✨ Features

- **commands/renovate:** complete --sync-deps and --github-reconfigure-repo renovations ([c9a6e8b][411])
- **packages/project-utils:** add `relativeRoot` to `ProjectMetadata` ([e17adfb][412])

### 🪄 Fixes

- **commands/renovate:** do not update existing origin secrets unless --force ([c5cd76a][413])
- Rewrite assets interface to avoid impedance mismatch ([56e576c][414])

### ⚙️ Build System

- **babel:** `readPackageJsonAtRoot` => `readXPackageJsonAtRoot` ([aa60eeb][415])
- **prettier.config:** reduce typescript print width to 89 (vscode shrunk) ([c248757][416])

### @-xun/symbiote[@1.31.2][417] (2024-12-08)

#### 🪄 Fixes

- **commands/test:** ensure all relevant source files are included when calculating coverage ([0565333][418])

#### ⚙️ Build System

- Remove execa bridge dependency now that we use @-xun/run exclusively ([f4ecfc9][419])

### @-xun/symbiote[@1.31.1][420] (2024-12-08)

#### 🪄 Fixes

- **command/release:** ensure "release" calls "project renovate" with --force ([cfe28e3][421])
- **packages/bfe:** ensure `withUsageExtensions` configurations function as advertised ([8935008][422])
- **packages/bfe:** handle declarative `group` option configurations in bfe instead of bf/yargs ([39e37a8][423])
- **src:** use more specific conflicts for --deprecate vs --undeprecate ([58a6223][424])

## @-xun/symbiote[@1.31.0][425] (2024-12-07)

### ✨ Features

- **commands/renovate:** add initial stub version of "project renovate" ([8f7777c][426])
- **src:** allow multiple choice string replacements in markdown asset templates ([6fc66d8][427])

### 🪄 Fixes

- **assets/conventional:** ensure `issuePrefixes` xchangelog setting propagates throughout config object ([8a5fd8a][428])
- **commands/release:** only rebuild changelog if the relevant task is not skipped ([68d5bda][429])
- **commands/renovate:** account for vacuous case in bfe check functions ([ef6927b][430])
- **src:** actually invoke "project renovate" command from within "release" command ([ceb6c62][431])
- **src:** factor out shared runner wrapper; ensure runner rejects when it should ([ce93443][432])
- **src:** support parameters in handlebars-style template strings ([6ce819a][433])

### ⚙️ Build System

- **husky:** use proper lint command ([62a5a12][434])

### @-xun/symbiote[@1.30.3][435] (2024-12-04)

#### 🪄 Fixes

- **packages/project-utils:** ensure meaningful error output from `readJsonc` ([01dca03][436])
- **src:** allow testverse imports in non-source typescript files ([b923d6d][437])

### @-xun/symbiote[@1.30.2][438] (2024-11-26)

#### ⚙️ Build System

- **remarkrc:** ensure remark doesn't mangle GFM alerts with escape characters ([98a868e][439])

### @-xun/symbiote[@1.30.1][440] (2024-11-25)

#### 🪄 Fixes

- **config/conventional:** fix global patch detection logic ([89eebe7][441])

## @-xun/symbiote[@1.30.0][442] (2024-11-25)

### ✨ Features

- **commands/list-tasks:** allow filtering tasks by string ([3710988][443])
- **packages/bfe:** add support for `prependNewlines` ([e163302][444])

### 🪄 Fixes

- **commands/release:** ensure codecov uploader is passed the proper arguments ([ca47d93][445])

### @-xun/symbiote[@1.29.2][446] (2024-11-25)

#### ⚙️ Build System

- **package:** upgrade @-xun/changelog to 1.0.0 ([d89809b][447])

### @-xun/symbiote[@1.29.1][448] (2024-11-24)

#### ⚙️ Build System

- **remarkrc:** fix faulty array reference ([8feaaa7][449])

## @-xun/symbiote[@1.29.0][450] (2024-11-24)

### ✨ Features

- **packages/bfe:** allow more control over `withUsageExtensions` result ([053bf3e][451])
- **src:** add support for init version tag suffixes to "build changelog" ([002431f][452])

### 🪄 Fixes

- **src:** ensure "clean" command does not delete ignored packages ([65b8c0b][453])

### ⚙️ Build System

- **packages/babel-plugin-metadata-accumulator:** ensure root types/ directory is included in sub-root tsc configs ([0ed2513][454])

## @-xun/symbiote[@1.28.0][455] (2024-11-24)

### ✨ Features

- **babel:** use reverse entrypoint resolver to fix tsc output ([c3fc126][456])
- **packages/project-utils:** add `try` option to json reading functions ([a91e7fa][457])

### 🪄 Fixes

- **eslint:** do not collapse path group overrides ([71b17c8][458])
- **packages/project-utils:** ensure external and internal build target sets are mutually exclusive ([7fed439][459])
- Remove unnecessary restrictions on universe imports; bail out when an import is rejected ([11b585d][460])
- **src:** warn when release process ends with a dirty repo ([cf5b25b][461])

### ⚙️ Build System

- **babel:** add core-js validation checks ([55ee62d][462])
- **babel:** fix incorrect regexp stringification when using transform-rewrite-imports ([56b706a][463])
- **packages/babel-plugin-metadata-accumulator:** add missing dependencies (to be pared down later) ([b3e2560][464])
- **packages/debug:** add missing dependencies (to be pared down later) ([d1038dd][465])

## @-xun/symbiote[@1.27.0][466] (2024-11-23)

### ✨ Features

- **project-utils:** expose `process.cwd` replacement exports ([1a69887][467])

### 🪄 Fixes

- **distributables.ts:** do not output "build succeeded but" message unless build actually succeeded ([1262cc8][468])

### ⚙️ Build System

- **eslint:** add `instanceof` and `process.cwd` usage restrictions ([645473d][469])
- **package:** make scripts less verbose ([c5c742e][470])
- **packages/babel-plugin-metadata-accumulator:** package-ify this workspace ([11da8f2][471])
- **packages/debug:** package-ify this workspace ([afa3f46][472])

## @-xun/symbiote[@1.26.0][473] (2024-11-22)

### ✨ Features

- **packages/bfe:** ensure `coerce` function always receive an array when so configured ([5c8816d][474])
- **src:** implement "release" command ([44be676][475])
- **src:** implement new graph algorithm for lint target determination ([3323fc3][476])
- **src:** implement new graph algorithm for test target determination ([8a67d70][477])

### 🪄 Fixes

- **packages/bfe:** ensure downstream builder functions receive nullable argv ([9b551a7][478])
- **packages/bfe:** force `BfeStrictArgs` to be partial in argv to make usage easier ([0924dd3][479])
- **packages/bfe:** use more intuitive arg-val interpretation when given argument value is an array ([ce72af2][480])
- **packages/cli-utils:** do not propagate upstream error messages ([6ac3376][481])
- **src:** ignore root package properly when releasing package ([09373fa][482])
- **src:** improve dev version detection ([b3e95e7][483])
- **src:** improve outputs; fix crash due to shifting arg type ([d27007d][484])
- **src:** patch globals to deal with design decisions from upstream conventional-changelog-core ([998218d][485])

### ⚙️ Build System

- **eslint:** allow "arg" as a variable name ([9087086][486])
- **eslint:** update to use experimental features of @-xun/eslint-plugin-import-experimental ([36016b1][487])
- **jest:** ensure jest and jest-haste-map ignore ignored packages ([86fca58][488])
- **src:** update with latest launch.json ([bb6bde9][489])

## @-xun/symbiote[@1.25.0][490] (2024-11-14)

### ✨ Features

- Integrate @-xun/changelog ([31c7bbb][491])
- Integrate @-xun/release ([4f807cf][492])
- Integrate @-xun/run ([d22cee3][493])
- Integrate Tstyche into "test" command ([9045cd7][494])
- **packages/babel-plugin-metadata-accumulator:** add stub version information ([42510f6][495])
- **packages/bfe:** add stub version information ([c0b7b70][496])
- **packages/cli-utils:** add stub version information ([f8734d4][497])
- **packages/debug:** add stub version information ([005ab26][498])
- **packages/project-utils:** add `typescriptTestFiles` to `ProjectFiles` objects ([e7c4b6e][499])
- **packages/project-utils:** add support for `.shared` files at package roots ([c62261b][500])
- **packages/project-utils:** ensure packages with id matching `*.ignore` are excluded from analysis ([4d5ddb6][501])
- **packages/rejoinder:** add stub version information ([0bfdf77][502])
- **packages/rejoinder:** ensure outputs are yellow iff they are "warn" outputs ([da60db8][503])
- **packages/test-utils:** split off test utilities into new package ([576dd64][504])
- **src:** "test" prevents propagation of DEBUG env var by default unless `--debug` given ([ffcad30][505])
- **src:** ensure "build changelog" prints out full package name and version ([4059ed7][506])
- **src:** ensure current package is always printed last for "list-tasks" ([5ea7f8a][507])
- **src:** expand "build" pre-check to include all of a package's TS files ([d4d3756][508])
- **src:** explicitly allow arbitrary options passed to executables in "lint" and "test" ([d915727][509])
- **src:** implement "build" support for partial builds via `--partial` ([5d61e87][510])

### 🪄 Fixes

- **assets/config:** update conventional configuration to support both monorepos and polyrepos ([1d0dee8][511])
- **babel:** fix bug in import target output path resolution algorithm ([4e85380][512])
- **packages/project-utils:** ensure `isRootPackage` differentiates from non-root packages ([2b46883][513])
- **packages/project-utils:** ensure specifier-ok checks are also performed on type-only imports ([95b0f68][514])
- **src:** ambient types are only allowed at package root types/ dir ([81ba7bc][515])
- **src:** do not run prettier on files not targeted by `--files` ([128e83a][516])
- **src:** ensure "format" functions properly in a monorepo context given `--scope` ([c4016a8][517])
- **src:** ensure "lint" functions properly in monorepo context given `--scope` ([0f4c7b1][518])
- **src:** ensure "test" functions properly in a monorepo context given `--scope` ([1894d80][519])
- **src:** ensure BF context receives the correct version number from own package.json ([351ee50][520])
- **src:** ensure prettier always gets a pass at markdown and json files in "format" command ([74ab5d9][521])
- **src:** ensure tstyche is only run when type-only tests exist ([18dbad0][522])
- **src:** ensure version extraction regexp behaves robustly ([8e82ac1][523])
- **src:** improve "build distributables" options configuration ([f323a6a][524])
- **src:** improve command output aesthetics ([4a6e254][525])
- **src:** improved `--version` support ([4e3cdc0][526])
- **src:** include full package name and version in release commit subject ([5e00587][527])
- **src:** only match xpipeline commands that are proper suffixes ([9b8b41a][528])
- **src:** use proper gitLogOptions.paths property (fixes typo) ([e22403c][529])

### ⚙️ Build System

- **eslint:** ensure .transpiled directory is ignored ([c34a549][530])
- **gitignore:** upgrade to more robust .gitignore ([43da882][531])
- **husky:** add husky pre-push protective hook ([33af2bc][532])
- **jest:** ensure .transpiled directory is ignored ([c1ac811][533])
- **jest:** ensure .transpiled directory is ignored by jest-haste-map etc ([901d853][534])
- **jest:** ignore type-only tests ([1fb8568][535])
- **package:** correct typo in bug.url ([3373208][536])
- **packages/run:** narrow scope of the list-tasks npm script ([8cbc4e4][537])
- **packages/run:** take advantage of xscript scope-related features ([b1249ed][538])
- **packages/test-utils:** add simple-git dependency ([7d21ee2][539])
- **package:** use `--no-parallel` in "release" script ([5eb9def][540])
- **prettierignore:** ignore license files ([b928e8a][541])
- **remarkrc:** never automatically capitalize our packages' names in markdown headings ([45bcd8c][542])
- **src:** patch both `Proxy` and `spawn` as a side effect ([f50abaf][543])
- Use consistent exclusions across TS configurations ([98a1dd7][544])

## @-xun/symbiote[@1.24.0][545] (2024-11-01)

### ✨ Features

- **packages/debug:** differentiate root from nested namespaces ([467e884][546])
- **packages/project-utils:** re-implement caching subsystem ([472af2c][547])

### 🪄 Fixes

- **packages/project-utils:** remove overengineered sync/async plumbing functions ([8ab4eec][548])
- **src:** ensure build pre-checks run before the ./dist dir is cleared ([69f2dc0][549])
- **src:** ignore internal-resolution-errors with attw since we do our own internal checks ([8dc4a96][550])
- **src:** prevent clean command from obliterating cwd ([e3fa185][551])
- **src:** use upward root mode when searching for babel configs ([89b57c4][552])

### ⚡️ Optimizations

- **eslint:** use \_\_dirname assumption instead of analyzing the entire project ([b8b82d9][553])

### ⚙️ Build System

- **babel:** replace module-resolver and tsconfig-replace-paths with transform-rewrite-imports ([69ebf4a][554])
- **package:** narrow scope of the lint npm script ([556f17e][555])
- **package:** use no-hoist to block execa hoisting ([74d58d6][556])

## @-xun/symbiote[@1.23.0][557] (2024-10-27)

### ✨ Features

- **babel:** replace tsconfig-replace-paths with babel-plugin-transform-rewrite-import ([1bdceca][558])
- **packages/project-utils:** implement support for pseudodecorators ([6ff2bd3][559])
- **src:** perform validity and extraneity checks on build output for "build distributables" ([a1d3657][560])

### 🪄 Fixes

- **eslint:** use latest `analyzeProjectStructure()` function ([fa2a97f][561])
- **packages/project-utils:** ensure ".git" is already returned regardless of .gitignore ([6e3f599][562])
- **packages/project-utils:** ensure analysis cache uses entire call signature when memoizing ([ca021f8][563])
- **packages/project-utils:** repair caching mechanism for analyze-project-structure ([b9218ee][564])

### ⚙️ Build System

- Add pseudodecorators where appropriate ([dc47cfb][565])
- **package:** fix dependency issues identified by xscripts when analyzing its own project structure ([ebb4fb5][566])
- **package:** remove extraneous dependencies ([ccc82b3][567])
- **packages/project-utils:** fix import missing extension ([6556908][568])

## @-xun/symbiote[@1.22.0][569] (2024-10-24)

### ✨ Features

- **src:** make `--run-to-completion` default to `true` for "lint" command ([8bdf28b][570])

### 🪄 Fixes

- **eslint:** disable no-unsupported-features checks, generalize `overwriteFileProperty`, fix eslint-plugin-n bug ([0c3f85c][571])
- **src:** ensure CannotRunOutsideRoot error only triggers when outside root ([531d3ea][572])
- **src:** properly add the development tag when using self-referential xscripts ([a7a66d9][573])

### ⚙️ Build System

- **eslint:** modernize eslint config ([e37006e][574])
- **package:** expand engines.node to all maintained node versions ([349cf20][575])
- **package:** remove more rarely used scripts ([d8b7442][576])
- **packages/project-utils:** add post-npm-install script ([b16b74f][577])
- **package:** use consistent script names ([c7fe410][578])
- **src:** fix import missing extension ([2c40974][579])
- **src:** fix import missing extension ([f5fb1bc][580])

## @-xun/symbiote[@1.21.0][581] (2024-10-18)

### ✨ Features

- **@-xun/babel-plugin-metadata-accumulator:** create accumulator babel plugin ([bf9514f][582])
- **src:** upgrade commands with scope (monorepo) support ([7ad96c5][583])

### 🪄 Fixes

- **src:** improve conventional-commits config monorepo support ([d54cfa0][584])
- **tsc:** ensure monorepo package distributables are properly ignored ([646aa3c][585])

### ⚙️ Build System

- **babel:** update with alias test and generally simplify configuration ([a08c9f1][586])
- **commitlint:** update commitlint configuration from cjs (js) to esm (mjs) ([cd82265][587])
- **eslint.config:** activate several new rules ([94a2253][588])
- **eslint:** update with alias test and latest rule updates ([db0c6d7][589])
- **eslint:** upgrade eslint-plugin-import usage to take advantage of v9 support ([7dcbf56][590])
- **jest:** update jest configuration from cjs (js) to esm (mjs) ([e334962][591])
- **lint-staged:** update lint-staged configuration from cjs (js) to esm (mjs) ([8833e0a][592])
- **ncurc:** pin non-broken remark-lint-no-inline-padding ([5070ab4][593])
- **package:** add dependency aliases for find-up\@5 and escape-string-regexp\@4 ([1eff5cb][594])
- **prettier:** update prettier configuration from cjs (js) to esm (mjs) ([0eb7fd3][595])
- Prevent automatic updates of super-pinned packages ([8d69310][596])
- **remarkrc:** add lint-no-undef NODE\_ENV support ([e169f47][597])
- Split tsconfig into project vs package configurations ([e7b8579][598])
- **turbo:** add stub turbo configuration ([2036da0][599])
- Update .gitignore and .prettierignore with improved documentation and latest best practices ([a35f4c0][600])
- **vscode:** update full project lint vscode task example ([3f1a5a9][601])

### @-xun/symbiote[@1.20.8][602] (2024-08-23)

#### 🪄 Fixes

- **src:** ensure release notes have headers at level 2 ([ce701f3][603])

### @-xun/symbiote[@1.20.7][604] (2024-08-23)

#### 🪄 Fixes

- **src:** ensure only the start of the release notes are trimmed ([3c48ae1][605])

### @-xun/symbiote[@1.20.6][606] (2024-08-23)

#### 🪄 Fixes

- **src/assets:** remove first line from semantic-release plugin generated release notes ([76992d9][607])

### @-xun/symbiote[@1.20.5][608] (2024-08-22)

#### 🪄 Fixes

- Ensure xscripts supports limited invocations outside of project root ([0864f92][609])
- **src/commands/lint:** ensure no erroneous whitespaces are inserted between outputs ([ff3853f][610])

### @-xun/symbiote[@1.20.4][611] (2024-08-21)

#### 🪄 Fixes

- Remove deep import ([0bf89ca][612])

### @-xun/symbiote[@1.20.3][613] (2024-08-21)

#### 🪄 Fixes

- **src:** move deep import with respect to new deduped location ([dd265b4][614])
- **src:** remove utf8 symbols from changelog generator output ([cf21d7d][615])

### @-xun/symbiote[@1.20.2][616] (2024-08-21)

#### 🪄 Fixes

- **src:** ensure calls to remark include an explicit --rc-path ([bc2a56b][617])
- **src:** ensure robust handling of formatter errors when running "format" ([5211547][618])
- **src:** make "build changelog" `CustomCliArguments` type more accurate ([8735f61][619])
- **src:** work around glob-gitignore bug in "format" ([a86884f][620])

#### ⚙️ Build System

- **eslint.config:** update @typescript-eslint/require-await linting config ([b23b12b][621])
- **release.config:** subsume semantic-release plugin functionality into custom release conf plugin ([8b54237][622])
- **release:** actually fix incorrect semantic-release plugin order during publish flow ([5719681][623])
- **release:** ensure temporary markdown files end with ".md" ([f2cb8fd][624])
- **release:** reactivate core release pipeline plugins ([3008cde][625])
- **src/assets:** move custom semantic-release plugin into config asset ([25e7a3b][626])
- **src:** ensure custom semantic-release plugin does not allow non-md files ([904c9ac][627])

### @-xun/symbiote[@1.20.1][628] (2024-08-20)

#### ⚙️ Build System

- **release:** fix incorrect use of lodash template evaluate delimiter ([35876a1][630])

## @-xun/symbiote[@1.20.0][631] (2024-08-20)

### ✨ Features

- Ensure `--changelog-file` is added to "build changelog" ([d84b35f][632])
- **release:** support modern changelog generation flow ([6ef0123][633])
- **src:** add `--import-section-file` and `--changelog-file` flags to "build changelog" ([8cf99a9][634])

### 🪄 Fixes

- **src:** ensure "format" ignores .remarkignore; ensure "lint" respects .remarkignore ([3dd5d78][635])
- **src:** ensure changelog prints patches (including imports) in proper order ([5c3ed73][636])
- **src:** properly section off patch notes using dividers ([c912b09][637])

### ⚙️ Build System

- **package:** update repository url to conform with GHA provenance guidelines ([9cb2d72][638])
- **src/assets:** disable remark-validate-links for template files ([ce03500][639])
- **tsconfig:** set declaration=false by default ([22f2f41][640])

### @-xun/symbiote[@1.19.1][641] (2024-07-29)

#### 🪄 Fixes

- **package:** fix asset config import configuration ([d201164][642])

## @-xun/symbiote[@1.19.0][643] (2024-07-29)

### ✨ Features

- **@black-flag/extensions:** add support for `vacuousImplications` option configuration key ([0c199f6][644])
- **src:** implement `--output-sort` for "build changelog"; integrate conventional core and drop cli ([587a354][645])

### ⚙️ Build System

- **babel:** disable explicit-exports-references for now ([92bb25f][646])
- **commitlint.config:** expand to include several useful rules ([909949d][647])
- **release:** take advantage of new `--output-sort` functionality ([59dd752][648])

## @-xun/symbiote[@1.18.0][649] (2024-07-27)

### ✨ Features

- **src:** "build changelog" now accepts `--only-patch-changelog` and `--output-unreleased` ([6c7ae27][650])
- **src:** "lint" now accepts `--run-to-completion` and `--ignore-warnings` ([e833523][651])

### 🪄 Fixes

- **package:** downgrade @arethetypeswrong/cli to ^0.15.0 ([0383586][652])
- **src:** ensure node options are concatenated properly ([3a3489c][653])

### ⚡️ Optimizations

- **src:** take advantage of [tsc@5.6-beta][654] `--noCheck` argument in "build distributables" ([4e75096][655])

### ⚙️ Build System

- **eslint.config:** update @typescript-eslint/unbound-method linting config ([f6515ea][656])
- **release:** take advantage of new `--only-patch-changelog` flag ([01375f7][657])
- **tsconfig:** exclude test/ dir from "lint" command limited scope, include dotfiles under lib ([df6116b][658])
- Update source aliases to latest ([8d71521][659])
- **vscode:** take advantage of new `--run-to-completion` flag ([d9b4b80][660])
- **vscode:** update example with latest best practices ([64b7309][661])

## @-xun/symbiote[@1.17.0][662] (2024-07-23)

### ✨ Features

- **@-xun/cli-utils:** add `interpolateTemplate` ([63354c7][663])
- **@-xun/cli-utils:** add `softAssert` and `hardAssert` ([369d969][664])

### ⚙️ Build System

- **eslint.config:** update to eslint flat config (eslint.config.mjs) ([609fca8][665])
- **husky:** update husky scripts ([e55a88e][666])
- **package:** add semver; force install alpha versions of typescript-eslint et al ([b56fd66][667])
- **package:** update exports, dependencies, and scripts ([323579d][668])
- **tsconfig:** ensure files from root dot folders are picked up by linters ([8609db7][669])
- Update to eslint\@9; begin transition to eslint.config.js flat ([52763c5][670])

### @-xun/symbiote[@1.16.1][671] (2024-07-14)

#### 🪄 Fixes

- **src:** place --copy-files argument in proper order in babel build sub-command ([8f1d25d][672])

## @-xun/symbiote[@1.16.0][673] (2024-07-14)

### ✨ Features

- **@-xun/run:** make intermediate result available ([1153f42][674])
- **@-xun/run:** update to work with latest execa ([12ee54a][675])
- **@black-flag/extensions:** allow check property to accept an array of check functions ([0543cff][676])
- **src:** implement "lint" command ([346b4ac][677])

### 🪄 Fixes

- **package:** include missing listr2 dependency ([f42f4ab][678])
- **src:** ensure "build distributables" copies non-compiled files into ./dist ([e596e5b][679])
- **src:** ensure "lint" command linter subprocesses don't write to stdout or hang after error ([d96ae1d][680])
- **src:** ensure proper checks with various arguments ([c9e254a][681])

### ⚙️ Build System

- **babel:** allow babel to parse syntax attributes and ignore dynamic import transforms ([060ef01][682])
- **husky:** update lint script to use latest name ([ea6aaff][683])
- **package:** add final npm scripts ([eb5631b][684])
- **package:** replace typescript babel preset dependency with syntax plugin ([b72401a][685])
- **package:** update lint scripts to use xscripts ([7c1e7f1][686])
- **tsconfig:** remove packages glob from includes ([d3301ca][687])

## @-xun/symbiote[@1.15.0][688] (2024-07-07)

### ✨ Features

- **src:** implement "test" script/command ([b665723][690])

### ⚙️ Build System

- **release:** add --renumber-references to CHANGELOG format sub-step in release flow ([49a3453][691])

## @-xun/symbiote[@1.14.0][692] (2024-07-07)

### ✨ Features

- **src:** add --clean-output-dir option to "build distributables" command ([a507530][693])
- **src:** add struts for projector-js replacement "project" commands ([489e75a][694])
- **src:** merge "build distributables" and "build transpiled" commands ([1b6c72a][695])

### 🪄 Fixes

- **@black-flag/extensions:** support deep option aliasing & name expansion; fix several other issues ([82c2b0f][696])
- **src:** add .tsx to babel --extensions arg ([68c5582][697])
- **src:** ensure "build distributables" --generate-intermediates-for includes tests ([2ed4344][698])
- **src:** remove bad options references from "format" command ([cafeb73][699])

### ⚙️ Build System

- **maintaining:** note that resetting the working tree before publishing is optional ([f08250c][700])

## @-xun/symbiote[@1.13.0][701] (2024-07-02)

### ✨ Features

- **src:** implement "build documentation" script ([05e56e7][702])
- **src:** implement "build externals" script ([1336341][703])

### ⚙️ Build System

- Ensure local ecosystem ignores only relevant files ([e4a1e0b][704])
- **tsconfig:** update includes ([c721fed][705])

## @-xun/symbiote[@1.12.0][706] (2024-07-01)

### ✨ Features

- **@black-flag/extensions:** add `$artificiallyInvoked` argv support ([b64412c][707])
- **@black-flag/extensions:** add `getInvocableExtendedHandler` export ([feabe67][708])
- **rejoinder:** add `getDisabledTags` function export ([534f398][709])
- **src:** implement "build changelog" script ([8d4bb6d][710])
- Transmute "format" command's --skip-docs into the more versatile --skip-ignored ([7364616][711])

### 🪄 Fixes

- **@-xun/cli-utils:** do not lowercase 1st char in error message if 2nd char isn't already lowercase ([2f11281][712])
- **@-xun/cli-utils:** take advantage of `$artificiallyInvoked` to preserve output state ([9348ebb][713])
- **@black-flag/extensions:** implement better error handling on import failure ([626ee5a][714])
- Ensure correct use of debug logger namespace in various places ([65e4330][715])

### ⚙️ Build System

- **babel:** generalize import rewrites ([ee5cf10][716])
- **changelog:** add new CHANGELOG.md typo patches ([b9b106a][717])
- Hide all warnings from nodejs ([c1a4b9c][718])
- **package:** update scripts (and release.config.js) to use "build changelog" command ([5b11c68][719])
- **remarkrc:** always translate normal links into reference links ([99c7b33][720])

### 🔥 Reverted

- _"build(prettierignore): no longer ignore CHANGELOG.md when formatting"_ ([ddd9192][721])

## @-xun/symbiote[@1.11.0][722] (2024-06-30)

### ✨ Features

- **@-xun/cli-utils:** add `ErrorMessage.RequiresMinArgs` ([618ce1a][723])
- **src:** add all-contributors regeneration to "format" command ([d74f099][724])

### 🪄 Fixes

- **src:** ensure --files never hands prettier paths it can't handle when running "format" command ([0f4dd16][725])
- **src:** ensure "format" command all-contributors regeneration only targets root README.md ([2cd56d1][726])
- **src:** ensure all glob relevant glob calls never return directories ([9764967][727])
- **src:** ensure, when --files is given, at least one option given for "format" command ([fd86f3f][728])
- **src:** fix fix fd86f3f ([e295a02][729])

### ⚙️ Build System

- **lint-staged.config:** update to use xscripts ([d290ba5][730])
- Reorganize deps/devdeps and re-enable commit-spell ([4ea8aa4][731])

### @-xun/symbiote[@1.10.1][732] (2024-06-29)

#### 🪄 Fixes

- **src:** ensure --files is respected by prettier in "format" command ([483f036][733])

## @-xun/symbiote[@1.10.0][734] (2024-06-29)

### ✨ Features

- **@-xun/cli-utils:** add `AsStrictExecutionContext` intellisense type guard ([813b758][735])
- **@black-flag/extensions:** add and use `BfeStrictArguments` intellisense type guard ([42af69e][736])
- **lib:** move `AsStrictExecutionContext` into @black-flag/extensions ([ae46adf][737])
- **src:** add --prepend-shebang, Next.js support to "build distributables" command ([6575d49][738])
- **src:** improve capabilities of "format" command ([7d33dfe][739])

### 🪄 Fixes

- **src:** actually implement --skip-docs functionality in "format" command ([d535b78][740])
- **src:** restrict root/sub-root check to certain commands ([1b65f46][741])

## @-xun/symbiote[@1.9.0][742] (2024-06-28)

### ✨ Features

- **src:** add `--full` argument to "list-tasks" command ([f47742b][743])
- **src:** prevent cli from running if not in root or sub-root ([4f280dc][744])

### 🪄 Fixes

- **src:** fix lib output and improve other aspects of the "build distributables" command ([159d771][745])

### ⚙️ Build System

- **babel:** update core-js usage to 3.37 ([506bf2d][746])
- **tsconfig:** ensure unnecessary types are excluded from distributables ([f7e65c3][747])

## @-xun/symbiote[@1.8.0][748] (2024-06-27)

### ✨ Features

- **src:** commit initial version of "build" command ([c7b7623][749])

### ⚙️ Build System

- **eslintrc:** do not ignore src/build ([847cc63][750])
- **gitignore:** do not ignore src files anymore ([fd210c5][751])

## @-xun/symbiote[@1.7.0][752] (2024-06-26)

### ✨ Features

- **src:** implement "format" script ([7824c25][753])

### 🪄 Fixes

- **remarkrc:** improve output of "format" command" ([b4c296e][754])

### ⚙️ Build System

- **package:** replace format script with "format" command ([005e378][755])
- **package:** use --hush over --quiet for "format" command ([9e4ae59][756])

## @-xun/symbiote[@1.6.0][757] (2024-06-24)

### ✨ Features

- **src:** implement "deploy" script ([62e673b][758])

## @-xun/symbiote[@1.5.0][759] (2024-06-23)

### ✨ Features

- **lib:** add `scriptBasename` ([f15a14d][760])
- **lib:** commit @black-flag/extensions\@1.0.0 and @-xun/cli-utils\@1.0.0 ([c775d6e][761])

### 🪄 Fixes

- **@-xun/cli-utils:** extend error message deduplication to nested cause strings ([8181e74][762])
- **@black-flag/extensions:** add missing symbols ([17d53c3][763])
- **@black-flag/extensions:** allow subOptionOf sub-object to be given directly ([537df70][764])
- **clean.ts:** add .vercel to list of ignored directories ([fd903a4][765])
- **lib:** move `ansiRedColorCodes` into rejoinder ([4eabfb5][766])
- **src:** use loose implications with deploy command ([8e11d66][767])

### ⚙️ Build System

- **babel:** manually fix index import rewrites ([2f5e8e9][768])
- **package:** disable tty in debug when running tests ([b57a6be][769])
- **package:** fix bad overwrite of ignore patterns ([8d03799][770])

### @-xun/symbiote[@1.4.1][771] (2024-06-02)

#### 🪄 Fixes

- **src:** pass arbitrary args to downstream executable ([4b94a07][772])

#### ⚙️ Build System

- **package:** update "start" script to ensure arbitrary args are not erroneously parsed ([a8ddaa5][773])

## @-xun/symbiote[@1.4.0][774] (2024-06-01)

### ✨ Features

- **src:** implement "dev" script ([4eeba00][775])

### ⚙️ Build System

- **package:** use real path to devdep version of xscripts ([99d5786][776])

## @-xun/symbiote[@1.3.0][777] (2024-06-01)

### ✨ Features

- **src:** implement "start" script ([cf66045][778])

### 🪄 Fixes

- **lib:** add type safe guards for output properties when using runWithInheritedIo ([b26a175][779])
- **package:** add workaround for npx being unable to deal with this type of recursion ([b999593][780])
- **src:** do not inherit IO when executing "clean" script ([380c055][781])
- **src:** execute husky post-checkout hook if available ([f0b3b8c][782])

## @-xun/symbiote[@1.2.0][783] (2024-05-31)

### ✨ Features

- Implement "prepare" script ([6426d70][784])

## @-xun/symbiote[@1.1.0][785] (2024-05-31)

### ✨ Features

- Implement "list-tasks" script ([ac5a9ba][786])

## @-xun/symbiote[@1.0.0][787] (2024-05-31)

### ✨ Features

- **src:** implement "clean" script ([89d81a3][788])

### ⚙️ Build System

- **package:** update build scripts ([589fcb0][789])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.2.0...@-xun/symbiote@3.3.0
[4]: https://github.com/Xunnamius/symbiote/commit/ea85093f7a832de2216ddb0f5be93018c7049a25
[5]: https://github.com/Xunnamius/symbiote/commit/4f71380506e8b2505a907d817794b6730bca4f95
[6]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.7...@-xun/symbiote@3.3.8
[7]: https://github.com/Xunnamius/symbiote/commit/892f2824ac6ba0b778715e945397d1bc643ed619
[8]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.6...@-xun/symbiote@3.3.7
[9]: https://github.com/Xunnamius/symbiote/commit/f3cf0e3ce3f0e4ffe1e1cc812980be768cec1507
[10]: https://github.com/Xunnamius/symbiote/commit/ca139ff2ae9b8ddb0fed094b91fb79deccd2127c
[11]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.5...@-xun/symbiote@3.3.6
[12]: https://github.com/Xunnamius/symbiote/commit/f51a9f7d4381b61ba5d383ada341e3a90a4d6578
[13]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.4...@-xun/symbiote@3.3.5
[14]: https://github.com/Xunnamius/symbiote/commit/03c423f753693df61565a1f49d80cc0f6cc503f1
[15]: https://github.com/Xunnamius/symbiote/commit/18ac9a6080a35e04264d35b043a156ff62601e75
[16]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.3...@-xun/symbiote@3.3.4
[17]: https://github.com/Xunnamius/symbiote/commit/8ae11269c8e79f283115f915845e5d26a193d1eb
[18]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.2...@-xun/symbiote@3.3.3
[19]: https://github.com/Xunnamius/symbiote/commit/3911bb5748d7ecd905ce3bbd9106aa0ea0787160
[20]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.1...@-xun/symbiote@3.3.2
[21]: https://github.com/Xunnamius/symbiote/commit/e3c8f9ab2680e6eaa30465c77954050484c7c41e
[22]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.0...@-xun/symbiote@3.3.1
[23]: https://github.com/Xunnamius/symbiote/commit/e62a8e2866e7be5d865aa716a07ab29afdaf9729
[24]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.1.4...@-xun/symbiote@3.2.0
[25]: https://github.com/Xunnamius/symbiote/commit/a16e9cda6dfb648c58096a909777625015d4719e
[26]: https://github.com/Xunnamius/symbiote/commit/ed344de68f6fe6479edcb6753364d9a30d3de38d
[27]: https://github.com/Xunnamius/symbiote/commit/ccf56bb82eaf34a25cfbe31d499e18c76ecba307
[28]: https://github.com/Xunnamius/symbiote/commit/18f0a89d714aff30388945a2633780ab48db4e1b
[29]: https://github.com/Xunnamius/symbiote/commit/e98f8600a754d8c119e3c94c5c6a420896180466
[30]: https://github.com/Xunnamius/symbiote/commit/044e24c167836d4eba57a69b957267cf07f75014
[31]: https://github.com/Xunnamius/symbiote/commit/6219cb06d8c08338e9134daf68b9c83659cd1b39
[32]: https://github.com/Xunnamius/symbiote/commit/89aa4f857b25c3c29175a8e759155aa657780b8f
[33]: https://github.com/Xunnamius/symbiote/commit/fd59e6d67ebcabff87cc37c44fafde330c108025
[34]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.0.0...@-xun/symbiote@3.1.0
[35]: https://github.com/Xunnamius/symbiote/commit/50f4bc77acf0919219014d322600a90bc4bf3f81
[36]: https://github.com/Xunnamius/symbiote/commit/935e6fc1ed832d011be392bc1103075b6cf90810
[37]: https://github.com/Xunnamius/symbiote/commit/e1fde967f44ddeb5a435a01004714e511f595135
[38]: https://github.com/Xunnamius/symbiote/commit/8c752be7c235c87a645ddfc2c34c533e77ca4dde
[39]: https://github.com/Xunnamius/symbiote/commit/078831b119c73f9b886cce74bfa912a2e05f5143
[40]: https://github.com/Xunnamius/symbiote/commit/03fdcb83a4460b0ba97a380636e423fb966d5ab0
[41]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.1.3...@-xun/symbiote@3.1.4
[42]: https://github.com/Xunnamius/symbiote/commit/b809268e30856c31f49ff4f21b64fdeab8d49e28
[43]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.1.2...@-xun/symbiote@3.1.3
[44]: https://github.com/Xunnamius/symbiote/commit/520897b087b8e240c6e7c9236ad875776c29a907
[45]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.1.1...@-xun/symbiote@3.1.2
[46]: https://github.com/Xunnamius/symbiote/commit/2e19fbb73f32694e0ab61a9670538fab89e2de03
[47]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.1.0...@-xun/symbiote@3.1.1
[48]: https://github.com/Xunnamius/symbiote/commit/a1a1659a6aee8463244f5d57f0317787662deaf7
[49]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.25.1...@-xun/symbiote@3.0.0
[50]: https://github.com/Xunnamius/symbiote/commit/597b69841516ce8d58f4bc344eed6d2bd7de1296
[51]: https://github.com/Xunnamius/symbiote/commit/6d14d7053399a1a521c32860fabaffbd14fa256c
[52]: https://github.com/Xunnamius/symbiote/commit/cb5b704a67f131c89cbac69c160f4060590069d7
[53]: https://github.com/Xunnamius/symbiote/commit/e7937607fef8cfa8d9d986386f7a3b85cb779fa0
[54]: https://github.com/Xunnamius/symbiote/commit/0b15d1933847a57890416c669f772ef032ec2314
[55]: https://github.com/Xunnamius/symbiote/commit/e49ef2f4334fa8604b297b72f295db9bf4f6e1f2
[56]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.24.1...@-xun/symbiote@2.25.0
[57]: https://github.com/Xunnamius/symbiote/commit/726d79e4b4249d13e12a53938af9a921099a47e6
[58]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.25.0...@-xun/symbiote@2.25.1
[59]: https://github.com/Xunnamius/symbiote/commit/16e65ca9568c2c290d9cbc170fcee40ca3a63520
[60]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.11...@-xun/symbiote@2.24.0
[61]: https://github.com/Xunnamius/symbiote/commit/7342275556d9ac7223c1f0d628df0bab6558607f
[62]: https://github.com/Xunnamius/symbiote/commit/842e15e442ec96e158c5381a69a42cd71142afdf
[63]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.24.0...@-xun/symbiote@2.24.1
[64]: https://github.com/Xunnamius/symbiote/commit/261741e26a03ae661b506c3872cb86af79a07f11
[65]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.22.0...@-xun/symbiote@2.23.0
[66]: https://github.com/Xunnamius/symbiote/commit/a3bd02221a9f97cb7c1fda8d15dea4d1b9f947c1
[67]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.10...@-xun/symbiote@2.23.11
[68]: https://github.com/Xunnamius/symbiote/commit/564671906cc7bf07e51576f5b8c41e05f1442dfa
[69]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.9...@-xun/symbiote@2.23.10
[70]: https://github.com/Xunnamius/symbiote/commit/03742980a31ac4063e5d5bb3d2c27f670680c06e
[71]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.8...@-xun/symbiote@2.23.9
[72]: https://github.com/Xunnamius/symbiote/commit/f616a8e088b4dac2c13a616b5f806b90ea18c95a
[73]: https://github.com/Xunnamius/symbiote/commit/88a83ba125518bb1700ac6e4fb9d396cd0782fa7
[74]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.7...@-xun/symbiote@2.23.8
[75]: https://github.com/Xunnamius/symbiote/commit/80c010ab1a9f54848366935aa2b2e48c70535a06
[76]: https://github.com/Xunnamius/symbiote/commit/0240ff85261f41befe2983f7e894edff74495bad
[77]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.6...@-xun/symbiote@2.23.7
[78]: https://github.com/Xunnamius/symbiote/commit/c783620e51ba6874b1775818a9426a89f824bc3e
[79]: https://github.com/Xunnamius/symbiote/commit/d987d66d5edb5279e21713b49b65e9f6c9223763
[80]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.5...@-xun/symbiote@2.23.6
[81]: https://github.com/Xunnamius/symbiote/commit/cabd5a906f3f47511362922719ede55d6314d112
[82]: https://github.com/Xunnamius/symbiote/commit/3d179662eb95d4846d6a633df915db21d917e993
[83]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.4...@-xun/symbiote@2.23.5
[84]: https://github.com/Xunnamius/symbiote/commit/dfa62f95fc5c67fa5de0d4cc07a47176bbd0328a
[85]: https://github.com/Xunnamius/symbiote/commit/70bdc6645a61244c95cd233b44046f08295d8644
[86]: https://github.com/Xunnamius/symbiote/commit/41c1127a6a3a8d0fbafc6b70522109ab9d859f6b
[87]: https://github.com/Xunnamius/symbiote/commit/c11a37f7fa5f9c346a2b363b060f74b0513b5ce8
[88]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.3...@-xun/symbiote@2.23.4
[89]: https://github.com/Xunnamius/symbiote/commit/98342bea15f24cc59f6a44a195ba323f8fb7d027
[90]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.2...@-xun/symbiote@2.23.3
[91]: https://github.com/Xunnamius/symbiote/commit/b82f5db0ddf304d345bd71e41da6d798adaa5156
[92]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.1...@-xun/symbiote@2.23.2
[93]: https://github.com/Xunnamius/symbiote/commit/ee28fd25e233e1ad9b7043e0faa8defae74dbe7b
[94]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.0...@-xun/symbiote@2.23.1
[95]: https://github.com/Xunnamius/symbiote/commit/baed18cf2f0c1f93d21647c3399a412c1e0a2c32
[96]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.21.0...@-xun/symbiote@2.22.0
[97]: https://github.com/Xunnamius/symbiote/commit/385866d2602d36dd6b86c7f4511dc3df19a6ef56
[98]: https://github.com/Xunnamius/symbiote/commit/57bf52c765ff799f9ec6c2eb199af8a9d1987f73
[99]: https://github.com/Xunnamius/symbiote/commit/89f25ff8982f5f5830ed2225ed1b1c605a31e653
[100]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.20.0...@-xun/symbiote@2.21.0
[101]: https://github.com/Xunnamius/symbiote/commit/ffbc0c51f1cfe91c80e36db507e495b225d63e04
[102]: https://github.com/Xunnamius/symbiote/commit/8bc3c0a6128177f9331d10c3efa91cce564719fd
[103]: https://github.com/Xunnamius/symbiote/commit/a8c4f36f07fe7dd9b73eeddf7788330a6398fe29
[104]: https://github.com/Xunnamius/symbiote/commit/623cc86ecd7592c85a2b34de7bcaaaa9ce97dd34
[105]: https://github.com/Xunnamius/symbiote/commit/aa26f6b51de4343e84f64ee5add8e7ceb6ab6ef7
[106]: https://github.com/Xunnamius/symbiote/commit/374f05c223f3aa897619f65c2a85f7de3a36b539
[107]: https://github.com/Xunnamius/symbiote/commit/b234ba146c32603877b95c99e27d39912b7bf699
[108]: https://github.com/Xunnamius/symbiote/commit/dbfedff1a2a218ef7073e32c7b103749c9b803c7
[109]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.19.0...@-xun/symbiote@2.20.0
[110]: https://github.com/Xunnamius/symbiote/commit/d2b0fa2549884b65f39b215016ae5534c9b1f0c8
[111]: https://github.com/Xunnamius/symbiote/commit/42ea1cb493c2568b61dd5627189850ac0916a4c4
[112]: https://github.com/Xunnamius/symbiote/commit/8a17ad8050f76ee3583a914dfc087299e58a703c
[113]: https://github.com/Xunnamius/symbiote/commit/2fc5abfc9f46bf13824623b0233719efd5ea88ef
[114]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.6...@-xun/symbiote@2.19.0
[115]: https://github.com/Xunnamius/symbiote/commit/02bd1f421cdbc5289d4454e8f5e81889e5d564ee
[116]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.17.3...@-xun/symbiote@2.18.0
[117]: https://github.com/Xunnamius/symbiote/commit/2b9d38388b20c3565f093d04622ea89095e2ff4c
[118]: https://github.com/Xunnamius/symbiote/commit/3c4d07d7634e79df4ab9790e644d59d3c894635d
[119]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.5...@-xun/symbiote@2.18.6
[120]: https://github.com/Xunnamius/symbiote/commit/61b0c6fc809dc98c494682696c70a5ac00e28786
[121]: https://github.com/Xunnamius/symbiote/commit/feae4de7ab8e9452974cf2420ecea3da21dde063
[122]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.4...@-xun/symbiote@2.18.5
[123]: https://github.com/Xunnamius/symbiote/commit/a0fabf117a4e10cf68aa181dc5bfba0344eaceea
[124]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.3...@-xun/symbiote@2.18.4
[125]: https://github.com/Xunnamius/symbiote/commit/1dd3c8b807e5672bc1dceb0917ec1831e61c70f1
[126]: https://github.com/Xunnamius/symbiote/commit/03d0f5ec06412a1a9df5554ab91ab42206eb76e6
[127]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.2...@-xun/symbiote@2.18.3
[128]: https://github.com/Xunnamius/symbiote/commit/d10510b26b60a15206271bb6da7ebcd862e067c4
[129]: https://github.com/Xunnamius/symbiote/commit/9ad3cda4db8268fdb1de9f23a1717d01dd464e82
[130]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.1...@-xun/symbiote@2.18.2
[131]: https://github.com/Xunnamius/symbiote/commit/c906eda89d66141c6f3c16d7f7097163c518f8e6
[132]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.0...@-xun/symbiote@2.18.1
[133]: https://github.com/Xunnamius/symbiote/commit/2816aa5c7580c21865c6837f71b54d0f60e224da
[134]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.6...@-xun/symbiote@2.17.0
[135]: https://github.com/Xunnamius/symbiote/commit/3e1e6c66ec45c72b0f8624f5d6a1afeb41956184
[136]: https://github.com/Xunnamius/symbiote/commit/df3174dbc5a058c81aa6e1a1ee6a7baddb2b30dd
[137]: https://github.com/Xunnamius/symbiote/commit/eed08a0ef0d9de1c0351209a4c3db0044f0a5073
[138]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.17.2...@-xun/symbiote@2.17.3
[139]: https://github.com/Xunnamius/symbiote/commit/697c6383588b09414e1bf1053b7a6832ad1370fa
[140]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.17.1...@-xun/symbiote@2.17.2
[141]: https://github.com/Xunnamius/symbiote/commit/3c34513dbae872b9f5ae7b23b64005aee49146ae
[142]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.17.0...@-xun/symbiote@2.17.1
[143]: https://github.com/Xunnamius/symbiote/commit/d1d3838a4dd7d643522fbba72411a027a111bbb5
[144]: https://github.com/Xunnamius/symbiote/commit/22889a32470d7c120f63abf9966ce6bd6d425b88
[145]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.15.0...@-xun/symbiote@2.16.0
[146]: https://github.com/Xunnamius/symbiote/commit/5a6b8fdd6bad1753f065e8a0fabc20b629cd4120
[147]: https://github.com/Xunnamius/symbiote/commit/50e60dabffb77cb7d43d61c06b1fb47929babac6
[148]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.5...@-xun/symbiote@2.16.6
[149]: https://github.com/Xunnamius/symbiote/commit/49cbe95ead6ac74258b90313390b13807fc9a022
[150]: https://github.com/Xunnamius/symbiote/commit/f9678b8ce29ab9536f81bff641791dc244215489
[151]: https://github.com/Xunnamius/symbiote/commit/c39983c5cd3385ef507df0055ec5e2746f979760
[152]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.4...@-xun/symbiote@2.16.5
[153]: https://github.com/Xunnamius/symbiote/commit/8eac971e9d5e22fba1e6d49fa7fee2af04809fe6
[154]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.3...@-xun/symbiote@2.16.4
[155]: https://github.com/Xunnamius/symbiote/commit/29281df9337a36c0ddbf254c8452a1b8a68bf1a8
[156]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.2...@-xun/symbiote@2.16.3
[157]: https://github.com/Xunnamius/symbiote/commit/f7f4f11c068a86260d039b5e973f62c23a3c8079
[158]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.1...@-xun/symbiote@2.16.2
[159]: https://github.com/Xunnamius/symbiote/commit/450d03a1056a8788295047b24c95dce90c4543b9
[160]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.0...@-xun/symbiote@2.16.1
[161]: https://github.com/Xunnamius/symbiote/commit/52d5f446dd6a238bd34e9d3fed4977d7f7780129
[162]: https://github.com/Xunnamius/symbiote/commit/5f35a775180585acd90f1a8d39679a8b3a6e6120
[163]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.6...@-xun/symbiote@2.15.0
[164]: https://github.com/Xunnamius/symbiote/commit/229d304b107bf727e7cd99ecfd520a5a5937db4a
[165]: https://github.com/Xunnamius/symbiote/commit/13d185c2b630e90b5ddb442128fe9d12d2db1745
[166]: https://github.com/Xunnamius/symbiote/commit/52bef916cb8956593d07bccf9b52add74c261b2a
[167]: https://github.com/Xunnamius/symbiote/commit/d5fff49a5e5c57d4821aefb93aa54def9e60783a
[168]: https://github.com/Xunnamius/symbiote/commit/0608290264c183b9fefc4b96e1929613d16a2a91
[169]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.13.0...@-xun/symbiote@2.14.0
[170]: https://github.com/Xunnamius/symbiote/commit/1301043802316a100eb194b23f143865edb83afa
[171]: https://github.com/Xunnamius/symbiote/commit/f20ab4201e98527bcca1c5b43184335a4d1aa01c
[172]: https://github.com/Xunnamius/symbiote/commit/d8e32c7aed1b107911ac124be409768ccc3d2c65
[173]: https://github.com/Xunnamius/symbiote/commit/92236396172531b7b1a1324655a4604497a8bf31
[174]: https://github.com/Xunnamius/symbiote/commit/a7ed2d22a58066686595fa6d6f1f26dd36e1c741
[175]: https://github.com/Xunnamius/symbiote/commit/71f3d437c7c1aaf1f3c44de2273525480baebaf3
[176]: https://github.com/Xunnamius/symbiote/commit/7d7e83778cf5b32e492dbc1fbb8bb8139a26598b
[177]: https://github.com/Xunnamius/symbiote/commit/251f2c11147e4e8c7c1db784ddef4f2566f54d9c
[178]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.5...@-xun/symbiote@2.14.6
[179]: https://github.com/Xunnamius/symbiote/commit/9e8658ffbcdf987435b49e9ac84eb63362cff2bf
[180]: https://github.com/Xunnamius/symbiote/commit/a6db0c4c140d6bf98f5bbefc3e45a1151e97ffcf
[181]: https://github.com/Xunnamius/symbiote/commit/7621c5ffe4451038adf0dbc8b1a4b05ebd324a7c
[182]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.4...@-xun/symbiote@2.14.5
[183]: https://github.com/Xunnamius/symbiote/commit/da0014a3d8fa3571177d2af968ce57f9fecbb1ee
[184]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.3...@-xun/symbiote@2.14.4
[185]: https://github.com/Xunnamius/symbiote/commit/3b6f45301765b7eab22ef0b67ed645f03c5935c3
[186]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.2...@-xun/symbiote@2.14.3
[187]: https://github.com/Xunnamius/symbiote/commit/e27824c8e8d213f8aee2b1ce3c89e46e8c08ccae
[188]: https://github.com/Xunnamius/symbiote/commit/17742f7b0ffe21801bd83e0ee580066ce5aba183
[189]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.1...@-xun/symbiote@2.14.2
[190]: https://github.com/Xunnamius/symbiote/commit/99b7edbb8da48599bbf2df3d7283dc44dcebb760
[191]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.0...@-xun/symbiote@2.14.1
[192]: https://github.com/Xunnamius/symbiote/commit/ceda91b1fdcc9606cc683ce561871abf702c827a
[193]: https://github.com/Xunnamius/symbiote/commit/bc7742bdfce478b8bb14733c6256e44f6abb5a43
[194]: https://github.com/Xunnamius/symbiote/commit/9f4668c9843e1655489795a6a8f9157701b26932
[195]: https://github.com/Xunnamius/symbiote/commit/e90857acb3d261d6e9bd248ab0e38c7f0e05d449
[196]: https://github.com/Xunnamius/symbiote/commit/8bd33e66e357e62fc239d26a8164ffd6add96d24
[197]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.12.0...@-xun/symbiote@2.13.0
[198]: https://github.com/Xunnamius/symbiote/commit/e5a994bddb690d0bdd8000cea5226f797276846c
[199]: https://github.com/Xunnamius/symbiote/commit/aa28cc2319cc30041524ee3054eefc0af878e326
[200]: https://github.com/Xunnamius/symbiote/commit/87c9c3c21d49dcc6f7b795e3a1dc30e18c9341a5
[201]: https://github.com/Xunnamius/symbiote/commit/7f982952167d73373d4dffdf7657e7060cf032fe
[202]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.9...@-xun/symbiote@2.12.0
[203]: https://github.com/Xunnamius/symbiote/commit/e2584fc2ee21587543980d8f36482c6b3064a8de
[204]: https://github.com/Xunnamius/symbiote/commit/443eb1334d6028bb3c745d6a1af59314f1e98925
[205]: https://github.com/Xunnamius/symbiote/commit/a01453f3e43f1f38f171cad9230f96e69584da30
[206]: https://github.com/Xunnamius/symbiote/commit/721eb51c475b8b5600bb681aa1c57ee3973d87ec
[207]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.10.0...@-xun/symbiote@2.11.0
[208]: https://github.com/Xunnamius/symbiote/commit/e53be8bb276c3ab03251512811746295ebcce71d
[209]: https://github.com/Xunnamius/symbiote/commit/3058d4933a16c9b3de7104ae0e599e7d77b2e339
[210]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.8...@-xun/symbiote@2.11.9
[211]: https://github.com/Xunnamius/symbiote/commit/b951959a4a12ac484c8addc839f912c4e5767875
[212]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.7...@-xun/symbiote@2.11.8
[213]: https://github.com/Xunnamius/symbiote/commit/4196fe07541a75af2564b9958d306439f0e664b6
[214]: https://github.com/Xunnamius/symbiote/commit/e432f8a8dd0c76de7524baa20d622cf287bdc289
[215]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.6...@-xun/symbiote@2.11.7
[216]: https://github.com/Xunnamius/symbiote/commit/e734cc60de727300331625325b12bb8a19c93bef
[217]: https://github.com/Xunnamius/symbiote/commit/2b00195a42f9d7d1a8909bc48acff23d25d34557
[218]: https://github.com/Xunnamius/symbiote/commit/605e4ebf5a17a91c7b1c771cbfe4a217cacfff57
[219]: https://github.com/Xunnamius/symbiote/commit/31863db510c943499d349ca604a5824391f5261b
[220]: https://github.com/Xunnamius/symbiote/commit/e80d6e7a12cf1540568724ac2379ae6205268809
[221]: https://github.com/Xunnamius/symbiote/commit/614ba8b3d2b60d90186cbf83755dd786568a1ea7
[222]: https://github.com/Xunnamius/symbiote/commit/690ad178dfc81b1dc835586ab9cfef3999a0a47f
[223]: https://github.com/Xunnamius/symbiote/commit/5540b7dc1f00515b624396cb6229f5833bd912ff
[224]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.5...@-xun/symbiote@2.11.6
[225]: https://github.com/Xunnamius/symbiote/commit/2dfb17d9dea82a0725c47d3a236cced0f89ec2df
[226]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.4...@-xun/symbiote@2.11.5
[227]: https://github.com/Xunnamius/symbiote/commit/6f7a3022b9b1bbbdc6b044a195e88e0c241bf056
[228]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.3...@-xun/symbiote@2.11.4
[229]: https://github.com/Xunnamius/symbiote/commit/67bad2710e22c0646c53c8f1756c6dae869c8da4
[230]: https://github.com/Xunnamius/symbiote/commit/5ab38d0bb0a593488721fdd41b6c1fcc4618d081
[231]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.2...@-xun/symbiote@2.11.3
[232]: https://github.com/Xunnamius/symbiote/commit/15d3444639e5919af49429f7c60a387a77f22b82
[233]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.1...@-xun/symbiote@2.11.2
[234]: https://github.com/Xunnamius/symbiote/commit/16af6eb8c522458468176444e3f6b3699de64d72
[235]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.0...@-xun/symbiote@2.11.1
[236]: https://github.com/Xunnamius/symbiote/commit/1e0174c32cff28e404202c1cf920e474b94cfe7b
[237]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.9.0...@-xun/symbiote@2.10.0
[238]: https://github.com/Xunnamius/symbiote/commit/900c84b80913f7ae692320e081e53426405703b5
[239]: https://github.com/Xunnamius/symbiote/commit/2d7c4335de2455d1f751317edae49a754f9d254d
[240]: https://github.com/Xunnamius/symbiote/commit/76bd411502e2a42519463cb94808106b819f9e7b
[241]: https://github.com/Xunnamius/symbiote/commit/e264510ce9ff4a5efdae156d17b4f45deae13ee5
[242]: https://github.com/Xunnamius/symbiote/commit/ae7340fc0add85fe6fd58d8a754fecad0baf897c
[243]: https://github.com/Xunnamius/symbiote/commit/bccf09153de508954f27e763e79a4f013585523d
[244]: https://github.com/Xunnamius/symbiote/commit/77e22aeee55495616049bd79e99271de7ec41788
[245]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.8.2...@-xun/symbiote@2.9.0
[246]: https://github.com/Xunnamius/symbiote/commit/45a95680565f7437367edb2f8cc44a33e7541aa0
[247]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.7.1...@-xun/symbiote@2.8.0
[248]: https://github.com/Xunnamius/symbiote/commit/abc2eae40665c876d11cda8ecb8f3268af247f8c
[249]: https://github.com/Xunnamius/symbiote/commit/152bcdb594f0d452379b3dbaae56fb6765c476ee
[250]: https://github.com/Xunnamius/symbiote/commit/7fa548ff9a16b0397fd87c97dad6f6904861c4b0
[251]: https://github.com/Xunnamius/symbiote/commit/d34d5690d5677e45d31b42d2dc77bf19fe36b1ac
[252]: https://github.com/Xunnamius/symbiote/commit/1631e8da95ed843f732daf06a010f8966abc280a
[253]: https://github.com/Xunnamius/symbiote/commit/032aa3047de161ffa5a57c482156b7b11c604f61
[254]: https://github.com/Xunnamius/symbiote/commit/88b7f3835ae27fef939e0a5c61c1aaa9489f4114
[255]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.8.1...@-xun/symbiote@2.8.2
[256]: https://github.com/Xunnamius/symbiote/commit/ecdd713c4d242b92209fafa38beadafe2769795c
[257]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.8.0...@-xun/symbiote@2.8.1
[258]: https://github.com/Xunnamius/symbiote/commit/af354d0d777efcad54c5b9fef571837497afd230
[259]: https://github.com/Xunnamius/symbiote/commit/4a8948281f4836cc6fa64e7c42308f2f0237688c
[260]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.6.0...@-xun/symbiote@2.7.0
[261]: https://github.com/Xunnamius/symbiote/commit/28acb7961df65f3e39ec6b549117698f529b083c
[262]: https://github.com/Xunnamius/symbiote/commit/6f8cbe26308839edf019112bb191cb4e7c8a18a8
[263]: https://github.com/Xunnamius/symbiote/commit/edc6cca484e3748ffa96bf6f6831c7193e830976
[264]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.7.0...@-xun/symbiote@2.7.1
[265]: https://github.com/Xunnamius/symbiote/commit/138da875f3247f966687e95b91c7caf822df3c49
[266]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.6...@-xun/symbiote@2.6.0
[267]: https://github.com/Xunnamius/symbiote/commit/dddfc44396c55ebfc704f8d576edac2868fe28cc
[268]: https://github.com/Xunnamius/symbiote/commit/180f85f730f6f4763c685986886d65a870f73558
[269]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.3...@-xun/symbiote@2.5.0
[270]: https://github.com/Xunnamius/symbiote/commit/c133a92a38c285bf0a63dd9098f7c876155f3274
[271]: https://github.com/Xunnamius/symbiote/commit/6210727d4bc9b20c2064df6f0a987bc509ba512a
[272]: https://github.com/Xunnamius/symbiote/commit/625451cb712d5ebe6ef89478fed8669af6fa7236
[273]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.5...@-xun/symbiote@2.5.6
[274]: https://github.com/Xunnamius/symbiote/commit/2fd61c45d5639f5e6f8edadc3b7d4851011bc365
[275]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.4...@-xun/symbiote@2.5.5
[276]: https://github.com/Xunnamius/symbiote/commit/3831af5468c04bc48a0849a15233d1d644e5c45b
[277]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.3...@-xun/symbiote@2.5.4
[278]: https://github.com/Xunnamius/symbiote/commit/c23304e8bb55d71623ce6f30acd2195d704326aa
[279]: https://github.com/Xunnamius/symbiote/commit/141111918245fc7294e26b6ee944d4c6977e4f25
[280]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.2...@-xun/symbiote@2.5.3
[281]: https://github.com/Xunnamius/symbiote/commit/0dd4fb76481355ace84b39c7eeba5c230951a237
[282]: https://github.com/Xunnamius/symbiote/commit/607a378f58157a1b6b0a3a16880d3c2ba9e9d2e0
[283]: https://github.com/Xunnamius/symbiote/commit/19492a702140242c81a8ef20cd42d9908f722b28
[284]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.1...@-xun/symbiote@2.5.2
[285]: https://github.com/Xunnamius/symbiote/commit/4231719a4050b5b3956e3e19d12d8c469fd0bd37
[286]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.0...@-xun/symbiote@2.5.1
[287]: https://github.com/Xunnamius/symbiote/commit/b2dfed2c46fd5bceb7922642e9955bce5a5c424b
[288]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.4...@-xun/symbiote@2.4.0
[289]: https://github.com/Xunnamius/symbiote/commit/10f876ec625b234388ec5689f4d10663cabb4139
[290]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.2...@-xun/symbiote@2.4.3
[291]: https://github.com/Xunnamius/symbiote/commit/7b8ca545f93c3e9d22b693c6c58dbb29604867ff
[292]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.1...@-xun/symbiote@2.4.2
[293]: https://github.com/Xunnamius/symbiote/commit/0bafa3046d16effe919127463c68cff1fb657848
[294]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.0...@-xun/symbiote@2.4.1
[295]: https://github.com/Xunnamius/symbiote/commit/02e289a9c890d4a9fb9b9f17fa7e8731f4ab9d2b
[296]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.2.0...@-xun/symbiote@2.3.0
[297]: https://github.com/Xunnamius/symbiote/commit/23d01f3f75587880142e8b0ffdaa5873a38a84c7
[298]: https://github.com/Xunnamius/symbiote/commit/ee079c1feb775313923680cea371b862fa61c083
[299]: https://github.com/Xunnamius/symbiote/commit/c92b2cbb33a4cd6367604b98422a0248a129d9bd
[300]: https://github.com/Xunnamius/symbiote/commit/c565452e8b3b261e37e21b0b09dd52d395ccaa35
[301]: https://github.com/Xunnamius/symbiote/commit/6353b4f3774f70fa5299ed6666a14165faacb829
[302]: https://github.com/Xunnamius/symbiote/commit/64a41385dbcf83b268fe4d03f2ba1d60b705b634
[303]: https://github.com/Xunnamius/symbiote/commit/9304778395eb8c9f48164e2c1d71660a7da484f6
[304]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.3...@-xun/symbiote@2.3.4
[305]: https://github.com/Xunnamius/symbiote/commit/7f1f7a2772751006b2f87a140f0b00c116f4412c
[306]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.2...@-xun/symbiote@2.3.3
[307]: https://github.com/Xunnamius/symbiote/commit/1546ab8527a571efe54081d7614bd35a9d6e0c3c
[308]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.1...@-xun/symbiote@2.3.2
[309]: https://github.com/Xunnamius/symbiote/commit/ff6ce22d3a3433c07460af5758ce7920a1d9aa5a
[310]: https://github.com/Xunnamius/symbiote/commit/9a456c5795616fcf9f8cafa0c625eb12cf85cf50
[311]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.0...@-xun/symbiote@2.3.1
[312]: https://github.com/Xunnamius/symbiote/commit/1901cfe78a48fcd1dfae4e3760acf197e8812676
[313]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.1.0...@-xun/symbiote@2.2.0
[314]: https://github.com/Xunnamius/symbiote/commit/0c1b93abd02cb8ad4eec4362b917e5484000cae4
[315]: https://github.com/Xunnamius/symbiote/commit/ce6a12a98f74e554db875dfa2e53e0fb3a45510a
[316]: https://github.com/Xunnamius/symbiote/commit/14bf31ff01c26186bce6a35150f4e002e6f74475
[317]: https://github.com/Xunnamius/symbiote/commit/c263dc5aa35ce06d85077337af7b4ca35564504d
[318]: https://github.com/Xunnamius/symbiote/commit/f55664476107f5f2aaefbfe11df6c0e59e7bd7f6
[319]: https://github.com/Xunnamius/symbiote/commit/9581339cf055172c61e96900096f7e6f3be04ff2
[320]: https://github.com/Xunnamius/symbiote/commit/432a5faebe68d65bac4e627e9e022b4687917552
[321]: https://github.com/Xunnamius/symbiote/commit/f82fbf4583d23478cfc54d320d4075f42cec86e8
[322]: https://github.com/Xunnamius/symbiote/commit/a95e9104912da7d85cc6e908cf6f359ae0d74a50
[323]: https://github.com/Xunnamius/symbiote/commit/12dd3f71aca30c382e26451fed7e15d6359cd624
[324]: https://github.com/Xunnamius/symbiote/commit/2a3e13c79fb4a96dc5da63a1a3740be799be38c0
[325]: https://github.com/Xunnamius/symbiote/commit/b8841b52f736c86ff811fc26b8db2a9ba638f693
[326]: https://github.com/Xunnamius/symbiote/commit/f3012291ad31b4c57b3b592eaf687ac83162e1ba
[327]: https://github.com/Xunnamius/symbiote/commit/26f78dcd18c0d83e4adc060449edff2071bc0adb
[328]: https://github.com/Xunnamius/symbiote/commit/c63847c764bed07ff07a3b461170bf82b0fa5202
[329]: https://github.com/Xunnamius/symbiote/commit/df13f8755a08757c99f20c71c55647e3478243fc
[330]: https://github.com/Xunnamius/symbiote/commit/48163ba158b463dd21ffd6ad431f6f0714c93003
[331]: https://github.com/Xunnamius/symbiote/commit/c4f81c0568db69961282c771dd28370d1357f4d8
[332]: https://github.com/Xunnamius/symbiote/commit/8338afa2ed9f0cc68144505d32b9578e82661549
[333]: https://github.com/Xunnamius/symbiote/commit/fb7752b12394e6c92912bc59517df8baff5be223
[334]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.0.1...@-xun/symbiote@2.1.0
[335]: https://github.com/Xunnamius/symbiote/commit/0c86cb529724eb2576b8d62e8c7f0addc3ea7084
[336]: https://github.com/Xunnamius/symbiote/commit/0b96a6b7274a4b840e73bf97bf9b5455cba08666
[337]: https://github.com/Xunnamius/symbiote/commit/e6827346cceeb12e8ce9f7aa52b868ccc9272253
[338]: https://github.com/Xunnamius/symbiote/commit/552b89f4a78d09be4281b7001bbd2e37880f195f
[339]: https://github.com/Xunnamius/symbiote/commit/7409b67ee7863d79fa9c689d34cb23378aa8707e
[340]: https://github.com/Xunnamius/symbiote/commit/2013638bd9d290bd619fb188ae96d077510170be
[341]: https://github.com/Xunnamius/symbiote/commit/5057f5376c96d6c9660cc672982f808454dd5ee7
[342]: https://github.com/Xunnamius/symbiote/commit/6c5a8fe3b009a49f44c3a476433bb41204827ddb
[343]: https://github.com/Xunnamius/symbiote/commit/a84c5235025ae7fe18d8bec997eb19472dce1b06
[344]: https://github.com/Xunnamius/symbiote/commit/f9bdb7ed796e77ce7d3dad3e0f4b04960984a1f8
[345]: https://github.com/Xunnamius/symbiote/commit/b6927a9b6e40937047008bc4337573e1eaafc4e8
[346]: https://github.com/Xunnamius/symbiote/commit/364fbb2c1b1981e96aab54503b54ffa496b33898
[347]: https://github.com/Xunnamius/symbiote/commit/11bd584b8b0d49b7f7e0184995922fbfad653666
[348]: https://github.com/Xunnamius/symbiote/commit/aee10cdf72edb6a1741d2880fd4cff8aa5dd8f71
[349]: https://github.com/Xunnamius/symbiote/commit/d44fa79bf7df8ae47acff4da881cdc7450cb64d1
[350]: https://github.com/Xunnamius/symbiote/commit/b7f27541e4b8d8540c70decab93b1e0df2b330bf
[351]: https://github.com/Xunnamius/symbiote/commit/f592d5faf07a02a50f3f3ed99baf8f23af94ee59
[352]: https://github.com/Xunnamius/symbiote/commit/7e6618353b307cbe03f2e9d5429639a78fac738f
[353]: https://github.com/Xunnamius/symbiote/commit/98c028a88e194a6085b320f7458a0a7de1ec7c62
[354]: https://github.com/Xunnamius/symbiote/commit/3030eb9258c22141352cb27d69e1c84037bc9a50
[355]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.33.0...@-xun/symbiote@2.0.0
[356]: https://github.com/Xunnamius/symbiote/commit/b7b101e38446127aca8e7cd55b60f3731ab81ac0
[357]: https://github.com/Xunnamius/symbiote/commit/057f400cc043f1e13e701a97d2e67b93be4719d3
[358]: https://github.com/Xunnamius/symbiote/commit/d22de31fff57a3eabff39d5f564d04ca24051fda
[359]: https://github.com/Xunnamius/symbiote/commit/e83f2f27cd2e5c01c4c32532fb39bf16557b62b4
[360]: https://github.com/Xunnamius/symbiote/commit/ad83e562e1049d816498af50afc8a5bd3efca059
[361]: https://github.com/Xunnamius/symbiote/commit/0a19ce6bf1c302624d6c6d68b0d5ee3aff17aeda
[362]: https://github.com/Xunnamius/symbiote/commit/70b513431bf2d90c8590ecb68cedce9482ec0026
[363]: https://github.com/Xunnamius/symbiote/commit/1a522e88ed38c4e2d051bd2809293a66b86e48ef
[364]: https://github.com/Xunnamius/symbiote/commit/9d05b8bd93b6c28c218a060264253d403fe09617
[365]: https://github.com/Xunnamius/symbiote/commit/7a8eee69e839138e96fe3937ae8c178e44148e27
[366]: https://github.com/Xunnamius/symbiote/commit/abbc2da0ff368d976c2a73e0af1848d81e0ee05b
[367]: https://github.com/Xunnamius/symbiote/commit/53409fa0bd5d3b104a74f7ad7eb060334ac48bca
[368]: https://github.com/Xunnamius/symbiote/commit/2bd57b5ac1bbe3c23f772a9194ad604a01715290
[369]: https://github.com/Xunnamius/symbiote/commit/a40f886ca5f4abdffdee5df1b5259b5165e69c4f
[370]: https://github.com/Xunnamius/symbiote/commit/f2bb03d127d347d69b3f6c253cfbb286943c85fe
[371]: https://github.com/Xunnamius/symbiote/commit/641b57b7d0dd966573747fbdcb220f3f8bacdf05
[372]: https://github.com/Xunnamius/symbiote/commit/177a5dcf060e7d2a90e183ad6cf6d162e0746100
[373]: https://github.com/Xunnamius/symbiote/commit/c331ae1339dce62af60a59c171dd4d8fe3db3ed3
[374]: https://github.com/Xunnamius/symbiote/commit/87245154b394d12f43ac5f96675a8e0adcf7e7fe
[375]: https://github.com/Xunnamius/symbiote/commit/a6f02e0b4e4b157c3d98ffece54f4765515376d2
[376]: https://github.com/Xunnamius/symbiote/commit/5e99d888275bc8dd3d62e0add9cc3448476a2bda
[377]: https://github.com/Xunnamius/symbiote/commit/f511249a44a64a3e5885f2e51822af539f427e0f
[378]: https://github.com/Xunnamius/symbiote/commit/577710bf9ba5c47dff34554dd4bb1d20b9844d14
[379]: https://github.com/Xunnamius/symbiote/commit/2841d263ae20fdc5d875afe74ce3fd6eb309105e
[380]: https://github.com/Xunnamius/symbiote/commit/5c66c170ade8c6ab34e8003833eedb2fd35f13e5
[381]: https://github.com/Xunnamius/symbiote/commit/6a44488ce9daf5ec86b6df8257fd06f6444bd4bf
[382]: https://github.com/Xunnamius/symbiote/commit/26fb0346ccac211d0ab3deecc332eb8d047da9ea
[383]: https://github.com/Xunnamius/symbiote/commit/4f8d351103c48f8114f47f07a37f1f6fe8c21c3f
[384]: https://github.com/Xunnamius/symbiote/commit/26e756362a16f050e03cef2c4c582d94e29614cd
[385]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.0.0...@-xun/symbiote@2.0.1
[386]: https://github.com/Xunnamius/symbiote/commit/e42722b37c4b6d2ec1e39b5f7d10d304ac147bcc
[387]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.32.0...@-xun/symbiote@1.33.0
[388]: https://github.com/Xunnamius/symbiote/commit/f1e8e8e08a4139a060af4c155aa1ee4e73c344e0
[389]: https://github.com/Xunnamius/symbiote/commit/49258852c3fcd7dd992c2b244bb7a7e50c88dbd7
[390]: https://github.com/Xunnamius/symbiote/commit/ca87588aee7f76fe8635e4e7f2f712b7b96671bb
[391]: https://github.com/Xunnamius/symbiote/commit/410a05ae14f91c62d0c43e624a9a8f815c0885c6
[392]: https://github.com/Xunnamius/symbiote/commit/f111552d67f5c3bdd81c8d24a4fea5e21298f620
[393]: https://github.com/Xunnamius/symbiote/commit/1d9accc2d1627d74a04f1bb7f776a4e4b2049f9a
[394]: https://github.com/Xunnamius/symbiote/commit/51ab45426d8058a8a84b8206feda4242d780f53a
[395]: https://github.com/Xunnamius/symbiote/commit/c2bee3ba59f700348dc33e31ad742d2348169ec0
[396]: https://github.com/Xunnamius/symbiote/commit/b057430a463e47e5774bef53a00e8a0677914291
[397]: https://github.com/Xunnamius/symbiote/commit/eec0ed930df8cfaec7a98459b4d56849aac01749
[398]: https://github.com/Xunnamius/symbiote/commit/16f64e190ca4798c6fc148de2e354b7973750784
[399]: https://github.com/Xunnamius/symbiote/commit/413dc399483771459ce358ca126bba405f1233c6
[400]: https://github.com/Xunnamius/symbiote/commit/28c221bb8a859e69003ba2447e3f5763dc92a0ec
[401]: https://github.com/Xunnamius/symbiote/commit/6a8c411beeda36c4d6825608de4c76eb481d8cb5
[402]: https://github.com/Xunnamius/symbiote/commit/da7e953744dde41a45c249d74e7f4007719eece4
[403]: https://github.com/Xunnamius/symbiote/commit/edec64f03b4f426f768a4ba699c64c8cc7ce1f80
[404]: https://github.com/Xunnamius/symbiote/commit/578d631717f64f0a1405a5fe40106ff9e8520a22
[405]: https://github.com/Xunnamius/symbiote/commit/bf993c947a42aaaa96060bc9ac29f334e28db0ea
[406]: https://github.com/Xunnamius/symbiote/commit/c52b3f184ba122013ac555d962b3df41c9329d0c
[407]: https://github.com/Xunnamius/symbiote/commit/cdfd48df4a6a422042c7f239bc2246f033da91c2
[408]: https://github.com/Xunnamius/symbiote/commit/d6a0c06d5c37835dbbf0c987b84c95bcc840b6c9
[409]: https://github.com/Xunnamius/symbiote/commit/a33aed8d5b0262dd81b375fcef062e5f7d1b5601
[410]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.31.2...@-xun/symbiote@1.32.0
[411]: https://github.com/Xunnamius/symbiote/commit/c9a6e8b7ee5518f658bcd62a800be0b065feffb7
[412]: https://github.com/Xunnamius/symbiote/commit/e17adfb5fcd7395225e1fb530ebce697dce1b40d
[413]: https://github.com/Xunnamius/symbiote/commit/c5cd76a0fbb13149871b4b5b1d8badf6277c455a
[414]: https://github.com/Xunnamius/symbiote/commit/56e576cb940a966292d7378200f153215b55351a
[415]: https://github.com/Xunnamius/symbiote/commit/aa60eebffcdbbf28d8ce6943dc7ed6cb6b50150b
[416]: https://github.com/Xunnamius/symbiote/commit/c248757d6afb672ef03d93c652f5385bd80670df
[417]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.31.1...@-xun/symbiote@1.31.2
[418]: https://github.com/Xunnamius/symbiote/commit/0565333411580fd45659aad0e9727012cea9a699
[419]: https://github.com/Xunnamius/symbiote/commit/f4ecfc9dd682e307a08becf562a877450fe903ef
[420]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.31.0...@-xun/symbiote@1.31.1
[421]: https://github.com/Xunnamius/symbiote/commit/cfe28e3d801ec1b719b0dedbda4e9f63d7924b77
[422]: https://github.com/Xunnamius/symbiote/commit/89350088d45a927b2d85ce710a21d89af74c1d21
[423]: https://github.com/Xunnamius/symbiote/commit/39e37a8070e22e93b0042ae80f80207b67cf3ed2
[424]: https://github.com/Xunnamius/symbiote/commit/58a6223696187f874d98bb91ec3f37719e7f33bd
[425]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.3...@-xun/symbiote@1.31.0
[426]: https://github.com/Xunnamius/symbiote/commit/8f7777c426ce028f106db4654c8bd3535da7151b
[427]: https://github.com/Xunnamius/symbiote/commit/6fc66d8a50979c2ee7424a94dd0c98179f9ac47b
[428]: https://github.com/Xunnamius/symbiote/commit/8a5fd8a05a1b7cd3a9d820f594145e2be76bb746
[429]: https://github.com/Xunnamius/symbiote/commit/68d5bda031da6af194e5d5f3199eeac7c7416076
[430]: https://github.com/Xunnamius/symbiote/commit/ef6927b763b236d731e9013c739a5336d02193d2
[431]: https://github.com/Xunnamius/symbiote/commit/ceb6c6280370ff13d3eb9fcd5d6b9ec2b4b993f3
[432]: https://github.com/Xunnamius/symbiote/commit/ce934437a7db5039d1c572906332ee6389bcf5a2
[433]: https://github.com/Xunnamius/symbiote/commit/6ce819a34df36aaf26bf7b8d7e87b6085547183f
[434]: https://github.com/Xunnamius/symbiote/commit/62a5a128781629f5df99e05eff025da3e88022a6
[435]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.2...@-xun/symbiote@1.30.3
[436]: https://github.com/Xunnamius/symbiote/commit/01dca03e237882091b9f849a4beeb06537d27ecd
[437]: https://github.com/Xunnamius/symbiote/commit/b923d6daa24240ab9930bade670683e950e36e30
[438]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.1...@-xun/symbiote@1.30.2
[439]: https://github.com/Xunnamius/symbiote/commit/98a868e21d0126772abbbb69bb64a9b56da229ac
[440]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.0...@-xun/symbiote@1.30.1
[441]: https://github.com/Xunnamius/symbiote/commit/89eebe76ad675b35907b3379b29bfde27fd5a5b8
[442]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.29.2...@-xun/symbiote@1.30.0
[443]: https://github.com/Xunnamius/symbiote/commit/3710988e3577a60357c780a19fa9a28e0dd58332
[444]: https://github.com/Xunnamius/symbiote/commit/e1633023dfcc7b2ea7a213c11139b589bd99d1b7
[445]: https://github.com/Xunnamius/symbiote/commit/ca47d93f4c507108c23cfd2e613ff758fd56d1c9
[446]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.29.1...@-xun/symbiote@1.29.2
[447]: https://github.com/Xunnamius/symbiote/commit/d89809b1811fb99fb24fbfe0c6960a0e087bcc27
[448]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.29.0...@-xun/symbiote@1.29.1
[449]: https://github.com/Xunnamius/symbiote/commit/8feaaa78a9f524f02e4cc9204ef84f329d31ab94
[450]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.28.0...@-xun/symbiote@1.29.0
[451]: https://github.com/Xunnamius/symbiote/commit/053bf3e15be94ed90e9b2b9fdf82c0b0b7c6da0d
[452]: https://github.com/Xunnamius/symbiote/commit/002431f7c880bdd55c6cc71f7660dec8ba84966f
[453]: https://github.com/Xunnamius/symbiote/commit/65b8c0b01acf9c60fc3cb5a1904832fd99f95329
[454]: https://github.com/Xunnamius/symbiote/commit/0ed2513071351aa815018080c9a6d477141905d6
[455]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.27.0...@-xun/symbiote@1.28.0
[456]: https://github.com/Xunnamius/symbiote/commit/c3fc1264932eb8224289ef973366fc0cb5435f59
[457]: https://github.com/Xunnamius/symbiote/commit/a91e7fa7a369d3d71bc98b147279c01b8f87af3c
[458]: https://github.com/Xunnamius/symbiote/commit/71b17c8574fe55da23831cd1be11457e7cb4bdb5
[459]: https://github.com/Xunnamius/symbiote/commit/7fed43963c71aad0d9b37b72a52dad1c55226140
[460]: https://github.com/Xunnamius/symbiote/commit/11b585ddfa1954ce0380fa64b5c4120773dc55d2
[461]: https://github.com/Xunnamius/symbiote/commit/cf5b25b85bacd164e57f5e26863cf6c1581d8c68
[462]: https://github.com/Xunnamius/symbiote/commit/55ee62d4a379fc1aae845c6847adc0a9c8a8db6f
[463]: https://github.com/Xunnamius/symbiote/commit/56b706a90fbab254ee74509f45cf632157a0cfdc
[464]: https://github.com/Xunnamius/symbiote/commit/b3e256005e6c4e658993e9edbfb1013e633e09a9
[465]: https://github.com/Xunnamius/symbiote/commit/d1038dd83a5fbfadf4e2dd94a430023c671f8377
[466]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.26.0...@-xun/symbiote@1.27.0
[467]: https://github.com/Xunnamius/symbiote/commit/1a69887158a00db7133cf0a2eee85146ec6d1399
[468]: https://github.com/Xunnamius/symbiote/commit/1262cc85e615a3e0ac7766099e166aeae6a1e3e1
[469]: https://github.com/Xunnamius/symbiote/commit/645473d084f3d4033afe39d72802b0a2a89e112d
[470]: https://github.com/Xunnamius/symbiote/commit/c5c742e64b9a56894866c0110cb3161ae3321b0f
[471]: https://github.com/Xunnamius/symbiote/commit/11da8f2253218e0303be5a2ae11eee7ae958f0b5
[472]: https://github.com/Xunnamius/symbiote/commit/afa3f466c6d6e960ccb11c76149c54378a87b16a
[473]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.25.0...@-xun/symbiote@1.26.0
[474]: https://github.com/Xunnamius/symbiote/commit/5c8816d895864b48e3106b178284d57e9fdc3687
[475]: https://github.com/Xunnamius/symbiote/commit/44be676ca04207bd17553941d367abda2325c0ee
[476]: https://github.com/Xunnamius/symbiote/commit/3323fc3580b663f00518e7ca7bd9f52a7e50b80f
[477]: https://github.com/Xunnamius/symbiote/commit/8a67d707c540f5e23d6f3ad8f6efe2d79cb35361
[478]: https://github.com/Xunnamius/symbiote/commit/9b551a7be83a12c43408f9d33d117c3a6218cff4
[479]: https://github.com/Xunnamius/symbiote/commit/0924dd3f6544d39ab5f4f7f50c5173704aab3909
[480]: https://github.com/Xunnamius/symbiote/commit/ce72af261f1d9c15f89e11251ad8c5f000ff8afa
[481]: https://github.com/Xunnamius/symbiote/commit/6ac3376124a2d86316f248b662f327ceee470b58
[482]: https://github.com/Xunnamius/symbiote/commit/09373fa4830377ba42824797eb0791655da0fa34
[483]: https://github.com/Xunnamius/symbiote/commit/b3e95e72ccfdce365933aeb27afe5a8bb64bdec5
[484]: https://github.com/Xunnamius/symbiote/commit/d27007d1ebda295a05b6ed116a0421d7610aff42
[485]: https://github.com/Xunnamius/symbiote/commit/998218d7d3f3a654dcdd33e2e1c5ce033927774e
[486]: https://github.com/Xunnamius/symbiote/commit/9087086d6944cb6a847f325142753a63be2ca30c
[487]: https://github.com/Xunnamius/symbiote/commit/36016b10da47bb5799d3e558831a96eda878c10e
[488]: https://github.com/Xunnamius/symbiote/commit/86fca5843564773f9e0ec53c454c72109befbec6
[489]: https://github.com/Xunnamius/symbiote/commit/bb6bde93dffe0a8f565dace3bfc970b52ff88c79
[490]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.24.0...@-xun/symbiote@1.25.0
[491]: https://github.com/Xunnamius/symbiote/commit/31c7bbb45d313ca9a1edaf9c682da438fde76830
[492]: https://github.com/Xunnamius/symbiote/commit/4f807cf260af20ae6a60138dae1e4b7204eed570
[493]: https://github.com/Xunnamius/symbiote/commit/d22cee3b292da80ab45e4513bba3b2157fa72245
[494]: https://github.com/Xunnamius/symbiote/commit/9045cd704121600e07d84839c3e23b407e184f6b
[495]: https://github.com/Xunnamius/symbiote/commit/42510f65184850994a3334041e7ae7313af4e0ad
[496]: https://github.com/Xunnamius/symbiote/commit/c0b7b705cc0e398ca2396efab497aac92466b422
[497]: https://github.com/Xunnamius/symbiote/commit/f8734d43a2061d54ef4382d159aea7815ce03ca5
[498]: https://github.com/Xunnamius/symbiote/commit/005ab26c7be42aeec8a100753ba49f41b0d38550
[499]: https://github.com/Xunnamius/symbiote/commit/e7c4b6e1bc996d5a975a497cd3ca0e4774a39a85
[500]: https://github.com/Xunnamius/symbiote/commit/c62261b48969a52b54464de106eb02edb170fd5a
[501]: https://github.com/Xunnamius/symbiote/commit/4d5ddb62d49f74d07dc8c24887bcf3ec50c00362
[502]: https://github.com/Xunnamius/symbiote/commit/0bfdf77284d074696b6192a511f2ae44d16a3216
[503]: https://github.com/Xunnamius/symbiote/commit/da60db8ff76efa3ad05f524298df8c0bb64399e3
[504]: https://github.com/Xunnamius/symbiote/commit/576dd649da2775841e9a2e985b02e564a2be1caa
[505]: https://github.com/Xunnamius/symbiote/commit/ffcad30844a8223d29369bb5303468f1534176a4
[506]: https://github.com/Xunnamius/symbiote/commit/4059ed7d534afa9b74bd93f761f92e5d5996990a
[507]: https://github.com/Xunnamius/symbiote/commit/5ea7f8a45c16bd07ff0f5bcdc8e4f6fa82908df0
[508]: https://github.com/Xunnamius/symbiote/commit/d4d37566ea09a69679ec61da20c3a5aca9a8720f
[509]: https://github.com/Xunnamius/symbiote/commit/d91572787be84252d2b37f3f6c1fa72e7528c62b
[510]: https://github.com/Xunnamius/symbiote/commit/5d61e8783923775def0a0fcd1fc9fd57e65ab184
[511]: https://github.com/Xunnamius/symbiote/commit/1d0dee8044cdd8cd88c6d8ccfe10c95c7b6a36bd
[512]: https://github.com/Xunnamius/symbiote/commit/4e853808704a86d2f207aaa7cc0b5531cb05ad00
[513]: https://github.com/Xunnamius/symbiote/commit/2b46883f153688f590ac3e1baed996bde3c4e1e6
[514]: https://github.com/Xunnamius/symbiote/commit/95b0f6899582ed0bbb4f78bb12ce556079d36b67
[515]: https://github.com/Xunnamius/symbiote/commit/81ba7bcaea006b1094131d0f0bb3c3dd0828cf13
[516]: https://github.com/Xunnamius/symbiote/commit/128e83acfd2dd1f5b3ffca6b1feb7892a2fa38b3
[517]: https://github.com/Xunnamius/symbiote/commit/c4016a8318afb13d6fd6ff9b5bf58a30231e5002
[518]: https://github.com/Xunnamius/symbiote/commit/0f4c7b1e678f56ff0cb5112c8858f0da57254d91
[519]: https://github.com/Xunnamius/symbiote/commit/1894d80efed02438233672074116dfa06e0c91f7
[520]: https://github.com/Xunnamius/symbiote/commit/351ee50466956e8fc31eeaf1de79418f8ab04c16
[521]: https://github.com/Xunnamius/symbiote/commit/74ab5d91a21dd66aa7a0412fb3ce2ad89de3c1bc
[522]: https://github.com/Xunnamius/symbiote/commit/18dbad0840fc762fab169d38d606afd41316dd1b
[523]: https://github.com/Xunnamius/symbiote/commit/8e82ac18456a552cdf55fe75be9e7e11f958aa65
[524]: https://github.com/Xunnamius/symbiote/commit/f323a6ad34c69bca84a2618598f0801f26a0df82
[525]: https://github.com/Xunnamius/symbiote/commit/4a6e25433385507c2d326f40c56093bcd54b171d
[526]: https://github.com/Xunnamius/symbiote/commit/4e3cdc092ad2bf0f716a41ff16e2d6fb2267cc5a
[527]: https://github.com/Xunnamius/symbiote/commit/5e0058708501603a5ed40fbd3934a2d01842c3fa
[528]: https://github.com/Xunnamius/symbiote/commit/9b8b41a72605c3beabdf11c9155733bf1eb99ec0
[529]: https://github.com/Xunnamius/symbiote/commit/e22403c276eda0e6281085198933d6df3a1dcc90
[530]: https://github.com/Xunnamius/symbiote/commit/c34a5499cb58878fdaa42e83063e1c36a0582e06
[531]: https://github.com/Xunnamius/symbiote/commit/43da8828df733ab8fd835d1a40c2a2c0c98fdd9b
[532]: https://github.com/Xunnamius/symbiote/commit/33af2bc79370b38bc94633617180bcd283b5a0bf
[533]: https://github.com/Xunnamius/symbiote/commit/c1ac811d2d7500a4b665d4d1531b5d51a9da2c19
[534]: https://github.com/Xunnamius/symbiote/commit/901d85357b06b854b6c37a34ac2b37948376660c
[535]: https://github.com/Xunnamius/symbiote/commit/1fb8568e874687f25f13bcd31db7e94a8eb43282
[536]: https://github.com/Xunnamius/symbiote/commit/3373208a68bb1c11e75e68b0c53ff04cb0446035
[537]: https://github.com/Xunnamius/symbiote/commit/8cbc4e40c61d48b61ab4ee2c34f679f6cd2ed0ab
[538]: https://github.com/Xunnamius/symbiote/commit/b1249edd6124c7f86bc60288861d61854e30ff3d
[539]: https://github.com/Xunnamius/symbiote/commit/7d21ee2741c01a2c2f5f75bcfcfe2a59a54a077a
[540]: https://github.com/Xunnamius/symbiote/commit/5eb9deff748ee6e4af3c57a16f6370d16bb97bfb
[541]: https://github.com/Xunnamius/symbiote/commit/b928e8a92064bcc4a0ef17b45eb6af40654208f2
[542]: https://github.com/Xunnamius/symbiote/commit/45bcd8c56f38ccbc330b4088c6f8a5812714611a
[543]: https://github.com/Xunnamius/symbiote/commit/f50abaf0309ca2e0e0f21b429683c8369e5e2210
[544]: https://github.com/Xunnamius/symbiote/commit/98a1dd7eacac964a7fbab47ded92c33173383f11
[545]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.23.0...@-xun/symbiote@1.24.0
[546]: https://github.com/Xunnamius/symbiote/commit/467e88442c58320f1b65e6de3bd5e52c0220132b
[547]: https://github.com/Xunnamius/symbiote/commit/472af2c847833e17c6d88d61d8cc2e885ef21338
[548]: https://github.com/Xunnamius/symbiote/commit/8ab4eecd7242de0447c86f2535ccdd31c5d5291e
[549]: https://github.com/Xunnamius/symbiote/commit/69f2dc0d929150f46c3fc4990a37338111d1a4f6
[550]: https://github.com/Xunnamius/symbiote/commit/8dc4a962ae457c82585e3c34d1ee02c731aedec3
[551]: https://github.com/Xunnamius/symbiote/commit/e3fa185ffa33d801bc1f7d9faeda1d40eaa8a117
[552]: https://github.com/Xunnamius/symbiote/commit/89b57c4e38f74970a301e6261acdfeca27982d44
[553]: https://github.com/Xunnamius/symbiote/commit/b8b82d942c478673b10b2d071802c73461c42961
[554]: https://github.com/Xunnamius/symbiote/commit/69ebf4a549a7ce9848c19c27035d77473f5707a8
[555]: https://github.com/Xunnamius/symbiote/commit/556f17ec5b274c0bf08d364905a99b8e27bfff63
[556]: https://github.com/Xunnamius/symbiote/commit/74d58d66649401b6e8f17e53076ea4972bc1d888
[557]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.22.0...@-xun/symbiote@1.23.0
[558]: https://github.com/Xunnamius/symbiote/commit/1bdceca9e23b28bffb12b84013ba95ef54c5ac81
[559]: https://github.com/Xunnamius/symbiote/commit/6ff2bd3423e7b7e9af224e937200bee1fb5691ea
[560]: https://github.com/Xunnamius/symbiote/commit/a1d36577666cddfce19970975144e085c7a0c353
[561]: https://github.com/Xunnamius/symbiote/commit/fa2a97f118389cdaf4227a07a9bf5a5bc4cc2dfe
[562]: https://github.com/Xunnamius/symbiote/commit/6e3f599ab734f0a7fcd2faff59e2c377eeec3fa1
[563]: https://github.com/Xunnamius/symbiote/commit/ca021f8fb5d821cc21129c4a29e6d43e24166183
[564]: https://github.com/Xunnamius/symbiote/commit/b9218ee5f94be5da6a48d961950ed32307ad7f96
[565]: https://github.com/Xunnamius/symbiote/commit/dc47cfbbdc869aa2d149924c72bb5414b0f46f07
[566]: https://github.com/Xunnamius/symbiote/commit/ebb4fb597a47fa0d748735e3b0a2832434b7a637
[567]: https://github.com/Xunnamius/symbiote/commit/ccc82b396baeb2445174d0c8b9da97522cb66066
[568]: https://github.com/Xunnamius/symbiote/commit/65569086d8546cbb06d2f0434e0da5c839959cf8
[569]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.21.0...@-xun/symbiote@1.22.0
[570]: https://github.com/Xunnamius/symbiote/commit/8bdf28b7ba33aae68f04ee62f6b2d72d39c62012
[571]: https://github.com/Xunnamius/symbiote/commit/0c3f85c0e926cff1645b6a329edcc6304b8ac189
[572]: https://github.com/Xunnamius/symbiote/commit/531d3eae3ffb883e69799688a89c28e55cdcf177
[573]: https://github.com/Xunnamius/symbiote/commit/a7a66d9ffeecb4ba1d8b8519a97fc10f1fea72a6
[574]: https://github.com/Xunnamius/symbiote/commit/e37006ee62471c2cf178a89023e34a9b691b7574
[575]: https://github.com/Xunnamius/symbiote/commit/349cf201e0cbfdc2b925690744b4ff6737a008b3
[576]: https://github.com/Xunnamius/symbiote/commit/d8b7442d320a4c4efbe03cb0a502ad337211caee
[577]: https://github.com/Xunnamius/symbiote/commit/b16b74f12f0397003b7689ccee4a72dafd9e116b
[578]: https://github.com/Xunnamius/symbiote/commit/c7fe4109820fb109db7a0ea07985089d1b488535
[579]: https://github.com/Xunnamius/symbiote/commit/2c40974df517c6226d351e0ab9d8f66675792272
[580]: https://github.com/Xunnamius/symbiote/commit/f5fb1bcbafb797b2c7d88655895e185b03f2e1db
[581]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.8...@-xun/symbiote@1.21.0
[582]: https://github.com/Xunnamius/symbiote/commit/bf9514f27e8299b6f489dab44174a3ce9f0c2c09
[583]: https://github.com/Xunnamius/symbiote/commit/7ad96c5edd2c8a6275e94cde9a1c5721cdd88dda
[584]: https://github.com/Xunnamius/symbiote/commit/d54cfa03ffcfc52779cb283802e447df42a0cfed
[585]: https://github.com/Xunnamius/symbiote/commit/646aa3cee846f4a6169ae05c91d5b4762e1c290e
[586]: https://github.com/Xunnamius/symbiote/commit/a08c9f1fd5448c918aa65f09f1842dc46162fb8a
[587]: https://github.com/Xunnamius/symbiote/commit/cd82265731cd411d9b374c3bbe3c642c93a053fe
[588]: https://github.com/Xunnamius/symbiote/commit/94a2253a2888d5d2b34290d7b0180fdee2a2a104
[589]: https://github.com/Xunnamius/symbiote/commit/db0c6d71e780edd2d6ab295abc136ac3fa3979d7
[590]: https://github.com/Xunnamius/symbiote/commit/7dcbf56f1d89bddc9ad635e47a6f27a13274e799
[591]: https://github.com/Xunnamius/symbiote/commit/e334962ae950f510b35d09bb5d6ed6326a586de0
[592]: https://github.com/Xunnamius/symbiote/commit/8833e0a06f0733e89b4496719aa8b71050783339
[593]: https://github.com/Xunnamius/symbiote/commit/5070ab49e00314a91a6c87aa1715846939531023
[594]: https://github.com/Xunnamius/symbiote/commit/1eff5cb11f90533bd4ceeca8c269e8a4e5b998c0
[595]: https://github.com/Xunnamius/symbiote/commit/0eb7fd3b75fe765781b5ca482abbd38e3b0a1a65
[596]: https://github.com/Xunnamius/symbiote/commit/8d69310b68b2362d815e1e1e1d76d5688d6b46ff
[597]: https://github.com/Xunnamius/symbiote/commit/e169f47888b112eda08cb8518b69ba3bfd9f2b26
[598]: https://github.com/Xunnamius/symbiote/commit/e7b857926d572780c951aa1161133186d2cf1784
[599]: https://github.com/Xunnamius/symbiote/commit/2036da0350a573c7ae9179d6cdd794e91935c9ae
[600]: https://github.com/Xunnamius/symbiote/commit/a35f4c0e581dff4a7667277284052a7fa71b672e
[601]: https://github.com/Xunnamius/symbiote/commit/3f1a5a9a6c7ce7cd8aba5c521fb95c6beed3394e
[602]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.7...@-xun/symbiote@1.20.8
[603]: https://github.com/Xunnamius/symbiote/commit/ce701f3d57da9f82ee0036320bc62d5c51233011
[604]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.6...@-xun/symbiote@1.20.7
[605]: https://github.com/Xunnamius/symbiote/commit/3c48ae1560cd1d689340739f550f4feb18754e81
[606]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.5...@-xun/symbiote@1.20.6
[607]: https://github.com/Xunnamius/symbiote/commit/76992d930b92919b8ab95f195cec98ddb91fb390
[608]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.4...@-xun/symbiote@1.20.5
[609]: https://github.com/Xunnamius/symbiote/commit/0864f9221ff2134311ba716cc2eca83aa044fa12
[610]: https://github.com/Xunnamius/symbiote/commit/ff3853fa7835e9b2f89e2a9a846db76d6b2dd4a5
[611]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.3...@-xun/symbiote@1.20.4
[612]: https://github.com/Xunnamius/symbiote/commit/0bf89cad7426062a1d0f1ed6b9e69c1e60c734aa
[613]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.2...@-xun/symbiote@1.20.3
[614]: https://github.com/Xunnamius/symbiote/commit/dd265b47f6ff85a27a80867a60ffbc8aa87e15de
[615]: https://github.com/Xunnamius/symbiote/commit/cf21d7d56b8d28fe14e87a975ec151c9f16e4717
[616]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.1...@-xun/symbiote@1.20.2
[617]: https://github.com/Xunnamius/symbiote/commit/bc2a56b8e3bb237caba1768c1673d3848d97e0d6
[618]: https://github.com/Xunnamius/symbiote/commit/52115470ce25670c0355bba2653789a6df8b3aaa
[619]: https://github.com/Xunnamius/symbiote/commit/8735f612072b02c3af08054d8f858b5764aab92d
[620]: https://github.com/Xunnamius/symbiote/commit/a86884fbde354ac7d2cbd5c355d67b536e90f3e6
[621]: https://github.com/Xunnamius/symbiote/commit/b23b12b64b968429652269db3ae710f79c3ce356
[622]: https://github.com/Xunnamius/symbiote/commit/8b54237af01ef168984d9b306063e60e7914c936
[623]: https://github.com/Xunnamius/symbiote/commit/571968164a4defe8eefdb81341cd7a0664079a66
[624]: https://github.com/Xunnamius/symbiote/commit/f2cb8fd3a8ad8a0ea642b34a1cca9159bb51b101
[625]: https://github.com/Xunnamius/symbiote/commit/3008cde37d490c51b2c1ab549ad4faa847d8266d
[626]: https://github.com/Xunnamius/symbiote/commit/25e7a3b93bd0cfd32df2aaaa83ee055bc7ba1c92
[627]: https://github.com/Xunnamius/symbiote/commit/904c9ac9bb6b4b1d3b047124e749c9f33f8878c9
[628]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.0...@-xun/symbiote@1.20.1
[629]: https://github.com/Xunnamius/symbiote/commit/a2ea7df939d4f1e11e3904c653f35f87abe65651
[630]: https://github.com/Xunnamius/symbiote/commit/35876a1903ae9180624905e176f7c4b2e1d870a1
[631]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.19.1...@-xun/symbiote@1.20.0
[632]: https://github.com/Xunnamius/symbiote/commit/d84b35ff2b28040920fb62a405e29f2e54d29d4f
[633]: https://github.com/Xunnamius/symbiote/commit/6ef0123a0d9d1668ce567cf526e04951a3d25dd1
[634]: https://github.com/Xunnamius/symbiote/commit/8cf99a986ddf05e8d2a740d58e9ccdf5a0675e43
[635]: https://github.com/Xunnamius/symbiote/commit/3dd5d787a3de11f375bb9ca815840400fbe8cdf3
[636]: https://github.com/Xunnamius/symbiote/commit/5c3ed7323a7bf5f3dd1a3d7dd73c8511ef04ff82
[637]: https://github.com/Xunnamius/symbiote/commit/c912b0992a3033ed5d978d7f5c139569f2bd0608
[638]: https://github.com/Xunnamius/symbiote/commit/9cb2d72efc872c4003dabc8c68856b72e8f7c3a4
[639]: https://github.com/Xunnamius/symbiote/commit/ce035004c4bea999ba5cf583c16fc1dbc8a232a6
[640]: https://github.com/Xunnamius/symbiote/commit/22f2f41be642d3d94fc4e5a50014a61ab68c50b4
[641]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.19.0...@-xun/symbiote@1.19.1
[642]: https://github.com/Xunnamius/symbiote/commit/d2011645a568e76bdf61dde14dd0e15dbce243dc
[643]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.18.0...@-xun/symbiote@1.19.0
[644]: https://github.com/Xunnamius/symbiote/commit/0c199f69971688205b1ee027dce36c2bc6ab8a04
[645]: https://github.com/Xunnamius/symbiote/commit/587a354329e46ca03f056ca1414915145928736c
[646]: https://github.com/Xunnamius/symbiote/commit/92bb25fe5f8022271ae03ee56e18377ad02e392b
[647]: https://github.com/Xunnamius/symbiote/commit/909949d58e2ddecf4ad606fe0dd9525ec540a8fb
[648]: https://github.com/Xunnamius/symbiote/commit/59dd7523276ab48868124e8f76f06784bc59f794
[649]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.17.0...@-xun/symbiote@1.18.0
[650]: https://github.com/Xunnamius/symbiote/commit/6c7ae27d3d93d36e7cbcae873b8717d252cf6670
[651]: https://github.com/Xunnamius/symbiote/commit/e833523e6085950c3477ca6e44ae92ef7b1fad46
[652]: https://github.com/Xunnamius/symbiote/commit/0383586f6ccbb0bc503df636f515d19618548f92
[653]: https://github.com/Xunnamius/symbiote/commit/3a3489c43d2ce10ac752d70ab23066bd3477a675
[654]: mailto:tsc@5.6-beta
[655]: https://github.com/Xunnamius/symbiote/commit/4e7509611f72d2c953572dbc67bb51aabf2304d6
[656]: https://github.com/Xunnamius/symbiote/commit/f6515ea793a72cfd42cb6d3f74675b2ae3a9b2e1
[657]: https://github.com/Xunnamius/symbiote/commit/01375f77f74bfaf0b38de5bdd30d162461aa6106
[658]: https://github.com/Xunnamius/symbiote/commit/df6116b1c5ad4c0f7c3152cc254d943a7b9e67e7
[659]: https://github.com/Xunnamius/symbiote/commit/8d7152112e4927f566e048c6b0be7dfce4a6c430
[660]: https://github.com/Xunnamius/symbiote/commit/d9b4b80db15e6104a2a3ab7325996a08a350ea6d
[661]: https://github.com/Xunnamius/symbiote/commit/64b7309fcb28c1214f1edcc8319960c1c94f72b0
[662]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.16.1...@-xun/symbiote@1.17.0
[663]: https://github.com/Xunnamius/symbiote/commit/63354c710f8cfe21d274c7083eecd28da66c57c9
[664]: https://github.com/Xunnamius/symbiote/commit/369d9690614b09b8a2a9efe4321a2786a60e2f20
[665]: https://github.com/Xunnamius/symbiote/commit/609fca8cde508ecdb6c74ff8d1884821afdd5eb3
[666]: https://github.com/Xunnamius/symbiote/commit/e55a88e728a9c4ccbd38648e85328ab563add014
[667]: https://github.com/Xunnamius/symbiote/commit/b56fd666cfcccbc7d941df7afb6fcfc74ec0ae56
[668]: https://github.com/Xunnamius/symbiote/commit/323579d026f46d2d0f70aa44440543eecbc7b4e2
[669]: https://github.com/Xunnamius/symbiote/commit/8609db712c80439ee26966b638b8d6a9cb6e0d59
[670]: https://github.com/Xunnamius/symbiote/commit/52763c5b795e9ee0485e9a20a4cb5264eae0ef3c
[671]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.16.0...@-xun/symbiote@1.16.1
[672]: https://github.com/Xunnamius/symbiote/commit/8f1d25d7356419160a65f4a4dd764a6192df2f26
[673]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.15.0...@-xun/symbiote@1.16.0
[674]: https://github.com/Xunnamius/symbiote/commit/1153f424ae97b339f1ae345269663ddc5d3458d7
[675]: https://github.com/Xunnamius/symbiote/commit/12ee54a21f0004eb568763507540157371aa06be
[676]: https://github.com/Xunnamius/symbiote/commit/0543cff5d6e50a688365bf314837b54342106327
[677]: https://github.com/Xunnamius/symbiote/commit/346b4ac5d27ea045cd037c4987401786f7fa572b
[678]: https://github.com/Xunnamius/symbiote/commit/f42f4ab7c83a05fed253475de7bf2df4ce53d48f
[679]: https://github.com/Xunnamius/symbiote/commit/e596e5bc36b9ed024f8c524cd6d55f15b813bcfc
[680]: https://github.com/Xunnamius/symbiote/commit/d96ae1df1940941fbdf491e0b36c200574179bea
[681]: https://github.com/Xunnamius/symbiote/commit/c9e254a5eece3c3ed51348d28897ed354725643f
[682]: https://github.com/Xunnamius/symbiote/commit/060ef01a19f9a5022dcc855291e04ea6f8013c09
[683]: https://github.com/Xunnamius/symbiote/commit/ea6aafff5d49f6acd8cac65b3c92e6cfd940e4b5
[684]: https://github.com/Xunnamius/symbiote/commit/eb5631b6a316d808bb88928e27fe88ee818d230b
[685]: https://github.com/Xunnamius/symbiote/commit/b72401ad18cead8a6d8571d8e35a6235c23b5381
[686]: https://github.com/Xunnamius/symbiote/commit/7c1e7f14e28518285bc554c730f7eaea933a2e52
[687]: https://github.com/Xunnamius/symbiote/commit/d3301ca5284ba96b750be48f12ecd3c821d27654
[688]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.14.0...@-xun/symbiote@1.15.0
[689]: https://github.com/Xunnamius/symbiote/commit/8554e1a4fd20b72d6b917f92cdb9e084b4086b25
[690]: https://github.com/Xunnamius/symbiote/commit/b66572376dd63858df091755bb1eb184b56f2c7b
[691]: https://github.com/Xunnamius/symbiote/commit/49a3453b25941eecf6a498aa1462aed83f71eaa1
[692]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.13.0...@-xun/symbiote@1.14.0
[693]: https://github.com/Xunnamius/symbiote/commit/a5075305e5d9a3cf5451ca5c156c3ffe307f7018
[694]: https://github.com/Xunnamius/symbiote/commit/489e75a7916d4b77b6a37f6b557cbbd4b7c15e5e
[695]: https://github.com/Xunnamius/symbiote/commit/1b6c72ae8007c801207547a74de598d38b769968
[696]: https://github.com/Xunnamius/symbiote/commit/82c2b0fd8a9bc35bda01c3f48001032bd3ba66e2
[697]: https://github.com/Xunnamius/symbiote/commit/68c55821991d1eaf821dfe603cfee1a9aca83d4f
[698]: https://github.com/Xunnamius/symbiote/commit/2ed43444661b4fba89c20bb5f2a0341faf535a9b
[699]: https://github.com/Xunnamius/symbiote/commit/cafeb73773b2e08137d9c6d7f7432802cc9d3b88
[700]: https://github.com/Xunnamius/symbiote/commit/f08250c17077cff70cdf722d2e9c3b16d3841ebf
[701]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.12.0...@-xun/symbiote@1.13.0
[702]: https://github.com/Xunnamius/symbiote/commit/05e56e787e73d42855fcd3ce10aff7f8f6e6c4c7
[703]: https://github.com/Xunnamius/symbiote/commit/133634118118c7cff04eaaf7a65ead7c80329234
[704]: https://github.com/Xunnamius/symbiote/commit/e4a1e0b3d6a20ae598f5a6feb2cf2b7ba077b6a7
[705]: https://github.com/Xunnamius/symbiote/commit/c721fed5363109fddbf7c8e5e7dc98c33e023e38
[706]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.11.0...@-xun/symbiote@1.12.0
[707]: https://github.com/Xunnamius/symbiote/commit/b64412cd043877da93fa252bad0325bda73ea60c
[708]: https://github.com/Xunnamius/symbiote/commit/feabe67a00aa2c970c3591110ec871f56626998f
[709]: https://github.com/Xunnamius/symbiote/commit/534f3988d4d436fb8136bf60d56498c7b02941ea
[710]: https://github.com/Xunnamius/symbiote/commit/8d4bb6d52de509c2ad8c5c82c8953d51e17c2d85
[711]: https://github.com/Xunnamius/symbiote/commit/7364616ea349761591231a3547bd697ec67ed34b
[712]: https://github.com/Xunnamius/symbiote/commit/2f11281f9d3c07b1a37440cbdbad51deeea7d503
[713]: https://github.com/Xunnamius/symbiote/commit/9348ebba5102d85115a9e443c38032661a9fc0ed
[714]: https://github.com/Xunnamius/symbiote/commit/626ee5aadb360db6d521683dff0f35269a736fc0
[715]: https://github.com/Xunnamius/symbiote/commit/65e433056c8e6800d00202fe709d868d7c4713fb
[716]: https://github.com/Xunnamius/symbiote/commit/ee5cf1030a76a5f0b2793d58a9db52d1ebc8a791
[717]: https://github.com/Xunnamius/symbiote/commit/b9b106aff4ff729fb1f8e70efe295ba058a50cfb
[718]: https://github.com/Xunnamius/symbiote/commit/c1a4b9cb21d1c3e6941d6fbd6108edc694c2d4ed
[719]: https://github.com/Xunnamius/symbiote/commit/5b11c68aebc8099007ffcf50444707165939e061
[720]: https://github.com/Xunnamius/symbiote/commit/99c7b3396ff73868208060410f7430538f6d48d6
[721]: https://github.com/Xunnamius/symbiote/commit/ddd9192c05110fca3ae0d93bac276426932269ef
[722]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.10.1...@-xun/symbiote@1.11.0
[723]: https://github.com/Xunnamius/symbiote/commit/618ce1a1ae9132dbb54dc52c60c96aea17897b82
[724]: https://github.com/Xunnamius/symbiote/commit/d74f099ac798fd0c925ea4aad0b1860b8a8a741f
[725]: https://github.com/Xunnamius/symbiote/commit/0f4dd160eb1181306899031186b4a3c7e64d936c
[726]: https://github.com/Xunnamius/symbiote/commit/2cd56d132e3cd7318744839cbf119b126cc35c98
[727]: https://github.com/Xunnamius/symbiote/commit/9764967b4ca5aab46b32317ddb14bc4e843d8674
[728]: https://github.com/Xunnamius/symbiote/commit/fd86f3f321889f759eda02880982117b5a0aba16
[729]: https://github.com/Xunnamius/symbiote/commit/e295a0270f8ae743771d79966cccb3fdb14f19fd
[730]: https://github.com/Xunnamius/symbiote/commit/d290ba57054479eb873d3cdc785db602432fca09
[731]: https://github.com/Xunnamius/symbiote/commit/4ea8aa453186568651849102a2ade4df2f6c5cee
[732]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.10.0...@-xun/symbiote@1.10.1
[733]: https://github.com/Xunnamius/symbiote/commit/483f03697f1cf01847759fa5c1cf61f5af578a3f
[734]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.9.0...@-xun/symbiote@1.10.0
[735]: https://github.com/Xunnamius/symbiote/commit/813b7580971553cde14b4f278f31af7353384e85
[736]: https://github.com/Xunnamius/symbiote/commit/42af69ecc8f70e6c55eceeda802bce1752f81bfb
[737]: https://github.com/Xunnamius/symbiote/commit/ae46adf477f55440bb18e627ca1674d6d80be7fd
[738]: https://github.com/Xunnamius/symbiote/commit/6575d493c2c0ff291a3bd7bf4b595198c46c0c70
[739]: https://github.com/Xunnamius/symbiote/commit/7d33dfe2ea50a0fbf45641ef997ce2b7d0265aca
[740]: https://github.com/Xunnamius/symbiote/commit/d535b785c9d45c87b29a5fbe5698c6021067570b
[741]: https://github.com/Xunnamius/symbiote/commit/1b65f4667e138907ac8a1b90f06937f5fa4eb1b9
[742]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.8.0...@-xun/symbiote@1.9.0
[743]: https://github.com/Xunnamius/symbiote/commit/f47742b0bca31b054ec83d5b01089715e9925e39
[744]: https://github.com/Xunnamius/symbiote/commit/4f280dc3af5bf633259d80cc8733fae31c903e04
[745]: https://github.com/Xunnamius/symbiote/commit/159d771c90a65e05194cde9b8aec2478be7b97ff
[746]: https://github.com/Xunnamius/symbiote/commit/506bf2dc5317ec891efa5e8eb9ed91235794c9f7
[747]: https://github.com/Xunnamius/symbiote/commit/f7e65c34cd7088fa866530b60de4db3d1f77453c
[748]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.7.0...@-xun/symbiote@1.8.0
[749]: https://github.com/Xunnamius/symbiote/commit/c7b7623d68bde02438cbd8cbc80302079356914d
[750]: https://github.com/Xunnamius/symbiote/commit/847cc63e9965c6c970e63d351fe8388ef666a1b6
[751]: https://github.com/Xunnamius/symbiote/commit/fd210c55c4aff0ad663381a67b8b591dffc2a49c
[752]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.6.0...@-xun/symbiote@1.7.0
[753]: https://github.com/Xunnamius/symbiote/commit/7824c25d1d5db8ab824960b502c41e54a1f9ee03
[754]: https://github.com/Xunnamius/symbiote/commit/b4c296eb75a142ede16da32a997e9999dd8074f3
[755]: https://github.com/Xunnamius/symbiote/commit/005e378059ba0b3181031ff938854f54898e0437
[756]: https://github.com/Xunnamius/symbiote/commit/9e4ae592d211ae39bacdc3f665b3078e69c73062
[757]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.5.0...@-xun/symbiote@1.6.0
[758]: https://github.com/Xunnamius/symbiote/commit/62e673b1ab8679e586b1b4337fe20c537c408fff
[759]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.4.1...@-xun/symbiote@1.5.0
[760]: https://github.com/Xunnamius/symbiote/commit/f15a14d33b9ccaf514a7f6ed0417cb9f5a42c99d
[761]: https://github.com/Xunnamius/symbiote/commit/c775d6e3564c8772dde082d6ef243a56da79c586
[762]: https://github.com/Xunnamius/symbiote/commit/8181e74d4a9020b45fa0182f3f7136b48e4a6721
[763]: https://github.com/Xunnamius/symbiote/commit/17d53c3b83fc6ed799b5b2ab1da5feefe4e37018
[764]: https://github.com/Xunnamius/symbiote/commit/537df70bd21a7b18b1ccc64e83ff6db63440a322
[765]: https://github.com/Xunnamius/symbiote/commit/fd903a41ad88342ebd1896ffe3e46a6b81583711
[766]: https://github.com/Xunnamius/symbiote/commit/4eabfb57d1addf0a2e8994c11b59bc122138b8ce
[767]: https://github.com/Xunnamius/symbiote/commit/8e11d6670bec0c605d781ecec695de4d6af1edd2
[768]: https://github.com/Xunnamius/symbiote/commit/2f5e8e9fc2a1983f0b259c70f7be957f80c8c3c1
[769]: https://github.com/Xunnamius/symbiote/commit/b57a6be3f30c8c0a2692b256135acbd661d0e92b
[770]: https://github.com/Xunnamius/symbiote/commit/8d03799cbd574e0eed0667f1d91827116da6ff15
[771]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.4.0...@-xun/symbiote@1.4.1
[772]: https://github.com/Xunnamius/symbiote/commit/4b94a07feff53f35ff23d5c0456edd00b2e9f180
[773]: https://github.com/Xunnamius/symbiote/commit/a8ddaa595b00d4730cdce60f5340175b3e9afbcc
[774]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.3.0...@-xun/symbiote@1.4.0
[775]: https://github.com/Xunnamius/symbiote/commit/4eeba0093c58c5ae075542203854b4a3add2907a
[776]: https://github.com/Xunnamius/symbiote/commit/99d57864cb024e23115bc3b9c4b1529d2f3d9bf5
[777]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.2.0...@-xun/symbiote@1.3.0
[778]: https://github.com/Xunnamius/symbiote/commit/cf660452df6ac9781bd9b61d4cc225e926cd4e15
[779]: https://github.com/Xunnamius/symbiote/commit/b26a175f616e9c1fa333a0b8858507439449a32e
[780]: https://github.com/Xunnamius/symbiote/commit/b999593e14846c8f87949286cd995e7ef92177a1
[781]: https://github.com/Xunnamius/symbiote/commit/380c055b2920c8b96b65dc89b97b6497f996c452
[782]: https://github.com/Xunnamius/symbiote/commit/f0b3b8ce97a389c4656d37f4745eaedb7d684f42
[783]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.1.0...@-xun/symbiote@1.2.0
[784]: https://github.com/Xunnamius/symbiote/commit/6426d70a844a1c3242d719bd648b2a5caf61a12c
[785]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.0.0...@-xun/symbiote@1.1.0
[786]: https://github.com/Xunnamius/symbiote/commit/ac5a9ba2ac77873619069cecc5a364cd09a74d43
[787]: https://github.com/Xunnamius/symbiote/compare/589fcb01d65182c25a9604c55909b2667bd1b1e0...@-xun/symbiote@1.0.0
[788]: https://github.com/Xunnamius/symbiote/commit/89d81a3e405096de202bc1f6be61ab5d58fc3e1e
[789]: https://github.com/Xunnamius/symbiote/commit/589fcb01d65182c25a9604c55909b2667bd1b1e0
