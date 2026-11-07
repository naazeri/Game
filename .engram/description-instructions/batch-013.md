# Node Description Batch 14 of 15

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

- "scenes_gamescene_gamescene_spawndogmob": ".spawnDogMob()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L659 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_spawnpipepair": ".spawnPipePair()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L290 | neighbors=[GameScene]
- "scenes_gamescene_gamescene_togglefullscreen": ".toggleFullscreen()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L267 | neighbors=[GameScene]
- "scenes_gamescene_gamestate": "GameState" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L4 | neighbors=[GameScene.ts]
- "scenes_gamescene_pipepair": "PipePair" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L6 | neighbors=[GameScene.ts]
- "scenes_menuscene_menuscene_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/scenes/MenuScene.ts:L24 | neighbors=[MenuScene]
- "scenes_menuscene_menuscene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L159 | neighbors=[MenuScene]
- "scenes_menuscene_menuscene_startgame": ".startGame()" | kind=code-symbol | source=apps/ponge/src/scenes/MenuScene.ts:L283 | neighbors=[MenuScene]
- "scenes_menuscene_menuscene_togglefullscreen": ".toggleFullscreen()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L402 | neighbors=[MenuScene]
- "scenes_menuscene_menuscene_update": ".update()" | kind=code-symbol | source=apps/ponge/src/scenes/MenuScene.ts:L131 | neighbors=[MenuScene]
- "scenes_resultscene_resultdata": "ResultData" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L4 | neighbors=[ResultScene.ts]
- "scenes_resultscene_resultscene_constructor": ".constructor()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L21 | neighbors=[ResultScene]
- "scenes_resultscene_resultscene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L98 | neighbors=[ResultScene]
- "scripts_assemble_site_appsdir": "appsDir" | kind=code-symbol | source=scripts/assemble-site.mjs:L14 | neighbors=[assemble-site.mjs]
- "scripts_assemble_site_fail": "fail()" | kind=code-symbol | source=scripts/assemble-site.mjs:L18 | neighbors=[assemble-site.mjs]
- "scripts_assemble_site_games": "games" | kind=code-symbol | source=scripts/assemble-site.mjs:L31 | neighbors=[assemble-site.mjs]
- "scripts_assemble_site_legacy": "LEGACY" | kind=code-symbol | source=scripts/assemble-site.mjs:L16 | neighbors=[assemble-site.mjs]
- "scripts_assemble_site_out": "out" | kind=code-symbol | source=scripts/assemble-site.mjs:L13 | neighbors=[assemble-site.mjs]
- "scripts_assemble_site_portaldist": "portalDist" | kind=code-symbol | source=scripts/assemble-site.mjs:L23 | neighbors=[assemble-site.mjs]
- "scripts_assemble_site_root": "root" | kind=code-symbol | source=scripts/assemble-site.mjs:L12 | neighbors=[assemble-site.mjs]
- "src_config_themecolors": "ThemeColors" | kind=code-symbol | source=apps/ponge/src/config.ts:L103 | neighbors=[config.ts]
- "src_content_config_collections": "collections" | kind=code-symbol | source=apps/portal/src/content.config.ts:L40 | neighbors=[content.config.ts]
- "src_content_config_games": "games" | kind=code-symbol | source=apps/portal/src/content.config.ts:L15 | neighbors=[content.config.ts]
- "src_developer_developer_info": "DEVELOPER_INFO" | kind=code-symbol | source=packages/shared/src/developer.ts:L10 | neighbors=[developer.ts]
- "src_developer_developerinfo": "DeveloperInfo" | kind=code-symbol | source=packages/shared/src/developer.ts:L1 | neighbors=[developer.ts]
- "src_main_config": "config" | kind=code-symbol | source=apps/ponge/src/main.ts:L7 | neighbors=[main.ts]
- "src_main_game": "game" | kind=code-symbol | source=apps/poke/src/main.ts:L28 | neighbors=[main.ts]
- "src_main_phaserconfig": "phaserConfig" | kind=code-symbol | source=apps/poke/src/main.ts:L6 | neighbors=[main.ts]
- "src_main_startgame": "startGame()" | kind=code-symbol | source=apps/ponge/src/main.ts:L35 | neighbors=[main.ts]
- "src_main_window": "Window" | kind=code-symbol | source=apps/flappy-bird/src/main.ts:L7 | neighbors=[main.ts]
- "ui_aboutmodal_aboutmodal_getvisible": ".getVisible()" | kind=code-symbol | source=apps/ponge/src/ui/AboutModal.ts:L193 | neighbors=[AboutModal]
- "ui_aboutmodal_aboutmodal_hide": ".hide()" | kind=code-symbol | source=apps/ponge/src/ui/AboutModal.ts:L180 | neighbors=[AboutModal]
- "ui_aboutmodal_aboutmodal_show": ".show()" | kind=code-symbol | source=apps/ponge/src/ui/AboutModal.ts:L168 | neighbors=[AboutModal]
- "ui_bannermanager_bannermanager_clear": ".clear()" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L115 | neighbors=[BannerManager]
- "ui_bannermanager_bannermanager_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L18 | neighbors=[BannerManager]
- "ui_bannermanager_banneroptions": "BannerOptions" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L5 | neighbors=[BannerManager.ts]
- "ui_gameovermodal_gameovermodal_getvisible": ".getVisible()" | kind=code-symbol | source=apps/ponge/src/ui/GameOverModal.ts:L204 | neighbors=[GameOverModal]
- "ui_gameovermodal_gameovermodal_hide": ".hide()" | kind=code-symbol | source=apps/ponge/src/ui/GameOverModal.ts:L191 | neighbors=[GameOverModal]
- "ui_gameovermodal_gameovermodal_show": ".show()" | kind=code-symbol | source=apps/ponge/src/ui/GameOverModal.ts:L151 | neighbors=[GameOverModal]
- "ui_heartsui_heartsui_getlives": ".getLives()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L140 | neighbors=[HeartsUI]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-013.json

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
