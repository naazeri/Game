import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 3006,
    host: '0.0.0.0',
  },
  build: {
    assetsInlineLimit: 0,
  },
});
