<template>
    <div
        class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

        <Head title="Recuperar Senha" />

        <!-- Theme Selector -->
        <div class="absolute top-4 right-4">
            <ThemeSelector />
        </div>

        <div class="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div class="text-center mb-6">
                <i class="pi pi-lock text-5xl text-blue-600 dark:text-blue-400 mb-4"></i>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Recuperar Senha</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-2">Digite seu email para receber o link de recuperação</p>
            </div>

            <form @submit.prevent="submit">
                <div class="mb-4">
                    <label class="block mb-2 font-medium text-gray-900 dark:text-white">Email</label>
                    <InputText v-model="form.email" type="email" fluid placeholder="seu@email.com"
                        :invalid="!!form.errors.email" />
                    <small v-if="form.errors.email" class="text-red-500 text-sm mt-1">{{ form.errors.email }}</small>
                </div>
                <Button label="Enviar link de recuperação" icon="pi pi-send" class="w-full mb-4" :loading="loading" />

                <div class="text-center text-gray-600 dark:text-gray-400">
                    <a href="/login" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Voltar ao
                        login</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, Head } from '@inertiajs/vue3';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ThemeSelector from '@/Components/ThemeSelector.vue';

const form = useForm({
    email: '',
});
const loading = ref(false);

function submit() {
    loading.value = true;
    form.post('/forgot-password', {
        onFinish: () => loading.value = false,
    });
}
</script>
