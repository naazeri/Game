# Node Description Batch 1 of 24

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

- "lib_gsap_min": "gsap.min.js" | kind=code-symbol | source=vega/lib/gsap.min.js:L1 | neighbors=[e7dfc30 add vega game, _a(), Aa(), Ab(), ac(), Ad()]
- "scenes_gamescene_gamescene": "GameScene" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L10 | neighbors=[GameScene.ts, .applyBirdSkin(), .checkCollisions(), .clearMobs(), .clearPanicTicks(), .constructor()]
- "js_bootstrap_min_ni": "Ni" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._configAfterMerge(), .constructor(), ._createPopper(), ._createTipElement(), .Default()]
- "branch:repo:github.com/naazeri/Game#main": "main" | kind=Branch | source=git | neighbors=[07c6be3 add change balls v1.2.1, 0d024c8 feat(flappy-bird): rebuild with…, 1270fdf change text and hover color, 19f781f add bola game, 37acf29 chore(engram): update knowledge…, 37be431 add ponge v1.1.3]
- "js_bootstrap_min": "bootstrap.min.js" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L1 | neighbors=[79daffc add landing page, 8ee78eb change Bootstrap to v5.3.1, Ai, at, D(), e()]
- "scenes_gamescene": "GameScene.ts" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, 385e2de fix(hit-the-coin): prevent dupl…, 4042c7c feat(poke): release v2.0.0 rema…, bb72e0b feat(change-balls): release v2.…, c3fedc4 feat(flappy-bird): release v1.2…, fdf34ba feat: rebuild Hit The Coin with…]
- "js_bootstrap_min_ot": "Ot" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._addEventListeners(), ._addTouchEventListeners(), ._clearInterval(), ._configAfterMerge(), .constructor()]
- "audio_audiomanager_audiomanager": "AudioManager" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L4 | neighbors=[AudioManager.ts, .constructor(), .getInstance(), .init(), .isMusicOn(), .isSoundOn()]
- "assets_index_ctaeemyb": "index-CTAEEmYb.js" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L1 | neighbors=[ae, at, ce, Ct, de, Et]
- "assets_index_d2py_agh_nt": "Nt" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[index-D2py_AGH.js, .checkCollisions(), .clearMobs(), .constructor(), .create(), .createAboutModal()]
- "js_bootstrap_min_fe": "fe" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .clearMenus(), ._completeHide(), .constructor(), ._createPopper(), .dataApiKeydownHandler()]
- "src_main": "main.ts" | kind=code-symbol | source=apps/poke/src/main.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, 4042c7c feat(poke): release v2.0.0 rema…, bb72e0b feat(change-balls): release v2.…, c3fedc4 feat(flappy-bird): release v1.2…, fdf34ba feat: rebuild Hit The Coin with…, AboutScene.ts]
- "assets_index_ufwfauyg_gt": "Gt" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[index-UfWfaUyg.js, .applyBirdSkin(), .constructor(), .create(), .createGameOverUI(), .createGlobalControls()]
- "commit:repo:github.com/naazeri/Game@bb72e0bc9f915f398116d9ed29e7b23f89e42ea9": "bb72e0b feat(change-balls): release v2.0.0 remake with phaser 3, typescript, en…" | kind=Commit | source=git | neighbors=[66591ee chore(titles): clean game title…, index-CTAEEmYb.js, AudioManager.ts, main, vite.config.ts, 37acf29 chore(engram): update knowledge…]
- "assets_index_ctaeemyb_ce": "ce" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .constructor(), .create(), .createBackgroundAesthetics(), .createHUD(), .createIconButton()]
- "js_bootstrap_min_ue": "Ue" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._addEventListeners(), ._adjustDialog(), .constructor(), .Default(), .DefaultType()]
- "src_config": "config.ts" | kind=code-symbol | source=apps/poke/src/config.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, 4042c7c feat(poke): release v2.0.0 rema…, bb72e0b feat(change-balls): release v2.…, c3fedc4 feat(flappy-bird): release v1.2…, fdf34ba feat: rebuild Hit The Coin with…, StorageManager.ts]
- "data_storagemanager_storagemanager": "StorageManager" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L5 | neighbors=[AudioManager.ts, StorageManager.ts, .getBestScore(), .getCurrentScore(), .getGamesPlayed(), .getKey()]
- "scenes_menuscene": "MenuScene.ts" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L1 | neighbors=[385e2de fix(hit-the-coin): prevent dupl…, bb72e0b feat(change-balls): release v2.…, fdf34ba feat: rebuild Hit The Coin with…, AudioManager.ts, AudioManager, MenuScene]
- "js_bootstrap_min_fs": "fs" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._activate(), .constructor(), ._deactivate(), ._elemIsActive(), ._getActiveElem()]
- "assets_index_3509133a": "index-3509133a.js" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[A, b(), c, f, G, I]
- "js_bootstrap_min_w_getorcreateinstance": ".getOrCreateInstance()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[.dataApiKeydownHandler(), .jQueryInterface(), .jQueryInterface(), ._keydown(), .jQueryInterface(), .jQueryInterface()]
- "js_bootstrap_min_ai": "Ai" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .changeContent(), ._checkContent(), .constructor(), .Default(), .DefaultType()]
- "js_bootstrap_min_qi": "Qi" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._activateParents(), ._clearActiveClass(), ._configAfterMerge(), .constructor(), .Default()]
- "js_bootstrap_min_w_queuecallback": "._queueCallback()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[._activate(), ._deactivate(), .hide(), .show(), .hide(), .show()]
- "scenes_menuscene_menuscene": "MenuScene" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L4 | neighbors=[MenuScene.ts, .constructor(), .create(), .createBackgroundEffects(), .createButton(), .createFullscreenButton()]
- "js_bootstrap_min_rt": "Rt" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._addAriaAndCollapsedClass(), ._configAfterMerge(), .constructor(), .Default(), .DefaultType()]
- "scenes_gamescene_gamescene_create": ".create()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L67 | neighbors=[GameScene, .applyBirdSkin(), .createAboutModal(), .createAmbientGlows(), .createBackgroundAesthetics(), .createGameOverUI()]
- "assets_index_b4cljeyc": "index-B4CLjEYc.js" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L1 | neighbors=[dt, Gt, It, j(), k(), Nt]
- "assets_index_ctaeemyb_ct": "Ct" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .getBestScore(), .getCurrentScore(), .getGamesPlayed(), .getKey(), .getSpeedSetting()]
- "assets_index_ctaeemyb_ue": "ue" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .create(), .activateShield(), .bounceAndDecideColor(), .constructor(), .drawGlow()]
- "entities_centralball_centralball": "CentralBall" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L31 | neighbors=[CentralBall.ts, .activateShield(), .bounceAndDecideColor(), .constructor(), .drawGlow(), .getX()]
- "js_bootstrap_min_at": "at" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .constructor(), .Default(), .DefaultType(), .dispose(), ._end()]
- "js_bootstrap_min_os": "Os" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._clearTimeout(), .constructor(), .Default(), .DefaultType(), .dispose()]
- "js_bootstrap_min_we": "we" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._initializeBackDrop(), ._initializeBackDrop(), ._append(), ._configAfterMerge(), .constructor()]
- "assets_index_b4cljeyc_nt": "Nt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js, .clearPanicTicks(), .constructor(), .create(), .endGame(), .handleCoinHit()]
- "assets_index_ctaeemyb_ct_getkey": ".getKey()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Ct, .getBestScore(), .getCurrentScore(), .getGamesPlayed(), .getSpeedSetting(), .incrementGamesPlayed()]
- "data_storagemanager_storagemanager_getkey": ".getKey()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L6 | neighbors=[StorageManager, .getBestScore(), .getCurrentScore(), .getGamesPlayed(), .getSpeedSetting(), .incrementGamesPlayed()]
- "js_bootstrap_min_gi": "gi" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._addEventListeners(), .constructor(), .Default(), .DefaultType(), .dispose()]
- "js_bootstrap_min_ne": "Ne" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .show(), ._applyManipulationCallback(), .constructor(), ._disableOverFlow(), .getWidth()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-000.json

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
