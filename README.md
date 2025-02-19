## Getting started

_TODO_

## Technical Decision

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
| `categories`          | display list of all categories |
| `/sources`            | display list of all sources    |
| `/categories/all`     | fetch from all categories      |
| `/categories/[query]` | fetch from specific categories |
| `/sources/all`        | fetch from all sources         |
| `/sources/[query]`    | fetch from specific source     |

### Rendering strategy

We will use SSG (Static Side Generation) + ISR (Incremental Static Rendering), with server and client side data fetching.

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
- [BBC News](https://www.bbc.co.uk/developer/technology/apis.html)

**Fetching strategy**

- Use Next.js serverless function to combine multiple API sources, so client-side will fetch from a single source of truth.
- Initial fetch will use `getStaticProps()`
- Pagination: use client side data fetching with offset-based pagination (our third party APIs do not support cursor-based pagination)
- Search by keyword: use client-side data fetching
