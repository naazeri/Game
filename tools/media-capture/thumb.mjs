// Makes the list/OG thumbnail (a "title card") of a game: a screenshot of its menu screen.
//   node thumb.mjs block-breaker            (the assembled site must be served on :4173)
// Output: apps/portal/src/assets/games/<slug>/thumb.webp, as wide as the game's `media` width in games.json.
import { chromium } from 'playwright-core';
import ffmpegPath from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const portal = path.resolve(here, '../../apps/portal');
const BASE = process.env.BASE_URL ?? 'http://localhost:4173';
const slug = process.argv[2];
if (!slug) throw new Error('Usage: node thumb.mjs <slug>');

const games = JSON.parse(readFileSync(path.join(portal, 'src/content/games.json'), 'utf8'));
const mw = games.find((g) => g.id === slug).media[0];
const tmp = path.join(here, '.tmp');
mkdirSync(tmp, { recursive: true });
const png = path.join(tmp, `${slug}.thumb.png`);

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? 'msedge', headless: true, args: ['--mute-audio'] });
try {
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })).newPage();
  await page.goto(`${BASE}/${slug}/`, { waitUntil: 'load' });
  await page.waitForFunction(`(() => { const g = window.game || window.__game; return g && g.isBooted && g.scene.isActive('MenuScene'); })()`, null, { timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2500)); // let the entrance tweens finish
  await page.locator('canvas').first().screenshot({ path: png });
} finally {
  await browser.close();
}

const out = path.join(portal, 'src/assets/games', slug);
mkdirSync(out, { recursive: true });
const r = spawnSync(ffmpegPath, ['-y', '-loglevel', 'error', '-i', png, '-vf', `scale=${mw}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '82', path.join(out, 'thumb.webp')], { encoding: 'utf8' });
if (r.status !== 0) throw new Error(r.stderr);
console.log(`${slug}: thumb.webp written (${mw}px wide)`);
