import { type ChildConfiguration } from '@black-flag/core';

import { type AsStrictExecutionContext } from 'multiverse+bfe';

import {
  default as projectInfo,
  type CustomCliArguments
} from 'universe:commands/project/info.ts';

import { type GlobalExecutionContext } from 'universe:configure.ts';
import { withGlobalUsage } from 'universe:util.ts';

export type { CustomCliArguments };

export default function command(
  globalExecutionContext: AsStrictExecutionContext<GlobalExecutionContext>
) {
  return {
    ...projectInfo(globalExecutionContext),
    aliases: [],
    description: 'Manage project-wide concerns',
    usage: withGlobalUsage(
      `This command is a direct alias for "symbiote project info". See that command's help text for more information.`
    )
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
