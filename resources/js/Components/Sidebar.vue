<template>
    <!-- Overlay semi-transparente (apenas em tablet/mobile quando expandido) -->
    <Transition name="fade">
        <div v-if="isExpanded && !isAttached" @click="toggleSidebar" class="fixed inset-0 bg-black/40 lg:hidden z-40"
            style="pointer-events: auto;" />
    </Transition>

    <!-- Container principal que envolve tudo -->
    <div :class="[
        'h-screen flex transition-all duration-300',
        // Quando anexado, usa flex normal ou reverse baseado na posição
        isAttached ? (sidebarPosition === 'right' ? 'flex-row-reverse' : '') : ''
    ]">
        <!-- Botão Hamburguer Mobile/Tablet (oculto quando menu está aberto) -->
        <Transition name="fade">
            <button v-if="!isExpanded && !isAttached" @click="toggleSidebar" :class="[
                'lg:hidden fixed top-4 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer',
                sidebarPosition === 'left' ? 'left-4' : 'right-4'
            ]" style="z-index: 60;">
                <i class="pi pi-bars text-gray-700 dark:text-gray-300 text-xl" />
            </button>
        </Transition>

        <!-- Sidebar flutuante Desktop / Slide-in Mobile -->
        <div :class="[
            'transition-all duration-300',
            // Quando ANEXADO: fica sticky ocupando espaço no flex
            isAttached
                ? 'lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:z-50'
                // Quando NÃO ANEXADO: flutuante fixo
                : sidebarPosition === 'left'
                    ? 'lg:fixed lg:left-2 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:z-50'
                    : 'lg:fixed lg:right-2 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:z-50',
            // Tablet: drawer overlay
            sidebarPosition === 'left'
                ? 'md:fixed md:inset-0 md:flex md:items-center md:justify-start md:z-50 md:pointer-events-none'
                : 'md:fixed md:inset-0 md:flex md:items-center md:justify-end md:z-50 md:pointer-events-none',
            // Mobile: respeita posição
            sidebarPosition === 'left'
                ? isExpanded ? 'fixed inset-0 flex items-center justify-start z-50 pointer-events-none' : 'hidden lg:block'
                : isExpanded ? 'fixed inset-0 flex items-center justify-end z-50 pointer-events-none' : 'hidden lg:block'
        ]">
            <aside :class="[
                'relative bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden flex flex-col',
                // Desktop: bordas arredondadas quando flutuante, sem bordas quando fixado
                isAttached ? 'lg:rounded-none' : 'lg:rounded-xl',
                // Altura: cheia quando anexado ou mobile, automática quando flutuante desktop
                isAttached ? 'h-screen' : 'h-screen md:h-auto md:max-h-[90vh]',
                // Posicionamento quando retraído (não anexado)
                !isExpanded && !isAttached ? (sidebarPosition === 'left' ? 'lg:fixed lg:left-1 lg:top-1/2 lg:transform lg:-translate-y-1/2' : 'lg:fixed lg:right-1 lg:top-1/2 lg:transform lg:-translate-y-1/2') : '',
                // Largura responsiva
                isExpanded ? 'w-64 md:w-72' : 'w-0 lg:w-16',
                // Pointer events: sempre ativo no aside
                'pointer-events-auto'
            ]" style="z-index: 10;">
                <!-- Header do Sidebar -->
                <slot name="header" :isExpanded="isExpanded" :toggleSidebar="toggleSidebar">
                    <div
                        class="flex items-center justify-between h-16 px-3 border-b border-gray-200 dark:border-gray-700 gap-2 min-w-0">
                        <!-- Título visível apenas quando expandido -->
                        <Transition name="fade">
                            <span v-if="isExpanded" class="text-lg font-bold text-gray-900 dark:text-white truncate">
                                Menu
                            </span>
                        </Transition>
                        <!-- Botões sempre à direita -->
                        <div class="flex items-center gap-1 ml-auto shrink-0">
                            <!-- Botão para alternar entre flutuante e fixado (apenas desktop) -->
                            <Transition name="fade">
                                <button v-if="isExpanded" @click="toggleAttached"
                                    class="hidden lg:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer items-center justify-center shrink-0"
                                    :title="isAttached ? 'Desafixar da lateral' : 'Afixar na lateral'">
                                    <i :class="[
                                        'text-gray-600 dark:text-gray-400 text-sm',
                                        isAttached ? 'pi pi-unlock' : 'pi pi-lock'
                                    ]" />
                                </button>
                            </Transition>
                            <!-- Botão para alternar posição esquerda/direita -->
                            <Transition name="fade">
                                <button v-if="isExpanded" @click="togglePosition"
                                    class="hidden lg:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer items-center justify-center shrink-0"
                                    :title="sidebarPosition === 'left' ? 'Mover para direita' : 'Mover para esquerda'">
                                    <i :class="[
                                        'text-gray-600 dark:text-gray-400 text-sm',
                                        sidebarPosition === 'left' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'
                                    ]" />
                                </button>
                            </Transition>
                            <!-- Botão fechar/expandir -->
                            <button @click="toggleSidebar" :class="[
                                'p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer shrink-0'
                            ]">
                                <!-- Mobile: sempre X quando expandido -->
                                <i class="lg:hidden! text-gray-600 dark:text-gray-400 text-sm"
                                    :class="isExpanded ? 'pi pi-times' : 'pi pi-bars'" />
                                <!-- Desktop: chevrons baseados na posição -->
                                <i class="hidden! lg:block! text-gray-600 dark:text-gray-400 text-sm" :class="sidebarPosition === 'left'
                                    ? isExpanded ? 'pi pi-chevron-left' : 'pi pi-chevron-right'
                                    : isExpanded ? 'pi pi-chevron-right' : 'pi pi-chevron-left'" />
                            </button>
                        </div>
                    </div>
                </slot>

                <!-- Menu Items -->
                <nav :class="[
                    'overflow-y-auto overflow-x-hidden py-2 px-0',
                    // Em mobile, o menu cresce para preencher todo espaço disponível
                    // No desktop flutuante, limita a altura máxima para deixar rodapé visível
                    'flex-1 min-h-0',
                    isAttached ? 'lg:h-auto' : 'lg:max-h-[calc(90vh-13rem)]'
                ]">
                    <template v-for="(item, index) in props.items" :key="index">
                        <!-- Item com submenu -->
                        <div v-if="item.submenu && item.submenu.length > 0" class="mx-2 mb-1">
                            <!-- Versão expandida com submenu interno -->
                            <button v-if="isExpanded" @click="toggleSubmenuByIndex(index)" :class="[
                                'w-full flex items-center px-4 py-3 rounded-lg transition-colors cursor-pointer gap-4',
                                isSubmenuActive(item)
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            ]">
                                <i :class="['text-lg shrink-0', item.icon]" />
                                <div class="flex items-center justify-between flex-1 min-w-0">
                                    <span class="font-medium whitespace-nowrap truncate">{{ item.label }}</span>
                                    <i :class="[
                                        'pi text-xs transition-transform shrink-0',
                                        isSubmenuExpanded(index) ? 'pi-chevron-down' : 'pi-chevron-right'
                                    ]" />
                                </div>
                            </button>

                            <!-- Versão retraída: expandir sidebar e mostrar submenu interno -->
                            <div v-else>
                                <button :key="`${item.label}-${sidebarPosition}`" @click="openCollapsedSubmenu(index)"
                                    v-tooltip="getTooltipConfig(item.label)" :class="[
                                        'w-full flex items-center px-4 py-3 rounded-lg transition-colors cursor-pointer justify-center',
                                        isSubmenuActive(item)
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    ]">
                                    <i :class="['text-lg shrink-0', item.icon]" />
                                </button>
                            </div>

                            <!-- Submenu expandido (apenas no modo expandido) -->
                            <Transition name="slide" v-if="isExpanded">
                                <div v-if="isSubmenuExpanded(index)" class="mt-1 ml-4 space-y-1">
                                    <component v-for="(child, childIndex) in item.submenu" :key="childIndex"
                                        :is="isStringAction(child.action) ? Link : 'button'"
                                        :href="isStringAction(child.action) ? child.action : undefined"
                                        @click="isStringAction(child.action) ? undefined : executeAction(child.action)"
                                        :class="[
                                            'w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm text-left',
                                            isActionActive(child.action)
                                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        ]">
                                        <i v-if="child.icon" :class="['text-sm shrink-0', child.icon]" />
                                        <span class="truncate">{{ child.label }}</span>
                                    </component>
                                </div>
                            </Transition>
                        </div>

                        <!-- Item simples sem submenu -->
                        <div v-else class="mx-2 mb-1">
                            <component :key="`${item.label}-${sidebarPosition}`"
                                :is="isStringAction(item.action) ? Link : 'button'"
                                :href="isStringAction(item.action) ? item.action : undefined"
                                @click="isStringAction(item.action) ? undefined : executeAction(item.action)"
                                v-tooltip="!isExpanded ? getTooltipConfig(item.label) : undefined" :class="[
                                    'w-full flex items-center px-4 py-3 rounded-lg transition-colors cursor-pointer',
                                    isExpanded ? 'gap-4' : 'justify-center',
                                    isActionActive(item.action)
                                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                ]">
                                <i :class="['text-lg shrink-0', item.icon]" />
                                <Transition name="fade">
                                    <span v-if="isExpanded" class="font-medium whitespace-nowrap truncate">
                                        {{ item.label }}
                                    </span>
                                </Transition>
                            </component>
                        </div>
                    </template>
                </nav>

                <!-- Footer do Sidebar com Slot -->
                <slot name="footer" :isExpanded="isExpanded" :user="user" :userInitials="userInitials"
                    :userFirstName="userFirstName" :logout="logout" :currentTheme="currentTheme" :setTheme="setTheme"
                    :cycleTheme="cycleTheme" :getCurrentThemeIcon="getCurrentThemeIcon"
                    :getCurrentThemeLabel="getCurrentThemeLabel" :themeOptions="themeOptions">
                    <div class="border-t border-gray-200 dark:border-gray-700 p-2 space-y-1 overflow-y-auto">
                        <!-- User Section -->
                        <div v-if="user" class="w-full overflow-hidden">
                            <button @click="toggleUserSubmenu"
                                v-tooltip="!isExpanded ? getTooltipConfig(userFirstName) : undefined" :class="[
                                    'w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-colors cursor-pointer',
                                    'hover:bg-gray-100 dark:hover:bg-gray-700'
                                ]">
                                <Avatar :label="userInitials" shape="circle"
                                    class="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100 shrink-0" />
                                <div class="flex-1 min-w-0 text-left overflow-hidden" v-if="isExpanded">
                                    <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{
                                        userFirstName
                                        }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ user.email }}</p>
                                </div>
                                <i v-if="isExpanded" :class="[
                                    'pi text-xs transition-transform shrink-0',
                                    isUserSubmenuExpanded ? 'pi-chevron-down' : 'pi-chevron-right'
                                ]" />
                            </button>

                            <Transition name="slide">
                                <div v-if="isUserSubmenuExpanded && isExpanded" class="mt-2 space-y-1 overflow-hidden">
                                    <Link :href="route('profile.edit')" :class="[
                                        'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm',
                                        isActionActive(route('profile.edit'))
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    ]">
                                        <i class="pi pi-user text-sm shrink-0" />
                                        <span class="truncate">Meu Perfil</span>
                                    </Link>

                                    <button @click="logout" :class="[
                                        'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer',
                                        'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950'
                                    ]">
                                        <i class="pi pi-sign-out text-sm shrink-0" />
                                        <span class="truncate">Sair</span>
                                    </button>
                                </div>
                            </Transition>
                        </div>

                        <!-- Tema Section -->
                        <div class="pt-2">
                            <div v-if="isExpanded" class="w-full">
                                <label
                                    class="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-2">Tema</label>
                                <div class="p-selectbutton p-component p-buttonset flex gap-1 w-full">
                                    <button v-for="option in themeOptions" :key="option.value"
                                        @click="setTheme(option.value)" :class="[
                                            'flex-1 flex items-center justify-center p-2 rounded-md transition-colors text-sm font-medium border cursor-pointer',
                                            currentTheme === option.value
                                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                                                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                        ]" :title="option.label">
                                        <i :class="option.icon"></i>
                                    </button>
                                </div>
                            </div>
                            <div v-else>
                                <button @click="cycleTheme"
                                    v-tooltip="!isExpanded ? getTooltipConfig(`Tema: ${getCurrentThemeLabel()}`) : undefined"
                                    class="w-full flex items-center justify-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                    <i :class="['text-lg shrink-0', getCurrentThemeIcon()]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </slot>
            </aside>
        </div>

        <!-- Conteúdo Principal -->
        <div class="flex-1 overflow-y-auto overflow-x-hidden">
            <slot name="content" />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import { useTheme } from '@/Composables/useTheme';
