# Node Description Batch 1 of 16

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
- "js_bootstrap_min_ni": "Ni" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._configAfterMerge(), .constructor(), ._createPopper(), ._createTipElement(), .Default()]
- "js_bootstrap_min": "bootstrap.min.js" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L1 | neighbors=[79daffc add landing page, 8ee78eb change Bootstrap to v5.3.1, Ai, at, D(), e()]
- "branch:repo:github.com/naazeri/Game#main": "main" | kind=Branch | source=git | neighbors=[07c6be3 add change balls v1.2.1, 0d024c8 feat(flappy-bird): rebuild with…, 1270fdf change text and hover color, 19f781f add bola game, 37be431 add ponge v1.1.3, 385e2de fix(hit-the-coin): prevent dupl…]
- "scenes_gamescene_gamescene": "GameScene" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L4 | neighbors=[GameScene.ts, .applyBirdSkin(), .clearPanicTicks(), .constructor(), .create(), .createGameOverUI()]
- "js_bootstrap_min_ot": "Ot" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._addEventListeners(), ._addTouchEventListeners(), ._clearInterval(), ._configAfterMerge(), .constructor()]
- "build_unityloader": "UnityLoader.js" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[a(), b(), c(), d(), e(), f()]
- "js_bootstrap_min_fe": "fe" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .clearMenus(), ._completeHide(), .constructor(), ._createPopper(), .dataApiKeydownHandler()]
- "assets_index_ufwfauyg_gt": "Gt" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[index-UfWfaUyg.js, .applyBirdSkin(), .constructor(), .create(), .createGameOverUI(), .createGlobalControls()]
- "js_bootstrap_min_ue": "Ue" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._addEventListeners(), ._adjustDialog(), .constructor(), .Default(), .DefaultType()]
- "src_main": "main.ts" | kind=code-symbol | source=apps/hit-the-coin/src/main.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, c3fedc4 feat(flappy-bird): release v1.2…, fdf34ba feat: rebuild Hit The Coin with…, AboutScene.ts, AboutScene, BootScene.ts]
- "js_bootstrap_min_fs": "fs" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._activate(), .constructor(), ._deactivate(), ._elemIsActive(), ._getActiveElem()]
- "assets_index_3509133a": "index-3509133a.js" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[A, b(), c, f, G, I]
- "js_bootstrap_min_w_getorcreateinstance": ".getOrCreateInstance()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[.dataApiKeydownHandler(), .jQueryInterface(), .jQueryInterface(), ._keydown(), .jQueryInterface(), .jQueryInterface()]
- "js_bootstrap_min_ai": "Ai" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .changeContent(), ._checkContent(), .constructor(), .Default(), .DefaultType()]
- "js_bootstrap_min_qi": "Qi" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._activateParents(), ._clearActiveClass(), ._configAfterMerge(), .constructor(), .Default()]
- "js_bootstrap_min_w_queuecallback": "._queueCallback()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[._activate(), ._deactivate(), .hide(), .show(), .hide(), .show()]
- "js_bootstrap_min_rt": "Rt" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._addAriaAndCollapsedClass(), ._configAfterMerge(), .constructor(), .Default(), .DefaultType()]
- "assets_index_b4cljeyc": "index-B4CLjEYc.js" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L1 | neighbors=[dt, Gt, It, j(), k(), Nt]
- "build_unityloader_a": "a()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, b(), c(), i(), l(), m()]
- "js_bootstrap_min_at": "at" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .constructor(), .Default(), .DefaultType(), .dispose(), ._end()]
- "js_bootstrap_min_os": "Os" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._clearTimeout(), .constructor(), .Default(), .DefaultType(), .dispose()]
- "js_bootstrap_min_we": "we" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._initializeBackDrop(), ._initializeBackDrop(), ._append(), ._configAfterMerge(), .constructor()]
- "assets_index_b4cljeyc_nt": "Nt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js, .clearPanicTicks(), .constructor(), .create(), .endGame(), .handleCoinHit()]
- "js_bootstrap_min_gi": "gi" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._addEventListeners(), .constructor(), .Default(), .DefaultType(), .dispose()]
- "js_bootstrap_min_ne": "Ne" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .show(), ._applyManipulationCallback(), .constructor(), ._disableOverFlow(), .getWidth()]
- "lib_gsap_min_tween": "Tween()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _assertThisInitialized(), ea(), eb(), gc(), ja()]
- "js_bootstrap_min_ot_slide": "._slide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, ._keydown(), .next(), .prev(), .cycle(), ._getActive()]
- "lib_gsap_min_r": "r()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ac(), Bo(), eb(), lb(), Lc()]
- "commit:repo:github.com/naazeri/Game@fdf34ba25e343b338fec5042446575e8d71d700e": "fdf34ba feat: rebuild Hit The Coin with Phaser 3 and setup GitHub Actions Pages…" | kind=Commit | source=git | neighbors=[5e62a51 update change-balls to version …, main, 385e2de fix(hit-the-coin): prevent dupl…, vite.config.ts, AboutScene.ts, BootScene.ts]
- "js_bootstrap_min_se": "Se" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._initializeFocusTrap(), .activate(), .constructor(), .deactivate(), .Default()]
- "js_bootstrap_min_w": "W" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .constructor(), .DATA_KEY(), .dispose(), .EVENT_KEY(), .eventName()]
- "assets_index_ufwfauyg": "index-UfWfaUyg.js" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L1 | neighbors=[at, Gt, It, Nt, Ot(), st()]
- "lib_gsap_min_s": "s()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ac(), Bo(), ea(), eb(), Ew()]
- "scenes_gamescene": "GameScene.ts" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, 385e2de fix(hit-the-coin): prevent dupl…, c3fedc4 feat(flappy-bird): release v1.2…, fdf34ba feat: rebuild Hit The Coin with…, GameScene, GameState]
- "src_config": "config.ts" | kind=code-symbol | source=apps/hit-the-coin/src/config.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, c3fedc4 feat(flappy-bird): release v1.2…, fdf34ba feat: rebuild Hit The Coin with…, AboutScene.ts, BootScene.ts, GameScene.ts]
- "build_unityloader_n": "n()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a(), f(), g(), i(), c()]
- "commit:repo:github.com/naazeri/Game@c3fedc40348fafff40e7476ded1c75366062ef6d": "c3fedc4 feat(flappy-bird): release v1.2.0 enhanced remake with custom character…" | kind=Commit | source=git | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, index-UfWfaUyg.js, main, b714fad chore(memory): initialize Engra…, vite.config.ts, BootScene.ts]
- "lib_gsap_min_ja": "ja()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, eb(), fb(), ha(), ia(), Aa()]
- "lib_gsap_min_t": "t()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Ab(), ac(), Ec(), fb(), gb()]

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
