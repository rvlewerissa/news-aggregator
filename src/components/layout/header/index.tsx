import { usePathname } from 'next/navigation';
// components
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import FilterByCategory from '@/components/FilterByCategory';
import FilterByDate from '@/components/FilterByDate';

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className='flex bg-background h-16 shrink-0 items-center gap-2 border-b px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Input placeholder='Search for news' />
      </header>
      <div className='flex bg-background h-16 shrink-0 items-center gap-2 px-8'>
        {!pathname.startsWith('/categories/') && <FilterByCategory />}
        {pathname.startsWith('/search/') && <FilterByDate />}
      </div>
    </>
  );
}
