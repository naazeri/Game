# media-capture — gameplay clips & screenshots for the portal

This dev-only tool **plays each game with a bot, records a short gameplay clip, takes 3 screenshots, encodes them, and drops them where the Astro portal expects them**. Nothing here is hand-made. If you follow this document you can reproduce (or extend) the exact same result.

It is **not** part of the pnpm workspace (see `pnpm-workspace.yaml` in this folder), so CI never installs it.

---

## 0. TL;DR

```powershell
# 1. from the repo root: build everything and assemble the static site
pnpm build ; pnpm site

# 2. serve it (leave running in the background) on http://localhost:4173
pnpm exec sirv _site --port 4173

# 3. one-time install of the tool
cd tools/media-capture ; pnpm install

# 4. capture (all games, or just the ones you name)
node capture.mjs                # all games that have a recipe
node capture.mjs ponge poke     # selected games

# 5. rebuild the portal so it picks up the new files, re-assemble, restart sirv, check
cd ../.. ; pnpm build:portal ; pnpm site
```

Outputs (per game `<slug>`):

| File | Used for |
|---|---|
| `apps/portal/public/media/<slug>/clip.webm` | hero video (VP9) |
| `apps/portal/public/media/<slug>/clip.mp4` | hero video fallback (H.264) |
| `apps/portal/public/media/<slug>/poster.webp` | video poster |
| `apps/portal/src/assets/games/<slug>/shot-1.webp … shot-3.webp` | screenshot gallery (lightbox) |

The portal discovers them **by convention** (`apps/portal/src/lib/games.ts`): a clip is used only if both `clip.webm` and `clip.mp4` exist; screenshots are every `shot-*.webp`. No config change is needed after capturing. The hero falls back to the thumbnail when there is no clip.

---

## 1. Prerequisites and environment facts (learned the hard way)

1. **Windows + PowerShell.** The Git-Bash `node` shim (fnm) can fail with “We can't find the necessary environment variables…”. Use the **PowerShell** tool/terminal for `node`, `pnpm`, `npx`.
2. **Use an installed full browser (Microsoft Edge), not Playwright's bundled Chromium.**
   - The bundled `chromium-1254` fails to start on the dev machine (`spawn UNKNOWN` / side-by-side configuration error).
   - Playwright's *headless shell* only renders in software (SwiftShader) at **~12 fps**. Phaser clamps its time step, so the recording looks like slow motion. Real Edge with GPU gives **~60 fps**.
   - `capture.mjs` launches `channel: 'msedge'` in new headless mode. Override with `PW_CHANNEL=chrome` if needed. Do **not** pass `--use-angle=swiftshader`.
3. **Install:** `cd tools/media-capture ; pnpm install`.
   - `pnpm-workspace.yaml` here contains `allowBuilds: { ffmpeg-static: true }`. Without it pnpm refuses to run ffmpeg-static's download script (`ERR_PNPM_IGNORED_BUILDS`).
   - `ffmpeg-static` supplies `ffmpeg` (with libvpx-vp9, libx264 and libwebp). Nothing else (no system ffmpeg) is needed.
   - You do **not** need `playwright install` (the bundled browsers are unused).
4. **The site must be served at `BASE_URL` (default `http://localhost:4173`)** and must contain the *assembled* site, i.e. games live at `/<slug>/`:
   - `pnpm build` (all apps) → `pnpm site` (`scripts/assemble-site.mjs` writes `_site/`) → `pnpm exec sirv _site --port 4173`.
   - `sirv` caches its file list at start-up. **After every rebuild, stop it and start it again** (find the process: `Get-NetTCPConnection -LocalPort 4173 -State Listen`, then `Stop-Process -Id <OwningProcess>`).
   - `Start-Process pnpm …` does not work on Windows (`%1 is not a valid Win32 application`); run the server as a background command instead.
5. Node 22+ is required by the repo. (`astro check` crashes on Node 26 — unrelated to this tool; it is why `build` does not run it.)

---

## 2. How `capture.mjs` works (read this before editing it)

