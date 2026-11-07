# Graph Report - Game  (2026-11-08)

## Corpus Check
- 111 files · ~52,071 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .ttf 6, .ico 4, (none) 2)

## Summary
- 1137 nodes · 2169 edges · 60 communities (46 shown, 14 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 93 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `85ab5b58`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- media-capture/package.json
- media-capture — gameplay clips & screenshots for the portal
- GameScene
- GameScene
- GameScene
- ref_phaser
- GameScene
- ponge/src/scenes/GameScene.ts
- AudioManager
- steps
- capture.mjs
- scripts
- .getInstance
- AudioManager
- hit-the-coin/src/main.ts
- hit-the-coin/package.json
- assemble-site.mjs
- change-balls/src/scenes/GameScene.ts
- change-balls/package.json
- GameScene
- CentralBall
- flappy-bird/package.json
- poke/package.json
- ponge/package.json
- vega/package.json
- smoke.mjs
- AudioManager
- compilerOptions
- compilerOptions
- compilerOptions
- generate-sfx.cjs
- compilerOptions
- createCrispText
- compilerOptions
- compilerOptions
- portal/package.json
- PowerUp
- [slug].astro
- index.ts
- games.ts
- change-balls/src/main.ts
- HeartsUI
- ponge/src/main.ts
- Paddle
- scripts
- compilerOptions
- Ball
- shared/package.json
- BallPillar
- GameOverModal
- GameOverModal
- Base.astro
- Games
- BannerManager
- GameTheme
- portal/tsconfig.json
- content.config.ts
- pnpm-workspace.yaml
- allowBuilds

## God Nodes (most connected - your core abstractions)
1. `GameScene` - 43 edges
2. `AudioManager` - 43 edges
3. `GameScene` - 38 edges
4. `AudioManager` - 30 edges
5. `GameScene` - 27 edges
6. `AudioManager` - 27 edges
7. `createCrispText()` - 26 edges
8. `GameScene` - 25 edges
9. `createCrispText()` - 25 edges
10. `createCrispText()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `1. Prerequisites and environment facts (learned the hard way)` --references--> `ffmpeg()`  [INFERRED]
  tools/media-capture/README.md → tools/media-capture/capture.mjs
- `5. Encoding settings and why` --references--> `ffmpeg()`  [INFERRED]
  tools/media-capture/README.md → tools/media-capture/capture.mjs
- `MenuScene` --references--> `AudioManager`  [EXTRACTED]
  apps/vega/src/scenes/MenuScene.ts → apps/vega/src/audio/AudioManager.ts
- `MenuScene` --references--> `MatchSettings`  [EXTRACTED]
  apps/ponge/src/scenes/MenuScene.ts → apps/ponge/src/config.ts
- `MenuScene` --references--> `SettingsModal`  [EXTRACTED]
  apps/ponge/src/scenes/MenuScene.ts → apps/ponge/src/ui/SettingsModal.ts

## Import Cycles
- None detected.

## Communities (60 total, 14 thin omitted)

### Community 0 - "media-capture/package.json"
Cohesion: 0.18
Nodes (12): ffmpeg-static, playwright-core, dependencies, ffmpeg-static@^5.3.0, playwright-core@^1.65.0, description, name, private (+4 more)

### Community 1 - "media-capture — gameplay clips & screenshots for the portal"
Cohesion: 0.15
Nodes (14): ffmpeg(), 0. TL;DR, 10. Current coverage, 1. Prerequisites and environment facts (learned the hard way), 2. How `capture.mjs` works (read this before editing it), 3. Per-game recipes (current state), 4. Adding a new game (or re-doing one) — step by step, 5. Encoding settings and why (+6 more)

### Community 2 - "GameScene"
Cohesion: 0.11
Nodes (6): GAME_CONFIG, game, phaserConfig, BootScene, DogMob, GameScene

### Community 3 - "GameScene"
Cohesion: 0.10
Nodes (8): GAME_CONFIG, game, phaserConfig, Window, BootScene, GameScene, GameState, PipePair

### Community 4 - "GameScene"
Cohesion: 0.12
Nodes (3): PlayerPaddle, GameScene, createRetroScoreText()

### Community 5 - "ref_phaser"
Cohesion: 0.06
Nodes (28): CENTER_X, CENTER_Y, COLORS, DEFAULT_SETTINGS, FONTS, GAME_HEIGHT, GAME_WIDTH, GameSettings (+20 more)

### Community 6 - "GameScene"
Cohesion: 0.05
Nodes (19): EnemyType, Asteroid, Cruiser, Dreadnought, Drone, Splitter, PowerUpType, ChronoFreeze (+11 more)

### Community 7 - "ponge/src/scenes/GameScene.ts"
Cohesion: 0.12
Nodes (20): AI_BOT_PROFILES, AIBotProfile, AIDifficulty, Casual, Normal, Pro, BALL_CONFIG, COURT_CONFIG (+12 more)

### Community 9 - "steps"
Cohesion: 0.07
Nodes (28): concurrency, cancel-in-progress, group, environment, runs-on, steps, name, url (+20 more)

### Community 10 - "capture.mjs"
Cohesion: 0.22
Nodes (8): capture(), GAMES, here, mediaWidth(), portal, sleep(), tmpDir, wanted

### Community 11 - "scripts"
Cohesion: 0.08
Nodes (24): devDependencies, sirv-cli@^3.0.1, name, private, scripts, build, build:change-balls, build:flappy-bird (+16 more)

### Community 12 - ".getInstance"
Cohesion: 0.15
Nodes (3): MenuScene, AboutModal, HelpModal

### Community 14 - "hit-the-coin/src/main.ts"
Cohesion: 0.08
Nodes (9): GAME_CONFIG, config, game, AboutScene, BootScene, GameScene, MenuScene, ResultData (+1 more)

### Community 15 - "hit-the-coin/package.json"
Cohesion: 0.12
Nodes (20): dependencies, @games/shared@workspace:*, phaser@^3.88.2, devDependencies, puppeteer-core@^25.16.0, typescript@^5.7.3, vite@^6.2.0, @games/shared (+12 more)

### Community 16 - "assemble-site.mjs"
Cohesion: 0.18
Nodes (6): appsDir, games, LEGACY, out, portalDist, root

### Community 17 - "change-balls/src/scenes/GameScene.ts"
Cohesion: 0.20
Nodes (16): BALL_RADIUS, CENTER_X, CENTER_Y, COLORS, CONTACT_LEFT_X, CONTACT_RIGHT_X, DEFAULT_SPEED, LEFT_PILLAR_X (+8 more)

### Community 18 - "change-balls/package.json"
Cohesion: 0.13
Nodes (18): dependencies, @games/shared@workspace:*, phaser@^3.88.2, devDependencies, typescript@^5.7.3, vite@^6.2.0, @games/shared, phaser (+10 more)

### Community 20 - "CentralBall"
Cohesion: 0.18
Nodes (3): BallColor, CentralBall, getHeatTierForScore()

### Community 21 - "flappy-bird/package.json"
Cohesion: 0.13
Nodes (18): dependencies, phaser@^3.88.2, devDependencies, puppeteer-core@^25.16.0, typescript@^5.7.3, vite@^6.2.0, phaser, puppeteer-core (+10 more)

### Community 22 - "poke/package.json"
Cohesion: 0.13
Nodes (18): dependencies, @games/shared@workspace:*, phaser@^3.88.2, devDependencies, typescript@^5.7.3, vite@^6.2.0, @games/shared, phaser (+10 more)

### Community 23 - "ponge/package.json"
Cohesion: 0.13
Nodes (18): dependencies, @games/shared@workspace:*, phaser@^3.88.2, devDependencies, typescript@^5.7.3, vite@^6.2.0, @games/shared, phaser (+10 more)

### Community 24 - "vega/package.json"
Cohesion: 0.13
Nodes (18): dependencies, @games/shared@workspace:*, phaser@^3.88.2, devDependencies, typescript@^5.7.3, vite@^6.2.0, @games/shared, phaser (+10 more)

### Community 25 - "smoke.mjs"
Cohesion: 0.33
Nodes (4): consoleErrors, failures, filtered, SLUGS

### Community 27 - "AudioManager"
Cohesion: 0.06
Nodes (9): AudioManager, GameMode, StorageManager, MenuScene, AboutModal, SettingsModal, StatsModal, createCrispText() (+1 more)

### Community 29 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, esModuleInterop, isolatedModules, lib, module, moduleResolution, noEmit, noImplicitReturns (+9 more)

### Community 30 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, esModuleInterop, isolatedModules, lib, module, moduleResolution, noEmit, noImplicitReturns (+9 more)

### Community 33 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, esModuleInterop, isolatedModules, lib, module, moduleResolution, noEmit, noImplicitReturns (+8 more)

### Community 34 - "generate-sfx.cjs"
Cohesion: 0.14
Nodes (11): path, puppeteer, createWavHeader(), fs, generateClick(), generateHover(), generateUrgentTick(), outDir (+3 more)

### Community 35 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, esModuleInterop, isolatedModules, lib, module, moduleResolution, noEmit, noImplicitReturns (+8 more)

### Community 36 - "createCrispText"
Cohesion: 0.29
Nodes (3): MatchSettings, SettingsModal, createCrispText()

### Community 37 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 38 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 39 - "portal/package.json"
Cohesion: 0.18
Nodes (13): dependencies, astro@^7.4.7, @astrojs/sitemap@^3.7.4, @fontsource-variable/space-grotesk@^5.3.0, @games/shared@workspace:*, @games/shared, name, private (+5 more)

### Community 41 - "PowerUp"
Cohesion: 0.23
Nodes (5): PowerUpKind, Extend, Freeze, HyperSpeed, PowerUp

### Community 44 - "[slug].astro"
Cohesion: 0.18
Nodes (10): Props, Game, clip, dialog, getStaticPaths, img, jsonLd, others (+2 more)

### Community 46 - "index.ts"
Cohesion: 0.22
Nodes (3): REPO_URL, DEVELOPER_INFO, DeveloperInfo

### Community 47 - "games.ts"
Cohesion: 0.25
Nodes (8): appsDir, findClip(), GameClip, getGames(), portalDir, readVersion(), shots, thumbs

### Community 48 - "change-balls/src/main.ts"
Cohesion: 0.22
Nodes (4): GAME_HEIGHT, GAME_WIDTH, config, BootScene

### Community 51 - "ponge/src/main.ts"
Cohesion: 0.22
Nodes (4): GAME_HEIGHT, GAME_WIDTH, config, BootScene

### Community 53 - "scripts"
Cohesion: 0.18
Nodes (10): devDependencies, @astrojs/check@^0.9.12, typescript@^5.7.3, typescript, scripts, build, check, dev (+2 more)

### Community 54 - "compilerOptions"
Cohesion: 0.20
Nodes (9): compilerOptions, declaration, esModuleInterop, module, moduleResolution, skipLibCheck, strict, target (+1 more)

### Community 56 - "shared/package.json"
Cohesion: 0.25
Nodes (7): exports, main, name, private, type, types, version

### Community 65 - "Games"
Cohesion: 0.29
Nodes (5): Commands, Deploy, Games, Layout, Media for the portal

### Community 67 - "GameTheme"
Cohesion: 0.40
Nodes (5): GameTheme, CyberNeon, PureIce, RetroAtari, Synthwave

### Community 68 - "portal/tsconfig.json"
Cohesion: 0.40
Nodes (4): exclude, extends, include, astro/tsconfigs/strict

### Community 96 - "pnpm-workspace.yaml"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, packages

## Knowledge Gaps
- **30 isolated node(s):** `Asteroid`, `Cruiser`, `Dreadnought`, `Drone`, `Splitter` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 408 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DEVELOPER_INFO` connect `index.ts` to `GameScene`, `createCrispText`, `ref_phaser`, `hit-the-coin/src/main.ts`, `games.ts`, `AudioManager`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `Asteroid`, `Cruiser`, `Dreadnought` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `GameScene` be split into smaller, more focused modules?**
  _Cohesion score 0.10634920634920635 - nodes in this community are weakly interconnected._
- **Why does `AudioManager` connect `AudioManager` to `ref_phaser`, `GameScene`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `GameScene` be split into smaller, more focused modules?**
  _Cohesion score 0.10252100840336134 - nodes in this community are weakly interconnected._
- **Should `GameScene` be split into smaller, more focused modules?**
  _Cohesion score 0.12121212121212122 - nodes in this community are weakly interconnected._
- **Should `ref_phaser` be split into smaller, more focused modules?**
  _Cohesion score 0.06155950752393981 - nodes in this community are weakly interconnected._