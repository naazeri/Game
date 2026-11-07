# Node Description Batch 9 of 15

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

- "scenes_gamescene_gamescene_init": ".init()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L70 | neighbors=[GameScene, .clearPanicTicks()]
- "scenes_gamescene_gamescene_pulsescore": ".pulseScore()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L794 | neighbors=[GameScene, .handleGoal()]
- "scenes_gamescene_gamescene_restartmatch": ".restartMatch()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L896 | neighbors=[GameScene, .resetRound()]
- "scenes_gamescene_gamescene_setupinput": ".setupInput()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L428 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_setupinputs": ".setupInputs()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L275 | neighbors=[GameScene, .create()]
- "scenes_gamescene_gamescene_showcelebrationbanner": ".showCelebrationBanner()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L810 | neighbors=[GameScene, .handleGoal()]
- "scenes_gamescene_gamescene_showfloatingtext": ".showFloatingText()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L313 | neighbors=[GameScene, .handleCoinHit()]
- "scenes_gamescene_gamescene_showrallymilestone": ".showRallyMilestone()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L519 | neighbors=[GameScene, .checkRallyMilestones()]
- "scenes_gamescene_gamescene_spawngameovereffect": ".spawnGameOverEffect()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L494 | neighbors=[GameScene, .handleGameOver()]
- "scenes_gamescene_gamescene_spawngoalshockwave": ".spawnGoalShockwave()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L937 | neighbors=[GameScene, .handleGoal()]
- "scenes_gamescene_gamescene_spawnicedrift": ".spawnIceDrift()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L907 | neighbors=[GameScene, .update()]
- "scenes_gamescene_gamescene_spawnmatchparticles": ".spawnMatchParticles()" | kind=code-symbol | source=apps/change-balls/src/scenes/GameScene.ts:L455 | neighbors=[GameScene, .handlePillarHit()]
- "scenes_gamescene_gamescene_spawnparticleburst": ".spawnParticleBurst()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L282 | neighbors=[GameScene, .handleCoinHit()]
- "scenes_gamescene_gamescene_spawnpowerup": ".spawnPowerUp()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L569 | neighbors=[GameScene, .updatePowerUpManager()]
- "scenes_gamescene_gamescene_startcountdown": ".startCountdown()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L581 | neighbors=[GameScene, .clearMobs()]
- "scenes_gamescene_gamescene_triggernewrecordcelebration": ".triggerNewRecordCelebration()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L397 | neighbors=[GameScene, .updatePipes()]
- "scenes_gamescene_gamescene_triggerurgentcountdown": ".triggerUrgentCountdown()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L140 | neighbors=[GameScene, .clearPanicTicks()]
- "scenes_gamescene_gamescene_updateenvironmentlighting": ".updateEnvironmentLighting()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L361 | neighbors=[GameScene, .updatePipes()]
- "scenes_gamescene_gamescene_updatemobs": ".updateMobs()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L718 | neighbors=[GameScene, .update()]
- "scenes_gamescene_gamescene_updatesparks": ".updateSparks()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L958 | neighbors=[GameScene, .update()]
- "scenes_menuscene_menuscene_createbackgroundeffects": ".createBackgroundEffects()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L209 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createbutton": ".createButton()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L172 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createfullscreenbutton": ".createFullscreenButton()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L104 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createhalfbutton": ".createHalfButton()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L292 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createiconaction": ".createIconAction()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L365 | neighbors=[MenuScene, .createTopActionBar()]
- "scenes_menuscene_menuscene_createlogoemblem": ".createLogoEmblem()" | kind=code-symbol | source=apps/change-balls/src/scenes/MenuScene.ts:L125 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createmenubutton": ".createMenuButton()" | kind=code-symbol | source=apps/ponge/src/scenes/MenuScene.ts:L176 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_createtopcontrols": ".createTopControls()" | kind=code-symbol | source=apps/ponge/src/scenes/MenuScene.ts:L232 | neighbors=[MenuScene, .create()]
- "scenes_menuscene_menuscene_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L82 | neighbors=[MenuScene, .create()]
- "scenes_resultscene_resultscene_createbutton": ".createButton()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L112 | neighbors=[ResultScene, .create()]
- "scenes_resultscene_resultscene_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L146 | neighbors=[ResultScene, .create()]
- "src_config_aibotprofile": "AIBotProfile" | kind=code-symbol | source=apps/ponge/src/config.ts:L56 | neighbors=[AIPaddle.ts, config.ts]
- "src_config_court_config": "COURT_CONFIG" | kind=code-symbol | source=apps/ponge/src/config.ts:L4 | neighbors=[GameScene.ts, config.ts]
- "src_index": "index.ts" | kind=code-symbol | source=packages/shared/src/index.ts:L1 | neighbors=[4042c7c feat(poke): release v2.0.0 rema…, developer.ts]
- "ui_aboutmodal_aboutmodal_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/ui/AboutModal.ts:L11 | neighbors=[AboutModal, .createContent()]
- "ui_aboutmodal_aboutmodal_createbutton": ".createButton()" | kind=code-symbol | source=apps/ponge/src/ui/AboutModal.ts:L114 | neighbors=[AboutModal, .createContent()]
- "ui_bannermanager_bannermanager_processnext": ".processNext()" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L29 | neighbors=[BannerManager, .show()]
- "ui_bannermanager_bannermanager_show": ".show()" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L22 | neighbors=[BannerManager, .processNext()]
- "ui_gameovermodal_gameovermodal_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/ui/GameOverModal.ts:L16 | neighbors=[GameOverModal, .createContent()]
- "ui_gameovermodal_gameovermodal_createbutton": ".createButton()" | kind=code-symbol | source=apps/ponge/src/ui/GameOverModal.ts:L97 | neighbors=[GameOverModal, .createContent()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-008.json

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
