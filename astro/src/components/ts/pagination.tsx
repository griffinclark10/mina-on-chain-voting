// Pagination.jsx
import React, { useState, useEffect } from 'react';
import { buttonVariants } from '../ts/buttonVariants';
import { cn } from '../../../common/utils';
import { FakeDataRow } from 'common/fakedata';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { WritableAtom, atom } from 'nanostores';

const Pagination = ({ rows, itemsPerPage }:
    {
        rows: FakeDataRow[],
        itemsPerPage: number,
        // visibleRows: WritableAtom<FakeDataRow[]>,
        // renderTableBody: (rows: FakeDataRow[]) => void
    }) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const numPages = Math.ceil(rows.length / itemsPerPage);
    const disabled: boolean = rows.length < itemsPerPage ? true : false;
    
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Calculate displayed rows
    useEffect(() => {
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const displayedRows = rows.slice(startIdx, endIdx);
        // renderTableBody(displayedRows);
    }, [currentPage, rows, itemsPerPage]);

    // Render Pagination UI here
  return (
    <div className="flex items-center justify-between px-2 flex-row">
        <div id="page-indicator" className="flex-1 text-sm text-muted-foreground">
            Page {currentPage} of {numPages}
        </div>
        <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
                <button 
                    id="first-page"
                    className={cn(
                    buttonVariants({variant: 'outline',}),
                    'h-8 w-8 p-0 hidden lg:flex')}
                    disabled={disabled}
                >
                    <span className="sr-only">Go to first page</span>
                    <DoubleArrowLeftIcon className="h-4 w-4" />
                </button>
                <button 
                    id="prev-page"
                    className={cn(
                    buttonVariants({variant: 'outline',}),
                    'h-8 w-8 p-0 lg:flex')}
                    disabled={disabled}
                >
                    <span className="sr-only">Go to first page</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                </button> 
                <button 
                    id="next-page"
                    className={cn(
                    buttonVariants({variant: 'outline',}),
                    'h-8 w-8 p-0 lg:flex')}
                    disabled={disabled}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <span className="sr-only">Go to first page</span>
                    <ChevronRightIcon className="h-4 w-4" />
                </button> 
                <button 
                    id="last-page"
                    className={cn(
                    buttonVariants({variant: 'outline',}),
                    'h-8 w-8 p-0 hidden lg:flex')}
                    disabled={disabled}
                >
                    <span className="sr-only">Go to first page</span>
                    <DoubleArrowRightIcon className="h-4 w-4" />
                </button> 
            </div>
        </div>
    </div>
  );
};

export default Pagination;
