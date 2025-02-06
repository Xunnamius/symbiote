import { toRelativePath } from '@-xun/fs';
import { directoryHuskyProjectBase } from '@-xun/project';

import {
  compileTemplates,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath } = context;

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
