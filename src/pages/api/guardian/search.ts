import { NextResponse } from 'next/server';
import { GUARDIAN_API_KEY, GUARDIAN_API_URL } from '@/constant';

export const runtime = 'edge';

export default async function getGuardianNews(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';

    const url =
      `${GUARDIAN_API_URL}?api-key=${GUARDIAN_API_KEY}` +
      `&page=${page}` +
      `&pageSize=${pageSize}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log('guardian result: ', data);

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
