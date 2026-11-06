# Node Description Batch 8 of 16

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
- "build_export_web_loader": "export-web.loader.js" | kind=code-symbol | source=change-balls/Build/export-web.loader.js:L1 | neighbors=[createUnityInstance(), 5e62a51 update change-balls to version …]
- "build_unityloader_b": "b()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L2 | neighbors=[UnityLoader.js, a()]
- "build_unityloader_e": "e()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L4 | neighbors=[UnityLoader.js, i()]
- "build_unityloader_p": "p()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a()]
- "build_unityloader_r": "r()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L4 | neighbors=[UnityLoader.js, n()]
- "build_unityloader_t": "t()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L4 | neighbors=[UnityLoader.js, n()]
- "build_unityloader_y": "y()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L2 | neighbors=[UnityLoader.js, a()]
- "commit:repo:github.com/naazeri/Game@a06c4ecc10b9ede008268bb7334fa085d8ec75f1": "a06c4ec chore: remove bola game and update engram memory graph" | kind=Commit | source=git | neighbors=[main, b714fad chore(memory): initialize Engra…]
- "commit:repo:github.com/naazeri/Game@ea8f4f5b223e693a6d31492fb57eb8a49ec269d8": "ea8f4f5 Initial commit" | kind=Commit | source=git | neighbors=[main, b3188a4 Create CNAME]
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
- "js_bootstrap_min_fe_getpopperconfig": "._getPopperConfig()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, ._getPlacement()]
- "js_bootstrap_min_fe_hide": ".hide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, ._completeHide()]
- "js_bootstrap_min_fe_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, .getOrCreateInstance()]
- "js_bootstrap_min_fe_selectmenuitem": "._selectMenuItem()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, .dataApiKeydownHandler()]
- "js_bootstrap_min_fe_update": ".update()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, ._detectNavbar()]
- "js_bootstrap_min_fs_getinnerelement": "._getInnerElement()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._setInitialAttributesOnChild()]
- "js_bootstrap_min_fs_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, .getOrCreateInstance()]
- "js_bootstrap_min_fs_toggledropdown": "._toggleDropDown()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._getOuterElement()]
- "js_bootstrap_min_gi_dispose": ".dispose()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[gi, .deactivate()]
- "js_bootstrap_min_gi_initializebackdrop": "._initializeBackDrop()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[gi, we]
- "js_bootstrap_min_gi_initializefocustrap": "._initializeFocusTrap()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[gi, Se]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-007.json

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
