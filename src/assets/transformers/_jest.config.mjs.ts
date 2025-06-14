import { readFileSync, writeFileSync } from 'node:fs';
import { cpus } from 'node:os';
import { isRegExp } from 'node:util/types';

import { getInitialWorkingDirectory, toPath } from '@-xun/fs';

import {
  deriveAliasesForJest,
  generateRawAliasMap,
  jestConfigProjectBase
} from '@-xun/project';

import { ProjectError } from '@-xun/project/error';
import escapeStringRegexp from 'escape-string-regexp~4';
import { createDebugLogger } from 'rejoinder';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';

import {
  globalDebuggerNamespace,
  makeGeneratedAliasesWarningComment,
  tstycheTargetRegExp
} from 'universe:constant.ts';

import { ErrorMessage } from 'universe:error.ts';
import { stringifyJson } from 'universe:util.ts';

import type { Config as JestConfig } from 'jest';

const debug = createDebugLogger({
  namespace: `${globalDebuggerNamespace}:asset:jest`
});

const monkeyPatchDebug = debug.extend('jest-patched');
const monkeyPatchFootholdTarget =
  'function shouldLoadAsEsm(path, extensionsToTreatAsEsm) {';
const monkeyPatchFootholdStart = '/*beginning of symbiote patch*/';
const monkeyPatchFootholdEnd = '/*end of symbiote patch*/';

export type { JestConfig };

/**
 * {@symbiote/notExtraneous
 *   - babel-jest
 *   - @types/jest
 *   - jest-circus
 *   - jest-extended
 *   - jest-silent-reporter
 * }
 */

// {@symbiote/notInvalid @sinclair/typebox}

/**
 * An array of NODE_ENV values recognized by this configuration file.
 */
export const wellKnownNodeEnvValues = ['test'] as const;

/**
 * Return a partial configuration that must be initialized further.
 */
export function baseConfig({
  isDebugging = false
}: {
  /**
   * @default false
   */
  isDebugging?: boolean;
}) {
  const isTestingIntermediates = !!process.env.SYMBIOTE_TEST_JEST_TRANSPILED;
  debug('isTestingIntermediates: %O', isTestingIntermediates);

  return {
    restoreMocks: true,
    resetMocks: true,
    clearMocks: true,
    testEnvironment: 'node',
    testRunner: 'jest-circus/runner',
    testTimeout:
      1000 *
      60 *
      (isDebugging
        ? // ? 24h if debugging so MMS and other tools don't choke, otherwise 1m
          60 * 24
        : process.platform === 'win32'
          ? // ? Things tend to be slower and more fragile on Windows...
            5
          : 1),
    // ? Minimum 2 concurrent tests executed at once; maximum of cpu cores - 1
    maxConcurrency: Math.max(cpus().length - 1, 2),
    verbose: false,
    // ? This key is sometimes overridden on the CLI level by symbiote, but it
    // ? is okay so long as any customizations are defined in the appropriate
    // ? jest configuration file
    testPathIgnorePatterns: [
      '/node_modules/',
      '/dist/',
      '/src/',
      ...(isTestingIntermediates ? [] : ['/.transpiled/']),
      '/test/fixtures/',
      '<rootDir>/dummies/',
      String.raw`/([^/\\]*\.ignore(\.[^/\\]+)?(/|$))|/(ignore\.[^/\\]+(/|$))`,
      tstycheTargetRegExp.source
    ],
    setupFilesAfterEnv: [`<rootDir>/test/setup.${isTestingIntermediates ? 'js' : 'ts'}`],
    // ? This is computed dynamically by symbiote
    //collectCoverageFrom: [],
    // ? Tell Jest to transpile node_modules (for ESM interop)
    //transformIgnorePatterns: [],
    // ? Make sure jest-haste-map doesn't try to parse and cache fixtures (which
    // ? also means snapshot files from these dirs are ignored as well)
    modulePathIgnorePatterns: [
      '/test/fixtures/',
      ...(isTestingIntermediates ? [] : ['/.transpiled/']),
      String.raw`/([^/\\]*\.ignore(\.[^/\\]+)?(/|$))|/(ignore\.[^/\\]+(/|$))`
    ]
  } as const satisfies JestConfig;
}

/**
 * @see {@link assertEnvironment}
 */
