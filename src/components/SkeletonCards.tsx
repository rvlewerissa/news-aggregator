import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonCards() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-2'>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className='w-full max-h-[374px] flex flex-col space-y-3'>
          <Skeleton className='h-[125px] w-full rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        </div>
      ))}
    </div>
  );
}
