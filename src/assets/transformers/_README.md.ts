/* eslint-disable unicorn/filename-case */
import { isRootPackage, ProjectAttribute } from 'multiverse+project-utils:analyze.ts';

import {
  isAccessible,
  markdownLicensePackageBase,
  markdownReadmePackageBase,
  toRelativePath,
  type RelativePath
} from 'multiverse+project-utils:fs.ts';

import {
  compileTemplate,
  generatePerPackageAssets,
  generateRootOnlyAssets,
  libAssetPresets,
  makeTransformer,
  type TransformerContext
} from 'universe:assets.ts';

import { replaceRegionsRespectively } from 'universe:util.ts';

export const { transformer } = makeTransformer(async function (context) {
  const {
    toProjectAbsolutePath,
    projectMetadata: {
      type,
      rootPackage: { attributes: projectAttributes }
    }
  } = context;

  return [
    ...// * Only the root package of a non-hybrid monorepo gets these files
    (await generateRootOnlyAssets(context, function () {
      if (
        type !== ProjectAttribute.Monorepo ||
        projectAttributes[ProjectAttribute.Hybridrepo]
      ) {
        return [];
      }

      const path = toProjectAbsolutePath(markdownReadmePackageBase);

      return [
        {
          path,
          generate: async () => {
            return replaceRegionsRespectively({
              outputPath: path,
              templateContent: await replaceStandardStrings(
                await compileTemplate(toRelativePath('README.monorepo.md'), context),
                context
              ),
              context
            });
          }
        }
      ];
    })),

    ...// * Every package gets these files except non-hybrid monorepo roots
    (await generatePerPackageAssets(
      context,
      async function ({ toPackageAbsolutePath, contextWithCwdPackage }) {
        const path = toPackageAbsolutePath(markdownReadmePackageBase);

        return [
          {
            path,
            generate: async () => {
              return replaceRegionsRespectively({
                outputPath: path,
                templateContent: await replaceStandardStrings(
                  await compileTemplate(
                    'README.package.md' as RelativePath,
                    contextWithCwdPackage
                  ),
                  contextWithCwdPackage
                ),
                context: contextWithCwdPackage
              });
            }
          }
        ];
      }
    ))
  ];
});

async function replaceStandardStrings(
  content: string,
  {
    repoName,
    assetPreset,
    projectMetadata: { cwdPackage },
    toPackageAbsolutePath
  }: TransformerContext
) {
  const {
    json: { name: packageName }
  } = cwdPackage;
  const isPackageTheRootPackage = isRootPackage(cwdPackage);
  const willHaveGeneratedLicense =
    libAssetPresets.includes(assetPreset) ||
    (await isAccessible(toPackageAbsolutePath(markdownLicensePackageBase), {
      useCached: true
    }));

  const returnValue = content.replace(
    // ? Replace H1 with proper string
    /^# <!-- .+$/m,
    isPackageTheRootPackage ? `# ${repoName} (${packageName})` : `# ${packageName}`
  );

  return willHaveGeneratedLicense
    ? returnValue
    : // ? Drop license section if no license
      returnValue.replace(
        'See [LICENSE][x-repo-license].',
        'This project does not have a license.'
      );
}
