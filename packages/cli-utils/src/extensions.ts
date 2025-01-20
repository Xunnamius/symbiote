import { $executionContext } from '@black-flag/core';

import {
  CommandNotImplementedError,
  type ExecutionContext
} from '@black-flag/core/util';

import {
  createDebugLogger,
  disableLoggingByTag,
  enableLoggingByTag,
  getDisabledTags,
  type ExtendedDebugger,
  type ExtendedLogger
} from 'rejoinder';

import {
  withBuilderExtensions,
  type BfeBuilderObject,
  type WithBuilderExtensionsConfig,
  type WithBuilderExtensionsReturnType
} from 'multiverse+bfe';

import { $artificiallyInvoked } from 'multiverse+bfe:symbols.ts';

// ? Used in a comment for taskManager
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type makeStandardConfigureExecutionContext } from 'universe+cli-utils:configure.ts';
import { globalDebuggerNamespace } from 'universe+cli-utils:constant.ts';
import { LogTag } from 'universe+cli-utils:logging.ts';

import type { ListrManager } from 'rejoinder-listr2';
import type { Entries } from 'type-fest';

export { withUsageExtensions as withStandardUsage } from 'multiverse+bfe';

/**
 * This {@link ExecutionContext} subtype contains state related to
 * {@link standardCommonCliArguments}, both of which are required for the proper
 * function of {@link withStandardBuilder}.
 */
export type StandardExecutionContext = ExecutionContext & {
  /**
   * The {@link ExtendedLogger} for the CLI (not Black Flag's).
   */
  log: ExtendedLogger;
  /**
   * The {@link ExtendedDebugger} for the CLI (not Black Flag's).
   */
  debug_: ExtendedDebugger;
  state: {
    /**
     * If `true`, the program should not output anything at all. It also implies
     * `isQuieted` and `isHushed` are both `true`.
     */
    isSilenced: boolean;
    /**
     * If `true`, the program should be dramatically less verbose. It also
     * implies `isHushed` is `true`.
     */
    isQuieted: boolean;
    /**
     * If `true`, the program should output only the most pertinent information.
     */
    isHushed: boolean;
    /**
     * A `Date` object representing the start time of execution.
     */
    startTime: Date;
  };
  // ? This bit of dark magic detects if ListrManager is the "any" type or not.
  // ? We need this check because ListrManager is an optional peer dependency.
} & (0 extends 1 & ListrManager
    ? { taskManager?: undefined }
    : {
        /**
         * The global Listr task manager singleton or `undefined` if Listr2
         * support has not been enabled via
         * {@link makeStandardConfigureExecutionContext}.
         */
        taskManager?: import('rejoinder-listr2').ListrManager;
      });

/**
 * These properties will be available in the `argv` object of any command that
 * uses {@link withStandardBuilder} to construct its `builder`.
 *
 * This type is manually synchronized with {@link standardCommonCliArguments},
 * but the keys may differ slightly (e.g. hyphens may be elided in favor of
 * camelCase).
 *
 * Note that this type purposely excludes the `help` and `version` keys, which
 * are considered standard common CLI arguments by this package.
 */
export type StandardCommonCliArguments = {
  hush: boolean;
  quiet: boolean;
  silent: boolean;
};

/**
 * This {@link BfeBuilderObject} instance describes the CLI arguments available
 * in the `argv` object of any command that uses {@link withStandardBuilder} to
 * construct its `builder`.
 *
 * This object is manually synchronized with {@link StandardCommonCliArguments},
 * but the keys may differ slightly (e.g. hyphens may be elided in favor of
 * camelCase).
 *
 * Note that this object purposely excludes the `help` and `version` keys, which
 * are considered standard common CLI arguments by this package.
 */
export const standardCommonCliArguments = {
  hush: {
    boolean: true,
    default: false,
    description: 'Set output to be somewhat less verbose'
  },
  quiet: {
    boolean: true,
    default: false,
    implies: { hush: true },
    description: 'Set output to be dramatically less verbose (implies --hush)'
  },
  silent: {
    boolean: true,
    default: false,
    implies: { quiet: true, hush: true },
    description: 'No output will be generated (implies --quiet)'
  }
} as const satisfies BfeBuilderObject<Record<string, unknown>, StandardExecutionContext>;

/**
 * This is an array of the keys in {@link standardCommonCliArguments}, each of
 * which have a one-to-one relation with a key of
 * {@link StandardCommonCliArguments}.
 *
 * Note that this array purposely excludes `'help'` and `'version'`, which are
 * considered standard common CLI arguments by this package and are therefore
 * automatically included when appropriate.
 */
