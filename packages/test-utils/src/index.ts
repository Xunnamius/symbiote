/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable unicorn/no-keyword-prefix */
import assert from 'node:assert';
import fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename } from 'node:path';

import { run, type RunOptions, type RunReturnType } from '@-xun/run';
import glob from 'glob';
import { createDebugLogger, type ExtendedDebugger } from 'rejoinder';
import { simpleGit, type SimpleGit } from 'simple-git';
import uniqueFilename from 'unique-filename';

import { webpackConfigProjectBase } from 'multiverse+project-utils:fs/well-known-constants.ts';
import { toAbsolutePath, toPath } from 'multiverse+project-utils:fs.ts';

import {
  name as rootPackageJsonName,
  version as rootPackageJsonVersion
} from 'rootverse:package.json';

import type { LiteralUnion, Promisable } from 'type-fest';

const globalDebug = createDebugLogger({
  namespace: `${rootPackageJsonName}:jest-setup`
});

globalDebug(`rootPackageJsonName: "${rootPackageJsonName}"`);
globalDebug(`rootPackageJsonVersion: "${rootPackageJsonVersion}"`);

// TODO: all of the stuff in this file needs to go into their own packages

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type AnyFunction = (...args: any[]) => unknown;

export function asMockedFunction<
  T extends AnyFunction = never
>(): jest.MockedFunction<T>;
export function asMockedFunction<T extends AnyFunction>(fn: T): jest.MockedFunction<T>;
export function asMockedFunction<T extends AnyFunction>(fn?: T): jest.MockedFunction<T> {
  return (fn ?? jest.fn()) as unknown as jest.MockedFunction<T>;
}

/**
 * This function replaces Jest's `describe`, `test`, and `it` functions in the
 * current file with `describe.skip`, `test.skip`, and `it.skip` if
 * `process.env.SYMBIOTE_TEST_JEST_SKIP_SLOW_TESTS >= 1`. The replaced functions
 * also have a `noskip` method which are aliases for their respective original
 * versions.
 *
 * Essentially, this function changes Jest's execution semantics such that all
 * tests in a given file are skipped by default. Use the `noskip` method to opt
 * a test into always being run.
 *
 * To prevent a file from being executed in its entirety (for example, a test
 * file with hundreds or thousands of tests that still take a noticeable amount
 * of time to skip), include the string `-slow.` in the file's name, e.g.
 * `unit-my-slow.test.ts`, and set
 * `process.env.SYMBIOTE_TEST_JEST_SKIP_SLOW_TESTS >= 2`.
 */
// TODO: import jest-specific globals from package instead of using global scope
// TODO:
// TODO: provide the declaration file that patches noskip into jest globals in
// TODO: the published package (probably within the .d.ts file itself)
export function reconfigureJestGlobalsToSkipTestsInThisFileIfRequested(
  /**
   * Determines which Jest globals are targeted for reconfiguration.
   *
   * By default, only `describe` is reconfigured while `test` and `it` are left
   * alone. This makes it easier to apply `noskip` to a collection of tests, but
   * sometimes it's prudent to reconfigure the other globals as well.
   */
  targets?: {
    /**
     * @default true
     */
    describe?: boolean;
    /**
     * @default false
     */
    test?: boolean;
    /**
     * @default false
     */
    it?: boolean;
  }
) {
  const debug = globalDebug.extend('slow-skip');

  const {
    describe: replaceDescribe = true,
    test: replaceTest = false,
    it: replaceIt = false
  } = targets || {};

  const describe_ = globalThis.describe;
  const test_ = globalThis.test;
  const it_ = globalThis.it;

  if (Number(process.env.SYMBIOTE_TEST_JEST_SKIP_SLOW_TESTS) >= 1) {
    if (replaceDescribe) {
      globalThis.describe = globalThis.describe.skip;
    }

    if (replaceTest) {
      globalThis.test = globalThis.test.skip;
    }

    if (replaceIt) {
      globalThis.it = globalThis.it.skip;
    }

    debug(
      'reconfigured jest global targets (%O) to skip all tests by default: process.env.SYMBIOTE_TEST_JEST_SKIP_SLOW_TESTS (%O) >= 1',
      targets,
      process.env.SYMBIOTE_TEST_JEST_SKIP_SLOW_TESTS
    );
  } else {
    debug(
      'did not reconfigure jest globals: process.env.SYMBIOTE_TEST_JEST_SKIP_SLOW_TESTS (%O) is not >=1',
      process.env.SYMBIOTE_TEST_JEST_SKIP_SLOW_TESTS
    );
  }

  globalThis.describe.noskip = describe_;
  globalThis.test.noskip = test_;
  globalThis.it.noskip = it_;

  debug('patched in noskip alias to all available targets');

  return {
    describe: describe_,
    test: test_,
    it: it_
  };
}

