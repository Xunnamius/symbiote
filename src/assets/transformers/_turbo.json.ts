// TODO: this whole transformer
// import { isRootPackage, ProjectAttribute } from 'multiverse+project-utils:analyze.ts';

// import {
//   turboConfigProjectBase,
//   type RelativePath
// } from 'multiverse+project-utils:fs.ts';

import {
  // AssetPreset,
  // compileTemplate,
  // generatePerPackageAssets,
  makeTransformer
  // type TransformerContext
} from 'universe:assets.ts';

// {@symbiote/notExtraneous turbo}

//const turboInitTaskName = '//#turbo:init';

export const { transformer } = makeTransformer(async function (/* context */) {
  return [];
  // const { assetPreset } = context;

  // // * Every package gets these files including non-hybrid monorepo roots
  // return generatePerPackageAssets(
  //   context,
  //   async function ({ toPackageAbsolutePath, contextWithCwdPackage }) {
  //     const path = toPackageAbsolutePath(turboConfigProjectBase);

  //     return [
  //       {
  //         path,
  //         generate: async () => {
  //           return replaceStandardStrings(
  //             await compileTemplate(
  //               turboConfigProjectBase as RelativePath,
  //               contextWithCwdPackage
  //             ),
  //             contextWithCwdPackage
  //           );
  //         }
  //       }
  //     ];
  //   },
  //   { includeRootPackageInNonHybridMonorepo: true }
  // );
});

// async function replaceStandardStrings(
//   content: string,
//   {
//     toProjectAbsolutePath,
//     repoName,
//     assetPreset,
//     projectMetadata: {
//       type,
//       cwdPackage,
//       rootPackage: { attributes: projectAttributes }
//     },
//     toPackageAbsolutePath
//   }: TransformerContext
// ) {
//   // TODO: in content, replace `turboInitTaskName` but also `"{{` and the `}}"`
//   // TODO: (turboInitTaskName should be deleted in hybridrepo and polyrepo)

//   const isNonHybridMonorepoRoot =
//     isRootPackage(cwdPackage) &&
//     projectAttributes[ProjectAttribute.Monorepo] &&
//     !projectAttributes[ProjectAttribute.Hybridrepo];

//   return content
//     .replaceAll(
//       `"{{turboInitTaskName}}"`,
//       isNonHybridMonorepoRoot ? JSON.stringify(turboInitTaskName) : ''
//     )
//     .replaceAll(
//       `"{{globalEnv}}"`,
//       isNonHybridMonorepoRoot ? JSON.stringify(globalEnv).slice(1, -1) : ''
//     )
//     .replaceAll(
//       `"{{globalPassThroughEnv}}"`,
//       isNonHybridMonorepoRoot ? JSON.stringify(globalPassThroughEnv).slice(1, -1) : ''
//     )
//     .replaceAll(
//       `"{{globalDependencies}}"`,
//       isNonHybridMonorepoRoot ? JSON.stringify(globalDependencies).slice(1, -1) : ''
//     )
//     .replaceAll(`//"extends": ["//"],`, '"extends": ["//"],');
// }

// const globalEnv: string[] = ['DEBUG_*', 'SSH_*', 'SYMBIOTE_', 'NODE_ENV', 'APP_ENV'];
// const globalPassThroughEnv: string[] = [];
// const globalDependencies: string[] = [];
// const buildInputsExcludes: string[] = ['!test/**'];
