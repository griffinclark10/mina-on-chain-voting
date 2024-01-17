import { VotesType } from './fakedata';
import { GetProposalListResult } from './store';

export function pagination(url: URL, filteredRows: GetProposalListResult | VotesType) {
    const currentPage: number = parseInt(url.searchParams.get('page') ?? "1");
    const itemsPerPage = 10;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const numPages = Math.ceil(filteredRows.length / itemsPerPage) < 1 ? 1 : Math.ceil(filteredRows.length / itemsPerPage);
    let visibleRows = filteredRows.slice(start, end);
    return { visibleRows, numPages };
}