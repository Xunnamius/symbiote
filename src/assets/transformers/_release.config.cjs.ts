// * The semantic-release plugin exports replaces the following functionality:
// * - @semantic-release/release-notes-generator
// * - @semantic-release/changelog

// {@symbiote/notExtraneous @-xun/release @semantic-release/exec}
import assert from 'node:assert';
import crypto from 'node:crypto';
import { readFile, rm as rmFile, writeFile } from 'node:fs/promises';
import os from 'node:os';

import { getInvocableExtendedHandler } from '@-xun/cli';
import { toAbsolutePath, toPath, toRelativePath } from '@-xun/fs';

import {
  analyzeProjectStructure,
  isRootPackage,
  xchangelogConfigProjectBase,
  xreleaseConfigProjectBase
} from '@-xun/project';

import { ProjectError } from '@-xun/project/error';
import { run } from '@-xun/run';
import { createDebugLogger, createGenericLogger } from 'rejoinder';
import { createGithubLogger } from 'rejoinder-github-actions';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';
import buildChangelog, { OutputOrder } from 'universe:commands/build/changelog.ts';
import projectPrepare from 'universe:commands/project/prepare.ts';

import {
  configureExecutionContext,
  ThisPackageGlobalScope,
  UnlimitedGlobalScope
} from 'universe:configure.ts';

import { globalDebuggerNamespace, globalLoggerNamespace } from 'universe:constant.ts';
import { ErrorMessage } from 'universe:error.ts';

import {
  deriveScopeNarrowingPathspecs,
  determineRepoWorkingTreeDirty,
  noSpecialInitialCommitIndicator
} from 'universe:util.ts';

import type {
  XchangelogConfig,
  XchangelogConfigOptions
} from '@-xun/changelog' with { 'resolution-mode': 'import' };

import type { ExecutionContext } from '@-xun/cli';
import type { ProjectMetadata } from '@-xun/project';

import type {
  GenerateNotesContext,
  Options as ReleaseConfig,
  SuccessContext,
  VerifyConditionsContext
} from 'semantic-release' with { 'resolution-mode': 'import' };

import type { WritableDeep } from 'type-fest';
import type { CustomCliArguments as BuildChangelogCliArguments } from 'universe:commands/build/changelog.ts';
import type { CustomCliArguments as ProjectPrepareCliArguments } from 'universe:commands/project/prepare.ts';
import type { GlobalExecutionContext } from 'universe:configure.ts';

const debug = createDebugLogger({
  namespace: `${globalDebuggerNamespace}:asset:release`
});

const log = createGenericLogger({
  namespace: `${globalLoggerNamespace}:asset:release`
});

const verifyConditionsDebug = debug.extend('verifyConditions');
const generateNotesDebug = debug.extend('generateNotes');
const successDebug = debug.extend('success');

const pluginLog = log.extend('post-release');

const ghaLog = createGithubLogger({
  namespace: `${globalLoggerNamespace}:asset:release:post-release`
});

export type { ReleaseConfig };
export { noSpecialInitialCommitIndicator };

/**
 * Writable xrelease (semantic-release) options.
 *
 * Can be used to set any core option or plugin options. Each option will take
 * precedence over options configured in the configuration file and shareable
 * configurations.
 *
 * @see {@link ReleaseConfig}
 */
export type WritableReleaseConfig = WritableDeep<ReleaseConfig>;

/**
 * The custom configuration object expected by the custom semantic-release
 * plugin steps defined below.
 */
export type PluginConfig = {
  projectRelativePackageLockPath: string;
  releaseSectionPath: string;
  parserOpts: NonNullable<XchangelogConfigOptions['parserOpts']>;
  writerOpts: NonNullable<XchangelogConfigOptions['writerOpts']>;
  [key: string]: unknown;
};

/**
 * @see {@link assertEnvironment}
 */
