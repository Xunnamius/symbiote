import { getRunContext } from '@projector-js/core/project';
import deepMerge from 'lodash.mergewith';
import semver from 'semver';

import { hardAssert, softAssert } from 'multiverse/@-xun/cli-utils/error';
import { interpolateTemplate, toSentenceCase } from 'multiverse/@-xun/cli-utils/util';
import { createDebugLogger } from 'multiverse/rejoinder';

import { assertIsExpectedTransformerContext, makeTransformer } from 'universe/assets';
import { globalDebuggerNamespace } from 'universe/constant';
import { ErrorMessage } from 'universe/error';
import { __read_file_sync } from 'universe/util';

import type { Config as ConventionalChangelogConfigSpecOptions } from 'conventional-changelog-config-spec';
import type { Options as ConventionalChangelogCoreOptions } from 'conventional-changelog-core';
import type { Commit } from 'conventional-commits-parser';
import type { EmptyObject } from 'type-fest';

const debug = createDebugLogger({
  namespace: `${globalDebuggerNamespace}:asset:conventional`
});

const illegalRegExpCharacters = [
  '.',
  '*',
  '+',
  '?',
  '^',
  '$',
  '{',
  '}',
  '(',
  ')',
  '|',
  '[',
  ']',
  '\\'
];

/**
 * What seems to be the shape of a conventional changelog configuration file
 * with some custom additions. Note that this type is a best effort and may not
 * be perfectly accurate.
 */
export type ConventionalChangelogCliConfig = ConventionalChangelogConfigSpecOptions &
  ConventionalChangelogCoreOptions.Config.Object & {
    /**
     * This string is prepended to all generated `CHANGELOG.md` files.
     */
    changelogTitle: string;
    /**
     * Strings that, if present in a commit message, will indicate that CI/CD
     * pipelines should not be triggered by said commit.
     */
    skipCommands: string[];
    /**
     * Conventional Changelog Core options. Last time I scanned its source, it
     * seemed this key was required, so it is included here for now.
     * TODO: Verify that this key is still necessary.
     */
    conventionalChangelog: ConventionalChangelogCoreOptions.Config.Object;
  };

/**
 * The default text that headlines the "breaking changes" section in
 * `CHANGELOG.md`.
 */
export const noteTitleForBreakingChange = 'BREAKING CHANGES';

/**
 * The preamble prefixed to any generated `CHANGELOG.md` file.
 */
export const changelogTopmatter =
  `# Changelog\n\n` +
  `All notable changes to this project will be documented in this auto-generated\n` +
  `file. The format is based on [Conventional Commits](https://conventionalcommits.org);\n` +
  `this project adheres to [Semantic Versioning](https://semver.org).`;

/**
 * Strings in commit messages that, when found, are skipped.
 */
export const skipCommands = ['[skip ci]', '[ci skip]', '[skip cd]', '[cd skip]'];

/**
 * Matches a valid GitHub username with respect to the following:
 *  - Avoids matching scoped package names (e.g. @xunnamius/package).
 *  - Will match multiple usernames separated by slash (e.g. @user1/@user2).
 */
export const usernameRegex = /\B@([\da-z](?:[\da-z]|-(?=[\da-z])){0,38})\b(?!\/(?!@))/gi;

/**
 * Used to normalize the aesthetic of revert CHANGELOG entries.
 */
export const revertPrefixRegex = /^Revert\s+/;

/**
 * The character(s) used to reference issues by number on GitHub.
 */
export const issuePrefixes = ['#'] as const;

const templateDirectory = '../template/conventional-changelog';

/**
 * Handlebars template data (not processed by our custom configuration).
 */
export const templates = {
  commit: __read_file_sync(require.resolve(`${templateDirectory}/commit.hbs`)),
  footer: __read_file_sync(require.resolve(`${templateDirectory}/footer.hbs`)),
  header: __read_file_sync(require.resolve(`${templateDirectory}/header.hbs`)),
  template: __read_file_sync(require.resolve(`${templateDirectory}/template.hbs`)),
  // ? Handlebars partials for property substitutions using commit context
  partials: {
    owner: '{{#if this.owner}}{{~this.owner}}{{else}}{{~@root.owner}}{{/if}}',
    host: '{{~@root.host}}',
    repository:
      '{{#if this.repository}}{{~this.repository}}{{else}}{{~@root.repository}}{{/if}}'
  }
};

