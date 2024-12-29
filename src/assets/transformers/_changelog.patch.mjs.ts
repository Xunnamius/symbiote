import {
  changelogPatchConfigPackageBase,
  isAccessible
} from 'multiverse+project-utils:fs.ts';

import {
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
    const path = toProjectAbsolutePath(changelogPatchConfigPackageBase);
    const patchAlreadyExists = await isAccessible(path, { useCached: true });

    return patchAlreadyExists
      ? []
      : [
          {
            path,
            generate: () => /*js*/ `
// @ts-check

/**
 * @type {import('@-xun/symbiote/commands/build/changelog').ChangelogPatches}
 */
export default [
  ///// ? Oops
  //[/ --file /g, ' --files '],
  //['--output-file', '--changelog-file'],
];
`
          }
        ];
  });
});
