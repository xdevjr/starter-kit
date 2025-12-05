<template>
    <div
        class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

        <Head title="Redefinir Senha" />

        <!-- Theme Selector -->
        <div class="absolute top-4 right-4">
            <ThemeSelector />
        </div>

        <div class="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div class="text-center mb-6">
                <div class="flex justify-center mb-4">
                    <Link :href="route('home')">
                    <Logo :width="80" :height="80" variant="default"
                        class="hover:opacity-80 transition-opacity cursor-pointer" />
                    </Link>
                </div>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Redefinir Senha</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-2">Digite sua nova senha</p>
            </div>

            <form @submit.prevent="submit">
                <div class="mb-4">
                    <label class="block mb-2 font-medium text-gray-900 dark:text-white">Nova Senha</label>
                    <Password v-model="form.password" fluid toggleMask placeholder="••••••••"
                        :invalid="!!form.errors.password" />
                    <small v-if="form.errors.password" class="text-red-500 text-sm mt-1 block">{{ form.errors.password
                    }}</small>
                </div>
                <div class="mb-4">
                    <label class="block mb-2 font-medium text-gray-900 dark:text-white">Confirme a Senha</label>
                    <Password v-model="form.password_confirmation" fluid toggleMask :feedback="false"
                        placeholder="••••••••" :invalid="!!form.errors.password_confirmation" />
                    <small v-if="form.errors.password_confirmation" class="text-red-500 text-sm mt-1 block">{{
                        form.errors.password_confirmation }}</small>
                </div>
                <input type="hidden" v-model="form.token" />
                <input type="hidden" v-model="form.email" />
                <Button label="Redefinir Senha" icon="pi pi-check" class="w-full" :loading="loading" />
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, Head, Link } from '@inertiajs/vue3';
import Password from 'primevue/password';
import Button from 'primevue/button';
import ThemeSelector from '@/Components/ThemeSelector.vue';
import Logo from '@/Components/Logo.vue';

const form = useForm({
    token: '',
    email: '',
    password: '',
    password_confirmation: '',
});
const loading = ref(false);

function submit() {
    loading.value = true;
    form.post(route('reset-password.store'), {
        onFinish: () => loading.value = false,
    });
}
</script>
