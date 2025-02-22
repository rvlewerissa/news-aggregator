import { GetStaticProps } from 'next';
import MainLayout from '@/components/layout';
import GuardianResultPage from '@/screens/GuardianResultPage';
import { NEXT_SERVERLESS_API_URL } from '@/constant';
import { GuardianArticle } from '@/types';

interface GuardianPageProps {
  articles: GuardianArticle[];
  metadata: { totalResults: number };
}

export const getStaticProps: GetStaticProps<GuardianPageProps> = async () => {
  const res = await fetch(`${NEXT_SERVERLESS_API_URL}/api/guardian/search`);
  const data = await res.json();

  return {
    props: {
      articles: data.response.results || [],
      metadata: {
        totalResults: data.response.total,
      },
    },
    revalidate: 60,
  };
};

export default function GuardianPage({
  articles,
  metadata,
}: GuardianPageProps) {
  return (
    <MainLayout>
      <h1 className='text-4xl font-bold tracking-tight font-mono'>
        The Guardian
      </h1>
      <GuardianResultPage
        initialArticles={articles}
        initialMetadata={metadata}
      />
    </MainLayout>
  );
}
