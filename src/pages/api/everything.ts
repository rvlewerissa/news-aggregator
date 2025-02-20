import { NextResponse } from 'next/server';
import { API_KEY, BASE_URL } from '@/constant';

export const runtime = 'edge';

export default async function getEverything(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const sources = searchParams.get('sources') || '';
    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';

    const url =
      `${BASE_URL}/everything?apiKey=${API_KEY}` +
      `${query ? `&q=${query}` : ''}` +
      `${sources ? `&sources=${sources}` : ''}` +
      `${from ? `&from=${from}` : ''}` +
      `${to ? `&to=${to}` : ''}`;

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
