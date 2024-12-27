import { type Jsonifiable } from 'type-fest';

import {
  isRootPackage,
  ProjectAttribute,
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
  type RelativePath
} from 'multiverse+project-utils:fs.ts';

import { version as symbioteVersion } from 'rootverse:package.json';

import {
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
  repoUrl: string,
  projectRelativePackageRoot: RelativePath | undefined
];

// ! Can never use the global (g) flag
export const githubUrlRegExp = /github.com\/([^/]+)\/([^/]+?)(?:\.git)?$/;

export function generateBaseXPackageJson(
  ...[incomingPackageJson, repoUrl, projectRelativePackageRoot]: GeneratorParameters
) {
  const packagePrefix = projectRelativePackageRoot
    ? `/${projectRelativePackageRoot}`
    : '';

  return {
    ...incomingPackageJson,
    name: incomingPackageJson.name,
    version: incomingPackageJson.version,
    description: incomingPackageJson.description,
    keywords: incomingPackageJson.keywords || [],
    homepage: `${repoUrl}${packagePrefix}#readme`,
    bugs: {
      url: `${repoUrl}/issues`
    },
    repository: deriveJsonRepositoryValue(repoUrl),
    license: incomingPackageJson.license ?? 'MIT',
    author: incomingPackageJson.author ?? 'Xunnamius',
    sideEffects: incomingPackageJson.sideEffects ?? false,
    type: incomingPackageJson.type ?? 'commonjs',
    exports: incomingPackageJson.exports ?? {
      '.': {
        types: `./dist${packagePrefix}/src/index.d.ts`,
        default: `./dist${packagePrefix}/src/index.js`
      },
      './package': './package.json',
      './package.json': './package.json'
    },
    typesVersions: incomingPackageJson.typesVersions ?? {
      '*': {
        index: [`dist${packagePrefix}/src/index.d.ts`],
        package: ['package.json']
      }
    },
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
      renovate: `NODE_NO_WARNINGS=1 symbiote project renovate --github-reconfigure-repo --regenerate-assets --assets-preset '<you must set a preset in the package.json script>'`,
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
  ...[incomingPackageJson, repoUrl, projectRelativePackageRoot]: GeneratorParameters
) {
  return {
    ...generateBaseXPackageJson(
      incomingPackageJson,
      repoUrl,
      projectRelativePackageRoot
    ),
    dependencies: incomingPackageJson.dependencies ?? {},
    devDependencies: incomingPackageJson.devDependencies ?? {
      '@-xun/symbiote': `^${symbioteVersion}`
    }
  } as const satisfies XPackageJsonPolyrepoRoot;
}

// * For the ROOT PACKAGE in a non-hybrid monorepo
export function generateNonHybridMonorepoProjectXPackageJson(
  ...[incomingPackageJson, repoUrl, projectRelativePackageRoot]: GeneratorParameters
) {
  // ? Filter out what's not allowed in non-hybrid monorepo root package.json
  const {
    scripts: {
      build: _1,
      'build:changelog': _2,
      'build:dist': _3,
      'build:docs': _4,
      'lint:package': _6,
      release: _12,
      'test:package:all': _7,
      'test:package:e2e': _8,
      'test:package:integration': _9,
      'test:package:unit': _10,
      ...incomingBaseScripts
    },
    dependencies: _11,
    ...incomingBaseJson
  } = generateBaseXPackageJson(incomingPackageJson, repoUrl, projectRelativePackageRoot);

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
      lint: 'npm run lint:packages --',
      'list-tasks': `NODE_NO_WARNINGS=1 symbiote list-tasks${scopeUnlimitedArg}`,
      test: 'npm run test:packages:all --'
    }
  } as const satisfies XPackageJsonMonorepoRoot;
}

// * For the ROOT PACKAGE in a hybrid monorepo
export function generateHybridrepoProjectXPackageJson(
  ...[incomingPackageJson, repoUrl, projectRelativePackageRoot]: GeneratorParameters
) {
  const { private: _, ...incomingMonorepoJson } =
    generateNonHybridMonorepoProjectXPackageJson(
      incomingPackageJson,
      repoUrl,
      projectRelativePackageRoot
    );

  return {
    ...incomingMonorepoJson,
    ...generatePolyrepoXPackageJson(
      incomingPackageJson,
      repoUrl,
      projectRelativePackageRoot
    )
    // ? "private" is preserved from generatePolyrepoXPackageJson
  } as const satisfies XPackageJsonHybridrepoRoot;
}

