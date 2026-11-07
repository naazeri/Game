# Node Description Batch 2 of 24

Engram is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "lib_gsap_min_tween": "Tween()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _assertThisInitialized(), ea(), eb(), gc(), ja()]
- "assets_index_ctaeemyb_ce_handlepillarhit": ".handlePillarHit()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .handleGameOver(), .spawnMatchParticles(), .addLife(), .getLives(), .loseLife()]
- "assets_index_ctaeemyb_de": "de" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .createHUD(), .addLife(), .constructor(), .createHearts(), .drawHeart()]
- "commit:repo:github.com/naazeri/Game@4042c7cb7a4f4830f65581577793e3ffc051b954": "4042c7c feat(poke): release v2.0.0 remake with phaser 3, typescript and shared …" | kind=Commit | source=git | neighbors=[index-D2py_AGH.js, main, 66591ee chore(titles): clean game title…, vite.config.ts, AboutScene.ts, BootScene.ts]
- "js_bootstrap_min_ot_slide": "._slide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, ._keydown(), .next(), .prev(), .cycle(), ._getActive()]
- "lib_gsap_min_r": "r()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ac(), Bo(), eb(), lb(), Lc()]
- "ui_heartsui_heartsui": "HeartsUI" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L3 | neighbors=[GameScene.ts, HeartsUI.ts, .addLife(), .constructor(), .createHearts(), .drawHeart()]
- "assets_index_ctaeemyb_le": "le" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .constructor(), .create(), .createBackgroundEffects(), .createHalfButton(), .createIconAction()]
- "assets_index_ctaeemyb_oe": "oe" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .create(), .constructor(), .createContent(), .createMediumButton(), .createSaveButton()]
- "assets_index_d2py_agh": "index-D2py_AGH.js" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L1 | neighbors=[Bt(), Dt(), et(), Gt, j(), Nt]
- "audio_audiomanager": "AudioManager.ts" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L1 | neighbors=[AudioManager, StorageManager.ts, StorageManager, bb72e0b feat(change-balls): release v2.…, BootScene.ts, GameScene.ts]
- "commit:repo:github.com/naazeri/Game@fdf34ba25e343b338fec5042446575e8d71d700e": "fdf34ba feat: rebuild Hit The Coin with Phaser 3 and setup GitHub Actions Pages…" | kind=Commit | source=git | neighbors=[5e62a51 update change-balls to version …, main, 385e2de fix(hit-the-coin): prevent dupl…, vite.config.ts, AboutScene.ts, BootScene.ts]
- "js_bootstrap_min_se": "Se" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._initializeFocusTrap(), .activate(), .constructor(), .deactivate(), .Default()]
- "js_bootstrap_min_w": "W" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .constructor(), .DATA_KEY(), .dispose(), .EVENT_KEY(), .eventName()]
- "scenes_bootscene": "BootScene.ts" | kind=code-symbol | source=apps/poke/src/scenes/BootScene.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, 4042c7c feat(poke): release v2.0.0 rema…, bb72e0b feat(change-balls): release v2.…, c3fedc4 feat(flappy-bird): release v1.2…, fdf34ba feat: rebuild Hit The Coin with…, AudioManager.ts]
- "ui_gameovermodal": "GameOverModal.ts" | kind=code-symbol | source=apps/change-balls/src/ui/GameOverModal.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, GameScene.ts, AudioManager.ts, AudioManager, StorageManager.ts, StorageManager]
- "ui_settingsmodal_settingsmodal": "SettingsModal" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L6 | neighbors=[MenuScene.ts, SettingsModal.ts, .constructor(), .createContent(), .createMediumButton(), .createSaveButton()]
- "assets_index_ctaeemyb_ce_create": ".create()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .createBackgroundAesthetics(), .createHUD(), .createTwoPlayerDivider(), .setupInputs(), .getSpeedSetting()]
- "assets_index_ufwfauyg": "index-UfWfaUyg.js" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L1 | neighbors=[at, Gt, It, Nt, Ot(), st()]
- "lib_gsap_min_s": "s()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ac(), Bo(), ea(), eb(), Ew()]
- "assets_index_ctaeemyb_fe": "fe" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .create(), .constructor(), .createButton(), .createContent(), .createNewRecordBadge()]
- "assets_index_ctaeemyb_he": "he" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .constructor(), .createCloseButton(), .createContent(), .createStatRow(), .getVisible()]
- "assets_index_ctaeemyb_kt": "Kt" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .create(), .constructor(), .drawPivot(), .drawRod(), .flip()]
- "assets_index_ctaeemyb_le_create": ".create()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[le, ae, he, .createBackgroundEffects(), .createHalfButton(), .createLogoEmblem()]
- "commit:repo:github.com/naazeri/Game@c3fedc40348fafff40e7476ded1c75366062ef6d": "c3fedc4 feat(flappy-bird): release v1.2.0 enhanced remake with custom character…" | kind=Commit | source=git | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, index-UfWfaUyg.js, main, b714fad chore(memory): initialize Engra…, vite.config.ts, BootScene.ts]
- "data_storagemanager": "StorageManager.ts" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L1 | neighbors=[AudioManager.ts, bb72e0b feat(change-balls): release v2.…, StorageManager, config.ts, GameMode, GameScene.ts]
- "entities_ballpillar_ballpillar": "BallPillar" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L10 | neighbors=[BallPillar.ts, .constructor(), .drawPivot(), .drawRod(), .flip(), .getActiveBallWorldPosition()]
- "entities_centralball": "CentralBall.ts" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, CentralBall, getHeatTierForScore(), HEAT_TIERS, HeatTierInfo, config.ts]
- "lib_gsap_min_ja": "ja()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, eb(), fb(), ha(), ia(), Aa()]
- "lib_gsap_min_t": "t()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Ab(), ac(), Ec(), fb(), gb()]
- "scenes_menuscene_menuscene_create": ".create()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L19 | neighbors=[MenuScene, .createBackgroundEffects(), .createButton(), .createFullscreenButton(), .createHalfButton(), .createLogoEmblem()]
- "ui_gameovermodal_gameovermodal": "GameOverModal" | kind=code-symbol | source=apps/change-balls/src/ui/GameOverModal.ts:L7 | neighbors=[GameScene.ts, GameOverModal.ts, .constructor(), .createButton(), .createContent(), .createNewRecordBadge()]
- "ui_settingsmodal": "SettingsModal.ts" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, MenuScene.ts, AudioManager.ts, AudioManager, StorageManager.ts, StorageManager]
- "ui_statsmodal": "StatsModal.ts" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, MenuScene.ts, AudioManager.ts, AudioManager, StorageManager.ts, StorageManager]
- "ui_statsmodal_statsmodal": "StatsModal" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L6 | neighbors=[MenuScene.ts, StatsModal.ts, .constructor(), .createCloseButton(), .createContent(), .createStatRow()]
- "ui_texthelper": "TextHelper.ts" | kind=code-symbol | source=apps/change-balls/src/ui/TextHelper.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, GameScene.ts, MenuScene.ts, AboutModal.ts, BannerManager.ts, GameOverModal.ts]
- "assets_index_ctaeemyb_ae": "ae" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .constructor(), .createButton(), .createContent(), .getVisible(), .hide()]
- "commit:repo:github.com/naazeri/Game@0d024c8a1fd991ba158b44d17c0fb269f79a6d04": "0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite" | kind=Commit | source=git | neighbors=[main, c3fedc4 feat(flappy-bird): release v1.2…, vite.config.ts, BootScene.ts, GameScene.ts, config.ts]
- "js_bootstrap_min_mi": "Mi" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .Default(), .DefaultType(), ._getContent(), ._getContentForTemplate(), ._isWithContent()]
- "js_bootstrap_min_q": "q" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._configAfterMerge(), .Default(), .DefaultType(), ._getConfig(), ._mergeConfigObj()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-001.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
