import { run } from '@-xun/run';
import { type ChildConfiguration } from '@black-flag/core';

import { type AsStrictExecutionContext } from 'multiverse+bfe';

import {
  logStartTime,
  LogTag,
  standardSuccessMessage
} from 'multiverse+cli-utils:logging.ts';

import { scriptBasename } from 'multiverse+cli-utils:util.ts';

import { Tsconfig } from '@-xun/project';

import {
  ThisPackageGlobalScope as DocumentationBuilderScope,
  type GlobalCliArguments,
  type GlobalExecutionContext
} from 'universe:configure.ts';

import {
  checkArrayNotEmpty,
  runGlobalPreChecks,
  withGlobalBuilder,
  withGlobalUsage
} from 'universe:util.ts';

/**
 * @see {@link DocumentationBuilderScope}
 */
export const documentationBuilderScopes = Object.values(DocumentationBuilderScope);

export type CustomCliArguments = GlobalCliArguments<DocumentationBuilderScope> & {
  entries: string[];
  typedocOptions: string[];
  baseline: boolean;
};

export default function command({
  standardLog,
  standardDebug,
  state,
  projectMetadata: projectMetadata_,
  isUsingLocalInstallation
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const { rootPackage: { root: projectRoot } = {} } = projectMetadata_ || {};
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>(
    (blackFlag) => {
      blackFlag.parserConfiguration({ 'unknown-options-as-args': true });

      return {
        scope: { choices: documentationBuilderScopes },
        entries: {
          alias: ['entry'],
          array: true,
          description: 'The entry point(s) of your documentation',
          default: projectRoot
            ? ['src/**/*.ts', 'test/**/*.ts', 'types/**/*.ts']
            : '(project-dependent)',
          check: checkArrayNotEmpty('--entries')
        },
        baseline: {
          alias: ['base', 'bare'],
          boolean: true,
          description: 'Execute typedoc with minimal arguments (plus --entries)',
          default: false
        },
        'typedoc-options': {
          alias: 'options',
          array: true,
          description: 'Command-line arguments passed directly to typedoc',
          default: []
        }
      };
    }
  );

  return {
    aliases: ['docs'],
    builder,
    description: 'Generate documentation from source and assets using typedoc',
    usage: withGlobalUsage(),
    handler: withGlobalHandler(async function ({
      $0: scriptFullName,
      scope,
      entries,
      baseline,
      typedocOptions,
      hush: isHushed,
      quiet: isQuieted
    }) {
      const handlerName = scriptBasename(scriptFullName);
      const genericLogger = standardLog.extend(handlerName);
      const debug = standardDebug.extend(`handler-${handlerName}`);

      debug('entered handler');

      await runGlobalPreChecks({
        standardDebug: standardDebug,
        projectMetadata_,
        scope
      });
      const { startTime } = state;

      logStartTime({ standardLog, startTime, isUsingLocalInstallation });
      genericLogger([LogTag.IF_NOT_QUIETED], 'Generating documentation...');

      debug('scope (unused): %O', scope);
      debug('entries: %O', entries);

      genericLogger.newline([LogTag.IF_NOT_QUIETED]);

      await run(
        'npx',
        [
          // {@symbiote/notExtraneous typedoc}
          'typedoc',

          '--cleanOutputDir',
          '--sourceLinkExternal',
          '--tsconfig',
          Tsconfig.PackageDocumentation,

          ...(baseline
            ? []
            : [
                '--plugin',
                // {@symbiote/notExtraneous typedoc-plugin-markdown}
                'typedoc-plugin-markdown',
                '--skipErrorChecking',
                '--excludeInternal',
                '--out',
                'docs',
                '--readme',
                'none',
                '--exclude',
                '**/*.test.*',
                '--exclude',
                '**/bin'
              ]),

          ...typedocOptions,
          ...entries
        ],
        {
          stdout: isHushed ? 'ignore' : 'inherit',
          stderr: isQuieted ? 'ignore' : 'inherit'
        }
      );

      genericLogger.newline([LogTag.IF_NOT_QUIETED]);
      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
