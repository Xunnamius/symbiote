import { type Jsonifiable } from 'type-fest';

import { LogTag } from 'multiverse+cli-utils:logging.ts';

import {
  isRootPackage,
  ProjectAttribute,
  WorkspaceAttribute,
  type Package,
  type XPackageJson,
  type XPackageJsonHybridrepoRoot,
  type XPackageJsonMonorepoRoot,
  type XPackageJsonPolyrepoRoot,
  type XPackageJsonSubRoot
} from 'multiverse+project-utils:analyze/common.ts';

import { generatePackageJsonEngineMaintainedNodeVersions } from 'multiverse+project-utils:analyze/generate-package-json-engine-maintained-node-versions.ts';
import { ProjectError } from 'multiverse+project-utils:error.ts';

import {
  packageJsonConfigPackageBase,
  toRelativePath,
  type AbsolutePath,
  type RelativePath
} from 'multiverse+project-utils:fs.ts';

import { version as symbioteVersion } from 'rootverse:package.json';

import {
  AssetPreset,
  assetPresets,
  compileTemplateInMemory,
  definedNonBasicAssetPresets,
  generatePerPackageAssets,
  makeTransformer,
  type TransformerContext
} from 'universe:assets.ts';

import { DefaultGlobalScope } from 'universe:configure.ts';
import { ErrorMessage } from 'universe:error.ts';
import { stringifyJson } from 'universe:util.ts';

export type GeneratorParameters = [
  json: Package['json'] &
    Required<Pick<Package['json'], 'name' | 'version' | 'description'>>,
  isHybridrepo: boolean,
  repoUrl: string,
  projectRelativePackageRoot: RelativePath | undefined,
  preset: AssetPreset | undefined
];

// ! Can never use the global (g) flag
export const githubUrlRegExp = /github.com\/([^/]+)\/([^/]+?)(?:\.git)?$/;