/**
 * These are the only commit types that will appear in a `CHANGELOG.md` file.
 */
export const allowedCommitTypesInfo: ConventionalChangelogConfigSpecOptions.Type[] = [
  { type: 'feat', section: '✨ Features', hidden: false },
  { type: 'feature', section: '✨ Features', hidden: false },
  { type: 'fix', section: '🪄 Fixes', hidden: false },
  { type: 'perf', section: '⚡️ Optimizations', hidden: false },
  { type: 'revert', section: '🔥 Reverted', hidden: false },
  { type: 'build', section: '⚙️ Build system', hidden: false },
  { type: 'docs', section: '📚 Documentation', hidden: true },
  { type: 'style', section: '💎 Aesthetics', hidden: true },
  { type: 'refactor', section: '🧙🏿 Refactored', hidden: true },
  { type: 'test', section: '⚗️ Test system', hidden: true },
  { type: 'ci', section: '🏭 CI/CD', hidden: true },
  { type: 'cd', section: '🏭 CI/CD', hidden: true },
  { type: 'chore', section: '🗄️ Miscellaneous', hidden: true }
];

/**
 * @see {@link allowedCommitTypesInfo}
 */
export const allowedCommitTypes: ConventionalChangelogConfigSpecOptions.Type['type'][] =
  allowedCommitTypesInfo.map(({ type }) => type);

/**
 * Commits, having been grouped by type, will appear in the CHANGELOG in the
 * order they appear in this array. Types that are not listed in this array will
 * appear in input order _after_ listed types.
 */
export const commitTypeOrder = ['feat', 'fix', 'perf', 'build', 'revert'];

hardAssert(
  commitTypeOrder.every((type) => allowedCommitTypes.includes(type)),
  ErrorMessage.UnmatchedCommitType(undefined, 'commitTypeOrder vs allowedCommitTypes')
);

/**
 * The order commit type groups will appear in (ordered by section title);
 * derived from {@link allowedCommitTypesInfo}.
 */
const commitSectionOrder = commitTypeOrder.map(function (type) {
  return (
    allowedCommitTypesInfo.find((entry) => entry.type === type)?.section ??
    hardAssert(ErrorMessage.UnmatchedCommitType(type, 'commitTypeOrder'))
  );
});

/**
 * This function returns an "unconventional" conventional-changelog
 * configuration preset. See the documentation for details on the differences
 * between this and the official `conventional-changelog-conventionalcommits`
 * package.
 *
 * `configOverrides`, if an object or undefined, is recursively merged into a
 * partially initialized {@link ConventionalChangelogCliConfig} object
 * (overwriting same keys) using `lodash.mergeWith`.
 *
 * If `configOverrides` is a function, it will be passed said partially
 * initialized {@link ConventionalChangelogCliConfig} object and must return a
 * an object of the same type.
 */
