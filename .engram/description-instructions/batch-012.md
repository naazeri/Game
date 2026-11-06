# Node Description Batch 13 of 25

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
- "js_bootstrap_min_gi_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[gi, .getOrCreateInstance()]
- "js_bootstrap_min_j_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[J, .getOrCreateInstance()]
- "js_bootstrap_min_m": "M()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, D()]
- "js_bootstrap_min_mi_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Mi, .getOrCreateInstance()]
- "js_bootstrap_min_ne_isoverflowing": ".isOverflowing()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, .getWidth()]
- "js_bootstrap_min_ne_reset": ".reset()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, ._resetElementAttributes()]
- "js_bootstrap_min_ne_saveinitialattribute": "._saveInitialAttribute()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, ._disableOverFlow()]
- "js_bootstrap_min_ni_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._fixTitle()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-012.json

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
