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

# Ignore all files
/*

# Re-add root-level dirs
!/data
!/public
!/src
!/types

# Re-add unpublished internal packages
!/packages
/packages/*
!/packages/shared
/packages/shared/*
!/packages/shared/src
!/packages/shared/package.json

# Re-add root-level files
!/.gitignore
!/babel.config.cjs
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
