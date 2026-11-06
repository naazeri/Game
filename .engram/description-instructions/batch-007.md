# Node Description Batch 8 of 25

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/naazeri/Game@b3188a4e4cdbeab702f15447ff80c13ba68d998a": "b3188a4 Create CNAME" | kind=Commit | source=git | neighbors=[main, cd3f55a add flappy bird game, ea8f4f5 Initial commit] | lang=pt
- "commit:repo:github.com/naazeri/Game@b714fad0f3a1c714faa4b102287ed463c4e7cd52": "b714fad chore(memory): initialize Engram knowledge graph and Antigravity agent …" | kind=Commit | source=git | neighbors=[main, a06c4ec chore: remove bola game and upd…, c3fedc4 feat(flappy-bird): release v1.2…] | lang=en
- "commit:repo:github.com/naazeri/Game@bcc967b0ad878f8c66beacccffe35f5ec830aa22": "bcc967b fix header" | kind=Commit | source=git | neighbors=[a834ef4 add favicon, main, d7ef535 Update index.html] | lang=en
- "commit:repo:github.com/naazeri/Game@cd3f55a0cf14f975805265ec03e0d10ea82cdb21": "cd3f55a add flappy bird game" | kind=Commit | source=git | neighbors=[b3188a4 Create CNAME, main, 7a5a4cf Update README.md] | lang=pt
- "commit:repo:github.com/naazeri/Game@d7ef535fb4469a4914d5732d3290ad084ce64975": "d7ef535 Update index.html" | kind=Commit | source=git | neighbors=[bcc967b fix header, main, 1270fdf change text and hover color] | lang=en
- "commit:repo:github.com/naazeri/Game@e3d39499515f4517bc8299fa3942f2dbddfc0a27": "e3d3949 add hit-the-coin gmae" | kind=Commit | source=git | neighbors=[07c6be3 add change balls v1.2.1, main, 37be431 add ponge v1.1.3] | lang=en
- "commit:repo:github.com/naazeri/Game@ebd193e532d5857242e3d01f84ea1744cce80547": "ebd193e change domain and convert images to webp" | kind=Commit | source=git | neighbors=[60c8c84 Update CNAME, main, 5e62a51 update change-balls to version …] | lang=en
- "data_storagemanager_storagemanager_getbestscore": ".getBestScore()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L10 | neighbors=[StorageManager, .getKey(), .saveBestScore()] | lang=en
- "data_storagemanager_storagemanager_getgamesplayed": ".getGamesPlayed()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L36 | neighbors=[StorageManager, .getKey(), .incrementGamesPlayed()] | lang=en
- "data_storagemanager_storagemanager_savebestscore": ".saveBestScore()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L16 | neighbors=[StorageManager, .getBestScore(), .getKey()] | lang=en
- "data_storagemanager_storagemanager_savecurrentscore": ".saveCurrentScore()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L31 | neighbors=[StorageManager, .getKey(), .incrementGamesPlayed()] | lang=en
- "entities_ballpillar_ballpillar_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L24 | neighbors=[BallPillar, .drawPivot(), .drawRod()] | lang=en
- "entities_centralball_centralball_spawntrailparticle": ".spawnTrailParticle()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L149 | neighbors=[CentralBall, getHeatTierForScore(), .update()] | lang=en
- "entities_centralball_centralball_updatescore": ".updateScore()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L75 | neighbors=[CentralBall, .drawGlow(), getHeatTierForScore()] | lang=en
- "js_bootstrap_min_ai_changecontent": ".changeContent()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, ._checkContent(), ._getTemplateFactory()] | lang=en
- "js_bootstrap_min_ai_checkcontent": "._checkContent()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, .changeContent(), ._typeCheckConfig()] | lang=en
- "js_bootstrap_min_ai_maybesanitize": "._maybeSanitize()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, ._setContent(), .toHtml()] | lang=en
- "js_bootstrap_min_at_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at, ._initEvents(), .isSupported()] | lang=en
- "js_bootstrap_min_at_end": "._end()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at, ._eventIsPointerPenTouch(), ._handleSwipe()] | lang=en
- "js_bootstrap_min_at_eventispointerpentouch": "._eventIsPointerPenTouch()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at, ._end(), ._start()] | lang=en
- "js_bootstrap_min_at_issupported": ".isSupported()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at, .constructor(), ._addEventListeners()] | lang=en
- "js_bootstrap_min_d": "D()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, M(), N()] | lang=en
- "js_bootstrap_min_e": "e()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._applyManipulationCallback(), ._observerCallback()] | lang=en
- "js_bootstrap_min_fe_clearmenus": ".clearMenus()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, ._completeHide(), .getInstance()] | lang=en
- "js_bootstrap_min_fe_completehide": "._completeHide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, .clearMenus(), .hide()] | lang=en
- "js_bootstrap_min_fe_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, ._detectNavbar(), .prev()] | lang=en
- "js_bootstrap_min_fe_detectnavbar": "._detectNavbar()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, .constructor(), .update()] | lang=en
- "js_bootstrap_min_fs_activate": "._activate()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._queueCallback(), .show()] | lang=en
- "js_bootstrap_min_fs_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._getChildren(), ._setInitialAttributes()] | lang=en
- "js_bootstrap_min_fs_deactivate": "._deactivate()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._queueCallback(), .show()] | lang=en
- "js_bootstrap_min_fs_elemisactive": "._elemIsActive()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._setInitialAttributesOnChild(), .show()] | lang=en
- "js_bootstrap_min_fs_getactiveelem": "._getActiveElem()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._getChildren(), .show()] | lang=en
- "js_bootstrap_min_fs_getouterelement": "._getOuterElement()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._setInitialAttributesOnChild(), ._toggleDropDown()] | lang=en
- "js_bootstrap_min_fs_keydown": "._keydown()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._getChildren(), .getOrCreateInstance()] | lang=en
- "js_bootstrap_min_fs_setinitialattributesontargetpanel": "._setInitialAttributesOnTargetPanel()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._setInitialAttributesOnChild(), ._setAttributeIfNotExists()] | lang=en
- "js_bootstrap_min_gi_hide": ".hide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[gi, .deactivate(), ._queueCallback()] | lang=en
- "js_bootstrap_min_gi_show": ".show()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[gi, Ne, ._queueCallback()] | lang=en
- "js_bootstrap_min_i": "I()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, N(), P()] | lang=en
- "js_bootstrap_min_l": "L()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, N(), O()] | lang=en
- "js_bootstrap_min_mi_getcontent": "._getContent()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Mi, ._getContentForTemplate(), ._isWithContent()] | lang=en

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
