# Node Description Batch 4 of 16

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

- "js_bootstrap_min_fs_setinitialattributes": "._setInitialAttributes()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs, .constructor(), ._setAttributeIfNotExists(), ._setInitialAttributesOnChild()]
- "js_bootstrap_min_j": "J" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[bootstrap.min.js, .jQueryInterface(), .NAME(), .toggle()]
- "js_bootstrap_min_ne_applymanipulationcallback": "._applyManipulationCallback()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, e(), ._resetElementAttributes(), ._setElementAttributes()]
- "js_bootstrap_min_ne_hide": ".hide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, ._disableOverFlow(), .getWidth(), ._setElementAttributes()]
- "js_bootstrap_min_ne_setelementattributes": "._setElementAttributes()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ne, .hide(), ._applyManipulationCallback(), .getWidth()]
- "js_bootstrap_min_ni_createtipelement": "._createTipElement()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, .toHtml(), ._getTemplateFactory(), ._getTipElement()]
- "js_bootstrap_min_ni_disposepopper": "._disposePopper()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, .dispose(), .setContent(), .show()]
- "js_bootstrap_min_ni_gettemplatefactory": "._getTemplateFactory()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._createTipElement(), Ai, .changeContent()]
- "js_bootstrap_min_ni_gettipelement": "._getTipElement()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._createTipElement(), .hide(), .show()]
- "js_bootstrap_min_ni_hide": ".hide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._getTipElement(), .eventName(), ._queueCallback()]
- "js_bootstrap_min_ni_leave": "._leave()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ni, ._isWithActiveTrigger(), ._setTimeout(), .toggle()]
- "js_bootstrap_min_os_cleartimeout": "._clearTimeout()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Os, .dispose(), ._onInteraction(), .show()]
- "js_bootstrap_min_ot_getactive": "._getActive()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, ._slide(), .to(), ._updateInterval()]
- "js_bootstrap_min_ot_getitemindex": "._getItemIndex()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, ._getItems(), ._slide(), .to()]
- "js_bootstrap_min_ot_getitems": "._getItems()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ot, ._getItemIndex(), ._slide(), .to()]
- "js_bootstrap_min_q_mergeconfigobj": "._mergeConfigObj()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[._getConfig(), q, ._getConfig(), ._getConfig()]
- "js_bootstrap_min_rt_hide": ".hide()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt, ._addAriaAndCollapsedClass(), ._getDimension(), ._queueCallback()]
- "js_bootstrap_min_rt_initializechildren": "._initializeChildren()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Rt, .constructor(), ._addAriaAndCollapsedClass(), ._getFirstLevelChildren()]
- "js_bootstrap_min_ue_adjustdialog": "._adjustDialog()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ue, .getWidth(), .handleUpdate(), .show()]
- "js_bootstrap_min_w_eventname": ".eventName()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[.hide(), ._setListeners(), .show(), W]
- "js_bootstrap_min_we_emulateanimation": "._emulateAnimation()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we, ._getElement(), .hide(), .show()]
- "js_bootstrap_min_we_show": ".show()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[we, ._append(), ._emulateAnimation(), ._getElement()]
- "lib_gsap_min_ab": "Ab()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, t(), zb(), cb()]
- "lib_gsap_min_be": "be()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), ka(), Pd()]
- "lib_gsap_min_fa": "fa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), ea(), ke()]
- "lib_gsap_min_ha": "ha()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ja(), Lc(), Sb()]
- "lib_gsap_min_je": "je()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ie(), Pd(), ke()]
- "lib_gsap_min_ke": "ke()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, fa(), je(), le()]
- "lib_gsap_min_lc": "Lc()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ha(), Jc(), r()]
- "lib_gsap_min_pd": "Pd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, be(), _d(), je()]
- "lib_gsap_min_w": "w()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Timeline(), Tween(), va()]
- "lib_gsap_min_wa": "Wa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, gb(), hb(), lb()]
- "lib_gsap_min_y": "y()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween(), r(), s()]
- "scenes_gamescene_gamescene_repositioncoin": ".repositionCoin()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/GameScene.ts:L333 | neighbors=[GameScene, .create(), .handleCoinHit(), .handleResize()]
- "scenes_gamescene_gamescene_updatepipes": ".updatePipes()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L323 | neighbors=[GameScene, .update(), .triggerNewRecordCelebration(), .updateEnvironmentLighting()]
- "scenes_menuscene_menuscene_create": ".create()" | kind=code-symbol | source=apps/hit-the-coin/src/scenes/MenuScene.ts:L19 | neighbors=[MenuScene, .createButton(), .createFullscreenButton(), .playMenuMusic()]
- "assets_index_ufwfauyg_gt_applybirdskin": ".applyBirdSkin()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .create(), .cycleBirdSkin()]
- "assets_index_ufwfauyg_gt_flap": ".flap()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .handleAction(), .startGame()]
- "assets_index_ufwfauyg_gt_handleaction": ".handleAction()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .flap(), .startGame()]
- "assets_index_ufwfauyg_gt_startgame": ".startGame()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .handleAction(), .flap()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-003.json

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
