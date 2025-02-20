import MainLayout from '@/components/layout';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Article } from '@/types';
import { formatDistanceToNow } from 'date-fns';

type HomePageProps = {
  articles: Article[];
};

export default function Home({ articles }: HomePageProps) {
  return (
    <MainLayout>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {articles.map((article, i) => (
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
    </MainLayout>
  );
}
