import { NextResponse } from 'next/server';
import { NEWS_API_KEY, NEWS_API_URL } from '@/constant';

export const runtime = 'edge';

export default async function getTopHeadlines(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const country = searchParams.get('country');
    const query = searchParams.get('q') || '';
    const sources = searchParams.get('sources');
    const pageSize = searchParams.get('pageSize') || '10';
    const page = searchParams.get('page') || '1';

    const url =
      `${NEWS_API_URL}/top-headlines?apiKey=${NEWS_API_KEY}` +
      `${category ? `&category=${category}` : ''}` +
      `${country ? `&country=${country}` : ''}` +
      `${query ? `&q=${query}` : ''}` +
      `${sources ? `&sources=${sources}` : ''}` +
      `&pageSize=${pageSize}&page=${page}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to fetch news' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
