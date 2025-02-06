import { lintStagedConfigProjectBase } from '@-xun/project';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';
import { globalDebuggerNamespace } from 'universe:constant.ts';

// {@symbiote/notExtraneous lint-staged}

export function moduleExport() {
  return {
    '*': 'npx @-xun/symbiote format --files'
  } as const;
}

/**
 * The scripts returned by this function are the constituent parts of the `npm
 * run format` symbiote command.
 */
export const { transformer } = makeTransformer(function (context) {
  const { asset, toProjectAbsolutePath } = context;

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(lintStagedConfigProjectBase),
        generate: () => /*js*/ `
// @ts-check
'use strict';

import { deepMergeConfig } from '@-xun/symbiote/assets';
import { moduleExport } from '@-xun/symbiote/assets/${asset}';
import { createDebugLogger } from 'rejoinder';

const debug = createDebugLogger({ namespace: '${globalDebuggerNamespace}:config:lint-staged' });

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
