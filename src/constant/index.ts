const NEWS_API_KEY = process.env.NEWS_API_KEY;
const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2';
const GUARDIAN_API_URL = 'https://content.guardianapis.com/search';
const NEXT_SERVERLESS_API_URL = process.env.NEXT_SERVERLESS_API_URL;
const DEFAULT_PAGE_SIZE = 10;

const CATEGORIES = [
  {
    value: 'general',
    label: 'General',
  },
  {
    value: 'business',
    label: 'Business',
  },
  {
    value: 'entertainment',
    label: 'Entertainment',
  },
  {
    value: 'health',
    label: 'Health',
  },
  {
    value: 'science',
    label: 'Science',
  },
  {
    value: 'sports',
    label: 'Sports',
  },
  {
    value: 'technology',
    label: 'Technology',
  },
];

export {
  NEWS_API_KEY,
  NEWS_API_URL,
  NEXT_SERVERLESS_API_URL,
  GUARDIAN_API_URL,
  GUARDIAN_API_KEY,
  DEFAULT_PAGE_SIZE,
  CATEGORIES,
};
