<template>
    <img :src="'/logo.svg'" :width="width" :height="height" :alt="alt" :class="imgClass" />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    width: {
        type: [Number, String],
        default: 200
    },
    height: {
        type: [Number, String],
        default: 200
    },
    variant: {
        type: String,
        default: 'default', // 'default', 'light', 'dark'
    },
    alt: {
        type: String,
        default: 'Logo'
    }
});

const imgClass = computed(() => {
    return 'logo-img';
});
</script>
