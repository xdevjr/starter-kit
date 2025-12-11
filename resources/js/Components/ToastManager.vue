<template>
    <Toast />
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import type { PageProps } from '@inertiajs/core';

interface ToastData {
    severity: 'success' | 'info' | 'warn' | 'error';
    summary: string;
    detail: string;
    life?: number;
}

const toast = useToast();
const page = usePage<PageProps & { toast?: ToastData }>();

window.toast = toast;

const showToast = (toastData: ToastData | null | undefined): void => {
    if (toastData && Object.keys(toastData).length > 0) {
        const toastObj = {
            severity: toastData.severity,
            summary: toastData.summary,
            detail: toastData.detail,
            life: toastData.life || 3000,
        };
        toast.add(toastObj);

        // Limpa o toast das props após exibir
        delete page.props.toast;
    }
};

// Watch para toasts vindos de redirects/Inertia
watch(
    () => page.props?.toast,
    (toastData) => {
        showToast(toastData);
    },
    { deep: true }
);

// Listener para toasts de respostas JSON/AJAX
onMounted(() => {
    window.addEventListener('toast', ((event: CustomEvent<ToastData>) => {
        showToast(event.detail);
    }) as EventListener);

    // Intercepta respostas Axios para detectar toasts em JSON
    if (window.axios) {
        window.axios.interceptors.response.use(
            (response) => {
                if (response.data?.toast) {
                    showToast(response.data.toast);
                    // Remove o toast da resposta
                    delete response.data.toast;
                }
                return response;
            },
            (error) => {
                if (error.response?.data?.toast) {
                    showToast(error.response.data.toast);
                    // Remove o toast da resposta de erro
                    delete error.response.data.toast;
                }
                return Promise.reject(error);
            }
        );
    }
});
</script>
