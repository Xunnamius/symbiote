/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { readFileSync } from 'node:fs';
import { readFile as readFileAsync } from 'node:fs/promises';

import * as JSONC from 'jsonc-parser';

import { cache, CacheScope } from 'universe+project-utils:cache.ts';
import { ErrorMessage, ProjectError } from 'universe+project-utils:error.ts';
import { type AbsolutePath } from 'universe+project-utils:fs.ts';

import {
  type ParametersNoFirst,
  type SyncVersionOf
} from 'universe+project-utils:util.ts';

import type { JsonValue, Promisable } from 'type-fest';

export { JSONC };

/**
 * @see {@link readJsonc}
 */
export type ReadJsoncOptions = {
  /**
   * If `true`, so long as the `parse` function does not throw, this function
   * will return the result. Note that this could result in an incomplete or
   * corrupted (but syntactically sound) object.
   *
   * @default false
   */
  ignoreNonExceptionErrors?: boolean;
  /**
   * Use the internal cached result from a previous run, if available.
   *
   * Unless `useCached` is `false`, the results returned by this function will
   * always strictly equal (`===`) each other with respect to call signature.
   *
   * @see {@link cache}
   */
  useCached: boolean;
  /**
   * @see {@link JSONC.parse}
   */
  parseOptions?: Parameters<typeof JSONC.parse>[2];
  /**
   * If `true`, an attempt will be made to read in and parse the JSON file. If
   * it fails (i.e. an error is thrown), `{}` is returned and no error is
   * thrown.
   *
   * Note that, currently, fail results (where `{}` is returned) are not cached.
   *
   * @default false
   */
  try?: boolean;
};

function readJsonc_<T>(
  shouldRunSynchronously: false,
  path: AbsolutePath,
  options: ReadJsoncOptions
): Promise<T>;
function readJsonc_<T>(
  shouldRunSynchronously: true,
  path: AbsolutePath,
  options: ReadJsoncOptions
): T;
function readJsonc_<T>(
  shouldRunSynchronously: boolean,
  path: AbsolutePath,
  { useCached, try: try_, ...cacheIdComponentsObject }: ReadJsoncOptions
): Promisable<T | undefined> {
  const { ignoreNonExceptionErrors, parseOptions } = cacheIdComponentsObject;

  if (useCached) {
    const cachedResult = cache.get(CacheScope.ReadJsonc, [
      path,
      cacheIdComponentsObject
    ]) as T;

    if (cachedResult) {
      return shouldRunSynchronously ? cachedResult : Promise.resolve(cachedResult);
    }
  }

  if (shouldRunSynchronously) {
    try {
      const rawJson = (() => {
        try {
          return readFileSync(path, 'utf8');
        } catch (error) {
          throw new ProjectError(ErrorMessage.NotReadable(path), { cause: error });
        }
      })();

      return parse(rawJson);
    } catch (error) {
      return handleError(error);
    }
  } else {
    return readFileAsync(path, 'utf8')
      .then(
        (rawJson) => {
          return parse(rawJson);
        },
        (error: unknown) => {
          throw new ProjectError(ErrorMessage.NotReadable(path), { cause: error });
        }
      )
      .catch(handleError);
  }

  function parse(rawJson: string): T {
    try {
      const errors: JSONC.ParseError[] = [];
      const result = JSONC.parse(rawJson, errors, parseOptions);

      if (!ignoreNonExceptionErrors && errors.length) {
        throw new Error(
          'JSONC.parse returned with errors: ' +
            errors
              .map(
                ({ error: errorCode, offset: errorOffset }) =>
                  `code ${errorCode} at offset ${errorOffset}`
              )
              .join('; ')
        );
      }

      cache.set(CacheScope.ReadJsonc, [path, cacheIdComponentsObject], result);
      return result;
    } catch (error) {
      throw new ProjectError(ErrorMessage.NotParsable(path, 'jsonc'), { cause: error });
    }
  }

  function handleError(error: unknown): T | never {
    if (try_) {
      return {} as T;
    }

    throw error;
  }
}

/**
 * Asynchronously read in and parse the contents of an arbitrary JSONC file.
 *
 * Use the template variable (`T`) to bring your own types. Otherwise, it
 * defaults to {@link JsonValue}.
 *
 * **NOTE: the result of this function is memoized! This does NOT _necessarily_
 * mean results will strictly equal each other. See `useCached` in this specific
 * function's options for details.** To fetch fresh results, set the `useCached`
 * option to `false` or clear the internal cache with {@link cache.clear}.
 */
export function readJsonc<T = JsonValue>(
  ...args: ParametersNoFirst<typeof readJsonc_<T>>
) {
  return readJsonc_<T>(false, ...args);
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace readJsonc {
  /**
   * Synchronously read in and parse the contents of an arbitrary JSONC file.
   *
   * Use the template variable (`T`) to bring your own types. Otherwise, it
   * defaults to {@link JsonValue}.
   *
   * **NOTE: the result of this function is memoized! This does NOT
   * _necessarily_ mean results will strictly equal each other. See `useCached`
   * in this specific function's options for details.** To fetch fresh results,
   * set the `useCached` option to `false` or clear the internal cache with
   * {@link cache.clear}.
   */
  export const sync = function <T = JsonValue>(
    ...args: ParametersNoFirst<typeof readJsonc_<T>>
  ) {
    return readJsonc_<T>(true, ...args);
  } as SyncVersionOf<typeof readJsonc>;
}
