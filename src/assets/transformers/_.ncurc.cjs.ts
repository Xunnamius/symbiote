import { ncuConfigProjectBase } from 'multiverse+project-utils:fs.ts';

import {
  definedNonBasicAssetPresets,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

import { globalDebuggerNamespace } from 'universe:constant.ts';

// {@symbiote/notExtraneous npm-check-updates}

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath, assetPreset } = context;

  // * Do not generate any files when using the "wrong" preset
  if (definedNonBasicAssetPresets.includes(assetPreset)) {
    return [];
  }

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(ncuConfigProjectBase),
        generate: () => /*js*/ `
// @ts-check
'use strict';

// TODO: publish latest rejoinder package first, then update configs to use it
//const { createDebugLogger } = require('rejoinder');

/*const debug = createDebugLogger({ namespace: '${globalDebuggerNamespace}:config:ncurc' });*/

// * https://www.npmjs.com/package/npm-check-updates#configuration-files
module.exports = {
  install: 'never',
  reject: [
    // ? Reject any super-pinned dependencies (e.g. find-up~5 and execa~7)
    '*~*'
  ]
};

/*debug('exported config: %O', module.exports);*/
`
      }
    ];
  });
});
