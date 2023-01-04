import React from 'react';
import ReactPaginate from 'react-paginate';
import  styles  from "./Pagination.module.scss";

type PaginationProps = {
  onChangePage: any;
}

export const Pagination: React.FC<PaginationProps> = ({onChangePage}) => {

  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
      />
  )
}
