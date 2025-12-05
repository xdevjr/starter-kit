<template>
    <div>
        <SelectButton v-model="currentTheme" :options="options" option-label="label" option-value="value" @value-change="setTheme" />
    </div>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme';
const { currentTheme, setTheme, THEMES } = useTheme();

const options = [
    { label: 'Claro', value: THEMES.LIGHT },
    { label: 'Escuro', value: THEMES.DARK },
    { label: 'Sistema', value: THEMES.SYSTEM },
];
</script>
