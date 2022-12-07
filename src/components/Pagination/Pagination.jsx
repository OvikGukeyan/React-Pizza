import React from 'react';
import ReactPaginate from 'react-paginate';
import  styles  from "./Pagination.module.scss";

export function Pagination({setCurrentPage}) {
  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setCurrentPage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
  )
}
