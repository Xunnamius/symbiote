/* eslint-disable unicorn/filename-case */
import {
  markdownArchitectureProjectBase,
  type RelativePath
} from 'multiverse+project-utils:fs.ts';

import {
  compileTemplate,
  generateRootOnlyAssets,
  libAssetPresets,
  makeTransformer
} from 'universe:assets.ts';

import { replaceRegionsRespectively } from 'universe:util.ts';

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath, assetPreset } = context;

  // * Do not generate any files when using the "wrong" preset
  if (!libAssetPresets.includes(assetPreset)) {
    return [];
  }

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    const path = toProjectAbsolutePath(markdownArchitectureProjectBase);

    return [
      {
        path,
        generate: async () => {
          return replaceRegionsRespectively({
            outputPath: path,
            templateContent: await compileTemplate(
              markdownArchitectureProjectBase as RelativePath,
              context
            ),
            context
          });
        }
      }
    ];
  });
});
