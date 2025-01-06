[**@-xun/symbiote**](../../../README.md)

***

[@-xun/symbiote](../../../README.md) / [src/assets](../README.md) / definedNonBasicAssetPresets

# Variable: definedNonBasicAssetPresets

> `const` **definedNonBasicAssetPresets**: (`undefined` \| [`AssetPreset`](../enumerations/AssetPreset.md))[]

Defined in: [src/assets.ts:172](https://github.com/Xunnamius/symbiote/blob/2e287e33709b516a0ca83d4aca24e98dc1018688/src/assets.ts#L172)

Special presets that should not trigger a full regeneration of the project
(such as [AssetPreset.TurboOnly](../enumerations/AssetPreset.md#turboonly)).

Unlike the other presets, these presets do not use [AssetPreset.Basic](../enumerations/AssetPreset.md#basic)
as a baseline.
