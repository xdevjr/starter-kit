<template>
    <div v-if="isAuthenticated" class="flex">
        <Sidebar :items="sidebarItems" />
        <!-- Conteúdo sem padding extra, sidebar não sobrepõe -->
        <div class="flex-1 overflow-hidden">
            <Toast position="top-right" />
            <slot />
        </div>
    </div>
    <div v-else>
        <Toast position="top-right" />
        <slot />
    </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import Sidebar from '../Components/Sidebar.vue';

const toast = useToast();
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

watch(() => page.props.toast, (toastData) => {
    if (toastData) {
        toast.add(toastData);
    }
}, { immediate: true });
</script>
