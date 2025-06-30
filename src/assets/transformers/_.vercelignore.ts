import { gitignoreConfigProjectBase } from '@-xun/project';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath } = context;

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(gitignoreConfigProjectBase),
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
