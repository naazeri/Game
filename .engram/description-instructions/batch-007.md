# Node Description Batch 8 of 24

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

- "js_bootstrap_min_ai_maybesanitize": "._maybeSanitize()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai, ._setContent(), .toHtml()]
- "js_bootstrap_min_at_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at, ._initEvents(), .isSupported()]
- "js_bootstrap_min_at_end": "._end()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at, ._eventIsPointerPenTouch(), ._handleSwipe()]
- "js_bootstrap_min_at_eventispointerpentouch": "._eventIsPointerPenTouch()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at, ._end(), ._start()]
- "js_bootstrap_min_at_issupported": ".isSupported()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at, .constructor(), ._addEventListeners()]
- "js_bootstrap_min_d": "D()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, M(), N()]
- "js_bootstrap_min_e": "e()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, ._applyManipulationCallback(), ._observerCallback()]
- "js_bootstrap_min_fe_clearmenus": ".clearMenus()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, ._completeHide(), .getInstance()]
- "js_bootstrap_min_fe_completehide": "._completeHide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, .clearMenus(), .hide()]
- "js_bootstrap_min_fe_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, ._detectNavbar(), .prev()]
- "js_bootstrap_min_fe_detectnavbar": "._detectNavbar()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe, .constructor(), .update()]
- "js_bootstrap_min_fs_activate": "._activate()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._queueCallback(), .show()]
- "js_bootstrap_min_fs_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._getChildren(), ._setInitialAttributes()]
- "js_bootstrap_min_fs_deactivate": "._deactivate()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._queueCallback(), .show()]
- "js_bootstrap_min_fs_elemisactive": "._elemIsActive()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._setInitialAttributesOnChild(), .show()]
- "js_bootstrap_min_fs_getactiveelem": "._getActiveElem()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._getChildren(), .show()]
- "js_bootstrap_min_fs_getouterelement": "._getOuterElement()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._setInitialAttributesOnChild(), ._toggleDropDown()]
- "js_bootstrap_min_fs_keydown": "._keydown()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._getChildren(), .getOrCreateInstance()]
- "js_bootstrap_min_fs_setinitialattributesontargetpanel": "._setInitialAttributesOnTargetPanel()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, ._setInitialAttributesOnChild(), ._setAttributeIfNotExists()]
- "js_bootstrap_min_gi_hide": ".hide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[gi, .deactivate(), ._queueCallback()]
- "js_bootstrap_min_gi_show": ".show()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[gi, Ne, ._queueCallback()]
- "js_bootstrap_min_i": "I()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, N(), P()]
- "js_bootstrap_min_l": "L()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, N(), O()]
- "js_bootstrap_min_mi_getcontent": "._getContent()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Mi, ._getContentForTemplate(), ._isWithContent()]
- "js_bootstrap_min_mi_getcontentfortemplate": "._getContentForTemplate()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Mi, ._getContent(), ._getTitle()]
- "js_bootstrap_min_mi_iswithcontent": "._isWithContent()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Mi, ._getContent(), ._getTitle()]
- "js_bootstrap_min_ne_disableoverflow": "._disableOverFlow()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, ._saveInitialAttribute(), .hide()]
- "js_bootstrap_min_ne_resetelementattributes": "._resetElementAttributes()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, .reset(), ._applyManipulationCallback()]
- "js_bootstrap_min_ni_enter": "._enter()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._setTimeout(), .toggle()]
- "js_bootstrap_min_ni_initializeondelegatedtarget": "._initializeOnDelegatedTarget()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._getDelegateConfig(), .getOrCreateInstance()]
- "js_bootstrap_min_ni_settimeout": "._setTimeout()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._enter(), ._leave()]
- "js_bootstrap_min_ni_toggle": ".toggle()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._enter(), ._leave()]
- "js_bootstrap_min_o": "O()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, N(), L()]
- "js_bootstrap_min_os_dispose": ".dispose()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os, ._clearTimeout(), .isShown()]
- "js_bootstrap_min_os_hide": ".hide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os, .isShown(), ._queueCallback()]
- "js_bootstrap_min_os_isshown": ".isShown()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os, .dispose(), .hide()]
- "js_bootstrap_min_os_oninteraction": "._onInteraction()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os, ._clearTimeout(), ._maybeScheduleHide()]
- "js_bootstrap_min_os_show": ".show()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os, ._clearTimeout(), ._queueCallback()]
- "js_bootstrap_min_ot_addeventlisteners": "._addEventListeners()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, .isSupported(), ._addTouchEventListeners()]
- "js_bootstrap_min_ot_addtoucheventlisteners": "._addTouchEventListeners()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, ._addEventListeners(), at]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-007.json

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
