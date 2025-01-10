// @ts-check
'use strict';

const { createDebugLogger } = require('rejoinder');

const { deepMergeConfig } = require('@-xun/symbiote/assets');

const {
  assertEnvironment,
  moduleExport
} = require('@-xun/symbiote/assets/release.config.cjs');

const debug = createDebugLogger({ namespace: 'symbiote:config:release' });

module.exports = deepMergeConfig(
  moduleExport(assertEnvironment({ projectRoot: __dirname })),
  {
    // Any custom configs here will be deep merged with moduleExport's result
  }
);

debug('exported config: %O', module.exports);
