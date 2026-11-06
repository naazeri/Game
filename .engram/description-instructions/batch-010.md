# Node Description Batch 11 of 25

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

- "assets_index_ctaeemyb_ce_createbackgroundaesthetics": ".createBackgroundAesthetics()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .create()]
- "assets_index_ctaeemyb_ce_createiconbutton": ".createIconButton()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .createHUD()]
- "assets_index_ctaeemyb_ce_createtwoplayerdivider": ".createTwoPlayerDivider()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .create()]
- "assets_index_ctaeemyb_ce_flipbothpillars": ".flipBothPillars()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .flip()]
- "assets_index_ctaeemyb_ce_flipleftpillar": ".flipLeftPillar()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .flip()]
- "assets_index_ctaeemyb_ce_fliprightpillar": ".flipRightPillar()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .flip()]
- "assets_index_ctaeemyb_ce_init": ".init()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .create()]
- "assets_index_ctaeemyb_ce_setupinputs": ".setupInputs()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .create()]
- "assets_index_ctaeemyb_ce_spawngameovereffect": ".spawnGameOverEffect()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .handleGameOver()]
- "assets_index_ctaeemyb_ce_spawnmatchparticles": ".spawnMatchParticles()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ce, .handlePillarHit()]
- "assets_index_ctaeemyb_ct_getcurrentscore": ".getCurrentScore()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Ct, .getKey()]
- "assets_index_ctaeemyb_ct_ismusicenabled": ".isMusicEnabled()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Ct, .getKey()]
- "assets_index_ctaeemyb_ct_issoundenabled": ".isSoundEnabled()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Ct, .getKey()]
- "assets_index_ctaeemyb_ct_savespeedsetting": ".saveSpeedSetting()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Ct, .getKey()]
- "assets_index_ctaeemyb_ct_setmusicenabled": ".setMusicEnabled()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Ct, .getKey()]
- "assets_index_ctaeemyb_ct_setsoundenabled": ".setSoundEnabled()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Ct, .getKey()]
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
