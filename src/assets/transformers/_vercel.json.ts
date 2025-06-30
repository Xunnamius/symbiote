import { vercelConfigProjectBase } from '@-xun/project';

import {
  AssetPreset,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

import { stringifyJson } from 'universe:util.ts';

export const config = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  trailingSlash: false
};

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath, assetPreset } = context;

  if (assetPreset && assetPreset !== AssetPreset.Nextjs) {
    return [];
  }

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(vercelConfigProjectBase),
        generate: () => stringifyJson(config)
      }
    ];
  });
});