// TODO: automated tests against both Windows and Linux (and for all tooling)

// TODO: consider stripping indents from all writeFiles (perhaps add option)

// TODO: add "all" interleaved output to testResult

// TODO: ensure post-test cleanup ALWAYS happens and dirs/files are NEVER left around

// TODO: combine the files and dir fixtures into one; dirs should be
// TODO: automatically created from file paths and from explicit dir paths too

// TODO: ability to copy entire arbitrary directories recursively into fixture
// TODO: root

// TODO: XXX: make this into a separate (mock-argv) package (along w/ the below)
export type MockArgvOptions = {
  /**
   * By default, the first two elements in `process.argv` are preserved. Setting
   * `replace` to `true` will cause the entire process.argv array to be replaced
   * @default false
   */
  replace?: boolean;
};

// TODO: XXX: make this into a separate (mock-env) package (along w/ the below)
export type MockEnvOptions = {
  /**
   * By default, the `process.env` object is emptied and re-hydrated with
   * `newEnv`. Setting `replace` to `false` will cause `newEnv` to be appended
   * instead
   * @default true
   */
  replace?: boolean;
};

// TODO: make these fs-style functions accessible from the context object
async function writeFile({
  path,
  data,
  context: { debug, root },
  noDebugOutput = false
}: {
  path: string;
  data: string;
  context: FixtureContext;
  noDebugOutput?: boolean;
}) {
  path = toAbsolutePath(root, path);

  if (!noDebugOutput) {
    debug(`writing file: ${path}`);
    debug.extend('contents >')(data);
  }

  return fs.writeFile(path, data);
}

async function readFile({
  path,
  context: { debug, root },
  noDebugOutput = false
}: {
  path: string;
  context: FixtureContext;
  noDebugOutput?: boolean;
}) {
  path = toAbsolutePath(root, path);
  if (!noDebugOutput) {
    debug(`reading file: ${path}`);
  }

  const data = await fs.readFile(path, 'utf8');
  if (!noDebugOutput) {
    debug.extend('contents >')(data);
  }

  return data;
}

async function accessFile({
  path,
  context: { debug, root },
  noDebugOutput = false
}: {
  path: string;
  context: FixtureContext;
  noDebugOutput?: boolean;
}) {
  path = toAbsolutePath(root, path);

  if (!noDebugOutput) {
    debug(`determining accessibility of file: ${path}`);
  }

  return fs.access(path);
}

async function symlink({
  actualPath,
  linkPath,
  isDir = true,
  context: { debug, root },
  noDebugOutput = false
}: {
  actualPath: string;
  linkPath: string;
  isDir: boolean;
  context: FixtureContext;
  noDebugOutput?: boolean;
}) {
  actualPath = toAbsolutePath(root, actualPath);
  linkPath = toAbsolutePath(root, linkPath);

  if (!noDebugOutput) {
    debug(
      `creating symlink (${isDir ? 'dir' : 'not dir'}): ${actualPath} => ${linkPath}`
    );
  }

  return fs.symlink(
    actualPath,
    linkPath,
    process.platform === 'win32' ? (isDir ? 'junction' : 'file') : undefined
  );
}

async function mkdir({
  paths,
  context: { debug, root },
  noDebugOutput = false
}: {
  paths: string[];
  context: FixtureContext;
  noDebugOutput?: boolean;
}) {
  paths = paths.map((path) => toAbsolutePath(root, path));

  return Promise.all(
    paths.map((path) => {
      if (!noDebugOutput) {
        debug(`making directory: ${path}`);
      }

      return fs.mkdir(path, { recursive: true });
    })
  );
}

async function remove({
  paths,
  context: { debug, root },
  noDebugOutput = false
}: {
  paths: string[];
  context: FixtureContext;
  noDebugOutput?: boolean;
}) {
  paths = paths.map((path) => toAbsolutePath(root, path));

  return Promise.all(
    paths.map((path) => {
      if (!noDebugOutput) {
        debug(`deleting item: ${path}`);
      }

      return fs.rm(path, { force: true, recursive: true });
    })
  );
}

async function copy({
  sourcePaths,
  destinationPath,
  context: { debug, root },
  noDebugOutput = false
}: {
  sourcePaths: string[];
  destinationPath: string;
  context: FixtureContext;
  noDebugOutput?: boolean;
}) {
  sourcePaths = sourcePaths.map((path) => toAbsolutePath(root, path));
  destinationPath = toAbsolutePath(root, destinationPath);

  return Promise.all(
    sourcePaths.map((source) => {
      const destination = toPath(destinationPath, basename(source));
      if (!noDebugOutput) {
        debug(`copying item: ${source} => ${destination}`);
      }

      return fs.cp(source, destination, { force: true, recursive: true });
    })
  );
}

