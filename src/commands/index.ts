import { CommandNotImplementedError } from '@black-flag/core/util';

import { scriptBasename } from 'multiverse+cli-utils:util.ts';

import { UnlimitedGlobalScope as RootScope } from 'universe:configure.ts';
import { globalCliName } from 'universe:constant.ts';
import { withGlobalBuilder, withGlobalUsage } from 'universe:util.ts';

import type { RootConfiguration } from '@black-flag/core';
import type { AsStrictExecutionContext } from 'multiverse+bfe';
import type { GlobalCliArguments, GlobalExecutionContext } from 'universe:configure.ts';

/**
 * @see {@link RootScope}
 */
export const rootScopes = Object.values(RootScope);

export type CustomCliArguments = GlobalCliArguments<RootScope>;

export default function command({
  standardDebug
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>(
    { scope: { choices: rootScopes, default: RootScope.Unlimited } },
    { additionalCommonOptions: ['version'] }
  );

  return {
    name: globalCliName,
    builder,
    description:
      "A collection of commands for interacting with Xunnamius's NPM-based projects",
    usage: withGlobalUsage(),
    handler: withGlobalHandler(function ({ $0: scriptFullName }) {
      const debug = standardDebug.extend(`handler-${scriptBasename(scriptFullName)}`);
      debug('entered handler');
      throw new CommandNotImplementedError();
    })
  } satisfies RootConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
