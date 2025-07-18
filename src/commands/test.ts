/* eslint-disable unicorn/prefer-single-call */
/* eslint-disable no-await-in-loop */
import { setTimeout as delay } from 'node:timers/promises';

import {
  BfcErrorMessage,
  checkArrayNotEmpty,
  checkIsNotNegative,
  checkIsNotNil,
  CliError
} from '@-xun/cli';

import { softAssert } from '@-xun/cli/error';
import { LogTag, standardSuccessMessage } from '@-xun/cli/logging';
import { scriptBasename } from '@-xun/cli/util';
import { toPath, toRelativePath } from '@-xun/fs';

import {
  directoryPackagesProjectBase,
  directoryTestPackageBase,
  gatherPackageBuildTargets,
  gatherProjectFiles,
  isAccessible,
  isRootPackage,
  jestConfigProjectBase,
  lcovCoverageInfoPackageBase,
  ProjectAttribute,
  Tsconfig,
  tstycheConfigProjectBase
} from '@-xun/project';

import { runNoRejectOnBadExit } from '@-xun/run';
import { SHORT_TAB } from 'rejoinder';

import { DefaultGlobalScope } from 'universe:configure.ts';
import { tstycheTargetRegExp } from 'universe:constant.ts';
import { ErrorMessage } from 'universe:error.ts';
import { logStartTime, runGlobalPreChecks, withGlobalBuilder } from 'universe:util.ts';

import type { AsStrictExecutionContext, ChildConfiguration } from '@-xun/cli';
import type { Package } from '@-xun/project';
import type { GlobalCliArguments, GlobalExecutionContext } from 'universe:configure.ts';

const tstycheVacuousSuccessMessage = `Tstyche tests vacuously succeeded: no files found matching ${tstycheTargetRegExp.toString()}`;

// TODO: for testing built test intermediates: --use-jest-directly to use node &
// TODO: jest directly and NOT set NODE_OPTIONS environment variable. This will
// TODO: allow testing intermediates with symbiote to work with vscode's debug
// TODO: terminal. Currently it does not because NODE_OPTIONS cannot be set AND
// TODO: have the debug terminal attach properly.

/**
 * Which kind of test to run.
 */
export enum Test {
  /**
   * Include type tests from the chosen scope.
   *
   * Does not include code coverage results by default.
   */
  Type = 'type',
  /**
   * Include unit tests from the chosen scope.
   *
   * Does not include code coverage results by default.
   */
  Unit = 'unit',
  /**
   * Include integration tests from the chosen scope.
   *
   * Does not include code coverage results by default.
   */
  Integration = 'integration',
  /**
   * Include end-to-end tests from the chosen scope with the
   * `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment variable. This
   * will run any end-to-end tests by actually downloading the items under test
   * from the internet.
   *
   * Does not include code coverage results by default.
   */
  EndToEnd = 'e2e',
  /**
   * This option is identical to {@link Test.EndToEnd} except it runs end-to-end
   * tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
   * environment variable. This will run any end-to-end tests by copying the
   * items under test from the local filesystem.
   *
   * Does not include code coverage results by default.
   */
  EndToEndLocal = 'e2e-local',
  /**
   * Include _all possible tests_ from the chosen scope, and runs end-to-end
   * tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Real}` environment
   * variable. This will run any end-to-end tests by actually downloading the
   * items under test from the internet.
   *
   * Will also include code coverage results by default when scope is
   * {@link TesterScope.Unlimited}.
   */
  All = 'all',
  /**
   * This option is identical to {@link Test.All} except it runs end-to-end
   * tests with the `SYMBIOTE_TEST_E2E_MODE=${EndToEndMode.Simulated}`
   * environment variable. This will run any end-to-end tests by copying the
   * items under test from the local filesystem.
   *
   * Will also include code coverage results by default when scope is
   * {@link TesterScope.Unlimited}.
   */
  AllLocal = 'all-local'
}

