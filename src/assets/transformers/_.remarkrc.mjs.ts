import escapeStringRegExp from 'escape-string-regexp~4';

import {
  analyzeProjectStructure,
  type Package,
  type ProjectMetadata
} from 'multiverse+project-utils:analyze.ts';

import { ProjectError } from 'multiverse+project-utils:error.ts';
import { remarkConfigProjectBase } from 'multiverse+project-utils:fs.ts';
import { createDebugLogger } from 'multiverse+rejoinder';

import {
  definedNonBasicAssetPresets,
  generateRootOnlyAssets,
  makeTransformer
} from 'universe:assets.ts';

import { globalDebuggerNamespace } from 'universe:constant.ts';
import { ErrorMessage } from 'universe:error.ts';

import type { Options as MdastUtilToMarkdownOptions } from 'mdast-util-to-markdown' with { 'resolution-mode': 'import' };
import type { Options as UnifiedEngineOptions } from 'unified-engine' with { 'resolution-mode': 'import' };

const debug = createDebugLogger({
  namespace: `${globalDebuggerNamespace}:asset:remark`
});

export type PluggableListSupportingSpecifiers = Extract<
  RemarkConfig['plugins'],
  unknown[]
>[number];

export type RemarkConfig = {
  settings?: MdastUtilToMarkdownOptions;
  plugins?: UnifiedEngineOptions['plugins'];
};

/**
 * We track these so that we may prevent mdast-util-markdown from mangling them
 * with an escape character, which sometimes does not render properly on GitHub
 * or with GFM-compatible tooling.
 *
 * @see https://github.com/orgs/community/discussions/16925
 */
export const wellKnownGithubAlerts = [
  '[!NOTE]',
  '[!TIP]',
  '[!IMPORTANT]',
  '[!WARNING]',
  '[!CAUTION]'
] as const;

/**
 * An array of NODE_ENV values recognized by this configuration file.
 */
export const wellKnownNodeEnvValues = ['lint', 'lint-no-undef', 'format'] as const;

export const noUndefinedReferencesPlugin: PluggableListSupportingSpecifiers = [
  // {@symbiote/notExtraneous remark-lint-no-undefined-references}
  'remark-lint-no-undefined-references',
  { allow: [/![A-Z]+/] }
] as const;

/**
 * Remark configuration loaded when `NODE_ENV === 'lint-no-undef'`. The goal
 * here is to check for undefined references. This would normally be something
 * to do ad hoc on the CLI, but we need to pass remark a regular expression to
 * do this optimally, which means we need to load the configuration via JS.
 */
function lintConfigNoUndef(): RemarkConfig {
  return {
    plugins: [
      'gfm', // {@symbiote/notExtraneous remark-gfm}
      noUndefinedReferencesPlugin
    ]
  };
}

/**
 * Remark configuration loaded when `NODE_ENV === 'lint'`. The goal here is to
 * check for things that will not be corrected by prettier or remark during a
 * formatting pass (see below).
 */
