import {
  turboConfigProjectBase,
  type RelativePath
} from 'multiverse+project-utils:fs.ts';

import {
  compileTemplate,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

// {@symbiote/notExtraneous turbo}

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath } = context;

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(turboConfigProjectBase),
        generate: () => compileTemplate(turboConfigProjectBase as RelativePath, context)
      }
    ];
  });
});
