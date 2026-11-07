# Node Description Batch 6 of 24

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

- "js_bootstrap_min_we_show": ".show()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we, ._append(), ._emulateAnimation(), ._getElement()]
- "lib_gsap_min_ab": "Ab()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, t(), zb(), cb()]
- "lib_gsap_min_be": "be()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), ka(), Pd()]
- "lib_gsap_min_fa": "fa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), ea(), ke()]
- "lib_gsap_min_ha": "ha()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ja(), Lc(), Sb()]
- "lib_gsap_min_je": "je()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ie(), Pd(), ke()]
- "lib_gsap_min_ke": "ke()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, fa(), je(), le()]
- "lib_gsap_min_lc": "Lc()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ha(), Jc(), r()]
- "lib_gsap_min_pd": "Pd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, be(), _d(), je()]
- "lib_gsap_min_w": "w()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Timeline(), Tween(), va()]
- "lib_gsap_min_wa": "Wa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, gb(), hb(), lb()]
- "lib_gsap_min_y": "y()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween(), r(), s()]
- "scenes_gamescene_gamescene_checkcollisions": ".checkCollisions()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L537 | neighbors=[GameScene, .distToSegment(), .handleGameOver(), .update()]
- "scenes_gamescene_gamescene_createhud": ".createHUD()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L189 | neighbors=[GameScene, .create(), .createButton(), .createIconButton()]
- "scenes_gamescene_gamescene_handlegameover": ".handleGameOver()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L744 | neighbors=[GameScene, .checkCollisions(), .spawnGameOverEffect(), .handlePillarHit()]
- "scenes_gamescene_gamescene_handlepillarhit": ".handlePillarHit()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L356 | neighbors=[GameScene, .handleGameOver(), .spawnMatchParticles(), .update()]
- "scenes_gamescene_gamescene_repositioncoin": ".repositionCoin()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L333 | neighbors=[GameScene, .create(), .handleCoinHit(), .handleResize()]
- "scenes_gamescene_gamescene_showmenu": ".showMenu()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L567 | neighbors=[GameScene, .create(), .hideAbout(), .clearMobs()]
- "scenes_gamescene_gamescene_updatepipes": ".updatePipes()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L323 | neighbors=[GameScene, .update(), .triggerNewRecordCelebration(), .updateEnvironmentLighting()]
- "src_config_colors": "COLORS" | kind=code-symbol | source=apps/change-balls/src/config.ts:L28 | neighbors=[BallPillar.ts, CentralBall.ts, MenuScene.ts, config.ts]
- "src_developer": "developer.ts" | kind=code-symbol | source=packages/shared/src/developer.ts:L1 | neighbors=[4042c7c feat(poke): release v2.0.0 rema…, DEVELOPER_INFO, DeveloperInfo, index.ts]
- "ui_gameovermodal_gameovermodal_createcontent": ".createContent()" | kind=code-symbol | source=apps/change-balls/src/ui/GameOverModal.ts:L35 | neighbors=[GameOverModal, .constructor(), .createButton(), .createNewRecordBadge()]
- "ui_heartsui_heartsui_drawheart": ".drawHeart()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L38 | neighbors=[HeartsUI, .addLife(), .createHearts(), .setLives()]
- "ui_statsmodal_statsmodal_createcontent": ".createContent()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L24 | neighbors=[StatsModal, .constructor(), .createCloseButton(), .createStatRow()]
- "assets_index_ctaeemyb_ce_restartgame": ".restartGame()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .getSpeedSetting(), .clear()]
- "assets_index_ctaeemyb_ce_update": ".update()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .handlePillarHit(), .getX()]
- "assets_index_ctaeemyb_de_createhearts": ".createHearts()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[de, .constructor(), .drawHeart()]
- "assets_index_ctaeemyb_de_loselife": ".loseLife()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.handlePillarHit(), de, .spawnHeartShatter()]
- "assets_index_ctaeemyb_de_setlives": ".setLives()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[de, .reset(), .drawHeart()]
- "assets_index_ctaeemyb_he_createcontent": ".createContent()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[he, .createCloseButton(), .createStatRow()]
- "assets_index_ctaeemyb_he_show": ".show()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[he, .getBestScore(), .getGamesPlayed()]
- "assets_index_ctaeemyb_kt_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Kt, .drawPivot(), .drawRod()]
- "assets_index_ctaeemyb_kt_drawpivot": ".drawPivot()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Kt, .constructor(), .clear()]
- "assets_index_ctaeemyb_kt_drawrod": ".drawRod()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Kt, .constructor(), .clear()]
- "assets_index_ctaeemyb_le_createtopactionbar": ".createTopActionBar()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[le, .create(), .createIconAction()]
- "assets_index_ctaeemyb_ue_activateshield": ".activateShield()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.handlePillarHit(), ue, .clear()]
- "assets_index_ctaeemyb_ue_spawntrailparticle": ".spawnTrailParticle()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ue, Nt(), .update()]
- "assets_index_d2py_agh_et": "et()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L1 | neighbors=[index-D2py_AGH.js, j(), .cycleAmbientColors()]
- "assets_index_d2py_agh_nt_clearmobs": ".clearMobs()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .showMenu(), .startCountdown()]
- "assets_index_d2py_agh_nt_createaboutmodal": ".createAboutModal()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .create(), .createButton()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-005.json

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
