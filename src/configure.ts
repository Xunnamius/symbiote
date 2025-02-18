import { defaultVersionTextDescription } from '@-xun/cli';

import {
  makeStandardConfigureErrorHandlingEpilogue,
  makeStandardConfigureExecutionContext
} from '@-xun/cli/configure';

import { toPath } from '@-xun/fs';
import { memoizer } from '@-xun/memoize';

import {
  analyzeProjectStructure,
  directoryDistPackageBase,
  isAccessible
} from '@-xun/project';

import { createDebugLogger, createGenericLogger } from 'rejoinder';

import { version as packageVersion } from 'rootverse:package.json';

import { globalDebuggerNamespace, globalLoggerNamespace } from 'universe:constant.ts';

import type {
  BfeBuilderObject,
  ConfigureErrorHandlingEpilogue,
  ConfigureExecutionContext,
  ConfigureExecutionEpilogue
} from '@-xun/cli';

import type {
  StandardCommonCliArguments,
  StandardExecutionContext
} from '@-xun/cli/extensions';

import type { ProjectMetadata } from '@-xun/project';

import type {
  // ? Used in documentation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  withGlobalBuilder
} from 'universe:util.ts';

const rootGenericLogger = createGenericLogger({ namespace: globalLoggerNamespace });
const rootDebugLogger = createDebugLogger({ namespace: globalDebuggerNamespace });
const cacheDebug = rootDebugLogger.extend('cache');

export { $executionContext } from '@-xun/cli';

export type GlobalExecutionContext = StandardExecutionContext & {
  /**
   * A collection of useful information about the current project. Never
   * includes unnamed workspace packages.
   */
  projectMetadata: ProjectMetadata | undefined;
  /**
   * Whether symbiote is being run from within the current project or from
   * elsewhere in the filesystem.
   */
  isUsingLocalInstallation: boolean;
};

/**
 * Determines which project files are considered within a command's purview.
 * Files outside of a command's purview will be treated by symbiote as if they
 * do not exist where possible.
 *
 * This enum is essentially {@link ThisPackageGlobalScope} +
 * {@link UnlimitedGlobalScope}.
 */
export enum DefaultGlobalScope {
  /**
   * Limit the command to _all_ relevant files contained within the current
   * package (as determined by the current working directory), excluding the
   * files of any other (named) workspace packages. Hence, this scope is only
   * meaningful in a monorepo context.
   *
   * This is the default scope for most commands.
   */
  ThisPackage = 'this-package',
  /**
   * Do not limit or exclude any files by default when running the command.
   *
   * This is useful, for instance, when attempting to manually lint an entire
   * monorepo at once; e.g. `npx symbiote lint --scope=unlimited`.
   */
  Unlimited = 'unlimited'
}

/**
 * This enum represents a subset of {@link DefaultGlobalScope}, and is useful for type
 * checking commands that only operate in the "this-package" scope.
 *
 * @see {@link DefaultGlobalScope}
 */
export enum ThisPackageGlobalScope {
  /**
   * @see {@link DefaultGlobalScope.ThisPackage}
   */
  ThisPackage = 'this-package'
}

/**
 * This enum represents a subset of {@link DefaultGlobalScope}, and is useful for type
 * checking commands that only operate in the "unlimited" scope.
 *
 * @see {@link DefaultGlobalScope}
 */
export enum UnlimitedGlobalScope {
  /**
   * @see {@link DefaultGlobalScope.Unlimited}
   */
  Unlimited = 'unlimited'
}

/**
 * These properties will be available in the `argv` object of any command that
 * uses {@link withGlobalBuilder} to construct its `builder`.
 *
 * This type is manually synchronized with {@link globalCliArguments}, but the
 * keys may differ slightly (e.g. hyphens may be elided in favor of camelCase).
 *
 * @see {@link StandardCommonCliArguments}
 */
export type GlobalCliArguments<Scope extends string = DefaultGlobalScope> =
  StandardCommonCliArguments & {
    scope: Scope;
    env: string[];
  };

/**
 * This {@link BfeBuilderObject} instance describes the CLI arguments available
 * in the `argv` object of any command that uses {@link withGlobalBuilder} to
 * construct its `builder`.
 *
 * This object is manually synchronized with {@link GlobalCliArguments}, but the
 * keys may differ slightly (e.g. hyphens may be elided in favor of camelCase).
 *
 * When providing a custom {@link BfeBuilderObject} instance to
 * {@link withGlobalBuilder}, any key specified in that instance that is also a
 * key in this object (`globalCliArguments`) will have its value merged with the
 * value in this object _instead_ of fully overwriting it. This means you can
 * pass minimal configuration values for the keys that are also in
 * `globalCliArguments` and those values will be merged over the corresponding
 * default configuration value in `globalCliArguments`.
 *
 * @see {@link StandardCommonCliArguments}
 */
