import { DEFAULT_PAGE_SIZE } from '@/constant';

export const fetchTopHeadlines = async ({
  currentPage,
  category,
  source,
}: {
  currentPage: number;
  category?: string;
  source?: string
}) => {
  let url = `/api/top-headlines?page=${currentPage}&pageSize=${DEFAULT_PAGE_SIZE}`;

  if (category) {
    url += `&category=${encodeURIComponent(category)}`;
  }

  if (source) {
    url += `&sources=${encodeURIComponent(source)}`;
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

export async function fetchTheGuardian({
  currentPage,
}: {
  currentPage: number;
}) {
  let url = `/api/guardian/search?pageSize=10`;
  if (currentPage) url += `&page=${encodeURIComponent(currentPage)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch articles');
  const data = await res.json();
  return {
    articles: data.response.results || [],
    metadata: {
      totalResults: data.response.total,
    },
  };
}
