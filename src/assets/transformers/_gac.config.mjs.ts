import { gacConfigPackageBase } from 'multiverse+project-utils:fs.ts';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';
import { globalDebuggerNamespace } from 'universe:constant.ts';

// TODO: this function returns one of the types exported by gac package
export function moduleExport() {
  return {
    // TODO
  };
}

export const { transformer } = makeTransformer(function (context) {
  const { asset, toProjectAbsolutePath } = context;

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, function () {
    return [
      {
        path: toProjectAbsolutePath(gacConfigPackageBase),
        generate: () => /*js*/ `
// @ts-check
'use strict';

import { deepMergeConfig } from '@-xun/symbiote/assets';
import { moduleExport } from '@-xun/symbiote/assets/${asset}';
// TODO: publish latest rejoinder package first, then update configs to use it
//import { createDebugLogger } from 'rejoinder';

/*const debug = createDebugLogger({ namespace: '${globalDebuggerNamespace}:config:gac' });*/

const config = deepMergeConfig(moduleExport(), {
  // Any custom configs here will be deep merged with moduleExport's result
});

export default config;

/*debug('exported config: %O', config);*/
`
      }
    ];
  });
});
