# Node Description Batch 2 of 15

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

- "lib_gsap_min_t": "t()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Ab(), ac(), Ec(), fb(), gb()]
- "objects_powerup_powerup": "PowerUp" | kind=code-symbol | source=apps/ponge/src/objects/PowerUp.ts:L4 | neighbors=[PowerUp.ts, .checkHit(), .constructor(), .destroy(), .draw(), .getColor()]
- "ui_gameovermodal_gameovermodal": "GameOverModal" | kind=code-symbol | source=apps/ponge/src/ui/GameOverModal.ts:L5 | neighbors=[GameScene.ts, GameOverModal.ts, .constructor(), .createButton(), .createContent(), .createNewRecordBadge()]
- "ui_statsmodal": "StatsModal.ts" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, MenuScene.ts, AudioManager.ts, AudioManager, StorageManager.ts, StorageManager]
- "ui_statsmodal_statsmodal": "StatsModal" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L6 | neighbors=[MenuScene.ts, StatsModal.ts, .constructor(), .createCloseButton(), .createContent(), .createStatRow()]
- "ui_texthelper_createcrisptext": "createCrispText()" | kind=code-symbol | source=apps/ponge/src/ui/TextHelper.ts:L3 | neighbors=[GameScene.ts, MenuScene.ts, AboutModal.ts, BannerManager.ts, GameOverModal.ts, HelpModal.ts]
- "commit:repo:github.com/naazeri/Game@0d024c8a1fd991ba158b44d17c0fb269f79a6d04": "0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite" | kind=Commit | source=git | neighbors=[main, c3fedc4 feat(flappy-bird): release v1.2…, vite.config.ts, BootScene.ts, GameScene.ts, config.ts]
- "commit:repo:github.com/naazeri/Game@c3fedc40348fafff40e7476ded1c75366062ef6d": "c3fedc4 feat(flappy-bird): release v1.2.0 enhanced remake with custom character…" | kind=Commit | source=git | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, main, b714fad chore(memory): initialize Engra…, vite.config.ts, BootScene.ts, GameScene.ts]
- "lib_gsap_min_v": "v()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _a(), ac(), ea(), eb(), gb()]
- "scripts_assemble_site": "assemble-site.mjs" | kind=code-symbol | source=scripts/assemble-site.mjs:L1 | neighbors=[875b52a feat(portal): add Astro portal …, appsDir, fail(), games, LEGACY, out]
- "ui_aboutmodal": "AboutModal.ts" | kind=code-symbol | source=apps/ponge/src/ui/AboutModal.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, ed4b732 feat(ponge): release v2.0.0 rem…, MenuScene.ts, AudioManager.ts, AudioManager, AboutModal]
- "ui_aboutmodal_aboutmodal": "AboutModal" | kind=code-symbol | source=apps/ponge/src/ui/AboutModal.ts:L6 | neighbors=[MenuScene.ts, AboutModal.ts, .constructor(), .createButton(), .createContent(), .getVisible()]
- "ui_helpmodal_helpmodal": "HelpModal" | kind=code-symbol | source=apps/ponge/src/ui/HelpModal.ts:L5 | neighbors=[MenuScene.ts, HelpModal.ts, .constructor(), .createButton(), .createContent(), .getVisible()]
- "audio_audiomanager_audiomanager_playsynthblip": ".playSynthBlip()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L153 | neighbors=[AudioManager, .playClick(), .playPaddleBounce(), .playPowerUpSpawn(), .playRallyMilestone(), .playServeChime()]
- "lib_gsap_min_d": "_d()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, be(), fa(), ia(), Pd(), oe()]
- "lib_gsap_min_eb": "eb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, db(), ja(), r(), s(), v()]
- "objects_ball": "Ball.ts" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L1 | neighbors=[ed4b732 feat(ponge): release v2.0.0 rem…, AIPaddle.ts, Ball, TrailParticle, config.ts, BALL_CONFIG]
- "objects_paddle": "Paddle.ts" | kind=code-symbol | source=apps/ponge/src/objects/Paddle.ts:L1 | neighbors=[ed4b732 feat(ponge): release v2.0.0 rem…, AIPaddle.ts, Paddle, config.ts, PADDLE_CONFIG, PlayerPaddle.ts]
- "scenes_resultscene": "ResultScene.ts" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L1 | neighbors=[385e2de fix(hit-the-coin): prevent dupl…, fdf34ba feat: rebuild Hit The Coin with…, ResultData, ResultScene, config.ts, GAME_CONFIG]
- "scenes_resultscene_resultscene": "ResultScene" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L11 | neighbors=[ResultScene.ts, .constructor(), .create(), .createButton(), .handleResize(), .playMenuMusic()]
- "src_config_game_config": "GAME_CONFIG" | kind=code-symbol | source=apps/poke/src/config.ts:L1 | neighbors=[AboutScene.ts, BootScene.ts, GameScene.ts, MenuScene.ts, ResultScene.ts, config.ts]
- "ui_bannermanager": "BannerManager.ts" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, GameScene.ts, config.ts, BannerManager, BannerOptions, TextHelper.ts]
- "ui_helpmodal": "HelpModal.ts" | kind=code-symbol | source=apps/ponge/src/ui/HelpModal.ts:L1 | neighbors=[ed4b732 feat(ponge): release v2.0.0 rem…, MenuScene.ts, AudioManager.ts, AudioManager, HelpModal, TextHelper.ts]
- "ui_settingsmodal_settingsmodal_createcontent": ".createContent()" | kind=code-symbol | source=apps/ponge/src/ui/SettingsModal.ts:L39 | neighbors=[SettingsModal, .constructor(), .createButton(), .createMediumButton(), .createOptionButton(), .createSaveButton()]
- "commit:repo:github.com/naazeri/Game@385e2dec823273ba03c163ee3887a02d0972eb94": "385e2de fix(hit-the-coin): prevent duplicate bgm_menu on return from result sce…" | kind=Commit | source=git | neighbors=[main, 0d024c8 feat(flappy-bird): rebuild with…, GameScene.ts, MenuScene.ts, ResultScene.ts, fdf34ba feat: rebuild Hit The Coin with…]
- "entities_ballpillar": "BallPillar.ts" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, BallPillar, config.ts, BallColor, COLORS, GameScene.ts]
- "entities_centralball_centralball_drawglow": ".drawGlow()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L104 | neighbors=[CentralBall, .constructor(), getHeatTierForScore(), .reset(), .switchColor(), .updateScore()]
- "layouts_base": "Base.astro" | kind=code-symbol | source=apps/portal/src/layouts/Base.astro:L1 | neighbors=[875b52a feat(portal): add Astro portal …, [slug].astro, Footer.astro, Header.astro, 404.astro, index.astro]
- "lib_gsap_min_ac": "ac()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r(), s(), t(), u(), v()]
- "lib_gsap_min_gb": "gb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, fb(), s(), t(), v(), Wa()]
- "lib_gsap_min_ka": "ka()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, be(), ja(), t(), xa(), za()]
- "media_capture_smoke": "smoke.mjs" | kind=code-symbol | source=tools/media-capture/smoke.mjs:L1 | neighbors=[875b52a feat(portal): add Astro portal …, check(), consoleErrors, failures, filtered, SLUGS]
- "objects_aipaddle_aipaddle": "AIPaddle" | kind=code-symbol | source=apps/ponge/src/objects/AIPaddle.ts:L6 | neighbors=[AIPaddle.ts, .constructor(), .setDifficulty(), .updateAI(), Paddle, GameScene.ts]
- "objects_playerpaddle_playerpaddle": "PlayerPaddle" | kind=code-symbol | source=apps/ponge/src/objects/PlayerPaddle.ts:L4 | neighbors=[PlayerPaddle.ts, Paddle, .constructor(), .handleInput(), .setTouchInput(), GameScene.ts]
- "scenes_aboutscene": "AboutScene.ts" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L1 | neighbors=[4042c7c feat(poke): release v2.0.0 rema…, fdf34ba feat: rebuild Hit The Coin with…, AboutScene, config.ts, GAME_CONFIG, main.ts]
- "scenes_gamescene_gamescene_handlegoal": ".handleGoal()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L748 | neighbors=[GameScene, .checkGoalLines(), .endMatch(), .pulseScore(), .showCelebrationBanner(), .spawnGoalShockwave()]
- "ui_bannermanager_bannermanager": "BannerManager" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L12 | neighbors=[GameScene.ts, BannerManager.ts, .clear(), .constructor(), .processNext(), .show()]
- "audio_audiomanager_audiomanager_playbgm": ".playBgm()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L44 | neighbors=[AudioManager, .stopMusic(), .playGameMusic(), .playMenuMusic(), .toggleMusic()]
- "commit:repo:github.com/naazeri/Game@e7dfc308b5fac5933c0665914a820d82e6412c30": "e7dfc30 add vega game" | kind=Commit | source=git | neighbors=[8ee78eb change Bootstrap to v5.3.1, index-3509133a.js, main, 993d092 add vega link but commented, gsap.min.js]
- "lib_gsap_min_aa": "Aa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ia(), ja(), Ra(), Sa()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-001.json

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
