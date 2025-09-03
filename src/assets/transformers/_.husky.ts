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
        [toProjectAbsolutePath(directoryHuskyProjectBase, 'commit-msg.mjs')]:
          toRelativePath('husky/commit-msg.mjs'),
        [toProjectAbsolutePath(directoryHuskyProjectBase, 'pre-commit')]:
          toRelativePath('husky/pre-commit'),
        [toProjectAbsolutePath(directoryHuskyProjectBase, 'pre-commit.mjs')]:
          toRelativePath('husky/pre-commit.mjs'),
        [toProjectAbsolutePath(directoryHuskyProjectBase, 'pre-push')]:
          toRelativePath('husky/pre-push'),
        [toProjectAbsolutePath(directoryHuskyProjectBase, 'pre-push.mjs')]:
          toRelativePath('husky/pre-push.mjs')
      },
      context
    );
  });
});
