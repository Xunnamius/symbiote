import { cpus } from 'node:os';

import {
  deriveAliasesForJest,
  generateRawAliasMap,
  jestConfigProjectBase
} from '@-xun/project';

import { ProjectError } from '@-xun/project/error';
import { createDebugLogger } from 'rejoinder';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';

import {
  globalDebuggerNamespace,
  makeGeneratedAliasesWarningComment
} from 'universe:constant.ts';

import { ErrorMessage } from 'universe:error.ts';
import { stringifyJson } from 'universe:util.ts';

import type { Config as JestConfig } from 'jest';

const debug = createDebugLogger({
  namespace: `${globalDebuggerNamespace}:asset:jest`
});

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
} = {}) {
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
      '/.transpiled/',
      String.raw`/([^/\\]*\.ignore(\.[^/\\]+)?(/|$))|/(ignore\.[^/\\]+(/|$))`,
      String.raw`/type-.*\.test\.(c|m)?tsx?`
    ],
    setupFilesAfterEnv: ['./test/setup.ts'],
    // ? This is computed dynamically by symbiote
    //collectCoverageFrom: [],
    // ? Tell Jest to transpile node_modules (for ESM interop)
    //transformIgnorePatterns: [],
    // ? Make sure jest-haste-map doesn't try to parse and cache fixtures (which
    // ? also means snapshot files from these dirs are ignored as well)
    modulePathIgnorePatterns: [
      '/test/fixtures/',
      '/.transpiled/',
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
      ).replace(/^}/m, '  }')}`
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