async function rename({
  oldPath,
  newPath,
  context: { debug, root },
  noDebugOutput = false
}: {
  oldPath: string;
  newPath: string;
  context: FixtureContext;
  noDebugOutput?: boolean;
}) {
  oldPath = toAbsolutePath(root, oldPath);
  newPath = toAbsolutePath(root, newPath);

  if (!noDebugOutput) {
    debug(`renaming (moving) item: ${oldPath} => ${newPath}`);
  }

  return fs.rename(oldPath, newPath);
}

// TODO: XXX: make this into a separate (mock-argv) package
export async function withMockedArgv(
  test: () => Promisable<void>,
  simulatedArgv: string[],
  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  options: MockArgvOptions = { replace: false }
) {
  // ? Take care to preserve the original argv array reference in memory
  const previousArgv = process.argv.splice(options.replace ? 0 : 2, process.argv.length);
  process.argv.push(...simulatedArgv);

  await test();

  process.argv.splice(options.replace ? 0 : 2, process.argv.length);
  process.argv.push(...previousArgv);
}

// TODO: XXX: make this into a separate (mock-argv) package (along w/ the above)
export function mockArgvFactory(
  factorySimulatedArgv: typeof process.argv,
  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  factoryOptions: MockArgvOptions = { replace: false }
) {
  return (
    test: () => Promisable<void>,
    simulatedArgv?: string[],
    options?: MockArgvOptions
  ) => {
    return withMockedArgv(
      test,
      [...factorySimulatedArgv, ...(simulatedArgv ?? [])],
      options ?? factoryOptions
    );
  };
}

// TODO: XXX: make this into a separate (mock-env) package
export async function withMockedEnv(
  test: () => Promisable<void>,
  simulatedEnv: Record<string, string>,
  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  options: MockEnvOptions = { replace: true }
) {
  const previousEnv = { ...process.env };
  const clearEnv = () => {
    Object.getOwnPropertyNames(process.env).forEach((property) => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete process.env[property];
    });
  };

  // ? Take care to preserve the original env object reference in memory
  if (options.replace) clearEnv();
  Object.assign(process.env, simulatedEnv);

  await test();

  clearEnv();
  Object.assign(process.env, previousEnv);
}

// TODO: XXX: make this into a separate (mock-env) package (along w/ the above)
export function mockEnvFactory(
  factorySimulatedEnv: Record<string, string>,
  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  factoryOptions: MockEnvOptions = { replace: true }
) {
  return (
    test: () => Promisable<void>,
    simulatedEnv: Record<string, string> = {},
    options?: MockEnvOptions
  ) => {
    return withMockedEnv(
      test,
      { ...factorySimulatedEnv, ...simulatedEnv },
      options ?? factoryOptions
    );
  };
}

/**
 * Performs a module import as if it were being imported for the first time.
 *
 * Note that this function breaks the "require caching" expectation of Node.js
 * modules. Problems can arise, for example, when closing an app-wide database
 * connection in your test cleanup phase and expecting it to close for the
 * isolated module too. In this case, the isolated module has its own isolated
 * "app-wide" connection that would not actually be closed and could cause your
 * test to hang unexpectedly, even when all tests pass.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function isolatedImport<T = unknown>(args: {
  /**
   * Path to the module to import. Module resolution is handled by `require`.
   */
  path: string;
  /**
   * By default, if `module.__esModule === true`, the default export will be
   * returned instead. Use `useDefault` to override this behavior in either
   * direction.
   */
  useDefault?: boolean;
}) {
  let package_: T | undefined;

  // ? Cache-busting
  jest.isolateModules(() => {
    package_ = ((r) => {
      globalDebug.extend('isolated-import')(
        `performing isolated import of ${args.path}${
          args.useDefault ? ' (returning default by force)' : ''
        }`
      );

      return r.default &&
        (args.useDefault === true ||
          (args.useDefault !== false && r.__esModule && Object.keys(r).length === 1))
        ? r.default
        : r;
    })(require(args.path));
  });

  return package_ as T;
}

// TODO: XXX: make this into a separate package (along with the above)
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function isolatedImportFactory<T = unknown>(args: {
  path: string;
  useDefault?: boolean;
}) {
  return () => isolatedImport<T>({ path: args.path, useDefault: args.useDefault });
}

// TODO: XXX: make this into a separate (mock-exit) package
export async function withMockedExit(
  test: (spies: { exitSpy: jest.SpyInstance }) => Promisable<void>
) {
  const exitSpy = jest
    .spyOn(process, 'exit')
    .mockImplementation(() => undefined as never);

  try {
    await test({ exitSpy });
  } finally {
    exitSpy.mockRestore();
  }
}

