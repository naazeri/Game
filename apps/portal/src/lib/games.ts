import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { DEVELOPER_INFO } from '@games/shared';

/** Monorepo on GitHub; every game lives in `apps/<slug>`. */
export const REPO_URL = `${DEVELOPER_INFO.githubUrl}/Game`;

export interface GameClip {
  webm: string;
  mp4: string;
  poster: string;
}

export interface Game {
  slug: string;
  data: CollectionEntry<'games'>['data'];
  /** Read from apps/<slug>/package.json. */
  version?: string;
  thumb: ImageMetadata;
  shots: ImageMetadata[];
  clip?: GameClip;
  /** The game itself (opened in a new tab). */
  playUrl: string;
  detailsUrl: string;
  sourceUrl: string;
}

const thumbs = import.meta.glob<ImageMetadata>('/src/assets/games/*/thumb.webp', {
  eager: true,
  import: 'default',
});
const shots = import.meta.glob<ImageMetadata>('/src/assets/games/*/shot-*.webp', {
  eager: true,
  import: 'default',
});

// `astro dev` / `astro build` run with the package directory (apps/portal) as cwd.
const portalDir = process.cwd();
const appsDir = path.resolve(portalDir, '..');

function readVersion(slug: string): string | undefined {
  const file = path.join(appsDir, slug, 'package.json');
  if (!existsSync(file)) return undefined;
  return (JSON.parse(readFileSync(file, 'utf8')) as { version?: string }).version;
}

function findClip(slug: string): GameClip | undefined {
  const dir = path.join(portalDir, 'public', 'media', slug);
  if (!existsSync(path.join(dir, 'clip.webm')) || !existsSync(path.join(dir, 'clip.mp4'))) {
    return undefined;
  }
  return {
    webm: `/media/${slug}/clip.webm`,
    mp4: `/media/${slug}/clip.mp4`,
    poster: `/media/${slug}/poster.webp`,
  };
}

/** Published games only, in display order. */
export async function getGames(): Promise<Game[]> {
  const entries = await getCollection('games', ({ data }) => data.published);
  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => {
      const slug = entry.id;
      const thumb = thumbs[`/src/assets/games/${slug}/thumb.webp`];
      if (!thumb) throw new Error(`Missing thumbnail: src/assets/games/${slug}/thumb.webp`);
      return {
        slug,
        data: entry.data,
        version: readVersion(slug),
        thumb,
        shots: Object.keys(shots)
          .filter((key) => key.startsWith(`/src/assets/games/${slug}/`))
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
          .map((key) => shots[key]),
        clip: findClip(slug),
        playUrl: `/${slug}/`,
        detailsUrl: `/games/${slug}/`,
        sourceUrl: `${REPO_URL}/tree/main/apps/${slug}`,
      };
    });
}
