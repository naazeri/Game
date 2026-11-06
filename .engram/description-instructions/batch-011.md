# Node Description Batch 12 of 16

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

- "assets_index_b4cljeyc_it_create": ".create()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[It]
- "assets_index_b4cljeyc_it_preload": ".preload()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[It]
- "assets_index_b4cljeyc_nt_constructor": ".constructor()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt]
- "assets_index_b4cljeyc_nt_handlemiss": ".handleMiss()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt]
- "assets_index_b4cljeyc_ot": "Ot()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L1 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_rt": "rt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_ut_constructor": ".constructor()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Ut]
- "assets_index_b4cljeyc_ut_create": ".create()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Ut]
- "assets_index_b4cljeyc_ut_createbutton": ".createButton()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Ut]
- "assets_index_b4cljeyc_ut_handleresize": ".handleResize()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Ut]
- "assets_index_b4cljeyc_ut_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Ut]
- "assets_index_b4cljeyc_vt": "Vt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_wt": "wt()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L1 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_xt": "Xt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_zt_constructor": ".constructor()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[zt]
- "assets_index_b4cljeyc_zt_create": ".create()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[zt]
- "assets_index_b4cljeyc_zt_handleresize": ".handleResize()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[zt]
- "assets_index_ufwfauyg_at": "at" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[index-UfWfaUyg.js]
- "assets_index_ufwfauyg_gt_constructor": ".constructor()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt]
- "assets_index_ufwfauyg_gt_handlehit": ".handleHit()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt]
- "assets_index_ufwfauyg_gt_handleresize": ".handleResize()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt]
- "assets_index_ufwfauyg_gt_restartgame": ".restartGame()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt]
- "assets_index_ufwfauyg_gt_showgameoverscreen": ".showGameOverScreen()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt]
- "assets_index_ufwfauyg_gt_spawnpipepair": ".spawnPipePair()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt]
- "assets_index_ufwfauyg_it_constructor": ".constructor()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[It]
- "assets_index_ufwfauyg_it_create": ".create()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[It]
- "assets_index_ufwfauyg_it_preload": ".preload()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[It]
- "assets_index_ufwfauyg_nt": "Nt" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[index-UfWfaUyg.js]
- "assets_index_ufwfauyg_ot": "Ot()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L1 | neighbors=[index-UfWfaUyg.js]
- "assets_index_ufwfauyg_ut": "Ut" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[index-UfWfaUyg.js]
- "assets_index_ufwfauyg_wt": "wt()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L1 | neighbors=[index-UfWfaUyg.js]
- "build_export_web_loader_createunityinstance": "createUnityInstance()" | kind=code-symbol | source=change-balls/Build/export-web.loader.js:L1 | neighbors=[export-web.loader.js]
- "hit_the_coin_vite_config": "vite.config.ts" | kind=code-symbol | source=apps/hit-the-coin/vite.config.ts:L1 | neighbors=[fdf34ba feat: rebuild Hit The Coin with…]
- "js_bootstrap_min_ai_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai]
- "js_bootstrap_min_ai_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai]
- "js_bootstrap_min_ai_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai]
- "js_bootstrap_min_ai_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai]
- "js_bootstrap_min_ai_resolvepossiblefunction": "._resolvePossibleFunction()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai]
- "js_bootstrap_min_at_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at]
- "js_bootstrap_min_at_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at]

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
