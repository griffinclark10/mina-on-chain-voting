export function pagination({tableId, paginationDivId, rowsPerPage}: {
    tableId: string,
    paginationDivId: string,
    rowsPerPage: number,
}) {
    const table = document.getElementById(tableId) as HTMLTableElement;
    const rows = Array.from(table?.getElementsByTagName('tbody')[0].rows);
    const totalPages = Math.ceil(rows.length / rowsPerPage) as number;
    let currentPage = 1;
    const paginationDiv = document.getElementById(paginationDivId) as HTMLDivElement;


}