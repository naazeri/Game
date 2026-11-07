# Node Description Batch 11 of 24

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

- "assets_index_ctaeemyb_de_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[de, .createHearts()]
- "assets_index_ctaeemyb_de_getlives": ".getLives()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.handlePillarHit(), de]
- "assets_index_ctaeemyb_de_reset": ".reset()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[de, .setLives()]
- "assets_index_ctaeemyb_de_spawnheartshatter": ".spawnHeartShatter()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[de, .loseLife()]
- "assets_index_ctaeemyb_de_spawnheartsparks": ".spawnHeartSparks()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[de, .addLife()]
- "assets_index_ctaeemyb_fe_createcontent": ".createContent()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[fe, .createNewRecordBadge()]
- "assets_index_ctaeemyb_fe_createnewrecordbadge": ".createNewRecordBadge()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[fe, .createContent()]
- "assets_index_ctaeemyb_h": "H()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L1 | neighbors=[index-CTAEEmYb.js, Q()]
- "assets_index_ctaeemyb_he_createclosebutton": ".createCloseButton()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[he, .createContent()]
- "assets_index_ctaeemyb_he_createstatrow": ".createStatRow()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[he, .createContent()]
- "assets_index_ctaeemyb_kt_getactivecolor": ".getActiveColor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.handlePillarHit(), Kt]
- "assets_index_ctaeemyb_le_createbackgroundeffects": ".createBackgroundEffects()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[le, .create()]
- "assets_index_ctaeemyb_le_createhalfbutton": ".createHalfButton()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[le, .create()]
- "assets_index_ctaeemyb_le_createiconaction": ".createIconAction()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[le, .createTopActionBar()]
- "assets_index_ctaeemyb_le_createlogoemblem": ".createLogoEmblem()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[le, .create()]
- "assets_index_ctaeemyb_le_createmenubutton": ".createMenuButton()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[le, .create()]
- "assets_index_ctaeemyb_ne_create": ".create()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ne, .init()]
- "assets_index_ctaeemyb_oe_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[oe, .getSpeedSetting()]
- "assets_index_ctaeemyb_oe_createmediumbutton": ".createMediumButton()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[oe, .createContent()]
- "assets_index_ctaeemyb_oe_createsavebutton": ".createSaveButton()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[oe, .createContent()]
- "assets_index_ctaeemyb_oe_createsmallbutton": ".createSmallButton()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[oe, .createContent()]
- "assets_index_ctaeemyb_oe_show": ".show()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[oe, .getSpeedSetting()]
- "assets_index_ctaeemyb_q": "Q()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L1 | neighbors=[index-CTAEEmYb.js, H()]
- "assets_index_ctaeemyb_ue_bounceanddecidecolor": ".bounceAndDecideColor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.handlePillarHit(), ue]
- "assets_index_ctaeemyb_ue_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ue, .drawGlow()]
- "assets_index_ctaeemyb_ue_reset": ".reset()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ue, .drawGlow()]
- "assets_index_ctaeemyb_ue_switchcolor": ".switchColor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ue, .drawGlow()]
- "assets_index_ctaeemyb_ue_update": ".update()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ue, .spawnTrailParticle()]
- "assets_index_ctaeemyb_ve_processnext": ".processNext()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ve, .show()]
- "assets_index_ctaeemyb_ve_show": ".show()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ve, .processNext()]
- "assets_index_d2py_agh_j": "j()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L1 | neighbors=[index-D2py_AGH.js, et()]
- "assets_index_d2py_agh_nt_createambientglows": ".createAmbientGlows()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .create()]
- "assets_index_d2py_agh_nt_createglobalcontrols": ".createGlobalControls()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .create()]
- "assets_index_d2py_agh_nt_cycleambientcolors": ".cycleAmbientColors()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, et()]
- "assets_index_d2py_agh_nt_disttosegment": ".distToSegment()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .checkCollisions()]
- "assets_index_d2py_agh_nt_handlegameover": ".handleGameOver()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .checkCollisions()]
- "assets_index_d2py_agh_nt_handlekeyboardmovement": ".handleKeyboardMovement()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .update()]
- "assets_index_d2py_agh_nt_hideabout": ".hideAbout()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .showMenu()]
- "assets_index_d2py_agh_nt_setupinput": ".setupInput()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .create()]
- "assets_index_d2py_agh_nt_startcountdown": ".startCountdown()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .clearMobs()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-010.json

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
