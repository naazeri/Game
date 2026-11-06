# Node Description Batch 17 of 25

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
- "assets_index_3509133a_y": "y" | kind=code-symbol | source=vega/assets/index-3509133a.js:L1 | neighbors=[index-3509133a.js]
- "assets_index_b4cljeyc_dt": "dt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_gt_constructor": ".constructor()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Gt]
- "assets_index_b4cljeyc_gt_createbutton": ".createButton()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Gt]
- "assets_index_b4cljeyc_gt_handleresize": ".handleResize()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Gt]
- "assets_index_b4cljeyc_gt_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Gt]
- "assets_index_b4cljeyc_it_constructor": ".constructor()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[It]
- "assets_index_b4cljeyc_it_create": ".create()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[It]
- "assets_index_b4cljeyc_it_preload": ".preload()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[It]
- "assets_index_b4cljeyc_nt_constructor": ".constructor()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt]
- "assets_index_b4cljeyc_nt_handlemiss": ".handleMiss()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Nt]
- "assets_index_b4cljeyc_ot": "Ot()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L1 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_rt": "rt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_ut_constructor": ".constructor()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Ut]
- "assets_index_b4cljeyc_ut_create": ".create()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Ut]
- "assets_index_b4cljeyc_ut_createbutton": ".createButton()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Ut]
- "assets_index_b4cljeyc_ut_handleresize": ".handleResize()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Ut]
- "assets_index_b4cljeyc_ut_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[Ut]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-016.json

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
