# Node Description Batch 18 of 24

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

- "assets_index_ctaeemyb_he_getvisible": ".getVisible()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[he]
- "assets_index_ctaeemyb_he_hide": ".hide()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[he]
- "assets_index_ctaeemyb_it": "It" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js]
- "assets_index_ctaeemyb_jt": "jt()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L1 | neighbors=[index-CTAEEmYb.js]
- "assets_index_ctaeemyb_kt_getactiveballworldposition": ".getActiveBallWorldPosition()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Kt]
- "assets_index_ctaeemyb_kt_reset": ".reset()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Kt]
- "assets_index_ctaeemyb_le_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[le]
- "assets_index_ctaeemyb_le_startgame": ".startGame()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[le]
- "assets_index_ctaeemyb_le_togglefullscreen": ".toggleFullscreen()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[le]
- "assets_index_ctaeemyb_ne_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ne]
- "assets_index_ctaeemyb_ne_preload": ".preload()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ne]
- "assets_index_ctaeemyb_oe_getvisible": ".getVisible()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[oe]
- "assets_index_ctaeemyb_oe_hide": ".hide()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[oe]
- "assets_index_ctaeemyb_oe_updatespeedui": ".updateSpeedUI()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[oe]
- "assets_index_ctaeemyb_pe": "pe" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js]
- "assets_index_ctaeemyb_qt": "qt()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L1 | neighbors=[index-CTAEEmYb.js]
- "assets_index_ctaeemyb_ue_gety": ".getY()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ue]
- "assets_index_ctaeemyb_ue_startmoving": ".startMoving()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ue]
- "assets_index_ctaeemyb_ut": "Ut()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js]
- "assets_index_ctaeemyb_ve_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ve]
- "assets_index_ctaeemyb_zt": "Zt" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[index-CTAEEmYb.js]
- "assets_index_d2py_agh_bt": "Bt()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L1 | neighbors=[index-D2py_AGH.js]
- "assets_index_d2py_agh_dt": "Dt()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L1 | neighbors=[index-D2py_AGH.js]
- "assets_index_d2py_agh_gt_constructor": ".constructor()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Gt]
- "assets_index_d2py_agh_gt_create": ".create()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Gt]
- "assets_index_d2py_agh_gt_preload": ".preload()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Gt]
- "assets_index_d2py_agh_nt_constructor": ".constructor()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt]
- "assets_index_d2py_agh_nt_incrementscore": ".incrementScore()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt]
- "assets_index_d2py_agh_nt_showabout": ".showAbout()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt]
- "assets_index_d2py_agh_nt_spawndogmob": ".spawnDogMob()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt]
- "assets_index_d2py_agh_nt_startgame": ".startGame()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt]
- "assets_index_d2py_agh_pt": "pt" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[index-D2py_AGH.js]
- "assets_index_d2py_agh_rt": "Rt" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[index-D2py_AGH.js]
- "assets_index_d2py_agh_ut": "ut" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[index-D2py_AGH.js]
- "assets_index_d2py_agh_xt": "Xt" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[index-D2py_AGH.js]
- "assets_index_ufwfauyg_at": "at" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[index-UfWfaUyg.js]
- "assets_index_ufwfauyg_gt_constructor": ".constructor()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt]
- "assets_index_ufwfauyg_gt_handlehit": ".handleHit()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt]
- "assets_index_ufwfauyg_gt_handleresize": ".handleResize()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt]
- "assets_index_ufwfauyg_gt_restartgame": ".restartGame()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-017.json

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
