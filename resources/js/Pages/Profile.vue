<template>
    <div
        class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

        <Head title="Perfil" />

        <header class="bg-white dark:bg-gray-800 shadow">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <Link :href="route('home')">
                        <Logo :width="40" :height="40" variant="default"
                            class="hover:opacity-80 transition-opacity cursor-pointer" />
                    </Link>
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Conta</p>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Perfil do Usuário</h1>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <UserMenu />
                </div>
            </div>
        </header>

        <main class="container mx-auto px-4 py-8">
            <div class="grid lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 space-y-6">
                    <section class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Informações pessoais</p>
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Dados de acesso</h2>
                            </div>
                            <span
                                class="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                Atualize seu perfil
                            </span>
                        </div>

                        <form class="mt-6 space-y-4" @submit.prevent="updateProfile">
                            <div>
                                <label class="block mb-2 font-medium text-gray-900 dark:text-white">Nome</label>
                                <InputText v-model="profileForm.name" fluid placeholder="Seu nome completo"
                                    :invalid="!!profileForm.errors.name" />
                                <small v-if="profileForm.errors.name" class="text-red-500 text-sm mt-1">
                                    {{ profileForm.errors.name }}
                                </small>
                            </div>

                            <div>
                                <label class="block mb-2 font-medium text-gray-900 dark:text-white">Email</label>
                                <InputText v-model="profileForm.email" type="email" fluid placeholder="voce@email.com"
                                    :invalid="!!profileForm.errors.email" />
                                <small v-if="profileForm.errors.email" class="text-red-500 text-sm mt-1">
                                    {{ profileForm.errors.email }}
                                </small>
                            </div>

                            <div class="flex justify-end">
                                <Button type="submit" label="Salvar alterações" icon="pi pi-save"
                                    :loading="savingProfile" />
                            </div>
                        </form>
                    </section>

                    <section class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Segurança</p>
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Alterar senha</h2>
                            </div>
                            <i class="pi pi-lock text-xl text-gray-500"></i>
                        </div>

                        <form class="mt-6 space-y-4" @submit.prevent="updatePassword">
                            <div>
                                <label class="block mb-2 font-medium text-gray-900 dark:text-white">Senha atual</label>
                                <Password v-model="passwordForm.current_password" fluid toggleMask :feedback="false"
                                    placeholder="••••••••" :invalid="!!passwordForm.errors.current_password" />
                                <small v-if="passwordForm.errors.current_password"
                                    class="text-red-500 text-sm mt-1 block">
                                    {{ passwordForm.errors.current_password }}
                                </small>
                            </div>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block mb-2 font-medium text-gray-900 dark:text-white">Nova
                                        senha</label>
                                    <Password v-model="passwordForm.password" fluid toggleMask :feedback="true"
                                        placeholder="Nova senha" :invalid="!!passwordForm.errors.password" />
                                    <small v-if="passwordForm.errors.password" class="text-red-500 text-sm mt-1 block">
                                        {{ passwordForm.errors.password }}
                                    </small>
                                </div>

                                <div>
                                    <label class="block mb-2 font-medium text-gray-900 dark:text-white">Confirmar nova
                                        senha</label>
                                    <Password v-model="passwordForm.password_confirmation" fluid toggleMask
                                        :feedback="false" placeholder="Repita a nova senha"
                                        :invalid="!!passwordForm.errors.password_confirmation" />
                                    <small v-if="passwordForm.errors.password_confirmation"
                                        class="text-red-500 text-sm mt-1 block">
                                        {{ passwordForm.errors.password_confirmation }}
                                    </small>
                                </div>
                            </div>

                            <div class="flex justify-end">
                                <Button type="submit" label="Atualizar senha" icon="pi pi-shield" severity="secondary"
                                    :loading="savingPassword" />
                            </div>
                        </form>
                    </section>

                    <section
                        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-red-200 dark:border-red-900/40">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-red-500">Perigo</p>
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Deletar conta</h2>
                                <p class="text-sm text-gray-600 dark:text-gray-300">Esta ação é irreversível.</p>
                            </div>
                            <i class="pi pi-exclamation-triangle text-red-500 text-xl"></i>
                        </div>

                        <div class="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                            <p class="text-sm text-gray-700 dark:text-gray-200">Todos os seus dados serão removidos
                                permanentemente.</p>
                            <Button label="Deletar conta" icon="pi pi-trash" severity="danger" outlined
                                :loading="deletingAccount" @click="openDeleteModal" />
                        </div>
                    </section>
                </div>

                <aside class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 space-y-4">
                    <div class="flex items-center gap-3">
                        <Avatar :label="initials" shape="circle"
                            class="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
                            size="large" />
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Usuário autenticado</p>
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ user?.name }}</p>
                            <p class="text-sm text-gray-600 dark:text-gray-300">{{ user?.email }}</p>
                        </div>
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <p>Mantenha seus dados sempre atualizados para garantir a segurança da sua conta.</p>
                        <p>Use uma senha forte com letras maiúsculas, minúsculas, números e símbolos.</p>
                    </div>

                    <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Tema</p>
                        <div class="flex items-center justify-between">
                            <ThemeSelector />
                        </div>
                    </div>
                </aside>
            </div>
        </main>

        <Dialog v-model:visible="showDeleteModal" modal header="Confirmar exclusão" :style="{ width: '28rem' }"
            dismissableMask>
            <div class="space-y-4">
                <div class="flex items-center gap-3 p-3 rounded bg-red-50 dark:bg-red-900/30">
                    <i class="pi pi-exclamation-triangle text-red-600 text-xl"></i>
                    <div>
                        <p class="text-sm font-semibold text-red-700 dark:text-red-200">Atenção</p>
                        <p class="text-sm text-gray-700 dark:text-gray-200">Esta ação é permanente e removerá sua conta
                            e dados.</p>
                    </div>
                </div>

                <div class="text-sm text-gray-700 dark:text-gray-200 space-y-2">
                    <p>- Você será desconectado imediatamente.</p>
                    <p>- Não será possível recuperar os dados depois.</p>
                </div>

                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-900 dark:text-white">Confirme sua senha</label>
                    <Password v-model="deleteForm.password" fluid toggleMask :feedback="false" placeholder="Senha atual"
                        :invalid="!!deleteForm.errors.password" />
                    <small v-if="deleteForm.errors.password" class="text-red-500 text-sm">{{ deleteForm.errors.password
                        }}</small>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button label="Cancelar" severity="secondary" text @click="closeDeleteModal" />
                    <Button label="Confirmar exclusão" icon="pi pi-trash" severity="danger" :loading="deletingAccount"
                        @click="deleteAccount" />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Head, Link, useForm, usePage, router } from '@inertiajs/vue3';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Dialog from 'primevue/dialog';
