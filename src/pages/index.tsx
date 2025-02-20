import { GetStaticProps } from 'next';
import HomePrimitive from '@/screens/Home';
import { Article } from '@/types';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/top-headlines`
    );
    const data = await res.json();

    return {
      props: { articles: data.articles || [] },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return { props: { articles: [] }, revalidate: 3600 };
  }
};

type HomePageProps = {
  articles: Article[];
};

export default function Home({ articles }: HomePageProps) {
  return <HomePrimitive articles={articles} />;
}
