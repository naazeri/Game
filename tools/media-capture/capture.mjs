// Plays each game headlessly with a small bot and produces the portal media:
//   apps/portal/public/media/<slug>/clip.webm | clip.mp4 | poster.webp
//   apps/portal/src/assets/games/<slug>/shot-1..3.webp
//
// Usage (the assembled site must be served, e.g. `pnpm preview:site` or `pnpm exec sirv _site --port 4173`):
//   node capture.mjs                # all games
//   node capture.mjs ponge poke     # selected games
//   BASE_URL=http://localhost:4173 node capture.mjs
import { chromium } from 'playwright-core';
import ffmpegPath from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { playVega } from './bots/vega.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const portal = path.resolve(here, '../../apps/portal');
const tmpDir = path.join(here, '.tmp');
const BASE = process.env.BASE_URL ?? 'http://localhost:4173';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);

/** In-page helper: the Phaser game instance, however the app exposes it. */
const GAME = `(window.game || window.__game)`;

/**
 * Per-game recipe.
 *  - viewport:   browser size
 *  - ready:      scene key that must be active before we start
 *  - start:      [x, y] click position in *game* coordinates (or fn(game size) for RESIZE games)
 *  - recordMs:   how long to record after the start click
 *  - trimMs:     intro (countdown / serve) cut from the start of the clip
 *  - shotsAt:    when (ms after start click) to take the 3 screenshots
 *  - bot(ctx):   async fn driving the game until ctx.stop() is true
 */
const GAMES = {
  ponge: {
    viewport: { width: 1280, height: 720 },
    ready: 'MenuScene',
    start: () => [480, 230], // "1 PLAYER (VS AI)"
    recordMs: 9000,
    trimMs: 900,
    shotsAt: [2600, 5200, 7600],
    async bot(c) {
      // Paddle follows the ball; wait in the middle while the ball moves away.
      let held = null;
      const hold = async (key) => {
        if (held === key) return;
        if (held) await c.page.keyboard.up(held);
        if (key) await c.page.keyboard.down(key);
        held = key;
      };
      while (!c.stopped()) {
        const s = await c.page.evaluate(`(() => {
          const sc = ${GAME}.scene.getScene('GameScene');
          if (!sc || !sc.ball || !sc.paddleLeft) return null;
          return { bx: sc.ball.x, by: sc.ball.y, vx: sc.ball.vx, py: sc.paddleLeft.y, h: sc.scale.height };
        })()`);
        if (s) {
          const target = s.vx < 0 ? s.by : s.h / 2;
          const diff = target - s.py;
          await hold(Math.abs(diff) < 14 ? null : diff < 0 ? 'w' : 's');
        }
        await sleep(25);
      }
      await hold(null);
    },
  },

  poke: {
    viewport: { width: 1280, height: 720 },
    ready: 'GameScene',
    start: () => [640, 403], // "Start" button
    recordMs: 10500,
    trimMs: 1900, // "Get ready..." countdown
    shotsAt: [3600, 6500, 9200],
    async bot(c) {
      let mx = 640;
      let my = 460;
      while (!c.stopped()) {
        const s = await c.page.evaluate(`(() => {
          const sc = ${GAME}.scene.getScene('GameScene');
          if (!sc || sc.state !== 'PLAYING') return null;
          return { px: sc.player.x, py: sc.player.y, mobs: sc.mobs.filter(m => m.active).map(m => ({ x: m.x, y: m.y, vx: m.vx || 0, vy: m.vy || 0 })) };
        })()`);
        if (s) {
          // Pick the safest nearby point (predicted dog positions), gently drawn towards the centre.
          let best = { x: s.px, y: s.py, score: -Infinity };
          for (let a = 0; a < 24; a++) {
            for (const r of [70, 150, 240]) {
              const x = Math.min(1180, Math.max(100, s.px + Math.cos((a / 24) * Math.PI * 2) * r));
              const y = Math.min(640, Math.max(90, s.py + Math.sin((a / 24) * Math.PI * 2) * r));
              let danger = Infinity;
              for (const m of s.mobs) {
                for (const t of [0, 0.25, 0.5]) {
                  const d = Math.hypot(x - (m.x + m.vx * t), y - (m.y + m.vy * t));
                  danger = Math.min(danger, d);
                }
              }
              const score = Math.min(danger, 260) - Math.hypot(x - 640, y - 380) * 0.08 - r * 0.05;
              if (score > best.score) best = { x, y, score };
            }
          }
          mx += (best.x - mx) * 0.6;
          my += (best.y - my) * 0.6;
          const [cx, cy] = c.toClient(mx, my);
          await c.page.mouse.move(cx, cy);
        }
        await sleep(30);
      }
    },
  },

  'change-balls': {
    viewport: { width: 1280, height: 720 },
    ready: 'MenuScene',
    start: () => [640, 390], // "1 PLAYER"
    recordMs: 9500,
    trimMs: 400,
    shotsAt: [2500, 5000, 7500],
    async bot(c) {
      let lastFlip = 0;
      while (!c.stopped()) {
        const s = await c.page.evaluate(`(() => {
          const sc = ${GAME}.scene.getScene('GameScene');
          if (!sc || !sc.isPlaying || sc.isGameOver) return null;
          const b = sc.centralBall;
          return { x: b.container.x, vx: b.vx, color: b.currentColor,
                   l: sc.leftPillar.getActiveColor(), r: sc.rightPillar.getActiveColor(),
                   lx: sc.leftPillar.container.x, rx: sc.rightPillar.container.x };
        })()`);
        if (s && s.vx !== 0) {
          const target = s.vx > 0 ? { color: s.r, x: s.rx } : { color: s.l, x: s.lx };
          const dist = Math.abs(target.x - s.x);
          // Flip both pillars once if the pillar we're heading to doesn't match; leave time for the 140ms turn.
          if (target.color !== s.color && dist > 170 && Date.now() - lastFlip > 260) {
            await c.page.keyboard.press('Space');
            lastFlip = Date.now();
          }
        }
        await sleep(20);
      }
    },
  },

  'flappy-bird': {
    viewport: { width: 480, height: 854 },
    ready: 'GameScene',
    start: () => [240, 400],
    recordMs: 9000,
    trimMs: 250,
    shotsAt: [3000, 5500, 8000],
    async bot(c) {
      let lastFlap = 0;
      while (!c.stopped()) {
        const s = await c.page.evaluate(`(() => {
          const sc = ${GAME}.scene.getScene('GameScene');
          if (!sc || !sc.bird || !sc.bird.body) return null;
          const next = sc.pipePairs.find(p => p.topPipe.active && p.topPipe.x + 40 > sc.bird.x);
          return { y: sc.bird.y, vy: sc.bird.body.velocity.y, gap: next ? (next.topPipe.y + next.bottomPipe.y) / 2 : null, dx: next ? next.topPipe.x - sc.bird.x : null };
        })()`);
        if (s) {
          const target = (s.gap ?? 427) + 18;
          if (s.y > target && s.vy > -80 && Date.now() - lastFlap > 140) {
            await c.page.keyboard.press('Space');
            lastFlap = Date.now();
          }
        }
        await sleep(16);
      }
    },
  },

  'hit-the-coin': {
    viewport: { width: 1280, height: 720 },
    ready: 'MenuScene',
    start: (size) => [size.w / 2, size.h * 0.52], // "Start"
    recordMs: 9000,
    trimMs: 250,
    shotsAt: [2500, 5000, 7500],
    async bot(c) {
      while (!c.stopped()) {
        const s = await c.page.evaluate(`(() => {
          const sc = ${GAME}.scene.getScene('GameScene');
          if (!sc || !sc.scene.isActive() || !sc.coin) return null;
          return { x: sc.coin.x, y: sc.coin.y };
        })()`);
        if (s) {
          const [cx, cy] = c.toClient(s.x, s.y);
          await c.page.mouse.click(cx, cy);
        }
        await sleep(rand(330, 520)); // human-ish pace
      }
    },
  },

  vega: {
    viewport: { width: 1280, height: 720 },
    ready: 'MenuScene',
    start: () => [355, 425], // "START MISSION"
    trimMs: 300,
    // Manual mode: the bot plays through the early sectors in real time, starts the recorder itself near the
    // end of sector 4 and takes the screenshots (see bots/vega.mjs).
    play: playVega,
  },
};

