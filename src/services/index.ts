import { DEFAULT_PAGE_SIZE } from '@/constant';

export const fetchTopHeadlines = async ({
  currentPage,
  category,
}: {
  currentPage: number;
  category?: string;
}) => {
  let url = `/api/top-headlines?page=${currentPage}&pageSize=${DEFAULT_PAGE_SIZE}`;

  if (category) {
    url += `&category=${encodeURIComponent(category)}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
};

export async function fetchQuery(query: string, from?: string) {
  let url = `/api/search?q=${encodeURIComponent(query)}`;
  if (from) url += `&from=${encodeURIComponent(from)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}