export const globalCliArguments = {
  env: {
    string: true,
    array: true,
    default: [],
    description: 'Set cross-platform environment variables using Bourne syntax'
  },
  scope: {
    string: true,
    choices: Object.values(DefaultGlobalScope),
    default: DefaultGlobalScope.ThisPackage,
    description: 'Which files this command will consider when scanning the filesystem'
  }
} satisfies BfeBuilderObject<Record<string, unknown>, StandardExecutionContext>;

export const configureExecutionContext = async function (context) {
  const standardContextFactory = await makeStandardConfigureExecutionContext({
    rootGenericLogger,
    rootDebugLogger
  });

  const standardContext = await standardContextFactory(context);
  const projectMetadata = await analyzeProjectStructure({ useCached: true }).catch(
    () => undefined
  );

  let isUsingLocalInstallation = false;

  if (projectMetadata) {
    const {
      rootPackage: { root: projectRoot }
    } = projectMetadata;

    const rootPackageDistDirPath = toPath(projectRoot, directoryDistPackageBase);
    const nodeModulesDirTsconfigFilePath = toPath(
      projectRoot,
      'node_modules',
      '@-xun',
      'symbiote',
      'tsconfig.json'
    );

    const isRunningFromWithinCurrentProject = __dirname.startsWith(projectRoot);
    const isRunningFromWithinCurrentProjectDistDir =
      !__dirname.includes('/node_modules/') &&
      __dirname.startsWith(rootPackageDistDirPath);

    rootDebugLogger('__dirname: %O', __dirname);
    rootDebugLogger('rootPackageDistDirPath: %O', rootPackageDistDirPath);

    rootDebugLogger(
      'nodeModulesDirTsconfigFilePath: %O',
      nodeModulesDirTsconfigFilePath
    );

    rootDebugLogger(
      'isRunningFromWithinCurrentProject: %O',
      isRunningFromWithinCurrentProject
    );

    rootDebugLogger(
      'isRunningFromWithinCurrentProjectDistDir: %O',
      isRunningFromWithinCurrentProjectDistDir
    );

    standardContext.state.globalVersionOption = {
      name: 'version',
      description: defaultVersionTextDescription,
      // ! INVARIANT: package version must ALWAYS come first and either be
      // ! suffixed with at least one whitespace character or have no other
      // ! characters following it!
      text:
        String(packageVersion) + ` ${isRunningFromWithinCurrentProject ? '🏠' : '🌎'}`
    };

    if (
      isRunningFromWithinCurrentProjectDistDir ||
      // ? ... or look for the existence of a non-distributables file
      (await isAccessible(nodeModulesDirTsconfigFilePath, { useCached: true }))
    ) {
      rootDebugLogger('decision: a dev build is probably running');

      // ? Lets us know when we're loading a custom-built "dev" symbiote.
      // ! INVARIANT: package version must ALWAYS come first and either be
      // ! suffixed with at least one whitespace character or have no other
      // ! characters following it!
      standardContext.state.globalVersionOption.text += ` (dev build @ ${__filename})`;
    } else {
      rootDebugLogger('decision: a non-dev build is probably running');
    }

    isUsingLocalInstallation = isRunningFromWithinCurrentProject;
  } else {
    // ? No project metadata? Probably global.
    standardContext.state.globalVersionOption = {
      name: 'version',
      description: defaultVersionTextDescription,
      // ! INVARIANT: package version must ALWAYS come first and either be
      // ! suffixed with at least one whitespace character or have no other
      // ! characters following it!
      text: String(packageVersion) + ' 🌎'
    };
  }

  rootDebugLogger.message(
    'is using locally installed binary: %O',
    isUsingLocalInstallation
  );

  return {
    ...standardContext,
    projectMetadata,
    isUsingLocalInstallation
  };
} as ConfigureExecutionContext<GlobalExecutionContext>;

export const configureErrorHandlingEpilogue = function (...args) {
  reportFinalCacheStats();
  return makeStandardConfigureErrorHandlingEpilogue()(...args);
} as ConfigureErrorHandlingEpilogue<GlobalExecutionContext>;

export const configureExecutionEpilogue = function (argv) {
  reportFinalCacheStats();
  return argv;
} as ConfigureExecutionEpilogue<GlobalExecutionContext>;

function reportFinalCacheStats() {
  const { clear: _1, get: _2, set: _3, ...stats } = memoizer;
  cacheDebug('final cache stats: %O', stats);
}
