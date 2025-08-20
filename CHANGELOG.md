# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## @-xun/symbiote[@4.11.0][3] (2025-07-12)

### ✨ Features

- **assets/transformers:** improve renovation support for Next.js projects ([9cc52cc][4])

### 🪄 Fixes

- **assets/transformers:** add "/packages/shared" exception to .vercelignore ([46b7317][5])
- **assets/transformers:** add error.ts to default `src/` output ([6f5bb56][6])
- **assets/transformers:** be more discreet when generating package.json ([ce5b718][7])
- **assets/transformers:** comment out unnecessary tsconfig lib when using Next.js ([27118f9][8])
- **assets/transformers:** ensure .vercelignore works with monorepos ([a86d772][9])
- **assets/transformers:** use .js instead of .cjs for babel config in Next.js ([7470a0e][10])
- **assets/transformers:** use proper command name in MAINTAINING.md ([d380a6f][11])
- **commands/lint:** do not hang when remark has nothing to lint ([78b0b49][12])
- **commands/project-renovate:** ensure both forms of babel config are included when regenerating aliases ([3339128][13])

### ⚙️ Build System

- **deps:** bump @-xun/project from 2.0.9 to 2.0.10 ([cc0ff1a][14])

<br />

### 🏗️ Patch @-xun/symbiote[@4.11.5][15] (2025-08-20)

#### 🪄 Fixes

- **assets/transformers:** add eslint-disable comment to empty export statements ([c9baba6][16])
- **src:** do not throw when regenerating root package from scratch ([8b9b38d][17])

#### ⚙️ Build System

- **deps:** bump @babel/cli from 7.28.0 to 7.28.3 ([4b4e99f][18])
- **deps:** bump @babel/core from 7.28.0 to 7.28.3 ([610be2e][19])
- **deps:** bump @babel/preset-env from 7.28.0 to 7.28.3 ([9468da1][20])
- **deps:** bump @eslint/compat from 1.3.1 to 1.3.2 ([6372a4f][21])
- **deps:** bump @eslint/js from 9.31.0 to 9.33.0 ([ae6f399][22])
- **deps:** bump @types/node from 24.0.14 to 24.3.0 ([06741e3][23])
- **deps:** bump @types/react from 19.1.8 to 19.1.10 ([d87a376][24])
- **deps:** bump @typescript-eslint/parser from 8.37.0 to 8.40.0 ([a702c9d][25])
- **deps:** bump all-contributors-cli from 3.1.1 to 6.26.1 ([b2038e0][26])
- **deps:** bump core-js from 3.44.0 to 3.45.0 ([1d27b58][27])
- **deps:** bump dotenv from 17.2.0 to 17.2.1 ([93bea40][28])
- **deps:** bump dotenv-cli from 8.0.0 to 10.0.0 ([289dca9][29])
- **deps:** bump eslint from 9.31.0 to 9.33.0 ([28c2ed3][30])
- **deps:** bump eslint-plugin-n from 17.21.0 to 17.21.3 ([c576d0f][31])
- **deps:** bump eslint-plugin-unicorn from 59.0.1 to 60.0.0 ([c75d3ab][32])
- **deps:** bump jest from 30.0.4 to 30.0.5 ([79b6353][33])
- **deps:** bump jest-circus from 30.0.4 to 30.0.5 ([219a3cd][34])
- **deps:** bump lint-staged from 16.1.2 to 16.1.5 ([9a31eb6][35])
- **deps:** bump npm-check-updates from 18.0.1 to 18.0.2 ([01805e1][36])
- **deps:** bump tstyche from 4.2.0 to 4.3.0 ([15e4540][37])
- **deps:** bump typedoc from 0.28.7 to 0.28.10 ([24f6fa7][38])
- **deps:** bump typedoc-plugin-markdown from 4.7.0 to 4.8.1 ([aaf3de2][39])
- **deps:** bump typescript from 5.8.3 to 5.9.2 ([50cfce1][40])
- **deps:** bump typescript-eslint from 8.37.0 to 8.40.0 ([3bfaea7][41])

<br />

### 🏗️ Patch @-xun/symbiote[@4.11.4][42] (2025-07-18)

#### 🪄 Fixes

- **assets/transformers:** remove outdated `transformSelectEsmPackagesToCjs` function from jest api ([b9e5996][43])

<br />

### 🏗️ Patch @-xun/symbiote[@4.11.3][44] (2025-07-15)

#### 🪄 Fixes

- **commands/test:** allow more natural usage of `--repeat` ([0557e91][45])

<br />

### 🏗️ Patch @-xun/symbiote[@4.11.2][46] (2025-07-15)

#### 🪄 Fixes

- **commands/test:** switch order of computed args passed to Jest to account for jest-cli's terrible array handling ([043eba5][47])

#### ⚙️ Build System

- **deps:** bump @types/node from 24.0.13 to 24.0.14 ([37a893e][48])
- **deps:** bump tstyche from 4.1.0 to 4.2.0 ([510f2b6][49])

<br />

### 🏗️ Patch @-xun/symbiote[@4.11.1][50] (2025-07-14)

#### 🪄 Fixes

- **assets/transformers:** only add `getNextJsBabelPreset` import to babel config when using Next.js preset ([a36940f][51])
- **assets/transformers:** only create types directory when using --force ([8b42478][52])
- **assets/transformers:** use proper string interpolation in generated debug statements ([a9f6e7b][53])

#### ⚙️ Build System

- **deps:** bump @-xun/types from 1.1.0 to 1.2.0 ([4928389][54])
- **deps:** bump @typescript-eslint/parser from 8.36.0 to 8.37.0 ([4bc2cbb][55])
- **deps:** bump typescript-eslint from 8.36.0 to 8.37.0 ([72fc538][56])

<br />

## @-xun/symbiote[@4.10.0][57] (2025-07-12)

### ✨ Features

- **assets/transformers:** improve debugging output for `WebpackCustomSchemeAliasPlugin` ([b62abf3][58])

<br />

## @-xun/symbiote[@4.9.0][59] (2025-07-12)

### ✨ Features

- **assets/transformers:** further improve DX around Next.js and Webpack config imports ([7334a50][60])

### 🪄 Fixes

- **assets/transformers:** use import.meta.dirname over \_\_dirname in mjs context ([6282891][61])
- **assets/transformers:** use looser type for `projectRoot` in Next.js `moduleExport` ([7f5d05d][62])
- **assets/transformers:** use proper namespace for webpack debugger ([da2501b][63])

<br />

## @-xun/symbiote[@4.8.0][64] (2025-07-12)

### ✨ Features

- **assets/transformers:** improve DX around Next.js and Webpack config imports ([a3d081a][65])

<br />

## @-xun/symbiote[@4.7.0][66] (2025-07-11)

### ✨ Features

- **assets/transformers:** export `WebpackCustomSchemeAliasPlugin` ([6f7857c][67])
- **assets/transformers:** improve Next.js and webpack transformers ([7400c4a][68])

### 🪄 Fixes

- **assets/transformers:** add more known origins to `allowedDevOrigins` ([e923ace][69])

### ⚙️ Build System

- **deps:** bump @eslint/js from 9.30.1 to 9.31.0 ([3283c19][70])
- **deps:** bump @types/node from 24.0.12 to 24.0.13 ([7282711][71])
- **deps:** bump eslint from 9.30.1 to 9.31.0 ([b70ffe6][72])

<br />

## @-xun/symbiote[@4.6.0][73] (2025-06-30)

### ✨ Features

- Land initial vercel, Next.js, and wrangler transformer implementations ([ce4bcc5][74])

### 🪄 Fixes

- **assets/transformers:** ensure `sideEffects` is included in package.json for libraries ([ba4184a][75])

### ⚙️ Build System

- **deps:** bump @-xun/jest from 2.2.4 to 2.2.5 ([0fb5c0c][76])
- **deps:** bump @-xun/project from 2.0.4 to 2.0.5 ([5944d48][77])
- **deps:** bump @-xun/project from 2.0.5 to 2.0.6 ([9013d97][78])
- **deps:** bump @-xun/project from 2.0.6 to 2.0.7 ([649cfc3][79])
- **deps:** bump @types/node from 24.0.6 to 24.0.7 ([80b674b][80])
- **deps:** bump typedoc from 0.28.6 to 0.28.7 ([ae48c67][81])

<br />

### 🏗️ Patch @-xun/symbiote[@4.6.5][82] (2025-07-10)

#### 🪄 Fixes

- **assets/transformers:** improve "ignores" configuration across assets ([039d38c][83])

<br />

### 🏗️ Patch @-xun/symbiote[@4.6.4][84] (2025-07-10)

#### ⚙️ Build System

- **deps:** bump @-xun/cli from 2.0.5 to 2.0.7 ([ee6c7a5][85])
- **deps:** bump rejoinder from 2.0.1 to 2.0.2 ([bf465f9][86])
- **deps:** bump rejoinder-github-actions from 2.0.0 to 2.0.1 ([a220d9f][87])

<br />

### 🏗️ Patch @-xun/symbiote[@4.6.3][88] (2025-07-10)

#### ⚙️ Build System

- **assets/transformers:** bump `CORE_JS_LIBRARY_VERSION` to 3.44 ([98194a3][89])
- **deps:** bump @-xun/cli from 2.0.4 to 2.0.5 ([fc17293][90])
- **deps:** bump @-xun/error from 1.1.4 to 1.1.6 ([ad59c70][91])
- **deps:** bump @-xun/jest from 2.2.5 to 2.2.7 ([124efda][92])
- **deps:** bump @-xun/project from 2.0.8 to 2.0.9 ([a74a381][93])
- **deps:** bump @types/node from 24.0.10 to 24.0.12 ([b1e037c][94])
- **deps:** bump @typescript-eslint/parser from 8.35.1 to 8.36.0 ([358852b][95])
- **deps:** bump bidirectional-resolve from 2.0.1 to 2.0.2 ([d257e72][96])
- **deps:** bump core-js from 3.43.0 to 3.44.0 ([dab0014][97])
- **deps:** bump dotenv from 17.0.1 to 17.2.0 ([f1bb7d7][98])
- **deps:** bump typescript-eslint from 8.35.1 to 8.36.0 ([62b2d23][99])
- **package:** integrate @-xun/error dependency ([402f243][100])
- **package:** remove unused dependency ([f325201][101])

<br />

### 🏗️ Patch @-xun/symbiote[@4.6.2][102] (2025-07-07)

#### 🪄 Fixes

