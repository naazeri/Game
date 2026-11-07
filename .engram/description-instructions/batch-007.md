# Node Description Batch 8 of 15

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

- "lib_gsap_min_tb": "tb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, za()]
- "lib_gsap_min_td": "Td()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Od()]
- "lib_gsap_min_ud": "Ud()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, vd()]
- "lib_gsap_min_vd": "vd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Ud()]
- "lib_gsap_min_ve": "ve()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r()]
- "lib_gsap_min_we": "we()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, xe()]
- "lib_gsap_min_x": "x()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, wb()]
- "lib_gsap_min_xa": "xa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ka()]
- "lib_gsap_min_ya": "ya()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r()]
- "lib_gsap_min_zb": "zb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Ab()]
- "media_capture_capture_ffmpeg": "ffmpeg()" | kind=code-symbol | source=tools/media-capture/capture.mjs:L199 | neighbors=[capture.mjs, capture()]
- "media_capture_capture_mediawidth": "mediaWidth()" | kind=code-symbol | source=tools/media-capture/capture.mjs:L287 | neighbors=[capture.mjs, capture()]
- "media_capture_capture_sleep": "sleep()" | kind=code-symbol | source=tools/media-capture/capture.mjs:L21 | neighbors=[capture.mjs, capture()]
- "objects_ball_ball_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L30 | neighbors=[Ball, .draw()]
- "objects_ball_ball_getheatcolor": ".getHeatColor()" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L147 | neighbors=[Ball, .draw()]
- "objects_ball_ball_stop": ".stop()" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L72 | neighbors=[Ball, .draw()]
- "objects_ball_ball_update": ".update()" | kind=code-symbol | source=apps/ponge/src/objects/Ball.ts:L82 | neighbors=[Ball, .draw()]
- "objects_paddle_paddle_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/objects/Paddle.ts:L20 | neighbors=[Paddle, .draw()]
- "objects_paddle_paddle_reset": ".reset()" | kind=code-symbol | source=apps/ponge/src/objects/Paddle.ts:L142 | neighbors=[Paddle, .draw()]
- "objects_paddle_paddle_setcolor": ".setColor()" | kind=code-symbol | source=apps/ponge/src/objects/Paddle.ts:L30 | neighbors=[Paddle, .draw()]
- "objects_paddle_paddle_update": ".update()" | kind=code-symbol | source=apps/ponge/src/objects/Paddle.ts:L50 | neighbors=[Paddle, .draw()]
- "objects_powerup_powerup_destroy": ".destroy()" | kind=code-symbol | source=apps/ponge/src/objects/PowerUp.ts:L134 | neighbors=[PowerUp, .shatter()]
- "objects_powerup_powerup_startanimations": ".startAnimations()" | kind=code-symbol | source=apps/ponge/src/objects/PowerUp.ts:L75 | neighbors=[PowerUp, .constructor()]
- "scenes_gamescene_gamescene_applysettingschange": ".applySettingsChange()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L178 | neighbors=[GameScene, .drawCourt()]
- "scenes_gamescene_gamescene_createambientglows": ".createAmbientGlows()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L132 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_createbackgroundaesthetics": ".createBackgroundAesthetics()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L113 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_creategameoverui": ".createGameOverUI()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L572 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_createglobalcontrols": ".createGlobalControls()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L340 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_createiconbutton": ".createIconButton()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L232 | neighbors=[GameScene, .createHUD()]
- "scenes_gamescene_gamescene_createingamehud": ".createInGameHUD()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L558 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_createreadyui": ".createReadyUI()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L524 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_createtouchbutton": ".createTouchButton()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L408 | neighbors=[GameScene, .createMobileTouchControls()]
- "scenes_gamescene_gamescene_createtwoplayerdivider": ".createTwoPlayerDivider()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L130 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_cyclebirdskin": ".cycleBirdSkin()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L451 | neighbors=[GameScene, .applyBirdSkin()]
- "scenes_gamescene_gamescene_disttosegment": ".distToSegment()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L556 | neighbors=[GameScene, .checkCollisions()]
- "scenes_gamescene_gamescene_endgame": ".endGame()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L364 | neighbors=[GameScene, .clearPanicTicks()]
- "scenes_gamescene_gamescene_endmatch": ".endMatch()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L883 | neighbors=[GameScene, .handleGoal()]
- "scenes_gamescene_gamescene_handlekeyboardmovement": ".handleKeyboardMovement()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L500 | neighbors=[GameScene, .update()]
- "scenes_gamescene_gamescene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L356 | neighbors=[GameScene, .repositionCoin()]
- "scenes_gamescene_gamescene_hideabout": ".hideAbout()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L335 | neighbors=[GameScene, .showMenu()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-007.json

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
