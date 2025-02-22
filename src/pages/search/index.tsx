// import { GetServerSideProps } from 'next';
import SearchResultPage from '@/screens/SearchResultPage';
// import { Article } from '@/types';

// type SearchPageProps = {
//   articles: Article[];
//   metadata: { totalResults: number };
// };

// export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
//   context
// ) => {
//   const { q } = context.query;
//   const searchQuery = q ? `&q=${encodeURIComponent(q as string)}` : '';

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SITE_URL}/api/search?${searchQuery}?page=1&pageSize=10`
//     );

//     if (!res.ok) throw new Error('Failed to fetch articles');

//     const data = await res.json();

//     console.log(data);

//     return {
//       props: {
//         articles: data.articles || [],
//         metadata: {
//           totalResults: data.totalResults,
//         },
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         articles: [],
//         metadata: {
//           totalResults: 0,
//         },
//       },
//     };
//   }
// };

export default function SearchPage() {
  return <SearchResultPage />;
}
