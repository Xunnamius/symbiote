/* eslint-disable unicorn/filename-case */
import { type RelativePath } from '@-xun/fs';

import { markdownContributingProjectBase } from '@-xun/project';

import {
  compileTemplate,
  generateRootOnlyAssets,
  libAssetPresets,
  makeTransformer
} from 'universe:assets.ts';

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath, assetPreset } = context;

  // * Do not generate any files when using the "wrong" preset
  if (!libAssetPresets.includes(assetPreset)) {
    return [];
  }

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(markdownContributingProjectBase),
        generate: () =>
          compileTemplate(markdownContributingProjectBase as RelativePath, context)
      }
    ];
  });
});
