<template>
    <div class="relative">
        <Button text class="flex items-center gap-2" @click="toggleMenu">
            <Avatar :label="initials" shape="circle"
                class="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100" />
            <div class="hidden sm:block text-left leading-tight">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ firstName }}</p>
            </div>
            <i class="pi pi-chevron-down text-sm text-gray-500"></i>
        </Button>
        <Menu ref="menu" :model="items" popup class="w-52" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import type { PageProps } from '@inertiajs/core';

interface User {
    id: number;
    name: string;
    email: string;
}

interface MenuItem {
    label?: string;
    icon?: string;
    command?: () => void;
    separator?: boolean;
}

const menu = ref<InstanceType<typeof Menu> | null>(null);
const page = usePage<PageProps & { auth?: { user?: User } }>();
const user = computed(() => page.props.auth?.user);

const route = (name: string, params?: Record<string, any>): string => {
    return (window as any).route(name, params);
};

const items: MenuItem[] = [
    {
        label: 'Meu Perfil',
        icon: 'pi pi-user',
        command: () => router.visit(route('profile.edit')),
    },
    { separator: true },
    {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => router.post(route('logout')),
    },
];

const initials = computed(() => {
    if (!user.value?.name) return '?';
    const parts = user.value.name.trim().split(/\s+/);
    const [first, second] = parts;
    return `${first?.[0] ?? ''}${second?.[0] ?? ''}`.toUpperCase() || user.value.name[0].toUpperCase();
});

const firstName = computed(() => {
    if (!user.value?.name) return '';
    return user.value.name.trim().split(/\s+/)[0];
});

function toggleMenu(event: Event): void {
    menu.value?.toggle(event);
}
</script>
