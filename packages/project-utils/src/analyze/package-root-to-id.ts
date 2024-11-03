import { basename } from 'node:path';

import { type WorkspacePackageId } from 'multiverse+project-utils:analyze';

import { type AbsolutePath } from 'rootverse+project-utils:src/fs.ts';

/**
 * Synchronously determine the package-id of a package in a monorepo from the
 * path to the package's root directory.
 *
 * Any character that is not alphanumeric will be replaced with a hyphen (-) in
 * the resulting package-id. If `packageRoot` ends in a path separator
 * character, it is trimmed off.
 */
export function packageRootToId(packageRoot: AbsolutePath): WorkspacePackageId {
  return basename(packageRoot).replaceAll(/[^\da-z-]/gi, '-');
}
