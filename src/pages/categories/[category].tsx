import { GetStaticProps, GetStaticPaths } from 'next';
import MainLayout from '@/components/layout';
import CommonResultPage from '@/screens/CommonResultPage';
import { NEXT_SERVERLESS_API_URL } from '@/constant';
import { Article } from '@/types';

interface CategoryPageProps {
  category: string;
  articles: Article[];
  metadata: { totalResults: number };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = [
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];

  const paths = categories.map((category) => ({
    params: { category },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
  params,
}) => {
  const category = params?.category as string;

  const res = await fetch(
    `${NEXT_SERVERLESS_API_URL}/api/top-headlines?category=${category}`
  );
  const data = await res.json();

  return {
    props: {
      category,
      articles: data.articles || [],
      metadata: {
        totalResults: data.totalResults,
      },
    },
    revalidate: 60,
  };
};

export default function CategoryPage({
  category,
  articles,
  metadata,
}: CategoryPageProps) {
  return (
    <MainLayout>
      <h1 className='text-4xl font-bold tracking-tight font-mono capitalize'>
        {category}
      </h1>
      <CommonResultPage initialArticles={articles} initialMetadata={metadata} />
    </MainLayout>
  );
}