import Avatar from 'primevue/avatar';

const page = usePage();
const isExpanded = ref(false); // Inicia fechado em mobile
const isAttached = ref(false); // Estado para sidebar fixado na lateral
const sidebarPosition = ref('left'); // Posição da sidebar: 'left' ou 'right'
const expandedMenus = ref([]);
const { currentTheme, setTheme, THEMES } = useTheme();

const user = computed(() => page.props.auth?.user);

const userInitials = computed(() => {
    if (!user.value?.name) return '?';
    const parts = user.value.name.trim().split(/\s+/);
    const [first, second] = parts;
    return `${first?.[0] ?? ''}${second?.[0] ?? ''}`.toUpperCase() || user.value.name[0].toUpperCase();
});

const userFirstName = computed(() => {
    if (!user.value?.name) return '';
    return user.value.name.trim().split(/\s+/)[0];
});

// Props do componente
const props = defineProps({
    items: {
        type: Array,
        required: true,
        validator: (value) => Array.isArray(value) && value.length > 0
    },
    initialState: {
        type: Object,
        default: () => ({}),
        validator: (value) => {
            return (
                (value.expanded === undefined || typeof value.expanded === 'boolean') &&
                (value.attached === undefined || typeof value.attached === 'boolean') &&
                (value.position === undefined || ['left', 'right'].includes(value.position))
            );
        }
    }
});

