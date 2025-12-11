import { ref, watch, onMounted } from "vue";
import type { Ref } from "vue";
import type { ThemeType, UseThemeReturn } from "@/types/theme";

const THEME_KEY = "app-theme";

const THEMES = {
    LIGHT: "light",
    DARK: "dark",
    SYSTEM: "system",
} as const;

const currentTheme: Ref<ThemeType> = ref(THEMES.SYSTEM);
const effectiveTheme: Ref<"light" | "dark"> = ref(THEMES.LIGHT);
let mediaQueryList: MediaQueryList | null = null;

/**
 * Obtém o tema preferido do sistema operacional
 */
function getSystemTheme(): "light" | "dark" {
    if (typeof window === "undefined") return THEMES.LIGHT;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? THEMES.DARK
        : THEMES.LIGHT;
}

/**
 * Atualiza a classe no elemento html
 */
function applyThemeClass(theme: "light" | "dark"): void {
    const htmlElement = document.documentElement;

    if (theme === THEMES.DARK) {
        htmlElement.classList.add("dark");
        effectiveTheme.value = THEMES.DARK;
    } else {
        htmlElement.classList.remove("dark");
        effectiveTheme.value = THEMES.LIGHT;
    }
}

/**
 * Define o tema
 */
function setTheme(theme: ThemeType): void {
    if (!Object.values(THEMES).includes(theme)) {
        console.warn(`Tema inválido: ${theme}. Use: light, dark ou system`);
        return;
    }

    currentTheme.value = theme;
    localStorage.setItem(THEME_KEY, theme);

    if (theme === THEMES.SYSTEM) {
        applyThemeClass(getSystemTheme());
    } else {
        applyThemeClass(theme);
    }
}

/**
 * Carrega o tema salvo ou padrão
 */
function loadTheme(): void {
    const saved = (localStorage.getItem(THEME_KEY) ||
        THEMES.SYSTEM) as ThemeType;
    currentTheme.value = saved;

    if (saved === THEMES.SYSTEM) {
        applyThemeClass(getSystemTheme());
    } else {
        applyThemeClass(saved);
    }
}

/**
 * Monitora mudanças de preferência do sistema
 */
function watchSystemTheme(): void {
    if (typeof window === "undefined") return;

    mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
        if (currentTheme.value === THEMES.SYSTEM) {
            applyThemeClass(e.matches ? THEMES.DARK : THEMES.LIGHT);
        }
    };

    // Compatibilidade com navegadores antigos
    if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener("change", handleChange);
    } else if ((mediaQueryList as any).addListener) {
        (mediaQueryList as any).addListener(handleChange);
    }
}

/**
 * Remove os listeners
 */
function removeSystemThemeListener(): void {
    if (!mediaQueryList) return;

    const handleChange = (e: MediaQueryListEvent) => {
        if (currentTheme.value === THEMES.SYSTEM) {
            applyThemeClass(e.matches ? THEMES.DARK : THEMES.LIGHT);
        }
    };

    if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", handleChange);
    } else if ((mediaQueryList as any).removeListener) {
        (mediaQueryList as any).removeListener(handleChange);
    }
}

/**
 * Composable para gerenciamento de tema
 */
export function useTheme(): UseThemeReturn {
    onMounted(() => {
        loadTheme();
        watchSystemTheme();
    });

    return {
        currentTheme,
        effectiveTheme,
        setTheme,
        loadTheme,
        THEMES,
    };
}

// Inicialização automática quando o módulo é importado
if (typeof window !== "undefined") {
    loadTheme();
    watchSystemTheme();
}
