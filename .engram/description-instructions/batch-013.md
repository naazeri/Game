# Node Description Batch 14 of 24

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

- "js_bootstrap_min_qi_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi, .getOrCreateInstance()]
- "js_bootstrap_min_qi_maybeenablesmoothscroll": "._maybeEnableSmoothScroll()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi, .refresh()]
- "js_bootstrap_min_rt_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt, .getOrCreateInstance()]
- "js_bootstrap_min_u_close": ".close()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[U, ._queueCallback()]
- "js_bootstrap_min_u_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[U, .getOrCreateInstance()]
- "js_bootstrap_min_ue_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue, Ne]
- "js_bootstrap_min_ue_dispose": ".dispose()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue, .deactivate()]
- "js_bootstrap_min_ue_handleupdate": ".handleUpdate()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue, ._adjustDialog()]
- "js_bootstrap_min_ue_initializebackdrop": "._initializeBackDrop()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue, we]
- "js_bootstrap_min_ue_initializefocustrap": "._initializeFocusTrap()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue, Se]
- "js_bootstrap_min_ue_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue, .getOrCreateInstance()]
- "js_bootstrap_min_ue_show": ".show()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue, ._adjustDialog()]
- "js_bootstrap_min_ue_showelement": "._showElement()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue, ._queueCallback()]
- "js_bootstrap_min_ue_triggerbackdroptransition": "._triggerBackdropTransition()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue, ._queueCallback()]
- "js_bootstrap_min_w_getconfig": "._getConfig()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[W, ._mergeConfigObj()]
- "js_bootstrap_min_x": "x()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, P()]
- "lib_gsap_min_a": "_a()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, v()]
- "lib_gsap_min_animation": "Animation()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Ra()]
- "lib_gsap_min_context": "Context()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, cb()]
- "lib_gsap_min_db": "db()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, eb()]
- "lib_gsap_min_ee": "ee()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Kd()]
- "lib_gsap_min_fc": "Fc()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Ec()]
- "lib_gsap_min_gc": "gc()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween()]
- "lib_gsap_min_ie": "ie()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, je()]
- "lib_gsap_min_jc": "Jc()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Lc()]
- "lib_gsap_min_la": "la()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Q()]
- "lib_gsap_min_ld": "Ld()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Kd()]
- "lib_gsap_min_le": "le()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ke()]
- "lib_gsap_min_ma": "ma()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, na()]
- "lib_gsap_min_na": "na()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ma()]
- "lib_gsap_min_oa": "oa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r()]
- "lib_gsap_min_q": "Q()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, la()]
- "lib_gsap_min_sb": "Sb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ha()]
- "lib_gsap_min_sd": "Sd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Od()]
- "lib_gsap_min_ta": "ta()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, v()]
- "lib_gsap_min_tb": "tb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, za()]
- "lib_gsap_min_td": "Td()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Od()]
- "lib_gsap_min_ud": "Ud()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, vd()]
- "lib_gsap_min_vd": "vd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Ud()]
- "lib_gsap_min_ve": "ve()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r()]

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
