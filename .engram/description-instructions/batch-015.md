# Node Description Batch 16 of 24

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

- "scenes_resultscene_resultscene_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/ResultScene.ts:L146 | neighbors=[ResultScene, .create()]
- "src_index": "index.ts" | kind=code-symbol | source=packages/shared/src/index.ts:L1 | neighbors=[4042c7c feat(poke): release v2.0.0 rema…, developer.ts]
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
- "ui_statsmodal_statsmodal_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L15 | neighbors=[StatsModal, .createContent()]
- "ui_statsmodal_statsmodal_createclosebutton": ".createCloseButton()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L114 | neighbors=[StatsModal, .createContent()]
- "ui_statsmodal_statsmodal_createstatrow": ".createStatRow()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L80 | neighbors=[StatsModal, .createContent()]
- "assets_index_3509133a_a": "A" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_b": "b()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_c": "c" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_f": "f" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_g": "G" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_i_constructor": ".constructor()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[I]
- "assets_index_3509133a_i_draw": ".draw()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[I]
- "assets_index_3509133a_i_update": ".update()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[I]
- "assets_index_3509133a_l": "l" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_p": "p" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_3509133a_q_constructor": ".constructor()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[q]
- "assets_index_3509133a_q_draw": ".draw()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[q]
- "assets_index_3509133a_q_update": ".update()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[q]
- "assets_index_3509133a_s_constructor": ".constructor()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[S]
- "assets_index_3509133a_s_draw": ".draw()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[S]
- "assets_index_3509133a_t_constructor": ".constructor()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[T]
- "assets_index_3509133a_t_draw": ".draw()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[T]
- "assets_index_3509133a_t_update": ".update()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[T]
- "assets_index_3509133a_x": "X()" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]

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
