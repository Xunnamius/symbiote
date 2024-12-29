import {
  directoryVscodeProjectBase,
  toRelativePath,
  type AbsolutePath
} from 'multiverse+project-utils:fs.ts';

import {
  compileTemplates,
  definedNonBasicAssetPresets,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

import { readFile } from 'universe:util.ts';

const endsWithExampleJsonRegExp = /\.example\.json$/;

export const { transformer } = makeTransformer(function (context) {
  const {
    forceOverwritePotentiallyDestructive: force,
    toProjectAbsolutePath,
    debug,
    assetPreset
  } = context;

  // * Do not generate any files when using the "wrong" preset
  if (definedNonBasicAssetPresets.includes(assetPreset)) {
    return [];
  }

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    const templates = await compileTemplates(
      {
        [toProjectAbsolutePath(directoryVscodeProjectBase, 'launch.example.json')]:
          toRelativePath('vscode/launch.example.json'),
        [toProjectAbsolutePath(directoryVscodeProjectBase, 'settings.json')]:
          toRelativePath('vscode/settings.json'),
        [toProjectAbsolutePath(directoryVscodeProjectBase, 'tasks.example.json')]:
          toRelativePath('vscode/tasks.example.json')
      },
      context
    );

    for (const [index, { path, generate }] of templates.entries().toArray()) {
      const existingContentsPath = path.replace(
        endsWithExampleJsonRegExp,
        '.json'
      ) as AbsolutePath;

      if (force) {
        templates.push({ path: existingContentsPath, generate });
      } else {
        templates[index].generate = async function () {
          const existingContents = await readIn(existingContentsPath);

          debug('existingContentsPath: %O', existingContentsPath);
          debug('has existing contents: %O', !!existingContents);

          return existingContents ?? generate();
        };
      }
    }

    return templates;
  });

  async function readIn(path: string) {
    return readFile(path).catch((error: unknown) => {
      debug.message(`unable to read in file: %O`, path);
      debug(error);
      return undefined;
    });
  }
});
