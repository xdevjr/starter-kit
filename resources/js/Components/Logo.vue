<template>
    <img :src="'/logo.svg'" :width="width" :height="height" :alt="alt" :class="imgClass" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    width?: number | string;
    height?: number | string;
    variant?: 'default' | 'light' | 'dark';
    alt?: string;
}

const props = withDefaults(defineProps<Props>(), {
    width: 200,
    height: 200,
    variant: 'default',
    alt: 'Logo',
});

const imgClass = computed<string>(() => {
    return 'logo-img';
});
</script>
