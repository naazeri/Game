# Node Description Batch 11 of 15

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

- "audio_audiomanager_audiomanager_init": ".init()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L21 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_ismusicenabled": ".isMusicEnabled()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L46 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_ismusicon": ".isMusicOn()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L85 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_issfxenabled": ".isSfxEnabled()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L33 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_issoundon": ".isSoundOn()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L95 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playcolorswitch": ".playColorSwitch()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L149 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playgameover": ".playGameOver()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L158 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playheartbreak": ".playHeartBreak()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L140 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playheartup": ".playHeartUp()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L131 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playmatch": ".playMatch()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L108 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playpowerupcollect": ".playPowerUpCollect()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L93 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playrotate": ".playRotate()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L99 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playsynthbass": ".playSynthBass()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L170 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playsynthlead": ".playSynthLead()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L184 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playtierup": ".playTierUp()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L122 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_playwinfanfare": ".playWinFanfare()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L113 | neighbors=[AudioManager]
- "audio_audiomanager_audiomanager_setsfxenabled": ".setSfxEnabled()" | kind=code-symbol | source=apps/ponge/src/audio/AudioManager.ts:L29 | neighbors=[AudioManager]
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
- "lib_games_appsdir": "appsDir" | kind=code-symbol | source=apps/portal/src/lib/games.ts:L41 | neighbors=[games.ts]
- "lib_games_findclip": "findClip()" | kind=code-symbol | source=apps/portal/src/lib/games.ts:L49 | neighbors=[games.ts]
- "lib_games_game": "Game" | kind=code-symbol | source=apps/portal/src/lib/games.ts:L16 | neighbors=[games.ts]
- "lib_games_gameclip": "GameClip" | kind=code-symbol | source=apps/portal/src/lib/games.ts:L10 | neighbors=[games.ts]
- "lib_games_getgames": "getGames()" | kind=code-symbol | source=apps/portal/src/lib/games.ts:L62 | neighbors=[games.ts]
- "lib_games_portaldir": "portalDir" | kind=code-symbol | source=apps/portal/src/lib/games.ts:L40 | neighbors=[games.ts]
- "lib_games_readversion": "readVersion()" | kind=code-symbol | source=apps/portal/src/lib/games.ts:L43 | neighbors=[games.ts]
- "lib_games_shots": "shots" | kind=code-symbol | source=apps/portal/src/lib/games.ts:L34 | neighbors=[games.ts]
- "lib_games_thumbs": "thumbs" | kind=code-symbol | source=apps/portal/src/lib/games.ts:L30 | neighbors=[games.ts]

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
