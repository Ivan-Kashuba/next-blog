export interface Pagination {
    skip: number;
    limit: number;
    total: number;
}

export interface PaginationResult {
    pagination: Pagination;
}
