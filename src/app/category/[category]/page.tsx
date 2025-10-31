import { notFound } from 'next/navigation';
import CategoryPageClient from '@/components/CategoryPageClient';
import { games, gameCategories } from '@/lib/games';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
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
