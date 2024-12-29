import {
  directoryHuskyProjectBase,
  toRelativePath
} from 'multiverse+project-utils:fs.ts';

import {
  compileTemplates,
  definedNonBasicAssetPresets,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath, assetPreset } = context;

  // * Do not generate any files when using the "wrong" preset
  if (definedNonBasicAssetPresets.includes(assetPreset)) {
    return [];
  }

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return compileTemplates(
      {
        [toProjectAbsolutePath(directoryHuskyProjectBase, 'commit-msg')]:
          toRelativePath('husky/commit-msg'),
        [toProjectAbsolutePath(directoryHuskyProjectBase, 'pre-commit')]:
          toRelativePath('husky/pre-commit'),
        [toProjectAbsolutePath(directoryHuskyProjectBase, 'pre-push')]:
          toRelativePath('husky/pre-push')
      },
      context
    );
  });
});
