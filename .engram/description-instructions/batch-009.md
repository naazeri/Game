# Node Description Batch 10 of 15

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

- "ui_gameovermodal_gameovermodal_createnewrecordbadge": ".createNewRecordBadge()" | kind=code-symbol | source=apps/change-balls/src/ui/GameOverModal.ts:L139 | neighbors=[GameOverModal, .createContent()]
- "ui_heartsui_heartsui_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L11 | neighbors=[HeartsUI, .createHearts()]
- "ui_heartsui_heartsui_loselife": ".loseLife()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L112 | neighbors=[HeartsUI, .spawnHeartShatter()]
- "ui_heartsui_heartsui_reset": ".reset()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L144 | neighbors=[HeartsUI, .setLives()]
- "ui_heartsui_heartsui_spawnheartshatter": ".spawnHeartShatter()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L169 | neighbors=[HeartsUI, .loseLife()]
- "ui_heartsui_heartsui_spawnheartsparks": ".spawnHeartSparks()" | kind=code-symbol | source=apps/change-balls/src/ui/HeartsUI.ts:L148 | neighbors=[HeartsUI, .addLife()]
- "ui_helpmodal_helpmodal_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/ui/HelpModal.ts:L10 | neighbors=[HelpModal, .createContent()]
- "ui_helpmodal_helpmodal_createbutton": ".createButton()" | kind=code-symbol | source=apps/ponge/src/ui/HelpModal.ts:L95 | neighbors=[HelpModal, .createContent()]
- "ui_settingsmodal_settingsmodal_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/ui/SettingsModal.ts:L27 | neighbors=[SettingsModal, .createContent()]
- "ui_settingsmodal_settingsmodal_createbutton": ".createButton()" | kind=code-symbol | source=apps/ponge/src/ui/SettingsModal.ts:L246 | neighbors=[SettingsModal, .createContent()]
- "ui_settingsmodal_settingsmodal_createmediumbutton": ".createMediumButton()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L174 | neighbors=[SettingsModal, .createContent()]
- "ui_settingsmodal_settingsmodal_createoptionbutton": ".createOptionButton()" | kind=code-symbol | source=apps/ponge/src/ui/SettingsModal.ts:L200 | neighbors=[SettingsModal, .createContent()]
- "ui_settingsmodal_settingsmodal_createsavebutton": ".createSaveButton()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L209 | neighbors=[SettingsModal, .createContent()]
- "ui_settingsmodal_settingsmodal_createsmallbutton": ".createSmallButton()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L140 | neighbors=[SettingsModal, .createContent()]
- "ui_statsmodal_statsmodal_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L15 | neighbors=[StatsModal, .createContent()]
- "ui_statsmodal_statsmodal_createclosebutton": ".createCloseButton()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L114 | neighbors=[StatsModal, .createContent()]
- "ui_statsmodal_statsmodal_createstatrow": ".createStatRow()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L80 | neighbors=[StatsModal, .createContent()]
- "ui_texthelper_createretroscoretext": "createRetroScoreText()" | kind=code-symbol | source=apps/ponge/src/ui/TextHelper.ts:L23 | neighbors=[GameScene.ts, TextHelper.ts]
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
- "assets_index_3509133a_y": "y" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "audio_audiomanager_audiomanager_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L10 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_getinstance": ".getInstance()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L14 | neighbors=[AudioManager]

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