export function moduleExport(
  configOverrides:
    | ((config: ConventionalChangelogCliConfig) => ConventionalChangelogCliConfig)
    | Partial<ConventionalChangelogCliConfig> = {}
) {
  // ? Single source of truth for shared values
  let internalIssuePrefixes: string[] = [...issuePrefixes];

  const intermediateConfig: ConventionalChangelogCliConfig = {
    // * Custom configuration keys * \\
    changelogTitle: changelogTopmatter,
    skipCommands: skipCommands.map((cmd) => cmd.toLowerCase()),

    // * Core configuration keys * \\
    // ? conventionalChangelog and recommendedBumpOpts keys are redefined below
    conventionalChangelog: {},
    gitRawCommitsOpts: {},

    // ? See: https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#options
    parserOpts: {
      headerPattern: /^(\w*)(?:\(([^)]*)\))?!?: (.*)$/,
      breakingHeaderPattern: /^(\w*)(?:\(([^)]*)\))?!: (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
      mergePattern: /^Merge pull request #(\d+) from (.*)$/,
      mergeCorrespondence: ['id', 'source'],
      revertPattern: /^(?:revert|revert:)\s"?([\S\s]+?)"?\s*this reverts commit (\w*)\./i,
      revertCorrespondence: ['header', 'hash'],
      noteKeywords: ['BREAKING CHANGE', noteTitleForBreakingChange, 'BREAKING'],
      // ? See: https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#warn
      // eslint-disable-next-line no-console
      warn: console.warn.bind(console),
      get issuePrefixes() {
        return internalIssuePrefixes;
      },
      set issuePrefixes(v) {
        internalIssuePrefixes = v;
      }
    },

    // ? See: https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-writer#options
    writerOpts: {
      generateOn(commit) {
        const debug_ = debug.extend('writerOpts:generateOn');
        let decision = false;

        debug_(`saw version: ${commit.version!}`);

        if (commit.version) {
          const { context, package: pkg } = getRunContext();

          if (context === 'monorepo') {
            debug_('monorepo context detected');
            softAssert(pkg, ErrorMessage.CannotRunOutsideRoot());

            const {
              json: { name: pkgName }
            } = pkg;

            softAssert(pkgName, ErrorMessage.BadProjectNameInPackageJson());

            debug_(`monorepo package: ${pkgName}`);

            if (new RegExp(`^${pkgName}@.{5,}$`).test(commit.version)) {
              // ? Remove the package name from the version string
              commit.version = commit.version.split('@').at(-1)!;
              debug_(`using version: ${commit.version}`);
            }
          }

          decision = !!semver.valid(commit.version) && !semver.prerelease(commit.version);
        }

        debug_(`decision: ${decision ? 'NEW block' : 'same block'}`);
        return decision;
      },
      mainTemplate: templates.template,
      // * headerPartial and commitPartial sub-keys are defined in finish()
      footerPartial: templates.footer,
      groupBy: 'type',
      commitsSort: ['scope', 'subject'],
      noteGroupsSort: 'title',
      // ? Commit message groupings (e.g. Features) are sorted by their
      // ? importance. Unlike the original version, this is a stable sort algo!
      // ? See: https://v8.dev/features/stable-sort
      commitGroupsSort(groupA, groupB) {
        const a = commitSectionOrder.indexOf(groupA.title || '');
        const b = commitSectionOrder.indexOf(groupB.title || '');
        return a === -1 || b === -1 ? b - a : a - b;
      },
      transform(commit, context) {
        const debug_ = debug.extend('writerOpts:transform');
        debug_('pre-transform commit: %O', commit);

        // ? Scope should always be lowercase (or undefined)
        commit.scope = commit.scope?.toLowerCase();

        let discard = true;
        const issues: string[] = [];
        const typeKey = (commit.revert ? 'revert' : (commit.type ?? '')).toLowerCase();

        const typeEntry = allowedCommitTypesInfo.find(
          (entry) =>
            entry.type === typeKey && (!entry.scope || entry.scope === commit.scope)
        );

        const skipCmdEvalTarget = `${commit.subject ?? ''}${
          commit.header ?? ''
        }`.toLowerCase();

        // ? Ignore any commits with skip commands in them (including BCs)
        if (
          intermediateConfig.skipCommands.some((cmd) => skipCmdEvalTarget.includes(cmd))
        ) {
          debug_('saw skip command in commit message; discarding immediately');
          debug_('decision: commit discarded');
          return false;
        }

        addBangNotes(commit);

        // ? Otherwise, never ignore breaking changes. Additionally, make all scopes
        // ? bold. For multi-line notes, make the first line bold and each
        // ? successive line indented with two spaces. Scope-less subjects are made
        // ? sentence case.
        commit.notes.forEach((note) => {
          if (note.text) {
            debug_('saw BC notes for this commit; NOT discarding...');

            const [firstLine, ...remainder] = note.text.trim().split('\n');
            const firstLineSentenceCase = toSentenceCase(firstLine);

            // ? Never discard breaking changes
            discard = false;
            note.title = noteTitleForBreakingChange;
            note.text = firstLineSentenceCase + remainder.join(' ') + '\n';
          }
        });

        // ? Discard entries of unknown or hidden types if discard === true
        // ! TypeScript incorrectly believes discard can never be false...
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (discard && (typeEntry === undefined || typeEntry.hidden)) {
          debug_('decision: commit discarded');
          return false;
        } else debug_('decision: commit NOT discarded');

        if (typeEntry) commit.type = typeEntry.section;
        if (commit.scope === '*') commit.scope = '';
        if (typeof commit.hash === 'string') commit.shortHash = commit.hash.slice(0, 7);

        // ? Badly crafted reverts are all header and no subject
        if (typeKey === 'revert' && !commit.subject) {
          commit.subject = commit.header?.replace(revertPrefixRegex, '');
        }

        if (typeof commit.subject === 'string') {
          const { host, owner, repository } = context;

          if (host && owner && repository) {
            if (intermediateConfig.issuePrefixes && intermediateConfig.issueUrlFormat) {
              const { issueUrlFormat } = intermediateConfig;
              // ? Replace issue refs with URIs
              const issueRegex = new RegExp(
                `(${intermediateConfig.issuePrefixes.join('|')})([0-9]+)`,
                'g'
              );

              commit.subject = commit.subject.replace(
                issueRegex,
                (_, prefix: string, issue: string) => {
                  const issueStr = `${prefix}${issue}`;
                  const url = interpolateTemplate(issueUrlFormat, {
                    host,
                    owner,
                    repository,
                    id: issue,
                    prefix: prefix
                  });

                  issues.push(issueStr);
                  return `[${issueStr}](${url})`;
                }
              );
            }

            if (intermediateConfig.userUrlFormat) {
              const { userUrlFormat } = intermediateConfig;
              // ? Replace user refs with URIs
              commit.subject = commit.subject.replaceAll(
                // * https://github.com/shinnn/github-username-regex
                usernameRegex,
                (_, user: string) => {
                  const usernameUrl = interpolateTemplate(userUrlFormat, {
                    host,
                    owner,
                    repository,
                    user
                  });

                  return `[@${user}](${usernameUrl})`;
                }
              );
            }
          }

          // ? Make scope-less commit subjects sentence case
          if (!commit.scope) commit.subject = toSentenceCase(commit.subject);

          // ? Italicize reverts
          if (typeKey === 'revert') commit.subject = `*${commit.subject}*`;
        }

        // ? Remove references that already appear in the subject
        commit.references = commit.references.filter(
          ({ prefix, issue }) => !issues.includes(`${prefix}${issue}`)
        );

        debug_('transformed commit: %O', commit);
        return commit;
      }
    },

    // * Spec-compliant configuration keys * \\
    // ? See: https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md

    // ? Commits are grouped by section; new types can alias existing types by
    // ? matching sections:
    // prettier-ignore
    types: allowedCommitTypesInfo,
    commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
    compareUrlFormat:
      '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
    issueUrlFormat: '{{host}}/{{owner}}/{{repository}}/issues/{{id}}',
    userUrlFormat: '{{host}}/{{user}}',
    get issuePrefixes() {
      return internalIssuePrefixes;
    },
    set issuePrefixes(v) {
      internalIssuePrefixes = v;
    }
  };

  intermediateConfig.conventionalChangelog = {
    parserOpts: intermediateConfig.parserOpts,
    writerOpts: intermediateConfig.writerOpts
  };

  intermediateConfig.recommendedBumpOpts = {
    parserOpts: intermediateConfig.parserOpts,
    whatBump: (commits) => {
      const debug_ = debug.extend('writerOpts:whatBump');

      let level = 2; // ? 0 = major, 1 = minor, 2 = patch (default)
      let breakings = 0;
      let features = 0;

      commits.forEach((commit) => {
        addBangNotes(commit);

        if (commit.notes.length > 0) {
          breakings += commit.notes.length;
          level = 0; // ? -> major
        } else if (commit.type === 'feat' || commit.type === 'feature') {
          features += 1;

          if (level === 2) {
            level = 1; // ? patch -> minor
          }
        }
      });

      // ? If release <1.0.0 and we were gonna do a major/minor bump, do a
      // ? minor/patch (respectively) bump instead
      if (intermediateConfig.preMajor && level < 2) {
        debug_('preMajor release detected; restricted to minor and patch bumps');
        level++;
      }

      const recommendation = {
        level,
        reason: `There ${breakings === 1 ? 'is' : 'are'} ${breakings} breaking change${
          breakings === 1 ? '' : 's'
        } and ${features} feature${features === 1 ? '' : 's'}`
      };

      debug_('recommendation: %O', recommendation);
      return recommendation;
    }
  } as typeof intermediateConfig.recommendedBumpOpts;

  debug('intermediate config: %O', intermediateConfig);

  const finalConfig =
    typeof configOverrides === 'function'
      ? configOverrides(intermediateConfig)
      : deepMerge(intermediateConfig, configOverrides, mergeCustomizer);

  if (finalConfig.issuePrefixes) {
    debug('validating finalConfig.issuePrefixes');
    hardAssert(
      illegalRegExpCharacters.every(
        (char) => !finalConfig.issuePrefixes!.join('').includes(char)
      ),
      ErrorMessage.IssuePrefixContainsIllegalCharacters()
    );
  }

  if (finalConfig.writerOpts) {
    debug('finalizing writerOpts');

    if (!finalConfig.writerOpts.headerPartial && finalConfig.compareUrlFormat) {
      finalConfig.writerOpts.headerPartial = interpolateTemplate(templates.header, {
        compareUrlFormat: interpolateTemplate(finalConfig.compareUrlFormat, {
          host: templates.partials.host,
          owner: templates.partials.owner,
          repository: templates.partials.repository
        })
      });
    }

    if (
      !finalConfig.writerOpts.commitPartial &&
      finalConfig.commitUrlFormat &&
      finalConfig.issueUrlFormat
    ) {
      finalConfig.writerOpts.commitPartial = interpolateTemplate(templates.commit, {
        commitUrlFormat: interpolateTemplate(finalConfig.commitUrlFormat, {
          host: templates.partials.host,
          owner: templates.partials.owner,
          repository: templates.partials.repository
        }),
        issueUrlFormat: interpolateTemplate(finalConfig.issueUrlFormat, {
          host: templates.partials.host,
          owner: templates.partials.owner,
          repository: templates.partials.repository,
          id: '{{this.issue}}',
          prefix: '{{this.prefix}}'
        })
      });
    }
  }

  debug('final config: %O', finalConfig);
  return finalConfig;

  /**
   * Adds additional breaking change notes for the special case
   * `test(system)!: hello world` but with no `BREAKING CHANGE` in body.
   */
  function addBangNotes({ header, notes }: Commit) {
    const { breakingHeaderPattern } = finalConfig.parserOpts ?? {};

    if (breakingHeaderPattern) {
      const match = header?.match(breakingHeaderPattern);

      if (match && notes.length === 0) {
        const noteText = match[3]; // ? Commit subject becomes BC note text
        notes.push({ text: noteText, title: noteTitleForBreakingChange });
      }
    }
  }
}

