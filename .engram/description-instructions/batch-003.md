# Node Description Batch 4 of 24

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "js_bootstrap_min_ni_gettitle": "._getTitle()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[._getContentForTemplate(), ._isWithContent(), Ni, ._getContentForTemplate(), ._isWithContent()]
- "js_bootstrap_min_ni_show": ".show()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._disposePopper(), ._getTipElement(), .eventName(), ._queueCallback()]
- "js_bootstrap_min_ot_prev": ".prev()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[.constructor(), .dataApiKeydownHandler(), Ot, ._slide(), ._activateParents()]
- "js_bootstrap_min_qi_refresh": ".refresh()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi, .constructor(), ._getNewObserver(), ._initializeTargetsAndObservables(), ._maybeEnableSmoothScroll()]
- "js_bootstrap_min_rt_addariaandcollapsedclass": "._addAriaAndCollapsedClass()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt, .constructor(), .hide(), ._initializeChildren(), .show()]
- "js_bootstrap_min_rt_show": ".show()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt, ._addAriaAndCollapsedClass(), ._getDimension(), ._getFirstLevelChildren(), ._queueCallback()]
- "js_bootstrap_min_se_deactivate": ".deactivate()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[.dispose(), .hide(), Se, .dispose(), .hide()]
- "js_bootstrap_min_u": "U" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .close(), ._destroyElement(), .jQueryInterface(), .NAME()]
- "js_bootstrap_min_we_getelement": "._getElement()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we, ._append(), ._emulateAnimation(), .hide(), .show()]
- "lib_gsap_min_aa": "Aa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ia(), ja(), Ra(), Sa()]
- "lib_gsap_min_cb": "cb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Ab(), Bb(), Context(), Ew()]
- "lib_gsap_min_ea": "ea()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, s(), v(), fa(), Tween()]
- "lib_gsap_min_fb": "fb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Bb(), ja(), t(), gb()]
- "lib_gsap_min_ia": "ia()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), Aa(), ja(), oe()]
- "lib_gsap_min_ra": "Ra()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Animation(), Aa(), ja(), Sa()]
- "lib_gsap_min_va": "va()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween(), r(), t(), w()]
- "lib_gsap_min_wb": "wb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, qa(), s(), ua(), x()]
- "scenes_aboutscene_aboutscene": "AboutScene" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L5 | neighbors=[AboutScene.ts, .constructor(), .create(), .handleResize(), main.ts]
- "scenes_bootscene_bootscene": "BootScene" | kind=code-symbol | source=apps/poke/src/scenes/BootScene.ts:L4 | neighbors=[BootScene.ts, .constructor(), .create(), .preload(), main.ts]
- "scenes_gamescene_gamescene_clearpanicticks": ".clearPanicTicks()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L187 | neighbors=[GameScene, .endGame(), .handleCoinHit(), .init(), .triggerUrgentCountdown()]
- "scenes_gamescene_gamescene_handlecoinhit": ".handleCoinHit()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L192 | neighbors=[GameScene, .clearPanicTicks(), .repositionCoin(), .showFloatingText(), .spawnParticleBurst()]
- "src_config_gamemode": "GameMode" | kind=code-symbol | source=apps/change-balls/src/config.ts:L26 | neighbors=[StorageManager.ts, GameScene.ts, MenuScene.ts, config.ts, GameOverModal.ts]
- "ui_settingsmodal_settingsmodal_createcontent": ".createContent()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L30 | neighbors=[SettingsModal, .constructor(), .createMediumButton(), .createSaveButton(), .createSmallButton()]
- "assets_index_3509133a_i": "I" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, .constructor(), .draw(), .update()]
- "assets_index_3509133a_q": "q" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, .constructor(), .draw(), .update()]
- "assets_index_3509133a_r": "r()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, o(), S, v()]
- "assets_index_3509133a_s": "S" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, r(), .constructor(), .draw()]
- "assets_index_3509133a_t": "T" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, .constructor(), .draw(), .update()]
- "assets_index_b4cljeyc_it": "It" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js, .constructor(), .create(), .preload()]
- "assets_index_b4cljeyc_nt_repositioncoin": ".repositionCoin()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt, .create(), .handleCoinHit(), .handleResize()]
- "assets_index_b4cljeyc_zt": "zt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js, .constructor(), .create(), .handleResize()]
- "assets_index_ctaeemyb_ce_handlegameover": ".handleGameOver()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .spawnGameOverEffect(), .getX(), .handlePillarHit()]
- "assets_index_ctaeemyb_ct_getgamesplayed": ".getGamesPlayed()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Ct, .getKey(), .incrementGamesPlayed(), .show()]
- "assets_index_ctaeemyb_ct_incrementgamesplayed": ".incrementGamesPlayed()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Ct, .getGamesPlayed(), .getKey(), .saveCurrentScore()]
- "assets_index_ctaeemyb_ct_savebestscore": ".saveBestScore()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Ct, .getBestScore(), .getKey(), .show()]
- "assets_index_ctaeemyb_ct_savecurrentscore": ".saveCurrentScore()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Ct, .getKey(), .incrementGamesPlayed(), .show()]
- "assets_index_ctaeemyb_de_addlife": ".addLife()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.handlePillarHit(), de, .drawHeart(), .spawnHeartSparks()]
- "assets_index_ctaeemyb_fe_show": ".show()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[fe, .getBestScore(), .saveBestScore(), .saveCurrentScore()]
- "assets_index_ctaeemyb_kt_flip": ".flip()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.flipBothPillars(), .flipLeftPillar(), .flipRightPillar(), Kt]
- "assets_index_ctaeemyb_ne": "ne" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .constructor(), .create(), .preload()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-003.json

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
