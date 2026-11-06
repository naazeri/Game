# Node Description Batch 3 of 16

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
- "scenes_aboutscene": "AboutScene.ts" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L1 | neighbors=[fdf34ba feat: rebuild Hit The Coin with…, AboutScene, config.ts, GAME_CONFIG, main.ts]
- "scenes_aboutscene_aboutscene": "AboutScene" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L5 | neighbors=[AboutScene.ts, .constructor(), .create(), .handleResize(), main.ts]
- "scenes_bootscene_bootscene": "BootScene" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/BootScene.ts:L4 | neighbors=[BootScene.ts, .constructor(), .create(), .preload(), main.ts]
- "scenes_gamescene_gamescene_clearpanicticks": ".clearPanicTicks()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L187 | neighbors=[GameScene, .endGame(), .handleCoinHit(), .init(), .triggerUrgentCountdown()]
- "scenes_gamescene_gamescene_handlecoinhit": ".handleCoinHit()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L192 | neighbors=[GameScene, .clearPanicTicks(), .repositionCoin(), .showFloatingText(), .spawnParticleBurst()]
- "assets_index_3509133a_i": "I" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, .constructor(), .draw(), .update()]
- "assets_index_3509133a_q": "q" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, .constructor(), .draw(), .update()]
- "assets_index_3509133a_r": "r()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, o(), S, v()]
- "assets_index_3509133a_s": "S" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, r(), .constructor(), .draw()]
- "assets_index_3509133a_t": "T" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, .constructor(), .draw(), .update()]
- "assets_index_b4cljeyc_it": "It" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js, .constructor(), .create(), .preload()]
- "assets_index_b4cljeyc_nt_repositioncoin": ".repositionCoin()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt, .create(), .handleCoinHit(), .handleResize()]
- "assets_index_b4cljeyc_zt": "zt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js, .constructor(), .create(), .handleResize()]
- "assets_index_ufwfauyg_gt_updatepipes": ".updatePipes()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .update(), .triggerNewRecordCelebration(), .updateEnvironmentLighting()]
- "assets_index_ufwfauyg_it": "It" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[index-UfWfaUyg.js, .constructor(), .create(), .preload()]
- "build_unityloader_d": "d()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, o(), s(), l()]
- "build_unityloader_l": "l()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a(), d(), w()]
- "build_unityloader_u": "u()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a(), f(), s()]
- "commit:repo:github.com/naazeri/Game@5e62a519e8a77b084d3f9023af64eb0c981febdd": "5e62a51 update change-balls to version 1.3.0" | kind=Commit | source=git | neighbors=[main, export-web.loader.js, fdf34ba feat: rebuild Hit The Coin with…, ebd193e change domain and convert image…]
- "commit:repo:github.com/naazeri/Game@79daffce261c9e5b616beac1bf4ac1be00bf0b0f": "79daffc add landing page" | kind=Commit | source=git | neighbors=[37be431 add ponge v1.1.3, main, 41bf5e3 add bola, flappy, hit the coin …, bootstrap.min.js]
- "commit:repo:github.com/naazeri/Game@8ee78eb19ca12df9263fa5294ffdce752370e038": "8ee78eb change Bootstrap to v5.3.1" | kind=Commit | source=git | neighbors=[8ab3175 minify images, main, e7dfc30 add vega game, bootstrap.min.js]
- "js_bootstrap_min_ai_setcontent": "._setContent()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, ._maybeSanitize(), ._putElementInTemplate(), .toHtml()]
- "js_bootstrap_min_ai_tohtml": ".toHtml()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, ._maybeSanitize(), ._setContent(), ._createTipElement()]
- "js_bootstrap_min_fe_dataapikeydownhandler": ".dataApiKeydownHandler()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, ._selectMenuItem(), .prev(), .getOrCreateInstance()]
- "js_bootstrap_min_fs_getchildren": "._getChildren()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, .constructor(), ._getActiveElem(), ._keydown()]
- "js_bootstrap_min_fs_setattributeifnotexists": "._setAttributeIfNotExists()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._setInitialAttributes(), ._setInitialAttributesOnChild(), ._setInitialAttributesOnTargetPanel()]

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
