import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import NewsCard from '@/components/NewsCard';
import Pagination from '@/components/Pagination';
import { Article } from '@/types';
import { fetchTopHeadlines } from '@/services';
import SkeletonCards from '@/components/SkeletonCards';

type HomePageProps = {
  initialArticles: Article[];
  initialMetadata: { totalResults: number };
};

type NewsResponse = {
  articles: Article[];
  metadata: { totalResults: number };
};

const pageSize = 10;

export default function CommonResultPage({
  initialArticles,
  initialMetadata,
}: HomePageProps) {
  const router = useRouter();
  const category = router.query.category as string;
  const source = router.query.source as string;
  const currentPage = Number(router.query.page) || 1;
  const totalPages = Math.ceil(initialMetadata.totalResults / pageSize);

  const { data, isPending, isError } = useQuery<NewsResponse>({
    queryKey: ['top-headlines', currentPage, category, source],
    queryFn: () => fetchTopHeadlines({ currentPage, source, category }),
    initialData: { articles: initialArticles, metadata: initialMetadata },
    placeholderData: { articles: initialArticles, metadata: initialMetadata },
  });

  return (
    <div>
      {isPending && <SkeletonCards />}
      {isError && <p>Failed to load news.</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-2'>
        {data?.articles.map((article, i) => (
          <NewsCard key={i} article={article} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
