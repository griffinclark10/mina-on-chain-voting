import { RowType, VotesType } from "./fakedata";
import { GetProposalListResult } from "./store";

export function filtration(url: URL, rows: GetProposalListResult | VotesType) {
    let filteredRows = rows;
    const status = url.searchParams.getAll('Status');
    if (isRowType(rows)) {
        const category = url.searchParams.getAll('Category'); 
        filteredRows = rows.filter(row => (status.length > 0 ? status.includes(row.status) : true) && (category.length > 0 ? category.includes(row.category) : true));
    } else if (isVoteType(rows)) {
        const votes = url.searchParams.getAll('Vote');
        filteredRows = rows.filter(row => status.length > 0 ? status.includes(row.Status) : true && votes.length > 0 ? votes.includes(row.Vote) : true);
    }
    return filteredRows;
}

function isRowType(row: RowType | VotesType) {
    return 'category' in row[0]; 
}

function isVoteType(row: RowType | VotesType) {
    return 'Vote' in row[0];
}

