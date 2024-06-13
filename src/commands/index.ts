import { type RootConfiguration } from '@black-flag/core';
import { CommandNotImplementedError } from '@black-flag/core/util';

import { type GlobalCliArguments, type GlobalExecutionContext } from 'universe/configure';

import {
  withStandardBuilder,
  withStandardUsage
} from 'multiverse/@-xun/cli-utils/extensions';

export type CustomCliArguments = GlobalCliArguments;

export default function command({ debug_ }: GlobalExecutionContext) {
  const [builder, withStandardHandler] = withStandardBuilder<
    CustomCliArguments,
    GlobalExecutionContext
  >(undefined, { enableVersionOption: true });

  return {
    name: 'xscripts',
    builder,
    description:
      "A collection of commands for interacting with Xunnamius's NPM-based projects",
    usage: withStandardUsage(),
    handler: withStandardHandler(async function (_argv) {
      const debug = debug_.extend('handler');
      debug('entered handler');
      throw new CommandNotImplementedError();
    })
  } satisfies RootConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
