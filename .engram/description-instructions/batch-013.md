# Node Description Batch 14 of 16

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

- "js_bootstrap_min_ni_update": ".update()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni]
- "js_bootstrap_min_os_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os]
- "js_bootstrap_min_os_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os]
- "js_bootstrap_min_os_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os]
- "js_bootstrap_min_os_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os]
- "js_bootstrap_min_os_setlisteners": "._setListeners()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os]
- "js_bootstrap_min_ot_configaftermerge": "._configAfterMerge()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot]
- "js_bootstrap_min_ot_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot]
- "js_bootstrap_min_ot_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot]
- "js_bootstrap_min_ot_dispose": ".dispose()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot]
- "js_bootstrap_min_ot_isanimated": "._isAnimated()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot]
- "js_bootstrap_min_ot_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot]
- "js_bootstrap_min_ot_nextwhenvisible": ".nextWhenVisible()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot]
- "js_bootstrap_min_ot_ordertodirection": "._orderToDirection()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot]
- "js_bootstrap_min_q_configaftermerge": "._configAfterMerge()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[q]
- "js_bootstrap_min_q_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[q]
- "js_bootstrap_min_q_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[q]
- "js_bootstrap_min_q_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[q]
- "js_bootstrap_min_q_typecheckconfig": "._typeCheckConfig()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[q]
- "js_bootstrap_min_qi_configaftermerge": "._configAfterMerge()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi]
- "js_bootstrap_min_qi_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi]
- "js_bootstrap_min_qi_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi]
- "js_bootstrap_min_qi_dispose": ".dispose()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi]
- "js_bootstrap_min_qi_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi]
- "js_bootstrap_min_rt_configaftermerge": "._configAfterMerge()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt]
- "js_bootstrap_min_rt_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt]
- "js_bootstrap_min_rt_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt]
- "js_bootstrap_min_rt_isshown": "._isShown()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt]
- "js_bootstrap_min_rt_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt]
- "js_bootstrap_min_rt_toggle": ".toggle()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt]
- "js_bootstrap_min_se_activate": ".activate()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Se]
- "js_bootstrap_min_se_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Se]
- "js_bootstrap_min_se_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Se]
- "js_bootstrap_min_se_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Se]
- "js_bootstrap_min_se_handlefocusin": "._handleFocusin()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Se]
- "js_bootstrap_min_se_handlekeydown": "._handleKeydown()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Se]
- "js_bootstrap_min_se_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Se]
- "js_bootstrap_min_u_destroyelement": "._destroyElement()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[U]
- "js_bootstrap_min_u_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[U]
- "js_bootstrap_min_ue_addeventlisteners": "._addEventListeners()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-013.json

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