function lintConfig(allowWarningComments: boolean): RemarkConfig {
  const config: RemarkConfig = {
    plugins: [
      // {@symbiote/notExtraneous remark-ignore}
      'remark-ignore',
      // {@symbiote/notExtraneous remark-frontmatter}
      'remark-frontmatter',
      // {@symbiote/notExtraneous remark-gfm}
      'remark-gfm',
      // {@symbiote/notExtraneous remark-lint}
      'remark-lint',
      // {@symbiote/notExtraneous remark-lint-definition-case}
      'remark-lint-definition-case',
      // {@symbiote/notExtraneous remark-lint-fenced-code-flag}
      'remark-lint-fenced-code-flag',
      // {@symbiote/notExtraneous remark-lint-fenced-code-flag-case}
      'remark-lint-fenced-code-flag-case',
      // {@symbiote/notExtraneous remark-lint-file-extension}
      'remark-lint-file-extension',
      // {@symbiote/notExtraneous remark-lint-first-heading-level}
      'remark-lint-first-heading-level',
      // {@symbiote/notExtraneous remark-lint-heading-increment}
      'remark-lint-heading-increment',
      // {@symbiote/notExtraneous remark-lint-heading-whitespace}
      'remark-lint-heading-whitespace',
      // {@symbiote/notExtraneous remark-lint-list-item-style}
      ['remark-lint-list-item-style', { checkPunctuation: false }],
      // {@symbiote/notExtraneous remark-lint-no-duplicate-defined-urls}
      'remark-lint-no-duplicate-defined-urls',
      // {@symbiote/notExtraneous remark-lint-no-duplicate-headings-in-section}
      'remark-lint-no-duplicate-headings-in-section',
      // {@symbiote/notExtraneous remark-lint-no-empty-sections}
      'remark-lint-no-empty-sections',
      // {@symbiote/notExtraneous remark-lint-no-empty-url}
      'remark-lint-no-empty-url',
      // {@symbiote/notExtraneous remark-lint-heading-word-length}
      'remark-lint-heading-word-length',
      // {@symbiote/notExtraneous remark-lint-no-heading-like-paragraph}
      'remark-lint-no-heading-like-paragraph',
      // {@symbiote/notExtraneous remark-lint-no-heading-punctuation}
      'remark-lint-no-heading-punctuation',
      // {@symbiote/notExtraneous remark-lint-no-literal-urls}
      'remark-lint-no-literal-urls',
      // {@symbiote/notExtraneous remark-lint-no-multiple-toplevel-headings}
      'remark-lint-no-multiple-toplevel-headings',
      // {@symbiote/notExtraneous remark-lint-no-reference-like-url}
      'remark-lint-no-reference-like-url',
      // {@symbiote/notExtraneous remark-lint-no-shell-dollars}
      'remark-lint-no-shell-dollars',
      // {@symbiote/notExtraneous remark-lint-no-shortcut-reference-image}
      'remark-lint-no-shortcut-reference-image',
      // {@symbiote/notExtraneous remark-lint-no-shortcut-reference-link}
      'remark-lint-no-shortcut-reference-link',
      // {@symbiote/notExtraneous remark-lint-no-tabs}
      'remark-lint-no-tabs',
      noUndefinedReferencesPlugin,
      // {@symbiote/notExtraneous remark-lint-ordered-list-marker-value}
      'remark-lint-ordered-list-marker-value',
      // {@symbiote/notExtraneous remark-lint-strikethrough-marker}
      ['remark-lint-strikethrough-marker', '~~'],
      // {@symbiote/notExtraneous remark-lint-unordered-list-marker-style}
      // ? Prettier will reformat list markers UNLESS they precede checkboxes
      ['remark-lint-unordered-list-marker-style', '-'],
      // {@symbiote/notExtraneous remark-lint-final-newline}
      'remark-lint-final-newline',
      // {@symbiote/notExtraneous remark-lint-hard-break-spaces}
      'remark-lint-hard-break-spaces',
      // {@symbiote/notExtraneous remark-lint-no-blockquote-without-marker}
      'remark-lint-no-blockquote-without-marker',
      // {@symbiote/notExtraneous remark-lint-no-duplicate-definitions}
      'remark-lint-no-duplicate-definitions',
      // {@symbiote/notExtraneous remark-lint-no-heading-content-indent}
      'remark-lint-no-heading-content-indent',
      // {@symbiote/notExtraneous remark-lint-no-unused-definitions}
      // TODO: this package seems broken, perhaps submit a bug fix?
      //'remark-lint-no-unused-definitions',
      // {@symbiote/notExtraneous remark-lint-ordered-list-marker-style}
      'remark-lint-ordered-list-marker-style',
      // {@symbiote/notExtraneous remark-validate-links}
      'remark-validate-links'
    ]
  };

  if (allowWarningComments) {
    // TODO: add no-warning-comments to unified-utils and add pub to dependencies
    //config.plugins.push('no-warning-comments');
  }

  return config;
}

/**
 * Remark configuration loaded when `NODE_ENV === 'format'`. The goal here is to
 * correct things that will not be taken care of by prettier.
 */
function formatConfig(
  shouldRenumberReferences: boolean,
  { rootPackage, subRootPackages }: ProjectMetadata
): RemarkConfig {
  return {
    plugins: [
      // {@symbiote/notExtraneous remark-ignore}
      'remark-ignore',
      // {@symbiote/notExtraneous remark-frontmatter}
      'remark-frontmatter',
      // {@symbiote/notExtraneous remark-gfm}
      'remark-gfm',
      // {@symbiote/notExtraneous remark-tight-comments}
      'remark-tight-comments',
      // {@symbiote/notExtraneous remark-capitalize-headings}
      [
        'remark-capitalize-headings',
        {
          excludeHeadingLevel: { h1: true },
          // ? Do not capitalize any of our package names
          excludeHeadingText: ((subRootPackages?.all || []) as Package[])
            .concat(rootPackage)
            .map(({ json: { name } }) => (name ? escapeStringRegExp(name) : undefined))
            .filter(Boolean)
            // ? And don't capitalize other titles
            .concat('PR')
            .concat('BREAKING CHANGES')
            // ? And don't capitalize packages nor their version information
            .concat(String.raw`\S+@\S+`)
        }
      ],
      // {@symbiote/notExtraneous remark-remove-unused-definitions}
      'remark-remove-unused-definitions',
      // {@symbiote/notExtraneous remark-remove-url-trailing-slash}
      'remark-remove-url-trailing-slash',
      ...(shouldRenumberReferences
        ? // {@symbiote/notExtraneous remark-renumber-references}
          ['remark-renumber-references']
        : // {@symbiote/notExtraneous remark-reference-links}
          ['remark-reference-links']),
      // {@symbiote/notExtraneous remark-sort-definitions}
      'sort-definitions'
    ]
  };
}

