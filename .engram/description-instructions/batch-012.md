# Node Description Batch 13 of 15

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

- "objects_aipaddle_aipaddle_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/objects/AIPaddle.ts:L15 | neighbors=[AIPaddle]
- "objects_aipaddle_aipaddle_setdifficulty": ".setDifficulty()" | kind=code-symbol | source=apps/ponge/src/objects/AIPaddle.ts:L22 | neighbors=[AIPaddle]
- "objects_aipaddle_aipaddle_updateai": ".updateAI()" | kind=code-symbol | source=apps/ponge/src/objects/AIPaddle.ts:L28 | neighbors=[AIPaddle]
- "objects_aipaddle_paddle": "Paddle" | kind=code-symbol | neighbors=[AIPaddle]
- "objects_ball_ball_activatehyper": ".activateHyper()" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L39 | neighbors=[Ball]
- "objects_ball_ball_boostspeed": ".boostSpeed()" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L126 | neighbors=[Ball]
- "objects_ball_ball_destroy": ".destroy()" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L184 | neighbors=[Ball]
- "objects_ball_ball_serve": ".serve()" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L50 | neighbors=[Ball]
- "objects_ball_trailparticle": "TrailParticle" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L4 | neighbors=[Ball.ts]
- "objects_paddle_paddle_destroy": ".destroy()" | kind=code-symbol | source=apps/ponge/src/objects/Paddle.ts:L153 | neighbors=[Paddle]
- "objects_paddle_paddle_extend": ".extend()" | kind=code-symbol | source=apps/ponge/src/objects/Paddle.ts:L41 | neighbors=[Paddle]
- "objects_paddle_paddle_freeze": ".freeze()" | kind=code-symbol | source=apps/ponge/src/objects/Paddle.ts:L35 | neighbors=[Paddle]
- "objects_paddle_paddle_setdirection": ".setDirection()" | kind=code-symbol | source=apps/ponge/src/objects/Paddle.ts:L46 | neighbors=[Paddle]
- "objects_playerpaddle_paddle": "Paddle" | kind=code-symbol | neighbors=[PlayerPaddle]
- "objects_playerpaddle_playerpaddle_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/objects/PlayerPaddle.ts:L16 | neighbors=[PlayerPaddle]
- "objects_playerpaddle_playerpaddle_handleinput": ".handleInput()" | kind=code-symbol | source=apps/ponge/src/objects/PlayerPaddle.ts:L34 | neighbors=[PlayerPaddle]
- "objects_playerpaddle_playerpaddle_settouchinput": ".setTouchInput()" | kind=code-symbol | source=apps/ponge/src/objects/PlayerPaddle.ts:L29 | neighbors=[PlayerPaddle]
- "objects_powerup_powerup_checkhit": ".checkHit()" | kind=code-symbol | source=apps/ponge/src/objects/PowerUp.ts:L96 | neighbors=[PowerUp]
- "poke_vite_config": "vite.config.ts" | kind=code-symbol | source=apps/poke/vite.config.ts:L1 | neighbors=[4042c7c feat(poke): release v2.0.0 rema…]
- "ponge_vite_config": "vite.config.ts" | kind=code-symbol | source=apps/ponge/vite.config.ts:L1 | neighbors=[ed4b732 feat(ponge): release v2.0.0 rem…]
- "portal_astro_config": "astro.config.mjs" | kind=code-symbol | source=apps/portal/astro.config.mjs:L1 | neighbors=[875b52a feat(portal): add Astro portal …]
- "scenes_aboutscene_aboutscene_constructor": ".constructor()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L13 | neighbors=[AboutScene]
- "scenes_aboutscene_aboutscene_create": ".create()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L17 | neighbors=[AboutScene]
- "scenes_aboutscene_aboutscene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L101 | neighbors=[AboutScene]
- "scenes_bootscene_bootscene_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/scenes/BootScene.ts:L5 | neighbors=[BootScene]
- "scenes_bootscene_bootscene_create": ".create()" | kind=code-symbol | source=apps/ponge/src/scenes/BootScene.ts:L42 | neighbors=[BootScene]
- "scenes_bootscene_bootscene_preload": ".preload()" | kind=code-symbol | source=apps/ponge/src/scenes/BootScene.ts:L9 | neighbors=[BootScene]
- "scenes_gamescene_dogmob": "DogMob" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L5 | neighbors=[GameScene.ts]
- "scenes_gamescene_gamescene_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L66 | neighbors=[GameScene]
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