// Map de índices para rastrear submenus abertos
const expandedMenusMap = ref(new Map());
const USER_MENU_KEY = 'user-menu';

const getMenuKey = (index) => `menu-${index}`;
const toggleSubmenuByIndex = (index) => {
    const key = getMenuKey(index);
    const current = expandedMenusMap.value.get(key) || false;
    expandedMenusMap.value.set(key, !current);
};
const openCollapsedSubmenu = (index) => {
    // Abre o submenu e expande a sidebar se necessário
    expandedMenusMap.value.set(getMenuKey(index), true);

    // Expande a sidebar para mostrar submenu interno
    isExpanded.value = true;

    // Persiste estado no desktop
    if (window.innerWidth >= 1024) {
        saveState({ expanded: true });
    }
};
const isSubmenuExpanded = (index) => {
    return expandedMenusMap.value.get(getMenuKey(index)) || false;
};

// Abre automaticamente submenus que contêm itens ativos
const openActiveSubmenus = () => {
    props.items.forEach((item, index) => {
        if (isSubmenuActive(item)) {
            expandedMenusMap.value.set(getMenuKey(index), true);
        }
    });
};

// Computed para determinar a posição do tooltip
const tooltipPosition = computed(() => sidebarPosition.value === 'left' ? 'right' : 'left');

