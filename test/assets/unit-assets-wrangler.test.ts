/* eslint-disable jest/require-hook */
// * These tests ensure the exported interfaces under test function as expected.

import { AssetPreset } from 'universe:assets.ts';

import { generateAssetContentSnapshotsForPreset } from 'testverse:util.ts';

generateAssetContentSnapshotsForPreset(AssetPreset.Wrangler);
