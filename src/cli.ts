import { runProgram } from '@black-flag/core';
import 'rejoinder-github-actions/activator';

import { toAbsolutePath } from 'multiverse+project-utils:fs.ts';

import type { GlobalExecutionContext } from 'universe:configure.ts';

/**
 * This is the simple CLI entry point executed directly by node.
 */
export default runProgram<GlobalExecutionContext>(
  toAbsolutePath(__dirname, 'commands'),
  require('universe:configure.ts')
);

module.exports = exports.default;
module.exports.default = exports.default;
