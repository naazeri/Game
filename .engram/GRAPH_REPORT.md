# Graph Report - .  (2026-11-07)

## Corpus Check
- cluster-only mode - file stats not available

## Summary
- 573 nodes · 1067 edges · 36 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: calls: 272 · method: 271 · contains: 212 · imports: 84 · MODIFIES: 78 · imports_from: 73 · ON_BRANCH: 38 · PARENT_OF: 37 · inherits: 2


## Graph Freshness
- Built from Git commit: `875b52a`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `GameScene` - 85 edges
2. `AudioManager` - 45 edges
3. `StorageManager` - 19 edges
4. `MenuScene` - 18 edges
5. `SettingsModal` - 15 edges
6. `CentralBall` - 14 edges
7. `Paddle` - 13 edges
8. `Tween()` - 13 edges
9. `HeartsUI` - 12 edges
10. `Ball` - 12 edges

## Surprising Connections (you probably didn't know these)
- `0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 9 → community 2_
- `37acf29 chore(engram): update knowledge graph and community labels after change-balls release` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 8 → community 2_
- `875b52a feat(portal): add Astro portal with game details pages, clips and screenshots` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 3 → community 2_
- `ed4b732 feat(ponge): release v2.0.0 remake with phaser 3, typescript, arcade power-ups, themes and ice physics` --PARENT_OF--> `875b52a feat(portal): add Astro portal with game details pages, clips and screenshots`  [EXTRACTED]
  git → git  _Bridges community 8 → community 3_
- `Ab()` --calls--> `t()`  [EXTRACTED]
  vega/lib/gsap.min.js → vega/lib/gsap.min.js  _Bridges community 27 → community 16_

## Communities

### Community 0 - "Vega Minified Helpers A"
Cohesion: 0.06
Nodes (12): ee(), Kd(), la(), Ld(), ma(), na(), Od(), Q() (+4 more)

### Community 1 - "Audio Manager"
Cohesion: 0.08
Nodes (1): AudioManager

### Community 2 - "Git History on Main"
Cohesion: 0.10
Nodes (33): main, 07c6be3 add change balls v1.2.1, 1270fdf change text and hover color, 19f781f add bola game, 37be431 add ponge v1.1.3, 4042c7c feat(poke): release v2.0.0 remake with phaser 3, typescript and shared metadata, 41bf5e3 add bola, flappy, hit the coin images, 5327790 add deadzone to flappy bird sky (+25 more)

### Community 3 - "Portal Games Library and Smoke Test"
Cohesion: 0.07
Nodes (19): 875b52a feat(portal): add Astro portal with game details pages, clips and screenshots, appsDir, Game, GameClip, portalDir, shots, thumbs, consoleErrors (+11 more)

### Community 4 - "Shared Game Config and Types"
Cohesion: 0.14
Nodes (22): HEAT_TIERS, HeatTierInfo, TrailParticle, DogMob, GameState, PipePair, AI_BOT_PROFILES, AIBotProfile (+14 more)

### Community 5 - "Vega Minified Helpers B"
Cohesion: 0.08
Nodes (14): A, c, f, G, I, l, o(), p (+6 more)

### Community 6 - "Game Scene Core Loop"
Cohesion: 0.11
Nodes (1): GameScene

### Community 7 - "Vega Minified Helpers C"
Cohesion: 0.14
Nodes (20): _a(), ac(), Bo(), db(), eb(), ga(), gb(), hb() (+12 more)

### Community 8 - "Remake Release Commits"
Cohesion: 0.34
Nodes (6): 37acf29 chore(engram): update knowledge graph and community labels after change-balls release, bb72e0b feat(change-balls): release v2.0.0 remake with phaser 3, typescript, energy nodes, audio and shared metadata, ed4b732 feat(ponge): release v2.0.0 remake with phaser 3, typescript, arcade power-ups, themes and ice physics, GameMode, BannerOptions, createCrispText()

### Community 9 - "Flappy and Hit The Coin History"
Cohesion: 0.21
Nodes (10): 0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite, 385e2de fix(hit-the-coin): prevent duplicate bgm_menu on return from result scene and ensure loop, c3fedc4 feat(flappy-bird): release v1.2.0 enhanced remake with custom characters, audio, and visual polish, fdf34ba feat: rebuild Hit The Coin with Phaser 3 and setup GitHub Actions Pages deployment, ResultData, GAME_CONFIG, config, game (+2 more)

### Community 10 - "Menu Scene"
Cohesion: 0.19
Nodes (1): MenuScene

### Community 11 - "Paddle Entities"
Cohesion: 0.16
Nodes (3): Paddle, Paddle, PlayerPaddle

### Community 13 - "Storage Manager"
Cohesion: 0.31
Nodes (1): StorageManager

### Community 14 - "Central Ball and Heat Tiers"
Cohesion: 0.22
Nodes (2): CentralBall, getHeatTierForScore()

### Community 16 - "GSAP Tween and Timeline"
Cohesion: 0.21
Nodes (13): _assertThisInitialized(), Ec(), Fc(), gc(), qa(), t(), Timeline(), Tween() (+5 more)

### Community 17 - "Vega Minified Helpers D"
Cohesion: 0.19
Nodes (13): be(), _d(), ea(), fa(), ia(), ie(), je(), ke() (+5 more)

### Community 18 - "Settings Modal"
Cohesion: 0.23
Nodes (1): SettingsModal

### Community 19 - "Hearts UI"
Cohesion: 0.27
Nodes (1): HeartsUI

### Community 20 - "Media Capture Bot"
Cohesion: 0.24
Nodes (9): capture(), ffmpeg(), GAMES, here, mediaWidth(), portal, sleep(), tmpDir (+1 more)

### Community 21 - "Ponge Ball"
Cohesion: 0.29
Nodes (1): Ball

### Community 22 - "GSAP Animation Utilities"
Cohesion: 0.28
Nodes (9): Aa(), Animation(), ha(), ja(), Jc(), Lc(), Ra(), Sa() (+1 more)

### Community 23 - "Ball Pillar"
Cohesion: 0.32
Nodes (1): BallPillar

### Community 24 - "Ponge Power-Up"
Cohesion: 0.43
Nodes (1): PowerUp

### Community 25 - "Game Over Modal"
Cohesion: 0.36
Nodes (1): GameOverModal

### Community 26 - "Stats Modal"
Cohesion: 0.36
Nodes (1): StatsModal

### Community 27 - "GSAP Context Helpers"
Cohesion: 0.29
Nodes (7): Ab(), Bb(), cb(), Context(), Ew(), fb(), zb()

### Community 28 - "About Modal"
Cohesion: 0.38
Nodes (1): AboutModal

### Community 29 - "Help Modal"
Cohesion: 0.38
Nodes (1): HelpModal

### Community 32 - "Result Scene"
Cohesion: 0.47
Nodes (1): ResultScene

### Community 33 - "AI Paddle"
Cohesion: 0.40
Nodes (2): AIPaddle, Paddle

### Community 34 - "Banner Manager"
Cohesion: 0.50
Nodes (1): BannerManager

### Community 35 - "Vega Minified Helpers E"
Cohesion: 0.50
Nodes (4): ka(), tb(), xa(), za()

### Community 36 - "About Scene"
Cohesion: 0.50
Nodes (1): AboutScene

### Community 37 - "Boot Scene"
Cohesion: 0.50
Nodes (1): BootScene

### Community 43 - "Vendored Library Note A"
Cohesion: 1.00
Nodes (1): NOTE: We must explicitly pass the default, accessing it via

### Community 44 - "Vendored Library Note B"
Cohesion: 1.00
Nodes (1): NOTE: We must explicitly pass the default, accessing it via

## Knowledge Gaps
- **47 isolated node(s):** `HeatTierInfo`, `HEAT_TIERS`, `config`, `BannerOptions`, `Window` (+42 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Audio Manager`** (1 nodes): `AudioManager`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game Scene Core Loop`** (1 nodes): `GameScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Menu Scene`** (1 nodes): `MenuScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Storage Manager`** (1 nodes): `StorageManager`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Central Ball and Heat Tiers`** (2 nodes): `CentralBall`, `getHeatTierForScore()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Settings Modal`** (1 nodes): `SettingsModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hearts UI`** (1 nodes): `HeartsUI`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Ponge Ball`** (1 nodes): `Ball`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Ball Pillar`** (1 nodes): `BallPillar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Ponge Power-Up`** (1 nodes): `PowerUp`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game Over Modal`** (1 nodes): `GameOverModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Stats Modal`** (1 nodes): `StatsModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Modal`** (1 nodes): `AboutModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Help Modal`** (1 nodes): `HelpModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Result Scene`** (1 nodes): `ResultScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `AI Paddle`** (2 nodes): `AIPaddle`, `Paddle`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Banner Manager`** (1 nodes): `BannerManager`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Scene`** (1 nodes): `AboutScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Boot Scene`** (1 nodes): `BootScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vendored Library Note A`** (1 nodes): `NOTE: We must explicitly pass the default, accessing it via`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vendored Library Note B`** (1 nodes): `NOTE: We must explicitly pass the default, accessing it via`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GameScene` connect `Game Scene Core Loop` to `Shared Game Config and Types`, `Phaser Remake Game Scenes`, `Bootstrap Dialog Modal`, `Bootstrap Bundle Utilities`, `Change Balls Game Infrastructure`, `Collision and Game Over Handling`, `Bootstrap Focus Trap`, `Sprite Animation Curves`, `Ball Pillar Minified Renderer`, `Change Balls Rotating Pillar`, `Flappy and Hit The Coin History`?**
  _High betweenness centrality (0.267) - this node is a cross-community bridge._
- **Why does `AudioManager` connect `Audio Manager` to `Remake Release Commits`, `Flappy and Hit The Coin History`, `Shared Game Config and Types`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `MenuScene` connect `Menu Scene` to `Remake Release Commits`, `Flappy and Hit The Coin History`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `HeatTierInfo`, `HEAT_TIERS`, `config` to the rest of the system?**
  _47 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Vega Minified Helpers A` be split into smaller, more focused modules?**
  _Cohesion score 0.05574912891986063 - nodes in this community are weakly interconnected._
- **Should `Audio Manager` be split into smaller, more focused modules?**
  _Cohesion score 0.07507507507507508 - nodes in this community are weakly interconnected._
- **Should `Git History on Main` be split into smaller, more focused modules?**
  _Cohesion score 0.10158730158730159 - nodes in this community are weakly interconnected._