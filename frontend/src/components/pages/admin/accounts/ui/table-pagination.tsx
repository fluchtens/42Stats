// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// const MAX_PAGES_TO_SHOW = 3;

// interface TablePaginationProps {
//   currentPage: number;
//   setCurrentPage: (newPage: number) => void;
//   totalPages: number;
// }

// export const TablePagination = ({ currentPage, setCurrentPage, totalPages }: TablePaginationProps) => {
//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages && page !== currentPage) {
//       setCurrentPage(page);
//     }
//   };

//   const renderPages = () => {
//     const pages = [];

//     let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2));
//     const endPage = Math.min(totalPages, startPage + MAX_PAGES_TO_SHOW - 1);
//     if (endPage - startPage + 1 < MAX_PAGES_TO_SHOW) {
//       startPage = Math.max(1, endPage - MAX_PAGES_TO_SHOW + 1);
//     }

//     for (let page = startPage; page <= endPage; page++) {
//       pages.push(
//         <PaginationItem key={page}>
//           <PaginationLink onClick={() => handlePageChange(page)} isActive={currentPage === page} className="cursor-pointer" size={1}>
//             {page}
//           </PaginationLink>
//         </PaginationItem>
//       );
//     }

//     if (startPage > 1) {
//       pages.unshift(
//         <PaginationItem key="ellipsis-start">
//           <PaginationEllipsis />
//         </PaginationItem>
//       );
//     }

//     if (endPage < totalPages) {
//       pages.push(
//         <PaginationItem key="ellipsis-end">
//           <PaginationEllipsis />
//         </PaginationItem>
//       );
//     }

//     return pages;
//   };

//   return (
//     <Pagination className="ml-auto">
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious
//             onClick={() => handlePageChange(currentPage - 1)}
//             className={`${currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
//             size={1}
//           />
//         </PaginationItem>
//         {renderPages()}
//         <PaginationItem>
//           <PaginationNext
//             onClick={() => handlePageChange(currentPage + 1)}
//             className={`${currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
//             size={1}
//           />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// };
