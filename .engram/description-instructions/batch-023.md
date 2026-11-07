# Node Description Batch 24 of 24

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "scenes_resultscene_resultdata": "ResultData" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L4 | neighbors=[ResultScene.ts]
- "scenes_resultscene_resultscene_constructor": ".constructor()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L21 | neighbors=[ResultScene]
- "scenes_resultscene_resultscene_handleresize": ".handleResize()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L98 | neighbors=[ResultScene]
- "src_developer_developer_info": "DEVELOPER_INFO" | kind=code-symbol | source=packages/shared/src/developer.ts:L10 | neighbors=[developer.ts]
- "src_developer_developerinfo": "DeveloperInfo" | kind=code-symbol | source=packages/shared/src/developer.ts:L1 | neighbors=[developer.ts]
- "src_main_config": "config" | kind=code-symbol | source=apps/hit-the-coin/src/main.ts:L9 | neighbors=[main.ts]
- "src_main_game": "game" | kind=code-symbol | source=apps/poke/src/main.ts:L28 | neighbors=[main.ts]
- "src_main_phaserconfig": "phaserConfig" | kind=code-symbol | source=apps/poke/src/main.ts:L6 | neighbors=[main.ts]
- "src_main_startgame": "startGame()" | kind=code-symbol | source=apps/change-balls/src/main.ts:L35 | neighbors=[main.ts]
- "src_main_window": "Window" | kind=code-symbol | source=apps/flappy-bird/src/main.ts:L7 | neighbors=[main.ts]
- "ui_aboutmodal_aboutmodal_getvisible": ".getVisible()" | kind=code-symbol | source=apps/change-balls/src/ui/AboutModal.ts:L194 | neighbors=[AboutModal]
- "ui_aboutmodal_aboutmodal_hide": ".hide()" | kind=code-symbol | source=apps/change-balls/src/ui/AboutModal.ts:L181 | neighbors=[AboutModal]
- "ui_aboutmodal_aboutmodal_show": ".show()" | kind=code-symbol | source=apps/change-balls/src/ui/AboutModal.ts:L169 | neighbors=[AboutModal]
- "ui_bannermanager_bannermanager_clear": ".clear()" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L115 | neighbors=[BannerManager]
- "ui_bannermanager_bannermanager_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L18 | neighbors=[BannerManager]
- "ui_bannermanager_banneroptions": "BannerOptions" | kind=code-symbol | source=apps/change-balls/src/ui/BannerManager.ts:L5 | neighbors=[BannerManager.ts]
- "ui_gameovermodal_gameovermodal_getvisible": ".getVisible()" | kind=code-symbol | source=apps/change-balls/src/ui/GameOverModal.ts:L245 | neighbors=[GameOverModal]
- "ui_gameovermodal_gameovermodal_hide": ".hide()" | kind=code-symbol | source=apps/change-balls/src/ui/GameOverModal.ts:L231 | neighbors=[GameOverModal]
- "ui_gameovermodal_gameovermodal_show": ".show()" | kind=code-symbol | source=apps/change-balls/src/ui/GameOverModal.ts:L210 | neighbors=[GameOverModal]
- "ui_heartsui_heartsui_getlives": ".getLives()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L140 | neighbors=[HeartsUI]
- "ui_settingsmodal_settingsmodal_getvisible": ".getVisible()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L276 | neighbors=[SettingsModal]
- "ui_settingsmodal_settingsmodal_hide": ".hide()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L263 | neighbors=[SettingsModal]
- "ui_settingsmodal_settingsmodal_show": ".show()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L246 | neighbors=[SettingsModal]
- "ui_settingsmodal_settingsmodal_updatespeedui": ".updateSpeedUI()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L135 | neighbors=[SettingsModal]
- "ui_statsmodal_statsmodal_getvisible": ".getVisible()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L182 | neighbors=[StatsModal]
- "ui_statsmodal_statsmodal_hide": ".hide()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L169 | neighbors=[StatsModal]
- "ui_statsmodal_statsmodal_show": ".show()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L149 | neighbors=[StatsModal]
- "bola_index_rationale_391": "NOTE: We must explicitly pass the default, accessing it via" | kind=entity | source=bola/index.js:L391
- "poke_index_rationale_391": "NOTE: We must explicitly pass the default, accessing it via" | kind=entity | source=poke/index.js:L391

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-023.json

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