export enum _TesterScope {
  /**
   * Limit the command to relevant _transpiled_ tests (aka "intermediates")
   * within `./.transpiled` (with respect to the current working directory).
   */
  ThisPackageIntermediates = 'this-package-intermediates'
}

/**
 * The possible valid values for the `process.env.SYMBIOTE_TEST_E2E_MODE`
 * environment variable (not including `undefined`).
 */
export enum EndToEndMode {
  Real = 'real',
  Simulated = 'simulated'
}

/**
 * The context in which to search for test files.
 */
export type TesterScope = DefaultGlobalScope | _TesterScope;

/**
 * The context in which to search for test files.
 */
export const TesterScope = { ...DefaultGlobalScope, ..._TesterScope } as const;

/**
 * @see {@link Test}
 */
export const tests = Object.values(Test);

/**
 * @see {@link TesterScope}
 */
export const testerScopes = Object.values(TesterScope);

export type CustomCliArguments = GlobalCliArguments<TesterScope> & {
  tests: Test[];
  testerOptions: string[];
  nodeOptions: string[];
  runtime: 'default' | `${string}@${string}`;
  baseline: boolean;
  repeat: number;
  collectCoverage: boolean;
  skipSlowTests: number;
  propagateDebugEnv: boolean;
};

export default function command({
  standardLog,
  standardDebug,
  state,
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>): ChildConfiguration<
  CustomCliArguments,
  GlobalExecutionContext
> {
  let endToEndMode: EndToEndMode = EndToEndMode.Simulated;

  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>(
    (blackFlag) => {
      blackFlag.parserConfiguration({ 'unknown-options-as-args': true });

      const allActualTests = [Test.EndToEnd, Test.Integration, Test.Type, Test.Unit];

      return {
        scope: {
          choices: testerScopes,
          default: TesterScope.ThisPackage
        },
        tests: {
          alias: 'test',
          array: true,
          choices: tests,
          description: 'Which kinds of test to run',
          // ? If this changes, endToEndMode's initial value needs to change too
          default: [allActualTests],
          defaultDescription: `"${Test.AllLocal}"`,
          check: checkArrayNotEmpty('--tests'),
          coerce(tests: Test[]) {
            return Array.from(
              new Set(
                [tests].flat().flatMap((test) => {
                  switch (test) {
                    case Test.All: {
                      endToEndMode = EndToEndMode.Real;
                      return allActualTests;
                    }

                    case Test.AllLocal: {
                      return allActualTests;
                    }

                    case Test.EndToEnd: {
                      endToEndMode = EndToEndMode.Real;
                      return Test.EndToEnd;
                    }

                    case Test.EndToEndLocal: {
                      return Test.EndToEnd;
                    }

                    default: {
                      return test;
                    }
                  }
                })
              )
            );
          },
          subOptionOf: {
            tests: {
              when: (tests: Test[]) => tests.includes(Test.Type),
              update(oldOptionConfig) {
                return {
                  ...oldOptionConfig,
                  conflicts: { scope: TesterScope.ThisPackageIntermediates }
                };
              }
            },
            baseline: {
              when: (baseline) => baseline,
              update(oldOptionConfig) {
                return {
                  ...oldOptionConfig,
                  description: `Which kind of test to run ("${Test.Type}" means TsTyche only, all others mean Jest only)`,
                  default: [Test.Unit],
                  defaultDescription: `Jest tests only`,
                  demandThisOption: true,
                  // ? Either Jest or Tstyche run in baseline mode, but not both
                  check: [oldOptionConfig.check || []]
                    .flat()
                    .concat(function checkTypeChoiceIfGivenIsByItself(
                      currentArgument: Test[]
                    ) {
                      const includesType = currentArgument.includes(Test.Type);

                      return (
                        !includesType ||
                        currentArgument.length === 1 ||
                        BfcErrorMessage.OptionValueMustBeAloneWhenBaseline(
                          Test.Type,
                          '--test option'
                        )
                      );
                    })
                };
              }
            }
          }
        },
        'tester-options': {
          alias: 'options',
          array: true,
          description: 'Command-line arguments passed directly to testers',
          default: []
        },
        baseline: {
          alias: ['base', 'bare'],
          boolean: true,
          description: 'Execute a single tester alone without an execution plan',
          default: false,
          implies: { scope: TesterScope.Unlimited }
        },
        repeat: {
          number: true,
          description:
            'Run entire Jest (not Tstyche) test suite --repeat times (includes initial run)',
          default: 1,
          conflicts: [
            { tests: Test.Type },
            { tests: Test.All },
            { tests: Test.AllLocal }
          ],
          check: [checkIsNotNegative('repeat'), checkIsNotNil('repeat')]
        },
        'collect-coverage': {
          alias: 'coverage',
          boolean: true,
          description: 'Instruct Jest (not Tstyche) to collect coverage information',
          defaultDescription: 'false unless --tests=all and --scope=unlimited',
          default: false,
          subOptionOf: {
            tests: {
              when: (tests: Test[], { scope }) => {
                return (
                  (tests.includes(Test.All) || tests.includes(Test.AllLocal)) &&
                  scope === TesterScope.Unlimited
                );
              },
              update(oldOptionConfig) {
                return {
                  ...oldOptionConfig,
                  default: true
                };
              }
            }
          }
        },
        'propagate-debug-env': {
          alias: 'debug',
          boolean: true,
          description: 'Make the DEBUG environment variable visible to Jest/Tstyche',
          default: !!process.env.CI,
          defaultDescription: 'true if in a CI environment, false otherwise'
        },
        'skip-slow-tests': {
          alias: 'x',
          count: true,
          description: 'Instruct Jest (not Tstyche) to skip tests marked slow',
          default: false
        },
        'node-options': {
          string: true,
          array: true,
          description: 'Options passed to the Node runtime via NODE_OPTIONS',
          default: ['--no-warnings --experimental-vm-modules'],
          check(arg: string[], argv) {
            return (
              arg.length === 0 ||
              argv.runtime === 'default' ||
              argv.runtime.startsWith('node@') ||
              ErrorMessage.CannotUseNodeOptionsOnNonNodeRuntime()
            );
          },
          subOptionOf: {
            runtime: {
              when(superOptionValue: string) {
                return (
                  superOptionValue !== 'default' && !superOptionValue.startsWith('node@')
                );
              },
              update(oldOptionConfig) {
                return {
                  ...oldOptionConfig,
                  default: []
                };
              }
            }
          }
        },
        runtime: {
          string: true,
          description: 'Set the runtime used to execute Jest (not Tstyche) tests',
          default: 'default',
          defaultDescription: '"default" (node from PATH)',
          check(arg: string) {
            return (
              arg === 'default' ||
              arg.split('@').length === 2 ||
              ErrorMessage.InvalidRuntime()
            );
          }
        }
      };
    }
  );

  return {
    builder,
    description: 'Run available type, unit, integration, and/or end-to-end tests',
    usage: `Usage: $000 [options] [extra-arguments-passed-to-underlying-runner]

$1.

Currently, --test='${Test.Type}' tests are executed by the Tstyche test runner while all other kinds are executed by the Jest test runner; said kinds are: --test='${Test.Unit}', --test='${Test.Integration}', and --test='${Test.EndToEnd}'. It is for this reason that all test files should be appropriately named (e.g. "\${kind}-\${name}.test.ts"), and should exist under a package's ./test directory.

There are three additional "meta" test kinds: --test='${Test.EndToEndLocal}', --test='${Test.AllLocal}', and --test='${Test.All}'.

  --test='${Test.EndToEndLocal}' is identical to --test='${Test.EndToEnd}' in that it runs end-to-end tests; however, --test='${Test.EndToEndLocal}' sets the SYMBIOTE_TEST_E2E_MODE environment variable to "simulated" while --test='${Test.EndToEnd}' sets the same variable to "real". When SYMBIOTE_TEST_E2E_MODE is set to "simulated", end-to-end tests will run against the current locally-built distributables (i.e. "simulated" end-to-end tests), while SYMBIOTE_TEST_E2E_MODE being set to "real" will cause end-to-end tests to download assets under test from the internet (i.e. "real" end-to-end tests). Simulated testing is useful when debugging end-to-end tests, or running end-to-end tests against distributables that have not yet been published to the internet.

  --test='${Test.AllLocal}' runs all possible tests, including e2e tests, and sets the SYMBIOTE_TEST_E2E_MODE environment variable to "simulated".

  --test='${Test.All}' runs all possible tests, including e2e tests, and sets the SYMBIOTE_TEST_E2E_MODE environment variable to "real".

Any unrecognized flags/arguments provided after the --tester-options flag are always passed through directly to each tester. For Jest, they are inserted after computed arguments but before test path patterns, e.g. \`--reporters=... --testPathIgnorePatterns=... <your extra args> -- testPathPattern1 testPathPattern2\`. For Tstyche, they are inserted after all other arguments, e.g. \`--computed-arg-1=... computed-arg-2 <your extra args>\`.

By default, this command constructs an execution plan (i.e. the computed arguments and path patterns passed to each tester's CLI) based on project metadata and provided options, namely --scope and --tests. When --scope=${TesterScope.ThisPackage} (the default), tests will be run from the current package and any packages it imports files from. Passing --scope=${TesterScope.Unlimited} will execute all runnable tests in the project. Both options are conditioned on --tests.

Alternatively, you can provide --baseline when you want to construct your own custom execution plan but still wish to make use of the runtime environment provided by this tool. When --baseline is provided, only one tester can be run at a time.

Also by default (if the CI environment variable is not defined), this command prevents the value of the DEBUG environment variable, if given, from propagating down into tests since this can cause strange output-related problems. Provide --propagate-debug-env to allow the value of DEBUG to be seen by test files and the rest of the test environment, including tests.

Provide --collect-coverage to instruct Jest to collect coverage information. --collect-coverage is false by default unless --scope=${TesterScope.Unlimited} and --tests=${Test.AllLocal}, in which case it will be true by default. Note that Tstyche never provides coverage information; this flag only affects Jest.

Note that symbiote's release command only considers "${lcovCoverageInfoPackageBase}" files and only when they are in the default location generated by this command.

For detecting flakiness in tests, which is almost always a sign of deep developer error, provide --repeat; e.g. \`--repeat 100\` will run the test suite a total of 100 times. Note that this flag cannot be used when running Tstyche "type" tests.

For running "intermediate" test files transpiled by \`symbiote build\`, provide --scope=${TesterScope.ThisPackageIntermediates} to set the SYMBIOTE_TEST_JEST_TRANSPILED environment variable in the testing environment, and to reconfigure Jest and other relevant tooling to run any transpiled tests under this package's ./.transpiled directory.

Provide --skip-slow-tests (or -x) to set the SYMBIOTE_TEST_JEST_SKIP_SLOW_TESTS environment variable in the testing environment. This will activate the \`reconfigureJestGlobalsToSkipTestsInThisFileIfRequested\` function of the @-xun/jest library, which will force Jest to skip by default all tests within files where said function was invoked. Providing --skip-slow-tests twice (or -xx) has the same effect, with the addition that test files that have "-slow." in their name are skipped entirely (not even looked at by Jest or executed by Node). This can be used in those rare instances where even the mere execution of a test file is too slow, such as a test file with hundreds or even thousands of generated tests that must be skipped. Note, however, that --skip-slow-tests has no bearing on the Tstyche runtime.`,
    handler: withGlobalHandler(async function ({
      $0: scriptFullName,
      scope,
      tests,
      testerOptions,
      nodeOptions,
      runtime,
      baseline,
      collectCoverage,
      skipSlowTests,
      propagateDebugEnv,
      repeat,
      hush: isHushed,
      quiet: isQuieted
    }) {
      const handlerName = scriptBasename(scriptFullName);
      const genericLogger = standardLog.extend(handlerName);
      const debug = standardDebug.extend(`handler-${handlerName}`);

      debug('entered handler');

      const { projectMetadata } = await runGlobalPreChecks({
        standardDebug: standardDebug,
        projectMetadata_,
        scope
      });

      const { startTime } = state;

      logStartTime({ standardLog, startTime, isUsingLocalInstallation });

      genericLogger(
        [LogTag.IF_NOT_QUIETED],
        `Testing ${
          scope === DefaultGlobalScope.ThisPackage
            ? 'this package and its dependencies'
            : 'the entire project'
        }...`
      );

      debug('scope: %O', scope);
      debug('tests: %O', tests);
      debug('baseline: %O', baseline);
      debug('testerOptions: %O', testerOptions);
      debug('nodeOptions: %O', nodeOptions);
      debug('runtime: %O', runtime);
      debug('collectCoverage: %O', collectCoverage);
      debug('skipSlowTests: %O', skipSlowTests);
      debug('repeat+1: %O', repeat);
      debug('propagateDebugEnv: %O', propagateDebugEnv);

      const { rootPackage, cwdPackage, subRootPackages } = projectMetadata;

      const packageRoot = cwdPackage.root;
      const projectRoot = rootPackage.root;

      debug('projectRoot: %O', projectRoot);
      debug('packageRoot: %O', packageRoot);

      const isRepeating = repeat > 1;

      if (isRepeating) {
        genericLogger.message(
          [LogTag.IF_NOT_QUIETED],
          `Entire test suite will run ${repeat} times`
        );
      }

      const env: Record<string, string | undefined> = {
        DEBUG: undefined,
        DEBUG_COLORS: 'false',
        NODE_ENV: 'test',
        ...(nodeOptions.length
          ? {
              // eslint-disable-next-line unicorn/no-array-reduce
              NODE_OPTIONS: nodeOptions.reduce(
                (previous, current) => (previous + ' ' + current).trim(),
                ''
              )
            }
          : {})
      };

      if (scope === TesterScope.ThisPackageIntermediates) {
        env.SYMBIOTE_TEST_JEST_TRANSPILED = 'true';
        // ? For the benefit of later local imports of jest assets
        process.env.SYMBIOTE_TEST_JEST_TRANSPILED = 'true';
      }

      if (skipSlowTests) {
        env.SYMBIOTE_TEST_JEST_SKIP_SLOW_TESTS = skipSlowTests.toString();
      }

      env.SYMBIOTE_TEST_E2E_MODE = endToEndMode;
      debug('endToEndMode: %O', endToEndMode);

      if (isRepeating) {
        env.JEST_SILENT_REPORTER_SHOW_WARNINGS = 'true';
      }

      if (propagateDebugEnv) {
        env.DEBUG = process.env.DEBUG;
      }

      debug('env: %O', env);

      const jestConfigFilePath = toPath(projectRoot, jestConfigProjectBase);

      softAssert(
        await isAccessible(jestConfigFilePath, { useCached: true }),
        ErrorMessage.MissingConfigurationFile(jestConfigFilePath)
      );

      // ! Test path patterns should begin with a slash (/)
      const jestTestPathPatterns: string[] = [];
      const isCwdTheProjectRoot = isRootPackage(cwdPackage);
      const npxJestArguments: string[] = [];

      if (runtime === 'default') {
        npxJestArguments.push('jest');
      } else {
        npxJestArguments.push(
          '--yes',
          runtime,
          toPath(projectRoot, 'node_modules/.bin/jest')
        );
      }

      if (scope === TesterScope.ThisPackageIntermediates) {
        npxJestArguments.push('--rootDir', toPath(packageRoot, '.transpiled'));
      }

      const npxTstycheArguments = [
        'tstyche',
        '--config',
        `${projectRoot}/${tstycheConfigProjectBase}`,
        '--tsconfig',
        `${projectRoot}/${Tsconfig.ProjectBase}`
      ];

      if (collectCoverage) {
        npxJestArguments.push(
          '--coverage',
          `--coverageDirectory=${toPath(packageRoot, 'coverage')}`
        );
      }

      // ? Jest configs typically expect NODE_ENV to be "test"

      const testPathIgnorePatterns = await (async function () {
        const originalNodeEnv = process.env.NODE_ENV;
        try {
          process.env.NODE_ENV = 'test';
          const jestConfig = await import(jestConfigFilePath);

          softAssert(
            Array.isArray(jestConfig?.default?.testPathIgnorePatterns),
            ErrorMessage.CannotExtractTestPathIgnorePatternsFromJestConfig()
          );

          return jestConfig.default.testPathIgnorePatterns as string[];
        } catch (error) {
          throw new CliError(ErrorMessage.CannotImportJestConfig(jestConfigFilePath), {
            cause: error
          });
        } finally {
          process.env.NODE_ENV = originalNodeEnv;
        }
      })();

      const buildTargetPackages = new Set<Package>();
      const buildExtraneousPackages = new Set<Package>();

      if (!baseline) {
        if (collectCoverage) {
          npxJestArguments.push(
            `--collectCoverageFrom=${
              'relativeRoot' in cwdPackage ? cwdPackage.relativeRoot + '/' : ''
            }src/**/*.ts?(x)`
          );
        }

        if (scope === TesterScope.Unlimited) {
          if (collectCoverage) {
            npxJestArguments.push(
              `--collectCoverageFrom=${directoryPackagesProjectBase}/*/src/**/*.ts?(x)`
            );
          }
        } else {
          const {
            targets: { external: externalBuildTargets_ }
          } = await gatherPackageBuildTargets(cwdPackage, {
            allowMultiversalImports: true,
            includeInternalTestFiles: scope === TesterScope.ThisPackageIntermediates,
            useCached: true
          });

          const externalBuildTargets = externalBuildTargets_.normal;

          if (collectCoverage) {
            npxJestArguments.push(
              ...externalBuildTargets
                .values()
                .filter((path) => {
                  return (
                    (path.endsWith('.ts') || path.endsWith('.tsx')) &&
                    !path.endsWith('.d.ts')
                  );
                })
                .map((path) => {
                  return `--collectCoverageFrom=${path}`;
                })
            );
          }

          const allPackagesExceptCwd = Array.from(
            (subRootPackages?.values() || []).filter(
              ({ root }) => root !== cwdPackage.root
            ) as Package[]
          ).concat(
            !isCwdTheProjectRoot && rootPackage.attributes[ProjectAttribute.Hybridrepo]
              ? [rootPackage]
              : []
          );

          debug('allPackagesExceptCwd: %O', allPackagesExceptCwd);

          for (const package_ of allPackagesExceptCwd) {
            buildExtraneousPackages.add(package_);
          }

          for (const buildTargetPath of externalBuildTargets) {
            const buildTargetPackage = allPackagesExceptCwd.find((package_) => {
              return 'relativeRoot' in package_
                ? buildTargetPath.startsWith(package_.relativeRoot)
                : !buildTargetPath.startsWith(`${directoryPackagesProjectBase}/`);
            });

            if (buildTargetPackage) {
              buildTargetPackages.add(buildTargetPackage);
              buildExtraneousPackages.delete(buildTargetPackage);
            }
          }
        }

        if (tests.includes(Test.Unit)) {
          // ? These sorts of patterns match at any depth (leading / isn't root)
          jestTestPathPatterns.push(String.raw`/test(/.*)?/unit(-.*)?\.test\.(j|t)sx?`);
        }

        if (tests.includes(Test.Integration)) {
          jestTestPathPatterns.push(
            String.raw`/test(/.*)?/integration(-.*)?\.test\.(j|t)sx?`
          );
        }

        if (tests.includes(Test.EndToEnd)) {
          jestTestPathPatterns.push(String.raw`/test(/.*)?/e2e(-.*)?\.test\.(j|t)sx?`);
        }

        // ? These are all the paths (mostly package roots) that should NOT have
        // ? their tests run; note that they are in Jest-style and shouldn't
        // ? have leading or trailing / (which will be inserted later when
        // ? necessary)
        const testIgnorePathSegments = buildExtraneousPackages
          .values()
          .map((package_) => {
            return isRootPackage(package_)
              ? toPath(projectRoot.slice(1), directoryTestPackageBase)
              : toRelativePath(projectRoot, package_.root);
          });

        testPathIgnorePatterns.push(
          ...testIgnorePathSegments.map((root) => `/${root}/`)
        );

        if (testPathIgnorePatterns.length) {
          npxJestArguments.push(
            `--testPathIgnorePatterns=${testPathIgnorePatterns.map((p) => `(${p})`).join('|')}`
          );
        }
      }

      debug('buildTargetPackages: %O', buildTargetPackages);
      debug('buildExtraneousPackages: %O', buildExtraneousPackages);

      if (isRepeating) {
        npxJestArguments.push('--reporters=jest-silent-reporter');
      }

      // ? Jest's CLI array intake ability is trash, so all array-taking
      // ? args need to be followed by another arg (i.e. --something)
      npxJestArguments.push('--inject-globals');

      // ? Order matters, so keep these here due to how Jest CLI handles arrays.
      // ? E.g. the user might add extra array arguments, so they have to be
      // ? followed by a non-array argument since we append file paths (below)
      npxJestArguments.push(
        ...testerOptions,
        `--config=${projectRoot}/${jestConfigProjectBase}`
      );

      let hasTstycheTargets = false;

      if (!baseline) {
        const tstycheTargetAbsolutePaths = await gatherProjectFiles(projectMetadata, {
          useCached: true
        }).then(({ typescriptTestFiles }) => {
          if (scope === TesterScope.ThisPackage) {
            const ownFiles = isCwdTheProjectRoot
              ? typescriptTestFiles.inRootTest
              : typescriptTestFiles.inWorkspaceTest.get(cwdPackage.id)!;

            return ownFiles.concat(
              buildTargetPackages
                .values()
                .flatMap((package_) => {
                  return isRootPackage(package_)
                    ? typescriptTestFiles.inRootTest
                    : typescriptTestFiles.inWorkspaceTest.get(package_.id)!;
                })
                .toArray()
            );
          }

          return typescriptTestFiles.all;
        });

        const tstycheTargetRelativePaths = tstycheTargetAbsolutePaths
          .filter(
            (path) =>
              path.startsWith(packageRoot + '/') && tstycheTargetRegExp.test(path)
          )

          // ? tstyche needs paths to be relative to the PROJECT root
          .map((path) => toRelativePath(projectRoot, path) as string);

        debug('tstycheTargetRelativePaths: %O', tstycheTargetRelativePaths);

        hasTstycheTargets = !!tstycheTargetRelativePaths.length;
        npxTstycheArguments.push(...tstycheTargetRelativePaths);
      }

      npxTstycheArguments.push(...testerOptions);
      // ? We don't need to limit jest's test path patterns (e.g. with a
      // ? relativeRoot prefix) since (1) we use a denylist approach instead via
      // ? --testPathIgnorePatterns and (2) these patterns are regular
      // ? expressions so they aren't root relative and match at any depth
      npxJestArguments.push(...jestTestPathPatterns);

      debug('npxTstycheArguments: %O', npxTstycheArguments);
      debug('npxJestArguments: %O', npxJestArguments);

      const shouldRunTstycheTests = tests.includes(Test.Type);
      const shouldRunJestTests = tests.length > 1 || !shouldRunTstycheTests;

      debug('will run tstyche tests: %O', shouldRunTstycheTests);
      debug('will run jest tests: %O', shouldRunJestTests);

      // TODO: replace this and the rest with listr2

      for (let iteration = 0, max = repeat; iteration < max; ++iteration) {
        if (isRepeating) {
          genericLogger(
            [LogTag.IF_NOT_QUIETED],
            `Repeating test suite [run ${iteration + 1}/${max}]...`
          );
        } else {
          genericLogger.newline([LogTag.IF_NOT_QUIETED]);
        }

        const [tstycheResult, jestResult] = await Promise.all([
          shouldRunTstycheTests
            ? // ? Always run tstyche if custom tester options were given
              hasTstycheTargets || testerOptions.length
              ? // {@symbiote/notExtraneous tstyche}
                runNoRejectOnBadExit('npx', npxTstycheArguments, {
                  all: true,
                  env,
                  cwd: projectRoot
                })
              : Promise.resolve({
                  all: `${SHORT_TAB}(${tstycheVacuousSuccessMessage.toLowerCase()})`,
                  exitCode: 0
                })
            : Promise.resolve({
                all: `${SHORT_TAB}(tstyche tests were skipped)`,
                exitCode: 0
              }),
          shouldRunJestTests
            ? runNoRejectOnBadExit('npx', npxJestArguments, {
                env,
                cwd: projectRoot,
                stdout: isHushed ? 'ignore' : 'inherit',
                stderr: isQuieted ? 'ignore' : 'inherit'
              })
            : Promise.resolve({
                all: `${SHORT_TAB}(jest tests were skipped)`,
                exitCode: 0
              })
        ]);

        const { all: tstycheOutput_, exitCode: tstycheExitCode } = tstycheResult;
        const tstycheOutput = [tstycheOutput_ || ''].flat().join('\n');

        const isTstycheError =
          tstycheExitCode !== 0 &&
          !tstycheOutput.includes(
            'No test files were selected using current configuration'
          );

        if (!isRepeating) {
          debug('tstycheOutput: %O', tstycheOutput);
          debug('isTstycheError: %O', isTstycheError);
          debug('tstycheExitCode: %O', tstycheExitCode);

          if (isTstycheError) {
            if (shouldRunJestTests) {
              genericLogger.newline([LogTag.IF_NOT_QUIETED]);
            }

            if (!isQuieted) {
              if (tstycheOutput) {
                process.stderr.write(tstycheOutput + '\n');
              } else {
                genericLogger.error(
                  [LogTag.IF_NOT_QUIETED],
                  '%O returned exit code %O but generated no output',
                  'tstyche',
                  tstycheExitCode
                );
              }
            }
          } else if (!isHushed) {
            if (shouldRunJestTests) {
              genericLogger.newline();
            }

            if (tstycheExitCode !== 0) {
              genericLogger([LogTag.IF_NOT_HUSHED], tstycheVacuousSuccessMessage);
            } else {
              process.stdout.write(tstycheOutput + '\n');
            }
          }
        }

        if (!isHushed && jestResult.all) {
          genericLogger.newline();

          // ? The only output will be if Jest is skipped
          process.stdout.write(String(jestResult.all) + '\n');
        }

        if (isTstycheError || jestResult.exitCode !== 0) {
          genericLogger.newline([LogTag.IF_NOT_HUSHED]);
          softAssert(ErrorMessage.TestingFailed());
        }

        if (isRepeating) {
          genericLogger([LogTag.IF_NOT_QUIETED], 'Run succeeded!');
          // ? Give the OS and filesystem some breathing room...
          await delay(150);
        }
      }

      genericLogger.newline([LogTag.IF_NOT_QUIETED]);
      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  };
}
