// * The semantic-release plugin exports replaces the following functionality:
// * - @semantic-release/release-notes-generator
// * - @semantic-release/changelog

// {@symbiote/notExtraneous @-xun/release}
import assert from 'node:assert';
import crypto from 'node:crypto';
import { readFile, rm as rmFile, writeFile } from 'node:fs/promises';
import os from 'node:os';

import { run } from '@-xun/run';
import { type ExecutionContext } from '@black-flag/core/util';

import { getInvocableExtendedHandler } from 'multiverse+bfe';

import {
  analyzeProjectStructure,
  isRootPackage,
  type ProjectMetadata
} from 'multiverse+project-utils:analyze.ts';

import { ProjectError } from 'multiverse+project-utils:error.ts';

import {
  toAbsolutePath,
  toPath,
  toRelativePath,
  xchangelogConfigProjectBase,
  xreleaseConfigProjectBase
} from 'multiverse+project-utils:fs.ts';

import { createDebugLogger } from 'rejoinder';

import { generateRootOnlyAssets, makeTransformer } from 'universe:assets.ts';

import {
  default as buildChangelog,
  OutputOrder,
  type CustomCliArguments as BuildChangelogCliArguments
} from 'universe:commands/build/changelog.ts';

import {
  $executionContext,
  configureExecutionContext,
  ThisPackageGlobalScope,
  type GlobalExecutionContext
} from 'universe:configure.ts';

import { globalDebuggerNamespace } from 'universe:constant.ts';
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

import type {
  GenerateNotesContext,
  Options as ReleaseConfig,
  SuccessContext,
  VerifyConditionsContext
} from 'semantic-release' with { 'resolution-mode': 'import' };

const debug = createDebugLogger({
  namespace: `${globalDebuggerNamespace}:asset:release`
});

export type { ReleaseConfig };
export { noSpecialInitialCommitIndicator };

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
}): ReleaseConfig {
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
            'docs'
          ],
          // ? Make sure we send out the patched release notes (i.e. changelog)
          message: `release: ${cwdPackageName}@<%= nextRelease.version %> [skip ci]\n\n<%= nextRelease.notes %>`
        }
      ],
      // This comes bundled with semantic-release
      '@semantic-release/github'
    ]
  } satisfies ReleaseConfig;

  return finalConfig;
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
  const pluginDebug = debug.extend('verifyConditions');
  pluginDebug('entered step function');

  pluginDebug('releaseSectionPath: %O', pluginConfig.releaseSectionPath);
  pluginDebug('parserOpts: %O', pluginConfig.parserOpts);
  pluginDebug('writerOpts: %O', pluginConfig.writerOpts);

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
  const pluginDebug = debug.extend('generateNotes');
  pluginDebug('entered step function');

  const {
    env: { SYMBIOTE_RELEASE_REBUILD_CHANGELOG }
  } = context;

  const shouldRebuildChangelog = SYMBIOTE_RELEASE_REBUILD_CHANGELOG !== 'false';
  pluginDebug('shouldRebuildChangelog: %O', shouldRebuildChangelog);

  const pseudoBfGlobalExecutionContext = await configureExecutionContext({
    commands: new Map(),
    state: {},
    debug: createDebugLogger({ namespace: '${globalDebuggerNamespace}:pseudo-bf' })
  } as unknown as ExecutionContext);

  const buildChangelogHandler = await getInvocableExtendedHandler<
    BuildChangelogCliArguments,
    GlobalExecutionContext
  >(buildChangelog, pseudoBfGlobalExecutionContext);

  const { generateNotes: generateRawNotes } = await import(
    '@semantic-release/release-notes-generator'
  );

  pluginDebug('generating release notes with @semantic-release/release-notes-generator');

  const rawNotes = await generateRawNotes({ parserOpts, writerOpts }, context);

  pluginDebug('rawNotes: %O', rawNotes);
  pluginDebug('writing generated notes out to: %O', releaseSectionPath);

  await writeFile(releaseSectionPath, rawNotes);

  if (shouldRebuildChangelog) {
    pluginDebug('rebuilding changelog (calling out to symbiote api)');

    await buildChangelogHandler({
      [$executionContext]: pseudoBfGlobalExecutionContext,
      $0: 'build changelog',
      _: [],
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

    pluginDebug('symbiote api call completed successfully');
  } else {
    pluginDebug('skipped rebuilding changelog');
  }

  pluginDebug(
    `patching and formatting ${releaseSectionPath} (calling out to symbiote api)`
  );

  await buildChangelogHandler({
    [$executionContext]: pseudoBfGlobalExecutionContext,
    $0: 'build changelog',
    _: [],
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

  pluginDebug('symbiote api call completed successfully');

  const prettyTrimmedNotes = (await readFile(releaseSectionPath, 'utf8')).trim();
  pluginDebug('prettyTrimmedNotes: %O', prettyTrimmedNotes);

  // ? We don't really care if this succeeds or fails.
  void rmFile(releaseSectionPath, { force: true }).catch((error: unknown) => {
    pluginDebug.warn(
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
export async function success(
  { projectRelativePackageLockPath }: PluginConfig,
  context: SuccessContext
) {
  const pluginDebug = debug.extend('success');
  pluginDebug('entered step function');

  const {
    env: { SYMBIOTE_RELEASE_WITH_FORCE }
  } = context;

  const wasReleasedWithForce = SYMBIOTE_RELEASE_WITH_FORCE === 'true';

  pluginDebug('wasReleasedWithForce: %O', wasReleasedWithForce);
  pluginDebug('projectRelativePackageLockPath: %O', projectRelativePackageLockPath);

  pluginDebug('updating remote');
  await run('git', ['fetch', '--prune']);

  pluginDebug(
    'defensively committing any package-lock.json changes (errors will be ignored)'
  );

  // ? We don't really care if this fails since failure will cause the next
  // ? check to fail
  try {
    await run('git', ['reset']);
    await run('git', ['add', projectRelativePackageLockPath]);
    await run('git', [
      'commit',
      '--no-verify',
      '-m',
      'chore: commit post-release metadata changes'
    ]);
  } catch (error) {
    pluginDebug.warn(
      'attempt to commit post-release metadata changes failed (which might not be an issue): %O',
      error
    );
  }

  pluginDebug('checking repository state');

  const { isDirty } = await determineRepoWorkingTreeDirty();

  if (isDirty) {
    if (context.envCi.isCi) {
      // TODO: replace with rejoinder-github-actions
      process.stdout.write(
        `::warning title=Repository left in unclean state::${ErrorMessage.ReleaseFinishedWithADirtyRepo()}.\n`
      );
    }

    if (wasReleasedWithForce) {
      // TODO: replace with rejoinder / rejoinder-github-actions
      // eslint-disable-next-line no-console
      console.warn(`⚠️🚧 ${ErrorMessage.ReleaseFinishedWithADirtyRepo()}`);
    } else {
      throw new ProjectError(ErrorMessage.ReleaseFinishedWithADirtyRepo());
    }
  }
}
