# Node Description Batch 3 of 15

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

- "lib_gsap_min_cb": "cb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Ab(), Bb(), Context(), Ew()]
- "lib_gsap_min_ea": "ea()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, s(), v(), fa(), Tween()]
- "lib_gsap_min_fb": "fb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Bb(), ja(), t(), gb()]
- "lib_gsap_min_ia": "ia()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), Aa(), ja(), oe()]
- "lib_gsap_min_ra": "Ra()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Animation(), Aa(), ja(), Sa()]
- "lib_gsap_min_va": "va()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween(), r(), t(), w()]
- "lib_gsap_min_wb": "wb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, qa(), s(), ua(), x()]
- "objects_ball_ball_draw": ".draw()" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L154 | neighbors=[Ball, .constructor(), .getHeatColor(), .stop(), .update()]
- "objects_paddle_paddle_draw": ".draw()" | kind=code-symbol | source=apps/ponge/src/objects/Paddle.ts:L101 | neighbors=[Paddle, .constructor(), .reset(), .setColor(), .update()]
- "objects_playerpaddle": "PlayerPaddle.ts" | kind=code-symbol | source=apps/ponge/src/objects/PlayerPaddle.ts:L1 | neighbors=[ed4b732 feat(ponge): release v2.0.0 rem…, Paddle.ts, Paddle, PlayerPaddle, GameScene.ts]
- "objects_powerup": "PowerUp.ts" | kind=code-symbol | source=apps/ponge/src/objects/PowerUp.ts:L1 | neighbors=[ed4b732 feat(ponge): release v2.0.0 rem…, PowerUp, config.ts, PowerUpKind, GameScene.ts]
- "scenes_aboutscene_aboutscene": "AboutScene" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/AboutScene.ts:L5 | neighbors=[AboutScene.ts, .constructor(), .create(), .handleResize(), main.ts]
- "scenes_bootscene_bootscene": "BootScene" | kind=code-symbol | source=apps/ponge/src/scenes/BootScene.ts:L4 | neighbors=[BootScene.ts, .constructor(), .create(), .preload(), main.ts]
- "scenes_gamescene_gamescene_clearpanicticks": ".clearPanicTicks()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L187 | neighbors=[GameScene, .endGame(), .handleCoinHit(), .init(), .triggerUrgentCountdown()]
- "scenes_gamescene_gamescene_handlecoinhit": ".handleCoinHit()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L192 | neighbors=[GameScene, .clearPanicTicks(), .repositionCoin(), .showFloatingText(), .spawnParticleBurst()]
- "src_config_gamemode": "GameMode" | kind=code-symbol | source=apps/ponge/src/config.ts:L40 | neighbors=[StorageManager.ts, GameScene.ts, MenuScene.ts, config.ts, GameOverModal.ts]
- "assets_index_3509133a_i": "I" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, .constructor(), .draw(), .update()]
- "assets_index_3509133a_q": "q" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, .constructor(), .draw(), .update()]
- "assets_index_3509133a_r": "r()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, o(), S, v()]
- "assets_index_3509133a_s": "S" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, r(), .constructor(), .draw()]
- "assets_index_3509133a_t": "T" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, .constructor(), .draw(), .update()]
- "audio_audiomanager_audiomanager_stopmusic": ".stopMusic()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L146 | neighbors=[AudioManager, .playBgm(), .playMusic(), .setMusicEnabled()]
- "components_gamecard": "GameCard.astro" | kind=code-symbol | source=apps/portal/src/components/GameCard.astro:L1 | neighbors=[875b52a feat(portal): add Astro portal …, games.ts, [slug].astro, index.astro]
- "data_storagemanager_storagemanager_incrementgamesplayed": ".incrementGamesPlayed()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L41 | neighbors=[StorageManager, .getGamesPlayed(), .getKey(), .saveCurrentScore()]
- "entities_centralball_getheattierforscore": "getHeatTierForScore()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L26 | neighbors=[CentralBall.ts, .drawGlow(), .spawnTrailParticle(), .updateScore()]
- "games_slug": "[slug].astro" | kind=code-symbol | source=apps/portal/src/pages/games/[slug].astro:L1 | neighbors=[875b52a feat(portal): add Astro portal …, GameCard.astro, Base.astro, games.ts]
- "lib_gsap_min_ab": "Ab()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, t(), zb(), cb()]
- "lib_gsap_min_be": "be()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), ka(), Pd()]
- "lib_gsap_min_fa": "fa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), ea(), ke()]
- "lib_gsap_min_ha": "ha()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ja(), Lc(), Sb()]
- "lib_gsap_min_je": "je()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ie(), Pd(), ke()]
- "lib_gsap_min_ke": "ke()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, fa(), je(), le()]
- "lib_gsap_min_lc": "Lc()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ha(), Jc(), r()]
- "lib_gsap_min_pd": "Pd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, be(), _d(), je()]
- "lib_gsap_min_w": "w()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Timeline(), Tween(), va()]
- "lib_gsap_min_wa": "Wa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, gb(), hb(), lb()]
- "lib_gsap_min_y": "y()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween(), r(), s()]
- "media_capture_capture_capture": "capture()" | kind=code-symbol | source=tools/media-capture/capture.mjs:L204 | neighbors=[capture.mjs, ffmpeg(), mediaWidth(), sleep()]
- "pages_index": "index.astro" | kind=code-symbol | source=apps/portal/src/pages/index.astro:L1 | neighbors=[875b52a feat(portal): add Astro portal …, GameCard.astro, Base.astro, games.ts]
- "scenes_gamescene_gamescene_checkcollisions": ".checkCollisions()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L537 | neighbors=[GameScene, .distToSegment(), .handleGameOver(), .update()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-002.json

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