function ffmpeg(args) {
  const r = spawnSync(ffmpegPath, ['-y', '-loglevel', 'error', ...args], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`ffmpeg failed: ${r.stderr}`);
}

async function capture(browser, slug) {
  const cfg = GAMES[slug];
  const context = await browser.newContext({ viewport: cfg.viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on('pageerror', (e) => console.log(`  [${slug}] page error:`, e.message));

  await page.goto(`${BASE}/${slug}/`, { waitUntil: 'load' });
  await page.waitForFunction(`(() => { const g = ${GAME}; return g && g.isBooted && g.scene.isActive('${cfg.ready}'); })()`, null, {
    timeout: 30000,
  });
  await sleep(1200); // let fonts / entrance tweens settle

  // game <-> client coordinate mapping for the canvas
  const geo = await page.evaluate(`(() => {
    const g = ${GAME}; const r = g.canvas.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height, gw: g.scale.gameSize.width, gh: g.scale.gameSize.height };
  })()`);
  const toClient = (x, y) => [geo.left + (x / geo.gw) * geo.width, geo.top + (y / geo.gh) * geo.height];

  // Recording of the canvas (inside the page). Simple recipes record from before the Start click;
  // "manual" recipes (cfg.play) decide themselves when to start/stop.
  const startRecording = () =>
    page.evaluate(`(() => {
      const g = ${GAME};
      const stream = g.canvas.captureStream(30);
      const rec = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 6_000_000 });
      window.__chunks = [];
      rec.ondataavailable = (e) => e.data.size && window.__chunks.push(e.data);
      rec.start(250);
      window.__rec = rec;
    })()`);
  let stopped;
  const stopRecording = async () => {
    stopped ??= await page.evaluate(`(async () => {
      const rec = window.__rec;
      await new Promise((res) => { rec.onstop = res; rec.stop(); });
      const buf = await new Blob(window.__chunks, { type: 'video/webm' }).arrayBuffer();
      let bin = ''; const bytes = new Uint8Array(buf);
      for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      const sc = ${GAME}.scene.getScenes(true)[0];
      return { b64: btoa(bin), fps: Math.round(${GAME}.loop.actualFps), scene: sc && sc.scene.key };
    })()`);
    return stopped;
  };

  const manual = typeof cfg.play === 'function';
  let playResult;
  if (!manual) await startRecording();
  const startedAt = Date.now();
  const [sx, sy] = cfg.start({ w: geo.gw, h: geo.gh });
  const [cx, cy] = toClient(sx, sy);
  await page.mouse.move(cx, cy);
  await page.mouse.click(cx, cy);

  const shotDir = path.join(tmpDir, slug);
  rmSync(shotDir, { recursive: true, force: true });
  mkdirSync(shotDir, { recursive: true });

  if (manual) {
    // The recipe plays, records and writes <shotDir>/shot-1..3.png itself.
    // It may return { clipStartMs, clipLengthMs }: the part of the take to keep (e.g. the busiest moments).
    playResult = await cfg.play({ page, toClient, geo, startRecording, stopRecording, shotDir, log: (m) => console.log(`  [${slug}] ${m}`) });
  } else {
    const ctx = { page, toClient, stopped: () => Date.now() - startedAt > cfg.recordMs };
    const botDone = cfg.bot(ctx);

    // Screenshots (canvas only) at the scheduled moments.
    const canvas = page.locator('canvas').first();
    for (const [i, at] of cfg.shotsAt.entries()) {
      await sleep(Math.max(0, at - (Date.now() - startedAt)));
      await canvas.screenshot({ path: path.join(shotDir, `shot-${i + 1}.png`) });
    }
    await botDone;
  }

  const result = await stopRecording();
  await context.close();

  // ---- encode ----
  const raw = path.join(tmpDir, `${slug}.raw.webm`);
  writeFileSync(raw, Buffer.from(result.b64, 'base64'));
  const mw = mediaWidth(slug);
  const outDir = path.join(portal, 'public', 'media', slug);
  mkdirSync(outDir, { recursive: true });
  const trim = ((playResult?.clipStartMs ?? cfg.trimMs) / 1000).toFixed(2);
  const lenArgs = playResult?.clipLengthMs ? ['-t', (playResult.clipLengthMs / 1000).toFixed(2)] : [];
  const vf = `scale=${mw}:-2:flags=lanczos,fps=30`;

  ffmpeg(['-ss', trim, '-i', raw, ...lenArgs, '-vf', vf, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '37', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', path.join(outDir, 'clip.webm')]);
  ffmpeg(['-ss', trim, '-i', raw, ...lenArgs, '-vf', vf, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(outDir, 'clip.mp4')]);
  ffmpeg(['-ss', (Number(trim) + 1.2).toFixed(2), '-i', raw, '-frames:v', '1', '-vf', `scale=${mw}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '80', path.join(outDir, 'poster.webp')]);

  const shotsOut = path.join(portal, 'src', 'assets', 'games', slug);
  mkdirSync(shotsOut, { recursive: true });
  const shotCount = cfg.shotsAt ? cfg.shotsAt.length : 3;
  for (let i = 1; i <= shotCount; i++) {
    ffmpeg(['-i', path.join(shotDir, `shot-${i}.png`), '-vf', `scale='min(${mw},iw)':-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '82', path.join(shotsOut, `shot-${i}.webp`)]);
  }

  const kb = (f) => Math.round(statSync(path.join(outDir, f)).size / 1024);
  console.log(`${slug}: fps~${result.fps}, scene=${result.scene}, webm ${kb('clip.webm')}KB, mp4 ${kb('clip.mp4')}KB`);
}

function mediaWidth(slug) {
  const games = JSON.parse(readFileSync(path.join(portal, 'src/content/games.json'), 'utf8'));
  return games.find((g) => g.id === slug).media[0];
}

const wanted = process.argv.slice(2);
const slugs = wanted.length ? wanted : Object.keys(GAMES);
for (const s of slugs) if (!GAMES[s]) throw new Error(`Unknown game "${s}". Known: ${Object.keys(GAMES).join(', ')}`);

mkdirSync(tmpDir, { recursive: true });
// A full browser (installed Edge/Chrome, new headless mode) can use the real GPU, which keeps the
// games at 60 fps. Playwright's bundled headless shell only has software rendering (~12 fps), which
// makes the recorded games look like slow motion. Override with PW_CHANNEL=chrome|chromium|msedge.
const browser = await chromium.launch({
  channel: process.env.PW_CHANNEL ?? 'msedge',
  headless: true,
  args: ['--autoplay-policy=no-user-gesture-required', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--mute-audio'],
});
try {
  for (const slug of slugs) {
    console.log(`Capturing ${slug} ...`);
    await capture(browser, slug);
  }
} finally {
  await browser.close();
}
