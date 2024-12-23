// @ts-check
'use strict';

const {
  moduleExport,
  assertEnvironment
} = require('@-xun/scripts/assets/conventional.config.cjs');

// TODO: publish latest rejoinder package first, then update configs to use it
//const { createDebugLogger } = require('rejoinder');

/*const debug = createDebugLogger({ namespace: 'xscripts:config:conventional' });*/

module.exports = moduleExport({
  ...assertEnvironment(),
  configOverrides: {
    // Any custom configs here will be deep merged with moduleExport with
    // special considerations for certain keys. `configOverrides` can also
    // be a function instead of an object.
  }
});

/*debug('exported config: %O', module.exports);*/
