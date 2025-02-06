/* eslint-disable unicorn/filename-case */
import { markdownSecurityProjectBase } from '@-xun/project';

import {
  compileTemplate,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

import type { RelativePath } from '@-xun/fs';

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath } = context;

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(markdownSecurityProjectBase),
        generate: () =>
          compileTemplate(markdownSecurityProjectBase as RelativePath, context)
      }
    ];
  });
});
