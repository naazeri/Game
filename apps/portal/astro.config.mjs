import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production domain (see public/CNAME). No base path is needed.
export default defineConfig({
  site: 'https://game.nazeriland.ir',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  server: { port: 4321, host: true },
});
