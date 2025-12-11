import axios from "axios";
import { useToast } from "primevue";

// Type declaration for window object extensions
declare global {
    interface Window {
        axios: typeof axios;
        toast: ReturnType<typeof useToast>;
        loadLocale: (locale: string) => Promise<Record<string, any>>;
    }
}

window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Função para carregar as traduções
window.loadLocale = async (locale: string): Promise<Record<string, any>> => {
    if (locale === "en") {
        return {};
    }

    try {
        const localeModule = await import(`./locale/${locale}.json`);
        return localeModule.default;
    } catch (error) {
        console.warn(`Locale ${locale} not found`);
        return {};
    }
};
