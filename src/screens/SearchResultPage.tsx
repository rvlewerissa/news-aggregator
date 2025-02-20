import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
// Components
import MainLayout from '@/components/layout';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchQuery } from '@/services';
import { Article } from '@/types';

type SearchResultProps = {
  articles: Article[];
};

export default function SearchResultPage({ articles }: SearchResultProps) {
  const router = useRouter();
  const query = (router.query.q as string) || '';
  const fromDate = router.query.from as string;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['search-results', query, fromDate],
    queryFn: () => fetchQuery(query, fromDate),
    enabled: !!query,
    initialData: { articles }, // Use SSR-provided articles initially
  });

  useEffect(() => {
    if (query) refetch();
  }, [fromDate, query, refetch]);

  return (
    <MainLayout>
      <h1 className='text-2xl font-bold mb-4'>{`Query: ${query}`}</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching articles.</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {data?.articles?.map((article: Article, i: number) => (
          <Card key={i} className='flex flex-col'>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className='w-full h-40 object-cover rounded-t-lg'
              />
            )}
            <CardHeader className='flex-1'>
              <CardTitle className='line-clamp-2 leading-5'>
                <a
                  href={article.url}
                  target='_blank'
                  className='hover:underline'
                >
                  {article.title}
                </a>
              </CardTitle>
              <CardDescription className='line-clamp-4'>
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className='gap-2'>
              <span className='text-xs font-semibold line-clamp-1'>
                {formatDistanceToNow(new Date(article.publishedAt), {
                  addSuffix: true,
                })}
              </span>
              {article.author && (
                <>
                  <span>•</span>
                  <span className='text-xs font-semibold line-clamp-1'>
                    {article.author}
                  </span>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
