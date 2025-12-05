<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

        <Head title="Home" />

        <!-- Header with Theme Selector -->
        <header class="p-4 flex justify-end">
            <ThemeSelector />
        </header>

        <!-- Hero Section -->
        <div class="container mx-auto px-4 py-16">
            <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                    Starter Kit Laravel
                </h1>
                <p class="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
                    Sistema de autenticação completo com Laravel, Vue 3, Inertia.js, PrimeVue e Tailwind CSS
                </p>

                <!-- Features -->
                <div class="grid md:grid-cols-3 gap-6 mb-12">
                    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <i class="pi pi-shield text-4xl text-blue-500 mb-4"></i>
                        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Autenticação Segura</h3>
                        <p class="text-gray-600 dark:text-gray-400">Sistema completo de login, registro e recuperação de
                            senha</p>
                    </div>

                    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <i class="pi pi-palette text-4xl text-purple-500 mb-4"></i>
                        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Design Moderno</h3>
                        <p class="text-gray-600 dark:text-gray-400">Interface elegante com suporte a tema claro e escuro
                        </p>
                    </div>

                    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <i class="pi pi-bolt text-4xl text-yellow-500 mb-4"></i>
                        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Pronto para Produção</h3>
                        <p class="text-gray-600 dark:text-gray-400">Código otimizado e boas práticas implementadas</p>
                    </div>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button label="Criar Conta" icon="pi pi-user-plus" size="large"
                        class="bg-blue-600 hover:bg-blue-700" @click="router.visit('/register')" />
                    <Button label="Entrar" icon="pi pi-sign-in" severity="secondary" size="large" outlined
                        @click="router.visit('/login')" />
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="absolute bottom-0 w-full py-6 text-center text-gray-600 dark:text-gray-400">
            <p>Desenvolvido com ❤️ usando Laravel 12 e Vue 3</p>
        </footer>
    </div>
</template>

<script setup>
import { Head, router } from '@inertiajs/vue3';
import ThemeSelector from '@/Components/ThemeSelector.vue';
import Button from 'primevue/button';
</script>