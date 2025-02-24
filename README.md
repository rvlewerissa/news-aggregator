🎉 **Feel free to check the live version of this app here** 🎉

```
https://news-aggregator-lai1.vercel.app
```

---

## Getting started

**Production:**

```
npm run install --legacy-peer-deps
npm build
npm start
```

**Production mode using Docker:**

```
docker compose up --build
```

**Development Mode:**

```
npm run install --legacy-peer-deps
npm build
npm dev
```

### Caveat

Third party API has rate limit policy which could cause problems to the following:

- Deployment (SSG requires app to hit third API)
- SSG revalidation (by default our app applies a 60 seconds revalidation)
- Anything related to API call could results in `HTTP ERROR 429` (Too Many Requests)

## Technical Decisions

### Tech Stack

- [Next.js](http://nextjs.org/docs/)
- [Typescript](https://www.typescriptlang.org/)
- [ShadCDN](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- [Tanstack React Query](https://tanstack.com/query/latest)

**Reasoning:** fast to develop with, easy to maintain, and scalable if needed. This stack provides a perfect balance between speed, type safety, UI flexibility, and data fetching efficiency. It is perfect for small app under tight deadlines.

### Routing

| Route                 | Description                    |
| --------------------- | ------------------------------ |
| `/`                   | display headline news          |
| `/sources`            | display list of all sources    |
| `/categories/[query]` | fetch from specific categories |
| `/sources`            | display list of all sources    |
| `/sources/[query]`    | fetch from specific source     |
| `/search`             | display search query           |

### Rendering strategy

We will use SSG (Static Site Generation) + ISR (Incremental Static Rendering), with server and client side data fetching.

**Reasoning:**

- Minimize API requests to third-party providers to prevent rate limiting and reduce API costs.
- Reduce server load (since SSG pre-renders content), great scalability for large traffic.
- SEO-friendly
- The user is expected to not rely on this app for urgent news and to tolerate a slight delay (~1 minute) in updating the latest headlines. Therefore, usage for ISR is possible.

### API

**Source**

- [NewsAPI.org](https://newsapi.org/docs)
- [The Guardian](https://open-platform.theguardian.com/documentation/)
- [New York Times](https://developer.nytimes.com/apis)

Integrated a custom serverless function in Next.js for this project streamlined communication through a single endpoint, ensuring better scalability in the future.

The endpoint is also deployed separately to accomodate usage with Docker (cannot build SSG and fetch its own serverless endpoint on build time inside Docker).

Serverless endpoint is deployed to:

```
https://news-aggregator-two-beta.vercel.app
```

To use our local serverless codebase, simply replace the following on your `.env`:

```
NEXT_SERVERLESS_API_URL=http://localhost:3000
```

**Fetching strategy**

- Use Next.js serverless function to combine multiple API sources, so client-side will fetch from a single source of truth.
- Initial fetch will use `getStaticProps()`
- Pagination: use client side data fetching with offset-based pagination (our third party APIs do not support cursor-based pagination)
- Search by keyword: use client-side data fetching

### Branching

Since the project is relatively small and has a short development timeline, we’ll use a simple branching strategy, pushing directly to main. However, we’ll use [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format to keep the commit history organized. If the project grows in the future, we can adopt a trunk-based strategy or introduce feature and release branches as needed.

#### Environment Variable

Added `.env` file just for the sake of this assignment, shouldn't be used on real project environment.
