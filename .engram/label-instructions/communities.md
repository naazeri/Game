# Community Labeling

Engram is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the community listing below
and write 2-5 word plain-language names for each.

## Language

LANGUAGE: each community line ends with a `[lang=…]` marker giving the
language of its source nodes. Write that community's name in EXACTLY that
language. Do not normalize every name to one common language.

## Communities

Community 0: Ai, Ni, .changeContent(, ._checkContent(, .constructor(, .Default(, .DefaultType(, .getContent(, .hasContent(, ._maybeSanitize(, .NAME(, ._putElementInTemplate( [lang=en]
Community 1: Ue, gi, ._addEventListeners(, .constructor(, .Default(, .DefaultType(, .dispose(, .hide(, ._initializeFocusTrap(, .jQueryInterface(, .NAME(, .show( [lang=en]
Community 2: 0d024c8 feat(flappy-bird): rebuild with phaser 3, typescript, 385e2de fix(hit-the-coin): prevent duplicate bgm_menu on ret, c3fedc4 feat(flappy-bird): release v1.2.0 enhanced remake wi, fdf34ba feat: rebuild Hit The Coin with Phaser 3 and setup G, vite.config.ts, AboutScene.ts, AboutScene, .constructor(, .create(, .handleResize(, BootScene.ts, BootScene [lang=en]
Community 3: gsap.min.js, Ad(, Bd(, Ca(, Cd(, Dd(, de(, Ed(, ee(, Fd(, Gd(, gn( [lang=nl]
Community 4: Ot, at, .constructor(, .Default(, .DefaultType(, .dispose(, ._end(, ._eventIsPointerPenTouch(, ._handleSwipe(, ._initEvents(, .isSupported(, ._move( [lang=en]
Community 5: fe, .clearMenus(, ._completeHide(, .constructor(, ._createPopper(, .dataApiKeydownHandler(, .Default(, .DefaultType(, ._detectNavbar(, .dispose(, ._getConfig(, ._getOffset( [lang=en]
Community 6: Gt, index-UfWfaUyg.js, at, .applyBirdSkin(, .constructor(, .create(, .createGameOverUI(, .createGlobalControls(, .createInGameHUD(, .createReadyUI(, .cycleBirdSkin(, .flap( [lang=en]
Community 7: main, export-web.loader.js, createUnityInstance(, 07c6be3 add change balls v1.2.1, 1270fdf change text and hover color, 19f781f add bola game, 37be431 add ponge v1.1.3, 41bf5e3 add bola, flappy, hit the coin images, 5327790 add deadzone to flappy bird sky, 5e62a51 update change-balls to version 1.3.0, 60c8c84 Update CNAME, 79daffc add landing page [lang=en]
Community 8: bootstrap.min.js, D(, F(, H(, I(, J, .jQueryInterface(, .NAME(, .toggle(, L(, M(, N( [lang=en]
Community 9: index-B4CLjEYc.js, dt, Gt, .constructor(, .create(, .createButton(, .createFullscreenButton(, .handleResize(, .playMenuMusic(, It, .preload(, j( [lang=en]
Community 10: GameScene, .applyBirdSkin(, .clearPanicTicks(, .constructor(, .create(, .createGameOverUI(, .createGlobalControls(, .createInGameHUD(, .createReadyUI(, .cycleBirdSkin(, .endGame(, .flap( [lang=en]
Community 11: index-3509133a.js, A, b(, c, f, G, I, .constructor(, .draw(, .update(, l, o( [lang=pt]
Community 12: UnityLoader.js, a(, b(, c(, d(, e(, f(, g(, h(, i(, l(, m( [lang=pt]
Community 13: _a(, ac(, Bo(, db(, eb(, ga(, gb(, hb(, lb(, oa(, ob(, r( [lang=pt]
Community 14: Qi, e(, ._activateParents(, ._clearActiveClass(, ._configAfterMerge(, .constructor(, .Default(, .DefaultType(, .dispose(, ._getNewObserver(, ._initializeTargetsAndObservables(, .jQueryInterface( [lang=en]
Community 15: fs, ._activate(, .constructor(, ._deactivate(, ._elemIsActive(, ._getActiveElem(, ._getChildren(, ._getInnerElement(, ._getOuterElement(, ._keydown(, .NAME(, ._setAttributeIfNotExists( [lang=en]
Community 16: Rt, ._addAriaAndCollapsedClass(, ._configAfterMerge(, .constructor(, .Default(, .DefaultType(, ._getDimension(, ._getFirstLevelChildren(, .hide(, ._initializeChildren(, ._isShown(, .jQueryInterface( [lang=en]
Community 17: ._initializeBackDrop(, we, ._append(, ._configAfterMerge(, .constructor(, .Default(, .DefaultType(, .dispose(, ._emulateAnimation(, ._getElement(, .hide(, .NAME( [lang=en]
Community 18: Os, ._clearTimeout(, .constructor(, .Default(, .DefaultType(, .dispose(, .hide(, .isShown(, .jQueryInterface(, ._maybeScheduleHide(, .NAME(, ._onInteraction( [lang=pt]
Community 19: Nt, .clearPanicTicks(, .constructor(, .create(, .endGame(, .handleCoinHit(, .handleMiss(, .handleResize(, .init(, .repositionCoin(, .showFloatingText(, .spawnParticleBurst( [lang=en]
Community 20: _assertThisInitialized(, Ec(, Fc(, gc(, qa(, t(, Timeline(, Tween(, ua(, va(, w(, wb( [lang=en]
Community 21: be(, _d(, ea(, fa(, ia(, ie(, je(, ke(, le(, oe(, Pd(, we( [lang=fr]
Community 22: Aa(, Animation(, ha(, ja(, Jc(, Lc(, Ra(, Sa(, Sb( [lang=fr]
Community 23: Ab(, Bb(, cb(, Context(, Ew(, fb(, zb( [lang=en]
Community 24: ka(, tb(, xa(, za( [lang=en]
Community 25: NOTE: We must explicitly pass the default, accessing it via [lang=en]
Community 26: NOTE: We must explicitly pass the default, accessing it via [lang=en]

## Instructions

Write a single JSON object mapping each community id (as a string) to its
2-5 word name to: C:\Users\Reza\Documents\Project\me\Game\.engram\label-instructions\communities.json

Example:
```json
{
  "0": "Authentication Flow",
  "1": "Authentication Flow",
  "2": "Authentication Flow"
}
```

Then re-run `engram update` (or `engram label`) to ingest the names.
