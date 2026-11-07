# Node Description Batch 9 of 24

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

- "js_bootstrap_min_ot_clearinterval": "._clearInterval()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, .cycle(), .pause()]
- "js_bootstrap_min_ot_jqueryinterface": ".jQueryInterface()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, .to(), .getOrCreateInstance()]
- "js_bootstrap_min_ot_keydown": "._keydown()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, ._directionToOrder(), ._slide()]
- "js_bootstrap_min_ot_pause": ".pause()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, ._clearInterval(), ._slide()]
- "js_bootstrap_min_ot_updateinterval": "._updateInterval()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, .cycle(), ._getActive()]
- "js_bootstrap_min_p": "P()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, I(), x()]
- "js_bootstrap_min_qi_activateparents": "._activateParents()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi, .prev(), ._process()]
- "js_bootstrap_min_qi_clearactiveclass": "._clearActiveClass()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi, ._observerCallback(), ._process()]
- "js_bootstrap_min_qi_observercallback": "._observerCallback()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi, e(), ._clearActiveClass()]
- "js_bootstrap_min_qi_process": "._process()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Qi, ._activateParents(), ._clearActiveClass()]
- "js_bootstrap_min_rt_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt, ._addAriaAndCollapsedClass(), ._initializeChildren()]
- "js_bootstrap_min_rt_getdimension": "._getDimension()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt, .hide(), .show()]
- "js_bootstrap_min_rt_getfirstlevelchildren": "._getFirstLevelChildren()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt, ._initializeChildren(), .show()]
- "js_bootstrap_min_ue_hide": ".hide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue, .deactivate(), ._queueCallback()]
- "js_bootstrap_min_w_getinstance": ".getInstance()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[.clearMenus(), W, .getOrCreateInstance()]
- "js_bootstrap_min_we_append": "._append()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we, ._getElement(), .show()]
- "js_bootstrap_min_we_hide": ".hide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we, ._emulateAnimation(), ._getElement()]
- "lib_gsap_min_assertthisinitialized": "_assertThisInitialized()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Timeline(), Tween()]
- "lib_gsap_min_bb": "Bb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, cb(), fb()]
- "lib_gsap_min_bo": "Bo()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r(), s()]
- "lib_gsap_min_ec": "Ec()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, t(), Fc()]
- "lib_gsap_min_ew": "Ew()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, cb(), s()]
- "lib_gsap_min_ga": "ga()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, s(), u()]
- "lib_gsap_min_hb": "hb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Wa(), ob()]
- "lib_gsap_min_kd": "Kd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ee(), Ld()]
- "lib_gsap_min_lb": "lb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r(), Wa()]
- "lib_gsap_min_ob": "ob()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, hb(), r()]
- "lib_gsap_min_od": "Od()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Sd(), Td()]
- "lib_gsap_min_oe": "oe()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), ia()]
- "lib_gsap_min_qa": "qa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween(), wb()]
- "lib_gsap_min_sa": "Sa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Aa(), Ra()]
- "lib_gsap_min_timeline": "Timeline()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _assertThisInitialized(), w()]
- "lib_gsap_min_u": "u()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ac(), ga()]
- "lib_gsap_min_ua": "ua()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween(), wb()]
- "lib_gsap_min_xe": "xe()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), we()]
- "lib_gsap_min_za": "za()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ka(), tb()]
- "scenes_gamescene_gamescene_applybirdskin": ".applyBirdSkin()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L468 | neighbors=[GameScene, .create(), .cycleBirdSkin()]
- "scenes_gamescene_gamescene_clearmobs": ".clearMobs()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L736 | neighbors=[GameScene, .showMenu(), .startCountdown()]
- "scenes_gamescene_gamescene_createaboutmodal": ".createAboutModal()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L277 | neighbors=[GameScene, .create(), .createButton()]
- "scenes_gamescene_gamescene_createbutton": ".createButton()" | kind=code-symbol | source=apps/poke/src/scenes/GameScene.ts:L240 | neighbors=[GameScene, .createAboutModal(), .createHUD()]

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