export function generateBaseXPackageJson(
  ...[
    incomingPackageJson,
    _,
    repoUrl,
    projectRelativePackageRoot,
    preset
  ]: GeneratorParameters
) {
  const packagePrefix = projectRelativePackageRoot
    ? `/${projectRelativePackageRoot}`
    : '';

  const binName = incomingPackageJson.name.split('/').at(-1)!;

  return {
    ...incomingPackageJson,
    name: incomingPackageJson.name,
    version: incomingPackageJson.version,
    description: incomingPackageJson.description,
    keywords: incomingPackageJson.keywords || [],
    homepage: `${repoUrl}${packagePrefix ? `/tree/main${packagePrefix}` : ''}#readme`,
    bugs: {
      url: `${repoUrl}/issues`
    },
    repository: deriveJsonRepositoryValue(repoUrl),
    license: incomingPackageJson.license ?? 'MIT',
    author: incomingPackageJson.author ?? 'Xunnamius',
    sideEffects: incomingPackageJson.sideEffects ?? false,
    type: incomingPackageJson.type ?? 'commonjs',
    exports: incomingPackageJson.exports ?? {
      // ? CLI scope has its own exports entries
      ...(preset === AssetPreset.Cli
        ? {
            '.': {
              types: `./dist${packagePrefix}/src/cli.d.ts`,
              default: `./dist${packagePrefix}/src/cli.js`
            },
            './commands/*': {
              types: `./dist${packagePrefix}/src/commands/*.d.ts`,
              default: `./dist${packagePrefix}/src/commands/*.js`
            },
            './configure': {
              types: `./dist${packagePrefix}/src/configure.d.ts`,
              default: `./dist${packagePrefix}/src/configure.js`
            }
          }
        : {
            '.': {
              types: `./dist${packagePrefix}/src/index.d.ts`,
              default: `./dist${packagePrefix}/src/index.js`
            }
          }),
      './package': './package.json',
      './package.json': './package.json'
    },
    typesVersions: incomingPackageJson.typesVersions ?? {
      '*': {
        // ? CLI scope has its own typesVersions entries
        ...(preset === AssetPreset.Cli
          ? {
              index: [`dist${packagePrefix}/src/cli.d.ts`],
              'commands/*': [`dist${packagePrefix}/src/commands/*.d.ts`],
              configure: [`dist${packagePrefix}/src/configure.d.ts`]
            }
          : { index: [`dist${packagePrefix}/src/index.d.ts`] }),
        package: ['package.json']
      }
    },
    // ? CLI scope gets a "bin" field with proper value (always an object)
    ...(preset === AssetPreset.Cli
      ? {
          bin: {
            [binName]:
              typeof incomingPackageJson.bin === 'string'
                ? incomingPackageJson.bin
                : `./dist${packagePrefix}/src/cli.js`,
            ...(typeof incomingPackageJson.bin === 'string'
              ? {}
              : incomingPackageJson.bin)
          }
        }
      : {}),
    files: incomingPackageJson.files ?? [
      '/dist',
      '/LICENSE',
      '/package.json',
      '/README.md'
    ],
    scripts: {
      build: 'npm run build:dist --',
      'build:changelog': 'NODE_NO_WARNINGS=1 symbiote build changelog',
      'build:dist': 'NODE_NO_WARNINGS=1 symbiote build distributables',
      'build:docs': 'NODE_NO_WARNINGS=1 symbiote build docs',
      clean: 'NODE_NO_WARNINGS=1 symbiote clean',
      format: 'NODE_NO_WARNINGS=1 symbiote format --hush',
      info: 'NODE_NO_WARNINGS=1 symbiote project info',
      lint: 'npm run lint:package --',
      'lint:package': 'NODE_NO_WARNINGS=1 symbiote lint',
      'lint:packages': `NODE_NO_WARNINGS=1 symbiote lint --scope ${DefaultGlobalScope.Unlimited}`,
      'lint:project': 'NODE_NO_WARNINGS=1 symbiote project lint',
      'list-tasks': `NODE_NO_WARNINGS=1 symbiote list-tasks --scope ${DefaultGlobalScope.ThisPackage}`,
      prepare: 'NODE_NO_WARNINGS=1 symbiote project prepare',
      release: 'NODE_NO_WARNINGS=1 symbiote release',
      renovate: `NODE_NO_WARNINGS=1 symbiote project renovate --hush --github-reconfigure-repo --regenerate-assets --assets-preset '${assetPresets.join(' ')}'`,
      start: 'NODE_NO_WARNINGS=1 symbiote start --',
      test: 'npm run test:package:unit --',
      'test:package:all': 'NODE_NO_WARNINGS=1 symbiote test --coverage',
      'test:package:e2e': 'NODE_NO_WARNINGS=1 symbiote test --tests end-to-end',
      'test:package:integration': 'NODE_NO_WARNINGS=1 symbiote test --tests integration',
      'test:package:unit': 'NODE_NO_WARNINGS=1 symbiote test --tests unit',
      'test:packages:all': `NODE_NO_WARNINGS=1 symbiote test --scope ${DefaultGlobalScope.Unlimited} --coverage`,
      ...incomingPackageJson.scripts
    },
    engines: incomingPackageJson.engines ?? {
      node: generatePackageJsonEngineMaintainedNodeVersions({ format: 'engines' })
    },
    publishConfig: {
      access: 'public',
      registry: 'https://registry.npmjs.org',
      ...incomingPackageJson.publishConfig
    }
  } as const satisfies XPackageJson;
}

// * For the ROOT PACKAGE in a polyrepo
export function generatePolyrepoXPackageJson(
  ...[
    incomingPackageJson,
    isHybridrepo,
    repoUrl,
    projectRelativePackageRoot,
    preset
  ]: GeneratorParameters
) {
  return {
    ...generateBaseXPackageJson(
      incomingPackageJson,
      isHybridrepo,
      repoUrl,
      projectRelativePackageRoot,
      preset
    ),
    dependencies: incomingPackageJson.dependencies ?? {},
    devDependencies: incomingPackageJson.devDependencies ?? {
      '@-xun/symbiote': `^${symbioteVersion}`
    }
  } as const satisfies XPackageJsonPolyrepoRoot;
}

