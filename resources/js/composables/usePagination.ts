import { ref, reactive, watch } from "vue";
import type { Ref, UnwrapRef } from "vue";
import axios from "axios";
import type {
    SortItem,
    MultiSortMeta,
    PaginationEvent,
    SortChangeEvent,
    PageChangeEvent,
    UsePaginationOptions,
    UsePaginationReturn,
} from "@/types/pagination";

export default function usePagination(
    options: UsePaginationOptions
): UsePaginationReturn {
    const {
        endpoint,
        storageKey,
        initialFilters = {},
        initialSort = null,
        initialPage = 1,
        initialRows = 10,
        autoFetch = true,
        pageName = "page",
    } = options;

    // Validar se storageKey foi fornecido
    if (!storageKey) {
        throw new Error("storageKey é obrigatório no composable usePagination");
    }

    const loading: Ref<boolean> = ref(false);
    const data: Ref<any[]> = ref([]);
    const total: Ref<number> = ref(0);
    const page: Ref<number> = ref(initialPage);

    // Determinar rows: se initialRows é 'global', buscar do localStorage, senão usar o valor
    const isGlobalRows = initialRows === "global";
    const defaultRows = isGlobalRows ? 10 : (initialRows as number);

    // Tentar restaurar rows global do localStorage se configurado
    let globalRows = defaultRows;
    if (isGlobalRows) {
        try {
            const stored = localStorage.getItem("global_rows");
            if (stored) {
                globalRows = parseInt(stored, 10);
            }
        } catch (e) {
            globalRows = defaultRows;
        }
    }

    const rows: Ref<number> = ref(globalRows);

    // Tenta restaurar filtros, sort e rows do localStorage
    interface SavedState {
        filters?: Record<string, any>;
        sort?: SortItem[];
        rows?: number;
    }

    let savedState: SavedState = {};
    try {
        savedState = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch (e) {
        savedState = {};
    }

    const filters: UnwrapRef<Record<string, any>> = reactive({
        ...initialFilters,
        ...(savedState.filters || {}),
    });

    // Sort agora é um array de objetos: [{field: 'id', direction: 'asc'}, {field: 'name', direction: 'desc'}]
    const initialSortArray: SortItem[] = initialSort
        ? Array.isArray(initialSort)
            ? initialSort
            : [initialSort]
        : [];

    // Converter sort salvo do localStorage para o novo formato se necessário
    const normalizeSortArray = (savedSort: any): SortItem[] => {
        if (!savedSort || savedSort.length === 0) return initialSortArray;

        return savedSort.map((item: any) => {
            // Se é string 'field,order', converte para objeto
            if (typeof item === "string") {
                const [field, direction] = item.split(",");
                return { field, direction };
            }
            // Se já é objeto, mantém como está
            return item;
        });
    };

    const savedSort = normalizeSortArray(savedState.sort);
    const sort: Ref<SortItem[]> = ref(savedSort);

    // Restaurar rows do localStorage se existir (apenas se não for global)
    if (!isGlobalRows && savedState.rows) {
        rows.value = savedState.rows;
    }

    // Função para buscar dados do backend
    const fetch = async (): Promise<void> => {
        loading.value = true;
        try {
            const params = new URLSearchParams();
            params.append(pageName, page.value.toString());
            params.append("per_page", rows.value.toString());

            // Adicionar filtros como filters[key]=value
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== "" && value !== null && value !== undefined) {
                    params.append(`filters[${key}]`, String(value));
                }
            });

            // Adicionar sort como sort[]=field,direction
            if (sort.value && sort.value.length > 0) {
                sort.value.forEach((sortItem) => {
                    const sortString = `${sortItem.field},${sortItem.direction}`;
                    params.append("sort[]", sortString);
                });
            }

            const response = await axios.get<{
                data?: any[];
                items?: any[];
                total?: number;
                meta?: { total: number };
            }>(`${endpoint}?${params.toString()}`);

            // Adapte conforme o formato do backend
            data.value = response.data.data || response.data.items || [];
            total.value = response.data.total || response.data.meta?.total || 0;
        } finally {
            loading.value = false;
        }
    };

    // Watcher profundo para persistir filtros, sort e rows no localStorage
    watch(
        [filters, sort, rows],
        ([newFilters, newSort, newRows]) => {
            // Se rows é global, salvar na chave global_rows
            if (isGlobalRows) {
                localStorage.setItem("global_rows", newRows.toString());
            }

            // Construir estado apenas com valores que diferem dos iniciais
            const stateToSave: SavedState = {};

            // Persistir filtros apenas se diferentes dos iniciais
            if (JSON.stringify(newFilters) !== JSON.stringify(initialFilters)) {
                stateToSave.filters = newFilters;
            }

            // Persistir sort apenas se diferente do inicial (comparar como objetos)
            if (JSON.stringify(newSort) !== JSON.stringify(initialSortArray)) {
                stateToSave.sort = newSort;
            }

            // Persistir rows apenas se diferente do inicial e não for global
            if (!isGlobalRows && newRows !== defaultRows) {
                stateToSave.rows = newRows;
            }

            // Salvar apenas se houver mudanças em relação ao inicial
            if (Object.keys(stateToSave).length > 0) {
                localStorage.setItem(storageKey, JSON.stringify(stateToSave));
            } else {
                // Se tudo voltou ao inicial, limpar do localStorage
                localStorage.removeItem(storageKey);
            }
        },
        { deep: true }
    );

    // Watchers para auto-fetch (sem persistência)
    watch([page, rows, sort], () => {
        if (autoFetch) fetch();
    });

    // Watcher profundo para filtros, dispara fetch apenas se mudarem de fato
    let lastFilters = JSON.stringify(filters);
    watch(
        filters,
        (newFilters) => {
            const current = JSON.stringify(newFilters);
            if (autoFetch && current !== lastFilters) {
                fetch();
                lastFilters = current;
            }
        },
        { deep: true }
    );

    // Métodos para atualizar estado
    const setPage = (p: number): void => {
        page.value = p;
    };

    const setRows = (r: number): void => {
        rows.value = r;
    };

    const setSort = (
        s: SortItem | SortItem[] | string | null | undefined
    ): void => {
        if (s === null || s === undefined) {
            sort.value = [];
        } else if (Array.isArray(s)) {
            // Converter strings para objetos se necessário
            sort.value = s.map((item: any) => {
                if (typeof item === "string") {
                    const [field, direction] = item.split(",");
                    return { field, direction } as SortItem;
                }
                return item;
            });
        } else if (typeof s === "string") {
            // Compatibilidade com string separada por ;
            sort.value = (s as string)
                .split(";")
                .filter(Boolean)
                .map((item: string) => {
                    const [field, direction] = item.split(",");
                    return { field, direction } as SortItem;
                });
        } else {
            sort.value = [s as SortItem];
        }
    };

    const setFilters = (f: Record<string, any>): void => {
        Object.assign(filters, f);
    };

    const clearFilters = (): MultiSortMeta[] => {
        Object.assign(filters, initialFilters);
        sort.value = [...initialSortArray];
        setPage(1);
        // Sincroniza sort/meta após reset
        setSortMeta(getSortMeta());
        return multiSortMeta.value;
    };

    // Converte sort array para estrutura multiSortMeta do PrimeVue
    // [{field: 'field1', direction: 'asc'}, {field: 'field2', direction: 'desc'}] -> [{field: 'field1', order: 1}, {field: 'field2', order: -1}]
    const getSortMeta = (): MultiSortMeta[] => {
        if (!sort.value || sort.value.length === 0) return [];
        return sort.value.map((item: SortItem) => {
            const direction = item.direction;
            const field = item.field;
            return {
                field,
                order: direction === "desc" ? (-1 as const) : (1 as const),
            };
        });
    };

    // Armazena meta de sort para reuso no DataTable
    const multiSortMeta: Ref<MultiSortMeta[]> = ref(getSortMeta());

    // Define sort a partir de multiSortMeta do PrimeVue
    // [{field: 'field1', order: 1}, {field: 'field2', order: -1}] -> [{field: 'field1', direction: 'asc'}, {field: 'field2', direction: 'desc'}]
    const setSortMeta = (meta: MultiSortMeta[]): void => {
        const normalized = Array.isArray(meta) ? meta : [];
        multiSortMeta.value = normalized;
        if (!normalized.length) {
            sort.value = [];
        } else {
            sort.value = normalized.map((s) => ({
                field: s.field,
                direction: s.order === 1 ? ("asc" as const) : ("desc" as const),
            }));
        }
    };

    // Aplica filtros com debounce e reseta para página 1
    let filterDebounceTimer: NodeJS.Timeout | null = null;
    const applyFilters = (debounceMs: number = 500): void => {
        if (filterDebounceTimer) {
            clearTimeout(filterDebounceTimer);
        }
        filterDebounceTimer = setTimeout(() => {
            setPage(1);
        }, debounceMs);
    };

    // Handlers prontos para eventos do PrimeVue DataTable
    const handlePageChange = (event: PageChangeEvent): void => {
        setPage(event.page + 1);
        setRows(event.rows);
    };

    const handleSortChange = (event: SortChangeEvent): MultiSortMeta[] => {
        const meta = event?.multiSortMeta || [];
        setSortMeta(meta);
        return meta;
    };

    // Para integração com PrimeVue DataTable
    const onTableChange = (event: PaginationEvent): void => {
        setPage(event.page + 1); // PrimeVue começa do 0
        setRows(event.rows);
        setSort(
            event.sortField
                ? `${event.sortField},${event.sortOrder === 1 ? "asc" : "desc"}`
                : null
        );
        setFilters(event.filters || {});
    };

    // Inicialização
    if (autoFetch) fetch();

    return {
        loading,
        data,
        total,
        page,
        rows,
        filters,
        sort,
        fetch,
        setPage,
        setRows,
        setSort,
        setFilters,
        clearFilters,
        applyFilters,
        multiSortMeta,
        // Agrupa helpers específicos do DataTable
        dataTable: {
            getSortMeta,
            setSortMeta,
            handlePageChange,
            handleSortChange,
            onTableChange, // compatível com @filter/@sort/@page
            multiSortMeta,
        },
    };
}
