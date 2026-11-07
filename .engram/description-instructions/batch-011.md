# Node Description Batch 12 of 24

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

- "assets_index_d2py_agh_nt_updatemobs": ".updateMobs()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .update()]
- "assets_index_ufwfauyg_gt_creategameoverui": ".createGameOverUI()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .create()]
- "assets_index_ufwfauyg_gt_createglobalcontrols": ".createGlobalControls()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .create()]
- "assets_index_ufwfauyg_gt_createingamehud": ".createInGameHUD()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .create()]
- "assets_index_ufwfauyg_gt_createreadyui": ".createReadyUI()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .create()]
- "assets_index_ufwfauyg_gt_cyclebirdskin": ".cycleBirdSkin()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .applyBirdSkin()]
- "assets_index_ufwfauyg_gt_triggernewrecordcelebration": ".triggerNewRecordCelebration()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .updatePipes()]
- "assets_index_ufwfauyg_gt_update": ".update()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .updatePipes()]
- "assets_index_ufwfauyg_gt_updateenvironmentlighting": ".updateEnvironmentLighting()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .updatePipes()]
- "assets_index_ufwfauyg_st": "st()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L1 | neighbors=[index-UfWfaUyg.js, tt()]
- "assets_index_ufwfauyg_tt": "tt()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L1 | neighbors=[index-UfWfaUyg.js, st()]
- "audio_audiomanager_audiomanager_playgamemusic": ".playGameMusic()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L33 | neighbors=[AudioManager, .playBgm()]
- "audio_audiomanager_audiomanager_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L29 | neighbors=[AudioManager, .playBgm()]
- "audio_audiomanager_audiomanager_stopmusic": ".stopMusic()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L37 | neighbors=[AudioManager, .playBgm()]
- "audio_audiomanager_audiomanager_togglemusic": ".toggleMusic()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L69 | neighbors=[AudioManager, .playBgm()]
- "commit:repo:github.com/naazeri/Game@37acf29c64b204f496f317feda8ec135634ff05c": "37acf29 chore(engram): update knowledge graph and community labels after change…" | kind=Commit | source=git | neighbors=[main, bb72e0b feat(change-balls): release v2.…]
- "commit:repo:github.com/naazeri/Game@ea8f4f5b223e693a6d31492fb57eb8a49ec269d8": "ea8f4f5 Initial commit" | kind=Commit | source=git | neighbors=[main, b3188a4 Create CNAME]
- "data_storagemanager_storagemanager_getcurrentscore": ".getCurrentScore()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L26 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_getspeedsetting": ".getSpeedSetting()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L46 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_ismusicenabled": ".isMusicEnabled()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L64 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_issoundenabled": ".isSoundEnabled()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L55 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_savespeedsetting": ".saveSpeedSetting()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L51 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_setmusicenabled": ".setMusicEnabled()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L69 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_setsoundenabled": ".setSoundEnabled()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L60 | neighbors=[StorageManager, .getKey()]
- "entities_ballpillar_ballpillar_drawpivot": ".drawPivot()" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L80 | neighbors=[BallPillar, .constructor()]
- "entities_ballpillar_ballpillar_drawrod": ".drawRod()" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L59 | neighbors=[BallPillar, .constructor()]
- "entities_centralball_centralball_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L50 | neighbors=[CentralBall, .drawGlow()]
- "entities_centralball_centralball_reset": ".reset()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L305 | neighbors=[CentralBall, .drawGlow()]
- "entities_centralball_centralball_switchcolor": ".switchColor()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L208 | neighbors=[CentralBall, .drawGlow()]
- "entities_centralball_centralball_update": ".update()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L137 | neighbors=[CentralBall, .spawnTrailParticle()]
- "flappy_bird_vite_config": "vite.config.ts" | kind=code-symbol | source=apps/flappy-bird/vite.config.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, c3fedc4 feat(flappy-bird): release v1.2…]
- "js_bootstrap_min_ai_getcontent": ".getContent()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, .hasContent()]
- "js_bootstrap_min_ai_hascontent": ".hasContent()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, .getContent()]
- "js_bootstrap_min_ai_putelementintemplate": "._putElementInTemplate()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, ._setContent()]
- "js_bootstrap_min_ai_typecheckconfig": "._typeCheckConfig()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, ._checkContent()]
- "js_bootstrap_min_at_handleswipe": "._handleSwipe()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at, ._end()]
- "js_bootstrap_min_at_initevents": "._initEvents()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at, .constructor()]
- "js_bootstrap_min_at_start": "._start()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at, ._eventIsPointerPenTouch()]
- "js_bootstrap_min_f": "F()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, N()]
- "js_bootstrap_min_fe_getplacement": "._getPlacement()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, ._getPopperConfig()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-011.json

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
