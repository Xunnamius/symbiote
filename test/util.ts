/**
 ** This file exports test utilities specific to this project and beyond what is
 ** exported by @-xun/jest; these can be imported using the testversal aliases.
 */

import { readdirSync } from 'node:fs';

import { dummyToProjectMetadata } from '@-xun/common-dummies/repositories';
import { toAbsolutePath } from '@-xun/fs';
import { createDebugLogger, createGenericLogger } from 'rejoinder';

import {
  assetPresets,
  directoryAssetTransformers,
  gatherAssetsFromTransformer
} from 'universe:assets.ts';

import { DefaultGlobalScope } from 'universe:configure.ts';

import {
  magicStringChooserBlockEnd,
  magicStringChooserBlockSplit,
  magicStringChooserBlockStart
} from 'universe:util.ts';

import type { ProjectMetadata } from '@-xun/project';

import type {
  Asset,
  AssetPreset,
  IncomingTransformerContext,
  ReifiedAssets,
  TransformerContext
} from 'universe:assets.ts';

// ? These will always come from @-xun/symbiote and @-xun/jest (transitively)
// {@symbiote/notInvalid
//   - @-xun/jest
//   - @-xun/test-mock-argv
//   - @-xun/test-mock-exit
//   - @-xun/test-mock-import
//   - @-xun/test-mock-env
//   - @-xun/test-mock-fixture
//   - @-xun/test-mock-output
// }

export * from '@-xun/jest';

export const presetsUnderTest: (AssetPreset | undefined)[] = [
  undefined,
  ...assetPresets
];

export const dummyContext: IncomingTransformerContext = {
  log: createGenericLogger({ namespace: 'unit-assets-dummy-context' }),
  debug: createDebugLogger({ namespace: 'unit-assets-dummy-context' }),

  toProjectAbsolutePath: (...pathsLike) => toAbsolutePath('/dummy', ...pathsLike),
  toPackageAbsolutePath: (...pathsLike) =>
    toAbsolutePath('/dummy/packages/pkg', ...pathsLike),

  shouldDeriveAliases: true,
  forceOverwritePotentiallyDestructive: false,
  scope: DefaultGlobalScope.Unlimited,
  assetPreset: undefined,
  projectMetadata: dummyToProjectMetadata(
    'goodHybridrepo'
  ) as TransformerContext['projectMetadata'],
  cwdPackagePartialImportSpecifier: '',
  additionalRawAliasMappings: [],
  monorepoPackagesList: '- package-1\n- package-2\n- package-3',

  lintNpmScript: 'lint:package',
  testNpmScript: 'test',

  repoOwner: 'repo-owner',
  repoName: 'repo-name',
  year: '1776',
  codecovFlag: 'codecov.flag_here',

  chooserBlockStart: magicStringChooserBlockStart,
  chooserBlockSplit: magicStringChooserBlockSplit,
  chooserBlockEnd: magicStringChooserBlockEnd
};

export async function expectAssetsToMatchSnapshots(
  assets: ReifiedAssets,
  scope: DefaultGlobalScope
) {
  const entries = Object.entries(assets);

  if (!entries.length) {
    // ? Allow empty entries to satisfy expect.hasAssertions
    expect(true).toBeTrue();
  }

  for (const [key, asset] of entries) {
    expect(
      `key: ${key}\nscope: ${scope}\n⏶⏷⏶⏷⏶\n` +
        // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-base-to-string
        replaceDynamicValuesWithStableStrings(String(await asset()))
    ).toMatchSnapshot(key);
  }
}

export function replaceDynamicValuesWithStableStrings(str: string | symbol) {
  return String(str)
    .replaceAll(/"@-xun\/symbiote": "[^"]+"/g, '"@-xun/symbiote": "<latest>"')
    .replaceAll(/"compatibility_date": "[^"]+"/g, '"compatibility_date": "<latest>"');
}

