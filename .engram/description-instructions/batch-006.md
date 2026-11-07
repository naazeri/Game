# Node Description Batch 7 of 15

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "audio_audiomanager_audiomanager_playscoreexplosion": ".playScoreExplosion()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L68 | neighbors=[AudioManager, .playSynthExplosion()]
- "audio_audiomanager_audiomanager_playservechime": ".playServeChime()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L82 | neighbors=[AudioManager, .playSynthBlip()]
- "audio_audiomanager_audiomanager_playsynthexplosion": ".playSynthExplosion()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L198 | neighbors=[AudioManager, .playScoreExplosion()]
- "audio_audiomanager_audiomanager_playwallbounce": ".playWallBounce()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L59 | neighbors=[AudioManager, .playSynthBlip()]
- "audio_audiomanager_audiomanager_togglemusic": ".toggleMusic()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L69 | neighbors=[AudioManager, .playBgm()]
- "commit:repo:github.com/naazeri/Game@ea8f4f5b223e693a6d31492fb57eb8a49ec269d8": "ea8f4f5 Initial commit" | kind=Commit | source=git | neighbors=[main, b3188a4 Create CNAME]
- "components_header": "Header.astro" | kind=code-symbol | source=apps/portal/src/components/Header.astro:L1 | neighbors=[875b52a feat(portal): add Astro portal …, Base.astro]
- "data_storagemanager_storagemanager_getcurrentscore": ".getCurrentScore()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L26 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_getspeedsetting": ".getSpeedSetting()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L46 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_ismusicenabled": ".isMusicEnabled()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L64 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_issoundenabled": ".isSoundEnabled()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L55 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_savespeedsetting": ".saveSpeedSetting()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L51 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_setmusicenabled": ".setMusicEnabled()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L69 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_setsoundenabled": ".setSoundEnabled()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L60 | neighbors=[StorageManager, .getKey()]
- "entities_ballpillar_ballpillar_drawpivot": ".drawPivot()" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L80 | neighbors=[BallPillar, .constructor()]
- "entities_ballpillar_ballpillar_drawrod": ".drawRod()" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L59 | neighbors=[BallPillar, .constructor()]
- "entities_centralball_centralball_constructor": ".constructor()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L50 | neighbors=[CentralBall, .drawGlow()]
- "entities_centralball_centralball_reset": ".reset()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L305 | neighbors=[CentralBall, .drawGlow()]
- "entities_centralball_centralball_switchcolor": ".switchColor()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L208 | neighbors=[CentralBall, .drawGlow()]
- "entities_centralball_centralball_update": ".update()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L137 | neighbors=[CentralBall, .spawnTrailParticle()]
- "flappy_bird_vite_config": "vite.config.ts" | kind=code-symbol | source=apps/flappy-bird/vite.config.ts:L1 | neighbors=[0d024c8 feat(flappy-bird): rebuild with…, c3fedc4 feat(flappy-bird): release v1.2…]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-006.json

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
