import { chromium } from '../tools/media-capture/node_modules/playwright-core/index.mjs';
import path from 'node:path';

const artifactDir = 'C:/Users/Reza/.gemini/antigravity/brain/01200c1e-16c9-4164-9e4b-e1b6e9c1cd7a';
const BASE = 'http://localhost:4173/block-breaker/';

const browser = await chromium.launch({
  channel: 'msedge',
  headless: true,
  args: ['--mute-audio', '--no-sandbox'],
});

// Mobile viewport test (e.g. 390x844)
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

const page = await context.newPage();
await page.goto(BASE, { waitUntil: 'networkidle' });

await page.waitForFunction(() => {
  const g = window.game || window.__game;
  return g && g.scene && g.scene.isActive('MenuScene');
}, { timeout: 10000 });

await page.waitForTimeout(800);
await page.screenshot({ path: path.join(artifactDir, 'block_breaker_mobile_menu.png') });

// Click Start
await page.keyboard.press('Space');
await page.waitForFunction(() => {
  const g = window.game || window.__game;
  return g && g.scene && g.scene.isActive('GameScene');
}, { timeout: 10000 });

await page.waitForTimeout(800);
await page.screenshot({ path: path.join(artifactDir, 'block_breaker_mobile_game.png') });

await browser.close();
console.log('Mobile screenshots captured successfully!');
