<template>
    <div
        class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

        <Head title="Usuários" />

        <!-- Header -->
        <header class="bg-white dark:bg-gray-800 shadow">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <Link :href="route('home')">
                        <Logo :width="40" :height="40" variant="default"
                            class="hover:opacity-80 transition-opacity cursor-pointer" />
                    </Link>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Usuários</h1>
                </div>
                <div class="flex items-center gap-4">
                    <UserMenu />
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-8">
            <div class="max-w-7xl mx-auto">
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div class="p-6">
                        <!-- Filtros -->
                        <div class="mb-6 flex gap-3">
                            <InputText v-model="filters.name" @input="applyFilters" placeholder="Filtrar por nome..."
                                class="flex-1" />
                            <InputText v-model="filters.email" @input="applyFilters" placeholder="Filtrar por email..."
                                class="flex-1" />
                            <Button label="Limpar Filtros" @click="clearFilters" severity="secondary" />
                        </div>

                        <Divider />

                        <div class="users-table-wrapper">
                            <DataTable :value="data" :loading="loading" :paginator="true" :rows="rows"
                                :totalRecords="total" :first="(page - 1) * rows" :multiSortMeta="multiSortMeta"
                                :rowsPerPageOptions="[5, 10, 25, 50]" sortMode="multiple" removableSort lazy
                                @page="dataTable.handlePageChange" @sort="dataTable.handleSortChange">
                                <Column field="id" header="ID" sortable class="w-20" />
                                <Column field="name" header="Nome" sortable class="w-56" />
                                <Column field="email" header="Email" sortable class="w-64" />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3'
import Logo from '@/Components/Logo.vue'
import UserMenu from '@/Components/UserMenu.vue'

import usePagination from '@/composables/usePagination'

const {
    data,
    loading,
    total,
    page,
    rows,
    filters,
    applyFilters,
    clearFilters,
    multiSortMeta,
    dataTable,
} = usePagination({
    endpoint: route('users.list'),
    storageKey: 'users-table-pagination',
    initialFilters: { name: '', email: '' },
    initialSort: null,
    initialPage: 1,
    initialRows: 'global',
    autoFetch: true,
})
</script>

<style scoped>
.users-table-wrapper :deep(.p-datatable .p-datatable-tbody > tr),
.users-table-wrapper :deep(.p-datatable td),
.users-table-wrapper :deep(.p-datatable th),
.users-table-wrapper :deep(.p-paginator),
.users-table-wrapper :deep(.p-datatable-paginator-bottom) {
    background-color: transparent !important;
    border-bottom-color: black;
}

.dark .users-table-wrapper :deep(.p-datatable .p-datatable-tbody > tr),
.dark .users-table-wrapper :deep(.p-datatable td),
.dark .users-table-wrapper :deep(.p-datatable th),
.dark .users-table-wrapper :deep(.p-paginator),
.dark .users-table-wrapper :deep(.p-datatable-paginator-bottom) {
    border-bottom-color: whitesmoke !important;
}
</style>
