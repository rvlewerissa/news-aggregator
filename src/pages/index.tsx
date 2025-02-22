import { GetStaticProps } from 'next';
import HomePrimitive from '@/screens/CommonResultPage';
import MainLayout from '@/components/layout';
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
      revalidate: 60,
    };
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return {
      props: {
        articles: [],
      },
      revalidate: 60,
    };
  }
};

type HomePageProps = {
  articles: Article[];
  metadata: { totalResults: number };
};

export default function Home({ articles, metadata }: HomePageProps) {
  return (
    <MainLayout>
      <h1 className='text-4xl font-bold tracking-tight font-mono capitalize'>
        Top Headlines
      </h1>
      <HomePrimitive initialArticles={articles} initialMetadata={metadata} />
    </MainLayout>
  );
}
