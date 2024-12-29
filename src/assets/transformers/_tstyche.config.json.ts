import { tstycheConfigProjectBase } from 'multiverse+project-utils:fs.ts';

import {
  definedNonBasicAssetPresets,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

import { stringifyJson } from 'universe:util.ts';

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
        path: toProjectAbsolutePath(tstycheConfigProjectBase),
        generate: () =>
          stringifyJson({
            $schema: 'https://tstyche.org/schemas/config.json',
            testFileMatch: ['**/type-*.test.ts', '**/type-*.test.tsx']
          })
      }
    ];
  });
});
