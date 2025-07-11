import { directorySrcPackageBase, isAccessible } from '@-xun/project';

import { generatePerPackageAssets, makeTransformer } from 'universe:assets.ts';

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath, forceOverwritePotentiallyDestructive: force } = context;

  // * Every package gets these files except non-hybrid monorepo roots
  return generatePerPackageAssets(context, async function ({ toPackageAbsolutePath }) {
    const outputDir = toPackageAbsolutePath(directorySrcPackageBase);

    // TODO: For cli projects, add black-flag boilerplate and also for
    // TODO: package.json (add BF, BFE, xcli packages to dependencies)
    void force;

    // ? Only create this file if its parent directory does not already exist
    if (!(await isAccessible(outputDir, { useCached: true }))) {
      return [
        {
          path: toProjectAbsolutePath(outputDir, 'index.ts'),
          generate: () => /*js*/ `export {};`
        },
        {
          path: toProjectAbsolutePath(outputDir, 'error.ts'),
          generate: () => /*js*/ `
/**
 * A collection of possible error and warning messages.
 */
/* istanbul ignore next */
export const ErrorMessage = {
  // Your exported error messages here
};
`
        }
      ];
    }
  });
});