Per game, `capture(browser, slug)`:

1. Opens a fresh browser context (fresh `localStorage`, so no saved high scores/skins/mute state leak into the clip) with the game's viewport and `deviceScaleFactor: 1`, then loads `${BASE}/${slug}/`.
2. Waits until the Phaser game exists and the **ready scene** is active (`game.isBooted && game.scene.isActive(cfg.ready)`), then sleeps 1.2 s so fonts/tweens settle. The game object is exposed as `window.game` (poke, flappy-bird, hit-the-coin) or `window.__game` (ponge, change-balls) — the code uses `window.game || window.__game`.
3. Computes the **canvas → client coordinate mapping** from `game.canvas.getBoundingClientRect()` and `game.scale.gameSize`. All click/mouse positions in recipes are in **game coordinates**; `toClient(x, y)` converts them.
4. Starts recording **inside the page**: `canvas.captureStream(30)` + `MediaRecorder` (`video/webm;codecs=vp9`, 6 Mbit/s). Only the canvas is recorded (no browser chrome, no mouse cursor). Chunks are kept in `window.__chunks`.
5. Clicks the game's start button (`cfg.start`) and runs the **bot** (`cfg.bot`) until `recordMs` has elapsed since that click.
6. Takes 3 canvas screenshots (`canvas.screenshot`) at `cfg.shotsAt` milliseconds after the click.
7. Stops the recorder, returns the blob to Node as base64, writes `.tmp/<slug>.raw.webm`.
8. Encodes with `ffmpeg-static` (see §5) and writes the files listed in §0.
9. Prints one line: `slug: fps~60, scene=GameScene, webm NNKB, mp4 NNKB`. **`fps` must be ~60 and `scene` must be the gameplay scene** — if not, something is wrong (see §7).

The width used when scaling comes from `apps/portal/src/content/games.json` → `media: [width, height]` of that game (`mediaWidth(slug)`).

---

## 3. Per-game recipes (current state)

Coordinates are game coordinates. `trimMs` is cut from the start of the clip (countdown/serve), `recordMs` is measured from the start click.

| slug | viewport | ready scene | start click | recordMs | trimMs | screenshots at (ms) |
|---|---|---|---|---|---|---|
| `ponge` | 1280×720 | `MenuScene` | (480, 230) “1 PLAYER (VS AI)” | 9000 | 900 | 2600, 5200, 7600 |
| `poke` | 1280×720 | `GameScene` (it *is* the menu, `state==='MENU'`) | (640, 403) “Start” | 10500 | 1900 (“Get ready…” countdown is 1.6 s) | 3600, 6500, 9200 |
| `change-balls` | 1280×720 | `MenuScene` | (640, 390) “1 PLAYER” | 9500 | 400 | 2500, 5000, 7500 |
| `flappy-bird` | 480×854 (portrait) | `GameScene` (`state==='READY'`) | (240, 400) any click flaps/starts | 9000 | 250 | 3000, 5500, 8000 |
| `hit-the-coin` | 1280×720 | `MenuScene` | (width/2, height×0.52) “Start” — `Scale.RESIZE`, so game coords = viewport px | 9000 | 250 | 2500, 5000, 7500 |

### The bots (they read live Phaser state through the game object)

All state is read with `page.evaluate` against `scene = game.scene.getScene('GameScene')`. TypeScript `private` fields are normal properties at runtime. A tick is 16–30 ms.

