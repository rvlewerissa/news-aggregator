import { DEFAULT_PAGE_SIZE } from '@/constant';

export const fetchArticles = async ({
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