// * For the ROOT PACKAGE in a non-hybrid monorepo
export function generateNonHybridMonorepoProjectXPackageJson(
  ...[
    incomingPackageJson,
    isHybridrepo,
    repoUrl,
    projectRelativePackageRoot,
    preset
  ]: GeneratorParameters
) {
  // ? Filter out what's not allowed in non-hybrid monorepo root package.json
  const {
    // ? Can't have a bare lint/build/test/release script because Turbo will try
    // ? to run it, which we don't want in a non-hybrid monorepo context.
    scripts: {
      build: _1,
      'build:changelog': _2,
      'build:dist': _3,
      'build:docs': _4,
      lint: _13,
      'lint:package': _6,
      // 'list-tasks': is overwritten below
      release: _12,
      test: _14,
      'test:package:all': _7,
      'test:package:e2e': _8,
      'test:package:integration': _9,
      'test:package:unit': _10,
      ...incomingBaseScripts
    },
    dependencies: _11,
    ...incomingBaseJson
  } = generateBaseXPackageJson(
    incomingPackageJson,
    isHybridrepo,
    repoUrl,
    projectRelativePackageRoot,
    preset
  );

  const scopeUnlimitedArg = ` --scope ${DefaultGlobalScope.Unlimited}`;
  incomingBaseScripts.clean += scopeUnlimitedArg;
  incomingBaseScripts.format += scopeUnlimitedArg;

  return {
    devDependencies: {},
    workspaces: incomingPackageJson.workspaces ?? ['packages/*', '!packages/*.ignore*'],
    ...incomingBaseJson,
    name: incomingPackageJson.name.endsWith('-monorepo')
      ? incomingPackageJson.name
      : `${incomingPackageJson.name}-monorepo`,
    version: incomingPackageJson.version.endsWith('-monorepo')
      ? incomingPackageJson.version
      : `${incomingPackageJson.version}-monorepo`,
    private: true,
    scripts: {
      ...incomingBaseScripts,
      'list-tasks': `NODE_NO_WARNINGS=1 symbiote list-tasks${scopeUnlimitedArg}`,
      'turbo:init': `NODE_NO_WARNINGS=1 symbiote project renovate --hush --regenerate-assets --assets-preset '${AssetPreset.TurboOnly}'`
    }
  } as const satisfies XPackageJsonMonorepoRoot;
}

// * For the ROOT PACKAGE in a hybrid monorepo
export function generateHybridrepoProjectXPackageJson(
  ...[
    incomingPackageJson,
    isHybridrepo,
    repoUrl,
    projectRelativePackageRoot,
    preset
  ]: GeneratorParameters
) {
  const { private: _, ...incomingMonorepoJson } =
    generateNonHybridMonorepoProjectXPackageJson(
      incomingPackageJson,
      isHybridrepo,
      repoUrl,
      projectRelativePackageRoot,
      preset
    );

  return {
    ...incomingMonorepoJson,
    ...generatePolyrepoXPackageJson(
      incomingPackageJson,
      isHybridrepo,
      repoUrl,
      projectRelativePackageRoot,
      preset
    )
    // ? "private" is preserved from generatePolyrepoXPackageJson
  } as const satisfies XPackageJsonHybridrepoRoot;
}

// * For non-root packages within a monorepo/hybridrepo
export function generateSubRootXPackageJson(
  ...[
    incomingPackageJson,
    isHybridrepo,
    repoUrl,
    projectRelativePackageRoot,
    preset
  ]: GeneratorParameters
) {
  // ? Filter out what's not allowed in sub-root package.json
  const {
    scripts: { prepare: _1, renovate: _2, release, build, ...incomingBaseScripts },
    ...incomingBaseJson
  } = generateBaseXPackageJson(
    incomingPackageJson,
    isHybridrepo,
    repoUrl,
    projectRelativePackageRoot,
    preset
  );

  return {
    ...incomingBaseJson,
    // ? Hybridrepo non-root packages should not be built, released, or marked
    // ? non-private since they're temporary and meant to be moved into their
    // ? own repos eventually. But they still retain "build:dist" just in case
    scripts: { ...incomingBaseScripts, ...(!isHybridrepo ? { build, release } : {}) },
    ...(isHybridrepo ? { private: true } : {})
  } as const satisfies XPackageJsonSubRoot;
}