- **ponge** — 1 player vs AI. Left paddle follows the ball only while the ball moves toward it (`ball.vx < 0`), otherwise returns to the middle. Reads `scene.ball.{x,y,vx}` and `scene.paddleLeft.y`; presses/holds `w` / `s` (14 px dead zone).
- **poke** — mouse-driven (the hamster follows the pointer). Only acts when `scene.state === 'PLAYING'`. Each tick it samples 24 directions × 3 radii around the player, scores each candidate by distance to the *predicted* positions (t = 0, 0.25, 0.5 s) of all dogs in `scene.mobs`, subtracts a small pull toward the centre, and moves the real mouse to the best point (smoothed 60 %). Keeps the hamster alive for the whole clip.
- **change-balls** — reads the central ball (`centralBall.container.x`, `.vx`, `.currentColor`) and the pillars (`leftPillar/rightPillar.getActiveColor()`, `.container.x`). Both pillars flip together on Space. If the pillar the ball is heading toward doesn't match the ball's colour and the ball is > 170 px away, press **Space** (at most once per 260 ms, because the flip animation takes 140 ms).
- **flappy-bird** — reads `bird.y`, `bird.body.velocity.y`, and the next pipe pair (`pipePairs.find(p => p.topPipe.active && p.topPipe.x + 40 > bird.x)`); gap centre = `(topPipe.y + bottomPipe.y) / 2`. Flaps (**Space**) when the bird is below `gapCentre + 18`, not already rising fast (`vy > -80`), and ≥ 140 ms since the last flap.
- **hit-the-coin** — reads `scene.coin.{x,y}` and clicks it every 330–520 ms (human-ish pace).

---

## 4. Adding a new game (or re-doing one) — step by step

Do these in order; each step has a concrete check.

1. **Get the facts about the game** (read its source in `apps/<slug>/src`):
   - the scene keys (`super('GameScene')` etc.) and which scene is the menu;
   - the **start action** (which button/key, where it is in game coordinates; how long until gameplay really begins);
   - canvas size and scale mode (`src/main.ts`: `Scale.FIT` fixed size vs `Scale.RESIZE`);
   - how the game is exposed on `window` (`window.game` / `window.__game`). If it is not exposed, add `(window as unknown as { game: Phaser.Game }).game = game;` in `main.ts` (this is the convention in all other games);
   - which fields hold the state the bot needs (player/ball/enemies/obstacles) and the game-over condition.
2. **Make sure the game is built and assembled** (`pnpm build ; pnpm site`) and that `http://localhost:4173/<slug>/` loads.
3. **Add a recipe** to the `GAMES` object in `capture.mjs`, copying the shape of an existing one:

   ```js
   'my-game': {
     viewport: { width: 1280, height: 720 },
     ready: 'MenuScene',                 // scene that must be active before we start
     start: () => [640, 400],            // click in GAME coordinates (or (size) => [size.w/2, size.h*0.5])
     recordMs: 9000,                     // recording length after the click
     trimMs: 400,                        // cut from the start of the clip (countdown/serve)
     shotsAt: [2500, 5000, 7500],        // 3 screenshot moments (ms after the click)
     async bot(c) {                      // c = { page, toClient, stopped() }
       while (!c.stopped()) {
         const s = await c.page.evaluate(`(() => {
           const sc = (window.game || window.__game).scene.getScene('GameScene');
           if (!sc) return null;
           return { /* only plain numbers/strings */ };
         })()`);
         if (s) { /* decide, then c.page.keyboard.press(...) / c.page.mouse.move(...toClient(x, y)) */ }
         await new Promise((r) => setTimeout(r, 25));
       }
     },
   },
   ```

   Rules for bots: return only plain JSON from `evaluate`; keep ticks 16–30 ms; use `c.toClient` for every mouse position; release any held keys before returning; **play well enough not to die** during the recorded window (a game-over screen in the clip is a failure).