// TODO: XXX: make this into a separate package (along with the above)
export function protectedImportFactory(path: string) {
  return async (parameters?: { expectedExitCode?: number }) => {
    let package_: unknown = undefined;

    await withMockedExit(async ({ exitSpy }) => {
      package_ = await isolatedImport({ path });
      if (expect && parameters?.expectedExitCode)
        expect(exitSpy).toHaveBeenCalledWith(parameters.expectedExitCode);
      else if (!expect)
        globalDebug.extend('protected-import-factory')(
          'WARNING: "expect" object not found, so exit check was skipped'
        );
    });

    return package_;
  };
}

// TODO: XXX: make this into a separate (mock-output) package

export type MockedOutputOptions = {
  /**
   * If `true`, whenever `process.env.DEBUG` is present, output functions will
   * still be spied on but their implementations will not be mocked, allowing
   * debug output to make it to the screen.
   *
   * @default true
   */
  passthroughOutputIfDebugging?: boolean;
  /**
   * Call `::mockRestore` on one or more output functions currently being spied
   * upon.
   */
  passthrough?: ('log' | 'warn' | 'error' | 'info' | 'stdout' | 'stderr')[];
};

// TODO: XXX: make this into a separate (mock-output) package
export async function withMockedOutput(
  test: (spies: {
    logSpy: jest.SpyInstance;
    warnSpy: jest.SpyInstance;
    errorSpy: jest.SpyInstance;
    infoSpy: jest.SpyInstance;
    stdoutSpy: jest.SpyInstance;
    stderrSpy: jest.SpyInstance;
  }) => Promisable<unknown>,
  { passthrough = [], passthroughOutputIfDebugging = true }: MockedOutputOptions = {}
) {
  const spies = {
    logSpy: jest.spyOn(console, 'log'),
    warnSpy: jest.spyOn(console, 'warn'),
    errorSpy: jest.spyOn(console, 'error'),
    infoSpy: jest.spyOn(console, 'info'),
    stdoutSpy: jest.spyOn(process.stdout, 'write'),
    stderrSpy: jest.spyOn(process.stderr, 'write')
  };

  const $wasAccessed = Symbol('was-accessed');
  const noDebugPassthrough = !process.env.DEBUG || !passthroughOutputIfDebugging;

  for (const [name, spy] of Object.entries(spies)) {
    // ? If we're debugging, show all outputs instead of swallowing them
    if (
      noDebugPassthrough &&
      !passthrough.includes(name as (typeof passthrough)[number])
    ) {
      if (name.startsWith('std')) {
        spy.mockImplementation(() => true);
      } else {
        // @ts-expect-error: TypeScript isn't smart enough to figure this out
        spy.mockImplementation(() => undefined);
      }
    }

    // ? Sometimes useful warnings/errors and what not are swallowed when all we
    // ? really wanted was to track log/stdout calls, or vice-versa. To prevent
    // ? this, we expect that our spies have not been called at all UNLESS the
    // ? caller of withMockedOutput uses the spy (accesses a property).
    let wasAccessed = false;
    // @ts-expect-error: TypeScript isn't smart enough to figure this out
    spies[name as keyof typeof spies] =
      //
      new Proxy(spy, {
        get(target, property) {
          if (property === $wasAccessed) {
            return wasAccessed;
          }

          wasAccessed = true;

          const value: unknown =
            // @ts-expect-error: TypeScript isn't smart enough to figure this out
            target[property];

          // ? It's what the MDN example uses, so we shall use it too
          // eslint-disable-next-line no-restricted-syntax
          if (value instanceof Function) {
            return function (...args: unknown[]) {
              // ? "this-recovering" code
              return value.apply(target, args);
            };
          }

          return value;
        }
      });
  }

  try {
    await test(spies);

    // ? Let us know when output was swallowed unexpectedly
    for (const [name, spy] of Object.entries(spies)) {
      if (
        noDebugPassthrough &&
        !passthrough.includes(name as (typeof passthrough)[number])
      ) {
        const wasAccessed = (spy as typeof spy & { [$wasAccessed]: boolean })[
          $wasAccessed
        ];

        assert(typeof wasAccessed === 'boolean');

        if (!wasAccessed) {
          expect({
            'failing-spy': name,
            'unexpected-output': spy.mock.calls
          }).toStrictEqual({ 'failing-spy': name, 'unexpected-output': [] });
        }
      }
    }
  } finally {
    spies.logSpy.mockRestore();
    spies.warnSpy.mockRestore();
    spies.errorSpy.mockRestore();
    spies.infoSpy.mockRestore();
    spies.stdoutSpy.mockRestore();
    spies.stderrSpy.mockRestore();
  }
}

