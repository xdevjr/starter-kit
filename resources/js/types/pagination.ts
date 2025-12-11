import type { Ref } from "vue";
import type { AxiosError } from "axios";

export interface SortItem {
    field: string;
    direction: "asc" | "desc";
}

export interface MultiSortMeta {
    field: string;
    order: 1 | -1;
}

export interface PaginationEvent {
    page: number;
    rows: number;
    sortField?: string;
    sortOrder?: 1 | -1;
    filters?: Record<string, any>;
}

export interface SortChangeEvent {
    multiSortMeta?: MultiSortMeta[];
}

export interface PageChangeEvent {
    page: number;
    rows: number;
}

export interface UsePaginationOptions {
    endpoint: string;
    storageKey: string;
    initialFilters?: Record<string, any>;
    initialSort?: SortItem | SortItem[] | null;
    initialPage?: number;
    initialRows?: number | "global";
    autoFetch?: boolean;
    pageName?: string;
}

export interface UsePaginationReturn {
    loading: Ref<boolean>;
    data: Ref<any[]>;
    total: Ref<number>;
    page: Ref<number>;
    rows: Ref<number>;
    filters: Record<string, any>;
    sort: Ref<SortItem[]>;
    fetch: () => Promise<void>;
    setPage: (p: number) => void;
    setRows: (r: number) => void;
    setSort: (s: SortItem | SortItem[] | string | null | undefined) => void;
    setFilters: (f: Record<string, any>) => void;
    clearFilters: () => MultiSortMeta[];
    applyFilters: (debounceMs?: number) => void;
    multiSortMeta: Ref<MultiSortMeta[]>;
    dataTable: {
        getSortMeta: () => MultiSortMeta[];
        setSortMeta: (meta: MultiSortMeta[]) => void;
        handlePageChange: (event: PageChangeEvent) => void;
        handleSortChange: (event: SortChangeEvent) => MultiSortMeta[];
        onTableChange: (event: PaginationEvent) => void;
        multiSortMeta: Ref<MultiSortMeta[]>;
    };
}
