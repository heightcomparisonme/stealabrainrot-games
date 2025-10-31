import type { MetadataRoute } from 'next';
import { games, gameCategories } from '@/lib/games';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stealabrainrot.games').replace(/\/+$/, '');

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

const staticPaths = [
  '',
  'most-played',
  'trending',
  'new',
  'specials',
  'recently-played',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticPaths.map((path, index) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified: now,
    changeFrequency: (index === 0 ? 'daily' : 'weekly') as ChangeFrequency,
    priority: index === 0 ? 1 : 0.7,
  }));

  const categoryEntries = gameCategories
    .filter((category) => category.id !== 'all')
    .map((category) => ({
      url: `${SITE_URL}/category/${category.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.7,
    }));

  const gameEntries = games.map((game) => ({
    url: `${SITE_URL}/game/${game.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...gameEntries];
}
