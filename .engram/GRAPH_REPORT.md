# Graph Report - .  (2026-11-06)

## Corpus Check
- label mode - file stats not available

## Summary
- 972 nodes · 1692 edges · 59 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: method: 634 · calls: 576 · contains: 266 · MODIFIES: 56 · imports: 47 · imports_from: 44 · ON_BRANCH: 35 · PARENT_OF: 34


## Graph Freshness
- Built from Git commit: `bb72e0b`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `GameScene` - 61 edges
2. `Ni` - 38 edges
3. `Ot` - 28 edges
4. `AudioManager` - 27 edges
5. `Nt` - 24 edges
6. `fe` - 22 edges
7. `Gt` - 21 edges
8. `Ue` - 20 edges
9. `ce` - 20 edges
10. `StorageManager` - 19 edges

## Surprising Connections (you probably didn't know these)
- `0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 12 → community 8_
- `66591ee chore(titles): clean game titles and set portal title to Game - nazeriland` --PARENT_OF--> `bb72e0b feat(change-balls): release v2.0.0 remake with phaser 3, typescript, energy nodes, audio and shared metadata`  [EXTRACTED]
  git → git  _Bridges community 12 → community 15_
- `bb72e0b feat(change-balls): release v2.0.0 remake with phaser 3, typescript, energy nodes, audio and shared metadata` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 15 → community 8_
- `Ab()` --calls--> `t()`  [EXTRACTED]
  vega/lib/gsap.min.js → vega/lib/gsap.min.js  _Bridges community 45 → community 26_
- `ac()` --calls--> `t()`  [EXTRACTED]
  vega/lib/gsap.min.js → vega/lib/gsap.min.js  _Bridges community 14 → community 26_

## Communities

### Community 0 - "Bootstrap DOM Helpers"
Cohesion: 0.05
Nodes (3): Ai, Mi, Ni

### Community 1 - "Flappy Bird Game Scene"
Cohesion: 0.06
Nodes (1): GameScene

### Community 2 - "Bootstrap Dropdown Component"
Cohesion: 0.06
Nodes (3): fe, fs, W

### Community 3 - "Hit The Coin Build Bundle"
Cohesion: 0.06
Nodes (11): dt, Gt, It, j(), k(), Nt, rt, Ut (+3 more)

### Community 4 - "GSAP Animation Core"
Cohesion: 0.06
Nodes (12): ee(), Kd(), la(), Ld(), ma(), na(), Od(), Q() (+4 more)

### Community 5 - "Bootstrap Swipe Handler"
Cohesion: 0.09
Nodes (2): at, Ot

### Community 6 - "Poke Game Scene Build"
Cohesion: 0.08
Nodes (8): et(), Gt, j(), Nt, pt, Rt, ut, Xt

### Community 7 - "Flappy Bird Main Scene Build"
Cohesion: 0.09
Nodes (7): at, Gt, It, Nt, st(), tt(), Ut

### Community 8 - "Git Release History"
Cohesion: 0.12
Nodes (29): main, 07c6be3 add change balls v1.2.1, 1270fdf change text and hover color, 19f781f add bola game, 37be431 add ponge v1.1.3, 41bf5e3 add bola, flappy, hit the coin images, 5327790 add deadzone to flappy bird sky, 5e62a51 update change-balls to version 1.3.0 (+21 more)

### Community 9 - "Hit The Coin Storage Build"
Cohesion: 0.12
Nodes (3): Ct, fe, he

### Community 10 - "Classic Ponge Canvas Loop"
Cohesion: 0.08
Nodes (14): A, c, f, G, I, l, o(), p (+6 more)

### Community 11 - "Unity WebGL Engine Loader"
Cohesion: 0.26
Nodes (21): a(), b(), c(), d(), e(), f(), g(), h() (+13 more)

### Community 12 - "Phaser Remake Game Scenes"
Cohesion: 0.20
Nodes (12): 0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite, 385e2de fix(hit-the-coin): prevent duplicate bgm_menu on return from result scene and ensure loop, 4042c7c feat(poke): release v2.0.0 remake with phaser 3, typescript and shared metadata, 66591ee chore(titles): clean game titles and set portal title to Game - nazeriland, c3fedc4 feat(flappy-bird): release v1.2.0 enhanced remake with custom characters, audio, and visual polish, fdf34ba feat: rebuild Hit The Coin with Phaser 3 and setup GitHub Actions Pages deployment, ResultData, GAME_CONFIG (+4 more)

### Community 13 - "Audio Manager Service"
Cohesion: 0.12
Nodes (1): AudioManager

### Community 14 - "Minified Game Utilities"
Cohesion: 0.14
Nodes (20): _a(), ac(), Bo(), db(), eb(), ga(), gb(), hb() (+12 more)

### Community 15 - "Change Balls Game Infrastructure"
Cohesion: 0.30
Nodes (7): bb72e0b feat(change-balls): release v2.0.0 remake with phaser 3, typescript, energy nodes, audio and shared metadata, DogMob, GameState, PipePair, GameMode, BannerOptions, createCrispText()

### Community 16 - "Change Balls Modals Build"
Cohesion: 0.15
Nodes (2): ae, le

### Community 17 - "Bootstrap Modal Component"
Cohesion: 0.13
Nodes (1): gi

### Community 18 - "Bootstrap ScrollSpy Component"
Cohesion: 0.17
Nodes (2): e(), Qi

### Community 19 - "Bootstrap Collapse Component"
Cohesion: 0.22
Nodes (1): Rt

### Community 20 - "Change Balls Menu Scene"
Cohesion: 0.22
Nodes (1): MenuScene

### Community 21 - "Change Balls Game Scene"
Cohesion: 0.22
Nodes (1): ce

### Community 22 - "Local Storage Score Manager"
Cohesion: 0.31
Nodes (1): StorageManager

### Community 23 - "Change Balls Central Ball"
Cohesion: 0.22
Nodes (2): CentralBall, getHeatTierForScore()

### Community 24 - "Bootstrap Backdrop Component"
Cohesion: 0.22
Nodes (1): we

### Community 25 - "Bootstrap Toast Component"
Cohesion: 0.21
Nodes (1): Os

### Community 26 - "GreenSock Timeline Tween Core"
Cohesion: 0.21
Nodes (13): _assertThisInitialized(), Ec(), Fc(), gc(), qa(), t(), Timeline(), Tween() (+5 more)

### Community 27 - "Minified UI Animations"
Cohesion: 0.19
Nodes (13): be(), _d(), ea(), fa(), ia(), ie(), je(), ke() (+5 more)

### Community 28 - "Settings Speed Controls Build"
Cohesion: 0.23
Nodes (1): oe

### Community 29 - "Bootstrap Scrollbar Manipulator"
Cohesion: 0.30
Nodes (1): Ne

### Community 30 - "Bootstrap Dialog Modal"
Cohesion: 0.20
Nodes (1): Ue

### Community 31 - "Bootstrap Bundle Utilities"
Cohesion: 0.30
Nodes (9): D(), F(), I(), L(), M(), N(), O(), P() (+1 more)

### Community 32 - "Dynamic Central Ball State"
Cohesion: 0.31
Nodes (2): Nt(), ue

### Community 33 - "Hit The Coin Bundle Runtime"
Cohesion: 0.20
Nodes (7): at, Et, H(), It, pe, Q(), Zt

### Community 34 - "Energy Hearts UI Component"
Cohesion: 0.31
Nodes (1): HeartsUI

### Community 35 - "Energy Hearts Minified Logic"
Cohesion: 0.36
Nodes (1): de

### Community 36 - "Bootstrap Config Base Class"
Cohesion: 0.22
Nodes (1): q

### Community 37 - "Change Balls Settings Modal"
Cohesion: 0.29
Nodes (1): SettingsModal

### Community 39 - "Bootstrap Focus Trap"
Cohesion: 0.22
Nodes (1): Se

### Community 40 - "Sprite Animation Curves"
Cohesion: 0.28
Nodes (9): Aa(), Animation(), ha(), ja(), Jc(), Lc(), Ra(), Sa() (+1 more)

### Community 41 - "Ball Pillar Minified Renderer"
Cohesion: 0.36
Nodes (1): Kt

### Community 42 - "Change Balls Rotating Pillar"
Cohesion: 0.32
Nodes (1): BallPillar

### Community 43 - "Change Balls Game Over Modal"
Cohesion: 0.36
Nodes (1): GameOverModal

### Community 44 - "Game Statistics Modal"
Cohesion: 0.36
Nodes (1): StatsModal

### Community 45 - "Canvas Rendering Context Helpers"
Cohesion: 0.29
Nodes (7): Ab(), Bb(), cb(), Context(), Ew(), fb(), zb()

### Community 46 - "Change Balls About Modal"
Cohesion: 0.38
Nodes (1): AboutModal

### Community 47 - "Ball Types and Heat Tiers"
Cohesion: 0.40
Nodes (4): HEAT_TIERS, HeatTierInfo, BallColor, COLORS

### Community 48 - "Hit The Coin Result Scene"
Cohesion: 0.47
Nodes (1): ResultScene

### Community 49 - "Phaser Preload Initialization"
Cohesion: 0.40
Nodes (1): ne

### Community 50 - "Bootstrap Alert Dismiss Handler"
Cohesion: 0.40
Nodes (1): U

### Community 51 - "Floating Banner Manager"
Cohesion: 0.50
Nodes (1): BannerManager

### Community 52 - "Floating Banner Minified Controller"
Cohesion: 0.67
Nodes (1): ve

### Community 53 - "Bootstrap Button State Toggle"
Cohesion: 0.50
Nodes (1): J

### Community 54 - "Canvas Vector Math Utilities"
Cohesion: 0.50
Nodes (4): ka(), tb(), xa(), za()

### Community 55 - "Game About Scene"
Cohesion: 0.50
Nodes (1): AboutScene

### Community 56 - "Phaser Asset Boot Scene"
Cohesion: 0.50
Nodes (1): BootScene

### Community 57 - "Shared Developer Info"
Cohesion: 0.50
Nodes (2): DEVELOPER_INFO, DeveloperInfo

### Community 58 - "Default Configuration Accessor"
Cohesion: 1.00
Nodes (1): NOTE: We must explicitly pass the default, accessing it via

### Community 59 - "Fallback Attribute Handler"
Cohesion: 1.00
Nodes (1): NOTE: We must explicitly pass the default, accessing it via

## Knowledge Gaps
- **38 isolated node(s):** `HeatTierInfo`, `HEAT_TIERS`, `config`, `BannerOptions`, `Window` (+33 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Flappy Bird Game Scene`** (1 nodes): `GameScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Swipe Handler`** (2 nodes): `at`, `Ot`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Audio Manager Service`** (1 nodes): `AudioManager`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Modals Build`** (2 nodes): `ae`, `le`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Modal Component`** (1 nodes): `gi`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap ScrollSpy Component`** (2 nodes): `e()`, `Qi`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Collapse Component`** (1 nodes): `Rt`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Menu Scene`** (1 nodes): `MenuScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Game Scene`** (1 nodes): `ce`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Local Storage Score Manager`** (1 nodes): `StorageManager`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Central Ball`** (2 nodes): `CentralBall`, `getHeatTierForScore()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Backdrop Component`** (1 nodes): `we`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Toast Component`** (1 nodes): `Os`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Settings Speed Controls Build`** (1 nodes): `oe`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Scrollbar Manipulator`** (1 nodes): `Ne`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Dialog Modal`** (1 nodes): `Ue`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dynamic Central Ball State`** (2 nodes): `Nt()`, `ue`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Energy Hearts UI Component`** (1 nodes): `HeartsUI`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Energy Hearts Minified Logic`** (1 nodes): `de`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Config Base Class`** (1 nodes): `q`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Settings Modal`** (1 nodes): `SettingsModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Focus Trap`** (1 nodes): `Se`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Ball Pillar Minified Renderer`** (1 nodes): `Kt`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Rotating Pillar`** (1 nodes): `BallPillar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Game Over Modal`** (1 nodes): `GameOverModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game Statistics Modal`** (1 nodes): `StatsModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls About Modal`** (1 nodes): `AboutModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hit The Coin Result Scene`** (1 nodes): `ResultScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Phaser Preload Initialization`** (1 nodes): `ne`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Alert Dismiss Handler`** (1 nodes): `U`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Floating Banner Manager`** (1 nodes): `BannerManager`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Floating Banner Minified Controller`** (1 nodes): `ve`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Button State Toggle`** (1 nodes): `J`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game About Scene`** (1 nodes): `AboutScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Phaser Asset Boot Scene`** (1 nodes): `BootScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shared Developer Info`** (2 nodes): `DEVELOPER_INFO`, `DeveloperInfo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Default Configuration Accessor`** (1 nodes): `NOTE: We must explicitly pass the default, accessing it via`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fallback Attribute Handler`** (1 nodes): `NOTE: We must explicitly pass the default, accessing it via`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GameScene` connect `Flappy Bird Game Scene` to `Change Balls Game Infrastructure`, `Phaser Remake Game Scenes`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `Ni` connect `Bootstrap DOM Helpers` to `Bootstrap Bundle Utilities`, `Bootstrap Config Base Class`, `Bootstrap Dropdown Component`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `Ot` connect `Bootstrap Swipe Handler` to `Bootstrap Bundle Utilities`, `Bootstrap Dropdown Component`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `HeatTierInfo`, `HEAT_TIERS`, `config` to the rest of the system?**
  _38 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Bootstrap DOM Helpers` be split into smaller, more focused modules?**
  _Cohesion score 0.05028248587570622 - nodes in this community are weakly interconnected._
- **Should `Flappy Bird Game Scene` be split into smaller, more focused modules?**
  _Cohesion score 0.05819209039548023 - nodes in this community are weakly interconnected._
- **Should `Bootstrap Dropdown Component` be split into smaller, more focused modules?**
  _Cohesion score 0.05957767722473605 - nodes in this community are weakly interconnected._