export function moduleExport({
  parserOpts,
  writerOpts,
  specialInitialCommit,
  projectMetadata
}: Pick<PluginConfig, 'parserOpts' | 'writerOpts'> & {
  specialInitialCommit: string;
  projectMetadata: ProjectMetadata;
}): WritableReleaseConfig {
  debug('specialInitialCommit: %O', specialInitialCommit);

  const releaseSectionPath = toPath(
    os.tmpdir(),
    `symbiote-release-changelog-${crypto.randomBytes(4).readUInt32LE(0).toString(16)}.md`
  );

  debug('releaseSectionPath: %O', releaseSectionPath);

  const gitLogPathspecs = deriveScopeNarrowingPathspecs({ projectMetadata });

  const {
    cwdPackage,
    rootPackage: { root: projectRoot }
  } = projectMetadata;

  const cwdPackageName = cwdPackage.json.name;

  const projectRelativePackageLockPath = isRootPackage(cwdPackage)
    ? 'package-lock.json'
    : toRelativePath(cwdPackage.root, toPath(projectRoot, 'package-lock.json'));

  const finalConfig = {
    // ? Tell xrelease what package-specific tags look like
    tagFormat: `${cwdPackageName}@\${version}`,
    // ? Tell xrelease to remove this string from maintenance branch names when
    // ? resolving their respective ranges and channels
    branchRangePrefix: `${cwdPackageName}@`,
    gitLogOptions: {
      // ? Tell xrelease to exclude commits up to and including a special
      // ? "initial commit" that serves to divide repo history, with the portion
      // ? at and/or after said commit being ignored entirely (as if all
      // ? commits before and including the initial commit didn't exist at all)
      flags:
        specialInitialCommit !== noSpecialInitialCommitIndicator
          ? `^${specialInitialCommit}`
          : '',
      // ? Tell xrelease to exclude commits from the other packages
      // ? unless that package is "shared" (according to @-xun/project)
      paths: gitLogPathspecs
    },
    branches: [
      // ? Tell xrelease what package-specific maintenance branch names look
      // ? like. Specifically: they must begin with `branchRangePrefix`
      `${cwdPackageName}@+([0-9])?(.{+([0-9]),x}).x`,
      'main',
      {
        name: 'canary',
        channel: 'canary',
        prerelease: true
      }
    ],
    plugins: [
      // * Prepare

      [
        // This comes bundled with semantic-release
        '@semantic-release/commit-analyzer',
        {
          parserOpts,
          releaseRules: [
            // ? releaseRules are checked first; if none match, defaults are
            // ? checked next.

            // ! These two lines must always appear first and in order:
            { breaking: true, release: 'major' },
            { revert: true, release: 'patch' },

            // * Custom release rules, if any, may appear next:
            { type: 'build', release: 'patch' }
          ]
        }
      ],
      // ? This block pulls in a custom semantic-release plugin that mutates
      // ? internal state as required.
      [
        `@-xun/symbiote/assets/${xreleaseConfigProjectBase}`,
        {
          projectRelativePackageLockPath,
          releaseSectionPath,
          parserOpts,
          writerOpts: {
            ...writerOpts,
            finalizeContext(context: XchangelogConfig['context']) {
              context.packageName = cwdPackageName;
              return context;
            }
          }
        }
      ],

      // * Publish

      // ! This ordering is important to ensure errors stop the process safely
      // ! and that broken builds are not published. The proper order is:
      // ! NPM (+ attestations) > Git > GitHub.

      // ! Note that the order here is not the exact run order since different
      // ! plugins have different hooks that are executed at different points.
      // ! Specifically: a git commit is created BEFORE npm publish runs. This
      // ! is why we need to commit package-lock.json after the fact (during the
      // ! "success" step), which we do below.

      // ! See: https://github.com/semantic-release/semantic-release/blob/master/docs/usage/plugins.md

      // TODO: add support for GitHub Actions build provenance attestations here
      // This comes bundled with semantic-release
      '@semantic-release/npm',
      [
        // {@symbiote/notExtraneous @semantic-release/git}
        '@semantic-release/git',
        {
          assets: [
            'package.json',
            projectRelativePackageLockPath,
            'CHANGELOG.md',
            'docs',
            'LICENSE',
            'README.md'
          ],
          // ? Make sure we send out the patched release notes (i.e. changelog)
          message: `release: ${cwdPackageName}@<%= nextRelease.version %> [skip ci]\n\n<%= nextRelease.notes %>`
        }
      ],
      // This comes bundled with semantic-release
      [
        '@semantic-release/github',
        {
          successComment:
            '🚀✨ This ${issue.pull_request ? "pull request" : "issue\'s resolution"} was included in ' +
            cwdPackageName +
            '@${nextRelease.version} ✨🚀' +
            String.raw`<%
          const releaseInfos = releases.filter((release) => Boolean(release.name));

          ${linkify.toString()}

          ${getSuccessCommentSuffix.toString()}

          const result = getSuccessCommentSuffix();
          %><%= result %>`,
          // ? Labels added to issues/PRs with contents included in this release
          releasedLabels: [
            cwdPackageName +
              ':released<%= nextRelease.channel ? ` (${nextRelease.channel})` : "" %>'
          ],
          // ? Labels added to the newly created issue/PR when the release fails
          labels: false,
          // ? Users added to the newly created issue/PR when the release fails
          assignees: ['Xunnamius']
        }
      ]
    ]
  } satisfies ReleaseConfig;

  return finalConfig;
}

