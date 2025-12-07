import "./bootstrap";
import "primeicons/primeicons.css";
import "../css/app.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { ZiggyVue } from "ziggy-js";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primeuix/themes/aura";
import ToastManager from "./Components/ToastManager.vue";

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
        const page = pages[`./Pages/${name}.vue`];

        if (!page.default.layout) {
            const AppLayout = await import("./Layouts/AppLayout.vue");
            page.default.layout = AppLayout.default;
        }

        return page;
    },
    title: (title) =>
        title
            ? `${title} | ${import.meta.env.VITE_APP_NAME}`
            : import.meta.env.VITE_APP_NAME,
    setup: async ({ el, App, props, plugin }) => {
        const locale = import.meta.env.VITE_APP_LOCALE || "en";
        const translations = await loadLocale(locale);

        const app = createApp({
            render: () => h("div", [h(ToastManager), h(App, props)]),
        })
            .use(plugin)
            .use(ZiggyVue)
            .use(PrimeVue, {
                theme: {
                    preset: Aura,
                    options: {
                        darkModeSelector: ".dark",
                    },
                },
                locale: translations,
            })
            .use(ToastService);

        app.mount(el);
    },
});
