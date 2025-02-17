import { toRelativePath } from '@-xun/fs';

import {
  dotEnvConfigPackageBase,
  dotEnvDefaultConfigPackageBase,
  isAccessible
} from '@-xun/project';

import { LogTag } from '@-xun/cli/logging';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';
import { readFile } from 'universe:util.ts';

import type { Asset } from 'universe:assets.ts';

// {@symbiote/notExtraneous dotenv-cli}

const startsWithAlphaNumeric = /^[a-z0-9]/i;

/**
 * The example contents of a default dotenv file.
 *
 * ! Trimmed.
 */
const dotEnvDefaultFileContents = `
# shellcheck disable=all

# Codecov test analysis token
#
# The token used during CI/CD to analyze and upload build artifact code quality
# data to Codecov. NOTE THAT, alongside generating this token, you should take
# the time to enable codecov's flags functionality if this is not a polyrepo.
CODECOV_TOKEN=

# GitHub deploy token (alias GH_TOKEN)
#
# The token used during CI/CD to interact with GitHub's API.
GITHUB_TOKEN=

# NPM deploy token
#
# The token used during CD to login to NPM. Not referenced during non-CI/CD
# (i.e. local, manual) deployments.
NPM_TOKEN=

# Git push author name
#
# The token used during CD to set the author name of the git push.
GIT_AUTHOR_NAME=

# Git commit committer name
#
# The token used during CD to set the name attached to any git commits.
GIT_COMMITTER_NAME=

# Git push author email
#
# The token used during CD to set the author email of the git push.
GIT_AUTHOR_EMAIL=

# Git commit committer email
#
# The token used during CD to set the email attached to any git commits.
GIT_COMMITTER_EMAIL=

# GPG private key passphrase
#
# The passphrase used to unlock GPG_PRIVATE_KEY. Not referenced during non-CI/CD
# (i.e. local, manual) deployments.
GPG_PASSPHRASE=

# GPG private key
#
# The GPG key used to sign all git commits and releases. Not referenced during
# non-CI/CD (i.e. local, manual) deployments.
GPG_PRIVATE_KEY=
`.trim();