export const standardCommonCliArgumentsKeys = Object.keys(
  standardCommonCliArguments
) as (keyof typeof standardCommonCliArguments)[];

/**
 * This function enables several options-related units of functionality
 * considered standard across [Xunnamius](https://github.com/Xunnamius)'s CLI
 * projects.
 *
 * This function is a relatively thin wrapper around
 * {@link withBuilderExtensions}. It also disables
 * [`duplicate-arguments-array`](https://github.com/yargs/yargs-parser?tab=readme-ov-file#duplicate-arguments-array)
 * and enables
 * [`strip-dashed`](https://github.com/yargs/yargs-parser?tab=readme-ov-file#strip-dashed)
 * and
 * [`strip-aliased`](https://github.com/yargs/yargs-parser?tab=readme-ov-file#strip-aliased)
 * in yargs-parser.
 *
 * When providing a `customBuilder` function or object, any key in the returned
 * object that is also a key in {@link standardCommonCliArguments} will have its
 * value merged with the value in {@link standardCommonCliArguments} _instead_
 * of fully overwriting it. This means you can pass minimal configuration values
 * for the keys that are also in {@link standardCommonCliArguments} and those
 * values will be shallowly merged.
 */
export function withStandardBuilder<
  CustomCliArguments extends StandardCommonCliArguments,
  CustomExecutionContext extends StandardExecutionContext
