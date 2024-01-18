import { GetProposalListResult, GetProposalResultsResult } from "common/store";

type ProposalType = GetProposalListResult;
type VoteType = GetProposalResultsResult['votes'];

export function filtration(url: URL, rows: ProposalType | VoteType) {
    if (!Array.isArray(rows) || rows.length === 0) {
        return [];
    }

    const status = url.searchParams.getAll('Status');
    const category = url.searchParams.getAll('Category');
    const direction = url.searchParams.getAll('Vote');

    if (isProposalType(rows)) {
        return filterRowType(rows, status, category);
    } else if (isVoteType(rows)) {
        return filterVoteType(rows, status, direction);
    }

    return [];
}

function filterItems<T>(items: T[], filters: Record<string, string[]>): T[] {
    return items.filter(item => 
        Object.entries(filters).every(([key, values]) => 
            values.length === 0 || values.includes(item[key])
        )
    );
}

function isProposalType(rows: any[]): rows is ProposalType {
    return rows.every(row => 'category' in row && 'status' in row);
}

function isVoteType(rows: any[]): rows is VoteType {
    return rows.every(row => 'direction' in row && 'status' in row);
}

function filterRowType(rows: ProposalType, status: string[], category: string[]): ProposalType {
    return filterItems(rows, { status, category });
}

function filterVoteType(votes: VoteType, status: string[], direction: string[]): VoteType {
    return filterItems(votes, { status, direction });
}

