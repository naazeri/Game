# Node Description Batch 15 of 15

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

- "ui_helpmodal_helpmodal_getvisible": ".getVisible()" | kind=code-symbol | source=apps/ponge/src/ui/HelpModal.ts:L173 | neighbors=[HelpModal]
- "ui_helpmodal_helpmodal_hide": ".hide()" | kind=code-symbol | source=apps/ponge/src/ui/HelpModal.ts:L160 | neighbors=[HelpModal]
- "ui_helpmodal_helpmodal_show": ".show()" | kind=code-symbol | source=apps/ponge/src/ui/HelpModal.ts:L148 | neighbors=[HelpModal]
- "ui_settingsmodal_settingsmodal_getvisible": ".getVisible()" | kind=code-symbol | source=apps/ponge/src/ui/SettingsModal.ts:L311 | neighbors=[SettingsModal]
- "ui_settingsmodal_settingsmodal_hide": ".hide()" | kind=code-symbol | source=apps/ponge/src/ui/SettingsModal.ts:L298 | neighbors=[SettingsModal]
- "ui_settingsmodal_settingsmodal_savesettings": ".saveSettings()" | kind=code-symbol | source=apps/ponge/src/ui/SettingsModal.ts:L277 | neighbors=[SettingsModal]
- "ui_settingsmodal_settingsmodal_show": ".show()" | kind=code-symbol | source=apps/ponge/src/ui/SettingsModal.ts:L286 | neighbors=[SettingsModal]
- "ui_settingsmodal_settingsmodal_updatespeedui": ".updateSpeedUI()" | kind=code-symbol | source=apps/change-balls/src/ui/SettingsModal.ts:L135 | neighbors=[SettingsModal]
- "ui_statsmodal_statsmodal_getvisible": ".getVisible()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L182 | neighbors=[StatsModal]
- "ui_statsmodal_statsmodal_hide": ".hide()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L169 | neighbors=[StatsModal]
- "ui_statsmodal_statsmodal_show": ".show()" | kind=code-symbol | source=apps/change-balls/src/ui/StatsModal.ts:L149 | neighbors=[StatsModal]
- "bola_index_rationale_391": "NOTE: We must explicitly pass the default, accessing it via" | kind=entity | source=bola/index.js:L391
- "poke_index_rationale_391": "NOTE: We must explicitly pass the default, accessing it via" | kind=entity | source=poke/index.js:L391

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
