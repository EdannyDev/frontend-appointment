import {
  PaginationWrapper,
  PageButton,
  Ellipsis,
  IconButton
} from "@/styles/pagination.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

// Genera el rango de páginas de manera inteligente
function getPaginationRange(totalPages, currentPage, siblingCount = 1) {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  const pages = [1];

  if (showLeftDots) pages.push("...");

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) pages.push(i);
  }

  if (showRightDots) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;

  const paginationRange = getPaginationRange(totalPages, currentPage);

  return (
    <PaginationWrapper role="navigation" aria-label="Pagination">
      <IconButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </IconButton>

      {paginationRange.map((item, index) => {
        if (item === "...") {
          return <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>;
        }

        const isActive = item === currentPage;

        return (
          <PageButton
            key={item}
            active={isActive}
            disabled={isActive}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </PageButton>
        );
      })}

      <IconButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </IconButton>
    </PaginationWrapper>
  );
}