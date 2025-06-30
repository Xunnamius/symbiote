import { isAccessible, wranglerConfigPackageBase } from '@-xun/project';

import {
  AssetPreset,
  generatePerPackageAssets,
  makeTransformer
} from 'universe:assets.ts';

import { stringifyJson } from 'universe:util.ts';

const now = new Date();

export function config() {
  return {
    $schema: 'https://unpkg.com/wrangler@latest/config-schema.json',
    name: 'unnamed-app-worker',
    main: 'src/worker.ts',
    compatibility_date: `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`,
    workers_dev: false,
    vars: {
      //USE_CORS: false
    },
    route: {
      pattern: 'https://example.com/path/endpoint',
      zone_name: 'example.com'
    },
    env: {
      preview: {
        name: 'prev-unnamed-app-worker',
        route: {
          pattern: 'https://example.com/path/preview-endpoint',
          zone_name: 'example.com'
        }
      },
      development: {
        name: 'dev-unnamed-app-worker',
        vars: {
          //USE_CORS: true
        }
      }
    }
  };
}

export const { transformer } = makeTransformer(function (context) {
  const { assetPreset } = context;

  if (assetPreset && assetPreset !== AssetPreset.Wrangler) {
    return [];
  }

  // TODO: consider allowing generatePerPackageAssets to accept a "filter"
  // TODO: option that excludes packages based on their metadata. This would
  // TODO: allow "package presets" to be differentiated both manually and
  // TODO: cleanly!

  // * Every package that already has wrangler.json will have its values updated
  // * except non-hybrid monorepo roots
  return generatePerPackageAssets(context, async function ({ toPackageAbsolutePath }) {
    const path = toPackageAbsolutePath(wranglerConfigPackageBase);

    // TODO: implement asset "package presets" (vs the global asset "project
    // TODO: preset"). Switch assetPreset usage to assetPackagePreset and
    // TODO: assetProjectPreset. Allow AssetPreset.Nextjs to be subroot
    // TODO: package. Then finish implementing the below:

    // ? Only write this file if the "assetSubPreset" is AssetPreset.Wrangler
    if (!(await isAccessible(path, { useCached: true }))) {
      return [
        {
          path,
          generate: () => stringifyJson(config())
        }
      ];
    }
  });
});