/**
 * @see {@link assertEnvironment}
 */
export function moduleExport({
  mode,
  shouldRenumberReferences,
  allowWarningComments,
  projectMetadata
}: {
  mode: 'lint' | 'lint-no-undef' | 'format';
  shouldRenumberReferences: boolean;
  allowWarningComments: boolean;
  projectMetadata: ProjectMetadata;
}): RemarkConfig {
  debug('mode: %O', mode);
  debug('shouldRenumberReferences: %O', shouldRenumberReferences);
  debug('allowWarningComments: %O', allowWarningComments);
  debug('projectMetadata: %O', projectMetadata);

  if (mode === 'lint-no-undef') {
    return lintConfigNoUndef();
  }

  const { settings, plugins } =
    mode === 'lint'
      ? lintConfig(allowWarningComments)
      : formatConfig(shouldRenumberReferences, projectMetadata);

  return {
    settings: {
      bullet: '-',
      emphasis: '_',
      fences: true,
      listItemIndent: 'one',
      rule: '-',
      strong: '*',
      tightDefinitions: true,

      // ? Prevent mdast-util-markdown from mangling GFM alerts with an
      // ? unneeded escape character "\" which causes problems on GitHub
      handlers: {
        text: (node, _, state, info) => {
          const ancestry = state.stack.slice(-3).join('<-');
          const value = node.value;

          return ancestry === 'blockquote<-paragraph<-phrasing' &&
            wellKnownGithubAlerts.includes(value)
            ? (value as string)
            : state.safe(value, info);
        }
      },

      ...settings
    },
    plugins
  };
}

/**
 * @see {@link moduleExport}
 */
export async function assertEnvironment(): Promise<Parameters<typeof moduleExport>[0]> {
  const mode = (process.env.NODE_ENV ||
    '(undefined)') as (typeof wellKnownNodeEnvValues)[number];

  const shouldRenumberReferences =
    process.env.SYMBIOTE_FORMAT_RENUMBER_REFERENCES === 'true';

  const allowWarningComments =
    process.env.SYMBIOTE_LINT_ALLOW_WARNING_COMMENTS === 'true';

  if (!wellKnownNodeEnvValues.includes(mode)) {
    throw new ProjectError(
      ErrorMessage.ConfigAssetEnvironmentValidationFailed(
        'remark',
        mode,
        wellKnownNodeEnvValues
      )
    );
  }

  const projectMetadata = await analyzeProjectStructure({ useCached: true });

  return { mode, shouldRenumberReferences, allowWarningComments, projectMetadata };
}

export const { transformer } = makeTransformer(function (context) {
  const { asset, toProjectAbsolutePath, assetPreset } = context;

  // * Do not generate any files when using the "wrong" preset
  if (definedNonBasicAssetPresets.includes(assetPreset)) {
    return [];
  }

  // * Only the root package gets these files
  return generateRootOnlyAssets(context, async function () {
    return [
      {
        path: toProjectAbsolutePath(remarkConfigProjectBase),
        generate: () => /*js*/ `
// @ts-check

import { deepMergeConfig } from '@-xun/symbiote/assets';
import { assertEnvironment, moduleExport } from '@-xun/symbiote/assets/${asset}';

// TODO: publish latest rejoinder package first, then update configs to use it
//import { createDebugLogger } from 'rejoinder';

/*const debug = createDebugLogger({ namespace: '${globalDebuggerNamespace}:config:remarkrc' });*/

const config = deepMergeConfig(
  moduleExport(await assertEnvironment()),
  {
    // Any custom configs here will be deep merged with moduleExport
  }
);

export default config;

/*debug('exported config: %O', config);*/
`
      }
    ];
  });
});
