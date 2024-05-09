export interface GeneralResponse<T> {
    success: boolean;
    message: string;
    data: T
}

export interface PaginationRows<T> {
    currentPage: number | string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    rows: T;
    totalPages: number;
    totalRegisters: number;
}

export interface PaginationRequest {
    registers: number;
    page: number | string;   
}

export interface BlogPagination extends PaginationRequest {
    search: string;
}