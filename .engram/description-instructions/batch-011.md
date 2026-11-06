# Node Description Batch 12 of 25

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
- "assets_index_d2py_agh_nt_updatemobs": ".updateMobs()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .update()]
- "assets_index_ufwfauyg_gt_creategameoverui": ".createGameOverUI()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .create()]
- "assets_index_ufwfauyg_gt_createglobalcontrols": ".createGlobalControls()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .create()]
- "assets_index_ufwfauyg_gt_createingamehud": ".createInGameHUD()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .create()]
- "assets_index_ufwfauyg_gt_createreadyui": ".createReadyUI()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .create()]
- "assets_index_ufwfauyg_gt_cyclebirdskin": ".cycleBirdSkin()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .applyBirdSkin()]
- "assets_index_ufwfauyg_gt_triggernewrecordcelebration": ".triggerNewRecordCelebration()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .updatePipes()]
- "assets_index_ufwfauyg_gt_update": ".update()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .updatePipes()]
- "assets_index_ufwfauyg_gt_updateenvironmentlighting": ".updateEnvironmentLighting()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .updatePipes()]
- "assets_index_ufwfauyg_st": "st()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L1 | neighbors=[index-UfWfaUyg.js, tt()]
- "assets_index_ufwfauyg_tt": "tt()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L1 | neighbors=[index-UfWfaUyg.js, st()]
- "audio_audiomanager_audiomanager_playgamemusic": ".playGameMusic()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L33 | neighbors=[AudioManager, .playBgm()]
- "audio_audiomanager_audiomanager_playmenumusic": ".playMenuMusic()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L29 | neighbors=[AudioManager, .playBgm()]
- "audio_audiomanager_audiomanager_stopmusic": ".stopMusic()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L37 | neighbors=[AudioManager, .playBgm()]
- "audio_audiomanager_audiomanager_togglemusic": ".toggleMusic()" | kind=code-symbol | source=apps/change-balls/src/audio/AudioManager.ts:L69 | neighbors=[AudioManager, .playBgm()]
- "build_unityloader_b": "b()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L2 | neighbors=[UnityLoader.js, a()]
- "build_unityloader_e": "e()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L4 | neighbors=[UnityLoader.js, i()]
- "build_unityloader_p": "p()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, a()]
- "build_unityloader_r": "r()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L4 | neighbors=[UnityLoader.js, n()]
- "build_unityloader_t": "t()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L4 | neighbors=[UnityLoader.js, n()]
- "build_unityloader_y": "y()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L2 | neighbors=[UnityLoader.js, a()]
- "commit:repo:github.com/naazeri/Game@ea8f4f5b223e693a6d31492fb57eb8a49ec269d8": "ea8f4f5 Initial commit" | kind=Commit | source=git | neighbors=[main, b3188a4 Create CNAME]
- "data_storagemanager_storagemanager_getcurrentscore": ".getCurrentScore()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L26 | neighbors=[StorageManager, .getKey()]
- "data_storagemanager_storagemanager_getspeedsetting": ".getSpeedSetting()" | kind=code-symbol | source=apps/change-balls/src/data/StorageManager.ts:L46 | neighbors=[StorageManager, .getKey()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\Reza\Documents\Project\me\Game\.engram\description-instructions\batch-011.json

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
