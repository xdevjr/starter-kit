<template>
    <div
        class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

        <Head title="Login" />

        <!-- Theme Selector -->
        <div class="absolute top-4 right-4">
            <ThemeSelector />
        </div>

        <div class="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div class="text-center mb-6">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Login</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-2">Entre na sua conta</p>
            </div>

            <form @submit.prevent="submit">
                <div class="mb-4">
                    <label class="block mb-2 font-medium text-gray-900 dark:text-white">Email</label>
                    <InputText v-model="form.email" type="email" fluid placeholder="seu@email.com"
                        :invalid="!!form.errors.email" />
                    <small v-if="form.errors.email" class="text-red-500 text-sm mt-1">{{ form.errors.email }}</small>
                </div>
                <div class="mb-4">
                    <label class="block mb-2 font-medium text-gray-900 dark:text-white">Senha</label>
                    <Password v-model="form.password" fluid toggleMask :feedback="false" placeholder="••••••••"
                        :invalid="!!form.errors.password" />
                    <small v-if="form.errors.password" class="text-red-500 text-sm mt-1 block">{{ form.errors.password
                        }}</small>
                </div>
                <Button type="submit" label="Entrar" icon="pi pi-sign-in" class="w-full mb-4" :loading="loading" />

                <div class="text-center space-y-2">
                    <a href="/forgot-password" class="block text-blue-600 dark:text-blue-400 hover:underline">Esqueceu a
                        senha?</a>
                    <div class="text-gray-600 dark:text-gray-400">
                        Não tem conta? <a href="/register"
                            class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Registre-se</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, Head } from '@inertiajs/vue3';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import ThemeSelector from '@/Components/ThemeSelector.vue';

const form = useForm({
    email: '',
    password: '',
});
const loading = ref(false);

function submit() {
    loading.value = true;
    form.post('/login', {
        onFinish: () => loading.value = false,
    });
}
</script>
