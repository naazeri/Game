# Node Description Batch 16 of 25

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
- "scenes_resultscene_resultscene_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L146 | neighbors=[ResultScene, .create()]
- "src_index": "index.ts" | kind=code-symbol | source=packages/shared/src/index.ts:L1 | neighbors=[4042c7c feat(poke): release v2.0.0 rema…, developer.ts]
- "templatedata_unityprogress": "UnityProgress.js" | kind=code-symbol | source=ponge/TemplateData/UnityProgress.js:L1 | neighbors=[37be431 add ponge v1.1.3, UnityProgress()]
- "ui_aboutmodal_aboutmodal_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/ui/AboutModal.ts:L11 | neighbors=[AboutModal, .createContent()]
- "ui_aboutmodal_aboutmodal_createbutton": ".createButton()" | kind=code-symbol | source=apps/change-balls/src/ui/AboutModal.ts:L114 | neighbors=[AboutModal, .createContent()]
- "ui_bannermanager_bannermanager_processnext": ".processNext()" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L29 | neighbors=[BannerManager, .show()]
- "ui_bannermanager_bannermanager_show": ".show()" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L22 | neighbors=[BannerManager, .processNext()]
- "ui_gameovermodal_gameovermodal_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/ui/GameOverModal.ts:L19 | neighbors=[GameOverModal, .createContent()]
- "ui_gameovermodal_gameovermodal_createbutton": ".createButton()" | kind=code-symbol | source=apps/change-balls/src/ui/GameOverModal.ts:L171 | neighbors=[GameOverModal, .createContent()]
- "ui_gameovermodal_gameovermodal_createnewrecordbadge": ".createNewRecordBadge()" | kind=code-symbol | source=apps/change-balls/src/ui/GameOverModal.ts:L139 | neighbors=[GameOverModal, .createContent()]
- "ui_heartsui_heartsui_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L11 | neighbors=[HeartsUI, .createHearts()]
- "ui_heartsui_heartsui_loselife": ".loseLife()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L112 | neighbors=[HeartsUI, .spawnHeartShatter()]
- "ui_heartsui_heartsui_reset": ".reset()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L144 | neighbors=[HeartsUI, .setLives()]
- "ui_heartsui_heartsui_spawnheartshatter": ".spawnHeartShatter()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L169 | neighbors=[HeartsUI, .loseLife()]
- "ui_heartsui_heartsui_spawnheartsparks": ".spawnHeartSparks()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L148 | neighbors=[HeartsUI, .addLife()]
- "ui_settingsmodal_settingsmodal_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L18 | neighbors=[SettingsModal, .createContent()]
- "ui_settingsmodal_settingsmodal_createmediumbutton": ".createMediumButton()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L174 | neighbors=[SettingsModal, .createContent()]
- "ui_settingsmodal_settingsmodal_createsavebutton": ".createSaveButton()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L209 | neighbors=[SettingsModal, .createContent()]
- "ui_settingsmodal_settingsmodal_createsmallbutton": ".createSmallButton()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L140 | neighbors=[SettingsModal, .createContent()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-015.json

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