/**
 * Takes an {@link XPackageJson} instance and returns the repository owner and
 * name or throws if said information is not derivable.
 */
export function parsePackageJsonRepositoryIntoOwnerAndRepo({
  repository,
  name
}: XPackageJson) {
  if (repository) {
    const target = typeof repository === 'string' ? repository : repository.url;
    const match = target.match(githubUrlRegExp);

    if (match) {
      const [, owner, repo] = match;
      return { owner, repo };
    }
  }

  throw new ProjectError(ErrorMessage.BadRepositoryInPackageJson(name));
}

/**
 * Takes a `repoUrl` and returns a {@link XPackageJson.repository} non-primitive
 * object.
 */
export function deriveJsonRepositoryValue(repoUrl: string) {
  return {
    type: 'git',
    url: `git+${repoUrl}.git`
  } satisfies NonNullable<XPackageJson['repository']>;
}

/**
 * Takes an `owner` and a `repo` and returns a URL pointing to a GitHub
 * repository.
 */
export function deriveGitHubUrl({
  owner,
  repo
}: ReturnType<typeof parsePackageJsonRepositoryIntoOwnerAndRepo>) {
  return `https://github.com/${owner}/${repo}`;
}

export const { transformer } = makeTransformer(function (context) {
  const {
    toProjectAbsolutePath,
    forceOverwritePotentiallyDestructive,
    projectMetadata: {
      rootPackage: { attributes: projectAttributes, root: projectRoot }
    },
    log,
    scope,
    // ! We use our own assetPreset in addition to this one
    assetPreset: incomingAssetPreset,
    debug
  } = context;

  // * Do not generate any files when using the "wrong" preset
  if (definedNonBasicAssetPresets.includes(incomingAssetPreset)) {
    return [];
  }

  // * Every package gets these files, including non-hybrid monorepo roots
  return generatePerPackageAssets(
    context,
    function ({ package_, contextWithCwdPackage }) {
      const { json: packageJson, attributes: packageAttributes } = package_;

      const isPackageTheRootPackage = isRootPackage(package_);

      const ownerAndRepo = parsePackageJsonRepositoryIntoOwnerAndRepo(packageJson);
      const repoUrl = deriveGitHubUrl(ownerAndRepo);

      const isHybridrepo = !!projectAttributes[ProjectAttribute.Hybridrepo];
      const isNonHybridMonorepoRootPackage =
        isPackageTheRootPackage &&
        projectAttributes[ProjectAttribute.Monorepo] &&
        !isHybridrepo;

      const assetPreset =
        scope === DefaultGlobalScope.ThisPackage || isPackageTheRootPackage
          ? incomingAssetPreset
          : // ? Sub-roots default to a lib-type package.json in unlimited scope
            packageAttributes[WorkspaceAttribute.Cli]
            ? AssetPreset.Cli
            : packageAttributes[WorkspaceAttribute.Esm]
              ? AssetPreset.LibEsm
              : AssetPreset.Lib;

      const projectRelativePackageRoot = isPackageTheRootPackage
        ? undefined
        : package_.relativeRoot;

      debug('isNonHybridMonorepoRootPackage: %O', isNonHybridMonorepoRootPackage);
      debug('guessed assetPreset: %O', assetPreset);
      debug('projectRelativePackageRoot: %O', assetPreset);

      const finalPackageJson = {
        ...(forceOverwritePotentiallyDestructive
          ? // * Always provisionally preserve some minimum "base" fields
            {
              ...(packageJson.private ? { private: true } : {}),
              ...(packageJson.sideEffects ? { sideEffects: true } : {}),
              ...(packageJson.keywords ? { keywords: packageJson.keywords } : {}),
              ...(packageJson.dependencies
                ? { dependencies: packageJson.dependencies }
                : {}),
              ...(packageJson.devDependencies
                ? { devDependencies: packageJson.devDependencies }
                : {}),
              ...(packageJson.peerDependencies
                ? { peerDependencies: packageJson.peerDependencies }
                : {}),
              ...(packageJson.peerDependenciesMeta
                ? { peerDependenciesMeta: packageJson.peerDependenciesMeta }
                : {}),
              ...(packageJson.bundleDependencies || packageJson.bundledDependencies
                ? {
                    bundledDependencies: (packageJson.bundleDependencies || []).concat(
                      packageJson.bundledDependencies || []
                    )
                  }
                : {}),
              ...(packageJson.optionalDependencies
                ? { optionalDependencies: packageJson.optionalDependencies }
                : {})
            }
          : packageJson),
        name: packageJson.name,
        version:
          packageJson.version ??
          (isNonHybridMonorepoRootPackage ? '0.0.0-monorepo' : '1.0.0'),
        description:
          packageJson.description ??
          (isNonHybridMonorepoRootPackage
            ? 'Monorepo for the {{repoName}} project'
            : 'TODO: set a description')
      } satisfies Parameters<typeof generateBaseXPackageJson>[0];

      if (projectAttributes[ProjectAttribute.Polyrepo]) {
        const path = toProjectAbsolutePath(packageJsonConfigPackageBase);

        return [
          {
            path,
            generate: function () {
              maybeIssueBreakingChangeWarning(path);

              return stringify(
                generatePolyrepoXPackageJson(
                  finalPackageJson,
                  isHybridrepo,
                  repoUrl,
                  projectRelativePackageRoot,
                  assetPreset
                ),
                contextWithCwdPackage
              );
            }
          }
        ];
      } else {
        const relativeRoot = 'relativeRoot' in package_ ? package_.relativeRoot : '';
        const path = toProjectAbsolutePath(relativeRoot, packageJsonConfigPackageBase);

        if (isPackageTheRootPackage) {
          return isHybridrepo
            ? [
                {
                  path,
                  generate: function () {
                    maybeIssueBreakingChangeWarning(path);

                    return stringify(
                      generateHybridrepoProjectXPackageJson(
                        finalPackageJson,
                        isHybridrepo,
                        repoUrl,
                        projectRelativePackageRoot,
                        assetPreset
                      ),
                      contextWithCwdPackage
                    );
                  }
                }
              ]
            : [
                {
                  path,
                  generate: function () {
                    maybeIssueBreakingChangeWarning(path);

                    return stringify(
                      generateNonHybridMonorepoProjectXPackageJson(
                        finalPackageJson,
                        isHybridrepo,
                        repoUrl,
                        projectRelativePackageRoot,
                        assetPreset
                      ),
                      contextWithCwdPackage
                    );
                  }
                }
              ];
        } else {
          return [
            {
              path,
              generate: function () {
                maybeIssueBreakingChangeWarning(path);

                return stringify(
                  generateSubRootXPackageJson(
                    finalPackageJson,
                    isHybridrepo,
                    repoUrl,
                    projectRelativePackageRoot,
                    assetPreset
                  ),
                  contextWithCwdPackage
                );
              }
            }
          ];
        }
      }

      function maybeIssueBreakingChangeWarning(packageJsonPath: AbsolutePath) {
        if (forceOverwritePotentiallyDestructive && packageJson.engines) {
          log.warn(
            [LogTag.IF_NOT_QUIETED],
            'An "engines" field was written out to: %O\n💥 THIS IS LIKELY A BREAKING CHANGE! COMMIT OR UNDO ACCORDINGLY! 💥',
            toRelativePath(projectRoot, packageJsonPath)
          );
        }
      }
    },
    { includeRootPackageInNonHybridMonorepo: true }
  );
});

function stringify(o: Jsonifiable, context: TransformerContext) {
  return compileTemplateInMemory(stringifyJson(o), context);
}
