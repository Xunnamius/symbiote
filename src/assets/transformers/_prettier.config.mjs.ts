import { prettierConfigProjectBase } from 'multiverse+project-utils:fs.ts';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';
import { globalDebuggerNamespace } from 'universe:constant.ts';

import type { Config as PrettierConfig } from 'prettier';

export type { PrettierConfig };

export function moduleExport() {
  return {
    endOfLine: 'lf',
    printWidth: 80,
    proseWrap: 'always',
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'none',
    overrides: [
      {
        files: '**/*.?(@(c|m))@(ts|js)?(x)',
        options: {
          parser: 'babel-ts',
          printWidth: 89
        }
      }
    ]
  } as const satisfies PrettierConfig;
}

export const { transformer } = makeTransformer(function (context) {
  const { asset, toProjectAbsolutePath } = context;

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(prettierConfigProjectBase),
        generate: () => /*js*/ `
// @ts-check
'use strict';

import { deepMergeConfig } from '@-xun/symbiote/assets';
import { moduleExport } from '@-xun/symbiote/assets/${asset}';
import { createDebugLogger } from 'rejoinder';

const debug = createDebugLogger({ namespace: '${globalDebuggerNamespace}:config:prettier' });

const config = deepMergeConfig(moduleExport(), {
  // Any custom configs here will be deep merged with moduleExport's result
});

export default config;

debug('exported config: %O', config);
`
      }
    ];
  });
});
