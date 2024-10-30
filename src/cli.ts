import { join } from 'node:path';

import { runProgram } from '@black-flag/core';

import type { GlobalExecutionContext } from 'universe:configure.ts';

/**
 * This is the simple CLI entry point executed directly by node.
 */
export default runProgram<GlobalExecutionContext>(
  join(__dirname, 'commands'),
  require('universe:configure.ts')
);

module.exports = exports.default;
module.exports.default = exports.default;