// * This function is from semantic-release's source:
// * https://github.com/semantic-release/github/blob/df69c49ca7bc0b4e7116b7c57cb0c7efddb12f64/lib/get-success-comment.js#L9
function linkify(releaseInfo: { url: string; name: string }) {
  return releaseInfo.url
    ? `[${releaseInfo.name}](${releaseInfo.url})`
    : `\`${releaseInfo.name}\``;
}

// ? This useless unused variable is here to silence complaints from typescript
const releaseInfos:
  | [{ url: string; name: string }]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | [{ url: string; name: string }, { url: string; name: string }] = [] as any;

// * This function is from semantic-release's source:
// * https://github.com/semantic-release/github/blob/df69c49ca7bc0b4e7116b7c57cb0c7efddb12f64/lib/get-success-comment.js#L9
function getSuccessCommentSuffix() {
  return releaseInfos.length > 0
    ? `\n\nThe release is available on${
        releaseInfos.length === 1
          ? ` ${linkify(releaseInfos[0])}`
          : `:\n${releaseInfos
              .map((releaseInfo) => `- ${linkify(releaseInfo)}`)
              .join('\n')}`
      }`
    : '';
}

export const { transformer } = makeTransformer(function (context) {
  const { asset, toProjectAbsolutePath } = context;

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(xreleaseConfigProjectBase),
        generate: () => /*js*/ `
// @ts-check
'use strict';

const { deepMergeConfig } = require('@-xun/symbiote/assets');

const {
  assertEnvironment,
  moduleExport
} = require('@-xun/symbiote/assets/${asset}');

const { createDebugLogger } = require('rejoinder');

const debug = createDebugLogger({ namespace: '${globalDebuggerNamespace}:config:release' });

module.exports = deepMergeConfig(
  moduleExport(assertEnvironment({ projectRoot: __dirname })),
  {
    // Any custom configs here will be deep merged with moduleExport's result
  }
);

debug('exported config: %O', module.exports);
`
      }
    ];
  });
});

/**
 * @see {@link moduleExport}
 */
export function assertEnvironment({
  projectRoot
}: {
  projectRoot: string;
}): Omit<Parameters<typeof moduleExport>[0], 'derivedAliases'> {
  const specialInitialCommit = process.env.SYMBIOTE_SPECIAL_INITIAL_COMMIT;

  assert(
    specialInitialCommit && typeof specialInitialCommit === 'string',
    ErrorMessage.MissingSymbioteEnvironmentVariable('SYMBIOTE_SPECIAL_INITIAL_COMMIT')
  );

  const { parserOpts, writerOpts } = require(
    toAbsolutePath(projectRoot, xchangelogConfigProjectBase)
  );

  assert(parserOpts, ErrorMessage.BadParameter('parserOpts'));
  assert(writerOpts, ErrorMessage.BadParameter('writerOpts'));

  const projectMetadata = analyzeProjectStructure.sync({ useCached: true });

  return { specialInitialCommit, parserOpts, writerOpts, projectMetadata };
}

