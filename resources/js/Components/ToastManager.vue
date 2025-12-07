<template>
    <Toast />
</template>

<script setup>
import { watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const page = usePage();

watch(
    () => page.props?.toast,
    (toastData) => {
        if (toastData && Object.keys(toastData).length > 0) {
            const toastObj = {
                severity: toastData.severity,
                summary: toastData.summary,
                detail: toastData.detail,
                life: toastData.life || 3000,
            };
            toast.add(toastObj);
        }
    },
    { deep: true }
);
</script>