// TODO: XXX: make this into a separate (run) package (along w/ above)
export function runnerFactory(file: string, args?: string[], options?: RunOptions) {
  const factoryArgs = args;
  const factoryOptions = options;

  return (args?: string[], options?: RunOptions) =>
    run(file, args ?? factoryArgs, { ...factoryOptions, ...options });
}

// TODO: XXX: need some way to make setting different fixture options for
// TODO: XXX: different tests much less painful!

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface FixtureOptions
  extends Partial<WebpackTestFixtureOptions>,
    Partial<GitRepositoryFixtureOptions>,
    Partial<NodeImportTestFixtureOptions>,
    Partial<DummyDirectoriesFixtureOptions> {
  performCleanup: boolean;
  use: MockFixture[];
  initialFileContents: { [filePath: string]: string };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface WebpackTestFixtureOptions {
  webpackVersion: string;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface GitRepositoryFixtureOptions {
  setupGit: (git: SimpleGit) => Promisable<void>;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface DummyDirectoriesFixtureOptions {
  directoryPaths: string[];
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface NodeImportTestFixtureOptions {
  npmInstall?: string | string[];
  runInstallScripts?: boolean;
  runWith?: {
    binary?: string;
    args?: string[];
    opts?: Record<string, unknown>;
  };
}

export type WithoutContextProperty<T> = T extends (config: infer U) => infer V
  ? (config: Omit<U, 'context'>) => V
  : never;

export type WithContextProperty<T> = T extends (config: infer U) => infer V
  ? (config: U & { context: FixtureContext }) => V
  : never;

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface FixtureContext<
  CustomOptions extends Record<string, unknown> = Record<string, unknown>
> extends Partial<TestResultProvider>,
    Partial<TreeOutputProvider>,
    Partial<GitProvider> {
  root: string;
  testIdentifier: string;
  options: FixtureOptions & CustomOptions;
  using: MockFixture[];
  fileContents: { [filePath: string]: string };
  debug: ExtendedDebugger;
  /**
   * Convenience filesystem functions. All paths are local to the current
   * context root.
   */
  fs: {
    writeFile: WithoutContextProperty<typeof writeFile>;
    readFile: WithoutContextProperty<typeof readFile>;
    accessFile: WithoutContextProperty<typeof accessFile>;
    symlink: WithoutContextProperty<typeof symlink>;
    mkdir: WithoutContextProperty<typeof mkdir>;
    remove: WithoutContextProperty<typeof remove>;
    copy: WithoutContextProperty<typeof copy>;
    rename: WithoutContextProperty<typeof rename>;
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface TestResultProvider {
  testResult: RunReturnType;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface TreeOutputProvider {
  treeOutput: string;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface GitProvider {
  git: SimpleGit;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export type FixtureAction<Context = FixtureContext> = (
  context: Context
) => Promise<unknown>;

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export type ReturnsString<Context = FixtureContext> = (
  context: Context
) => Promise<string> | string;

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface MockFixture<Context = FixtureContext> {
  name: LiteralUnion<'root' | 'describe-root', string | symbol> | ReturnsString<Context>;
  description: string | ReturnsString<Context>;
  setup?: FixtureAction<Context>;
  teardown?: FixtureAction<Context>;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function rootFixture(): MockFixture {
  return {
    name: 'root', // ? If first isn't named root, root used automatically
    description: (context) =>
      `creating a unique root directory${
        context.options.performCleanup
          ? ' (will be deleted after all tests complete)'
          : ''
      }`,
    setup: async (context) => {
      // TODO: add the tmpdir suffix to all related debug outputs
      context.root = uniqueFilename(tmpdir(), context.testIdentifier);

      await mkdir({ paths: [toAbsolutePath(context.root, 'src')], context });
    },
    teardown: async (context) => {
      if (context.options.performCleanup) {
        await remove({ paths: [context.root], context });
      }
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function dummyNpmPackageFixture(): MockFixture {
  return {
    name: 'dummy-npm-package',
    description: 'creating package.json file and node_modules subdirectory',
    setup: async (context) => {
      context.fileContents['package.json'] ||= '{"name":"dummy-pkg"}';

      await Promise.all([
        mkdir({ paths: [toAbsolutePath(context.root, 'node_modules')], context }),
        writeFile({
          path: toAbsolutePath(context.root, 'package.json'),
          data: context.fileContents['package.json'],
          context
        })
      ]);

      if (rootPackageJsonName.includes('/')) {
        await mkdir({
          paths: [
            toAbsolutePath(
              context.root,
              'node_modules',
              rootPackageJsonName.split('/')[0]
            )
          ],
          context
        });
      }
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function npmLinkSelfFixture(): MockFixture {
  return {
    name: 'npm-link-self',
    description:
      'soft-linking project repo into node_modules to emulate package installation',
    setup: async (context) => {
      await symlink({
        actualPath: toAbsolutePath(__dirname, '..'),
        linkPath: toAbsolutePath(context.root, 'node_modules', rootPackageJsonName),
        isDir: true,
        context
      });
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function npmCopySelfFixture(): MockFixture {
  return {
    name: 'npm-copy-self',
    description:
      'copying package.json `files` into node_modules to emulate package installation',
    setup: async (context) => {
      const root = toAbsolutePath(__dirname, '..');

      const { files: patterns } = (await import('rootverse:package.json')).default;

      const sourcePaths = patterns.flatMap((p: string) =>
        glob.sync(p, { cwd: root, root })
      );
      const destinationPath = toAbsolutePath(
        context.root,
        'node_modules',
        rootPackageJsonName
      );
      const destinationPackageJson = toAbsolutePath(destinationPath, 'package.json');

      await mkdir({ paths: [destinationPath], context });
      await copy({ sourcePaths, destinationPath, context });

      if (!destinationPackageJson) {
        throw new Error(`expected "${destinationPackageJson}" to exist`);
      }

      // TODO: only optionally remove peer dependencies from the install loop
      // TODO: (and by default they should NOT be removed, unlike below).
      // TODO: Same deal with dev dependencies (except removed by default).
      const {
        peerDependencies: _,
        devDependencies: __,
        ...dummyPackageJson
      } = JSON.parse(await readFile({ path: destinationPackageJson, context }));

      const installTargets = {
        ...dummyPackageJson.dependencies,
        ...Object.fromEntries(
          [context.options.npmInstall]
            .flat()
            .filter((r): r is string => Boolean(r))
            .map((packageString) => {
              const isScoped = packageString.startsWith('@');
              const packageSplit = (
                isScoped ? packageString.slice(1) : packageString
              ).split('@');

              const package_ = isScoped
                ? [`@${packageSplit[0]}`, packageSplit[1]]
                : packageSplit;

              return [package_[0], package_[1] || 'latest'];
            })
        )
      };

      await writeFile({
        path: destinationPackageJson,
        data: JSON.stringify(
          { ...dummyPackageJson, dependencies: installTargets },
          undefined,
          2
        ),
        context
      });

      await run(
        'npm',
        [
          'install',
          '--no-save',
          ...(context.options.runInstallScripts ? [] : ['--ignore-scripts']),
          '--omit=dev',
          '--force'
        ],
        {
          cwd: destinationPath,
          reject: true,
          env: { NODE_ENV: 'production', CI: 'true' }
        }
      );

      await rename({
        oldPath: `${context.root}/node_modules`,
        newPath: `${context.root}/node_modules_old`,
        context
      });

      await rename({
        oldPath: `${context.root}/node_modules_old/${rootPackageJsonName}/node_modules`,
        newPath: `${context.root}/node_modules`,
        context
      });

      await rename({
        oldPath: `${context.root}/node_modules_old/${rootPackageJsonName}`,
        newPath: `${context.root}/node_modules/${rootPackageJsonName}`,
        context
      });

      await remove({ paths: [`${context.root}/node_modules_old`], context });
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function webpackTestFixture(): MockFixture {
  return {
    name: 'webpack-test',
    description: 'setting up webpack jest integration test',
    setup: async (context) => {
      if (typeof context.options.webpackVersion !== 'string') {
        throw new TypeError(
          'invalid or missing options.webpackVersion, expected string'
        );
      }

      const indexPath = Object.keys(context.fileContents).find((path) => {
        return /^src\/index\.(((c|m)?js)|ts)x?$/.test(path);
      });

      if (!indexPath) {
        throw new Error('could not find initial contents for src/index file');
      }

      if (!context.fileContents[webpackConfigProjectBase]) {
        throw new Error(
          `could not find initial contents for ${webpackConfigProjectBase} file`
        );
      }

      await Promise.all([
        writeFile({
          path: `${context.root}/${indexPath}`,
          data: context.fileContents[indexPath],
          context
        }),
        writeFile({
          path: `${context.root}/${webpackConfigProjectBase}`,
          data: context.fileContents[webpackConfigProjectBase],
          context
        })
      ]);

      context.treeOutput = await getTreeOutput(context);

      await run(
        'npm',
        [
          'install',
          '--no-save',
          `webpack@${context.options.webpackVersion}`,
          'webpack-cli'
        ],
        {
          cwd: context.root,
          reject: true
        }
      );

      await run('npx', ['webpack'], { cwd: context.root, reject: true });

      context.testResult = await run('node', [
        '--no-warnings',
        `${context.root}/dist/index.js`
      ]);
    }
  };
}

async function getTreeOutput(context: FixtureContext) {
  if (process.platform === 'win32') {
    return '(this platform does not support the `tree` command)';
  } else {
    const { stdout } = await (
      await import('@-xun/run')
    ).runNoRejectOnBadExit('tree', ['-a', '-L', '2'], { cwd: context.root });
    return stdout || '(`tree` command did not return a result. Is it installed?)';
  }
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function nodeImportAndRunTestFixture(): MockFixture {
  return {
    name: 'node-import-and-run-test',
    description: 'setting up node import and runtime integration test',
    setup: async (context) => {
      const targetPath = Object.keys(context.fileContents).find((path) =>
        /^src\/index(\.test)?\.(((c|m)?js)|ts)x?$/.test(path)
      );

      if (!targetPath) {
        throw new Error('could not find initial contents for src/index test file');
      }

      await writeFile({
        path: `${context.root}/${targetPath}`,
        data: context.fileContents[targetPath],
        context
      });

      const bin = context.options.runWith?.binary ?? 'node';

      const args = context.options.runWith?.args ?? [
        '--no-warnings',
        '--experimental-json-modules'
      ];

      const options = Object.assign(
        { env: { DEBUG_COLORS: 'false' } },
        context.options.runWith?.opts ?? {}
      );

      context.treeOutput = await getTreeOutput(context);
      context.testResult = await run(bin, ['--no-warnings', ...args, targetPath], {
        cwd: context.root,
        ...options
      });
    }
  };
}

// ! TODO: XXX: make fixture creation functions accept their own options, then
// ! TODO: XXX: make all options from fixtures available in the global context.
// ! TODO: XXX: This allows for easy of typing on both ends while preserving the
// ! TODO: XXX: ability for cross-plugin communication
// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function gitRepositoryFixture(): MockFixture {
  return {
    name: 'git-repository',
    description: 'configuring fixture root to be a git repository',
    setup: async (context) => {
      if (context.options.setupGit && typeof context.options.setupGit !== 'function') {
        throw new Error('invalid options.setupGit, expected function');
      }

      context.git = simpleGit({ baseDir: context.root });

      await (context.options.setupGit
        ? context.options.setupGit(context.git)
        : context.git
            .init()
            .addConfig('user.name', 'fake-user')
            .addConfig('user.email', 'fake@email')
            .addConfig('user.signingkey', '')
            .addConfig('commit.gpgsign', 'false')
            .addConfig('tag.gpgsign', 'false'));
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function dummyDirectoriesFixture(): MockFixture {
  return {
    name: 'dummy-directories',
    description: 'creating dummy directories under fixture root',
    setup: async (context) => {
      if (!Array.isArray(context.options.directoryPaths)) {
        throw new TypeError('invalid or missing options.directoryPaths, expected array');
      }

      await Promise.all(
        context.options.directoryPaths.map((path) => {
          const dir = toAbsolutePath(context.root, path);
          return mkdir({ paths: [dir], context });
        })
      );
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function dummyFilesFixture(): MockFixture {
  return {
    name: 'dummy-files',
    description: 'creating dummy files under fixture root',
    setup: async (context) => {
      await Promise.all(
        Object.entries(context.fileContents).map(async ([path, contents]) => {
          const fullPath = `${context.root}/${path}`;
          await accessFile({ path: fullPath, context }).then(
            () => {
              context.debug(
                `skipped creating dummy file: file already exists at ${path}`
              );
            },
            async () => {
              context.fileContents[path] = contents;
              await writeFile({
                path: fullPath,
                data: context.fileContents[path],
                context
              });
            }
          );
        })
      );
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
// ? If a fixture w/ this name isn't included, it's appended
// ! This fixture, when included, is always run even when errors occur!
export function describeRootFixture(): MockFixture {
  return {
    name: 'describe-root',
    description: 'outputting debug information about environment',
    setup: async (context) => {
      context.debug('test identifier: %O', context.testIdentifier);
      context.debug('root: %O', context.root);
      context.debug(context.treeOutput ?? (await getTreeOutput(context)));
      context.debug('per-file contents: %O', context.fileContents);
    }
  };
}

function wrapFilesystemFunction<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends WithContextProperty<(...args: any[]) => Promise<any>>
>(filesystemFn: T, context: FixtureContext) {
  return function wrapper(config: Parameters<WithoutContextProperty<T>>[0]) {
    return filesystemFn({ ...config, context });
  };
}

export type WithMockedFixtureOptions<
  CustomOptions extends Record<string, unknown> = Record<string, unknown>,
  CustomContext extends Record<string, unknown> = Record<string, unknown>
> = Parameters<typeof withMockedFixture<CustomOptions, CustomContext>>[0];

// TODO: XXX: make this into a separate (mock-fixture) package
export async function withMockedFixture<
  CustomOptions extends Record<string, unknown> = Record<string, unknown>,
  CustomContext extends Record<string, unknown> = Record<string, unknown>
>({
  test,
  testIdentifier,
  options
}: {
  test: FixtureAction<
    FixtureContext<FixtureOptions & Partial<Record<string, unknown> & CustomOptions>> &
      CustomContext
  >;
  testIdentifier: string;
  options?: Partial<FixtureOptions & CustomOptions>;
}) {
  type CustomizedFixtureOptions = FixtureOptions &
    Partial<Record<string, unknown> & CustomOptions>;
  type CustomizedFixtureContext = FixtureContext<CustomizedFixtureOptions> &
    CustomContext;
  type CustomizedMockFixture = MockFixture<CustomizedFixtureContext>;

  const testSymbol = Symbol.for('@xunnamius/test');
  const finalOptions = {
    performCleanup: true,
    use: [] as MockFixture[],
    initialFileContents: {},
    ...options
  } as CustomizedFixtureOptions & { use: CustomizedMockFixture[] };

  const context = {
    root: '',
    testIdentifier,
    debug: globalDebug,
    using: [] as MockFixture[],
    options: finalOptions,
    fileContents: { ...finalOptions.initialFileContents }
  } satisfies Omit<FixtureContext, 'fs'> as CustomizedFixtureContext & {
    using: CustomizedMockFixture[];
  };

  context.fs = {
    writeFile: wrapFilesystemFunction(writeFile, context),
    readFile: wrapFilesystemFunction(readFile, context),
    accessFile: wrapFilesystemFunction(accessFile, context),
    symlink: wrapFilesystemFunction(symlink, context),
    mkdir: wrapFilesystemFunction(mkdir, context),
    remove: wrapFilesystemFunction(remove, context),
    copy: wrapFilesystemFunction(copy, context),
    rename: wrapFilesystemFunction(rename, context)
  };

  if (finalOptions.use) {
    if (finalOptions.use?.[0]?.name !== 'root') context.using.push(rootFixture());
    context.using = [...context.using, ...finalOptions.use];
    // ? `describe-root` fixture doesn't have to be the last one, but a fixture
    // ? with that name must be included at least once
    if (!finalOptions.use.some((f) => f.name === 'describe-root'))
      context.using.push(describeRootFixture());
  } else context.using = [rootFixture(), describeRootFixture()];

  context.using.push({
    name: testSymbol,
    description: '',
    setup: test
  });

  let ranDescribe = false;
  const cleanupFunctions: NonNullable<CustomizedMockFixture['teardown']>[] = [];

  const setupDebugger = async (fixture: CustomizedMockFixture, error = false) => {
    const toString = async (
      source:
        | CustomizedMockFixture['name']
        | LiteralUnion<Exclude<CustomizedMockFixture['description'], string>, string>
    ) => String(typeof source === 'function' ? await source(context) : source);

    const name = await toString(fixture.name);
    const desc = await toString(fixture.description);
    const debug_ = globalDebug.extend(name);

    context.debug = error ? (debug_.error as unknown as typeof debug_) : debug_;
    context.debug(desc);
  };

  /*eslint-disable no-await-in-loop */
  try {
    for (const mockFixture of context.using) {
      if (mockFixture.name === testSymbol) {
        context.debug = globalDebug;
        globalDebug('executing test callback');
      } else {
        await setupDebugger(mockFixture);
        if (mockFixture.teardown) cleanupFunctions.push(mockFixture.teardown);
      }

      void (mockFixture.setup
        ? await mockFixture.setup(context)
        : context.debug('(warning: mock fixture has no setup function)'));

      if (mockFixture.name === 'describe-root') ranDescribe = true;
    }
  } catch (error) {
    context.debug.error('exception occurred: %O', error);
    throw error;
  } finally {
    if (!ranDescribe) {
      const fixture = describeRootFixture();
      await setupDebugger(fixture, true);
      await fixture.setup?.(context);
    }

    context.debug = globalDebug.extend('<cleanup>');

    for (const cleanupFn of cleanupFunctions.reverse()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/use-unknown-in-catch-callback-variable
      await cleanupFn(context).catch((error: any) =>
        context.debug(
          `ignored exception in teardown function: ${String(
            error?.message || error.toString() || '<no error message>'
          )}`
        )
      );
    }
  }
  /*eslint-enable no-await-in-loop */
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ above)
export function mockFixtureFactory<
  CustomOptions extends Record<string, unknown> = Record<string, unknown>,
  CustomContext extends Record<string, unknown> = Record<string, unknown>
>(testIdentifier: string, options?: Partial<FixtureOptions & CustomOptions>) {
  return (
    test: FixtureAction<
      FixtureContext<FixtureOptions & Partial<Record<string, unknown> & CustomOptions>> &
        CustomContext
    >
  ) =>
    withMockedFixture<CustomOptions, CustomContext>({
      test,
      testIdentifier,
      options
    });
}
