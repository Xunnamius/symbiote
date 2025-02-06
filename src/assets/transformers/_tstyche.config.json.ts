import { tstycheConfigProjectBase } from '@-xun/project';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';
import { stringifyJson } from 'universe:util.ts';

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath } = context;

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(tstycheConfigProjectBase),
        generate: () =>
          stringifyJson({
            $schema: 'https://tstyche.org/schemas/config.json',
            testFileMatch: ['**/type-*.test.ts', '**/type-*.test.tsx']
          })
      }
    ];
  });
});
