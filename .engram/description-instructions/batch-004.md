# Node Description Batch 5 of 15

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/naazeri/Game@bcc967b0ad878f8c66beacccffe35f5ec830aa22": "bcc967b fix header" | kind=Commit | source=git | neighbors=[a834ef4 add favicon, main, d7ef535 Update index.html] | lang=en
- "commit:repo:github.com/naazeri/Game@cd3f55a0cf14f975805265ec03e0d10ea82cdb21": "cd3f55a add flappy bird game" | kind=Commit | source=git | neighbors=[b3188a4 Create CNAME, main, 7a5a4cf Update README.md] | lang=pt
- "commit:repo:github.com/naazeri/Game@d7ef535fb4469a4914d5732d3290ad084ce64975": "d7ef535 Update index.html" | kind=Commit | source=git | neighbors=[bcc967b fix header, main, 1270fdf change text and hover color] | lang=en
- "commit:repo:github.com/naazeri/Game@e3d39499515f4517bc8299fa3942f2dbddfc0a27": "e3d3949 add hit-the-coin gmae" | kind=Commit | source=git | neighbors=[07c6be3 add change balls v1.2.1, main, 37be431 add ponge v1.1.3] | lang=en
- "commit:repo:github.com/naazeri/Game@ebd193e532d5857242e3d01f84ea1744cce80547": "ebd193e change domain and convert images to webp" | kind=Commit | source=git | neighbors=[60c8c84 Update CNAME, main, 5e62a51 update change-balls to version …] | lang=en
- "components_footer": "Footer.astro" | kind=code-symbol | source=apps/portal/src/components/Footer.astro:L1 | neighbors=[875b52a feat(portal): add Astro portal …, games.ts, Base.astro] | lang=en
- "data_storagemanager_storagemanager_getbestscore": ".getBestScore()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L10 | neighbors=[StorageManager, .getKey(), .saveBestScore()] | lang=en
- "data_storagemanager_storagemanager_getgamesplayed": ".getGamesPlayed()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L36 | neighbors=[StorageManager, .getKey(), .incrementGamesPlayed()] | lang=en
- "data_storagemanager_storagemanager_savebestscore": ".saveBestScore()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L16 | neighbors=[StorageManager, .getBestScore(), .getKey()] | lang=en
- "data_storagemanager_storagemanager_savecurrentscore": ".saveCurrentScore()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L31 | neighbors=[StorageManager, .getKey(), .incrementGamesPlayed()] | lang=en
- "entities_ballpillar_ballpillar_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L24 | neighbors=[BallPillar, .drawPivot(), .drawRod()] | lang=en
- "entities_centralball_centralball_spawntrailparticle": ".spawnTrailParticle()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L149 | neighbors=[CentralBall, getHeatTierForScore(), .update()] | lang=en
- "entities_centralball_centralball_updatescore": ".updateScore()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L75 | neighbors=[CentralBall, .drawGlow(), getHeatTierForScore()] | lang=en
- "lib_gsap_min_assertthisinitialized": "_assertThisInitialized()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Timeline(), Tween()] | lang=en
- "lib_gsap_min_bb": "Bb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, cb(), fb()] | lang=en
- "lib_gsap_min_bo": "Bo()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r(), s()] | lang=en
- "lib_gsap_min_ec": "Ec()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, t(), Fc()] | lang=en
- "lib_gsap_min_ew": "Ew()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, cb(), s()] | lang=en
- "lib_gsap_min_ga": "ga()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, s(), u()] | lang=en
- "lib_gsap_min_hb": "hb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Wa(), ob()] | lang=en
- "lib_gsap_min_kd": "Kd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ee(), Ld()] | lang=en
- "lib_gsap_min_lb": "lb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, r(), Wa()] | lang=en
- "lib_gsap_min_ob": "ob()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, hb(), r()] | lang=en
- "lib_gsap_min_od": "Od()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Sd(), Td()] | lang=en
- "lib_gsap_min_oe": "oe()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), ia()] | lang=en
- "lib_gsap_min_qa": "qa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween(), wb()] | lang=en
- "lib_gsap_min_sa": "Sa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Aa(), Ra()] | lang=en
- "lib_gsap_min_timeline": "Timeline()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _assertThisInitialized(), w()] | lang=en
- "lib_gsap_min_u": "u()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ac(), ga()] | lang=en
- "lib_gsap_min_ua": "ua()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, Tween(), wb()] | lang=en
- "lib_gsap_min_xe": "xe()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, _d(), we()] | lang=en
- "lib_gsap_min_za": "za()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js, ka(), tb()] | lang=en
- "objects_powerup_powerup_constructor": ".constructor()" | kind=code-symbol | source=apps/ponge/src/objects/PowerUp.ts:L17 | neighbors=[PowerUp, .draw(), .startAnimations()] | lang=en
- "objects_powerup_powerup_draw": ".draw()" | kind=code-symbol | source=apps/ponge/src/objects/PowerUp.ts:L51 | neighbors=[PowerUp, .constructor(), .getColor()] | lang=en
- "objects_powerup_powerup_getcolor": ".getColor()" | kind=code-symbol | source=apps/ponge/src/objects/PowerUp.ts:L40 | neighbors=[PowerUp, .draw(), .shatter()] | lang=en
- "objects_powerup_powerup_shatter": ".shatter()" | kind=code-symbol | source=apps/ponge/src/objects/PowerUp.ts:L105 | neighbors=[PowerUp, .destroy(), .getColor()] | lang=en
- "pages_404": "404.astro" | kind=code-symbol | source=apps/portal/src/pages/404.astro:L1 | neighbors=[875b52a feat(portal): add Astro portal …, Base.astro, games.ts] | lang=en
- "scenes_gamescene_gamescene_applybirdskin": ".applyBirdSkin()" | kind=code-symbol | source=apps/flappy-bird/src/scenes/GameScene.ts:L468 | neighbors=[GameScene, .create(), .cycleBirdSkin()] | lang=en
- "scenes_gamescene_gamescene_checkgoallines": ".checkGoalLines()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L736 | neighbors=[GameScene, .handleGoal(), .update()] | lang=en
- "scenes_gamescene_gamescene_checkpaddlecollisions": ".checkPaddleCollisions()" | kind=code-symbol | source=apps/ponge/src/scenes/GameScene.ts:L649 | neighbors=[GameScene, .testCapsuleCollision(), .update()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-004.json

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
