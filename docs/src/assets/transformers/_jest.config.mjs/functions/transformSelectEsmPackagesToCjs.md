[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_jest.config.mjs](../README.md) / transformSelectEsmPackagesToCjs

# Function: transformSelectEsmPackagesToCjs()

> **transformSelectEsmPackagesToCjs**(`config`, `packageNames`): `void`

Defined in: [src/assets/transformers/\_jest.config.mjs.ts:278](https://github.com/Xunnamius/symbiote/blob/39b78f935df3d66a96654bd78c86b3952384b660/src/assets/transformers/_jest.config.mjs.ts#L278)

This function prepends a single regular expression _pattern string_ to
[JestConfig.transformIgnorePatterns](moduleExport.md#moduleexport) in `config`. This will result in
any packages _within `node_modules`_ with names matching `packageNames` being
transpiled into CJS on the fly while preserving jest's default behavior (i.e.
no transpilation) in every other case.

This is useful when, for instance, an ESM package needs to be mocked via a
top-level import.

This function engages in some heavy (but safe and
corruption-resistant/recoverable) monkey patching of jest internals to
prevent jest from complaining with `Must use import to load ES Module...`
when attempting to load the provided ESM packages while
`--experimental-vm-modules` is enabled in the runtime. Therefore, this
function should be invoked as few times as possible, only in
`jest.config.mjs`, and only after all other changes to `config` have been
made.

Note that package names will have any special characters (in the context of
regular expressions) escaped. If you wish to supply a regular expression as a
package name, pass a RegExp instance to `packageNames`. However, be
aware that (1) only the RegExp.source of custom regular expressions
is used (wrapped in parentheses) and (2) the syntax of any custom regular
expressions must not clash with the expression that encloses them or the
behavior of this function becomes undefined.

Also note that, if yarn pnp support is desired (which is enabled by default
in jest but disabled when using this function), you must ensure the following
is present in `config` before invoking this function:

```typescript
transformIgnorePatterns: [String.raw`\.pnp\.[^/]+$`]
```

## Parameters

### config

#### automock?

`boolean`

#### bail?

`number` \| `boolean`

#### cache?

`boolean`

#### cacheDirectory?

`string`

#### changedFilesWithAncestor?

`boolean`

#### changedSince?

`string`

#### ci?

`boolean`

#### clearMocks?

`boolean`

#### collectCoverage?

`boolean`

#### collectCoverageFrom?

`string`[]

#### coverageDirectory?

`string`

#### coveragePathIgnorePatterns?

`string`[]

#### coverageProvider?

`"babel"` \| `"v8"`

#### coverageReporters?

(`"json"` \| `"none"` \| `"clover"` \| `"cobertura"` \| `"html-spa"` \| `"html"` \| `"json-summary"` \| `"lcov"` \| `"lcovonly"` \| `"teamcity"` \| `"text"` \| `"text-lcov"` \| `"text-summary"` \| \[`"json"` \| `"none"` \| `"clover"` \| `"cobertura"` \| `"html-spa"` \| `"html"` \| `"json-summary"` \| `"lcov"` \| `"lcovonly"` \| `"teamcity"` \| `"text"` \| `"text-lcov"` \| `"text-summary"`, \{[`key`: `string`]: `unknown`; \}\])[]

#### coverageThreshold?

\{[`path`: `string`]: `object`; `global`: \{ `branches?`: `number`; `functions?`: `number`; `lines?`: `number`; `statements?`: `number`; \}; \}

#### coverageThreshold.global

\{ `branches?`: `number`; `functions?`: `number`; `lines?`: `number`; `statements?`: `number`; \}

#### coverageThreshold.global.branches?

`number`

#### coverageThreshold.global.functions?

`number`

#### coverageThreshold.global.lines?

`number`

#### coverageThreshold.global.statements?

`number`

#### dependencyExtractor?

`string`

#### detectLeaks?

`boolean`

#### detectOpenHandles?

`boolean`

#### displayName?

`string` \| \{ `color`: `"black"` \| `"red"` \| `"green"` \| `"yellow"` \| `"blue"` \| `"magenta"` \| `"cyan"` \| `"white"` \| `"gray"` \| `"grey"` \| `"blackBright"` \| `"redBright"` \| `"greenBright"` \| `"yellowBright"` \| `"blueBright"` \| `"magentaBright"` \| `"cyanBright"` \| `"whiteBright"`; `name`: `string`; \}

#### errorOnDeprecated?

`boolean`

#### expand?

`boolean`

#### extensionsToTreatAsEsm?

`string`[]

#### fakeTimers?

\{ enableGlobally?: boolean \| undefined; \} & (\{ advanceTimers?: number \| boolean \| undefined; doNotFake?: ("Date" \| "hrtime" \| "nextTick" \| "performance" \| "queueMicrotask" \| "requestAnimationFrame" \| "cancelAnimationFrame" \| "requestIdleCallback" \| "cancelIdleCallback" \| "setImmediate" \| "clearImmediate" \| "setInterval" \| "clearInterval" \| "setTimeout" \| "clearTimeout")\[\] \| undefined; now?: number \| undefined; timerLimit?: number \| undefined; legacyFakeTimers?: false \| undefined; \} \| \{ legacyFakeTimers?: true \| undefined; \})

#### filter?

`string`

#### findRelatedTests?

`boolean`

#### forceCoverageMatch?

`string`[]

#### forceExit?

`boolean`

#### globals?

\{[`key`: `string`]: `unknown`; \}

#### globalSetup?

`null` \| `string`

#### globalTeardown?

`null` \| `string`

#### haste?

\{ `computeSha1?`: `boolean`; `defaultPlatform?`: `null` \| `string`; `enableSymlinks?`: `boolean`; `forceNodeFilesystemAPI?`: `boolean`; `hasteImplModulePath?`: `string`; `hasteMapModulePath?`: `string`; `platforms?`: `string`[]; `retainAllFiles?`: `boolean`; `throwOnModuleCollision?`: `boolean`; \}

#### haste.computeSha1?

`boolean`

#### haste.defaultPlatform?

`null` \| `string`

#### haste.enableSymlinks?

`boolean`

#### haste.forceNodeFilesystemAPI?

`boolean`

#### haste.hasteImplModulePath?

`string`

#### haste.hasteMapModulePath?

`string`

#### haste.platforms?

`string`[]

#### haste.retainAllFiles?

`boolean`

#### haste.throwOnModuleCollision?

`boolean`

#### id?

`string`

#### injectGlobals?

`boolean`

#### json?

`boolean`

#### lastCommit?

`boolean`

#### listTests?

`boolean`

#### logHeapUsage?

`boolean`

#### maxConcurrency?

`number`

#### maxWorkers?

`string` \| `number`

#### moduleDirectories?

`string`[]

#### moduleFileExtensions?

`string`[]

#### moduleNameMapper?

\{[`key`: `string`]: `string` \| `string`[]; \}

#### modulePathIgnorePatterns?

`string`[]

#### modulePaths?

`string`[]

#### noStackTrace?

`boolean`

#### notify?

`boolean`

#### notifyMode?

`string`

#### onlyChanged?

`boolean`

#### onlyFailures?

`boolean`

#### openHandlesTimeout?

`number`

#### outputFile?

`string`

#### passWithNoTests?

`boolean`

#### preset?

`null` \| `string`

#### prettierPath?

`null` \| `string`

#### projects?

(`string` \| \{[`key`: `string`]: `unknown`; \})[]

#### randomize?

`boolean`

#### replname?

`null` \| `string`

#### reporters?

(`string` \| \[`string`, \{[`key`: `string`]: `unknown`; \}\])[]

#### resetMocks?

`boolean`

#### resetModules?

`boolean`

#### resolver?

`null` \| `string`

#### restoreMocks?

`boolean`

#### rootDir?

`string`

#### roots?

`string`[]

#### runner?

`string`

#### runTestsByPath?

`boolean`

#### runtime?

`string`

#### sandboxInjectedGlobals?

`string`[]

#### setupFiles?

`string`[]

#### setupFilesAfterEnv?

`string`[]

#### showSeed?

`boolean`

#### silent?

`boolean`

#### skipFilter?

`boolean`

#### skipNodeResolution?

`boolean`

#### slowTestThreshold?

`number`

#### snapshotFormat?

\{ `callToJSON?`: `boolean`; `compareKeys?`: `null`; `escapeRegex?`: `boolean`; `escapeString?`: `boolean`; `highlight?`: `boolean`; `indent?`: `number`; `maxDepth?`: `number`; `maxWidth?`: `number`; `min?`: `boolean`; `printBasicPrototype?`: `boolean`; `printFunctionName?`: `boolean`; `theme?`: \{ `comment?`: `string`; `content?`: `string`; `prop?`: `string`; `tag?`: `string`; `value?`: `string`; \}; \}

#### snapshotFormat.callToJSON?

`boolean`

#### snapshotFormat.compareKeys?

`null`

#### snapshotFormat.escapeRegex?

`boolean`

#### snapshotFormat.escapeString?

`boolean`

#### snapshotFormat.highlight?

`boolean`

#### snapshotFormat.indent?

`number`

#### snapshotFormat.maxDepth?

`number`

#### snapshotFormat.maxWidth?

`number`

#### snapshotFormat.min?

`boolean`

#### snapshotFormat.printBasicPrototype?

`boolean`

#### snapshotFormat.printFunctionName?

`boolean`

#### snapshotFormat.theme?

\{ `comment?`: `string`; `content?`: `string`; `prop?`: `string`; `tag?`: `string`; `value?`: `string`; \}

#### snapshotFormat.theme.comment?

`string`

#### snapshotFormat.theme.content?

`string`

#### snapshotFormat.theme.prop?

`string`

#### snapshotFormat.theme.tag?

`string`

#### snapshotFormat.theme.value?

`string`

#### snapshotResolver?

`string`

#### snapshotSerializers?

`string`[]

#### testEnvironment?

`string`

#### testEnvironmentOptions?

\{[`key`: `string`]: `unknown`; \}

#### testFailureExitCode?

`number`

#### testLocationInResults?

`boolean`

#### testMatch?

`string`[]

#### testNamePattern?

`string`

#### testPathIgnorePatterns?

`string`[]

#### testRegex?

`string` \| `string`[]

#### testResultsProcessor?

`string`

#### testRunner?

`string`

#### testSequencer?

`string`

#### testTimeout?

`number`

#### transform?

\{[`key`: `string`]: `string` \| \[`string`, `unknown`\]; \}

#### transformIgnorePatterns?

`string`[]

#### unmockedModulePathPatterns?

`string`[]

#### updateSnapshot?

`boolean`

#### useStderr?

`boolean`

#### verbose?

`boolean`

#### waitForUnhandledRejections?

`boolean`

#### watch?

`boolean`

#### watchAll?

`boolean`

#### watchman?

`boolean`

#### watchPathIgnorePatterns?

`string`[]

#### watchPlugins?

(`string` \| \[`string`, `unknown`\])[]

#### workerIdleMemoryLimit?

`string` \| `number`

#### workerThreads?

`boolean`

### packageNames

`string`[]

## Returns

`void`

## See

https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
