# Graph Report - .  (2026-11-06)

## Corpus Check
- 146 files · ~122,533 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 634 nodes · 1083 edges · 27 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: calls: 386 · method: 370 · contains: 212 · ON_BRANCH: 32 · PARENT_OF: 31 · MODIFIES: 30 · imports: 11 · imports_from: 11


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 146 · Candidates: 198
- Excluded: 68 untracked · 68978 ignored · 0 sensitive · 13 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `a06c4ec`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `Ni` - 38 edges
2. `GameScene` - 31 edges
3. `Ot` - 28 edges
4. `fe` - 22 edges
5. `Gt` - 21 edges
6. `Ue` - 20 edges
7. `fs` - 18 edges
8. `Ai` - 16 edges
9. `Qi` - 16 edges
10. `Rt` - 15 edges

## Surprising Connections (you probably didn't know these)
- `0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 2 → community 7_
- `Ab()` --calls--> `t()`  [EXTRACTED]
  vega/lib/gsap.min.js → vega/lib/gsap.min.js  _Bridges community 23 → community 20_
- `ac()` --calls--> `t()`  [EXTRACTED]
  vega/lib/gsap.min.js → vega/lib/gsap.min.js  _Bridges community 13 → community 20_
- `be()` --calls--> `ka()`  [EXTRACTED]
  vega/lib/gsap.min.js → vega/lib/gsap.min.js  _Bridges community 21 → community 24_
- `ea()` --calls--> `s()`  [EXTRACTED]
  vega/lib/gsap.min.js → vega/lib/gsap.min.js  _Bridges community 21 → community 13_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (3): Ai, Mi, Ni

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (4): gi, Ne, Se, Ue

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (16): 0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite, 385e2de fix(hit-the-coin): prevent duplicate bgm_menu on return from result scene and ensure loop, c3fedc4 feat(flappy-bird): release v1.2.0 enhanced remake with custom characters, audio, and visual polish, fdf34ba feat: rebuild Hit The Coin with Phaser 3 and setup GitHub Actions Pages deployment, AboutScene, BootScene, GameState, PipePair (+8 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (12): ee(), Kd(), la(), Ld(), ma(), na(), Od(), Q() (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (2): at, Ot

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (2): fe, W

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (7): at, Gt, It, Nt, st(), tt(), Ut

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (29): main, 07c6be3 add change balls v1.2.1, 1270fdf change text and hover color, 19f781f add bola game, 37be431 add ponge v1.1.3, 41bf5e3 add bola, flappy, hit the coin images, 5327790 add deadzone to flappy bird sky, 5e62a51 update change-balls to version 1.3.0 (+21 more)

### Community 8 - "Community 8"
Cohesion: 0.09
Nodes (12): D(), F(), I(), J, L(), M(), N(), O() (+4 more)

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (10): dt, Gt, It, j(), k(), rt, Ut, Vt (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (1): GameScene

### Community 11 - "Community 11"
Cohesion: 0.08
Nodes (14): A, c, f, G, I, l, o(), p (+6 more)

### Community 12 - "Community 12"
Cohesion: 0.26
Nodes (21): a(), b(), c(), d(), e(), f(), g(), h() (+13 more)

### Community 13 - "Community 13"
Cohesion: 0.14
Nodes (20): _a(), ac(), Bo(), db(), eb(), ga(), gb(), hb() (+12 more)

### Community 14 - "Community 14"
Cohesion: 0.17
Nodes (2): e(), Qi

### Community 15 - "Community 15"
Cohesion: 0.24
Nodes (1): fs

### Community 16 - "Community 16"
Cohesion: 0.22
Nodes (1): Rt

### Community 17 - "Community 17"
Cohesion: 0.22
Nodes (1): we

### Community 18 - "Community 18"
Cohesion: 0.21
Nodes (1): Os

### Community 19 - "Community 19"
Cohesion: 0.27
Nodes (1): Nt

### Community 20 - "Community 20"
Cohesion: 0.21
Nodes (13): _assertThisInitialized(), Ec(), Fc(), gc(), qa(), t(), Timeline(), Tween() (+5 more)

### Community 21 - "Community 21"
Cohesion: 0.19
Nodes (13): be(), _d(), ea(), fa(), ia(), ie(), je(), ke() (+5 more)

### Community 22 - "Community 22"
Cohesion: 0.28
Nodes (9): Aa(), Animation(), ha(), ja(), Jc(), Lc(), Ra(), Sa() (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (7): Ab(), Bb(), cb(), Context(), Ew(), fb(), zb()

### Community 24 - "Community 24"
Cohesion: 0.50
Nodes (4): ka(), tb(), xa(), za()

### Community 25 - "Community 25"
Cohesion: 1.00
Nodes (1): NOTE: We must explicitly pass the default, accessing it via

### Community 26 - "Community 26"
Cohesion: 1.00
Nodes (1): NOTE: We must explicitly pass the default, accessing it via

## Knowledge Gaps
- **23 isolated node(s):** `Window`, `phaserConfig`, `game`, `GameState`, `PipePair` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 4`** (2 nodes): `at`, `Ot`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (2 nodes): `fe`, `W`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (1 nodes): `GameScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (2 nodes): `e()`, `Qi`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (1 nodes): `fs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (1 nodes): `Rt`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (1 nodes): `we`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (1 nodes): `Os`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (1 nodes): `Nt`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `NOTE: We must explicitly pass the default, accessing it via`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (1 nodes): `NOTE: We must explicitly pass the default, accessing it via`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Ni` connect `Community 0` to `Community 8`, `Community 5`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `GameScene` connect `Community 10` to `Community 2`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `Ot` connect `Community 4` to `Community 8`, `Community 5`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `Window`, `phaserConfig`, `game` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05028248587570622 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05568627450980392 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09175377468060394 - nodes in this community are weakly interconnected._