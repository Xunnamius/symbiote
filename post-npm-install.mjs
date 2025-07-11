// @ts-check
// ! It is imperative that operations performed by this script are IDEMPOTENT!

/**
 ** This script install common dummies and stops Next.js from hijacking the
 ** NodeJS ambient type.
 **/

import '@-xun/common-dummies/post-install';

import { rm } from 'node:fs/promises';

import { toAbsolutePath, toPath } from '@-xun/fs';
import { isAccessible } from '@-xun/project-fs';
import { createGenericLogger } from 'rejoinder';

process.env.DEBUG_COLOR ??= 'true';

const root = toAbsolutePath(import.meta.dirname);
const log = createGenericLogger({
  namespace: `symbiote:post-install`
});

const projectRootNodeModulesNextJsTypeFile = toPath(
  root,
  'node_modules/next/types/global.d.ts'
);

if (await isAccessible(projectRootNodeModulesNextJsTypeFile, { useCached: true })) {
  await rm(projectRootNodeModulesNextJsTypeFile);

  log(
    'Deleted %O TypeScript definition file:\n%O',
    1,
    projectRootNodeModulesNextJsTypeFile
  );
}

// TODO: should also probably run "npm run build" too
