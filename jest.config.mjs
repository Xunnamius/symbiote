// @ts-check
'use strict';

import { createDebugLogger } from 'rejoinder';

import { deepMergeConfig } from '@-xun/symbiote/assets';
import { assertEnvironment, moduleExport } from '@-xun/symbiote/assets/jest.config.mjs';

const debug = createDebugLogger({ namespace: 'symbiote:config:jest' });

const config = deepMergeConfig(
  moduleExport({ derivedAliases: getJestAliases(), ...assertEnvironment() }),
  {
    // Any custom configs here will be deep merged with moduleExport's result
  }
);

export default config;

debug('exported config: %O', config);

function getJestAliases() {
  // ! These aliases are auto-generated by symbiote. Instead of modifying them
  // ! directly, consider regenerating aliases across the entire project with:
  // ! `npx symbiote project renovate --regenerate-assets --assets-preset ...`
  return {
    '^multiverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator:(.+)$':
      '<rootDir>/packages/babel-plugin-metadata-accumulator/src/$1',
    '^multiverse\\+bfe:(.+)$': '<rootDir>/packages/bfe/src/$1',
    '^multiverse\\+cli\\x2dutils:(.+)$': '<rootDir>/packages/cli-utils/src/$1',
    '^multiverse\\+project\\x2dutils:(.+)$': '<rootDir>/packages/project-utils/src/$1',
    '^multiverse\\+test\\x2dutils:(.+)$': '<rootDir>/packages/test-utils/src/$1',
    '^multiverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator$':
      '<rootDir>/packages/babel-plugin-metadata-accumulator/src/index.ts',
    '^multiverse\\+bfe$': '<rootDir>/packages/bfe/src/index.ts',
    '^multiverse\\+cli\\x2dutils$': '<rootDir>/packages/cli-utils/src/index.ts',
    '^multiverse\\+project\\x2dutils$': '<rootDir>/packages/project-utils/src/index.ts',
    '^multiverse\\+test\\x2dutils$': '<rootDir>/packages/test-utils/src/index.ts',
    '^rootverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator:(.+)$':
      '<rootDir>/packages/babel-plugin-metadata-accumulator/$1',
    '^rootverse\\+bfe:(.+)$': '<rootDir>/packages/bfe/$1',
    '^rootverse\\+cli\\x2dutils:(.+)$': '<rootDir>/packages/cli-utils/$1',
    '^rootverse\\+project\\x2dutils:(.+)$': '<rootDir>/packages/project-utils/$1',
    '^rootverse\\+test\\x2dutils:(.+)$': '<rootDir>/packages/test-utils/$1',
    '^rootverse:(.+)$': '<rootDir>/$1',
    '^universe:(.+)$': '<rootDir>/src/$1',
    '^universe$': '<rootDir>/src/index.ts',
    '^testverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator:(.+)$':
      '<rootDir>/packages/babel-plugin-metadata-accumulator/test/$1',
    '^testverse\\+bfe:(.+)$': '<rootDir>/packages/bfe/test/$1',
    '^testverse\\+cli\\x2dutils:(.+)$': '<rootDir>/packages/cli-utils/test/$1',
    '^testverse\\+project\\x2dutils:(.+)$': '<rootDir>/packages/project-utils/test/$1',
    '^testverse\\+test\\x2dutils:(.+)$': '<rootDir>/packages/test-utils/test/$1',
    '^testverse:(.+)$': '<rootDir>/test/$1',
    '^typeverse:(.+)$': '<rootDir>/types/$1'
  };
}
