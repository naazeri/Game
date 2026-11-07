# Node Description Batch 12 of 15

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

- "lib_gsap_min_ad": "Ad()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_bd": "Bd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_ca": "Ca()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_cd": "Cd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_dd": "Dd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_de": "de()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_ed": "Ed()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_fd": "Fd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_gd": "Gd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_gn": "gn()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_inheritsloose": "_inheritsLoose()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_jd": "Jd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_matchmedia": "MatchMedia()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_md": "Md()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_oc": "oc()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_p": "P()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_pa": "pa()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_proptween": "PropTween()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_qb": "Qb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_rb": "rb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_ub": "Ub()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_vb": "Vb()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_wc": "wc()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_wd": "wd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_wx": "Wx()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_xd": "xd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_yd": "yd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_yl": "yl()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "lib_gsap_min_zd": "zd()" | kind=code-symbol | source=vega/lib/gsap.min.js:L10 | neighbors=[gsap.min.js]
- "media_capture_capture_games": "GAMES" | kind=code-symbol | source=tools/media-capture/capture.mjs:L37 | neighbors=[capture.mjs]
- "media_capture_capture_here": "here" | kind=code-symbol | source=tools/media-capture/capture.mjs:L16 | neighbors=[capture.mjs]
- "media_capture_capture_portal": "portal" | kind=code-symbol | source=tools/media-capture/capture.mjs:L17 | neighbors=[capture.mjs]
- "media_capture_capture_rand": "rand()" | kind=code-symbol | source=tools/media-capture/capture.mjs:L22 | neighbors=[capture.mjs]
- "media_capture_capture_tmpdir": "tmpDir" | kind=code-symbol | source=tools/media-capture/capture.mjs:L18 | neighbors=[capture.mjs]
- "media_capture_capture_wanted": "wanted" | kind=code-symbol | source=tools/media-capture/capture.mjs:L292 | neighbors=[capture.mjs]
- "media_capture_smoke_check": "check()" | kind=code-symbol | source=tools/media-capture/smoke.mjs:L10 | neighbors=[smoke.mjs]
- "media_capture_smoke_consoleerrors": "consoleErrors" | kind=code-symbol | source=tools/media-capture/smoke.mjs:L19 | neighbors=[smoke.mjs]
- "media_capture_smoke_failures": "failures" | kind=code-symbol | source=tools/media-capture/smoke.mjs:L9 | neighbors=[smoke.mjs]
- "media_capture_smoke_filtered": "filtered" | kind=code-symbol | source=tools/media-capture/smoke.mjs:L95 | neighbors=[smoke.mjs]
- "media_capture_smoke_slugs": "SLUGS" | kind=code-symbol | source=tools/media-capture/smoke.mjs:L6 | neighbors=[smoke.mjs]

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
