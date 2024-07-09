import { debugFactory } from 'multiverse/debug-extended';

import type {
  Options as RunOptions,
  Result as RunReturnType
} from 'execa' with { 'resolution-mode': 'import' };

const debug = debugFactory('@-xun/run:runtime');

// TODO: merge with the "run" from test/setup.ts that includes debugging by
// TODO: default

/**
 * Runs (executes) `file` with the given `args` with respect to the given
 * `options`.
 *
 * Note that, by default, this function rejects on a non-zero exit code.
 * Set `reject: false` to override this, or use {@link runNoRejectOnBadExit}.
 */
export async function run(file: string, args?: string[], options?: RunOptions) {
  debug(`executing command: ${file}${args ? ` ${args.join(' ')}` : ''}`);

  const result = await (await import('execa')).execa(file, args, options);

  debug('execution result: %O', result);

  return {
    ...result,
    stdout: result.stdout?.toString() || '',
    stderr: result.stderr?.toString() || ''
  };
}

/**
 * Runs (executes) `file` with the given `args` with respect to the given
 * `options` (merged with `{ stdout: 'inherit', stderr: 'inherit' }`).
 *
 * Note that, by default, this function rejects on a non-zero exit code.
 * Set `reject: false` to override this, or use {@link runNoRejectOnBadExit}.
 */
export async function runWithInheritedIo(
  ...[file, args, options]: Parameters<typeof run>
) {
  return run(file, args, { ...options, stdout: 'inherit', stderr: 'inherit' }) as Promise<
    RunReturnType & { stdout: never; stderr: never; all: never }
  >;
}

/**
 * Runs (executes) `file` with the given `args` with respect to the given
 * `options`. This function DOES NOT REJECT on a non-zero exit code.
 */
export async function runNoRejectOnBadExit(
  ...[file, args, options]: Parameters<typeof run>
) {
  return run(file, args, { ...options, reject: false });
}

/**
 * Returns a function that, when called, runs (executes) `file` with the given
 * `args` with respect to the given `options`. These parameters can be
 * overridden during individual invocations.
 */
export function runnerFactory(file: string, args?: string[], options?: RunOptions) {
  const factoryArgs = args;
  const factoryOptions = options;

  return (args?: string[], options?: RunOptions) =>
    run(file, args || factoryArgs, { ...factoryOptions, ...options });
}

export { RunOptions, RunReturnType };
