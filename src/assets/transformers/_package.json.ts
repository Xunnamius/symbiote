import semver from 'semver';
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
  directoryPackagesProjectBase,
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
    bugs: { url: `${repoUrl}/issues` },
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
      'build:changelog': 'symbiote build changelog --env NODE_NO_WARNINGS=1',
      'build:dist':
        'symbiote build distributables --env NODE_NO_WARNINGS=1 --not-multiversal',
      'build:docs': 'symbiote build docs --env NODE_NO_WARNINGS=1',
      'build:topological':
        'symbiote project topology --run build --env NODE_NO_WARNINGS=1',
      clean: 'symbiote clean --env NODE_NO_WARNINGS=1',
      format: 'symbiote format --env NODE_NO_WARNINGS=1 --hush',
      info: 'symbiote project info --env NODE_NO_WARNINGS=1',
      lint: 'npm run lint:package --',
      'lint:package': 'symbiote lint --env NODE_NO_WARNINGS=1 --hush',
      'lint:packages': `symbiote lint --env NODE_NO_WARNINGS=1 --hush --scope ${DefaultGlobalScope.Unlimited}`,
      'lint:project': 'symbiote project lint --env NODE_NO_WARNINGS=1',
      'lint:topological':
        'symbiote project topology --run lint --env NODE_NO_WARNINGS=1',
      'list-tasks': `symbiote list-tasks --env NODE_NO_WARNINGS=1 --scope ${DefaultGlobalScope.ThisPackage}`,
      prepare: 'symbiote project prepare --env NODE_NO_WARNINGS=1',
      release: 'symbiote release --env NODE_NO_WARNINGS=1',
      'release:topological':
        'symbiote project topology --run release --env NODE_NO_WARNINGS=1',
      renovate: `symbiote project renovate --env NODE_NO_WARNINGS=1 --github-reconfigure-repo --regenerate-assets --assets-preset '${assetPresets.join(' ')}'`,
      'renovate:aliases': `symbiote project renovate --env NODE_NO_WARNINGS=1 --regenerate-assets --assets-preset '${assetPresets.join(' ')}' --only-aliases`,
      start: 'symbiote start --env NODE_NO_WARNINGS=1 --',
      test: 'npm run test:package:unit --',
      'test:package:all': 'symbiote test --env NODE_NO_WARNINGS=1 --coverage',
      'test:package:e2e': 'symbiote test --env NODE_NO_WARNINGS=1 --tests end-to-end',
      'test:package:integration':
        'symbiote test --env NODE_NO_WARNINGS=1 --tests integration',
      'test:package:unit': 'symbiote test --env NODE_NO_WARNINGS=1 --tests unit',
      'test:packages:all': `symbiote test --env NODE_NO_WARNINGS=1 --scope ${DefaultGlobalScope.Unlimited} --coverage`,
      'test:topological':
        'symbiote project topology --run test --env NODE_NO_WARNINGS=1',
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
  const {
    scripts: {
      'release:topological': _1,
      'build:topological': _2,
      'test:topological': _3,
      'lint:topological': _4,
      ...incomingBaseScripts
    },
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
    scripts: incomingBaseScripts,
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
    scripts: {
      build: _1,
      'build:changelog': _2,
      'build:dist': _3,
      'build:docs': _4,
      // 'clean': is overwritten below
      // 'format': is overwritten below
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
    exports: _15,
    typesVersions: _16,
    files: _17,
    publishConfig: _18,
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
    devDependencies: incomingPackageJson.devDependencies ?? {
      '@-xun/symbiote': `^${symbioteVersion}`
    },
    workspaces: incomingPackageJson.workspaces ?? [
      `${directoryPackagesProjectBase}/*`,
      `!${directoryPackagesProjectBase}/*.ignore*`
    ],
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
      'list-tasks': `symbiote list-tasks --env NODE_NO_WARNINGS=1${scopeUnlimitedArg}`,
      ...incomingPackageJson.scripts
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
  const {
    private: _,
    scripts: monorepoScripts,
    ...incomingMonorepoJson
  } = generateNonHybridMonorepoProjectXPackageJson(
    incomingPackageJson,
    isHybridrepo,
    repoUrl,
    projectRelativePackageRoot,
    preset
  );

  const { scripts: polyrepoScripts, ...incomingPolyrepoJson } =
    generatePolyrepoXPackageJson(
      incomingPackageJson,
      isHybridrepo,
      repoUrl,
      projectRelativePackageRoot,
      preset
    );

  return {
    ...incomingMonorepoJson,
    ...incomingPolyrepoJson,
    scripts: {
      ...monorepoScripts,
      ...polyrepoScripts
    }
    // ? "private" (if given) is preserved from generatePolyrepoXPackageJson
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
    scripts: {
      prepare: _1,
      renovate: _2,
      'renovate:aliases': _7,
      'release:topological': _3,
      'build:topological': _4,
      'test:topological': _5,
      'lint:topological': _6,

      // ? Might get added back later (below)
      build,
      'build:changelog': buildChangelog,
      'build:dist': buildDist,
      // eslint-disable-next-line unicorn/prevent-abbreviations
      'build:docs': buildDocs,
      release,

      ...incomingBaseScripts
    },
    files,
    publishConfig,
    ...incomingBaseJson
  } = generateBaseXPackageJson(
    incomingPackageJson,
    isHybridrepo,
    repoUrl,
    projectRelativePackageRoot,
    preset
  );

  const isPrivate =
    incomingBaseJson.private ||
    (isHybridrepo && semver.lte(incomingPackageJson.version, '0.0.0'));

  return {
    ...(isPrivate ? { private: true } : { publishConfig, files }),
    ...incomingBaseJson,
    scripts: {
      ...(isPrivate
        ? {}
        : {
            build,
            'build:changelog': buildChangelog,
            'build:dist': buildDist,
            'build:docs': buildDocs,
            release
          }),
      ...incomingBaseScripts,
      ...incomingPackageJson.scripts
    }
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
          (isNonHybridMonorepoRootPackage
            ? '0.0.0-monorepo'
            : packageJson.private
              ? '0.0.0-private'
              : '1.0.0'),
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
