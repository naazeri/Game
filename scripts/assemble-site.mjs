// Assembles the final static site into ./_site (what GitHub Pages serves):
//
//   _site/                    <- apps/portal/dist   (landing page, /games/<slug>/, 404, CNAME ...)
//   _site/<slug>/             <- apps/<slug>/dist   (each playable game)
//   _site/vega/               <- ./vega             (legacy build, not listed on the portal)
//
// Usage: node scripts/assemble-site.mjs   (run `pnpm build` first)
import { cpSync, existsSync, readdirSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, '_site');
const appsDir = path.join(root, 'apps');
const PORTAL = 'portal';
const LEGACY = ['vega'];

function fail(message) {
  console.error(`assemble-site: ${message}`);
  process.exit(1);
}

const portalDist = path.join(appsDir, PORTAL, 'dist');
if (!existsSync(path.join(portalDist, 'index.html'))) {
  fail(`missing ${path.relative(root, portalDist)} - run "pnpm build" first`);
}

rmSync(out, { recursive: true, force: true });
cpSync(portalDist, out, { recursive: true });

const games = readdirSync(appsDir).filter(
  (name) => name !== PORTAL && statSync(path.join(appsDir, name)).isDirectory(),
);

for (const slug of games) {
  const dist = path.join(appsDir, slug, 'dist');
  if (!existsSync(path.join(dist, 'index.html'))) {
    fail(`missing build output for "${slug}" (${path.relative(root, dist)})`);
  }
  if (existsSync(path.join(out, slug))) {
    fail(`"/${slug}/" collides with a portal path`);
  }
  cpSync(dist, path.join(out, slug), { recursive: true });
}

for (const slug of LEGACY) {
  const dir = path.join(root, slug);
  if (existsSync(dir)) cpSync(dir, path.join(out, slug), { recursive: true });
}

console.log(`assemble-site: wrote _site with portal + ${[...games, ...LEGACY].map((g) => `/${g}/`).join(', ')}`);
