# Node Description Batch 6 of 15

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

- "scenes_gamescene_gamescene_checkrallymilestones": ".checkRallyMilestones()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L502 | neighbors=[GameScene, .showRallyMilestone(), .update()]
- "scenes_gamescene_gamescene_checkwallcollisions": ".checkWallCollisions()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L635 | neighbors=[GameScene, .spawnSparks(), .update()]
- "scenes_gamescene_gamescene_clearmobs": ".clearMobs()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L736 | neighbors=[GameScene, .showMenu(), .startCountdown()]
- "scenes_gamescene_gamescene_collectpowerup": ".collectPowerUp()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L580 | neighbors=[GameScene, .spawnSparks(), .updatePowerUpManager()]
- "scenes_gamescene_gamescene_createaboutmodal": ".createAboutModal()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L277 | neighbors=[GameScene, .create(), .createButton()]
- "scenes_gamescene_gamescene_createbutton": ".createButton()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L240 | neighbors=[GameScene, .createAboutModal(), .createHUD()]
- "scenes_gamescene_gamescene_createmobiletouchcontrols": ".createMobileTouchControls()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L367 | neighbors=[GameScene, .create(), .createTouchButton()]
- "scenes_gamescene_gamescene_drawcourt": ".drawCourt()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L201 | neighbors=[GameScene, .applySettingsChange(), .create()]
- "scenes_gamescene_gamescene_flap": ".flap()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L276 | neighbors=[GameScene, .handleAction(), .startGame()]
- "scenes_gamescene_gamescene_handleaction": ".handleAction()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L219 | neighbors=[GameScene, .flap(), .startGame()]
- "scenes_gamescene_gamescene_prepareserve": ".prepareServe()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L856 | neighbors=[GameScene, .create(), .resetRound()]
- "scenes_gamescene_gamescene_resetround": ".resetRound()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L835 | neighbors=[GameScene, .prepareServe(), .restartMatch()]
- "scenes_gamescene_gamescene_startgame": ".startGame()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L605 | neighbors=[GameScene, .handleAction(), .flap()]
- "scenes_gamescene_gamescene_testcapsulecollision": ".testCapsuleCollision()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L657 | neighbors=[GameScene, .checkPaddleCollisions(), .spawnSparks()]
- "scenes_menuscene_menuscene_createtopactionbar": ".createTopActionBar()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L336 | neighbors=[MenuScene, .create(), .createIconAction()]
- "scenes_resultscene_resultscene_create": ".create()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L25 | neighbors=[ResultScene, .createButton(), .playMenuMusic()]
- "src_config_aidifficulty": "AIDifficulty" | kind=code-symbol | source=apps/ponge/src/config.ts:L50 | neighbors=[AIPaddle.ts, config.ts, SettingsModal.ts]
- "src_config_ball_config": "BALL_CONFIG" | kind=code-symbol | source=apps/ponge/src/config.ts:L30 | neighbors=[Ball.ts, GameScene.ts, config.ts]
- "src_config_ballcolor": "BallColor" | kind=code-symbol | source=apps/change-balls/src/config.ts:L25 | neighbors=[BallPillar.ts, CentralBall.ts, config.ts]
- "src_config_default_settings": "DEFAULT_SETTINGS" | kind=code-symbol | source=apps/ponge/src/config.ts:L193 | neighbors=[GameScene.ts, MenuScene.ts, config.ts]
- "src_config_game_themes": "GAME_THEMES" | kind=code-symbol | source=apps/ponge/src/config.ts:L118 | neighbors=[GameScene.ts, config.ts, SettingsModal.ts]
- "src_config_gamestyle": "GameStyle" | kind=code-symbol | source=apps/ponge/src/config.ts:L45 | neighbors=[GameScene.ts, config.ts, SettingsModal.ts]
- "src_config_gametheme": "GameTheme" | kind=code-symbol | source=apps/ponge/src/config.ts:L96 | neighbors=[GameScene.ts, config.ts, SettingsModal.ts]
- "src_config_paddle_config": "PADDLE_CONFIG" | kind=code-symbol | source=apps/ponge/src/config.ts:L16 | neighbors=[Paddle.ts, GameScene.ts, config.ts]
- "src_config_powerupkind": "PowerUpKind" | kind=code-symbol | source=apps/ponge/src/config.ts:L177 | neighbors=[PowerUp.ts, GameScene.ts, config.ts]
- "src_content_config": "content.config.ts" | kind=code-symbol | source=apps/portal/src/content.config.ts:L1 | neighbors=[875b52a feat(portal): add Astro portal …, collections, games]
- "ui_aboutmodal_aboutmodal_createcontent": ".createContent()" | kind=code-symbol | source=apps/ponge/src/ui/AboutModal.ts:L20 | neighbors=[AboutModal, .constructor(), .createButton()]
- "ui_heartsui": "HeartsUI.ts" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, GameScene.ts, HeartsUI]
- "ui_heartsui_heartsui_addlife": ".addLife()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L86 | neighbors=[HeartsUI, .drawHeart(), .spawnHeartSparks()]
- "ui_heartsui_heartsui_createhearts": ".createHearts()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L19 | neighbors=[HeartsUI, .constructor(), .drawHeart()]
- "ui_heartsui_heartsui_setlives": ".setLives()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L75 | neighbors=[HeartsUI, .reset(), .drawHeart()]
- "ui_helpmodal_helpmodal_createcontent": ".createContent()" | kind=code-symbol | source=apps/ponge/src/ui/HelpModal.ts:L19 | neighbors=[HelpModal, .constructor(), .createButton()]
- "assets_index_3509133a_o": "o()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, r()]
- "assets_index_3509133a_v": "v()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, r()]
- "audio_audiomanager_audiomanager_playclick": ".playClick()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L77 | neighbors=[AudioManager, .playSynthBlip()]
- "audio_audiomanager_audiomanager_playgamemusic": ".playGameMusic()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L33 | neighbors=[AudioManager, .playBgm()]
- "audio_audiomanager_audiomanager_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L29 | neighbors=[AudioManager, .playBgm()]
- "audio_audiomanager_audiomanager_playpaddlebounce": ".playPaddleBounce()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L50 | neighbors=[AudioManager, .playSynthBlip()]
- "audio_audiomanager_audiomanager_playpowerupspawn": ".playPowerUpSpawn()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L87 | neighbors=[AudioManager, .playSynthBlip()]
- "audio_audiomanager_audiomanager_playrallymilestone": ".playRallyMilestone()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L103 | neighbors=[AudioManager, .playSynthBlip()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-005.json

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
