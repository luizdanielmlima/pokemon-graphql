import React, { useEffect, useState } from 'react';

import classes from './PaginationBar.module.css';

interface PaginationBarProps {
  allData: any[] | undefined;
  perPageItems: number;
}

// *
// ABOUT PAGINATION
// although most of the pagination logic was done, I decided NOT to include a pagination, since...
// ... the scroll was working fine, with good performance, also on mobile/tablets
// but I decided to keep the code on the project... just in case ;)
// *

const PaginationBar = (props: PaginationBarProps) => {
  const { allData, perPageItems } = props;
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>();

  // this is the calc data for the cur page, will be returned to the parent component!
  const [pageData, setPageData] = useState<any[]>();

  useEffect(() => {
    refreshPagination();
  }, [allData, curPage]);

  const refreshPagination = () => {
    if (allData && allData.length > 0) {
      const {
        page,
        perPage,
        prevPage,
        nexPage,
        total,
        totalPages,
        pageData,
      } = paginator(allData, curPage, perPageItems);

      console.log('pageData: ', pageData);
      setPageData(pageData);
      setTotalPages(totalPages);
    }
  };

  const prevPage = () => {
    setCurPage((prevCurPage) => --prevCurPage);
    console.log('prevPage|curPage: ', curPage);
  };

  const nextPage = () => {
    setCurPage((prevCurPage) => ++prevCurPage);
    console.log('nextPage|curPage: ', curPage);
  };

  const paginator = (
    items: any,
    curPage: number,
    perPageItems: number,
  ) => {
    let page = curPage || 1,
      perPage = perPageItems || 10,
      offset = (page - 1) * perPage,
      paginatedItems = items.slice(offset).slice(0, perPageItems),
      totalPages = Math.ceil(items.length / perPage);

    return {
      page,
      perPage,
      prevPage: page - 1 ? page - 1 : null,
      nexPage: totalPages > page ? page + 1 : null,
      total: items.length,
      totalPages,
      pageData: paginatedItems,
    };
  };

  return (
    <div className={classes.pagination}>
      <button
        type="submit"
        className="button"
        onClick={prevPage}
        disabled={curPage === 1}
      >
        {`<`}
      </button>
      <div>
        Page:{curPage} of {totalPages}
      </div>
      <button type="submit" className="button" onClick={nextPage}>
        {`>`}
      </button>
    </div>
  );
};

export default PaginationBar;