import ThemeSelector from '@/Components/ThemeSelector.vue';
import Logo from '@/Components/Logo.vue';
import UserMenu from '@/Components/UserMenu.vue';

const page = usePage();
const user = computed(() => page.props.auth?.user ?? {});

const profileForm = useForm({
    name: user.value.name ?? '',
    email: user.value.email ?? '',
});

const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const deleteForm = useForm({
    password: '',
});

const savingProfile = ref(false);
const savingPassword = ref(false);
const showDeleteModal = ref(false);
const deletingAccount = computed(() => deleteForm.processing);

const initials = computed(() => {
    if (!user.value?.name) return '?';
    const parts = user.value.name.trim().split(/\s+/);
    const [first, second] = parts;
    return `${first?.[0] ?? ''}${second?.[0] ?? ''}`.toUpperCase() || user.value.name[0].toUpperCase();
});

function updateProfile() {
    savingProfile.value = true;
    profileForm.put(route('profile.update'), {
        preserveScroll: true,
        onFinish: () => {
            savingProfile.value = false;
        },
    });
}

function updatePassword() {
    savingPassword.value = true;
    passwordForm.put(route('profile.password.update'), {
        preserveScroll: true,
        onSuccess: () => passwordForm.reset(),
        onFinish: () => {
            savingPassword.value = false;
        },
    });
}

function openDeleteModal() {
    deleteForm.reset();
    showDeleteModal.value = true;
}

function closeDeleteModal() {
    showDeleteModal.value = false;
    deleteForm.reset();
    deleteForm.clearErrors();
}

function deleteAccount() {
    deleteForm.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeDeleteModal(),
        onFinish: () => { },
    });
}
</script>
