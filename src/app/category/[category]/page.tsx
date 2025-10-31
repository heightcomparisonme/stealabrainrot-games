import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageClient from '@/components/CategoryPageClient';
import { games, gameCategories } from '@/lib/games';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const SITE_URL = 'https://stealabrainrot.games';

export async function generateMetadata(
  { params }: CategoryPageProps,
): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = gameCategories.find((c) => c.id === category);

  if (!categoryInfo) {
    return {
      title: 'Category Not Found | StealABrainrot Games',
      description: 'The category you are looking for does not exist.',
    };
  }

  const description = `Play free ${categoryInfo.name} games online. Discover curated titles with instant access on StealABrainrot Games.`;
  const url = `${SITE_URL}/category/${category}`;

  return {
    title: `${categoryInfo.name} Games | Play Free ${categoryInfo.name} Titles`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title: `${categoryInfo.name} Games | StealABrainrot Games`,
      description,
      type: 'website',
      siteName: 'StealABrainrot Games',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryInfo.name} Games | Play Free ${categoryInfo.name} Titles`,
      description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const categoryInfo = gameCategories.find((c) => c.id === category);
  if (!categoryInfo) {
    notFound();
  }

  const categoryGames = games.filter((game) => game.category === category);

  return (
    <CategoryPageClient
      category={category}
      categoryInfo={categoryInfo}
      categoryGames={categoryGames}
    />
  );
}
