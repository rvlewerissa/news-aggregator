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

export async function fetchQuery({
  query,
  fromDate,
  currentPage,
}: {
  query: string;
  fromDate?: string;
  currentPage: number;
}) {
  let url = `/api/search?q=${encodeURIComponent(query)}&pageSize=10`;
  if (fromDate) url += `&from=${encodeURIComponent(fromDate)}`;
  if (currentPage) url += `&currentPage=${encodeURIComponent(currentPage)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}
