import { rest, RestRequest, ResponseComposition, RestContext } from 'msw';
import { setupServer } from 'msw/node';
import { fetchTopHeadlines, fetchQuery, fetchTheGuardian } from '../';

// Define types for mock API responses
type Article = { title: string };
type GuardianResponse = {
  response: {
    results: Article[];
    total: number;
  };
};

// Mock API server
const server = setupServer(
  rest.get(
    '/api/top-headlines',
    (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      return res(
        ctx.json({ articles: [{ title: 'Test Article' }] as Article[] })
      );
    }
  ),

  rest.get(
    '/api/search',
    (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      return res(
        ctx.json({ articles: [{ title: 'Search Result' }] as Article[] })
      );
    }
  ),

  rest.get(
    '/api/guardian/search',
    (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      return res(
        ctx.json({
          response: { results: [{ title: 'Guardian Article' }], total: 100 },
        } as GuardianResponse)
      );
    }
  )
);

// Enable API mocking before tests run
beforeAll(() => server.listen());
// Reset handlers after each test
afterEach(() => server.resetHandlers());
// Close API mocking after tests are done
afterAll(() => server.close());

describe('API Fetchers', () => {
  test('fetchTopHeadlines returns articles', async () => {
    const result = await fetchTopHeadlines({ currentPage: 1 });
    expect(result).toEqual({ articles: [{ title: 'Test Article' }] });
  });

  test('fetchQuery returns search results', async () => {
    const result = await fetchQuery({ query: 'news', currentPage: 1 });
    expect(result).toEqual({ articles: [{ title: 'Search Result' }] });
  });

  test('fetchTheGuardian returns articles and metadata', async () => {
    const result = await fetchTheGuardian({ currentPage: 1 });
    expect(result).toEqual({
      articles: [{ title: 'Guardian Article' }],
      metadata: { totalResults: 100 },
    });
  });

  test('fetchTopHeadlines handles errors', async () => {
    server.use(
      rest.get(
        '/api/top-headlines',
        (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
          return res(ctx.status(500));
        }
      )
    );

    await expect(fetchTopHeadlines({ currentPage: 1 })).rejects.toThrow(
      'Failed to fetch articles'
    );
  });

  test('fetchQuery handles errors', async () => {
    server.use(
      rest.get(
        '/api/search',
        (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
          return res(ctx.status(500));
        }
      )
    );

    await expect(
      fetchQuery({ query: 'error', currentPage: 1 })
    ).rejects.toThrow('Failed to fetch articles');
  });

  test('fetchTheGuardian handles errors', async () => {
    server.use(
      rest.get(
        '/api/guardian/search',
        (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
          return res(ctx.status(500));
        }
      )
    );

    await expect(fetchTheGuardian({ currentPage: 1 })).rejects.toThrow(
      'Failed to fetch articles'
    );
  });
});
