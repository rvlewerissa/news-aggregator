import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { GuardianNewsCard } from '@/components/NewsCard';
import Pagination from '@/components/Pagination';
import { GuardianArticle } from '@/types';
import { fetchTheGuardian } from '@/services';
import SkeletonCards from '@/components/SkeletonCards';

type HomePageProps = {
  initialArticles: GuardianArticle[];
  initialMetadata: { totalResults: number };
};

type NewsResponse = {
  articles: GuardianArticle[];
  metadata: { totalResults: number };
};

const pageSize = 10;

export default function GuardianResultPage({
  initialArticles,
  initialMetadata,
}: HomePageProps) {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  const totalPages = Math.ceil(initialMetadata.totalResults / pageSize);

  const { data, isPending, isError } = useQuery<NewsResponse>({
    queryKey: ['the-guardian-headlines', currentPage],
    queryFn: () => fetchTheGuardian({ currentPage }),
    initialData: { articles: initialArticles, metadata: initialMetadata },
    placeholderData: { articles: initialArticles, metadata: initialMetadata },
  });

  return (
    <div>
      {isPending && <SkeletonCards />}
      {isError && <p>Failed to load news.</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-2'>
        {data?.articles.map((article, i) => (
          <GuardianNewsCard key={i} article={article} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
