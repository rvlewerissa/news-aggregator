import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
// components
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
// utils
import { cn } from '@/lib/utils';

export default function FilterByDate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const fromQuery = searchParams.get('from');
  const initialDate = fromQuery ? new Date(fromQuery) : undefined;
  const [date, setDate] = useState<Date | undefined>(initialDate);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);

    const params = new URLSearchParams(searchParams);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD (local)
      params.set('from', formattedDate);
    } else {
      params.delete('from');
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Filter by date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
