<template>
    <div v-if="isAuthenticated" class="flex">
        <Sidebar :items="sidebarItems" />
        <!-- Conteúdo sem padding extra, sidebar não sobrepõe -->
        <div class="flex-1 overflow-hidden">
            <slot />
        </div>
    </div>
    <div v-else>
        <slot />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import Sidebar from '@/Components/Sidebar.vue';

const page = usePage();
const isAuthenticated = computed(() => !!page.props.auth?.user);

const sidebarItems = [
    {
        label: 'Home',
        action: route('home'),
        icon: 'pi pi-home'
    },
    {
        label: 'Dashboard',
        action: route('dashboard'),
        icon: 'pi pi-chart-bar'
    },
    {
        label: 'Projetos',
        icon: 'pi pi-folder',
        submenu: [
            {
                label: 'Meus Projetos',
                action: '#',
                icon: 'pi pi-briefcase'
            },
            {
                label: 'Arquivos',
                action: '#',
                icon: 'pi pi-file'
            }
        ]
    },
    {
        label: 'Configurações',
        icon: 'pi pi-cog',
        submenu: [
            {
                label: 'Gerais',
                action: '#',
                icon: 'pi pi-sliders-h'
            },
            {
                label: 'Segurança',
                action: '#',
                icon: 'pi pi-shield'
            }
        ]
    },
    {
        label: 'Ajuda',
        action: '#',
        icon: 'pi pi-question-circle'
    }
];
</script>
