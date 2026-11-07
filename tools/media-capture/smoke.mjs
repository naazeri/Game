// End-to-end smoke test of the assembled site (run against `sirv _site --port 4173`).
//   node smoke.mjs            -> BASE_URL defaults to http://localhost:4173
import { chromium } from 'playwright-core';

const BASE = process.env.BASE_URL ?? 'http://localhost:4173';
const SLUGS = ['ponge', 'poke', 'change-balls', 'flappy-bird', 'hit-the-coin'];
const REPO = 'https://github.com/naazeri/Game/tree/main/apps/';

const failures = [];
const check = (ok, message) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${message}`);
  if (!ok) failures.push(message);
};

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? 'msedge', headless: true, args: ['--mute-audio'] });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();

const consoleErrors = [];
page.on('console', (m) => m.type() === 'error' && consoleErrors.push(`${page.url()} ${m.text()}`));
page.on('pageerror', (e) => consoleErrors.push(`${page.url()} ${e.message}`));
page.on('requestfailed', (r) => consoleErrors.push(`request failed: ${r.url()}`));

// ---- landing page ----
await page.goto(`${BASE}/`);
const cardLinks = await page.locator('a.card').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
check(cardLinks.length === SLUGS.length, `landing page lists ${SLUGS.length} games (found ${cardLinks.length})`);
check(
  SLUGS.every((s) => cardLinks.includes(`/games/${s}/`)),
  'every card links to /games/<slug>/',
);
check(!(await page.content()).includes('/vega'), 'Vega is not listed on the portal');
check((await page.title()) === 'Game - nazeriland', 'landing page title');
check(((await page.locator('meta[name=description]').getAttribute('content')) ?? '').length > 40, 'landing page has a meta description');

// ---- details pages ----
for (const slug of SLUGS) {
  const res = await page.goto(`${BASE}/games/${slug}/`);
  check(res.status() === 200, `/games/${slug}/ responds 200`);

  const play = page.locator('.actions a.btn--play');
  check((await play.getAttribute('href')) === `/${slug}/`, `${slug}: PLAY href is /${slug}/`);
  check((await play.getAttribute('target')) === '_blank', `${slug}: PLAY opens a new tab`);
  check(((await play.getAttribute('rel')) ?? '').includes('noopener'), `${slug}: PLAY has rel=noopener`);

  const source = await page.locator('.actions a.btn--ghost').getAttribute('href');
  check(source === `${REPO}${slug}`, `${slug}: source link points at the monorepo folder`);

  check((await page.locator('video[data-clip]').count()) === 1, `${slug}: gameplay clip present`);
  check((await page.locator('[data-gallery] [data-full]').count()) === 3, `${slug}: 3 screenshots present`);
  check((await page.locator('link[rel=canonical]').getAttribute('href')) === `https://game.nazeriland.ir/games/${slug}/`, `${slug}: canonical URL`);
  check(((await page.locator('meta[property="og:image"]').getAttribute('content')) ?? '').startsWith('https://game.nazeriland.ir/_astro/'), `${slug}: og:image is absolute`);

  // The PLAY button really opens the game in a new tab, and the game boots.
  const [popup] = await Promise.all([context.waitForEvent('page'), play.click()]);
  await popup.waitForLoadState('load');
  check(new URL(popup.url()).pathname === `/${slug}/`, `${slug}: PLAY opened ${new URL(popup.url()).pathname}`);
  await popup.waitForFunction('(() => { const g = window.game || window.__game; return g && g.isBooted; })()', null, { timeout: 20000 }).then(
    () => check(true, `${slug}: game boots in the new tab`),
    () => check(false, `${slug}: game boots in the new tab`),
  );
  await popup.close();
}

// ---- hidden / legacy / 404 ----
// (sirv answers unknown paths with an empty 404; GitHub Pages serves /404.html for them, so check that file itself.)
check((await page.request.get(`${BASE}/games/vega/`)).status() === 404, '/games/vega/ is not published (404)');
check((await page.request.get(`${BASE}/vega/`)).status() === 200, 'legacy /vega/ is still served');
check((await page.request.get(`${BASE}/definitely-not-here/`)).status() === 404, 'unknown URL returns 404');
const notFoundPage = await page.goto(`${BASE}/404.html`);
check(notFoundPage.ok() && (await page.content()).includes('Back to all games'), 'custom 404.html is generated');

// ---- shared assets ----
for (const file of ['/sitemap-index.xml', '/robots.txt', '/site.webmanifest', '/favicon.ico', '/CNAME']) {
  check((await page.request.get(`${BASE}${file}`)).ok(), `${file} is served`);
}

// ---- lightbox ----
await page.goto(`${BASE}/games/ponge/`);
await page.locator('[data-gallery] [data-full]').first().click();
check(await page.locator('#lightbox').evaluate((d) => d.open), 'lightbox opens on click');
await page.keyboard.press('Escape');
check(!(await page.locator('#lightbox').evaluate((d) => d.open)), 'lightbox closes with Escape');

// ---- mobile: sticky PLAY bar, no horizontal overflow ----
const mobile = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
const m = await mobile.newPage();
await m.goto(`${BASE}/games/flappy-bird/`);
check(await m.locator('.play-bar .btn--play').isVisible(), 'mobile: sticky PLAY bar visible');
check(!(await m.locator('.actions .btn--play').isVisible()), 'mobile: inline PLAY hidden (no duplicate)');
check(await m.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'mobile: no horizontal scroll');
await m.goto(`${BASE}/`);
check(await m.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'mobile landing: no horizontal scroll');

const filtered = consoleErrors.filter((e) => !/favicon|ERR_ABORTED/.test(e));
check(filtered.length === 0, `no console errors${filtered.length ? `:\n    ${filtered.join('\n    ')}` : ''}`);

await browser.close();
if (failures.length) {
  console.log(`\n${failures.length} check(s) failed`);
  process.exit(1);
}
console.log('\nAll checks passed');
