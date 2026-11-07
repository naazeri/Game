# Graph Report - .  (2026-11-07)

## Corpus Check
- 241 files · ~245,287 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 949 nodes · 1630 edges · 55 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: method: 634 · calls: 536 · contains: 244 · MODIFIES: 54 · imports: 47 · imports_from: 44 · ON_BRANCH: 36 · PARENT_OF: 35


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 241 · Candidates: 298
- Excluded: 44 untracked · 79450 ignored · 0 sensitive · 16 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `37acf29`
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
  git → git  _Bridges community 11 → community 8_
- `4042c7c feat(poke): release v2.0.0 remake with phaser 3, typescript and shared metadata` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 45 → community 8_
- `66591ee chore(titles): clean game titles and set portal title to Game - nazeriland` --PARENT_OF--> `bb72e0b feat(change-balls): release v2.0.0 remake with phaser 3, typescript, energy nodes, audio and shared metadata`  [EXTRACTED]
  git → git  _Bridges community 8 → community 15_
- `Ab()` --calls--> `t()`  [EXTRACTED]
  vega/lib/gsap.min.js → vega/lib/gsap.min.js  _Bridges community 43 → community 27_
- `ac()` --calls--> `t()`  [EXTRACTED]
  vega/lib/gsap.min.js → vega/lib/gsap.min.js  _Bridges community 14 → community 27_

## Communities

### Community 0 - "Bootstrap DOM Helpers"
Cohesion: 0.05
Nodes (3): Ai, Mi, Ni

### Community 1 - "Flappy Bird Game Scene"
Cohesion: 0.06
Nodes (1): GameScene

### Community 2 - "Bootstrap Dropdown Component"
Cohesion: 0.06
Nodes (4): gi, Ne, Se, Ue

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
Nodes (31): main, 07c6be3 add change balls v1.2.1, 1270fdf change text and hover color, 19f781f add bola game, 37acf29 chore(engram): update knowledge graph and community labels after change-balls release, 37be431 add ponge v1.1.3, 41bf5e3 add bola, flappy, hit the coin images, 5327790 add deadzone to flappy bird sky (+23 more)

### Community 9 - "Hit The Coin Storage Build"
Cohesion: 0.12
Nodes (3): Ct, fe, he

### Community 10 - "Classic Ponge Canvas Loop"
Cohesion: 0.08
Nodes (14): A, c, f, G, I, l, o(), p (+6 more)

### Community 11 - "Unity WebGL Engine Loader"
Cohesion: 0.17
Nodes (14): 0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite, 385e2de fix(hit-the-coin): prevent duplicate bgm_menu on return from result scene and ensure loop, c3fedc4 feat(flappy-bird): release v1.2.0 enhanced remake with custom characters, audio, and visual polish, fdf34ba feat: rebuild Hit The Coin with Phaser 3 and setup GitHub Actions Pages deployment, HEAT_TIERS, HeatTierInfo, ResultData, BallColor (+6 more)

### Community 12 - "Phaser Remake Game Scenes"
Cohesion: 0.12
Nodes (1): fe

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
Cohesion: 0.11
Nodes (2): J, W

### Community 17 - "Bootstrap Modal Component"
Cohesion: 0.15
Nodes (2): ae, le

### Community 18 - "Bootstrap ScrollSpy Component"
Cohesion: 0.24
Nodes (1): fs

### Community 19 - "Bootstrap Collapse Component"
Cohesion: 0.18
Nodes (2): e(), Qi

### Community 20 - "Change Balls Menu Scene"
Cohesion: 0.22
Nodes (1): Rt

### Community 21 - "Change Balls Game Scene"
Cohesion: 0.22
Nodes (1): MenuScene

### Community 22 - "Local Storage Score Manager"
Cohesion: 0.22
Nodes (1): ce

### Community 23 - "Change Balls Central Ball"
Cohesion: 0.31
Nodes (1): StorageManager

