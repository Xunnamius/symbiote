import { allContributorsConfigProjectBase, isAccessible } from '@-xun/project';

import {
  generateRootOnlyAssets,
  libAssetPresets,
  makeTransformer
} from 'universe:assets.ts';

import { stringifyJson } from 'universe:util.ts';

// {@symbiote/notExtraneous all-contributors-cli}

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath, assetPreset, repoName } = context;
  const path = toProjectAbsolutePath(allContributorsConfigProjectBase);

  // * Do not generate any files when using the "wrong" preset
  if (!libAssetPresets.includes(assetPreset)) {
    return [];
  }

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    // TODO: need to do something about projectName being potentially outdated
    // ? Only create this file if it doesn't already exist
    if (!(await isAccessible(path, { useCached: true }))) {
      return [
        {
          path,
          generate: () =>
            stringifyJson({
              projectName: repoName,
              projectOwner: 'Xunnamius',
              repoType: 'github',
              repoHost: 'https://github.com',
              files: ['README.md'],
              imageSize: 100,
              commit: false,
              commitConvention: 'angular',
              contributors: [
                {
                  login: 'Xunnamius',
                  name: 'Bernard',
                  avatar_url: 'https://avatars.githubusercontent.com/u/656017?v=4',
                  profile: 'https://xunn.io/',
                  contributions: [
                    'infra',
                    'code',
                    'doc',
                    'maintenance',
                    'test',
                    'review'
                  ]
                }
              ],
              contributorsPerLine: 7,
              linkToUsage: true
            })
        }
      ];
    }
  });
});
