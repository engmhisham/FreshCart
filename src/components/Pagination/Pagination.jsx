import React, { useEffect, useState } from "react";
import "./Pagination.css";
export default function Pagination({
  paginationData,
  getProducts,
  limitItems,
}) {
  // "currentPage": 2,
  // "numberOfPages": 3,
  // "limit": 20,
  // "nextPage": 3,
  // "prevPage": 1
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(paginationData.currentPage);
  }, [paginationData]);

  function getNextPage() {
    if (paginationData.nextPage != null) {
      setCurrentPage(paginationData.nextPage);
      getProducts(limitItems, paginationData.nextPage);
    }
  }

  function getPrevPage() {
    if (paginationData.prevPage != null) {
      setCurrentPage(paginationData.prevPage);
      getProducts(limitItems, paginationData.prevPage);
    }
  }

  return (
    <div className="d-flex justify-content-center mt-5 mb-2">
      <nav aria-label="...">
        <ul className="pagination ">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button className="page-link" onClick={getPrevPage}>
              Previous
            </button>
          </li>
          <li className="page-item mx-1 disabled">
            <span className="page-link fw-bold">{currentPage}</span>
          </li>
          <li
            className={`page-item ${paginationData.nextPage ? "" : "disabled"}`}
          >
            <button className="page-link" onClick={getNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
