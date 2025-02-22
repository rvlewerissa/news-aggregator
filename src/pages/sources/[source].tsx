import { GetStaticProps, GetStaticPaths } from 'next';
import MainLayout from '@/components/layout';
import CommonResultPage from '@/screens/CommonResultPage';
import { Article } from '@/types';

interface SourcePageProps {
  source: string;
  articles: Article[];
  metadata: { totalResults: number };
}

const sources = [
  'abc-news',
  'ars-technica',
  'bbc-news',
  'bleacher-report',
  'bloomberg',
  'buzzfeed',
  'cbc-news',
  'cnn',
  'espn',
  'engadget',
  'focus',
  'fortune',
  'fox-news',
];

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sources.map((source) => ({
    params: { source },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<SourcePageProps> = async ({
  params,
}) => {
  const source = params?.source as string;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/top-headlines?sources=${source}`
  );
  const data = await res.json();

  return {
    props: {
      source,
      articles: data.articles || [],
      metadata: {
        totalResults: data.totalResults,
      },
    },
    revalidate: 60,
  };
};

export default function SourcePage({
  source,
  articles,
  metadata,
}: SourcePageProps) {
  return (
    <MainLayout>
      <h1 className='text-4xl font-bold tracking-tight font-mono capitalize'>
        {source.replace(/-/g, ' ')}
      </h1>
      <CommonResultPage initialArticles={articles} initialMetadata={metadata} />
    </MainLayout>
  );
}
