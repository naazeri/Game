# Node Description Batch 11 of 16

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

- "scenes_gamescene_gamescene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L356 | neighbors=[GameScene, .repositionCoin()]
- "scenes_gamescene_gamescene_init": ".init()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L26 | neighbors=[GameScene, .clearPanicTicks()]
- "scenes_gamescene_gamescene_showfloatingtext": ".showFloatingText()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L313 | neighbors=[GameScene, .handleCoinHit()]
- "scenes_gamescene_gamescene_spawnparticleburst": ".spawnParticleBurst()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L282 | neighbors=[GameScene, .handleCoinHit()]
- "scenes_gamescene_gamescene_triggernewrecordcelebration": ".triggerNewRecordCelebration()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L397 | neighbors=[GameScene, .updatePipes()]
- "scenes_gamescene_gamescene_triggerurgentcountdown": ".triggerUrgentCountdown()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L140 | neighbors=[GameScene, .clearPanicTicks()]
- "scenes_gamescene_gamescene_update": ".update()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L177 | neighbors=[GameScene, .updatePipes()]
- "scenes_gamescene_gamescene_updateenvironmentlighting": ".updateEnvironmentLighting()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L361 | neighbors=[GameScene, .updatePipes()]
- "scenes_menuscene_menuscene_createbutton": ".createButton()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L172 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createfullscreenbutton": ".createFullscreenButton()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L104 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L82 | neighbors=[MenuScene, .create()]
- "scenes_resultscene_resultscene_createbutton": ".createButton()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L112 | neighbors=[ResultScene, .create()]
- "scenes_resultscene_resultscene_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L146 | neighbors=[ResultScene, .create()]
- "templatedata_unityprogress": "UnityProgress.js" | kind=code-symbol | source=ponge/TemplateData/UnityProgress.js:L1 | neighbors=[37be431 add ponge v1.1.3, UnityProgress()]
- "assets_index_3509133a_a": "A" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_b": "b()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_c": "c" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_f": "f" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_g": "G" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_i_constructor": ".constructor()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[I]
- "assets_index_3509133a_i_draw": ".draw()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[I]
- "assets_index_3509133a_i_update": ".update()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[I]
- "assets_index_3509133a_l": "l" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_p": "p" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_q_constructor": ".constructor()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[q]
- "assets_index_3509133a_q_draw": ".draw()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[q]
- "assets_index_3509133a_q_update": ".update()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[q]
- "assets_index_3509133a_s_constructor": ".constructor()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[S]
- "assets_index_3509133a_s_draw": ".draw()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[S]
- "assets_index_3509133a_t_constructor": ".constructor()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[T]
- "assets_index_3509133a_t_draw": ".draw()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[T]
- "assets_index_3509133a_t_update": ".update()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[T]
- "assets_index_3509133a_x": "X()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_y": "y" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_b4cljeyc_dt": "dt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_gt_constructor": ".constructor()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Gt]
- "assets_index_b4cljeyc_gt_createbutton": ".createButton()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Gt]
- "assets_index_b4cljeyc_gt_handleresize": ".handleResize()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Gt]
- "assets_index_b4cljeyc_gt_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Gt]
- "assets_index_b4cljeyc_it_constructor": ".constructor()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[It]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-010.json

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