- **src:** address [#9021<img alt="external reference" title="(this issue is from a different repository)" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==" />][103] ([632b628][104])

#### ⚙️ Build System

- **deps:** bump @babel/cli from 7.27.2 to 7.28.0 ([7c37c2b][105])
- **deps:** bump @babel/core from 7.27.7 to 7.28.0 ([6a918de][106])
- **deps:** bump @babel/eslint-parser from 7.27.5 to 7.28.0 ([bdec01a][107])
- **deps:** bump @babel/preset-env from 7.27.2 to 7.28.0 ([50fce97][108])
- **deps:** bump @eslint/js from 9.30.0 to 9.30.1 ([ab551ef][109])
- **deps:** bump @types/node from 24.0.7 to 24.0.10 ([5a0c48e][110])
- **deps:** bump @typescript-eslint/parser from 8.35.0 to 8.35.1 ([847991c][111])
- **deps:** bump dotenv from 17.0.0 to 17.0.1 ([6785d4c][112])
- **deps:** bump eslint from 9.30.0 to 9.30.1 ([35a2a53][113])
- **deps:** bump eslint-plugin-n from 17.20.0 to 17.21.0 ([2e21575][114])
- **deps:** bump globals from 16.2.0 to 16.3.0 ([c8389d4][115])
- **deps:** bump jest from 30.0.3 to 30.0.4 ([abe8c57][116])
- **deps:** bump jest-circus from 30.0.3 to 30.0.4 ([f4af5bd][117])
- **deps:** bump sort-package-json from 3.3.1 to 3.4.0 ([b27e80c][118])
- **deps:** bump typescript-eslint from 8.35.0 to 8.35.1 ([cacbf36][119])

<br />

### 🏗️ Patch @-xun/symbiote[@4.6.1][120] (2025-06-30)

#### 🪄 Fixes

- **assets/transformers:** only create .vercelignore for next.js preset ([091b975][121])

#### ⚙️ Build System

- **deps:** bump @-xun/project from 2.0.7 to 2.0.8 ([6ae527e][122])

<br />

## @-xun/symbiote[@4.5.0][123] (2025-06-20)

### ✨ Features

- **assets/transformers:** ignore .next and .wrangler in toolchains by default ([830a979][124])

### 🪄 Fixes

- **commands/deploy:** add chmod permission reduction to final step ([505f48c][125])

### ⚙️ Build System

- **deps:** bump @types/jest from 29.5.14 to 30.0.0 ([c6f1070][126])
- **deps:** bump @types/node from 24.0.1 to 24.0.3 ([292021f][127])
- **deps:** bump @typescript-eslint/parser from 8.34.0 to 8.34.1 ([fba8c38][128])
- **deps:** bump eslint-plugin-jest from 28.13.5 to 29.0.1 ([d28ac8d][129])
- **deps:** bump jest from 30.0.0 to 30.0.2 ([b9cafd2][130])
- **deps:** bump jest-circus from 30.0.0 to 30.0.2 ([e330384][131])
- **deps:** bump lint-staged from 16.1.1 to 16.1.2 ([479f3d1][132])
- **deps:** bump tstyche from 4.0.1 to 4.0.2 ([84a11fd][133])
- **deps:** bump typescript-eslint from 8.34.0 to 8.34.1 ([e6756a7][134])

<br />

### 🏗️ Patch @-xun/symbiote[@4.5.6][135] (2025-06-28)

#### 🪄 Fixes

- **assets/transformers:** move todo comment out of eslint config ([6c12fe8][136])

<br />

### 🏗️ Patch @-xun/symbiote[@4.5.5][137] (2025-06-28)

#### 🪄 Fixes

- **commands/dev:** use proper next.js invocation ([6f50d53][138])

<br />

### 🏗️ Patch @-xun/symbiote[@4.5.4][139] (2025-06-28)

#### 🪄 Fixes

- **assets/transformers:** ignore .dev.vars\* files ([c4d8ccc][140])

#### ⚙️ Build System

- **deps:** bump @babel/core from 7.27.4 to 7.27.7 ([955647a][141])
- **deps:** bump @eslint/compat from 1.3.0 to 1.3.1 ([a59042b][142])
- **deps:** bump @eslint/js from 9.29.0 to 9.30.0 ([8456899][143])
- **deps:** bump @types/node from 24.0.3 to 24.0.6 ([44f23d1][144])
- **deps:** bump @typescript-eslint/parser from 8.34.1 to 8.35.0 ([cb874b7][145])
- **deps:** bump dotenv from 16.5.0 to 17.0.0 ([16a2a30][146])
- **deps:** bump eslint from 9.29.0 to 9.30.0 ([aaa5786][147])
- **deps:** bump eslint-import-resolver-typescript from 4.4.3 to 4.4.4 ([22682ca][148])
- **deps:** bump jest from 30.0.2 to 30.0.3 ([460d8fa][149])
- **deps:** bump jest-circus from 30.0.2 to 30.0.3 ([3311bd9][150])
- **deps:** bump prettier from 3.5.3 to 3.6.2 ([7df6d8d][151])
- **deps:** bump sort-package-json from 3.2.1 to 3.3.1 ([3e87301][152])
- **deps:** bump tstyche from 4.0.2 to 4.1.0 ([972fa3b][153])
- **deps:** bump typedoc from 0.28.5 to 0.28.6 ([9b104b4][154])
- **deps:** bump typedoc-plugin-markdown from 4.6.4 to 4.7.0 ([2deffe5][155])
- **deps:** bump typescript-eslint from 8.34.1 to 8.35.0 ([be1311c][156])
- **package:** use non-experimental eslint-plugin-import version ([feee9f1][157])

<br />

### 🏗️ Patch @-xun/symbiote[@4.5.3][158] (2025-06-20)

#### 🪄 Fixes

- **assets/transformers:** do not treat .d.ts files as directories in eslint ignores ([090a785][159])

<br />

### 🏗️ Patch @-xun/symbiote[@4.5.2][160] (2025-06-20)

#### 🪄 Fixes

- **assets/transformers:** add missing .vscode/browser-debugger-profile to eslint ignores ([5258a5e][161])

<br />

### 🏗️ Patch @-xun/symbiote[@4.5.1][162] (2025-06-20)

#### 🪄 Fixes

- **assets/transformers:** ignore browser-debugger-profile and turbo output in ignore files ([14881c6][163])
- **assets/transformers:** ignore framework d.ts files in ignore files ([5aec575][164])
- **assets/transformers:** remove erroneous comment in example ([112ec90][165])

<br />

## @-xun/symbiote[@4.4.0][166] (2025-06-13)

### ✨ Features

- **commands/deploy:** allow specifying chown target user and group via `--user-group` option ([de44cf3][167])

### ⚙️ Build System

- **deps:** bump eslint-plugin-jest from 28.13.3 to 28.13.5 ([90e189d][168])

<br />

### 🏗️ Patch @-xun/symbiote[@4.4.4][169] (2025-06-14)

#### 🪄 Fixes

- **src:** do not break react apps with "sideEffects:true" in package.json ([c92ab68][170])

#### ⚙️ Build System

- **deps:** bump @-xun/cli from 2.0.3 to 2.0.4 ([0dd55be][171])
- **deps:** bump @-xun/jest from 2.2.1 to 2.2.2 ([cdefd67][172])
- **deps:** bump @-xun/jest from 2.2.2 to 2.2.4 ([42690e3][173])
- **deps:** bump @-xun/project from 2.0.2 to 2.0.3 ([7cd0a3e][174])
- **deps:** bump @-xun/project from 2.0.3 to 2.0.4 ([7983d57][175])
- **deps:** bump @eslint/js from 9.28.0 to 9.29.0 ([7a145a8][176])
- **deps:** bump bidirectional-resolve from 2.0.0 to 2.0.1 ([bb96942][177])
- **deps:** bump eslint from 9.28.0 to 9.29.0 ([7e606c8][178])
- **deps:** bump lint-staged from 16.1.0 to 16.1.1 ([4c1f90f][179])
- **deps:** bump rejoinder from 1.2.5 to 2.0.0 ([c18026e][180])
- **deps:** bump rejoinder from 2.0.0 to 2.0.1 ([6098a01][181])
- **deps:** bump rejoinder-github-actions from 1.0.3 to 2.0.0 ([5a24b3b][182])
- **deps:** bump tstyche from 4.0.0 to 4.0.1 ([dddfae6][183])

<br />

### 🏗️ Patch @-xun/symbiote[@4.4.3][184] (2025-06-13)

#### 🪄 Fixes

- **assets/transformers:** remove alias transformer from "production" and "production-browser" NODE\_ENV in babel ([913be2c][185])
- **assets:** use more resilient merging algorithm with `deepMergeConfig` ([cdafea2][186])

<br />

### 🏗️ Patch @-xun/symbiote[@4.4.2][187] (2025-06-13)

#### 🪄 Fixes

- **assets/transformers:** allow "production" and "production-browser" NODE\_ENV in babel ([1d1c844][188])

<br />

### 🏗️ Patch @-xun/symbiote[@4.4.1][189] (2025-06-13)

#### 🪄 Fixes

- **commands/deploy:** warn user that --to-path directory will be recursively removed ([7fbd108][190])

<br />

## @-xun/symbiote[@4.3.0][191] (2025-06-13)

### ✨ Features

- **assets/transformers:** export `toCommaSeparatedExtensionList` from eslint config ([3c033a0][192])

### 🪄 Fixes

- **assets/transformers:** allow "prop" and "props" variable abbreviations ([901efd6][193])
- **assets/transformers:** ensure babel considers production-browser env wrt building intermediates ([04a3b2d][194])
- **assets/transformers:** make flaky typescript-eslint restrict-plus-operand check into warning ([df8b5ef][195])
- **assets/transformers:** use proper name for tailwind.config.ts ([3a73578][196])

<br />

### 🏗️ Patch @-xun/symbiote[@4.3.1][197] (2025-06-13)

#### 🪄 Fixes

- **assets/transformers:** allow "ref" and "refs" variable abbreviations ([6ed00ca][198])

#### ⚙️ Build System

- **deps:** bump eslint-plugin-n from 17.19.0 to 17.20.0 ([b98a9ba][199])
- **deps:** bump glob from 11.0.2 to 11.0.3 ([aceacf2][200])

<br />

## @-xun/symbiote[@4.2.0][201] (2025-06-01)

### ✨ Features

- **assets/templates:** add a couple package.json script checks to husky pre-push hook ([167e0f9][202])

<br />

### 🏗️ Patch @-xun/symbiote[@4.2.9][203] (2025-06-12)

#### 🪄 Fixes

- **commands/project-prepare:** prevent globally-installed symbiote from attempting to run during prepare step of "npm install" ([a1f5561][204])

<br />

### 🏗️ Patch @-xun/symbiote[@4.2.8][205] (2025-06-12)

#### 🪄 Fixes

- **assets/transformers:** disable "jest/prefer-ending-with-an-expect" eslint rule ([ffa2219][206])
- **assets:** ensure `contextWithCwdPackage` receives proper `toPackageAbsolutePath` function ([86d9260][207])

#### ⚙️ Build System

- **deps:** bump @-xun/jest from 2.2.0 to 2.2.1 ([a058f5c][208])
- **deps:** bump @arethetypeswrong/cli from 0.18.1 to 0.18.2 ([b0fafb0][209])
- **deps:** bump @eslint/compat from 1.2.9 to 1.3.0 ([598c1a2][210])
- **deps:** bump @types/node from 22.15.29 to 24.0.1 ([2f8b740][211])
- **deps:** bump @types/react from 19.1.6 to 19.1.8 ([a23c165][212])
- **deps:** bump @typescript-eslint/parser from 8.33.1 to 8.34.0 ([366bb21][213])
- **deps:** bump core-js from 3.42.0 to 3.43.0 ([6aadba9][214])
- **deps:** bump eslint-import-resolver-typescript from 4.4.2 to 4.4.3 ([1bf2408][215])
- **deps:** bump eslint-plugin-jest from 28.12.0 to 28.13.3 ([f693afa][216])
- **deps:** bump jest from 30.0.0 to 30.0.0 ([d966bfc][217])
- **deps:** bump jest-circus from 30.0.0 to 30.0.0 ([db07632][218])
- **deps:** bump jest-extended from 5.0.3 to 6.0.0 ([9c93f9a][219])
- **deps:** bump typescript-eslint from 8.33.1 to 8.34.0 ([8aa9890][220])

<br />

### 🏗️ Patch @-xun/symbiote[@4.2.7][221] (2025-06-05)

#### 🪄 Fixes

- **assets/transformers:** enable react dev mode on non-prod envs ([c04aab1][222])

#### ⚙️ Build System

- **deps:** bump @-xun/jest from 2.1.3 to 2.2.0 ([15edf41][223])
- **deps:** bump @babel/eslint-parser from 7.27.1 to 7.27.5 ([86f2c94][224])

<br />

### 🏗️ Patch @-xun/symbiote[@4.2.6][225] (2025-06-03)

#### ⚙️ Build System

- **deps:** bump @-xun/jest from 2.1.1 to 2.1.3 ([f0f69b7][226])

<br />

### 🏗️ Patch @-xun/symbiote[@4.2.5][227] (2025-06-02)

#### 🪄 Fixes

- **types:** update types for tstyche\@4 ([450f56a][228])

#### ⚙️ Build System

- **deps:** bump @typescript-eslint/parser from 8.33.0 to 8.33.1 ([46529ad][229])
- **deps:** bump eslint-plugin-n from 17.18.0 to 17.19.0 ([3961211][230])
- **deps:** bump tstyche from 3.5.0 to 4.0.0 ([f0c8437][231])
- **deps:** bump typescript-eslint from 8.33.0 to 8.33.1 ([ba5b5af][232])

<br />

### 🏗️ Patch @-xun/symbiote[@4.2.4][233] (2025-06-02)

#### 🪄 Fixes

- **assets/transformers:** expand `allowedFunctionCalls` to additionally accept `useMockDateNow` ([1ec1b7b][234])
- **commands/project-renovate:** allow overriding --hush=true via cli ([98625aa][235])
- **commands/project-renovate:** ensure npm-check-updates never offers to install updates ([1709d32][236])

<br />

### 🏗️ Patch @-xun/symbiote[@4.2.3][237] (2025-06-02)

#### 🪄 Fixes

- **assets/transformers:** expand `allowedFunctionCalls` exceptions in eslint config ([67a8f34][238])
- **assets/transformers:** give example of re-enabling explicit-exports-references in babel config ([2fa5e79][239])

#### ⚙️ Build System

- **deps:** bump typedoc-plugin-markdown from 4.6.3 to 4.6.4 ([4c52692][240])

<br />

### 🏗️ Patch @-xun/symbiote[@4.2.2][241] (2025-06-01)

#### 🪄 Fixes

- **commands/release:** also notify the user that they can use xpipeline commands when re-initializing repo ([62ec6fd][242])

<br />

### 🏗️ Patch @-xun/symbiote[@4.2.1][243] (2025-06-01)

#### 🪄 Fixes

- **assets/transformers:** use import hinting sort order for paths in tsconfig.json ([cdd5bb0][244])
- **commands/project-renovate:** ensure husky commit-msg hook always runs all unit tests across repo by default ([8b3f7ed][245])

#### ⚙️ Build System

- **deps:** bump @-xun/jest from 2.0.0 to 2.1.0 ([265eba7][246])
- **deps:** bump @-xun/jest from 2.1.0 to 2.1.1 ([15a924f][247])
- **deps:** bump @-xun/project from 2.0.0 to 2.0.1 ([038cd5d][248])
- **deps:** bump @-xun/project from 2.0.1 to 2.0.2 ([94dc6b2][249])

<br />

## @-xun/symbiote[@4.1.0][250] (2025-05-30)

### ✨ Features

- Significantly improve support for building and testing transpilation intermediates ([248cd41][251])

### 🪄 Fixes

- **assets/templates:** remove unused launch configurations ([d9e7c79][252])
- **assets/transformers:** ensure eslint aliases are always generated in import order ([d82bcd7][253])
- **commands/build-distributables:** do not set test-related symbiote environment variables ([5dcbce0][254])
- **commands/test:** set jest rootDir to transpilation output directory when generating intermediates ([93a6605][255])

### ⚙️ Build System

- **deps:** bump @-xun/cli from 2.0.0 to 2.0.1 ([c000bfb][256])
- **deps:** bump @-xun/cli from 2.0.1 to 2.0.2 ([9d9933b][257])
- **deps:** bump @-xun/jest from 1.1.11 to 2.0.0 ([c12eee0][258])
- **deps:** bump @-xun/project from 1.0.5 to 2.0.0 ([0553aa1][259])
- **deps:** bump @types/node from 22.15.23 to 22.15.27 ([f3ad037][260])
- **deps:** bump bidirectional-resolve from 1.0.4 to 2.0.0 ([7d003ce][261])
- **deps:** bump eslint-plugin-jest from 28.11.1 to 28.12.0 ([2032434][262])

<br />

### 🏗️ Patch @-xun/symbiote[@4.1.1][263] (2025-05-31)

#### 🪄 Fixes

- **assets/templates:** align monorepo root readme and package readme topmatter ([b6645a7][264])

#### ⚙️ Build System

- **deps:** bump @-xun/cli from 2.0.2 to 2.0.3 ([3aa599d][265])
- **deps:** bump @-xun/fs from 1.0.0 to 2.0.0 ([61eb0c9][266])
- **deps:** bump @-xun/js from 1.1.1 to 2.0.0 ([ed66b74][267])
- **deps:** bump @babel/core from 7.27.3 to 7.27.4 ([4c08a36][268])
- **deps:** bump @eslint/js from 9.27.0 to 9.28.0 ([97b7a80][269])
- **deps:** bump @types/node from 22.15.27 to 22.15.29 ([c5ca5f3][270])
- **deps:** bump eslint from 9.27.0 to 9.28.0 ([00c89c0][271])
- **deps:** bump eslint-import-resolver-typescript from 4.4.1 to 4.4.2 ([f529ba3][272])

<br />

## @-xun/symbiote[@4.0.0][273] (2025-05-28)

### 💥 BREAKING CHANGES 💥

- Minimum supported node version is now 20.18.0

### ⚙️ Build System

- **assets/transformers:** bump internal core-js library version to 3.42 ([af582b3][274])
- **deps:** bump @-xun/cli from 1.3.2 to 2.0.0 ([3795c87][275])
- **deps:** bump eslint-plugin-jest from 28.11.0 to 28.11.1 ([4c962f6][276])
- **package:** drop support for node\@18 ([ab2a0e2][277])

<br />

## @-xun/symbiote[@3.7.0][278] (2025-05-27)

### ✨ Features

- **assets/transformers:** add production-esm, production-browser (aliased to production) to babel envs ([e397219][279])
- **commands/distributables:** refer to `package.json::type` for --module-system default value ([3df79ef][280])

### 🪄 Fixes

- **assets/templates:** do not error when grep returns no results in husky pre-push hook ([3c956cd][281])
- **assets/templates:** handle filenames with spaces in husky pre-push hook ([8fba702][282])
- **assets/transformers:** use less emojis in automatic release comments ([286607c][283])
- **commands/build-distributables:** ensure output JS files only ever have .js ext regardless of module system ([0294392][284])
- **src:** forgive extensionless specifiers when rewriting tsc output ([d2131cb][285])

### ⚙️ Build System

- **deps:** bump @arethetypeswrong/cli from 0.17.4 to 0.18.1 ([70de870][286])
- **deps:** bump @babel/cli from 7.26.4 to 7.27.2 ([0b6dd7d][287])
- **deps:** bump @babel/core from 7.26.10 to 7.27.1 ([67e0d91][288])
- **deps:** bump @babel/core from 7.27.1 to 7.27.3 ([4d7efb3][289])
- **deps:** bump @babel/eslint-parser from 7.26.10 to 7.27.1 ([d9784f1][290])
- **deps:** bump @babel/plugin-proposal-export-default-from from 7.25.9 to 7.27.1 ([0dc52d4][291])
- **deps:** bump @babel/plugin-syntax-typescript from 7.25.9 to 7.27.1 ([a60233f][292])
- **deps:** bump @babel/preset-env from 7.26.9 to 7.27.2 ([5b47ed2][293])
- **deps:** bump @babel/preset-react from 7.26.3 to 7.27.1 ([41d1ef4][294])
- **deps:** bump @babel/preset-typescript from 7.26.0 to 7.27.1 ([c956ea8][295])
- **deps:** bump @commitlint/cli from 19.8.0 to 19.8.1 ([39d43ef][296])
- **deps:** bump @commitlint/config-conventional from 19.8.0 to 19.8.1 ([4b74b55][297])
- **deps:** bump @eslint/compat from 1.2.7 to 1.2.9 ([5382c4b][298])
- **deps:** bump @eslint/eslintrc from 3.3.0 to 3.3.1 ([a0fd463][299])
- **deps:** bump @eslint/js from 9.22.0 to 9.27.0 ([56bbaf3][300])
- **deps:** bump @octokit/plugin-retry from 7.2.0 to 8.0.1 ([ba3cb38][301])
- **deps:** bump @octokit/plugin-throttling from 9.6.0 to 11.0.1 ([765a78e][302])
- **deps:** bump @octokit/rest from 21.1.1 to 22.0.0 ([17247f7][303])
- **deps:** bump @semantic-release/exec from 7.0.3 to 7.1.0 ([d550327][304])
- **deps:** bump @types/node from 22.13.10 to 22.15.21 ([77bad6d][305])
- **deps:** bump @types/node from 22.15.21 to 22.15.23 ([9242a42][306])
- **deps:** bump @types/react from 19.0.12 to 19.1.5 ([cf64b72][307])
- **deps:** bump @types/react from 19.1.5 to 19.1.6 ([12a1d80][308])
- **deps:** bump @types/semver from 7.5.8 to 7.7.0 ([1a93537][309])
- **deps:** bump @typescript-eslint/parser from 8.27.0 to 8.32.1 ([d0ef6e6][310])
- **deps:** bump @typescript-eslint/parser from 8.32.1 to 8.33.0 ([e7604b8][311])
- **deps:** bump core-js from 3.41.0 to 3.42.0 ([0c201f6][312])
- **deps:** bump dotenv from 16.4.7 to 16.5.0 ([2fb9a7f][313])
- **deps:** bump eslint from 9.22.0 to 9.27.0 ([b0d6f0a][314])
- **deps:** bump eslint-import-resolver-typescript from 4.2.2 to 4.4.1 ([a4d2d0a][315])
- **deps:** bump eslint-plugin-n from 17.16.2 to 17.18.0 ([767711e][316])
- **deps:** bump eslint-plugin-unicorn from 57.0.0 to 59.0.1 ([e76583f][317])
- **deps:** bump glob from 11.0.1 to 11.0.2 ([500d282][318])
- **deps:** bump globals from 16.0.0 to 16.2.0 ([3a75faa][319])
- **deps:** bump jest from 30.0.0-alpha.6 to 30.0.0-beta.4 ([9345daa][320])
- **deps:** bump jest-circus from 30.0.0 to 30.0.0 ([d27dabb][321])
- **deps:** bump jest-extended from 4.0.2 to 5.0.3 ([81cccf6][322])
- **deps:** bump lint-staged from 15.5.0 to 16.0.0 ([d7f46cb][323])
- **deps:** bump lint-staged from 16.0.0 to 16.1.0 ([7e0efd2][324])
- **deps:** bump npm-check-updates from 17.1.15 to 18.0.1 ([498c82d][325])
- **deps:** bump remark-lint-fenced-code-flag from 4.1.1 to 4.2.0 ([d49cbd0][326])
- **deps:** bump remark-lint-no-undefined-references from 5.0.1 to 5.0.2 ([11582b4][327])
- **deps:** bump remark-lint-no-unused-definitions from 4.0.1 to 4.0.2 ([581afdc][328])
- **deps:** bump semver from 7.7.1 to 7.7.2 ([9689e75][329])
- **deps:** bump sort-package-json from 3.0.0 to 3.2.1 ([b620574][330])
- **deps:** bump type-fest from 4.37.0 to 4.41.0 ([bcf651e][331])
- **deps:** bump typedoc from 0.28.1 to 0.28.5 ([5f44d76][332])
- **deps:** bump typedoc-plugin-markdown from 4.5.2 to 4.6.3 ([1fa628c][333])
- **deps:** bump typescript from 5.8.2 to 5.8.3 ([5b25a89][334])
- **deps:** bump typescript-eslint from 8.27.0 to 8.32.1 ([7c5328c][335])
- **deps:** bump typescript-eslint from 8.32.1 to 8.33.0 ([63cff63][336])

<br />

## @-xun/symbiote[@3.6.0][337] (2025-03-21)

### ✨ Features

- **commands/project-renovate:** commit changes to package.json when running `--synchronize-interdependencies` ([2a4f9c1][338])

### 🪄 Fixes

- **commands/test:** use proper descriptions for --test ([17576f5][339])

### ⚙️ Build System

- **deps:** bump @-xun/cli from 1.3.1 to 1.3.2 ([dac06fc][340])
- **deps:** bump @typescript-eslint/parser from 8.26.1 to 8.27.0 ([b9f7fa2][341])
- **deps:** bump typedoc from 0.28.0 to 0.28.1 ([f069aa0][342])
- **deps:** bump typescript-eslint from 8.26.1 to 8.27.0 ([ed1a5ec][343])

<br />

## @-xun/symbiote[@3.5.0][344] (2025-03-18)

### ✨ Features

- **commands/test:** allow specifying `--runtime` ([83fb0e7][345])

### 🪄 Fixes

- **assets/transformers:** use correct type arg for e2e tests in package.json scripts ([2ab9d64][346])
- **commands/test:** ensure inclusion of end-to-end tests in "all-local" and "e2e-local" types ([6569d9b][347])
- **src:** update `safeDeepClone` taken from BFE ([ea142b3][348])

### ⚙️ Build System

- **deps:** bump @-xun/cli from 1.2.0 to 1.3.0 ([8c5201e][349])
- **deps:** bump @types/react from 19.0.10 to 19.0.11 ([4991569][350])
- **deps:** bump eslint-import-resolver-typescript from 3.9.0 to 4.0.0 ([47f9bd9][351])
- **deps:** bump eslint-import-resolver-typescript from 4.0.0 to 4.1.0 ([89282ed][352])
- **deps:** bump eslint-import-resolver-typescript from 4.1.0 to 4.2.0 ([1bfdd73][353])
- **deps:** bump typedoc from 0.27.9 to 0.28.0 ([bd9df4f][354])
- **deps:** bump typedoc-plugin-markdown from 4.4.2 to 4.5.0 ([a69e0d6][355])

<br />

### 🏗️ Patch @-xun/symbiote[@3.5.2][356] (2025-03-19)

#### ⚙️ Build System

- **deps:** bump @-xun/jest from 1.1.10 to 1.1.11 ([4827ca5][357])
- **deps:** bump @-xun/project from 1.0.4 to 1.0.5 ([00dd29f][358])
- **deps:** bump bidirectional-resolve from 1.0.3 to 1.0.4 ([af6a654][359])

<br />

### 🏗️ Patch @-xun/symbiote[@3.5.1][360] (2025-03-19)

#### 🪄 Fixes

- Retire bfe cross-talk workarounds since issue was fixed upstream ([11544aa][361])
- Retire internal `safeDeepClone` implementation in favor of @-xun/js ([b039d22][362])
- **src:** ensure `context.projectMetadata` is never cloned by BFE ([1334019][363])

#### ⚙️ Build System

- **deps:** bump @-xun/cli from 1.3.0 to 1.3.1 ([45de809][364])
- **deps:** bump @-xun/js from 1.0.0 to 1.1.1 ([2ddaf7f][365])
- **deps:** bump @octokit/plugin-retry from 7.1.4 to 7.2.0 ([8350834][366])
- **deps:** bump @octokit/plugin-throttling from 9.4.0 to 9.6.0 ([b84c554][367])
- **deps:** bump @types/react from 19.0.11 to 19.0.12 ([1fa3472][368])
- **deps:** bump eslint-import-resolver-typescript from 4.2.0 to 4.2.2 ([42dbf8b][369])
- **deps:** bump typedoc-plugin-markdown from 4.5.0 to 4.5.2 ([d7fefe7][370])

<br />

## @-xun/symbiote[@3.4.0][371] (2025-03-15)

### ✨ Features

- **assets/transformers:** use custom release success comments and labels ([36c11ee][372])
- **commands/build-distributables:** implement support for `--skip-output-type-resolution-checks` ([8aba189][373])
- **commands/project-release:** repair node\_modules (via `npm run prepare`) in post-release step ([f819ed3][374])
- **commands/test:** include e2e tests in "all" and "all-local" types; make e2e mode available to tests ([2046f8c][375])

### 🪄 Fixes

- **assets/transformers:** allow more control over which docs/ contents are ignored by prettier etc ([98e7a52][376])
- **assets/transformers:** ensure `docs/` directories in subroot packages are ignored by prettier default ([4bd2e70][377])
- **assets/transformers:** exclude "transform-dynamic-import" from `@babel/preset-env` in test environments ([6cc0adb][378])
- **assets/transformers:** force lint-staged (via husky) to only use global config file ([a5dc6e8][379])
- **assets/transformers:** mark transitive deps from @-xun/jest as not-invalid ([ccfdfcf][380])
- **assets/transformers:** mirror core-js polyfill config across test and production transpilation targets ([03bfdc1][381])
- **assets/transformers:** update babel `CORE_JS_LIBRARY_VERSION` to 3.41 ([3314761][382])
- **commands/project-topology:** enable `shouldOutputResult` when running lint/test topologically ([c47a366][383])
- **src:** allow any core-js version in build target so long as it is within range of symbiote's own core-js dependency in package.json ([b1f5ecf][384])

### ⚙️ Build System

- **deps:** bump @-xun/cli from 1.1.2 to 1.2.0 ([7713d70][385])
- **deps:** bump @-xun/jest from 1.1.6 to 1.1.10 ([b80ff75][386])
- **deps:** bump @-xun/project from 1.0.3 to 1.0.4 ([10e9f59][387])
- **deps:** bump @-xun/run from 1.0.3 to 1.1.0 ([4a641f3][388])
- **deps:** bump @babel/core from 7.26.9 to 7.26.10 ([720388e][389])
- **deps:** bump @babel/eslint-parser from 7.26.8 to 7.26.10 ([fad771f][390])
- **deps:** bump @commitlint/cli from 19.7.1 to 19.8.0 ([4500335][391])
- **deps:** bump @commitlint/config-conventional from 19.7.1 to 19.8.0 ([8914e93][392])
- **deps:** bump @eslint/js from 9.21.0 to 9.22.0 ([e23abce][393])
- **deps:** bump @types/eslint\_\_eslintrc from 2.1.2 to 3.3.0 ([a2437c5][394])
- **deps:** bump @types/node from 22.13.5 to 22.13.8 ([79e1d92][395])
- **deps:** bump @types/node from 22.13.8 to 22.13.10 ([c40758f][396])
- **deps:** bump @typescript-eslint/parser from 8.25.0 to 8.26.1 ([7f27465][397])
- **deps:** bump bidirectional-resolve from 1.0.2 to 1.0.3 ([f81c318][398])
- **deps:** bump core-js from 3.40.0 to 3.41.0 ([216f871][399])
- **deps:** bump eslint from 9.21.0 to 9.22.0 ([0098a23][400])
- **deps:** bump eslint-import-resolver-typescript from 3.8.3 to 3.8.7 ([7e636bc][401])
- **deps:** bump eslint-import-resolver-typescript from 3.8.7 to 3.9.0 ([9d9cf91][402])
- **deps:** bump eslint-plugin-n from 17.15.1 to 17.16.1 ([dc7da4c][403])
- **deps:** bump eslint-plugin-n from 17.16.1 to 17.16.2 ([3df17ef][404])
- **deps:** bump lint-staged from 15.4.3 to 15.5.0 ([d783dbd][405])
- **deps:** bump prettier from 3.5.2 to 3.5.3 ([b5a17a5][406])
- **deps:** bump sort-package-json from 2.14.0 to 2.15.1 ([3ad4bdd][407])
- **deps:** bump sort-package-json from 2.15.1 to 3.0.0 ([bc3fb25][408])
- **deps:** bump type-fest from 4.35.0 to 4.36.0 ([79d36ed][409])
- **deps:** bump type-fest from 4.36.0 to 4.37.0 ([44bc38f][410])
- **deps:** bump typedoc from 0.27.8 to 0.27.9 ([418c294][411])
- **deps:** bump typescript from 5.7.3 to 5.8.2 ([99e4d87][412])
- **deps:** bump typescript-eslint from 8.24.1 to 8.25.0 ([082b075][413])
- **deps:** bump typescript-eslint from 8.25.0 to 8.26.1 ([ba13af4][414])
- **package:** add @typescript-eslint/parser package ([15be8b9][415])
- **package:** remove defunct @types/eslint\_\_eslintrc package ([f22674d][416])

### 🔥 Reverted

- _"fix(assets/transformers): re-enable n/no-unsupported-features/node-builtins eslint check"_ ([2bc8b38][417])

<br />

### 🏗️ Patch @-xun/symbiote[@3.4.1][418] (2025-03-15)

#### 🪄 Fixes

- **commands/build-distributables:** do not error when attw checks are skipped ([46b5cef][419])

## @-xun/symbiote[@3.3.8][420] (2025-02-24)

#### 🪄 Fixes

- **commands/prepare:** always install self-referential node\_modules symlink for hybridrepos ([892f282][421])

### @-xun/symbiote[@3.3.7][422] (2025-02-24)

#### ⚙️ Build System

- **deps:** bump @-xun/jest from 1.1.5 to 1.1.6 ([f3cf0e3][423])
- **deps:** bump @-xun/project from 1.0.2 to 1.0.3 ([ca139ff][424])

### @-xun/symbiote[@3.3.6][425] (2025-02-24)

#### 🪄 Fixes

- **commands/project-prepare:** symlink the root project back onto itself in hybridrepo node\_modules ([f51a9f7][426])

### @-xun/symbiote[@3.3.5][427] (2025-02-24)

#### 🪄 Fixes

- **assets/transformers:** defensively re-run prepare step during release process ([03c423f][428])

#### ⚙️ Build System

- **deps:** bump npm-check-updates from 17.1.14 to 17.1.15 ([18ac9a6][429])

### @-xun/symbiote[@3.3.4][430] (2025-02-24)

#### 🪄 Fixes

- **commands/prepare:** always symlink bundled deps into node\_modules even in CI and non-dev environments ([8ae1126][431])

### @-xun/symbiote[@3.3.3][432] (2025-02-22)

#### 🪄 Fixes

- **commands/project-renovate:** add newline to the end of package.json output for `--update-dependencies` ([3911bb5][433])

### @-xun/symbiote[@3.3.2][434] (2025-02-22)

#### ⚙️ Build System

- **package:** bundle "remark-reference-links" to work around npm hoisting issue ([e3c8f9a][435])

### @-xun/symbiote[@3.3.1][436] (2025-02-22)

#### 🪄 Fixes

- **commands/project-prepare:** shorten preparation output path length ([e62a8e2][437])

## @-xun/symbiote[@3.3.0][438] (2025-02-22)

### ✨ Features

- **commands/project-prepare:** symlink bundled dependencies into node\_modules when they are missing ([ea85093][439])

### 🪄 Fixes

- **commands/project-renovate:** do not run "npm install" if no dependencies were updated during `--update-dependencies` ([4f71380][440])

## @-xun/symbiote[@3.2.0][441] (2025-02-22)

### ✨ Features

- **commands/project-renovate:** implement `--github-pause-rulesets` ([a16e9cd][442])
- **commands/project-renovate:** implement `--update-dependencies` ([ed344de][443])

### 🪄 Fixes

- **assets/transformers:** ensure "type" tests are included in package.json "test:packages:all:unit" script ([ccf56bb][444])
- **commands/clean:** output "nothing to delete" even if hushed ([18f0a89][445])
- **commands/project-renovate:** limit `--hush=true` default to `--regenerate-assets` only ([e98f860][446])

### ⚙️ Build System

- **deps:** bump @-xun/run from 1.0.2 to 1.0.3 ([044e24c][447])
- **deps:** bump prettier from 3.5.1 to 3.5.2 ([6219cb0][448])
- **deps:** bump typedoc from 0.27.7 to 0.27.8 ([89aa4f8][449])
- **package:** bundle dependencies that are built using symbiote to prevent cyclical issues ([fd59e6d][450])

### @-xun/symbiote[@3.1.4][451] (2025-02-21)

#### 🪄 Fixes

- **commands/project-renovate:** ensure --generate-alias-tags loads GITHUB\_TOKEN env variable ([b809268][452])

### @-xun/symbiote[@3.1.3][453] (2025-02-21)

#### ⚙️ Build System

- **package:** update @-xun/cli to 1.1.2 ([520897b][454])

### @-xun/symbiote[@3.1.2][455] (2025-02-21)

#### ⚙️ Build System

- Bundle @semantic-release/exec into symbiote's dependencies ([2e19fbb][456])

### @-xun/symbiote[@3.1.1][457] (2025-02-20)

#### ⚙️ Build System

- **package:** pin semantic-release (@-xun/release) version ([a1a1659][458])

## @-xun/symbiote[@3.1.0][459] (2025-02-20)

### ✨ Features

- **assets/templates:** delete empty directories during husky pre-commit hook ([50f4bc7][460])
- **assets/templates:** scan for erroneously focused tests in husky pre-push hook ([935e6fc][461])
- **assets:** add support for so-called "error comments" in husky pre-push hook and eslint ([e1fde96][462])
- **commands/clean:** add `--only-empty-directories` flag ([8c752be][463])

### 🪄 Fixes

- **commands/project-renovate:** ensure non-multiversal hybridrepos run husky pre-commit tests across the entire project ([078831b][464])
- Ensure integration and e2e stub tests are generated with correct imports ([03fdcb8][465])

## @-xun/symbiote[@3.0.0][466] (2025-02-18)

### 💥 BREAKING CHANGES 💥

- The eslint config transformer's `moduleExport` export is now an async function and must be awaited. Projects updating to this version of symbiote should run their local renovation command, which will bring them into compliance automatically.

### ✨ Features

- Add more muscular integration and e2e stub tests ([597b698][467])

### 🪄 Fixes

- **assets/transformers:** deal with eslint-plugin-unicorn becoming a pure ESM package 🙄 ([6d14d70][468])
- **assets/transformers:** disable unicorn/consistent-assert; fix unicorn/no-instanceof-builtins ([cb5b704][469])
- **assets/transformers:** re-enable @typescript-eslint/no-unnecessary-type-assertion ([e793760][470])
- **assets/transformers:** update eslint unicorn no-instanceof-array to no-instanceof-builtin-object ([0b15d19][471])

### ⚙️ Build System

- **package:** remove unused dependencies ([e49ef2f][472])

### @-xun/symbiote[@2.25.1][473] (2025-02-17)

#### 🪄 Fixes

- **commands:** imply --scope=unlimited instead of conflicting on --scope for test/lint commands ([16e65ca][474])

## @-xun/symbiote[@2.25.0][475] (2025-02-16)

### ✨ Features

- Update to and integrate latest @-xun/run ([726d79e][476])

### @-xun/symbiote[@2.24.1][477] (2025-02-16)

#### 🪄 Fixes

- **commands/release:** move "build-docs" task into the same tier as "build-dist" ([261741e][478])

## @-xun/symbiote[@2.24.0][479] (2025-02-15)

### ✨ Features

- **assets/transformers:** add "test:packages:all:unit" npm script to package.json ([7342275][480])

### 🪄 Fixes

- **assets/templates:** ensure husky uses global test command (units only) by default in monorepos ([842e15e][481])

### @-xun/symbiote[@2.23.11][482] (2025-02-15)

#### 🪄 Fixes

- **assets/templates:** ensure husky uses global lint command by default in monorepos ([5646719][483])

### @-xun/symbiote[@2.23.10][484] (2025-02-15)

#### 🪄 Fixes

- **commands/build-distributables:** include root "other" package files in subroot package bijection-ok checks ([0374298][485])

### @-xun/symbiote[@2.23.9][486] (2025-02-12)

#### 🪄 Fixes

- **assets/transformers:** do not use single quotes in npm scripts (windows cmd compat) ([f616a8e][487])
- **commands/test:** ensure tstyche only sees a package's own tests when scope is "this-package" ([88a83ba][488])

### @-xun/symbiote[@2.23.8][489] (2025-02-11)

#### 🪄 Fixes

- **assets/transformers:** generate tstyche with pseudodecorator embedded in $scheme url ([80c010a][490])
- **package:** upgrade to @-xun/changelog 1.0.2 ([0240ff8][491])

### @-xun/symbiote[@2.23.7][492] (2025-02-10)

#### 🪄 Fixes

- **assets/transformers:** catch and rethrow stat errors from bad node\_modules fixup attempts wrapped with useful guidance ([c783620][493])
- **assets/transformers:** remove redundant integration test renovation ([d987d66][494])

### @-xun/symbiote[@2.23.6][495] (2025-02-08)

#### 🪄 Fixes

- **assets/transformers:** mark tstyche package as not-invalid via pseudodecorator ([cabd5a9][496])
- **assets/transformers:** only recreate all-contributors file if it does not already exist ([3d17966][497])

### @-xun/symbiote[@2.23.5][498] (2025-02-08)

#### 🪄 Fixes

- **assets/transformers:** add `rejectAnyType` and `rejectNeverType` to tstyche config ([dfa62f9][499])
- **assets/transformers:** ensure jest config ignores all tstyche tests ([70bdc66][500])
- **assets/transformers:** ensure jest config ignores dummy/fixture test files ([41c1127][501])
- **assets/transformers:** ensure tstyche tests are run alongisde jest units as part of "test:package:unit" script ([c11a37f][502])

### @-xun/symbiote[@2.23.4][503] (2025-02-08)

#### 🪄 Fixes

- **commands/test:** allow tstyche to see simple "type.test.tsx?" files ([98342be][504])

### @-xun/symbiote[@2.23.3][505] (2025-02-07)

#### 🪄 Fixes

- **assets/transformers:** use a more powerful patching algorithm when monkey patching jest-resolve ([b82f5db][506])

### @-xun/symbiote[@2.23.2][507] (2025-02-07)

#### 🪄 Fixes

- **assets/transformers:** allow booleans in eslint template expression checks ([ee28fd2][508])

### @-xun/symbiote[@2.23.1][509] (2025-02-07)

#### 🪄 Fixes

- **assets/transformers:** add "debug" to list of allowed functions outside jest test hooks ([baed18c][510])

## @-xun/symbiote[@2.23.0][511] (2025-02-07)

### ✨ Features

- **assets/transformers:** allow `transformSelectEsmPackagesToCjs` to monkey patch jest-resolve ([a3bd022][512])

## @-xun/symbiote[@2.22.0][513] (2025-02-07)

### ✨ Features

- **assets/transformers:** export `transformSelectEsmPackagesToCjs` for jest configs ([385866d][514])

### 🪄 Fixes

- **assets/transformers:** add tar.gz files to gitignored extensions ([57bf52c][515])
- **assets:** do not clobber `ConfigurationType` in `deepMergeConfig` ([89f25ff][516])

## @-xun/symbiote[@2.21.0][517] (2025-02-06)

### ✨ Features

- **assets/transformers:** reconfigure eslint to strictly prefer top-level type-only imports ([ffbc0c5][518])
- **assets/transformers:** use strictest tsconfig `noX` checks where sensible ([8bc3c0a][519])

### 🪄 Fixes

- **assets/transformers:** allow several useful abbreviations in variable names via eslint ([a8c4f36][520])
- **assets/transformers:** ensure types imported without the "type" keyword are considered errors ([623cc86][521])
- **commands/project-topology:** use proper flag name for skipping packages ([aa26f6b][522])
- **util.ts:** ignore negated paths when deriving scope narrowing pathspecs using package.json::files ([374f05c][523])

### ⚙️ Build System

- **post-npm-install:** add post-npm-install script to initialize common dummies ([b234ba1][524])
- Switch to using factored-out package APIs ([dbfedff][525])

## @-xun/symbiote[@2.20.0][526] (2025-02-05)

### ✨ Features

- **assets/templates:** add "renovate:aliases" script to root package.json ([d2b0fa2][527])
- **commands/project-renovate:** add `--exclude-asset-paths` and `--include-asset-paths` to "regenerate-assets" ([42ea1cb][528])
- **commands/project-renovate:** add `--only-aliases` to "regenerate-assets" ([8a17ad8][529])

### 🪄 Fixes

- **commands/project-renovate:** only attempt to skip assets when one of the inclusion/exclusion flags given ([2fc5abf][530])

## @-xun/symbiote[@2.19.0][531] (2025-02-05)

### ✨ Features

- **assets/templates:** check for unmerged replacer regions during husky pre-push hook ([02bd1f4][532])

### @-xun/symbiote[@2.18.6][533] (2025-02-05)

#### 🪄 Fixes

- **assets/transformers:** only ignore fixtures/ dir when it appears at some depth under a test/ dir ([61b0c6f][534])

#### ⚙️ Build System

- Bundle @-xun/jest and include it in renovation output ([feae4de][535])

### @-xun/symbiote[@2.18.5][536] (2025-02-03)

#### 🪄 Fixes

- **assets/transformers:** reduce warning about minor core-js "issues" to a debug output ([a0fabf1][537])

### @-xun/symbiote[@2.18.4][538] (2025-02-03)

#### 🪄 Fixes

- **assets/transformers:** collect and commit any remaining changes in the repository after release ([1dd3c8b][539])
- **commands/release:** do not attempt rollback on failure if --ci=true ([03d0f5e][540])

### @-xun/symbiote[@2.18.3][541] (2025-02-03)

#### 🪄 Fixes

- **assets/transformers:** disable import/export eslint rule since it does not work consistently ([d10510b][542])
- **src:** do not include random garbage in taskrunner output ([9ad3cda][543])

### @-xun/symbiote[@2.18.2][544] (2025-02-03)

#### 🪄 Fixes

- **src:** make output colors consistent for easier reviewing experience ([c906eda][545])

### @-xun/symbiote[@2.18.1][546] (2025-02-01)

#### 🪄 Fixes

- **assets/transformers:** do not warn about minor core-js issues during test runs ([2816aa5][547])

## @-xun/symbiote[@2.18.0][548] (2025-01-31)

### ✨ Features

- **commands/project-topology:** implement support for `--run-to-completion` ([2b9d383][549])

### 🪄 Fixes

- **assets/transformers:** elide publishConfig from package.json if package is private ([3c4d07d][550])

### @-xun/symbiote[@2.17.3][551] (2025-01-30)

#### 🪄 Fixes

- **assets/transformers:** do not elide build scripts from package.json if package is not private ([697c638][552])

### @-xun/symbiote[@2.17.2][553] (2025-01-30)

#### 🪄 Fixes

- **src:** add "global" signifier to --version output when project metadata unavailable ([3c34513][554])

### @-xun/symbiote[@2.17.1][555] (2025-01-30)

#### 🪄 Fixes

- **assets/templates:** update package readme template (minor cosmetics) ([d1d3838][556])
- **assets/transformers:** ensure package.json files for packages are not erroneously marked "private" ([22889a3][557])

## @-xun/symbiote[@2.17.0][558] (2025-01-30)

### ✨ Features

- **commands/project-topology:** implement support for `--skip-packages` ([3e1e6c6][559])
- **commands/project-topology:** support regular expressions via `--skip-packages` ([df3174d][560])
- **packages/project-utils:** purify sort-packages-topologically result (same input always equals same output) ([eed08a0][561])

### @-xun/symbiote[@2.16.6][562] (2025-01-29)

#### 🪄 Fixes

- **commands/build-distributables:** include some "other" package files in non-source specifier-ok checks ([49cbe95][563])
- **commands/build-distributables:** only subject relevant files to post-build dependency bijection check ([f9678b8][564])

#### 🔥 Reverted

- _"fix(assets/transformers): ensure babel extension check functions properly exclude definition file extensions"_ ([c39983c][565])

### @-xun/symbiote[@2.16.5][566] (2025-01-27)

#### 🪄 Fixes

- **commands/build-distributables:** use proper root directory when limiting bijection check ([8eac971][567])

### @-xun/symbiote[@2.16.4][568] (2025-01-27)

#### 🪄 Fixes

- **commands/build-distributables:** limit bijection check in `dist` dir to `dist/src` subdir ([29281df][569])

### @-xun/symbiote[@2.16.3][570] (2025-01-27)

#### 🪄 Fixes

- **commands/build-distributables:** ensure destination exists before attempting to copy assets ([f7f4f11][571])

### @-xun/symbiote[@2.16.2][572] (2025-01-27)

#### 🪄 Fixes

- **src:** do not include "other" package files in non-source specifier-ok checks ([450d03a][573])

### @-xun/symbiote[@2.16.1][574] (2025-01-25)

#### 🪄 Fixes

- **commands/test:** ensure local jest config is imported with expected NODE\_ENV ([52d5f44][575])
- **packages/cli-utils:** improve debug output during errors (dump full error to console) ([5f35a77][576])

## @-xun/symbiote[@2.16.0][577] (2025-01-25)

### ✨ Features

- **commands/build-distributables:** implement support for `--include-external-assets` ([5a6b8fd][578])

### 🪄 Fixes

- **commands/test:** ensure test command imports jest config from project root package ([50e60da][579])

## @-xun/symbiote[@2.15.0][580] (2025-01-23)

### ✨ Features

- **assets:** add support for `monorepoPackagesList` to `TransformerContext` ([229d304][581])

### 🪄 Fixes

- **assets/templates:** update non-hybrid monorepo root readme template ([13d185c][582])
- **assets/transformers:** remove unused keys from non-hybrid monorepo root package.json ([52bef91][583])
- **commands/project-renovate:** integrate `monorepoPackagesList` into asset regeneration ([d5fff49][584])
- **commands/release:** move "build-dist" task into its own tier; other build tasks are now executed after ([0608290][585])

### @-xun/symbiote[@2.14.6][586] (2025-01-23)

#### 🪄 Fixes

- **assets/transformers:** remove `--hush` from package.json npm renovation script ([9e8658f][587])
- **commands/project-renovate:** improve output of various renovations ([a6db0c4][588])

#### ⚙️ Build System

- **package:** remove `--hush` from renovation script ([7621c5f][589])

### @-xun/symbiote[@2.14.5][590] (2025-01-23)

#### 🪄 Fixes

- **commands/project-release:** move lint task after build-documentation task ([da0014a][591])

### @-xun/symbiote[@2.14.4][592] (2025-01-20)

#### 🪄 Fixes

- **commands/project-topology:** inherit stdio when not running in parallel ([3b6f453][593])

### @-xun/symbiote[@2.14.3][594] (2025-01-20)

#### 🪄 Fixes

- **assets/transformers:** do not mark released sub-root packages as "private" ([e27824c][595])
- **assets/transformers:** do not remove scripts from sub-root packages without --force ([17742f7][596])

### @-xun/symbiote[@2.14.2][597] (2025-01-20)

#### 🪄 Fixes

- **commands/release:** work around strange codecov issues to ensure proper flag-based upload support ([99b7edb][598])

### @-xun/symbiote[@2.14.1][599] (2025-01-20)

#### 🪄 Fixes

- **commands/project-release:** fail release process if current package.json has a `private: true` field ([ceda91b][600])
- **commands/project-topology:** do not attempt to release private packages unless user has misconfigured dependencies ([bc7742b][601])
- **commands/project-topology:** ensure `--options` receives all proceeding unrecognized args ([9f4668c][602])
- **commands/project-topology:** warn visually when a topological dependency is private ([e90857a][603])
- **packages/project-utils:** allow `sortPackagesTopologically` to skip private packages on first iteration by default ([8bd33e6][604])

## @-xun/symbiote[@2.14.0][605] (2025-01-20)

### ✨ Features

- **commands/build-distributables:** implement support for togglable multiversal build and validation features ([1301043][606])
- **packages/project-utils:** add `Multiversal` to `ProjectAttributes` and `WorkspaceAttributes` ([f20ab42][607])
- **packages/project-utils:** support sub-root "universe" import aliases; greatly improve fidelity of post-build import validation ([d8e32c7][608])

### 🪄 Fixes

- **assets/templates:** update maintaining.md template with topology-related commands ([9223639][609])
- **assets/transformers:** move `--multiversal` and related flags to "build:dist" npm script ([a7ed2d2][610])
- **packages/project-utils:** improve error message outputs ([71f3d43][611])
- **src:** use gentler language around core-js warning ([7d7e837][612])

### ⚙️ Build System

- **package:** opt into multiversal featureset for symbiote's own build process ([251f2c1][613])

## @-xun/symbiote[@2.13.0][614] (2025-01-18)

### ✨ Features

- **commands/topology:** implement new "project topology" command ([e5a994b][615])
- **packages/project-utils:** implement topological dependency sorting algorithm `sortPackagesTopologically` ([aa28cc2][616])

### 🪄 Fixes

- **assets/transformers:** manually set codecov default branch to "main" by default ([87c9c3c][617])
- **assets/transformers:** update package.json outputs with latest best practices ([7f98295][618])

## @-xun/symbiote[@2.12.0][619] (2025-01-16)

### ✨ Features

- **src:** support debug output activation given the presence of GHA debug env variables ([e2584fc][620])

### ⚙️ Build System

- **packages/cli-utils:** update rejoinder-listr2 to 1.0.1 ([443eb13][621])
- **package:** update rejoinder 1.2.1 ([a01453f][622])
- **src:** integrate rejoinder-github-actions ([721eb51][623])

### @-xun/symbiote[@2.11.9][624] (2025-01-15)

#### 🪄 Fixes

- **assets/transformers:** export and return `WritableReleaseConfig` from release asset config ([b951959][625])

### @-xun/symbiote[@2.11.8][626] (2025-01-15)

#### 🪄 Fixes

- **assets/transformers:** escape characters considered special in Markdown when they appear in commit messages ([4196fe0][627])
- **assets/transformers:** ignore irrelevant revert commits ([e432f8a][628])

### @-xun/symbiote[@2.11.7][629] (2025-01-14)

#### 🪄 Fixes

- **assets/templates:** update architecture.md ([e734cc6][630])
- **assets/transformers:** do not renovate root package test files if the root test directory already exists ([2b00195][631])
- **assets/transformers:** ensure default "list-tasks" script does not overwrite custom in package.json ([605e4eb][632])
- **assets/transformers:** parse architecture.md with respect to its replacer regions ([31863db][633])
- **commands/project-prepare:** do not attempt to chdir during async tasks ([e80d6e7][634])
- **packages/project-utils:** ensure `gatherPseudodecoratorEntriesFromFiles` does not choke on super-pinned dependency names ([614ba8b][635])

#### ⚙️ Build System

- **packages/cli-utils:** integrate rejoinder-listr2 ([690ad17][636])
- Tear turbo out of symbiote ([5540b7d][637])

### @-xun/symbiote[@2.11.6][638] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** do the right thing when there is no "most recent relevant version tag" ([2dfb17d][639])

### @-xun/symbiote[@2.11.5][640] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** fix the graceful exit error on --dry-run fix ([6f7a302][641])

### @-xun/symbiote[@2.11.4][642] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** do not throw graceful exit error on --dry-run ([67bad27][643])
- **commands/renovate:** support camel-case options when invoked artificially ([5ab38d0][644])

### @-xun/symbiote[@2.11.3][645] (2025-01-11)

#### 🪄 Fixes

- **commands/release:** push any post-release metadata changes after committing them ([15d3444][646])

### @-xun/symbiote[@2.11.2][647] (2025-01-11)

#### 🪄 Fixes

- **assets:** use proper package context when deriving codecov package flag ([16af6eb][648])

### @-xun/symbiote[@2.11.1][649] (2025-01-11)

#### 🪄 Fixes

- Ensure readme renovation yields correct codecov badge link using derived flag ([1e0174c][650])

## @-xun/symbiote[@2.11.0][651] (2025-01-10)

### ✨ Features

- **commands/prepare:** execute post-npm-install scripts and other tasks with greater fidelity ([e53be8b][652])
- **packages/project-utils:** allow `isAccessible` to handle "file:///" URL-style file paths ([3058d49][653])

## @-xun/symbiote[@2.10.0][654] (2025-01-10)

### ✨ Features

- **commands/release:** refuse release attempt if most recent version tag is "semver experimental" ([900c84b][655])
- **src:** add local/global emoji to version text output ([2d7c433][656])

### 🪄 Fixes

- **assets/templates:** link to the npm registry instead of npm trends for "npm install" badge ([76bd411][657])
- **commands/release:** actually respect SYMBIOTE\_RELEASE\_WITH\_FORCE env var when present ([e264510][658])
- **commands/release:** actually throw when release finishes with a dirty repo and force not used ([ae7340f][659])
- **commands/release:** commit root package-lock.json during post-release "success" step when necessary ([bccf091][660])

### ⚙️ Build System

- Remove @-xun/debug and rejoinder multiverse workspaces in favor of published packages ([77e22ae][661])

## @-xun/symbiote[@2.9.0][662] (2025-01-10)

### ✨ Features

- **commands/release:** `--force` prevents release process from erroring if repo left in unclean state ([45a9568][663])

### @-xun/symbiote[@2.8.2][664] (2025-01-10)

#### 🪄 Fixes

- **commands/release:** do not roll repository back if `--dry-run` is used ([ecdd713][665])

### @-xun/symbiote[@2.8.1][666] (2025-01-10)

#### 🪄 Fixes

- **assets/transformers:** do not erroneously report jest-extended as an invalid dep ([af354d0][667])
- **commands/release:** recursively check causal stack for graceful exit symbol ([4a89482][668])

## @-xun/symbiote[@2.8.0][669] (2025-01-09)

### ✨ Features

- **assets:** support empty default text when compiling templates in memory ([abc2eae][670])
- **assets:** support new "+" concatenation template variables when compiling templates in memory ([152bcdb][671])
- **commands/release:** allow the release process to terminate prematurely with grace ([7fa548f][672])
- **commands/release:** rollback the repository to its pre-release state under certain error conditions ([d34d569][673])

### 🪄 Fixes

- **assets/templates:** ensure package-level readme is generated using proper logo url ([1631e8d][674])
- **assets/transformers:** include root package-lock.json in commit when releasing sub-root package ([032aa30][675])

### ⚙️ Build System

- **assets/transformers:** throw in xrelease "success" step if repo is left in a dirty state after release ([88b7f38][676])

### @-xun/symbiote[@2.7.1][677] (2025-01-09)

#### 🪄 Fixes

- **assets/transformers:** ensure subroot tsconfigs include root test/setup.ts where appropriate ([138da87][678])

## @-xun/symbiote[@2.7.0][679] (2025-01-09)

### ✨ Features

- Support windows-style paths ([28acb79][680])

### ⚙️ Build System

- **assets/transformers:** update "core-js" to 3.40 ([6f8cbe2][681])
- Completely remove all traces of spellchecker and node-gyp ([edc6cca][682])

## @-xun/symbiote[@2.6.0][683] (2025-01-08)

### ✨ Features

- Support `--env` common option for cross-env-like functionality ([dddfc44][684])

### ⚙️ Build System

- Remove unnecessary jsdoc type comments ([180f85f][685])

### @-xun/symbiote[@2.5.6][686] (2025-01-06)

#### 🪄 Fixes

- **assets:** ensure `deepMergeConfig` accepts a diverse set of overwrite objects ([2fd61c4][687])

### @-xun/symbiote[@2.5.5][688] (2025-01-06)

#### 🪄 Fixes

- **src:** use proper path in global-vs-local binary detection ([3831af5][689])

### @-xun/symbiote[@2.5.4][690] (2025-01-06)

#### 🪄 Fixes

- **commands/lint:** do not hide all output when `--hush` is used ([c23304e][691])

#### ⚙️ Build System

- Indicate in output topmatter whether current binary is globally or locally installed ([1411119][692])

### @-xun/symbiote[@2.5.3][693] (2025-01-05)

#### 🪄 Fixes

- **assets/transformers:** add `--hush` to "lint" script in generated package.json files ([0dd4fb7][694])
- **assets/transformers:** generate properly formatted "breaking change" changelog notes ([607a378][695])
- **assets/transformers:** update "turbo:init" script to use "project init-turbo" command in package.json ([19492a7][696])

### @-xun/symbiote[@2.5.2][697] (2025-01-04)

#### 🪄 Fixes

- **assets/transformers:** do not mess with "breaking change" title casing in generated changelog (via remark) ([4231719][698])

### @-xun/symbiote[@2.5.1][699] (2025-01-04)

#### 🪄 Fixes

- **commands/release:** use emoji to reference skipped tasks in output ([b2dfed2][700])

## @-xun/symbiote[@2.5.0][701] (2025-01-04)

### ✨ Features

- **commands/renovate:** implement --generate-alias-tags renovation ([c133a92][702])

### 🪄 Fixes

- **assets/templates:** disable turbo config generation for now and add stashed configs ([6210727][703])
- **assets/templates:** use less confusing language during readme regeneration ([625451c][704])

### @-xun/symbiote[@2.4.3][705] (2025-01-03)

#### 🪄 Fixes

- **assets/templates:** do not capitalize package semver data in markdown files (via remark) ([7b8ca54][706])

### @-xun/symbiote[@2.4.2][707] (2025-01-03)

#### 🪄 Fixes

- **assets/templates:** ensure real repo owner is used in support.md file link generation ([0bafa30][708])

### @-xun/symbiote[@2.4.1][709] (2025-01-03)

#### 🪄 Fixes

- **commands/documentation:** ensure black flag uses proper argparser configuration ([02e289a][710])

## @-xun/symbiote[@2.4.0][711] (2025-01-03)

### ✨ Features

- **commands/documentation:** add `--baseline` and `--typedoc-options` flag support ([10f876e][712])

### @-xun/symbiote[@2.3.4][713] (2025-01-02)

#### 🪄 Fixes

- **assets/transformers:** remove commit spellchecker until commit-spell is released ([7f1f7a2][714])

### @-xun/symbiote[@2.3.3][715] (2025-01-02)

#### 🪄 Fixes

- **commands/prepare:** exit immediately with exit code 0 when run runtime pre-checks fail ([1546ab8][716])

### @-xun/symbiote[@2.3.2][717] (2025-01-01)

#### ⚙️ Build System

- **assets/transformers:** add "\_\_x\_\_" directories to .prettierignore and eslint ignores ([ff6ce22][718])
- **src:** add helpful verbiage to "lint" output and generated .prettierignore files ([9a456c5][719])

### @-xun/symbiote[@2.3.1][720] (2025-01-01)

#### 🪄 Fixes

- **commands/distributables:** ensure bijection check warnings are not overshadowed by errors ([1901cfe][721])

## @-xun/symbiote[@2.3.0][722] (2025-01-01)

### ✨ Features

- **assets/transformers:** add eslint-config-turbo to eslint config ([23d01f3][723])
- **assets/transformers:** add new "turbo-only" asset preset available to the renovate command ([ee079c1][724])
- **commands/distributables:** implement `--skip-output-bijection-checks-for` ([c92b2cb][725])
- **packages/project-utils:** add "turbo:init" script to `XPackageJson` ([c565452][726])

### 🪄 Fixes

- **assets/transformers:** add .turbo to gitignore ([6353b4f][727])
- **assets/transformers:** ensure all project-root package.json files have a "turbo:init" script ([64a4138][728])
- **assets/transformers:** generate readme using proper title ([9304778][729])

## @-xun/symbiote[@2.2.0][730] (2024-12-28)

### ✨ Features

- **assets/transformers:** warn when updating package.json::engines that it is likely a breaking change ([0c1b93a][731])
- **commands:** expose `RawAliasMapperFunction` and `RawAliasMapperArray` helper types ([ce6a12a][732])
- **packages/cli-utils:** hoist semi-deep options configuration merge functionality from util ([14bf31f][733])

### 🪄 Fixes

- **assets/transformers:** do not allow --force to overwrite "sideEffects" field in package.json ([c263dc5][734])
- **assets/transformers:** do not allow --force to overwrite files in src ([f556644][735])
- **assets/transformers:** ensure provided aliases are added in addition to defaults ([9581339][736])
- **assets/transformers:** ensure warning-comment errors are only reported when allowed ([432a5fa][737])
- **assets/transformers:** exclude "renovate" script from sub-root package.json files ([f82fbf4][738])
- **assets/transformers:** generate proper cli as index export subpath in package.json ([a95e910][739])
- **assets/transformers:** generate proper tsconfig files for sub-root packages ([12dd3f7][740])
- **assets/transformers:** generate properly-scoped field values for sub-root package.json files ([2a3e13c][741])
- **assets/transformers:** generate valid GitHub link in "homepage" field of package.json ([b8841b5][742])
- **assets/transformers:** guess the proper asset preset for sub-root packages ([f301229][743])
- **assets/transformers:** improve license detection when generating readme ([26f78dc][744])
- **assets/transformers:** improve replacer region flexibility and fidelity when generating readme ([c63847c][745])
- **assets/transformers:** preserve all dependency-related keys in package.json ([df13f87][746])
- **assets/transformers:** regenerate package.json files more carefully ([48163ba][747])
- **commands/renovate:** do not attempt to format output when --force is given ([c4f81c0][748])

### ⚙️ Build System

- **assets/transformers:** disable broken @typescript-eslint/no-unnecessary-type-assertion eslint rule ([8338afa][749])
- **babel:** add special consideration for symbiote when building itself ([fb7752b][750])

## @-xun/symbiote[@2.1.0][751] (2024-12-27)

### ✨ Features

- **commands/distributables:** `--partial` now filters against absolute paths ([0c86cb5][752])
- **commands/distributables:** improve partial build metadata output ([0b96a6b][753])

### 🪄 Fixes

- **assets/transformers:** address incorrect capture group string in babel replacer functions ([e682734][754])
- **assets/transformers:** address incorrect extension transform in babel replacer functions ([552b89f][755])
- **assets/transformers:** address incorrect use of `toRelativePath` in babel replacer functions ([7409b67][756])
- **assets/transformers:** be more selective in when and how to replace .env and .env.default files ([2013638][757])
- **assets/transformers:** create test/util.ts instead of test/index.ts ([5057f53][758])
- **assets/transformers:** do not attempt to deep merge the eslint config array ([6c5a8fe][759])
- **assets/transformers:** do not create example definition files if root types dir already exists ([a84c523][760])
- **assets/transformers:** do not include "import" condition during resolution in babel replacer functions ([f9bdb7e][761])
- **assets/transformers:** do not overwrite existing changelog patch files ([b6927a9][762])
- **assets/transformers:** do not overwrite existing global.ts types file ([364fbb2][763])
- **assets/transformers:** populate .vscode example configs from existing or vice versa depending on force ([11bd584][764])
- **assets/transformers:** populate new .env files with full lines from corresponding .env.default files ([aee10cd][765])
- **assets/transformers:** properly construct subpath targets when resolving entry points in babel replacer functions ([d44fa79][766])
- **assets/transformers:** short circuit resolution logic for simple bare specifiers in babel replacer functions ([b7f2754][767])
- **packages/project-utils:** ensure aliases are generated in verse-specificity order ([f592d5f][768])
- **src:** replace xscripts with symbiote in configuration version self-check ([7e66183][769])

### ⚙️ Build System

- **babel:** regenerate configuration asset ([98c028a][770])
- **package:** include missing dependency ([3030eb9][771])

### @-xun/symbiote[@2.0.1][772] (2024-12-26)

#### ⚙️ Build System

- **package:** force CD pipeline to complete ([e42722b][773])

## @-xun/symbiote[@2.0.0][774] (2024-12-26)

### 💥 BREAKING CHANGES 💥

- `@-xun/scripts` is now deprecated. Use `@-xun/symbiote` instead.

### ✨ Features

- **assets:** expose to per-package asset adders a per-package version of `TransformerContext` ([b7b101e][775])
- **commands/renovate:** add tag aliasing to --github-rename-root renovation ([057f400][776])
- **commands/renovate:** implement --github-rename-root renovation ([d22de31][777])
- **commands/test:** all "Test.AllLocal" meta test kind and make it the default ([e83f2f2][778])

### 🪄 Fixes

- **assets/transformers:** do not throw on bad engines field in package.json (eslint) ([ad83e56][779])
- **assets/transformers:** do not use sync API in eslint.config.mjs ([0a19ce6][780])
- **assets/transformers:** ensure alias functions and related imports are generated with proper syntax ([70b5134][781])
- **assets/transformers:** ensure certain outputs do not trigger eslint errors ([1a522e8][782])
- **assets/transformers:** ensure certain outputs do not trigger eslint errors ([9d05b8b][783])
- **assets/transformers:** generate integration configuration file with proper name ([7a8eee6][784])
- **assets/transformers:** import `assertEnvironment` in release config template ([abbc2da][785])
- **assets/transformers:** only generate .browserslistrc on web-related presets ([53409fa][786])
- **assets/transformers:** remove unnecessary spacing from tsconfig.json output ([2bd57b5][787])
- **assets/transformers:** use actual esm import syntax when generating commitlint config ([a40f886][788])
- **assets/transformers:** use non-broken links in maintenance docs template ([f2bb03d][789])
- **assets/transformers:** use repository name when generating all-contributors config ([641b57b][790])
- **commands/renovate:** prevent attempts to resolve package root relative path in nonsensical scopes ([177a5dc][791])
- **packages/bfe:** ensure `getInvocableExtendedHandler` handler invocation does not trigger bfe checks ([c331ae1][792])
- **packages/bfe:** properly track canonical option name expansions in extended builders ([8724515][793])
- **packages/project-utils:** never derive broken RegExp-based aliases for babel and jest ([a6f02e0][794])
- **src:** use absolute paths when outputting and deleting files; use recursive mkdir ([5e99d88][795])

### ⚡️ Optimizations

- **src:** combine lint-staged formatter invocations into a single command ([f511249][796])
- **src:** use real package name instead of bin alias with npx during lint-staged formatting ([577710b][797])

### ⚙️ Build System

- **commitlint.config:** reduce header-max-length severity from "error" to "warning" ([2841d26][798])
- **jest:** regenerate configuration asset ([5c66c17][799])
- Regenerate several other configuration assets ([6a44488][800])
- Regenerate several other configuration assets ([26fb034][801])
- Transmute remaining files @-xun/scripts => @-xun/symbiote ([4f8d351][802])

### 💎 Aesthetics

- **package:** transmute @-xun/scripts => @-xun/symbiote ([26e7563][803])

## @-xun/symbiote[@1.33.0][804] (2024-12-22)

### ✨ Features

- **commands/release:** add `allowMissingNpmScripts` task init option; skippable coverage upload ([f1e8e8e][805])
- **commands:** take advantage of improved target gathering functions ([4925885][806])
- **packages/babel-plugin-metadata-accumulator:** always include type-only import metadata ([ca87588][807])
- **packages/bfe:** add "options" to usage string in help text by default ([410a05a][808])
- **packages/debug:** support and expand upstream debug's process.env.DEBUG activation behavior ([f111552][809])
- **packages/project-utils:** exclude type-only imports from build targets (but keep them elsewhere) ([1d9accc][810])
- **packages/project-utils:** introduce `toDirname` typed analogue of node:fs `dirname` ([51ab454][811])
- **packages/project-utils:** provide richer metadata to consumers of `gatherPackageBuildTargets` ([c2bee3b][812])
- Upgrade to experimental asset generation engine ([b057430][813])

### 🪄 Fixes

- **assets/transformers:** ensure package.json generated for non-hybrid monorepo roots ([eec0ed9][814])
- **assets/transformers:** make env.default transformer resilient to non-existence of .env ([16f64e1][815])
- **commands/test:** ensure all the current package's multiversal dependencies' tests are run ([413dc39][816])
- **commands/test:** ensure test coverage directory is always generated at the current package root ([28c221b][817])
- **packages/debug:** add interop necessary to preserve upstream DEBUG env var activation behavior ([6a8c411][818])
- **packages/project-utils:** ensure alias calculation uses correct relative directory src path ([da7e953][819])
- **packages/rejoinder:** ensure sub-instance loggers are included in internal tracking ([edec64f][820])
- **util:** consider scope during precheck phase ([578d631][821])

### ⚙️ Build System

- **commands/deploy:** remove dummy release option ([bf993c9][822])
- **husky:** skip slow unit tests ([c52b3f1][823])
- **package:** downgrade typescript-eslint to 8.18.0 and pin it until it is fixed ([cdfd48d][824])
- **packages/babel-plugin-metadata-accumulator:** remove extraneous dependencies ([d6a0c06][825])
- Regenerate conventional and release assets ([a33aed8][826])

## @-xun/symbiote[@1.32.0][827] (2024-12-11)

### ✨ Features

- **commands/renovate:** complete --sync-deps and --github-reconfigure-repo renovations ([c9a6e8b][828])
- **packages/project-utils:** add `relativeRoot` to `ProjectMetadata` ([e17adfb][829])

### 🪄 Fixes

- **commands/renovate:** do not update existing origin secrets unless --force ([c5cd76a][830])
- Rewrite assets interface to avoid impedance mismatch ([56e576c][831])

### ⚙️ Build System

- **babel:** `readPackageJsonAtRoot` => `readXPackageJsonAtRoot` ([aa60eeb][832])
- **prettier.config:** reduce typescript print width to 89 (vscode shrunk) ([c248757][833])

### @-xun/symbiote[@1.31.2][834] (2024-12-08)

#### 🪄 Fixes

- **commands/test:** ensure all relevant source files are included when calculating coverage ([0565333][835])

#### ⚙️ Build System

- Remove execa bridge dependency now that we use @-xun/run exclusively ([f4ecfc9][836])

### @-xun/symbiote[@1.31.1][837] (2024-12-08)

#### 🪄 Fixes

- **command/release:** ensure "release" calls "project renovate" with --force ([cfe28e3][838])
- **packages/bfe:** ensure `withUsageExtensions` configurations function as advertised ([8935008][839])
- **packages/bfe:** handle declarative `group` option configurations in bfe instead of bf/yargs ([39e37a8][840])
- **src:** use more specific conflicts for --deprecate vs --undeprecate ([58a6223][841])

## @-xun/symbiote[@1.31.0][842] (2024-12-07)

### ✨ Features

- **commands/renovate:** add initial stub version of "project renovate" ([8f7777c][843])
- **src:** allow multiple choice string replacements in markdown asset templates ([6fc66d8][844])

### 🪄 Fixes

- **assets/conventional:** ensure `issuePrefixes` xchangelog setting propagates throughout config object ([8a5fd8a][845])
- **commands/release:** only rebuild changelog if the relevant task is not skipped ([68d5bda][846])
- **commands/renovate:** account for vacuous case in bfe check functions ([ef6927b][847])
- **src:** actually invoke "project renovate" command from within "release" command ([ceb6c62][848])
- **src:** factor out shared runner wrapper; ensure runner rejects when it should ([ce93443][849])
- **src:** support parameters in handlebars-style template strings ([6ce819a][850])

### ⚙️ Build System

- **husky:** use proper lint command ([62a5a12][851])

### @-xun/symbiote[@1.30.3][852] (2024-12-04)

#### 🪄 Fixes

- **packages/project-utils:** ensure meaningful error output from `readJsonc` ([01dca03][853])
- **src:** allow testverse imports in non-source typescript files ([b923d6d][854])

### @-xun/symbiote[@1.30.2][855] (2024-11-26)

#### ⚙️ Build System

- **remarkrc:** ensure remark doesn't mangle GFM alerts with escape characters ([98a868e][856])

### @-xun/symbiote[@1.30.1][857] (2024-11-25)

#### 🪄 Fixes

- **config/conventional:** fix global patch detection logic ([89eebe7][858])

## @-xun/symbiote[@1.30.0][859] (2024-11-25)

### ✨ Features

- **commands/list-tasks:** allow filtering tasks by string ([3710988][860])
- **packages/bfe:** add support for `prependNewlines` ([e163302][861])

### 🪄 Fixes

- **commands/release:** ensure codecov uploader is passed the proper arguments ([ca47d93][862])

### @-xun/symbiote[@1.29.2][863] (2024-11-25)

#### ⚙️ Build System

- **package:** upgrade @-xun/changelog to 1.0.0 ([d89809b][864])

### @-xun/symbiote[@1.29.1][865] (2024-11-24)

#### ⚙️ Build System

- **remarkrc:** fix faulty array reference ([8feaaa7][866])

## @-xun/symbiote[@1.29.0][867] (2024-11-24)

### ✨ Features

- **packages/bfe:** allow more control over `withUsageExtensions` result ([053bf3e][868])
- **src:** add support for init version tag suffixes to "build changelog" ([002431f][869])

### 🪄 Fixes

- **src:** ensure "clean" command does not delete ignored packages ([65b8c0b][870])

### ⚙️ Build System

- **packages/babel-plugin-metadata-accumulator:** ensure root types/ directory is included in sub-root tsc configs ([0ed2513][871])

## @-xun/symbiote[@1.28.0][872] (2024-11-24)

### ✨ Features

- **babel:** use reverse entrypoint resolver to fix tsc output ([c3fc126][873])
- **packages/project-utils:** add `try` option to json reading functions ([a91e7fa][874])

### 🪄 Fixes

- **eslint:** do not collapse path group overrides ([71b17c8][875])
- **packages/project-utils:** ensure external and internal build target sets are mutually exclusive ([7fed439][876])
- Remove unnecessary restrictions on universe imports; bail out when an import is rejected ([11b585d][877])
- **src:** warn when release process ends with a dirty repo ([cf5b25b][878])

### ⚙️ Build System

- **babel:** add core-js validation checks ([55ee62d][879])
- **babel:** fix incorrect regexp stringification when using transform-rewrite-imports ([56b706a][880])
- **packages/babel-plugin-metadata-accumulator:** add missing dependencies (to be pared down later) ([b3e2560][881])
- **packages/debug:** add missing dependencies (to be pared down later) ([d1038dd][882])

## @-xun/symbiote[@1.27.0][883] (2024-11-23)

### ✨ Features

- **project-utils:** expose `process.cwd` replacement exports ([1a69887][884])

### 🪄 Fixes

- **distributables.ts:** do not output "build succeeded but" message unless build actually succeeded ([1262cc8][885])

### ⚙️ Build System

- **eslint:** add `instanceof` and `process.cwd` usage restrictions ([645473d][886])
- **package:** make scripts less verbose ([c5c742e][887])
- **packages/babel-plugin-metadata-accumulator:** package-ify this workspace ([11da8f2][888])
- **packages/debug:** package-ify this workspace ([afa3f46][889])

## @-xun/symbiote[@1.26.0][890] (2024-11-22)

### ✨ Features

- **packages/bfe:** ensure `coerce` function always receive an array when so configured ([5c8816d][891])
- **src:** implement "release" command ([44be676][892])
- **src:** implement new graph algorithm for lint target determination ([3323fc3][893])
- **src:** implement new graph algorithm for test target determination ([8a67d70][894])

### 🪄 Fixes

- **packages/bfe:** ensure downstream builder functions receive nullable argv ([9b551a7][895])
- **packages/bfe:** force `BfeStrictArgs` to be partial in argv to make usage easier ([0924dd3][896])
- **packages/bfe:** use more intuitive arg-val interpretation when given argument value is an array ([ce72af2][897])
- **packages/cli-utils:** do not propagate upstream error messages ([6ac3376][898])
- **src:** ignore root package properly when releasing package ([09373fa][899])
- **src:** improve dev version detection ([b3e95e7][900])
- **src:** improve outputs; fix crash due to shifting arg type ([d27007d][901])
- **src:** patch globals to deal with design decisions from upstream conventional-changelog-core ([998218d][902])

### ⚙️ Build System

- **eslint:** allow "arg" as a variable name ([9087086][903])
- **eslint:** update to use experimental features of @-xun/eslint-plugin-import-experimental ([36016b1][904])
- **jest:** ensure jest and jest-haste-map ignore ignored packages ([86fca58][905])
- **src:** update with latest launch.json ([bb6bde9][906])

## @-xun/symbiote[@1.25.0][907] (2024-11-14)

### ✨ Features

- Integrate @-xun/changelog ([31c7bbb][908])
- Integrate @-xun/release ([4f807cf][909])
- Integrate @-xun/run ([d22cee3][910])
- Integrate Tstyche into "test" command ([9045cd7][911])
- **packages/babel-plugin-metadata-accumulator:** add stub version information ([42510f6][912])
- **packages/bfe:** add stub version information ([c0b7b70][913])
- **packages/cli-utils:** add stub version information ([f8734d4][914])
- **packages/debug:** add stub version information ([005ab26][915])
- **packages/project-utils:** add `typescriptTestFiles` to `ProjectFiles` objects ([e7c4b6e][916])
- **packages/project-utils:** add support for `.shared` files at package roots ([c62261b][917])
- **packages/project-utils:** ensure packages with id matching `*.ignore` are excluded from analysis ([4d5ddb6][918])
- **packages/rejoinder:** add stub version information ([0bfdf77][919])
- **packages/rejoinder:** ensure outputs are yellow iff they are "warn" outputs ([da60db8][920])
- **packages/test-utils:** split off test utilities into new package ([576dd64][921])
- **src:** "test" prevents propagation of DEBUG env var by default unless `--debug` given ([ffcad30][922])
- **src:** ensure "build changelog" prints out full package name and version ([4059ed7][923])
- **src:** ensure current package is always printed last for "list-tasks" ([5ea7f8a][924])
- **src:** expand "build" pre-check to include all of a package's TS files ([d4d3756][925])
- **src:** explicitly allow arbitrary options passed to executables in "lint" and "test" ([d915727][926])
- **src:** implement "build" support for partial builds via `--partial` ([5d61e87][927])

### 🪄 Fixes

- **assets/config:** update conventional configuration to support both monorepos and polyrepos ([1d0dee8][928])
- **babel:** fix bug in import target output path resolution algorithm ([4e85380][929])
- **packages/project-utils:** ensure `isRootPackage` differentiates from non-root packages ([2b46883][930])
- **packages/project-utils:** ensure specifier-ok checks are also performed on type-only imports ([95b0f68][931])
- **src:** ambient types are only allowed at package root types/ dir ([81ba7bc][932])
- **src:** do not run prettier on files not targeted by `--files` ([128e83a][933])
- **src:** ensure "format" functions properly in a monorepo context given `--scope` ([c4016a8][934])
- **src:** ensure "lint" functions properly in monorepo context given `--scope` ([0f4c7b1][935])
- **src:** ensure "test" functions properly in a monorepo context given `--scope` ([1894d80][936])
- **src:** ensure BF context receives the correct version number from own package.json ([351ee50][937])
- **src:** ensure prettier always gets a pass at markdown and json files in "format" command ([74ab5d9][938])
- **src:** ensure tstyche is only run when type-only tests exist ([18dbad0][939])
- **src:** ensure version extraction regexp behaves robustly ([8e82ac1][940])
- **src:** improve "build distributables" options configuration ([f323a6a][941])
- **src:** improve command output aesthetics ([4a6e254][942])
- **src:** improved `--version` support ([4e3cdc0][943])
- **src:** include full package name and version in release commit subject ([5e00587][944])
- **src:** only match xpipeline commands that are proper suffixes ([9b8b41a][945])
- **src:** use proper gitLogOptions.paths property (fixes typo) ([e22403c][946])

### ⚙️ Build System

- **eslint:** ensure .transpiled directory is ignored ([c34a549][947])
- **gitignore:** upgrade to more robust .gitignore ([43da882][948])
- **husky:** add husky pre-push protective hook ([33af2bc][949])
- **jest:** ensure .transpiled directory is ignored ([c1ac811][950])
- **jest:** ensure .transpiled directory is ignored by jest-haste-map etc ([901d853][951])
- **jest:** ignore type-only tests ([1fb8568][952])
- **package:** correct typo in bug.url ([3373208][953])
- **packages/run:** narrow scope of the list-tasks npm script ([8cbc4e4][954])
- **packages/run:** take advantage of xscript scope-related features ([b1249ed][955])
- **packages/test-utils:** add simple-git dependency ([7d21ee2][956])
- **package:** use `--no-parallel` in "release" script ([5eb9def][957])
- **prettierignore:** ignore license files ([b928e8a][958])
- **remarkrc:** never automatically capitalize our packages' names in markdown headings ([45bcd8c][959])
- **src:** patch both `Proxy` and `spawn` as a side effect ([f50abaf][960])
- Use consistent exclusions across TS configurations ([98a1dd7][961])

## @-xun/symbiote[@1.24.0][962] (2024-11-01)

### ✨ Features

- **packages/debug:** differentiate root from nested namespaces ([467e884][963])
- **packages/project-utils:** re-implement caching subsystem ([472af2c][964])

### 🪄 Fixes

- **packages/project-utils:** remove overengineered sync/async plumbing functions ([8ab4eec][965])
- **src:** ensure build pre-checks run before the ./dist dir is cleared ([69f2dc0][966])
- **src:** ignore internal-resolution-errors with attw since we do our own internal checks ([8dc4a96][967])
- **src:** prevent clean command from obliterating cwd ([e3fa185][968])
- **src:** use upward root mode when searching for babel configs ([89b57c4][969])

### ⚡️ Optimizations

- **eslint:** use \_\_dirname assumption instead of analyzing the entire project ([b8b82d9][970])

### ⚙️ Build System

- **babel:** replace module-resolver and tsconfig-replace-paths with transform-rewrite-imports ([69ebf4a][971])
- **package:** narrow scope of the lint npm script ([556f17e][972])
- **package:** use no-hoist to block execa hoisting ([74d58d6][973])

## @-xun/symbiote[@1.23.0][974] (2024-10-27)

### ✨ Features

- **babel:** replace tsconfig-replace-paths with babel-plugin-transform-rewrite-import ([1bdceca][975])
- **packages/project-utils:** implement support for pseudodecorators ([6ff2bd3][976])
- **src:** perform validity and extraneity checks on build output for "build distributables" ([a1d3657][977])

### 🪄 Fixes

- **eslint:** use latest `analyzeProjectStructure()` function ([fa2a97f][978])
- **packages/project-utils:** ensure ".git" is already returned regardless of .gitignore ([6e3f599][979])
- **packages/project-utils:** ensure analysis cache uses entire call signature when memoizing ([ca021f8][980])
- **packages/project-utils:** repair caching mechanism for analyze-project-structure ([b9218ee][981])

### ⚙️ Build System

- Add pseudodecorators where appropriate ([dc47cfb][982])
- **package:** fix dependency issues identified by xscripts when analyzing its own project structure ([ebb4fb5][983])
- **package:** remove extraneous dependencies ([ccc82b3][984])
- **packages/project-utils:** fix import missing extension ([6556908][985])

## @-xun/symbiote[@1.22.0][986] (2024-10-24)

### ✨ Features

- **src:** make `--run-to-completion` default to `true` for "lint" command ([8bdf28b][987])

### 🪄 Fixes

- **eslint:** disable no-unsupported-features checks, generalize `overwriteFileProperty`, fix eslint-plugin-n bug ([0c3f85c][988])
- **src:** ensure CannotRunOutsideRoot error only triggers when outside root ([531d3ea][989])
- **src:** properly add the development tag when using self-referential xscripts ([a7a66d9][990])

### ⚙️ Build System

- **eslint:** modernize eslint config ([e37006e][991])
- **package:** expand engines.node to all maintained node versions ([349cf20][992])
- **package:** remove more rarely used scripts ([d8b7442][993])
- **packages/project-utils:** add post-npm-install script ([b16b74f][994])
- **package:** use consistent script names ([c7fe410][995])
- **src:** fix import missing extension ([2c40974][996])
- **src:** fix import missing extension ([f5fb1bc][997])

## @-xun/symbiote[@1.21.0][998] (2024-10-18)

### ✨ Features

- **@-xun/babel-plugin-metadata-accumulator:** create accumulator babel plugin ([bf9514f][999])
- **src:** upgrade commands with scope (monorepo) support ([7ad96c5][1000])

### 🪄 Fixes

- **src:** improve conventional-commits config monorepo support ([d54cfa0][1001])
- **tsc:** ensure monorepo package distributables are properly ignored ([646aa3c][1002])

### ⚙️ Build System

- **babel:** update with alias test and generally simplify configuration ([a08c9f1][1003])
- **commitlint:** update commitlint configuration from cjs (js) to esm (mjs) ([cd82265][1004])
- **eslint.config:** activate several new rules ([94a2253][1005])
- **eslint:** update with alias test and latest rule updates ([db0c6d7][1006])
- **eslint:** upgrade eslint-plugin-import usage to take advantage of v9 support ([7dcbf56][1007])
- **jest:** update jest configuration from cjs (js) to esm (mjs) ([e334962][1008])
- **lint-staged:** update lint-staged configuration from cjs (js) to esm (mjs) ([8833e0a][1009])
- **ncurc:** pin non-broken remark-lint-no-inline-padding ([5070ab4][1010])
- **package:** add dependency aliases for find-up\@5 and escape-string-regexp\@4 ([1eff5cb][1011])
- **prettier:** update prettier configuration from cjs (js) to esm (mjs) ([0eb7fd3][1012])
- Prevent automatic updates of super-pinned packages ([8d69310][1013])
- **remarkrc:** add lint-no-undef NODE\_ENV support ([e169f47][1014])
- Split tsconfig into project vs package configurations ([e7b8579][1015])
- **turbo:** add stub turbo configuration ([2036da0][1016])
- Update .gitignore and .prettierignore with improved documentation and latest best practices ([a35f4c0][1017])
- **vscode:** update full project lint vscode task example ([3f1a5a9][1018])

### @-xun/symbiote[@1.20.8][1019] (2024-08-23)

#### 🪄 Fixes

- **src:** ensure release notes have headers at level 2 ([ce701f3][1020])

### @-xun/symbiote[@1.20.7][1021] (2024-08-23)

#### 🪄 Fixes

- **src:** ensure only the start of the release notes are trimmed ([3c48ae1][1022])

### @-xun/symbiote[@1.20.6][1023] (2024-08-23)

#### 🪄 Fixes

- **src/assets:** remove first line from semantic-release plugin generated release notes ([76992d9][1024])

### @-xun/symbiote[@1.20.5][1025] (2024-08-22)

#### 🪄 Fixes

- Ensure xscripts supports limited invocations outside of project root ([0864f92][1026])
- **src/commands/lint:** ensure no erroneous whitespaces are inserted between outputs ([ff3853f][1027])

### @-xun/symbiote[@1.20.4][1028] (2024-08-21)

#### 🪄 Fixes

- Remove deep import ([0bf89ca][1029])

### @-xun/symbiote[@1.20.3][1030] (2024-08-21)

#### 🪄 Fixes

- **src:** move deep import with respect to new deduped location ([dd265b4][1031])
- **src:** remove utf8 symbols from changelog generator output ([cf21d7d][1032])

### @-xun/symbiote[@1.20.2][1033] (2024-08-21)

#### 🪄 Fixes

- **src:** ensure calls to remark include an explicit --rc-path ([bc2a56b][1034])
- **src:** ensure robust handling of formatter errors when running "format" ([5211547][1035])
- **src:** make "build changelog" `CustomCliArguments` type more accurate ([8735f61][1036])
- **src:** work around glob-gitignore bug in "format" ([a86884f][1037])

#### ⚙️ Build System

- **eslint.config:** update @typescript-eslint/require-await linting config ([b23b12b][1038])
- **release.config:** subsume semantic-release plugin functionality into custom release conf plugin ([8b54237][1039])
- **release:** actually fix incorrect semantic-release plugin order during publish flow ([5719681][1040])
- **release:** ensure temporary markdown files end with ".md" ([f2cb8fd][1041])
- **release:** reactivate core release pipeline plugins ([3008cde][1042])
- **src/assets:** move custom semantic-release plugin into config asset ([25e7a3b][1043])
- **src:** ensure custom semantic-release plugin does not allow non-md files ([904c9ac][1044])

### @-xun/symbiote[@1.20.1][1045] (2024-08-20)

#### ⚙️ Build System

- **release:** fix incorrect use of lodash template evaluate delimiter ([35876a1][1047])

## @-xun/symbiote[@1.20.0][1048] (2024-08-20)

### ✨ Features

- Ensure `--changelog-file` is added to "build changelog" ([d84b35f][1049])
- **release:** support modern changelog generation flow ([6ef0123][1050])
- **src:** add `--import-section-file` and `--changelog-file` flags to "build changelog" ([8cf99a9][1051])

### 🪄 Fixes

- **src:** ensure "format" ignores .remarkignore; ensure "lint" respects .remarkignore ([3dd5d78][1052])
- **src:** ensure changelog prints patches (including imports) in proper order ([5c3ed73][1053])
- **src:** properly section off patch notes using dividers ([c912b09][1054])

### ⚙️ Build System

- **package:** update repository url to conform with GHA provenance guidelines ([9cb2d72][1055])
- **src/assets:** disable remark-validate-links for template files ([ce03500][1056])
- **tsconfig:** set declaration=false by default ([22f2f41][1057])

### @-xun/symbiote[@1.19.1][1058] (2024-07-29)

#### 🪄 Fixes

- **package:** fix asset config import configuration ([d201164][1059])

## @-xun/symbiote[@1.19.0][1060] (2024-07-29)

### ✨ Features

- **@black-flag/extensions:** add support for `vacuousImplications` option configuration key ([0c199f6][1061])
- **src:** implement `--output-sort` for "build changelog"; integrate conventional core and drop cli ([587a354][1062])

### ⚙️ Build System

- **babel:** disable explicit-exports-references for now ([92bb25f][1063])
- **commitlint.config:** expand to include several useful rules ([909949d][1064])
- **release:** take advantage of new `--output-sort` functionality ([59dd752][1065])

## @-xun/symbiote[@1.18.0][1066] (2024-07-27)

### ✨ Features

- **src:** "build changelog" now accepts `--only-patch-changelog` and `--output-unreleased` ([6c7ae27][1067])
- **src:** "lint" now accepts `--run-to-completion` and `--ignore-warnings` ([e833523][1068])

### 🪄 Fixes

- **package:** downgrade @arethetypeswrong/cli to ^0.15.0 ([0383586][1069])
- **src:** ensure node options are concatenated properly ([3a3489c][1070])

### ⚡️ Optimizations

- **src:** take advantage of [tsc@5.6-beta][1071] `--noCheck` argument in "build distributables" ([4e75096][1072])

### ⚙️ Build System

- **eslint.config:** update @typescript-eslint/unbound-method linting config ([f6515ea][1073])
- **release:** take advantage of new `--only-patch-changelog` flag ([01375f7][1074])
- **tsconfig:** exclude test/ dir from "lint" command limited scope, include dotfiles under lib ([df6116b][1075])
- Update source aliases to latest ([8d71521][1076])
- **vscode:** take advantage of new `--run-to-completion` flag ([d9b4b80][1077])
- **vscode:** update example with latest best practices ([64b7309][1078])

## @-xun/symbiote[@1.17.0][1079] (2024-07-23)

### ✨ Features

- **@-xun/cli-utils:** add `interpolateTemplate` ([63354c7][1080])
- **@-xun/cli-utils:** add `softAssert` and `hardAssert` ([369d969][1081])

### ⚙️ Build System

- **eslint.config:** update to eslint flat config (eslint.config.mjs) ([609fca8][1082])
- **husky:** update husky scripts ([e55a88e][1083])
- **package:** add semver; force install alpha versions of typescript-eslint et al ([b56fd66][1084])
- **package:** update exports, dependencies, and scripts ([323579d][1085])
- **tsconfig:** ensure files from root dot folders are picked up by linters ([8609db7][1086])
- Update to eslint\@9; begin transition to eslint.config.js flat ([52763c5][1087])

### @-xun/symbiote[@1.16.1][1088] (2024-07-14)

#### 🪄 Fixes

- **src:** place --copy-files argument in proper order in babel build sub-command ([8f1d25d][1089])

## @-xun/symbiote[@1.16.0][1090] (2024-07-14)

### ✨ Features

- **@-xun/run:** make intermediate result available ([1153f42][1091])
- **@-xun/run:** update to work with latest execa ([12ee54a][1092])
- **@black-flag/extensions:** allow check property to accept an array of check functions ([0543cff][1093])
- **src:** implement "lint" command ([346b4ac][1094])

### 🪄 Fixes

- **package:** include missing listr2 dependency ([f42f4ab][1095])
- **src:** ensure "build distributables" copies non-compiled files into ./dist ([e596e5b][1096])
- **src:** ensure "lint" command linter subprocesses don't write to stdout or hang after error ([d96ae1d][1097])
- **src:** ensure proper checks with various arguments ([c9e254a][1098])

### ⚙️ Build System

- **babel:** allow babel to parse syntax attributes and ignore dynamic import transforms ([060ef01][1099])
- **husky:** update lint script to use latest name ([ea6aaff][1100])
- **package:** add final npm scripts ([eb5631b][1101])
- **package:** replace typescript babel preset dependency with syntax plugin ([b72401a][1102])
- **package:** update lint scripts to use xscripts ([7c1e7f1][1103])
- **tsconfig:** remove packages glob from includes ([d3301ca][1104])

## @-xun/symbiote[@1.15.0][1105] (2024-07-07)

### ✨ Features

- **src:** implement "test" script/command ([b665723][1107])

### ⚙️ Build System

- **release:** add --renumber-references to CHANGELOG format sub-step in release flow ([49a3453][1108])

## @-xun/symbiote[@1.14.0][1109] (2024-07-07)

### ✨ Features

- **src:** add --clean-output-dir option to "build distributables" command ([a507530][1110])
- **src:** add struts for projector-js replacement "project" commands ([489e75a][1111])
- **src:** merge "build distributables" and "build transpiled" commands ([1b6c72a][1112])

### 🪄 Fixes

- **@black-flag/extensions:** support deep option aliasing & name expansion; fix several other issues ([82c2b0f][1113])
- **src:** add .tsx to babel --extensions arg ([68c5582][1114])
- **src:** ensure "build distributables" --generate-intermediates-for includes tests ([2ed4344][1115])
- **src:** remove bad options references from "format" command ([cafeb73][1116])

### ⚙️ Build System

- **maintaining:** note that resetting the working tree before publishing is optional ([f08250c][1117])

## @-xun/symbiote[@1.13.0][1118] (2024-07-02)

### ✨ Features

- **src:** implement "build documentation" script ([05e56e7][1119])
- **src:** implement "build externals" script ([1336341][1120])

### ⚙️ Build System

- Ensure local ecosystem ignores only relevant files ([e4a1e0b][1121])
- **tsconfig:** update includes ([c721fed][1122])

## @-xun/symbiote[@1.12.0][1123] (2024-07-01)

### ✨ Features

- **@black-flag/extensions:** add `$artificiallyInvoked` argv support ([b64412c][1124])
- **@black-flag/extensions:** add `getInvocableExtendedHandler` export ([feabe67][1125])
- **rejoinder:** add `getDisabledTags` function export ([534f398][1126])
- **src:** implement "build changelog" script ([8d4bb6d][1127])
- Transmute "format" command's --skip-docs into the more versatile --skip-ignored ([7364616][1128])

### 🪄 Fixes

- **@-xun/cli-utils:** do not lowercase 1st char in error message if 2nd char isn't already lowercase ([2f11281][1129])
- **@-xun/cli-utils:** take advantage of `$artificiallyInvoked` to preserve output state ([9348ebb][1130])
- **@black-flag/extensions:** implement better error handling on import failure ([626ee5a][1131])
- Ensure correct use of debug logger namespace in various places ([65e4330][1132])

### ⚙️ Build System

- **babel:** generalize import rewrites ([ee5cf10][1133])
- **changelog:** add new CHANGELOG.md typo patches ([b9b106a][1134])
- Hide all warnings from nodejs ([c1a4b9c][1135])
- **package:** update scripts (and release.config.js) to use "build changelog" command ([5b11c68][1136])
- **remarkrc:** always translate normal links into reference links ([99c7b33][1137])

### 🔥 Reverted

- _"build(prettierignore): no longer ignore CHANGELOG.md when formatting"_ ([ddd9192][1138])

## @-xun/symbiote[@1.11.0][1139] (2024-06-30)

### ✨ Features

- **@-xun/cli-utils:** add `ErrorMessage.RequiresMinArgs` ([618ce1a][1140])
- **src:** add all-contributors regeneration to "format" command ([d74f099][1141])

### 🪄 Fixes

- **src:** ensure --files never hands prettier paths it can't handle when running "format" command ([0f4dd16][1142])
- **src:** ensure "format" command all-contributors regeneration only targets root README.md ([2cd56d1][1143])
- **src:** ensure all glob relevant glob calls never return directories ([9764967][1144])
- **src:** ensure, when --files is given, at least one option given for "format" command ([fd86f3f][1145])
- **src:** fix fix fd86f3f ([e295a02][1146])

### ⚙️ Build System

- **lint-staged.config:** update to use xscripts ([d290ba5][1147])
- Reorganize deps/devdeps and re-enable commit-spell ([4ea8aa4][1148])

### @-xun/symbiote[@1.10.1][1149] (2024-06-29)

#### 🪄 Fixes

- **src:** ensure --files is respected by prettier in "format" command ([483f036][1150])

## @-xun/symbiote[@1.10.0][1151] (2024-06-29)

### ✨ Features

- **@-xun/cli-utils:** add `AsStrictExecutionContext` intellisense type guard ([813b758][1152])
- **@black-flag/extensions:** add and use `BfeStrictArguments` intellisense type guard ([42af69e][1153])
- **lib:** move `AsStrictExecutionContext` into @black-flag/extensions ([ae46adf][1154])
- **src:** add --prepend-shebang, Next.js support to "build distributables" command ([6575d49][1155])
- **src:** improve capabilities of "format" command ([7d33dfe][1156])

### 🪄 Fixes

- **src:** actually implement --skip-docs functionality in "format" command ([d535b78][1157])
- **src:** restrict root/sub-root check to certain commands ([1b65f46][1158])

## @-xun/symbiote[@1.9.0][1159] (2024-06-28)

### ✨ Features

- **src:** add `--full` argument to "list-tasks" command ([f47742b][1160])
- **src:** prevent cli from running if not in root or sub-root ([4f280dc][1161])

### 🪄 Fixes

- **src:** fix lib output and improve other aspects of the "build distributables" command ([159d771][1162])

### ⚙️ Build System

- **babel:** update core-js usage to 3.37 ([506bf2d][1163])
- **tsconfig:** ensure unnecessary types are excluded from distributables ([f7e65c3][1164])

## @-xun/symbiote[@1.8.0][1165] (2024-06-27)

### ✨ Features

- **src:** commit initial version of "build" command ([c7b7623][1166])

### ⚙️ Build System

- **eslintrc:** do not ignore src/build ([847cc63][1167])
- **gitignore:** do not ignore src files anymore ([fd210c5][1168])

## @-xun/symbiote[@1.7.0][1169] (2024-06-26)

### ✨ Features

- **src:** implement "format" script ([7824c25][1170])

### 🪄 Fixes

- **remarkrc:** improve output of "format" command" ([b4c296e][1171])

### ⚙️ Build System

- **package:** replace format script with "format" command ([005e378][1172])
- **package:** use --hush over --quiet for "format" command ([9e4ae59][1173])

## @-xun/symbiote[@1.6.0][1174] (2024-06-24)

### ✨ Features

- **src:** implement "deploy" script ([62e673b][1175])

## @-xun/symbiote[@1.5.0][1176] (2024-06-23)

### ✨ Features

- **lib:** add `scriptBasename` ([f15a14d][1177])
- **lib:** commit @black-flag/extensions\@1.0.0 and @-xun/cli-utils\@1.0.0 ([c775d6e][1178])

### 🪄 Fixes

- **@-xun/cli-utils:** extend error message deduplication to nested cause strings ([8181e74][1179])
- **@black-flag/extensions:** add missing symbols ([17d53c3][1180])
- **@black-flag/extensions:** allow subOptionOf sub-object to be given directly ([537df70][1181])
- **clean.ts:** add .vercel to list of ignored directories ([fd903a4][1182])
- **lib:** move `ansiRedColorCodes` into rejoinder ([4eabfb5][1183])
- **src:** use loose implications with deploy command ([8e11d66][1184])

### ⚙️ Build System

- **babel:** manually fix index import rewrites ([2f5e8e9][1185])
- **package:** disable tty in debug when running tests ([b57a6be][1186])
- **package:** fix bad overwrite of ignore patterns ([8d03799][1187])

### @-xun/symbiote[@1.4.1][1188] (2024-06-02)

#### 🪄 Fixes

- **src:** pass arbitrary args to downstream executable ([4b94a07][1189])

#### ⚙️ Build System

- **package:** update "start" script to ensure arbitrary args are not erroneously parsed ([a8ddaa5][1190])

## @-xun/symbiote[@1.4.0][1191] (2024-06-01)

### ✨ Features

- **src:** implement "dev" script ([4eeba00][1192])

### ⚙️ Build System

- **package:** use real path to devdep version of xscripts ([99d5786][1193])

## @-xun/symbiote[@1.3.0][1194] (2024-06-01)

### ✨ Features

- **src:** implement "start" script ([cf66045][1195])

### 🪄 Fixes

- **lib:** add type safe guards for output properties when using runWithInheritedIo ([b26a175][1196])
- **package:** add workaround for npx being unable to deal with this type of recursion ([b999593][1197])
- **src:** do not inherit IO when executing "clean" script ([380c055][1198])
- **src:** execute husky post-checkout hook if available ([f0b3b8c][1199])

## @-xun/symbiote[@1.2.0][1200] (2024-05-31)

### ✨ Features

- Implement "prepare" script ([6426d70][1201])

## @-xun/symbiote[@1.1.0][1202] (2024-05-31)

### ✨ Features

- Implement "list-tasks" script ([ac5a9ba][1203])

## @-xun/symbiote[@1.0.0][1204] (2024-05-31)

### ✨ Features

- **src:** implement "clean" script ([89d81a3][1205])

### ⚙️ Build System

- **package:** update build scripts ([589fcb0][1206])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.10.0...@-xun/symbiote@4.11.0
[4]: https://github.com/Xunnamius/symbiote/commit/9cc52cc37aa597895433c4e518afea28bfbe9906
[5]: https://github.com/Xunnamius/symbiote/commit/46b731752dc115b4984cef91c4ac57ffa91ed2e9
[6]: https://github.com/Xunnamius/symbiote/commit/6f5bb56abf2878847ff479e32102d6390d962c90
[7]: https://github.com/Xunnamius/symbiote/commit/ce5b718bfeafc486ae941ca8afa583f09ffbf465
[8]: https://github.com/Xunnamius/symbiote/commit/27118f988e8a3042e7e6bc524f7e27fa1fdbf67f
[9]: https://github.com/Xunnamius/symbiote/commit/a86d7724f6ed137592b4bc42eb98d28c9b90429d
[10]: https://github.com/Xunnamius/symbiote/commit/7470a0e437b9a556aceb0368b84ee979a9bd780e
[11]: https://github.com/Xunnamius/symbiote/commit/d380a6faffc3076ff382f6afcc4880f86d9feddf
[12]: https://github.com/Xunnamius/symbiote/commit/78b0b49664d4801542c2d5cfe6a4ccbcdfe19aa3
[13]: https://github.com/Xunnamius/symbiote/commit/33391287d6fa93ce37ad29b8527d8eadfbebf9e2
[14]: https://github.com/Xunnamius/symbiote/commit/cc0ff1a9ed7470d388277ef45643fc77365e137f
[15]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.11.4...@-xun/symbiote@4.11.5
[16]: https://github.com/Xunnamius/symbiote/commit/c9baba649d18b637b55fc31033742dbbf283718c
[17]: https://github.com/Xunnamius/symbiote/commit/8b9b38d29192f79310f4d20321fb6c21800ed2a7
[18]: https://github.com/Xunnamius/symbiote/commit/4b4e99f1b7994f0081cf60e31ed40f185af8afc8
[19]: https://github.com/Xunnamius/symbiote/commit/610be2e0081957a704d51fc88e85e09a4fbc84de
[20]: https://github.com/Xunnamius/symbiote/commit/9468da13e935305cdc90dfa9e188f0149474d4bb
[21]: https://github.com/Xunnamius/symbiote/commit/6372a4fba4861b5ab8259de273cd13bd448ce3cb
[22]: https://github.com/Xunnamius/symbiote/commit/ae6f3994adbf90bf4c9f964ccc83d4ab8559cf35
[23]: https://github.com/Xunnamius/symbiote/commit/06741e37396f6bca518570afa7ce58c00e8204e6
[24]: https://github.com/Xunnamius/symbiote/commit/d87a3764de3729aac91f643b03c493ecdff42cdc
[25]: https://github.com/Xunnamius/symbiote/commit/a702c9df46aab21d4c0079627c80f91d9890a8d6
[26]: https://github.com/Xunnamius/symbiote/commit/b2038e0e9ca0bdba9682815e2cc2cc75aa2ff4f0
[27]: https://github.com/Xunnamius/symbiote/commit/1d27b5880112b2378fa284fa11bc3e80b4fd91a2
[28]: https://github.com/Xunnamius/symbiote/commit/93bea4089849180fb3254cfdca37a7c7d2ab139b
[29]: https://github.com/Xunnamius/symbiote/commit/289dca9794c9b8aea47d349615b0cf5652e5a392
[30]: https://github.com/Xunnamius/symbiote/commit/28c2ed38e1b02cddc9180894bad5a3d4935855a4
[31]: https://github.com/Xunnamius/symbiote/commit/c576d0f4f284b470b0b39f37c29d04a8307cab67
[32]: https://github.com/Xunnamius/symbiote/commit/c75d3ab63c9a42c8514fa255d7271d2818b34ece
[33]: https://github.com/Xunnamius/symbiote/commit/79b635322b6c45de72c26240f2ac110aa955faab
[34]: https://github.com/Xunnamius/symbiote/commit/219a3cd7c5f7809b5c011f362d275a7ed82b66f0
[35]: https://github.com/Xunnamius/symbiote/commit/9a31eb639192ef2c98b709c71ec8137e3b468c10
[36]: https://github.com/Xunnamius/symbiote/commit/01805e18cf97771ba41e4c0032465ceb27a3f531
[37]: https://github.com/Xunnamius/symbiote/commit/15e4540f7ada8652f2c4f05e4faaeba117b600cf
[38]: https://github.com/Xunnamius/symbiote/commit/24f6fa7a69d0885345399f834876902fb9f27ad8
[39]: https://github.com/Xunnamius/symbiote/commit/aaf3de2dd3c8c49bd3d0f086970713c6ce118b6b
[40]: https://github.com/Xunnamius/symbiote/commit/50cfce127987fb3706260f19c3e56c7405e1b9b6
[41]: https://github.com/Xunnamius/symbiote/commit/3bfaea7d14c91dcd5081a4b7237c27bce658f626
[42]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.11.3...@-xun/symbiote@4.11.4
[43]: https://github.com/Xunnamius/symbiote/commit/b9e599602cbc0f1d65b094b7a5e8739743f64fd2
[44]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.11.2...@-xun/symbiote@4.11.3
[45]: https://github.com/Xunnamius/symbiote/commit/0557e914d494aeba06238075ebcfa60296d71fba
[46]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.11.1...@-xun/symbiote@4.11.2
[47]: https://github.com/Xunnamius/symbiote/commit/043eba5542992e915f9b7de84f7b371c689431d4
[48]: https://github.com/Xunnamius/symbiote/commit/37a893ebf5110ef5e221a37270aab151c4deac80
[49]: https://github.com/Xunnamius/symbiote/commit/510f2b6e26601bc0bcb6a20621006e1557d7a5ca
[50]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.11.0...@-xun/symbiote@4.11.1
[51]: https://github.com/Xunnamius/symbiote/commit/a36940f3a3803445adc684596436de027d7e1370
[52]: https://github.com/Xunnamius/symbiote/commit/8b42478d785d0872304d55ca64c49de6561d6cbc
[53]: https://github.com/Xunnamius/symbiote/commit/a9f6e7b54bc7cb00ff82f7e1a1290fab0e09ba73
[54]: https://github.com/Xunnamius/symbiote/commit/4928389b2bd75325829be298f47edc301ae384e2
[55]: https://github.com/Xunnamius/symbiote/commit/4bc2cbb576dd0fa9e2a4541db242c5b077f6d0bb
[56]: https://github.com/Xunnamius/symbiote/commit/72fc5381c17fc3e4cf72782f79f3bf8088f9885c
[57]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.9.0...@-xun/symbiote@4.10.0
[58]: https://github.com/Xunnamius/symbiote/commit/b62abf3b41ef4fb16014d3e799397a1e70b68b47
[59]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.8.0...@-xun/symbiote@4.9.0
[60]: https://github.com/Xunnamius/symbiote/commit/7334a501dbd85976877057db7fb60456fa1c25ac
[61]: https://github.com/Xunnamius/symbiote/commit/628289127b24a477ca2da6754e05aae7c3056e3b
[62]: https://github.com/Xunnamius/symbiote/commit/7f5d05d68d470e45cf95f72767775c870e660c27
[63]: https://github.com/Xunnamius/symbiote/commit/da2501bbb06d768bfdbff93b92dacc6c054bc2f0
[64]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.7.0...@-xun/symbiote@4.8.0
[65]: https://github.com/Xunnamius/symbiote/commit/a3d081af4f28b71f46ccb04a861e62942893da19
[66]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.6.5...@-xun/symbiote@4.7.0
[67]: https://github.com/Xunnamius/symbiote/commit/6f7857c6941460ee9c0ebee78a33561185ee3312
[68]: https://github.com/Xunnamius/symbiote/commit/7400c4ae3b4c28edb58535f0ef036dba15a9de1e
[69]: https://github.com/Xunnamius/symbiote/commit/e923ace804e71f627d8daea8d7c71bf19218ca86
[70]: https://github.com/Xunnamius/symbiote/commit/3283c194e91a967bc3ecb8bb3449e8108d13243b
[71]: https://github.com/Xunnamius/symbiote/commit/7282711c811f448fb5dc7ca056f193843a8bc8d8
[72]: https://github.com/Xunnamius/symbiote/commit/b70ffe66e9835f98ae8f9b7c653bf0c5f792b282
[73]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.5.6...@-xun/symbiote@4.6.0
[74]: https://github.com/Xunnamius/symbiote/commit/ce4bcc5d42923acbf19c605c061226c85a13ed7a
[75]: https://github.com/Xunnamius/symbiote/commit/ba4184a7bc0d29d29a1cc107352caf3ed8db20cb
[76]: https://github.com/Xunnamius/symbiote/commit/0fb5c0ca7819dfeb641d45d101bd2271fbc7ebe5
[77]: https://github.com/Xunnamius/symbiote/commit/5944d4823bb356dcabddd79efe8da40eb19d3f10
[78]: https://github.com/Xunnamius/symbiote/commit/9013d97e46191865de5e681067002f80f7af1e76
[79]: https://github.com/Xunnamius/symbiote/commit/649cfc38b3af583cd85e603658f553a518a2fc7c
[80]: https://github.com/Xunnamius/symbiote/commit/80b674b03ad4b024dfda304c975ca3b1a2cb53c3
[81]: https://github.com/Xunnamius/symbiote/commit/ae48c67de50494a0a742134dee92a0a65a2935b6
[82]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.6.4...@-xun/symbiote@4.6.5
[83]: https://github.com/Xunnamius/symbiote/commit/039d38c450fe056f6b6b30c1445f4d3096132ba2
[84]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.6.3...@-xun/symbiote@4.6.4
[85]: https://github.com/Xunnamius/symbiote/commit/ee6c7a55f02bc5b0a0a0370e76ff1e329d932ac7
[86]: https://github.com/Xunnamius/symbiote/commit/bf465f950b1bd1c9c52b5305274969ad0f6ddf5e
[87]: https://github.com/Xunnamius/symbiote/commit/a220d9f1211a7720fa149228b3652aed92c2a81b
[88]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.6.2...@-xun/symbiote@4.6.3
[89]: https://github.com/Xunnamius/symbiote/commit/98194a3adb0a7ae3d83f545afbbaa854c6ba6603
[90]: https://github.com/Xunnamius/symbiote/commit/fc17293dde145b29fa0cde21fb8a31ff721d2331
[91]: https://github.com/Xunnamius/symbiote/commit/ad59c703d9aa27bb668ef728efbd374722424df9
[92]: https://github.com/Xunnamius/symbiote/commit/124efdad14c2f16cc24ba6fa706a67cc768c4fb2
[93]: https://github.com/Xunnamius/symbiote/commit/a74a3811eaff8cf8c5da1e10015a0cab0158d1f7
[94]: https://github.com/Xunnamius/symbiote/commit/b1e037cf46e9562300fb6d990a097256145b48e3
[95]: https://github.com/Xunnamius/symbiote/commit/358852ba9ab5f61ef84e77ab01484c51d4106132
[96]: https://github.com/Xunnamius/symbiote/commit/d257e727ea767296e42dc6f100de3550d6cdd2ce
[97]: https://github.com/Xunnamius/symbiote/commit/dab0014ae0f199dbc73f0628ba67fd9733140fa6
[98]: https://github.com/Xunnamius/symbiote/commit/f1bb7d72fe86a2b2a2febe2841e2c2083e46feb0
[99]: https://github.com/Xunnamius/symbiote/commit/62b2d23c9e5039f74cfb4a1fc65b514574985dbf
[100]: https://github.com/Xunnamius/symbiote/commit/402f2434a5ebb1c449013665f275b4e58ebff874
[101]: https://github.com/Xunnamius/symbiote/commit/f3252011f923f79af5084186d84d0ae0de957c27
[102]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.6.1...@-xun/symbiote@4.6.2
[103]: https://github.com/jestjs/jest/issues/9021
[104]: https://github.com/Xunnamius/symbiote/commit/632b628e361012d75cc483d6fc183f75893c0651
[105]: https://github.com/Xunnamius/symbiote/commit/7c37c2bf8997d0a44044ace389428c5b10f65522
[106]: https://github.com/Xunnamius/symbiote/commit/6a918de7c32fd6ce3641a6db8a0a2fdf60e1d50b
[107]: https://github.com/Xunnamius/symbiote/commit/bdec01a2c0e0df57f61fb5566b03e7019a9e65c8
[108]: https://github.com/Xunnamius/symbiote/commit/50fce9777b28558c69370af8d1b5095374add002
[109]: https://github.com/Xunnamius/symbiote/commit/ab551ef37bdcb7b323cc3c835bc858b90daa994e
[110]: https://github.com/Xunnamius/symbiote/commit/5a0c48ed6f35b6c700ec57d4d2b18cdb0b6a3072
[111]: https://github.com/Xunnamius/symbiote/commit/847991c9d83b43be51efaa28b21529a83e5fa358
[112]: https://github.com/Xunnamius/symbiote/commit/6785d4caadce35c7514398839e11567da3cb97b0
[113]: https://github.com/Xunnamius/symbiote/commit/35a2a53f0a7adc348b59274373ba520618a8aae9
[114]: https://github.com/Xunnamius/symbiote/commit/2e21575a6b12383c9c6430e16759d69a34e30083
[115]: https://github.com/Xunnamius/symbiote/commit/c8389d4b72dcb55238129d5a5408867bb4779cbd
[116]: https://github.com/Xunnamius/symbiote/commit/abe8c57d563f70b817a149f61910dcccc94d63e7
[117]: https://github.com/Xunnamius/symbiote/commit/f4af5bd73741921ed52da883b6024b1d5d83d10e
[118]: https://github.com/Xunnamius/symbiote/commit/b27e80c831932a12750f5f822dc92b863c7d2492
[119]: https://github.com/Xunnamius/symbiote/commit/cacbf36c956a027252429fc1b30706d95e84793d
[120]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.6.0...@-xun/symbiote@4.6.1
[121]: https://github.com/Xunnamius/symbiote/commit/091b975f36512ab8a9a31a937de86685b3c2ce90
[122]: https://github.com/Xunnamius/symbiote/commit/6ae527e0691ecee93e37dad2a52380fc32b10d09
[123]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.4.4...@-xun/symbiote@4.5.0
[124]: https://github.com/Xunnamius/symbiote/commit/830a9796723d84b2e7b1d9ee92fd8ced646bfb13
[125]: https://github.com/Xunnamius/symbiote/commit/505f48cfb2d8ac3aa0286a6944a583708fb1b4e0
[126]: https://github.com/Xunnamius/symbiote/commit/c6f107063b953c923a70764f1c3bac24aab7e87e
[127]: https://github.com/Xunnamius/symbiote/commit/292021fb333b0e5efa3a055939949fc33d57d30a
[128]: https://github.com/Xunnamius/symbiote/commit/fba8c38a9985dd06a3b7ab38c03319e6f54ddb3e
[129]: https://github.com/Xunnamius/symbiote/commit/d28ac8d12bcca2598608dd9bff06467266adfdaf
[130]: https://github.com/Xunnamius/symbiote/commit/b9cafd27f3e916e27082fb2f65dd8d7fdb3b1729
[131]: https://github.com/Xunnamius/symbiote/commit/e330384d08d660b4c8ab83a47d6159acbff3be82
[132]: https://github.com/Xunnamius/symbiote/commit/479f3d1d8dcb9965c921f66eaf7d4ba490a5c1cb
[133]: https://github.com/Xunnamius/symbiote/commit/84a11fd8e720226d725a66deaf538f569c635f5d
[134]: https://github.com/Xunnamius/symbiote/commit/e6756a772d31865ce787cc4c5fdeaf2339624f72
[135]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.5.5...@-xun/symbiote@4.5.6
[136]: https://github.com/Xunnamius/symbiote/commit/6c12fe85338c1ca20a9b3dedd0e391ce548a98a4
[137]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.5.4...@-xun/symbiote@4.5.5
[138]: https://github.com/Xunnamius/symbiote/commit/6f50d53faef5aceb9ab30a8a468d34a5aa510945
[139]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.5.3...@-xun/symbiote@4.5.4
[140]: https://github.com/Xunnamius/symbiote/commit/c4d8cccc404efe578bf5a8973200e88be33c4128
[141]: https://github.com/Xunnamius/symbiote/commit/955647a1190cef5c262f5e919a1d6567ba208aa3
[142]: https://github.com/Xunnamius/symbiote/commit/a59042b912d1ce2b243990af310cac52a18f98ac
[143]: https://github.com/Xunnamius/symbiote/commit/84568991b252719eea0165c050ea342619b6e81d
[144]: https://github.com/Xunnamius/symbiote/commit/44f23d14a1fe2b2e95086e71ec56e1566675d3ed
[145]: https://github.com/Xunnamius/symbiote/commit/cb874b79ae0a3121de291627df819e31820aa61e
[146]: https://github.com/Xunnamius/symbiote/commit/16a2a30cc7deb295e91f691a2ca3a3f85a7bc1d0
[147]: https://github.com/Xunnamius/symbiote/commit/aaa57860fafa73b15939728e30719e2d90e7cae0
[148]: https://github.com/Xunnamius/symbiote/commit/22682caf17ba8dbb6d97e71df21670f68fda28a5
[149]: https://github.com/Xunnamius/symbiote/commit/460d8faf6568061a665ca002097e46d6be8f789b
[150]: https://github.com/Xunnamius/symbiote/commit/3311bd9bfde71a7eb799f13cd0b84320b49a5dd6
[151]: https://github.com/Xunnamius/symbiote/commit/7df6d8dfe36783dafa39e650e510d94ec44534fe
[152]: https://github.com/Xunnamius/symbiote/commit/3e873017a51d0741a3eccd72a47fe87f235bc979
[153]: https://github.com/Xunnamius/symbiote/commit/972fa3b81cb3e7db6a9e2c4f5bf25c70fa51240e
[154]: https://github.com/Xunnamius/symbiote/commit/9b104b4f05851753d3028498ca99e31b195ae405
[155]: https://github.com/Xunnamius/symbiote/commit/2deffe5b3dd8e8ec5321ed8eb23b3a3ce1db5e7e
[156]: https://github.com/Xunnamius/symbiote/commit/be1311cc67e285d668dca14a0a14ac6918f3c7bf
[157]: https://github.com/Xunnamius/symbiote/commit/feee9f1b7ca8bb61c96d08bfc8ea490b2693c656
[158]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.5.2...@-xun/symbiote@4.5.3
[159]: https://github.com/Xunnamius/symbiote/commit/090a7857a95973f8ad6febe2e79edda5e1f32856
[160]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.5.1...@-xun/symbiote@4.5.2
[161]: https://github.com/Xunnamius/symbiote/commit/5258a5e58c9282dd65c5ac4b37e65d4dd5e8274f
[162]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.5.0...@-xun/symbiote@4.5.1
[163]: https://github.com/Xunnamius/symbiote/commit/14881c6ae575a80f13d94788e87c34b87112ad19
[164]: https://github.com/Xunnamius/symbiote/commit/5aec57557034c3119b9ae7aa1f548713be9dd9dd
[165]: https://github.com/Xunnamius/symbiote/commit/112ec906cd5ecd7e7930d8f2608b0e445b2c2753
[166]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.3.1...@-xun/symbiote@4.4.0
[167]: https://github.com/Xunnamius/symbiote/commit/de44cf3f9abbc7550310bea0f718d51d9fdbe834
[168]: https://github.com/Xunnamius/symbiote/commit/90e189d7f2f214eea404261f4980b8c4d1849ddd
[169]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.4.3...@-xun/symbiote@4.4.4
[170]: https://github.com/Xunnamius/symbiote/commit/c92ab68a16e7538389acd7b29b9111854d6f788b
[171]: https://github.com/Xunnamius/symbiote/commit/0dd55be81c74baa4cdc808f190118d5ab6aab455
[172]: https://github.com/Xunnamius/symbiote/commit/cdefd67cf7ced43fc325a93600f8e3eb9485019a
[173]: https://github.com/Xunnamius/symbiote/commit/42690e3b17f6a7bc09a98f177b79ca019a34b8df
[174]: https://github.com/Xunnamius/symbiote/commit/7cd0a3e8dd6c97398ea7ef1fe04314d4e1c5ff09
[175]: https://github.com/Xunnamius/symbiote/commit/7983d57e86a5bd6d567909fb017d48710cb3dbef
[176]: https://github.com/Xunnamius/symbiote/commit/7a145a8dda6aa5e205bbfe830fd838373fc16e91
[177]: https://github.com/Xunnamius/symbiote/commit/bb9694275621f438d228c29d21c90c8a719ee324
[178]: https://github.com/Xunnamius/symbiote/commit/7e606c8bb71b10aa1481d2f6c0518c5da019e8db
[179]: https://github.com/Xunnamius/symbiote/commit/4c1f90ff00d4ed37f51f85938287125983b30a00
[180]: https://github.com/Xunnamius/symbiote/commit/c18026e456e356816ccd1e63788a6dcafcd3a4f5
[181]: https://github.com/Xunnamius/symbiote/commit/6098a0190851724986ac036f1d9b5e50a2f3d85a
[182]: https://github.com/Xunnamius/symbiote/commit/5a24b3bcd0aa1c48adc2ef345440b78feac8756b
[183]: https://github.com/Xunnamius/symbiote/commit/dddfae645350967434919f09013072fb4ec49b3d
[184]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.4.2...@-xun/symbiote@4.4.3
[185]: https://github.com/Xunnamius/symbiote/commit/913be2cc1bd83fb839fa57bed2fd5417e9dea6a1
[186]: https://github.com/Xunnamius/symbiote/commit/cdafea2baa38b239d5977b443b3a3091b1a1c2e6
[187]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.4.1...@-xun/symbiote@4.4.2
[188]: https://github.com/Xunnamius/symbiote/commit/1d1c844aef959813f3baa9090d729d2d0eb0e441
[189]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.4.0...@-xun/symbiote@4.4.1
[190]: https://github.com/Xunnamius/symbiote/commit/7fbd108cee2f783e7fe92308d969f39ae3bc1d0c
[191]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.2.9...@-xun/symbiote@4.3.0
[192]: https://github.com/Xunnamius/symbiote/commit/3c033a0f111d830c49ba863c5486e7b28732598d
[193]: https://github.com/Xunnamius/symbiote/commit/901efd646e839990ea9c3d4c210717b184546453
[194]: https://github.com/Xunnamius/symbiote/commit/04a3b2d9d0921ab493301c2d80d642ba1252c60f
[195]: https://github.com/Xunnamius/symbiote/commit/df8b5ef5dba49dacb2b336f13473f3f6e3113b1d
[196]: https://github.com/Xunnamius/symbiote/commit/3a7357840cda544c48460fad52ef1d6be3003067
[197]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.3.0...@-xun/symbiote@4.3.1
[198]: https://github.com/Xunnamius/symbiote/commit/6ed00ca6896b0b8cec3f95d250dcb8a4cc24b2a7
[199]: https://github.com/Xunnamius/symbiote/commit/b98a9ba018b6e2b5cb0ea4a5311a6e3e0d7f9bc7
[200]: https://github.com/Xunnamius/symbiote/commit/aceacf230985ea3a31dcde5b23d3155e26239c1c
[201]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.1.1...@-xun/symbiote@4.2.0
[202]: https://github.com/Xunnamius/symbiote/commit/167e0f9b786b0a4f8ab8478cb4284deee6916ad7
[203]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.2.8...@-xun/symbiote@4.2.9
[204]: https://github.com/Xunnamius/symbiote/commit/a1f5561e6e036b3d2f78a95f5bba872cff737ed5
[205]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.2.7...@-xun/symbiote@4.2.8
[206]: https://github.com/Xunnamius/symbiote/commit/ffa2219b5458551337af8081b76f7ffb8422c513
[207]: https://github.com/Xunnamius/symbiote/commit/86d92601372a9aaaa106fa7da583aa67e30fb2bc
[208]: https://github.com/Xunnamius/symbiote/commit/a058f5cbda7c0f06634d828bfc30316534d6a532
[209]: https://github.com/Xunnamius/symbiote/commit/b0fafb0fc89c9358950c12942f58a2bd2faad9e3
[210]: https://github.com/Xunnamius/symbiote/commit/598c1a2d9aef746241688a85c69e47f753ae6be4
[211]: https://github.com/Xunnamius/symbiote/commit/2f8b7400a08e3c23a229d81ee54f9c1a3abab488
[212]: https://github.com/Xunnamius/symbiote/commit/a23c165debfc4b8388476a3aa271206f0f4a6ce1
[213]: https://github.com/Xunnamius/symbiote/commit/366bb212037bf3e9240d3bb0dad9681d8fe4e3f1
[214]: https://github.com/Xunnamius/symbiote/commit/6aadba9b7ce410b16be0cf3b1b3d7b457578d2b3
[215]: https://github.com/Xunnamius/symbiote/commit/1bf240870e3eaab72f5c4450b263dbd2be85d53c
[216]: https://github.com/Xunnamius/symbiote/commit/f693afacf925b9a5eae5eb5d8bd87a2b24dcac69
[217]: https://github.com/Xunnamius/symbiote/commit/d966bfcee6825004b81563a957cbb9978d518860
[218]: https://github.com/Xunnamius/symbiote/commit/db07632663c7748ead0d5626fea9a20f60c0e7f7
[219]: https://github.com/Xunnamius/symbiote/commit/9c93f9ae59b9ca01377e29203bc92472abbebda8
[220]: https://github.com/Xunnamius/symbiote/commit/8aa98908256c7a37c1ba96ad77e58c65fc36c528
[221]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.2.6...@-xun/symbiote@4.2.7
[222]: https://github.com/Xunnamius/symbiote/commit/c04aab1499ec68ba290804c7dc39af7cbd1dc7c8
[223]: https://github.com/Xunnamius/symbiote/commit/15edf410dda3acade2d20bba46b3723a194a3206
[224]: https://github.com/Xunnamius/symbiote/commit/86f2c94704f85069327adaead43ac46692492d20
[225]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.2.5...@-xun/symbiote@4.2.6
[226]: https://github.com/Xunnamius/symbiote/commit/f0f69b716a00d5f1f6098f54ac38445e42d7263c
[227]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.2.4...@-xun/symbiote@4.2.5
[228]: https://github.com/Xunnamius/symbiote/commit/450f56aebb4b9ee6be666259169f3898916253ca
[229]: https://github.com/Xunnamius/symbiote/commit/46529ad74f89d637b6309c51280863edf6083b30
[230]: https://github.com/Xunnamius/symbiote/commit/39612110cff7d320f3e6799bd584e8886f76765d
[231]: https://github.com/Xunnamius/symbiote/commit/f0c8437d56e934ee2612d80fa02ba50c70af5c0d
[232]: https://github.com/Xunnamius/symbiote/commit/ba5b5af26c454360998acd47982337cd68dad018
[233]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.2.3...@-xun/symbiote@4.2.4
[234]: https://github.com/Xunnamius/symbiote/commit/1ec1b7bdf126210dcfd31b34e7c9448cbcc26d1c
[235]: https://github.com/Xunnamius/symbiote/commit/98625aa87ed999b861b87e7c22322a8225e04095
[236]: https://github.com/Xunnamius/symbiote/commit/1709d329bfb8c571ced2a88d048e17f73392f25d
[237]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.2.2...@-xun/symbiote@4.2.3
[238]: https://github.com/Xunnamius/symbiote/commit/67a8f34f58af4c95d5bf776dbc1ebb92248cdd54
[239]: https://github.com/Xunnamius/symbiote/commit/2fa5e793cececb3e2fa2a521a0850e9c36f8b3aa
[240]: https://github.com/Xunnamius/symbiote/commit/4c526922de2abb4c388841c156d2f8892cc78690
[241]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.2.1...@-xun/symbiote@4.2.2
[242]: https://github.com/Xunnamius/symbiote/commit/62ec6fdd59d5511dd7b872237f3ff5bf7673e789
[243]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.2.0...@-xun/symbiote@4.2.1
[244]: https://github.com/Xunnamius/symbiote/commit/cdd5bb0401bdf2067931bf7fde141f6a64a89cef
[245]: https://github.com/Xunnamius/symbiote/commit/8b3f7ed42fc988d7ca1dd3e986a3dbda74a93e9e
[246]: https://github.com/Xunnamius/symbiote/commit/265eba703b82949caca1990d603eed7d7c2ce5df
[247]: https://github.com/Xunnamius/symbiote/commit/15a924f2fa3ea9b6ef04234a4514cecd4124c8e9
[248]: https://github.com/Xunnamius/symbiote/commit/038cd5d4fe3c6d6d93edf3ac109b1bba6493afd0
[249]: https://github.com/Xunnamius/symbiote/commit/94dc6b2a3757b365e9eb95428c31348300164c4d
[250]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.0.0...@-xun/symbiote@4.1.0
[251]: https://github.com/Xunnamius/symbiote/commit/248cd41546a2b6ad596d7cd78d1874c1d3ba66ac
[252]: https://github.com/Xunnamius/symbiote/commit/d9e7c7973a8d081766715b83aace2467d991947a
[253]: https://github.com/Xunnamius/symbiote/commit/d82bcd7691f407210e902a24836ac1331ef05ada
[254]: https://github.com/Xunnamius/symbiote/commit/5dcbce0a08681337c358d0ffe75e0e5ecbab195e
[255]: https://github.com/Xunnamius/symbiote/commit/93a6605229e34a024c3c2b296e07d6657e8013e7
[256]: https://github.com/Xunnamius/symbiote/commit/c000bfbe497320d9e036666c608514b5d2231c35
[257]: https://github.com/Xunnamius/symbiote/commit/9d9933bf698c389387936dba8f732c91ea946d8f
[258]: https://github.com/Xunnamius/symbiote/commit/c12eee0eacde82ea54b7dc2fef8008ce22cb16f6
[259]: https://github.com/Xunnamius/symbiote/commit/0553aa177779e7c1b705d9b3c7e04e51c7be4b1e
[260]: https://github.com/Xunnamius/symbiote/commit/f3ad037d919d17c816b1610888648fabbaf800e9
[261]: https://github.com/Xunnamius/symbiote/commit/7d003ce63592ccb463e5231923a364e6dc934651
[262]: https://github.com/Xunnamius/symbiote/commit/20324342f748bff8d947df42145e5037fdb7697f
[263]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@4.1.0...@-xun/symbiote@4.1.1
[264]: https://github.com/Xunnamius/symbiote/commit/b6645a7e13ad9c4a85e6a278cbf060db1e4bf320
[265]: https://github.com/Xunnamius/symbiote/commit/3aa599d2e24359c230a80af4fc668f2322c16024
[266]: https://github.com/Xunnamius/symbiote/commit/61eb0c9682654b16a0587d194a0b10cd76d2b349
[267]: https://github.com/Xunnamius/symbiote/commit/ed66b74d9c0ebe6fad155dbe0fbeb5573b68e764
[268]: https://github.com/Xunnamius/symbiote/commit/4c08a368b166ea73cb6219386e8174b0981521a6
[269]: https://github.com/Xunnamius/symbiote/commit/97b7a8011336c58d0e546b67e8415791c3d0d9b1
[270]: https://github.com/Xunnamius/symbiote/commit/c5ca5f3d45974df21160d7a28c3f98f42e6946fe
[271]: https://github.com/Xunnamius/symbiote/commit/00c89c0e12cbbbac4a5c41657d6a3432d091d1a6
[272]: https://github.com/Xunnamius/symbiote/commit/f529ba38840d5fe69c0632ec41e089fcfd938d7f
[273]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.7.0...@-xun/symbiote@4.0.0
[274]: https://github.com/Xunnamius/symbiote/commit/af582b3236aee12fc8e50b787f824f38299182e3
[275]: https://github.com/Xunnamius/symbiote/commit/3795c8746f425e3ba5299f8710eedfe652bf08df
[276]: https://github.com/Xunnamius/symbiote/commit/4c962f67d3d8e55c1f818f59eca0f36bc234e988
[277]: https://github.com/Xunnamius/symbiote/commit/ab2a0e249e0558b8fb93d9af44326e0f569fed1f
[278]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.6.0...@-xun/symbiote@3.7.0
[279]: https://github.com/Xunnamius/symbiote/commit/e397219b262f8e834e471b1d1d8a62975c9158bc
[280]: https://github.com/Xunnamius/symbiote/commit/3df79efac7272a00b5e51c6ca9875073f9af688c
[281]: https://github.com/Xunnamius/symbiote/commit/3c956cd879c454eb4767dd3e1df4fd887eeb3727
[282]: https://github.com/Xunnamius/symbiote/commit/8fba702209cd19c4f0148f68b782975758138b76
[283]: https://github.com/Xunnamius/symbiote/commit/286607caa9b6eeec5a29237196295b91eecacedb
[284]: https://github.com/Xunnamius/symbiote/commit/0294392fb9d33799b59d55001aa717d37f1aa319
[285]: https://github.com/Xunnamius/symbiote/commit/d2131cb0d9dc886092f4615cde5dda583d6c8563
[286]: https://github.com/Xunnamius/symbiote/commit/70de8700e91e15a1f0ee0cd0e6a7ea10908e0442
[287]: https://github.com/Xunnamius/symbiote/commit/0b6dd7df2cb4cf69ee3ec629ee17455d38602626
[288]: https://github.com/Xunnamius/symbiote/commit/67e0d9194272d321a9790ab596efff872c47369d
[289]: https://github.com/Xunnamius/symbiote/commit/4d7efb370f26dc7d3eeaa2e5fab24969dd391132
[290]: https://github.com/Xunnamius/symbiote/commit/d9784f18f1d0fa98b5686da184d9d6b0031ade83
[291]: https://github.com/Xunnamius/symbiote/commit/0dc52d4a6d8a08f62b9d0d89fe0cd03750ff95ad
[292]: https://github.com/Xunnamius/symbiote/commit/a60233faf43d028f2b5c6448f99c454ad23464fc
[293]: https://github.com/Xunnamius/symbiote/commit/5b47ed2d6fe0af1db7aa6ea5317fc93c9e94476f
[294]: https://github.com/Xunnamius/symbiote/commit/41d1ef4d159bc3b62cf42fc3744d3ad65dd10b12
[295]: https://github.com/Xunnamius/symbiote/commit/c956ea85d14d5da271d544dc12dd4f1c2abf0486
[296]: https://github.com/Xunnamius/symbiote/commit/39d43efdd80115a91829327d32d1df0fd5a6fda3
[297]: https://github.com/Xunnamius/symbiote/commit/4b74b55414ca8742c6df81f835d65c1a7791b641
[298]: https://github.com/Xunnamius/symbiote/commit/5382c4b2b68ebc886bf1813afcfd7045f7e66dbb
[299]: https://github.com/Xunnamius/symbiote/commit/a0fd4632317a80ed8553add4f1583cd9b6fe75b0
[300]: https://github.com/Xunnamius/symbiote/commit/56bbaf3e7920dd663ac4feb1843e9819f54486e4
[301]: https://github.com/Xunnamius/symbiote/commit/ba3cb38a3dee5515632a20f1ba6754e03fff159c
[302]: https://github.com/Xunnamius/symbiote/commit/765a78ea6e6ef80d67a451063849710ca9c27465
[303]: https://github.com/Xunnamius/symbiote/commit/17247f72748536498d05764a26e7594410a0411d
[304]: https://github.com/Xunnamius/symbiote/commit/d55032757f11111bb8cc860b4c36aae759e32d23
[305]: https://github.com/Xunnamius/symbiote/commit/77bad6dea5e092506ddd34343414a81b638b705f
[306]: https://github.com/Xunnamius/symbiote/commit/9242a425f184ae2968110d38f29c4a589520f91c
[307]: https://github.com/Xunnamius/symbiote/commit/cf64b728a09980135c9571e6bb06883fea70aea2
[308]: https://github.com/Xunnamius/symbiote/commit/12a1d804895c15235b4b914a1323774f654807fd
[309]: https://github.com/Xunnamius/symbiote/commit/1a9353721ece828c73ac912a770751de657ce460
[310]: https://github.com/Xunnamius/symbiote/commit/d0ef6e6b168beb25c51cfdfd8c0907a2522dd427
[311]: https://github.com/Xunnamius/symbiote/commit/e7604b8eba87662962b7ec7c023e209913109131
[312]: https://github.com/Xunnamius/symbiote/commit/0c201f6bb84ad4e51e387813e0bafe56d0923520
[313]: https://github.com/Xunnamius/symbiote/commit/2fb9a7f441aaeb1543286cc7a9626191e2495572
[314]: https://github.com/Xunnamius/symbiote/commit/b0d6f0a5bbac34d0602d79ce93be76672bc62112
[315]: https://github.com/Xunnamius/symbiote/commit/a4d2d0a19f2bec51d747916efd39f66b3071b295
[316]: https://github.com/Xunnamius/symbiote/commit/767711e01317492b7dda1a0e68460cc5852caace
[317]: https://github.com/Xunnamius/symbiote/commit/e76583f9c27bd8c8d0033d1dad0d244aea741cf8
[318]: https://github.com/Xunnamius/symbiote/commit/500d282254dd9cf74fa2ef3586f7b7920104ad22
[319]: https://github.com/Xunnamius/symbiote/commit/3a75faa2b1708dbeea8ba87244e7b8a514fc90b7
[320]: https://github.com/Xunnamius/symbiote/commit/9345daa6d9639e66583c30e890f78ea79e2b604a
[321]: https://github.com/Xunnamius/symbiote/commit/d27dabbf75a079bf16e30a4957e94d461ea20303
[322]: https://github.com/Xunnamius/symbiote/commit/81cccf645b918406addbdabd56130804ada733a2
[323]: https://github.com/Xunnamius/symbiote/commit/d7f46cbf42bc867fee2325d6e73babc37c0a450c
[324]: https://github.com/Xunnamius/symbiote/commit/7e0efd276c97ec3585413567506d53586142bbdc
[325]: https://github.com/Xunnamius/symbiote/commit/498c82d8ba68bf06fd17b61e707e97bb43ab53d7
[326]: https://github.com/Xunnamius/symbiote/commit/d49cbd04cbe957b790f445ddb8dc9880fd073526
[327]: https://github.com/Xunnamius/symbiote/commit/11582b4535378928960e23eba7080ed48d1e880b
[328]: https://github.com/Xunnamius/symbiote/commit/581afdcd84b3033e566bac2191dee05c8a5482bc
[329]: https://github.com/Xunnamius/symbiote/commit/9689e75ce923f73503b96dbf80c05fa528c230f3
[330]: https://github.com/Xunnamius/symbiote/commit/b620574aafe4ff865d834acc9d0c8e819a57dbef
[331]: https://github.com/Xunnamius/symbiote/commit/bcf651ee77897f8001822755d9b54492aee4b261
[332]: https://github.com/Xunnamius/symbiote/commit/5f44d76257205ec7374c943b653724cb8c7e192d
[333]: https://github.com/Xunnamius/symbiote/commit/1fa628cfd171b7ef74e4174c056d681c975703af
[334]: https://github.com/Xunnamius/symbiote/commit/5b25a89fd028a14cf002bcb7076fa8051497f050
[335]: https://github.com/Xunnamius/symbiote/commit/7c5328c4e80d2933e375ef6b8fbcca638e806aba
[336]: https://github.com/Xunnamius/symbiote/commit/63cff633c3d7e32cf967f0ddcbc07b0dbc9c86d5
[337]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.5.2...@-xun/symbiote@3.6.0
[338]: https://github.com/Xunnamius/symbiote/commit/2a4f9c137a879b6e0d19dc7269398051d3a84f5e
[339]: https://github.com/Xunnamius/symbiote/commit/17576f5b1401ca3fd02797e45eba07515f5d0e04
[340]: https://github.com/Xunnamius/symbiote/commit/dac06fcb38bfa26a0ef0093c0b2e153a9a4785ac
[341]: https://github.com/Xunnamius/symbiote/commit/b9f7fa25a8f7a983a389fe1731ef57cebe4c4856
[342]: https://github.com/Xunnamius/symbiote/commit/f069aa0ab9298a0f9ef4bc7d9c00431c8d4bee3d
[343]: https://github.com/Xunnamius/symbiote/commit/ed1a5ec2c5c29c46cbf2f099d0fc21588bc49503
[344]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.4.1...@-xun/symbiote@3.5.0
[345]: https://github.com/Xunnamius/symbiote/commit/83fb0e7bd8f07c0dab1d4418ab1ac84eb6767933
[346]: https://github.com/Xunnamius/symbiote/commit/2ab9d64aaeb0e69de010a3bbedc9b87185a310a1
[347]: https://github.com/Xunnamius/symbiote/commit/6569d9be3520eae2852e983784db0c634d56d379
[348]: https://github.com/Xunnamius/symbiote/commit/ea142b3e818f95ffe614cbe25f25da1613e13e6f
[349]: https://github.com/Xunnamius/symbiote/commit/8c5201e743d05ac8fa91a6dfc898dd5ba5829ba5
[350]: https://github.com/Xunnamius/symbiote/commit/4991569c4f93aec738b7f86d75103595f8f1c3f6
[351]: https://github.com/Xunnamius/symbiote/commit/47f9bd9c1680bba6418370ce44f5633cad5fe38d
[352]: https://github.com/Xunnamius/symbiote/commit/89282ed759b89ed21c8bcdeb3ebd07be433a20dc
[353]: https://github.com/Xunnamius/symbiote/commit/1bfdd73d8435fb5e43ca42185af41272690e7ac7
[354]: https://github.com/Xunnamius/symbiote/commit/bd9df4f1302077e4a6eb39fd157ac34b0142fc8c
[355]: https://github.com/Xunnamius/symbiote/commit/a69e0d6f8d983955dada8ed048c2d8d161482835
[356]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.5.1...@-xun/symbiote@3.5.2
[357]: https://github.com/Xunnamius/symbiote/commit/4827ca563049e20cfae541de8bd49571fefa0b48
[358]: https://github.com/Xunnamius/symbiote/commit/00dd29f3b2195be42ef07a012b014eccc6c50b6c
[359]: https://github.com/Xunnamius/symbiote/commit/af6a654d7cdc4073a574dbe50e6b0872b4b763d6
[360]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.5.0...@-xun/symbiote@3.5.1
[361]: https://github.com/Xunnamius/symbiote/commit/11544aadc1ccb70788a5095a78bdaa26fd1d94a5
[362]: https://github.com/Xunnamius/symbiote/commit/b039d223f84452da28720ff1b759ac8811e059ac
[363]: https://github.com/Xunnamius/symbiote/commit/1334019646a8d192c5c1685232fdce3c35e9f229
[364]: https://github.com/Xunnamius/symbiote/commit/45de80986864110ef1052257f3d840a305ef490c
[365]: https://github.com/Xunnamius/symbiote/commit/2ddaf7feef114bf9696c398399445e972be14ac6
[366]: https://github.com/Xunnamius/symbiote/commit/835083432bcde8ce4303151b7f63bc4461a43efd
[367]: https://github.com/Xunnamius/symbiote/commit/b84c55470991c13dbdfe5d7012f3f4f8c59bd550
[368]: https://github.com/Xunnamius/symbiote/commit/1fa34726a3e23ec0acc2d3735b6309742d93522b
[369]: https://github.com/Xunnamius/symbiote/commit/42dbf8b86d6125ae04fd042936bbef3d44dceed3
[370]: https://github.com/Xunnamius/symbiote/commit/d7fefe7e47d85b44b2a73424ce81b4491c1522f7
[371]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.8...@-xun/symbiote@3.4.0
[372]: https://github.com/Xunnamius/symbiote/commit/36c11ee98ea0ad0548e299e98538569e422ae592
[373]: https://github.com/Xunnamius/symbiote/commit/8aba18933a7757db5f3ed7d89c41ab51fbeb839e
[374]: https://github.com/Xunnamius/symbiote/commit/f819ed3e190983a7ab6b0059c2342fd35f5223c1
[375]: https://github.com/Xunnamius/symbiote/commit/2046f8c44f47716d84985a36edb7fe8c26a81165
[376]: https://github.com/Xunnamius/symbiote/commit/98e7a529c573da7882a47c899f87bc0b2fa261e0
[377]: https://github.com/Xunnamius/symbiote/commit/4bd2e7052da7b048c799a2d11c07708ae1d226c7
[378]: https://github.com/Xunnamius/symbiote/commit/6cc0adbd2c496f9b4a3a848044e956aac91f0574
[379]: https://github.com/Xunnamius/symbiote/commit/a5dc6e8e56eda17ac2ceb427807d823527afd2d9
[380]: https://github.com/Xunnamius/symbiote/commit/ccfdfcf84a7816dfeea6e7d89b4a2ba9803898b3
[381]: https://github.com/Xunnamius/symbiote/commit/03bfdc14c46da157a5b8b14dede67afac3735796
[382]: https://github.com/Xunnamius/symbiote/commit/3314761fd3d4c62c7a0b12c38a7a7ffbb39ee27e
[383]: https://github.com/Xunnamius/symbiote/commit/c47a366c18a546df0329e75246f3cdb5fd932794
[384]: https://github.com/Xunnamius/symbiote/commit/b1f5ecf3794f88442fc9ebf42c919431c1614dfb
[385]: https://github.com/Xunnamius/symbiote/commit/7713d70878127d9177726a18d71a5ff39861ef55
[386]: https://github.com/Xunnamius/symbiote/commit/b80ff759912167871ddf1d4eb3b57d893efff042
[387]: https://github.com/Xunnamius/symbiote/commit/10e9f59bdbe00cd679489ae29fa68a7bde5c7bf6
[388]: https://github.com/Xunnamius/symbiote/commit/4a641f33d1776391d284e58c027121cc0948aeed
[389]: https://github.com/Xunnamius/symbiote/commit/720388e3e35ead425d8d7b2cd62ef30256c157f4
[390]: https://github.com/Xunnamius/symbiote/commit/fad771fb2daecbe8b287e7d4ea3d1dd5d1f5602d
[391]: https://github.com/Xunnamius/symbiote/commit/4500335db15212977723dd39d3900da51084670b
[392]: https://github.com/Xunnamius/symbiote/commit/8914e93829a0e0da71a7edd2a229cc2f6abe5a20
[393]: https://github.com/Xunnamius/symbiote/commit/e23abcefd774ceabfd477705a171a2244d4b9dad
[394]: https://github.com/Xunnamius/symbiote/commit/a2437c54bb08a5d216e721a0bf7ca6669f22af68
[395]: https://github.com/Xunnamius/symbiote/commit/79e1d920189ecbb090500ac7a627516fdb86ca1b
[396]: https://github.com/Xunnamius/symbiote/commit/c40758fb2c8565d5c575a09735bed0365020a38e
[397]: https://github.com/Xunnamius/symbiote/commit/7f27465942804d885d9cd52e5d7e210543774d83
[398]: https://github.com/Xunnamius/symbiote/commit/f81c318bf0fba21d257bba21ee2c89f2488e6c52
[399]: https://github.com/Xunnamius/symbiote/commit/216f8718bd61ee13bddd7adf755d7e077a701b4a
[400]: https://github.com/Xunnamius/symbiote/commit/0098a23f3e7b08243b3ef6c77ce46d1acb78e623
[401]: https://github.com/Xunnamius/symbiote/commit/7e636bc3a2c1fc5e3c52f3dd3b4fac38762e4673
[402]: https://github.com/Xunnamius/symbiote/commit/9d9cf91f2c92d039c51b3a04c17ba17b325d3d84
[403]: https://github.com/Xunnamius/symbiote/commit/dc7da4c37f4ad2ac20b0c859afe4d470ead99199
[404]: https://github.com/Xunnamius/symbiote/commit/3df17efbbd79ab3a24681d7b480e8589829a4b91
[405]: https://github.com/Xunnamius/symbiote/commit/d783dbddf5f50c507c26d27daf4043dc0f47b1c6
[406]: https://github.com/Xunnamius/symbiote/commit/b5a17a5b3a4de7fcdc93f541d78a8b66ca8c95e0
[407]: https://github.com/Xunnamius/symbiote/commit/3ad4bdde673d1e256792382e23fc637871998254
[408]: https://github.com/Xunnamius/symbiote/commit/bc3fb258afe6a8bb0c6ec49f033ded877945c407
[409]: https://github.com/Xunnamius/symbiote/commit/79d36ed230c9e138b588499a175b9d56c4225343
[410]: https://github.com/Xunnamius/symbiote/commit/44bc38fd8875890a5c3908a58f9fe085d9b9543c
[411]: https://github.com/Xunnamius/symbiote/commit/418c294bb8b7cb2a48499c0ce3bc1e7e0546c650
[412]: https://github.com/Xunnamius/symbiote/commit/99e4d877d0fd76d3dd509aae373927f62403e7e0
[413]: https://github.com/Xunnamius/symbiote/commit/082b0754c43f10f51ec45750a2c4d019f4116a7d
[414]: https://github.com/Xunnamius/symbiote/commit/ba13af404ce3ae7f89b2a57e6bf30129a4def2a4
[415]: https://github.com/Xunnamius/symbiote/commit/15be8b9a1721956879f0f6c8cf61bdfee94928ce
[416]: https://github.com/Xunnamius/symbiote/commit/f22674d71b2bc426453bf04e21c201780c316624
[417]: https://github.com/Xunnamius/symbiote/commit/2bc8b381e8a1496f68e05f7360436ba962392df8
[418]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.4.0...@-xun/symbiote@3.4.1
[419]: https://github.com/Xunnamius/symbiote/commit/46b5cef3046bd9f435af333d85a760ccde444228
[420]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.7...@-xun/symbiote@3.3.8
[421]: https://github.com/Xunnamius/symbiote/commit/892f2824ac6ba0b778715e945397d1bc643ed619
[422]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.6...@-xun/symbiote@3.3.7
[423]: https://github.com/Xunnamius/symbiote/commit/f3cf0e3ce3f0e4ffe1e1cc812980be768cec1507
[424]: https://github.com/Xunnamius/symbiote/commit/ca139ff2ae9b8ddb0fed094b91fb79deccd2127c
[425]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.5...@-xun/symbiote@3.3.6
[426]: https://github.com/Xunnamius/symbiote/commit/f51a9f7d4381b61ba5d383ada341e3a90a4d6578
[427]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.4...@-xun/symbiote@3.3.5
[428]: https://github.com/Xunnamius/symbiote/commit/03c423f753693df61565a1f49d80cc0f6cc503f1
[429]: https://github.com/Xunnamius/symbiote/commit/18ac9a6080a35e04264d35b043a156ff62601e75
[430]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.3...@-xun/symbiote@3.3.4
[431]: https://github.com/Xunnamius/symbiote/commit/8ae11269c8e79f283115f915845e5d26a193d1eb
[432]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.2...@-xun/symbiote@3.3.3
[433]: https://github.com/Xunnamius/symbiote/commit/3911bb5748d7ecd905ce3bbd9106aa0ea0787160
[434]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.1...@-xun/symbiote@3.3.2
[435]: https://github.com/Xunnamius/symbiote/commit/e3c8f9ab2680e6eaa30465c77954050484c7c41e
[436]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.3.0...@-xun/symbiote@3.3.1
[437]: https://github.com/Xunnamius/symbiote/commit/e62a8e2866e7be5d865aa716a07ab29afdaf9729
[438]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.2.0...@-xun/symbiote@3.3.0
[439]: https://github.com/Xunnamius/symbiote/commit/ea85093f7a832de2216ddb0f5be93018c7049a25
[440]: https://github.com/Xunnamius/symbiote/commit/4f71380506e8b2505a907d817794b6730bca4f95
[441]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.1.4...@-xun/symbiote@3.2.0
[442]: https://github.com/Xunnamius/symbiote/commit/a16e9cda6dfb648c58096a909777625015d4719e
[443]: https://github.com/Xunnamius/symbiote/commit/ed344de68f6fe6479edcb6753364d9a30d3de38d
[444]: https://github.com/Xunnamius/symbiote/commit/ccf56bb82eaf34a25cfbe31d499e18c76ecba307
[445]: https://github.com/Xunnamius/symbiote/commit/18f0a89d714aff30388945a2633780ab48db4e1b
[446]: https://github.com/Xunnamius/symbiote/commit/e98f8600a754d8c119e3c94c5c6a420896180466
[447]: https://github.com/Xunnamius/symbiote/commit/044e24c167836d4eba57a69b957267cf07f75014
[448]: https://github.com/Xunnamius/symbiote/commit/6219cb06d8c08338e9134daf68b9c83659cd1b39
[449]: https://github.com/Xunnamius/symbiote/commit/89aa4f857b25c3c29175a8e759155aa657780b8f
[450]: https://github.com/Xunnamius/symbiote/commit/fd59e6d67ebcabff87cc37c44fafde330c108025
[451]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.1.3...@-xun/symbiote@3.1.4
[452]: https://github.com/Xunnamius/symbiote/commit/b809268e30856c31f49ff4f21b64fdeab8d49e28
[453]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.1.2...@-xun/symbiote@3.1.3
[454]: https://github.com/Xunnamius/symbiote/commit/520897b087b8e240c6e7c9236ad875776c29a907
[455]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.1.1...@-xun/symbiote@3.1.2
[456]: https://github.com/Xunnamius/symbiote/commit/2e19fbb73f32694e0ab61a9670538fab89e2de03
[457]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.1.0...@-xun/symbiote@3.1.1
[458]: https://github.com/Xunnamius/symbiote/commit/a1a1659a6aee8463244f5d57f0317787662deaf7
[459]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@3.0.0...@-xun/symbiote@3.1.0
[460]: https://github.com/Xunnamius/symbiote/commit/50f4bc77acf0919219014d322600a90bc4bf3f81
[461]: https://github.com/Xunnamius/symbiote/commit/935e6fc1ed832d011be392bc1103075b6cf90810
[462]: https://github.com/Xunnamius/symbiote/commit/e1fde967f44ddeb5a435a01004714e511f595135
[463]: https://github.com/Xunnamius/symbiote/commit/8c752be7c235c87a645ddfc2c34c533e77ca4dde
[464]: https://github.com/Xunnamius/symbiote/commit/078831b119c73f9b886cce74bfa912a2e05f5143
[465]: https://github.com/Xunnamius/symbiote/commit/03fdcb83a4460b0ba97a380636e423fb966d5ab0
[466]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.25.1...@-xun/symbiote@3.0.0
[467]: https://github.com/Xunnamius/symbiote/commit/597b69841516ce8d58f4bc344eed6d2bd7de1296
[468]: https://github.com/Xunnamius/symbiote/commit/6d14d7053399a1a521c32860fabaffbd14fa256c
[469]: https://github.com/Xunnamius/symbiote/commit/cb5b704a67f131c89cbac69c160f4060590069d7
[470]: https://github.com/Xunnamius/symbiote/commit/e7937607fef8cfa8d9d986386f7a3b85cb779fa0
[471]: https://github.com/Xunnamius/symbiote/commit/0b15d1933847a57890416c669f772ef032ec2314
[472]: https://github.com/Xunnamius/symbiote/commit/e49ef2f4334fa8604b297b72f295db9bf4f6e1f2
[473]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.25.0...@-xun/symbiote@2.25.1
[474]: https://github.com/Xunnamius/symbiote/commit/16e65ca9568c2c290d9cbc170fcee40ca3a63520
[475]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.24.1...@-xun/symbiote@2.25.0
[476]: https://github.com/Xunnamius/symbiote/commit/726d79e4b4249d13e12a53938af9a921099a47e6
[477]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.24.0...@-xun/symbiote@2.24.1
[478]: https://github.com/Xunnamius/symbiote/commit/261741e26a03ae661b506c3872cb86af79a07f11
[479]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.11...@-xun/symbiote@2.24.0
[480]: https://github.com/Xunnamius/symbiote/commit/7342275556d9ac7223c1f0d628df0bab6558607f
[481]: https://github.com/Xunnamius/symbiote/commit/842e15e442ec96e158c5381a69a42cd71142afdf
[482]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.10...@-xun/symbiote@2.23.11
[483]: https://github.com/Xunnamius/symbiote/commit/564671906cc7bf07e51576f5b8c41e05f1442dfa
[484]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.9...@-xun/symbiote@2.23.10
[485]: https://github.com/Xunnamius/symbiote/commit/03742980a31ac4063e5d5bb3d2c27f670680c06e
[486]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.8...@-xun/symbiote@2.23.9
[487]: https://github.com/Xunnamius/symbiote/commit/f616a8e088b4dac2c13a616b5f806b90ea18c95a
[488]: https://github.com/Xunnamius/symbiote/commit/88a83ba125518bb1700ac6e4fb9d396cd0782fa7
[489]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.7...@-xun/symbiote@2.23.8
[490]: https://github.com/Xunnamius/symbiote/commit/80c010ab1a9f54848366935aa2b2e48c70535a06
[491]: https://github.com/Xunnamius/symbiote/commit/0240ff85261f41befe2983f7e894edff74495bad
[492]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.6...@-xun/symbiote@2.23.7
[493]: https://github.com/Xunnamius/symbiote/commit/c783620e51ba6874b1775818a9426a89f824bc3e
[494]: https://github.com/Xunnamius/symbiote/commit/d987d66d5edb5279e21713b49b65e9f6c9223763
[495]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.5...@-xun/symbiote@2.23.6
[496]: https://github.com/Xunnamius/symbiote/commit/cabd5a906f3f47511362922719ede55d6314d112
[497]: https://github.com/Xunnamius/symbiote/commit/3d179662eb95d4846d6a633df915db21d917e993
[498]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.4...@-xun/symbiote@2.23.5
[499]: https://github.com/Xunnamius/symbiote/commit/dfa62f95fc5c67fa5de0d4cc07a47176bbd0328a
[500]: https://github.com/Xunnamius/symbiote/commit/70bdc6645a61244c95cd233b44046f08295d8644
[501]: https://github.com/Xunnamius/symbiote/commit/41c1127a6a3a8d0fbafc6b70522109ab9d859f6b
[502]: https://github.com/Xunnamius/symbiote/commit/c11a37f7fa5f9c346a2b363b060f74b0513b5ce8
[503]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.3...@-xun/symbiote@2.23.4
[504]: https://github.com/Xunnamius/symbiote/commit/98342bea15f24cc59f6a44a195ba323f8fb7d027
[505]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.2...@-xun/symbiote@2.23.3
[506]: https://github.com/Xunnamius/symbiote/commit/b82f5db0ddf304d345bd71e41da6d798adaa5156
[507]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.1...@-xun/symbiote@2.23.2
[508]: https://github.com/Xunnamius/symbiote/commit/ee28fd25e233e1ad9b7043e0faa8defae74dbe7b
[509]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.23.0...@-xun/symbiote@2.23.1
[510]: https://github.com/Xunnamius/symbiote/commit/baed18cf2f0c1f93d21647c3399a412c1e0a2c32
[511]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.22.0...@-xun/symbiote@2.23.0
[512]: https://github.com/Xunnamius/symbiote/commit/a3bd02221a9f97cb7c1fda8d15dea4d1b9f947c1
[513]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.21.0...@-xun/symbiote@2.22.0
[514]: https://github.com/Xunnamius/symbiote/commit/385866d2602d36dd6b86c7f4511dc3df19a6ef56
[515]: https://github.com/Xunnamius/symbiote/commit/57bf52c765ff799f9ec6c2eb199af8a9d1987f73
[516]: https://github.com/Xunnamius/symbiote/commit/89f25ff8982f5f5830ed2225ed1b1c605a31e653
[517]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.20.0...@-xun/symbiote@2.21.0
[518]: https://github.com/Xunnamius/symbiote/commit/ffbc0c51f1cfe91c80e36db507e495b225d63e04
[519]: https://github.com/Xunnamius/symbiote/commit/8bc3c0a6128177f9331d10c3efa91cce564719fd
[520]: https://github.com/Xunnamius/symbiote/commit/a8c4f36f07fe7dd9b73eeddf7788330a6398fe29
[521]: https://github.com/Xunnamius/symbiote/commit/623cc86ecd7592c85a2b34de7bcaaaa9ce97dd34
[522]: https://github.com/Xunnamius/symbiote/commit/aa26f6b51de4343e84f64ee5add8e7ceb6ab6ef7
[523]: https://github.com/Xunnamius/symbiote/commit/374f05c223f3aa897619f65c2a85f7de3a36b539
[524]: https://github.com/Xunnamius/symbiote/commit/b234ba146c32603877b95c99e27d39912b7bf699
[525]: https://github.com/Xunnamius/symbiote/commit/dbfedff1a2a218ef7073e32c7b103749c9b803c7
[526]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.19.0...@-xun/symbiote@2.20.0
[527]: https://github.com/Xunnamius/symbiote/commit/d2b0fa2549884b65f39b215016ae5534c9b1f0c8
[528]: https://github.com/Xunnamius/symbiote/commit/42ea1cb493c2568b61dd5627189850ac0916a4c4
[529]: https://github.com/Xunnamius/symbiote/commit/8a17ad8050f76ee3583a914dfc087299e58a703c
[530]: https://github.com/Xunnamius/symbiote/commit/2fc5abfc9f46bf13824623b0233719efd5ea88ef
[531]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.6...@-xun/symbiote@2.19.0
[532]: https://github.com/Xunnamius/symbiote/commit/02bd1f421cdbc5289d4454e8f5e81889e5d564ee
[533]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.5...@-xun/symbiote@2.18.6
[534]: https://github.com/Xunnamius/symbiote/commit/61b0c6fc809dc98c494682696c70a5ac00e28786
[535]: https://github.com/Xunnamius/symbiote/commit/feae4de7ab8e9452974cf2420ecea3da21dde063
[536]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.4...@-xun/symbiote@2.18.5
[537]: https://github.com/Xunnamius/symbiote/commit/a0fabf117a4e10cf68aa181dc5bfba0344eaceea
[538]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.3...@-xun/symbiote@2.18.4
[539]: https://github.com/Xunnamius/symbiote/commit/1dd3c8b807e5672bc1dceb0917ec1831e61c70f1
[540]: https://github.com/Xunnamius/symbiote/commit/03d0f5ec06412a1a9df5554ab91ab42206eb76e6
[541]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.2...@-xun/symbiote@2.18.3
[542]: https://github.com/Xunnamius/symbiote/commit/d10510b26b60a15206271bb6da7ebcd862e067c4
[543]: https://github.com/Xunnamius/symbiote/commit/9ad3cda4db8268fdb1de9f23a1717d01dd464e82
[544]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.1...@-xun/symbiote@2.18.2
[545]: https://github.com/Xunnamius/symbiote/commit/c906eda89d66141c6f3c16d7f7097163c518f8e6
[546]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.18.0...@-xun/symbiote@2.18.1
[547]: https://github.com/Xunnamius/symbiote/commit/2816aa5c7580c21865c6837f71b54d0f60e224da
[548]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.17.3...@-xun/symbiote@2.18.0
[549]: https://github.com/Xunnamius/symbiote/commit/2b9d38388b20c3565f093d04622ea89095e2ff4c
[550]: https://github.com/Xunnamius/symbiote/commit/3c4d07d7634e79df4ab9790e644d59d3c894635d
[551]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.17.2...@-xun/symbiote@2.17.3
[552]: https://github.com/Xunnamius/symbiote/commit/697c6383588b09414e1bf1053b7a6832ad1370fa
[553]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.17.1...@-xun/symbiote@2.17.2
[554]: https://github.com/Xunnamius/symbiote/commit/3c34513dbae872b9f5ae7b23b64005aee49146ae
[555]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.17.0...@-xun/symbiote@2.17.1
[556]: https://github.com/Xunnamius/symbiote/commit/d1d3838a4dd7d643522fbba72411a027a111bbb5
[557]: https://github.com/Xunnamius/symbiote/commit/22889a32470d7c120f63abf9966ce6bd6d425b88
[558]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.6...@-xun/symbiote@2.17.0
[559]: https://github.com/Xunnamius/symbiote/commit/3e1e6c66ec45c72b0f8624f5d6a1afeb41956184
[560]: https://github.com/Xunnamius/symbiote/commit/df3174dbc5a058c81aa6e1a1ee6a7baddb2b30dd
[561]: https://github.com/Xunnamius/symbiote/commit/eed08a0ef0d9de1c0351209a4c3db0044f0a5073
[562]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.5...@-xun/symbiote@2.16.6
[563]: https://github.com/Xunnamius/symbiote/commit/49cbe95ead6ac74258b90313390b13807fc9a022
[564]: https://github.com/Xunnamius/symbiote/commit/f9678b8ce29ab9536f81bff641791dc244215489
[565]: https://github.com/Xunnamius/symbiote/commit/c39983c5cd3385ef507df0055ec5e2746f979760
[566]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.4...@-xun/symbiote@2.16.5
[567]: https://github.com/Xunnamius/symbiote/commit/8eac971e9d5e22fba1e6d49fa7fee2af04809fe6
[568]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.3...@-xun/symbiote@2.16.4
[569]: https://github.com/Xunnamius/symbiote/commit/29281df9337a36c0ddbf254c8452a1b8a68bf1a8
[570]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.2...@-xun/symbiote@2.16.3
[571]: https://github.com/Xunnamius/symbiote/commit/f7f4f11c068a86260d039b5e973f62c23a3c8079
[572]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.1...@-xun/symbiote@2.16.2
[573]: https://github.com/Xunnamius/symbiote/commit/450d03a1056a8788295047b24c95dce90c4543b9
[574]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.16.0...@-xun/symbiote@2.16.1
[575]: https://github.com/Xunnamius/symbiote/commit/52d5f446dd6a238bd34e9d3fed4977d7f7780129
[576]: https://github.com/Xunnamius/symbiote/commit/5f35a775180585acd90f1a8d39679a8b3a6e6120
[577]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.15.0...@-xun/symbiote@2.16.0
[578]: https://github.com/Xunnamius/symbiote/commit/5a6b8fdd6bad1753f065e8a0fabc20b629cd4120
[579]: https://github.com/Xunnamius/symbiote/commit/50e60dabffb77cb7d43d61c06b1fb47929babac6
[580]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.6...@-xun/symbiote@2.15.0
[581]: https://github.com/Xunnamius/symbiote/commit/229d304b107bf727e7cd99ecfd520a5a5937db4a
[582]: https://github.com/Xunnamius/symbiote/commit/13d185c2b630e90b5ddb442128fe9d12d2db1745
[583]: https://github.com/Xunnamius/symbiote/commit/52bef916cb8956593d07bccf9b52add74c261b2a
[584]: https://github.com/Xunnamius/symbiote/commit/d5fff49a5e5c57d4821aefb93aa54def9e60783a
[585]: https://github.com/Xunnamius/symbiote/commit/0608290264c183b9fefc4b96e1929613d16a2a91
[586]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.5...@-xun/symbiote@2.14.6
[587]: https://github.com/Xunnamius/symbiote/commit/9e8658ffbcdf987435b49e9ac84eb63362cff2bf
[588]: https://github.com/Xunnamius/symbiote/commit/a6db0c4c140d6bf98f5bbefc3e45a1151e97ffcf
[589]: https://github.com/Xunnamius/symbiote/commit/7621c5ffe4451038adf0dbc8b1a4b05ebd324a7c
[590]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.4...@-xun/symbiote@2.14.5
[591]: https://github.com/Xunnamius/symbiote/commit/da0014a3d8fa3571177d2af968ce57f9fecbb1ee
[592]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.3...@-xun/symbiote@2.14.4
[593]: https://github.com/Xunnamius/symbiote/commit/3b6f45301765b7eab22ef0b67ed645f03c5935c3
[594]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.2...@-xun/symbiote@2.14.3
[595]: https://github.com/Xunnamius/symbiote/commit/e27824c8e8d213f8aee2b1ce3c89e46e8c08ccae
[596]: https://github.com/Xunnamius/symbiote/commit/17742f7b0ffe21801bd83e0ee580066ce5aba183
[597]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.1...@-xun/symbiote@2.14.2
[598]: https://github.com/Xunnamius/symbiote/commit/99b7edbb8da48599bbf2df3d7283dc44dcebb760
[599]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.14.0...@-xun/symbiote@2.14.1
[600]: https://github.com/Xunnamius/symbiote/commit/ceda91b1fdcc9606cc683ce561871abf702c827a
[601]: https://github.com/Xunnamius/symbiote/commit/bc7742bdfce478b8bb14733c6256e44f6abb5a43
[602]: https://github.com/Xunnamius/symbiote/commit/9f4668c9843e1655489795a6a8f9157701b26932
[603]: https://github.com/Xunnamius/symbiote/commit/e90857acb3d261d6e9bd248ab0e38c7f0e05d449
[604]: https://github.com/Xunnamius/symbiote/commit/8bd33e66e357e62fc239d26a8164ffd6add96d24
[605]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.13.0...@-xun/symbiote@2.14.0
[606]: https://github.com/Xunnamius/symbiote/commit/1301043802316a100eb194b23f143865edb83afa
[607]: https://github.com/Xunnamius/symbiote/commit/f20ab4201e98527bcca1c5b43184335a4d1aa01c
[608]: https://github.com/Xunnamius/symbiote/commit/d8e32c7aed1b107911ac124be409768ccc3d2c65
[609]: https://github.com/Xunnamius/symbiote/commit/92236396172531b7b1a1324655a4604497a8bf31
[610]: https://github.com/Xunnamius/symbiote/commit/a7ed2d22a58066686595fa6d6f1f26dd36e1c741
[611]: https://github.com/Xunnamius/symbiote/commit/71f3d437c7c1aaf1f3c44de2273525480baebaf3
[612]: https://github.com/Xunnamius/symbiote/commit/7d7e83778cf5b32e492dbc1fbb8bb8139a26598b
[613]: https://github.com/Xunnamius/symbiote/commit/251f2c11147e4e8c7c1db784ddef4f2566f54d9c
[614]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.12.0...@-xun/symbiote@2.13.0
[615]: https://github.com/Xunnamius/symbiote/commit/e5a994bddb690d0bdd8000cea5226f797276846c
[616]: https://github.com/Xunnamius/symbiote/commit/aa28cc2319cc30041524ee3054eefc0af878e326
[617]: https://github.com/Xunnamius/symbiote/commit/87c9c3c21d49dcc6f7b795e3a1dc30e18c9341a5
[618]: https://github.com/Xunnamius/symbiote/commit/7f982952167d73373d4dffdf7657e7060cf032fe
[619]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.9...@-xun/symbiote@2.12.0
[620]: https://github.com/Xunnamius/symbiote/commit/e2584fc2ee21587543980d8f36482c6b3064a8de
[621]: https://github.com/Xunnamius/symbiote/commit/443eb1334d6028bb3c745d6a1af59314f1e98925
[622]: https://github.com/Xunnamius/symbiote/commit/a01453f3e43f1f38f171cad9230f96e69584da30
[623]: https://github.com/Xunnamius/symbiote/commit/721eb51c475b8b5600bb681aa1c57ee3973d87ec
[624]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.8...@-xun/symbiote@2.11.9
[625]: https://github.com/Xunnamius/symbiote/commit/b951959a4a12ac484c8addc839f912c4e5767875
[626]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.7...@-xun/symbiote@2.11.8
[627]: https://github.com/Xunnamius/symbiote/commit/4196fe07541a75af2564b9958d306439f0e664b6
[628]: https://github.com/Xunnamius/symbiote/commit/e432f8a8dd0c76de7524baa20d622cf287bdc289
[629]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.6...@-xun/symbiote@2.11.7
[630]: https://github.com/Xunnamius/symbiote/commit/e734cc60de727300331625325b12bb8a19c93bef
[631]: https://github.com/Xunnamius/symbiote/commit/2b00195a42f9d7d1a8909bc48acff23d25d34557
[632]: https://github.com/Xunnamius/symbiote/commit/605e4ebf5a17a91c7b1c771cbfe4a217cacfff57
[633]: https://github.com/Xunnamius/symbiote/commit/31863db510c943499d349ca604a5824391f5261b
[634]: https://github.com/Xunnamius/symbiote/commit/e80d6e7a12cf1540568724ac2379ae6205268809
[635]: https://github.com/Xunnamius/symbiote/commit/614ba8b3d2b60d90186cbf83755dd786568a1ea7
[636]: https://github.com/Xunnamius/symbiote/commit/690ad178dfc81b1dc835586ab9cfef3999a0a47f
[637]: https://github.com/Xunnamius/symbiote/commit/5540b7dc1f00515b624396cb6229f5833bd912ff
[638]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.5...@-xun/symbiote@2.11.6
[639]: https://github.com/Xunnamius/symbiote/commit/2dfb17d9dea82a0725c47d3a236cced0f89ec2df
[640]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.4...@-xun/symbiote@2.11.5
[641]: https://github.com/Xunnamius/symbiote/commit/6f7a3022b9b1bbbdc6b044a195e88e0c241bf056
[642]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.3...@-xun/symbiote@2.11.4
[643]: https://github.com/Xunnamius/symbiote/commit/67bad2710e22c0646c53c8f1756c6dae869c8da4
[644]: https://github.com/Xunnamius/symbiote/commit/5ab38d0bb0a593488721fdd41b6c1fcc4618d081
[645]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.2...@-xun/symbiote@2.11.3
[646]: https://github.com/Xunnamius/symbiote/commit/15d3444639e5919af49429f7c60a387a77f22b82
[647]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.1...@-xun/symbiote@2.11.2
[648]: https://github.com/Xunnamius/symbiote/commit/16af6eb8c522458468176444e3f6b3699de64d72
[649]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.11.0...@-xun/symbiote@2.11.1
[650]: https://github.com/Xunnamius/symbiote/commit/1e0174c32cff28e404202c1cf920e474b94cfe7b
[651]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.10.0...@-xun/symbiote@2.11.0
[652]: https://github.com/Xunnamius/symbiote/commit/e53be8bb276c3ab03251512811746295ebcce71d
[653]: https://github.com/Xunnamius/symbiote/commit/3058d4933a16c9b3de7104ae0e599e7d77b2e339
[654]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.9.0...@-xun/symbiote@2.10.0
[655]: https://github.com/Xunnamius/symbiote/commit/900c84b80913f7ae692320e081e53426405703b5
[656]: https://github.com/Xunnamius/symbiote/commit/2d7c4335de2455d1f751317edae49a754f9d254d
[657]: https://github.com/Xunnamius/symbiote/commit/76bd411502e2a42519463cb94808106b819f9e7b
[658]: https://github.com/Xunnamius/symbiote/commit/e264510ce9ff4a5efdae156d17b4f45deae13ee5
[659]: https://github.com/Xunnamius/symbiote/commit/ae7340fc0add85fe6fd58d8a754fecad0baf897c
[660]: https://github.com/Xunnamius/symbiote/commit/bccf09153de508954f27e763e79a4f013585523d
[661]: https://github.com/Xunnamius/symbiote/commit/77e22aeee55495616049bd79e99271de7ec41788
[662]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.8.2...@-xun/symbiote@2.9.0
[663]: https://github.com/Xunnamius/symbiote/commit/45a95680565f7437367edb2f8cc44a33e7541aa0
[664]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.8.1...@-xun/symbiote@2.8.2
[665]: https://github.com/Xunnamius/symbiote/commit/ecdd713c4d242b92209fafa38beadafe2769795c
[666]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.8.0...@-xun/symbiote@2.8.1
[667]: https://github.com/Xunnamius/symbiote/commit/af354d0d777efcad54c5b9fef571837497afd230
[668]: https://github.com/Xunnamius/symbiote/commit/4a8948281f4836cc6fa64e7c42308f2f0237688c
[669]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.7.1...@-xun/symbiote@2.8.0
[670]: https://github.com/Xunnamius/symbiote/commit/abc2eae40665c876d11cda8ecb8f3268af247f8c
[671]: https://github.com/Xunnamius/symbiote/commit/152bcdb594f0d452379b3dbaae56fb6765c476ee
[672]: https://github.com/Xunnamius/symbiote/commit/7fa548ff9a16b0397fd87c97dad6f6904861c4b0
[673]: https://github.com/Xunnamius/symbiote/commit/d34d5690d5677e45d31b42d2dc77bf19fe36b1ac
[674]: https://github.com/Xunnamius/symbiote/commit/1631e8da95ed843f732daf06a010f8966abc280a
[675]: https://github.com/Xunnamius/symbiote/commit/032aa3047de161ffa5a57c482156b7b11c604f61
[676]: https://github.com/Xunnamius/symbiote/commit/88b7f3835ae27fef939e0a5c61c1aaa9489f4114
[677]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.7.0...@-xun/symbiote@2.7.1
[678]: https://github.com/Xunnamius/symbiote/commit/138da875f3247f966687e95b91c7caf822df3c49
[679]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.6.0...@-xun/symbiote@2.7.0
[680]: https://github.com/Xunnamius/symbiote/commit/28acb7961df65f3e39ec6b549117698f529b083c
[681]: https://github.com/Xunnamius/symbiote/commit/6f8cbe26308839edf019112bb191cb4e7c8a18a8
[682]: https://github.com/Xunnamius/symbiote/commit/edc6cca484e3748ffa96bf6f6831c7193e830976
[683]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.6...@-xun/symbiote@2.6.0
[684]: https://github.com/Xunnamius/symbiote/commit/dddfc44396c55ebfc704f8d576edac2868fe28cc
[685]: https://github.com/Xunnamius/symbiote/commit/180f85f730f6f4763c685986886d65a870f73558
[686]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.5...@-xun/symbiote@2.5.6
[687]: https://github.com/Xunnamius/symbiote/commit/2fd61c45d5639f5e6f8edadc3b7d4851011bc365
[688]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.4...@-xun/symbiote@2.5.5
[689]: https://github.com/Xunnamius/symbiote/commit/3831af5468c04bc48a0849a15233d1d644e5c45b
[690]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.3...@-xun/symbiote@2.5.4
[691]: https://github.com/Xunnamius/symbiote/commit/c23304e8bb55d71623ce6f30acd2195d704326aa
[692]: https://github.com/Xunnamius/symbiote/commit/141111918245fc7294e26b6ee944d4c6977e4f25
[693]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.2...@-xun/symbiote@2.5.3
[694]: https://github.com/Xunnamius/symbiote/commit/0dd4fb76481355ace84b39c7eeba5c230951a237
[695]: https://github.com/Xunnamius/symbiote/commit/607a378f58157a1b6b0a3a16880d3c2ba9e9d2e0
[696]: https://github.com/Xunnamius/symbiote/commit/19492a702140242c81a8ef20cd42d9908f722b28
[697]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.1...@-xun/symbiote@2.5.2
[698]: https://github.com/Xunnamius/symbiote/commit/4231719a4050b5b3956e3e19d12d8c469fd0bd37
[699]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.5.0...@-xun/symbiote@2.5.1
[700]: https://github.com/Xunnamius/symbiote/commit/b2dfed2c46fd5bceb7922642e9955bce5a5c424b
[701]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.3...@-xun/symbiote@2.5.0
[702]: https://github.com/Xunnamius/symbiote/commit/c133a92a38c285bf0a63dd9098f7c876155f3274
[703]: https://github.com/Xunnamius/symbiote/commit/6210727d4bc9b20c2064df6f0a987bc509ba512a
[704]: https://github.com/Xunnamius/symbiote/commit/625451cb712d5ebe6ef89478fed8669af6fa7236
[705]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.2...@-xun/symbiote@2.4.3
[706]: https://github.com/Xunnamius/symbiote/commit/7b8ca545f93c3e9d22b693c6c58dbb29604867ff
[707]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.1...@-xun/symbiote@2.4.2
[708]: https://github.com/Xunnamius/symbiote/commit/0bafa3046d16effe919127463c68cff1fb657848
[709]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.4.0...@-xun/symbiote@2.4.1
[710]: https://github.com/Xunnamius/symbiote/commit/02e289a9c890d4a9fb9b9f17fa7e8731f4ab9d2b
[711]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.4...@-xun/symbiote@2.4.0
[712]: https://github.com/Xunnamius/symbiote/commit/10f876ec625b234388ec5689f4d10663cabb4139
[713]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.3...@-xun/symbiote@2.3.4
[714]: https://github.com/Xunnamius/symbiote/commit/7f1f7a2772751006b2f87a140f0b00c116f4412c
[715]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.2...@-xun/symbiote@2.3.3
[716]: https://github.com/Xunnamius/symbiote/commit/1546ab8527a571efe54081d7614bd35a9d6e0c3c
[717]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.1...@-xun/symbiote@2.3.2
[718]: https://github.com/Xunnamius/symbiote/commit/ff6ce22d3a3433c07460af5758ce7920a1d9aa5a
[719]: https://github.com/Xunnamius/symbiote/commit/9a456c5795616fcf9f8cafa0c625eb12cf85cf50
[720]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.3.0...@-xun/symbiote@2.3.1
[721]: https://github.com/Xunnamius/symbiote/commit/1901cfe78a48fcd1dfae4e3760acf197e8812676
[722]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.2.0...@-xun/symbiote@2.3.0
[723]: https://github.com/Xunnamius/symbiote/commit/23d01f3f75587880142e8b0ffdaa5873a38a84c7
[724]: https://github.com/Xunnamius/symbiote/commit/ee079c1feb775313923680cea371b862fa61c083
[725]: https://github.com/Xunnamius/symbiote/commit/c92b2cbb33a4cd6367604b98422a0248a129d9bd
[726]: https://github.com/Xunnamius/symbiote/commit/c565452e8b3b261e37e21b0b09dd52d395ccaa35
[727]: https://github.com/Xunnamius/symbiote/commit/6353b4f3774f70fa5299ed6666a14165faacb829
[728]: https://github.com/Xunnamius/symbiote/commit/64a41385dbcf83b268fe4d03f2ba1d60b705b634
[729]: https://github.com/Xunnamius/symbiote/commit/9304778395eb8c9f48164e2c1d71660a7da484f6
[730]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.1.0...@-xun/symbiote@2.2.0
[731]: https://github.com/Xunnamius/symbiote/commit/0c1b93abd02cb8ad4eec4362b917e5484000cae4
[732]: https://github.com/Xunnamius/symbiote/commit/ce6a12a98f74e554db875dfa2e53e0fb3a45510a
[733]: https://github.com/Xunnamius/symbiote/commit/14bf31ff01c26186bce6a35150f4e002e6f74475
[734]: https://github.com/Xunnamius/symbiote/commit/c263dc5aa35ce06d85077337af7b4ca35564504d
[735]: https://github.com/Xunnamius/symbiote/commit/f55664476107f5f2aaefbfe11df6c0e59e7bd7f6
[736]: https://github.com/Xunnamius/symbiote/commit/9581339cf055172c61e96900096f7e6f3be04ff2
[737]: https://github.com/Xunnamius/symbiote/commit/432a5faebe68d65bac4e627e9e022b4687917552
[738]: https://github.com/Xunnamius/symbiote/commit/f82fbf4583d23478cfc54d320d4075f42cec86e8
[739]: https://github.com/Xunnamius/symbiote/commit/a95e9104912da7d85cc6e908cf6f359ae0d74a50
[740]: https://github.com/Xunnamius/symbiote/commit/12dd3f71aca30c382e26451fed7e15d6359cd624
[741]: https://github.com/Xunnamius/symbiote/commit/2a3e13c79fb4a96dc5da63a1a3740be799be38c0
[742]: https://github.com/Xunnamius/symbiote/commit/b8841b52f736c86ff811fc26b8db2a9ba638f693
[743]: https://github.com/Xunnamius/symbiote/commit/f3012291ad31b4c57b3b592eaf687ac83162e1ba
[744]: https://github.com/Xunnamius/symbiote/commit/26f78dcd18c0d83e4adc060449edff2071bc0adb
[745]: https://github.com/Xunnamius/symbiote/commit/c63847c764bed07ff07a3b461170bf82b0fa5202
[746]: https://github.com/Xunnamius/symbiote/commit/df13f8755a08757c99f20c71c55647e3478243fc
[747]: https://github.com/Xunnamius/symbiote/commit/48163ba158b463dd21ffd6ad431f6f0714c93003
[748]: https://github.com/Xunnamius/symbiote/commit/c4f81c0568db69961282c771dd28370d1357f4d8
[749]: https://github.com/Xunnamius/symbiote/commit/8338afa2ed9f0cc68144505d32b9578e82661549
[750]: https://github.com/Xunnamius/symbiote/commit/fb7752b12394e6c92912bc59517df8baff5be223
[751]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.0.1...@-xun/symbiote@2.1.0
[752]: https://github.com/Xunnamius/symbiote/commit/0c86cb529724eb2576b8d62e8c7f0addc3ea7084
[753]: https://github.com/Xunnamius/symbiote/commit/0b96a6b7274a4b840e73bf97bf9b5455cba08666
[754]: https://github.com/Xunnamius/symbiote/commit/e6827346cceeb12e8ce9f7aa52b868ccc9272253
[755]: https://github.com/Xunnamius/symbiote/commit/552b89f4a78d09be4281b7001bbd2e37880f195f
[756]: https://github.com/Xunnamius/symbiote/commit/7409b67ee7863d79fa9c689d34cb23378aa8707e
[757]: https://github.com/Xunnamius/symbiote/commit/2013638bd9d290bd619fb188ae96d077510170be
[758]: https://github.com/Xunnamius/symbiote/commit/5057f5376c96d6c9660cc672982f808454dd5ee7
[759]: https://github.com/Xunnamius/symbiote/commit/6c5a8fe3b009a49f44c3a476433bb41204827ddb
[760]: https://github.com/Xunnamius/symbiote/commit/a84c5235025ae7fe18d8bec997eb19472dce1b06
[761]: https://github.com/Xunnamius/symbiote/commit/f9bdb7ed796e77ce7d3dad3e0f4b04960984a1f8
[762]: https://github.com/Xunnamius/symbiote/commit/b6927a9b6e40937047008bc4337573e1eaafc4e8
[763]: https://github.com/Xunnamius/symbiote/commit/364fbb2c1b1981e96aab54503b54ffa496b33898
[764]: https://github.com/Xunnamius/symbiote/commit/11bd584b8b0d49b7f7e0184995922fbfad653666
[765]: https://github.com/Xunnamius/symbiote/commit/aee10cdf72edb6a1741d2880fd4cff8aa5dd8f71
[766]: https://github.com/Xunnamius/symbiote/commit/d44fa79bf7df8ae47acff4da881cdc7450cb64d1
[767]: https://github.com/Xunnamius/symbiote/commit/b7f27541e4b8d8540c70decab93b1e0df2b330bf
[768]: https://github.com/Xunnamius/symbiote/commit/f592d5faf07a02a50f3f3ed99baf8f23af94ee59
[769]: https://github.com/Xunnamius/symbiote/commit/7e6618353b307cbe03f2e9d5429639a78fac738f
[770]: https://github.com/Xunnamius/symbiote/commit/98c028a88e194a6085b320f7458a0a7de1ec7c62
[771]: https://github.com/Xunnamius/symbiote/commit/3030eb9258c22141352cb27d69e1c84037bc9a50
[772]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@2.0.0...@-xun/symbiote@2.0.1
[773]: https://github.com/Xunnamius/symbiote/commit/e42722b37c4b6d2ec1e39b5f7d10d304ac147bcc
[774]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.33.0...@-xun/symbiote@2.0.0
[775]: https://github.com/Xunnamius/symbiote/commit/b7b101e38446127aca8e7cd55b60f3731ab81ac0
[776]: https://github.com/Xunnamius/symbiote/commit/057f400cc043f1e13e701a97d2e67b93be4719d3
[777]: https://github.com/Xunnamius/symbiote/commit/d22de31fff57a3eabff39d5f564d04ca24051fda
[778]: https://github.com/Xunnamius/symbiote/commit/e83f2f27cd2e5c01c4c32532fb39bf16557b62b4
[779]: https://github.com/Xunnamius/symbiote/commit/ad83e562e1049d816498af50afc8a5bd3efca059
[780]: https://github.com/Xunnamius/symbiote/commit/0a19ce6bf1c302624d6c6d68b0d5ee3aff17aeda
[781]: https://github.com/Xunnamius/symbiote/commit/70b513431bf2d90c8590ecb68cedce9482ec0026
[782]: https://github.com/Xunnamius/symbiote/commit/1a522e88ed38c4e2d051bd2809293a66b86e48ef
[783]: https://github.com/Xunnamius/symbiote/commit/9d05b8bd93b6c28c218a060264253d403fe09617
[784]: https://github.com/Xunnamius/symbiote/commit/7a8eee69e839138e96fe3937ae8c178e44148e27
[785]: https://github.com/Xunnamius/symbiote/commit/abbc2da0ff368d976c2a73e0af1848d81e0ee05b
[786]: https://github.com/Xunnamius/symbiote/commit/53409fa0bd5d3b104a74f7ad7eb060334ac48bca
[787]: https://github.com/Xunnamius/symbiote/commit/2bd57b5ac1bbe3c23f772a9194ad604a01715290
[788]: https://github.com/Xunnamius/symbiote/commit/a40f886ca5f4abdffdee5df1b5259b5165e69c4f
[789]: https://github.com/Xunnamius/symbiote/commit/f2bb03d127d347d69b3f6c253cfbb286943c85fe
[790]: https://github.com/Xunnamius/symbiote/commit/641b57b7d0dd966573747fbdcb220f3f8bacdf05
[791]: https://github.com/Xunnamius/symbiote/commit/177a5dcf060e7d2a90e183ad6cf6d162e0746100
[792]: https://github.com/Xunnamius/symbiote/commit/c331ae1339dce62af60a59c171dd4d8fe3db3ed3
[793]: https://github.com/Xunnamius/symbiote/commit/87245154b394d12f43ac5f96675a8e0adcf7e7fe
[794]: https://github.com/Xunnamius/symbiote/commit/a6f02e0b4e4b157c3d98ffece54f4765515376d2
[795]: https://github.com/Xunnamius/symbiote/commit/5e99d888275bc8dd3d62e0add9cc3448476a2bda
[796]: https://github.com/Xunnamius/symbiote/commit/f511249a44a64a3e5885f2e51822af539f427e0f
[797]: https://github.com/Xunnamius/symbiote/commit/577710bf9ba5c47dff34554dd4bb1d20b9844d14
[798]: https://github.com/Xunnamius/symbiote/commit/2841d263ae20fdc5d875afe74ce3fd6eb309105e
[799]: https://github.com/Xunnamius/symbiote/commit/5c66c170ade8c6ab34e8003833eedb2fd35f13e5
[800]: https://github.com/Xunnamius/symbiote/commit/6a44488ce9daf5ec86b6df8257fd06f6444bd4bf
[801]: https://github.com/Xunnamius/symbiote/commit/26fb0346ccac211d0ab3deecc332eb8d047da9ea
[802]: https://github.com/Xunnamius/symbiote/commit/4f8d351103c48f8114f47f07a37f1f6fe8c21c3f
[803]: https://github.com/Xunnamius/symbiote/commit/26e756362a16f050e03cef2c4c582d94e29614cd
[804]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.32.0...@-xun/symbiote@1.33.0
[805]: https://github.com/Xunnamius/symbiote/commit/f1e8e8e08a4139a060af4c155aa1ee4e73c344e0
[806]: https://github.com/Xunnamius/symbiote/commit/49258852c3fcd7dd992c2b244bb7a7e50c88dbd7
[807]: https://github.com/Xunnamius/symbiote/commit/ca87588aee7f76fe8635e4e7f2f712b7b96671bb
[808]: https://github.com/Xunnamius/symbiote/commit/410a05ae14f91c62d0c43e624a9a8f815c0885c6
[809]: https://github.com/Xunnamius/symbiote/commit/f111552d67f5c3bdd81c8d24a4fea5e21298f620
[810]: https://github.com/Xunnamius/symbiote/commit/1d9accc2d1627d74a04f1bb7f776a4e4b2049f9a
[811]: https://github.com/Xunnamius/symbiote/commit/51ab45426d8058a8a84b8206feda4242d780f53a
[812]: https://github.com/Xunnamius/symbiote/commit/c2bee3ba59f700348dc33e31ad742d2348169ec0
[813]: https://github.com/Xunnamius/symbiote/commit/b057430a463e47e5774bef53a00e8a0677914291
[814]: https://github.com/Xunnamius/symbiote/commit/eec0ed930df8cfaec7a98459b4d56849aac01749
[815]: https://github.com/Xunnamius/symbiote/commit/16f64e190ca4798c6fc148de2e354b7973750784
[816]: https://github.com/Xunnamius/symbiote/commit/413dc399483771459ce358ca126bba405f1233c6
[817]: https://github.com/Xunnamius/symbiote/commit/28c221bb8a859e69003ba2447e3f5763dc92a0ec
[818]: https://github.com/Xunnamius/symbiote/commit/6a8c411beeda36c4d6825608de4c76eb481d8cb5
[819]: https://github.com/Xunnamius/symbiote/commit/da7e953744dde41a45c249d74e7f4007719eece4
[820]: https://github.com/Xunnamius/symbiote/commit/edec64f03b4f426f768a4ba699c64c8cc7ce1f80
[821]: https://github.com/Xunnamius/symbiote/commit/578d631717f64f0a1405a5fe40106ff9e8520a22
[822]: https://github.com/Xunnamius/symbiote/commit/bf993c947a42aaaa96060bc9ac29f334e28db0ea
[823]: https://github.com/Xunnamius/symbiote/commit/c52b3f184ba122013ac555d962b3df41c9329d0c
[824]: https://github.com/Xunnamius/symbiote/commit/cdfd48df4a6a422042c7f239bc2246f033da91c2
[825]: https://github.com/Xunnamius/symbiote/commit/d6a0c06d5c37835dbbf0c987b84c95bcc840b6c9
[826]: https://github.com/Xunnamius/symbiote/commit/a33aed8d5b0262dd81b375fcef062e5f7d1b5601
[827]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.31.2...@-xun/symbiote@1.32.0
[828]: https://github.com/Xunnamius/symbiote/commit/c9a6e8b7ee5518f658bcd62a800be0b065feffb7
[829]: https://github.com/Xunnamius/symbiote/commit/e17adfb5fcd7395225e1fb530ebce697dce1b40d
[830]: https://github.com/Xunnamius/symbiote/commit/c5cd76a0fbb13149871b4b5b1d8badf6277c455a
[831]: https://github.com/Xunnamius/symbiote/commit/56e576cb940a966292d7378200f153215b55351a
[832]: https://github.com/Xunnamius/symbiote/commit/aa60eebffcdbbf28d8ce6943dc7ed6cb6b50150b
[833]: https://github.com/Xunnamius/symbiote/commit/c248757d6afb672ef03d93c652f5385bd80670df
[834]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.31.1...@-xun/symbiote@1.31.2
[835]: https://github.com/Xunnamius/symbiote/commit/0565333411580fd45659aad0e9727012cea9a699
[836]: https://github.com/Xunnamius/symbiote/commit/f4ecfc9dd682e307a08becf562a877450fe903ef
[837]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.31.0...@-xun/symbiote@1.31.1
[838]: https://github.com/Xunnamius/symbiote/commit/cfe28e3d801ec1b719b0dedbda4e9f63d7924b77
[839]: https://github.com/Xunnamius/symbiote/commit/89350088d45a927b2d85ce710a21d89af74c1d21
[840]: https://github.com/Xunnamius/symbiote/commit/39e37a8070e22e93b0042ae80f80207b67cf3ed2
[841]: https://github.com/Xunnamius/symbiote/commit/58a6223696187f874d98bb91ec3f37719e7f33bd
[842]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.3...@-xun/symbiote@1.31.0
[843]: https://github.com/Xunnamius/symbiote/commit/8f7777c426ce028f106db4654c8bd3535da7151b
[844]: https://github.com/Xunnamius/symbiote/commit/6fc66d8a50979c2ee7424a94dd0c98179f9ac47b
[845]: https://github.com/Xunnamius/symbiote/commit/8a5fd8a05a1b7cd3a9d820f594145e2be76bb746
[846]: https://github.com/Xunnamius/symbiote/commit/68d5bda031da6af194e5d5f3199eeac7c7416076
[847]: https://github.com/Xunnamius/symbiote/commit/ef6927b763b236d731e9013c739a5336d02193d2
[848]: https://github.com/Xunnamius/symbiote/commit/ceb6c6280370ff13d3eb9fcd5d6b9ec2b4b993f3
[849]: https://github.com/Xunnamius/symbiote/commit/ce934437a7db5039d1c572906332ee6389bcf5a2
[850]: https://github.com/Xunnamius/symbiote/commit/6ce819a34df36aaf26bf7b8d7e87b6085547183f
[851]: https://github.com/Xunnamius/symbiote/commit/62a5a128781629f5df99e05eff025da3e88022a6
[852]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.2...@-xun/symbiote@1.30.3
[853]: https://github.com/Xunnamius/symbiote/commit/01dca03e237882091b9f849a4beeb06537d27ecd
[854]: https://github.com/Xunnamius/symbiote/commit/b923d6daa24240ab9930bade670683e950e36e30
[855]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.1...@-xun/symbiote@1.30.2
[856]: https://github.com/Xunnamius/symbiote/commit/98a868e21d0126772abbbb69bb64a9b56da229ac
[857]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.30.0...@-xun/symbiote@1.30.1
[858]: https://github.com/Xunnamius/symbiote/commit/89eebe76ad675b35907b3379b29bfde27fd5a5b8
[859]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.29.2...@-xun/symbiote@1.30.0
[860]: https://github.com/Xunnamius/symbiote/commit/3710988e3577a60357c780a19fa9a28e0dd58332
[861]: https://github.com/Xunnamius/symbiote/commit/e1633023dfcc7b2ea7a213c11139b589bd99d1b7
[862]: https://github.com/Xunnamius/symbiote/commit/ca47d93f4c507108c23cfd2e613ff758fd56d1c9
[863]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.29.1...@-xun/symbiote@1.29.2
[864]: https://github.com/Xunnamius/symbiote/commit/d89809b1811fb99fb24fbfe0c6960a0e087bcc27
[865]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.29.0...@-xun/symbiote@1.29.1
[866]: https://github.com/Xunnamius/symbiote/commit/8feaaa78a9f524f02e4cc9204ef84f329d31ab94
[867]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.28.0...@-xun/symbiote@1.29.0
[868]: https://github.com/Xunnamius/symbiote/commit/053bf3e15be94ed90e9b2b9fdf82c0b0b7c6da0d
[869]: https://github.com/Xunnamius/symbiote/commit/002431f7c880bdd55c6cc71f7660dec8ba84966f
[870]: https://github.com/Xunnamius/symbiote/commit/65b8c0b01acf9c60fc3cb5a1904832fd99f95329
[871]: https://github.com/Xunnamius/symbiote/commit/0ed2513071351aa815018080c9a6d477141905d6
[872]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.27.0...@-xun/symbiote@1.28.0
[873]: https://github.com/Xunnamius/symbiote/commit/c3fc1264932eb8224289ef973366fc0cb5435f59
[874]: https://github.com/Xunnamius/symbiote/commit/a91e7fa7a369d3d71bc98b147279c01b8f87af3c
[875]: https://github.com/Xunnamius/symbiote/commit/71b17c8574fe55da23831cd1be11457e7cb4bdb5
[876]: https://github.com/Xunnamius/symbiote/commit/7fed43963c71aad0d9b37b72a52dad1c55226140
[877]: https://github.com/Xunnamius/symbiote/commit/11b585ddfa1954ce0380fa64b5c4120773dc55d2
[878]: https://github.com/Xunnamius/symbiote/commit/cf5b25b85bacd164e57f5e26863cf6c1581d8c68
[879]: https://github.com/Xunnamius/symbiote/commit/55ee62d4a379fc1aae845c6847adc0a9c8a8db6f
[880]: https://github.com/Xunnamius/symbiote/commit/56b706a90fbab254ee74509f45cf632157a0cfdc
[881]: https://github.com/Xunnamius/symbiote/commit/b3e256005e6c4e658993e9edbfb1013e633e09a9
[882]: https://github.com/Xunnamius/symbiote/commit/d1038dd83a5fbfadf4e2dd94a430023c671f8377
[883]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.26.0...@-xun/symbiote@1.27.0
[884]: https://github.com/Xunnamius/symbiote/commit/1a69887158a00db7133cf0a2eee85146ec6d1399
[885]: https://github.com/Xunnamius/symbiote/commit/1262cc85e615a3e0ac7766099e166aeae6a1e3e1
[886]: https://github.com/Xunnamius/symbiote/commit/645473d084f3d4033afe39d72802b0a2a89e112d
[887]: https://github.com/Xunnamius/symbiote/commit/c5c742e64b9a56894866c0110cb3161ae3321b0f
[888]: https://github.com/Xunnamius/symbiote/commit/11da8f2253218e0303be5a2ae11eee7ae958f0b5
[889]: https://github.com/Xunnamius/symbiote/commit/afa3f466c6d6e960ccb11c76149c54378a87b16a
[890]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.25.0...@-xun/symbiote@1.26.0
[891]: https://github.com/Xunnamius/symbiote/commit/5c8816d895864b48e3106b178284d57e9fdc3687
[892]: https://github.com/Xunnamius/symbiote/commit/44be676ca04207bd17553941d367abda2325c0ee
[893]: https://github.com/Xunnamius/symbiote/commit/3323fc3580b663f00518e7ca7bd9f52a7e50b80f
[894]: https://github.com/Xunnamius/symbiote/commit/8a67d707c540f5e23d6f3ad8f6efe2d79cb35361
[895]: https://github.com/Xunnamius/symbiote/commit/9b551a7be83a12c43408f9d33d117c3a6218cff4
[896]: https://github.com/Xunnamius/symbiote/commit/0924dd3f6544d39ab5f4f7f50c5173704aab3909
[897]: https://github.com/Xunnamius/symbiote/commit/ce72af261f1d9c15f89e11251ad8c5f000ff8afa
[898]: https://github.com/Xunnamius/symbiote/commit/6ac3376124a2d86316f248b662f327ceee470b58
[899]: https://github.com/Xunnamius/symbiote/commit/09373fa4830377ba42824797eb0791655da0fa34
[900]: https://github.com/Xunnamius/symbiote/commit/b3e95e72ccfdce365933aeb27afe5a8bb64bdec5
[901]: https://github.com/Xunnamius/symbiote/commit/d27007d1ebda295a05b6ed116a0421d7610aff42
[902]: https://github.com/Xunnamius/symbiote/commit/998218d7d3f3a654dcdd33e2e1c5ce033927774e
[903]: https://github.com/Xunnamius/symbiote/commit/9087086d6944cb6a847f325142753a63be2ca30c
[904]: https://github.com/Xunnamius/symbiote/commit/36016b10da47bb5799d3e558831a96eda878c10e
[905]: https://github.com/Xunnamius/symbiote/commit/86fca5843564773f9e0ec53c454c72109befbec6
[906]: https://github.com/Xunnamius/symbiote/commit/bb6bde93dffe0a8f565dace3bfc970b52ff88c79
[907]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.24.0...@-xun/symbiote@1.25.0
[908]: https://github.com/Xunnamius/symbiote/commit/31c7bbb45d313ca9a1edaf9c682da438fde76830
[909]: https://github.com/Xunnamius/symbiote/commit/4f807cf260af20ae6a60138dae1e4b7204eed570
[910]: https://github.com/Xunnamius/symbiote/commit/d22cee3b292da80ab45e4513bba3b2157fa72245
[911]: https://github.com/Xunnamius/symbiote/commit/9045cd704121600e07d84839c3e23b407e184f6b
[912]: https://github.com/Xunnamius/symbiote/commit/42510f65184850994a3334041e7ae7313af4e0ad
[913]: https://github.com/Xunnamius/symbiote/commit/c0b7b705cc0e398ca2396efab497aac92466b422
[914]: https://github.com/Xunnamius/symbiote/commit/f8734d43a2061d54ef4382d159aea7815ce03ca5
[915]: https://github.com/Xunnamius/symbiote/commit/005ab26c7be42aeec8a100753ba49f41b0d38550
[916]: https://github.com/Xunnamius/symbiote/commit/e7c4b6e1bc996d5a975a497cd3ca0e4774a39a85
[917]: https://github.com/Xunnamius/symbiote/commit/c62261b48969a52b54464de106eb02edb170fd5a
[918]: https://github.com/Xunnamius/symbiote/commit/4d5ddb62d49f74d07dc8c24887bcf3ec50c00362
[919]: https://github.com/Xunnamius/symbiote/commit/0bfdf77284d074696b6192a511f2ae44d16a3216
[920]: https://github.com/Xunnamius/symbiote/commit/da60db8ff76efa3ad05f524298df8c0bb64399e3
[921]: https://github.com/Xunnamius/symbiote/commit/576dd649da2775841e9a2e985b02e564a2be1caa
[922]: https://github.com/Xunnamius/symbiote/commit/ffcad30844a8223d29369bb5303468f1534176a4
[923]: https://github.com/Xunnamius/symbiote/commit/4059ed7d534afa9b74bd93f761f92e5d5996990a
[924]: https://github.com/Xunnamius/symbiote/commit/5ea7f8a45c16bd07ff0f5bcdc8e4f6fa82908df0
[925]: https://github.com/Xunnamius/symbiote/commit/d4d37566ea09a69679ec61da20c3a5aca9a8720f
[926]: https://github.com/Xunnamius/symbiote/commit/d91572787be84252d2b37f3f6c1fa72e7528c62b
[927]: https://github.com/Xunnamius/symbiote/commit/5d61e8783923775def0a0fcd1fc9fd57e65ab184
[928]: https://github.com/Xunnamius/symbiote/commit/1d0dee8044cdd8cd88c6d8ccfe10c95c7b6a36bd
[929]: https://github.com/Xunnamius/symbiote/commit/4e853808704a86d2f207aaa7cc0b5531cb05ad00
[930]: https://github.com/Xunnamius/symbiote/commit/2b46883f153688f590ac3e1baed996bde3c4e1e6
[931]: https://github.com/Xunnamius/symbiote/commit/95b0f6899582ed0bbb4f78bb12ce556079d36b67
[932]: https://github.com/Xunnamius/symbiote/commit/81ba7bcaea006b1094131d0f0bb3c3dd0828cf13
[933]: https://github.com/Xunnamius/symbiote/commit/128e83acfd2dd1f5b3ffca6b1feb7892a2fa38b3
[934]: https://github.com/Xunnamius/symbiote/commit/c4016a8318afb13d6fd6ff9b5bf58a30231e5002
[935]: https://github.com/Xunnamius/symbiote/commit/0f4c7b1e678f56ff0cb5112c8858f0da57254d91
[936]: https://github.com/Xunnamius/symbiote/commit/1894d80efed02438233672074116dfa06e0c91f7
[937]: https://github.com/Xunnamius/symbiote/commit/351ee50466956e8fc31eeaf1de79418f8ab04c16
[938]: https://github.com/Xunnamius/symbiote/commit/74ab5d91a21dd66aa7a0412fb3ce2ad89de3c1bc
[939]: https://github.com/Xunnamius/symbiote/commit/18dbad0840fc762fab169d38d606afd41316dd1b
[940]: https://github.com/Xunnamius/symbiote/commit/8e82ac18456a552cdf55fe75be9e7e11f958aa65
[941]: https://github.com/Xunnamius/symbiote/commit/f323a6ad34c69bca84a2618598f0801f26a0df82
[942]: https://github.com/Xunnamius/symbiote/commit/4a6e25433385507c2d326f40c56093bcd54b171d
[943]: https://github.com/Xunnamius/symbiote/commit/4e3cdc092ad2bf0f716a41ff16e2d6fb2267cc5a
[944]: https://github.com/Xunnamius/symbiote/commit/5e0058708501603a5ed40fbd3934a2d01842c3fa
[945]: https://github.com/Xunnamius/symbiote/commit/9b8b41a72605c3beabdf11c9155733bf1eb99ec0
[946]: https://github.com/Xunnamius/symbiote/commit/e22403c276eda0e6281085198933d6df3a1dcc90
[947]: https://github.com/Xunnamius/symbiote/commit/c34a5499cb58878fdaa42e83063e1c36a0582e06
[948]: https://github.com/Xunnamius/symbiote/commit/43da8828df733ab8fd835d1a40c2a2c0c98fdd9b
[949]: https://github.com/Xunnamius/symbiote/commit/33af2bc79370b38bc94633617180bcd283b5a0bf
[950]: https://github.com/Xunnamius/symbiote/commit/c1ac811d2d7500a4b665d4d1531b5d51a9da2c19
[951]: https://github.com/Xunnamius/symbiote/commit/901d85357b06b854b6c37a34ac2b37948376660c
[952]: https://github.com/Xunnamius/symbiote/commit/1fb8568e874687f25f13bcd31db7e94a8eb43282
[953]: https://github.com/Xunnamius/symbiote/commit/3373208a68bb1c11e75e68b0c53ff04cb0446035
[954]: https://github.com/Xunnamius/symbiote/commit/8cbc4e40c61d48b61ab4ee2c34f679f6cd2ed0ab
[955]: https://github.com/Xunnamius/symbiote/commit/b1249edd6124c7f86bc60288861d61854e30ff3d
[956]: https://github.com/Xunnamius/symbiote/commit/7d21ee2741c01a2c2f5f75bcfcfe2a59a54a077a
[957]: https://github.com/Xunnamius/symbiote/commit/5eb9deff748ee6e4af3c57a16f6370d16bb97bfb
[958]: https://github.com/Xunnamius/symbiote/commit/b928e8a92064bcc4a0ef17b45eb6af40654208f2
[959]: https://github.com/Xunnamius/symbiote/commit/45bcd8c56f38ccbc330b4088c6f8a5812714611a
[960]: https://github.com/Xunnamius/symbiote/commit/f50abaf0309ca2e0e0f21b429683c8369e5e2210
[961]: https://github.com/Xunnamius/symbiote/commit/98a1dd7eacac964a7fbab47ded92c33173383f11
[962]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.23.0...@-xun/symbiote@1.24.0
[963]: https://github.com/Xunnamius/symbiote/commit/467e88442c58320f1b65e6de3bd5e52c0220132b
[964]: https://github.com/Xunnamius/symbiote/commit/472af2c847833e17c6d88d61d8cc2e885ef21338
[965]: https://github.com/Xunnamius/symbiote/commit/8ab4eecd7242de0447c86f2535ccdd31c5d5291e
[966]: https://github.com/Xunnamius/symbiote/commit/69f2dc0d929150f46c3fc4990a37338111d1a4f6
[967]: https://github.com/Xunnamius/symbiote/commit/8dc4a962ae457c82585e3c34d1ee02c731aedec3
[968]: https://github.com/Xunnamius/symbiote/commit/e3fa185ffa33d801bc1f7d9faeda1d40eaa8a117
[969]: https://github.com/Xunnamius/symbiote/commit/89b57c4e38f74970a301e6261acdfeca27982d44
[970]: https://github.com/Xunnamius/symbiote/commit/b8b82d942c478673b10b2d071802c73461c42961
[971]: https://github.com/Xunnamius/symbiote/commit/69ebf4a549a7ce9848c19c27035d77473f5707a8
[972]: https://github.com/Xunnamius/symbiote/commit/556f17ec5b274c0bf08d364905a99b8e27bfff63
[973]: https://github.com/Xunnamius/symbiote/commit/74d58d66649401b6e8f17e53076ea4972bc1d888
[974]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.22.0...@-xun/symbiote@1.23.0
[975]: https://github.com/Xunnamius/symbiote/commit/1bdceca9e23b28bffb12b84013ba95ef54c5ac81
[976]: https://github.com/Xunnamius/symbiote/commit/6ff2bd3423e7b7e9af224e937200bee1fb5691ea
[977]: https://github.com/Xunnamius/symbiote/commit/a1d36577666cddfce19970975144e085c7a0c353
[978]: https://github.com/Xunnamius/symbiote/commit/fa2a97f118389cdaf4227a07a9bf5a5bc4cc2dfe
[979]: https://github.com/Xunnamius/symbiote/commit/6e3f599ab734f0a7fcd2faff59e2c377eeec3fa1
[980]: https://github.com/Xunnamius/symbiote/commit/ca021f8fb5d821cc21129c4a29e6d43e24166183
[981]: https://github.com/Xunnamius/symbiote/commit/b9218ee5f94be5da6a48d961950ed32307ad7f96
[982]: https://github.com/Xunnamius/symbiote/commit/dc47cfbbdc869aa2d149924c72bb5414b0f46f07
[983]: https://github.com/Xunnamius/symbiote/commit/ebb4fb597a47fa0d748735e3b0a2832434b7a637
[984]: https://github.com/Xunnamius/symbiote/commit/ccc82b396baeb2445174d0c8b9da97522cb66066
[985]: https://github.com/Xunnamius/symbiote/commit/65569086d8546cbb06d2f0434e0da5c839959cf8
[986]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.21.0...@-xun/symbiote@1.22.0
[987]: https://github.com/Xunnamius/symbiote/commit/8bdf28b7ba33aae68f04ee62f6b2d72d39c62012
[988]: https://github.com/Xunnamius/symbiote/commit/0c3f85c0e926cff1645b6a329edcc6304b8ac189
[989]: https://github.com/Xunnamius/symbiote/commit/531d3eae3ffb883e69799688a89c28e55cdcf177
[990]: https://github.com/Xunnamius/symbiote/commit/a7a66d9ffeecb4ba1d8b8519a97fc10f1fea72a6
[991]: https://github.com/Xunnamius/symbiote/commit/e37006ee62471c2cf178a89023e34a9b691b7574
[992]: https://github.com/Xunnamius/symbiote/commit/349cf201e0cbfdc2b925690744b4ff6737a008b3
[993]: https://github.com/Xunnamius/symbiote/commit/d8b7442d320a4c4efbe03cb0a502ad337211caee
[994]: https://github.com/Xunnamius/symbiote/commit/b16b74f12f0397003b7689ccee4a72dafd9e116b
[995]: https://github.com/Xunnamius/symbiote/commit/c7fe4109820fb109db7a0ea07985089d1b488535
[996]: https://github.com/Xunnamius/symbiote/commit/2c40974df517c6226d351e0ab9d8f66675792272
[997]: https://github.com/Xunnamius/symbiote/commit/f5fb1bcbafb797b2c7d88655895e185b03f2e1db
[998]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.8...@-xun/symbiote@1.21.0
[999]: https://github.com/Xunnamius/symbiote/commit/bf9514f27e8299b6f489dab44174a3ce9f0c2c09
[1000]: https://github.com/Xunnamius/symbiote/commit/7ad96c5edd2c8a6275e94cde9a1c5721cdd88dda
[1001]: https://github.com/Xunnamius/symbiote/commit/d54cfa03ffcfc52779cb283802e447df42a0cfed
[1002]: https://github.com/Xunnamius/symbiote/commit/646aa3cee846f4a6169ae05c91d5b4762e1c290e
[1003]: https://github.com/Xunnamius/symbiote/commit/a08c9f1fd5448c918aa65f09f1842dc46162fb8a
[1004]: https://github.com/Xunnamius/symbiote/commit/cd82265731cd411d9b374c3bbe3c642c93a053fe
[1005]: https://github.com/Xunnamius/symbiote/commit/94a2253a2888d5d2b34290d7b0180fdee2a2a104
[1006]: https://github.com/Xunnamius/symbiote/commit/db0c6d71e780edd2d6ab295abc136ac3fa3979d7
[1007]: https://github.com/Xunnamius/symbiote/commit/7dcbf56f1d89bddc9ad635e47a6f27a13274e799
[1008]: https://github.com/Xunnamius/symbiote/commit/e334962ae950f510b35d09bb5d6ed6326a586de0
[1009]: https://github.com/Xunnamius/symbiote/commit/8833e0a06f0733e89b4496719aa8b71050783339
[1010]: https://github.com/Xunnamius/symbiote/commit/5070ab49e00314a91a6c87aa1715846939531023
[1011]: https://github.com/Xunnamius/symbiote/commit/1eff5cb11f90533bd4ceeca8c269e8a4e5b998c0
[1012]: https://github.com/Xunnamius/symbiote/commit/0eb7fd3b75fe765781b5ca482abbd38e3b0a1a65
[1013]: https://github.com/Xunnamius/symbiote/commit/8d69310b68b2362d815e1e1e1d76d5688d6b46ff
[1014]: https://github.com/Xunnamius/symbiote/commit/e169f47888b112eda08cb8518b69ba3bfd9f2b26
[1015]: https://github.com/Xunnamius/symbiote/commit/e7b857926d572780c951aa1161133186d2cf1784
[1016]: https://github.com/Xunnamius/symbiote/commit/2036da0350a573c7ae9179d6cdd794e91935c9ae
[1017]: https://github.com/Xunnamius/symbiote/commit/a35f4c0e581dff4a7667277284052a7fa71b672e
[1018]: https://github.com/Xunnamius/symbiote/commit/3f1a5a9a6c7ce7cd8aba5c521fb95c6beed3394e
[1019]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.7...@-xun/symbiote@1.20.8
[1020]: https://github.com/Xunnamius/symbiote/commit/ce701f3d57da9f82ee0036320bc62d5c51233011
[1021]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.6...@-xun/symbiote@1.20.7
[1022]: https://github.com/Xunnamius/symbiote/commit/3c48ae1560cd1d689340739f550f4feb18754e81
[1023]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.5...@-xun/symbiote@1.20.6
[1024]: https://github.com/Xunnamius/symbiote/commit/76992d930b92919b8ab95f195cec98ddb91fb390
[1025]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.4...@-xun/symbiote@1.20.5
[1026]: https://github.com/Xunnamius/symbiote/commit/0864f9221ff2134311ba716cc2eca83aa044fa12
[1027]: https://github.com/Xunnamius/symbiote/commit/ff3853fa7835e9b2f89e2a9a846db76d6b2dd4a5
[1028]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.3...@-xun/symbiote@1.20.4
[1029]: https://github.com/Xunnamius/symbiote/commit/0bf89cad7426062a1d0f1ed6b9e69c1e60c734aa
[1030]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.2...@-xun/symbiote@1.20.3
[1031]: https://github.com/Xunnamius/symbiote/commit/dd265b47f6ff85a27a80867a60ffbc8aa87e15de
[1032]: https://github.com/Xunnamius/symbiote/commit/cf21d7d56b8d28fe14e87a975ec151c9f16e4717
[1033]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.1...@-xun/symbiote@1.20.2
[1034]: https://github.com/Xunnamius/symbiote/commit/bc2a56b8e3bb237caba1768c1673d3848d97e0d6
[1035]: https://github.com/Xunnamius/symbiote/commit/52115470ce25670c0355bba2653789a6df8b3aaa
[1036]: https://github.com/Xunnamius/symbiote/commit/8735f612072b02c3af08054d8f858b5764aab92d
[1037]: https://github.com/Xunnamius/symbiote/commit/a86884fbde354ac7d2cbd5c355d67b536e90f3e6
[1038]: https://github.com/Xunnamius/symbiote/commit/b23b12b64b968429652269db3ae710f79c3ce356
[1039]: https://github.com/Xunnamius/symbiote/commit/8b54237af01ef168984d9b306063e60e7914c936
[1040]: https://github.com/Xunnamius/symbiote/commit/571968164a4defe8eefdb81341cd7a0664079a66
[1041]: https://github.com/Xunnamius/symbiote/commit/f2cb8fd3a8ad8a0ea642b34a1cca9159bb51b101
[1042]: https://github.com/Xunnamius/symbiote/commit/3008cde37d490c51b2c1ab549ad4faa847d8266d
[1043]: https://github.com/Xunnamius/symbiote/commit/25e7a3b93bd0cfd32df2aaaa83ee055bc7ba1c92
[1044]: https://github.com/Xunnamius/symbiote/commit/904c9ac9bb6b4b1d3b047124e749c9f33f8878c9
[1045]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.20.0...@-xun/symbiote@1.20.1
[1046]: https://github.com/Xunnamius/symbiote/commit/a2ea7df939d4f1e11e3904c653f35f87abe65651
[1047]: https://github.com/Xunnamius/symbiote/commit/35876a1903ae9180624905e176f7c4b2e1d870a1
[1048]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.19.1...@-xun/symbiote@1.20.0
[1049]: https://github.com/Xunnamius/symbiote/commit/d84b35ff2b28040920fb62a405e29f2e54d29d4f
[1050]: https://github.com/Xunnamius/symbiote/commit/6ef0123a0d9d1668ce567cf526e04951a3d25dd1
[1051]: https://github.com/Xunnamius/symbiote/commit/8cf99a986ddf05e8d2a740d58e9ccdf5a0675e43
[1052]: https://github.com/Xunnamius/symbiote/commit/3dd5d787a3de11f375bb9ca815840400fbe8cdf3
[1053]: https://github.com/Xunnamius/symbiote/commit/5c3ed7323a7bf5f3dd1a3d7dd73c8511ef04ff82
[1054]: https://github.com/Xunnamius/symbiote/commit/c912b0992a3033ed5d978d7f5c139569f2bd0608
[1055]: https://github.com/Xunnamius/symbiote/commit/9cb2d72efc872c4003dabc8c68856b72e8f7c3a4
[1056]: https://github.com/Xunnamius/symbiote/commit/ce035004c4bea999ba5cf583c16fc1dbc8a232a6
[1057]: https://github.com/Xunnamius/symbiote/commit/22f2f41be642d3d94fc4e5a50014a61ab68c50b4
[1058]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.19.0...@-xun/symbiote@1.19.1
[1059]: https://github.com/Xunnamius/symbiote/commit/d2011645a568e76bdf61dde14dd0e15dbce243dc
[1060]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.18.0...@-xun/symbiote@1.19.0
[1061]: https://github.com/Xunnamius/symbiote/commit/0c199f69971688205b1ee027dce36c2bc6ab8a04
[1062]: https://github.com/Xunnamius/symbiote/commit/587a354329e46ca03f056ca1414915145928736c
[1063]: https://github.com/Xunnamius/symbiote/commit/92bb25fe5f8022271ae03ee56e18377ad02e392b
[1064]: https://github.com/Xunnamius/symbiote/commit/909949d58e2ddecf4ad606fe0dd9525ec540a8fb
[1065]: https://github.com/Xunnamius/symbiote/commit/59dd7523276ab48868124e8f76f06784bc59f794
[1066]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.17.0...@-xun/symbiote@1.18.0
[1067]: https://github.com/Xunnamius/symbiote/commit/6c7ae27d3d93d36e7cbcae873b8717d252cf6670
[1068]: https://github.com/Xunnamius/symbiote/commit/e833523e6085950c3477ca6e44ae92ef7b1fad46
[1069]: https://github.com/Xunnamius/symbiote/commit/0383586f6ccbb0bc503df636f515d19618548f92
[1070]: https://github.com/Xunnamius/symbiote/commit/3a3489c43d2ce10ac752d70ab23066bd3477a675
[1071]: mailto:tsc@5.6-beta
[1072]: https://github.com/Xunnamius/symbiote/commit/4e7509611f72d2c953572dbc67bb51aabf2304d6
[1073]: https://github.com/Xunnamius/symbiote/commit/f6515ea793a72cfd42cb6d3f74675b2ae3a9b2e1
[1074]: https://github.com/Xunnamius/symbiote/commit/01375f77f74bfaf0b38de5bdd30d162461aa6106
[1075]: https://github.com/Xunnamius/symbiote/commit/df6116b1c5ad4c0f7c3152cc254d943a7b9e67e7
[1076]: https://github.com/Xunnamius/symbiote/commit/8d7152112e4927f566e048c6b0be7dfce4a6c430
[1077]: https://github.com/Xunnamius/symbiote/commit/d9b4b80db15e6104a2a3ab7325996a08a350ea6d
[1078]: https://github.com/Xunnamius/symbiote/commit/64b7309fcb28c1214f1edcc8319960c1c94f72b0
[1079]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.16.1...@-xun/symbiote@1.17.0
[1080]: https://github.com/Xunnamius/symbiote/commit/63354c710f8cfe21d274c7083eecd28da66c57c9
[1081]: https://github.com/Xunnamius/symbiote/commit/369d9690614b09b8a2a9efe4321a2786a60e2f20
[1082]: https://github.com/Xunnamius/symbiote/commit/609fca8cde508ecdb6c74ff8d1884821afdd5eb3
[1083]: https://github.com/Xunnamius/symbiote/commit/e55a88e728a9c4ccbd38648e85328ab563add014
[1084]: https://github.com/Xunnamius/symbiote/commit/b56fd666cfcccbc7d941df7afb6fcfc74ec0ae56
[1085]: https://github.com/Xunnamius/symbiote/commit/323579d026f46d2d0f70aa44440543eecbc7b4e2
[1086]: https://github.com/Xunnamius/symbiote/commit/8609db712c80439ee26966b638b8d6a9cb6e0d59
[1087]: https://github.com/Xunnamius/symbiote/commit/52763c5b795e9ee0485e9a20a4cb5264eae0ef3c
[1088]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.16.0...@-xun/symbiote@1.16.1
[1089]: https://github.com/Xunnamius/symbiote/commit/8f1d25d7356419160a65f4a4dd764a6192df2f26
[1090]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.15.0...@-xun/symbiote@1.16.0
[1091]: https://github.com/Xunnamius/symbiote/commit/1153f424ae97b339f1ae345269663ddc5d3458d7
[1092]: https://github.com/Xunnamius/symbiote/commit/12ee54a21f0004eb568763507540157371aa06be
[1093]: https://github.com/Xunnamius/symbiote/commit/0543cff5d6e50a688365bf314837b54342106327
[1094]: https://github.com/Xunnamius/symbiote/commit/346b4ac5d27ea045cd037c4987401786f7fa572b
[1095]: https://github.com/Xunnamius/symbiote/commit/f42f4ab7c83a05fed253475de7bf2df4ce53d48f
[1096]: https://github.com/Xunnamius/symbiote/commit/e596e5bc36b9ed024f8c524cd6d55f15b813bcfc
[1097]: https://github.com/Xunnamius/symbiote/commit/d96ae1df1940941fbdf491e0b36c200574179bea
[1098]: https://github.com/Xunnamius/symbiote/commit/c9e254a5eece3c3ed51348d28897ed354725643f
[1099]: https://github.com/Xunnamius/symbiote/commit/060ef01a19f9a5022dcc855291e04ea6f8013c09
[1100]: https://github.com/Xunnamius/symbiote/commit/ea6aafff5d49f6acd8cac65b3c92e6cfd940e4b5
[1101]: https://github.com/Xunnamius/symbiote/commit/eb5631b6a316d808bb88928e27fe88ee818d230b
[1102]: https://github.com/Xunnamius/symbiote/commit/b72401ad18cead8a6d8571d8e35a6235c23b5381
[1103]: https://github.com/Xunnamius/symbiote/commit/7c1e7f14e28518285bc554c730f7eaea933a2e52
[1104]: https://github.com/Xunnamius/symbiote/commit/d3301ca5284ba96b750be48f12ecd3c821d27654
[1105]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.14.0...@-xun/symbiote@1.15.0
[1106]: https://github.com/Xunnamius/symbiote/commit/8554e1a4fd20b72d6b917f92cdb9e084b4086b25
[1107]: https://github.com/Xunnamius/symbiote/commit/b66572376dd63858df091755bb1eb184b56f2c7b
[1108]: https://github.com/Xunnamius/symbiote/commit/49a3453b25941eecf6a498aa1462aed83f71eaa1
[1109]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.13.0...@-xun/symbiote@1.14.0
[1110]: https://github.com/Xunnamius/symbiote/commit/a5075305e5d9a3cf5451ca5c156c3ffe307f7018
[1111]: https://github.com/Xunnamius/symbiote/commit/489e75a7916d4b77b6a37f6b557cbbd4b7c15e5e
[1112]: https://github.com/Xunnamius/symbiote/commit/1b6c72ae8007c801207547a74de598d38b769968
[1113]: https://github.com/Xunnamius/symbiote/commit/82c2b0fd8a9bc35bda01c3f48001032bd3ba66e2
[1114]: https://github.com/Xunnamius/symbiote/commit/68c55821991d1eaf821dfe603cfee1a9aca83d4f
[1115]: https://github.com/Xunnamius/symbiote/commit/2ed43444661b4fba89c20bb5f2a0341faf535a9b
[1116]: https://github.com/Xunnamius/symbiote/commit/cafeb73773b2e08137d9c6d7f7432802cc9d3b88
[1117]: https://github.com/Xunnamius/symbiote/commit/f08250c17077cff70cdf722d2e9c3b16d3841ebf
[1118]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.12.0...@-xun/symbiote@1.13.0
[1119]: https://github.com/Xunnamius/symbiote/commit/05e56e787e73d42855fcd3ce10aff7f8f6e6c4c7
[1120]: https://github.com/Xunnamius/symbiote/commit/133634118118c7cff04eaaf7a65ead7c80329234
[1121]: https://github.com/Xunnamius/symbiote/commit/e4a1e0b3d6a20ae598f5a6feb2cf2b7ba077b6a7
[1122]: https://github.com/Xunnamius/symbiote/commit/c721fed5363109fddbf7c8e5e7dc98c33e023e38
[1123]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.11.0...@-xun/symbiote@1.12.0
[1124]: https://github.com/Xunnamius/symbiote/commit/b64412cd043877da93fa252bad0325bda73ea60c
[1125]: https://github.com/Xunnamius/symbiote/commit/feabe67a00aa2c970c3591110ec871f56626998f
[1126]: https://github.com/Xunnamius/symbiote/commit/534f3988d4d436fb8136bf60d56498c7b02941ea
[1127]: https://github.com/Xunnamius/symbiote/commit/8d4bb6d52de509c2ad8c5c82c8953d51e17c2d85
[1128]: https://github.com/Xunnamius/symbiote/commit/7364616ea349761591231a3547bd697ec67ed34b
[1129]: https://github.com/Xunnamius/symbiote/commit/2f11281f9d3c07b1a37440cbdbad51deeea7d503
[1130]: https://github.com/Xunnamius/symbiote/commit/9348ebba5102d85115a9e443c38032661a9fc0ed
[1131]: https://github.com/Xunnamius/symbiote/commit/626ee5aadb360db6d521683dff0f35269a736fc0
[1132]: https://github.com/Xunnamius/symbiote/commit/65e433056c8e6800d00202fe709d868d7c4713fb
[1133]: https://github.com/Xunnamius/symbiote/commit/ee5cf1030a76a5f0b2793d58a9db52d1ebc8a791
[1134]: https://github.com/Xunnamius/symbiote/commit/b9b106aff4ff729fb1f8e70efe295ba058a50cfb
[1135]: https://github.com/Xunnamius/symbiote/commit/c1a4b9cb21d1c3e6941d6fbd6108edc694c2d4ed
[1136]: https://github.com/Xunnamius/symbiote/commit/5b11c68aebc8099007ffcf50444707165939e061
[1137]: https://github.com/Xunnamius/symbiote/commit/99c7b3396ff73868208060410f7430538f6d48d6
[1138]: https://github.com/Xunnamius/symbiote/commit/ddd9192c05110fca3ae0d93bac276426932269ef
[1139]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.10.1...@-xun/symbiote@1.11.0
[1140]: https://github.com/Xunnamius/symbiote/commit/618ce1a1ae9132dbb54dc52c60c96aea17897b82
[1141]: https://github.com/Xunnamius/symbiote/commit/d74f099ac798fd0c925ea4aad0b1860b8a8a741f
[1142]: https://github.com/Xunnamius/symbiote/commit/0f4dd160eb1181306899031186b4a3c7e64d936c
[1143]: https://github.com/Xunnamius/symbiote/commit/2cd56d132e3cd7318744839cbf119b126cc35c98
[1144]: https://github.com/Xunnamius/symbiote/commit/9764967b4ca5aab46b32317ddb14bc4e843d8674
[1145]: https://github.com/Xunnamius/symbiote/commit/fd86f3f321889f759eda02880982117b5a0aba16
[1146]: https://github.com/Xunnamius/symbiote/commit/e295a0270f8ae743771d79966cccb3fdb14f19fd
[1147]: https://github.com/Xunnamius/symbiote/commit/d290ba57054479eb873d3cdc785db602432fca09
[1148]: https://github.com/Xunnamius/symbiote/commit/4ea8aa453186568651849102a2ade4df2f6c5cee
[1149]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.10.0...@-xun/symbiote@1.10.1
[1150]: https://github.com/Xunnamius/symbiote/commit/483f03697f1cf01847759fa5c1cf61f5af578a3f
[1151]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.9.0...@-xun/symbiote@1.10.0
[1152]: https://github.com/Xunnamius/symbiote/commit/813b7580971553cde14b4f278f31af7353384e85
[1153]: https://github.com/Xunnamius/symbiote/commit/42af69ecc8f70e6c55eceeda802bce1752f81bfb
[1154]: https://github.com/Xunnamius/symbiote/commit/ae46adf477f55440bb18e627ca1674d6d80be7fd
[1155]: https://github.com/Xunnamius/symbiote/commit/6575d493c2c0ff291a3bd7bf4b595198c46c0c70
[1156]: https://github.com/Xunnamius/symbiote/commit/7d33dfe2ea50a0fbf45641ef997ce2b7d0265aca
[1157]: https://github.com/Xunnamius/symbiote/commit/d535b785c9d45c87b29a5fbe5698c6021067570b
[1158]: https://github.com/Xunnamius/symbiote/commit/1b65f4667e138907ac8a1b90f06937f5fa4eb1b9
[1159]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.8.0...@-xun/symbiote@1.9.0
[1160]: https://github.com/Xunnamius/symbiote/commit/f47742b0bca31b054ec83d5b01089715e9925e39
[1161]: https://github.com/Xunnamius/symbiote/commit/4f280dc3af5bf633259d80cc8733fae31c903e04
[1162]: https://github.com/Xunnamius/symbiote/commit/159d771c90a65e05194cde9b8aec2478be7b97ff
[1163]: https://github.com/Xunnamius/symbiote/commit/506bf2dc5317ec891efa5e8eb9ed91235794c9f7
[1164]: https://github.com/Xunnamius/symbiote/commit/f7e65c34cd7088fa866530b60de4db3d1f77453c
[1165]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.7.0...@-xun/symbiote@1.8.0
[1166]: https://github.com/Xunnamius/symbiote/commit/c7b7623d68bde02438cbd8cbc80302079356914d
[1167]: https://github.com/Xunnamius/symbiote/commit/847cc63e9965c6c970e63d351fe8388ef666a1b6
[1168]: https://github.com/Xunnamius/symbiote/commit/fd210c55c4aff0ad663381a67b8b591dffc2a49c
[1169]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.6.0...@-xun/symbiote@1.7.0
[1170]: https://github.com/Xunnamius/symbiote/commit/7824c25d1d5db8ab824960b502c41e54a1f9ee03
[1171]: https://github.com/Xunnamius/symbiote/commit/b4c296eb75a142ede16da32a997e9999dd8074f3
[1172]: https://github.com/Xunnamius/symbiote/commit/005e378059ba0b3181031ff938854f54898e0437
[1173]: https://github.com/Xunnamius/symbiote/commit/9e4ae592d211ae39bacdc3f665b3078e69c73062
[1174]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.5.0...@-xun/symbiote@1.6.0
[1175]: https://github.com/Xunnamius/symbiote/commit/62e673b1ab8679e586b1b4337fe20c537c408fff
[1176]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.4.1...@-xun/symbiote@1.5.0
[1177]: https://github.com/Xunnamius/symbiote/commit/f15a14d33b9ccaf514a7f6ed0417cb9f5a42c99d
[1178]: https://github.com/Xunnamius/symbiote/commit/c775d6e3564c8772dde082d6ef243a56da79c586
[1179]: https://github.com/Xunnamius/symbiote/commit/8181e74d4a9020b45fa0182f3f7136b48e4a6721
[1180]: https://github.com/Xunnamius/symbiote/commit/17d53c3b83fc6ed799b5b2ab1da5feefe4e37018
[1181]: https://github.com/Xunnamius/symbiote/commit/537df70bd21a7b18b1ccc64e83ff6db63440a322
[1182]: https://github.com/Xunnamius/symbiote/commit/fd903a41ad88342ebd1896ffe3e46a6b81583711
[1183]: https://github.com/Xunnamius/symbiote/commit/4eabfb57d1addf0a2e8994c11b59bc122138b8ce
[1184]: https://github.com/Xunnamius/symbiote/commit/8e11d6670bec0c605d781ecec695de4d6af1edd2
[1185]: https://github.com/Xunnamius/symbiote/commit/2f5e8e9fc2a1983f0b259c70f7be957f80c8c3c1
[1186]: https://github.com/Xunnamius/symbiote/commit/b57a6be3f30c8c0a2692b256135acbd661d0e92b
[1187]: https://github.com/Xunnamius/symbiote/commit/8d03799cbd574e0eed0667f1d91827116da6ff15
[1188]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.4.0...@-xun/symbiote@1.4.1
[1189]: https://github.com/Xunnamius/symbiote/commit/4b94a07feff53f35ff23d5c0456edd00b2e9f180
[1190]: https://github.com/Xunnamius/symbiote/commit/a8ddaa595b00d4730cdce60f5340175b3e9afbcc
[1191]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.3.0...@-xun/symbiote@1.4.0
[1192]: https://github.com/Xunnamius/symbiote/commit/4eeba0093c58c5ae075542203854b4a3add2907a
[1193]: https://github.com/Xunnamius/symbiote/commit/99d57864cb024e23115bc3b9c4b1529d2f3d9bf5
[1194]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.2.0...@-xun/symbiote@1.3.0
[1195]: https://github.com/Xunnamius/symbiote/commit/cf660452df6ac9781bd9b61d4cc225e926cd4e15
[1196]: https://github.com/Xunnamius/symbiote/commit/b26a175f616e9c1fa333a0b8858507439449a32e
[1197]: https://github.com/Xunnamius/symbiote/commit/b999593e14846c8f87949286cd995e7ef92177a1
[1198]: https://github.com/Xunnamius/symbiote/commit/380c055b2920c8b96b65dc89b97b6497f996c452
[1199]: https://github.com/Xunnamius/symbiote/commit/f0b3b8ce97a389c4656d37f4745eaedb7d684f42
[1200]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.1.0...@-xun/symbiote@1.2.0
[1201]: https://github.com/Xunnamius/symbiote/commit/6426d70a844a1c3242d719bd648b2a5caf61a12c
[1202]: https://github.com/Xunnamius/symbiote/compare/@-xun/symbiote@1.0.0...@-xun/symbiote@1.1.0
[1203]: https://github.com/Xunnamius/symbiote/commit/ac5a9ba2ac77873619069cecc5a364cd09a74d43
[1204]: https://github.com/Xunnamius/symbiote/compare/589fcb01d65182c25a9604c55909b2667bd1b1e0...@-xun/symbiote@1.0.0
[1205]: https://github.com/Xunnamius/symbiote/commit/89d81a3e405096de202bc1f6be61ab5d58fc3e1e
[1206]: https://github.com/Xunnamius/symbiote/commit/589fcb01d65182c25a9604c55909b2667bd1b1e0