### Community 24 - "Bootstrap Backdrop Component"
Cohesion: 0.22
Nodes (2): CentralBall, getHeatTierForScore()

### Community 25 - "Bootstrap Toast Component"
Cohesion: 0.22
Nodes (1): we

### Community 26 - "GreenSock Timeline Tween Core"
Cohesion: 0.21
Nodes (1): Os

### Community 27 - "Minified UI Animations"
Cohesion: 0.21
Nodes (13): _assertThisInitialized(), Ec(), Fc(), gc(), qa(), t(), Timeline(), Tween() (+5 more)

### Community 28 - "Settings Speed Controls Build"
Cohesion: 0.19
Nodes (13): be(), _d(), ea(), fa(), ia(), ie(), je(), ke() (+5 more)

### Community 29 - "Bootstrap Scrollbar Manipulator"
Cohesion: 0.23
Nodes (1): oe

### Community 30 - "Bootstrap Dialog Modal"
Cohesion: 0.30
Nodes (9): D(), F(), I(), L(), M(), N(), O(), P() (+1 more)

### Community 31 - "Bootstrap Bundle Utilities"
Cohesion: 0.31
Nodes (2): Nt(), ue

### Community 32 - "Dynamic Central Ball State"
Cohesion: 0.20
Nodes (7): at, Et, H(), It, pe, Q(), Zt

### Community 33 - "Hit The Coin Bundle Runtime"
Cohesion: 0.31
Nodes (1): HeartsUI

### Community 34 - "Energy Hearts UI Component"
Cohesion: 0.36
Nodes (1): de

### Community 35 - "Energy Hearts Minified Logic"
Cohesion: 0.22
Nodes (1): q

### Community 36 - "Bootstrap Config Base Class"
Cohesion: 0.29
Nodes (1): SettingsModal

### Community 38 - "Collision and Game Over Handling"
Cohesion: 0.28
Nodes (9): Aa(), Animation(), ha(), ja(), Jc(), Lc(), Ra(), Sa() (+1 more)

### Community 39 - "Bootstrap Focus Trap"
Cohesion: 0.36
Nodes (1): Kt

### Community 40 - "Sprite Animation Curves"
Cohesion: 0.32
Nodes (1): BallPillar

### Community 41 - "Ball Pillar Minified Renderer"
Cohesion: 0.36
Nodes (1): GameOverModal

### Community 42 - "Change Balls Rotating Pillar"
Cohesion: 0.36
Nodes (1): StatsModal

### Community 43 - "Change Balls Game Over Modal"
Cohesion: 0.29
Nodes (7): Ab(), Bb(), cb(), Context(), Ew(), fb(), zb()

### Community 44 - "Game Statistics Modal"
Cohesion: 0.38
Nodes (1): AboutModal

### Community 45 - "Canvas Rendering Context Helpers"
Cohesion: 0.40
Nodes (3): 4042c7c feat(poke): release v2.0.0 remake with phaser 3, typescript and shared metadata, DEVELOPER_INFO, DeveloperInfo

### Community 46 - "Change Balls About Modal"
Cohesion: 0.47
Nodes (1): ResultScene

### Community 47 - "Ball Types and Heat Tiers"
Cohesion: 0.40
Nodes (1): ne

### Community 48 - "Hit The Coin Result Scene"
Cohesion: 0.40
Nodes (1): U

### Community 49 - "Phaser Preload Initialization"
Cohesion: 0.50
Nodes (1): BannerManager

### Community 50 - "Bootstrap Alert Dismiss Handler"
Cohesion: 0.67
Nodes (1): ve

### Community 51 - "Floating Banner Manager"
Cohesion: 0.50
Nodes (4): ka(), tb(), xa(), za()

### Community 52 - "Floating Banner Minified Controller"
Cohesion: 0.50
Nodes (1): AboutScene

### Community 53 - "Bootstrap Button State Toggle"
Cohesion: 0.50
Nodes (1): BootScene

