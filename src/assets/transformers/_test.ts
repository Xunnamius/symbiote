import { directoryTestPackageBase, isAccessible, isRootPackage } from '@-xun/project';

import {
  generatePerPackageAssets,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

// {@symbiote/notExtraneous @-xun/jest}

const bt = '`';

export const { transformer } = makeTransformer(async function (context) {
  const { toProjectAbsolutePath, forceOverwritePotentiallyDestructive: force } = context;

  return [
    ...// * Only the root package gets these files
    (await generateRootOnlyAssets(context, async function () {
      const outputDir = toProjectAbsolutePath(directoryTestPackageBase);

      // ? Only create this file if its parent directory does not already exist
      if (force || !(await isAccessible(outputDir, { useCached: true }))) {
        return [
          {
            path: toProjectAbsolutePath(directoryTestPackageBase, 'util.ts'),
            generate: () => /*js*/ `
/**
 ** This file exports test utilities specific to this project and beyond what is
 ** exported by @-xun/jest; these can be imported using the testversal aliases.
 */

// ? @-xun/jest will always come from @-xun/symbiote (i.e. transitively)
// {@symbiote/notInvalid @-xun/jest}

export * from '@-xun/jest';`
          },
          {
            path: toProjectAbsolutePath(directoryTestPackageBase, 'setup.ts'),
            generate: () => /*js*/ `
/**
 ** This file is automatically imported by Jest, and is responsible for
 **  bootstrapping the runtime for every test file.
 */

// ? jest-extended will always come from @-xun/symbiote (i.e. transitively)
// {@symbiote/notInvalid jest-extended}

// ? https://github.com/jest-community/jest-extended#typescript
import 'jest-extended';
import 'jest-extended/all';`
          }
        ];
      }
    })),

    ...// * Every package gets these files except non-hybrid monorepo roots
    (await generatePerPackageAssets(
      context,
      async function ({
        package_,
        toPackageAbsolutePath,
        contextWithCwdPackage: { cwdPackagePartialImportSpecifier }
      }) {
        const outputDir = toPackageAbsolutePath(directoryTestPackageBase);
        const debugNamespace = isRootPackage(package_)
          ? package_.json.name.split('/').at(-1)!
          : package_.id;

        // ? Only create these files if their parent directory does not already
        // ? exist
        if (force || !(await isAccessible(outputDir, { useCached: true }))) {
          return [
            {
              path: toProjectAbsolutePath(outputDir, 'unit.test.ts'),
              generate: () => /*js*/ `
// * These tests ensure the exported interfaces under test function as expected.

describe('::todo', () => {
  test.todo('this');
});`
            },

            {
              path: toProjectAbsolutePath(outputDir, 'type.test.ts'),
              generate: () => /*js*/ `
// * These tests ensure the exported types under test function as expected.

import { describe, test } from 'tstyche';

describe('::todo', () => {
  test.todo('this');
});`
            },

            {
              path: toProjectAbsolutePath(outputDir, 'integration', '.config.ts'),
              generate: () => /*js*/ `
// * Configuration state and metadata shared among all integration tests.

export {};`
            },
            {
              path: toProjectAbsolutePath(
                outputDir,
                'integration',
                'integration-smoke.test.ts'
              ),
              generate: () => /*js*/ `
// * These brutally minimal "smoke" tests ensure this software can be invoked
// * and, when it is, exits cleanly. Functionality testing is not the goal here.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import {
  exports as packageExports,
  name as packageName
} from 'rootverse${cwdPackagePartialImportSpecifier}:package.json';

import {
  ensurePackageHasBeenBuilt,
  reconfigureJestGlobalsToSkipTestsInThisFileIfRequested
} from 'testverse:util.ts';

const TEST_IDENTIFIER = ${bt}\${packageName.split('/').at(-1)!}-integration-smoke${bt};
const debug = createDebugLogger({ namespace: '${debugNamespace}' }).extend(TEST_IDENTIFIER);
const nodeVersion = process.env.XPIPE_MATRIX_NODE_VERSION || process.version;

debug(${bt}nodeVersion: "\${nodeVersion}" (process.version=\${process.version})${bt});

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(toAbsolutePath(require.resolve('rootverse${cwdPackagePartialImportSpecifier}:package.json'))),
    packageName,
    packageExports
  );
});

test.todo('this');`
            },
            {
              path: toProjectAbsolutePath(
                outputDir,
                'integration',
                'integration-client.test.ts'
              ),
              generate: () => /*js*/ `
// * These tests verify that consumers of this software actually receive an API
// * that behaves as described in help text and other documentation. Typically,
// * these integration tests limit module-level mocking to peripheral concerns
// * (e.g. mocking output handling and mocking networking while eschewing
// * filesystem mocking) in favor of testing a "fully integrated" system.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import {
  exports as packageExports,
  name as packageName
} from 'rootverse${cwdPackagePartialImportSpecifier}:package.json';

import {
  ensurePackageHasBeenBuilt,
  reconfigureJestGlobalsToSkipTestsInThisFileIfRequested
} from 'testverse:util.ts';

const TEST_IDENTIFIER = ${bt}\${packageName.split('/').at(-1)!}-integration-client${bt};
const debug = createDebugLogger({ namespace: '${debugNamespace}' }).extend(TEST_IDENTIFIER);
const nodeVersion = process.env.XPIPE_MATRIX_NODE_VERSION || process.version;

debug(${bt}nodeVersion: "\${nodeVersion}" (process.version=\${process.version})${bt});

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(toAbsolutePath(require.resolve('rootverse${cwdPackagePartialImportSpecifier}:package.json'))),
    packageName,
    packageExports
  );
});

test.todo('this');`
            },

            {
              path: toProjectAbsolutePath(outputDir, 'end-to-end', '.config.ts'),
              generate: () => /*js*/ `
// * Configuration state and metadata shared among all end-to-end tests.

export {};`
            },
            {
              path: toProjectAbsolutePath(outputDir, 'end-to-end', 'e2e.test.ts'),
              generate: () => /*js*/ `
// * These tests run through the entire process of acquiring this software,
// * using its features, and dealing with its error conditions across a variety
// * of runtimes (e.g. the currently maintained node versions).
// *
// * Typically, these tests involve the use of deep mock fixtures and/or Docker
// * containers, and are built to run in GitHub Actions CI pipelines; some can
// * also be run locally.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import {
  exports as packageExports,
  name as packageName
} from 'rootverse${cwdPackagePartialImportSpecifier}:package.json';

import {
  ensurePackageHasBeenBuilt,
  reconfigureJestGlobalsToSkipTestsInThisFileIfRequested
} from 'testverse:util.ts';

const TEST_IDENTIFIER = ${bt}\${packageName.split('/').at(-1)!}-e2e${bt};
const debug = createDebugLogger({ namespace: '${debugNamespace}' }).extend(TEST_IDENTIFIER);
const nodeVersion = process.env.XPIPE_MATRIX_NODE_VERSION || process.version;

debug(${bt}nodeVersion: "\${nodeVersion}" (process.version=\${process.version})${bt});

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(toAbsolutePath(require.resolve('rootverse${cwdPackagePartialImportSpecifier}:package.json'))),
    packageName,
    packageExports
  );
});

test.todo('this');`
            }
          ];
        }
      }
    ))
  ];
});
