# Games

Small browser games by [Reza Nazeri](https://nazeriland.ir), live at **https://game.nazeriland.ir**.

Everything lives in this monorepo (pnpm workspaces): each game is a Phaser 3 + TypeScript + Vite app, and the portal is an Astro site.

| Game | Details | Source |
|---|---|---|
| Ponge | [/games/ponge/](https://game.nazeriland.ir/games/ponge/) | [`apps/ponge`](apps/ponge) |
| Poke | [/games/poke/](https://game.nazeriland.ir/games/poke/) | [`apps/poke`](apps/poke) |
| Change Balls | [/games/change-balls/](https://game.nazeriland.ir/games/change-balls/) | [`apps/change-balls`](apps/change-balls) |
| Flappy Bird | [/games/flappy-bird/](https://game.nazeriland.ir/games/flappy-bird/) | [`apps/flappy-bird`](apps/flappy-bird) |
| Hit The Coin | [/games/hit-the-coin/](https://game.nazeriland.ir/games/hit-the-coin/) | [`apps/hit-the-coin`](apps/hit-the-coin) |
| Vega | [/games/vega/](https://game.nazeriland.ir/games/vega/) | [`apps/vega`](apps/vega) |

## Layout

- `apps/<game>` – one playable game each.
- `apps/portal` – the landing page and the per-game details pages (`/games/<slug>/`), built with Astro.
  Game info lives in `apps/portal/src/content/games.json`; set `"published": false` to hide a game.
- `packages/shared` – shared code (developer info used by every game).
- `scripts/assemble-site.mjs` – combines the portal and every game build into `_site/`, which is what gets deployed.
- `tools/media-capture` – dev-only bot that plays each game to record the portal's clips and screenshots (not part of the workspace).

## Commands

```bash
pnpm install

pnpm dev:portal            # portal dev server
pnpm dev:ponge             # a single game (also: dev:poke, dev:change-balls, ...)

pnpm build                 # build every app
pnpm site                  # assemble _site/ from the builds
pnpm exec sirv _site --port 4173   # serve it like GitHub Pages (http://localhost:4173)
```

`pnpm preview:site` does build + assemble + serve in one go.

## Media for the portal

Clips and screenshots are generated, not hand-made. With the site served on port 4173:

```bash
cd tools/media-capture
pnpm install
node capture.mjs            # all games, or: node capture.mjs ponge poke
node smoke.mjs              # end-to-end checks of the assembled site
```

The bot drives the installed Microsoft Edge (`PW_CHANNEL=chrome` to use Chrome).

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds everything, runs `scripts/assemble-site.mjs` and publishes `_site/` to GitHub Pages.
