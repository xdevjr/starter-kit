<template>
    <div
        class="h-screen overflow-hidden bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex flex-col">

        <Head title="Home" />

        <!-- Header with Theme Selector -->
        <header class="p-4 flex justify-end">
            <ThemeSelector />
        </header>

        <!-- Hero Section -->
        <div class="flex-1 flex items-center justify-center px-4">
            <div class="max-w-5xl mx-auto text-center">
                <div class="flex justify-center mb-6">
                    <Link :href="route('home')">
                        <Logo :width="100" :height="100" variant="default"
                            class="hover:opacity-80 transition-opacity cursor-pointer" />
                    </Link>
                </div>
                <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    Starter Kit Laravel
                </h1>
                <p class="text-lg md:text-xl mb-10 text-gray-700 dark:text-gray-300 leading-relaxed">
                    Sistema de autenticação completo com
                    <span class="text-red-600 font-semibold"> Laravel</span>,
                    <span class="text-emerald-600 font-semibold"> Vue 3</span>,
                    <span class="text-purple-600 font-semibold"> Inertia.js</span>,
                    <span class="text-sky-600 font-semibold"> PrimeVue</span>,
                    <span class="text-cyan-600 font-semibold"> Tailwind CSS</span>
                    e <span class="text-amber-600 font-semibold"> Vite</span>.
                </p>

                <!-- Features -->
                <div class="grid md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 py-10 px-6 rounded-lg shadow-lg">
                        <i class="pi pi-shield text-4xl text-blue-500 mb-3"></i>
                        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Autenticação Segura</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Sistema completo de login, registro e
                            recuperação</p>
                    </div>

                    <div class="bg-white dark:bg-gray-800 py-10 px-6 rounded-lg shadow-lg">
                        <i class="pi pi-palette text-4xl text-purple-500 mb-3"></i>
                        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Design Moderno</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Interface elegante com tema claro e escuro
                        </p>
                    </div>

                    <div class="bg-white dark:bg-gray-800 py-10 px-6 rounded-lg shadow-lg">
                        <i class="pi pi-bolt text-4xl text-yellow-500 mb-3"></i>
                        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Pronto para Produção</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Código otimizado e boas práticas</p>
                    </div>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <template v-if="isAuthenticated">
                        <Link :href="route('dashboard')" class="inline-flex">
                            <Button label="Ir para o Dashboard" icon="pi pi-chart-bar" size="large"
                                class="bg-emerald-600 hover:bg-emerald-700" />
                        </Link>
                    </template>
                    <template v-else>
                        <Button label="Criar Conta" icon="pi pi-user-plus" size="large"
                            class="bg-blue-600 hover:bg-blue-700" @click="router.visit(route('register'))" />
                        <Button label="Entrar" icon="pi pi-sign-in" severity="secondary" size="large" outlined
                            @click="router.visit(route('login'))" />
                    </template>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="py-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Desenvolvido com ❤️ usando Laravel 12 e Vue 3</p>
        </footer>
    </div>
</template>

<script setup>
import { Head, router, Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import ThemeSelector from '@/Components/ThemeSelector.vue';
import Logo from '@/Components/Logo.vue';
import Button from 'primevue/button';

const page = usePage();
const isAuthenticated = computed(() => Boolean(page.props.auth?.user));
</script>