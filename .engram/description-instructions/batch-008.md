# Node Description Batch 9 of 16

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

- "js_bootstrap_min_gi_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[gi, .getOrCreateInstance()]
- "js_bootstrap_min_j_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[J, .getOrCreateInstance()]
- "js_bootstrap_min_m": "M()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, D()]
- "js_bootstrap_min_mi_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Mi, .getOrCreateInstance()]
- "js_bootstrap_min_ne_isoverflowing": ".isOverflowing()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, .getWidth()]
- "js_bootstrap_min_ne_reset": ".reset()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, ._resetElementAttributes()]
- "js_bootstrap_min_ne_saveinitialattribute": "._saveInitialAttribute()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, ._disableOverFlow()]
- "js_bootstrap_min_ni_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._fixTitle()]
- "js_bootstrap_min_ni_dispose": ".dispose()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._disposePopper()]
- "js_bootstrap_min_ni_fixtitle": "._fixTitle()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, .constructor()]
- "js_bootstrap_min_ni_getconfig": "._getConfig()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._mergeConfigObj()]
- "js_bootstrap_min_ni_getcontentfortemplate": "._getContentForTemplate()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._getTitle()]
- "js_bootstrap_min_ni_getdelegateconfig": "._getDelegateConfig()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._initializeOnDelegatedTarget()]
- "js_bootstrap_min_ni_iswithactivetrigger": "._isWithActiveTrigger()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._leave()]
- "js_bootstrap_min_ni_iswithcontent": "._isWithContent()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._getTitle()]
- "js_bootstrap_min_ni_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, .getOrCreateInstance()]
- "js_bootstrap_min_ni_setcontent": ".setContent()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._disposePopper()]
- "js_bootstrap_min_ni_setlisteners": "._setListeners()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, .eventName()]
- "js_bootstrap_min_os_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os, .getOrCreateInstance()]
- "js_bootstrap_min_os_maybeschedulehide": "._maybeScheduleHide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os, ._onInteraction()]
- "js_bootstrap_min_ot_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, .cycle()]
- "js_bootstrap_min_ot_directiontoorder": "._directionToOrder()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, ._keydown()]
- "js_bootstrap_min_ot_maybeenablecycle": "._maybeEnableCycle()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, .cycle()]
- "js_bootstrap_min_ot_next": ".next()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, ._slide()]
- "js_bootstrap_min_ot_setactiveindicatorelement": "._setActiveIndicatorElement()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, ._slide()]
- "js_bootstrap_min_q_getconfig": "._getConfig()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[q, ._mergeConfigObj()]
- "js_bootstrap_min_qi_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi, .refresh()]
- "js_bootstrap_min_qi_getnewobserver": "._getNewObserver()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi, .refresh()]
- "js_bootstrap_min_qi_initializetargetsandobservables": "._initializeTargetsAndObservables()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi, .refresh()]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-008.json

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
