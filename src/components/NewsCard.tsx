import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Article, GuardianArticle } from '@/types';

type NewsCardProps = {
  article: Article;
};

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className='flex flex-col'>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className='w-full h-40 object-cover rounded-t-lg'
        />
      )}
      <CardHeader className='flex-1'>
        <CardTitle className='line-clamp-2 leading-5'>
          <a href={article.url} target='_blank' className='hover:underline'>
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
  );
}

type GuardianNewsProp = {
  article: GuardianArticle;
};

export function GuardianNewsCard({ article }: GuardianNewsProp) {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='flex-1'>
        <CardTitle className='line-clamp-2 leading-5'>
          <a href={article.webUrl} target='_blank' className='hover:underline'>
            {article.webTitle}
          </a>
        </CardTitle>
      </CardHeader>
      <CardFooter className='gap-2'>
        <span className='text-xs font-semibold line-clamp-1'>
          {formatDistanceToNow(new Date(article.webPublicationDate), {
            addSuffix: true,
          })}
        </span>
      </CardFooter>
    </Card>
  );
}
