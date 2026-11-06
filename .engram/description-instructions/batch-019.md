# Node Description Batch 20 of 25

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

- "audio_audiomanager_audiomanager_playheartup": ".playHeartUp()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L131 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playmatch": ".playMatch()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L108 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playrotate": ".playRotate()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L99 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playtierup": ".playTierUp()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L122 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_togglesound": ".toggleSound()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L89 | neighbors=[AudioManager]
- "change_balls_vite_config": "vite.config.ts" | kind=code-symbol | source=apps/change-balls/vite.config.ts:L1 | neighbors=[bb72e0b feat(change-balls): release v2.…]
- "entities_ballpillar_ballpillar_flip": ".flip()" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L104 | neighbors=[BallPillar]
- "entities_ballpillar_ballpillar_getactiveballworldposition": ".getActiveBallWorldPosition()" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L146 | neighbors=[BallPillar]
- "entities_ballpillar_ballpillar_getactivecolor": ".getActiveColor()" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L140 | neighbors=[BallPillar]
- "entities_ballpillar_ballpillar_reset": ".reset()" | kind=code-symbol | source=apps/change-balls/src/entities/BallPillar.ts:L161 | neighbors=[BallPillar]
- "entities_centralball_centralball_activateshield": ".activateShield()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L262 | neighbors=[CentralBall]
- "entities_centralball_centralball_bounceanddecidecolor": ".bounceAndDecideColor()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L179 | neighbors=[CentralBall]
- "entities_centralball_centralball_getx": ".getX()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L328 | neighbors=[CentralBall]
- "entities_centralball_centralball_gety": ".getY()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L332 | neighbors=[CentralBall]
- "entities_centralball_centralball_startmoving": ".startMoving()" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L133 | neighbors=[CentralBall]
- "entities_centralball_heat_tiers": "HEAT_TIERS" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L17 | neighbors=[CentralBall.ts]
- "entities_centralball_heattierinfo": "HeatTierInfo" | kind=code-symbol | source=apps/change-balls/src/entities/CentralBall.ts:L10 | neighbors=[CentralBall.ts]
- "hit_the_coin_vite_config": "vite.config.ts" | kind=code-symbol | source=apps/hit-the-coin/vite.config.ts:L1 | neighbors=[fdf34ba feat: rebuild Hit The Coin with…]
- "js_bootstrap_min_ai_constructor": ".constructor()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai]
- "js_bootstrap_min_ai_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai]
- "js_bootstrap_min_ai_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai]
- "js_bootstrap_min_ai_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai]
- "js_bootstrap_min_ai_resolvepossiblefunction": "._resolvePossibleFunction()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[Ai]
- "js_bootstrap_min_at_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at]
- "js_bootstrap_min_at_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at]
- "js_bootstrap_min_at_dispose": ".dispose()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at]
- "js_bootstrap_min_at_move": "._move()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at]
- "js_bootstrap_min_at_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[at]
- "js_bootstrap_min_fe_createpopper": "._createPopper()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe]
- "js_bootstrap_min_fe_default": ".Default()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe]
- "js_bootstrap_min_fe_defaulttype": ".DefaultType()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe]
- "js_bootstrap_min_fe_dispose": ".dispose()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe]
- "js_bootstrap_min_fe_getconfig": "._getConfig()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe]
- "js_bootstrap_min_fe_getoffset": "._getOffset()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe]
- "js_bootstrap_min_fe_isshown": "._isShown()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe]
- "js_bootstrap_min_fe_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe]
- "js_bootstrap_min_fe_show": ".show()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe]
- "js_bootstrap_min_fe_toggle": ".toggle()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fe]
- "js_bootstrap_min_fs_name": ".NAME()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[fs]
- "js_bootstrap_min_gi_addeventlisteners": "._addEventListeners()" | kind=code-symbol | source=assets/bootstrap/js/bootstrap.min.js:L6 | neighbors=[gi]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-019.json

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
