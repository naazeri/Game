# Node Description Batch 23 of 24

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

- "lib_gsap_min_qb": "Qb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_rb": "rb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_ub": "Ub()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_vb": "Vb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_wc": "wc()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_wd": "wd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_wx": "Wx()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_xd": "xd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_yd": "yd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_yl": "yl()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_zd": "zd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "poke_vite_config": "vite.config.ts" | kind=code-symbol | source=apps/poke/vite.config.ts:L1 | neighbors=[4042c7c feat(poke): release v2.0.0 rema…]
- "scenes_aboutscene_aboutscene_constructor": ".constructor()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L13 | neighbors=[AboutScene]
- "scenes_aboutscene_aboutscene_create": ".create()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L17 | neighbors=[AboutScene]
- "scenes_aboutscene_aboutscene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L101 | neighbors=[AboutScene]
- "scenes_bootscene_bootscene_constructor": ".constructor()" | kind=code-symbol | source=apps/poke/src/scenes/BootScene.ts:L5 | neighbors=[BootScene]
- "scenes_bootscene_bootscene_create": ".create()" | kind=code-symbol | source=apps/poke/src/scenes/BootScene.ts:L36 | neighbors=[BootScene]
- "scenes_bootscene_bootscene_preload": ".preload()" | kind=code-symbol | source=apps/poke/src/scenes/BootScene.ts:L9 | neighbors=[BootScene]
- "scenes_gamescene_dogmob": "DogMob" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L5 | neighbors=[GameScene.ts]
- "scenes_gamescene_gamescene_constructor": ".constructor()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L63 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_cycleambientcolors": ".cycleAmbientColors()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L160 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_flipbothpillars": ".flipBothPillars()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L331 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_flipleftpillar": ".flipLeftPillar()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L321 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_fliprightpillar": ".flipRightPillar()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L326 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_handlehit": ".handleHit()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L480 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_handlemiss": ".handleMiss()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L272 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_incrementscore": ".incrementScore()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L642 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_restartgame": ".restartGame()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L751 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_returntomenu": ".returnToMenu()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L544 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_showabout": ".showAbout()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L327 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_showgameoverscreen": ".showGameOverScreen()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L699 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_spawndogmob": ".spawnDogMob()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L659 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_spawnpipepair": ".spawnPipePair()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L290 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_togglefullscreen": ".toggleFullscreen()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L267 | neighbors=[GameScene]
- "scenes_gamescene_gamestate": "GameState" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L4 | neighbors=[GameScene.ts]
- "scenes_gamescene_pipepair": "PipePair" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L6 | neighbors=[GameScene.ts]
- "scenes_menuscene_menuscene_constructor": ".constructor()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L15 | neighbors=[MenuScene]
- "scenes_menuscene_menuscene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L159 | neighbors=[MenuScene]
- "scenes_menuscene_menuscene_startgame": ".startGame()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L410 | neighbors=[MenuScene]
- "scenes_menuscene_menuscene_togglefullscreen": ".toggleFullscreen()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L402 | neighbors=[MenuScene]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-022.json

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