export const { transformer } = makeTransformer(function (context) {
  const { toProjectAbsolutePath, forceOverwritePotentiallyDestructive, log, debug } =
    context;

  const secretsFilePath = toProjectAbsolutePath(dotEnvConfigPackageBase);
  const defaultsFilePath = toProjectAbsolutePath(dotEnvDefaultConfigPackageBase);

  // ! CAREFUL not to log sensitive information!
  debug('secretsFilePath: %O', secretsFilePath);
  debug('defaultsFilePath: %O', defaultsFilePath);

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    // ? Only create these files if they don't already exist
    const [doesDefaultsFileAlreadyExist, doesSecretsFileAlreadyExist] =
      await Promise.all([
        isAccessible(defaultsFilePath, { useCached: true }),
        isAccessible(secretsFilePath, { useCached: true })
      ]);

    const shouldGenerateDefaultsFile =
      forceOverwritePotentiallyDestructive || !doesDefaultsFileAlreadyExist;

    const shouldGenerateSecretsFile =
      forceOverwritePotentiallyDestructive || !doesSecretsFileAlreadyExist;

    const assets: Asset[] = [];

    if (shouldGenerateDefaultsFile) {
      assets.push({
        path: defaultsFilePath,
        generate: () => generateDefaultDotEnv()
      });
    }

    if (shouldGenerateSecretsFile) {
      if (doesSecretsFileAlreadyExist) {
        log.warn(
          [LogTag.IF_NOT_QUIETED],
          // ! CAREFUL not to log sensitive information!
          'May append new secrets to a sensitive file (current secrets preserved): %O',
          toRelativePath(toProjectAbsolutePath(), secretsFilePath)
        );
      }

      assets.push({
        path: secretsFilePath,
        generate: () => generateRealDotEnv()
      });
    }

    return assets;
  });

  async function generateDefaultDotEnv() {
    // ! CAREFUL not to log sensitive information!
    debug('generating default dotenv file');

    const __SENSITIVE__currentDotEnv = await readInDotEnv(secretsFilePath);

    let outputFileContents =
      (await readInDotEnv(defaultsFilePath)) || dotEnvDefaultFileContents;

    if (__SENSITIVE__currentDotEnv) {
      const currentDotEnvVariables = dotEnvFileToVariablesSet(
        __SENSITIVE__currentDotEnv
      );

      // ! CAREFUL not to log sensitive information!
      debug('currentDotEnvVariables: %O', currentDotEnvVariables);

      const defaultDotEnvVariables = dotEnvFileToVariablesSet(outputFileContents);

      // ! CAREFUL not to log sensitive information!
      debug('defaultDotEnvVariables: %O', defaultDotEnvVariables);

      const dotEnvVariablesInCurrentButNotDefault =
        currentDotEnvVariables.difference(defaultDotEnvVariables);

      // ! CAREFUL not to log sensitive information!
      debug(
        'dotEnvVariablesInCurrentButNotDefault: %O',
        dotEnvVariablesInCurrentButNotDefault
      );

      if (dotEnvVariablesInCurrentButNotDefault.size) {
        // ! CAREFUL not to log sensitive information!
        log.message(
          [LogTag.IF_NOT_QUIETED],
          'One or more variables already in %O but not in the generated %O were added to it',
          secretsFilePath,
          dotEnvDefaultConfigPackageBase
        );

        outputFileContents +=
          '\n\n# TODO: document these\n' +
          variablesSetToDotEnvFile(dotEnvVariablesInCurrentButNotDefault);
      }
    }

    return outputFileContents;
  }

  // ! NEVER log the return value of this function
  async function generateRealDotEnv() {
    // ! CAREFUL not to log sensitive information!
    debug('generating real dotenv file');

    let __SENSITIVE__outputFileContents = await readInDotEnv(secretsFilePath);

    const actualDotEnvDefaultFileContents =
      (await readInDotEnv(defaultsFilePath)) || dotEnvDefaultFileContents;

    const defaultDotEnvVariables = dotEnvFileToVariablesSet(
      actualDotEnvDefaultFileContents
    );

    const defaultDotEnvVariablesWithValues = dotEnvFileToVariablesSet(
      actualDotEnvDefaultFileContents,
      { withValues: true }
    );

    // ! CAREFUL not to log sensitive information!
    debug('defaultDotEnvVariables: %O', defaultDotEnvVariables);
    debug('defaultDotEnvVariablesWithValues: %O', defaultDotEnvVariablesWithValues);

    if (__SENSITIVE__outputFileContents) {
      const currentDotEnvVariables = dotEnvFileToVariablesSet(
        __SENSITIVE__outputFileContents
      );

      // ! CAREFUL not to log sensitive information!
      debug('currentDotEnvVariables: %O', currentDotEnvVariables);

      const dotEnvVariablesInDefaultButNotCurrent =
        defaultDotEnvVariables.difference(currentDotEnvVariables);

      // ! CAREFUL not to log sensitive information!
      debug(
        'dotEnvVariablesInDefaultButNotCurrent: %O',
        dotEnvVariablesInDefaultButNotCurrent
      );

      const defaultDotEnvVariablesWithValuesArray = defaultDotEnvVariablesWithValues
        .values()
        .toArray();

      // ? We NEVER overwrite the current secrets file, we only append to it
      __SENSITIVE__outputFileContents +=
        '\n' +
        variablesSetToDotEnvFile(
          new Set(
            dotEnvVariablesInDefaultButNotCurrent.values().map((v) => {
              return defaultDotEnvVariablesWithValuesArray.find((v_) =>
                v_.startsWith(v + '=')
              )!;
            })
          )
        );
    } else {
      __SENSITIVE__outputFileContents = variablesSetToDotEnvFile(
        defaultDotEnvVariablesWithValues
      );
    }

    // ! CAREFUL not to log sensitive information!
    debug('output file content size: ~%O bytes', __SENSITIVE__outputFileContents.length);
    return __SENSITIVE__outputFileContents;
  }

  async function readInDotEnv(path: string) {
    return readFile(path).then(
      (result) => result.trim(),
      (error: unknown) => {
        // ! CAREFUL not to log sensitive information!
        debug.message(`unable to read in file: %O`, path);
        debug(error);
        return '';
      }
    );
  }
});

function dotEnvFileToVariablesSet(
  contents: string,
  { withValues = false }: { withValues?: boolean } = {}
) {
  return new Set(
    contents
      .split('\n')
      .filter((str) => startsWithAlphaNumeric.test(str) && str.includes('='))
      .map((str) => (withValues ? str : str.split('=')[0]!))
  );
}

function variablesSetToDotEnvFile(variables: Set<string>) {
  return variables
    .values()
    .map((v) => (v.includes('=') ? v : v + '='))
    .toArray()
    .join('\n');
}
