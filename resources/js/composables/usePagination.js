// Composable para paginação e filtros, compatível com PrimeVue DataTable
import { ref, reactive, watch } from "vue";
import axios from "axios";

export default function usePagination({
    endpoint,
    storageKey,
    initialFilters = {},
    initialSort = null,
    initialPage = 1,
    initialRows = 10,
    autoFetch = true,
    pageName = "page",
}) {
    // Validar se storageKey foi fornecido
    if (!storageKey) {
        throw new Error("storageKey é obrigatório no composable usePagination");
    }
    const loading = ref(false);
    const data = ref([]);
    const total = ref(0);
    const page = ref(initialPage);

    // Determinar rows: se initialRows é 'global', buscar do localStorage, senão usar o valor
    const isGlobalRows = initialRows === "global";
    const defaultRows = isGlobalRows ? 10 : initialRows;

    // Tentar restaurar rows global do localStorage se configurado
    let globalRows = defaultRows;
    if (isGlobalRows) {
        try {
            const stored = localStorage.getItem("global_rows");
            if (stored) {
                globalRows = parseInt(stored);
            }
        } catch (e) {
            globalRows = defaultRows;
        }
    }

    const rows = ref(globalRows);

    // Tenta restaurar filtros, sort e rows do localStorage
    let savedState = {};
    try {
        savedState = JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch (e) {
        savedState = {};
    }
    const filters = reactive({
        ...initialFilters,
        ...(savedState.filters || {}),
    });

    // Sort agora é um array de objetos: [{field: 'id', direction: 'asc'}, {field: 'name', direction: 'desc'}]
    const initialSortArray = initialSort
        ? Array.isArray(initialSort)
            ? initialSort
            : [initialSort]
        : [];

    // Converter sort salvo do localStorage para o novo formato se necessário
    const normalizeSortArray = (savedSort) => {
        if (!savedSort || savedSort.length === 0) return initialSortArray;

        return savedSort.map((item) => {
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
    const sort = ref(savedSort);

    // Restaurar rows do localStorage se existir (apenas se não for global)
    if (!isGlobalRows && savedState.rows) {
        rows.value = savedState.rows;
    }

    // Função para buscar dados do backend
    const fetch = async () => {
        loading.value = true;
        try {
            const params = new URLSearchParams();
            params.append(pageName, page.value);
            params.append("per_page", rows.value);

            // Adicionar filtros como filters[key]=value
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== "" && value !== null && value !== undefined) {
                    params.append(`filters[${key}]`, value);
                }
            });

            // Adicionar sort como sort[]=field,direction
            if (sort.value && sort.value.length > 0) {
                sort.value.forEach((sortItem) => {
                    const sortString = `${sortItem.field},${sortItem.direction}`;
                    params.append("sort[]", sortString);
                });
            }

            const response = await axios.get(
                `${endpoint}?${params.toString()}`
            );
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
            const stateToSave = {};

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
    const setPage = (p) => {
        page.value = p;
    };
    const setRows = (r) => {
        rows.value = r;
    };
    const setSort = (s) => {
        if (s === null || s === undefined) {
            sort.value = [];
        } else if (Array.isArray(s)) {
            // Converter strings para objetos se necessário
            sort.value = s.map((item) => {
                if (typeof item === "string") {
                    const [field, direction] = item.split(",");
                    return { field, direction };
                }
                return item;
            });
        } else {
            // Compatibilidade com string separada por ;
            sort.value = s
                .split(";")
                .filter(Boolean)
                .map((item) => {
                    const [field, direction] = item.split(",");
                    return { field, direction };
                });
        }
    };
    const setFilters = (f) => {
        Object.assign(filters, f);
    };
    const clearFilters = () => {
        Object.assign(filters, initialFilters);
        sort.value = [...initialSortArray];
        setPage(1);
        // Sincroniza sort/meta após reset
        setSortMeta(getSortMeta());
        return multiSortMeta.value;
    };

    // Converte sort array para estrutura multiSortMeta do PrimeVue
    // [{field: 'field1', direction: 'asc'}, {field: 'field2', direction: 'desc'}] -> [{field: 'field1', order: 1}, {field: 'field2', order: -1}]
    const getSortMeta = () => {
        if (!sort.value || sort.value.length === 0) return [];
        return sort.value.map((item) => {
            const direction =
                typeof item === "string" ? item.split(",")[1] : item.direction;
            const field =
                typeof item === "string" ? item.split(",")[0] : item.field;
            return {
                field,
                order: direction === "desc" ? -1 : 1,
            };
        });
    };

    // Armazena meta de sort para reuso no DataTable
    const multiSortMeta = ref(getSortMeta());

    // Define sort a partir de multiSortMeta do PrimeVue
    // [{field: 'field1', order: 1}, {field: 'field2', order: -1}] -> [{field: 'field1', direction: 'asc'}, {field: 'field2', direction: 'desc'}]
    const setSortMeta = (meta) => {
        const normalized = Array.isArray(meta) ? meta : [];
        multiSortMeta.value = normalized;
        if (!normalized.length) {
            sort.value = [];
        } else {
            sort.value = normalized.map((s) => ({
                field: s.field,
                direction: s.order === 1 ? "asc" : "desc",
            }));
        }
    };

    // Aplica filtros com debounce e reseta para página 1
    let filterDebounceTimer = null;
    const applyFilters = (debounceMs = 500) => {
        clearTimeout(filterDebounceTimer);
        filterDebounceTimer = setTimeout(() => {
            setPage(1);
        }, debounceMs);
    };

    // Handlers prontos para eventos do PrimeVue DataTable
    const handlePageChange = (event) => {
        setPage(event.page + 1);
        setRows(event.rows);
    };

    const handleSortChange = (event) => {
        const meta = event?.multiSortMeta || [];
        setSortMeta(meta);
        return meta;
    };

    // Para integração com PrimeVue DataTable
    const onTableChange = (event) => {
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