// Computed para as cores de borda do tooltip
const tooltipArrowColor = computed(() => tooltipPosition.value === 'right' ? 'borderRightColor' : 'borderLeftColor');

// Helper para criar tooltip com posição correta baseada em sidebarPosition - reactive
const getTooltipConfig = (label) => {
    // Força reatividade lendo os computeds
    const pos = tooltipPosition.value;
    const arrowProp = tooltipArrowColor.value;

    return {
        value: label,
        position: pos,
        pt: {
            arrow: {
                style: {
                    [arrowProp]: '#111827'
                }
            },
            text: '!bg-gray-900 dark:!bg-gray-700 !text-white !font-medium !text-sm !px-3 !py-2'
        }
    };
};

const isUserSubmenuExpanded = computed(() => expandedMenusMap.value.get(USER_MENU_KEY) || false);

const toggleUserSubmenu = () => {
    const next = !expandedMenusMap.value.get(USER_MENU_KEY);

    if (next) {
        expandedMenusMap.value.set(USER_MENU_KEY, true);
        // Se estiver recolhido, expande para mostrar submenu inline
        if (!isExpanded.value) {
            isExpanded.value = true;
            if (window.innerWidth >= 1024) {
                saveState({ expanded: true });
            }
        }
    } else {
        expandedMenusMap.value.delete(USER_MENU_KEY);
    }
};