/**
 * This is a custom semantic-release plugin step that validates the options
 * passed via `release.config.cjs`.
 */
export function verifyConditions(
  pluginConfig: Partial<PluginConfig>,
  _context: VerifyConditionsContext
) {
  verifyConditionsDebug('entered step function');

  verifyConditionsDebug('releaseSectionPath: %O', pluginConfig.releaseSectionPath);
  verifyConditionsDebug('parserOpts: %O', pluginConfig.parserOpts);
  verifyConditionsDebug('writerOpts: %O', pluginConfig.writerOpts);

  assert(
    pluginConfig.releaseSectionPath?.endsWith('.md'),
    ErrorMessage.BadReleaseSectionPath()
  );

  assert(pluginConfig.parserOpts, ErrorMessage.BadParserOpts());
  assert(pluginConfig.writerOpts, ErrorMessage.BadWriterOpts());
}

// TODO: ONLY when cutting a new major, update engines.node to maintained node versions unless --no-update-engines-on-major sets appropriate environment variable

/**
 * This is a custom semantic-release plugin step that replaces
 * `nextRelease.notes` with the version patched by symbiote.
 */
export async function generateNotes(
  { releaseSectionPath, parserOpts, writerOpts }: PluginConfig,
  context: GenerateNotesContext
): Promise<string> {
  generateNotesDebug('entered step function');

  const pseudoBfGlobalExecutionContext = await configureExecutionContext({
    commands: new Map(),
    state: {},
    debug: createDebugLogger({ namespace: '${globalDebuggerNamespace}:pseudo-bf' })
  } as unknown as ExecutionContext);

  const projectPrepareHandler = await getInvocableExtendedHandler<
    ProjectPrepareCliArguments,
    GlobalExecutionContext
  >(projectPrepare, pseudoBfGlobalExecutionContext);

  generateNotesDebug(
    'defensively re-running prepare to recover from xrelease calling "npm version" earlier (calling out to symbiote api)'
  );

  await projectPrepareHandler({
    env: [],
    scope: UnlimitedGlobalScope.Unlimited,
    silent: true,
    quiet: true,
    hush: true,
    force: false,
    parallel: true,
    runToCompletion: true
  });

  generateNotesDebug('symbiote api call completed successfully');

  const {
    env: { SYMBIOTE_RELEASE_REBUILD_CHANGELOG }
  } = context;

  const shouldRebuildChangelog = SYMBIOTE_RELEASE_REBUILD_CHANGELOG !== 'false';
  generateNotesDebug('shouldRebuildChangelog: %O', shouldRebuildChangelog);

  const buildChangelogHandler = await getInvocableExtendedHandler<
    BuildChangelogCliArguments,
    GlobalExecutionContext
  >(buildChangelog, pseudoBfGlobalExecutionContext);

  const { generateNotes: generateRawNotes } = await import(
    '@semantic-release/release-notes-generator'
  );

  generateNotesDebug(
    'generating release notes with @semantic-release/release-notes-generator'
  );

  const rawNotes = await generateRawNotes({ parserOpts, writerOpts }, context);

  generateNotesDebug('rawNotes: %O', rawNotes);
  generateNotesDebug('writing generated notes out to: %O', releaseSectionPath);

  await writeFile(releaseSectionPath, rawNotes);

  if (shouldRebuildChangelog) {
    generateNotesDebug('rebuilding changelog (calling out to symbiote api)');

    await buildChangelogHandler({
      env: [],
      scope: ThisPackageGlobalScope.ThisPackage,
      silent: true,
      quiet: true,
      hush: true,
      skipTopmatter: false,
      patchChangelog: true,
      onlyPatchChangelog: false,
      formatChangelog: true,
      outputUnreleased: false,
      outputOrder: OutputOrder.Storybook,
      importSectionFile: releaseSectionPath,
      changelogFile: 'CHANGELOG.md'
    });

    generateNotesDebug('symbiote api call completed successfully');
  } else {
    generateNotesDebug('skipped rebuilding changelog');
  }

  generateNotesDebug(
    `patching and formatting ${releaseSectionPath} (calling out to symbiote api)`
  );

  await buildChangelogHandler({
    env: [],
    scope: ThisPackageGlobalScope.ThisPackage,
    silent: true,
    quiet: true,
    hush: true,
    skipTopmatter: false,
    patchChangelog: true,
    onlyPatchChangelog: true,
    formatChangelog: true,
    outputUnreleased: false,
    outputOrder: OutputOrder.Storybook,
    changelogFile: releaseSectionPath
  });

  generateNotesDebug('symbiote api call completed successfully');

  const prettyTrimmedNotes = (await readFile(releaseSectionPath, 'utf8')).trim();
  generateNotesDebug('prettyTrimmedNotes: %O', prettyTrimmedNotes);

  // ? We don't really care if this succeeds or fails.
  void rmFile(releaseSectionPath, { force: true }).catch((error: unknown) => {
    generateNotesDebug.warn(
      'attempt to cleanup (delete) %O failed: %O',
      releaseSectionPath,
      error
    );
  });

  if (!prettyTrimmedNotes) {
    throw new ProjectError(
      `unexpectedly empty temporary changelog file: ${releaseSectionPath}`
    );
  }

  return (
    prettyTrimmedNotes
      // ? Make it pretty for the GitHub Releases page :)
      .split('\n')
      .slice(1)
      .join('\n')

      .replaceAll(/^#+/gm, '##')
  );
}

/**
 * This is a custom semantic-release plugin step that logs a GitHub Actions (or
 * other) warning if the release pipeline ends with the repository in an unclean
 * state.
 */
export async function success(_: PluginConfig, context: SuccessContext) {
  successDebug('entered step function');

  const {
    env: { SYMBIOTE_RELEASE_WITH_FORCE }
  } = context;

  const wasReleasedWithForce = SYMBIOTE_RELEASE_WITH_FORCE === 'true';

  successDebug('wasReleasedWithForce: %O', wasReleasedWithForce);

  successDebug('updating remote');
  await run('git', ['fetch', '--prune']);

  successDebug(
    'defensively committing any package-lock.json changes (errors will be ignored)'
  );

  // ? We don't really care if this fails since failure will cause the next
  // ? check to fail
  try {
    const sharedOptions: Parameters<typeof run>[2] = { stdio: 'inherit' };

    await run('git', ['reset'], sharedOptions);
    await run('git', ['add', '--all'], sharedOptions);

    await run(
      'git',
      ['commit', '--no-verify', '-m', 'chore: commit post-release repository changes'],
      sharedOptions
    );

    await run('git', ['push'], sharedOptions);

    pluginLog('Committed and pushed any existing post-release repository changes');
  } catch (error) {
    successDebug.warn(
      'attempt to commit any existing post-release repository changes failed (which is expected if none exist): %O',
      error
    );
  }

  successDebug('checking repository state');

  const { isDirty } = await determineRepoWorkingTreeDirty();

  if (isDirty) {
    if (context.envCi.isCi) {
      ghaLog(
        'title=Repository left in unclean state',
        ErrorMessage.ReleaseFinishedWithADirtyRepo()
      );
    }

    if (wasReleasedWithForce) {
      pluginLog.warn(`⚠️🚧 ${ErrorMessage.ReleaseFinishedWithADirtyRepo()}`);
    } else {
      throw new ProjectError(ErrorMessage.ReleaseFinishedWithADirtyRepo());
    }
  }
}
