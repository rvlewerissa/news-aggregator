import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// components
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import FilterByCategory from '@/components/FilterByCategory';
import FilterByDate from '@/components/FilterByDate';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  const isWithoutFilter =
    !pathname.startsWith('/categories/') && pathname.startsWith('/search');

  const shouldDisplayCategoryFilter =
    !pathname.startsWith('/categories/') && !pathname.startsWith('/search');
  const shouldDisplayDateFilter = pathname.startsWith('/search');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className='flex bg-background h-16 shrink-0 items-center gap-2 border-b px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Input
          placeholder='Search for news'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger on Enter
        />
        <Button variant='secondary' onClick={handleSearch}>
          Search
        </Button>
      </header>
      {isWithoutFilter && (
        <div className='flex bg-background h-16 shrink-0 items-center gap-2 px-8'>
          {shouldDisplayCategoryFilter && <FilterByCategory />}
          {shouldDisplayDateFilter && <FilterByDate />}
        </div>
      )}
    </>
  );
}
