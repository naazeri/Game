# Node Description Batch 7 of 25

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

- "assets_index_ctaeemyb_de_createhearts": ".createHearts()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[de, .constructor(), .drawHeart()] | lang=en
- "assets_index_ctaeemyb_de_loselife": ".loseLife()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.handlePillarHit(), de, .spawnHeartShatter()] | lang=en
- "assets_index_ctaeemyb_de_setlives": ".setLives()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[de, .reset(), .drawHeart()] | lang=en
- "assets_index_ctaeemyb_he_createcontent": ".createContent()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[he, .createCloseButton(), .createStatRow()] | lang=en
- "assets_index_ctaeemyb_he_show": ".show()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[he, .getBestScore(), .getGamesPlayed()] | lang=en
- "assets_index_ctaeemyb_kt_constructor": ".constructor()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Kt, .drawPivot(), .drawRod()] | lang=en
- "assets_index_ctaeemyb_kt_drawpivot": ".drawPivot()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Kt, .constructor(), .clear()] | lang=en
- "assets_index_ctaeemyb_kt_drawrod": ".drawRod()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[Kt, .constructor(), .clear()] | lang=en
- "assets_index_ctaeemyb_le_createtopactionbar": ".createTopActionBar()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[le, .create(), .createIconAction()] | lang=en
- "assets_index_ctaeemyb_ue_activateshield": ".activateShield()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[.handlePillarHit(), ue, .clear()] | lang=en
- "assets_index_ctaeemyb_ue_spawntrailparticle": ".spawnTrailParticle()" | kind=code-symbol | source=change-balls/assets/index-CTAEEmYb.js:L6360 | neighbors=[ue, Nt(), .update()] | lang=en
- "assets_index_d2py_agh_et": "et()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L1 | neighbors=[index-D2py_AGH.js, j(), .cycleAmbientColors()] | lang=en
- "assets_index_d2py_agh_nt_clearmobs": ".clearMobs()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .showMenu(), .startCountdown()] | lang=en
- "assets_index_d2py_agh_nt_createaboutmodal": ".createAboutModal()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .create(), .createButton()] | lang=en
- "assets_index_d2py_agh_nt_createbutton": ".createButton()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .createAboutModal(), .createHUD()] | lang=en
- "assets_index_d2py_agh_nt_createhud": ".createHUD()" | kind=code-symbol | source=poke/assets/index-D2py_AGH.js:L6360 | neighbors=[Nt, .create(), .createButton()] | lang=en
- "assets_index_ufwfauyg_gt_applybirdskin": ".applyBirdSkin()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .create(), .cycleBirdSkin()] | lang=en
- "assets_index_ufwfauyg_gt_flap": ".flap()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .handleAction(), .startGame()] | lang=en
- "assets_index_ufwfauyg_gt_handleaction": ".handleAction()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .flap(), .startGame()] | lang=en
- "assets_index_ufwfauyg_gt_startgame": ".startGame()" | kind=code-symbol | source=flappy-bird/assets/index-UfWfaUyg.js:L6360 | neighbors=[Gt, .handleAction(), .flap()] | lang=en
- "build_unityloader_h": "h()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L1 | neighbors=[UnityLoader.js, f(), w()] | lang=en
- "build_unityloader_m": "m()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L2 | neighbors=[UnityLoader.js, a(), s()] | lang=en
- "build_unityloader_v": "v()" | kind=code-symbol | source=ponge/Build/UnityLoader.js:L2 | neighbors=[UnityLoader.js, f(), g()] | lang=en
- "commit:repo:github.com/naazeri/Game@07c6be398a252b0331a07df06ee4c77d47f651e5": "07c6be3 add change balls v1.2.1" | kind=Commit | source=git | neighbors=[main, e3d3949 add hit-the-coin gmae, 19f781f add bola game] | lang=en
- "commit:repo:github.com/naazeri/Game@1270fdf0bb0536382d1c4a761554facc583ae9af": "1270fdf change text and hover color" | kind=Commit | source=git | neighbors=[main, 8ab3175 minify images, d7ef535 Update index.html] | lang=en
- "commit:repo:github.com/naazeri/Game@19f781f008f5290cc5d83b7953f5c010312888f7": "19f781f add bola game" | kind=Commit | source=git | neighbors=[main, 07c6be3 add change balls v1.2.1, 7d1691c change flappy-bird to GLES2] | lang=en
- "commit:repo:github.com/naazeri/Game@41bf5e35e0869f59de8626a71a7f69548a18c3fb": "41bf5e3 add bola, flappy, hit the coin images" | kind=Commit | source=git | neighbors=[main, a4c2e32 remove preloader and unused libs, 79daffc add landing page] | lang=en
- "commit:repo:github.com/naazeri/Game@53277901c1e24f89bb53a3c9f00854533b7704a6": "5327790 add deadzone to flappy bird sky" | kind=Commit | source=git | neighbors=[main, a902dcb Update README.md, 993d092 add vega link but commented] | lang=en
- "commit:repo:github.com/naazeri/Game@5e62a519e8a77b084d3f9023af64eb0c981febdd": "5e62a51 update change-balls to version 1.3.0" | kind=Commit | source=git | neighbors=[main, fdf34ba feat: rebuild Hit The Coin with…, ebd193e change domain and convert image…] | lang=en
- "commit:repo:github.com/naazeri/Game@60c8c84fc62186744c95c8fb37e7d194cc10aea7": "60c8c84 Update CNAME" | kind=Commit | source=git | neighbors=[main, ebd193e change domain and convert image…, a902dcb Update README.md] | lang=en
- "commit:repo:github.com/naazeri/Game@66591ee6b11106e7a52b29da4eef8664f4f8a0c5": "66591ee chore(titles): clean game titles and set portal title to Game - nazeril…" | kind=Commit | source=git | neighbors=[4042c7c feat(poke): release v2.0.0 rema…, main, bb72e0b feat(change-balls): release v2.…] | lang=en
- "commit:repo:github.com/naazeri/Game@7a5a4cf80998a161acef3f8cfbcded46e3766aa7": "7a5a4cf Update README.md" | kind=Commit | source=git | neighbors=[main, a445a0f add poke game, cd3f55a add flappy bird game] | lang=pt
- "commit:repo:github.com/naazeri/Game@7d1691c2887f6512b71b76c0b588fecc11abe5c8": "7d1691c change flappy-bird to GLES2" | kind=Commit | source=git | neighbors=[main, 19f781f add bola game, a445a0f add poke game] | lang=en
- "commit:repo:github.com/naazeri/Game@8ab3175ff80e98b28da140720aac6e076a05a88a": "8ab3175 minify images" | kind=Commit | source=git | neighbors=[1270fdf change text and hover color, main, 8ee78eb change Bootstrap to v5.3.1] | lang=en
- "commit:repo:github.com/naazeri/Game@993d09281e0b27ae8a0bdc712615e86364fe47a1": "993d092 add vega link but commented" | kind=Commit | source=git | neighbors=[main, 5327790 add deadzone to flappy bird sky, e7dfc30 add vega game] | lang=en
- "commit:repo:github.com/naazeri/Game@a06c4ecc10b9ede008268bb7334fa085d8ec75f1": "a06c4ec chore: remove bola game and update engram memory graph" | kind=Commit | source=git | neighbors=[main, 4042c7c feat(poke): release v2.0.0 rema…, b714fad chore(memory): initialize Engra…] | lang=en
- "commit:repo:github.com/naazeri/Game@a445a0fc5d9926b7df64233faa8151cc6435f04d": "a445a0f add poke game" | kind=Commit | source=git | neighbors=[7a5a4cf Update README.md, main, 7d1691c change flappy-bird to GLES2] | lang=pt
- "commit:repo:github.com/naazeri/Game@a4c2e32222bd9e99704d905756f49a2d644690bf": "a4c2e32 remove preloader and unused libs" | kind=Commit | source=git | neighbors=[41bf5e3 add bola, flappy, hit the coin …, main, a834ef4 add favicon] | lang=en
- "commit:repo:github.com/naazeri/Game@a834ef4971b93a92d62138accec36ace87cf1ffd": "a834ef4 add favicon" | kind=Commit | source=git | neighbors=[a4c2e32 remove preloader and unused libs, main, bcc967b fix header] | lang=pt
- "commit:repo:github.com/naazeri/Game@a902dcb640b40bb29c6ac7040d69e9c2f20c5688": "a902dcb Update README.md" | kind=Commit | source=git | neighbors=[5327790 add deadzone to flappy bird sky, main, 60c8c84 Update CNAME] | lang=pt

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