### Community 54 - "Canvas Vector Math Utilities"
Cohesion: 1.00
Nodes (1): NOTE: We must explicitly pass the default, accessing it via

### Community 55 - "Game About Scene"
Cohesion: 1.00
Nodes (1): NOTE: We must explicitly pass the default, accessing it via

## Knowledge Gaps
- **38 isolated node(s):** `HeatTierInfo`, `HEAT_TIERS`, `config`, `BannerOptions`, `Window` (+33 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Flappy Bird Game Scene`** (1 nodes): `GameScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Swipe Handler`** (2 nodes): `at`, `Ot`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Phaser Remake Game Scenes`** (1 nodes): `fe`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Audio Manager Service`** (1 nodes): `AudioManager`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Modals Build`** (2 nodes): `J`, `W`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Modal Component`** (2 nodes): `ae`, `le`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap ScrollSpy Component`** (1 nodes): `fs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Collapse Component`** (2 nodes): `e()`, `Qi`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Menu Scene`** (1 nodes): `Rt`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Game Scene`** (1 nodes): `MenuScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Local Storage Score Manager`** (1 nodes): `ce`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Central Ball`** (1 nodes): `StorageManager`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Backdrop Component`** (2 nodes): `CentralBall`, `getHeatTierForScore()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Toast Component`** (1 nodes): `we`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `GreenSock Timeline Tween Core`** (1 nodes): `Os`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Scrollbar Manipulator`** (1 nodes): `oe`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Bundle Utilities`** (2 nodes): `Nt()`, `ue`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hit The Coin Bundle Runtime`** (1 nodes): `HeartsUI`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Energy Hearts UI Component`** (1 nodes): `de`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Energy Hearts Minified Logic`** (1 nodes): `q`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Config Base Class`** (1 nodes): `SettingsModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Focus Trap`** (1 nodes): `Kt`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sprite Animation Curves`** (1 nodes): `BallPillar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Ball Pillar Minified Renderer`** (1 nodes): `GameOverModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls Rotating Pillar`** (1 nodes): `StatsModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game Statistics Modal`** (1 nodes): `AboutModal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Change Balls About Modal`** (1 nodes): `ResultScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Ball Types and Heat Tiers`** (1 nodes): `ne`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hit The Coin Result Scene`** (1 nodes): `U`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Phaser Preload Initialization`** (1 nodes): `BannerManager`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Alert Dismiss Handler`** (1 nodes): `ve`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Floating Banner Minified Controller`** (1 nodes): `AboutScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bootstrap Button State Toggle`** (1 nodes): `BootScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Canvas Vector Math Utilities`** (1 nodes): `NOTE: We must explicitly pass the default, accessing it via`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game About Scene`** (1 nodes): `NOTE: We must explicitly pass the default, accessing it via`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GameScene` connect `Flappy Bird Game Scene` to `Change Balls Game Infrastructure`, `Unity WebGL Engine Loader`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `Ni` connect `Bootstrap DOM Helpers` to `Bootstrap Dialog Modal`, `Energy Hearts Minified Logic`, `Change Balls Modals Build`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `Ot` connect `Bootstrap Swipe Handler` to `Bootstrap Dialog Modal`, `Change Balls Modals Build`, `Phaser Remake Game Scenes`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `HeatTierInfo`, `HEAT_TIERS`, `config` to the rest of the system?**
  _38 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Bootstrap DOM Helpers` be split into smaller, more focused modules?**
  _Cohesion score 0.05028248587570622 - nodes in this community are weakly interconnected._
- **Should `Flappy Bird Game Scene` be split into smaller, more focused modules?**
  _Cohesion score 0.05819209039548023 - nodes in this community are weakly interconnected._
- **Should `Bootstrap Dropdown Component` be split into smaller, more focused modules?**
  _Cohesion score 0.05568627450980392 - nodes in this community are weakly interconnected._