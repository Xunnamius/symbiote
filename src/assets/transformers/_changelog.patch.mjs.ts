import { changelogPatchConfigPackageBase, isAccessible } from '@-xun/project';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath } = context;

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    const path = toProjectAbsolutePath(changelogPatchConfigPackageBase);
    // ? Only create this file if it doesn't already exist
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
