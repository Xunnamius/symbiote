import { gitattributesConfigProjectBase } from '@-xun/project';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath } = context;

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(gitattributesConfigProjectBase),
        generate: () => `
* text=auto eol=lf
`
      }
    ];
  });
});
