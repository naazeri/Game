# Graph Report - .  (2026-11-06)

## Corpus Check
- 156 files · ~133,085 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1383 nodes · 2149 edges · 66 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 947 · calls: 703 · method: 382 · MODIFIES: 33 · ON_BRANCH: 31 · PARENT_OF: 30 · imports: 11 · imports_from: 11 · rationale_for: 1


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 156 · Candidates: 213
- Excluded: 0 untracked · 63739 ignored · 0 sensitive · 15 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `b714fad`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `webglGetUniformLocation()` - 52 edges
2. `Ni` - 38 edges
3. `GameScene` - 31 edges
4. `Ot` - 28 edges
5. `fe` - 22 edges
6. `Gt` - 21 edges
7. `Ue` - 20 edges
8. `fs` - 18 edges
9. `stringToUTF8()` - 17 edges
10. `Ai` - 16 edges

## Surprising Connections (you probably didn't know these)
- `0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 13 → community 11_
- `5e62a51 update change-balls to version 1.3.0` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 49 → community 11_
- `5e62a51 update change-balls to version 1.3.0` --PARENT_OF--> `fdf34ba feat: rebuild Hit The Coin with Phaser 3 and setup GitHub Actions Pages deployment`  [EXTRACTED]
  git → git  _Bridges community 49 → community 13_
- `Ab()` --calls--> `t()`  [EXTRACTED]
  vega/lib/gsap.min.js → vega/lib/gsap.min.js  _Bridges community 41 → community 28_
- `ac()` --calls--> `t()`  [EXTRACTED]
  vega/lib/gsap.min.js → vega/lib/gsap.min.js  _Bridges community 15 → community 28_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.00
Nodes (2): EngineConfig, NOTE: We must explicitly pass the default, accessing it via

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (3): Ai, Mi, Ni

### Community 2 - "Community 2"
Cohesion: 0.04
Nodes (51): _emscripten_glUniform1f(), _emscripten_glUniform1fv(), _emscripten_glUniform1i(), _emscripten_glUniform1iv(), _emscripten_glUniform1ui(), _emscripten_glUniform1uiv(), _emscripten_glUniform2f(), _emscripten_glUniform2fv() (+43 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (11): dt, Gt, It, j(), k(), Nt, rt, Ut (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (12): ee(), Kd(), la(), Ld(), ma(), na(), Od(), Q() (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (40): _emscripten_glBindAttribLocation(), _emscripten_glGetAttribLocation(), _emscripten_glGetFragDataLocation(), _emscripten_glGetUniformBlockIndex(), _emscripten_glGetUniformIndices(), _emscripten_glGetUniformLocation(), _emscripten_glTransformFeedbackVaryings(), _emscripten_webgl_create_context() (+32 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (2): at, Ot

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (36): __addDays(), allocateUTF8(), allocateUTF8OnStack(), __arraySum(), ccall(), cwrap(), _emscripten_glGetActiveAttrib(), _emscripten_glGetActiveUniform() (+28 more)

### Community 8 - "Community 8"
Cohesion: 0.09
Nodes (7): at, Gt, It, Nt, st(), tt(), Ut

### Community 9 - "Community 9"
Cohesion: 0.11
Nodes (1): GameScene

### Community 10 - "Community 10"
Cohesion: 0.08
Nodes (14): A, c, f, G, I, l, o(), p (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.15
Nodes (26): main, 07c6be3 add change balls v1.2.1, 1270fdf change text and hover color, 19f781f add bola game, 37be431 add ponge v1.1.3, 41bf5e3 add bola, flappy, hit the coin images, 5327790 add deadzone to flappy bird sky, 60c8c84 Update CNAME (+18 more)

### Community 12 - "Community 12"
Cohesion: 0.26
Nodes (21): a(), b(), c(), d(), e(), f(), g(), h() (+13 more)

### Community 13 - "Community 13"
Cohesion: 0.23
Nodes (12): 0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript and vite, 385e2de fix(hit-the-coin): prevent duplicate bgm_menu on return from result scene and ensure loop, c3fedc4 feat(flappy-bird): release v1.2.0 enhanced remake with custom characters, audio, and visual polish, fdf34ba feat: rebuild Hit The Coin with Phaser 3 and setup GitHub Actions Pages deployment, GameState, PipePair, ResultData, GAME_CONFIG (+4 more)

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (1): fe

### Community 15 - "Community 15"
Cohesion: 0.14
Nodes (20): _a(), ac(), Bo(), db(), eb(), ga(), gb(), hb() (+12 more)

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (20): add(), create(), _godot_audio_script_create(), _godot_audio_worklet_create(), _godot_js_display_fullscreen_cb(), _godot_js_display_notification_cb(), _godot_js_display_setup_canvas(), _godot_js_display_window_blur_cb() (+12 more)

### Community 17 - "Community 17"
Cohesion: 0.11
Nodes (2): J, W

### Community 18 - "Community 18"
Cohesion: 0.13
Nodes (1): gi

### Community 19 - "Community 19"
Cohesion: 0.24
Nodes (1): fs

### Community 20 - "Community 20"
Cohesion: 0.18
Nodes (2): e(), Qi

### Community 21 - "Community 21"
Cohesion: 0.22
Nodes (1): Rt

### Community 22 - "Community 22"
Cohesion: 0.24
Nodes (2): GodotProcessor, RingBuffer

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (15): __colorChannelsInGlTextureFormat(), computeUnpackAlignedImageSize(), _emscripten_glReadPixels(), _emscripten_glTexImage2D(), _emscripten_glTexImage3D(), _emscripten_glTexSubImage2D(), _emscripten_glTexSubImage3D(), emscriptenWebGLGetTexPixelData() (+7 more)

### Community 24 - "Community 24"
Cohesion: 0.13
Nodes (15): _emscripten_glGenBuffers(), _emscripten_glGenFramebuffers(), _emscripten_glGenQueries(), _emscripten_glGenRenderbuffers(), _emscripten_glGenSamplers(), _emscripten_glGenTextures(), _emscripten_glGenTransformFeedbacks(), _emscripten_glGenVertexArrays() (+7 more)

### Community 25 - "Community 25"
Cohesion: 0.22
Nodes (1): we

### Community 26 - "Community 26"
Cohesion: 0.21
Nodes (1): Os

### Community 27 - "Community 27"
Cohesion: 0.14
Nodes (14): _emscripten_glGetBooleanv(), _emscripten_glGetBufferParameteri64v(), _emscripten_glGetFloatv(), _emscripten_glGetInteger64i_v(), _emscripten_glGetInteger64v(), _emscripten_glGetIntegeri_v(), _emscripten_glGetIntegerv(), _emscripten_glGetQueryObjecti64vEXT() (+6 more)

### Community 28 - "Community 28"
Cohesion: 0.21
Nodes (13): _assertThisInitialized(), Ec(), Fc(), gc(), qa(), t(), Timeline(), Tween() (+5 more)

### Community 29 - "Community 29"
Cohesion: 0.19
Nodes (13): be(), _d(), ea(), fa(), ia(), ie(), je(), ke() (+5 more)

### Community 30 - "Community 30"
Cohesion: 0.15
Nodes (13): ___call_sighandler(), getWasmTableEntry(), invoke_ii(), invoke_iii(), invoke_iiii(), invoke_iiiii(), invoke_iiiiii(), invoke_iiiiiii() (+5 more)

### Community 31 - "Community 31"
Cohesion: 0.30
Nodes (1): Ne

### Community 32 - "Community 32"
Cohesion: 0.20
Nodes (1): Ue

### Community 33 - "Community 33"
Cohesion: 0.30
Nodes (9): D(), F(), I(), L(), M(), N(), O(), P() (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.18
Nodes (11): abort(), __dlopen_js(), __dlsym_js(), getBinary(), getBinaryPromise(), getRandomDevice(), getValue(), mmapAlloc() (+3 more)

### Community 35 - "Community 35"
Cohesion: 0.22
Nodes (1): q

### Community 36 - "Community 36"
Cohesion: 0.22
Nodes (1): Se

### Community 37 - "Community 37"
Cohesion: 0.28
Nodes (9): Aa(), Animation(), ha(), ja(), Jc(), Lc(), Ra(), Sa() (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.22
Nodes (9): addOnPostRun(), addOnPreRun(), callRuntimeCallbacks(), exitRuntime(), initRuntime(), postRun(), preMain(), preRun() (+1 more)

### Community 39 - "Community 39"
Cohesion: 0.25
Nodes (8): assert(), _emscripten_set_main_loop(), _emscripten_set_main_loop_timing(), handleMessage(), runtimeKeepalivePop(), runtimeKeepalivePush(), safeSetTimeout(), setMainLoop()

### Community 40 - "Community 40"
Cohesion: 0.36
Nodes (8): callMain(), callUserCallback(), _exit(), ExitStatus(), handleException(), keepRuntimeAlive(), maybeExit(), procExit()

### Community 41 - "Community 41"
Cohesion: 0.29
Nodes (7): Ab(), Bb(), cb(), Context(), Ew(), fb(), zb()

### Community 42 - "Community 42"
Cohesion: 0.43
Nodes (1): MenuScene

### Community 43 - "Community 43"
Cohesion: 0.47
Nodes (1): ResultScene

### Community 44 - "Community 44"
Cohesion: 0.40
Nodes (1): U

### Community 45 - "Community 45"
Cohesion: 0.40
Nodes (5): addRunDependency(), asyncLoad(), createWasm(), getUniqueRunDependency(), removeRunDependency()

### Community 46 - "Community 46"
Cohesion: 0.40
Nodes (5): _emscripten_glGetVertexAttribfv(), _emscripten_glGetVertexAttribIiv(), _emscripten_glGetVertexAttribIuiv(), _emscripten_glGetVertexAttribiv(), emscriptenWebGLGetVertexAttrib()

### Community 47 - "Community 47"
Cohesion: 0.40
Nodes (5): _environ_get(), _environ_sizes_get(), getEnvStrings(), getExecutableName(), writeAsciiToMemory()

### Community 48 - "Community 48"
Cohesion: 0.40
Nodes (3): CACHABLE_FILES, CACHED_FILES, FULL_CACHE

### Community 49 - "Community 49"
Cohesion: 0.50
Nodes (2): 5e62a51 update change-balls to version 1.3.0, ebd193e change domain and convert images to webp

### Community 50 - "Community 50"
Cohesion: 0.50
Nodes (4): ka(), tb(), xa(), za()

### Community 51 - "Community 51"
Cohesion: 0.50
Nodes (4): _emscripten_glGetUniformfv(), _emscripten_glGetUniformiv(), _emscripten_glGetUniformuiv(), emscriptenWebGLGetUniform()

### Community 52 - "Community 52"
Cohesion: 0.50
Nodes (4): emscripten_realloc_buffer(), _emscripten_resize_heap(), getHeapMax(), updateGlobalBufferAndViews()

### Community 53 - "Community 53"
Cohesion: 0.50
Nodes (4): _emscripten_webgl_do_get_current_context(), _emscripten_webgl_get_current_context(), _godot_js_display_glGetBufferSubData(), _godot_webxr_initialize()

### Community 54 - "Community 54"
Cohesion: 0.50
Nodes (1): AboutScene

### Community 55 - "Community 55"
Cohesion: 0.50
Nodes (1): BootScene

### Community 56 - "Community 56"
Cohesion: 0.67
Nodes (3): convertI32PairToI53(), _emscripten_glClientWaitSync(), _emscripten_glWaitSync()

### Community 57 - "Community 57"
Cohesion: 1.00
Nodes (2): convertI32PairToI53Checked(), _fd_seek()

### Community 58 - "Community 58"
Cohesion: 1.00
Nodes (2): doCallback(), done()

### Community 59 - "Community 59"
Cohesion: 1.00
Nodes (2): doReadv(), _fd_read()

### Community 60 - "Community 60"
Cohesion: 1.00
Nodes (2): doWritev(), _fd_write()

### Community 61 - "Community 61"
Cohesion: 1.00
Nodes (2): _emscripten_glDrawRangeElements(), _glDrawElements()

### Community 62 - "Community 62"
Cohesion: 1.00
Nodes (2): _emscripten_webgl_commit_frame(), _emscripten_webgl_do_commit_frame()

### Community 63 - "Community 63"
Cohesion: 1.00
Nodes (2): finish(), processData()

### Community 64 - "Community 64"
Cohesion: 1.00
Nodes (2): setErrNo(), ___syscall_fcntl64()

### Community 66 - "Community 66"
Cohesion: 1.00
Nodes (1): NOTE: We must explicitly pass the default, accessing it via

## Knowledge Gaps
- **27 isolated node(s):** `Window`, `phaserConfig`, `game`, `GameState`, `PipePair` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 0`** (2 nodes): `EngineConfig`, `NOTE: We must explicitly pass the default, accessing it via`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (2 nodes): `at`, `Ot`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (1 nodes): `GameScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (1 nodes): `fe`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (2 nodes): `J`, `W`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (1 nodes): `gi`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (1 nodes): `fs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `e()`, `Qi`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (1 nodes): `Rt`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `GodotProcessor`, `RingBuffer`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `we`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (1 nodes): `Os`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `Ne`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `Ue`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `q`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `Se`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `MenuScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `ResultScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `U`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (2 nodes): `5e62a51 update change-balls to version 1.3.0`, `ebd193e change domain and convert images to webp`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (1 nodes): `AboutScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (1 nodes): `BootScene`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (2 nodes): `convertI32PairToI53Checked()`, `_fd_seek()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (2 nodes): `doCallback()`, `done()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (2 nodes): `doReadv()`, `_fd_read()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (2 nodes): `doWritev()`, `_fd_write()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (2 nodes): `_emscripten_glDrawRangeElements()`, `_glDrawElements()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (2 nodes): `_emscripten_webgl_commit_frame()`, `_emscripten_webgl_do_commit_frame()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (2 nodes): `finish()`, `processData()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (2 nodes): `setErrNo()`, `___syscall_fcntl64()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `NOTE: We must explicitly pass the default, accessing it via`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Ni` connect `Community 1` to `Community 33`, `Community 35`, `Community 17`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `GameScene` connect `Community 9` to `Community 13`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `Ot` connect `Community 6` to `Community 33`, `Community 17`, `Community 14`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `Window`, `phaserConfig`, `game` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0044943820224719105 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05028248587570622 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0392156862745098 - nodes in this community are weakly interconnected._