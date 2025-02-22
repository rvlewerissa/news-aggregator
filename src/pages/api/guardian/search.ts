import { NextResponse } from 'next/server';
import { GUARDIAN_API_KEY, GUARDIAN_API_URL } from '@/constant';

export const runtime = 'edge';

export default async function getGuardianNews(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    const url =
      `${GUARDIAN_API_URL}/search?api-key=${GUARDIAN_API_KEY}` +
      `&q=${encodeURIComponent(query)}` +
      `&page=${page}` +
      `&page-size=${pageSize}`;

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
