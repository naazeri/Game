# Node Description Batch 10 of 25

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

- "lib_gsap_min_kd": "Kd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ee(), Ld()]
- "lib_gsap_min_lb": "lb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r(), Wa()]
- "lib_gsap_min_ob": "ob()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, hb(), r()]
- "lib_gsap_min_od": "Od()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Sd(), Td()]
- "lib_gsap_min_oe": "oe()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), ia()]
- "lib_gsap_min_qa": "qa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween(), wb()]
- "lib_gsap_min_sa": "Sa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Aa(), Ra()]
- "lib_gsap_min_timeline": "Timeline()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _assertThisInitialized(), w()]
- "lib_gsap_min_u": "u()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ac(), ga()]
- "lib_gsap_min_ua": "ua()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween(), wb()]
- "lib_gsap_min_xe": "xe()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), we()]
- "lib_gsap_min_za": "za()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ka(), tb()]
- "scenes_gamescene_gamescene_applybirdskin": ".applyBirdSkin()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L468 | neighbors=[GameScene, .create(), .cycleBirdSkin()]
- "scenes_gamescene_gamescene_clearmobs": ".clearMobs()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L736 | neighbors=[GameScene, .showMenu(), .startCountdown()]
- "scenes_gamescene_gamescene_createaboutmodal": ".createAboutModal()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L277 | neighbors=[GameScene, .create(), .createButton()]
- "scenes_gamescene_gamescene_createbutton": ".createButton()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L240 | neighbors=[GameScene, .createAboutModal(), .createHUD()]
- "scenes_gamescene_gamescene_flap": ".flap()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L276 | neighbors=[GameScene, .handleAction(), .startGame()]
- "scenes_gamescene_gamescene_handleaction": ".handleAction()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L219 | neighbors=[GameScene, .flap(), .startGame()]
- "scenes_gamescene_gamescene_startgame": ".startGame()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L605 | neighbors=[GameScene, .handleAction(), .flap()]
- "scenes_menuscene_menuscene_createtopactionbar": ".createTopActionBar()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L336 | neighbors=[MenuScene, .create(), .createIconAction()]
- "scenes_resultscene_resultscene_create": ".create()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L25 | neighbors=[ResultScene, .createButton(), .playMenuMusic()]
- "src_config_ballcolor": "BallColor" | kind=code-symbol | source=apps/change-balls/src/config.ts:L25 | neighbors=[BallPillar.ts, CentralBall.ts, config.ts]
- "ui_aboutmodal_aboutmodal_createcontent": ".createContent()" | kind=code-symbol | source=apps/change-balls/src/ui/AboutModal.ts:L20 | neighbors=[AboutModal, .constructor(), .createButton()]
- "ui_heartsui": "HeartsUI.ts" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…, GameScene.ts, HeartsUI]
- "ui_heartsui_heartsui_addlife": ".addLife()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L86 | neighbors=[HeartsUI, .drawHeart(), .spawnHeartSparks()]
- "ui_heartsui_heartsui_createhearts": ".createHearts()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L19 | neighbors=[HeartsUI, .constructor(), .drawHeart()]
- "ui_heartsui_heartsui_setlives": ".setLives()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L75 | neighbors=[HeartsUI, .reset(), .drawHeart()]
- "assets_index_3509133a_o": "o()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, r()]
- "assets_index_3509133a_v": "v()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js, r()]
- "assets_index_b4cljeyc_gt_create": ".create()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Gt, .createFullscreenButton()]
- "assets_index_b4cljeyc_gt_createfullscreenbutton": ".createFullscreenButton()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Gt, .create()]
- "assets_index_b4cljeyc_j": "j()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L1 | neighbors=[index-B4CLjEYc.js, k()]
- "assets_index_b4cljeyc_k": "k()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L1 | neighbors=[index-B4CLjEYc.js, j()]
- "assets_index_b4cljeyc_nt_create": ".create()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt, .repositionCoin()]
- "assets_index_b4cljeyc_nt_endgame": ".endGame()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt, .clearPanicTicks()]
- "assets_index_b4cljeyc_nt_handleresize": ".handleResize()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt, .repositionCoin()]
- "assets_index_b4cljeyc_nt_init": ".init()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt, .clearPanicTicks()]
- "assets_index_b4cljeyc_nt_showfloatingtext": ".showFloatingText()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt, .handleCoinHit()]
- "assets_index_b4cljeyc_nt_spawnparticleburst": ".spawnParticleBurst()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt, .handleCoinHit()]
- "assets_index_b4cljeyc_nt_triggerurgentcountdown": ".triggerUrgentCountdown()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt, .clearPanicTicks()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-009.json

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
