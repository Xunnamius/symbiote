import { turboConfigProjectBase } from 'multiverse+project-utils:fs.ts';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';
import { stringifyJson } from 'universe:util.ts';

// {@symbiote/notExtraneous turbo}

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath } = context;

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(turboConfigProjectBase),
        generate: () => stringifyJson({})
      }
    ];
  });
});
