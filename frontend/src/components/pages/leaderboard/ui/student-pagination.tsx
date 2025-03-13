import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface StudentPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (newPage: number) => void;
}

export const StudentPagination = ({ currentPage, totalPages, setCurrentPage }: StudentPaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    setCurrentPage(page);
  };

  const renderPages = () => {
    const maxPagesToShow = 3;

    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <PaginationItem key={page}>
          <PaginationLink onClick={() => handlePageChange(page)} isActive={currentPage === page} className="cursor-pointer">
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="sm:ml-auto">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} className="cursor-pointer" />
          </PaginationItem>
          {renderPages()}
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} className="cursor-pointer" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
