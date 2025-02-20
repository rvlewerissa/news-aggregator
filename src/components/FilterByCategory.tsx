import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/router';
// components
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
// utils and constants
import { CATEGORIES } from '@/constant';
import { cn } from '@/lib/utils';

export default function FilterByCategory() {
  const router = useRouter();
  const { category } = router.query;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(category ? String(category) : '');

  useEffect(() => {
    setValue(category ? String(category) : '');
  }, [category]);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? '' : currentValue;
    setValue(newValue);
    setOpen(false);

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, category: newValue || undefined },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'w-[200px] justify-between',
            !value && 'text-muted-foreground'
          )}
        >
          {value
            ? CATEGORIES.find((category) => category.value === value)?.label
            : 'Filter category...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search category...' />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {CATEGORIES.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === category.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