// * For non-root packages within a monorepo/hybridrepo
export function generateSubRootXPackageJson(
  ...[incomingPackageJson, repoUrl, projectRelativePackageRoot]: GeneratorParameters
) {
  // ? Filter out what's not allowed in sub-root package.json
  const {
    scripts: { prepare: _1, renovate: _2, ...incomingBaseScripts },
    ...incomingBaseJson
  } = generateBaseXPackageJson(incomingPackageJson, repoUrl, projectRelativePackageRoot);

  return {
    ...incomingBaseJson,
    scripts: incomingBaseScripts
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
      rootPackage: { attributes: projectAttributes }
    }
  } = context;

  // * Every package gets these files, including non-hybrid monorepo roots
  return generatePerPackageAssets(
    context,
    function ({ package_, contextWithCwdPackage }) {
      const { json: packageJson } = package_;

      const isPackageTheRootPackage = isRootPackage(package_);

      const ownerAndRepo = parsePackageJsonRepositoryIntoOwnerAndRepo(packageJson);
      const repoUrl = deriveGitHubUrl(ownerAndRepo);

      const isNonHybridMonorepoRootPackage =
        isPackageTheRootPackage &&
        projectAttributes[ProjectAttribute.Monorepo] &&
        !projectAttributes[ProjectAttribute.Hybridrepo];

      const projectRelativePackageRoot = isPackageTheRootPackage
        ? undefined
        : package_.relativeRoot;

      const finalPackageJson = {
        ...(forceOverwritePotentiallyDestructive
          ? // * Always provisionally preserve some minimum "base" fields
            {
              ...(packageJson.private ? { private: true } : {}),
              ...(packageJson.keywords ? { keywords: packageJson.keywords } : {}),
              ...(packageJson.dependencies
                ? { dependencies: packageJson.dependencies }
                : {}),
              ...(packageJson.devDependencies
                ? { devDependencies: packageJson.devDependencies }
                : {}),
              ...(packageJson.peerDependencies
                ? { peerDependencies: packageJson.peerDependencies }
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
        return [
          {
            path: toProjectAbsolutePath(packageJsonConfigPackageBase),
            generate: () =>
              stringify(
                generatePolyrepoXPackageJson(
                  finalPackageJson,
                  repoUrl,
                  projectRelativePackageRoot
                ),
                contextWithCwdPackage
              )
          }
        ];
      } else {
        const relativeRoot = 'relativeRoot' in package_ ? package_.relativeRoot : '';

        if (isPackageTheRootPackage) {
          return projectAttributes[ProjectAttribute.Hybridrepo]
            ? [
                {
                  path: toProjectAbsolutePath(
                    relativeRoot,
                    packageJsonConfigPackageBase
                  ),
                  generate: () =>
                    stringify(
                      generateHybridrepoProjectXPackageJson(
                        finalPackageJson,
                        repoUrl,
                        projectRelativePackageRoot
                      ),
                      contextWithCwdPackage
                    )
                }
              ]
            : [
                {
                  path: toProjectAbsolutePath(
                    relativeRoot,
                    packageJsonConfigPackageBase
                  ),
                  generate: () =>
                    stringify(
                      generateNonHybridMonorepoProjectXPackageJson(
                        finalPackageJson,
                        repoUrl,
                        projectRelativePackageRoot
                      ),
                      contextWithCwdPackage
                    )
                }
              ];
        } else {
          return [
            {
              path: toProjectAbsolutePath(relativeRoot, packageJsonConfigPackageBase),
              generate: () =>
                stringify(
                  generateSubRootXPackageJson(
                    finalPackageJson,
                    repoUrl,
                    projectRelativePackageRoot
                  ),
                  contextWithCwdPackage
                )
            }
          ];
        }
      }
    },
    { includeRootPackageInNonHybridMonorepo: true }
  );
});

function stringify(o: Jsonifiable, context: TransformerContext) {
  return compileTemplateInMemory(stringifyJson(o), context);
}
