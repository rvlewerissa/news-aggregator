const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';
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

export { API_KEY, BASE_URL, DEFAULT_PAGE_SIZE, CATEGORIES };
