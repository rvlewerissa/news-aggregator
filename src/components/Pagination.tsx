import { useRouter } from 'next/router';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationWrapperProps = {
  currentPage: number;
  totalPages: number;
};

export default function PaginationWrapper({
  currentPage,
  totalPages,
}: PaginationWrapperProps) {
  const router = useRouter();

  const goToPage = (page: number, event: React.MouseEvent) => {
    event.preventDefault();
    if (page < 1 || page > totalPages) return;
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page },
      },
      undefined,
      { scroll: false }
    );
  };

  const renderPaginationItems = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) pages.push('ellipsis');

      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push('ellipsis');

      pages.push(totalPages);
    }

    return pages.map((page, index) => (
      <PaginationItem key={index}>
        {page === 'ellipsis' ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            href='#'
            onClick={(event) => goToPage(page, event)}
            className={currentPage === page ? 'font-bold text-blue-600' : ''}
          >
            {page}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  return (
    <Pagination className='mt-6'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(event) => goToPage(currentPage - 1, event)}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(event) => goToPage(currentPage + 1, event)}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
