# Node Description Batch 15 of 24

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

- "lib_gsap_min_we": "we()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, xe()]
- "lib_gsap_min_x": "x()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, wb()]
- "lib_gsap_min_xa": "xa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ka()]
- "lib_gsap_min_ya": "ya()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r()]
- "lib_gsap_min_zb": "zb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Ab()]
- "scenes_gamescene_gamescene_createambientglows": ".createAmbientGlows()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L132 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_createbackgroundaesthetics": ".createBackgroundAesthetics()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L113 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_creategameoverui": ".createGameOverUI()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L572 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_createglobalcontrols": ".createGlobalControls()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L340 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_createiconbutton": ".createIconButton()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L232 | neighbors=[GameScene, .createHUD()]
- "scenes_gamescene_gamescene_createingamehud": ".createInGameHUD()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L558 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_createreadyui": ".createReadyUI()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L524 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_createtwoplayerdivider": ".createTwoPlayerDivider()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L130 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_cyclebirdskin": ".cycleBirdSkin()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L451 | neighbors=[GameScene, .applyBirdSkin()]
- "scenes_gamescene_gamescene_disttosegment": ".distToSegment()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L556 | neighbors=[GameScene, .checkCollisions()]
- "scenes_gamescene_gamescene_endgame": ".endGame()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L364 | neighbors=[GameScene, .clearPanicTicks()]
- "scenes_gamescene_gamescene_handlekeyboardmovement": ".handleKeyboardMovement()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L500 | neighbors=[GameScene, .update()]
- "scenes_gamescene_gamescene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L356 | neighbors=[GameScene, .repositionCoin()]
- "scenes_gamescene_gamescene_hideabout": ".hideAbout()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L335 | neighbors=[GameScene, .showMenu()]
- "scenes_gamescene_gamescene_init": ".init()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L26 | neighbors=[GameScene, .clearPanicTicks()]
- "scenes_gamescene_gamescene_setupinput": ".setupInput()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L428 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_setupinputs": ".setupInputs()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L275 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_showfloatingtext": ".showFloatingText()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L313 | neighbors=[GameScene, .handleCoinHit()]
- "scenes_gamescene_gamescene_spawngameovereffect": ".spawnGameOverEffect()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L494 | neighbors=[GameScene, .handleGameOver()]
- "scenes_gamescene_gamescene_spawnmatchparticles": ".spawnMatchParticles()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L455 | neighbors=[GameScene, .handlePillarHit()]
- "scenes_gamescene_gamescene_spawnparticleburst": ".spawnParticleBurst()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L282 | neighbors=[GameScene, .handleCoinHit()]
- "scenes_gamescene_gamescene_startcountdown": ".startCountdown()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L581 | neighbors=[GameScene, .clearMobs()]
- "scenes_gamescene_gamescene_triggernewrecordcelebration": ".triggerNewRecordCelebration()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L397 | neighbors=[GameScene, .updatePipes()]
- "scenes_gamescene_gamescene_triggerurgentcountdown": ".triggerUrgentCountdown()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L140 | neighbors=[GameScene, .clearPanicTicks()]
- "scenes_gamescene_gamescene_updateenvironmentlighting": ".updateEnvironmentLighting()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L361 | neighbors=[GameScene, .updatePipes()]
- "scenes_gamescene_gamescene_updatemobs": ".updateMobs()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L718 | neighbors=[GameScene, .update()]
- "scenes_menuscene_menuscene_createbackgroundeffects": ".createBackgroundEffects()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L209 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createbutton": ".createButton()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L172 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createfullscreenbutton": ".createFullscreenButton()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L104 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createhalfbutton": ".createHalfButton()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L292 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createiconaction": ".createIconAction()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L365 | neighbors=[MenuScene, .createTopActionBar()]
- "scenes_menuscene_menuscene_createlogoemblem": ".createLogoEmblem()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L125 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createmenubutton": ".createMenuButton()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L239 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L82 | neighbors=[MenuScene, .create()]
- "scenes_resultscene_resultscene_createbutton": ".createButton()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L112 | neighbors=[ResultScene, .create()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-014.json

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
