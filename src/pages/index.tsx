import { GetStaticProps } from 'next';
import CommonResultPage from '@/screens/CommonResultPage';
import MainLayout from '@/components/layout';
import { NEXT_SERVERLESS_API_URL } from '@/constant';
import { Article } from '@/types';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(
      `${NEXT_SERVERLESS_API_URL}/api/top-headlines?category=general&page=1&pageSize=10`
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
      <CommonResultPage initialArticles={articles} initialMetadata={metadata} />
    </MainLayout>
  );
}
