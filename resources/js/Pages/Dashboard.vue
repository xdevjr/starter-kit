<template>
    <div
        class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

        <Head title="Dashboard" />

        <!-- Header -->
        <header class="bg-white dark:bg-gray-800 shadow">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <div class="flex items-center gap-4">
                    <ThemeSelector />
                    <Button label="Sair" icon="pi pi-sign-out" severity="danger" @click="logout" />
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto">
                <!-- Welcome Card -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
                    <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Bem-vindo ao Starter Kit! 🎉</h2>
                    <p class="text-lg text-gray-600 dark:text-gray-400">Você está autenticado e pronto para começar a
                        desenvolver.</p>
                </div>

                <!-- Stats Grid -->
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Laravel</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">12.x</p>
                            </div>
                            <i class="pi pi-code text-4xl text-red-500"></i>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Vue</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">3.x</p>
                            </div>
                            <i class="pi pi-bolt text-4xl text-green-500"></i>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">PrimeVue</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">4.x</p>
                            </div>
                            <i class="pi pi-prime text-4xl text-blue-500"></i>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { Head, router } from '@inertiajs/vue3';
import Button from 'primevue/button';
import ThemeSelector from '@/Components/ThemeSelector.vue';

function logout() {
    router.post('/logout');
}
</script>
