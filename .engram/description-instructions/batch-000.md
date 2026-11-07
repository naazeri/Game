# Node Description Batch 1 of 15

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
- "scenes_gamescene_gamescene": "GameScene" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L25 | neighbors=[GameScene.ts, .applyBirdSkin(), .applySettingsChange(), .checkCollisions(), .checkGoalLines(), .checkPaddleCollisions()]
- "scenes_gamescene": "GameScene.ts" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, 385e2de fix(hit-the-coin): prevent dupl…, 4042c7c feat(poke): release v2.0.0 rema…, bb72e0b feat(change-balls): release v2.…, c3fedc4 feat(flappy-bird): release v1.2…, ed4b732 feat(ponge): release v2.0.0 rem…]
- "audio_audiomanager_audiomanager": "AudioManager" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L1 | neighbors=[AudioManager.ts, .constructor(), .getInstance(), .init(), .isMusicEnabled(), .isMusicOn()]
- "src_config": "config.ts" | kind=code-symbol | source=apps/ponge/src/config.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, 4042c7c feat(poke): release v2.0.0 rema…, bb72e0b feat(change-balls): release v2.…, c3fedc4 feat(flappy-bird): release v1.2…, ed4b732 feat(ponge): release v2.0.0 rem…, fdf34ba feat: rebuild Hit The Coin with…]
- "branch:repo:github.com/naazeri/Game#main": "main" | kind=Branch | source=git | neighbors=[07c6be3 add change balls v1.2.1, 0d024c8 feat(flappy-bird): rebuild with…, 1270fdf change text and hover color, 19f781f add bola game, 37acf29 chore(engram): update knowledge…, 37be431 add ponge v1.1.3]
- "scenes_menuscene": "MenuScene.ts" | kind=code-symbol | source=apps/ponge/src/scenes/MenuScene.ts:L1 | neighbors=[385e2de fix(hit-the-coin): prevent dupl…, bb72e0b feat(change-balls): release v2.…, ed4b732 feat(ponge): release v2.0.0 rem…, fdf34ba feat: rebuild Hit The Coin with…, AudioManager.ts, AudioManager]
- "src_main": "main.ts" | kind=code-symbol | source=apps/ponge/src/main.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, 4042c7c feat(poke): release v2.0.0 rema…, bb72e0b feat(change-balls): release v2.…, c3fedc4 feat(flappy-bird): release v1.2…, ed4b732 feat(ponge): release v2.0.0 rem…, fdf34ba feat: rebuild Hit The Coin with…]
- "commit:repo:github.com/naazeri/Game@bb72e0bc9f915f398116d9ed29e7b23f89e42ea9": "bb72e0b feat(change-balls): release v2.0.0 remake with phaser 3, typescript, en…" | kind=Commit | source=git | neighbors=[66591ee chore(titles): clean game title…, AudioManager.ts, main, vite.config.ts, 37acf29 chore(engram): update knowledge…, StorageManager.ts]
- "commit:repo:github.com/naazeri/Game@ed4b732fe4c8e15d38693606ab9e3f8e4020f1ff": "ed4b732 feat(ponge): release v2.0.0 remake with phaser 3, typescript, arcade po…" | kind=Commit | source=git | neighbors=[37acf29 chore(engram): update knowledge…, AudioManager.ts, main, 875b52a feat(portal): add Astro portal …, AIPaddle.ts, Ball.ts]
- "data_storagemanager_storagemanager": "StorageManager" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L5 | neighbors=[AudioManager.ts, StorageManager.ts, .getBestScore(), .getCurrentScore(), .getGamesPlayed(), .getKey()]
- "scenes_gamescene_gamescene_create": ".create()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L81 | neighbors=[GameScene, .applyBirdSkin(), .createAboutModal(), .createAmbientGlows(), .createBackgroundAesthetics(), .createGameOverUI()]
- "scenes_menuscene_menuscene": "MenuScene" | kind=code-symbol | source=apps/ponge/src/scenes/MenuScene.ts:L9 | neighbors=[MenuScene.ts, .constructor(), .create(), .createBackgroundEffects(), .createButton(), .createFullscreenButton()]
- "ui_settingsmodal": "SettingsModal.ts" | kind=code-symbol | source=apps/ponge/src/ui/SettingsModal.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, ed4b732 feat(ponge): release v2.0.0 rem…, GameScene.ts, MenuScene.ts, AudioManager.ts, AudioManager]
- "assets_index_3509133a": "index-3509133a.js" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[A, b(), c, f, G, I]
- "commit:repo:github.com/naazeri/Game@875b52a3c0e4532ccae274e4ae1a9ae19f41ac48": "875b52a feat(portal): add Astro portal with game details pages, clips and scree…" | kind=Commit | source=git | neighbors=[main, Footer.astro, GameCard.astro, Header.astro, [slug].astro, Base.astro]
- "lib_games": "games.ts" | kind=code-symbol | source=apps/portal/src/lib/games.ts:L1 | neighbors=[875b52a feat(portal): add Astro portal …, Footer.astro, GameCard.astro, [slug].astro, appsDir, findClip()]
- "ui_settingsmodal_settingsmodal": "SettingsModal" | kind=code-symbol | source=apps/ponge/src/ui/SettingsModal.ts:L13 | neighbors=[GameScene.ts, MenuScene.ts, SettingsModal.ts, .constructor(), .createButton(), .createContent()]
- "entities_centralball_centralball": "CentralBall" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L31 | neighbors=[CentralBall.ts, .activateShield(), .bounceAndDecideColor(), .constructor(), .drawGlow(), .getX()]
- "audio_audiomanager": "AudioManager.ts" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L1 | neighbors=[AudioManager, StorageManager.ts, StorageManager, bb72e0b feat(change-balls): release v2.…, ed4b732 feat(ponge): release v2.0.0 rem…, BootScene.ts]
- "data_storagemanager_storagemanager_getkey": ".getKey()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L6 | neighbors=[StorageManager, .getBestScore(), .getCurrentScore(), .getGamesPlayed(), .getSpeedSetting(), .incrementGamesPlayed()]
- "lib_gsap_min_tween": "Tween()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _assertThisInitialized(), ea(), eb(), gc(), ja()]
- "objects_paddle_paddle": "Paddle" | kind=code-symbol | source=apps/ponge/src/objects/Paddle.ts:L4 | neighbors=[AIPaddle.ts, Paddle.ts, .constructor(), .destroy(), .draw(), .extend()]
- "scenes_gamescene_gamescene_update": ".update()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L446 | neighbors=[GameScene, .checkCollisions(), .checkGoalLines(), .checkPaddleCollisions(), .checkRallyMilestones(), .checkWallCollisions()]
- "lib_gsap_min_r": "r()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ac(), Bo(), eb(), lb(), Lc()]
- "objects_ball_ball": "Ball" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L11 | neighbors=[AIPaddle.ts, Ball.ts, .activateHyper(), .boostSpeed(), .constructor(), .destroy()]
- "scenes_bootscene": "BootScene.ts" | kind=code-symbol | source=apps/ponge/src/scenes/BootScene.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, 4042c7c feat(poke): release v2.0.0 rema…, bb72e0b feat(change-balls): release v2.…, c3fedc4 feat(flappy-bird): release v1.2…, ed4b732 feat(ponge): release v2.0.0 rem…, fdf34ba feat: rebuild Hit The Coin with…]
- "ui_gameovermodal": "GameOverModal.ts" | kind=code-symbol | source=apps/ponge/src/ui/GameOverModal.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, ed4b732 feat(ponge): release v2.0.0 rem…, GameScene.ts, AudioManager.ts, AudioManager, StorageManager.ts]
- "ui_heartsui_heartsui": "HeartsUI" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L3 | neighbors=[GameScene.ts, HeartsUI.ts, .addLife(), .constructor(), .createHearts(), .drawHeart()]
- "ui_texthelper": "TextHelper.ts" | kind=code-symbol | source=apps/ponge/src/ui/TextHelper.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, ed4b732 feat(ponge): release v2.0.0 rem…, GameScene.ts, MenuScene.ts, AboutModal.ts, BannerManager.ts]
- "commit:repo:github.com/naazeri/Game@4042c7cb7a4f4830f65581577793e3ffc051b954": "4042c7c feat(poke): release v2.0.0 remake with phaser 3, typescript and shared …" | kind=Commit | source=git | neighbors=[main, 66591ee chore(titles): clean game title…, vite.config.ts, AboutScene.ts, BootScene.ts, GameScene.ts]
- "commit:repo:github.com/naazeri/Game@fdf34ba25e343b338fec5042446575e8d71d700e": "fdf34ba feat: rebuild Hit The Coin with Phaser 3 and setup GitHub Actions Pages…" | kind=Commit | source=git | neighbors=[5e62a51 update change-balls to version …, main, 385e2de fix(hit-the-coin): prevent dupl…, vite.config.ts, AboutScene.ts, BootScene.ts]
- "media_capture_capture": "capture.mjs" | kind=code-symbol | source=tools/media-capture/capture.mjs:L1 | neighbors=[875b52a feat(portal): add Astro portal …, capture(), ffmpeg(), GAMES, here, mediaWidth()]
- "objects_aipaddle": "AIPaddle.ts" | kind=code-symbol | source=apps/ponge/src/objects/AIPaddle.ts:L1 | neighbors=[ed4b732 feat(ponge): release v2.0.0 rem…, AIPaddle, Ball.ts, Ball, Paddle.ts, Paddle]
- "lib_gsap_min_s": "s()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ac(), Bo(), ea(), eb(), Ew()]
- "scenes_menuscene_menuscene_create": ".create()" | kind=code-symbol | source=apps/ponge/src/scenes/MenuScene.ts:L28 | neighbors=[MenuScene, .createBackgroundEffects(), .createButton(), .createFullscreenButton(), .createHalfButton(), .createLogoEmblem()]
- "data_storagemanager": "StorageManager.ts" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L1 | neighbors=[AudioManager.ts, bb72e0b feat(change-balls): release v2.…, StorageManager, config.ts, GameMode, GameScene.ts]
- "entities_ballpillar_ballpillar": "BallPillar" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L10 | neighbors=[BallPillar.ts, .constructor(), .drawPivot(), .drawRod(), .flip(), .getActiveBallWorldPosition()]
- "entities_centralball": "CentralBall.ts" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, CentralBall, getHeatTierForScore(), HEAT_TIERS, HeatTierInfo, config.ts]
- "lib_gsap_min_ja": "ja()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, eb(), fb(), ha(), ia(), Aa()]

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
