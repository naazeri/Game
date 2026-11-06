# Node Description Batch 15 of 16

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

- "js_bootstrap_min_ue_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue]
- "js_bootstrap_min_ue_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue]
- "js_bootstrap_min_ue_hidemodal": "._hideModal()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue]
- "js_bootstrap_min_ue_isanimated": "._isAnimated()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue]
- "js_bootstrap_min_ue_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue]
- "js_bootstrap_min_ue_resetadjustments": "._resetAdjustments()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue]
- "js_bootstrap_min_ue_toggle": ".toggle()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue]
- "js_bootstrap_min_w_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[W]
- "js_bootstrap_min_w_data_key": ".DATA_KEY()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[W]
- "js_bootstrap_min_w_dispose": ".dispose()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[W]
- "js_bootstrap_min_w_event_key": ".EVENT_KEY()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[W]
- "js_bootstrap_min_w_version": ".VERSION()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[W]
- "js_bootstrap_min_we_configaftermerge": "._configAfterMerge()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we]
- "js_bootstrap_min_we_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we]
- "js_bootstrap_min_we_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we]
- "js_bootstrap_min_we_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we]
- "js_bootstrap_min_we_dispose": ".dispose()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we]
- "js_bootstrap_min_we_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we]
- "js_bootstrap_min_z": "z()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js]
- "lib_gsap_min_ad": "Ad()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_bd": "Bd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_ca": "Ca()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_cd": "Cd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_dd": "Dd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_de": "de()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_ed": "Ed()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_fd": "Fd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_gd": "Gd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_gn": "gn()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_inheritsloose": "_inheritsLoose()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_jd": "Jd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_matchmedia": "MatchMedia()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_md": "Md()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_oc": "oc()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_p": "P()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_pa": "pa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_proptween": "PropTween()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_qb": "Qb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_rb": "rb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_ub": "Ub()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]

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
