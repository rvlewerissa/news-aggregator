import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout';
import NewsCard from '@/components/NewsCard';
import Pagination from '@/components/Pagination';
import SkeletonCards from '@/components/SkeletonCards';
import { fetchQuery } from '@/services';
import { Article } from '@/types';

const pageSize = 10;

export default function SearchResultPage() {
  const router = useRouter();
  const query = (router.query.q as string) || '';
  const fromDate = router.query.from as string;
  const currentPage = Number(router.query.page) || 1;

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['search-results', query, fromDate, currentPage],
    queryFn: () => fetchQuery({ query, fromDate, currentPage }),
    enabled: !!query,
  });

  useEffect(() => {
    if (query) refetch();
  }, [query, fromDate, currentPage, refetch]);

  const totalPages = Math.ceil((data?.totalResults || 0) / pageSize);

  return (
    <MainLayout>
      <h1 className='text-2xl font-bold mb-4'>{`Query: ${query}`}</h1>

      {isPending && <SkeletonCards />}
      {isError && <p>Failed to load news.</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-2'>
        {data?.articles?.map((article: Article, i: number) => (
          <NewsCard key={i} article={article} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </MainLayout>
  );
}
