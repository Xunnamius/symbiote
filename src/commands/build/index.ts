import buildDistributables from 'universe:commands/build/distributables.ts';
import { withGlobalUsage } from 'universe:util.ts';

import type { AsStrictExecutionContext, ChildConfiguration } from '@-xun/cli';
import type { CustomCliArguments } from 'universe:commands/build/distributables.ts';
import type { GlobalExecutionContext } from 'universe:configure.ts';

export type { CustomCliArguments };

export default async function command(
  globalExecutionContext: AsStrictExecutionContext<GlobalExecutionContext>
): Promise<ChildConfiguration<CustomCliArguments, GlobalExecutionContext>> {
  return {
    ...(await buildDistributables(globalExecutionContext)),
    aliases: [],
    description: 'Transpile source and assets',
    usage: withGlobalUsage(
      `This command is a direct alias for "symbiote build distributables". See that command's help text for more information.`
    )
  };
}