export function moduleExport({
  derivedAliases: moduleNameMapper,
  isDebugging,
  skipSlowTestsLevel
}: {
  derivedAliases: ReturnType<typeof deriveAliasesForJest>;
  isDebugging: boolean;
  /**
   * Skip slow tests depending on the level given. `0` disables test skipping.
   * `1` implements the skip by augmenting jest globals. `2` has the same effect
   * as `1` while entirely skipping tests from files with names containing
   * `-slow.`.
   */
  skipSlowTestsLevel: number;
}): JestConfig {
  debug('moduleNameMapper: %O', moduleNameMapper);
  debug('isDebugging: %O', isDebugging);

  const config = { ...baseConfig({ isDebugging }), moduleNameMapper };

  if (skipSlowTestsLevel >= 2) {
    config.testPathIgnorePatterns.push(String.raw`-slow\.`);
  }

  return config;
}

export const { transformer } = makeTransformer(function (context) {
  const {
    asset,
    shouldDeriveAliases,
    additionalRawAliasMappings,
    projectMetadata,
    toProjectAbsolutePath
  } = context;

  const derivedAliasesSourceSnippet = shouldDeriveAliases
    ? `return ${stringifyJson(
        deriveAliasesForJest(
          additionalRawAliasMappings.concat(generateRawAliasMap(projectMetadata))
        ),
        4
      ).replace(/^}/m, '  }')}`.replaceAll(
        /^(\s*"[^"]*": )"([^"\n]*)\.ts"(,?)$/gm,
        '$1`$2.${extension}`$3'
      )
    : 'return {}';

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, function () {
    return [
      {
        path: toProjectAbsolutePath(jestConfigProjectBase),
        generate: () => /*js*/ `
// @ts-check
'use strict';

import { deepMergeConfig } from '@-xun/symbiote/assets';
import { assertEnvironment, moduleExport } from '@-xun/symbiote/assets/${asset}';
import { createDebugLogger } from 'rejoinder';

const debug = createDebugLogger({ namespace: '${globalDebuggerNamespace}:config:jest' });

const config = deepMergeConfig(
  moduleExport({ derivedAliases: getJestAliases(), ...assertEnvironment() }),
  {
    // Any custom configs here will be deep merged with moduleExport's result
  }
);

export default config;

debug('exported config: %O', config);

function getJestAliases() {
  const extension = process.env.SYMBIOTE_TEST_JEST_TRANSPILED ? 'js' : 'ts';

${makeGeneratedAliasesWarningComment(2)}
  ${derivedAliasesSourceSnippet}
}
`
      }
    ];
  });
});

/**
 * @see {@link moduleExport}
 */
export function assertEnvironment(): Omit<
  Parameters<typeof moduleExport>[0],
  'derivedAliases'
> {
  const mode = (process.env.NODE_ENV ||
    '(undefined)') as (typeof wellKnownNodeEnvValues)[number];

  if (!wellKnownNodeEnvValues.includes(mode)) {
    throw new ProjectError(
      ErrorMessage.ConfigAssetEnvironmentValidationFailed(
        'jest',
        mode,
        wellKnownNodeEnvValues
      )
    );
  }

  const isDebugging = !!process.env.VSCODE_INSPECTOR_OPTIONS;
  const skipSlowTestsLevel = Number(process.env.SYMBIOTE_TEST_JEST_SKIP_SLOW_TESTS) || 0;

  return { isDebugging, skipSlowTestsLevel };
}

// TODO: this function needs to be fixed for jest@30
/**
 * This function prepends a single regular expression _pattern string_ to
 * {@link JestConfig.transformIgnorePatterns} in `config`. This will result in
 * any packages _within `node_modules`_ with names matching `packageNames` being
 * transpiled into CJS on the fly while preserving jest's default behavior (i.e.
 * no transpilation) in every other case.
 *
 * This is useful when, for instance, an ESM package needs to be mocked via a
 * top-level import.
 *
 * This function engages in some heavy (but safe and
 * corruption-resistant/recoverable) monkey patching of jest internals to
 * prevent jest from complaining with `Must use import to load ES Module...`
 * when attempting to load the provided ESM packages while
 * `--experimental-vm-modules` is enabled in the runtime. Therefore, this
 * function should be invoked as few times as possible, only in
 * `jest.config.mjs`, and only after all other changes to `config` have been
 * made.
 *
 * Note that package names will have any special characters (in the context of
 * regular expressions) escaped. If you wish to supply a regular expression as a
 * package name, pass a {@link RegExp} instance to `packageNames`. However, be
 * aware that (1) only the {@link RegExp.source} of custom regular expressions
 * is used (wrapped in parentheses) and (2) the syntax of any custom regular
 * expressions must not clash with the expression that encloses them or the
 * behavior of this function becomes undefined.
 *
 * Also note that, if yarn pnp support is desired (which is enabled by default
 * in jest but disabled when using this function), you must ensure the following
 * is present in `config` before invoking this function:
 *
 * ```typescript
 * transformIgnorePatterns: [String.raw`\.pnp\.[^\/]+$`]
 * ```
 *
 * @see https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
 */
export function transformSelectEsmPackagesToCjs(
  config: JestConfig,
  packageNames: string[]
): void {
  const transformIgnorePatterns = [
    `/node_modules/(?!(${packageNames
      .map((nameOrRegExp) =>
        isRegExp(nameOrRegExp) ? nameOrRegExp.source : escapeStringRegexp(nameOrRegExp)
      )
      .join('|')})/)`,
    ...(config.transformIgnorePatterns || [])
  ];

  config.transformIgnorePatterns = transformIgnorePatterns;

  const moduleJestResolvePath = toPath(
    getInitialWorkingDirectory(),
    'node_modules',
    'jest-resolve',
    'build',
    'shouldLoadAsEsm.js'
  );

  const monkeyPatchNewPatch =
    monkeyPatchFootholdStart +
    /* ts */ `const $symbioteRegExps=${JSON.stringify(transformIgnorePatterns)}.map(pattern => new RegExp(pattern));` +
    monkeyPatchFootholdTarget +
    /* ts */ `if (path.includes('/node_modules/') && $symbioteRegExps.every(pattern => !pattern.test(path))) {return false};` +
    monkeyPatchFootholdEnd;

  const monkeyPatchRegExp = new RegExp(
    escapeStringRegexp(monkeyPatchFootholdStart) +
      '.*' +
      escapeStringRegexp(monkeyPatchFootholdEnd)
  );

  monkeyPatchDebug('transformIgnorePatterns: %O', transformIgnorePatterns);
  monkeyPatchDebug('moduleJestResolvePath: %O', moduleJestResolvePath);
  monkeyPatchDebug('monkeyPatchFootholdTarget: %O', monkeyPatchFootholdTarget);
  monkeyPatchDebug('monkeyPatchFootholdStart: %O', monkeyPatchFootholdStart);
  monkeyPatchDebug('monkeyPatchFootholdEnd: %O', monkeyPatchFootholdEnd);
  monkeyPatchDebug('monkeyPatchNewPatch: %O', monkeyPatchNewPatch);
  monkeyPatchDebug('monkeyPatchRegExp: %O', monkeyPatchRegExp);

  try {
    const resolverFileContents = readFileSync(moduleJestResolvePath, 'utf8');

    if (!resolverFileContents.includes(monkeyPatchFootholdTarget)) {
      throw new Error(
        'monkeyPatchFootholdTarget is missing (incompatible jest version?)'
      );
    }

    const existingPatchMatch = resolverFileContents.match(monkeyPatchRegExp);
    const [existingPatch] = existingPatchMatch || [];

    if (existingPatch) {
      monkeyPatchDebug('existing monkey patch detected');

      if (existingPatch === monkeyPatchNewPatch) {
        monkeyPatchDebug('skipped patching jest resolver: already patched');
      } else {
        writeFileSync(
          moduleJestResolvePath,
          resolverFileContents.replace(existingPatch, monkeyPatchNewPatch)
        );

        monkeyPatchDebug.message('monkey patched jest resolver');
      }
    } else {
      monkeyPatchDebug('no existing monkey patch detected');

      writeFileSync(
        moduleJestResolvePath,
        resolverFileContents.replace(monkeyPatchFootholdTarget, monkeyPatchNewPatch)
      );

      monkeyPatchDebug.message('monkey patched jest resolver');
    }
  } catch (error) {
    throw new Error(ErrorMessage.JestChangelogMonkeyPatchFailedToTake(error));
  }
}
