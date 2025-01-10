import { tailwindConfigProjectBase } from 'multiverse+project-utils:fs.ts';

import {
  generateRootOnlyAssets,
  makeTransformer,
  reactAssetPresets
} from 'universe:assets.ts';

import { globalDebuggerNamespace } from 'universe:constant.ts';

export function moduleExport() {
  return {
    // TODO
  };
}

export const { transformer } = makeTransformer(function (context) {
  const { asset, toProjectAbsolutePath, assetPreset } = context;

  if (!reactAssetPresets.includes(assetPreset)) {
    return [];
  }

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(tailwindConfigProjectBase),
        generate: () => /*js*/ `
// @ts-check
'use strict';

import { deepMergeConfig } from '@-xun/symbiote/assets';
import { moduleExport } from '@-xun/symbiote/assets/${asset}';
import { createDebugLogger } from 'rejoinder';

const debug = createDebugLogger({ namespace: '${globalDebuggerNamespace}:config:tailwind' });

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