4. **Add the game to the portal data** (`apps/portal/src/content/games.json`, see §6) including `"media": [width, height]` that matches the clip you will produce (landscape 16:9 → `[960, 540]`; ponge's 960×600 canvas → `[960, 600]`; portrait flappy → `[480, 854]`). `thumb.webp` must exist at `apps/portal/src/assets/games/<slug>/thumb.webp` or the portal build throws.
5. **Run it:** `node capture.mjs <slug>`. Expect `fps~60`.
6. **Look at the result yourself** (§8) — do not skip this.
7. **Rebuild + reassemble + restart the server**, open the details page, run `node smoke.mjs` (§9).

To redo a single game later (e.g. after a visual change), just run `node capture.mjs <slug>` again; it overwrites that game's files only.

---

## 5. Encoding settings and why

`ffmpeg` is called through `ffmpeg-static` with `-y -loglevel error`.

- Input trim: `-ss <trimMs/1000>` **before** `-i` (fast seek).
- Filter: `scale=<W>:-2:flags=lanczos,fps=30` where `W = media[0]` from `games.json`. (`-2` keeps the height even, required by H.264.) No audio (`-an`): the clip is muted and decorative.
- **WebM:** `-c:v libvpx-vp9 -b:v 0 -crf 37 -row-mt 1 -deadline good -cpu-used 2`.
- **MP4:** `-c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart` (`+faststart` lets the video start before it fully downloads).
- **Poster:** one frame at `trim + 1.2 s` → `libwebp -quality 80`.
- **Screenshots:** the canvas PNGs from Playwright are converted to `libwebp -quality 82`, scaled with `scale='min(W,iw)':-2` (never upscaled).

Resulting sizes are small (each clip ≈ 60–280 KB per format, each screenshot ≈ 6–40 KB). If a clip is ever > ~1 MB, raise `-crf` (e.g. 40 for VP9, 30 for x264) or shorten `recordMs`.

Hero-video markup lives in `apps/portal/src/pages/games/[slug].astro`: `<video autoplay muted loop playsinline preload="metadata" poster=… width height>` with the webm source first and mp4 second; a small script disables autoplay (and shows controls) for users with `prefers-reduced-motion`.

---

## 6. How the clips get onto the site

Nothing needs wiring; it is all convention:

1. `capture.mjs` writes files to `apps/portal/public/media/<slug>/` and `apps/portal/src/assets/games/<slug>/`.
2. `apps/portal/src/lib/games.ts`
   - `findClip(slug)` checks that `public/media/<slug>/clip.webm` **and** `clip.mp4` exist (relative to the portal's cwd, i.e. `apps/portal`), and returns the URLs (`/media/<slug>/clip.webm` …, poster `/media/<slug>/poster.webp`);
   - `import.meta.glob('/src/assets/games/*/shot-*.webp')` collects the screenshots (sorted numerically);
   - `thumb.webp` is the list/OG image.
3. `apps/portal/src/content/games.json` holds the text and display data. Fields used by media: `media: [w, h]` (reserves space; the hero container uses its aspect ratio), `accent` (colour glow), `published` (`false` hides the game everywhere). Schema: `apps/portal/src/content.config.ts`.
4. Deploy: `.github/workflows/deploy.yml` → `pnpm -r run build` → `node scripts/assemble-site.mjs` → Pages. Files in `apps/portal/public/` end up at the site root (`/media/<slug>/…`); `src/assets` images are optimised by Astro into `/_astro/…`.

So the complete “put it on the site” procedure after capturing is:

```powershell
pnpm build:portal ; pnpm site          # portal rebuilt, _site reassembled
# restart sirv (stop old process on :4173, start again), then:
node tools/media-capture/smoke.mjs     # see §9
git add apps/portal/public/media apps/portal/src/assets/games apps/portal/src/content/games.json tools/media-capture
git commit                              # e.g. "feat(portal): add gameplay clip for <slug>"
git push origin main                    # triggers the GitHub Pages deploy
```

(Only commit/push when the owner asks for it.)

---

## 7. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `fps~12`, game looks like slow motion in the clip | Software rendering. Use the installed Edge/Chrome (`PW_CHANNEL`), not the bundled headless shell. Do not add SwiftShader flags. |
| `browserType.launch: spawn UNKNOWN` | You asked for the bundled `chromium` channel. Use `msedge` (default) or `chrome`. |
| `ERR_CONNECTION_REFUSED` on `localhost:4173` | `sirv` not running / was stopped. Start it again in the background. |
| Portal shows old media or 404 for new files | You did not `pnpm build:portal ; pnpm site` and restart `sirv` (it caches the file list). |
| `Timeout … waitForFunction` at start | Wrong `ready` scene key, game not exposed on `window.game`/`window.__game`, or the page path is wrong (`/<slug>/` must exist in `_site`). |
| Clip shows the menu / “Get ready” / game-over | Wrong `start` coordinates, too small `trimMs`, or the bot dies. Fix the recipe and re-run only that slug. |
| Clip is static (only ~25 KB and nothing moves) | Bot not acting (state read returns `null`: wrong field names/scene key). Run the `evaluate` snippet in the browser console of the game to see real property names. |
| `ffmpeg failed: …` | Read the printed stderr. `scale` width must come from `games.json` `media[0]`; even heights are required (`-2`). |
| `ERR_PNPM_IGNORED_BUILDS: ffmpeg-static` | `tools/media-capture/pnpm-workspace.yaml` is missing/changed; it must contain `allowBuilds: { ffmpeg-static: true }`. |
| `Cannot write more than one file with the same name` (when making contact sheets) | Add `-frames:v 1` to the ffmpeg command (see §8). |
| Portal build throws `Missing thumbnail: …/thumb.webp` | Add `apps/portal/src/assets/games/<slug>/thumb.webp` (900×600 title card). |
| `Start-Process pnpm` → “not a valid Win32 application” | Run `pnpm exec sirv _site --port 4173` as a background command instead. |
| `node` fails in Git Bash with fnm error | Use PowerShell. |

---

## 8. Quality check (required before you say “done”)

Look at what you produced. A contact sheet shows one frame per second:

```powershell
$ff = node -e "import('ffmpeg-static').then(m=>console.log(m.default))"      # run inside tools/media-capture
mkdir .tmp -Force | Out-Null
& $ff -y -loglevel error -i ..\..\apps\portal\public\media\<slug>\clip.mp4 `
  -vf "fps=1,scale=320:-1,tile=4x2" -frames:v 1 .tmp\sheet-<slug>.png
```

Open `.tmp/sheet-<slug>.png` (and one `shot-N.webp`) with an image viewer / the Read tool and confirm:

- [ ] the **score/rally counter increases** from frame to frame (the bot is really playing);
- [ ] no menu, countdown, pause, About modal, or **game-over** screen appears in the clip;
- [ ] the game fills the frame (no black bars, no browser UI, no cursor artefacts);
- [ ] screenshots show different moments (not three identical frames);
- [ ] portrait games stay portrait (flappy-bird 480×854);
- [ ] file sizes are small (clip ≲ 300 KB per format; if far larger, check the clip isn't noisy/huge).

The `.tmp/` folder is git-ignored; delete it when done.

---

## 9. Verifying the site (`smoke.mjs`)

`node smoke.mjs` (site served on :4173) runs ~55 end-to-end checks with Edge: landing page lists the games, every card links to `/games/<slug>/`, each details page has a PLAY link with `href="/<slug>/" target="_blank" rel="noopener"`, the source link points to `https://github.com/naazeri/Game/tree/main/apps/<slug>`, the clip + 3 screenshots exist, canonical/OG tags are right, PLAY really opens the game in a new tab and the game boots, lightbox opens/closes, hidden games are 404, `/404.html` exists, sitemap/robots/manifest/CNAME are served, mobile has a sticky PLAY bar and no horizontal scroll, and there are no console errors. It must end with `All checks passed`.

> **Known limitation:** the list of games it expects is hard-coded at the top of `smoke.mjs` (`SLUGS = [...]`, “lists N games”, “Vega is not listed”, “3 screenshots present”, “gameplay clip present”). When a game is published, hidden, or has no clip yet, **update that list and those expectations** or the test will fail for the wrong reason.

Also eyeball the page once in a browser (desktop and a 375 px-wide viewport): hero video plays and loops, no layout jump, PLAY bar visible on mobile.

---

## 10. Current coverage

| Game | Clip | Screenshots | Capture recipe |
|---|---|---|---|
| ponge, poke, change-balls, flappy-bird, hit-the-coin | yes | 3 each | yes |
| vega | no (not recorded yet) | 3 | **no recipe yet** — follow §4 to add one |
