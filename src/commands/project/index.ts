import projectInfo from 'universe:commands/project/info.ts';
import { withGlobalUsage } from 'universe:util.ts';

import type { AsStrictExecutionContext, ChildConfiguration } from '@-xun/cli';
import type { CustomCliArguments } from 'universe:commands/project/info.ts';
import type { GlobalExecutionContext } from 'universe:configure.ts';

export type { CustomCliArguments };

export default function command(
  globalExecutionContext: AsStrictExecutionContext<GlobalExecutionContext>
): ChildConfiguration<CustomCliArguments, GlobalExecutionContext> {
  return {
    ...projectInfo(globalExecutionContext),
    aliases: [],
    description: 'Manage project-wide concerns',
    usage: withGlobalUsage(
      `This command is a direct alias for "symbiote project info". See that command's help text for more information.`
    )
  };
}
