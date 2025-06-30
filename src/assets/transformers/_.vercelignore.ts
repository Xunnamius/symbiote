import { vercelignoreConfigProjectBase } from '@-xun/project';

import {
  AssetPreset,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath, assetPreset } = context;

  if (assetPreset && assetPreset !== AssetPreset.Nextjs) {
    return [];
  }

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(vercelignoreConfigProjectBase),
        generate: () => /* md */ `
# shellcheck disable=all
# This file's syntax is only KINDA similar like .gitignore...

# Ignore all root-level files
/*

# Re-add root-level dirs
!/data
!/public
!/src
!/types

# Re-add root-level files
!/.gitignore
!/babel.config.js
!/next.config.mjs
!/package-lock.json
!/package.json
!/tsconfig.json

# Custom adds
`
      }
    ];
  });
});
