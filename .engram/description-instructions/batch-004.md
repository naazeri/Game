# Node Description Batch 5 of 25

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
- "assets_index_ctaeemyb_nt": "Nt()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js, .drawGlow(), .spawnTrailParticle(), .updateScore()]
- "assets_index_ctaeemyb_oe_createcontent": ".createContent()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[oe, .createMediumButton(), .createSaveButton(), .createSmallButton()]
- "assets_index_ctaeemyb_ue_getx": ".getX()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.handleGameOver(), .handlePillarHit(), .update(), ue]
- "assets_index_ctaeemyb_ue_updatescore": ".updateScore()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.handlePillarHit(), ue, Nt(), .drawGlow()]
- "assets_index_d2py_agh_gt": "Gt" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[index-D2py_AGH.js, .constructor(), .create(), .preload()]
- "assets_index_d2py_agh_nt_checkcollisions": ".checkCollisions()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .distToSegment(), .handleGameOver(), .update()]
- "assets_index_d2py_agh_nt_showmenu": ".showMenu()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .create(), .hideAbout(), .clearMobs()]
- "assets_index_d2py_agh_nt_update": ".update()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .checkCollisions(), .handleKeyboardMovement(), .updateMobs()]
- "assets_index_ufwfauyg_gt_updatepipes": ".updatePipes()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .update(), .triggerNewRecordCelebration(), .updateEnvironmentLighting()]
- "assets_index_ufwfauyg_it": "It" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[index-UfWfaUyg.js, .constructor(), .create(), .preload()]
- "build_unityloader_d": "d()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, o(), s(), l()]
- "build_unityloader_l": "l()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a(), d(), w()]
- "build_unityloader_u": "u()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a(), f(), s()]
- "commit:repo:github.com/naazeri/Game@79daffce261c9e5b616beac1bf4ac1be00bf0b0f": "79daffc add landing page" | kind=Commit | source=git | neighbors=[37be431 add ponge v1.1.3, main, 41bf5e3 add bola, flappy, hit the coin …, bootstrap.min.js]
- "commit:repo:github.com/naazeri/Game@8ee78eb19ca12df9263fa5294ffdce752370e038": "8ee78eb change Bootstrap to v5.3.1" | kind=Commit | source=git | neighbors=[8ab3175 minify images, main, e7dfc30 add vega game, bootstrap.min.js]
- "data_storagemanager_storagemanager_incrementgamesplayed": ".incrementGamesPlayed()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L41 | neighbors=[StorageManager, .getGamesPlayed(), .getKey(), .saveCurrentScore()]
- "entities_centralball_getheattierforscore": "getHeatTierForScore()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L26 | neighbors=[CentralBall.ts, .drawGlow(), .spawnTrailParticle(), .updateScore()]
- "js_bootstrap_min_ai_setcontent": "._setContent()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, ._maybeSanitize(), ._putElementInTemplate(), .toHtml()]
- "js_bootstrap_min_ai_tohtml": ".toHtml()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, ._maybeSanitize(), ._setContent(), ._createTipElement()]
- "js_bootstrap_min_fe_dataapikeydownhandler": ".dataApiKeydownHandler()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, ._selectMenuItem(), .prev(), .getOrCreateInstance()]
- "js_bootstrap_min_fs_getchildren": "._getChildren()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, .constructor(), ._getActiveElem(), ._keydown()]
- "js_bootstrap_min_fs_setattributeifnotexists": "._setAttributeIfNotExists()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._setInitialAttributes(), ._setInitialAttributesOnChild(), ._setInitialAttributesOnTargetPanel()]
- "js_bootstrap_min_fs_setinitialattributes": "._setInitialAttributes()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, .constructor(), ._setAttributeIfNotExists(), ._setInitialAttributesOnChild()]
- "js_bootstrap_min_j": "J" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .jQueryInterface(), .NAME(), .toggle()]
- "js_bootstrap_min_ne_applymanipulationcallback": "._applyManipulationCallback()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, e(), ._resetElementAttributes(), ._setElementAttributes()]
- "js_bootstrap_min_ne_hide": ".hide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, ._disableOverFlow(), .getWidth(), ._setElementAttributes()]
- "js_bootstrap_min_ne_setelementattributes": "._setElementAttributes()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, .hide(), ._applyManipulationCallback(), .getWidth()]
- "js_bootstrap_min_ni_createtipelement": "._createTipElement()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, .toHtml(), ._getTemplateFactory(), ._getTipElement()]
- "js_bootstrap_min_ni_disposepopper": "._disposePopper()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, .dispose(), .setContent(), .show()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-004.json

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
