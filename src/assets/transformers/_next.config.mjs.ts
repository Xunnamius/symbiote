import {
  deriveAliasesForNextJs,
  generateRawAliasMap,
  nextjsConfigPackageBase
} from '@-xun/project';

import { WebpackCustomSchemeAliasPlugin } from 'universe:assets/transformers/_webpack.config.mjs.ts';

import {
  AssetPreset,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

import {
  globalDebuggerNamespace,
  makeGeneratedAliasesWarningComment
} from 'universe:constant.ts';

import { stringifyJson } from 'universe:util.ts';

import type { AbsolutePath } from '@-xun/fs';
import type { AnyFunction } from '@-xun/types';

export function moduleExport({
  derivedAliases,
  configureWebpack,
  projectRoot
}: {
  derivedAliases: ReturnType<typeof deriveAliasesForNextJs>;
  configureWebpack?: AnyFunction;
  projectRoot: AbsolutePath;
}): Record<string, unknown> {
  return {
    // * https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
    allowedDevOrigins: [
      '*.romulus',
      '*.ergodark.romulus',
      '*.api.hscc.bdpa.romulus',
      '*.xunn.romulus'
    ],

    // ? Default is explicitly provided for the benefit of tooling
    distDir: '.next',

    webpack(currentConfig, context) {
      currentConfig.resolve.alias = {
        ...currentConfig.resolve.alias,
        ...derivedAliases
      };

      currentConfig.plugins = [
        ...currentConfig.plugins,
        new WebpackCustomSchemeAliasPlugin(projectRoot, derivedAliases)
      ];

      if (configureWebpack) {
        currentConfig = configureWebpack(currentConfig, context);
      }

      return currentConfig;
    },

    // ? Select some environment variables defined in .env to push to the
    // ? client.
    // !! DO NOT PUT ANY SECRET ENVIRONMENT VARIABLES HERE !!
    env: {
      RESULTS_PER_PAGE: process.env.RESULTS_PER_PAGE,
      IGNORE_RATE_LIMITS: process.env.IGNORE_RATE_LIMITS,
      LOCKOUT_ALL_CLIENTS: process.env.LOCKOUT_ALL_CLIENTS,
      DISALLOWED_METHODS: process.env.DISALLOWED_METHODS,
      MAX_CONTENT_LENGTH_BYTES: process.env.MAX_CONTENT_LENGTH_BYTES
    },

    eslint: {
      // ! This prevents production builds from failing in the presence of
      // ! ESLint errors; linting is handled during CL/CI rather than at deploy
      // ! time.
      ignoreDuringBuilds: true
    },

    typescript: {
      // ! This prevents production builds from failing in the presence of
      // ! TypeScript errors, e.g. when modules from dev deps cannot be found;
      // ! linting is handled during CL/CI rather than at deploy time.
      ignoreBuildErrors: true
    },

    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: '/api/:path*'
        }
      ];
    }
  } satisfies import('next').NextConfig;
}

export const { transformer } = makeTransformer(function (context) {
  const { assetPreset } = context;

  if (assetPreset && assetPreset !== AssetPreset.Nextjs) {
    return [];
  }

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    const {
      asset,
      shouldDeriveAliases,
      additionalRawAliasMappings,
      projectMetadata,
      toProjectAbsolutePath
    } = context;

    const derivedAliasesSourceSnippet = shouldDeriveAliases
      ? `return ${stringifyJson(
          deriveAliasesForNextJs(
            additionalRawAliasMappings.concat(generateRawAliasMap(projectMetadata)),
            projectMetadata.rootPackage.root
          ),
          4
        ).replace(/^}/m, '  }')}`
      : 'return {}';

    return [
      {
        path: toProjectAbsolutePath(nextjsConfigPackageBase),
        generate: () => /*js*/ `
// @ts-check
'use strict';

import { deepMergeConfig } from '@-xun/symbiote/assets';
import { moduleExport } from '@-xun/symbiote/assets/${asset}';
import { createDebugLogger } from 'rejoinder';

const debug = createDebugLogger({ namespace: '${globalDebuggerNamespace}:config:next' });

/**
 * @type {import('next').NextConfig}
 */
const baseConfig = moduleExport({
  derivedAliases: getNextJsAliases(),
  projectRoot: __dirname,
  configureWebpack(currentConfig) {
    return currentConfig;
  }
});

const config = deepMergeConfig(baseConfig, {
  // Any custom configs here will be deep merged with moduleExport's result
  // ! Take care not to overwrite certain configs (e.g. baseConfig.webpack)
});

export default config;

debug('exported config: %O', config);

// TODO: need to replace long path components with import.meta.dirname
// TODO: also need to append $ to single paths (in alias/unit-alias)
function getNextJsAliases() {
${makeGeneratedAliasesWarningComment(2)}
  ${derivedAliasesSourceSnippet}
}
`
      }
    ];
  });
});