const isStringAction = (action) => typeof action === 'string';

const executeAction = (action) => {
    if (typeof action === 'function') {
        action();
    } else if (isStringAction(action)) {
        // Se for uma string, assume que é uma rota e navega
        router.visit(action);
    }
};

const isActionActive = (action) => {
    if (typeof action === 'string') {
        // Extrai apenas o caminho da URL (remove domínio e query strings)
        const getPath = (url) => {
            try {
                // Tenta fazer parse como URL
                const urlObj = new URL(url);
                const path = urlObj.pathname;
                // Remove trailing slash
                return (path.replace(/\/$/, '') || '/').toLowerCase();
            } catch (e) {
                // Se não for URL completa, trata como caminho direto
                const path = url.split('?')[0];
                return (path.replace(/\/$/, '') || '/').toLowerCase();
            }
        };

        // Usa router.current() para pegar a rota atual de forma mais confiável
        try {
            const currentRoute = router.current();
            const currentPath = getPath(currentRoute.url);
            const actionPath = getPath(action);

            // Verifica correspondência exata apenas
            return currentPath === actionPath;
        } catch (e) {
            // Fallback para page.url caso router.current() falhe
            const currentPath = getPath(page.url);
            const actionPath = getPath(action);
            return currentPath === actionPath;
        }
    }
    return false;
};

const isSubmenuActive = (item) => {
    // Verifica se algum item do submenu está ativo
    if (item.submenu && item.submenu.length > 0) {
        return item.submenu.some(child => isActionActive(child.action));
    }
    return false;
};

const logout = () => {
    router.post(route('logout'));
};

// Chave única para armazenar todos os estados do sidebar
const STORAGE_KEY = 'sidebar';

// Estado padrão
const DEFAULT_STATE = {
    expanded: true,
    attached: false,
    position: 'left'
};

// Mescla initialState com DEFAULT_STATE
const getInitialState = () => ({
    ...DEFAULT_STATE,
    ...props.initialState
});

// Carrega estado do localStorage ou retorna padrão
const loadState = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : { ...getInitialState() };
    } catch (e) {
        console.error('Erro ao carregar estado da sidebar:', e);
        return { ...getInitialState() };
    }
};

// Salva estado unificado no localStorage
const saveState = (state = {}) => {
    try {
        const currentState = loadState();
        const newState = { ...currentState, ...state };
        const initialState = getInitialState();

        // Se o novo estado é igual ao inicial, apaga do localStorage
        if (JSON.stringify(newState) === JSON.stringify(initialState)) {
            localStorage.removeItem(STORAGE_KEY);
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        }
    } catch (e) {
        console.error('Erro ao salvar estado da sidebar:', e);
    }
};

