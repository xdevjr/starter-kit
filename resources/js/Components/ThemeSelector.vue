<template>
    <div
        class="inline-flex gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <button v-for="option in options" :key="option.value" @click="setTheme(option.value)" :class="[
            'flex items-center transition-colors text-sm font-medium cursor-pointer rounded-md',
            showLabels ? 'gap-2 px-3 py-2' : 'p-2 justify-center',
            currentTheme === option.value
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        ]" v-tooltip.bottom="option.label">
            <i :class="option.icon"></i>
        </button>
    </div>
</template>

<script setup>
import { useTheme } from '@/Composables/useTheme';

const { currentTheme, setTheme, THEMES } = useTheme();

const options = [
    { label: 'Claro', value: THEMES.LIGHT, icon: 'pi pi-sun' },
    { label: 'Escuro', value: THEMES.DARK, icon: 'pi pi-moon' },
    { label: 'Sistema', value: THEMES.SYSTEM, icon: 'pi pi-desktop' },
];
</script>
