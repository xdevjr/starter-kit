<template>
    <div>
        <Toast position="top-right" />
        <slot />
    </div>
</template>

<script setup>
import { watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

const toast = useToast();
const page = usePage();

watch(() => page.props.toast, (toastData) => {
    if (toastData) {
        toast.add(toastData);
    }
}, { immediate: true });
</script>