export type Context = EmptyObject;

export const { transformer } = makeTransformer<Context>({
  transform(context) {
    const { name } = assertIsExpectedTransformerContext(context);

    return {
      [name]: /*js*/ `
'use strict';

// TODO: publish latest rejoinder package first, then update configs to use it
/*const { createDebugLogger } = require('debug-extended');
const debug = createDebugLogger({
  namespace: '${globalDebuggerNamespace}:config:conventional'
});*/

const { moduleExport } = require('@-xun/scripts/assets/config/conventional.config.js');
module.exports = moduleExport({
  // * Your customizations here
});

/*debug('exported config: %O', module.exports);*/
`.trimStart()
    };
  }
});

/**
 * Custom lodash merge customizer that causes successive `undefined` source
 * values to unset (delete) the destination property if it exists, and to
 * completely overwrite the destination property if the source property is an
 * array.
 *
 * @see https://lodash.com/docs/4.17.15#mergeWith
 */
function mergeCustomizer(
  _objValue: unknown,
  srcValue: unknown,
  key: string,
  object: Record<string, unknown> | undefined,
  source: Record<string, unknown> | undefined
) {
  if (object && source) {
    if (srcValue === undefined && key in source) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete object[key];
    } else if (Array.isArray(srcValue)) {
      return srcValue;
    }
  }

  return undefined;
}