const toggleAttached = () => {
    isAttached.value = !isAttached.value;
    saveState({ attached: isAttached.value });
};

const togglePosition = () => {
    sidebarPosition.value = sidebarPosition.value === 'left' ? 'right' : 'left';
    saveState({ position: sidebarPosition.value });
};

// Carrega estado do localStorage ao montar
onMounted(() => {
    // Carrega todos os estados de uma só vez
    const savedState = loadState();
    window.addEventListener('resize', checkScreenSize);

    // No desktop, usa estado salvo; no mobile, sempre começa fechado
    if (window.innerWidth >= 1024) {
        isExpanded.value = savedState.expanded;
        isAttached.value = savedState.attached;
        sidebarPosition.value = savedState.position;
    } else {
        isExpanded.value = false;
        isAttached.value = savedState.attached;
        sidebarPosition.value = savedState.position;
    }

    // Abre submenus que contêm itens ativos
    openActiveSubmenus();
});

// Fecha menu ao navegar em mobile e fecha submenus
watch(() => page.url, () => {
    // Fecha apenas submenus que NÃO contêm itens ativos
    props.items.forEach((item, index) => {
        if (!isSubmenuActive(item)) {
            expandedMenusMap.value.delete(getMenuKey(index));
        }
    });

    // Garante que submenus com itens ativos estão abertos
    openActiveSubmenus();

    // Fecha menu mobile se em mobile
    if (window.innerWidth < 1024) {
        isExpanded.value = false;
    }
});

// Carrega estado do localStorage ou detecta tamanho da tela
const loadSidebarState = () => {
    const isDesktop = window.innerWidth >= 1024;
    const savedState = loadState();

    if (isDesktop) {
        // No desktop, carrega do localStorage
        isExpanded.value = savedState.expanded;
    } else {
        // No mobile, sempre começa fechado
        isExpanded.value = false;
    }
};

// Detecta mudança de tamanho de tela
const checkScreenSize = () => {
    loadSidebarState();
};


onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
});
const themeOptions = [
    { label: 'Claro', value: THEMES.LIGHT, icon: 'pi pi-sun' },
    { label: 'Escuro', value: THEMES.DARK, icon: 'pi pi-moon' },
    { label: 'Sistema', value: THEMES.SYSTEM, icon: 'pi pi-desktop' },
];

const toggleSidebar = () => {
    isExpanded.value = !isExpanded.value;

    // Preserva os submenus que contêm itens ativos
    // Remove apenas submenus inativos
    props.items.forEach((item, index) => {
        if (!isSubmenuActive(item)) {
            expandedMenusMap.value.delete(getMenuKey(index));
        }
    });

    // Salva estado apenas no desktop
    if (window.innerWidth >= 1024) {
        saveState({ expanded: isExpanded.value });
    }
};

const cycleTheme = () => {
    const themeValues = [THEMES.LIGHT, THEMES.DARK, THEMES.SYSTEM];
    const currentIndex = themeValues.indexOf(currentTheme.value);
    const nextIndex = (currentIndex + 1) % themeValues.length;
    setTheme(themeValues[nextIndex]);
};

const getCurrentThemeIcon = () => {
    const option = themeOptions.find(opt => opt.value === currentTheme.value);
    return option ? option.icon : 'pi pi-sun';
};

const getCurrentThemeLabel = () => {
    const option = themeOptions.find(opt => opt.value === currentTheme.value);
    return option ? option.label : 'Sistema';
};

const isActive = (href) => {
    return page.url === href || page.url.startsWith(href + '/');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease-in-out;
}

.slide-enter-from {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
}

.slide-leave-to {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
}

.submenu-enter-active,
.submenu-leave-active {
    transition: all 0.2s ease-in-out;
}

.submenu-enter-from {
    opacity: 0;
    transform: translateX(-10px);
}

.submenu-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>
