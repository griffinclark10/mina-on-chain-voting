import { RowType, VotesType } from './fakedata';

export function pagination(url: URL, filteredRows: RowType | VotesType) {
    const currentPage: number = parseInt(url.searchParams.get('page') ?? "1");
    const itemsPerPage = 10;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const numPages = Math.ceil(filteredRows.length / itemsPerPage);
    let visibleRows = filteredRows.slice(start, end);
    return [visibleRows, numPages];
}