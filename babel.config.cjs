// @ts-check
'use strict';

const { createDebugLogger } = require('rejoinder');

const {
  assertEnvironment,
  moduleExport
  // ? This needs to be this way only for this project since it builds itself
} = require('./node_modules/@-xun/symbiote/dist/src/assets/transformers/_babel.config.cjs.js');

// ? This needs to be this way only for this project since it builds itself
const { deepMergeConfig } = require('./node_modules/@-xun/symbiote/dist/src/assets.js');

const debug = createDebugLogger({ namespace: 'symbiote:config:babel' });

module.exports = deepMergeConfig(
  moduleExport({
    derivedAliases: getBabelAliases(),
    ...assertEnvironment({ projectRoot: __dirname })
  }),
  {
    // Any custom configs here will be deep merged with moduleExport's result
  }
);

debug('exported config: %O', module.exports);

function getBabelAliases() {
  // ! These aliases are auto-generated by symbiote. Instead of modifying them
  // ! directly, consider regenerating aliases across the entire project with:
  // ! `npx symbiote project renovate --regenerate-assets --assets-preset ...`
  return {
    '^multiverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator:(.+)$':
      './packages/babel-plugin-metadata-accumulator/src/$1',
    '^multiverse\\+bfe:(.+)$': './packages/bfe/src/$1',
    '^multiverse\\+cli\\x2dutils:(.+)$': './packages/cli-utils/src/$1',
    '^multiverse\\+project\\x2dutils:(.+)$': './packages/project-utils/src/$1',
    '^multiverse\\+test\\x2dutils:(.+)$': './packages/test-utils/src/$1',
    '^multiverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator$':
      './packages/babel-plugin-metadata-accumulator/src/index.js',
    '^multiverse\\+bfe$': './packages/bfe/src/index.js',
    '^multiverse\\+cli\\x2dutils$': './packages/cli-utils/src/index.js',
    '^multiverse\\+project\\x2dutils$': './packages/project-utils/src/index.js',
    '^multiverse\\+test\\x2dutils$': './packages/test-utils/src/index.js',
    '^rootverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator:(.+)$':
      './packages/babel-plugin-metadata-accumulator/$1',
    '^rootverse\\+bfe:(.+)$': './packages/bfe/$1',
    '^rootverse\\+cli\\x2dutils:(.+)$': './packages/cli-utils/$1',
    '^rootverse\\+project\\x2dutils:(.+)$': './packages/project-utils/$1',
    '^rootverse\\+test\\x2dutils:(.+)$': './packages/test-utils/$1',
    '^rootverse:(.+)$': './$1',
    '^universe:(.+)$': './src/$1',
    '^universe$': './src/index.js',
    '^testverse\\+babel\\x2dplugin\\x2dmetadata\\x2daccumulator:(.+)$':
      './packages/babel-plugin-metadata-accumulator/test/$1',
    '^testverse\\+bfe:(.+)$': './packages/bfe/test/$1',
    '^testverse\\+cli\\x2dutils:(.+)$': './packages/cli-utils/test/$1',
    '^testverse\\+project\\x2dutils:(.+)$': './packages/project-utils/test/$1',
    '^testverse\\+test\\x2dutils:(.+)$': './packages/test-utils/test/$1',
    '^testverse:(.+)$': './test/$1',
    '^typeverse:(.+)$': './types/$1'
  };
}