>(
  customBuilder?: Parameters<
    typeof withBuilderExtensions<CustomCliArguments, CustomExecutionContext>
  >[0],
  {
    additionalCommonOptions = [],
    disableAutomaticGrouping
  }: Omit<WithBuilderExtensionsConfig<CustomCliArguments>, 'commonOptions'> & {
    /**
     * An array of zero or more options that should be grouped under _"Common
     * Options"_ when [automatic grouping of related
     * options](https://github.com/Xunnamius/black-flag-extensions?tab=readme-ov-file#automatic-grouping-of-related-options)
     * is enabled.
     *
     * Target options can be specified in one of two forms:
     *
     * - As a string key of `CustomCliArguments`, or the string `'version'`.
     *   Note that `'help'` is always implicitly included and need not be
     *   specified.
     *
     * - A {@link BfeBuilderObject} instance defining additional "standard
     *   common arguments," which will be shallowly merged into
     *   {@link standardCommonCliArguments}. Its string keys will then be
     *   considered like with the first form.
     *
     * This setting is ignored if `disableAutomaticGrouping === true`.
     *
     * @default []
     */
    additionalCommonOptions?: (
      | NonNullable<
          WithBuilderExtensionsConfig<CustomCliArguments>['commonOptions']
        >[number]
      | BfeBuilderObject<CustomCliArguments, CustomExecutionContext>
    )[];
  } = {}
): WithBuilderExtensionsReturnType<CustomCliArguments, CustomExecutionContext> {
  const debug_ = createDebugLogger({
    namespace: `${globalDebuggerNamespace}:withStandardBuilder`
  });

  debug_('entered withStandardBuilder function');

  const extraOptionConfigurations = Object.fromEntries(
    additionalCommonOptions
      // ? Theses are handled specially by Black Flag and BFE
      .filter((opt) => opt !== 'version' && opt !== 'help')
      .flatMap((opt) => {
        return (
          ['string', 'number', 'symbol'].includes(typeof opt)
            ? // ? Include name-only common options as empty BfeBuilderObjects
              [[opt, {}]]
            : Object.entries(opt)
        ) as Entries<BfeBuilderObject<CustomCliArguments, CustomExecutionContext>>;
      })
  );

  debug_('extraOptionConfigurations: %O', extraOptionConfigurations);

  const allCommonCliArguments: Partial<
    BfeBuilderObject<CustomCliArguments, CustomExecutionContext>
  > = {
    ...standardCommonCliArguments
  };

  // ? Merge incoming extra common options over standard common options
  for (const [option, argumentConfig] of Object.entries(extraOptionConfigurations)) {
    allCommonCliArguments[option] = Object.assign(
      {},
      allCommonCliArguments[option] || {},
      argumentConfig
    );
  }

  // ! Order is important
  const allCommonOptionNames = Array.from(
    new Set([
      'help',
      ...(additionalCommonOptions.includes('version') ? ['version'] : []),
      ...standardCommonCliArgumentsKeys,
      ...Object.keys(extraOptionConfigurations)
    ])
  );

  debug_('allCommonOptionNames: %O', allCommonOptionNames);
  debug_('allCommonCliArguments: %O', allCommonCliArguments);

  const [builder, withHandlerExtensions] = withBuilderExtensions<
    CustomCliArguments,
    CustomExecutionContext
  >(
    function builder(blackFlag, helpOrVersionSet, argv) {
      debug_('entered withStandardBuilder::builder wrapper function');
      debug_('calling customBuilder (if a function) and returning builder object');

      const customCliArguments =
        (typeof customBuilder === 'function'
          ? customBuilder(blackFlag, helpOrVersionSet, argv)
          : customBuilder) || {};

      debug_('exited customBuilder (if a function) with builder object');
      debug_('customCliArguments (pre-merge): %O', customCliArguments);

      // ? Merge incoming custom cli arguments over all computed common options
      for (const [option, argumentConfig] of Object.entries(customCliArguments)) {
        if (option in allCommonCliArguments) {
          customCliArguments[option] = Object.assign(
            {},
            allCommonCliArguments[option] || {},
            argumentConfig
          );
        }
      }

      debug_(
        'final customCliArguments (will be merged onto allCommonCliArguments): %O',
        customCliArguments
      );

      return {
        ...allCommonCliArguments,
        ...customCliArguments
      } as BfeBuilderObject<CustomCliArguments, CustomExecutionContext>;
    },
    { commonOptions: allCommonOptionNames, disableAutomaticGrouping }
  );

  debug_('exited withStandardBuilder function');

  return [
    function standardBuilder(blackFlag, helpOrVersionSet, rawArgv) {
      const debug = debug_.extend('standardBuilder');

      debug('entered standardBuilder');

      debug('updating "Commands:" string to "Subcommands:"');
      blackFlag.updateStrings({ 'Commands:': 'Subcommands:' });

      debug('reconfiguring yargs-parser');
      blackFlag.parserConfiguration({
        'duplicate-arguments-array': false,
        'greedy-arrays': true
      });

      debug('invoking withBuilderExtensions::builder');
      const returnedCliArguments = builder(blackFlag, helpOrVersionSet, rawArgv);

      debug('exited standardBuilder');
      return returnedCliArguments;
    },
    function withStandardHandler(
      customHandler: Parameters<typeof withHandlerExtensions>[0]
    ) {
      return async function handler(rawArgv) {
        const tagsSet = new Set<LogTag>();
        const debug = createDebugLogger({
          namespace: `${globalDebuggerNamespace}:withStandardHandler`
        });

        debug('entered withStandardHandler wrapper');

        debug('manually invoking withHandlerExtensions');
        await withHandlerExtensions(async (argv) => {
          const {
            hush,
            quiet,
            silent,
            [$artificiallyInvoked]: wasArtificiallyInvoked,
            [$executionContext]: { state }
          } = argv;

          const originallyDisabledTags = getDisabledTags();

          debug('hush: %O', hush);
          debug('quiet: %O', quiet);
          debug('silent: %O', silent);
          debug('disabledTags: %O', originallyDisabledTags);
          debug('wasArtificiallyInvoked: %O', wasArtificiallyInvoked);

          const originalState = { ...state };

          if (silent) {
            tagsSet.add(LogTag.IF_NOT_SILENCED);
            state.isSilenced = true;
            state.showHelpOnFail = false;
          }

          if (quiet) {
            tagsSet.add(LogTag.IF_NOT_QUIETED);
            state.isQuieted = true;
          }

          if (hush) {
            tagsSet.add(LogTag.IF_NOT_HUSHED);
            state.isHushed = true;
          }

          disableLoggingByTag({ tags: Array.from(tagsSet) });

          try {
            debug('invoking customHandler (or defaultHandler if undefined)');
            await (customHandler ?? defaultHandler)(argv);
          } finally {
            if (wasArtificiallyInvoked) {
              debug('undoing state changes due to artificial invocation');

              if (silent) {
                if (!originallyDisabledTags.has(LogTag.IF_NOT_SILENCED)) {
                  enableLoggingByTag({ tags: [LogTag.IF_NOT_SILENCED] });
                }

                state.isSilenced = originalState.isSilenced;
                state.showHelpOnFail = originalState.showHelpOnFail;
              }

              if (quiet) {
                if (!originallyDisabledTags.has(LogTag.IF_NOT_QUIETED)) {
                  enableLoggingByTag({ tags: [LogTag.IF_NOT_QUIETED] });
                }

                state.isQuieted = originalState.isQuieted;
              }

              if (hush) {
                if (!originallyDisabledTags.has(LogTag.IF_NOT_HUSHED)) {
                  enableLoggingByTag({ tags: [LogTag.IF_NOT_HUSHED] });
                }

                state.isHushed = originalState.isHushed;
              }
            }
          }
        })(rawArgv);

        debug('exited withStandardHandler wrapper');
      };
    }
  ];
}

function defaultHandler() {
  throw new CommandNotImplementedError();
}
