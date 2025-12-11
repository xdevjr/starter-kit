import "./bootstrap";
import "primeicons/primeicons.css";
import "../css/app.css";

import { createApp, h, type VNode, type Component } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { ZiggyVue } from "ziggy-js";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primeuix/themes/aura";
import ToastManager from "./Components/ToastManager.vue";

interface Page {
    default: Component & {
        layout?: Component;
    };
}

interface PageResolutionData {
    el: Element;
    App: Component;
    props: Record<string, any>;
    plugin: any;
}

async function loadLocale(locale: string): Promise<Record<string, string>> {
    try {
        const messages = import.meta.glob("../lang/**/*.json", {
            eager: true,
        }) as Record<string, { default: Record<string, string> }>;
        const key = Object.keys(messages).find((k) => k.includes(`/${locale}`));
        return key ? messages[key].default : {};
    } catch (error) {
        console.warn(`Locale ${locale} not found, using default`);
        return {};
    }
}

createInertiaApp({
    resolve: async (name: string): Promise<any> => {
        const pages = import.meta.glob<Page>("./Pages/**/*.vue", {
            eager: true,
        });
        const page = pages[`./Pages/${name}.vue`];

        if (!page.default.layout) {
            const AppLayout = await import("./Layouts/AppLayout.vue");
            page.default.layout = AppLayout.default;
        }

        return page;
    },
    title: (title: string): string =>
        title
            ? `${title} | ${import.meta.env.VITE_APP_NAME}`
            : import.meta.env.VITE_APP_NAME,
    setup: async ({
        el,
        App,
        props,
        plugin,
    }: PageResolutionData): Promise<void> => {
        const locale = (import.meta.env.VITE_APP_LOCALE || "en") as string;
        const translations = await loadLocale(locale);

        const app = createApp({
            render: (): VNode => h("div", [h(ToastManager), h(App, props)]),
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
