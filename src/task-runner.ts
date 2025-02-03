import { run } from '@-xun/run';
import { type ExtendedLogger } from 'rejoinder';

import { hardAssert } from 'multiverse+cli-utils:error.ts';
import { LogTag } from 'multiverse+cli-utils:logging.ts';

import { ErrorMessage } from 'universe:error.ts';

export async function attemptToRunCommand(
  cmd: Parameters<typeof run>[0],
  cmdArgs: Parameters<typeof run>[1],
  {
    all = true,
    reject = false,
    shouldOutputResult = true,
    ...runConfig
  }: Parameters<typeof run>[2] & {
    shouldOutputResult?: boolean;
    scriptName: string;
    logger: ExtendedLogger;
  }
) {
  const config = {
    ...runConfig,
    env: {
      DEBUG_COLORS: 'true',
      DEBUG_HIDE_DATE: 'true',
      FORCE_COLOR: 'true',
      ...runConfig.env
    },
    all,
    reject
  };

  const { all: output, exitCode } = await run(cmd, cmdArgs, config);

  if (shouldOutputResult) {
    if (output !== undefined) {
      hardAssert(typeof output === 'string', ErrorMessage.GuruMeditation());

      runConfig.logger(
        [exitCode === 0 ? LogTag.IF_NOT_HUSHED : LogTag.IF_NOT_SILENCED],
        `${exitCode === 0 ? '' : '❌ (failed) '}%O output:`,
        runConfig.scriptName
      );

      process.stdout.write(output + (output.endsWith('\n') ? '' : '\n'));
    } else {
      runConfig.logger(
        [exitCode === 0 ? LogTag.IF_NOT_HUSHED : LogTag.IF_NOT_SILENCED],
        `${exitCode === 0 ? '' : '❌ (failed) '}%O`,
        runConfig.scriptName
      );
    }
  }

  return exitCode;
}
