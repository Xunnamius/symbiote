// @ts-check
'use strict';

import { deepMergeConfig } from '@-xun/symbiote/assets';
import { assertEnvironment, moduleExport } from '@-xun/symbiote/assets/jest.config.mjs';

// TODO: publish latest rejoinder package first, then update configs to use it
//import { createDebugLogger } from 'rejoinder';

/*const debug = createDebugLogger({ namespace: 'symbiote:config:jest' });*/

const config = deepMergeConfig(
  moduleExport({ derivedAliases: getJestAliases(), ...assertEnvironment() }),
  /**
   * @type {import('@-xun/symbiote/assets/jest.config.mjs').JestConfig}
   */
  {
    // Any custom configs here will be deep merged with moduleExport's result
  }
);

export default config;

/*debug('exported config: %O', config);*/

function getJestAliases() {
  // ! The aliases described in "paths" are auto-generated by symbiote.
  // ! Instead of modifying it directly, consider regenerating aliases
  // ! across the entire project with: `npx symbiote project renovate
  // ! --regenerate-assets --assets-preset ...`
  // * These aliases appear in:
  // *   - tsconfig.json      (JSON)
  // *   - babel.config.cjs   (CJS)
  // *   - eslint.config.mjs  (ESM)
  // *   - jest.config.mjs    (ESM)
  // *   - next.config.mjs    (ESM)
  // *   - webpack.config.mjs (ESM)
  return {
    '^universe:(.+)$': '<rootDir>/src/$1',
    '^universe$': '<rootDir>/src/index.ts',
    '^multiverse\\+test\\x2dutils:(.+)$': '<rootDir>/packages/test-utils/src/$1',
    '^multiverse\\+rejoinder:(.+)$': '<rootDir>/packages/rejoinder/src/$1',
    '^multiverse\\+project\\x2dutils:(.+)$': '<rootDir>/packages/project-utils/src/$1',
    '^multiverse\\+debug:(.+)$': '<rootDir>/packages/debug/src/$1',
    '^multiverse\\+cli\\x2dutils:(.+)$': '<rootDir>/packages/cli-utils/src/$1',
    '^multiverse\\+bfe:(.+)$': '<rootDir>/packages/bfe/src/$1',
    '^multiverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator:(.+)$':
      '<rootDir>/packages/babel-plugin-metadata-accumulator/src/$1',
    '^multiverse\\+test\\x2dutils$': '<rootDir>/packages/test-utils/src/index.ts',
    '^multiverse\\+rejoinder$': '<rootDir>/packages/rejoinder/src/index.ts',
    '^multiverse\\+project\\x2dutils$': '<rootDir>/packages/project-utils/src/index.ts',
    '^multiverse\\+debug$': '<rootDir>/packages/debug/src/index.ts',
    '^multiverse\\+cli\\x2dutils$': '<rootDir>/packages/cli-utils/src/index.ts',
    '^multiverse\\+bfe$': '<rootDir>/packages/bfe/src/index.ts',
    '^multiverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator$':
      '<rootDir>/packages/babel-plugin-metadata-accumulator/src/index.ts',
    '^rootverse\\+test\\x2dutils:(.+)$': '<rootDir>/packages/test-utils/$1',
    '^rootverse\\+rejoinder:(.+)$': '<rootDir>/packages/rejoinder/$1',
    '^rootverse\\+project\\x2dutils:(.+)$': '<rootDir>/packages/project-utils/$1',
    '^rootverse\\+debug:(.+)$': '<rootDir>/packages/debug/$1',
    '^rootverse\\+cli\\x2dutils:(.+)$': '<rootDir>/packages/cli-utils/$1',
    '^rootverse\\+bfe:(.+)$': '<rootDir>/packages/bfe/$1',
    '^rootverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator:(.+)$':
      '<rootDir>/packages/babel-plugin-metadata-accumulator/$1',
    '^rootverse:(.+)$': '<rootDir>/$1',
    '^testverse\\+test\\x2dutils:(.+)$': '<rootDir>/packages/test-utils/test/$1',
    '^testverse\\+rejoinder:(.+)$': '<rootDir>/packages/rejoinder/test/$1',
    '^testverse\\+project\\x2dutils:(.+)$': '<rootDir>/packages/project-utils/test/$1',
    '^testverse\\+debug:(.+)$': '<rootDir>/packages/debug/test/$1',
    '^testverse\\+cli\\x2dutils:(.+)$': '<rootDir>/packages/cli-utils/test/$1',
    '^testverse\\+bfe:(.+)$': '<rootDir>/packages/bfe/test/$1',
    '^testverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator:(.+)$':
      '<rootDir>/packages/babel-plugin-metadata-accumulator/test/$1',
    '^testverse:(.+)$': '<rootDir>/test/$1',
    '^typeverse:(.+)$': '<rootDir>/types/$1'
  };
}
