import {
  assertIsExpectedTransformerContext,
  makeTransformer
} from 'universe assets/index.ts';

import type { EmptyObject } from 'type-fest';

export type Context = EmptyObject;

export const { transformer } = makeTransformer<Context>({
  transform(context) {
    const { name } = assertIsExpectedTransformerContext(context);

    return {
      [name]: `
# shellcheck disable=all

# Codecov test analysis token
#
# Required: if deploying
# On-Sync: mirror
#
# The token used during CI/CD to analyze and upload build artifact code quality
# data to Codecov.
CODECOV_TOKEN=

# GitHub deploy token
#
# Alias: GH_TOKEN
# Required: if deploying
# On-Sync: mirror
#
# The token used during CI/CD to interact with GitHub's API.
GITHUB_TOKEN=

# NPM deploy token
#
# Required: if deploying
# On-Sync: mirror
#
# The token used during CD to login to NPM. Not referenced during non-CI/CD
# (i.e. local, manual) deployments.
NPM_TOKEN=

# Git push author name
#
# Required: if deploying
# On-Sync: mirror
#
# The token used during CD to set the author name of the git push.
GIT_AUTHOR_NAME=

# Git commit committer name
#
# Required: if deploying
# On-Sync: mirror
#
# The token used during CD to set the name attached to any git commits.
GIT_COMMITTER_NAME=

# Git push author email
#
# Required: if deploying
# On-Sync: mirror
#
# The token used during CD to set the author email of the git push.
GIT_AUTHOR_EMAIL=

# Git commit committer email
#
# Required: if deploying
# On-Sync: mirror
#
# The token used during CD to set the email attached to any git commits.
GIT_COMMITTER_EMAIL=

# GPG private key passphrase
#
# Required: if deploying with CI/CD
# On-Sync: mirror
#
# The passphrase used to unlock GPG_PRIVATE_KEY. Not referenced during non-CI/CD
# (i.e. local, manual) deployments.
GPG_PASSPHRASE=

# GPG private key
#
# Required: if deploying with CI/CD
# On-Sync: mirror
#
# The GPG key used to sign all git commits and releases. Not referenced during
# non-CI/CD (i.e. local, manual) deployments.
GPG_PRIVATE_KEY=
`.trimStart()
    };
  }
});
