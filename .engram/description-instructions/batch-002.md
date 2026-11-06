# Node Description Batch 3 of 25

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

- "build_unityloader_w": "w()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a(), c(), g(), h(), l()]
- "commit:repo:github.com/naazeri/Game@0d024c8a1fd991ba158b44d17c0fb269f79a6d04": "0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite" | kind=Commit | source=git | neighbors=[main, c3fedc4 feat(flappy-bird): release v1.2…, vite.config.ts, BootScene.ts, GameScene.ts, config.ts]
- "js_bootstrap_min_mi": "Mi" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .Default(), .DefaultType(), ._getContent(), ._getContentForTemplate(), ._isWithContent()]
- "js_bootstrap_min_q": "q" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._configAfterMerge(), .Default(), .DefaultType(), ._getConfig(), ._mergeConfigObj()]
- "lib_gsap_min_v": "v()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _a(), ac(), ea(), eb(), gb()]
- "ui_aboutmodal_aboutmodal": "AboutModal" | kind=code-symbol | source=apps/change-balls/src/ui/AboutModal.ts:L6 | neighbors=[MenuScene.ts, AboutModal.ts, .constructor(), .createButton(), .createContent(), .getVisible()]
- "ui_texthelper_createcrisptext": "createCrispText()" | kind=code-symbol | source=apps/change-balls/src/ui/TextHelper.ts:L5 | neighbors=[GameScene.ts, MenuScene.ts, AboutModal.ts, BannerManager.ts, GameOverModal.ts, SettingsModal.ts]
- "assets_index_b4cljeyc_gt": "Gt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js, .constructor(), .create(), .createButton(), .createFullscreenButton(), .handleResize()]
- "assets_index_ctaeemyb_ue_drawglow": ".drawGlow()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ue, .constructor(), Nt(), .clear(), .reset(), .switchColor()]
- "assets_index_ctaeemyb_ve_clear": ".clear()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.restartGame(), .drawHeart(), .drawPivot(), .drawRod(), .activateShield(), .drawGlow()]
- "assets_index_d2py_agh_nt_create": ".create()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .createAboutModal(), .createAmbientGlows(), .createGlobalControls(), .createHUD(), .setupInput()]
- "build_unityloader_f": "f()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, c(), g(), n(), u(), v()]
- "commit:repo:github.com/naazeri/Game@385e2dec823273ba03c163ee3887a02d0972eb94": "385e2de fix(hit-the-coin): prevent duplicate bgm_menu on return from result sce…" | kind=Commit | source=git | neighbors=[index-B4CLjEYc.js, main, 0d024c8 feat(flappy-bird): rebuild with…, GameScene.ts, MenuScene.ts, ResultScene.ts]
- "js_bootstrap_min_fs_setinitialattributesonchild": "._setInitialAttributesOnChild()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._setInitialAttributes(), ._elemIsActive(), ._getInnerElement(), ._getOuterElement(), ._setAttributeIfNotExists()]
- "lib_gsap_min_d": "_d()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, be(), fa(), ia(), Pd(), oe()]
- "lib_gsap_min_eb": "eb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, db(), ja(), r(), s(), v()]
- "scenes_resultscene": "ResultScene.ts" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L1 | neighbors=[385e2de fix(hit-the-coin): prevent dupl…, fdf34ba feat: rebuild Hit The Coin with…, ResultData, ResultScene, config.ts, GAME_CONFIG]
- "scenes_resultscene_resultscene": "ResultScene" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L11 | neighbors=[ResultScene.ts, .constructor(), .create(), .createButton(), .handleResize(), .playMenuMusic()]
- "src_config_game_config": "GAME_CONFIG" | kind=code-symbol | source=apps/poke/src/config.ts:L1 | neighbors=[AboutScene.ts, BootScene.ts, GameScene.ts, MenuScene.ts, ResultScene.ts, config.ts]
- "ui_aboutmodal": "AboutModal.ts" | kind=code-symbol | source=apps/change-balls/src/ui/AboutModal.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, MenuScene.ts, AudioManager.ts, AudioManager, AboutModal, TextHelper.ts]
- "ui_bannermanager": "BannerManager.ts" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, GameScene.ts, config.ts, BannerManager, BannerOptions, TextHelper.ts]
- "assets_index_b4cljeyc_ut": "Ut" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js, .constructor(), .create(), .createButton(), .handleResize(), .playMenuMusic()]
- "assets_index_ctaeemyb_ct_getbestscore": ".getBestScore()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.createHUD(), Ct, .getKey(), .saveBestScore(), .show(), .show()]
- "assets_index_ctaeemyb_ct_getspeedsetting": ".getSpeedSetting()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.create(), .restartGame(), Ct, .getKey(), .constructor(), .show()]
- "assets_index_ctaeemyb_ve": "ve" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .create(), .clear(), .constructor(), .processNext(), .show()]
- "assets_index_ufwfauyg_gt_create": ".create()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .applyBirdSkin(), .createGameOverUI(), .createGlobalControls(), .createInGameHUD(), .createReadyUI()]
- "build_unityloader_c": "c()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a(), f(), i(), n(), w()]
- "build_unityloader_g": "g()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L2 | neighbors=[UnityLoader.js, f(), a(), n(), v(), w()]
- "build_unityloader_i": "i()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a(), c(), e(), n(), o()]
- "build_unityloader_o": "o()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a(), d(), i(), n(), w()]
- "build_unityloader_s": "s()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a(), d(), m(), u(), w()]
- "entities_ballpillar": "BallPillar.ts" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, BallPillar, config.ts, BallColor, COLORS, GameScene.ts]
- "entities_centralball_centralball_drawglow": ".drawGlow()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L104 | neighbors=[CentralBall, .constructor(), getHeatTierForScore(), .reset(), .switchColor(), .updateScore()]
- "js_bootstrap_min_n": "N()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, D(), F(), I(), L(), O()]
- "js_bootstrap_min_ot_cycle": ".cycle()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, .constructor(), ._clearInterval(), ._updateInterval(), ._maybeEnableCycle(), ._slide()]
- "js_bootstrap_min_ot_to": ".to()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, .jQueryInterface(), ._getActive(), ._getItemIndex(), ._getItems(), ._slide()]
- "lib_gsap_min_ac": "ac()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r(), s(), t(), u(), v()]
- "lib_gsap_min_gb": "gb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, fb(), s(), t(), v(), Wa()]
- "lib_gsap_min_ka": "ka()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, be(), ja(), t(), xa(), za()]
- "scenes_aboutscene": "AboutScene.ts" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L1 | neighbors=[4042c7c feat(poke): release v2.0.0 rema…, fdf34ba feat: rebuild Hit The Coin with…, AboutScene, config.ts, GAME_CONFIG, main.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-002.json

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
