import { GetStaticProps, GetStaticPaths } from 'next';
import MainLayout from '@/components/layout';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '@/types';

interface CategoryPageProps {
  category: string;
  articles: Article[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = [
    'general',
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
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/top-headlines?category=${category}`
  );
  const data = await res.json();

  return {
    props: { category, articles: data.articles || [] },
    revalidate: 3600,
  };
};

export default function CategoryPage({
  category,
  articles,
}: CategoryPageProps) {
  return (
    <MainLayout>
      <h1 className='text-4xl font-bold tracking-tight font-mono capitalize'>
        {category}
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {articles.map((article, i) => (
          <Card key={i} className='flex flex-col'>
            <CardHeader className='flex-1'>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className='w-full h-40 object-cover rounded-t-lg'
                />
              )}
              <CardTitle className='line-clamp-2'>{article.title}</CardTitle>
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
