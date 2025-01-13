// @ts-check
// * This script is run automatically by `npx symbiote project prepare`, see
// * `npx symbiote project prepare --help` for details.
// ! It is imperative that operations performed by this script are IDEMPOTENT!

import { basename } from 'node:path';

import { runNoRejectOnBadExit } from '@-xun/run';
import { createGenericLogger } from 'rejoinder';

const root = import.meta.dirname;
const rejoinderListr2 = 'rejoinder-listr2';

const log = createGenericLogger({
  namespace: `${basename(root)}:post-npm-install`
});

log('Installing optional peer dependency: %O', rejoinderListr2);

const { exitCode } = await runNoRejectOnBadExit(
  'npm',
  ['install', '--force', rejoinderListr2],
  { cwd: root }
);

if (exitCode === 0) {
  log('✅');
} else {
  log.error('Optional peer dependency installation failed! 🛑');
}
