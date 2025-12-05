<template>
    <div>
        <SelectButton v-model="currentTheme" :options="options" option-label="label" option-value="value"
            @value-change="setTheme" :allow-empty="false">
            <template #option="slotProps">
                <i :class="slotProps.option.icon"></i>
                <span>{{ slotProps.option.label }}</span>
            </template>
        </SelectButton>
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
