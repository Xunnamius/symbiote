import { allContributorsConfigProjectBase, readJson } from '@-xun/project';

import {
  generateRootOnlyAssets,
  libAssetPresets,
  makeTransformer
} from 'universe:assets.ts';

import { stringifyJson } from 'universe:util.ts';

import type { JsonObject } from 'type-fest';

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
    return [
      {
        path,
        async generate() {
          return stringifyJson(
            Object.assign(
              {
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
                ]
              },
              // ? NEVER overwrite existing contributors
              await readJson<JsonObject>(path, { useCached: true }).catch(() => ({})),
              {
                projectName: repoName,
                projectOwner: 'Xunnamius',
                repoType: 'github',
                repoHost: 'https://github.com',
                files: ['README.md'],
                imageSize: 100,
                commit: false,
                commitConvention: 'angular',
                contributorsPerLine: 7,
                linkToUsage: true
              }
            )
          );
        }
      }
    ];
  });
});
