import { runProgram } from '@-xun/cli';
import { toAbsolutePath } from '@-xun/fs';

import 'rejoinder-github-actions/activator';

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
