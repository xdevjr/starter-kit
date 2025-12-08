<template>
    <div
        class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

        <Head title="Lista de Usuários" />

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

                        <!-- Ordenação -->
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                Ordenação
                            </label>
                            <div class="flex gap-3 flex-wrap">
                                <div v-for="field in sortFields" :key="field.value"
                                    class="flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all" :class="[
                                        sort.find(s => s.field === field.value)?.direction === 'asc'
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : sort.find(s => s.field === field.value)?.direction === 'desc'
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                    ]">
                                    <span class="text-sm font-medium">{{ field.label }}</span>
                                    <Button :icon="getSortIcon(field.value)" @click="toggleSort(field.value)" text
                                        rounded size="small" :severity="getSortSeverity(field.value)"
                                        v-tooltip.bottom="getSortTitle(field.value)" />
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <!-- Loading State -->
                        <div v-if="loading" class="flex items-center justify-center py-12">
                            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" />
                        </div>

                        <!-- Cards Grid -->
                        <div v-else-if="data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card v-for="user in data" :key="user.id"
                                class="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                :pt="{ header: { class: 'rounded-t-xl overflow-hidden' } }">
                                <template #header>
                                    <div
                                        class="bg-linear-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 p-6 flex items-center gap-4">
                                        <Avatar :label="user.name.charAt(0).toUpperCase()" size="xlarge" shape="circle"
                                            class="bg-white dark:bg-gray-200 text-blue-600 dark:text-blue-700 font-bold text-2xl"
                                            style="width: 4rem; height: 4rem;" />
                                        <div class="flex-1 min-w-0">
                                            <h3 class="text-xl font-bold text-white truncate">{{ user.name }}</h3>
                                            <span class="text-sm text-white/90">ID: {{ user.id }}</span>
                                        </div>
                                    </div>
                                </template>
                                <template #content>
                                    <div class="space-y-3">
                                        <div class="flex items-start gap-3">
                                            <i class="pi pi-envelope text-blue-500 mt-1 text-sm"></i>
                                            <div class="flex-1 min-w-0">
                                                <p
                                                    class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">
                                                    E-mail</p>
                                                <p class="text-sm text-gray-700 dark:text-gray-300 truncate">{{
                                                    user.email }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <i class="pi pi-calendar text-indigo-500 mt-1 text-sm"></i>
                                            <div class="flex-1">
                                                <p
                                                    class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">
                                                    Cadastrado em</p>
                                                <p class="text-sm text-gray-700 dark:text-gray-300">{{
                                                    formatDate(user.created_at) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template #footer>
                                    <div class="flex gap-2">
                                        <Button label="Detalhes" icon="pi pi-eye" class="flex-1" severity="info"
                                            size="small" />
                                        <Button label="Editar" icon="pi pi-pencil" severity="secondary" class="flex-1"
                                            size="small" outlined />
                                    </div>
                                </template>
                            </Card>
                        </div>

                        <!-- Empty State -->
                        <div v-else class="text-center py-16">
                            <i class="pi pi-inbox text-6xl text-gray-300 dark:text-gray-600 mb-4 block"></i>
                            <p class="text-gray-500 dark:text-gray-400 text-lg font-medium">Nenhum usuário encontrado
                            </p>
                            <p class="text-gray-400 dark:text-gray-500 text-sm mt-2">Tente ajustar seus filtros</p>
                        </div>

                        <!-- Pagination -->
                        <div v-if="total > 0" class="mt-6">
                            <Paginator :rows="rows" :totalRecords="total" :first="(page - 1) * rows"
                                :rowsPerPageOptions="[5, 10, 25, 50]" @page="dataTable.handlePageChange"
                                :pt="{ root: { class: '!bg-transparent' } }" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Head, Link } from '@inertiajs/vue3'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Avatar from 'primevue/avatar'
import ProgressSpinner from 'primevue/progressspinner'
import Paginator from 'primevue/paginator'
import Logo from '@/Components/Logo.vue'
import UserMenu from '@/Components/UserMenu.vue'
import usePagination from '@/Composables/usePagination'

const {
    data,
    loading,
    total,
    page,
    rows,
    filters,
    sort,
    applyFilters,
    clearFilters,
    dataTable,
} = usePagination({
    endpoint: route('users.list'),
    storageKey: 'users-list-pagination',
    initialFilters: { name: '', email: '' },
    initialSort: null,
    initialPage: 1,
    initialRows: 'global',
    autoFetch: true,
})

const sortFields = [
    { label: 'ID', value: 'id' },
    { label: 'Nome', value: 'name' },
    { label: 'Email', value: 'email' }
]

// Obtém o estado atual de um campo
const getSortState = (field) => {
    return sort.value.find(s => s.field === field)?.direction || null
}

// Obtém o ícone baseado no estado
const getSortIcon = (field) => {
    const state = getSortState(field)
    if (state === 'asc') return 'pi pi-sort-amount-up-alt'
    if (state === 'desc') return 'pi pi-sort-amount-down'
    return 'pi pi-sort-alt'
}

// Obtém a severidade baseada no estado
const getSortSeverity = (field) => {
    const state = getSortState(field)
    if (state === 'asc') return 'info'
    if (state === 'desc') return 'help'
    return 'secondary'
}

// Obtém o título do tooltip baseado no estado
const getSortTitle = (field) => {
    const state = getSortState(field)
    if (state === 'asc') return 'Crescente - Clique para Decrescente'
    if (state === 'desc') return 'Decrescente - Clique para Desabilitar'
    return 'Desabilitado - Clique para Crescente'
}

// Alterna entre os 3 estados: desabilitado -> asc -> desc -> desabilitado
const toggleSort = (field) => {
    const currentState = getSortState(field)

    if (currentState === null) {
        sort.value = [...sort.value, { field, direction: 'asc' }]
    } else if (currentState === 'asc') {
        sort.value = sort.value.map(s => s.field === field ? { ...s, direction: 'desc' } : s)
    } else {
        sort.value = sort.value.filter(s => s.field !== field)
    }
}

// Formata data para exibição
const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}
</script>
