// * These tests ensure the exported interfaces under test function as expected.

import { readdirSync } from 'node:fs';

import { dummyToProjectMetadata } from '@-xun/common-dummies/repositories';
import { toAbsolutePath, toPath } from '@-xun/fs';

import {
  allContributorsConfigProjectBase,
  babelConfigProjectBase,
  dotEnvConfigProjectBase,
  dotEnvDefaultConfigProjectBase,
  eslintConfigProjectBase,
  jestConfigProjectBase,
  packageJsonConfigPackageBase,
  Tsconfig
} from '@-xun/project';

import { createDebugLogger, createGenericLogger } from 'rejoinder';

import { parsePackageJsonRepositoryIntoOwnerAndRepo } from 'universe:assets/transformers/_package.json.ts';

import {
  assetPresets,
  compileTemplate,
  compileTemplateInMemory,
  compileTemplates,
  deepMergeConfig,
  directoryAssetTransformers,
  gatherAssetsFromAllTransformers,
  gatherAssetsFromTransformer,
  generatePerPackageAssets,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

import { DefaultGlobalScope } from 'universe:configure.ts';
import { ErrorMessage } from 'universe:error.ts';

import {
  deriveCodecovPackageFlag,
  magicStringChooserBlockEnd,
  magicStringChooserBlockSplit,
  magicStringChooserBlockStart
} from 'universe:util.ts';

import type { AbsolutePath, RelativePath } from '@-xun/fs';
import type { ProjectMetadata, RawAlias } from '@-xun/project';
import type { Merge } from 'type-fest';

import type {
  Asset,
  AssetPreset,
  IncomingTransformerContext,
  ReifiedAssets,
  TransformerContext
} from 'universe:assets.ts';

const dummyContext: IncomingTransformerContext = {
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

beforeEach(() => {
  dummyContext.log.enabled = false;
  dummyContext.debug.enabled = false;
});

describe('::gatherAssetsFromTransformer', () => {
  it('invoke a transformer via its filename', async () => {
    expect.hasAssertions();

    const transformerContext = dummyContext;

    const assets = await gatherAssetsFromTransformer({
      transformerId: allContributorsConfigProjectBase,
      transformerContext,
      options: { transformerFiletype: 'ts' }
    });

    const dummyAbsolutePath = dummyContext.toProjectAbsolutePath(
      allContributorsConfigProjectBase
    );

    const expectedAssets = await (
      await import('universe:assets/transformers/_.all-contributorsrc.ts')
    ).transformer({ ...transformerContext, asset: allContributorsConfigProjectBase });

    await expect(assets[dummyAbsolutePath]!()).resolves.toStrictEqual(
      await expectedAssets[dummyAbsolutePath]!()
    );
  });

  it('throws if transformer not found', async () => {
    expect.hasAssertions();

    await expect(
      gatherAssetsFromTransformer({
        transformerId: 'fake-does-not-exist',
        transformerContext: {} as IncomingTransformerContext
      })
    ).rejects.toMatchObject({
      message: expect.stringMatching(/failed to retrieve asset/)
    });
  });

  describe('<generated asset content snapshots>', () => {
    for (const transformerBasename of readdirSync(directoryAssetTransformers)) {
      const transformerId = transformerBasename.slice(1, -3);

      // eslint-disable-next-line jest/valid-title
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

  describe('<additional asset content tests>', () => {
    describe('dotenv', () => {
      it('appends to current .env and .env.default only if force is used', async () => {
        expect.hasAssertions();

        {
          const projectMetadata = dummyToProjectMetadata(
            // * Has .env, no .env.default
            'goodPolyrepo'
          ) as TransformerContext['projectMetadata'];

          const assets = await gatherAssetsFromTransformer({
            transformerId: dotEnvDefaultConfigProjectBase,
            transformerContext: {
              ...dummyContext,
              projectMetadata,
              // Not with force
              ...makeDummyPathFunctions(projectMetadata)
            },
            options: { transformerFiletype: 'ts' }
          });

          expect(assets).toContainAllKeys([
            toPath(projectMetadata.rootPackage.root, dotEnvDefaultConfigProjectBase)
          ]);

          await expect(
            assets[
              toPath(projectMetadata.rootPackage.root, dotEnvDefaultConfigProjectBase)
            ]!()
          ).resolves.toMatchSnapshot('.env=yes,.end.default=no,force=no');
        }

        {
          const projectMetadata = dummyToProjectMetadata(
            // * Has .env, no .env.default
            'goodPolyrepo'
          ) as TransformerContext['projectMetadata'];

          const assets = await gatherAssetsFromTransformer({
            transformerId: dotEnvDefaultConfigProjectBase,
            transformerContext: {
              ...dummyContext,
              projectMetadata,
              // * With force
              forceOverwritePotentiallyDestructive: true,
              ...makeDummyPathFunctions(projectMetadata)
            },
            options: { transformerFiletype: 'ts' }
          });

          await expect(
            assets[toPath(projectMetadata.rootPackage.root, dotEnvConfigProjectBase)]!()
          ).resolves.toMatchSnapshot('.env=yes,.end.default=no,force=yes');

          await expect(
            assets[
              toPath(projectMetadata.rootPackage.root, dotEnvDefaultConfigProjectBase)
            ]!()
          ).resolves.toMatchSnapshot('.env=yes,.end.default=no,force=yes');
        }

        {
          const projectMetadata = dummyToProjectMetadata(
            // * Has .env and .env.default
            'goodPolyrepoNoSrcYesDefaultEnv'
          ) as TransformerContext['projectMetadata'];

          const assets = await gatherAssetsFromTransformer({
            transformerId: dotEnvDefaultConfigProjectBase,
            transformerContext: {
              ...dummyContext,
              projectMetadata,
              // Not with force
              ...makeDummyPathFunctions(projectMetadata)
            },
            options: { transformerFiletype: 'ts' }
          });

          expect(assets).toBeEmpty();
        }

        {
          const projectMetadata = dummyToProjectMetadata(
            // * Has .env and .env.default
            'goodPolyrepoNoSrcYesDefaultEnv'
          ) as TransformerContext['projectMetadata'];

          const assets = await gatherAssetsFromTransformer({
            transformerId: dotEnvDefaultConfigProjectBase,
            transformerContext: {
              ...dummyContext,
              projectMetadata,
              // * With force
              forceOverwritePotentiallyDestructive: true,
              ...makeDummyPathFunctions(projectMetadata)
            },
            options: { transformerFiletype: 'ts' }
          });

          await expect(
            assets[toPath(projectMetadata.rootPackage.root, dotEnvConfigProjectBase)]!()
          ).resolves.toMatchInlineSnapshot(`
            "FAKE_SECRET=fake_value
            FAKE_SECRET_2=fake-string-thing
            NPM_TOKEN=fake
            # Comment
            CODECOV_TOKEN=fake

            SOMETHING=5
            #
            A_NEW_ONE=new-default-value
            "
          `);

          await expect(
            assets[
              toPath(projectMetadata.rootPackage.root, dotEnvDefaultConfigProjectBase)
            ]!()
          ).resolves.toMatchInlineSnapshot(`
            "# shellcheck disable=all

            FAKE_SECRET=default_value
            FAKE_SECRET_2=default-string-thing
            SOMETHING=
            A_NEW_ONE=new-default-value

            # TODO: document these
            NPM_TOKEN=
            CODECOV_TOKEN=
            "
          `);
        }

        {
          const projectMetadata = dummyToProjectMetadata(
            // * Has no .env, no .env.default
            'goodPolyrepoNoEnv'
          ) as TransformerContext['projectMetadata'];

          const assets = await gatherAssetsFromTransformer({
            transformerId: dotEnvDefaultConfigProjectBase,
            transformerContext: {
              ...dummyContext,
              projectMetadata,
              // Not with force
              ...makeDummyPathFunctions(projectMetadata)
            },
            options: { transformerFiletype: 'ts' }
          });

          await expect(
            assets[toPath(projectMetadata.rootPackage.root, dotEnvConfigProjectBase)]!()
          ).resolves.toMatchSnapshot('.env=no,.end.default=no,force=no');

          await expect(
            assets[
              toPath(projectMetadata.rootPackage.root, dotEnvDefaultConfigProjectBase)
            ]!()
          ).resolves.toMatchSnapshot('.env=no,.end.default=no,force=no');
        }

        {
          const projectMetadata = dummyToProjectMetadata(
            // * Has no .env, no .env.default
            'goodPolyrepoNoEnv'
          ) as TransformerContext['projectMetadata'];

          const assets = await gatherAssetsFromTransformer({
            transformerId: dotEnvDefaultConfigProjectBase,
            transformerContext: {
              ...dummyContext,
              projectMetadata,
              // * With force
              forceOverwritePotentiallyDestructive: true,
              ...makeDummyPathFunctions(projectMetadata)
            },
            options: { transformerFiletype: 'ts' }
          });

          await expect(
            assets[toPath(projectMetadata.rootPackage.root, dotEnvConfigProjectBase)]!()
          ).resolves.toMatchSnapshot('.env=no,.end.default=no,force=yes');

          await expect(
            assets[
              toPath(projectMetadata.rootPackage.root, dotEnvDefaultConfigProjectBase)
            ]!()
          ).resolves.toMatchSnapshot('.env=no,.end.default=no,force=yes');
        }

        {
          const projectMetadata = dummyToProjectMetadata(
            // * Has .env.default, no .env
            'goodPolyrepoOnlyDefaultEnv'
          ) as TransformerContext['projectMetadata'];

          const assets = await gatherAssetsFromTransformer({
            transformerId: dotEnvDefaultConfigProjectBase,
            transformerContext: {
              ...dummyContext,
              projectMetadata,
              // Not with force
              ...makeDummyPathFunctions(projectMetadata)
            },
            options: { transformerFiletype: 'ts' }
          });

          expect(assets).toContainAllKeys([
            toPath(projectMetadata.rootPackage.root, dotEnvConfigProjectBase)
          ]);

          await expect(
            assets[toPath(projectMetadata.rootPackage.root, dotEnvConfigProjectBase)]!()
          ).resolves.toMatchSnapshot('.env=no,.end.default=yes,force=no');
        }

        {
          const projectMetadata = dummyToProjectMetadata(
            // * Has .env.default, no .env
            'goodPolyrepoOnlyDefaultEnv'
          ) as TransformerContext['projectMetadata'];

          const assets = await gatherAssetsFromTransformer({
            transformerId: dotEnvDefaultConfigProjectBase,
            transformerContext: {
              ...dummyContext,
              projectMetadata,
              // * With force
              forceOverwritePotentiallyDestructive: true,
              ...makeDummyPathFunctions(projectMetadata)
            },
            options: { transformerFiletype: 'ts' }
          });

          await expect(
            assets[toPath(projectMetadata.rootPackage.root, dotEnvConfigProjectBase)]!()
          ).resolves.toMatchSnapshot('.env=no,.end.default=yes,force=yes');

          await expect(
            assets[
              toPath(projectMetadata.rootPackage.root, dotEnvDefaultConfigProjectBase)
            ]!()
          ).resolves.toMatchSnapshot('.env=no,.end.default=yes,force=yes');
        }
      });
    });

    describe('package.json', () => {
      describe('::parsePackageJsonRepositoryIntoOwnerAndRepo', () => {
        it('parses package.json "repository" field into owner and repo', async () => {
          expect.hasAssertions();

          expect(
            parsePackageJsonRepositoryIntoOwnerAndRepo({
              repository: 'https://github.com/user/repo',
              name: 'dummy'
            })
          ).toStrictEqual({
            owner: 'user',
            repo: 'repo'
          });

          expect(
            parsePackageJsonRepositoryIntoOwnerAndRepo({
              repository: 'https://github.com/user/repo.git',
              name: 'dummy'
            })
          ).toStrictEqual({
            owner: 'user',
            repo: 'repo'
          });

          expect(
            parsePackageJsonRepositoryIntoOwnerAndRepo({
              repository: { type: 'git', url: 'https://github.com/user/repo' },
              name: 'dummy'
            })
          ).toStrictEqual({
            owner: 'user',
            repo: 'repo'
          });

          expect(
            parsePackageJsonRepositoryIntoOwnerAndRepo({
              repository: { type: 'git', url: 'https://github.com/user/repo.git' },
              name: 'dummy'
            })
          ).toStrictEqual({
            owner: 'user',
            repo: 'repo'
          });
        });

        it('throws on bad "repository" field', async () => {
          expect.hasAssertions();

          expect(() =>
            parsePackageJsonRepositoryIntoOwnerAndRepo({
              repository: '5',
              name: 'dummy'
            })
          ).toThrow(ErrorMessage.BadRepositoryInPackageJson('dummy'));
        });
      });

      it('replaces "repository" field when relevant', async () => {
        expect.hasAssertions();

        {
          const transformerContext = {
            ...dummyContext,
            projectMetadata: dummyToProjectMetadata('goodPolyrepo')
          } as IncomingTransformerContext;

          const assets = await gatherAssetsFromTransformer({
            transformerId: packageJsonConfigPackageBase,
            transformerContext,
            options: { transformerFiletype: 'ts' }
          });

          const dummyAbsolutePath = dummyContext.toProjectAbsolutePath(
            packageJsonConfigPackageBase
          );

          expect(
            JSON.parse((await assets[dummyAbsolutePath]!()) as string)
          ).toStrictEqual(
            expect.objectContaining({
              repository: {
                type: 'git',
                url: 'git+https://github.com/polyrepo-owner/repo-name.git'
              }
            })
          );
        }

        {
          const transformerContext = {
            ...dummyContext,
            projectMetadata: dummyToProjectMetadata('goodHybridrepo')
          } as IncomingTransformerContext;

          const assets = await gatherAssetsFromTransformer({
            transformerId: packageJsonConfigPackageBase,
            transformerContext,
            options: { transformerFiletype: 'ts' }
          });

          const dummyAbsolutePath = dummyContext.toProjectAbsolutePath(
            packageJsonConfigPackageBase
          );

          expect(
            JSON.parse((await assets[dummyAbsolutePath]!()) as string)
          ).toStrictEqual(
            expect.objectContaining({
              repository: {
                type: 'git',
                url: 'git+https://github.com/hybridrepo-owner/repo-name.git'
              }
            })
          );
        }
      });

      it('maintains existing "irrelevant" fields unless --force is used', async () => {
        expect.hasAssertions();

        const projectMetadata = dummyToProjectMetadata('goodPolyrepo');

        const dependencies = {
          dependencies: { a: '1' },
          devDependencies: { b: '2' },
          peerDependencies: { c: '3' },
          bundledDependencies: ['d'],
          optionalDependencies: { e: '5' }
        };

        projectMetadata.rootPackage.json = {
          ...projectMetadata.rootPackage.json,
          ...dependencies
        } as typeof projectMetadata.rootPackage.json;

        {
          const transformerContext = {
            ...dummyContext,
            projectMetadata
          } as IncomingTransformerContext;

          const assets = await gatherAssetsFromTransformer({
            transformerId: packageJsonConfigPackageBase,
            transformerContext,
            options: { transformerFiletype: 'ts' }
          });

          const dummyAbsolutePath = dummyContext.toProjectAbsolutePath(
            packageJsonConfigPackageBase
          );

          expect(
            JSON.parse((await assets[dummyAbsolutePath]!()) as string)
          ).toMatchObject(dependencies);
        }

        {
          const transformerContext = {
            ...dummyContext,
            forceOverwritePotentiallyDestructive: true,
            projectMetadata
          } as IncomingTransformerContext;

          const assets = await gatherAssetsFromTransformer({
            transformerId: packageJsonConfigPackageBase,
            transformerContext,
            options: { transformerFiletype: 'ts' }
          });

          const dummyAbsolutePath = dummyContext.toProjectAbsolutePath(
            packageJsonConfigPackageBase
          );

          expect(
            JSON.parse((await assets[dummyAbsolutePath]!()) as string)
          ).toMatchObject(dependencies);
        }
      });

      it('maintains existing "irrelevant" scripts unless --force is used', async () => {
        expect.hasAssertions();

        const projectMetadata = dummyToProjectMetadata('goodPolyrepo');

        const scripts = {
          some: 'script',
          'some-other': 'script'
        };

        projectMetadata.rootPackage.json = {
          ...projectMetadata.rootPackage.json,
          scripts
        } as typeof projectMetadata.rootPackage.json;

        {
          const transformerContext = {
            ...dummyContext,
            projectMetadata
          } as IncomingTransformerContext;

          const assets = await gatherAssetsFromTransformer({
            transformerId: packageJsonConfigPackageBase,
            transformerContext,
            options: { transformerFiletype: 'ts' }
          });

          const dummyAbsolutePath = dummyContext.toProjectAbsolutePath(
            packageJsonConfigPackageBase
          );

          expect(
            JSON.parse((await assets[dummyAbsolutePath]!()) as string)
          ).toMatchObject({ scripts });
        }

        {
          const transformerContext = {
            ...dummyContext,
            forceOverwritePotentiallyDestructive: true,
            projectMetadata
          } as IncomingTransformerContext;

          const assets = await gatherAssetsFromTransformer({
            transformerId: packageJsonConfigPackageBase,
            transformerContext,
            options: { transformerFiletype: 'ts' }
          });

          const dummyAbsolutePath = dummyContext.toProjectAbsolutePath(
            packageJsonConfigPackageBase
          );

          expect(
            JSON.parse((await assets[dummyAbsolutePath]!()) as string)
          ).not.toMatchObject({ scripts });
        }
      });

      it('maintains pre-existing "private" field in hybridrepos regardless of --force', async () => {
        expect.hasAssertions();

        {
          // * Tests use a hybridrepo without a pre-existing "private" field

          const projectMetadata = dummyToProjectMetadata(
            'goodHybridrepoNotPrivate',
            'cli'
          );

          {
            const transformerContext = {
              ...dummyContext,
              projectMetadata
            } as IncomingTransformerContext;

            const assets = await gatherAssetsFromTransformer({
              transformerId: packageJsonConfigPackageBase,
              transformerContext,
              options: { transformerFiletype: 'ts' }
            });

            const dummyProjectJsonPath = dummyContext.toProjectAbsolutePath(
              packageJsonConfigPackageBase
            );

            const dummyPackageJsonPath = dummyContext.toProjectAbsolutePath(
              packageJsonConfigPackageBase
            );

            expect(
              JSON.parse((await assets[dummyProjectJsonPath]!()) as string)
            ).not.toHaveProperty('private');

            expect(
              JSON.parse((await assets[dummyPackageJsonPath]!()) as string)
            ).not.toHaveProperty('private');
          }

          {
            const transformerContext = {
              ...dummyContext,
              projectMetadata,
              forceOverwritePotentiallyDestructive: true
            } as IncomingTransformerContext;

            const assets = await gatherAssetsFromTransformer({
              transformerId: packageJsonConfigPackageBase,
              transformerContext,
              options: { transformerFiletype: 'ts' }
            });

            const dummyProjectJsonPath = dummyContext.toProjectAbsolutePath(
              packageJsonConfigPackageBase
            );

            const dummyPackageJsonPath = dummyContext.toProjectAbsolutePath(
              packageJsonConfigPackageBase
            );

            expect(
              JSON.parse((await assets[dummyProjectJsonPath]!()) as string)
            ).not.toHaveProperty('private');

            expect(
              JSON.parse((await assets[dummyPackageJsonPath]!()) as string)
            ).not.toHaveProperty('private');
          }
        }

        {
          // * Tests use a hybridrepo WITH a pre-existing "private" field

          const projectMetadata = dummyToProjectMetadata('goodHybridrepo', 'cli');

          projectMetadata.rootPackage.json = {
            ...projectMetadata.rootPackage.json,
            private: true
          } as typeof projectMetadata.rootPackage.json;

          projectMetadata.cwdPackage.json = {
            ...projectMetadata.cwdPackage.json,
            private: true
          } as typeof projectMetadata.rootPackage.json;

          {
            const transformerContext = {
              ...dummyContext,
              projectMetadata
            } as IncomingTransformerContext;

            const assets = await gatherAssetsFromTransformer({
              transformerId: packageJsonConfigPackageBase,
              transformerContext,
              options: { transformerFiletype: 'ts' }
            });

            const dummyProjectJsonPath = dummyContext.toProjectAbsolutePath(
              packageJsonConfigPackageBase
            );

            const dummyPackageJsonPath = dummyContext.toProjectAbsolutePath(
              packageJsonConfigPackageBase
            );

            expect(
              JSON.parse((await assets[dummyProjectJsonPath]!()) as string)
            ).toHaveProperty('private', true);

            expect(
              JSON.parse((await assets[dummyPackageJsonPath]!()) as string)
            ).toHaveProperty('private', true);
          }

          {
            const transformerContext = {
              ...dummyContext,
              projectMetadata,
              forceOverwritePotentiallyDestructive: true
            } as IncomingTransformerContext;

            const assets = await gatherAssetsFromTransformer({
              transformerId: packageJsonConfigPackageBase,
              transformerContext,
              options: { transformerFiletype: 'ts' }
            });

            const dummyProjectJsonPath = dummyContext.toProjectAbsolutePath(
              packageJsonConfigPackageBase
            );

            const dummyPackageJsonPath = dummyContext.toProjectAbsolutePath(
              packageJsonConfigPackageBase
            );

            expect(
              JSON.parse((await assets[dummyProjectJsonPath]!()) as string)
            ).toHaveProperty('private', true);

            expect(
              JSON.parse((await assets[dummyPackageJsonPath]!()) as string)
            ).toHaveProperty('private', true);
          }
        }
      });
    });

    it('additionalRawAliasMappings is respected in relevant transformers', async () => {
      expect.hasAssertions();

      const transformerContext = {
        ...dummyContext,
        projectMetadata: dummyToProjectMetadata('goodPolyrepo'),
        additionalRawAliasMappings: [
          [
            {
              alias: 'finalverse',
              prefix: 'exact',
              suffix: 'exact',
              group: 'finalverse',
              regExp: /^finalverse$/,
              packageId: undefined
            } as unknown as RawAlias,
            {
              path: 'the/final/verse',
              prefix: 'root',
              suffix: 'none',
              extensionless: true
            }
          ]
        ]
      } as IncomingTransformerContext;

      {
        const assets = await gatherAssetsFromTransformer({
          transformerId: babelConfigProjectBase,
          transformerContext,
          options: { transformerFiletype: 'ts' }
        });

        const dummyAbsolutePath =
          dummyContext.toProjectAbsolutePath(babelConfigProjectBase);

        await expect(assets[dummyAbsolutePath]!()).resolves.toInclude(
          '"^finalverse$": "./the/final/verse"'
        );
      }

      {
        const assets = await gatherAssetsFromTransformer({
          transformerId: eslintConfigProjectBase,
          transformerContext,
          options: { transformerFiletype: 'ts' }
        });

        const dummyAbsolutePath = dummyContext.toProjectAbsolutePath(
          eslintConfigProjectBase
        );

        await expect(assets[dummyAbsolutePath]!()).resolves.toInclude(
          '["finalverse", "./the/final/verse"]'
        );
      }

      {
        const assets = await gatherAssetsFromTransformer({
          transformerId: jestConfigProjectBase,
          transformerContext,
          options: { transformerFiletype: 'ts' }
        });

        const dummyAbsolutePath =
          dummyContext.toProjectAbsolutePath(jestConfigProjectBase);

        await expect(assets[dummyAbsolutePath]!()).resolves.toInclude(
          '"^finalverse$": "<rootDir>/the/final/verse"'
        );
      }

      {
        const assets = await gatherAssetsFromTransformer({
          transformerId: Tsconfig.ProjectBase,
          transformerContext,
          options: { transformerFiletype: 'ts' }
        });

        const dummyAbsolutePath = dummyContext.toProjectAbsolutePath(
          Tsconfig.ProjectBase
        );

        await expect(assets[dummyAbsolutePath]!()).resolves.toInclude(
          '"finalverse": ["the/final/verse"]'
        );
      }
    });
  });
});

describe('::gatherAssetsFromAllTransformers', () => {
  const presetsUnderTest: (AssetPreset | undefined)[] = [undefined, ...assetPresets];

  for (const presetUnderTest of presetsUnderTest) {
    describe(
      // eslint-disable-next-line jest/valid-describe-callback
      `preset: ${
        presetUnderTest === undefined ? 'default (no preset)' : presetUnderTest
      }`,
      createTests
    );

    // ? We're checking for the correct paths here (by eye), whereas the
    // ? gatherAssetsFromTransformer tests are concerned with generated content
    function createTests() {
      test('generates expected assets for polyrepo', async () => {
        expect.hasAssertions();

        const projectMetadata = dummyToProjectMetadata(
          'goodPolyrepoNoSrcYesDefaultEnv',
          'self'
        ) as TransformerContext['projectMetadata'];

        const assets = await gatherAssetsFromAllTransformers({
          transformerContext: {
            ...dummyContext,
            projectMetadata,
            ...makeDummyPathFunctions(projectMetadata),
            ...(presetUnderTest ? { assetPreset: presetUnderTest } : {})
          }
        });

        expect(
          Object.keys(assets).map((k) =>
            k.slice(projectMetadata.rootPackage.root.length + 1)
          )
        ).toMatchSnapshot();
      });

      test('generates expected assets at non-hybrid monorepo', async () => {
        expect.hasAssertions();

        const projectMetadata = dummyToProjectMetadata(
          'goodMonorepoNoSrc',
          'pkg-1'
        ) as TransformerContext['projectMetadata'];

        const assets = await gatherAssetsFromAllTransformers({
          transformerContext: {
            ...dummyContext,
            projectMetadata,
            ...makeDummyPathFunctions(projectMetadata),
            ...(presetUnderTest ? { assetPreset: presetUnderTest } : {})
          }
        });

        expect(
          Object.keys(assets).map((k) =>
            k.slice(projectMetadata.rootPackage.root.length + 1)
          )
        ).toMatchSnapshot();
      });

      test('generates expected assets at hybridrepo', async () => {
        expect.hasAssertions();

        const projectMetadata = dummyToProjectMetadata(
          'goodHybridrepo',
          'self'
        ) as TransformerContext['projectMetadata'];

        const assets = await gatherAssetsFromAllTransformers({
          transformerContext: {
            ...dummyContext,
            projectMetadata,
            ...makeDummyPathFunctions(projectMetadata),
            ...(presetUnderTest ? { assetPreset: presetUnderTest } : {})
          }
        });

        expect(
          Object.keys(assets).map((k) =>
            k.slice(projectMetadata.rootPackage.root.length + 1)
          )
        ).toMatchSnapshot();
      });
    }
  }
});

describe('::compileTemplate', () => {
  it('accepts a template file path and returns a compilation result string', async () => {
    expect.hasAssertions();

    const asset = 'SECURITY.md' as RelativePath;

    await expect(
      compileTemplate(asset, { ...dummyContext, asset })
    ).resolves.toMatchSnapshot(asset);
  });
});

describe('::compileTemplates', () => {
  it('accepts an object of template file path values and returns the same object with corresponding compilation result string values', async () => {
    expect.hasAssertions();

    const assets = {
      'root/README.md': 'README.monorepo.md',
      'package/README.md': 'README.package.md',
      'CONTRIBUTING.md': 'CONTRIBUTING.md',
      'SECURITY.md': 'SECURITY.md',
      '.github/SUPPORT.md': 'github/SUPPORT.md'
    } as Record<RelativePath, RelativePath>;

    await expect(
      toAssetsMap(await compileTemplates(assets, { ...dummyContext, asset: 'combined' }))
    ).resolves.toMatchSnapshot();
  });
});

describe('::compileTemplateInMemory', () => {
  it('accepts a template string and returns a compilation result string', async () => {
    expect.hasAssertions();

    const templateString = `
<!-- symbiote-template-region-start 1 -->

<p align="center" width="100%">
  <img width="300" src="./{{repoName}}.png">
</p>

<p align="center" width="100%">
<!-- symbiote-template-region-end -->

{{projectMetadata.cwdPackage.json.description}}

<!-- symbiote-template-region-start 2 -->

<div align="center">

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]

</div>

# <!-- TODO: --> Project Title Here

<!-- symbiote-template-region-end -->

{{projectMetadata.cwdPackage.json.description}}
{{projectMetadata.cwdPackage.json.description++}}

Does not exist at all: "{{doesNotExist}}" "{{does.not.exist}}" "{{does.not.exist|}}"

Does not exist partially: "{{projectMetadata.cwdPackage.relativeRoot|}}" "{{projectMetadata.cwdPackage.relativeRoot+/}}"

To install {{repoName}}:

\`\`\`shell
npm install {{projectMetadata.cwdPackage.json.name}}
\`\`\`

[x-badge-codecov-image]:
  https://img.shields.io/codecov/c/github/{{repoOwner}}/{{repoName}}/main?style=flat-square&token=HWRIOBAAPW&flag=package.main_root
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/{{repoOwner}}/{{repoName}}
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/{{projectMetadata.cwdPackage.json.name}}?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/{{repoOwner}}/{{repoName}}?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/{{projectMetadata.cwdPackage.json.name}}?style=flat-square
  "This package's source license"
`.trim();

    expect(
      compileTemplateInMemory(templateString, { ...dummyContext, asset: 'in-memory' })
    ).toMatchInlineSnapshot(`
      "<!-- symbiote-template-region-start 1 -->

      <p align="center" width="100%">
        <img width="300" src="./repo-name.png">
      </p>

      <p align="center" width="100%">
      <!-- symbiote-template-region-end -->

      good-hybridrepo-description

      <!-- symbiote-template-region-start 2 -->

      <div align="center">

      [![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]

      </div>

      # <!-- TODO: --> Project Title Here

      <!-- symbiote-template-region-end -->

      good-hybridrepo-description
      good-hybridrepo-description+

      Does not exist at all: "{{doesNotExist}}" "{{does.not.exist}}" "{{does.not.exist|}}"

      Does not exist partially: "" ""

      To install repo-name:

      \`\`\`shell
      npm install good-hybridrepo
      \`\`\`

      [x-badge-codecov-image]:
        https://img.shields.io/codecov/c/github/repo-owner/repo-name/main?style=flat-square&token=HWRIOBAAPW&flag=package.main_root
        'Is this package well-tested?'
      [x-badge-codecov-link]: https://codecov.io/gh/repo-owner/repo-name
      [x-badge-downloads-image]:
        https://img.shields.io/npm/dm/good-hybridrepo?style=flat-square
        'Number of times this package has been downloaded per month'
      [x-badge-lastcommit-image]:
        https://img.shields.io/github/last-commit/repo-owner/repo-name?style=flat-square
        'Latest commit timestamp'
      [x-badge-license-image]:
        https://img.shields.io/npm/l/good-hybridrepo?style=flat-square
        "This package's source license""
    `);
  });
});

describe('::makeTransformer', () => {
  it('returns a transformer', async () => {
    expect.hasAssertions();

    const path = 'abs-path' as AbsolutePath;

    const { transformer } = makeTransformer(function (context) {
      return [{ path, generate: () => JSON.stringify(context) }];
    });

    const context = { asset: 'name' } as TransformerContext;
    const assets = await transformer(context);

    await expect(assets[path]!()).resolves.toStrictEqual(JSON.stringify(context) + '\n');
  });

  describe('::TransformerOptions', () => {
    describe('::trimContents', () => {
      const files = [
        {
          path: 'file1',
          generate: () => `
          contents1
        `
        },
        {
          path: 'file2',
          generate: () => `
            contents2
          `
        }
      ] as Merge<Asset, { generate: () => string }>[];

      const context = { asset: 'name' } as TransformerContext;

      it('"start" trims each file start', async () => {
        expect.hasAssertions();

        const { transformer } = makeTransformer(() => files);
        const assets = await transformer(context, { trimContents: 'start' });

        await expect(toAssetsMap(assets)).resolves.toStrictEqual({
          file1: files[0]!.generate().trimStart(),
          file2: files[1]!.generate().trimStart()
        });
      });

      it('"end" trims each file end', async () => {
        expect.hasAssertions();

        const { transformer } = makeTransformer(() => files);
        const assets = await transformer(context, { trimContents: 'end' });

        await expect(toAssetsMap(assets)).resolves.toStrictEqual({
          file1: files[0]!.generate().trimEnd(),
          file2: files[1]!.generate().trimEnd()
        });
      });

      it('"both" trims each file both', async () => {
        expect.hasAssertions();

        const { transformer } = makeTransformer(() => files);
        const assets = await transformer(context, { trimContents: 'both' });

        await expect(toAssetsMap(assets)).resolves.toStrictEqual({
          file1: files[0]!.generate().trim(),
          file2: files[1]!.generate().trim()
        });
      });

      it('"both-then-append-newline" (or defaulted) trims each file both-then-append-newline', async () => {
        expect.hasAssertions();

        const { transformer } = makeTransformer(() => files);

        {
          const assets = await transformer(context, {
            trimContents: 'both-then-append-newline'
          });

          await expect(toAssetsMap(assets)).resolves.toStrictEqual({
            file1: files[0]!.generate().trim() + '\n',
            file2: files[1]!.generate().trim() + '\n'
          });
        }

        {
          const assets = await transformer(context);

          await expect(toAssetsMap(assets)).resolves.toStrictEqual({
            file1: files[0]!.generate().trim() + '\n',
            file2: files[1]!.generate().trim() + '\n'
          });
        }
      });

      it('false does no trimming', async () => {
        expect.hasAssertions();

        const { transformer } = makeTransformer(() => files);
        const assets = await transformer(context, { trimContents: false });

        await expect(toAssetsMap(assets)).resolves.toStrictEqual({
          file1: files[0]!.generate(),
          file2: files[1]!.generate()
        });
      });
    });
  });
});

describe('::deepMergeConfig', () => {
  it('does not overwrite original configuration', async () => {
    expect.hasAssertions();

    const originalConfiguration = { a: 1 as number | boolean };

    expect(deepMergeConfig(originalConfiguration, { a: false })).toStrictEqual({
      a: false
    });

    expect(originalConfiguration).toStrictEqual({ a: 1 });
  });
});

describe('::generatePerPackageAssets', () => {
  it('calls adder function on each package except non-hybrid monorepo root when scope=unlimited', async () => {
    expect.hasAssertions();

    {
      const dummyProjectMetadata = dummyToProjectMetadata(
        'goodPolyrepo'
      ) as TransformerContext['projectMetadata'];

      const adder = jest.fn();

      await generatePerPackageAssets(
        { ...dummyContext, projectMetadata: dummyProjectMetadata, asset: 'dummy' },
        adder
      );

      expect(adder.mock.calls).toStrictEqual([
        [
          {
            package_: expect.objectContaining({
              root: dummyProjectMetadata.rootPackage.root
            }),
            toPackageAbsolutePath: expect.any(Function),
            contextWithCwdPackage: expect.any(Object)
          }
        ]
      ]);
    }

    {
      const dummyProjectMetadata = dummyToProjectMetadata(
        'goodHybridrepo'
      ) as TransformerContext['projectMetadata'];

      const adder = jest.fn();

      await generatePerPackageAssets(
        { ...dummyContext, projectMetadata: dummyProjectMetadata, asset: 'dummy' },
        adder
      );

      const packages = [
        dummyProjectMetadata.rootPackage,
        ...(dummyProjectMetadata.subRootPackages?.values() || [])
      ];

      for (const package_ of packages) {
        expect(
          adder.mock.calls.find(
            ([
              {
                package_: { root }
              }
            ]) => root === package_.root
          )
        ).toStrictEqual([
          {
            package_: expect.objectContaining({ root: package_.root }),
            toPackageAbsolutePath: expect.any(Function),
            contextWithCwdPackage: expect.any(Object)
          }
        ]);
      }

      expect(adder.mock.calls).toHaveLength(packages.length);
    }

    {
      const dummyProjectMetadata = dummyToProjectMetadata(
        'goodMonorepo'
      ) as TransformerContext['projectMetadata'];

      const adder = jest.fn();

      await generatePerPackageAssets(
        { ...dummyContext, projectMetadata: dummyProjectMetadata, asset: 'dummy' },
        adder
      );

      const packages = [
        ...(dummyProjectMetadata.subRootPackages?.values().toArray() || [])
      ];

      for (const package_ of packages) {
        expect(
          adder.mock.calls.find(
            ([
              {
                package_: { root }
              }
            ]) => root === package_.root
          )
        ).toStrictEqual([
          {
            package_: expect.objectContaining({ root: package_.root }),
            toPackageAbsolutePath: expect.any(Function),
            contextWithCwdPackage: expect.any(Object)
          }
        ]);
      }

      expect(adder.mock.calls).toHaveLength(packages.length);
    }
  });

  it('calls adder function on all possible packages when includeRootPackageInNonHybridMonorepo=true and scope=unlimited', async () => {
    expect.hasAssertions();

    const dummyProjectMetadata = dummyToProjectMetadata(
      'goodMonorepo'
    ) as TransformerContext['projectMetadata'];

    const adder = jest.fn();

    await generatePerPackageAssets(
      { ...dummyContext, projectMetadata: dummyProjectMetadata, asset: 'dummy' },
      adder,
      { includeRootPackageInNonHybridMonorepo: true }
    );

    const packages = [
      dummyProjectMetadata.rootPackage,
      ...(dummyProjectMetadata.subRootPackages?.values() || [])
    ];

    for (const package_ of packages) {
      expect(
        adder.mock.calls.find(
          ([
            {
              package_: { root }
            }
          ]) => root === package_.root
        )
      ).toStrictEqual([
        {
          package_: expect.objectContaining({ root: package_.root }),
          toPackageAbsolutePath: expect.any(Function),
          contextWithCwdPackage: expect.any(Object)
        }
      ]);
    }

    expect(adder.mock.calls).toHaveLength(packages.length);
  });

  it('calls adder function on cwdPackage only when scope=this-package', async () => {
    expect.hasAssertions();

    const dummyProjectMetadata = dummyToProjectMetadata(
      'goodMonorepo',
      'pkg-1'
    ) as TransformerContext['projectMetadata'];

    const adder = jest.fn();

    await generatePerPackageAssets(
      {
        ...dummyContext,
        projectMetadata: dummyProjectMetadata,
        asset: 'dummy',
        scope: DefaultGlobalScope.ThisPackage
      },
      adder,
      { includeRootPackageInNonHybridMonorepo: true }
    );

    expect(adder.mock.calls).toStrictEqual([
      [
        {
          package_: expect.objectContaining({
            root: dummyProjectMetadata.subRootPackages!.get('pkg-1')!.root
          }),
          toPackageAbsolutePath: expect.any(Function),
          contextWithCwdPackage: expect.any(Object)
        }
      ]
    ]);
  });

  it('calls adder function with correct transformerContext.projectMetadata.cwdPackage', async () => {
    expect.hasAssertions();

    const dummyProjectMetadata = dummyToProjectMetadata(
      'goodMonorepo'
    ) as TransformerContext['projectMetadata'];

    const { subRootPackages: pkgs_, rootPackage } = dummyProjectMetadata;
    const pkgs = pkgs_!.values().toArray();

    {
      const adder = jest.fn();

      await generatePerPackageAssets(
        {
          ...dummyContext,
          projectMetadata: dummyProjectMetadata,
          asset: 'dummy',
          scope: DefaultGlobalScope.Unlimited
        },
        adder
      );

      for (const package_ of pkgs) {
        expect(
          adder.mock.calls.find(
            ([
              {
                package_: { root }
              }
            ]) => root === package_.root
          )
        ).toStrictEqual([
          expect.objectContaining({
            contextWithCwdPackage: expect.objectContaining({
              projectMetadata: expect.objectContaining({ cwdPackage: package_ })
            })
          })
        ]);
      }

      expect(adder.mock.calls).toHaveLength(pkgs.length);
    }

    {
      const adder = jest.fn();

      await generatePerPackageAssets(
        {
          ...dummyContext,
          projectMetadata: dummyProjectMetadata,
          asset: 'dummy',
          scope: DefaultGlobalScope.Unlimited
        },
        adder,
        { includeRootPackageInNonHybridMonorepo: true }
      );

      for (const package_ of [rootPackage, ...pkgs]) {
        expect(
          adder.mock.calls.find(
            ([
              {
                package_: { root }
              }
            ]) => root === package_.root
          )
        ).toStrictEqual([
          expect.objectContaining({
            contextWithCwdPackage: expect.objectContaining({
              projectMetadata: expect.objectContaining({ cwdPackage: package_ })
            })
          })
        ]);
      }

      expect(adder.mock.calls).toHaveLength(pkgs.length + 1);
    }
  });

  it('calls adder function with correct transformerContext.codecovFlag', async () => {
    expect.hasAssertions();

    const dummyProjectMetadata = dummyToProjectMetadata(
      'goodMonorepo'
    ) as TransformerContext['projectMetadata'];

    const { subRootPackages: pkgs_, rootPackage } = dummyProjectMetadata;
    const pkgs = pkgs_!.values().toArray();
    const { currentBranch } = await deriveCodecovPackageFlag(rootPackage);

    {
      const adder = jest.fn();

      await generatePerPackageAssets(
        {
          ...dummyContext,
          projectMetadata: dummyProjectMetadata,
          asset: 'dummy',
          scope: DefaultGlobalScope.Unlimited
        },
        adder
      );

      for (const package_ of pkgs) {
        expect(
          adder.mock.calls.find(
            ([
              {
                package_: { root }
              }
            ]) => root === package_.root
          )
        ).toStrictEqual([
          expect.objectContaining({
            contextWithCwdPackage: expect.objectContaining({
              codecovFlag: `package.${currentBranch}_${package_.id}`
            })
          })
        ]);
      }

      expect(adder.mock.calls).toHaveLength(pkgs.length);
    }

    {
      const adder = jest.fn();

      await generatePerPackageAssets(
        {
          ...dummyContext,
          projectMetadata: dummyProjectMetadata,
          asset: 'dummy',
          scope: DefaultGlobalScope.Unlimited
        },
        adder,
        { includeRootPackageInNonHybridMonorepo: true }
      );

      for (const package_ of [rootPackage, ...pkgs]) {
        expect(
          adder.mock.calls.find(
            ([
              {
                package_: { root }
              }
            ]) => root === package_.root
          )
        ).toStrictEqual([
          expect.objectContaining({
            contextWithCwdPackage: expect.objectContaining({
              codecovFlag: `package.${
                currentBranch
              }_${'id' in package_ ? package_.id : 'root'}`
            })
          })
        ]);
      }

      expect(adder.mock.calls).toHaveLength(pkgs.length + 1);
    }
  });

  it('returns empty array when adder function returns void', async () => {
    expect.hasAssertions();

    await expect(
      generatePerPackageAssets(
        {
          ...dummyContext,
          asset: 'dummy'
        },
        () => undefined
      )
    ).resolves.toBeEmpty();
  });
});

describe('::generateRootOnlyAssets', () => {
  it('calls adder function only when scope=unlimited or cwdPackage is the root package', async () => {
    expect.hasAssertions();

    {
      const dummyProjectMetadata = dummyToProjectMetadata(
        'goodPolyrepo'
      ) as TransformerContext['projectMetadata'];

      const adder = jest.fn();

      await generateRootOnlyAssets(
        { ...dummyContext, projectMetadata: dummyProjectMetadata, asset: 'dummy' },
        adder
      );

      expect(adder.mock.calls).toStrictEqual([
        [
          {
            package_: expect.objectContaining({
              root: dummyProjectMetadata.rootPackage.root
            })
          }
        ]
      ]);
    }

    {
      const dummyProjectMetadata = dummyToProjectMetadata(
        'goodPolyrepo'
      ) as TransformerContext['projectMetadata'];

      const adder = jest.fn();

      await generateRootOnlyAssets(
        {
          ...dummyContext,
          projectMetadata: dummyProjectMetadata,
          asset: 'dummy',
          scope: DefaultGlobalScope.ThisPackage
        },
        adder
      );

      expect(adder.mock.calls).toStrictEqual([
        [
          {
            package_: expect.objectContaining({
              root: dummyProjectMetadata.rootPackage.root
            })
          }
        ]
      ]);
    }

    {
      const dummyProjectMetadata = dummyToProjectMetadata(
        'goodHybridrepo'
      ) as TransformerContext['projectMetadata'];

      const adder = jest.fn();

      await generateRootOnlyAssets(
        { ...dummyContext, projectMetadata: dummyProjectMetadata, asset: 'dummy' },
        adder
      );

      expect(adder.mock.calls).toStrictEqual([
        [
          {
            package_: expect.objectContaining({
              root: dummyProjectMetadata.rootPackage.root
            })
          }
        ]
      ]);
    }

    {
      const dummyProjectMetadata = dummyToProjectMetadata(
        'goodHybridrepo'
      ) as TransformerContext['projectMetadata'];

      const adder = jest.fn();

      await generateRootOnlyAssets(
        {
          ...dummyContext,
          projectMetadata: dummyProjectMetadata,
          asset: 'dummy',
          scope: DefaultGlobalScope.ThisPackage
        },
        adder
      );

      expect(adder.mock.calls).toStrictEqual([
        [
          {
            package_: expect.objectContaining({
              root: dummyProjectMetadata.rootPackage.root
            })
          }
        ]
      ]);
    }

    {
      const dummyProjectMetadata = dummyToProjectMetadata(
        'goodHybridrepo',
        'private'
      ) as TransformerContext['projectMetadata'];

      const adder = jest.fn();

      await generateRootOnlyAssets(
        {
          ...dummyContext,
          projectMetadata: dummyProjectMetadata,
          asset: 'dummy',
          scope: DefaultGlobalScope.ThisPackage
        },
        adder
      );

      expect(adder).not.toHaveBeenCalled();
    }

    {
      const dummyProjectMetadata = dummyToProjectMetadata(
        'goodMonorepo'
      ) as TransformerContext['projectMetadata'];

      const adder = jest.fn();

      await generateRootOnlyAssets(
        { ...dummyContext, projectMetadata: dummyProjectMetadata, asset: 'dummy' },
        adder
      );

      expect(adder.mock.calls).toStrictEqual([
        [
          {
            package_: expect.objectContaining({
              root: dummyProjectMetadata.rootPackage.root
            })
          }
        ]
      ]);
    }

    {
      const dummyProjectMetadata = dummyToProjectMetadata(
        'goodMonorepo'
      ) as TransformerContext['projectMetadata'];

      const adder = jest.fn();

      await generateRootOnlyAssets(
        {
          ...dummyContext,
          projectMetadata: dummyProjectMetadata,
          asset: 'dummy',
          scope: DefaultGlobalScope.ThisPackage
        },
        adder
      );

      expect(adder.mock.calls).toStrictEqual([
        [
          {
            package_: expect.objectContaining({
              root: dummyProjectMetadata.rootPackage.root
            })
          }
        ]
      ]);
    }

    {
      const dummyProjectMetadata = dummyToProjectMetadata(
        'goodMonorepo',
        'pkg-1'
      ) as TransformerContext['projectMetadata'];

      const adder = jest.fn();

      await generateRootOnlyAssets(
        {
          ...dummyContext,
          projectMetadata: dummyProjectMetadata,
          asset: 'dummy',
          scope: DefaultGlobalScope.ThisPackage
        },
        adder
      );

      expect(adder).not.toHaveBeenCalled();
    }
  });

  it('returns empty array when adder function returns void', async () => {
    expect.hasAssertions();

    await expect(
      generateRootOnlyAssets(
        {
          ...dummyContext,
          asset: 'dummy'
        },
        () => undefined
      )
    ).resolves.toBeEmpty();
  });
});

async function expectAssetsToMatchSnapshots(
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
        // eslint-disable-next-line no-await-in-loop
        replaceDynamicValuesWithStableStrings(await asset())
    ).toMatchSnapshot(key);
  }
}

function replaceDynamicValuesWithStableStrings(str: string | symbol) {
  return String(str).replaceAll(
    /"@-xun\/symbiote": "[^"]+"/g,
    '"@-xun/symbiote": "<latest>"'
  );
}

async function toAssetsMap(assets: ReifiedAssets | Asset[]) {
  const entries = Array.isArray(assets)
    ? assets.map(({ path, generate }) => [path, generate] as const)
    : Object.entries(assets);

  return Object.fromEntries(
    await Promise.all(entries.map(async ([k, v]) => [k, await v()]))
  );
}

function makeDummyPathFunctions({
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
