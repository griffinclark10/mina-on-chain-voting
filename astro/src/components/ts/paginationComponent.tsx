// Pagination.jsx
import React, { useState, useEffect } from 'react';
import { buttonVariants } from './buttonVariants';
import { cn } from '../../../common/utils';
import { rows } from 'common/fakedata';
// import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { currentPage, numPages } from '../ts/pagination';
import { useStore } from '@nanostores/react';

export const Pagination = () => {
  const itemsPerPage = 10;
  const $currentPageVal = useStore(currentPage);
  const $numPagesVal = useStore(numPages);

  const clickHandler = () => {
    console.log('Select is clicked');
  };

  // const currentPage = atom(1);
  // const numPages = Math.ceil(rows.length / itemsPerPage);
  const disabled: boolean = rows.length < itemsPerPage ? true : false;

  const handlePageChange = (pageNumber: number) => {
    alert(`Page changed to ${pageNumber}`);
    currentPage.set(pageNumber);
    console.log(`Current page is now ${$currentPageVal}`);
  };

  // Calculate displayed rows
  useEffect(() => {
    const startIdx = (currentPage.get() - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const displayedRows = rows.slice(startIdx, endIdx);
    // renderTableBody(displayedRows);
  }, [$currentPageVal, rows, itemsPerPage]);

  // Render Pagination UI here
  return (
    <div className="flex items-center justify-between px-2 flex-row">
      <div id="page-indicator" className="flex-1 text-sm text-muted-foreground">
        Page {currentPage.value} of {numPages.value}
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <button
            id="first-page"
            className={cn(buttonVariants({ variant: 'outline' }), 'h-8 w-8 p-0 hidden lg:flex')}
            // disabled={disabled}
            onClick={() => handlePageChange(1)}
          >
            <span className="sr-only">Go to first page</span>
            {/* <DoubleArrowLeftIcon className="h-4 w-4" /> */}
          </button>
          <button
            id="prev-page"
            className={cn(buttonVariants({ variant: 'outline' }), 'h-8 w-8 p-0 lg:flex')}
            //   disabled={disabled}
            onClick={() => console.log('Previous page clicked')}
          >
            <span className="sr-only">Go to first page</span>
            {/* <ChevronLeftIcon className="h-4 w-4" /> */}
          </button>
          <button
            id="next-page"
            className={cn(buttonVariants({ variant: 'outline' }), 'h-8 w-8 p-0 lg:flex')}
            // disabled={disabled}
            onClick={() => alert('Clicked')}
          >
            <span className="sr-only">Go to first page</span>
            {/* <ChevronRightIcon className="h-4 w-4" /> */}
          </button>
          <button
            id="last-page"
            className={cn(buttonVariants({ variant: 'outline' }), 'h-8 w-8 p-0 hidden lg:flex')}
            // disabled={disabled}
            onClick={() => alert($numPagesVal)}
          >
            <span className="sr-only">Go to first page</span>
            {/* <DoubleArrowRightIcon className="h-4 w-4" /> */}
          </button>
          <button className="bg-blue-200" onClick={() => console.log('last button')}>
            Value
          </button>
        </div>
      </div>
    </div>
  );
};

// export default Pagination;