export async function toAssetsMap(assets: ReifiedAssets | Asset[]) {
  const entries = Array.isArray(assets)
    ? assets.map(({ path, generate }) => [path, generate] as const)
    : Object.entries(assets);

  return Object.fromEntries(
    await Promise.all(entries.map(async ([k, v]) => [k, await v()]))
  );
}

export function makeDummyPathFunctions({
  cwdPackage,
  rootPackage: { root: packageRoot }
}: ProjectMetadata): Pick<
  TransformerContext,
  'toPackageAbsolutePath' | 'toProjectAbsolutePath'
> {
  return {
    toPackageAbsolutePath: (...args) =>
      toAbsolutePath(
        packageRoot,
        'relativeRoot' in cwdPackage ? cwdPackage.relativeRoot : '',
        ...args
      ),
    toProjectAbsolutePath: (...args) => toAbsolutePath(packageRoot, ...args)
  };
}

export function generateAssetContentSnapshotsForPreset(
  presetUnderTest: (typeof presetsUnderTest)[number]
) {
  beforeEach(() => {
    dummyContext.log.enabled = false;
    dummyContext.debug.enabled = false;
  });

  describe('::gatherAssetsFromTransformer', () => {
    describe('<generated asset content snapshots>', () => {
      for (const transformerBasename of readdirSync(directoryAssetTransformers)) {
        const transformerId = transformerBasename.slice(1, -3);

        describe(transformerId, () => {
          test('generates expected assets for polyrepo', async () => {
            expect.hasAssertions();

            const projectMetadata = dummyToProjectMetadata(
              'goodPolyrepoNoSrcYesDefaultEnv',
              'self'
            ) as TransformerContext['projectMetadata'];

            const assets = await gatherAssetsFromTransformer({
              transformerId,
              transformerContext: {
                ...dummyContext,
                projectMetadata,
                assetPreset: presetUnderTest,
                ...makeDummyPathFunctions(projectMetadata)
              },
              options: { transformerFiletype: 'ts' }
            });

            await expectAssetsToMatchSnapshots(assets, dummyContext.scope);
          });

          test('generates expected assets for polyrepo (scope=this-package)', async () => {
            expect.hasAssertions();

            const projectMetadata = dummyToProjectMetadata(
              'goodPolyrepoNoSrcYesDefaultEnv',
              'self'
            ) as TransformerContext['projectMetadata'];

            const assets = await gatherAssetsFromTransformer({
              transformerId,
              transformerContext: {
                ...dummyContext,
                projectMetadata,
                assetPreset: presetUnderTest,
                ...makeDummyPathFunctions(projectMetadata),
                scope: DefaultGlobalScope.ThisPackage
              },
              options: { transformerFiletype: 'ts' }
            });

            await expectAssetsToMatchSnapshots(assets, dummyContext.scope);
          });

          test('generates expected assets for polyrepo (with force)', async () => {
            expect.hasAssertions();

            const projectMetadata = dummyToProjectMetadata(
              'goodPolyrepoNoSrcYesDefaultEnv',
              'self'
            ) as TransformerContext['projectMetadata'];

            const assets = await gatherAssetsFromTransformer({
              transformerId,
              transformerContext: {
                ...dummyContext,
                projectMetadata,
                assetPreset: presetUnderTest,
                ...makeDummyPathFunctions(projectMetadata),
                forceOverwritePotentiallyDestructive: true
              },
              options: { transformerFiletype: 'ts' }
            });

            await expectAssetsToMatchSnapshots(assets, DefaultGlobalScope.ThisPackage);
          });

          test('generates expected assets at non-hybrid monorepo', async () => {
            expect.hasAssertions();

            const projectMetadata = dummyToProjectMetadata(
              'goodMonorepoNoSrc',
              'pkg-1'
            ) as TransformerContext['projectMetadata'];

            {
              const assets = await gatherAssetsFromTransformer({
                transformerId,
                transformerContext: {
                  ...dummyContext,
                  projectMetadata,
                  assetPreset: presetUnderTest,
                  ...makeDummyPathFunctions(projectMetadata)
                },
                options: { transformerFiletype: 'ts' }
              });

              await expectAssetsToMatchSnapshots(assets, dummyContext.scope);
            }
          });

          test('generates expected assets at non-hybrid monorepo (scope=this-package)', async () => {
            expect.hasAssertions();

            const projectMetadata = dummyToProjectMetadata(
              'goodMonorepoNoSrc',
              'pkg-1'
            ) as TransformerContext['projectMetadata'];

            {
              const assets = await gatherAssetsFromTransformer({
                transformerId,
                transformerContext: {
                  ...dummyContext,
                  projectMetadata,
                  assetPreset: presetUnderTest,
                  ...makeDummyPathFunctions(projectMetadata),
                  scope: DefaultGlobalScope.ThisPackage
                },
                options: { transformerFiletype: 'ts' }
              });

              await expectAssetsToMatchSnapshots(assets, DefaultGlobalScope.ThisPackage);
            }
          });

          test('generates expected assets at non-hybrid monorepo (with force)', async () => {
            expect.hasAssertions();

            const projectMetadata = dummyToProjectMetadata(
              'goodMonorepoNoSrc',
              'pkg-1'
            ) as TransformerContext['projectMetadata'];

            {
              const assets = await gatherAssetsFromTransformer({
                transformerId,
                transformerContext: {
                  ...dummyContext,
                  projectMetadata,
                  assetPreset: presetUnderTest,
                  ...makeDummyPathFunctions(projectMetadata),
                  forceOverwritePotentiallyDestructive: true
                },
                options: { transformerFiletype: 'ts' }
              });

              await expectAssetsToMatchSnapshots(assets, dummyContext.scope);
            }
          });

          test('generates expected assets at hybridrepo', async () => {
            expect.hasAssertions();

            const projectMetadata = dummyToProjectMetadata(
              'goodHybridrepo',
              'self'
            ) as TransformerContext['projectMetadata'];

            {
              const assets = await gatherAssetsFromTransformer({
                transformerId,
                transformerContext: {
                  ...dummyContext,
                  projectMetadata,
                  assetPreset: presetUnderTest,
                  ...makeDummyPathFunctions(projectMetadata)
                },
                options: { transformerFiletype: 'ts' }
              });

              await expectAssetsToMatchSnapshots(assets, dummyContext.scope);
            }
          });

          test('generates expected assets at hybridrepo (scope=this-package)', async () => {
            expect.hasAssertions();

            const projectMetadata = dummyToProjectMetadata(
              'goodHybridrepo',
              'self'
            ) as TransformerContext['projectMetadata'];

            {
              const assets = await gatherAssetsFromTransformer({
                transformerId,
                transformerContext: {
                  ...dummyContext,
                  projectMetadata,
                  assetPreset: presetUnderTest,
                  ...makeDummyPathFunctions(projectMetadata),
                  scope: DefaultGlobalScope.ThisPackage
                },
                options: { transformerFiletype: 'ts' }
              });

              await expectAssetsToMatchSnapshots(assets, DefaultGlobalScope.ThisPackage);
            }
          });

          test('generates expected assets at hybridrepo (with force)', async () => {
            expect.hasAssertions();

            const projectMetadata = dummyToProjectMetadata(
              'goodHybridrepo',
              'self'
            ) as TransformerContext['projectMetadata'];

            {
              const assets = await gatherAssetsFromTransformer({
                transformerId,
                transformerContext: {
                  ...dummyContext,
                  projectMetadata,
                  assetPreset: presetUnderTest,
                  ...makeDummyPathFunctions(projectMetadata),
                  forceOverwritePotentiallyDestructive: true
                },
                options: { transformerFiletype: 'ts' }
              });

              await expectAssetsToMatchSnapshots(assets, dummyContext.scope);
            }
          });
        });
      }
    });
  });
}
