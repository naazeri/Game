# Node Description Batch 17 of 24

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
- "assets_index_b4cljeyc_vt": "Vt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_wt": "wt()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L1 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_xt": "Xt" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[index-B4CLjEYc.js]
- "assets_index_b4cljeyc_zt_constructor": ".constructor()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[zt]
- "assets_index_b4cljeyc_zt_create": ".create()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[zt]
- "assets_index_b4cljeyc_zt_handleresize": ".handleResize()" | kind=code-symbol | source=hit-the-coin/assets/index-B4CLjEYc.js:L6360 | neighbors=[zt]
- "assets_index_ctaeemyb_ae_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ae]
- "assets_index_ctaeemyb_ae_createbutton": ".createButton()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ae]
- "assets_index_ctaeemyb_ae_createcontent": ".createContent()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ae]
- "assets_index_ctaeemyb_ae_getvisible": ".getVisible()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ae]
- "assets_index_ctaeemyb_ae_hide": ".hide()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ae]
- "assets_index_ctaeemyb_ae_show": ".show()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ae]
- "assets_index_ctaeemyb_at": "at" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js]
- "assets_index_ctaeemyb_ce_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce]
- "assets_index_ctaeemyb_ce_returntomenu": ".returnToMenu()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce]
- "assets_index_ctaeemyb_ce_togglefullscreen": ".toggleFullscreen()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce]
- "assets_index_ctaeemyb_et": "Et" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js]
- "assets_index_ctaeemyb_fe_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[fe]
- "assets_index_ctaeemyb_fe_createbutton": ".createButton()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[fe]
- "assets_index_ctaeemyb_fe_getvisible": ".getVisible()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[fe]
- "assets_index_ctaeemyb_fe_hide": ".hide()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[fe]
- "assets_index_ctaeemyb_he_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[he]

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
