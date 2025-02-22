import { GetStaticProps } from 'next';
import MainLayout from '@/components/layout';
import Link from 'next/link';
import { NEWS_API_KEY } from '@/constant';

interface SourcesPageProps {
  sources: { id: string; name: string }[];
}

export const getStaticProps: GetStaticProps<SourcesPageProps> = async () => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines/sources?apiKey=${NEWS_API_KEY}`
  );
  const data = await res.json();

  return {
    props: {
      sources: data.sources.map((source: { id: string; name: string }) => ({
        id: source.id,
        name: source.name,
      })),
    },
    revalidate: 60,
  };
};

export default function SourcesPage({ sources }: SourcesPageProps) {
  return (
    <MainLayout>
      <h1 className='text-3xl font-bold mb-4'>News Sources</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {sources?.map((source) => (
          <p key={source.id} className='text-lg'>
            <Link
              href={`/sources/${source.id}`}
              className='text-blue-600 hover:underline'
            >
              {source.name}
            </Link>
          </p>
        ))}
      </div>
    </MainLayout>
  );
}
