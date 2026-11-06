# Node Description Batch 24 of 25

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
- "scenes_resultscene_resultdata": "ResultData" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L4 | neighbors=[ResultScene.ts]
- "scenes_resultscene_resultscene_constructor": ".constructor()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L21 | neighbors=[ResultScene]
- "scenes_resultscene_resultscene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L98 | neighbors=[ResultScene]
- "src_developer_developer_info": "DEVELOPER_INFO" | kind=code-symbol | source=packages/shared/src/developer.ts:L10 | neighbors=[developer.ts]
- "src_developer_developerinfo": "DeveloperInfo" | kind=code-symbol | source=packages/shared/src/developer.ts:L1 | neighbors=[developer.ts]
- "src_main_config": "config" | kind=code-symbol | source=apps/hit-the-coin/src/main.ts:L9 | neighbors=[main.ts]
- "src_main_game": "game" | kind=code-symbol | source=apps/poke/src/main.ts:L28 | neighbors=[main.ts]
- "src_main_phaserconfig": "phaserConfig" | kind=code-symbol | source=apps/poke/src/main.ts:L6 | neighbors=[main.ts]
- "src_main_startgame": "startGame()" | kind=code-symbol | source=apps/change-balls/src/main.ts:L35 | neighbors=[main.ts]
- "src_main_window": "Window" | kind=code-symbol | source=apps/flappy-bird/src/main.ts:L7 | neighbors=[main.ts]
- "templatedata_unityprogress_unityprogress": "UnityProgress()" | kind=code-symbol | source=ponge/TemplateData/UnityProgress.js:L1 | neighbors=[UnityProgress.js]
- "ui_aboutmodal_aboutmodal_getvisible": ".getVisible()" | kind=code-symbol | source=apps/change-balls/src/ui/AboutModal.ts:L194 | neighbors=[AboutModal]
- "ui_aboutmodal_aboutmodal_hide": ".hide()" | kind=code-symbol | source=apps/change-balls/src/ui/AboutModal.ts:L181 | neighbors=[AboutModal]
- "ui_aboutmodal_aboutmodal_show": ".show()" | kind=code-symbol | source=apps/change-balls/src/ui/AboutModal.ts:L169 | neighbors=[AboutModal]
- "ui_bannermanager_bannermanager_clear": ".clear()" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L115 | neighbors=[BannerManager]
- "ui_bannermanager_bannermanager_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L18 | neighbors=[BannerManager]
- "ui_bannermanager_banneroptions": "BannerOptions" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L5 | neighbors=[BannerManager.ts]
- "ui_gameovermodal_gameovermodal_getvisible": ".getVisible()" | kind=code-symbol | source=apps/change-balls/src/ui/GameOverModal.ts:L245 | neighbors=[GameOverModal]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-023.json

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
