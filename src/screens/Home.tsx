import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Article } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { fetchArticles } from '@/services';

type HomePageProps = {
  initialArticles: Article[];
  initialMetadata: { totalResults: number };
};

type NewsResponse = {
  articles: Article[];
  metadata: { totalResults: number };
};

const pageSize = 10;

export default function Home({
  initialArticles,
  initialMetadata,
}: HomePageProps) {
  const router = useRouter();
  const category = router.query.category as string;
  const currentPage = Number(router.query.page) || 1;
  const totalPages = Math.ceil(initialMetadata.totalResults / pageSize);

  const { data, isPending, isError } = useQuery<NewsResponse>({
    queryKey: ['top-headlines', currentPage, category],
    queryFn: () => fetchArticles({ currentPage, category }),
    initialData: { articles: initialArticles, metadata: initialMetadata },
    placeholderData: { articles: initialArticles, metadata: initialMetadata }, // Equivalent to keepPreviousData in v5
  });

  const goToPage = (page: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <MainLayout>
      {isPending && <p>Loading news...</p>}
      {isError && <p>Failed to load news.</p>}

      <div className='relative'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {data?.articles.map((article, i) => (
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
                  {article.title}
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
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={() => goToPage(currentPage - 1)}
              className={
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href='#'
                  onClick={() => goToPage(page)}
                  className={
                    currentPage === page ? 'font-bold text-blue-600' : ''
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={() => goToPage(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </MainLayout>
  );
}
