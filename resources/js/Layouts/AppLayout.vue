<template>
    <Sidebar v-if="isAuthenticated" :items="sidebarItems" :initialState="{ expanded: false }">
        <template #content>
            <slot />
        </template>
    </Sidebar>
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import Sidebar from '@/Components/Sidebar.vue';
import type { PageProps } from '@inertiajs/core';

interface SidebarMenuItem {
    label: string;
    action: string | (() => void);
    icon: string;
    submenu?: SidebarMenuItem[];
}

const page = usePage<PageProps & { auth?: { user?: any } }>();
const isAuthenticated = computed(() => !!page.props.auth?.user);

const route = (name: string, params?: Record<string, any>): string => {
    return (window as any).route(name, params);
};

const sidebarItems: SidebarMenuItem[] = [
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
        label: 'Usuários',
        icon: 'pi pi-users',
        action: '#',
        submenu: [
            {
                label: 'Tabela',
                action: route('users.table'),
                icon: 'pi pi-table'
            },
            {
                label: 'Lista de Cartões',
                action: route('users.card'),
                icon: 'pi pi-th-large'
            }
        ]
    },
    {
        label: 'Projetos',
        icon: 'pi pi-folder',
        action: '#',
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
        action: '#',
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
