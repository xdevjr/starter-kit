import "./bootstrap";
import "../css/app.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

// Função para carregar as traduções
const loadLocale = async (locale) => {
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

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
        return pages[`./Pages/${name}.vue`];
    },
    title: (title) =>
        title
            ? `${title} | ${import.meta.env.VITE_APP_NAME}`
            : import.meta.env.VITE_APP_NAME,
    setup: async ({ el, App, props, plugin }) => {
        const locale = import.meta.env.VITE_APP_LOCALE || "en";
        const translations = await loadLocale(locale);

        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(PrimeVue, {
                theme: {
                    preset: Aura,
                    options: {
                        darkModeSelector: ".dark",
                    },
                },
                locale: translations,
            })
            .mount(el);
    },
});
