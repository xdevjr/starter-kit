import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Função para carregar as traduções
window.loadLocale = async (locale) => {
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