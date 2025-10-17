import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";
import styles from "./Pagination.module.css";
import { useAddQuery } from "../../hooks/useAddQuery";

interface PaginationProps {
  totalPages: number;
}

function Pagination({ totalPages }: PaginationProps) {
  const { getQuery, setQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1", 10);

  const handlePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (page === 1) {
      setQuery("page", undefined); // remove from URL if default
    } else {
      setQuery("page", page.toString());
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.paginationContainer}>
      <div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <button disabled={currentPage === 1} onClick={() => handlePage(1)}>
          <RxDoubleArrowLeft />
        </button>

        <button
          disabled={currentPage === 1}
          onClick={() => handlePage(currentPage - 1)}
        >
          <RxChevronLeft />
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePage(currentPage + 1)}
        >
          <RxChevronRight />
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePage(totalPages)}
        >
          <RxDoubleArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
