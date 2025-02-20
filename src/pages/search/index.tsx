import { GetServerSideProps } from 'next';
import SearchResultPage from '@/screens/SearchResultPage';
import { Article } from '@/types';

type SearchPageProps = {
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  const { q } = context.query;
  const searchQuery = q ? `&q=${encodeURIComponent(q as string)}` : '';

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/everything?${searchQuery}`
    );

    if (!res.ok) throw new Error('Failed to fetch articles');

    const data = await res.json();

    return {
      props: {
        articles: data.articles || [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        articles: [],
      },
    };
  }
};

export default function SearchPage({ articles }: SearchPageProps) {
  return <SearchResultPage articles={articles} />;
}
