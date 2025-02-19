import { useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return <Component {...pageProps} />;
}
