/* eslint-disable unicorn/filename-case */
import { markdownContributingProjectBase } from '@-xun/project';

import {
  compileTemplate,
  generateRootOnlyAssets,
  libAssetPresets,
  makeTransformer
} from 'universe:assets.ts';

import type { RelativePath } from '@-xun/fs';

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
