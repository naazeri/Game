# Node Description Batch 16 of 16

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

- "lib_gsap_min_vb": "Vb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_wc": "wc()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_wd": "wd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_wx": "Wx()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_xd": "xd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_yd": "yd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_yl": "yl()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_zd": "zd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "scenes_aboutscene_aboutscene_constructor": ".constructor()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L13 | neighbors=[AboutScene]
- "scenes_aboutscene_aboutscene_create": ".create()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L17 | neighbors=[AboutScene]
- "scenes_aboutscene_aboutscene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L101 | neighbors=[AboutScene]
- "scenes_bootscene_bootscene_constructor": ".constructor()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/BootScene.ts:L5 | neighbors=[BootScene]
- "scenes_bootscene_bootscene_create": ".create()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/BootScene.ts:L40 | neighbors=[BootScene]
- "scenes_bootscene_bootscene_preload": ".preload()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/BootScene.ts:L9 | neighbors=[BootScene]
- "scenes_gamescene_gamescene_constructor": ".constructor()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L22 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_handlehit": ".handleHit()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L480 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_handlemiss": ".handleMiss()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L272 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_restartgame": ".restartGame()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L751 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_showgameoverscreen": ".showGameOverScreen()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L699 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_spawnpipepair": ".spawnPipePair()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L290 | neighbors=[GameScene]
- "scenes_gamescene_gamestate": "GameState" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L4 | neighbors=[GameScene.ts]
- "scenes_gamescene_pipepair": "PipePair" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L6 | neighbors=[GameScene.ts]
- "scenes_menuscene_menuscene_constructor": ".constructor()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L15 | neighbors=[MenuScene]
- "scenes_menuscene_menuscene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L159 | neighbors=[MenuScene]
- "scenes_resultscene_resultdata": "ResultData" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L4 | neighbors=[ResultScene.ts]
- "scenes_resultscene_resultscene_constructor": ".constructor()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L21 | neighbors=[ResultScene]
- "scenes_resultscene_resultscene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L98 | neighbors=[ResultScene]
- "src_main_config": "config" | kind=code-symbol | source=apps/hit-the-coin/src/main.ts:L9 | neighbors=[main.ts]
- "src_main_game": "game" | kind=code-symbol | source=apps/hit-the-coin/src/main.ts:L23 | neighbors=[main.ts]
- "src_main_phaserconfig": "phaserConfig" | kind=code-symbol | source=apps/flappy-bird/src/main.ts:L12 | neighbors=[main.ts]
- "src_main_window": "Window" | kind=code-symbol | source=apps/flappy-bird/src/main.ts:L7 | neighbors=[main.ts]
- "templatedata_unityprogress_unityprogress": "UnityProgress()" | kind=code-symbol | source=ponge/TemplateData/UnityProgress.js:L1 | neighbors=[UnityProgress.js]
- "bola_index_rationale_391": "NOTE: We must explicitly pass the default, accessing it via" | kind=entity | source=bola/index.js:L391
- "poke_index_rationale_391": "NOTE: We must explicitly pass the default, accessing it via" | kind=entity | source=poke/index.js:L391

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-015.json

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
