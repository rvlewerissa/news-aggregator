import { GetStaticProps } from 'next';
import HomePrimitive from '@/screens/Home';
import { Article } from '@/types';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/top-headlines?page=1&pageSize=10`
    );
    const data = await res.json();

    return {
      props: {
        articles: data.articles || [],
        metadata: {
          totalResults: data.totalResults,
        },
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return {
      props: {
        articles: [],
      },
      revalidate: 3600,
    };
  }
};

type HomePageProps = {
  articles: Article[];
  metadata: { totalResults: number };
};

export default function Home({ articles, metadata }: HomePageProps) {
  return (
    <HomePrimitive initialArticles={articles} initialMetadata={metadata} />
  );
}
